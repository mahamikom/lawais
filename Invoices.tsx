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
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Download,
  FileText,
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { PRODUCTS } from "../../../shared/products";

export default function Invoices() {
  const { isAuthenticated, user } = useAuth();
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const { data: payments, isLoading } = trpc.stripe.getPaymentHistory.useQuery(
    undefined,
    {
      enabled: isAuthenticated,
    }
  );

  const generateInvoice = trpc.stripe.generateInvoice.useMutation({
    onSuccess: (data) => {
      // تحويل base64 إلى Blob وتحميله
      const byteCharacters = atob(data.pdfData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // إنشاء رابط تحميل
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadingId(null);
    },
    onError: (error) => {
      alert(`خطأ في تحميل الفاتورة: ${error.message}`);
      setDownloadingId(null);
    },
  });

  const handleDownload = (paymentId: number) => {
    setDownloadingId(paymentId);
    generateInvoice.mutate({ paymentId });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">يجب تسجيل الدخول</h2>
          <p className="text-gray-600 mb-6">
            للوصول إلى الفواتير، يجب عليك تسجيل الدخول أولاً
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل الفواتير...</p>
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

  const getProductName = (productId: string) => {
    if (productId === "MONTHLY") return PRODUCTS.MONTHLY.name;
    if (productId === "YEARLY") return PRODUCTS.YEARLY.name;
    return productId;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "succeeded":
        return (
          <Badge className="bg-green-600">
            <CheckCircle className="h-3 w-3 ml-1" />
            مدفوع
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 ml-1" />
            فشل
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            قيد الانتظار
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-10 w-10" />
            <h1 className="text-3xl md:text-4xl font-bold">الفواتير</h1>
          </div>
          <p className="text-blue-100">
            عرض وتحميل جميع فواتيرك بصيغة PDF
          </p>
        </div>
      </div>

      <div className="container py-8">
        {payments && payments.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">سجل الفواتير</CardTitle>
              <p className="text-sm text-gray-600">
                جميع الفواتير تشمل ضريبة القيمة المضافة (15%)
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>رقم الفاتورة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الباقة</TableHead>
                      <TableHead>المبلغ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => {
                      const invoiceNumber = `INV-${payment.id.toString().padStart(6, "0")}`;
                      const isDownloading = downloadingId === payment.id;

                      return (
                        <TableRow key={payment.id}>
                          <TableCell className="font-mono font-semibold">
                            {invoiceNumber}
                          </TableCell>
                          <TableCell>{formatDate(payment.createdAt)}</TableCell>
                          <TableCell>{getProductName(payment.productId)}</TableCell>
                          <TableCell className="font-semibold">
                            {formatAmount(payment.amount, payment.currency)}
                          </TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>
                            {payment.status === "succeeded" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDownload(payment.id)}
                                disabled={isDownloading}
                              >
                                {isDownloading ? (
                                  <>
                                    <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                                    جاري التحميل...
                                  </>
                                ) : (
                                  <>
                                    <Download className="h-4 w-4 ml-2" />
                                    تحميل PDF
                                  </>
                                )}
                              </Button>
                            ) : (
                              <span className="text-sm text-gray-400">غير متاح</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* معلومات إضافية */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  معلومات مهمة:
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• جميع الفواتير تشمل ضريبة القيمة المضافة بنسبة 15%</li>
                  <li>• يمكنك تحميل الفواتير بصيغة PDF للمدفوعات الناجحة فقط</li>
                  <li>• الفواتير صالحة للاستخدام الضريبي والمحاسبي</li>
                  <li>• في حال وجود أي استفسار، تواصل مع الدعم الفني</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">لا توجد فواتير</h3>
              <p className="text-gray-600 mb-6">
                لم تقم بأي عمليات دفع بعد
              </p>
              <Link href="/pricing">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  عرض الباقات
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* روابط سريعة */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/subscription">
            <Button variant="outline">
              عرض حالة الاشتراك
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline">
              تغيير الباقة
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">
              تواصل مع الدعم
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
