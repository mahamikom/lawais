import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="py-20">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              تواصل معنا
            </h1>
            <p className="text-xl text-muted-foreground">
              نحن هنا للإجابة على استفساراتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">البريد الإلكتروني</h3>
                  <a href="mailto:info@lawais.org" className="text-primary hover:underline">
                    info@lawais.org
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">الهاتف</h3>
                  <a href="tel:+966531099732" className="text-primary hover:underline" dir="ltr">
                    +966 531 099 732
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">الموقع</h3>
                  <p className="text-muted-foreground">
                    المملكة العربية السعودية
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
