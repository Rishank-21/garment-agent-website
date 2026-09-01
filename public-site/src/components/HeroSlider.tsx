"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDownRight, MoveUpRight, MessageCircle, Sparkles, MapPin, CheckCircle2, ShieldCheck, Award } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useLanguage } from "@/lib/LanguageContext";

const images = [
  {
    url: "/images/ahmedabad_market_safal.jpg",
    title: "Safal Market Textile Hub",
    district: "Ahmedabad Wholesale Cluster",
    tag: "Fabric Sourcing & Ready Garments"
  },
  {
    url: "/images/ahmedabad_market_gheekanta.jpg",
    title: "Gheekanta Garment District",
    district: "Ahmedabad Apparel Manufacturing",
    tag: "High-Volume Production & Sourcing"
  },
  {
    url: "/images/ahmedabad_market_newcloth.jpg",
    title: "New Cloth Market",
    district: "Ahmedabad Central Textile Hub",
    tag: "Direct Mill Supply & White Labeling"
  },
  {
    url: "/images/wholesalers_b2b.jpg",
    title: "B2B Apparel Wholesale Showroom",
    district: "Garment Sourcing & Wholesale Lots",
    tag: "Ready Dispatch"
  },
  {
    url: "/images/fabrics_sourcing.jpg",
    title: "Ahmedabad Spinning & Fabric Mills",
    district: "Pure Cotton & Rayon Mill Lots",
    tag: "Direct Mill Pricing & Quality QC"
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
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      const currentImage = imageRefs.current[activeIndex];
      const nextImage = imageRefs.current[nextIndex];
      if (!currentImage || !nextImage) return;

      gsap.set(nextImage, { clipPath: "inset(0 0 0 100%)", scale: 1.05, zIndex: 10, opacity: 1 });
      gsap.to(nextImage, { clipPath: "inset(0 0 0 0%)", scale: 1, duration: 1.0, ease: "power2.inOut" });
      gsap.to(currentImage, {
        scale: 0.98,
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(currentImage, { zIndex: 1 });
          setActiveIndex(nextIndex);
        },
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    const initialSlide = imageRefs.current[0];
    if (initialSlide) gsap.fromTo(initialSlide, { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" });
    const hasVisited = typeof window !== "undefined" && sessionStorage.getItem("himat_preloader_visited") === "true";
    const revealElements = contentRef.current?.querySelectorAll("[data-reveal]");
    if (revealElements) {
      gsap.fromTo(
        revealElements,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: hasVisited ? 0.6 : 0.8, delay: hasVisited ? 0.1 : 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <>
      <section className="relative min-h-[720px] h-[92vh] w-full overflow-hidden bg-[#FAF9F6] text-[#252525]">
        {/* Background slide images - CLEAR right side with shadow ONLY on left half */}
        <div className="absolute inset-0">
          {images.map((item, idx) => (
            <div
              key={item.url}
              ref={(el) => { if (el) imageRefs.current[idx] = el; }}
              className="absolute inset-0 h-full w-full bg-cover bg-right md:bg-center"
              style={{
                backgroundImage: `url(${item.url})`,
                zIndex: idx === activeIndex ? 5 : 1,
                opacity: idx === activeIndex ? 1 : 0,
              }}
            >
              {/* Left-Only Soft Ivory Shadow / Overlay: Solid behind text (0-38%), fading out completely by 58-65%, Right side is 100% crystal clear */}
              <div 
                className="absolute inset-0 pointer-events-none hidden lg:block"
                style={{
                  background: "linear-gradient(90deg, rgba(250,249,246,0.98) 0%, rgba(250,249,246,0.95) 42%, rgba(250,249,246,0.7) 54%, rgba(250,249,246,0.15) 62%, rgba(250,249,246,0) 70%)"
                }}
              />
              {/* Mobile / Tablet Responsive Gradient */}
              <div 
                className="absolute inset-0 pointer-events-none lg:hidden"
                style={{
                  background: "linear-gradient(180deg, rgba(250,249,246,0.97) 0%, rgba(250,249,246,0.92) 55%, rgba(250,249,246,0.45) 85%, rgba(250,249,246,0.15) 100%)"
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Main Content Area */}
        <div ref={contentRef} className="relative z-20 mx-auto flex h-full max-w-[1500px] flex-col justify-between px-5 pb-8 pt-32 sm:px-8 sm:pb-10 sm:pt-36 lg:px-12 lg:pt-36">
          
          {/* Top Services Bar (Minimal) */}
          <div className="flex items-center justify-end" data-reveal>
            <div className="hidden items-center gap-4 font-mono text-[9.5px] font-bold uppercase tracking-[0.22em] text-[#6B6B6B] md:flex bg-[#FFFFFF]/80 backdrop-blur-sm px-4 py-1.5 border border-[#DEDAD2] rounded-xs shadow-xs">
              <span className="hover:text-[#FE6311] transition-colors">Garment Sourcing</span>
              <span className="text-[#FFB51A]">◆</span>
              <span className="hover:text-[#FE6311] transition-colors">Wholesale Supply</span>
              <span className="text-[#FFB51A]">◆</span>
              <span className="hover:text-[#FE6311] transition-colors">White Labeling</span>
              <span className="text-[#FFB51A]">◆</span>
              <span className="hover:text-[#FE6311] transition-colors">Apparel Exports</span>
            </div>
          </div>

          {/* Hero Main Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center py-2">
            {/* Left Content Column */}
            <div className="max-w-[760px]">
              {/* Brand Positioning Eyebrow */}
              <div data-reveal className="inline-flex items-center gap-2.5 border border-[#FFB51A]/40 bg-[#FFF9E6] px-4 py-1.5 rounded-xs backdrop-blur-sm shadow-xs mb-5">
                <Sparkles size={14} className="text-[#FE6311]" />
                <span className="mono-label text-[9.5px] font-bold tracking-[0.22em] text-[#E94B0C] uppercase">
                  YOUR GARMENT GUIDE IN AHMEDABAD
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif-display text-[clamp(2.4rem,5.4vw,5.4rem)] font-black uppercase leading-[0.93] tracking-tight text-[#252525]">
                <span data-reveal className="block text-[#252525]">
                  YOUR GARMENT GUIDE
                </span>
                <span data-reveal className="block italic font-normal text-[#FE6311]">
                  FOR SMARTER
                </span>
                <span data-reveal className="block text-[#252525]">
                  SOURCING.
                </span>
              </h1>

              {/* Supporting Text */}
              <div className="mt-6 max-w-xl space-y-2 font-sans">
                <p data-reveal className="text-base sm:text-lg font-bold leading-relaxed text-[#252525]">
                  Your trusted partner for garment sourcing, wholesale collections, white labeling, and global apparel exports.
                </p>
                <p data-reveal className="text-sm sm:text-base leading-relaxed text-[#6B6B6B]">
                  We connect fashion brands, retail chains, and wholesalers with verified garment manufacturers, mill-direct fabrics, and high-volume production setups across Ahmedabad and India.
                </p>
              </div>

              {/* Action Buttons */}
              <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/catalog"
                  className="gold-button inline-flex items-center gap-2.5 px-8 py-4 text-[11px] font-black uppercase tracking-[.2em] transition-all hover:-translate-y-0.5 rounded-xs shadow-md"
                >
                  VIEW COLLECTION <MoveUpRight size={14} />
                </Link>
                
                <Link
                  href="/#enquiry"
                  className="outline-gold-button inline-flex items-center gap-2 border-[1.5px] border-[#252525] bg-[#FFFFFF] px-7 py-4 text-[11px] font-extrabold uppercase tracking-[.2em] transition-all rounded-xs hover:border-[#FE6311] hover:text-[#FE6311] hover:shadow-xs text-[#252525]"
                >
                  START AN ENQUIRY
                </Link>

                <a
                  href="https://wa.me/919873938095"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-[#DEDAD2] bg-[#FFFFFF] px-6 py-4 text-[10.5px] font-bold uppercase tracking-[.18em] text-[#252525] transition-all hover:border-[#25D366] hover:shadow-sm rounded-xs shadow-xs"
                >
                  <MessageCircle size={15} className="text-[#25D366]" /> WhatsApp Desk
                </a>
              </div>

              {/* 4 Trust Indicators Grid */}
              <div data-reveal className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#DEDAD2]">
                <div className="space-y-0.5">
                  <span className="block font-mono text-[9.5px] font-bold text-[#E94B0C]">01 // HERITAGE</span>
                  <p className="text-xs font-bold uppercase text-[#252525]">2nd Generation</p>
                  <span className="text-[10.5px] text-[#6B6B6B] block">Market Trust</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block font-mono text-[9.5px] font-bold text-[#E94B0C]">02 // SUPPLY</span>
                  <p className="text-xs font-bold uppercase text-[#252525]">Wholesale Network</p>
                  <span className="text-[10.5px] text-[#6B6B6B] block">Direct Mill Alliances</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block font-mono text-[9.5px] font-bold text-[#E94B0C]">03 // HUB</span>
                  <p className="text-xs font-bold uppercase text-[#252525]">Ahmedabad Base</p>
                  <span className="text-[10.5px] text-[#6B6B6B] block">Ground Intelligence</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block font-mono text-[9.5px] font-bold text-[#E94B0C]">04 // REACH</span>
                  <p className="text-xs font-bold uppercase text-[#252525]">India & Global</p>
                  <span className="text-[10.5px] text-[#6B6B6B] block">Doorstep Freight</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Location Card on Clear Side */}
            <div className="hidden lg:flex flex-col items-end justify-end self-end mb-2" data-reveal>
              <div className="bg-[#FFFFFF]/92 backdrop-blur-md border border-[#DEDAD2] p-5 rounded-xs shadow-xl max-w-sm w-full space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#E94B0C] uppercase tracking-wider bg-[#FFF9E6] px-2.5 py-1 rounded-xs border border-[#FFB51A]/40">
                    <MapPin size={11} className="text-[#FE6311]" /> {images[activeIndex].district}
                  </span>
                  <span className="font-mono text-[9.5px] font-bold text-[#6B6B6B]">
                    0{activeIndex + 1} / 0{images.length}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-bold uppercase text-[#252525] tracking-tight">
                    {images[activeIndex].title}
                  </h3>
                  <p className="text-[11px] text-[#6B6B6B] mt-0.5">
                    {images[activeIndex].tag}
                  </p>
                </div>
                {/* Thumbnails to Switch Markets Directly */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#DEDAD2]">
                  {images.map((img, idx) => (
                    <button
                      key={img.title}
                      onClick={() => setActiveIndex(idx)}
                      className={`relative aspect-square w-12 overflow-hidden rounded-xs border transition-all ${
                        idx === activeIndex
                          ? "border-[#FE6311] ring-2 ring-[#FFB51A]/50 scale-105"
                          : "border-[#DEDAD2] opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img.url} alt={img.title} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Hero Bar */}
          <div className="flex items-end justify-between border-t border-[#DEDAD2] pt-4" data-reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold tracking-widest text-[#6B6B6B]">
                {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5" aria-label="Hero slide position">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 transition-all rounded-xs ${
                      idx === activeIndex ? "w-8 bg-[#FE6311]" : "w-3 bg-[#DEDAD2] hover:bg-[#FE6311]/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            <a
              href="#categories"
              className="hidden items-center gap-2 font-mono text-[9.5px] font-bold uppercase tracking-[.22em] text-[#252525] transition-colors hover:text-[#FE6311] sm:flex"
            >
              Explore all categories <ArrowDownRight size={14} className="text-[#FE6311]" />
            </a>
          </div>
        </div>
      </section>

      {/* Marquee Ticker — separated from hero with full-width dark stripe */}
      <div className="w-full overflow-hidden bg-[#252525] py-4 text-[#FAF9F6] border-y border-black/30 select-none shadow-sm mt-0">
        <div className="marquee-track flex items-center gap-8 whitespace-nowrap font-mono text-[10.5px] font-bold uppercase tracking-[0.22em]">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <React.Fragment key={i}>
              <span>{item}</span>
              <span className="text-[#FFB51A]">◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
