import { useState } from 'react';
import { Search as SearchIcon, FileText, Calendar, Tag } from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  type: string;
  date: string;
  excerpt: string;
  url: string;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    // محاكاة نتائج البحث (سيتم استبدالها بـ FlowHunt API)
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: 1,
          title: 'نظام العمل السعودي',
          type: 'نظام',
          date: '2005-04-23',
          excerpt: 'يهدف هذا النظام إلى تنظيم علاقات العمل وتحديد حقوق وواجبات أطراف العلاقة التعاقدية...',
          url: 'https://laws.boe.gov.sa/BoeLaws/Laws/LawDetails/1f13ff70-0f7c-4c83-8c3c-a9f700f161b6/1',
        },
        {
          id: 2,
          title: 'نظام المعاملات المدنية',
          type: 'نظام',
          date: '2023-06-19',
          excerpt: 'ينظم هذا النظام المعاملات المدنية في المملكة العربية السعودية...',
          url: 'https://laws.boe.gov.sa',
        },
        {
          id: 3,
          title: 'نظام الإجراءات الجزائية',
          type: 'نظام',
          date: '2001-11-22',
          excerpt: 'يحدد هذا النظام الإجراءات المتبعة في الدعاوى الجزائية...',
          url: 'https://laws.boe.gov.sa',
        },
      ];

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto" dir="rtl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-right">محرك البحث القانوني</h1>
        <p className="text-gray-400 text-right">
          ابحث في الأنظمة والتشريعات واللوائح السعودية
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن نظام، لائحة، أو تشريع..."
            className="w-full bg-dark-card border border-dark-border rounded-lg pr-14 pl-4 py-4 text-white text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500"
            dir="rtl"
          />
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors font-bold"
          >
            {isSearching ? 'جاري البحث...' : 'بحث'}
          </button>
        </div>
      </form>

      {/* Search Tips */}
      {!hasSearched && (
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold mb-4 text-right">نصائح للبحث</h3>
          <ul className="space-y-2 text-gray-300 text-right">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>استخدم كلمات مفتاحية واضحة ومحددة</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>يمكنك البحث عن رقم النظام أو تاريخ الإصدار</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>البحث يشمل الأنظمة واللوائح والقرارات</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>النتائج مدعومة بالذكاء الاصطناعي لفهم سياق البحث</span>
            </li>
          </ul>
        </div>
      )}

      {/* Loading State */}
      {isSearching && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">جاري البحث في قاعدة البيانات القانونية...</p>
        </div>
      )}

      {/* Search Results */}
      {!isSearching && hasSearched && (
        <div>
          <div className="mb-6">
            <p className="text-gray-400 text-right">
              تم العثور على <span className="text-white font-bold">{searchResults.length}</span> نتيجة
            </p>
          </div>

          <div className="space-y-4">
            {searchResults.map(result => (
              <div
                key={result.id}
                className="bg-dark-card border border-dark-border rounded-lg p-6 hover:border-blue-500 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 text-right">
                    <h3 className="text-xl font-bold mb-2 text-blue-400 hover:text-blue-300">
                      {result.title}
                    </h3>
                  </div>
                  <FileText className="w-6 h-6 text-gray-400 flex-shrink-0 mr-3" />
                </div>

                <div className="flex items-center gap-4 mb-3 text-sm text-gray-400 justify-end">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(result.date).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>{result.type}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 text-right leading-relaxed">
                  {result.excerpt}
                </p>

                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-bold"
                >
                  عرض النص الكامل
                </a>
              </div>
            ))}
          </div>

          {searchResults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">لم يتم العثور على نتائج مطابقة</p>
              <p className="text-gray-500 mt-2">جرب استخدام كلمات مفتاحية مختلفة</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
