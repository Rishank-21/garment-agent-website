import { listPublicCities, listPublicBrands } from "@/lib/db";
import NetworkClient from "@/components/NetworkClient";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Supply Chain & Logistics Network | Himat Textile",
  description: "Explore Himat Textile's supply chain network, logistics hubs, and transport routes across major retail markets and cities in India.",
};

export default async function NetworkPage() {
  const cities = await listPublicCities();
  const brands = await listPublicBrands();

  return (
    <NetworkClient
      cities={cities}
      brands={brands}
    />
  );
}
