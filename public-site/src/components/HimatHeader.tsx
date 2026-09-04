"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, MoveUpRight, Phone, Mail, X } from "lucide-react";
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
    { label: t("nav_reviews"), href: "/reviews" },
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
            : "h-[80px] bg-[#F3EEE5]/90 backdrop-blur-md border-b border-[rgba(23,26,29,0.08)] text-[#171A1D]"
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

          {/* Mobile Quick Action & Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white shadow-xs transition-transform active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
            </a>

            <button
              className={`relative z-[120] grid h-9 w-9 place-items-center rounded-full border transition-all active:scale-95 ${
                menuOpen
                  ? "border-white/20 bg-white/10 text-[#FFFAF4]"
                  : "border-[rgba(23,26,29,0.18)] bg-[#FFFAF4]/90 text-[#171A1D]"
              }`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Warm Charcoal Aesthetic & Scrollable Safety */}
      <div 
        ref={mobileMenuRef} 
        className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#171A1D] px-6 pb-8 pt-24 lg:hidden overflow-y-auto transition-all duration-500 ease-in-out ${
          menuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4 pt-2">
          <div className={`mb-2 flex items-center justify-between border-b border-white/15 pb-4 transition-all duration-500 delay-75 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}>
            <HimatLogo light={false} stacked={false} size="md" />
            <button 
              onClick={() => setLanguage(language === "en" ? "hi" : "en")} 
              className="border border-white/20 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.1em] text-[#FFFAF4] rounded-full"
            >
              {language === "en" ? "हिंदी" : "EN"}
            </button>
          </div>
          {translatedLinks.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.label} 
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-baseline justify-between border-b border-white/10 pb-3 font-serif text-xl sm:text-2xl font-normal tracking-tight transition-all duration-500 hover:text-[#E8907B] ${
                  isActive ? "text-[#FE6311]" : "text-[#FFFAF4]"
                }`}
                style={{ 
                  transitionDelay: `${100 + index * 50}ms`,
                  transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                  opacity: menuOpen ? 1 : 0
                }}
              >
                <span>{link.label}</span>
                <span className="font-mono text-[10px] text-[#FE6311]">0{index + 1}</span>
              </Link>
            );
          })}
          
          <div 
            className="mt-3 flex flex-col gap-2.5 transition-all duration-500"
            style={{ 
              transitionDelay: "380ms",
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              opacity: menuOpen ? 1 : 0
            }}
          >
            <Link 
              href="/#enquiry" 
              onClick={() => setMenuOpen(false)}
              className="button button-rust inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-[.14em] w-full text-center"
            >
              {t("btn_start_enquiry")} <MoveUpRight size={15} />
            </Link>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] px-5 py-3.5 text-xs font-bold uppercase tracking-[.14em] text-white rounded-full w-full"
            >
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Quick Chat
            </a>
          </div>

          {/* Quick Contact Links in Mobile Drawer */}
          <div 
            className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-2 font-mono text-xs text-[#FFFAF4]/80 transition-all duration-500"
            style={{ 
              transitionDelay: "430ms",
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              opacity: menuOpen ? 1 : 0
            }}
          >
            <a href="tel:+919873938095" className="flex items-center gap-2 hover:text-[#FE6311]">
              <Phone size={13} className="text-[#FE6311]" />
              <span>+91 98739 38095</span>
            </a>
            <a href="mailto:himattextile@gmail.com" className="flex items-center gap-2 hover:text-[#FE6311]">
              <Mail size={13} className="text-[#FE6311]" />
              <span>himattextile@gmail.com</span>
            </a>
          </div>
        </div>
        <p 
          className="border-t border-white/15 pt-4 font-mono text-[9px] uppercase tracking-wider text-[#FFFAF4]/60 transition-all duration-500 mt-4"
          style={{ 
            transitionDelay: "480ms",
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




