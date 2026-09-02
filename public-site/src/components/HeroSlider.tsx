"use client";

import React, { useEffect, useState } from "react";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const images = [
  {
    url: "/images/ahmedabad_market_safal.jpg",
    title: "Safal Market Textile Hub",
    district: "Ahmedabad Wholesale Cluster",
    tag: "Fabric Sourcing & Ready Garments",
  },
  {
    url: "/images/ahmedabad_market_gheekanta.jpg",
    title: "Gheekanta Garment District",
    district: "Ahmedabad Apparel Manufacturing",
    tag: "High-Volume Production & Sourcing",
  },
  {
    url: "/images/ahmedabad_market_newcloth.jpg",
    title: "New Cloth Market",
    district: "Ahmedabad Central Textile Hub",
    tag: "Direct Mill Supply & White Labeling",
  },
  {
    url: "/images/wholesalers_b2b.jpg",
    title: "B2B Apparel Wholesale Showroom",
    district: "Garment Sourcing & Wholesale Lots",
    tag: "Ready Dispatch",
  },
  {
    url: "/images/fabrics_sourcing.jpg",
    title: "Ahmedabad Spinning & Fabric Mills",
    district: "Pure Cotton & Rayon Mill Lots",
    tag: "Direct Mill Pricing & Quality QC",
  },
];

