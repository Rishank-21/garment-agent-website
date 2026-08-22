"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [mounted, setMounted] = useState(false);

  // Set mounted on client load to avoid SSR hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Only run on desktop/non-touch screens
    if (window.innerWidth < 1024) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Set initial positions centered at 0,0
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0, // Instant movement for accuracy
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3, // Trailing delay lag
        ease: "power3.out",
      });
    };

    // Hover scale effects on entering/leaving window
    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };
    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    // Tactile Click animation
    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.12, ease: "power2.out" });
    };
    const onMouseUp = () => {
      gsap.to(ring, { scale: 1.0, duration: 0.25, ease: "back.out(2)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseenter", onMouseEnter);
    document.body.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Hover targets mapping for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const cta = target.closest("a, button, [role='button'], input[type='submit']");
      const img = target.closest("img");
      const card = target.closest(".horizontal-product-card, .catalog-garment-card");

      if (cta) {
        setCursorText("OPEN →");
        gsap.to(dot, { scale: 0, duration: 0.2 });
        gsap.to(ring, {
          width: 80,
          height: 80,
          backgroundColor: "#ffffff",
          borderColor: "#ffffff",
          color: "#000000",
          duration: 0.25,
          ease: "power2.out"
        });
      } else if (img) {
        setCursorText("VIEW");
        gsap.to(dot, { scale: 0, duration: 0.2 });
        gsap.to(ring, {
          width: 70,
          height: 70,
          backgroundColor: "#ffffff",
          borderColor: "#ffffff",
          color: "#000000",
          duration: 0.25,
          ease: "power2.out"
        });
      } else if (card) {
        setCursorText("EXPLORE");
        gsap.to(dot, { scale: 0, duration: 0.2 });
        gsap.to(ring, {
          width: 80,
          height: 80,
          backgroundColor: "#ffffff",
          borderColor: "#ffffff",
          color: "#000000",
          duration: 0.25,
          ease: "power2.out"
        });
      } else {
        setCursorText("");
        gsap.to(dot, { scale: 1, duration: 0.2 });
        gsap.to(ring, {
          width: 32,
          height: 32,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.4)",
          color: "transparent",
          duration: 0.25,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mounted]);

  // Avoid rendering during SSR or on mobile screens (viewport check)
  if (!mounted || (typeof window !== "undefined" && window.innerWidth < 1024)) {
    return null;
  }

  return (
    <>
      {/* Small Central Snap Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
      />

      {/* Trailing Ring Circle */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-transparent font-mono text-[9px] font-black uppercase tracking-wider text-transparent select-none transition-opacity duration-300"
      >
        {cursorText}
      </div>
    </>
  );
}
