import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const navigation = [
    { name: "الرئيسية", href: "/" },
    { name: "عن المنصة", href: "/about" },
    { name: "المقالات", href: "/articles" },
    { name: "المحامين المعتمدين", href: "/lawyers" },
    { name: "المكتبة", href: "/library" },
    { name: "تواصل معنا", href: "/contact" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img 
                src="/logo-new.png" 
                alt="محاميكم" 
                className="h-16 w-16 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-foreground">محاميكم</span>
                <span className="text-xs text-muted-foreground">منصة قانونية</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className="text-sm hover:text-primary transition-colors cursor-pointer font-medium text-foreground">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden xl:flex items-center gap-3">
            <a href={getLoginUrl()}>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                تسجيل الدخول
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden pb-4 space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <div 
                  className="block py-2 px-4 hover:bg-secondary rounded cursor-pointer text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </div>
              </Link>
            ))}
            <div className="pt-2 px-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button variant="secondary" size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    لوحة التحكم
                  </Button>
                </Link>
              ) : (
                <a href={getLoginUrl()}>
                  <Button variant="secondary" size="sm" className="w-full">
                    تسجيل الدخول
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
