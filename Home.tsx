import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { BookOpen, Users, FileText, ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const stats = [
    { label: "عدد المستخدمين", value: "277" },
    { label: "عدد المحامين", value: "23" },
    { label: "عدد المواعيد", value: "9" },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "المكتبة القانونية",
      description: "مكتبة شاملة من المراجع والقوانين السعودية",
      link: "/library",
      highlight: false
    },
    {
      icon: Users,
      title: "محامون معتمدون",
      description: "فريق من المحامين المحترفين في خدمتك",
      link: "/lawyers",
      highlight: true
    },
    {
      icon: FileText,
      title: "المقالات والبحوث",
      description: "مقالات قانونية متخصصة وبحوث قانونية شاملة",
      link: "/articles",
      highlight: false
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Ivo.ai Style */}
      <section className="relative bg-background py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--primary)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_var(--accent)_0%,_transparent_50%)]" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">مراجعة</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" dir="rtl">
              <span className="inline-block">منصة </span>
              <span className="inline-block bg-accent/30 px-2">محاميكم</span>
              <span className="inline-block"> القانونية</span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl font-semibold text-foreground mb-4" dir="rtl">
              محامون معتمدون • مكتبة قانونية • مقالات وأخبار
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 leading-relaxed" dir="rtl">
              منصة قانونية متخصصة تربطك بنخبة من المحامين المعتمدين في السعودية، مع مكتبة شاملة من القوانين والأنظمة، ومقالات قانونية متخصصة.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/lawyers">
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  تصفح المحامين
                </Button>
              </Link>
              <Link href="/library">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  المكتبة القانونية
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-none bg-transparent">
                <CardContent className="pt-6">
                  <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Ivo.ai Style */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4" dir="rtl">
              خدماتنا
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" dir="rtl">
              نقدم مجموعة شاملة من الخدمات القانونية المدعومة بالتقنية
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} href={feature.link}>
                  <Card 
                    className={`group hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-2 ${
                      feature.highlight 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'hover:border-primary/20'
                    }`}
                  >
                    <CardContent className="p-8" dir="rtl">
                      <div className="flex flex-col space-y-4">
                        <div className={`p-4 rounded-2xl w-fit ${
                          feature.highlight 
                            ? 'bg-primary-foreground/10' 
                            : 'bg-primary/10'
                        }`}>
                          <Icon className={`w-8 h-8 ${
                            feature.highlight 
                              ? 'text-primary-foreground' 
                              : 'text-primary'
                          }`} />
                        </div>
                        <h3 className={`text-2xl font-bold ${
                          feature.highlight 
                            ? 'text-primary-foreground' 
                            : 'text-foreground'
                        }`}>
                          {feature.title}
                        </h3>
                        <p className={`text-base leading-relaxed ${
                          feature.highlight 
                            ? 'text-primary-foreground/80' 
                            : 'text-muted-foreground'
                        }`}>
                          {feature.description}
                        </p>
                        <div className="flex items-center gap-2 pt-4">
                          <span className={`text-sm font-medium ${
                            feature.highlight 
                              ? 'text-primary-foreground' 
                              : 'text-primary'
                          }`}>
                            عرض التفاصيل
                          </span>
                          <ArrowRight className={`w-4 h-4 group-hover:translate-x-[-4px] transition-transform ${
                            feature.highlight 
                              ? 'text-primary-foreground' 
                              : 'text-primary'
                          }`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision Section - Ivo.ai Style */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-xl">
              <CardContent className="p-12" dir="rtl">
                <div className="space-y-12">
                  <div>
                    <h3 className="text-3xl font-bold text-primary mb-4 text-right">الهدف</h3>
                    <p className="text-lg leading-relaxed text-foreground text-right">
                      تسهيل وصول الأفراد والشركات إلى أفضل الخدمات القانونية من خلال ربطهم مباشرة بمحامين محترفين معتمدين داخل منصة موحّدة.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold text-primary mb-4 text-right">الطموح</h3>
                    <p className="text-lg leading-relaxed text-foreground text-right">
                      طموحنا هو إعادة تعريف طريقة الوصول إلى الاستشارات القانونية عبر منصة إلكترونية متكاملة تضم خبرات متعددة، وتضمن للمستخدمين دقة أعلى، وسرعة أفضل، وتجربة أكثر شفافية.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold text-primary mb-4 text-right">الرؤية</h3>
                    <p className="text-lg leading-relaxed text-foreground text-right">
                      هدف محاميكم إلى أن تكون المنصة القانونية الأولى في السعودية والمنطقة، حيث يجتمع نخبة المحامين لتقديم استشارات قانونية احترافية مع مكتبة قانونية شاملة.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Ivo.ai Style */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" dir="rtl">
            ابدأ الآن مع محاميكم
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto" dir="rtl">
            انضم إلى مئات المستخدمين الذين يثقون بمنصتنا
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              تواصل معنا
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
