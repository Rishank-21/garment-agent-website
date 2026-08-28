"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, MoveUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { HimatLogoIcon } from "@/components/HimatLogo";
import { useLanguage } from "@/lib/LanguageContext";

export function HimatHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const logoBoxRef = useRef<HTMLSpanElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage, t } = useLanguage();

  const translatedLinks = [
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_garments"), href: "/catalog" },
    { label: t("nav_capabilities"), href: "/capabilities" },
    { label: t("nav_network"), href: "/network" },
    { label: t("nav_guide"), href: "/guide" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Handle smooth scroll to page hashes (e.g. #enquiry, #network)
  useEffect(() => {
    const handleHashScroll = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash) {
          setTimeout(() => {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }, 150);
        }
      }
    };

    handleHashScroll();

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.includes("#")) {
          const hash = href.split("#")[1];
          if (hash) {
            setTimeout(() => {
              const element = document.getElementById(hash);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }, 100);
          }
        }
      }
    };

    window.addEventListener("hashchange", handleHashScroll);
    window.addEventListener("click", handleLinkClick);
    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
      window.removeEventListener("click", handleLinkClick);
    };
  }, [pathname]);

  // Handle scroll animation of the header via GSAP
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024;
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);

      if (isScrolled) {
        gsap.to(headerRef.current, {
          height: isMobile ? 56 : 64,
          backgroundColor: "rgba(13, 13, 13, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottomColor: "rgba(255, 255, 255, 0.1)",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(logoBoxRef.current, { scale: isMobile ? 0.8 : 0.85, duration: 0.4, ease: "power2.out" });
        gsap.to(logoTextRef.current, { scale: isMobile ? 0.9 : 0.95, duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(headerRef.current, {
          height: isMobile ? 64 : 88,
          backgroundColor: "rgba(0, 0, 0, 0)",
          backdropFilter: "blur(0px)",
          borderBottomColor: "rgba(255, 255, 255, 0)",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.to(logoBoxRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(logoTextRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animation for mobile menu open/close
  useEffect(() => {
    if (menuOpen) {
      // Open Timeline
      gsap.killTweensOf([mobileMenuRef.current, ".mobile-link-item"]);
      gsap.timeline()
        .to(mobileMenuRef.current, {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
        })
        .fromTo(
          ".mobile-link-item",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );
    } else {
      // Close Timeline
      gsap.killTweensOf([mobileMenuRef.current, ".mobile-link-item"]);
      gsap.timeline()
        .to(".mobile-link-item", {
          y: -20,
          opacity: 0,
          stagger: 0.04,
          duration: 0.3,
          ease: "power3.in",
        })
        .to(mobileMenuRef.current, {
          y: "-100%",
          opacity: 0,
          duration: 0.5,
          ease: "power4.in",
        }, "-=0.2");
    }
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-[110] flex h-16 lg:h-[88px] items-center border-b border-transparent bg-transparent transition-colors duration-300"
      >
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo Section */}
          <Link href="/" className="relative z-[60] flex items-center gap-3 text-white">
            <span ref={logoBoxRef} className="origin-left transition-transform">
              <HimatLogoIcon className="h-9 w-9" />
            </span>
            <span
              ref={logoTextRef}
              className="origin-left font-display text-base font-black uppercase tracking-[-0.06em] sm:text-lg"
            >
              Himat Textile
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {translatedLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="mono-label text-[10px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Call to Action Button & Language Switcher */}
          <div className="hidden items-center gap-4 lg:flex">
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="border border-white/20 hover:border-white px-3 py-1.5 text-[9px] font-mono uppercase tracking-[.12em] text-white/70 hover:text-white transition-colors"
            >
              {language === "en" ? "हिंदी" : "EN"}
            </button>
            <Link
              href="/#enquiry"
              className="flex items-center gap-2 border border-white bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[.18em] text-black transition-transform hover:-translate-y-0.5"
            >
              {t("btn_start_enquiry")} <MoveUpRight size={14} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="relative z-[60] grid h-10 w-10 place-items-center border border-white/30 text-white hover:border-white transition-colors lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[100] flex -translate-y-full flex-col justify-between bg-[#0d0d0d] px-6 pb-12 pt-28 opacity-0 lg:hidden"
      >
        <div ref={mobileLinksRef} className="flex flex-col gap-6 pt-8">
          {translatedLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="mobile-link-item block font-display text-4xl font-black uppercase tracking-[-.05em] text-white hover:text-white/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-link-item flex flex-col gap-4 mt-4">
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="w-fit border border-white/30 bg-transparent px-4 py-2.5 text-xs font-bold uppercase tracking-[.18em] text-white"
            >
              {language === "en" ? "HINDI / हिंदी" : "ENGLISH / EN"}
            </button>
            <Link
              href="/#enquiry"
              className="inline-flex w-fit items-center gap-2 border border-white bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-[.18em] text-black"
            >
              {t("btn_start_enquiry")} <MoveUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="mono-label text-[10px] tracking-wider text-white/40 uppercase">
            Himat Textile — {t("hero_tagline")}
          </p>
        </div>
      </div>
    </>
  );
}

