import { listPublicProducts, listPublicAdvertisements } from "@/lib/db";
import CatalogClient from "@/components/CatalogClient";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Garment Catalog | Himat Textile — Browse Sourcing Categories",
  description: "Explore our wholesale garment catalog categories including men's wear, women's wear, and kids' wear fabric details, style specifications, and MOQs.",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const products = await listPublicProducts();
  const advertisements = await listPublicAdvertisements();

  return (
    <CatalogClient
      initialProducts={products}
      initialAds={advertisements}
      initialCategory={resolvedSearchParams.category}
    />
  );
}
