"use client";

import React from "react";
import { Globe, MapPin } from "lucide-react";
import IndiaNetwork from "@/components/IndiaNetwork";
import { City, Brand } from "@/lib/schema";
import { HimatInquiry } from "@/components/HimatInquiry";

interface NetworkClientProps { cities: City[]; brands: Brand[]; }

export default function NetworkClient({ cities, brands }: NetworkClientProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#252525] selection:bg-[#FFB51A] selection:text-[#252525]">
      <main>
        {/* Network Hero */}
        <section className="relative overflow-hidden bg-[#141414] px-5 pb-12 pt-28 text-[#FAF8F5] sm:px-8 lg:px-12 lg:pt-36 border-b border-black/30">
          <div className="relative mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-widest text-[#F5B014]">
                <span>Home</span>
                <span className="opacity-50">/</span>
                <span className="text-[#FAF8F5]/80">Supply Chain Network</span>
              </div>
              <h1 className="font-serif-display text-[clamp(2.2rem,5.2vw,4.8rem)] font-black uppercase leading-[0.95] tracking-tight text-[#FAF8F5]">
                Garment Market Logistics Hubs.
              </h1>
              <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-[#FAF8F5]/85">
                Ahmedabad connects you directly to primary garment hubs and B2B transit routes across India. View our active supply chain hubs and regional connections mapped below.
              </p>
            </div>
          </div>
        </section>
        <div className="border-t border-[#E2DDD5]"><IndiaNetwork /></div>

        <section className="bg-[#141414] text-[#FAF8F5] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 border-t border-black/30">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-5 border-b border-white/15 pb-6 lg:flex-row lg:items-end">
              <div>
                <span className="mono-label text-[9px] font-bold text-[#F5B014] uppercase tracking-wider block">Sourcing ecosystem</span>
                <h2 className="mt-3 font-serif-display text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl text-[#FAF8F5]">Relevant hubs.<br /><span className="italic font-normal text-[#F5B014]">Better context.</span></h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#FAF8F5]/85">Use the network as a starting point for product discovery, not as a substitute for requirement-specific verification.</p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cities.map((city) => (
                <div key={city.id} className="border border-white/15 bg-white/5 p-6 rounded-xs transition-all hover:border-[#F5B014] shadow-xs">
                  <div className="flex items-center justify-between">
                    <MapPin className="text-[#F5B014]" size={20} />
                    <span className="mono-label bg-white/10 border border-white/15 px-2.5 py-1 text-[8.5px] text-[#F5B014] rounded-xs font-bold uppercase">Active hub</span>
                  </div>
                  <h4 className="mt-8 font-serif-display text-lg font-bold uppercase tracking-wider text-[#FAF8F5]">{city.name}</h4>
                  <p className="mt-2 font-mono text-[10px] text-[#FAF8F5]/75 font-semibold">LAT: {city.latitude}<br />LNG: {city.longitude}</p>
                </div>
              ))}
              {cities.length === 0 && (
                <div className="border border-white/15 p-6 text-center font-mono text-[10px] text-[#FAF8F5]/75 sm:col-span-2 lg:col-span-4 rounded-xs bg-white/5">No additional custom hubs registered in database.</div>
              )}
            </div>
          </div>
        </section>

        {brands.length > 0 && (
          <section className="border-t border-[#E2DDD5] bg-[#FAF9F6] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 text-[#252525]">
            <div className="mx-auto max-w-[1280px]">
              <span className="mono-label text-[9px] font-bold text-[#E94B0C] bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs uppercase tracking-wider inline-block">[ CLIENT ECOSYSTEM ]</span>
              <h2 className="mt-3 font-serif-display text-3xl font-black uppercase leading-none tracking-tight sm:text-5xl text-[#252525]">Featured sourcing brands.</h2>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex min-h-32 flex-col items-center justify-center gap-3 bg-[#FFFFFF] border border-[#E2DDD5] p-5 text-center rounded-xs transition-all hover:border-[#F5B014] hover:shadow-lg shadow-xs">
                    {brand.logoUrl ? (
                      <img src={brand.logoUrl} alt={brand.name} className="h-10 w-full object-contain opacity-80" />
                    ) : (
                      <Globe className="text-[#F5B014]" size={24} />
                    )}
                    <span className="mono-label w-full truncate text-[8.5px] font-bold text-[#66625D] uppercase">{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        <HimatInquiry />
      </main>
    </div>
  );
}

