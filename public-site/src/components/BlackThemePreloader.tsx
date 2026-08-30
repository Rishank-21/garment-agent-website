"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HimatLogoIcon } from "@/components/HimatLogo";

export default function BlackThemePreloader() {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if this is the first load of the current session
    const hasVisited = sessionStorage.getItem("himat_preloader_visited");
    
    // For development/refresh, if we want it to run, we can always show it OR check session storage
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
    gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(textRef.current, { opacity: 0, y: 15 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

    // Step 1: Reveal logo with a premium spring scale
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power4.out"
    })
    // Step 2: Animate horizontal accent line
    .to(lineRef.current, {
      scaleX: 1,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.6")
    // Step 3: Fade up and track out the branding subtitle text
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      letterSpacing: "0.24em",
      duration: 1.0,
      ease: "power3.out"
    }, "-=0.3")
    // Step 4: Keep screen black for a brief premium pause
    .to({}, { duration: 0.6 })
    // Step 5: Exit roll-up/slide-up transition for the screen overlay
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    })
    // Step 6: Reveal the main page content behind with a subtle fade/scale-up
    .fromTo(".hero-reveal-target", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.15 },
      "-=0.8"
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#070707] text-white"
    >
      {/* Noise background */}
      <div className="absolute inset-0 noise-layer bg-[#070707]" />

      <div className="relative flex flex-col items-center text-center space-y-6 z-10">
        {/* Centered Box Logo */}
        <div
          ref={logoRef}
          className="flex h-20 w-20 items-center justify-center border border-white/20 bg-transparent"
        >
          <HimatLogoIcon className="h-12 w-12" />
        </div>

        {/* Accent Horizontal Line */}
        <div ref={lineRef} className="h-[1px] w-24 bg-white/30" />

        {/* Branding text */}
        <div
          ref={textRef}
          className="mono-label text-[10px] tracking-[0.16em] uppercase text-white/60"
        >
          Himat Textile — Sourcing
        </div>
      </div>
    </div>
  );
}
