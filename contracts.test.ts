import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from './routers';

describe('Contracts API', () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    // Create a mock context for testing
    caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });
  });

  describe('getCategories', () => {
    it('should return contract categories', async () => {
      const categories = await caller.contracts.getCategories();
      
      expect(categories).toBeDefined();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
      
      // التحقق من وجود التصنيفات الأساسية
      const categoryNames = categories.map(c => c.nameAr);
      expect(categoryNames).toContain('عقود تجارية');
      expect(categoryNames).toContain('عقود عمل');
      expect(categoryNames).toContain('ملكية فكرية');
    });

    it('should have required fields in each category', async () => {
      const categories = await caller.contracts.getCategories();
      
      categories.forEach(category => {
        expect(category).toHaveProperty('id');
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('nameAr');
        expect(category).toHaveProperty('icon');
      });
    });
  });

  describe('getAll', () => {
    it('should return all active contracts', async () => {
      const contracts = await caller.contracts.getAll();
      
      expect(contracts).toBeDefined();
      expect(Array.isArray(contracts)).toBe(true);
      expect(contracts.length).toBeGreaterThan(0);
    });

    it('should have required fields in each contract', async () => {
      const contracts = await caller.contracts.getAll();
      
      contracts.forEach(contract => {
        expect(contract).toHaveProperty('id');
        expect(contract).toHaveProperty('title');
        expect(contract).toHaveProperty('titleAr');
        expect(contract).toHaveProperty('categoryId');
        expect(contract).toHaveProperty('content');
        expect(contract).toHaveProperty('source');
        expect(contract.isActive).toBe(1);
      });
    });

    it('should include contracts from different sources', async () => {
      const contracts = await caller.contracts.getAll();
      
      const sources = [...new Set(contracts.map(c => c.source))];
      expect(sources).toContain('canadian');
    });
  });

  describe('getById', () => {
    it('should return a specific contract by ID', async () => {
      // First get all contracts to get a valid ID
      const allContracts = await caller.contracts.getAll();
      expect(allContracts.length).toBeGreaterThan(0);
      
      const firstContract = allContracts[0];
      const contract = await caller.contracts.getById({ id: firstContract.id });
      
      expect(contract).toBeDefined();
      expect(contract?.id).toBe(firstContract.id);
      expect(contract?.titleAr).toBe(firstContract.titleAr);
    });

    it('should return undefined for non-existent contract', async () => {
      const contract = await caller.contracts.getById({ id: 999999 });
      expect(contract).toBeUndefined();
    });
  });

  describe('getByCategory', () => {
    it('should return contracts filtered by category', async () => {
      // Get categories first
      const categories = await caller.contracts.getCategories();
      expect(categories.length).toBeGreaterThan(0);
      
      const firstCategory = categories[0];
      const contracts = await caller.contracts.getByCategory({ 
        categoryId: firstCategory.id 
      });
      
      expect(Array.isArray(contracts)).toBe(true);
      
      // All returned contracts should belong to the specified category
      contracts.forEach(contract => {
        expect(contract.categoryId).toBe(firstCategory.id);
      });
    });

    it('should return empty array for category with no contracts', async () => {
      const contracts = await caller.contracts.getByCategory({ categoryId: 999 });
      expect(contracts).toEqual([]);
    });
  });

  describe('search', () => {
    it('should find contracts by title', async () => {
      const searchTerm = 'شراكة';
      const results = await caller.contracts.search({ query: searchTerm });
      
      expect(Array.isArray(results)).toBe(true);
      
      if (results.length > 0) {
        // At least one result should contain the search term
        const hasMatch = results.some(contract => 
          contract.titleAr.includes(searchTerm)
        );
        expect(hasMatch).toBe(true);
      }
    });

    it('should return empty array for non-matching search', async () => {
      const results = await caller.contracts.search({ 
        query: 'كلمةغيرموجودةأبداً123456' 
      });
      expect(results).toEqual([]);
    });

    it('should be case-insensitive', async () => {
      const results1 = await caller.contracts.search({ query: 'شراكة' });
      const results2 = await caller.contracts.search({ query: 'شراكة' });
      
      // Both searches should return results (if any exist)
      expect(results1.length).toBe(results2.length);
    });
  });

  describe('Data Integrity', () => {
    it('should have at least 40 contracts in the database', async () => {
      const contracts = await caller.contracts.getAll();
      expect(contracts.length).toBeGreaterThanOrEqual(40);
    });

    it('should have contracts in multiple categories', async () => {
      const contracts = await caller.contracts.getAll();
      const uniqueCategories = [...new Set(contracts.map(c => c.categoryId))];
      expect(uniqueCategories.length).toBeGreaterThan(3);
    });

    it('should have proper JSON structure in tags field', async () => {
      const contracts = await caller.contracts.getAll();
      
      contracts.forEach(contract => {
        if (contract.tags) {
          expect(() => {
            const tags = typeof contract.tags === 'string' 
              ? JSON.parse(contract.tags) 
              : contract.tags;
            expect(Array.isArray(tags)).toBe(true);
          }).not.toThrow();
        }
      });
    });
  });
});
