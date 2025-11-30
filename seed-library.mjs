import { drizzle } from 'drizzle-orm/mysql2';
import { mysqlTable, int, text, timestamp } from 'drizzle-orm/mysql-core';

const db = drizzle(process.env.DATABASE_URL);

const legalDocuments = mysqlTable("legalDocuments", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  fileUrl: text("fileUrl").notNull(),
  fileKey: text("fileKey").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

const books = [
  {
    title: "النظام التجاري السعودي - دليل شامل",
    category: "تجاري",
    description: "دليل شامل للنظام التجاري السعودي يتضمن جميع الأحكام والقواعد المتعلقة بالشركات والمعاملات التجارية",
    fileUrl: "https://example.com/commercial-law.pdf",
    fileKey: "library/commercial-law.pdf"
  },
  {
    title: "نظام العمل والعمال في المملكة",
    category: "عمل",
    description: "شرح مفصل لنظام العمل السعودي وحقوق العمال وأصحاب العمل والإجراءات القانونية",
    fileUrl: "https://example.com/labor-law.pdf",
    fileKey: "library/labor-law.pdf"
  },
  {
    title: "قانون العقوبات والإجراءات الجزائية",
    category: "جنائي",
    description: "دراسة شاملة للنظام الجزائي السعودي والعقوبات والإجراءات القضائية",
    fileUrl: "https://example.com/criminal-law.pdf",
    fileKey: "library/criminal-law.pdf"
  },
  {
    title: "نظام الأحوال الشخصية",
    category: "أسري",
    description: "أحكام الزواج والطلاق والنفقة والحضانة والميراث في النظام السعودي",
    fileUrl: "https://example.com/family-law.pdf",
    fileKey: "library/family-law.pdf"
  },
  {
    title: "نظام المرافعات الشرعية",
    category: "إجرائي",
    description: "الإجراءات القضائية أمام المحاكم الشرعية والدوائر القضائية",
    fileUrl: "https://example.com/procedures.pdf",
    fileKey: "library/procedures.pdf"
  },
  {
    title: "نظام التنفيذ",
    category: "إجرائي",
    description: "قواعد وإجراءات تنفيذ الأحكام القضائية والسندات التنفيذية",
    fileUrl: "https://example.com/execution.pdf",
    fileKey: "library/execution.pdf"
  },
  {
    title: "نظام المعاملات المدنية",
    category: "مدني",
    description: "الأحكام العامة للعقود والالتزامات والمسؤولية المدنية",
    fileUrl: "https://example.com/civil-law.pdf",
    fileKey: "library/civil-law.pdf"
  },
  {
    title: "نظام الملكية العقارية",
    category: "عقاري",
    description: "أحكام التملك والتصرف في العقارات والحقوق العينية",
    fileUrl: "https://example.com/real-estate.pdf",
    fileKey: "library/real-estate.pdf"
  },
  {
    title: "نظام المحاماة",
    category: "مهني",
    description: "تنظيم مهنة المحاماة وحقوق وواجبات المحامين",
    fileUrl: "https://example.com/advocacy.pdf",
    fileKey: "library/advocacy.pdf"
  },
  {
    title: "نظام التحكيم السعودي",
    category: "تجاري",
    description: "قواعد التحكيم التجاري وإجراءات الفصل في المنازعات",
    fileUrl: "https://example.com/arbitration.pdf",
    fileKey: "library/arbitration.pdf"
  },
  {
    title: "نظام الإفلاس",
    category: "تجاري",
    description: "إجراءات الإفلاس وإعادة التنظيم المالي والتصفية",
    fileUrl: "https://example.com/bankruptcy.pdf",
    fileKey: "library/bankruptcy.pdf"
  },
  {
    title: "نظام مكافحة جرائم المعلوماتية",
    category: "جنائي",
    description: "الجرائم الإلكترونية والعقوبات المقررة لها",
    fileUrl: "https://example.com/cyber-crimes.pdf",
    fileKey: "library/cyber-crimes.pdf"
  }
];

async function seed() {
  console.log('🌱 Seeding library documents...');
  
  for (const book of books) {
    await db.insert(legalDocuments).values(book);
    console.log(`✅ Added: ${book.title}`);
  }
  
  console.log('✨ Library seeding completed!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
