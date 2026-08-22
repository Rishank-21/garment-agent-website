"use client";

import React, { useEffect, useRef } from "react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const productSections = [
  {
    title: "Men's Wear",
    subtitle: "Premium Shirts, Denim & Woven Garments",
    description: "Built for urban brands looking for exceptional fits, bio-washed cotton polos, durable slub denim shirts, and premium trousers.",
    moq: "200 Pcs / Style",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800",
    href: "/catalog?category=mens wear"
  },
  {
    title: "Women's Wear",
    subtitle: "Modern Tops, Knitwear & High-street Fashion",
    description: "Highly curated lines of high-street coordinates, premium knitwear, casual summer tops, and denim skirts with customized dye washes.",
    moq: "150 Pcs / Style",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800",
    href: "/catalog?category=womens wear"
  },
  {
    title: "Kids Wear",
    subtitle: "Soft Knitwear, Organic Cotton Rompers & Playsuits",
    description: "Strict quality control and non-toxic materials. Soft cotton pullovers, playsuits, organic cotton t-shirts, and durable joggers.",
    moq: "300 Pcs / Style",
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800",
    href: "/catalog?category=kids wear"
  },
  {
    title: "Private Label",
    subtitle: "End-to-End Bespoke Custom Apparel Sourcing",
    description: "Complete design-to-delivery support. Custom tech pack creation, fabric sourcing, customized embroidery, and global export packaging.",
    moq: "100 Pcs / Custom Design",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
    href: "/#enquiry"
  }
];

export default function HorizontalProducts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger for horizontal scroll on desktop
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

    return () => {
      pin.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} className="relative overflow-hidden bg-[#0d0d0d] h-screen flex flex-col justify-between py-10">
      {/* Title Header */}
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
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
      <div className="flex flex-1 items-center justify-start py-4">
        <div ref={containerRef} className="flex gap-16 px-5 sm:px-8 lg:px-12" style={{ width: `${productSections.length * 75}vw` }}>
          {productSections.map((section, idx) => (
            <div
              key={section.title}
              className="relative flex h-[52vh] w-[70vw] shrink-0 flex-col justify-between border border-white/10 bg-[#141414] p-6 transition-all hover:border-white/20 sm:p-10 md:flex-row md:gap-10 lg:w-[65vw]"
            >
              {/* Image Column */}
              <div className="relative h-1/2 overflow-hidden bg-stone-900 md:h-full md:w-1/2">
                <img
                  src={section.image}
                  alt={section.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="mono-label text-[10px] tracking-widest text-white/50">M.O.Q. / {section.moq}</span>
                </div>
              </div>

              {/* Info Column */}
              <div className="flex flex-1 flex-col justify-between pt-6 md:pt-0">
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
