
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <main className="flex-1 bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-12 h-12 text-primary" />
                <h1 className="text-4xl font-bold">سياسة الخصوصية</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
              </p>
            </div>

            {/* Content */}
            <div className="bg-card rounded-lg shadow-lg p-8 md:p-12 space-y-8" dir="rtl">
              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">مقدمة</h2>
                <p className="text-lg leading-relaxed">
                  نحن في منصة محاميكم نلتزم بحماية خصوصيتك وأمان بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا للمعلومات التي تقدمها لنا عند استخدام منصتنا.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">المعلومات التي نجمعها</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">1. المعلومات الشخصية</h3>
                    <p className="leading-relaxed">
                      عند التسجيل في المنصة أو استخدام خدماتنا، قد نجمع المعلومات التالية:
                    </p>
                    <ul className="list-disc pr-6 mt-2 space-y-1">
                      <li>الاسم الكامل</li>
                      <li>عنوان البريد الإلكتروني</li>
                      <li>رقم الهاتف</li>
                      <li>رقم الهوية الوطنية (عند الحاجة)</li>
                      <li>معلومات الدفع (تُعالج بشكل آمن عبر بوابات دفع معتمدة)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">2. المعلومات القانونية</h3>
                    <p className="leading-relaxed">
                      عند استخدام خدماتنا القانونية، قد نجمع:
                    </p>
                    <ul className="list-disc pr-6 mt-2 space-y-1">
                      <li>تفاصيل القضايا والاستشارات القانونية</li>
                      <li>المستندات والعقود المرفوعة</li>
                      <li>محادثات الدردشة مع المحامين</li>
                      <li>سجل الخدمات المستخدمة</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">3. المعلومات التقنية</h3>
                    <p className="leading-relaxed">
                      نجمع تلقائياً بعض المعلومات عند زيارتك للمنصة:
                    </p>
                    <ul className="list-disc pr-6 mt-2 space-y-1">
                      <li>عنوان IP</li>
                      <li>نوع المتصفح والجهاز</li>
                      <li>نظام التشغيل</li>
                      <li>الصفحات التي تزورها</li>
                      <li>الوقت المستغرق في كل صفحة</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">كيفية استخدام المعلومات</h2>
                <p className="leading-relaxed mb-3">نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>تقديم الخدمات القانونية المطلوبة</li>
                  <li>تحسين جودة خدماتنا وتطوير المنصة</li>
                  <li>التواصل معك بخصوص خدماتك وطلباتك</li>
                  <li>معالجة المدفوعات والفواتير</li>
                  <li>الامتثال للمتطلبات القانونية والتنظيمية</li>
                  <li>حماية المنصة من الاحتيال والاستخدام غير المشروع</li>
                  <li>إرسال إشعارات وتحديثات مهمة</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">حماية البيانات</h2>
                <p className="leading-relaxed mb-3">
                  نتخذ إجراءات أمنية صارمة لحماية بياناتك:
                </p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>تشفير البيانات باستخدام بروتوكولات SSL/TLS</li>
                  <li>تخزين آمن للبيانات في خوادم محمية</li>
                  <li>الوصول المحدود للبيانات فقط للموظفين المصرح لهم</li>
                  <li>مراقبة مستمرة للأنظمة للكشف عن أي اختراقات أمنية</li>
                  <li>نسخ احتياطي منتظم للبيانات</li>
                  <li>سياسات صارمة لإدارة كلمات المرور</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">مشاركة المعلومات</h2>
                <p className="leading-relaxed mb-3">
                  نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط في الحالات التالية:
                </p>
                <ul className="list-disc pr-6 space-y-2">
                  <li><strong>المحامون المعتمدون:</strong> لتقديم الخدمات القانونية المطلوبة</li>
                  <li><strong>مقدمو الخدمات:</strong> الذين يساعدوننا في تشغيل المنصة (مثل معالجات الدفع)</li>
                  <li><strong>الجهات القانونية:</strong> عند الطلب من السلطات المختصة أو للامتثال للقوانين</li>
                  <li><strong>حماية الحقوق:</strong> لحماية حقوقنا أو حقوق المستخدمين الآخرين</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">حقوقك</h2>
                <p className="leading-relaxed mb-3">لديك الحقوق التالية فيما يتعلق ببياناتك:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li><strong>الوصول:</strong> يمكنك طلب نسخة من بياناتك الشخصية</li>
                  <li><strong>التصحيح:</strong> يمكنك تحديث أو تصحيح معلوماتك</li>
                  <li><strong>الحذف:</strong> يمكنك طلب حذف بياناتك (مع مراعاة الالتزامات القانونية)</li>
                  <li><strong>الاعتراض:</strong> يمكنك الاعتراض على معالجة بياناتك في حالات معينة</li>
                  <li><strong>النقل:</strong> يمكنك طلب نقل بياناتك إلى خدمة أخرى</li>
                  <li><strong>الانسحاب:</strong> يمكنك سحب موافقتك على معالجة بياناتك في أي وقت</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">ملفات تعريف الارتباط (Cookies)</h2>
                <p className="leading-relaxed">
                  نستخدم ملفات تعريف الارتباط لتحسين تجربتك على المنصة. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك. علماً بأن تعطيل بعض ملفات تعريف الارتباط قد يؤثر على وظائف المنصة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">الاحتفاظ بالبيانات</h2>
                <p className="leading-relaxed">
                  نحتفظ ببياناتك الشخصية طالما كان حسابك نشطاً أو حسب الحاجة لتقديم الخدمات. قد نحتفظ ببعض البيانات لفترة أطول للامتثال للالتزامات القانونية أو لحل النزاعات أو لإنفاذ اتفاقياتنا.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">خصوصية الأطفال</h2>
                <p className="leading-relaxed">
                  منصتنا غير موجهة للأطفال دون سن 18 عاماً. نحن لا نجمع عن قصد معلومات شخصية من الأطفال. إذا علمنا أننا جمعنا معلومات من طفل دون موافقة والدية، سنتخذ خطوات لحذف تلك المعلومات.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">التغييرات على سياسة الخصوصية</h2>
                <p className="leading-relaxed">
                  قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإشعارك بأي تغييرات جوهرية عن طريق نشر السياسة الجديدة على هذه الصفحة وتحديث تاريخ "آخر تحديث" أعلاه. ننصحك بمراجعة هذه الصفحة بشكل دوري.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">الامتثال للأنظمة السعودية</h2>
                <p className="leading-relaxed">
                  نلتزم بجميع الأنظمة واللوائح السعودية المتعلقة بحماية البيانات والخصوصية، بما في ذلك نظام حماية البيانات الشخصية الصادر عن هيئة الحكومة الرقمية في المملكة العربية السعودية.
                </p>
              </section>

              <section className="bg-primary/5 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-primary">تواصل معنا</h2>
                <p className="leading-relaxed mb-4">
                  إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه أو ممارساتنا المتعلقة بالبيانات، يرجى التواصل معنا:
                </p>
                <div className="space-y-2">
                  <p><strong>البريد الإلكتروني:</strong> privacy@lawais.org.sa</p>
                  <p><strong>الهاتف:</strong> +966 XX XXX XXXX</p>
                  <p><strong>العنوان:</strong> المملكة العربية السعودية</p>
                </div>
              </section>
            </div>
          </div>
        </div>
    </main>
  );
}
