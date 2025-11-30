import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Smartphone } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";

export default function Pricing() {
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const createCheckout = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        // فتح صفحة الدفع في نافذة جديدة
        window.open(data.url, '_blank');
        setIsProcessing(null);
      }
    },
    onError: (error) => {
      alert(`خطأ في إنشاء جلسة الدفع: ${error.message}`);
      setIsProcessing(null);
    },
  });

  const handleSubscribe = (productId: "MONTHLY" | "YEARLY") => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    setIsProcessing(productId);
    createCheckout.mutate({ productId });
  };

  const plans = [
    {
      id: "MONTHLY" as const,
      name: "اشتراك شهري",
      price: "99",
      period: "شهرياً",
      description: "مثالي للأفراد والاستخدام قصير المدى",
      features: [
        "وصول غير محدود للذكاء الاصطناعي",
        "تحليل العقود بدون قيود",
        "الوصول لجميع المحامين المعتمدين",
        "تحميل العقود بصيغة PDF",
        "استشارات قانونية فورية",
        "دعم فني على مدار الساعة"
      ],
      popular: false,
    },
    {
      id: "YEARLY" as const,
      name: "اشتراك سنوي",
      price: "999",
      period: "سنوياً",
      originalPrice: "1,188",
      savings: "وفر 189 ريال (16%)",
      description: "الأفضل للشركات والاستخدام طويل المدى",
      features: [
        "جميع ميزات الاشتراك الشهري",
        "خصم 16% على السعر السنوي",
        "أولوية في الدعم الفني",
        "جلسة استشارية مجانية شهرياً",
        "تقارير قانونية شهرية",
        "وصول مبكر للميزات الجديدة"
      ],
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              اختر الباقة المناسبة لك
            </h1>
            <p className="text-xl text-blue-100">
              احصل على وصول كامل لجميع ميزات منصة محاميكم
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular
                  ? "border-2 border-blue-600 shadow-2xl scale-105"
                  : "shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 text-sm">
                    الأكثر شعبية
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-blue-600">
                      {plan.price}
                    </span>
                    <span className="text-xl text-gray-600">ريال</span>
                  </div>
                  <div className="text-gray-500">{plan.period}</div>
                  
                  {plan.originalPrice && (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-400 line-through">
                        السعر الأصلي: {plan.originalPrice} ريال
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {plan.savings}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Subscribe Button */}
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isProcessing === plan.id}
                  className={`w-full py-6 text-lg ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  size="lg"
                >
                  {isProcessing === plan.id ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      جاري التحويل...
                    </span>
                  ) : (
                    "اشترك الآن"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-blue-200">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
              طرق الدفع المتاحة
            </h3>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm border">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-gray-700">Mastercard</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm border">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-gray-700">Visa</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm border">
                <Smartphone className="h-6 w-6 text-gray-700" />
                <span className="font-semibold text-gray-700">Apple Pay</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm border">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-gray-700">مدى</span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-6">
              جميع المدفوعات آمنة ومشفرة بواسطة Stripe
            </p>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
            الأسئلة الشائعة
          </h3>
          <div className="space-y-4">
            <Card className="p-6">
              <h4 className="font-bold text-lg mb-2 text-gray-900">
                هل يمكنني إلغاء الاشتراك في أي وقت؟
              </h4>
              <p className="text-gray-600">
                نعم، يمكنك إلغاء اشتراكك في أي وقت من لوحة التحكم. سيستمر اشتراكك حتى نهاية الفترة المدفوعة.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-bold text-lg mb-2 text-gray-900">
                هل الأسعار شاملة ضريبة القيمة المضافة؟
              </h4>
              <p className="text-gray-600">
                نعم، جميع الأسعار المعروضة شاملة ضريبة القيمة المضافة (15%).
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-bold text-lg mb-2 text-gray-900">
                هل يوجد فترة تجريبية مجانية؟
              </h4>
              <p className="text-gray-600">
                حالياً لا توجد فترة تجريبية، لكن يمكنك استخدام بعض الميزات الأساسية مجاناً قبل الاشتراك.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-bold text-lg mb-2 text-gray-900">
                ماذا يحدث بعد انتهاء الاشتراك؟
              </h4>
              <p className="text-gray-600">
                سيتم تجديد اشتراكك تلقائياً ما لم تقم بإلغائه. يمكنك إيقاف التجديد التلقائي من لوحة التحكم.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            هل لديك أسئلة أخرى؟
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              تواصل معنا
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
