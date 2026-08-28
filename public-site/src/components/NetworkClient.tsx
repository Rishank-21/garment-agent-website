"use client";

import React from "react";
import { Globe, MapPin } from "lucide-react";
import IndiaNetwork from "@/components/IndiaNetwork";
import { City, Brand } from "@/lib/schema";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";

interface NetworkClientProps { cities: City[]; brands: Brand[]; }

export default function NetworkClient({ cities, brands }: NetworkClientProps) {
  return <div className="min-h-screen bg-[#151613] text-[#f7f2e9]"><main>
    <EditorialPageIntro eyebrow="07 / Garment Market Network" title={<>Connected to<br /><span className="text-transparent stroke-text">the garment</span><br />market.</>} description="Ahmedabad is the starting point for a wider sourcing conversation across textile, garment and wholesale ecosystems. Explore the relevant hubs and partner signals below." image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400" imageAlt="Garment market network" ctaLabel="Talk to our garment team" ctaHref="/#enquiry" />
    <div className="border-t border-[#f7f2e9]/10"><IndiaNetwork /></div>
    <section className="bg-[#1e201c] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto max-w-[1500px]"><div className="flex flex-col justify-between gap-5 border-b border-[#f7f2e9]/15 pb-6 lg:flex-row lg:items-end"><div><span className="mono-label text-[10px] text-[#ffb800]">Sourcing ecosystem</span><h2 className="mt-3 font-display text-4xl font-black uppercase leading-[.88] tracking-[-.07em] sm:text-6xl">Relevant hubs.<br />Better context.</h2></div><p className="max-w-md text-sm leading-relaxed text-[#f7f2e9]/60">Use the network as a starting point for product discovery, not as a substitute for requirement-specific verification.</p></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{cities.map((city) => <div key={city.id} className="border border-[#f7f2e9]/12 bg-[#151613] p-6 transition-colors hover:border-[#f05a24]"><div className="flex items-center justify-between"><MapPin className="text-[#f05a24]" size={20} /><span className="mono-label border border-[#ffb800]/40 px-2 py-1 text-[8px] text-[#ffb800]">Active hub</span></div><h4 className="mt-10 font-display text-lg font-black uppercase tracking-wider">{city.name}</h4><p className="mt-2 font-mono text-[10px] text-[#f7f2e9]/40">LAT: {city.latitude}<br />LNG: {city.longitude}</p></div>)}{cities.length === 0 && <div className="border border-[#f7f2e9]/12 p-6 text-center font-mono text-[10px] text-[#f7f2e9]/40 sm:col-span-2 lg:col-span-4">No additional custom hubs registered in database.</div>}</div></div></section>
    {brands.length > 0 && <section className="paper-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto max-w-[1500px]"><span className="mono-label text-[10px] text-[#f05a24]">Client ecosystem</span><h2 className="mt-3 font-display text-4xl font-black uppercase leading-[.88] tracking-[-.07em] sm:text-6xl">Featured sourcing brands.</h2><div className="mt-10 grid grid-cols-2 gap-px bg-[#151613]/15 sm:grid-cols-3 lg:grid-cols-6">{brands.map((brand) => <div key={brand.id} className="flex min-h-32 flex-col items-center justify-center gap-3 bg-[#f7f2e9] p-5 text-center transition-colors hover:bg-[#e9e2d5]">{brand.logoUrl ? <img src={brand.logoUrl} alt={brand.name} className="h-10 w-full object-contain opacity-75" /> : <Globe className="text-[#f05a24]/50" size={24} />}<span className="mono-label w-full truncate text-[8px] font-bold text-[#151613]/55">{brand.name}</span></div>)}</div></div></section>}
    <HimatInquiry />
  </main></div>;
}
