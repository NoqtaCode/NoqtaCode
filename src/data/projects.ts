import type { Project } from '../types'

export const projects: Project[] = [
  { id: 'orbit', title: 'نخيل وسياج المملكة', category: 'مواقع إلكترونية', summary: 'موقع لخدمات تنسيق النخيل والسياج.', goal: 'عرض الخدمات التي يقدمها الموقع بوضوح.', design: 'موقع تعريفي بخدمات المشروع.', palette: '#7774ff', variant: 'orbit', initials: 'ن', previewImage: '/projects/orbit.svg', logoImage: '/projects/nakheel-seyaj.png', websiteUrl: 'https://www.nakheel-seyaj.com/' },
  { id: 'sakan', title: 'مقاول شبوك وسياجات أمنية', category: 'مواقع إلكترونية', summary: 'موقع متخصص بخدمات الشبوك.', goal: 'التعريف بالخدمات وتسهيل الوصول إلى معلوماتها.', design: 'موقع تعريفي بخدمات المشروع.', palette: '#b78b63', variant: 'sakan', initials: 'ش', previewImage: '/projects/sakan.svg', logoImage: '/projects/shabouk-pro.png', websiteUrl: 'https://www.shabouk-pro.com/' },
  { id: 'nawa', title: 'مؤسسة للمقاولات العامة', category: 'مواقع إلكترونية', summary: 'موقع للمقاولات العامة وأعمال التنفيذ.', goal: 'عرض مجالات العمل والخدمات بطريقة واضحة.', design: 'موقع تعريفي بخدمات المشروع.', palette: '#a2ad7b', variant: 'nawa', initials: 'أ', previewImage: '/projects/nawa.svg', logoImage: '/projects/abusaleh-ksa.jpg', websiteUrl: 'https://www.abusaleh-ksa.com/' },
  { id: 'sahab', title: 'سحاب للأعمال', category: 'مواقع شركات', summary: 'موقع تعريفي تصوري لخدمات استشارية مهنية.', goal: 'تعزيز وضوح الخدمات وتسهيل طلب الاستشارة.', design: 'تخطيط تحريري أنيق، وتباين أزرق، وعناوين مباشرة.', palette: '#5594ca', variant: 'sahab', initials: 'س', previewImage: '/projects/sahab.svg' },
  { id: 'mizan', title: 'ميزان', category: 'صفحات هبوط', summary: 'صفحة هبوط تصورية لأداة رقمية لإدارة المصروفات.', goal: 'شرح الفائدة الرئيسية وتشجيع المستخدم على استكشاف المنتج.', design: 'ألوان ليمونية على خلفية داكنة مع عرض مبسط للوحة تحكم.', palette: '#c4db65', variant: 'mizan', initials: 'م', previewImage: '/projects/mizan.svg' },
  { id: 'rawi', title: 'راوي', category: 'صفحات هبوط', summary: 'صفحة إطلاق تصورية لمنصة قراءة صوتية.', goal: 'تقديم الفكرة ومزاياها بأسلوب إنساني سهل التذكر.', design: 'درجات بنفسجية دافئة وعناصر صوتية مرئية ومساحة تنفس.', palette: '#ba83cf', variant: 'rawi', initials: 'ر', previewImage: '/projects/rawi.svg' },
]

// Only these first three projects are shown in the public portfolio; replace their previewImage and websiteUrl with the real project assets and URLs.
export const portfolioProjects = projects.slice(0, 3)
