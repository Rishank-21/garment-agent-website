/**
 * Pure TypeScript types/interfaces matching the database schemas.
 * Drizzle ORM/MySQL dependencies have been removed.
 */

export interface User {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  loginMethod: string | null;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
}

export type InsertUser = {
  openId: string;
  name?: string | null;
  email?: string | null;
  loginMethod?: string | null;
  role?: "user" | "admin";
  lastSignedIn?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  category: "mens wear" | "womens wear" | "kids wear";
  fabricDetails: string;
  moq: string;
  style: string | null;
  targetMarket: string | null;
  description: string;
  imageUrl: string | null;
  imageKey: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductValues = {
  title: string;
  slug: string;
  category: "mens wear" | "womens wear" | "kids wear";
  fabricDetails: string;
  moq: string;
  style?: string | null;
  targetMarket?: string | null;
  description: string;
  imageUrl?: string | null;
  imageKey?: string | null;
  isActive?: boolean;
};

export type Advertisement = {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
  mobileImage: string | null;
  imageKey: string | null;
  linkUrl: string | null;
  buttonText: string | null;
  placement: string;
  type: string; // Defaults to "banner", non-nullable string
  priority: number;
  targetCities: string | null; // JSON array of targeted city names
  isActive: boolean;
  status: string; // DRAFT, SCHEDULED, ACTIVE, PAUSED, EXPIRED
  startsAt: Date | null;
  endsAt: Date | null;
  impressions: number;
  clicks: number;
  whatsappClicks: number;
  createdAt: Date;
  updatedAt: Date;
};

export type AdvertisementValues = {
  title: string;
  description?: string | null;
  imageUrl: string;
  mobileImage?: string | null;
  imageKey?: string | null;
  linkUrl?: string | null;
  buttonText?: string | null;
  placement?: string;
  type?: string;
  priority?: number;
  targetCities?: string | null;
  isActive?: boolean;
  status?: string;
  startsAt?: Date | null;
  endsAt?: Date | null;
};

export type Inquiry = {
  id: number;
  companyName: string;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  productInterest: string;
  quantity: string;
  message: string;
  status: "NEW" | "REPLIED" | "ARCHIVED";
  adminNotes: string | null;
  station: string | null;
  createdAt: Date;
};

export type InquiryValues = {
  companyName: string;
  contactName?: string | null;
  email?: string | null;
  phone?: string | null;
  productInterest: string;
  quantity: string;
  message: string;
  status?: "NEW" | "REPLIED" | "ARCHIVED";
  adminNotes?: string | null;
  station?: string | null;
};

export type Brand = {
  id: number;
  name: string;
  logoUrl: string;
  logoKey: string | null;
  isActive: boolean;
  createdAt: Date;
};

export type BrandValues = {
  name: string;
  logoUrl: string;
  logoKey?: string | null;
  isActive?: boolean;
};

export type City = {
  id: number;
  name: string;
  latitude: string | null;
  longitude: string | null;
  isActive: boolean;
  createdAt: Date;
};

export type CityValues = {
  name: string;
  latitude?: string | null;
  longitude?: string | null;
  isActive?: boolean;
};

export type BusinessGuide = {
  id: number;
  slug: string;
  title: string;
  content: string;
  coverImage: string | null;
  coverImageKey: string | null;
  status: string; // DRAFT, PUBLISHED
  views: number;
  createdAt: Date;
  updatedAt: Date;
};

export type BusinessGuideValues = {
  slug: string;
  title: string;
  content: string;
  coverImage?: string | null;
  coverImageKey?: string | null;
  status?: string;
};

export type Review = {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string | null; // e.g. "2 weeks ago"
  isActive: boolean;
  createdAt: Date;
};

export type ReviewValues = {
  author: string;
  rating?: number;
  text: string;
  date?: string | null;
  isActive?: boolean;
};

export type Setting = {
  id: number;
  key: string;
  value: string;
  updatedAt: Date;
};
