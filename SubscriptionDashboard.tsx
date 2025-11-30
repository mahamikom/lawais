import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  CheckCircle,
  XCircle,
  Calendar,
  CreditCard,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
  Loader2,
  FileText,
} from "lucide-react";
import { PRODUCTS } from "../../../shared/products";

export default function SubscriptionDashboard() {
  const { isAuthenticated, user } = useAuth();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const { data: subscription, isLoading: subLoading, refetch: refetchSub } = 
    trpc.stripe.getSubscriptionStatus.useQuery(undefined, {
      enabled: isAuthenticated,
    });

  const { data: payments, isLoading: paymentsLoading } = 
    trpc.stripe.getPaymentHistory.useQuery(undefined, {
      enabled: isAuthenticated,
    });

  const cancelMutation = trpc.stripe.cancelSubscription.useMutation({
    onSuccess: () => {
      alert("تم إلغاء الاشتراك بنجاح. سيستمر حتى نهاية الفترة المدفوعة.");
      refetchSub();
      setCancelDialogOpen(false);
    },
    onError: (error) => {
      alert(`خطأ: ${error.message}`);
    },
  });

  const reactivateMutation = trpc.stripe.reactivateSubscription.useMutation({
    onSuccess: () => {
      alert("تم إعادة تفعيل الاشتراك بنجاح!");
      refetchSub();
    },
    onError: (error) => {
      alert(`خطأ: ${error.message}`);
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">يجب تسجيل الدخول</h2>
          <p className="text-gray-600 mb-6">
            للوصول إلى لوحة تحكم الاشتراكات، يجب عليك تسجيل الدخول أولاً
          </p>
          <Button
            onClick={() => (window.location.href = getLoginUrl())}
            className="w-full"
          >
            تسجيل الدخول
          </Button>
        </Card>
      </div>
    );
  }

  if (subLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل بيانات الاشتراك...</p>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date | string | null) => {
    if (!date) return "غير محدد";
    return new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${(amount / 100).toFixed(2)} ${currency}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="h-4 w-4 ml-1" />
            نشط
          </Badge>
        );
      case "canceled":
        return (
          <Badge variant="destructive">
            <XCircle className="h-4 w-4 ml-1" />
            ملغي
          </Badge>
        );
      case "past_due":
        return (
          <Badge className="bg-yellow-600">
            <AlertTriangle className="h-4 w-4 ml-1" />
            متأخر
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getProductName = (productId: string) => {
    if (productId === "MONTHLY") return PRODUCTS.MONTHLY.name;
    if (productId === "YEARLY") return PRODUCTS.YEARLY.name;
    return productId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            لوحة تحكم الاشتراكات
          </h1>
          <p className="text-blue-100">
            إدارة اشتراكك وعرض تاريخ المدفوعات
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Subscription Status Card */}
        {subscription ? (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">حالة الاشتراك</CardTitle>
                {getStatusBadge(subscription.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CreditCard className="h-5 w-5" />
                    <span className="font-semibold">الباقة:</span>
                  </div>
                  <p className="text-lg">{getProductName(subscription.productId)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span className="font-semibold">تاريخ البداية:</span>
                  </div>
                  <p className="text-lg">{formatDate(subscription.currentPeriodStart)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span className="font-semibold">تاريخ الانتهاء:</span>
                  </div>
                  <p className="text-lg">{formatDate(subscription.currentPeriodEnd)}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">الحالة:</span>
                  </div>
                  <p className="text-lg">
                    {subscription.isActive ? "نشط" : "غير نشط"}
                  </p>
                </div>
              </div>

              {subscription.cancelAtPeriodEnd === 1 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-900 mb-1">
                        تم جدولة إلغاء الاشتراك
                      </p>
                      <p className="text-sm text-yellow-800">
                        سيتم إلغاء اشتراكك في نهاية الفترة المدفوعة ({formatDate(subscription.currentPeriodEnd)}).
                        يمكنك إعادة تفعيله في أي وقت قبل هذا التاريخ.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-4 border-t">
                {subscription.cancelAtPeriodEnd === 1 ? (
                  <Button
                    onClick={() => reactivateMutation.mutate()}
                    disabled={reactivateMutation.isPending}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {reactivateMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                        جاري التفعيل...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 ml-2" />
                        إعادة تفعيل الاشتراك
                      </>
                    )}
                  </Button>
                ) : (
                  <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <XCircle className="h-4 w-4 ml-2" />
                        إلغاء الاشتراك
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                        <AlertDialogDescription>
                          سيتم إلغاء اشتراكك في نهاية الفترة المدفوعة. ستستمر في الوصول
                          لجميع الميزات حتى {formatDate(subscription.currentPeriodEnd)}.
                          يمكنك إعادة تفعيل الاشتراك في أي وقت.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => cancelMutation.mutate()}
                          disabled={cancelMutation.isPending}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {cancelMutation.isPending ? "جاري الإلغاء..." : "تأكيد الإلغاء"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                <Link href="/pricing">
                  <Button variant="outline">
                    <ArrowRight className="h-4 w-4 ml-2" />
                    تغيير الباقة
                  </Button>
                </Link>
                <Link href="/invoices">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 ml-2" />
                    عرض الفواتير
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent className="py-12 text-center">
              <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">لا يوجد اشتراك نشط</h3>
              <p className="text-gray-600 mb-6">
                اشترك الآن للحصول على وصول كامل لجميع ميزات المنصة
              </p>
              <Link href="/pricing">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  عرض الباقات
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">تاريخ المدفوعات</CardTitle>
          </CardHeader>
          <CardContent>
            {paymentsLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600">جاري تحميل المدفوعات...</p>
              </div>
            ) : payments && payments.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الباقة</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>رقم العملية</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{formatDate(payment.createdAt)}</TableCell>
                        <TableCell className="font-semibold">
                          {formatAmount(payment.amount, payment.currency)}
                        </TableCell>
                        <TableCell>{getProductName(payment.productId)}</TableCell>
                        <TableCell>
                          {payment.status === "succeeded" ? (
                            <Badge className="bg-green-600">نجح</Badge>
                          ) : payment.status === "failed" ? (
                            <Badge variant="destructive">فشل</Badge>
                          ) : (
                            <Badge variant="outline">قيد الانتظار</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">
                          {payment.stripePaymentIntentId?.substring(0, 20)}...
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p>لا توجد مدفوعات سابقة</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
