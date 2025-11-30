import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle, ArrowRight, RefreshCw } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center shadow-2xl">
        <div className="mb-6">
          <XCircle className="h-24 w-24 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            تم إلغاء عملية الدفع
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            لم يتم إتمام عملية الاشتراك
          </p>
          <p className="text-gray-500">
            يمكنك المحاولة مرة أخرى في أي وقت
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-3 text-gray-900">لماذا قد تفشل عملية الدفع؟</h3>
          <ul className="text-right space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>رصيد غير كافٍ في البطاقة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>بيانات البطاقة غير صحيحة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>البطاقة غير مفعّلة للمدفوعات الإلكترونية</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>إلغاء العملية من قبل المستخدم</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/pricing">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <RefreshCw className="ml-2 h-5 w-5" />
              المحاولة مرة أخرى
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">
              <ArrowRight className="ml-2 h-5 w-5" />
              العودة للصفحة الرئيسية
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-gray-600 mb-2">
            هل تواجه مشكلة؟
          </p>
          <Link href="/contact">
            <Button variant="link" className="text-blue-600">
              تواصل مع الدعم الفني
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
