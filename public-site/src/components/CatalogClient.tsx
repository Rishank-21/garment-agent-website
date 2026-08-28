"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import { Product, Advertisement } from "@/lib/schema";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";

const categories = ["all", "mens wear", "womens wear", "kids wear"] as const;

interface CatalogClientProps {
  initialProducts: Product[];
  initialAds: Advertisement[];
  initialCategory?: string;
}

export default function CatalogClient({ initialProducts, initialAds, initialCategory }: CatalogClientProps) {
  const [category, setCategory] = useState<(typeof categories)[number]>(() => {
    const normalized = initialCategory?.toLowerCase().trim();
    if (normalized === "mens wear" || normalized === "men's wear") return "mens wear";
    if (normalized === "womens wear" || normalized === "women's wear") return "womens wear";
    if (normalized === "kids wear" || normalized === "kid's wear" || normalized === "kids' wear") return "kids wear";
    return "all";
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
    setInquiryMessage(`Hello Himat Textile,\n\nI would like to request fabric details, pricing, and MOQ options for the following catalog item:\n\n- Product: ${product.title}\n- Category: ${product.category}\n- MOQ: ${product.moq}\n\nPlease let me know the next steps.`);
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = category === "all" ? initialProducts : initialProducts.filter((product) => product.category === category);
  const activeAds = initialAds.filter((ad) => ad.placement === "homepage" && ad.isActive && !hiddenAdIds.includes(ad.id));

  return (
    <div className="min-h-screen bg-[#151613] text-[#f7f2e9]">
      <main>
        <EditorialPageIntro
          eyebrow="03 / Our Garment Collection"
          title={<>Find the right<br /><span className="text-transparent stroke-text">garments</span><br />for your market.</>}
          description="Browse active garment listings when available, or use the category view to begin a sourcing conversation with Himat Textile. Product details and MOQ are verified directly in the enquiry process."
          image="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1400"
          imageAlt="Garment collection racks"
          ctaLabel="Start a sourcing enquiry"
          ctaHref="#enquiry"
        />

        {activeAds.length > 0 && (
          <section className="paper-surface px-5 pt-8 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-[1440px]">
              {activeAds.slice(0, 1).map((ad) => (
                <div key={ad.id} className="flex flex-col items-start justify-between gap-4 border border-[#151613]/15 bg-[#e9e2d5] p-5 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    {ad.imageUrl && <img src={ad.imageUrl} alt="Sourcing highlight" className="hidden h-12 w-12 border border-[#151613]/15 object-cover sm:block" />}
                    <div>
                      <span className="mono-label text-[8px] text-[#151613]/45">Himat sourcing highlight</span>
                      <h4 className="mt-1 font-display text-lg font-black uppercase leading-tight">{ad.title}</h4>
                      {ad.description && <p className="mt-1 text-xs text-[#151613]/65">{ad.description}</p>}
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 items-center justify-end gap-3 sm:w-auto">
                    {ad.linkUrl && (
                      <a href={ad.linkUrl} target="_blank" rel="noreferrer" onClick={() => recordClick(ad.id)} className="gold-button border border-[#ffb800] px-4 py-2.5 text-center text-[9px] font-bold uppercase tracking-[.15em]">
                        {ad.buttonText || "Learn More"}
                      </a>
                    )}
                    <button onClick={() => handleHideAd(ad.id)} className="border border-[#151613]/25 px-3 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-[#151613]/60 hover:border-[#f05a24]">Close</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="paper-surface px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-wrap items-center gap-2 border-b border-[#151613]/15 pb-5">
              <Filter size={15} className="mr-2 text-[#f05a24]" />
              {categories.map((item) => (
                <button key={item} onClick={() => setCategory(item)} className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] transition-colors ${category === item ? "border-[#f05a24] bg-[#f05a24] text-[#f7f2e9]" : "border-[#151613]/25 text-[#151613]/60 hover:border-[#f05a24]"}`}>
                  {item}
                </button>
              ))}
            </div>

            {filteredProducts.length ? (
              <div className="mt-10 grid gap-px bg-[#151613]/15 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="group bg-[#f7f2e9]">
                    <div className="aspect-[4/3] overflow-hidden bg-[#e9e2d5]">
                      {product.imageUrl && <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
                    </div>
                    <div className="p-6">
                      <p className="mono-label text-[10px] text-[#f05a24]">{product.category} / MOQ {product.moq}</p>
                      <h2 className="mt-3 font-display text-3xl font-black uppercase leading-[.9] tracking-[-.07em] text-[#151613]">{product.title}</h2>
                      <p className="mt-4 text-sm leading-6 text-[#151613]/65">{product.description}</p>
                      <p className="mt-5 border-t border-[#151613]/15 pt-4 text-xs text-[#151613]/65">{product.fabricDetails}</p>
                      <button onClick={() => handleRequestDetails(product)} className="mt-6 inline-flex items-center gap-2 border-b border-transparent text-[10px] font-bold uppercase tracking-[.15em] text-[#151613] transition-all hover:border-[#f05a24]">Request details <ArrowUpRight size={14} /></button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 grid min-h-80 place-items-center border border-[#151613]/15 bg-[#e9e2d5] p-8 text-center">
                <div>
                  <p className="font-display text-3xl font-black uppercase tracking-[-.07em] text-[#151613]">The live catalog is being prepared.</p>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#151613]/60">Tell Himat Textile what category, fabric, market and quantity you have in mind. The team can guide your next garment brief.</p>
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
