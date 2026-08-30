"use client";

import React from "react";
import { Globe, MapPin } from "lucide-react";
import IndiaNetwork from "@/components/IndiaNetwork";
import { City, Brand } from "@/lib/schema";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";

interface NetworkClientProps { cities: City[]; brands: Brand[]; }

export default function NetworkClient({ cities, brands }: NetworkClientProps) {
  return <div className="min-h-screen bg-[#161612] text-[#F4EFE6]"><main>
    <EditorialPageIntro eyebrow="07 / Garment Market Network" title={<>Connected to<br /><span className="text-transparent stroke-text">the garment</span><br />market.</>} description="Ahmedabad is the starting point for a wider sourcing conversation across textile, garment and wholesale ecosystems. Explore the relevant hubs and partner signals below." image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400" imageAlt="Garment market network" ctaLabel="Talk to our garment team" ctaHref="/#enquiry" />
    <div className="border-t border-[#F4EFE6]/10"><IndiaNetwork /></div>
    <section className="bg-[#1E211E] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto max-w-[1500px]"><div className="flex flex-col justify-between gap-5 border-b border-[#F4EFE6]/15 pb-6 lg:flex-row lg:items-end"><div><span className="mono-label text-[10px] text-[#C19040]">Sourcing ecosystem</span><h2 className="mt-3 font-display text-3xl font-black uppercase leading-[.88] tracking-[-.07em] sm:text-6xl">Relevant hubs.<br />Better context.</h2></div><p className="max-w-md text-sm leading-relaxed text-[#F4EFE6]/60">Use the network as a starting point for product discovery, not as a substitute for requirement-specific verification.</p></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{cities.map((city) => <div key={city.id} className="border border-[#F4EFE6]/12 bg-[#161612] p-6 transition-colors hover:border-[#C95A1A]"><div className="flex items-center justify-between"><MapPin className="text-[#C95A1A]" size={20} /><span className="mono-label border border-[#C19040]/40 px-2 py-1 text-[8px] text-[#C19040]">Active hub</span></div><h4 className="mt-10 font-display text-lg font-black uppercase tracking-wider">{city.name}</h4><p className="mt-2 font-mono text-[10px] text-[#F4EFE6]/40">LAT: {city.latitude}<br />LNG: {city.longitude}</p></div>)}{cities.length === 0 && <div className="border border-[#F4EFE6]/12 p-6 text-center font-mono text-[10px] text-[#F4EFE6]/40 sm:col-span-2 lg:col-span-4">No additional custom hubs registered in database.</div>}</div></div></section>
    {brands.length > 0 && <section className="paper-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto max-w-[1500px]"><span className="mono-label text-[10px] text-[#C95A1A]">Client ecosystem</span><h2 className="mt-3 font-display text-3xl font-black uppercase leading-[.88] tracking-[-.07em] sm:text-6xl">Featured sourcing brands.</h2><div className="mt-10 grid grid-cols-2 gap-px bg-[#161612]/15 sm:grid-cols-3 lg:grid-cols-6">{brands.map((brand) => <div key={brand.id} className="flex min-h-32 flex-col items-center justify-center gap-3 bg-[#F4EFE6] p-5 text-center transition-colors hover:bg-[#E7E0D3]">{brand.logoUrl ? <img src={brand.logoUrl} alt={brand.name} className="h-10 w-full object-contain opacity-75" /> : <Globe className="text-[#C95A1A]/50" size={24} />}<span className="mono-label w-full truncate text-[8px] font-bold text-[#161612]/55">{brand.name}</span></div>)}</div></div></section>}
    <HimatInquiry />
  </main></div>;
}
