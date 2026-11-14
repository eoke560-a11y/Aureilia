export interface Department {
  id: number;
  slug: string;
  name: string;
  facultyCode: string;
  headOfDepartment: string;
  location: string;
  description: string;
  email: string;
  facultyCount: number;
  imageUrl: string;
}

export interface Course {
  id: number;
  slug: string;
  code: string;
  title: string;
  departmentId: number | null;
  department?: Department | null;
  qualificationLevel: string;
  duration: string;
  studyMode: string;
  credits: string;
  summary: string;
  overview: string;
  entryRequirements: string;
  careerOpportunities: string;
  tuitionFee: string;
  imageUrl: string;
  featured: boolean;
}

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
}

export interface UniversityEvent {
  id: number;
  slug: string;
  title: string;
  category: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  registrationUrl: string;
  imageUrl: string;
  featured: boolean;
}

export interface ContactSubmission {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  department: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscribedAt: string;
}

export type SiteSettings = Record<string, string>;
