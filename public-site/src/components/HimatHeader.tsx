"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, MoveUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import HimatLogo from "@/components/HimatLogo";
import { useLanguage } from "@/lib/LanguageContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const WHATSAPP_URL = "https://wa.me/919873938095";

export function HimatHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  const translatedLinks = [
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_garments"), href: "/catalog" },
    { label: t("nav_white_labeling"), href: "/white-labeling" },
    { label: t("nav_network"), href: "/network" },
    { label: t("nav_guide"), href: "/guide" },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 150);
    };

    const handleLinkClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a");
      const href = anchor?.getAttribute("href");
      const hash = href?.split("#")[1];
      if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    window.addEventListener("click", handleLinkClick);
    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
      window.removeEventListener("click", handleLinkClick);
    };
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-[110] flex items-center transition-all duration-300 ${
          scrolled
            ? "h-[68px] bg-[#F3EEE5]/96 backdrop-blur-md border-b border-[rgba(23,26,29,0.12)] shadow-[0_4px_20px_-2px_rgba(23,26,29,0.06)] text-[#171A1D]"
            : "h-[84px] bg-transparent border-b border-transparent text-[#171A1D]"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Brand Logo with Crisp Charcoal & Rust Styling (Blends with paper) */}
          <Link href="/" className="relative z-[60] py-1 transition-transform hover:scale-105" aria-label="Himat Textile home">
            <HimatLogo light={true} stacked={false} size="sm" />
          </Link>

          {/* Desktop Nav with Refined Atelier Typography & Rust Underline */}
          <nav className="hidden items-center gap-7 xl:gap-8 lg:flex" aria-label="Primary navigation">
            {translatedLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-[11px] font-extrabold uppercase tracking-[0.12em] transition-colors py-1 ${
                    isActive ? "text-[#FE6311]" : "text-[#171A1D]/80 hover:text-[#FE6311]"
                  } after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-[#FE6311] ${
                    isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                  } after:transition-transform after:duration-200 after:origin-right hover:after:origin-left`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* WhatsApp Circular FAB */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
              className="group relative grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white shadow-xs transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] hover:shadow-[0_6px_18px_rgba(37,211,102,0.4)]"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
            </a>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="rounded-full border border-[rgba(23,26,29,0.18)] bg-[#FFFAF4]/80 backdrop-blur-xs px-3.5 py-1.5 text-[10.5px] font-mono font-extrabold uppercase tracking-[0.08em] text-[#171A1D] hover:border-[#FE6311] hover:text-[#FE6311] transition-all shadow-xs"
            >
              {language === "en" ? "हिंदी" : "EN"}
            </button>

            {/* Start Enquiry CTA in Tactile Rust Pill Button */}
            <Link
              href="/#enquiry"
              className="button button-rust inline-flex items-center gap-2 px-5 py-2.5 text-[10.5px] tracking-[0.12em] shadow-xs"
            >
              <span>{t("btn_start_enquiry")}</span>
              <MoveUpRight size={13} strokeWidth={2.5} />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            className="relative z-[60] grid h-9 w-9 place-items-center rounded-full border border-[rgba(23,26,29,0.18)] bg-[#FFFAF4]/80 backdrop-blur-xs text-[#171A1D] transition-colors lg:hidden hover:border-[#FE6311] hover:text-[#FE6311]"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer with Warm Charcoal Aesthetic */}
      <div 
        ref={mobileMenuRef} 
        className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#171A1D] px-6 pb-10 pt-28 lg:hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-5 pt-4">
          <div className={`mb-3 flex items-center gap-3 border-b border-white/15 pb-6 transition-all duration-500 delay-75 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}>
            <HimatLogo light={false} stacked={false} size="lg" />
          </div>
          {translatedLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.label} 
                href={link.href} 
                className={`flex items-baseline justify-between border-b border-white/10 pb-4 font-serif text-2xl font-normal tracking-tight transition-all duration-500 hover:text-[#E8907B] ${
                  isActive ? "text-[#E8907B]" : "text-[#FFFAF4]"
                }`}
                style={{ 
                  transitionDelay: `${100 + index * 50}ms`,
                  transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                  opacity: menuOpen ? 1 : 0
                }}
              >
                <span>{link.label}</span>
                <span className="font-mono text-[10px] text-[#E8907B]">0{index + 1}</span>
              </Link>
            );
          })}
          <div 
            className="mt-3 flex flex-wrap gap-3 transition-all duration-500"
            style={{ 
              transitionDelay: "400ms",
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              opacity: menuOpen ? 1 : 0
            }}
          >
            <Link href="/#enquiry" className="button button-rust inline-flex items-center gap-2 px-6 py-3 text-xs tracking-[.14em]">
              {t("btn_start_enquiry")} <MoveUpRight size={15} />
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[.14em] text-[#FFFAF4] rounded-full">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp
            </a>
          </div>
          <button 
            onClick={() => setLanguage(language === "en" ? "hi" : "en")} 
            className="w-fit border border-[rgba(255,250,244,0.3)] px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[.14em] text-[#FFFAF4] rounded-full transition-all duration-500 hover:border-[#E8907B] hover:text-[#E8907B]"
            style={{ 
              transitionDelay: "450ms",
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              opacity: menuOpen ? 1 : 0
            }}
          >
            {language === "en" ? "HINDI / हिंदी" : "ENGLISH / EN"}
          </button>
        </div>
        <p 
          className="border-t border-white/15 pt-6 font-mono text-[9px] uppercase tracking-wider text-[#FFFAF4]/60 transition-all duration-500"
          style={{ 
            transitionDelay: "500ms",
            transform: menuOpen ? "translateY(0)" : "translateY(8px)",
            opacity: menuOpen ? 1 : 0
          }}
        >
          Himat Textile — {t("hero_tagline")}
        </p>
      </div>
    </>
  );
}




