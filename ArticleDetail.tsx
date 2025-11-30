import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Calendar, User, ArrowRight, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Markdown from "react-markdown";

const categories = {
  commercial: "قانون تجاري",
  real_estate: "قانون عقاري",
  criminal: "قانون جنائي",
  family: "قانون أسري",
  labor: "قانون عمل",
  administrative: "قانون إداري",
};

const categoryColors: Record<string, string> = {
  commercial: "bg-blue-500/10 text-blue-700 border-blue-200",
  real_estate: "bg-green-500/10 text-green-700 border-green-200",
  criminal: "bg-red-500/10 text-red-700 border-red-200",
  family: "bg-purple-500/10 text-purple-700 border-purple-200",
  labor: "bg-orange-500/10 text-orange-700 border-orange-200",
  administrative: "bg-indigo-500/10 text-indigo-700 border-indigo-200",
};

export default function ArticleDetail() {
  const [, params] = useRoute("/articles/:id");
  const articleId = parseInt(params?.id || "0");

  const { data: article, isLoading } = trpc.articles.getById.useQuery({ id: articleId });
  const { data: relatedArticles } = trpc.articles.getRelated.useQuery(
    {
      category: article?.category as any,
      excludeId: articleId,
      limit: 3,
    },
    { enabled: !!article }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">المقال غير موجود</h2>
          <Link href="/articles">
            <Button>العودة للمقالات</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ الرابط!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Image */}
      {article.image && (
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
      )}

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/articles">
            <Button variant="ghost" className="mb-6 gap-2">
              <ArrowRight size={16} />
              العودة للمقالات
            </Button>
          </Link>

          {/* Article Card */}
          <Card className="p-8 md:p-12 mb-12">
            {/* Category Badge */}
            <div className="mb-4">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${
                  categoryColors[article.category] || "bg-gray-500/10 text-gray-700 border-gray-200"
                }`}
              >
                {categories[article.category as keyof typeof categories]}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User size={18} />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={18} />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString("ar-SA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={18} />
                <span>{article.readTime} دقائق قراءة</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="mr-auto gap-2"
              >
                <Share2 size={16} />
                مشاركة
              </Button>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-primary">
              <Markdown>{article.content}</Markdown>
            </div>
          </Card>

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">مقالات ذات صلة</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link key={related.id} href={`/articles/${related.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full group">
                      {related.image && (
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
