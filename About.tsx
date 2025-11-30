import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award } from "lucide-react";

export default function About() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              عن منصة محاميكم
            </h1>
            <p className="text-xl text-muted-foreground">
              نظام قانوني تقني مطور يجمع بين الخبرة القانونية والتقنية الحديثة
            </p>
          </div>

          {/* Main Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Target className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">رفع الجودة</h3>
                <p className="text-muted-foreground">
                  تقديم استشارات دقيقة عبر أكثر من محامٍ متخصص
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Eye className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">تسريع الإجراءات</h3>
                <p className="text-muted-foreground">
                  تقليل الوقت والجهد على العملاء والمحامين
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Award className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold">تمكين المحامين</h3>
                <p className="text-muted-foreground">
                  توفير مساحة للعمل التعاوني ونظام تقني يدعم أداءهم اليومي
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CEO Section */}
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0">
                  <img 
                    src="/images/ceo.jpg" 
                    alt="إبراهيم الحماد" 
                    className="w-48 h-48 rounded-full object-cover border-4 border-primary/20"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold text-primary mb-2">
                      إبراهيم الحماد
                    </h2>
                    <p className="text-xl text-muted-foreground">
                      الرئيس التنفيذي
                    </p>
                  </div>
                  <p className="text-lg leading-relaxed">
                    محامي يمتلك خبرة واسعة في حوكمة الشركات، إدارة المخاطر، والامتثال القانوني
                  </p>
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold">حاصل على بكالوريوس الشريعة</p>
                      <p className="text-sm text-muted-foreground">جامعة الإمام محمد بن سعود الإسلامية</p>
                    </div>
                    <div className="pt-2">
                      <p className="font-semibold">الشهادات المهنية:</p>
                      <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                        <li>• مسؤول حوكمة الشركات (ICCGO)</li>
                        <li>• إدارة المخاطر (GRC)</li>
                        <li>• إدارة المشاريع (PMP)</li>
                        <li>• نظم الجودة (QMS ISO 9001:2015)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vision Section */}
          <Card>
            <CardContent className="p-8 space-y-6" dir="rtl">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3 text-right">الهدف</h3>
                <p className="text-lg leading-relaxed text-right">
                  تسهيل وصول الأفراد والشركات إلى أفضل الخدمات القانونية من خلال ربطهم مباشرة بمحامين محترفين يعملون كفريق واحد داخل منصة موحّدة.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3 text-right">الطموح</h3>
                <p className="text-lg leading-relaxed text-right">
                  طموحنا هو إعادة تعريف طريقة الوصول إلى الاستشارات القانونية عبر بيئة تعاونية تضم خبرات متعددة، وتضمن للمستخدمين دقة أعلى، وسرعة أفضل، وتجربة أكثر شفافية.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3 text-right">الرؤية</h3>
                <p className="text-lg leading-relaxed text-right">
                  هدف محاميكم إلى أن تكون المنصة القانونية الأولى في السعودية والمنطقة، حيث يجتمع نخبة المحامين لتقديم استشارات قانونية احترافية مدعومة بالتقنية والذكاء الاصطناعي.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
