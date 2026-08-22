"use client";

import { ArrowUpRight, Layers3 } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/schema";

export function HimatProductGrid({ compact = false, products = [] }: { compact?: boolean; products?: Product[] }) {
  const categoryPrograms = [
    { category: "mens wear" as const, title: "Men's wear programme", copy: "Flexible essentials and custom tailored retail programs for men.", image: "/manus-storage/wholesale-collection_ccc56985.jpeg" },
    { category: "womens wear" as const, title: "Women's wear programme", copy: "Structured fashion items and bespoke collections for women.", image: "/manus-storage/apparel-rack_8a025232.jpeg" },
    { category: "kids wear" as const, title: "Kids' wear programme", copy: "Comfort-first, durable playwear and knitwear collections for kids.", image: "/manus-storage/factory-tailoring_2f8b96ce.jpg" },
  ];
  
  const list = products.length 
    ? products.slice(0, compact ? 4 : 100).map(product => ({ 
        category: product.category, 
        title: product.title, 
        copy: `${product.fabricDetails} · MOQ ${product.moq}`, 
        image: product.imageUrl || "/manus-storage/garment-floor_4c6cab52.jpg", 
        live: true 
      })) 
    : categoryPrograms.map(program => ({ 
        title: program.title, 
        category: program.category, 
        copy: program.copy, 
        image: program.image, 
        live: false 
      }));

  return (
    <div className={`grid grid-cols-1 gap-px overflow-hidden bg-black sm:grid-cols-2 ${list.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
      {list.map((item, index) => (
        <article 
          key={`${item.title}-${index}`} 
          className={`group relative min-h-[400px] overflow-hidden bg-[#202020] ${
            index === 0 && compact ? "sm:col-span-2 lg:col-span-2" : ""
          }`}
        >
          <img 
            src={item.image ?? ""} 
            alt="Himat Textile garment category" 
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/15" />
          <div className="relative flex h-full min-h-[400px] flex-col justify-between p-5 text-white">
            <div className="flex justify-between">
              <span className="mono-label text-[10px] text-white/60">
                {String(index + 1).padStart(2, "0")} / {item.live ? "catalog item" : "category"}
              </span>
              <Layers3 size={15} className="text-white/70" />
            </div>
            <div>
              <p className="mono-label mb-3 text-[10px] text-white/65">{item.category}</p>
              <h3 className="font-display text-3xl font-black uppercase leading-[.9] tracking-[-.07em]">{item.title}</h3>
              <p className="mt-4 max-w-xs text-xs leading-5 text-white/70">{item.copy}</p>
              <Link 
                href="/#enquiry" 
                className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] opacity-0 transition duration-300 group-hover:opacity-100"
              >
                Request details <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
