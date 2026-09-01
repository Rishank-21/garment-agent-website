"use client";

import { ArrowUpRight, Layers3 } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/schema";

export function HimatProductGrid({ compact = false, products = [] }: { compact?: boolean; products?: Product[] }) {
  const categoryPrograms = [
    { category: "mens wear" as const, title: "Men's Wear", copy: "Cotton Pants, Shirts, Lowers, Linen Wear, and T-Shirts.", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800" },
    { category: "womens wear" as const, title: "Women's Wear", copy: "Ethnic, 3pc, Kurtis, Co-ord Sets, Palazzo, Leggings, and Dupatta.", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800" },
    { category: "kids wear" as const, title: "Kids' Wear", copy: "Cotton Pants, Shirts, Lowers, Linen Wear, and T-Shirts for children.", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800" },
    { category: "bedsheets" as const, title: "Bedsheets", copy: "Packed and Roll formats direct from manufacture.", image: "/images/custom_bedsheet.jpg" },
    { category: "fabrics" as const, title: "Fabrics Sourcing", copy: "Mills, Process House, and custom Assortments.", image: "/images/ahmedabad_market_safal.jpg" },
  ];
  
  const list = products.length 
    ? products.slice(0, compact ? 4 : 100).map(product => ({ 
        category: product.category, 
        title: product.title, 
        copy: product.subcategory ? `${product.fabricDetails} · ${product.subcategory}` : product.fabricDetails, 
        image: product.imageUrl || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800", 
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
              <h3 className="font-display text-3xl font-black uppercase leading-none tracking-[-.07em] sm:leading-[.9]">{item.title}</h3>
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
