"use client";

import React from "react";
import { HimatCategoryItem } from "@/lib/categoriesData";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface CategoryChipsFilterProps {
  selectedFilter: string;
  onSelectFilter: (id: string) => void;
  categories: HimatCategoryItem[];
}

export default function CategoryChipsFilter({
  selectedFilter,
  onSelectFilter,
  categories,
}: CategoryChipsFilterProps) {
  const { language } = useLanguage();
  const isAll = selectedFilter === "all";

  const getCategoryTitle = (cat: HimatCategoryItem) => {
    if (language !== "hi") return cat.title;
    switch (cat.id) {
      case "mens-wear": return "मेंस वियर (पुरुष वस्त्र)";
      case "womens-wear": return "विमेंस वियर (महिला वस्त्र)";
      case "kids-wear": return "किड्स वियर (बाल वस्त्र)";
      case "ethnic-wear": return "एथनिक एवं कुर्तियां";
      case "bedsheets": return "बेडशीट्स और होम";
      case "fabrics": return "मिल फैब्रिक्स";
      case "white-labeling": return "व्हाइट लेबलिंग";
      default: return cat.title;
    }
  };

  const selectedCat = categories.find((c) => c.id === selectedFilter);

  return (
    <div className="w-full bg-[#FAF8F5] border-y border-[rgba(23,26,29,0.1)] py-5 px-5 sm:px-8 lg:px-12">
      <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Status Label (Clean, without number counts) */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="flex h-2.5 w-2.5 rounded-[2px] bg-[#FE6311] shadow-[0_0_8px_#FE6311]" />
          <div>
            <span className="block font-mono text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#FE6311]">
              {language === "hi" ? "सोर्सिंग श्रेणियां" : "SOURCING VERTICALS"}
            </span>
            <p className="font-serif text-sm text-[#171A1D] leading-none mt-0.5">
              {isAll ? (
                <>{language === "hi" ? "सभी गारमेंट सोर्सिंग प्रणालियां" : "All Garment Sourcing Systems"}</>
              ) : (
                <>
                  {language === "hi" ? "चयनित: " : "Selected: "}<b>{selectedCat ? getCategoryTitle(selectedCat) : ""}</b>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Chips Tray (Crisp Rectangular Swatch Tabs with Touch Momentum) */}
        <div className="overflow-x-auto pb-1.5 -mx-5 px-5 sm:mx-0 sm:px-0 scrollbar-none overscroll-x-contain touch-pan-x">
          <div className="flex items-center gap-2 min-w-max" role="group" aria-label="Category filter chips">
            {/* All Categories Chip */}
            <button
              onClick={() => onSelectFilter("all")}
              aria-pressed={isAll}
              className={`group inline-flex items-center gap-2 px-4.5 py-2.5 rounded-[2px] font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none border ${
                isAll
                  ? "bg-[#171A1D] text-[#FFFAF4] border-[#171A1D] shadow-sm -translate-y-0.5"
                  : "bg-[#FFFAF4] text-[#171A1D]/80 border-[rgba(23,26,29,0.14)] hover:border-[#FE6311] hover:text-[#FE6311] hover:bg-[#F3EEE5] shadow-xs hover:-translate-y-0.5"
              }`}
            >
              <span>{language === "hi" ? "सभी श्रेणियां" : "All Categories"}</span>
              {isAll && <ArrowRight size={13} className="text-[#FFB51A]" />}
            </button>

            {/* Individual Category Chips (Rectangular, clean) */}
            {categories.map((cat) => {
              const isActive = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectFilter(cat.id)}
                  aria-pressed={isActive}
                  className={`group inline-flex items-center gap-2 px-4.5 py-2.5 rounded-[2px] font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none border ${
                    isActive
                      ? "bg-[#171A1D] text-[#FFFAF4] border-[#171A1D] shadow-sm -translate-y-0.5"
                      : "bg-[#FFFAF4] text-[#171A1D]/80 border-[rgba(23,26,29,0.14)] hover:border-[#FE6311] hover:text-[#FE6311] hover:bg-[#F3EEE5] shadow-xs hover:-translate-y-0.5"
                  }`}
                >
                  <span>{getCategoryTitle(cat)}</span>
                  {isActive && (
                    <ArrowRight size={13} className="text-[#FFB51A] transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

