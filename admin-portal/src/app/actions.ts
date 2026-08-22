"use server";

import * as db from "@/lib/db";
import {
  ProductValues,
  AdvertisementValues,
  ReviewValues,
  BrandValues,
  CityValues,
  BusinessGuideValues
} from "@/lib/schema";
import { revalidatePath } from "next/cache";

// Products Actions
export async function listProducts() {
  return db.listAdminProducts();
}

export async function createProduct(values: ProductValues) {
  const p = await db.createProduct(values);
  revalidatePath("/");
  return p;
}

export async function updateProduct(id: number, values: Partial<ProductValues>) {
  const p = await db.updateProduct(id, values);
  revalidatePath("/");
  return p;
}

export async function deleteProduct(id: number) {
  await db.deleteProduct(id);
  revalidatePath("/");
}

// Advertisements Actions
export async function listAdvertisements() {
  return db.listAdminAdvertisements();
}

export async function createAdvertisement(values: AdvertisementValues) {
  const ad = await db.createAdvertisement(values);
  revalidatePath("/");
  return ad;
}

export async function updateAdvertisement(id: number, values: Partial<AdvertisementValues>) {
  const ad = await db.updateAdvertisement(id, values);
  revalidatePath("/");
  return ad;
}

export async function deleteAdvertisement(id: number) {
  await db.deleteAdvertisement(id);
  revalidatePath("/");
}

// Inquiries Actions
export async function listInquiries() {
  return db.listInquiries();
}

export async function updateInquiry(
  id: number,
  values: { status?: "NEW" | "REPLIED" | "ARCHIVED"; adminNotes?: string | null }
) {
  const inq = await db.updateInquiry(id, values);
  revalidatePath("/");
  return inq;
}

export async function deleteInquiry(id: number) {
  await db.deleteInquiry(id);
  revalidatePath("/");
}

// Reviews Actions
export async function listReviews() {
  return db.listAdminReviews();
}

export async function createReview(values: ReviewValues) {
  const rev = await db.createReview(values);
  revalidatePath("/");
  return rev;
}

export async function updateReview(id: number, values: Partial<ReviewValues>) {
  const rev = await db.updateReview(id, values);
  revalidatePath("/");
  return rev;
}

export async function deleteReview(id: number) {
  await db.deleteReview(id);
  revalidatePath("/");
}

// Brands Actions
export async function listBrands() {
  return db.listAdminBrands();
}

export async function createBrand(values: BrandValues) {
  const brand = await db.createBrand(values);
  revalidatePath("/");
  return brand;
}

export async function updateBrand(id: number, values: Partial<BrandValues>) {
  const brand = await db.updateBrand(id, values);
  revalidatePath("/");
  return brand;
}

export async function deleteBrand(id: number) {
  await db.deleteBrand(id);
  revalidatePath("/");
}

// Cities Actions
export async function listCities() {
  return db.listAdminCities();
}

export async function createCity(values: CityValues) {
  const city = await db.createCity(values);
  revalidatePath("/");
  return city;
}

export async function updateCity(id: number, values: Partial<CityValues>) {
  const city = await db.updateCity(id, values);
  revalidatePath("/");
  return city;
}

export async function deleteCity(id: number) {
  await db.deleteCity(id);
  revalidatePath("/");
}

// Business Guides Actions
export async function listBusinessGuides() {
  return db.listAdminBusinessGuides();
}

export async function createBusinessGuide(values: BusinessGuideValues) {
  const guide = await db.createBusinessGuide(values);
  revalidatePath("/");
  return guide;
}

export async function updateBusinessGuide(id: number, values: Partial<BusinessGuideValues>) {
  const guide = await db.updateBusinessGuide(id, values);
  revalidatePath("/");
  return guide;
}

export async function deleteBusinessGuide(id: number) {
  await db.deleteBusinessGuide(id);
  revalidatePath("/");
}

// Settings Actions
export async function listSettings() {
  return db.listSettings();
}

export async function setSetting(key: string, value: string) {
  await db.setSetting(key, value);
  revalidatePath("/");
}
