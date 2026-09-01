"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, MoveUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { HimatLogoIcon } from "@/components/HimatLogo";
import { useLanguage } from "@/lib/LanguageContext";

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
    { label: t("nav_capabilities"), href: "/capabilities" },
    { label: t("nav_network"), href: "/network" },
    { label: t("nav_white_labeling"), href: "/white-labeling" },
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
      const nextScrolled = window.scrollY > 40;
      setScrolled(nextScrolled);
      gsap.to(headerRef.current, {
        height: nextScrolled ? 68 : 92,
        backgroundColor: nextScrolled ? "rgba(246, 243, 237, 0.94)" : "rgba(10, 31, 43, 0)",
        color: nextScrolled ? "#1A1A1A" : "#FFFFFF",
        backdropFilter: nextScrolled ? "blur(18px)" : "blur(0px)",
        borderBottomColor: nextScrolled ? "rgba(232, 226, 216, 0.5)" : "rgba(246, 243, 237, 0)",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Scroll lock when mobile menu is open
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const foregroundClass = menuOpen || !scrolled ? "text-[#FFFFFF]" : "text-[#1A1A1A]";
  const mutedClass = menuOpen || !scrolled ? "text-[#FFFFFF]/75 hover:text-[#C89A3D]" : "text-[#1A1A1A]/75 hover:text-[#C89A3D]";

  return (
    <>
      <header ref={headerRef} className={`fixed inset-x-0 top-0 z-[110] flex h-[92px] items-center border-b border-transparent ${foregroundClass}`}>
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className={`relative z-[60] flex items-center gap-3 ${foregroundClass}`} aria-label="Himat Textile home">
            <span className="grid h-10 w-10 place-items-center border border-[#C89A3D]/60 bg-[#0A1F2B]/10 rounded-md">
              <HimatLogoIcon className="h-8 w-8" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[15px] font-bold uppercase tracking-[-0.06em] sm:text-lg">Himat Textile</span>
              <span className={`mt-1 block font-mono text-[8px] uppercase tracking-[0.18em] text-[#C89A3D]`}>Garment Guide / Ahmedabad</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
            {translatedLinks.map((link) => {
              const isActive = pathname === link.href;
              const activeColorClass = isActive 
                ? "text-[#C89A3D] font-extrabold" 
                : (menuOpen || !scrolled ? "text-[#FFFFFF]/75 hover:text-[#C89A3D]" : "text-[#1A1A1A]/75 hover:text-[#C89A3D]");
              return (
                <Link key={link.label} href={link.href} className={`mono-label text-[10px] uppercase tracking-[0.18em] transition-colors ${activeColorClass}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 border px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors rounded-md ${scrolled ? "border-[#1A1A1A]/20 hover:border-[#C89A3D]" : "border-[#FFFFFF]/30 hover:border-[#C89A3D]"}`}>
              <MessageCircle size={14} className="text-[#C89A3D]" /> WhatsApp
            </a>
            <button onClick={() => setLanguage(language === "en" ? "hi" : "en")} className={`border px-3 py-2 text-[9px] font-mono uppercase tracking-[.12em] transition-colors rounded-md ${scrolled ? "border-[#1A1A1A]/20 hover:border-[#C89A3D]" : "border-[#FFFFFF]/30 hover:border-[#C89A3D]"}`}>
              {language === "en" ? "हिंदी" : "EN"}
            </button>
            <Link href="/#enquiry" className="gold-button flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-[.16em] transition-transform hover:-translate-y-0.5 rounded-md">
              {t("btn_start_enquiry")} <MoveUpRight size={14} />
            </Link>
          </div>

          <button className={`relative z-[60] grid h-10 w-10 place-items-center border transition-colors lg:hidden rounded-md ${menuOpen || !scrolled ? "border-[#FFFFFF]/35 text-[#FFFFFF] hover:border-[#C89A3D]" : "border-[#1A1A1A]/25 text-[#1A1A1A] hover:border-[#C89A3D]"}`} onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div 
        ref={mobileMenuRef} 
        className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#0A1F2B] px-6 pb-10 pt-28 lg:hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-5 pt-4">
          <div className={`mb-3 flex items-center gap-3 border-b border-white/10 pb-6 transition-all duration-500 delay-75 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}>
            <HimatLogoIcon className="h-12 w-12" />
            <div>
              <p className="font-display text-xl uppercase text-[#FFFFFF]">Himat Textile</p>
              <p className="mono-label mt-1 text-[9px] text-[#C89A3D]">Garment Guide / Ahmedabad</p>
            </div>
          </div>
          {translatedLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.label} 
                href={link.href} 
                className={`flex items-baseline justify-between border-b border-white/10 pb-4 font-display text-3xl font-bold uppercase tracking-[-.05em] transition-all duration-500 hover:text-[#C89A3D] ${
                  isActive ? "text-[#C89A3D]" : "text-[#FFFFFF]"
                }`}
                style={{ 
                  transitionDelay: `${100 + index * 50}ms`,
                  transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                  opacity: menuOpen ? 1 : 0
                }}
              >
                <span>{link.label}</span>
                <span className="font-mono text-[10px] text-[#C89A3D]">0{index + 1}</span>
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
            <Link href="/#enquiry" className="gold-button inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-[.16em] rounded-md">
              {t("btn_start_enquiry")} <MoveUpRight size={16} />
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[#C89A3D] px-5 py-3.5 text-xs font-bold uppercase tracking-[.16em] text-[#FFFFFF] rounded-md">
              <MessageCircle size={16} className="text-[#C89A3D]" /> WhatsApp
            </a>
          </div>
          <button 
            onClick={() => setLanguage(language === "en" ? "hi" : "en")} 
            className="w-fit border border-white/25 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.18em] text-[#FFFFFF] rounded-md transition-all duration-500"
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
          className="border-t border-white/10 pt-6 font-mono text-[9px] uppercase tracking-wider text-white/45 transition-all duration-500"
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
