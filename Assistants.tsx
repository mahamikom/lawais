import { Bot, Plus } from 'lucide-react';

const Assistants = () => {
  const assistants = [
    { id: 1, name: 'مساعد العقود', description: 'متخصص في مراجعة وصياغة العقود', color: 'bg-blue-500' },
    { id: 2, name: 'مساعد الاستشارات', description: 'يقدم استشارات قانونية عامة', color: 'bg-green-500' },
    { id: 3, name: 'مساعد البحث', description: 'متخصص في البحث القانوني', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-right">المساعدون</h1>
        <p className="text-gray-400 text-right">أدر مساعديك الذكيين</p>
      </div>

      <div className="flex justify-end mb-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>إضافة مساعد جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assistants.map((assistant) => (
          <div
            key={assistant.id}
            className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-blue-500 transition-all"
          >
            <div className={`w-16 h-16 ${assistant.color} rounded-full flex items-center justify-center mb-4`}>
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-right">{assistant.name}</h3>
            <p className="text-gray-400 mb-4 text-right">{assistant.description}</p>
            <button className="w-full bg-dark-hover hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
              فتح المساعد
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assistants;
