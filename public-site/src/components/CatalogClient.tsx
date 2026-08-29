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
    <div className="min-h-screen bg-[#161612] text-[#F4EFE6]">
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
            <div className="mx-auto max-w-[1440px]">
              {activeAds.slice(0, 1).map((ad) => (
                <div key={ad.id} className="flex flex-col items-start justify-between gap-4 border border-[#161612]/15 bg-[#E7E0D3] p-5 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    {ad.imageUrl && <img src={ad.imageUrl} alt="Sourcing highlight" className="hidden h-12 w-12 border border-[#161612]/15 object-cover sm:block" />}
                    <div>
                      <span className="mono-label text-[8px] text-[#161612]/45">Himat sourcing highlight</span>
                      <h4 className="mt-1 font-display text-lg font-black uppercase leading-tight">{ad.title}</h4>
                      {ad.description && <p className="mt-1 text-xs text-[#161612]/65">{ad.description}</p>}
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 items-center justify-end gap-3 sm:w-auto">
                    {ad.linkUrl && (
                      <a href={ad.linkUrl} target="_blank" rel="noreferrer" onClick={() => recordClick(ad.id)} className="gold-button border border-[#C19040] px-4 py-2.5 text-center text-[9px] font-bold uppercase tracking-[.15em]">
                        {ad.buttonText || "Learn More"}
                      </a>
                    )}
                    <button onClick={() => handleHideAd(ad.id)} className="border border-[#161612]/25 px-3 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-[#161612]/60 hover:border-[#C95A1A]">Close</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="paper-surface px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-wrap items-center gap-2 border-b border-[#161612]/15 pb-5">
              <Filter size={15} className="mr-2 text-[#C95A1A]" />
              <button
                onClick={() => handleCategoryClick("all")}
                className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] transition-colors ${category === "all" ? "border-[#C95A1A] bg-[#C95A1A] text-[#F4EFE6]" : "border-[#161612]/25 text-[#161612]/60 hover:border-[#C95A1A]"}`}
              >
                All Collection
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] transition-colors ${category === cat.slug ? "border-[#C95A1A] bg-[#C95A1A] text-[#F4EFE6]" : "border-[#161612]/25 text-[#161612]/60 hover:border-[#C95A1A]"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {category !== "all" && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-[#161612]/15 pb-5">
                <span className="mono-label text-[9px] mr-2 text-[#161612]/45">Subcategories:</span>
                <button
                  onClick={() => setSubcategory("")}
                  className={`border px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] transition-colors ${subcategory === "" ? "border-[#C95A1A] bg-[#C95A1A]/10 text-[#C95A1A]" : "border-[#161612]/15 text-[#161612]/50 hover:border-[#C95A1A]"}`}
                >
                  All {categories.find(c => c.slug === category)?.name || category}
                </button>
                {(categories.find(c => c.slug === category)?.subcategories || []).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubcategory(sub)}
                    className={`border px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] transition-colors ${subcategory === sub ? "border-[#C95A1A] bg-[#C95A1A]/10 text-[#C95A1A]" : "border-[#161612]/15 text-[#161612]/50 hover:border-[#C95A1A]"}`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {filteredProducts.length ? (
              <div className="mt-10 grid gap-px bg-[#161612]/15 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="group bg-[#F4EFE6]">
                    <div className="aspect-[4/3] overflow-hidden bg-[#E7E0D3]">
                      {product.imageUrl && <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
                    </div>
                    <div className="p-6">
                      <p className="mono-label text-[10px] text-[#C95A1A]">{product.category} {product.subcategory ? `/ ${product.subcategory}` : ""}</p>
                      <h2 className="mt-3 font-display text-3xl font-black uppercase leading-[.9] tracking-[-.07em] text-[#161612]">{product.title}</h2>
                      <p className="mt-4 text-sm leading-6 text-[#161612]/65">{product.description}</p>
                      <p className="mt-5 border-t border-[#161612]/15 pt-4 text-xs text-[#161612]/65">{product.fabricDetails}</p>
                      <button onClick={() => handleRequestDetails(product)} className="mt-6 inline-flex items-center gap-2 border-b border-transparent text-[10px] font-bold uppercase tracking-[.15em] text-[#161612] transition-all hover:border-[#C95A1A]">Request details <ArrowUpRight size={14} /></button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 grid min-h-80 place-items-center border border-[#161612]/15 bg-[#E7E0D3] p-8 text-center">
                <div>
                  <p className="font-display text-3xl font-black uppercase tracking-[-.07em] text-[#161612]">The live catalog is being prepared.</p>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#161612]/60">Tell Himat Textile what category, fabric, market and quantity you have in mind. The team can guide your next garment brief.</p>
                  <a href="#enquiry" className="orange-button mt-7 inline-flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-[.15em]">Start an inquiry <ArrowUpRight size={14} /></a>
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
