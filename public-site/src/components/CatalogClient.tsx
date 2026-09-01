"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import { Product, Advertisement, Category } from "@/lib/schema";
import { HimatInquiry } from "@/components/HimatInquiry";

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
    setSubcategory("");
  };

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory = 
      category === "all" || 
      product.category === category || 
      product.category.replace(/\s+/g, "-").toLowerCase() === category.replace(/\s+/g, "-").toLowerCase() ||
      product.category.replace(/-/g, " ").toLowerCase() === category.replace(/-/g, " ").toLowerCase();
    const matchesSubcategory = !subcategory || product.subcategory === subcategory;
    return matchesCategory && matchesSubcategory;
  });
  const activeAds = initialAds.filter((ad) => ad.placement === "homepage" && ad.isActive && !hiddenAdIds.includes(ad.id));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#F5B014] selection:text-[#181511]">
      <main>
        {/* Catalog Hero Banner */}
        <section className="relative overflow-hidden bg-[#141414] px-5 pb-14 pt-32 text-[#FAF8F5] sm:px-8 lg:px-12 lg:pt-40 border-b border-black/30">
          <div className="relative mx-auto max-w-[1280px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#F5B014]">
                <span>Home</span>
                <span className="opacity-50">/</span>
                <span className="text-[#FAF8F5]/80">Garment Catalog</span>
              </div>
              <h1 className="font-serif-display text-[clamp(2.2rem,5.2vw,4.8rem)] font-black uppercase leading-[0.95] tracking-tight text-[#FAF8F5]">
                Explore Our Garment Collection.
              </h1>
              <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-[#FAF8F5]/85">
                Browse our commercially relevant wholesale selections for Men, Women, Kids, and Mill Direct Fabrics. Use our B2B enquiry desk to request specific fabric configurations, sampling runs, and customized branding packages.
              </p>
            </div>
          </div>
        </section>

        {activeAds.length > 0 && (
          <section className="px-5 pt-8 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-[1280px]">
              {activeAds.slice(0, 1).map((ad) => (
                <div key={ad.id} className="flex flex-col items-start justify-between gap-4 border border-[#E2DDD5] bg-[#FFFFFF] p-5 sm:flex-row sm:items-center rounded-xs shadow-xs">
                  <div className="flex items-center gap-4">
                    {ad.imageUrl && <img src={ad.imageUrl} alt="Sourcing highlight" className="hidden h-12 w-12 border border-[#E2DDD5] object-cover sm:block rounded-xs" />}
                    <div>
                      <span className="mono-label text-[8.5px] text-[#D98A00] font-bold uppercase">Himat sourcing highlight</span>
                      <h4 className="mt-1 font-serif-display text-lg font-bold uppercase leading-tight text-[#1A1A1A]">{ad.title}</h4>
                      {ad.description && <p className="mt-1 text-xs text-[#66625D]">{ad.description}</p>}
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 items-center justify-end gap-3 sm:w-auto">
                    {ad.linkUrl && (
                      <a href={ad.linkUrl} target="_blank" rel="noreferrer" onClick={() => recordClick(ad.id)} className="gold-button px-4 py-2.5 text-center text-[9px] font-black uppercase tracking-[.15em] rounded-xs shadow-xs">
                        {ad.buttonText || "Learn More"}
                      </a>
                    )}
                    <button onClick={() => handleHideAd(ad.id)} className="border border-[#E2DDD5] bg-white px-3 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-[#66625D] hover:border-[#F5B014] hover:text-[#D98A00] rounded-xs transition-colors">Close</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5 border-b border-[#E2DDD5] pb-6">
              <Filter size={16} className="mr-2 text-[#D98A00]" />
              <button
                onClick={() => handleCategoryClick("all")}
                className={`border px-4.5 py-2.5 text-[10.5px] font-bold uppercase tracking-[.16em] transition-all rounded-xs shadow-xs ${
                  category === "all"
                    ? "border-[#F5B014] bg-[#F5B014] text-[#181511] font-black"
                    : "border-[#E2DDD5] bg-[#FFFFFF] text-[#1A1A1A] hover:border-[#F5B014]"
                }`}
              >
                All Collections
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`border px-4.5 py-2.5 text-[10.5px] font-bold uppercase tracking-[.16em] transition-all rounded-xs shadow-xs ${
                    category === cat.slug
                      ? "border-[#F5B014] bg-[#F5B014] text-[#181511] font-black"
                      : "border-[#E2DDD5] bg-[#FFFFFF] text-[#1A1A1A] hover:border-[#F5B014]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {category !== "all" && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-[#E2DDD5] pb-5">
                <span className="mono-label text-[9px] mr-2 font-bold text-[#66625D] uppercase">Subcategories:</span>
                <button
                  onClick={() => setSubcategory("")}
                  className={`border px-3.5 py-2 text-[9.5px] font-bold uppercase tracking-[.14em] transition-colors rounded-xs ${
                    subcategory === "" ? "border-[#F5B014] bg-[#F5B014] text-[#181511] font-black" : "border-[#E2DDD5] bg-[#FFFFFF] text-[#66625D] hover:border-[#F5B014]"
                  }`}
                >
                  All {categories.find(c => c.slug === category)?.name || category}
                </button>
                {(categories.find(c => c.slug === category)?.subcategories || []).map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubcategory(sub)}
                    className={`border px-3.5 py-2 text-[9.5px] font-bold uppercase tracking-[.14em] transition-colors rounded-xs ${
                      subcategory === sub ? "border-[#F5B014] bg-[#F5B014] text-[#181511] font-black" : "border-[#E2DDD5] bg-[#FFFFFF] text-[#66625D] hover:border-[#F5B014]"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}

            {filteredProducts.length ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="group flex flex-col justify-between border border-[#E2DDD5] bg-[#FFFFFF] rounded-xs overflow-hidden transition-all hover:border-[#F5B014] hover:shadow-xl shadow-xs">
                    <div>
                      <div className="aspect-[4/3] overflow-hidden bg-[#F3EFEA]">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <span className="mono-label text-[8.5px] text-[#B87400] font-bold uppercase bg-[#FFF9E6] border border-[#F5B014]/40 px-2.5 py-1 rounded-xs">
                          {product.category} {product.subcategory ? `/ ${product.subcategory}` : ""}
                        </span>
                        <h2 className="mt-3 font-serif-display text-2xl font-bold uppercase leading-[1.05] tracking-tight text-[#1A1A1A]">
                          {product.title}
                        </h2>
                        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#66625D]">{product.description}</p>
                        <p className="mt-4 border-t border-[#E2DDD5] pt-3 text-[11px] font-mono text-[#1A1A1A] font-semibold">{product.fabricDetails}</p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-0">
                      <button
                        onClick={() => handleRequestDetails(product)}
                        className="inline-flex items-center gap-2 gold-button px-4.5 py-3 text-[10px] font-black uppercase tracking-[.16em] rounded-xs shadow-xs"
                      >
                        Request Quote <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 grid min-h-80 place-items-center border border-[#E2DDD5] bg-[#FFFFFF] p-8 text-center rounded-xs shadow-xs">
                <div>
                  <p className="font-serif-display text-3xl font-bold uppercase tracking-tight text-[#1A1A1A]">The live catalog is being prepared.</p>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#66625D]">Tell Himat Textile what category, fabric, market and quantity you have in mind. The team can guide your next garment brief.</p>
                  <a href="#enquiry" className="gold-button mt-6 inline-flex items-center gap-2 px-6 py-3.5 text-[10px] font-black uppercase tracking-[.16em] rounded-xs shadow-sm">Start an inquiry <ArrowUpRight size={14} /></a>
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
