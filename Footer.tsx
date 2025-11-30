import { Mail, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto border-t border-primary/20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div dir="rtl">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo-white.png" 
                alt="محاميكم" 
                className="h-14 w-14 object-contain"
              />
              <span className="text-xl font-bold">محاميكم</span>
            </div>
            <p className="text-sm opacity-90 leading-relaxed text-right">
              منصة قانونية سعودية تربطك بمحامين معتمدين وتوفر مكتبة شاملة من القوانين والأنظمة ومقالات قانونية متخصصة
            </p>
          </div>

          {/* Quick Links */}
          <div dir="rtl">
            <h3 className="text-lg font-bold mb-4 text-right">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-right">
              <li>
                <Link href="/about">
                  <span className="hover:text-accent-foreground transition-colors cursor-pointer">عن المنصة</span>
                </Link>
              </li>

              <li>
                <Link href="/library">
                  <span className="hover:text-accent-foreground transition-colors cursor-pointer">المكتبة القانونية</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-accent-foreground transition-colors cursor-pointer">تواصل معنا</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <span className="hover:text-accent-foreground transition-colors cursor-pointer">سياسة الخصوصية</span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="hover:text-accent-foreground transition-colors cursor-pointer">شروط الاستخدام</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div dir="rtl">
            <h3 className="text-lg font-bold mb-4 text-right">تواصل معنا</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@lawais.org" className="hover:text-accent-foreground transition-colors">
                  info@lawais.org
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+966531099732" className="hover:text-accent-foreground transition-colors" dir="ltr">
                  +966 531 099 732
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <a 
                  href="https://www.linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>© {new Date().getFullYear()} محاميكم. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}
