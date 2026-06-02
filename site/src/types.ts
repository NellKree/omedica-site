export type ServiceCategory =
  | "Женское здоровье"
  | "Диагностика"
  | "Дети и семья"
  | "Реабилитация"
  | "Общие услуги";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  priceFrom: string;
  summary: string;
  suitableFor: string[];
  steps: string[];
  doctors: string[];
  faqs: FaqItem[];
  relatedArticles: string[];
  image: string;
}

export interface Doctor {
  slug: string;
  name: string;
  roles: string[];
  experience: string;
  photo: string;
  education: string[];
  services: string[];
  rating: number;
  reviewCount: number;
  strengths: string[];
  quote: string;
}

export interface ReviewInsight {
  quote: string;
  source: string;
  rating: number;
  tags: string[];
  serviceOrDoctor: string;
  author?: string;
}

export interface AppointmentFormState {
  interest?: string;
  service?: string;
  doctor?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  comment?: string;
}
