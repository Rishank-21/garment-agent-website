"use client";

import React, { useEffect, useRef, useState } from "react";
import { MoveRight, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const productSections = [
  {
    title: "Men's Wear",
    subtitle: "Cotton Twill Pants, Linen Shirts, Casual Lowers & Combed T-Shirts",
    description: "Premium Ahmedabad-manufactured cotton twill pants, linen-blend casual shirts, lowers, and high-GSM combed cotton t-shirts for wholesale brands and retail chains.",
    fabric: "100% Twill Cotton & Linen Blend",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800",
    href: "/catalog?category=mens-wear",
    tag: "HIGH VOLUME WHOLESALE"
  },
  {
    title: "Women's Wear",
    subtitle: "Ethnic Kurtis, Co-Ord Sets, Western Tops & Palazzos",
    description: "Intricately embroidered kurtis, modern printed co-ord sets, stylish tunics, and ethnic western ensembles tailored with premium Rayon and Chanderi finishes.",
    fabric: "Pure Rayon, Chanderi & Cambric",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800",
    href: "/catalog?category=womens-wear",
    tag: "TRENDING ATELIER"
  },
  {
    title: "Kids Wear",
    subtitle: "Soft Combed Cotton Pants, Shirts, Lowers & Playwear",
    description: "Hypoallergenic, breathable, and tear-resistant children's clothing. Soft-touch bio-washing ensures maximum comfort and skin safety for daily wear.",
    fabric: "100% Bio-washed Combed Cotton",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800",
    href: "/catalog?category=kids-wear",
    tag: "COMFORT & VALUE"
  },
  {
    title: "Ethnic & Fusion",
    subtitle: "Handwork Kurtis, Anarkalis & Festive Co-Ords",
    description: "Rich hand-block prints, foil detailing, Lucknowi embroidery, and contemporary festive silhouettes produced directly with master artisan clusters.",
    fabric: "Artisan Block Print & Silk Blend",
    image: "/images/ethnic_wear.jpg",
    href: "/catalog?category=ethnic-wear",
    tag: "FESTIVE & BRIDAL"
  },
  {
    title: "Fabrics Sourcing",
    subtitle: "Spinning Mills & Dyeing Process House Assortments",
    description: "Direct dye-house processed cotton fabric bolts, slub denim, and custom blends in specified pantone shades with uniform color consistency.",
    fabric: "Direct Mill Bolted Cotton & Twills",
    image: "/images/fabrics_sourcing.jpg",
    href: "/catalog?category=fabrics",
    tag: "DIRECT MILL SOURCING"
  },
  {
    title: "Bedsheets & Home",
    subtitle: "Packed & Continuous Roll Formats from Mills",
    description: "Percale and combed cotton bedsheets supplied in export-grade packed boxes or continuous rolls for bulk institutional buyers and retail distributors.",
    fabric: "200-400 TC Pure Combed Cotton",
    image: "/images/custom_bedsheet.jpg",
    href: "/catalog?category=bedsheets",
    tag: "EXPORT SPECIFICATION"
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
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
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
    <div ref={triggerRef} className="relative overflow-hidden bg-[#FAF9F6] h-auto md:h-screen flex flex-col justify-between py-12 md:py-16 border-t border-[#DEDAD2]">
      {/* Title Header */}
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 mb-10 md:mb-0">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mono-label text-[9px] font-bold tracking-widest text-[#E94B0C] uppercase bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs inline-flex items-center gap-2 shadow-xs">
              <Sparkles size={12} className="text-[#FE6311]" /> [ 03 / CORE PRODUCT SEGMENTS ]
            </span>
            <h2 className="mt-3.5 font-serif-display text-4xl font-black uppercase tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
              Garments That Move<br /><span className="italic font-normal text-[#FE6311]">With The Market.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#66625D] leading-relaxed font-normal">
            Our direct Ahmedabad manufacturing & sourcing capacity covers Men, Women, Kids, and Mill Direct Fabrics, providing growing fashion brands and retail chains with reliable bulk deliveries.
          </p>
        </div>
      </div>

      {/* Horizontal Slides Container */}
      <div className="flex flex-1 items-center justify-start py-4 md:py-0 w-full">
        <div 
          ref={containerRef} 
          className="flex flex-col md:flex-row gap-8 md:gap-12 px-5 sm:px-8 lg:px-12 w-full md:w-auto" 
          style={isDesktop ? { width: `${productSections.length * 75}vw` } : {}}
        >
          {productSections.map((section, idx) => (
            <div
              key={section.title}
              className="relative flex h-auto md:h-[54vh] w-full md:w-[70vw] shrink-0 flex-col md:flex-row justify-between border border-[#DEDAD2] bg-[#FFFFFF] p-6 transition-all duration-500 hover:border-[#FE6311] hover:shadow-xl sm:p-10 gap-6 md:gap-10 lg:w-[65vw] rounded-xs group shadow-xs"
            >
              {/* Image Column */}
              <div className="relative aspect-video md:aspect-auto h-48 sm:h-64 md:h-full w-full md:w-1/2 overflow-hidden bg-[#F3EFEA] rounded-xs border border-[#DEDAD2]">
                <img
                  src={section.image}
                  alt={section.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="grid h-8 w-8 place-items-center bg-[#FFB51A] text-[#252525] font-mono text-xs font-black rounded-xs shadow-sm">
                    0{idx + 1}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="mono-label text-[8.5px] tracking-widest text-[#FFFFFF] bg-[#1A1A1A]/95 px-3 py-1 rounded-xs font-bold uppercase border border-white/10 shadow-xs">
                    {section.tag}
                  </span>
                </div>
              </div>

              {/* Info Column */}
              <div className="flex flex-1 flex-col justify-between pt-2 md:pt-0">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="mono-label text-[9.5px] font-bold tracking-widest text-[#FE6311] uppercase">
                      COLLECTION 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-3xl font-black uppercase tracking-tight text-[#1A1A1A] sm:text-4xl">
                    {section.title}
                  </h3>
                  <p className="mono-label text-[9.5px] font-bold tracking-wider text-[#FE6311]">
                    {section.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#66625D]">
                    {section.description}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#1A1A1A] bg-[#F3EFEA] border border-[#E2DDD5] px-2.5 py-1 rounded-xs">
                      <Layers size={11} className="text-[#FE6311]" /> {section.fabric}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E2DDD5] flex items-center justify-between">
                  <Link
                    href={section.href}
                    className="inline-flex items-center gap-2.5 px-5 py-3 text-[10px] font-black uppercase tracking-[0.18em] rounded-xs shadow-sm bg-[#FFB51A] text-[#252525] hover:bg-[#FE6311] hover:text-white transition-all"
                  >
                    View Catalog <MoveRight size={13} />
                  </Link>

                  <Link
                    href="/#enquiry"
                    className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#252525] hover:text-[#FE6311] transition-colors"
                  >
                    Request Quote <ArrowUpRight size={13} />
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





