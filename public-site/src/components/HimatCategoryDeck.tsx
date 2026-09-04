"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HimatCategoryItem } from "@/lib/categoriesData";
import { triggerInquiryForCategory } from "@/lib/inquiryEvents";

export default function HimatCategoryDeck({ category }: { category: HimatCategoryItem }) {
  const [active, setActive] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    if (deckRef.current) {
      const card = deckRef.current.children[index] as HTMLElement;
      if (card) {
        deckRef.current.scrollTo({
          left: card.offsetLeft - deckRef.current.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  const previous = () => {
    const nextIdx = (active - 1 + category.variants.length) % category.variants.length;
    setActive(nextIdx);
    scrollToCard(nextIdx);
  };

  const next = () => {
    const nextIdx = (active + 1) % category.variants.length;
    setActive(nextIdx);
    scrollToCard(nextIdx);
  };

  const selectCard = (index: number) => {
    setActive(index);
    scrollToCard(index);
  };

  const handleScroll = () => {
    if (deckRef.current) {
      const scrollLeft = deckRef.current.scrollLeft;
      const card = deckRef.current.children[0] as HTMLElement;
      if (card) {
        const cardWidth = card.clientWidth + 10;
        const newIndex = Math.round(scrollLeft / cardWidth);
        if (newIndex >= 0 && newIndex < category.variants.length && newIndex !== active) {
          setActive(newIndex);
        }
      }
    }
  };

  const categoryRoute = `/catalog?category=${category.id}`;

  return (
    <div id={category.id} className={`catalogue-category ${category.tone} border-b border-[rgba(23,26,29,0.12)]`}>
      <div className="catalogue-copy">
        <div className="catalogue-index-row">
          <span className="maker-seal rounded-full border border-dashed border-current px-3 py-1">
            Himat Textile / Atelier
          </span>
        </div>

        <h2>
          <button
            type="button"
            onClick={() =>
              triggerInquiryForCategory({
                categoryTitle: category.title,
                fabric: category.fabric,
              })
            }
            className="catalogue-title-link font-serif text-left cursor-pointer border-0 bg-transparent p-0"
          >
            {category.title}
          </button>
        </h2>

        <p className="catalogue-line font-serif">{category.line}</p>
        <p className="catalogue-description">{category.description}</p>

        <div className="catalogue-specs">
          <span>Direct Mill Lots</span>
          <span>100% Quality QC</span>
          <span>Pan-India Dispatch</span>
        </div>

        <div className="catalogue-proof">
          <img src={category.detailImage} alt={`${category.title} material proof`} />
          <span>
            Material proof<br />
            <b>Spin / weave / stitch</b>
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            triggerInquiryForCategory({
              categoryTitle: category.title,
              fabric: category.fabric,
            })
          }
          className="catalogue-quote"
        >
          Configure {category.title.toLowerCase()} catalog <ArrowUpRight size={17} />
        </button>
      </div>

      <div className="category-deck-wrap">
        <div className="category-deck-controls">
          <span>
            <b>{String(active + 1).padStart(2, "0")}</b> / {String(category.variants.length).padStart(2, "0")}
          </span>
          <div>
            <button onClick={previous} aria-label={`Previous ${category.title} variant`}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} aria-label={`Next ${category.title} variant`}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={deckRef}
          onScroll={handleScroll}
          className="category-deck"
          role="tablist"
          aria-label={`${category.title} apparel variants`}
        >
          {category.variants.map((variant, index) => (
            <button
              key={variant.name}
              className={`catalogue-card ${active === index ? "is-active" : ""}`}
              role="tab"
              aria-selected={active === index}
              onClick={() => {
                if (active === index) {
                  triggerInquiryForCategory({
                    categoryTitle: category.title,
                    variantName: variant.name,
                    variantNote: variant.note,
                    fabric: category.fabric,
                  });
                } else {
                  selectCard(index);
                }
              }}
              onMouseEnter={() => selectCard(index)}
              onFocus={() => selectCard(index)}
            >
              <img src={variant.image} alt={`${variant.name} apparel style`} loading="lazy" />
              <span className="catalogue-card-shade" />
              <span className="catalogue-card-number">0{index + 1}</span>

              <span className="catalogue-card-content">
                <small>{variant.note}</small>
                <strong>{variant.name}</strong>
              </span>

              <span className="catalogue-card-specs">
                <span>Typical spec</span>
                <b>{category.fabric}</b>
                <small>{category.finish}</small>
                <span className="catalogue-card-colours">
                  <i>Available colours</i>
                  <span>
                    {category.colors.map((color) => (
                      <em key={color} style={{ backgroundColor: color }} />
                    ))}
                  </span>
                </span>
              </span>

              <span
                className="catalogue-card-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerInquiryForCategory({
                    categoryTitle: category.title,
                    variantName: variant.name,
                    variantNote: variant.note,
                    fabric: category.fabric,
                  });
                }}
                title={`Inquire about ${variant.name}`}
              >
                <ArrowUpRight size={17} />
              </span>
            </button>
          ))}
        </div>
      </div>

      <svg className="category-thread" viewBox="0 0 480 110" fill="none" aria-hidden="true">
        <path d="M-12 99C67 81 111 23 191 56C267 87 299 74 369 31C403 10 434 14 496 1" />
      </svg>
    </div>
  );
}

