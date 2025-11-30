#!/usr/bin/env node
/**
 * سكريبت لإدراج العقود المستخرجة في قاعدة البيانات
 */

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// قراءة ملف العقود المستخرجة
const contractsFile = path.join(__dirname, '../contracts_data/contracts_extracted.json');
const contractsData = JSON.parse(fs.readFileSync(contractsFile, 'utf-8'));

// الاتصال بقاعدة البيانات
const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

console.log('=' + '='.repeat(60));
console.log('إدراج العقود في قاعدة البيانات');
console.log('=' + '='.repeat(60));

// إنشاء التصنيفات أولاً
const categories = [
  { id: 1, name: 'Commercial', nameAr: 'عقود تجارية', description: 'عقود البيع والشراء والتجارة', icon: '💼' },
  { id: 2, name: 'Employment', nameAr: 'عقود عمل', description: 'عقود التوظيف والعمل', icon: '👔' },
  { id: 3, name: 'Real Estate', nameAr: 'عقود عقارية', description: 'عقود العقارات والإيجار', icon: '🏢' },
  { id: 4, name: 'Intellectual Property', nameAr: 'ملكية فكرية', description: 'عقود الملكية الفكرية والترخيص', icon: '💡' },
  { id: 5, name: 'Partnership', nameAr: 'شراكة', description: 'عقود الشراكة والاستثمار', icon: '🤝' },
  { id: 6, name: 'Service', nameAr: 'خدمات', description: 'عقود تقديم الخدمات', icon: '⚙️' },
  { id: 7, name: 'Loan', nameAr: 'قروض وتمويل', description: 'عقود القروض والتمويل', icon: '💰' },
  { id: 8, name: 'Agency', nameAr: 'وكالة وتفويض', description: 'عقود الوكالة والتفويض', icon: '📝' },
  { id: 9, name: 'Other', nameAr: 'أخرى', description: 'عقود متنوعة', icon: '📄' },
];

console.log('\n📂 إنشاء التصنيفات...');
for (const category of categories) {
  try {
    await connection.execute(
      `INSERT INTO contractCategories (id, name, nameAr, description, icon, createdAt) 
       VALUES (?, ?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE name = VALUES(name), nameAr = VALUES(nameAr)`,
      [category.id, category.name, category.nameAr, category.description, category.icon]
    );
    console.log(`  ✅ ${category.nameAr}`);
  } catch (error) {
    console.log(`  ⚠️  ${category.nameAr} (موجود مسبقاً)`);
  }
}

// تعيين معرف التصنيف لكل عقد
const categoryMap = {
  'commercial': 1,
  'employment': 2,
  'real_estate': 3,
  'intellectual': 4,
  'partnership': 5,
  'service': 6,
  'loan': 7,
  'agency': 8,
  'other': 9,
};

console.log('\n📄 إدراج العقود...');
let insertedCount = 0;
let skippedCount = 0;

for (const contract of contractsData) {
  const categoryId = categoryMap[contract.category] || 9;
  const fieldsJson = JSON.stringify(contract.fields);
  const tagsJson = JSON.stringify(contract.tags);
  
  try {
    await connection.execute(
      `INSERT INTO contractsLibrary 
       (title, titleAr, categoryId, content, fields, source, description, tags, isActive, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        contract.title,
        contract.titleAr,
        categoryId,
        contract.content,
        fieldsJson,
        contract.source,
        contract.description,
        tagsJson,
        contract.isActive
      ]
    );
    insertedCount++;
    console.log(`  ✅ ${contract.titleAr}`);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      skippedCount++;
      console.log(`  ⏭️  ${contract.titleAr} (موجود مسبقاً)`);
    } else {
      console.error(`  ❌ خطأ في إدراج ${contract.titleAr}:`, error.message);
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log(`✅ تم إدراج ${insertedCount} عقد جديد`);
console.log(`⏭️  تم تخطي ${skippedCount} عقد (موجود مسبقاً)`);
console.log(`📊 إجمالي العقود: ${contractsData.length}`);
console.log('='.repeat(60));

await connection.end();
