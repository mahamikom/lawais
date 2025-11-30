import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Download, Filter } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // جلب جميع الكتب أو حسب التصنيف
  const { data: books, isLoading } = selectedCategory
    ? trpc.library.getByCategory.useQuery({ category: selectedCategory })
    : trpc.library.getAll.useQuery();

  // فلترة الكتب حسب البحث
  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { id: null, name: "الكل" },
    { id: "تجاري", name: "قانون تجاري" },
    { id: "مدني", name: "قانون مدني" },
    { id: "جنائي", name: "قانون جنائي" },
    { id: "عمل", name: "قانون العمل" },
    { id: "أسري", name: "قانون أسري" },
    { id: "عقاري", name: "قانون عقاري" },
    { id: "إجرائي", name: "قانون إجرائي" },
    { id: "مهني", name: "تنظيمات مهنية" },
  ];

  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-primary" dir="rtl">
              المكتبة القانونية
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" dir="rtl">
              مكتبة شاملة من الأنظمة والقوانين السعودية
            </p>
          </div>

          {/* Search Bar */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex gap-3">
                <Input
                  placeholder="ابحث في المكتبة القانونية..."
                  className="flex-1 h-12 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  dir="rtl"
                />
                <Button size="lg" className="h-12 px-6">
                  <Search size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Categories Filter */}
          <div className="flex items-center gap-3 flex-wrap" dir="rtl">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category.id || "all"}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="default"
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Books Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">جاري التحميل...</p>
            </div>
          ) : filteredBooks && filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-none shadow-lg">
                  <CardContent className="p-6 space-y-4" dir="rtl">
                    <div className="flex flex-row-reverse items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-right" dir="rtl">
                          {book.title}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs rounded-full mb-3">
                          {book.category}
                        </span>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 text-right leading-relaxed" dir="rtl">
                          {book.description}
                        </p>
                        <Button className="w-full" size="sm">
                          <Download className="w-4 h-4 ml-2" />
                          تحميل PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-24 h-24 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-lg text-muted-foreground">
                {searchTerm
                  ? "لم يتم العثور على نتائج"
                  : "لا توجد كتب في هذا التصنيف"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
