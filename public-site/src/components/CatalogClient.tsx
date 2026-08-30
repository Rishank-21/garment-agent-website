"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import { Product, Advertisement, Category } from "@/lib/schema";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";

interface CatalogClientProps {
  initialProducts: Product[];
  initialAds: Advertisement[];
  initialCategory?: string;
  initialSubcategory?: string;
  categories: Category[];
}

export default function CatalogClient({ initialProducts, initialAds, initialCategory, initialSubcategory, categories }: CatalogClientProps) {
  const [category, setCategory] = useState<string>(() => {
    return initialCategory || "all";
  });
  const [subcategory, setSubcategory] = useState<string>(() => {
    return initialSubcategory || "";
  });
  const [hiddenAdIds, setHiddenAdIds] = useState<number[]>([]);
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquiryInterest, setInquiryInterest] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hidden_ad_ids");
      if (saved) setHiddenAdIds(JSON.parse(saved));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleHideAd = (id: number) => {
    const next = [...hiddenAdIds, id];
    setHiddenAdIds(next);
    try { localStorage.setItem("hidden_ad_ids", JSON.stringify(next)); } catch (error) { console.error(error); }
  };

  const recordClick = async (id: number) => {
    try {
      await fetch("/api/advertisements/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "click" }),
      });
    } catch (error) {
      console.warn("Failed to record ad action:", error);
    }
  };

  const handleRequestDetails = (product: Product) => {
    setInquiryInterest(product.category);
    setInquiryMessage(`Hello Himat Textile,\n\nI would like to request fabric details and pricing for the following catalog item:\n\n- Product: ${product.title}\n- Category: ${product.category}\n\nPlease let me know the next steps.`);
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (catSlug: string) => {
    setCategory(catSlug);
    setSubcategory(""); // Reset subcategory when switching main category
  };

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesSubcategory = !subcategory || product.subcategory === subcategory;
    return matchesCategory && matchesSubcategory;
  });
  const activeAds = initialAds.filter((ad) => ad.placement === "homepage" && ad.isActive && !hiddenAdIds.includes(ad.id));

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#C89A3D] selection:text-[#FFFFFF]">
      <main>
        <EditorialPageIntro
          eyebrow="03 / Our Garment Collection"
          title={<>Find the right<br /><span className="text-transparent stroke-text">garments</span><br />for your market.</>}
          description="Browse active garment listings when available, or use the category view to begin a sourcing conversation with Himat Textile. Product specifications and wholesale details are verified directly in the enquiry process."
          image="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1400"
          imageAlt="Garment collection racks"
          ctaLabel="Start a sourcing enquiry"
          ctaHref="#enquiry"
        />

        {activeAds.length > 0 && (
          <section className="paper-surface px-5 pt-8 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-[1280px]">
              {activeAds.slice(0, 1).map((ad) => (
                <div key={ad.id} className="flex flex-col items-start justify-between gap-4 border border-[#E8E2D8] bg-[#F6F3ED] p-5 sm:flex-row sm:items-center rounded-xl">
                  <div className="flex items-center gap-4">
                    {ad.imageUrl && <img src={ad.imageUrl} alt="Sourcing highlight" className="hidden h-12 w-12 border border-[#E8E2D8] object-cover sm:block rounded-md" />}
                    <div>
                      <span className="mono-label text-[8px] text-[#667085] font-bold">Himat sourcing highlight</span>
                      <h4 className="mt-1 font-display text-lg font-bold uppercase leading-tight text-[#0A1F2B]">{ad.title}</h4>
                      {ad.description && <p className="mt-1 text-xs text-[#667085]">{ad.description}</p>}
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 items-center justify-end gap-3 sm:w-auto">
                    {ad.linkUrl && (
                      <a href={ad.linkUrl} target="_blank" rel="noreferrer" onClick={() => recordClick(ad.id)} className="gold-button px-4 py-2.5 text-center text-[9px] font-bold uppercase tracking-[.15em] rounded-md">
                        {ad.buttonText || "Learn More"}
                      </a>
                    )}
                    <button onClick={() => handleHideAd(ad.id)} className="border border-[#E8E2D8] px-3 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-[#667085] hover:border-[#C89A3D] rounded-md transition-colors">Close</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="paper-surface px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E2D8] pb-5">
              <Filter size={15} className="mr-2 text-[#C89A3D]" />
              <button
                onClick={() => handleCategoryClick("all")}
                className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] transition-colors rounded-md ${category === "all" ? "border-[#C89A3D] bg-[#C89A3D] text-[#FFFFFF]" : "border-[#E8E2D8] text-[#667085] hover:border-[#C89A3D]"}`}
              >
                All Collection
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] transition-colors rounded-md ${category === cat.slug ? "border-[#C89A3D] bg-[#C89A3D] text-[#FFFFFF]" : "border-[#E8E2D8] text-[#667085] hover:border-[#C89A3D]"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {category !== "all" && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-[#E8E2D8] pb-5">
                <span className="mono-label text-[9px] mr-2 text-[#667085]">Subcategories:</span>
                <button
                  onClick={() => setSubcategory("")}
                  className={`border px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] transition-colors rounded-md ${subcategory === "" ? "border-[#C89A3D] bg-[#C89A3D]/10 text-[#C89A3D]" : "border-[#E8E2D8] text-[#667085] hover:border-[#C89A3D]"}`}
                >
                  All {categories.find(c => c.slug === category)?.name || category}
                </button>
                {(categories.find(c => c.slug === category)?.subcategories || []).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubcategory(sub)}
                    className={`border px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] transition-colors rounded-md ${subcategory === sub ? "border-[#C89A3D] bg-[#C89A3D]/10 text-[#C89A3D]" : "border-[#E8E2D8] text-[#667085] hover:border-[#C89A3D]"}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {filteredProducts.length ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="group flex flex-col justify-between border border-[#E8E2D8] bg-[#FFFFFF] rounded-xl overflow-hidden transition-all hover:border-[#C89A3D] hover:shadow-lg">
                    <div>
                      <div className="aspect-[4/3] overflow-hidden bg-[#F6F3ED]">
                        {product.imageUrl && <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
                      </div>
                      <div className="p-6">
                        <p className="mono-label text-[10px] text-[#C89A3D] font-bold">{product.category} {product.subcategory ? `/ ${product.subcategory}` : ""}</p>
                        <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-[.95] tracking-tight text-[#0A1F2B]">{product.title}</h2>
                        <p className="mt-4 text-sm leading-6 text-[#667085]">{product.description}</p>
                        <p className="mt-5 border-t border-[#E8E2D8] pt-4 text-xs text-[#667085]">{product.fabricDetails}</p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-0">
                      <button onClick={() => handleRequestDetails(product)} className="inline-flex items-center gap-2 border-b border-transparent text-[10px] font-bold uppercase tracking-[.15em] text-[#C89A3D] transition-all hover:border-[#C89A3D] pt-4">Request details <ArrowUpRight size={14} /></button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 grid min-h-80 place-items-center border border-[#E8E2D8] bg-[#F6F3ED] p-8 text-center rounded-xl">
                <div>
                  <p className="font-display text-3xl font-bold uppercase tracking-tight text-[#0A1F2B]">The live catalog is being prepared.</p>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#667085]">Tell Himat Textile what category, fabric, market and quantity you have in mind. The team can guide your next garment brief.</p>
                  <a href="#enquiry" className="gold-button mt-7 inline-flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-[.15em] rounded-md">Start an inquiry <ArrowUpRight size={14} /></a>
                </div>
              </div>
            )}
          </div>
        </section>
        <HimatInquiry initialMessage={inquiryMessage} initialProductInterest={inquiryInterest} />
      </main>
    </div>
  );
}
