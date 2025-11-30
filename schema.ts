export const contracts = mysqlTable("contracts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: text("title").notNull(),
  fileUrl: text("fileUrl").notNull(),
  fileKey: text("fileKey").notNull(),
  analysis: text("analysis"),
  status: mysqlEnum("status", ["pending", "analyzed", "failed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Contract = typeof contracts.$inferSelect;
export type InsertContract = typeof contracts.$inferInsert;

// جدول القضايا
export const cases = mysqlTable("cases", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  caseType: text("caseType").notNull(),
  prediction: text("prediction"),
  status: mysqlEnum("status", ["pending", "analyzed", "failed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Case = typeof cases.$inferSelect;
export type InsertCase = typeof cases.$inferInsert;

// جدول المكتبة القانونية
export const legalDocuments = mysqlTable("legalDocuments", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  fileUrl: text("fileUrl").notNull(),
  fileKey: text("fileKey").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LegalDocument = typeof legalDocuments.$inferSelect;
export type InsertLegalDocument = typeof legalDocuments.$inferInsert;

// جدول المحامين
export const lawyers = mysqlTable("lawyers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: text("name").notNull(),
  specialization: text("specialization").notNull(),
  experience: int("experience").notNull(),
  bio: text("bio"),
  imageUrl: text("imageUrl"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lawyer = typeof lawyers.$inferSelect;
export type InsertLawyer = typeof lawyers.$inferInsert;

// جدول تصنيفات العقود
export const contractCategories = mysqlTable("contractCategories", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  nameAr: text("nameAr").notNull(),
  description: text("description"),
  icon: text("icon"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});