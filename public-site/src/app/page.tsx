import { listPublicReviews, listPublicBrands, listPublicAdvertisements } from "@/lib/db";
import HomeClient from "@/components/HomeClient";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Garment Sourcing Agent in Ahmedabad | Wholesale Garment Supplier | Himat Textile",

  description:
    "Himat Textile connects buyers with trusted garment manufacturers and suppliers in Ahmedabad. Find quality apparel, wholesale garment products, private labeling solutions, and sourcing support at competitive prices.",
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
