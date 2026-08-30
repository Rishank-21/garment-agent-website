"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HimatLogo from "@/components/HimatLogo";

export default function BlackThemePreloader() {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if this is the first load of the current session
    const hasVisited = sessionStorage.getItem("himat_preloader_visited");
    
    if (!hasVisited) {
      setShouldRender(true);
      sessionStorage.setItem("himat_preloader_visited", "true");
    }
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    // Prevent scrolling during preloader animation
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        // Restore scrolling
        document.body.style.overflow = "";
      }
    });

    // Set initial states
    gsap.set(logoRef.current, { scale: 0.9, opacity: 0 });
    gsap.set(textRef.current, { opacity: 0, y: 10 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

    // Step 1: Reveal logo with a premium spring scale
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    // Step 2: Animate horizontal accent line
    .to(lineRef.current, {
      scaleX: 1,
      duration: 0.5,
      ease: "power1.inOut"
    }, "-=0.4")
    // Step 3: Fade up and track out the branding subtitle text
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      letterSpacing: "0.2em",
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2")
    // Step 4: Keep screen navy for a brief premium pause
    .to({}, { duration: 0.4 })
    // Step 5: Exit roll-up/slide-up transition for the screen overlay
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: "power3.inOut"
    })
    // Step 6: Reveal the main page content behind with a subtle fade/scale-up
    .fromTo(".hero-reveal-target", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 },
      "-=0.4"
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0A1F2B] text-white"
    >
      {/* Noise background */}
      <div className="absolute inset-0 noise-layer bg-[#0A1F2B]" />

      <div className="relative flex flex-col items-center text-center space-y-4 z-10">
        {/* Full Premium Brand Logo */}
        <div
          ref={logoRef}
          className="flex items-center justify-center max-w-[280px]"
        >
          <HimatLogo className="h-40 w-auto" light={false} />
        </div>

        {/* Accent Horizontal Line */}
        <div ref={lineRef} className="h-[1px] w-32 bg-[#C89A3D]/40" />

        {/* Branding text */}
        <div
          ref={textRef}
          className="mono-label text-[9px] tracking-[0.2em] uppercase text-white/50"
        >
          YOUR GARMENT GUIDE IN AHMEDABAD
        </div>
      </div>
    </div>
  );
}
