"use client";

import React, { useEffect, useState } from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export const HERO_SLIDES = [
  {
    image: "/images/ahmedabad_market_safal.jpg",
    label: "Safal Market Textile & Ready Garment Hub",
    category: "Wholesale Market",
  },
  {
    image: "/images/ahmedabad_market_gheekanta.jpg",
    label: "Gheekanta Apparel Sourcing & Bulk Lots",
    category: "Garment District",
  },
  {
    image: "/images/wholesalers_b2b.jpg",
    label: "B2B Apparel Showrooms & Volume Sourcing",
    category: "Ready Stock",
  },
  {
    image: "/images/fabrics_sourcing.jpg",
    label: "Ahmedabad Spinning Mills & Pure Cotton Lots",
    category: "Direct Mill Supply",
  },
  {
    image: "/images/ahmedabad_market_newcloth.jpg",
    label: "New Cloth Market Fabric & Apparel Corridors",
    category: "Central Textile Hub",
  },
] as const;

const tickerItems = [
  "YOUR GARMENT GUIDE IN AHMEDABAD",
  "B2B GARMENT SOURCING",
  "SUPPLIER CONNECTIONS",
  "BUYING SUPPORT",
  "MEN'S, WOMEN'S & KIDS' WEAR",
  "ETHNIC WEAR & BED SHEET LOTS",
  "FABRIC SOURCING & WHITE LABELLING",
  "PAN-INDIA TRANSPORT DISPATCH",
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { t, language } = useLanguage();
  const touchStartX = React.useRef<number | null>(null);

  const currentTicker = [
    t("ticker_item_1"),
    t("ticker_item_2"),
    t("ticker_item_3"),
    t("ticker_item_4"),
    t("ticker_item_5"),
    t("ticker_item_6"),
    t("ticker_item_7"),
    t("ticker_item_8"),
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      } else {
        setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      }
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 
        B2B Hero Section: 
        Exact Komal Creation (.b2b-hero) Atelier Design Architecture.
        - Warm Paper canvas (#F3EEE5)
        - Media positioned on right 56% with multi-stop horizontal bleed gradient
        - Organic Ken Burns pan-zoom motion
        - Monumental DM Serif Display headline with tight line-height
        - Architectural grid lines, tailor stitch curve, and vertical maker mark
      */}
      <section className="relative flex min-h-[min(720px,100svh)] w-full flex-col justify-center overflow-hidden bg-[#F3EEE5] px-5 pt-28 pb-16 text-[#171A1D] sm:px-10 sm:pt-36 sm:pb-24 lg:px-16 xl:px-24">
        
        {/* Desktop Manufacturing Media Layer (Right 64% with Seamless Blend) */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-[1] w-full overflow-hidden opacity-100 hidden lg:block lg:w-[64%]">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === activeSlide;
            return (
              <img
                key={slide.label}
                src={slide.image}
                alt={slide.label}
                className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.02] contrast-[1.04]"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? "scale(1) translate3d(0, 0, 0)"
                    : "scale(1.075) translate3d(1.5%, 0, 0)",
                  transition:
                    "opacity 760ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 4.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              />
            );
          })}

          {/* Desktop Continuous Easing Gradient */}
          <span
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                "linear-gradient(90deg, #F3EEE5 0%, #F3EEE5 6%, rgba(243,238,229,0.80) 18%, rgba(243,238,229,0.48) 34%, rgba(243,238,229,0.20) 52%, rgba(243,238,229,0.05) 70%, transparent 85%)",
            }}
          />
        </div>

        {/* Architectural Technical Grid Lines */}
        <div className="pointer-events-none absolute top-[35%] right-0 z-[2] hidden h-[1px] w-[37vw] bg-[rgba(23,26,29,0.1)] lg:block" />
        <div className="pointer-events-none absolute bottom-[21%] right-0 z-[2] hidden h-[1px] w-[50vw] bg-[rgba(23,26,29,0.1)] lg:block" />

        {/* Signature Tailor's Curved Dashed Stitch Line (Hidden on very small screens to avoid clutter) */}
        <svg
          className="pointer-events-none absolute right-0 bottom-0 z-[2] hidden sm:block h-auto w-[min(46vw,620px)] opacity-85"
          viewBox="0 0 560 150"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-12 132C74 98 107 44 183 67C251 87 274 126 352 78C416 39 458 38 572 8"
            stroke="#FE6311"
            strokeDasharray="9 8"
            strokeWidth="1.5"
          />
        </svg>

        {/* Vertical Studio Edge Mark */}
        <div
          className="pointer-events-none absolute inset-y-0 right-6 lg:right-10 z-[3] hidden select-none flex-col items-center justify-center gap-6 border-l border-[rgba(23,26,29,0.12)] pl-4 text-[#171A1D]/60 xl:flex"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase">{t("note_b2b_sourcing")}</span>
          <b className="font-serif text-4xl font-normal text-[#FE6311]">01</b>
          <span className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase">{language === "hi" ? "अहमदाबाद क्लस्टर" : "AHMEDABAD CLUSTER"}</span>
        </div>

        {/* Main Editorial Hero Copy */}
        <div className="relative z-[3] max-w-[690px] pt-2 sm:pt-5">
          {/* Eyebrow Pill */}
          <div className="mb-3 sm:mb-3.5 inline-flex items-center gap-2 rounded-full bg-[#FFF9ED] px-3 sm:px-3.5 py-1 text-[8px] sm:text-[9.5px] font-mono font-extrabold uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[#FE6311] shadow-xs max-w-full">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB51A] animate-pulse" />
            <span className="truncate">{t("hero_eyebrow")}</span>
          </div>

          {/* Balanced Editorial Serif Headline (Optimized clamp for mobile) */}
          <h1 className="font-serif text-[clamp(2.35rem,6.5vw,5.8rem)] font-normal leading-[0.93] sm:leading-[0.89] tracking-[-0.04em] sm:tracking-[-0.05em] text-[#171A1D] my-2.5 sm:my-3.5">
            {t("hero_headline_1")}<br />
            <em className="italic text-[#FE6311]">{t("hero_headline_2")}</em>
          </h1>

          {/* Mobile Hero Visual Showcase (Clearly displaying Ahmedabad Market photos on phone screens) */}
          <div 
            className="lg:hidden my-3 sm:my-4 relative w-full aspect-[16/10] overflow-hidden rounded-[4px] border border-[rgba(23,26,29,0.14)] shadow-md bg-[#EFE9DF] touch-pan-y select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === activeSlide;
              const cat = slide.category as string;
              const categoryLabel = 
                cat === "Wholesale Market" ? t("badge_wholesale_market") :
                cat === "Garment District" ? t("badge_garment_district") :
                cat === "Ready Stock" ? t("badge_ready_stock") :
                cat === "Direct Mill Supply" ? t("badge_direct_mill") :
                cat === "Central Textile Hub" ? t("badge_central_hub") : cat;

              return (
                <div
                  key={slide.label}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  <img
                    src={slide.image}
                    alt={slide.label}
                    className="h-full w-full object-cover object-center brightness-[1.02] contrast-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-2 text-white">
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#FFD44D]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FE6311] animate-pulse shrink-0" />
                        <span className="truncate">{slide.label}</span>
                      </div>
                      <span className="text-[10px] text-white/80 block truncate font-sans">
                        {t("hero_district_tag")}
                      </span>
                    </div>
                    <span className="font-mono text-[8px] font-bold uppercase bg-black/50 border border-white/25 backdrop-blur-xs px-2 py-0.5 rounded-[2px] text-white shrink-0">
                      {categoryLabel}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Mobile Slide Navigation Dots inside the photo card */}
            <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-1 rounded-full border border-white/20">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 transition-all rounded-full ${
                    idx === activeSlide
                      ? "w-4 bg-[#FE6311]"
                      : "w-1.5 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Editorial Paragraph */}
          <p className="mt-2.5 sm:mt-3.5 max-w-[50ch] font-sans text-[clamp(0.88rem,1.08vw,1.02rem)] leading-[1.62] sm:leading-[1.68] text-[#171A1D]/85 font-medium">
            {t("hero_desc_main")}
          </p>

          {/* Action Buttons: Stacked on mobile with 48px touch targets */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6 pt-4 sm:pt-7">
            <Link
              href="/catalog"
              className="button button-rust inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:text-[10.5px] tracking-[0.14em] shadow-md min-h-[46px] w-full sm:w-auto"
            >
              {t("btn_explore_catalog")} <ArrowDownRight size={16} />
            </Link>

            <Link
              href="/#enquiry"
              className="group inline-flex items-center justify-center gap-2 font-mono text-xs sm:text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#171A1D] hover:text-[#FE6311] transition-colors py-2 min-h-[44px]"
            >
              <span>{t("btn_bulk_quote")}</span>
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1 text-[#FE6311]" />
            </Link>
          </div>
        </div>

        {/* Slide Selector Pill Indicators (Visible on desktop) */}
        <div className="absolute right-5 bottom-3.5 sm:bottom-6 lg:bottom-7 lg:right-20 z-[4] hidden lg:flex items-center gap-1.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 transition-all rounded-full ${
                idx === activeSlide
                  ? "w-6 sm:w-7 bg-[#FE6311]"
                  : "w-2 sm:w-2.5 bg-[#171A1D]/25 hover:bg-[#FE6311]/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Hero Notes Strip (Himat Textile B2B sourcing highlights) */}
        <div className="absolute bottom-4 sm:bottom-5 left-6 sm:left-10 lg:left-16 xl:left-24 z-[4] hidden sm:flex items-center gap-3.5 font-mono text-[9px] sm:text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-[#171A1D]/80">
          <span>{t("note_b2b_sourcing")}</span>
          <i className="h-1.5 w-1.5 rotate-45 bg-[#FFB51A]" />
          <span>{t("note_supplier_conn")}</span>
          <i className="h-1.5 w-1.5 rotate-45 bg-[#FE6311]" />
          <span>{t("note_buying_support")}</span>
          <i className="h-1.5 w-1.5 rotate-45 bg-[#FFB51A]" />
          <span>{t("note_pan_india")}</span>
        </div>
      </section>

      {/* Balanced B2B Garment Sourcing Info Strip Marquee with Dual Set for 100% Seamless Loop */}
      <section className="w-full select-none overflow-hidden bg-[#FE6311] py-3 sm:py-3.5 text-[#FFFAF4] border-y border-[rgba(255,250,244,0.35)] shadow-xs relative">
        <div 
          className="marquee-track flex items-center gap-6 sm:gap-9 whitespace-nowrap font-mono text-[10.5px] sm:text-[12px] font-extrabold uppercase tracking-[0.15em]"
          style={{ willChange: "transform" }}
        >
          {[...currentTicker, ...currentTicker].map((item, idx) => (
            <React.Fragment key={`t1-${idx}`}>
              <span>{item}</span>
              <i className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#FFD44D]" />
            </React.Fragment>
          ))}
          {[...currentTicker, ...currentTicker].map((item, idx) => (
            <React.Fragment key={`t2-${idx}`}>
              <span>{item}</span>
              <i className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#FFD44D]" />
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  );
}
