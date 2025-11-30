import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowRight, Download, FileText, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";

export default function ContractBuilder() {
  const [, params] = useRoute("/contract-builder/:id");
  const contractId = params?.id ? parseInt(params.id) : 0;

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [filledContent, setFilledContent] = useState("");

  // جلب العقد من API
  const { data: contract, isLoading } = trpc.contracts.getById.useQuery(
    { id: contractId },
    { enabled: contractId > 0 }
  );

  // استخراج الحقول من المحتوى
  const extractFields = (content: string) => {
    const fieldPattern = /\{\{(\w+)\}\}/g;
    const fields: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
    }> = [];
    const uniqueFields = new Set<string>();

    let match;
    while ((match = fieldPattern.exec(content)) !== null) {
      const fieldName = match[1];
      if (!uniqueFields.has(fieldName)) {
        uniqueFields.add(fieldName);
        
        // تحديد نوع الحقل بناءً على الاسم
        let type = "text";
        let label = fieldName;
        
        if (fieldName.includes("date")) {
          type = "date";
          label = fieldName.replace(/_/g, " ");
        } else if (fieldName.includes("price") || fieldName.includes("amount") || fieldName.includes("area")) {
          type = "number";
          label = fieldName.replace(/_/g, " ");
        } else if (fieldName.includes("phone")) {
          type = "tel";
          label = fieldName.replace(/_/g, " ");
        } else {
          label = fieldName.replace(/_/g, " ");
        }
        
        fields.push({
          name: fieldName,
          label: label,
          type: type,
          required: true,
        });
      }
    }
    
    return fields;
  };

  const fields = contract ? extractFields(contract.content) : [];

  // تحديث المحتوى المملوء عند تغيير البيانات
  useEffect(() => {
    if (contract && Object.keys(formData).length > 0) {
      let content = contract.content;
      Object.entries(formData).forEach(([key, value]) => {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
        content = content.replace(regex, value || `{{${key}}}`);
      });
      setFilledContent(content);
    } else if (contract) {
      setFilledContent(contract.content);
    }
  }, [formData, contract]);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleDownloadPDF = () => {
    // التحقق من ملء جميع الحقول المطلوبة
    const emptyFields = fields.filter(
      (field) => field.required && !formData[field.name]
    );

    if (emptyFields.length > 0) {
      alert(`يرجى ملء جميع الحقول المطلوبة:\n${emptyFields.map((f) => f.label).join("، ")}`);
      return;
    }

    // إنشاء نافذة طباعة
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("تعذر فتح نافذة الطباعة. يرجى السماح بالنوافذ المنبثقة.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${contract?.titleAr || "عقد"}</title>
        <style>
          @page {
            size: A4;
            margin: 2cm;
          }
          body {
            font-family: 'Arial', 'Tahoma', sans-serif;
            line-height: 1.8;
            color: #000;
            direction: rtl;
            text-align: right;
          }
          h1 {
            text-align: center;
            color: #1e40af;
            border-bottom: 3px solid #1e40af;
            padding-bottom: 10px;
            margin-bottom: 30px;
          }
          h2 {
            color: #1e40af;
            margin-top: 25px;
            margin-bottom: 15px;
            border-right: 4px solid #1e40af;
            padding-right: 10px;
          }
          p {
            margin: 10px 0;
          }
          strong {
            color: #1e40af;
          }
          .signature-section {
            margin-top: 50px;
            page-break-inside: avoid;
          }
          .signature-line {
            border-bottom: 1px solid #000;
            display: inline-block;
            min-width: 200px;
            margin: 0 10px;
          }
          @media print {
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <pre style="white-space: pre-wrap; font-family: inherit; line-height: inherit;">${filledContent}</pre>
      </body>
      </html>
    `);

    printWindow.document.close();
    
    // الانتظار قليلاً ثم طباعة
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>${contract?.titleAr || "عقد"}</title>
        <style>
          body {
            font-family: 'Arial', 'Tahoma', sans-serif;
            line-height: 1.8;
            direction: rtl;
            text-align: right;
            padding: 20px;
          }
          h1, h2 { color: #1e40af; }
          h1 { text-align: center; border-bottom: 3px solid #1e40af; padding-bottom: 10px; }
          h2 { border-right: 4px solid #1e40af; padding-right: 10px; }
          pre { white-space: pre-wrap; font-family: inherit; }
        </style>
      </head>
      <body>
        <pre>${filledContent}</pre>
      </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">جاري تحميل العقد...</p>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">العقد غير موجود</h2>
          <Link href="/contracts">
            <Button className="mt-4">العودة إلى المكتبة</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12">
        <div className="container">
          <Link href={`/contracts/${contractId}`}>
            <Button variant="ghost" className="text-white hover:bg-blue-800 mb-4">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة إلى تفاصيل العقد
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">منشئ العقود</h1>
          <p className="text-blue-100">{contract.titleAr}</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* نموذج ملء البيانات */}
          <div>
            <Card className="p-6 shadow-lg sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                <FileText className="inline-block ml-2 h-6 w-6 text-blue-600" />
                بيانات العقد
              </h2>

              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pl-2">
                {fields.map((field, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={field.name} className="text-right">
                      {field.label}
                      {field.required && <span className="text-red-500 mr-1">*</span>}
                    </Label>
                    
                    {field.type === "select" ? (
                      <Select
                        value={formData[field.name] || ""}
                        onValueChange={(value) => handleInputChange(field.name, value)}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder={`اختر ${field.label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="شقة">شقة</SelectItem>
                          <SelectItem value="فيلا">فيلا</SelectItem>
                          <SelectItem value="أرض">أرض</SelectItem>
                          <SelectItem value="محل تجاري">محل تجاري</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={`أدخل ${field.label}`}
                        className="text-right"
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t space-y-3">
                <Button
                  onClick={handleDownloadPDF}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Download className="ml-2 h-5 w-5" />
                  تحميل العقد (PDF)
                </Button>
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Printer className="ml-2 h-5 w-5" />
                  طباعة العقد
                </Button>
              </div>
            </Card>
          </div>

          {/* معاينة العقد */}
          <div>
            <Card className="p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                معاينة مباشرة
              </h2>

              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 min-h-[600px]">
                <pre className="whitespace-pre-wrap font-sans text-right leading-relaxed text-gray-800">
                  {filledContent}
                </pre>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>ملاحظة:</strong> املأ الحقول على اليسار لرؤية التغييرات مباشرة في
                  المعاينة. يمكنك تحميل العقد كملف PDF بعد ملء جميع الحقول المطلوبة.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
