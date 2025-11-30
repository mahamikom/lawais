import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FileText, Download, Printer, ChevronRight } from "lucide-react";

type ContractType = "sale" | "service" | "rent" | "employment" | "";

interface ContractField {
  id: string;
  label: string;
  type: "text" | "textarea" | "date" | "number";
  placeholder?: string;
  required?: boolean;
}

const contractTemplates: Record<string, { title: string; fields: ContractField[] }> = {
  sale: {
    title: "عقد بيع وشراء",
    fields: [
      { id: "sellerName", label: "اسم البائع", type: "text", required: true },
      { id: "sellerID", label: "رقم هوية البائع", type: "text", required: true },
      { id: "buyerName", label: "اسم المشتري", type: "text", required: true },
      { id: "buyerID", label: "رقم هوية المشتري", type: "text", required: true },
      { id: "itemDescription", label: "وصف المبيع", type: "textarea", required: true },
      { id: "price", label: "السعر (ريال)", type: "number", required: true },
      { id: "date", label: "تاريخ العقد", type: "date", required: true },
      { id: "location", label: "مكان التوقيع", type: "text", required: true },
    ],
  },
  service: {
    title: "عقد خدمات",
    fields: [
      { id: "providerName", label: "اسم مقدم الخدمة", type: "text", required: true },
      { id: "providerID", label: "رقم هوية مقدم الخدمة", type: "text", required: true },
      { id: "clientName", label: "اسم العميل", type: "text", required: true },
      { id: "clientID", label: "رقم هوية العميل", type: "text", required: true },
      { id: "serviceDescription", label: "وصف الخدمة", type: "textarea", required: true },
      { id: "duration", label: "مدة الخدمة", type: "text", placeholder: "مثال: 6 أشهر", required: true },
      { id: "amount", label: "قيمة العقد (ريال)", type: "number", required: true },
      { id: "startDate", label: "تاريخ البدء", type: "date", required: true },
    ],
  },
  rent: {
    title: "عقد إيجار",
    fields: [
      { id: "landlordName", label: "اسم المؤجر", type: "text", required: true },
      { id: "landlordID", label: "رقم هوية المؤجر", type: "text", required: true },
      { id: "tenantName", label: "اسم المستأجر", type: "text", required: true },
      { id: "tenantID", label: "رقم هوية المستأجر", type: "text", required: true },
      { id: "propertyDescription", label: "وصف العقار", type: "textarea", required: true },
      { id: "propertyAddress", label: "عنوان العقار", type: "text", required: true },
      { id: "rentAmount", label: "قيمة الإيجار السنوي (ريال)", type: "number", required: true },
      { id: "startDate", label: "تاريخ بدء الإيجار", type: "date", required: true },
      { id: "duration", label: "مدة الإيجار", type: "text", placeholder: "مثال: سنة واحدة", required: true },
    ],
  },
  employment: {
    title: "عقد عمل",
    fields: [
      { id: "employerName", label: "اسم صاحب العمل", type: "text", required: true },
      { id: "companyName", label: "اسم الشركة/المؤسسة", type: "text", required: true },
      { id: "employeeName", label: "اسم الموظف", type: "text", required: true },
      { id: "employeeID", label: "رقم هوية الموظف", type: "text", required: true },
      { id: "jobTitle", label: "المسمى الوظيفي", type: "text", required: true },
      { id: "salary", label: "الراتب الشهري (ريال)", type: "number", required: true },
      { id: "startDate", label: "تاريخ بدء العمل", type: "date", required: true },
      { id: "workLocation", label: "مكان العمل", type: "text", required: true },
    ],
  },
};

