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

      gsap.set(nextImage, { clipPath: "inset(100% 0 0 0)", scale: 1.12, zIndex: 10, opacity: 1 });
      gsap.to(nextImage, { clipPath: "inset(0% 0 0 0)", scale: 1.04, duration: 1.6, ease: "power3.inOut" });
      gsap.to(currentImage, {
        scale: 1,
        opacity: 0,
        duration: 1.6,
        ease: "power3.inOut",
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
    if (initialSlide) gsap.fromTo(initialSlide, { scale: 1.12, opacity: 0 }, { scale: 1.04, opacity: 1, duration: 1.8, ease: "power3.out" });
    const hasVisited = typeof window !== "undefined" && sessionStorage.getItem("himat_preloader_visited") === "true";
    const revealElements = contentRef.current?.querySelectorAll("[data-reveal]");
    if (revealElements) {
      gsap.fromTo(revealElements, { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: hasVisited ? 0.7 : 0.95, delay: hasVisited ? 0.25 : 3.7, ease: "power3.out" });
    }
  }, []);

  return (
    <section className="relative min-h-[720px] h-screen w-full overflow-hidden bg-[#151613]">
      <div className="absolute inset-0">
        {images.map((img, idx) => (
          <div
            key={img}
            ref={(el) => { if (el) imageRefs.current[idx] = el; }}
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(21,22,19,.92) 0%, rgba(21,22,19,.72) 42%, rgba(21,22,19,.25) 100%), linear-gradient(0deg, rgba(21,22,19,.84) 0%, transparent 58%), url(${img})`,
              zIndex: idx === activeIndex ? 5 : 1,
              opacity: idx === activeIndex ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div className="noise-layer absolute inset-0 z-10" />

      <div ref={contentRef} className="relative z-20 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pb-8 pt-32 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between" data-reveal>
          <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[#f7f2e9]/55">
            <span className="h-2 w-2 bg-[#f05a24]" /> Ahmedabad, India
          </div>
          <div className="hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[#f7f2e9]/55 md:flex">
            Sourcing <span className="text-[#ffb800]">•</span> Wholesale <span className="text-[#ffb800]">•</span> Private Label <span className="text-[#ffb800]">•</span> Export
          </div>
        </div>

        <div className="max-w-[900px] pb-7">
          <span data-reveal className="mono-label block text-[10px] tracking-[0.26em] text-[#ffb800] uppercase">{t("hero_tagline")}</span>
          <div className="mt-5 h-[3px] w-16 bg-gradient-to-r from-[#f05a24] to-[#ffb800]" data-reveal />
          <h1 className="mt-6 font-display text-[clamp(3.8rem,10vw,9rem)] font-black uppercase leading-[0.86] tracking-[-0.065em] text-[#f7f2e9]">
            <span data-reveal className="block">{t("hero_title_1")}</span>
            <span data-reveal className="block text-transparent stroke-text">{t("hero_title_2")}</span>
            <span data-reveal className="block">{t("hero_title_3")}</span>
          </h1>
          <div className="mt-7 max-w-xl space-y-3">
            <p data-reveal className="text-base font-semibold leading-relaxed text-[#f7f2e9] sm:text-lg">{t("hero_subtitle")}</p>
            <p data-reveal className="text-sm leading-relaxed text-[#f7f2e9]/68 sm:text-[15px]">{t("hero_description")}</p>
          </div>
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/catalog" className="gold-button inline-flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition-transform hover:-translate-y-0.5">{t("btn_view_collection")} <MoveUpRight size={14} /></Link>
            <Link href="/#enquiry" className="inline-flex items-center gap-2 border border-[#f7f2e9]/35 bg-[#151613]/30 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] text-[#f7f2e9] backdrop-blur-md transition-all hover:border-[#f05a24] hover:text-[#ffb800]">{t("btn_start_enquiry_upper")}</Link>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-[#f7f2e9]/18 pt-5" data-reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs tracking-widest text-[#f7f2e9]/65">{String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
            <div className="flex gap-1.5" aria-label="Hero slide position">
              {images.map((_, idx) => <span key={idx} className={`h-1 w-10 transition-colors ${idx === activeIndex ? "bg-[#f05a24]" : "bg-[#f7f2e9]/25"}`} />)}
            </div>
          </div>
          <a href="#categories" className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-[#f7f2e9]/55 transition-colors hover:text-[#ffb800] sm:flex">Explore the collection <ArrowDownRight size={15} /></a>
        </div>
      </div>
    </section>
  );
}
