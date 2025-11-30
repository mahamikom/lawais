import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Search, FileText, Download, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function ContractsLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");

  // جلب التصنيفات من API
  const { data: categoriesData = [] } = trpc.contracts.getCategories.useQuery();
  
  // جلب العقود من API
  const { data: contractsData = [], isLoading } = trpc.contracts.getAll.useQuery();
  
  // إضافة "جميع التصنيفات" في البداية
  const categories = [
    { id: 0, name: "All", nameAr: "جميع التصنيفات", icon: "📋" },
    ...categoriesData
  ];



  // تصفية العقود
  const filteredContracts = useMemo(() => {
    return contractsData.filter((contract) => {
      const tags = contract.tags ? (typeof contract.tags === 'string' ? JSON.parse(contract.tags) : contract.tags) : [];
      const matchesSearch =
        contract.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contract.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        tags.some((tag: string) => tag.includes(searchQuery));

      const matchesCategory =
        selectedCategory === "all" || selectedCategory === "0" || contract.categoryId === parseInt(selectedCategory);

      const matchesSource =
        selectedSource === "all" || contract.source === selectedSource;

      return matchesSearch && matchesCategory && matchesSource;
    });
  }, [searchQuery, selectedCategory, selectedSource, contractsData]);

  const getCategoryName = (categoryId: number) => {
    return categories.find((c) => c.id === categoryId)?.nameAr || "أخرى";
  };

  const getSourceBadge = (source: string) => {
    if (source === "saudi") {
      return <Badge className="bg-green-600">سعودي</Badge>;
    } else if (source === "canadian") {
      return <Badge className="bg-blue-600">معاد صياغته</Badge>;
    }
    return <Badge>مخصص</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            مكتبة العقود القانونية
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            أكثر من 250 نموذج عقد قانوني جاهز ومتوافق مع النظام السعودي. اختر
            العقد المناسب، املأ البيانات، وحمّله فوراً.
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* أدوات البحث والفلترة */}
        <Card className="p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* البحث */}
            <div className="md:col-span-3">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="ابحث عن عقد..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 text-right"
                />
              </div>
            </div>

            {/* التصنيف */}
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.icon} {cat.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* المصدر */}
            <div>
              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger>
                  <SelectValue placeholder="المصدر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المصادر</SelectItem>
                  <SelectItem value="saudi">سعودي</SelectItem>
                  <SelectItem value="canadian">معاد صياغته</SelectItem>
                  <SelectItem value="custom">مخصص</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* زر إعادة تعيين */}
            <div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedSource("all");
                }}
              >
                <Filter className="ml-2 h-4 w-4" />
                إعادة تعيين
              </Button>
            </div>
          </div>

          {/* عدد النتائج */}
          <div className="mt-4 text-sm text-gray-600">
            عرض {filteredContracts.length} من {contractsData.length} عقد
          </div>
        </Card>

        {/* قائمة العقود */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContracts.map((contract) => (
            <Card
              key={contract.id}
              className="p-6 hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {contract.titleAr}
                  </h3>
                  <div className="flex gap-2 mb-3">
                    {getSourceBadge(contract.source)}
                    <Badge variant="outline">
                      {getCategoryName(contract.categoryId)}
                    </Badge>
                  </div>
                </div>
                <FileText className="h-8 w-8 text-blue-600 flex-shrink-0" />
              </div>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {contract.description}
              </p>

              {/* الوسوم */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(() => {
                  const tags = contract.tags ? (typeof contract.tags === 'string' ? JSON.parse(contract.tags) : contract.tags) : [];
                  return tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ));
                })()}
              </div>

              {/* الأزرار */}
              <div className="flex gap-2">
                <Link href={`/contracts/${contract.id}`} className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Eye className="ml-2 h-4 w-4" />
                    معاينة
                  </Button>
                </Link>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* رسالة عدم وجود نتائج */}
        {filteredContracts.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              لا توجد عقود مطابقة
            </h3>
            <p className="text-gray-500">
              جرب تغيير معايير البحث أو الفلترة
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
