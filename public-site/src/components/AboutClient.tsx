"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search, Building2, Handshake, Layers, Truck } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import { triggerInquiryForCategory } from "@/lib/inquiryEvents";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const whatWeDo = [
  {
    icon: Search,
    title: "Product Sourcing",
    desc: "Find garments according to your category, quality, style and budget.",
  },
  {
    icon: Building2,
    title: "Supplier Connection",
    desc: "Connect with suitable manufacturers, wholesalers and suppliers.",
  },
  {
    icon: Handshake,
    title: "Price & Deal Support",
    desc: "Help you understand market pricing and negotiate better deals.",
  },
  {
    icon: Layers,
    title: "Order Coordination",
    desc: "Stay connected with suppliers and help coordinate your requirements.",
  },
  {
    icon: Truck,
    title: "Dispatch Support",
    desc: "Assist with packing, dispatch and communication until your order moves forward.",
  },
];

const whyHimat = [
  {
    num: "01",
    title: "Market Knowledge",
    desc: "We understand Ahmedabad’s garment market and its changing product trends.",
  },
  {
    num: "02",
    title: "B2B Network",
    desc: "Our supplier network helps buyers explore multiple options instead of depending on a single source.",
  },
  {
    num: "03",
    title: "Transparent Approach",
    desc: "Clear communication, practical guidance and straightforward dealing.",
  },
  {
    num: "04",
    title: "Buyer-First Support",
    desc: "Your requirement comes first. We focus on helping you make a better buying decision.",
  },
];

