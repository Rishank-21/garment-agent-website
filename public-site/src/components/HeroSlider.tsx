"use client";

import React, { useEffect, useRef, useState } from "react";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

const images = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600",
  "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1600",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600",
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1600",
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleSpan1Ref = useRef<HTMLSpanElement>(null);
  const titleSpan2Ref = useRef<HTMLSpanElement>(null);
  const titleSpan3Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  // Slide transition logic (Auto-slide every 4.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;

      const currentImage = imageRefs.current[activeIndex];
      const nextImage = imageRefs.current[nextIndex];

      if (currentImage && nextImage) {
        // Prepare next image
        gsap.set(nextImage, {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          scale: 1.15,
          zIndex: 10,
          opacity: 1
        });

        // Animate reveal of next image via clipPath
        gsap.to(nextImage, {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          scale: 1.05,
          duration: 1.8,
          ease: "power3.inOut"
        });

        // Slight parallax scale down and fade out on old image
        gsap.to(currentImage, {
          scale: 1,
          opacity: 0,
          duration: 1.8,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(currentImage, { zIndex: 1 });
            setActiveIndex(nextIndex);
          }
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Initial page load animations
  useEffect(() => {
    // Setup initial state
    gsap.set([titleSpan1Ref.current, titleSpan2Ref.current, titleSpan3Ref.current], { y: 80, opacity: 0 });
    gsap.set(descRef.current, { y: 40, opacity: 0 });
    gsap.set(buttonsRef.current, { y: 30, opacity: 0 });
    gsap.set(counterRef.current, { opacity: 0 });

    // Initial background slide setup
    const initialSlide = imageRefs.current[0];
    if (initialSlide) {
      gsap.fromTo(initialSlide,
        { scale: 1.12, opacity: 0 },
        { scale: 1.05, opacity: 1, duration: 1.8, ease: "power3.out" }
      );
    }

    // Text Reveal Timeline
    const hasVisited = typeof window !== "undefined" && sessionStorage.getItem("himat_preloader_visited") === "true";
    const animDelay = hasVisited ? 0.3 : 3.8; // Delay animation until preloader rolls up

    const tl = gsap.timeline({ delay: animDelay });
    tl.to([titleSpan1Ref.current, titleSpan2Ref.current, titleSpan3Ref.current], {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 1.2,
      ease: "power4.out"
    })
      .to(descRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .to(buttonsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(counterRef.current, {
        opacity: 1,
        duration: 0.5
      }, "-=0.4");

  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((img, idx) => (
          <div
            key={img}
            ref={(el) => { if (el) imageRefs.current[idx] = el; }}
            className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-[4500ms]"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.55)), url(${img})`,
              zIndex: idx === activeIndex ? 5 : 1,
              opacity: idx === activeIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* Stable Text Content */}
      <div className="absolute inset-x-0 bottom-0 top-0 z-20 mx-auto flex max-w-[1600px] flex-col justify-between px-5 py-24 sm:px-8 lg:px-12">
        <div className="flex-1" />

        <div className="max-w-[850px] space-y-6">
          <h1 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-7xl md:text-8xl">
            <span ref={titleSpan1Ref} className="block overflow-hidden">BUILT FOR</span>
            <span ref={titleSpan2Ref} className="block overflow-hidden text-transparent stroke-text">THE BUSINESS</span>
            <span ref={titleSpan3Ref} className="block overflow-hidden">OF FASHION.</span>
          </h1>

          <p ref={descRef} className="max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
            Your premium B2B garment partner for wholesale catalog sourcing, custom private label production, and global apparel exports.
          </p>

          <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/catalog"
              className="flex items-center gap-2 border border-white bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] text-black transition-transform hover:-translate-y-0.5"
            >
              Explore Garments <MoveUpRight size={14} />
            </Link>
            <Link
              href="/#enquiry"
              className="flex items-center gap-2 border border-white/30 bg-black/40 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] text-white backdrop-blur-md transition-all hover:border-white hover:-translate-y-0.5"
            >
              Start Enquiry
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-12">
          <div ref={counterRef} className="mono-label text-xs tracking-widest text-white/50">
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
          <div className="mono-label hidden text-[10px] tracking-widest text-white/30 sm:block uppercase">
            Himat Textile — Premium Garment Sourcing & Manufacturing
          </div>
        </div>
      </div>
    </div>
  );
}
