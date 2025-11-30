import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1]);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // يمكن إضافة تتبع أو تحليلات هنا
    console.log('Payment successful, session:', sessionId);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center shadow-2xl">
        <div className="mb-6">
          <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            تم الاشتراك بنجاح! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            شكراً لك على الاشتراك في منصة محاميكم
          </p>
          <p className="text-gray-500">
            تم تفعيل اشتراكك ويمكنك الآن الاستفادة من جميع الميزات
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-3 text-gray-900">ماذا بعد؟</h3>
          <ul className="text-right space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>يمكنك الآن الوصول لجميع المحامين المعتمدين</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>استخدام الذكاء الاصطناعي بدون قيود</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>تحميل وتحليل العقود بصيغة PDF</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>الحصول على استشارات قانونية فورية</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              الذهاب إلى لوحة التحكم
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
          <p className="text-sm text-gray-500">
            سيتم إرسال إيصال الدفع إلى بريدك الإلكتروني
          </p>
          {sessionId && (
            <p className="text-xs text-gray-400 mt-2">
              رقم الجلسة: {sessionId}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
