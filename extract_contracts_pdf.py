#!/usr/bin/env python3
"""
سكريبت لاستخراج النصوص من ملفات PDF للعقود الكندية
ويحفظها في ملفات JSON منظمة
"""

import os
import json
import re
from pathlib import Path
import subprocess

# المسارات
PDF_DIR = "/home/ubuntu/muhameekum/contracts_data/pdf_canadian"
OUTPUT_DIR = "/home/ubuntu/muhameekum/contracts_data/extracted"
OUTPUT_FILE = "/home/ubuntu/muhameekum/contracts_data/contracts_extracted.json"

def extract_text_from_pdf(pdf_path):
    """استخراج النص من ملف PDF باستخدام pdftotext"""
    try:
        result = subprocess.run(
            ['pdftotext', '-layout', pdf_path, '-'],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"خطأ في استخراج النص من {pdf_path}: {e}")
        return None

def classify_contract(filename, content):
    """تصنيف العقد بناءً على اسم الملف والمحتوى"""
    filename_lower = filename.lower()
    content_lower = content.lower() if content else ""
    
    # التصنيفات
    if any(word in filename_lower for word in ['شراكة', 'partnership', 'lpa']):
        return 'partnership'
    elif any(word in filename_lower for word in ['قرض', 'loan', 'تمويل']):
        return 'loan'
    elif any(word in filename_lower for word in ['عمل', 'employment', 'موظف', 'وظيفة']):
        return 'employment'
    elif any(word in filename_lower for word in ['بيع', 'شراء', 'sale', 'purchase']):
        return 'commercial'
    elif any(word in filename_lower for word in ['إيجار', 'rent', 'lease']):
        return 'real_estate'
    elif any(word in filename_lower for word in ['ملكية', 'intellectual', 'ip', 'ترخيص', 'license']):
        return 'intellectual'
    elif any(word in filename_lower for word in ['خدمات', 'service', 'استشار', 'consulting']):
        return 'service'
    elif any(word in filename_lower for word in ['وكالة', 'وكيل', 'agency', 'تفويض']):
        return 'agency'
    elif any(word in filename_lower for word in ['سرية', 'nda', 'confidential']):
        return 'commercial'
    else:
        return 'other'

def extract_fields_from_content(content):
    """استخراج الحقول القابلة للتعبئة من محتوى العقد"""
    if not content:
        return []
    
    # البحث عن الأنماط الشائعة للحقول
    patterns = [
        r'\{\{([^}]+)\}\}',  # {{field_name}}
        r'\[([^\]]+)\]',      # [field_name]
        r'_+\s*([A-Za-z\s]+)_+',  # ___field_name___
    ]
    
    fields = set()
    for pattern in patterns:
        matches = re.findall(pattern, content)
        fields.update(matches)
    
    # تحويل إلى قائمة من الكائنات
    field_list = []
    for field in fields:
        field_clean = field.strip()
        if field_clean and len(field_clean) > 2:
            field_list.append({
                "name": field_clean.lower().replace(" ", "_"),
                "label": field_clean,
                "type": "text",
                "required": True
            })
    
    return field_list

def extract_all_contracts():
    """استخراج جميع العقود من ملفات PDF"""
    
    # إنشاء المجلدات إذا لم تكن موجودة
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    contracts = []
    pdf_files = list(Path(PDF_DIR).glob("*.pdf"))
    
    print(f"تم العثور على {len(pdf_files)} ملف PDF")
    
    for pdf_file in pdf_files:
        print(f"معالجة: {pdf_file.name}")
        
        # استخراج النص
        content = extract_text_from_pdf(str(pdf_file))
        
        if not content:
            print(f"  ⚠️ فشل استخراج النص من {pdf_file.name}")
            continue
        
        # استخراج العنوان من اسم الملف
        title = pdf_file.stem.replace("_RamenLegal", "").replace("_رامينليجال", "")
        
        # تصنيف العقد
        category = classify_contract(pdf_file.name, content)
        
        # استخراج الحقول
        fields = extract_fields_from_content(content)
        
        contract_data = {
            "id": len(contracts) + 1,
            "title": title,
            "titleAr": title,
            "category": category,
            "source": "canadian",
            "content": content,
            "fields": fields,
            "filename": pdf_file.name,
            "description": f"نموذج {title} معاد صياغته للنظام السعودي",
            "tags": [category, "كندي", "معاد صياغته"],
            "isActive": 1
        }
        
        contracts.append(contract_data)
        
        # حفظ ملف فردي
        output_file = Path(OUTPUT_DIR) / f"{pdf_file.stem}.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(contract_data, f, ensure_ascii=False, indent=2)
        
        print(f"  ✅ تم الاستخراج - التصنيف: {category} - الحقول: {len(fields)}")
    
    # حفظ جميع العقود في ملف واحد
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(contracts, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ تم استخراج {len(contracts)} عقد بنجاح")
    print(f"📁 الملف الكامل: {OUTPUT_FILE}")
    
    # إحصائيات
    categories = {}
    for contract in contracts:
        cat = contract['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    print("\n📊 إحصائيات التصنيفات:")
    for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
        print(f"  {cat}: {count}")
    
    return contracts

if __name__ == "__main__":
    print("=" * 60)
    print("استخراج نصوص العقود من ملفات PDF")
    print("=" * 60)
    extract_all_contracts()
