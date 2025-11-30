import { useState } from 'react';
import { Send, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

interface GovernmentEntity {
  name: string;
  url: string;
  description: string;
}

const Complaints = () => {
  const [step, setStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    complaint: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedEntity, setSuggestedEntity] = useState<GovernmentEntity | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // محاكاة تحليل الشكوى (سيتم استبدالها بـ FlowHunt API)
    setTimeout(() => {
      // مثال على الجهات الحكومية
      const entities: GovernmentEntity[] = [
        {
          name: 'وزارة التجارة',
          url: 'https://mc.gov.sa',
          description: 'مختصة بالشكاوى التجارية والاستهلاكية',
        },
        {
          name: 'وزارة الاتصالات وتقنية المعلومات',
          url: 'https://mcit.gov.sa',
          description: 'مختصة بشكاوى الاتصالات والخدمات التقنية',
        },
        {
          name: 'وزارة العدل',
          url: 'https://moj.gov.sa',
          description: 'مختصة بالشكاوى القضائية والحقوقية',
        },
        {
          name: 'هيئة الكهرباء والمياه',
          url: 'https://www.wec.gov.sa',
          description: 'مختصة بشكاوى الكهرباء والمياه',
        },
      ];

      // اختيار جهة عشوائية للتوضيح (سيتم استبدالها بتحليل AI)
      const randomEntity = entities[Math.floor(Math.random() * entities.length)];
      setSuggestedEntity(randomEntity);
      setIsAnalyzing(false);
      setStep('result');
    }, 2000);
  };

  const handleReset = () => {
    setStep('form');
    setFormData({ name: '', email: '', phone: '', complaint: '' });
    setSuggestedEntity(null);
  };

  if (step === 'result' && suggestedEntity) {
    return (
      <div className="p-8 max-w-4xl mx-auto" dir="rtl">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 transform rotate-180" />
          <span>رجوع</span>
        </button>

        <div className="bg-green-900/20 border border-green-500 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-bold text-right">تم تحليل الشكوى بنجاح</h2>
          </div>
          <p className="text-gray-300 text-right">
            بناءً على تحليل الذكاء الاصطناعي لشكواك، تم تحديد الجهة المختصة
          </p>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4 text-right">الجهة المختصة</h3>
          
          <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-6 mb-6">
            <h4 className="text-xl font-bold mb-2 text-right">{suggestedEntity.name}</h4>
            <p className="text-gray-400 mb-4 text-right">{suggestedEntity.description}</p>
            <a
              href={suggestedEntity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-right block"
            >
              {suggestedEntity.url}
            </a>
          </div>

          <div className="bg-dark-bg rounded-lg p-6 mb-6">
            <h4 className="text-lg font-bold mb-3 text-right">نص الشكوى</h4>
            <p className="text-gray-300 whitespace-pre-wrap text-right">{formData.complaint}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => window.open(suggestedEntity.url, '_blank')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-bold"
            >
              الانتقال إلى موقع الجهة
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-dark-hover hover:bg-gray-700 text-white py-3 rounded-lg transition-colors font-bold"
            >
              تقديم شكوى جديدة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto" dir="rtl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-right">نظام توجيه الشكاوى الذكي</h1>
        <p className="text-gray-400 text-right">
          اكتب شكواك وسيقوم الذكاء الاصطناعي بتحليلها وتوجيهك للجهة الحكومية المختصة
        </p>
      </div>

      <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
          <div className="text-right">
            <h3 className="font-bold mb-2">كيف يعمل النظام؟</h3>
            <ol className="text-gray-300 space-y-2 list-decimal list-inside">
              <li>اكتب تفاصيل شكواك في الحقل المخصص</li>
              <li>سيقوم الذكاء الاصطناعي بتحليل المحتوى</li>
              <li>سيتم تحديد الجهة الحكومية المختصة تلقائياً</li>
              <li>ستحصل على رابط مباشر لموقع الجهة مع نص الشكوى جاهز</li>
            </ol>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-border rounded-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-right">الاسم الكامل</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="أدخل اسمك الكامل"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-right">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="example@email.com"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-right">رقم الجوال</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="05xxxxxxxx"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-right">تفاصيل الشكوى</label>
            <textarea
              required
              value={formData.complaint}
              onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
              className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
              rows={8}
              placeholder="اكتب تفاصيل شكواك بشكل واضح ومفصل..."
              dir="rtl"
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-colors font-bold flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري التحليل...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>تحليل الشكوى وتحديد الجهة المختصة</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Complaints;
