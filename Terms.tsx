
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <main className="flex-1 bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FileText className="w-12 h-12 text-primary" />
                <h1 className="text-4xl font-bold">شروط الاستخدام</h1>
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
                  مرحباً بك في منصة محاميكم. باستخدامك لهذه المنصة، فإنك توافق على الالتزام بشروط الاستخدام هذه. يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام المنصة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">1. التعريفات</h2>
                <ul className="space-y-2">
                  <li><strong>"المنصة":</strong> تعني موقع محاميكم وجميع خدماته المتاحة عبر lawais.org.sa</li>
                  <li><strong>"المستخدم":</strong> أي شخص يستخدم المنصة أو يصل إلى خدماتها</li>
                  <li><strong>"الخدمات":</strong> جميع الخدمات القانونية والاستشارات والعقود المقدمة عبر المنصة</li>
                  <li><strong>"المحامي":</strong> المحامي المعتمد المسجل في المنصة لتقديم الخدمات القانونية</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">2. الأهلية للاستخدام</h2>
                <p className="leading-relaxed mb-3">لاستخدام المنصة، يجب أن:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>تكون قد بلغت سن 18 عاماً على الأقل</li>
                  <li>تمتلك الأهلية القانونية الكاملة للدخول في عقود ملزمة</li>
                  <li>تقدم معلومات صحيحة ودقيقة عند التسجيل</li>
                  <li>تلتزم بجميع القوانين والأنظمة المعمول بها في المملكة العربية السعودية</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">3. التسجيل والحساب</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">3.1 إنشاء الحساب</h3>
                    <p className="leading-relaxed">
                      عند التسجيل في المنصة، يجب عليك تقديم معلومات دقيقة وكاملة. أنت مسؤول عن الحفاظ على سرية بيانات حسابك وكلمة المرور الخاصة بك.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">3.2 أمان الحساب</h3>
                    <p className="leading-relaxed">
                      أنت مسؤول عن جميع الأنشطة التي تحدث تحت حسابك. يجب عليك إخطارنا فوراً بأي استخدام غير مصرح به لحسابك.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">3.3 إلغاء الحساب</h3>
                    <p className="leading-relaxed">
                      نحتفظ بالحق في تعليق أو إنهاء حسابك إذا انتهكت هذه الشروط أو إذا كان استخدامك للمنصة ضاراً أو غير قانوني.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">4. الخدمات المقدمة</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">4.1 الاستشارات القانونية</h3>
                    <p className="leading-relaxed">
                      نوفر منصة للتواصل بين المستخدمين والمحامين المعتمدين. نحن لا نقدم استشارات قانونية مباشرة، بل نسهل الوصول إلى المحامين المؤهلين.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">4.2 الدردشة الذكية</h3>
                    <p className="leading-relaxed">
                      خدمة الدردشة الذكية المدعومة بالذكاء الاصطناعي هي أداة مساعدة فقط ولا تحل محل الاستشارة القانونية المهنية. يجب استشارة محامٍ مؤهل لأي مسألة قانونية جادة.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">4.3 منشئ العقود</h3>
                    <p className="leading-relaxed">
                      نماذج العقود المقدمة هي نماذج عامة وقد تحتاج إلى تخصيص حسب حالتك. ننصح بمراجعة أي عقد مع محامٍ قبل التوقيع.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">5. الرسوم والدفع</h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <strong>5.1</strong> قد تتطلب بعض الخدمات دفع رسوم. جميع الرسوم موضحة بوضوح قبل استخدام الخدمة.
                  </p>
                  <p className="leading-relaxed">
                    <strong>5.2</strong> جميع المدفوعات تتم عبر بوابات دفع آمنة ومعتمدة.
                  </p>
                  <p className="leading-relaxed">
                    <strong>5.3</strong> الرسوم غير قابلة للاسترداد إلا في حالات محددة وفقاً لسياسة الاسترداد الخاصة بنا.
                  </p>
                  <p className="leading-relaxed">
                    <strong>5.4</strong> نحتفظ بالحق في تعديل الرسوم في أي وقت مع إشعار مسبق.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">6. الاستخدام المقبول</h2>
                <p className="leading-relaxed mb-3">عند استخدام المنصة، توافق على عدم:</p>
                <ul className="list-disc pr-6 space-y-2">
                  <li>انتهاك أي قوانين أو أنظمة محلية أو وطنية أو دولية</li>
                  <li>استخدام المنصة لأي أغراض احتيالية أو غير قانونية</li>
                  <li>نشر أو نقل أي محتوى مسيء أو تشهيري أو مضلل</li>
                  <li>محاولة الوصول غير المصرح به إلى أنظمتنا أو شبكاتنا</li>
                  <li>التدخل في أو تعطيل خدمات المنصة</li>
                  <li>انتحال شخصية أي شخص أو كيان آخر</li>
                  <li>جمع معلومات المستخدمين الآخرين بدون إذن</li>
                  <li>استخدام أي روبوتات أو برامج آلية للوصول إلى المنصة</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">7. الملكية الفكرية</h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <strong>7.1</strong> جميع المحتويات والمواد المتاحة على المنصة، بما في ذلك النصوص والرسومات والشعارات والأيقونات والصور والبرمجيات، هي ملك لمنصة محاميكم أو مرخصة لها.
                  </p>
                  <p className="leading-relaxed">
                    <strong>7.2</strong> لا يجوز لك نسخ أو تعديل أو توزيع أو بيع أو تأجير أي جزء من المنصة أو محتوياتها بدون إذن كتابي مسبق منا.
                  </p>
                  <p className="leading-relaxed">
                    <strong>7.3</strong> أي محتوى تقوم بتحميله أو نشره على المنصة يبقى ملكاً لك، ولكنك تمنحنا ترخيصاً لاستخدامه لتقديم الخدمات.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">8. إخلاء المسؤولية</h2>
                <div className="space-y-3">
                  <p className="leading-relaxed">
                    <strong>8.1</strong> المنصة مقدمة "كما هي" و"حسب التوفر" بدون أي ضمانات من أي نوع.
                  </p>
                  <p className="leading-relaxed">
                    <strong>8.2</strong> نحن لسنا مسؤولين عن جودة أو دقة الخدمات المقدمة من المحامين المستقلين على المنصة.
                  </p>
                  <p className="leading-relaxed">
                    <strong>8.3</strong> لا نضمن أن المنصة ستكون خالية من الأخطاء أو متاحة دون انقطاع.
                  </p>
                  <p className="leading-relaxed">
                    <strong>8.4</strong> لا نتحمل المسؤولية عن أي خسائر أو أضرار ناتجة عن استخدامك للمنصة.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">9. تحديد المسؤولية</h2>
                <p className="leading-relaxed">
                  إلى أقصى حد يسمح به القانون، لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية، بما في ذلك فقدان الأرباح أو البيانات أو الاستخدام، الناتجة عن أو المتعلقة باستخدامك للمنصة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">10. التعويض</h2>
                <p className="leading-relaxed">
                  توافق على تعويضنا والدفاع عنا وحمايتنا من أي مطالبات أو خسائر أو أضرار أو التزامات أو تكاليف (بما في ذلك أتعاب المحاماة) الناشئة عن أو المتعلقة باستخدامك للمنصة أو انتهاكك لهذه الشروط.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">11. السرية</h2>
                <p className="leading-relaxed">
                  نحن ملتزمون بحماية سرية معلوماتك وفقاً لسياسة الخصوصية الخاصة بنا. ومع ذلك، فإن أي اتصالات عبر المنصة قد لا تكون محمية بامتياز السرية بين المحامي والموكل ما لم يتم إنشاء علاقة رسمية.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">12. القانون الحاكم</h2>
                <p className="leading-relaxed">
                  تخضع هذه الشروط وتفسر وفقاً لقوانين المملكة العربية السعودية. أي نزاع ينشأ عن هذه الشروط يخضع للاختصاص الحصري للمحاكم السعودية المختصة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">13. التعديلات على الشروط</h2>
                <p className="leading-relaxed">
                  نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنقوم بإشعارك بأي تغييرات جوهرية عن طريق نشر الشروط المحدثة على المنصة. استمرارك في استخدام المنصة بعد نشر التغييرات يعني قبولك للشروط المعدلة.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">14. الفصل</h2>
                <p className="leading-relaxed">
                  إذا تبين أن أي بند من هذه الشروط غير قابل للتنفيذ أو غير صالح، فإن هذا البند سيتم تعديله وتفسيره لتحقيق أهدافه إلى أقصى حد ممكن، وستبقى الأحكام الأخرى سارية المفعول بالكامل.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4 text-primary">15. الاتفاقية الكاملة</h2>
                <p className="leading-relaxed">
                  تشكل هذه الشروط، جنباً إلى جنب مع سياسة الخصوصية، الاتفاقية الكاملة بينك وبين منصة محاميكم فيما يتعلق باستخدام المنصة، وتحل محل أي اتفاقيات أو تفاهمات سابقة.
                </p>
              </section>

              <section className="bg-primary/5 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-primary">تواصل معنا</h2>
                <p className="leading-relaxed mb-4">
                  إذا كان لديك أي أسئلة حول شروط الاستخدام هذه، يرجى التواصل معنا:
                </p>
                <div className="space-y-2">
                  <p><strong>البريد الإلكتروني:</strong> support@lawais.org.sa</p>
                  <p><strong>الهاتف:</strong> +966 XX XXX XXXX</p>
                  <p><strong>العنوان:</strong> المملكة العربية السعودية</p>
                </div>
              </section>

              <section className="border-t pt-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  بالنقر على "أوافق" أو باستخدام المنصة، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام بشروط الاستخدام هذه.
                </p>
              </section>
            </div>
          </div>
        </div>
    </main>
  );
}