const tickerItems = [
  "HIMAT TEXTILE AHMEDABAD",
  "DIRECT MILL SOURCING",
  "MEN'S WEAR WHOLESALE",
  "WOMEN'S & ETHNIC WEAR",
  "KIDS PLAYWEAR & ESSENTIALS",
  "100% QUALITY INSPECTION",
  "CUSTOM WHITE LABELING",
  "PAN-INDIA DISPATCH",
  "DOORSTEP SAMPLING",
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 
        Hero Section: 
        Mirrors Komal Creation's .b2b-hero architecture.
        - Blends seamlessly under the fixed transparent header with generous top padding.
        - Perfect height (min-h-[min(750px,94svh)]).
        - Right-aligned manufacturing image carousel with multi-stop gradient overlay.
        - Editorial serif typography with rust accent highlights.
        - Fine grid lines, stitch SVG curve, and vertical edge mark.
      */}
      <section className="relative flex min-h-[min(750px,94svh)] lg:min-h-[730px] w-full flex-col justify-center overflow-hidden bg-[#FAF8F5] px-6 pt-28 pb-16 text-[#171A1D] sm:px-10 sm:pt-32 lg:px-16 xl:px-24">
        
        {/* Right Manufacturing Media Carousel with Seamless Gradient Blend */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-full overflow-hidden lg:w-[58%]">
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <img
                key={img.url}
                src={img.url}
                alt={img.title}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-1000 ease-out ${
                  isActive
                    ? "opacity-100 scale-100"
                    : "pointer-events-none opacity-0 scale-105"
                }`}
              />
            );
          })}

          {/* Desktop Left-to-Right Ivory Gradient Overlay (Signature Komal Creation blend) */}
          <div
            className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, #FAF8F5 0%, rgba(250,248,245,0.97) 14%, rgba(250,248,245,0.48) 55%, rgba(250,248,245,0.06) 100%)",
            }}
          />

          {/* Mobile / Tablet Top-to-Bottom Ivory Gradient Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-[2] lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(250,248,245,0.97) 0%, rgba(250,248,245,0.88) 58%, rgba(250,248,245,0.45) 100%)",
            }}
          />
        </div>

        {/* Architectural Technical Grid Lines */}
        <div className="pointer-events-none absolute top-[34%] right-0 z-[2] hidden h-[1px] w-[38vw] bg-[#171A1D]/10 lg:block" />
        <div className="pointer-events-none absolute bottom-[22%] right-0 z-[2] hidden h-[1px] w-[50vw] bg-[#171A1D]/10 lg:block" />

        {/* Signature Dashed Stitch Curve (Textile heritage craftsmanship) */}
        <svg
          className="pointer-events-none absolute right-0 bottom-0 z-[2] h-auto w-[min(46vw,600px)] opacity-90"
          viewBox="0 0 560 150"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-12 132C74 98 107 44 183 67C251 87 274 126 352 78C416 39 458 38 572 8"
            stroke="#B7462E"
            strokeDasharray="9 8"
            strokeWidth="1.5"
          />
        </svg>

        {/* Vertical Edge Mark (Right border strip) */}
        <div
          className="pointer-events-none absolute inset-y-0 right-8 z-[3] hidden select-none flex-col items-center justify-center gap-6 border-l border-[#171A1D]/15 pl-4 text-[#171A1D]/60 xl:flex"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="text-[9px] font-extrabold tracking-[0.2em]">GARMENT SOURCING</span>
          <b className="font-serif-display text-4xl font-normal text-[#B7462E]">01</b>
          <span className="text-[9px] font-extrabold tracking-[0.2em]">AHMEDABAD TEXTILE HUB</span>
        </div>

        {/* Left Hero Copy Overlay — Reduced by ~25% for tighter editorial elegance */}
        <div className="relative z-[10] max-w-[620px]">
          {/* Eyebrow Pill */}
          <span className="mb-2.5 block text-[8.5px] font-extrabold uppercase tracking-[0.16em] text-[#B7462E] sm:text-[9.5px]">
            HT/001 — B2B GARMENT SOURCING & APPAREL SUPPLY / AHMEDABAD
          </span>

          {/* Main Headline (~25% smaller) */}
          <h1 className="font-serif-display my-2 sm:my-3 text-[clamp(2.1rem,4.8vw,4.1rem)] font-normal leading-[0.92] tracking-[-0.04em] text-[#171A1D]">
            Source the craft.<br />
            <em className="italic text-[#B7462E]">Scale the garment.</em>
          </h1>

          {/* Editorial Paragraph (~25% smaller) */}
          <p className="mt-2.5 mb-5 max-w-[46ch] font-sans text-[clamp(0.82rem,0.95vw,0.92rem)] leading-[1.6] text-[#171A1D]/80">
            Connecting retail chains, wholesale buyers, and fashion brands with verified apparel manufacturers, mill-direct fabrics, and high-volume production setups across Ahmedabad and India.
          </p>

          {/* Action Buttons (~25% smaller) */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B7462E] px-6 py-2.5 text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#FFFAF4] shadow-md transition-all duration-200 hover:bg-[#9E3923] hover:scale-105"
            >
              Explore Garment Catalog <MoveUpRight size={13} />
            </Link>
            
            <Link
              href="/#enquiry"
              className="group relative inline-flex items-center gap-2 rounded-full border border-[#171A1D]/30 bg-white/70 backdrop-blur-xs px-5 py-2.5 text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#171A1D] hover:border-[#B7462E] hover:text-[#B7462E] transition-all shadow-xs"
            >
              <span>Request a Bulk Quote</span>
              <MoveUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#B7462E]" />
            </Link>
          </div>
        </div>

        {/* Slide Caption Widget (Floating bottom right) */}
        <div className="absolute right-6 bottom-16 z-[10] flex items-center gap-2 rounded-full border border-[#171A1D]/10 bg-[#FAF8F5]/90 px-3.5 py-2 shadow-xs backdrop-blur-md lg:right-28">
          <span className="text-[7.5px] font-extrabold uppercase tracking-[0.14em] text-[#B7462E]">
            Now showing
          </span>
          <strong className="font-serif-display text-[11px] font-normal text-[#171A1D]">
            {images[activeIndex].title}
          </strong>
          <b className="border-l border-[#171A1D]/25 pl-2 font-mono text-[8px] font-extrabold text-[#171A1D]">
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </b>
        </div>

        {/* Slide Selector Indicators */}
        <div className="absolute right-6 bottom-7 z-[10] hidden items-center gap-1.5 lg:flex lg:right-28">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 transition-all rounded-full ${
                idx === activeIndex
                  ? "w-7 bg-[#B7462E]"
                  : "w-2.5 bg-[#171A1D]/20 hover:bg-[#B7462E]/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Hero Notes Strip (Signature Komal highlight points - clean unboxed text line) */}
        <div className="absolute bottom-4 left-6 z-[10] flex items-center gap-3 overflow-hidden text-[8.5px] font-extrabold uppercase tracking-[0.1em] text-[#171A1D]/75 sm:left-10 sm:text-[9.5px] lg:left-16 xl:left-24">
          <span>Mill-Direct Pricing</span>
          <i className="inline-block h-1 w-1 shrink-0 rotate-45 bg-[#B7462E]" />
          <span>Custom White Labeling</span>
          <i className="inline-block h-1 w-1 shrink-0 rotate-45 bg-[#B7462E]" />
          <span>Pan-India Dispatch</span>
          <i className="inline-block h-1 w-1 shrink-0 rotate-45 bg-[#B7462E]" />
          <span>Doorstep Sampling</span>
        </div>
      </section>

      {/* Marquee Ticker — Enlarged & More Prominent */}
      <div className="mt-0 w-full select-none overflow-hidden border-y border-black/30 bg-[#252525] py-5 text-[#FAF9F6] shadow-md">
        <div className="marquee-track flex items-center gap-10 whitespace-nowrap font-mono text-[12px] font-black uppercase tracking-[0.24em] sm:text-[13px]">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <React.Fragment key={i}>
              <span>{item}</span>
              <span className="text-[#FFB51A] text-sm sm:text-base">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
