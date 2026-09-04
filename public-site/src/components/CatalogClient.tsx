"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HIMAT_CATEGORIES } from "@/lib/categoriesData";
import HimatCategoryDeck from "@/components/HimatCategoryDeck";
import CategoryChipsFilter from "@/components/CategoryChipsFilter";
import { HimatInquiry } from "@/components/HimatInquiry";
import { Product, Advertisement, Category } from "@/lib/schema";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface CatalogClientProps {
  initialProducts: Product[];
  initialAds: Advertisement[];
  initialCategory?: string;
  initialSubcategory?: string;
  categories: Category[];
}

export default function CatalogClient({
  initialCategory,
}: CatalogClientProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>(() => {
    if (!initialCategory || initialCategory === "all") return "all";
    const found = HIMAT_CATEGORIES.find((c) => c.id === initialCategory);
    return found ? found.id : "all";
  });

  useEffect(() => {
    if (initialCategory && initialCategory !== "all") {
      const found = HIMAT_CATEGORIES.find((c) => c.id === initialCategory);
      if (found) {
        setSelectedFilter(found.id);
        const el = document.getElementById(found.id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [initialCategory]);

  const visibleCategories =
    selectedFilter === "all"
      ? HIMAT_CATEGORIES
      : HIMAT_CATEGORIES.filter((c) => c.id === selectedFilter);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171A1D]">
      <main>
        {/* 1. Komal-Style Catalogue Hero */}
        <section className="uniforms-hero">
          <div className="uniforms-hero-content">
            <Link href="/" className="back-link">
              <ArrowLeft size={16} /> Back to Himat Textile
            </Link>
            <h1>
              Every category.<br />
              <em>Its own garment system.</em>
            </h1>
            <p>
              Explore ready-to-order apparel systems and mill-direct textiles for retail chains, distributors, private labels, and corporate supply across India.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 w-full sm:w-auto">
              <a href="#catalogue-deck" className="catalogue-start justify-center sm:justify-start">
                Open the catalogue <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="uniforms-hero-gallery" aria-hidden="true">
            <img
              className="hero-gallery-one"
              src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800"
              alt="Tailoring craftsmanship"
            />
            <img
              className="hero-gallery-two"
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800"
              alt="Ethnic and western apparel"
            />
            <img
              className="hero-gallery-three"
              src="/manus-storage/stitchform-private-label_b6cb424d.jpg"
              alt="White labeling atelier"
            />
            <svg viewBox="0 0 600 170" fill="none">
              <path d="M-10 135C99 92 132 63 225 85C330 111 403 22 620 0" />
            </svg>
          </div>
        </section>

        {/* 2. Enhanced Category Chips Filter Bar */}
        <section id="catalogue-deck">
          <CategoryChipsFilter
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
            categories={HIMAT_CATEGORIES}
          />
        </section>

        {/* 4. Filtered Category Decks */}
        <div className="filtered-categories">
          {visibleCategories.map((category) => (
            <HimatCategoryDeck key={category.id} category={category} />
          ))}
        </div>

        {/* 5. Specification-Led Quote CTA */}
        <section className="uniforms-cta bg-[#F3EEE5] py-16 sm:py-20 px-6 sm:px-12 border-y border-[rgba(23,26,29,0.12)] my-12">
          <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-[#FE6311] uppercase tracking-wider bg-[#FFFAF4] px-3.5 py-1.5 rounded-[2px] border border-[rgba(254,99,17,0.2)] shadow-xs mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FE6311]" />
                NEED A SPECIFICATION-LED QUOTE?
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[0.95] tracking-tight text-[#171A1D]">
                Bring the brief.<br />
                <em className="italic text-[#FE6311]">We’ll build the garment.</em>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#171A1D]/75 leading-relaxed">
                Connect directly with our Ahmedabad manufacturing desk. Share your required quantities, target price points, or custom tech packs for instant lot availability and doorstep freight estimates.
              </p>

              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-[rgba(23,26,29,0.1)] text-xs text-[#171A1D]/80 font-mono">
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-[#FE6311] font-bold">✓</span> Direct Mill Pricing
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-[#FE6311] font-bold">✓</span> Custom Tech Pack Support
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-[#FE6311] font-bold">✓</span> Pan-India Logistics
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto lg:min-w-[280px] shrink-0">
              <a
                href="https://wa.me/919873938095?text=Hello%20Himat%20Textile,%20I%20want%20to%20inquire%20about%20bulk%20garment%20sourcing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5B] text-white px-7 py-4 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>CONNECT ON WHATSAPP</span>
              </a>
              <a
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2.5 bg-[#171A1D] hover:bg-[#2D3236] text-[#FFFAF4] px-7 py-4 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>START A GARMENT ENQUIRY</span>
                <ArrowUpRight size={16} className="text-[#FFB51A]" />
              </a>
            </div>
          </div>
        </section>

        {/* 6. B2B Inquiry Form */}
        <div id="enquiry">
          <HimatInquiry />
        </div>
      </main>
    </div>
  );
}
