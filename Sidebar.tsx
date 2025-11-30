import { Link, useLocation } from 'wouter';
import {
  FileText,
  MessageSquare,
  AlertCircle,
  Search,
  User,
  CreditCard,
  FolderOpen,
  Receipt,
  Users,
  Info,
  Mail,
  Moon,
  Sun,
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [location] = useLocation();
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const menuItems = [
    { path: '/', icon: FileText, label: 'الرئيسية' },
    { path: '/contracts', icon: FileText, label: 'نماذج العقود' },
    { path: '/consultations', icon: MessageSquare, label: 'الاستشارات القانونية' },
    { path: '/complaints', icon: AlertCircle, label: 'نظام الشكاوى' },
    { path: '/search', icon: Search, label: 'البحث القانوني' },
    { path: '/library', icon: FolderOpen, label: 'مكتبة المستندات' },
    { path: '/assistants', icon: Users, label: 'المساعدون' },
    { path: '/account', icon: User, label: 'الحساب' },
    { path: '/pricing', icon: CreditCard, label: 'الخطط والأسعار' },
    { path: '/invoices', icon: Receipt, label: 'الفواتير' },
    { path: '/about', icon: Info, label: 'عن المنصة' },
    { path: '/contact', icon: Mail, label: 'تواصل معنا' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-card border-l border-dark-border overflow-y-auto scrollbar-hide">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">المنصة القانونية</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-dark-hover transition-colors"
            title={isDark ? 'التبديل إلى الوضع المضيء' : 'التبديل إلى الوضع الداكن'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.path} href={item.path}>
                <a
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-dark-hover hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
