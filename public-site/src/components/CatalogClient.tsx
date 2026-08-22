"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Filter } from "lucide-react";
import { Product, Advertisement } from "@/lib/schema";
import { HimatInquiry } from "@/components/HimatInquiry";

const categories = ["all", "mens wear", "womens wear", "kids wear"] as const;

interface CatalogClientProps {
  initialProducts: Product[];
  initialAds: Advertisement[];
  initialCategory?: string;
}

export default function CatalogClient({ initialProducts, initialAds, initialCategory }: CatalogClientProps) {
  const [category, setCategory] = useState<(typeof categories)[number]>(() => {
    if (initialCategory) {
      const normalized = initialCategory.toLowerCase().trim();
      if (normalized === "mens wear" || normalized === "men's wear") {
        return "mens wear";
      }
      if (normalized === "womens wear" || normalized === "women's wear") {
        return "womens wear";
      }
      if (normalized === "kids wear" || normalized === "kid's wear" || normalized === "kids' wear") {
        return "kids wear";
      }
    }
    return "all";
  });
  const [hiddenAdIds, setHiddenAdIds] = useState<number[]>([]);
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquiryInterest, setInquiryInterest] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hidden_ad_ids");
      if (saved) {
        setHiddenAdIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleHideAd = (id: number) => {
    const next = [...hiddenAdIds, id];
    setHiddenAdIds(next);
    try {
      localStorage.setItem("hidden_ad_ids", JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const recordClick = async (id: number) => {
    try {
      await fetch("/api/advertisements/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "click" }),
      });
    } catch (e) {
      console.warn("Failed to record ad action:", e);
    }
  };

  const handleRequestDetails = (product: Product) => {
    setInquiryInterest(product.category);
    setInquiryMessage(
      `Hello Himat Textile,\n\nI would like to request fabric details, pricing, and MOQ options for the following catalog item:\n\n- Product: ${product.title}\n- Category: ${product.category}\n- MOQ: ${product.moq}\n\nPlease let me know the next steps.`
    );
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter products based on selected category client-side (extremely fast!)
  const filteredProducts = category === "all" 
    ? initialProducts 
    : initialProducts.filter(p => p.category === category);

  const activeAds = initialAds.filter(
    (ad) => ad.placement === "homepage" && ad.isActive && !hiddenAdIds.includes(ad.id)
  );

  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <main className="pt-[76px]">
        {/* Banner Advertisements */}
        {activeAds.length > 0 && (
          <div className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-12">
            {activeAds.slice(0, 1).map((ad) => (
              <div
                key={ad.id}
                className="relative flex flex-col justify-between items-center gap-4 bg-stone-900 border border-white/10 p-5 text-white md:flex-row"
              >
                <div className="flex items-center gap-4">
                  {ad.imageUrl && (
                    <img
                      src={ad.imageUrl}
                      alt="Ad"
                      className="h-12 w-12 object-cover border border-white/10 hidden sm:block"
                    />
                  )}
                  <div>
                    <span className="mono-label text-[8px] text-white/50 uppercase">Himat Sourcing Highlight</span>
                    <h4 className="font-display text-lg font-black uppercase leading-tight tracking-tight mt-0.5">
                      {ad.title}
                    </h4>
                    {ad.description && <p className="text-xs text-white/70 mt-1">{ad.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
                  {ad.linkUrl && (
                    <a
                      href={ad.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => recordClick(ad.id)}
                      className="border border-white bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-black hover:bg-transparent hover:text-white transition-colors text-center"
                    >
                      {ad.buttonText || "Learn More"}
                    </a>
                  )}
                  <button
                    onClick={() => handleHideAd(ad.id)}
                    className="border border-white/20 bg-transparent px-3 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-white/60 hover:border-white hover:text-white transition-colors"
                  >
                    [CLOSE]
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <section className="border-b border-white/15 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1440px]">
            <p className="mono-label mb-5 text-[10px] text-white/50">Garment catalog / sourcing start point</p>
            <h1 className="font-display max-w-5xl text-6xl font-black uppercase leading-[.78] tracking-[-.1em] sm:text-8xl">
              Built around
              <br />
              the garment brief.
            </h1>
            <p className="mt-10 max-w-2xl text-sm leading-6 text-white/65">
              Browse active garment listings when available, or use the category view to begin a sourcing conversation
              with Himat Textile. Product details and MOQ are verified directly in the enquiry process.
            </p>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-white/15 pb-5">
              <Filter size={15} className="mr-2 text-white/50" />
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`border px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] transition-colors ${
                    category === item ? "border-white bg-white text-black" : "border-white/25 text-white/60 hover:border-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {filteredProducts.length ? (
              <div className="grid gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <article key={product.id} className="group bg-[#101010]">
                    <div className="aspect-[4/3] overflow-hidden bg-[#252525]">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <div className="p-5">
                      <p className="mono-label text-[10px] text-white/45">
                        {product.category} / MOQ {product.moq}
                      </p>
                      <h2 className="mt-3 font-display text-3xl font-black uppercase leading-[.9] tracking-[-.07em]">
                        {product.title}
                      </h2>
                      <p className="mt-4 text-sm leading-6 text-white/60">{product.description}</p>
                      <p className="mt-5 border-t border-white/15 pt-4 text-xs text-white/70">{product.fabricDetails}</p>
                      <button
                        onClick={() => handleRequestDetails(product)}
                        className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] bg-transparent text-white border-b border-transparent hover:border-white transition-all cursor-pointer"
                      >
                        Request details <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid min-h-80 place-items-center border border-white/20 bg-[#181818] p-8 text-center">
                <div>
                  <p className="font-display text-3xl font-black uppercase tracking-[-.07em]">
                    The live catalog is being prepared.
                  </p>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/55">
                    Tell Himat Textile what category, fabric, market and quantity you have in mind. The team can guide
                    your next garment brief.
                  </p>
                  <a
                    href="#enquiry"
                    className="mt-7 inline-flex items-center gap-2 border border-white px-4 py-3 text-[10px] font-bold uppercase tracking-[.15em] hover:bg-white hover:text-black"
                  >
                    Start an inquiry <ArrowUpRight size={14} />
                  </a>
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
