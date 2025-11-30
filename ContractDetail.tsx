import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowRight, Download, FileText, Edit, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContractDetail() {
  const [, params] = useRoute("/contracts/:id");
  const contractId = params?.id;

  // بيانات تجريبية (سيتم استبدالها بـ API)
  const contract = {
    id: contractId,
    title: "عقد بيع وشراء عقار",
    titleAr: "عقد بيع وشراء عقار",
    category: "عقود عقارية",
    source: "saudi",
    description: "نموذج عقد بيع وشراء عقار متوافق مع النظام السعودي ونظام الإيجار",
    tags: ["عقار", "بيع", "شراء", "ملكية"],
    content: `
# عقد بيع وشراء عقار

## البيانات الأساسية

**التاريخ:** {{contract_date}}
**المكان:** {{contract_location}}

## الطرف الأول (البائع)

**الاسم:** {{seller_name}}
**رقم الهوية:** {{seller_id}}
**العنوان:** {{seller_address}}
**رقم الجوال:** {{seller_phone}}

## الطرف الثاني (المشتري)

**الاسم:** {{buyer_name}}
**رقم الهوية:** {{buyer_id}}
**العنوان:** {{buyer_address}}
**رقم الجوال:** {{buyer_phone}}

## وصف العقار

**نوع العقار:** {{property_type}}
**الموقع:** {{property_location}}
**المساحة:** {{property_area}} متر مربع
**رقم الصك:** {{property_deed_number}}
**تاريخ الصك:** {{property_deed_date}}

## الشروط المالية

**قيمة البيع:** {{sale_price}} ريال سعودي
**المبلغ المدفوع مقدماً:** {{advance_payment}} ريال سعودي
**المبلغ المتبقي:** {{remaining_amount}} ريال سعودي
**تاريخ السداد النهائي:** {{final_payment_date}}

## الشروط والأحكام

1. يقر البائع بأنه المالك الشرعي للعقار وأن العقار خالٍ من أي رهونات أو حقوق للغير.
2. يلتزم البائع بتسليم العقار للمشتري في حالة جيدة وخالية من أي عيوب.
3. يلتزم المشتري بسداد كامل المبلغ المتفق عليه في المواعيد المحددة.
4. يتحمل المشتري جميع الرسوم والضرائب المترتبة على نقل الملكية.
5. في حالة عدم التزام أي من الطرفين بالشروط، يحق للطرف الآخر المطالبة بالتعويض.

## التوقيعات

**الطرف الأول (البائع):**
الاسم: _______________
التوقيع: _______________
التاريخ: _______________

**الطرف الثاني (المشتري):**
الاسم: _______________
التوقيع: _______________
التاريخ: _______________

**الشهود:**
1. الاسم: _______________ التوقيع: _______________
2. الاسم: _______________ التوقيع: _______________
`,
    fields: [
      { name: "contract_date", label: "تاريخ العقد", type: "date", required: true },
      { name: "contract_location", label: "مكان التعاقد", type: "text", required: true },
      { name: "seller_name", label: "اسم البائع", type: "text", required: true },
      { name: "seller_id", label: "رقم هوية البائع", type: "text", required: true },
      { name: "seller_address", label: "عنوان البائع", type: "text", required: true },
      { name: "seller_phone", label: "جوال البائع", type: "tel", required: true },
      { name: "buyer_name", label: "اسم المشتري", type: "text", required: true },
      { name: "buyer_id", label: "رقم هوية المشتري", type: "text", required: true },
      { name: "buyer_address", label: "عنوان المشتري", type: "text", required: true },
      { name: "buyer_phone", label: "جوال المشتري", type: "tel", required: true },
      { name: "property_type", label: "نوع العقار", type: "select", options: ["شقة", "فيلا", "أرض", "محل تجاري"], required: true },
      { name: "property_location", label: "موقع العقار", type: "text", required: true },
      { name: "property_area", label: "مساحة العقار (م²)", type: "number", required: true },
      { name: "property_deed_number", label: "رقم الصك", type: "text", required: true },
      { name: "property_deed_date", label: "تاريخ الصك", type: "date", required: true },
      { name: "sale_price", label: "قيمة البيع (ريال)", type: "number", required: true },
      { name: "advance_payment", label: "المبلغ المدفوع مقدماً (ريال)", type: "number", required: true },
      { name: "remaining_amount", label: "المبلغ المتبقي (ريال)", type: "number", required: true },
      { name: "final_payment_date", label: "تاريخ السداد النهائي", type: "date", required: true },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12">
        <div className="container">
          <Link href="/contracts">
            <Button variant="ghost" className="text-white hover:bg-blue-800 mb-4">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة إلى المكتبة
            </Button>
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{contract.titleAr}</h1>
              <div className="flex gap-3 mb-4">
                <Badge className="bg-green-600 text-white">
                  {contract.source === "saudi" ? "سعودي" : "معاد صياغته"}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  {contract.category}
                </Badge>
              </div>
              <p className="text-blue-100 max-w-2xl">{contract.description}</p>
            </div>
            <FileText className="h-16 w-16 text-blue-300" />
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="preview">معاينة العقد</TabsTrigger>
                  <TabsTrigger value="fields">الحقول المطلوبة</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="space-y-4">
                  <div className="prose prose-slate max-w-none">
                    <div className="bg-white border rounded-lg p-8 shadow-sm">
                      <pre className="whitespace-pre-wrap font-sans text-right leading-relaxed">
                        {contract.content}
                      </pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="fields" className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-900">
                      <strong>ملاحظة:</strong> هذا العقد يحتوي على {contract.fields.length} حقل
                      قابل للتعبئة. استخدم منشئ العقود لملء هذه الحقول تلقائياً.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {contract.fields.map((field, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                      >
                        <div>
                          <span className="font-medium text-gray-900">{field.label}</span>
                          {field.required && (
                            <span className="text-red-500 mr-1">*</span>
                          )}
                        </div>
                        <Badge variant="outline">{field.type}</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* الشريط الجانبي */}
          <div className="space-y-6">
            {/* أزرار الإجراءات */}
            <Card className="p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">إجراءات</h3>
              <div className="space-y-3">
                <Link href={`/contract-builder/${contract.id}`} className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Edit className="ml-2 h-4 w-4" />
                    إنشاء عقد من هذا النموذج
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  <Download className="ml-2 h-4 w-4" />
                  تحميل النموذج (PDF)
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="ml-2 h-4 w-4" />
                  مشاركة
                </Button>
              </div>
            </Card>

            {/* معلومات العقد */}
            <Card className="p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">معلومات العقد</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">التصنيف:</span>
                  <span className="font-medium mr-2">{contract.category}</span>
                </div>
                <div>
                  <span className="text-gray-600">المصدر:</span>
                  <span className="font-medium mr-2">
                    {contract.source === "saudi" ? "سعودي" : "معاد صياغته"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">عدد الحقول:</span>
                  <span className="font-medium mr-2">{contract.fields.length}</span>
                </div>
              </div>
            </Card>

            {/* الوسوم */}
            <Card className="p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">الوسوم</h3>
              <div className="flex flex-wrap gap-2">
                {contract.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
