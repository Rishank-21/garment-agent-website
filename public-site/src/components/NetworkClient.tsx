"use client";

import React from "react";
import { Globe, MapPin, Shield } from "lucide-react";
import IndiaNetwork from "@/components/IndiaNetwork";
import { City, Brand } from "@/lib/schema";
import { HimatInquiry } from "@/components/HimatInquiry";

interface NetworkClientProps {
  cities: City[];
  brands: Brand[];
}

export default function NetworkClient({ cities, brands }: NetworkClientProps) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-white selection:text-black">
      <main className="pt-28">
        
        {/* Banner Header */}
        <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 lg:px-12">
          <span className="mono-label text-[10px] text-white/50 uppercase tracking-widest block">07 / Supply Backbone</span>
          <h1 className="mt-4 font-display text-5xl font-black uppercase tracking-tight sm:text-7xl">
            Sourcing & Logistics Network.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60">
            We operate across major garment manufacturing, fabric printing, and corporate retail distribution hubs in India. Verify our hubs and partner brands below.
          </p>
        </section>

        {/* Interactive India Map Section */}
        <div className="border-t border-white/10">
          <IndiaNetwork />
        </div>

        {/* Cities Database Grid */}
        <section className="border-t border-white/10 bg-[#111] py-16">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 space-y-10">
            <div>
              <span className="mono-label text-[9px] text-white/40 tracking-widest uppercase">Verified Hubs</span>
              <h3 className="font-display text-3xl font-black uppercase tracking-tight mt-1 text-white">Active Dispatch Hubs</h3>
              <p className="text-xs text-white/50 max-w-md mt-2">These coordinates map to active logistics offices, design centers, and weaving partners verified under our standard catalog brief.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cities.map((city) => (
                <div key={city.id} className="border border-white/10 bg-[#0d0d0d] p-6 space-y-4 hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between">
                    <MapPin className="text-[#3b82f6]" size={20} />
                    <span className="px-2 py-0.5 text-[8px] font-bold uppercase mono-label bg-emerald-950 text-emerald-400 border border-emerald-800">Verified</span>
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-black uppercase tracking-wider text-white">{city.name}</h4>
                    <p className="text-[10px] text-white/40 mt-1 font-mono">LAT: {city.latitude} <br /> LNG: {city.longitude}</p>
                  </div>
                </div>
              ))}
              
              {cities.length === 0 && (
                <div className="border border-white/10 bg-[#0d0d0d] p-6 text-center text-white/40 font-mono text-[10px] sm:col-span-2 lg:col-span-4">
                  No additional custom hubs registered in database.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Brands Database Grid */}
        {brands.length > 0 && (
          <section className="border-t border-white/10 bg-[#0d0d0d] py-16">
            <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 space-y-10">
              <div>
                <span className="mono-label text-[9px] text-white/40 tracking-widest uppercase">Client Ecosystem</span>
                <h3 className="font-display text-3xl font-black uppercase tracking-tight mt-1 text-white">Featured Sourcing Brands</h3>
                <p className="text-xs text-white/50 max-w-md mt-2">Fashion lines, wholesale labels, and retail networks sourcing apparel items through our manufacturing pipeline.</p>
              </div>

              <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                {brands.map((brand) => (
                  <div key={brand.id} className="border border-white/10 bg-[#111] p-5 flex flex-col justify-center items-center text-center space-y-3 hover:border-white/20 transition-all">
                    {brand.logoUrl ? (
                      <img src={brand.logoUrl} alt={brand.name} className="h-10 w-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
                    ) : (
                      <Globe className="text-white/20" size={24} />
                    )}
                    <span className="mono-label text-[8px] text-white/50 font-bold uppercase block truncate w-full">{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Inquiry Form */}
        <HimatInquiry />
      </main>
    </div>
  );
}
