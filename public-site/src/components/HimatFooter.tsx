"use client";

import { ArrowUpRight, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function HimatFooter() {
  return (
    <footer className="border-t border-black/15 bg-[#d9d9d5] text-black">
      <div className="grid max-w-[1600px] grid-cols-1 gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.45fr_.75fr_.9fr] lg:px-12 lg:py-20">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-black text-xs font-black text-white">HT</span>
            <span className="font-display text-2xl font-black uppercase tracking-[-0.07em]">Himat Textile</span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-black/65">
            A garment manufacturing and wholesale partner for businesses building their next collection, sourcing plan, or private-label programme.
          </p>
        </div>
        <div>
          <p className="mono-label mb-5 text-[10px] text-black/50">Explore</p>
          <div className="grid gap-3 text-sm font-semibold">
            <Link href="/about">About Himat Textile</Link>
            <Link href="/catalog">Garment catalog</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#enquiry">Start an inquiry</Link>
          </div>
        </div>
        <div>
          <p className="mono-label mb-5 text-[10px] text-black/50">Connect</p>
          <div className="grid gap-3 text-sm font-semibold">
            <a className="flex items-center gap-2" href="mailto:hello@himattextile.com">
              <Mail size={15} /> Email our team
            </a>
            <a className="flex items-center gap-2" href="tel:+910000000000">
              <Phone size={15} /> Speak with sales
            </a>
            <div className="flex gap-3 pt-2">
              <a
                aria-label="LinkedIn contact"
                href="/#enquiry"
                className="grid h-9 w-9 place-items-center border border-black/40 hover:bg-black hover:text-white"
              >
                <Linkedin size={15} />
              </a>
              <a
                aria-label="Instagram contact"
                href="/#enquiry"
                className="grid h-9 w-9 place-items-center border border-black/40 hover:bg-black hover:text-white"
              >
                <Instagram size={15} />
              </a>
              <Link
                aria-label="Start an inquiry"
                href="/#enquiry"
                className="grid h-9 w-9 place-items-center border border-black/40 hover:bg-black hover:text-white"
              >
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 border-t border-black/15 px-5 py-5 text-[10px] uppercase tracking-[.16em] text-black/50 sm:flex-row sm:px-8 lg:px-12">
        <span>© {new Date().getFullYear()} Himat Textile</span>
        <span>Garments, wholesale, private label</span>
      </div>
    </footer>
  );
}
