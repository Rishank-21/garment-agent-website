import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Himat Textile — Your Garment Guide in Ahmedabad",
  description: "Himat Textile is a B2B garment sourcing and buying support partner based in Ahmedabad, helping retailers, wholesalers, and fashion businesses find the right products from reliable suppliers.",
};

export default function AboutPage() {
  return <AboutClient />;
}
