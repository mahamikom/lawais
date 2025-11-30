import { eq, like, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, contractsLibrary, contractCategories, userGeneratedContracts, articles, legalDocuments } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ===== دوال مكتبة العقود =====

/**
 * جلب جميع التصنيفات
 */
export async function getAllContractCategories() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(contractCategories);
  } catch (error) {
    console.error("[Database] Failed to get contract categories:", error);
    return [];
  }
}

/**
 * جلب جميع العقود من المكتبة
 */
export async function getAllContracts() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(contractsLibrary).where(eq(contractsLibrary.isActive, 1));
  } catch (error) {
    console.error("[Database] Failed to get contracts:", error);
    return [];
  }
}

/**
 * جلب عقد محدد بواسطة ID
 */
export async function getContractById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  try {
    const result = await db.select().from(contractsLibrary).where(eq(contractsLibrary.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get contract by id:", error);
    return undefined;
  }
}

/**
 * فلترة العقود حسب التصنيف
 */
export async function getContractsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(contractsLibrary)
      .where(and(
        eq(contractsLibrary.categoryId, categoryId),
        eq(contractsLibrary.isActive, 1)
      ));
  } catch (error) {
    console.error("[Database] Failed to get contracts by category:", error);
    return [];
  }
}

/**
 * بحث في العقود
 */
export async function searchContracts(query: string) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const searchPattern = `%${query}%`;
    return await db.select().from(contractsLibrary)
      .where(and(
        eq(contractsLibrary.isActive, 1),
        like(contractsLibrary.titleAr, searchPattern)
      ));
  } catch (error) {
    console.error("[Database] Failed to search contracts:", error);
    return [];
  }
}

/**
 * حفظ عقد مستخدم جديد
 */
export async function saveUserContract(userId: number, templateId: number, title: string, content: string, fieldsData: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    const result = await db.insert(userGeneratedContracts).values({
      userId,
      templateId,
      title,
      content,
      fieldsData,
      status: "draft"
    });
    return result;
  } catch (error) {
    console.error("[Database] Failed to save user contract:", error);
    throw error;
  }
}

/**
 * جلب عقود مستخدم محدد
 */
export async function getUserContracts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(userGeneratedContracts).where(eq(userGeneratedContracts.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to get user contracts:", error);
    return [];
  }
}

/**
 * جلب جميع المقالات
 */
export async function getAllArticles() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(articles).orderBy(articles.publishedAt);
  } catch (error) {
    console.error("[Database] Failed to get articles:", error);
    return [];
  }
}

/**
 * جلب المقالات حسب التصنيف
 */
export async function getArticlesByCategory(category: "commercial" | "real_estate" | "criminal" | "family" | "labor" | "administrative") {
  const db = await getDb();
  if (!db) return [];
  
  try {
    // @ts-ignore
    return await db.select().from(articles).where(eq(articles.category, category)).orderBy(articles.publishedAt);
  } catch (error) {
    console.error("[Database] Failed to get articles by category:", error);
    return [];
  }
}

/**
 * البحث في المقالات
 */
export async function searchArticles(query: string) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const searchPattern = `%${query}%`;
    return await db.select().from(articles)
      .where(like(articles.title, searchPattern))
      .orderBy(articles.publishedAt);
  } catch (error) {
    console.error("[Database] Failed to search articles:", error);
    return [];
  }
}

/**
 * جلب مقال محدد
 */
export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const result = await db.select().from(articles).where(eq(articles.id, id));
    return result[0] || null;
  } catch (error) {
    console.error("[Database] Failed to get article:", error);
    return null;
  }
}

/**
 * جلب مقالات ذات صلة (نفس التصنيف)
 */
export async function getRelatedArticles(category: "commercial" | "real_estate" | "criminal" | "family" | "labor" | "administrative", excludeId: number, limit: number = 3) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const allInCategory = await db.select().from(articles)
      // @ts-ignore
      .where(eq(articles.category, category));
    
    return allInCategory.filter(a => a.id !== excludeId).slice(0, limit);
  } catch (error) {
    console.error("[Database] Failed to get related articles:", error);
    return [];
  }
}


// ===== Legal Documents (Library) =====

export async function getAllLegalDocuments() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(legalDocuments);
  } catch (error) {
    console.error("[Database] Error fetching legal documents:", error);
    return [];
  }
}

export async function getLegalDocumentById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  try {
    const docs = await db.select().from(legalDocuments).where(eq(legalDocuments.id, id));
    return docs[0] || null;
  } catch (error) {
    console.error("[Database] Error fetching legal document:", error);
    return null;
  }
}

export async function searchLegalDocuments(searchTerm: string) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(legalDocuments).where(
      like(legalDocuments.title, `%${searchTerm}%`)
    );
  } catch (error) {
    console.error("[Database] Error searching legal documents:", error);
    return [];
  }
}

export async function getLegalDocumentsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(legalDocuments).where(
      eq(legalDocuments.category, category)
    );
  } catch (error) {
    console.error("[Database] Error fetching legal documents by category:", error);
    return [];
  }
}
