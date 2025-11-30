import { useState } from 'react';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';

const Account = () => {
  const [formData, setFormData] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '0501234567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // محاكاة حفظ البيانات
    setTimeout(() => {
      setIsSaving(false);
      alert('تم حفظ التغييرات بنجاح');
    }, 1000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto" dir="rtl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-right">الحساب</h1>
        <p className="text-gray-400 text-right">إدارة معلومات حسابك الشخصي</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-right">المعلومات الشخصية</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-right flex items-center gap-2 justify-end">
                <span>الاسم الكامل</span>
                <User className="w-4 h-4" />
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                dir="rtl"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-right flex items-center gap-2 justify-end">
                <span>البريد الإلكتروني</span>
                <Mail className="w-4 h-4" />
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-right flex items-center gap-2 justify-end">
                <span>رقم الجوال</span>
                <Phone className="w-4 h-4" />
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-right">تغيير كلمة المرور</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-right flex items-center gap-2 justify-end">
                <span>كلمة المرور الحالية</span>
                <Lock className="w-4 h-4" />
              </label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-right flex items-center gap-2 justify-end">
                <span>كلمة المرور الجديدة</span>
                <Lock className="w-4 h-4" />
              </label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-right flex items-center gap-2 justify-end">
                <span>تأكيد كلمة المرور الجديدة</span>
                <Lock className="w-4 h-4" />
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-dark-bg border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-colors font-bold flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          <span>{isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
        </button>
      </form>
    </div>
  );
};

export default Account;
