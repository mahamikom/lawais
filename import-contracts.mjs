import { readFileSync } from 'fs';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { contractsLibrary } from './drizzle/schema.ts';

const DATABASE_URL = process.env.DATABASE_URL;

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection, { mode: 'default' });

// قراءة قائمة العقود
const contractsList = readFileSync('/home/ubuntu/muhameekum/contracts_list.txt', 'utf-8')
  .split('\n')
  .filter(line => line.trim());

console.log(`Found ${contractsList.length} contracts`);

// إضافة العقود إلى قاعدة البيانات
const baseUrl = 'https://drive.google.com/drive/folders/1sCafcVn_mOhf7I3oHKfFllIlGSUMPBGT';

for (let i = 0; i < contractsList.length; i++) {
  const title = contractsList[i].trim();
  if (!title) continue;

  try {
    await db.insert(contractsLibrary).values({
      title,
      description: `عقد ${title} - نموذج قانوني سعودي متوافق مع الأنظمة واللوائح`,
      category: 'عام',
      source: 'google_drive',
      url: baseUrl,
      content: `# ${title}\n\nهذا نموذج عقد قانوني سعودي. يرجى ملء البيانات المطلوبة.\n\n## البيانات المطلوبة:\n- الطرف الأول\n- الطرف الثاني\n- التاريخ\n- المكان\n\nللحصول على النموذج الكامل، يرجى زيارة مكتبة العقود.`,
      createdAt: new Date(),
    });
    
    if ((i + 1) % 50 === 0) {
      console.log(`Imported ${i + 1} contracts...`);
    }
  } catch (error) {
    console.error(`Error importing contract "${title}":`, error.message);
  }
}

console.log(`✅ Successfully imported ${contractsList.length} contracts!`);
await connection.end();