export default function AboutClient() {
  const scrollToEnquiry = () => {
    triggerInquiryForCategory({
      categoryTitle: "Market Guidance",
      variantName: "Ahmedabad Garment Sourcing & Buying Support",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171A1D] selection:bg-[#FE6311] selection:text-[#FFFAF4]">
      <main>
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden bg-[#F3EEE5] px-5 pb-16 pt-32 text-[#171A1D] sm:px-8 lg:px-12 lg:pb-24 lg:pt-36 border-b border-[rgba(23,26,29,0.12)]">
          <div className="relative mx-auto max-w-[1320px]">
            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="font-mono text-[11px] font-semibold text-[#FE6311] uppercase tracking-[0.18em] block">
                    ABOUT HIMAT TEXTILE
                  </span>
                  <p className="font-mono text-xs font-semibold text-[#171A1D]/60 uppercase tracking-[0.12em]">
                    YOUR GARMENT GUIDE IN AHMEDABAD
                  </p>
                </div>

                <h1 className="font-serif text-[clamp(2.5rem,5.5vw,5.5rem)] font-normal leading-[0.92] tracking-tight text-[#171A1D]">
                  We Connect You With<br />
                  <em className="italic text-[#FE6311]">The Right Garments.</em>
                </h1>

                <p className="max-w-xl text-base sm:text-lg font-medium leading-relaxed text-[#171A1D]/90">
                  Himat Textile is a B2B garment sourcing and buying support partner based in Ahmedabad, helping retailers, wholesalers, resellers and growing fashion businesses find the right products from reliable suppliers.
                </p>

                <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[#171A1D]/80">
                  We understand that garment sourcing is more than just finding a product. It is about getting the right quality, right price, right supplier and right support for your business.
                </p>

                <p className="max-w-xl text-sm leading-relaxed text-[#171A1D]/75">
                  With strong knowledge of Ahmedabad’s garment market and a wide network of B2B suppliers, we make the buying process simpler, faster and more transparent.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="#what-we-do"
                    className="inline-flex items-center gap-2 bg-[#171A1D] hover:bg-[#2D3236] text-[#FFFAF4] px-6 py-3.5 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>WHAT WE DO</span>
                    <ArrowRight size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={scrollToEnquiry}
                    className="inline-flex items-center gap-2 bg-[#FFFFFF] hover:bg-[#FAF8F5] text-[#171A1D] border border-[rgba(23,26,29,0.15)] px-6 py-3.5 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-2xs transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>START ENQUIRY</span>
                    <ArrowUpRight size={14} className="text-[#FE6311]" />
                  </button>
                </div>
              </div>

              {/* Ground Photo */}
              <div>
                <div className="relative overflow-hidden border border-[rgba(23,26,29,0.12)] bg-[#FFFFFF] rounded-[4px] shadow-md group">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFE9DF]">
                    <img
                      src="/images/ahmedabad_market_gheekanta.jpg"
                      alt="Ahmedabad Garment Wholesale Market Hub"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 bg-[#FFFFFF] border-t border-[rgba(23,26,29,0.08)]">
                    <p className="font-serif text-base font-semibold text-[#171A1D] mb-1">
                      Ahmedabad Garment District
                    </p>
                    <p className="text-xs text-[#171A1D]/70 leading-relaxed m-0">
                      Gheekanta, New Cloth Market, and regional garment manufacturing clusters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHAT WE DO Section */}
        <section id="what-we-do" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#FFFFFF] text-[#171A1D] border-b border-[rgba(23,26,29,0.12)]">
          <div className="mx-auto max-w-[1320px]">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-[10px] font-bold text-[#FE6311] uppercase tracking-widest block mb-2">
                WHAT WE DO
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[0.95] tracking-tight text-[#171A1D]">
                Core Sourcing & Buying Support.
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whatWeDo.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-[#FAF8F5] border border-[rgba(23,26,29,0.08)] p-6 sm:p-7 rounded-[4px] hover:border-[#FE6311]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-[3px] bg-[#EFE9DF] flex items-center justify-center text-[#FE6311] mb-5">
                        <IconComponent size={20} />
                      </div>
                      <h3 className="font-serif text-lg font-semibold leading-tight text-[#171A1D] mb-2 uppercase tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#171A1D]/75 leading-relaxed m-0">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. WHY HIMAT TEXTILE? Section */}
        <section className="bg-[#FAF8F5] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 border-b border-[rgba(23,26,29,0.12)]">
          <div className="mx-auto max-w-[1320px]">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-[10px] font-bold text-[#FE6311] uppercase tracking-widest block mb-2">
                WHY HIMAT TEXTILE?
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[0.95] tracking-tight text-[#171A1D]">
                Built for Smarter Buying.
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyHimat.map((item) => (
                <div
                  key={item.num}
                  className="bg-[#FFFFFF] border border-[rgba(23,26,29,0.1)] p-6 sm:p-7 rounded-[4px] hover:border-[#FE6311]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#FE6311] block mb-3 pb-2 border-b border-[rgba(23,26,29,0.08)]">
                      {item.num} — {item.title.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-[#171A1D] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#171A1D]/75 leading-relaxed m-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. OUR APPROACH Section */}
        <section className="bg-[#171A1D] text-[#FAF8F5] px-5 py-24 sm:px-8 lg:px-12 lg:py-28 border-b border-black/30">
          <div className="mx-auto max-w-[1320px]">
            <div className="max-w-3xl space-y-6">
              <span className="font-mono text-[10px] font-bold text-[#FE6311] uppercase tracking-widest block">
                OUR APPROACH
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[0.95] tracking-tight text-[#FAF8F5]">
                RIGHT PRODUCT.<br />
                <em className="italic text-[#FE6311]">RIGHT SUPPLIER.</em><br />
                RIGHT DEAL.
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-[#FAF8F5]/85 leading-relaxed max-w-2xl pt-2">
                <p className="font-medium text-white">
                  We don’t believe in simply selling you a product.
                </p>
                <p className="text-sm sm:text-base text-[#FAF8F5]/75">
                  We help you find what fits your business.
                </p>
                <p className="text-sm sm:text-base text-[#FAF8F5]/75">
                  From your first requirement to supplier coordination and dispatch, Himat Textile is here to make garment sourcing easier.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Bottom CTA */}
        <section className="bg-[#F3EEE5] py-16 sm:py-20 px-6 sm:px-12 border-b border-[rgba(23,26,29,0.12)]">
          <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] font-bold text-[#FE6311] uppercase tracking-widest block mb-3">
                LOOKING FOR GARMENTS IN AHMEDABAD?
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[0.95] tracking-tight text-[#171A1D]">
                Tell us what you need.<br />
                <em className="italic text-[#FE6311]">We’ll help you find the right source.</em>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#171A1D]/75 leading-relaxed">
                Connect directly with our team. Share your requirements, required quantities, or style brief.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto lg:min-w-[260px] shrink-0">
              <a
                href="https://wa.me/919873938095?text=Hello%20Himat%20Textile,%20I%20am%20looking%20for%20garments%20in%20Ahmedabad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-4 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WHATSAPP US</span>
              </a>
              <button
                type="button"
                onClick={scrollToEnquiry}
                className="inline-flex items-center justify-center gap-2.5 bg-[#171A1D] hover:bg-[#2D3236] text-[#FFFAF4] px-7 py-4 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>START ENQUIRY</span>
                <ArrowUpRight size={15} className="text-[#FFB51A]" />
              </button>
            </div>
          </div>
        </section>

        {/* 6. Sourcing Inquiry Desk */}
        <div id="enquiry">
          <HimatInquiry />
        </div>
      </main>
    </div>
  );
}
