import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { Lock, UserX, LogIn, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Lawyers() {
  const { isAuthenticated } = useAuth();

  // إذا لم يكن مسجل دخول، عرض صفحة الحظر
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="container max-w-2xl">
          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardContent className="p-12 text-center space-y-8">
              {/* أيقونة القفل */}
              <div className="flex justify-center">
                <div className="p-6 bg-primary/10 rounded-full">
                  <Lock className="w-20 h-20 text-primary" />
                </div>
              </div>

              {/* العنوان الرئيسي */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                  قسم المحامين المتعاونين
                </h1>
                <div className="flex items-center justify-center gap-3 text-red-600">
                  <UserX className="h-6 w-6" />
                  <p className="text-xl font-semibold">
                    وصول محظور
                  </p>
                </div>
              </div>

              {/* الرسالة */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <p className="text-lg text-foreground leading-relaxed">
                  عذراً، لا يمكنك زيارة هذا القسم إلا إذا كنت من <span className="font-bold text-primary">المشتركين بالمنصة</span>
                </p>
              </div>

              {/* المميزات المتاحة بعد التسجيل */}
              <div className="text-right space-y-3 bg-gradient-to-br from-primary/5 to-blue-50 p-6 rounded-lg">
                <p className="font-bold text-primary text-lg mb-4">بعد التسجيل ستتمكن من:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>عرض الملفات الكاملة لجميع المحامين المعتمدين</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>حجز مواعيد استشارات قانونية مباشرة</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>التواصل المباشر مع المحامين المتخصصين</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>الوصول إلى خدمات حصرية للمشتركين</span>
                  </li>
                </ul>
              </div>

              {/* زر تسجيل الدخول */}
              <div className="pt-4">
                <a href={getLoginUrl()}>
                  <Button size="lg" className="text-lg px-8 py-6">
                    <LogIn className="ml-2 h-5 w-5" />
                    سجل الدخول للوصول إلى القسم
                  </Button>
                </a>
              </div>

              {/* ملاحظة */}
              <p className="text-sm text-muted-foreground">
                إذا كنت مشتركاً بالفعل، يرجى تسجيل الدخول أولاً
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // إذا كان مسجل دخول، عرض قائمة المحامين
  const lawyers = [
    {
      name: "إبراهيم الحماد",
      specialization: "حوكمة الشركات وإدارة المخاطر",
      experience: 15,
      imageUrl: "/images/ceo.jpg"
    },
    {
      name: "عبدالله محمد العتيبي",
      specialization: "محامي قضايا تجارية وعقود",
      experience: 15,
      imageUrl: "/images/lawyer1.jpg"
    },
    {
      name: "فاطمة أحمد القحطاني",
      specialization: "محامية قضايا أسرية وعمل",
      experience: 12,
      imageUrl: "/images/lawyer2.jpg"
    },
    {
      name: "خالد سعيد الزهراني",
      specialization: "محامي قضايا عقارية وجنائية",
      experience: 18,
      imageUrl: "/images/lawyer3.jpg"
    }
  ];

  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              المحامون المعتمدون
            </h1>
            <p className="text-xl text-muted-foreground">
              فريق من المحامين المحترفين في خدمتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                    {lawyer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">{lawyer.name}</h3>
                    <p className="text-muted-foreground">{lawyer.specialization}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {lawyer.experience} سنوات خبرة
                    </p>
                  </div>
                  <Button className="w-full">
                    عرض الملف الكامل
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* قسم الأسئلة الشائعة */}
          <FAQSection />
        </div>
      </div>
    </div>
  );
}

// مكون الأسئلة الشائعة
function FAQSection() {
  const faqs = [
    {
      question: "كيف يمكنني التواصل مع المحامين المعتمدين؟",
      answer: "بعد تسجيل الدخول، يمكنك التواصل مباشرة مع المحامين من خلال الضغط على 'عرض الملف الكامل' ثم اختيار وسيلة التواصل المناسبة (هاتف، بريد إلكتروني، أو حجز موعد استشارة)."
    },
    {
      question: "هل المحامون معتمدون ومرخصون؟",
      answer: "نعم، جميع المحامين في منصتنا معتمدون ومرخصون من وزارة العدل السعودية ولديهم سجل حافل في مجالاتهم القانونية المتخصصة. نحن نتحقق من جميع الشهادات والتراخيص قبل قبول أي محامي في المنصة."
    },
    {
      question: "ما هي تكلفة الاستشارة القانونية؟",
      answer: "تختلف تكلفة الاستشارة حسب نوع القضية وتخصص المحامي. يمكنك الاطلاع على الأسعار التقديرية في ملف كل محامي. كما نوفر استشارات أولية مجانية لمدة 15 دقيقة لتقييم حالتك."
    },
    {
      question: "كم يستغرق الحصول على رد من المحامي؟",
      answer: "عادةً ما يتم الرد على الاستفسارات خلال 24-48 ساعة عمل. في الحالات العاجلة، يمكنك استخدام خدمة الاستشارة الفورية المتاحة لبعض المحامين."
    },
    {
      question: "هل يمكنني تغيير المحامي بعد بدء القضية؟",
      answer: "نعم، يمكنك تغيير المحامي في أي وقت. نحن نضمن لك حرية الاختيار والعمل مع المحامي الذي تشعر بالراحة معه. سيتم نقل جميع المستندات والمعلومات بشكل آمن."
    },
    {
      question: "ما هي المجالات القانونية التي يغطيها المحامون؟",
      answer: "نوفر محامين متخصصين في جميع المجالات القانونية: القضايا التجارية، العقود، القضايا الأسرية، العقارات، القضايا الجنائية، قضايا العمل، حوكمة الشركات، والملكية الفكرية."
    },
    {
      question: "هل المعلومات والمستندات آمنة؟",
      answer: "نعم، نحن نستخدم أعلى معايير الأمان والتشفير لحماية جميع بياناتك ومستنداتك. جميع المحامين ملتزمون بسرية المعلومات وفقاً لأخلاقيات المهنة القانونية."
    },
    {
      question: "هل يمكن حجز موعد استشارة عبر الإنترنت؟",
      answer: "نعم، نوفر خدمة الاستشارات القانونية عن بُعد عبر الفيديو أو الهاتف. يمكنك حجز موعد مناسب لك من خلال تقويم المحامي المتاح في ملفه الشخصي."
    }
  ];

  return (
    <div className="mt-16 space-y-8" dir="rtl">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          الأسئلة الشائعة
        </h2>
        <p className="text-lg text-muted-foreground">
          إجابات على أكثر الأسئلة شيوعاً حول خدمات المحامين
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-right text-lg font-semibold hover:text-primary [&>svg]:order-first [&>svg]:ml-0 [&>svg]:mr-4" dir="rtl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-right text-muted-foreground leading-relaxed" dir="rtl">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* رسالة تشجيعية */}
      <div className="text-center bg-gradient-to-br from-primary/5 to-blue-50 p-8 rounded-lg">
        <p className="text-lg text-foreground mb-4">
          لديك سؤال آخر؟ لا تتردد في التواصل معنا
        </p>
        <Button size="lg" variant="outline">
          تواصل معنا
        </Button>
      </div>
    </div>
  );
}
