import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { stripeRouter } from "./stripe-router";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  stripe: stripeRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // AI Chat Router
  ai: router({
    chat: publicProcedure
      .input(
        z.object({
          message: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // TODO: Integrate with actual AI service when legal documents are uploaded
        // For now, return a placeholder response
        const response = `شكراً على سؤالك: "${input.message}"

أنا مساعدك القانوني الذكي. حالياً، أنا في مرحلة الإعداد وسيتم تدريبي على المستندات القانونية السعودية قريباً.

للحصول على استشارة قانونية دقيقة، يُرجى التواصل مع أحد محامينا المعتمدين.`;
        
        return { response };
      }),
  }),

  // Contracts Library Router
  contracts: router({
    // جلب جميع التصنيفات
    getCategories: publicProcedure.query(async () => {
      return await db.getAllContractCategories();
    }),

    // جلب جميع العقود
    getAll: publicProcedure.query(async () => {
      return await db.getAllContracts();
    }),

    // جلب عقد محدد
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getContractById(input.id);
      }),

    // فلترة حسب التصنيف
    getByCategory: publicProcedure
      .input(z.object({ categoryId: z.number() }))
      .query(async ({ input }) => {
        return await db.getContractsByCategory(input.categoryId);
      }),

    // بحث في العقود
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        return await db.searchContracts(input.query);
      }),
  }),

  // Articles Router
  articles: router({
    // جلب جميع المقالات
    getAll: publicProcedure.query(async () => {
      return await db.getAllArticles();
    }),

    // جلب مقال محدد
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getArticleById(input.id);
      }),

    // فلترة حسب التصنيف
    getByCategory: publicProcedure
      .input(z.object({ 
        category: z.enum(["commercial", "real_estate", "criminal", "family", "labor", "administrative"]) 
      }))
      .query(async ({ input }) => {
        return await db.getArticlesByCategory(input.category);
      }),

    // بحث في المقالات
    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        return await db.searchArticles(input.query);
      }),

    // جلب مقالات ذات صلة
    getRelated: publicProcedure
      .input(z.object({ 
        category: z.enum(["commercial", "real_estate", "criminal", "family", "labor", "administrative"]),
        excludeId: z.number(),
        limit: z.number().optional()
      }))
      .query(async ({ input }) => {
        return await db.getRelatedArticles(input.category, input.excludeId, input.limit);
      }),
  }),

  // Library Router
  library: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllLegalDocuments();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getLegalDocumentById(input.id);
      }),

    search: publicProcedure
      .input(z.object({ searchTerm: z.string() }))
      .query(async ({ input }) => {
        return await db.searchLegalDocuments(input.searchTerm);
      }),

    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getLegalDocumentsByCategory(input.category);
      }),
  }),
});

export type AppRouter = typeof appRouter;
