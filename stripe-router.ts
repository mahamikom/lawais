import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import Stripe from "stripe";
import { ENV } from "./_core/env";
import { PRODUCTS, getPriceInCents } from "../shared/products";
import { generateInvoicePDF } from "./invoice-generator";

// تهيئة Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-11-17.clover",
});

export const stripeRouter = router({
  // إنشاء جلسة دفع
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        productId: z.enum(["MONTHLY", "YEARLY"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const product = PRODUCTS[input.productId];
      const priceInCents = getPriceInCents(input.productId);

      try {
        // إنشاء جلسة Checkout
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "subscription",
          customer_email: ctx.user.email || undefined,
          client_reference_id: ctx.user.id.toString(),
          metadata: {
            user_id: ctx.user.id.toString(),
            customer_email: ctx.user.email || "",
            customer_name: ctx.user.name || "",
            product_id: input.productId,
          },
          line_items: [
            {
              price_data: {
                currency: "sar",
                product_data: {
                  name: product.name,
                  description: product.description,
                },
                unit_amount: priceInCents,
                recurring: {
                  interval: product.interval,
                },
              },
              quantity: 1,
            },
          ],
          success_url: `${ctx.req.headers.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${ctx.req.headers.origin}/payment/cancel`,
          allow_promotion_codes: true,
        });

        return { url: session.url };
      } catch (error) {
        console.error("[Stripe] Error creating checkout session:", error);
        throw new Error("فشل في إنشاء جلسة الدفع");
      }
    }),

  // الحصول على حالة الاشتراك الحالي
  getSubscriptionStatus: protectedProcedure.query(async ({ ctx }) => {
    const { getDb } = await import("./db");
    const db = await getDb();
    if (!db) return null;

    try {
      const { subscriptions } = await import("../drizzle/schema");
      const { eq, desc } = await import("drizzle-orm");

      const userSubscriptions = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, ctx.user.id))
        .orderBy(desc(subscriptions.createdAt))
        .limit(1);

      if (userSubscriptions.length === 0) return null;

      const subscription = userSubscriptions[0];

      // التحقق من انتهاء الاشتراك
      const now = new Date();
      const isExpired = subscription.currentPeriodEnd && new Date(subscription.currentPeriodEnd) < now;

      return {
        ...subscription,
        isActive: subscription.status === "active" && !isExpired,
        isExpired,
      };
    } catch (error) {
      console.error("[Stripe] Error fetching subscription:", error);
      return null;
    }
  }),

  // الحصول على سجل المدفوعات
  getPaymentHistory: protectedProcedure.query(async ({ ctx }) => {
    const { getDb } = await import("./db");
    const db = await getDb();
    if (!db) return [];

    try {
      const { payments } = await import("../drizzle/schema");
      const { eq, desc } = await import("drizzle-orm");

      const userPayments = await db
        .select()
        .from(payments)
        .where(eq(payments.userId, ctx.user.id))
        .orderBy(desc(payments.createdAt));

      return userPayments;
    } catch (error) {
      console.error("[Stripe] Error fetching payments:", error);
      return [];
    }
  }),

  // إلغاء الاشتراك
  cancelSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const { getDb } = await import("./db");
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    try {
      const { subscriptions } = await import("../drizzle/schema");
      const { eq, desc } = await import("drizzle-orm");

      // الحصول على الاشتراك النشط
      const userSubscriptions = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, ctx.user.id))
        .orderBy(desc(subscriptions.createdAt))
        .limit(1);

      if (userSubscriptions.length === 0) {
        throw new Error("لا يوجد اشتراك نشط");
      }

      const subscription = userSubscriptions[0];

      if (!subscription.stripeSubscriptionId) {
        throw new Error("معرف الاشتراك غير موجود");
      }

      // إلغاء الاشتراك في Stripe (سيستمر حتى نهاية الفترة المدفوعة)
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });

      // تحديث قاعدة البيانات
      await db
        .update(subscriptions)
        .set({ cancelAtPeriodEnd: 1 })
        .where(eq(subscriptions.id, subscription.id));

      return { success: true, message: "تم إلغاء الاشتراك بنجاح. سيستمر حتى نهاية الفترة المدفوعة." };
    } catch (error: any) {
      console.error("[Stripe] Error canceling subscription:", error);
      throw new Error(error.message || "فشل في إلغاء الاشتراك");
    }
  }),

  // إعادة تفعيل الاشتراك الملغي
  reactivateSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    const { getDb } = await import("./db");
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    try {
      const { subscriptions } = await import("../drizzle/schema");
      const { eq, desc } = await import("drizzle-orm");

      // الحصول على الاشتراك
      const userSubscriptions = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, ctx.user.id))
        .orderBy(desc(subscriptions.createdAt))
        .limit(1);

      if (userSubscriptions.length === 0) {
        throw new Error("لا يوجد اشتراك");
      }

      const subscription = userSubscriptions[0];

      if (!subscription.stripeSubscriptionId) {
        throw new Error("معرف الاشتراك غير موجود");
      }

      // إعادة تفعيل الاشتراك في Stripe
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: false,
      });

      // تحديث قاعدة البيانات
      await db
        .update(subscriptions)
        .set({ cancelAtPeriodEnd: 0 })
        .where(eq(subscriptions.id, subscription.id));

      return { success: true, message: "تم إعادة تفعيل الاشتراك بنجاح" };
    } catch (error: any) {
      console.error("[Stripe] Error reactivating subscription:", error);
      throw new Error(error.message || "فشل في إعادة تفعيل الاشتراك");
    }
  }),

  // توليد فاتورة PDF
  generateInvoice: protectedProcedure
    .input(
      z.object({
        paymentId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { getDb } = await import("./db");
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      try {
        const { payments } = await import("../drizzle/schema");
        const { eq, and } = await import("drizzle-orm");

        // الحصول على الدفعة
        const userPayments = await db
          .select()
          .from(payments)
          .where(
            and(
              eq(payments.id, input.paymentId),
              eq(payments.userId, ctx.user.id)
            )
          )
          .limit(1);

        if (userPayments.length === 0) {
          throw new Error("لم يتم العثور على الفاتورة");
        }

        const payment = userPayments[0];

        // توليد رقم الفاتورة
        const invoiceNumber = `INV-${payment.id.toString().padStart(6, '0')}`;

        // بيانات الفاتورة
        const pdfBuffer = await generateInvoicePDF({
          payment,
          userName: ctx.user.name || "عميل",
          userEmail: ctx.user.email || "",
          invoiceNumber,
          companyInfo: {
            name: "محاميكم",
            nameEn: "Muhameekum",
            address: "الرياض، المملكة العربية السعودية",
            taxNumber: "300000000000003",
            phone: "+966 50 000 0000",
            email: "info@muhameekum.com",
          },
        });

        // تحويل إلى base64 للإرسال
        const pdfBase64 = pdfBuffer.toString('base64');

        return {
          success: true,
          invoiceNumber,
          pdfData: pdfBase64,
          fileName: `${invoiceNumber}.pdf`,
        };
      } catch (error: any) {
        console.error("[Invoice] Error generating invoice:", error);
        throw new Error(error.message || "فشل في توليد الفاتورة");
      }
    }),
});