export default function Contracts() {
  const [selectedType, setSelectedType] = useState<ContractType>("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGeneratePreview = () => {
    if (!selectedType) return;
    const template = contractTemplates[selectedType];
    const allRequired = template.fields
      .filter((f) => f.required)
      .every((f) => formData[f.id]?.trim());
    
    if (!allRequired) {
      alert("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate a proper PDF
    // For now, we'll trigger the print dialog
    window.print();
  };

  const renderContractPreview = () => {
    if (!selectedType || !showPreview) return null;
    const template = contractTemplates[selectedType];

    return (
      <div className="bg-white text-black p-8 rounded-lg shadow-lg print:shadow-none" dir="rtl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{template.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="space-y-6 text-right leading-relaxed">
          {selectedType === "sale" && (
            <>
              <p className="text-lg">
                إنه في يوم <strong>{formData.date}</strong> الموافق <strong>{new Date(formData.date).toLocaleDateString("ar-SA")}</strong>
              </p>
              <p>
                تم الاتفاق بين كل من:
              </p>
              <p>
                <strong>الطرف الأول (البائع):</strong> {formData.sellerName}، رقم الهوية: {formData.sellerID}
              </p>
              <p>
                <strong>الطرف الثاني (المشتري):</strong> {formData.buyerName}، رقم الهوية: {formData.buyerID}
              </p>
              <p className="mt-6">
                <strong>موضوع العقد:</strong>
              </p>
              <p className="pr-4">
                يقر الطرف الأول ببيعه للطرف الثاني ما يلي: {formData.itemDescription}
              </p>
              <p className="mt-4">
                <strong>قيمة البيع:</strong> {formData.price} ريال سعودي فقط لا غير.
              </p>
              <p className="mt-6">
                وقد تم تحرير هذا العقد في {formData.location} بتاريخ {formData.date}
              </p>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <p className="font-bold">الطرف الأول (البائع)</p>
                  <p className="mt-2">الاسم: {formData.sellerName}</p>
                  <p className="mt-8 border-t border-gray-400 pt-2">التوقيع</p>
                </div>
                <div>
                  <p className="font-bold">الطرف الثاني (المشتري)</p>
                  <p className="mt-2">الاسم: {formData.buyerName}</p>
                  <p className="mt-8 border-t border-gray-400 pt-2">التوقيع</p>
                </div>
              </div>
            </>
          )}

          {selectedType === "service" && (
            <>
              <p className="text-lg">
                تم الاتفاق بتاريخ <strong>{formData.startDate}</strong> بين كل من:
              </p>
              <p>
                <strong>الطرف الأول (مقدم الخدمة):</strong> {formData.providerName}، رقم الهوية: {formData.providerID}
              </p>
              <p>
                <strong>الطرف الثاني (العميل):</strong> {formData.clientName}، رقم الهوية: {formData.clientID}
              </p>
              <p className="mt-6">
                <strong>موضوع العقد:</strong>
              </p>
              <p className="pr-4">
                يتعهد الطرف الأول بتقديم الخدمات التالية للطرف الثاني: {formData.serviceDescription}
              </p>
              <p className="mt-4">
                <strong>مدة العقد:</strong> {formData.duration}
              </p>
              <p className="mt-4">
                <strong>قيمة العقد:</strong> {formData.amount} ريال سعودي
              </p>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <p className="font-bold">الطرف الأول</p>
                  <p className="mt-2">الاسم: {formData.providerName}</p>
                  <p className="mt-8 border-t border-gray-400 pt-2">التوقيع</p>
                </div>
                <div>
                  <p className="font-bold">الطرف الثاني</p>
                  <p className="mt-2">الاسم: {formData.clientName}</p>
                  <p className="mt-8 border-t border-gray-400 pt-2">التوقيع</p>
                </div>
              </div>
            </>
          )}

          {selectedType === "rent" && (
            <>
              <p className="text-lg">
                تم الاتفاق بتاريخ <strong>{formData.startDate}</strong> بين كل من:
              </p>
              <p>
                <strong>الطرف الأول (المؤجر):</strong> {formData.landlordName}، رقم الهوية: {formData.landlordID}
              </p>
              <p>
                <strong>الطرف الثاني (المستأجر):</strong> {formData.tenantName}، رقم الهوية: {formData.tenantID}
              </p>
              <p className="mt-6">
                <strong>موضوع العقد:</strong>
              </p>
              <p className="pr-4">
                يقر الطرف الأول بتأجيره للطرف الثاني العقار التالي: {formData.propertyDescription}
              </p>
              <p className="mt-4">
                <strong>عنوان العقار:</strong> {formData.propertyAddress}
              </p>
              <p className="mt-4">
                <strong>قيمة الإيجار السنوي:</strong> {formData.rentAmount} ريال سعودي
              </p>
              <p className="mt-4">
                <strong>مدة الإيجار:</strong> {formData.duration}
              </p>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <p className="font-bold">الطرف الأول (المؤجر)</p>
                  <p className="mt-2">الاسم: {formData.landlordName}</p>
                  <p className="mt-8 border-t border-gray-400 pt-2">التوقيع</p>
                </div>
                <div>
                  <p className="font-bold">الطرف الثاني (المستأجر)</p>
                  <p className="mt-2">الاسم: {formData.tenantName}</p>
                  <p className="mt-8 border-t border-gray-400 pt-2">التوقيع</p>
                </div>
              </div>
            </>
          )}

          {selectedType === "employment" && (
            <>
              <p className="text-lg">
                تم الاتفاق بتاريخ <strong>{formData.startDate}</strong> بين كل من:
              </p>
              <p>
                <strong>الطرف الأول (صاحب العمل):</strong> {formData.employerName} - {formData.companyName}
              </p>
              <p>
                <strong>الطرف الثاني (الموظف):</strong> {formData.employeeName}، رقم الهوية: {formData.employeeID}
              </p>
              <p className="mt-6">
                <strong>موضوع العقد:</strong>
              </p>
              <p className="pr-4">
                يتعهد الطرف الثاني بالعمل لدى الطرف الأول في وظيفة: <strong>{formData.jobTitle}</strong>
              </p>
              <p className="mt-4">
                <strong>مكان العمل:</strong> {formData.workLocation}
              </p>
              <p className="mt-4">
                <strong>الراتب الشهري:</strong> {formData.salary} ريال سعودي
              </p>
              <p className="mt-4">
                <strong>تاريخ بدء العمل:</strong> {formData.startDate}
              </p>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <p className="font-bold">الطرف الأول (صاحب العمل)</p>
                  <p className="mt-2">الاسم: {formData.employerName}</p>
                  <p className="mt-8 border-t border-gray-400 pt-2">التوقيع</p>
                </div>
                <div>
                  <p className="font-bold">الطرف الثاني (الموظف)</p>
                  <p className="mt-2">الاسم: {formData.employeeName}</p>
                  <p className="mt-8 border-t border-gray-400 pt-2">التوقيع</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
    <main className="flex-1 bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FileText className="w-12 h-12 text-primary" />
                <h1 className="text-4xl font-bold">منشئ العقود</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                أنشئ عقودك القانونية بسهولة واحترافية
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>اختر نوع العقد</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>نوع العقد</Label>
                      <Select
                        value={selectedType}
                        onValueChange={(value) => {
                          setSelectedType(value as ContractType);
                          setFormData({});
                          setShowPreview(false);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع العقد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">عقد بيع وشراء</SelectItem>
                          <SelectItem value="service">عقد خدمات</SelectItem>
                          <SelectItem value="rent">عقد إيجار</SelectItem>
                          <SelectItem value="employment">عقد عمل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedType && contractTemplates[selectedType] && (
                      <>
                        <div className="border-t pt-6 space-y-4">
                          <h3 className="font-semibold text-lg">بيانات العقد</h3>
                          {contractTemplates[selectedType].fields.map((field) => (
                            <div key={field.id} className="space-y-2">
                              <Label htmlFor={field.id}>
                                {field.label}
                                {field.required && <span className="text-destructive">*</span>}
                              </Label>
                              {field.type === "textarea" ? (
                                <Textarea
                                  id={field.id}
                                  placeholder={field.placeholder}
                                  value={formData[field.id] || ""}
                                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                                  required={field.required}
                                  rows={4}
                                />
                              ) : (
                                <Input
                                  id={field.id}
                                  type={field.type}
                                  placeholder={field.placeholder}
                                  value={formData[field.id] || ""}
                                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                                  required={field.required}
                                />
                              )}
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={handleGeneratePreview}
                          className="w-full"
                          size="lg"
                        >
                          معاينة العقد
                          <ChevronRight className="mr-2 h-5 w-5" />
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Preview Section */}
              <div className="space-y-6">
                {showPreview ? (
                  <>
                    <div className="flex gap-3 print:hidden">
                      <Button onClick={handlePrint} variant="outline" className="flex-1">
                        <Printer className="ml-2 h-5 w-5" />
                        طباعة
                      </Button>
                      <Button onClick={handleDownloadPDF} className="flex-1">
                        <Download className="ml-2 h-5 w-5" />
                        تحميل PDF
                      </Button>
                    </div>
                    {renderContractPreview()}
                  </>
                ) : (
                  <Card className="h-full flex items-center justify-center min-h-[400px]">
                    <CardContent className="text-center text-muted-foreground">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">اختر نوع العقد واملأ البيانات لمعاينة العقد</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
    </main>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:shadow-none, .print\\:shadow-none * {
            visibility: visible;
          }
          .print\\:shadow-none {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
