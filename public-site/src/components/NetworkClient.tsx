"use client";

import React from "react";
import { Globe, MapPin } from "lucide-react";
import IndiaNetwork from "@/components/IndiaNetwork";
import { City, Brand } from "@/lib/schema";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";

interface NetworkClientProps { cities: City[]; brands: Brand[]; }

export default function NetworkClient({ cities, brands }: NetworkClientProps) {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#C89A3D] selection:text-[#FFFFFF]">
      <main>
        <section className="relative overflow-hidden bg-[#0A1F2B] px-5 pb-8 pt-28 text-[#FFFFFF] sm:px-8 lg:px-12 lg:pt-36 border-b border-white/10">
          <div className="noise-layer absolute inset-0 opacity-5" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#C89A3D]">
                <span>Home</span>
                <span className="opacity-50">/</span>
                <span className="text-white/60">Supply Chain Network</span>
              </div>
              <h1 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight text-white">
                Garment Market Logistics Hubs.
              </h1>
              <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-white/70">
                Ahmedabad connects you directly to primary garment hubs and B2B transit routes across India. View our active supply chain hubs and regional connections mapped below.
              </p>
            </div>
          </div>
        </section>
        <div className="border-t border-[#E8E2D8]"><IndiaNetwork /></div>

        <section className="bg-[#0A1F2B] text-[#FFFFFF] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 border-t border-[#E8E2D8]/10">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 lg:flex-row lg:items-end">
              <div>
                <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">Sourcing ecosystem</span>
                <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-none tracking-tight sm:text-5xl text-white">Relevant hubs.<br />Better context.</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#FFFFFF]/70">Use the network as a starting point for product discovery, not as a substitute for requirement-specific verification.</p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cities.map((city) => (
                <div key={city.id} className="border border-white/10 bg-[#122D3B] p-6 rounded-xl transition-colors hover:bg-[#122D3B]/80">
                  <div className="flex items-center justify-between">
                    <MapPin className="text-[#C89A3D]" size={20} />
                    <span className="mono-label border border-[#C89A3D]/40 px-2 py-1 text-[8px] text-[#C89A3D] rounded-md font-bold">Active hub</span>
                  </div>
                  <h4 className="mt-10 font-display text-lg font-bold uppercase tracking-wider text-white">{city.name}</h4>
                  <p className="mt-2 font-mono text-[10px] text-[#FFFFFF]/60">LAT: {city.latitude}<br />LNG: {city.longitude}</p>
                </div>
              ))}
              {cities.length === 0 && (
                <div className="border border-white/10 p-6 text-center font-mono text-[10px] text-[#FFFFFF]/60 sm:col-span-2 lg:col-span-4 rounded-xl bg-[#122D3B]">No additional custom hubs registered in database.</div>
              )}
            </div>
          </div>
        </section>

        {brands.length > 0 && (
          <section className="paper-surface border-t border-[#E8E2D8] bg-[#F6F3ED] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 text-[#1A1A1A]">
            <div className="mx-auto max-w-[1280px]">
              <span className="mono-label text-[10px] text-[#C89A3D] uppercase block tracking-wider">// CLIENT ECOSYSTEM</span>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase leading-none tracking-tight sm:text-5xl text-[#0A1F2B]">Featured sourcing brands.</h2>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex min-h-32 flex-col items-center justify-center gap-3 bg-[#FFFFFF] border border-[#E8E2D8] p-5 text-center rounded-xl transition-colors hover:border-[#C89A3D] hover:shadow-lg">
                    {brand.logoUrl ? (
                      <img src={brand.logoUrl} alt={brand.name} className="h-10 w-full object-contain opacity-75" />
                    ) : (
                      <Globe className="text-[#C89A3D]" size={24} />
                    )}
                    <span className="mono-label w-full truncate text-[8px] font-bold text-[#667085]">{brand.name}</span>
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
