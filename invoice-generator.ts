import { jsPDF } from "jspdf";
import type { Payment } from "../drizzle/schema";
import { PRODUCTS } from "../shared/products";

interface InvoiceData {
  payment: Payment;
  userName: string;
  userEmail: string;
  invoiceNumber: string;
  companyInfo: {
    name: string;
    nameEn: string;
    address: string;
    taxNumber: string;
    phone: string;
    email: string;
  };
}

export async function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
  const doc = new jsPDF();
  
  // إعدادات الخط العربي
  doc.setLanguage("ar");
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // الألوان
  const primaryColor: [number, number, number] = [30, 58, 138]; // blue-900
  const grayColor: [number, number, number] = [107, 114, 128]; // gray-500
  
  let yPos = 20;
  
  // Header - شعار وعنوان
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("INVOICE / فاتورة", pageWidth / 2, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.text(data.companyInfo.name, pageWidth / 2, 30, { align: "center" });
  
  yPos = 50;
  
  // معلومات الشركة
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text("From / من:", 20, yPos);
  
  doc.setFont('helvetica', 'normal');
  yPos += 7;
  doc.text(data.companyInfo.name, 20, yPos);
  yPos += 5;
  doc.text(data.companyInfo.address, 20, yPos);
  yPos += 5;
  doc.text(`Tax Number / الرقم الضريبي: ${data.companyInfo.taxNumber}`, 20, yPos);
  yPos += 5;
  doc.text(`Email / البريد: ${data.companyInfo.email}`, 20, yPos);
  yPos += 5;
  doc.text(`Phone / الهاتف: ${data.companyInfo.phone}`, 20, yPos);
  
  // معلومات العميل
  yPos = 50;
  doc.setFont('helvetica', 'bold');
  doc.text("To / إلى:", pageWidth - 80, yPos);
  
  doc.setFont('helvetica', 'normal');
  yPos += 7;
  doc.text(data.userName, pageWidth - 80, yPos);
  yPos += 5;
  doc.text(data.userEmail, pageWidth - 80, yPos);
  
  // معلومات الفاتورة
  yPos += 15;
  doc.setFont('helvetica', 'bold');
  doc.text(`Invoice Number / رقم الفاتورة: ${data.invoiceNumber}`, pageWidth - 80, yPos);
  yPos += 5;
  doc.setFont('helvetica', 'normal');
  const invoiceDate = new Date(data.payment.createdAt).toLocaleDateString('ar-SA');
  doc.text(`Date / التاريخ: ${invoiceDate}`, pageWidth - 80, yPos);
  
  // خط فاصل
  yPos += 15;
  doc.setDrawColor(...grayColor);
  doc.line(20, yPos, pageWidth - 20, yPos);
  
  // جدول التفاصيل
  yPos += 10;
  
  // رأس الجدول
  doc.setFillColor(240, 240, 240);
  doc.rect(20, yPos, pageWidth - 40, 10, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text("Description / الوصف", 25, yPos + 7);
  doc.text("Amount / المبلغ", pageWidth - 60, yPos + 7);
  
  yPos += 15;
  
  // تفاصيل المنتج
  doc.setFont('helvetica', 'normal');
  const productName = getProductName(data.payment.productId);
  doc.text(productName, 25, yPos);
  
  const subtotal = data.payment.amount / 100;
  doc.text(`${subtotal.toFixed(2)} ${data.payment.currency}`, pageWidth - 60, yPos);
  
  yPos += 10;
  
  // خط فاصل
  doc.setDrawColor(...grayColor);
  doc.line(20, yPos, pageWidth - 20, yPos);
  
  // المجموع الفرعي
  yPos += 8;
  doc.setFont('helvetica', 'normal');
  doc.text("Subtotal / المجموع الفرعي:", pageWidth - 100, yPos);
  doc.text(`${subtotal.toFixed(2)} ${data.payment.currency}`, pageWidth - 60, yPos);
  
  // ضريبة القيمة المضافة (15%)
  yPos += 6;
  const taxRate = 0.15;
  const taxAmount = subtotal * taxRate / (1 + taxRate);
  doc.text(`VAT (15%) / ضريبة القيمة المضافة:`, pageWidth - 100, yPos);
  doc.text(`${taxAmount.toFixed(2)} ${data.payment.currency}`, pageWidth - 60, yPos);
  
  // المبلغ قبل الضريبة
  yPos += 6;
  const amountBeforeTax = subtotal - taxAmount;
  doc.text("Amount Before Tax / المبلغ قبل الضريبة:", pageWidth - 100, yPos);
  doc.text(`${amountBeforeTax.toFixed(2)} ${data.payment.currency}`, pageWidth - 60, yPos);
  
  // خط سميك
  yPos += 4;
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 100, yPos, pageWidth - 20, yPos);
  doc.setLineWidth(0.2);
  
  // الإجمالي
  yPos += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text("Total / الإجمالي:", pageWidth - 100, yPos);
  doc.text(`${subtotal.toFixed(2)} ${data.payment.currency}`, pageWidth - 60, yPos);
  
  // حالة الدفع
  yPos += 15;
  doc.setFontSize(10);
  const paymentStatus = data.payment.status === 'succeeded' ? 'Paid / مدفوع' : 'Pending / قيد الانتظار';
  const statusColor: [number, number, number] = data.payment.status === 'succeeded' ? [34, 197, 94] : [234, 179, 8];
  doc.setTextColor(...statusColor);
  doc.text(`Payment Status / حالة الدفع: ${paymentStatus}`, 20, yPos);
  
  // Footer
  doc.setTextColor(...grayColor);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const footerY = pageHeight - 20;
  doc.text("Thank you for your business! / شكراً لتعاملكم معنا", pageWidth / 2, footerY, { align: "center" });
  doc.text(`${data.companyInfo.nameEn} - ${data.companyInfo.name}`, pageWidth / 2, footerY + 5, { align: "center" });
  
  // تحويل إلى Buffer
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  return pdfBuffer;
}

function getProductName(productId: string): string {
  if (productId === "MONTHLY") return `${PRODUCTS.MONTHLY.name} - Monthly Subscription`;
  if (productId === "YEARLY") return `${PRODUCTS.YEARLY.name} - Yearly Subscription`;
  return productId;
}
