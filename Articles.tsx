import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Search, Clock, User, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const categories = [
  { id: "all", name: "الكل", value: null },
  { id: "commercial", name: "قانون تجاري", value: "commercial" },
  { id: "real_estate", name: "قانون عقاري", value: "real_estate" },
  { id: "criminal", name: "قانون جنائي", value: "criminal" },
  { id: "family", name: "قانون أسري", value: "family" },
  { id: "labor", name: "قانون عمل", value: "labor" },
  { id: "administrative", name: "قانون إداري", value: "administrative" },
];

const categoryColors: Record<string, string> = {
  commercial: "bg-blue-500/10 text-blue-700 border-blue-200",
  real_estate: "bg-green-500/10 text-green-700 border-green-200",
  criminal: "bg-red-500/10 text-red-700 border-red-200",
  family: "bg-purple-500/10 text-purple-700 border-purple-200",
  labor: "bg-orange-500/10 text-orange-700 border-orange-200",
  administrative: "bg-indigo-500/10 text-indigo-700 border-indigo-200",
};

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // جلب المقالات حسب التصنيف أو البحث
  const { data: allArticles } = trpc.articles.getAll.useQuery(undefined, {
    enabled: !selectedCategory && !searchQuery,
  });

  const { data: categoryArticles } = trpc.articles.getByCategory.useQuery(
    { category: selectedCategory as any },
    { enabled: !!selectedCategory && !searchQuery }
  );

  const { data: searchResults } = trpc.articles.search.useQuery(
    { query: searchQuery },
    { enabled: !!searchQuery }
  );

  const articles = searchQuery
    ? searchResults
    : selectedCategory
    ? categoryArticles
    : allArticles;

  const getCategoryName = (categoryValue: string) => {
    return categories.find((c) => c.value === categoryValue)?.name || categoryValue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              المقالات القانونية
            </h1>
            <p className="text-lg opacity-90 mb-8">
              مكتبة شاملة من المقالات القانونية المتخصصة في مختلف فروع القانون السعودي
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="ابحث في المقالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 py-6 text-lg bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container">
          {!articles || articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {searchQuery
                  ? "لم يتم العثور على مقالات تطابق بحثك"
                  : "لا توجد مقالات في هذا التصنيف"}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  عدد المقالات: <span className="font-bold text-foreground">{articles.length}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Link key={article.id} href={`/articles/${article.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col group">
                      {/* Image */}
                      {article.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                categoryColors[article.category] || "bg-gray-500/10 text-gray-700 border-gray-200"
                              }`}
                            >
                              {getCategoryName(article.category)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col" dir="rtl">
                        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors text-right">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1 text-right">
                          {article.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{article.readTime} دقائق</span>
                            </div>
                          </div>
                          <ChevronRight
                            size={20}
                            className="text-primary group-hover:translate-x-[-4px] transition-transform"
                          />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
