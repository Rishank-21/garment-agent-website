"use client";

import React from "react";
import { ArrowUpRight, Instagram, Linkedin, Mail, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import HimatLogo from "@/components/HimatLogo";
import { useLanguage } from "@/lib/LanguageContext";

export function HimatFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-black/30 bg-[#141414] text-[#FAF8F5]">
      {/* Brand Tagline Header Banner - Light ivory bg matching site */}
      <div className="border-b border-[#DEDAD2] bg-[#FAF9F6] py-8 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="mono-label text-[9px] font-bold tracking-[0.26em] text-[#FE6311] uppercase block">
              HIMAT TEXTILE SOURCING ECOSYSTEM
            </span>
            <p className="font-serif-display text-lg sm:text-xl font-bold uppercase tracking-[0.14em] text-[#252525]">
              BUILT ON TRUST. DRIVEN BY FASHION. READY FOR BUSINESS.
            </p>
          </div>
          <Link
            href="/#enquiry"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-xs shadow-sm bg-[#252525] text-[#FAF9F6] hover:bg-[#FE6311] hover:text-white transition-all"
          >
            START SOURCING <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-14 sm:px-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.1fr] lg:gap-12 lg:px-12 lg:py-16">
        {/* Brand Column */}
        <div className="space-y-5">
          <div className="flex items-start">
            <HimatLogo light={false} stacked={false} size="lg" />
          </div>
          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-[#FAF8F5]/80 font-sans">
            Your trusted garment guide and sourcing partner connecting businesses with premier manufacturers, wholesale collections, white labeling, and global apparel exports from Ahmedabad.
          </p>
          <div className="pt-2">
            <span className="mono-label text-[8.5px] font-bold tracking-[0.22em] text-[#FFB51A] bg-white/5 border border-white/15 px-3.5 py-1.5 rounded-xs inline-block">
              AHMEDABAD SOURCING • ESTD. OVER 2 GENERATIONS
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <p className="mono-label mb-5 text-[10px] text-[#F5B014] uppercase tracking-[0.22em] font-bold">
            {t("foot_quick_links")}
          </p>
          <div className="flex flex-col space-y-3 text-xs sm:text-sm font-medium text-[#FAF8F5]/85">
            <Link href="/about" className="hover:text-[#F5B014] transition-colors">{t("nav_about")}</Link>
            <Link href="/catalog" className="hover:text-[#F5B014] transition-colors">{t("nav_garments")}</Link>
            <Link href="/capabilities" className="hover:text-[#F5B014] transition-colors">{t("nav_capabilities")}</Link>
            <Link href="/network" className="hover:text-[#F5B014] transition-colors">{t("nav_network")}</Link>
            <Link href="/white-labeling" className="hover:text-[#F5B014] transition-colors">{t("nav_white_labeling")}</Link>
            <Link href="/guide" className="hover:text-[#F5B014] transition-colors">{t("nav_guide")}</Link>
            <Link href="/#enquiry" className="hover:text-[#F5B014] transition-colors">{t("btn_start_enquiry")}</Link>
          </div>
        </div>

        {/* Collections Column */}
        <div>
          <p className="mono-label mb-5 text-[10px] text-[#F5B014] uppercase tracking-[0.22em] font-bold">
            {t("foot_collections") || "COLLECTIONS"}
          </p>
          <div className="flex flex-col space-y-3 text-xs sm:text-sm font-medium text-[#FAF8F5]/85">
            <Link href="/catalog?category=mens-wear" className="hover:text-[#F5B014] transition-colors">Men's Wear</Link>
            <Link href="/catalog?category=womens-wear" className="hover:text-[#F5B014] transition-colors">Women's Wear</Link>
            <Link href="/catalog?category=kids-wear" className="hover:text-[#F5B014] transition-colors">Kids Wear</Link>
            <Link href="/catalog?category=ethnic-wear" className="hover:text-[#F5B014] transition-colors">Ethnic Wear</Link>
            <Link href="/catalog?category=fabrics" className="hover:text-[#F5B014] transition-colors">Fabric Sourcing</Link>
            <Link href="/catalog?category=bedsheets" className="hover:text-[#F5B014] transition-colors">Bedsheets & Home</Link>
            <Link href="/white-labeling" className="hover:text-[#F5B014] transition-colors">White Labeling</Link>
          </div>
        </div>

        {/* Contact & Location Column */}
        <div>
          <p className="mono-label mb-5 text-[10px] text-[#F5B014] uppercase tracking-[0.22em] font-bold">
            {t("foot_contact")}
          </p>
          <div className="flex flex-col space-y-3.5 text-xs sm:text-sm">
            <div className="text-xs text-[#FAF8F5]/85 leading-relaxed bg-white/5 border border-white/15 p-3.5 rounded-xs">
              <span className="font-mono text-[9px] uppercase text-[#FFB51A] block mb-1 font-bold">Ahmedabad Sourcing HQ</span>
              {t("foot_address")}
            </div>
            
            <a className="flex items-center gap-2.5 transition-colors hover:text-[#F5B014] text-[#FAF8F5]/90" href="mailto:himmattextile@gmail.com">
              <Mail size={15} className="text-[#F5B014] shrink-0" /> himmattextile@gmail.com
            </a>
            
            <a className="flex items-center gap-2.5 transition-colors hover:text-[#F5B014] text-[#FAF8F5]/90" href="tel:+919873938095">
              <Phone size={15} className="text-[#F5B014] shrink-0" /> +91 98739 38095
            </a>

            <a className="flex items-center gap-2.5 transition-colors hover:text-[#25D366] text-[#25D366] font-bold" href="https://wa.me/919873938095" target="_blank" rel="noreferrer">
              <MessageSquare size={15} className="shrink-0" /> {t("btn_whatsapp_us")}
            </a>

            <div className="flex gap-3 pt-3">
              <a
                aria-label="LinkedIn contact"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center border border-white/20 text-[#FAF8F5] rounded-xs transition-colors hover:border-[#F5B014] hover:bg-[#F5B014] hover:text-[#181511]"
              >
                <Linkedin size={15} />
              </a>
              <a
                aria-label="Instagram contact"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center border border-white/20 text-[#FAF8F5] rounded-xs transition-colors hover:border-[#F5B014] hover:bg-[#F5B014] hover:text-[#181511]"
              >
                <Instagram size={15} />
              </a>
              <Link
                aria-label="Start an inquiry"
                href="/#enquiry"
                className="grid h-9 w-9 place-items-center border border-white/20 text-[#FAF8F5] rounded-xs transition-colors hover:border-[#F5B014] hover:bg-[#F5B014] hover:text-[#181511]"
              >
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 bg-[#0E0E0E] px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left text-[9.5px] uppercase tracking-[0.14em] text-[#FAF8F5]/60">
          <span>© {new Date().getFullYear()} HIMAT TEXTILE. {t("foot_rights")}</span>
          <span>Ahmedabad, India · Sourcing · Wholesale · White Labeling · Apparel Exports</span>
        </div>
      </div>
    </footer>
  );
}





