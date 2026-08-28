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
        backgroundColor: nextScrolled ? "rgba(247, 242, 233, 0.94)" : "rgba(21, 22, 19, 0)",
        color: nextScrolled ? "#151613" : "#f7f2e9",
        backdropFilter: nextScrolled ? "blur(18px)" : "blur(0px)",
        borderBottomColor: nextScrolled ? "rgba(21, 22, 19, 0.12)" : "rgba(247, 242, 233, 0)",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    gsap.killTweensOf([mobileMenuRef.current, ".mobile-link-item"]);
    if (menuOpen) {
      gsap.timeline()
        .to(mobileMenuRef.current, { y: "0%", opacity: 1, duration: 0.55, ease: "power4.out" })
        .fromTo(".mobile-link-item", { y: 34, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.42, ease: "power3.out" }, "-=0.25");
    } else {
      gsap.timeline()
        .to(".mobile-link-item", { y: -16, opacity: 0, stagger: 0.03, duration: 0.2, ease: "power3.in" })
        .to(mobileMenuRef.current, { y: "-100%", opacity: 0, duration: 0.42, ease: "power4.in" }, "-=0.12");
    }
  }, [menuOpen]);

  const foregroundClass = scrolled ? "text-[#151613]" : "text-[#f7f2e9]";
  const mutedClass = scrolled ? "text-[#151613]/65 hover:text-[#f05a24]" : "text-[#f7f2e9]/78 hover:text-[#ffb800]";

  return (
    <>
      <header ref={headerRef} className={`fixed inset-x-0 top-0 z-[110] flex h-[92px] items-center border-b border-transparent ${foregroundClass}`}>
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className={`relative z-[60] flex items-center gap-3 ${foregroundClass}`} aria-label="Himat Textile home">
            <span className="grid h-10 w-10 place-items-center border border-[#f05a24]/60 bg-[#151613]/15">
              <HimatLogoIcon className="h-8 w-8" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[15px] font-black uppercase tracking-[-0.06em] sm:text-lg">Himat Textile</span>
              <span className={`mt-1 block font-mono text-[8px] uppercase tracking-[0.18em] ${scrolled ? "text-[#f05a24]" : "text-[#ffb800]"}`}>Garment Guide / Ahmedabad</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {translatedLinks.map((link) => (
              <Link key={link.label} href={link.href} className={`mono-label text-[10px] uppercase tracking-[0.18em] transition-colors ${mutedClass}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 border px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] transition-colors ${scrolled ? "border-[#151613]/20 hover:border-[#f05a24]" : "border-[#f7f2e9]/30 hover:border-[#ffb800]"}`}>
              <MessageCircle size={14} className={scrolled ? "text-[#f05a24]" : "text-[#ffb800]"} /> WhatsApp
            </a>
            <button onClick={() => setLanguage(language === "en" ? "hi" : "en")} className={`border px-3 py-2 text-[9px] font-mono uppercase tracking-[.12em] transition-colors ${scrolled ? "border-[#151613]/20 hover:border-[#f05a24]" : "border-[#f7f2e9]/30 hover:border-[#ffb800]"}`}>
              {language === "en" ? "हिंदी" : "EN"}
            </button>
            <Link href="/#enquiry" className="gold-button flex items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-[.16em] transition-transform hover:-translate-y-0.5">
              {t("btn_start_enquiry")} <MoveUpRight size={14} />
            </Link>
          </div>

          <button className={`relative z-[60] grid h-10 w-10 place-items-center border transition-colors lg:hidden ${scrolled ? "border-[#151613]/25 hover:border-[#f05a24]" : "border-[#f7f2e9]/35 hover:border-[#ffb800]"}`} onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div ref={mobileMenuRef} className="fixed inset-0 z-[100] flex -translate-y-full flex-col justify-between bg-[#151613] px-6 pb-10 pt-28 opacity-0 lg:hidden">
        <div className="flex flex-col gap-5 pt-8">
          <div className="mobile-link-item mb-3 flex items-center gap-3 border-b border-white/10 pb-6">
            <HimatLogoIcon className="h-12 w-12" />
            <div><p className="font-display text-xl uppercase text-[#f7f2e9]">Himat Textile</p><p className="mono-label mt-1 text-[9px] text-[#ffb800]">Garment Guide / Ahmedabad</p></div>
          </div>
          {translatedLinks.map((link, index) => (
            <Link key={link.label} href={link.href} className="mobile-link-item flex items-baseline justify-between border-b border-white/10 pb-4 font-display text-3xl font-black uppercase tracking-[-.05em] text-[#f7f2e9] transition-colors hover:text-[#ffb800]">
              <span>{link.label}</span><span className="font-mono text-[10px] text-[#f05a24]">0{index + 1}</span>
            </Link>
          ))}
          <div className="mobile-link-item mt-3 flex flex-wrap gap-3">
            <Link href="/#enquiry" className="gold-button inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-[.16em]">{t("btn_start_enquiry")} <MoveUpRight size={16} /></Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[#f05a24] px-5 py-3.5 text-xs font-bold uppercase tracking-[.16em] text-[#f7f2e9]"><MessageCircle size={16} className="text-[#f05a24]" /> WhatsApp</a>
          </div>
          <button onClick={() => setLanguage(language === "en" ? "hi" : "en")} className="mobile-link-item w-fit border border-white/25 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.18em] text-[#f7f2e9]">{language === "en" ? "HINDI / हिंदी" : "ENGLISH / EN"}</button>
        </div>
        <p className="border-t border-white/10 pt-6 font-mono text-[9px] uppercase tracking-wider text-white/45">Himat Textile — {t("hero_tagline")}</p>
      </div>
    </>
  );
}
