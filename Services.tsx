import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, FileText, BookOpen, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const services = [
    {
      icon: Scale,
      title: "تحليل العقود",
      description: "تحليل ذكي ودقيق للعقود باستخدام الذكاء الاصطناعي لتحديد المخاطر والفرص",
      features: ["تحليل شامل للبنود", "تحديد المخاطر القانونية", "توصيات قانونية"],
      link: "/contracts"
    },
    {
      icon: FileText,
      title: "توقع نتائج القضايا",
      description: "توقعات دقيقة لنتائج القضايا بناءً على تحليل البيانات التاريخية",
      features: ["تحليل القضايا المشابهة", "احتمالية النجاح", "المدة المتوقعة"],
      link: "/ai-chat"
    },
    {
      icon: BookOpen,
      title: "المكتبة القانونية",
      description: "مكتبة شاملة من المراجع والقوانين السعودية",
      features: ["قوانين ولوائح", "أحكام قضائية", "مراجع قانونية"],
      link: "/library"
    },
    {
      icon: MessageSquare,
      title: "استشارات قانونية",
      description: "احصل على استشارات قانونية من محامين محترفين",
      features: ["استشارات فورية", "محامون معتمدون", "سرية تامة"],
      link: "/ai-chat"
    }
  ];

  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              خدماتنا
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات القانونية المدعومة بالتقنية والذكاء الاصطناعي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-primary mb-2">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {service.description}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href={service.link}>
                          <Button className="w-full mt-4">
                            تجربة الخدمة
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center pt-8">
            <Link href="/contact">
              <Button size="lg" className="text-lg px-8">
                ابدأ الآن
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
