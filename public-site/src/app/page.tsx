import { listPublicReviews, listPublicBrands, listPublicAdvertisements } from "@/lib/db";
import HomeClient from "@/components/HomeClient";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Himat Textile — B2B Garment Manufacturer & Sourcing Partner",
  description: "Himat Textile is a premium B2B garment partner for wholesale catalog sourcing, custom private label production, and global apparel exports from Ahmedabad, India.",
};

export default async function HomePage() {
  const reviews = await listPublicReviews();
  const brands = await listPublicBrands();
  const advertisements = await listPublicAdvertisements();

  return (
    <HomeClient
      reviews={reviews}
      brands={brands}
      advertisements={advertisements}
    />
  );
}
