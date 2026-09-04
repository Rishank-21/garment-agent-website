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
  const { t } = useLanguage();

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
      <section className="relative flex min-h-[min(760px,100svh)] w-full flex-col justify-center overflow-hidden bg-[#F3EEE5] px-6 pt-32 pb-20 text-[#171A1D] sm:px-10 sm:pt-36 sm:pb-24 lg:px-16 xl:px-24">
        
        {/* Right 64% Manufacturing Media Layer with Seamless Underlapping Blend */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-[1] w-full overflow-hidden opacity-100 lg:w-[64%]">
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

          {/* Desktop Continuous Easing Gradient (Lightened opacity — more photo clarity & seamless blend) */}
          <span
            className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, #F3EEE5 0%, #F3EEE5 6%, rgba(243,238,229,0.80) 18%, rgba(243,238,229,0.48) 34%, rgba(243,238,229,0.20) 52%, rgba(243,238,229,0.05) 70%, transparent 85%)",
            }}
          />

          {/* Mobile / Tablet Vertical Continuous Soft Bleed Gradient (Lightened opacity) */}
          <span
            className="pointer-events-none absolute inset-0 z-[2] lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, #F3EEE5 0%, rgba(243,238,229,0.80) 18%, rgba(243,238,229,0.40) 38%, rgba(243,238,229,0.10) 60%, transparent 85%)",
            }}
          />
        </div>

        {/* Architectural Technical Grid Lines (Komal Signature Accent) */}
        <div className="pointer-events-none absolute top-[35%] right-0 z-[2] hidden h-[1px] w-[37vw] bg-[rgba(23,26,29,0.1)] lg:block" />
        <div className="pointer-events-none absolute bottom-[21%] right-0 z-[2] hidden h-[1px] w-[50vw] bg-[rgba(23,26,29,0.1)] lg:block" />

        {/* Signature Tailor's Curved Dashed Stitch Line */}
        <svg
          className="pointer-events-none absolute right-0 bottom-0 z-[2] h-auto w-[min(46vw,620px)] opacity-85"
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

        {/* Vertical Studio Edge Mark (Komal Signature Right Stamp) */}
        <div
          className="pointer-events-none absolute inset-y-0 right-6 lg:right-10 z-[3] hidden select-none flex-col items-center justify-center gap-6 border-l border-[rgba(23,26,29,0.12)] pl-4 text-[#171A1D]/60 xl:flex"
          style={{ writingMode: "vertical-rl" }}
        >
          <span className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase">GARMENT SOURCING</span>
          <b className="font-serif text-4xl font-normal text-[#FE6311]">01</b>
          <span className="font-mono text-[8px] font-bold tracking-[0.2em] uppercase">AHMEDABAD CLUSTER</span>
        </div>

        {/* Main Editorial Hero Copy (Pure unblemished Warm Paper Canvas) */}
        <div className="relative z-[3] max-w-[690px] pt-3 sm:pt-5">
          {/* Eyebrow Pill with Logo Golden Yellow & Orange Duo */}
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-[#FFF9ED] px-3.5 py-1 text-[8.5px] sm:text-[9.5px] font-mono font-extrabold uppercase tracking-[0.16em] text-[#FE6311] shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFB51A] animate-pulse" />
            <span>HIMAT TEXTILE — YOUR GARMENT GUIDE IN AHMEDABAD</span>
          </div>

          {/* Balanced Editorial Serif Headline */}
          <h1 className="font-serif text-[clamp(3.1rem,6.8vw,5.8rem)] font-normal leading-[0.89] tracking-[-0.05em] text-[#171A1D] my-3 sm:my-3.5">
            Source the craft.<br />
            <em className="italic text-[#FE6311]">Scale the garment.</em>
          </h1>

          {/* Editorial Paragraph — Balanced B2B value scale */}
          <p className="mt-3 sm:mt-3.5 max-w-[50ch] font-sans text-[clamp(0.9rem,1.08vw,1.02rem)] leading-[1.68] text-[#171A1D]/85 font-medium">
            Your trusted B2B garment sourcing partner in Ahmedabad. We connect retailers, wholesalers, and growing fashion brands with reliable manufacturers across men&apos;s, women&apos;s, kids&apos; wear, and mill-direct fabrics.
          </p>

          {/* Action Buttons: Tactile Orange/Gold Pill + Editorial Plain Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-6 sm:pt-7">
            <Link
              href="/catalog"
              className="button button-rust inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-[10.5px] tracking-[0.14em] shadow-md"
            >
              Explore Garment Catalog <ArrowDownRight size={16} />
            </Link>

            <Link
              href="/#enquiry"
              className="group inline-flex items-center justify-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#171A1D] hover:text-[#FE6311] transition-colors py-1.5"
            >
              <span>Request a Bulk Quote</span>
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1 text-[#FE6311]" />
            </Link>
          </div>
        </div>


        {/* Slide Selector Pill Indicators */}
        <div className="absolute right-4 bottom-6 lg:bottom-7 lg:right-20 z-[4] hidden items-center gap-1.5 lg:flex">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 transition-all rounded-full ${
                idx === activeSlide
                  ? "w-7 bg-[#FE6311]"
                  : "w-2.5 bg-[#171A1D]/20 hover:bg-[#FE6311]/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Hero Notes Strip (Himat Textile B2B sourcing highlights with Gold & Orange diamonds) */}
        <div className="absolute bottom-4 sm:bottom-5 left-6 sm:left-10 lg:left-16 xl:left-24 z-[4] hidden sm:flex items-center gap-3.5 font-mono text-[9px] sm:text-[9.5px] font-extrabold uppercase tracking-[0.12em] text-[#171A1D]/80">
          <span>B2B Garment Sourcing</span>
          <i className="h-1.5 w-1.5 rotate-45 bg-[#FFB51A]" />
          <span>Supplier Connections</span>
          <i className="h-1.5 w-1.5 rotate-45 bg-[#FE6311]" />
          <span>Buying Support</span>
          <i className="h-1.5 w-1.5 rotate-45 bg-[#FFB51A]" />
          <span>Pan-India Dispatch</span>
        </div>
      </section>

      {/* Balanced B2B Garment Sourcing Info Strip Marquee with Logo Golden Yellow Diamonds */}
      <section className="w-full select-none overflow-hidden bg-[#FE6311] py-3.5 sm:py-4 text-[#FFFAF4] border-y border-[rgba(255,250,244,0.35)] shadow-sm">
        <div className="marquee-track flex items-center gap-8 sm:gap-9 whitespace-nowrap font-mono text-[11px] sm:text-[12px] font-extrabold uppercase tracking-[0.15em]">
          {Array(4).fill(tickerItems).flat().map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              <i className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#FFD44D]" />
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  );
}
