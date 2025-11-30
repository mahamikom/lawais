// تعريف الباقات والأسعار
export const PRODUCTS = {
  MONTHLY: {
    id: "monthly_subscription",
    name: "اشتراك شهري",
    nameEn: "Monthly Subscription",
    description: "وصول كامل لجميع ميزات المنصة لمدة شهر",
    price: 99, // ريال سعودي
    currency: "SAR",
    interval: "month" as const,
    features: [
      "وصول غير محدود للذكاء الاصطناعي",
      "تحليل العقود بدون قيود",
      "الوصول لجميع المحامين المعتمدين",
      "تحميل العقود بصيغة PDF",
      "استشارات قانونية فورية",
      "دعم فني على مدار الساعة"
    ]
  },
  YEARLY: {
    id: "yearly_subscription",
    name: "اشتراك سنوي",
    nameEn: "Yearly Subscription",
    description: "وصول كامل لجميع ميزات المنصة لمدة سنة (وفر 16%)",
    price: 999, // ريال سعودي
    currency: "SAR",
    interval: "year" as const,
    savings: "وفر 189 ريال",
    features: [
      "جميع ميزات الاشتراك الشهري",
      "خصم 16% على السعر السنوي",
      "أولوية في الدعم الفني",
      "جلسة استشارية مجانية شهرياً",
      "تقارير قانونية شهرية",
      "وصول مبكر للميزات الجديدة"
    ]
  }
} as const;

export type ProductId = keyof typeof PRODUCTS;

// دالة مساعدة لتحويل السعر إلى cents (Stripe يستخدم أصغر وحدة عملة)
export function getPriceInCents(productId: ProductId): number {
  return PRODUCTS[productId].price * 100;
}

// دالة للحصول على معلومات المنتج
export function getProduct(productId: ProductId) {
  return PRODUCTS[productId];
}
