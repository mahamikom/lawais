import type { Request, Response } from "express";
import Stripe from "stripe";
import { getDb } from "./db";
import { subscriptions, payments } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover",
});

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    console.error("[Webhook] No signature found");
    return res.status(400).send("No signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error("[Webhook] Signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // التعامل مع أحداث الاختبار
  if (event.id.startsWith("evt_test_")) {
    console.log("[Webhook] Test event detected, returning verification response");
    return res.json({
      verified: true,
    });
  }

  console.log("[Webhook] Event received:", event.type);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoiceFailed(invoice);
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Error processing event:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const db = await getDb();
  if (!db) return;

  const userId = parseInt(session.metadata?.user_id || "0");
  if (!userId) {
    console.error("[Webhook] No user_id in session metadata");
    return;
  }

  console.log("[Webhook] Checkout completed for user:", userId);

  // إذا كان اشتراك، سيتم التعامل معه في subscription.created
  // هنا نسجل فقط الدفع
  if (session.payment_intent) {
    await db.insert(payments).values({
      userId,
      stripePaymentIntentId: session.payment_intent as string,
      amount: session.amount_total || 0,
      currency: session.currency?.toUpperCase() || "SAR",
      status: "succeeded",
      productId: session.metadata?.product_id || "unknown",
    });
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const db = await getDb();
  if (!db) return;

  const userId = parseInt(subscription.metadata?.user_id || "0");
  if (!userId) {
    console.error("[Webhook] No user_id in subscription metadata");
    return;
  }

  console.log("[Webhook] Subscription updated for user:", userId);

  const existingSubscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id))
    .limit(1);

  const subscriptionData = {
    userId,
    stripeCustomerId: subscription.customer as string,
    stripeSubscriptionId: subscription.id,
    stripePriceId: subscription.items.data[0]?.price.id || "",
    productId: subscription.metadata?.product_id || "unknown",
    status: subscription.status as "active" | "canceled" | "past_due" | "incomplete",
    currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
    currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
    cancelAtPeriodEnd: (subscription as any).cancel_at_period_end ? 1 : 0,
  };

  if (existingSubscription.length > 0) {
    // تحديث
    await db
      .update(subscriptions)
      .set(subscriptionData)
      .where(eq(subscriptions.stripeSubscriptionId, subscription.id));
  } else {
    // إنشاء جديد
    await db.insert(subscriptions).values(subscriptionData);
  }
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const db = await getDb();
  if (!db) return;

  console.log("[Webhook] Subscription canceled:", subscription.id);

  await db
    .update(subscriptions)
    .set({ status: "canceled" })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const db = await getDb();
  if (!db) return;

  const userId = parseInt(invoice.metadata?.user_id || "0");
  if (!userId) return;

  console.log("[Webhook] Invoice paid for user:", userId);

  await db.insert(payments).values({
    userId,
    stripePaymentIntentId: ((invoice as any).payment_intent as string) || "",
    stripeInvoiceId: invoice.id,
    amount: invoice.amount_paid,
    currency: invoice.currency.toUpperCase(),
    status: "succeeded",
    productId: invoice.metadata?.product_id || "unknown",
  });
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  const db = await getDb();
  if (!db) return;

  const userId = parseInt(invoice.metadata?.user_id || "0");
  if (!userId) return;

  console.log("[Webhook] Invoice payment failed for user:", userId);

  await db.insert(payments).values({
    userId,
    stripePaymentIntentId: ((invoice as any).payment_intent as string) || "",
    stripeInvoiceId: invoice.id,
    amount: invoice.amount_due,
    currency: invoice.currency.toUpperCase(),
    status: "failed",
    productId: invoice.metadata?.product_id || "unknown",
  });

  // تحديث حالة الاشتراك
  const subscriptionId = (invoice as any).subscription as string | undefined;
  if (subscriptionId) {
    await db
      .update(subscriptions)
      .set({ status: "past_due" })
      .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));
  }
}
