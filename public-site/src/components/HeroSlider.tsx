"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDownRight, MoveUpRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { useLanguage } from "@/lib/LanguageContext";

const images = [
  "/images/ahmedabad_market_safal.jpg",
  "/images/ahmedabad_market_gheekanta.jpg",
  "/images/ahmedabad_market_newcloth.jpg",
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

      gsap.set(nextImage, { clipPath: "inset(100% 0 0 0)", scale: 1.08, zIndex: 10, opacity: 1 });
      gsap.to(nextImage, { clipPath: "inset(0% 0 0 0)", scale: 1.02, duration: 1.0, ease: "power2.inOut" });
      gsap.to(currentImage, {
        scale: 1,
        opacity: 0,
        duration: 1.0,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(currentImage, { zIndex: 1 });
          setActiveIndex(nextIndex);
        },
      });
    }, 5500);
    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    const initialSlide = imageRefs.current[0];
    if (initialSlide) gsap.fromTo(initialSlide, { scale: 1.08, opacity: 0 }, { scale: 1.02, opacity: 1, duration: 1.2, ease: "power2.out" });
    const hasVisited = typeof window !== "undefined" && sessionStorage.getItem("himat_preloader_visited") === "true";
    const revealElements = contentRef.current?.querySelectorAll("[data-reveal]");
    if (revealElements) {
      gsap.fromTo(revealElements, { y: 15, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: hasVisited ? 0.5 : 0.7, delay: hasVisited ? 0.15 : 1.2, ease: "power2.out" });
    }
  }, []);

  return (
    <section className="relative min-h-[720px] h-screen w-full overflow-hidden bg-[#0A1F2B]">
      <div className="absolute inset-0">
        {images.map((img, idx) => (
          <div
            key={img}
            ref={(el) => { if (el) imageRefs.current[idx] = el; }}
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(10,31,43,.94) 0%, rgba(10,31,43,.75) 42%, rgba(10,31,43,.3) 100%), linear-gradient(0deg, rgba(10,31,43,.86) 0%, transparent 58%), url(${img})`,
              zIndex: idx === activeIndex ? 5 : 1,
              opacity: idx === activeIndex ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div className="noise-layer absolute inset-0 z-10" />

      <div ref={contentRef} className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-28 lg:px-12 lg:pt-24">
        <div className="flex items-center justify-between" data-reveal>
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[#FFFFFF]/60">
            <span className="h-2 w-2 bg-[#C89A3D]" /> Ahmedabad, India
          </div>
          <div className="hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[#FFFFFF]/60 md:flex">
            Sourcing <span className="text-[#C89A3D]">•</span> Wholesale <span className="text-[#C89A3D]">•</span> White Labeling <span className="text-[#C89A3D]">•</span> Export
          </div>
        </div>

        <div className="max-w-[900px] pb-7">
          <span data-reveal className="mono-label block text-[10px] tracking-[0.26em] text-[#C89A3D] uppercase">{t("hero_tagline")}</span>
          <div className="mt-4 h-[3px] w-16 bg-[#C89A3D]" data-reveal />
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5.2vw,4.8rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] text-[#FFFFFF] md:mt-5">
            <span data-reveal className="block">{t("hero_title_1")}</span>
            <span data-reveal className="block text-transparent stroke-text">{t("hero_title_2")}</span>
            <span data-reveal className="block">{t("hero_title_3")}</span>
          </h1>
          <div className="mt-5 max-w-xl space-y-2">
            <p data-reveal className="text-base font-semibold leading-relaxed text-[#FFFFFF] sm:text-lg">{t("hero_subtitle")}</p>
            <p data-reveal className="text-xs sm:text-sm leading-relaxed text-[#FFFFFF]/75">{t("hero_description")}</p>
          </div>
          <div data-reveal className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/catalog" className="gold-button inline-flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition-transform hover:-translate-y-0.5 rounded-md">{t("btn_view_collection")} <MoveUpRight size={14} /></Link>
            <Link href="/#enquiry" className="inline-flex items-center gap-2 border border-[#FFFFFF]/30 bg-[#0A1F2B]/30 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] text-[#FFFFFF] backdrop-blur-md transition-all hover:border-[#C89A3D] hover:text-[#C89A3D] rounded-md">{t("btn_start_enquiry_upper")}</Link>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-[#FFFFFF]/15 pt-5" data-reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs tracking-widest text-[#FFFFFF]/65">{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
            <div className="flex gap-1.5" aria-label="Hero slide position">
              {images.map((_, idx) => <span key={idx} className={`h-1.5 w-10 transition-colors rounded-full ${idx === activeIndex ? "bg-[#C89A3D]" : "bg-[#FFFFFF]/25"}`} />)}
            </div>
          </div>
          <a href="#categories" className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-[#FFFFFF]/60 transition-colors hover:text-[#C89A3D] sm:flex">Explore the collection <ArrowDownRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}
