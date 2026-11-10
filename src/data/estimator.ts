export const estimateProjectTypes = [
  { id: 'company', label: 'موقع شركة', base: 700, includedPages: 4 },
  { id: 'store', label: 'متجر إلكتروني', base: 1000, includedPages: 5 },
  { id: 'landing', label: 'صفحة هبوط', base: 700, includedPages: 1 },
  { id: 'portfolio', label: 'موقع أعمال', base: 700, includedPages: 4 },
] as const

export const estimateFeatures = [
  { id: 'blog', label: 'قسم مقالات', min: 100, max: 180 },
  { id: 'booking', label: 'نموذج حجز أو طلب', min: 120, max: 220 },
  { id: 'catalog', label: 'كتالوج أو قائمة منتجات', min: 150, max: 300 },
  { id: 'motion', label: 'حركة وتفاعلات إضافية', min: 100, max: 200 },
] as const

export const additionalPageRange = { min: 80, max: 120 }
