"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, MoveUpRight, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import HimatLogo from "@/components/HimatLogo";
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
      const nextScrolled = window.scrollY > 20;
      setScrolled(nextScrolled);
      gsap.to(headerRef.current, {
        height: nextScrolled ? 84 : 102,
        backgroundColor: nextScrolled ? "rgba(250, 248, 245, 0.98)" : "rgba(250, 248, 245, 0.92)",
        backdropFilter: "blur(20px)",
        borderBottomColor: nextScrolled ? "#E2DDD5" : "rgba(226, 221, 213, 0.7)",
        duration: 0.35,
        ease: "power2.out",
      });
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
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-[110] flex h-[102px] items-center border-b border-[#DEDAD2]/80 bg-[#FAF9F6]/95 backdrop-blur-md transition-all text-[#252525] shadow-xs">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Prominent Eye-Catching Logo with Name Underneath */}
          <Link href="/" className="relative z-[60] py-1 transition-transform hover:scale-105" aria-label="Himat Textile home">
            <HimatLogo light={true} stacked={false} size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 xl:gap-8 lg:flex" aria-label="Primary navigation">
            {translatedLinks.map((link) => {
              const isActive = pathname === link.href;
              const activeColorClass = isActive 
                ? "text-[#FE6311] font-extrabold border-b-2 border-[#FE6311] pb-1" 
                : "text-[#252525]/80 hover:text-[#FE6311] transition-colors pb-1";
              return (
                <Link key={link.label} href={link.href} className={`mono-label text-[10.5px] uppercase tracking-[0.18em] ${activeColorClass}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#DEDAD2] bg-[#FFFFFF] px-3.5 py-2 text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#252525] hover:border-[#FE6311] hover:shadow-xs transition-all rounded-xs shadow-xs"
            >
              <MessageCircle size={14} className="text-[#25D366]" /> WhatsApp
            </a>
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="border border-[#DEDAD2] bg-[#FFFFFF] px-3.5 py-2 text-[9.5px] font-mono font-bold uppercase tracking-[.14em] text-[#252525] hover:border-[#FE6311] hover:text-[#FE6311] transition-colors rounded-xs shadow-xs"
            >
              {language === "en" ? "हिंदी" : "EN"}
            </button>
            <Link
              href="/#enquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[10.5px] font-black uppercase tracking-[.18em] transition-all hover:-translate-y-0.5 rounded-xs shadow-sm text-[#FAF9F6] bg-[#252525] border border-[#252525] hover:bg-[#FE6311] hover:border-[#FE6311]"
            >
              {t("btn_start_enquiry")} <MoveUpRight size={13} />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            className="relative z-[60] grid h-11 w-11 place-items-center border border-[#DEDAD2] bg-[#FFFFFF] text-[#252525] transition-colors lg:hidden rounded-xs hover:border-[#FE6311] hover:text-[#FE6311]"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer with Warm Charcoal Aesthetic */}
      <div 
        ref={mobileMenuRef} 
        className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#141414] px-6 pb-10 pt-28 lg:hidden transition-all duration-500 ease-in-out ${
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
                className={`flex items-baseline justify-between border-b border-white/10 pb-4 font-serif-display text-2xl font-bold uppercase tracking-tight transition-all duration-500 hover:text-[#FFB51A] ${
                  isActive ? "text-[#FFB51A]" : "text-[#FAF9F6]"
                }`}
                style={{ 
                  transitionDelay: `${100 + index * 50}ms`,
                  transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                  opacity: menuOpen ? 1 : 0
                }}
              >
                <span>{link.label}</span>
                <span className="font-mono text-[10px] text-[#FFB51A]">0{index + 1}</span>
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
            <Link href="/#enquiry" className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-black uppercase tracking-[.16em] rounded-xs text-[#252525] bg-[#FFB51A] hover:bg-[#FE6311] hover:text-white transition-colors">
              {t("btn_start_enquiry")} <MoveUpRight size={16} />
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-5 py-3.5 text-xs font-bold uppercase tracking-[.16em] text-[#FAF8F5] rounded-xs">
              <MessageCircle size={16} className="text-[#25D366]" /> WhatsApp
            </a>
          </div>
          <button 
            onClick={() => setLanguage(language === "en" ? "hi" : "en")} 
            className="w-fit border border-[#FFB51A]/60 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.18em] text-[#FAF9F6] rounded-xs transition-all duration-500 hover:border-white"
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
          className="border-t border-white/15 pt-6 font-mono text-[9px] uppercase tracking-wider text-[#FAF8F5]/60 transition-all duration-500"
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




