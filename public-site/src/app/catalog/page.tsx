import { listPublicProducts, listPublicAdvertisements, listPublicCategories } from "@/lib/db";
import CatalogClient from "@/components/CatalogClient";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Garment Catalog | Himat Textile — Browse Sourcing Categories",
  description: "Explore our wholesale garment catalog categories including men's wear, women's wear, and kids' wear fabric details, style specifications, and wholesale pricing.",
};

interface PageProps {
  searchParams: Promise<{ category?: string; subcategory?: string }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const products = await listPublicProducts(resolvedSearchParams.category, resolvedSearchParams.subcategory);
  const advertisements = await listPublicAdvertisements();
  const categories = await listPublicCategories();

  return (
    <CatalogClient
      initialProducts={products}
      initialAds={advertisements}
      initialCategory={resolvedSearchParams.category}
      initialSubcategory={resolvedSearchParams.subcategory}
      categories={categories}
    />
  );
}
