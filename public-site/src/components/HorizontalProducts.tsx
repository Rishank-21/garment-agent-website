"use client";

import React, { useEffect, useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const productSections = [
  {
    title: "Men's Wear",
    subtitle: "Cotton Pants, Shirts, Lowers, Linen Wear & T-Shirts",
    description: "Premium Ahmedabad-manufactured cotton pants, linen-blend casual shirts, comfortable lowers, and t-shirts tailored for B2B brands and wholesalers.",
    moq: "200 Pcs / Style",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800",
    href: "/catalog?category=mens wear"
  },
  {
    title: "Women's Wear",
    subtitle: "Ethnic, 3pc Sets, Kurtis, Co-ord Sets, Palazzo, Leggings & Dupatta",
    description: "Contemporary slub rayon co-ord sets, traditional ethnic embroidery kurtis, palazzo pants, leggings, and dupattas crafted by skilled process houses.",
    moq: "150 Pcs / Style",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
    href: "/catalog?category=womens wear"
  },
  {
    title: "Kids Wear",
    subtitle: "Soft Cotton Pants, Shirts, Lowers & Linen Playwear",
    description: "Durable playwear, soft combed cotton pants, shirts, and lowers designed for child comfort and hypoallergenic safety.",
    moq: "300 Pcs / Style",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800",
    href: "/catalog?category=kids wear"
  },
  {
    title: "Bedsheets",
    subtitle: "Packed & Roll Formats direct from Manufacturer",
    description: "Percale and cotton bedsheets supplied in export-grade packed formats or continuous rolls for institutional and retail buyers.",
    moq: "100 Rolls / Design",
    image: "/images/ahmedabad_market_newcloth.jpg",
    href: "/catalog?category=bedsheets"
  },
  {
    title: "Fabrics Sourcing",
    subtitle: "Mills & Dyeing Process House Assortments",
    description: "Direct dye-house processed cotton fabric bolts, slub denim, and custom fabric blends with uniform color consistency.",
    moq: "1000 Meters / Blend",
    image: "/images/ahmedabad_market_safal.jpg",
    href: "/catalog?category=fabrics"
  },
  {
    title: "White Labeling",
    subtitle: "End-to-End Bespoke Custom Apparel Sourcing",
    description: "Complete design-to-delivery support. Custom tech pack creation, fabric selection, branding accessories, and custom packaging.",
    moq: "100 Pcs / Custom Design",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
    href: "/#enquiry"
  }
];

export default function HorizontalProducts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    // Only register the ScrollTrigger animation on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const pin = gsap.fromTo(
        containerRef.current,
        { x: "0vw" },
        {
          x: () => `-${(productSections.length - 1) * 75}vw`,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${containerRef.current?.offsetWidth || 2000}`,
            invalidateOnRefresh: true,
          }
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative overflow-hidden bg-[#0d0d0d] h-auto md:h-screen flex flex-col justify-between py-10 md:py-16">
      {/* Title Header */}
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 mb-10 md:mb-0">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mono-label text-[10px] tracking-widest text-[#a8a29e] uppercase">03 / Core Collection</span>
            <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Garments That Move<br />With the Market.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#a8a29e] leading-relaxed">
            Our manufacturing capacity covers multiple market segments, providing growing fashion brands and retail chains with reliable bulk deliveries.
          </p>
        </div>
      </div>

      {/* Horizontal Slides Container */}
      <div className="flex flex-1 items-center justify-start py-4 md:py-0 w-full">
        <div 
          ref={containerRef} 
          className="flex flex-col md:flex-row gap-8 md:gap-16 px-5 sm:px-8 lg:px-12 w-full md:w-auto" 
          style={isDesktop ? { width: `${productSections.length * 75}vw` } : {}}
        >
          {productSections.map((section, idx) => (
            <div
              key={section.title}
              className="relative flex h-auto md:h-[52vh] w-full md:w-[70vw] shrink-0 flex-col md:flex-row justify-between border border-white/10 bg-[#141414] p-6 transition-all hover:border-white/20 sm:p-10 gap-6 md:gap-10 lg:w-[65vw]"
            >
              {/* Image Column */}
              <div className="relative aspect-video md:aspect-auto h-48 sm:h-64 md:h-full w-full md:w-1/2 overflow-hidden bg-stone-900">
                <img
                  src={section.image}
                  alt={section.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="mono-label text-[10px] tracking-widest text-white/50">WHOLESALE / WHITE LABELING</span>
                </div>
              </div>

              {/* Info Column */}
              <div className="flex flex-1 flex-col justify-between pt-2 md:pt-0">
                <div className="space-y-4">
                  <span className="mono-label text-[10px] tracking-widest text-white/40 uppercase">COLLECTION 0{idx + 1}</span>
                  <h3 className="font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                    {section.title}
                  </h3>
                  <p className="mono-label text-[11px] tracking-wider text-[#a8a29e]">
                    {section.subtitle}
                  </p>
                  <p className="text-sm leading-relaxed text-white/70">
                    {section.description}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    href={section.href}
                    className="inline-flex items-center gap-3 border border-white/20 bg-transparent px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black hover:border-white transition-colors"
                  >
                    View Details <MoveRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
