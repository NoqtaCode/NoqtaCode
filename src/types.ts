export type ProjectCategory = 'الكل' | 'مواقع إلكترونية' | 'مواقع شركات' | 'متاجر إلكترونية' | 'صفحات هبوط'
export type Project = {
  id: string; title: string; category: Exclude<ProjectCategory, 'الكل'>; summary: string
  goal: string; design: string; palette: string; variant: string; initials: string; previewImage: string; logoImage?: string; websiteUrl?: string
}
