"use client";

import React from "react";
import { ArrowUpRight, Instagram, Linkedin, Mail, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import HimatLogo from "@/components/HimatLogo";
import { useLanguage } from "@/lib/LanguageContext";

export function HimatFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#E8E2D8]/10 bg-[#0A1F2B] text-[#FFFFFF]">
      <div className="grid max-w-[1600px] grid-cols-1 gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] lg:px-12 lg:py-20">
        <div>
          <div className="mb-4">
            <HimatLogo light={false} className="h-20 w-auto -ml-3" />
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#FFFFFF]/70">
            {t("foot_desc")}
          </p>
        </div>
        <div>
          <p className="mono-label mb-5 text-[10px] text-[#C89A3D] uppercase tracking-widest">{t("foot_quick_links")}</p>
          <div className="grid gap-3 text-sm font-semibold text-[#FFFFFF]/80">
            <Link href="/about" className="hover:text-[#C89A3D] transition-colors">{t("nav_about")}</Link>
            <Link href="/catalog" className="hover:text-[#C89A3D] transition-colors">{t("nav_garments")}</Link>
            <Link href="/capabilities" className="hover:text-[#C89A3D] transition-colors">{t("nav_capabilities")}</Link>
            <Link href="/network" className="hover:text-[#C89A3D] transition-colors">{t("nav_network")}</Link>
            <Link href="/white-labeling" className="hover:text-[#C89A3D] transition-colors">{t("nav_white_labeling")}</Link>
            <Link href="/guide" className="hover:text-[#C89A3D] transition-colors">{t("nav_guide")}</Link>
            <Link href="/#enquiry" className="hover:text-[#C89A3D] transition-colors">{t("btn_start_enquiry")}</Link>
          </div>
        </div>
        <div>
          <p className="mono-label mb-5 text-[10px] text-[#C89A3D] uppercase tracking-widest">{t("foot_collections") || "COLLECTIONS"}</p>
          <div className="grid gap-3 text-sm font-semibold text-[#FFFFFF]/80">
            <Link href="/catalog?category=mens%20wear" className="hover:text-[#C89A3D] transition-colors">Men's Wear</Link>
            <Link href="/catalog?category=womens%20wear" className="hover:text-[#C89A3D] transition-colors">Women's Wear</Link>
            <Link href="/catalog?category=kids%20wear" className="hover:text-[#C89A3D] transition-colors">Kids Wear</Link>
            <Link href="/catalog?category=fabrics" className="hover:text-[#C89A3D] transition-colors">Fabric Sourcing</Link>
            <Link href="/catalog?category=bedsheets" className="hover:text-[#C89A3D] transition-colors">Bedsheets</Link>
            <Link href="/white-labeling" className="hover:text-[#C89A3D] transition-colors">White Labeling</Link>
          </div>
        </div>
        <div>
          <p className="mono-label mb-5 text-[10px] text-[#C89A3D] uppercase tracking-widest">{t("foot_contact")}</p>
          <div className="grid gap-3 text-sm font-semibold">
            <div className="text-xs text-[#FFFFFF]/75 mb-2 leading-relaxed">
              <span className="font-mono text-[9px] uppercase text-[#FFFFFF]/50 block mb-1">Ahmedabad Office</span>
              {t("foot_address")}
            </div>
            
            <a className="flex items-center gap-2 transition-colors hover:text-[#C89A3D] text-[#FFFFFF]/80" href="mailto:himmattextile@gmail.com">
              <Mail size={15} /> himmattextile@gmail.com
            </a>
            
            <a className="flex items-center gap-2 transition-colors hover:text-[#C89A3D] text-[#FFFFFF]/80" href="tel:+919873938095">
              <Phone size={15} /> +91 98739 38095
            </a>

            <a className="flex items-center gap-2 transition-colors hover:text-[#C89A3D] text-[#FFFFFF]/80" href="https://wa.me/919873938095" target="_blank" rel="noreferrer">
              <MessageSquare size={15} /> {t("btn_whatsapp_us")}
            </a>

            <div className="flex gap-3 pt-4">
              <a
                aria-label="LinkedIn contact"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center border border-white/20 text-white rounded-md transition-colors hover:border-[#C89A3D] hover:bg-[#C89A3D] hover:text-[#0A1F2B]"
              >
                <Linkedin size={15} />
              </a>
              <a
                aria-label="Instagram contact"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center border border-white/20 text-white rounded-md transition-colors hover:border-[#C89A3D] hover:bg-[#C89A3D] hover:text-[#0A1F2B]"
              >
                <Instagram size={15} />
              </a>
              <Link
                aria-label="Start an inquiry"
                href="/#enquiry"
                className="grid h-9 w-9 place-items-center border border-white/20 text-white rounded-md transition-colors hover:border-[#C89A3D] hover:bg-[#C89A3D] hover:text-[#0A1F2B]"
              >
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 border-t border-white/10 px-5 py-5 text-[10px] uppercase tracking-[.16em] text-white/40 sm:flex-row sm:px-8 lg:px-12">
        <span>© {new Date().getFullYear()} HIMAT TEXTILE. {t("foot_rights")}</span>
        <span>Ahmedabad, India · Sourcing · Wholesale · White Labeling · Export</span>
      </div>
    </footer>
  );
}

