import type { Metadata } from "next";
import ReviewsClient from "@/components/ReviewsClient";
import { listPublicReviews } from "@/lib/db";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials — Himat Textile Ahmedabad",
  description: "Read verified reviews and feedback from retailers, wholesalers, and fashion brands who source garments through Himat Textile in Ahmedabad.",
};

export const revalidate = 60;

export default async function ReviewsPage() {
  const reviews = await listPublicReviews();
  return <ReviewsClient initialReviews={reviews} />;
}
