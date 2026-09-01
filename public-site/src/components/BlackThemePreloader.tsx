"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HimatLogo from "@/components/HimatLogo";

export default function BlackThemePreloader() {
  const [shouldRender, setShouldRender] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("himat_preloader_visited");
    if (!hasVisited) {
      setShouldRender(true);
      sessionStorage.setItem("himat_preloader_visited", "true");
    }
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    document.body.style.overflow = "hidden";

    // Progress bar + counter animation
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.floor(progressObj.value));
        if (lineProgressRef.current) {
          lineProgressRef.current.style.width = `${Math.floor(progressObj.value)}%`;
        }
      },
    });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      }
    });

    gsap.set(logoRef.current, { scale: 0.88, opacity: 0, y: 18 });
    gsap.set(textRef.current, { opacity: 0, y: 14 });
    gsap.set(subtextRef.current, { opacity: 0, y: 10 });
    gsap.set(lineRef.current, { opacity: 0 });
    gsap.set(counterRef.current, { opacity: 0 });

    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out"
    })
    .to(lineRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2")
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .to(subtextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.15")
    .to(counterRef.current, {
      opacity: 1,
      duration: 0.3,
    }, "-=0.3")
    .to({}, { duration: 0.5 })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.85,
      ease: "power4.inOut"
    })
    .fromTo(".hero-reveal-target", 
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1 },
      "-=0.5"
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#141414] text-[#FAF9F6] select-none"
    >
      {/* Subtle Warm Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(254,99,17,0.08)_0%,rgba(255,181,26,0.04)_40%,transparent_70%)] pointer-events-none" />

      {/* Elegant thin border frame */}
      <div className="absolute inset-5 sm:inset-8 border border-white/[0.06] pointer-events-none rounded-xs" />

      {/* Main Content */}
      <div className="relative flex flex-col items-center text-center space-y-7 z-10 max-w-sm px-6">
        
        {/* Logo */}
        <div
          ref={logoRef}
          className="flex items-center justify-center p-5 rounded-full bg-white/[0.03] border border-white/10 shadow-2xl"
        >
          <HimatLogo className="h-24 sm:h-32 w-auto" light={false} />
        </div>

        {/* Brand Name */}
        <div className="space-y-1.5" ref={textRef}>
          <div className="font-serif-display text-2xl sm:text-3xl font-black uppercase tracking-[0.2em] text-[#FAF9F6]">
            HIMAT <span className="text-[#FFB51A]">TEXTILE</span>
          </div>
          <div
            ref={subtextRef}
            className="mono-label text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.26em] uppercase text-[#FAF9F6]/50"
          >
            AHMEDABAD · GARMENT SOURCING
          </div>
        </div>

        {/* Progress Bar */}
        <div ref={lineRef} className="w-full">
          <div className="relative w-52 sm:w-64 h-[2px] bg-white/10 overflow-hidden rounded-full mx-auto">
            <div 
              ref={lineProgressRef}
              className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-[#FFB51A] via-[#FE6311] to-[#FFB51A] shadow-[0_0_10px_rgba(255,181,26,0.6)] transition-none"
            />
          </div>
          
          {/* Counter */}
          <div
            ref={counterRef}
            className="mt-3 font-mono text-[10px] font-bold tracking-[0.2em] text-[#FAF9F6]/40"
          >
            {progress}%
          </div>
        </div>

      </div>
    </div>
  );
}
