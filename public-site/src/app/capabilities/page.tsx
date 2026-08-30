import { Shield, Sparkles, Layers, Box } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Apparel Manufacturing Capabilities | Himat Textile", description: "Explore Himat Textile's garment sourcing, white labeling, quality and manufacturing network capabilities." };

const capabilities = [
  { title: "Product sourcing", desc: "Find suitable garments based on product type, market, style, price range and quantity requirement.", icon: Layers },
  { title: "Fabric selection", desc: "Explore multiple fabric options through textile mills, processing houses and relevant fabric suppliers.", icon: Sparkles },
  { title: "Custom requirements", desc: "Coordinate white labeling, packaging, branding, sampling and production requirements around your brief.", icon: Box },
  { title: "Quality focus", desc: "Keep sizing, shrinkage, colorfastness, construction and packaging details visible in the sourcing conversation.", icon: Shield },
];

export default function CapabilitiesPage() {
  return <div className="min-h-screen bg-[#161612] text-[#F4EFE6]"><main>
    <EditorialPageIntro eyebrow="04 / What We Can Support" title={<>Built around<br /><span className="text-transparent stroke-text">your garment</span><br />requirement.</>} description="Our network connects businesses with relevant sourcing and manufacturing capabilities based on product requirements, market context and commercial priorities." image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400" imageAlt="Apparel sourcing and manufacturing" ctaLabel="Discuss your requirement" ctaHref="/#enquiry" />
    <section className="paper-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1500px]"><div className="max-w-3xl"><span className="mono-label text-[10px] text-[#C95A1A]">Himat Textile can support</span><div className="accent-rule mt-5" /><h2 className="mt-7 font-display text-4xl font-black uppercase leading-[.86] tracking-[-.08em] sm:text-7xl">From product idea<br />to buying decision.</h2><p className="mt-6 max-w-xl text-sm leading-relaxed text-[#161612]/65">The strongest sourcing conversations make the product, quantity, price and delivery expectation clear before production begins.</p></div><div className="mt-14 grid gap-px bg-[#161612]/15 sm:grid-cols-2 lg:grid-cols-4">{capabilities.map(({ title, desc, icon: Icon }, index) => <article key={title} className="bg-[#F4EFE6] p-7 transition-colors hover:bg-[#E7E0D3]"><div className="flex items-center justify-between"><Icon size={22} className="text-[#C95A1A]" /><span className="font-mono text-[10px] text-[#161612]/45">0{index + 1}</span></div><h3 className="mt-16 font-display text-2xl font-black uppercase leading-[.9] tracking-[-.06em]">{title}</h3><p className="mt-4 text-sm leading-relaxed text-[#161612]/65">{desc}</p></article>)}</div></div></section>
    <section className="bg-[#1E211E] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-2"><div><span className="mono-label text-[10px] text-[#C19040]">Manufacturing connection</span><h2 className="mt-4 font-display text-3xl font-black uppercase leading-[.88] tracking-[-.07em] sm:text-6xl">Relevant capability.<br />Clear conversation.</h2></div><div className="border-t border-[#F4EFE6]/15 pt-5 text-sm leading-relaxed text-[#F4EFE6]/65"><p>We do not present every factory as owned or operated by Himat Textile. Instead, our network connects businesses with relevant sourcing and manufacturing capabilities based on their product requirements.</p><p className="mt-5 text-[#F4EFE6]/85">That keeps the process practical, transparent and aligned to the brief.</p></div></div></section>
    <HimatInquiry /></main></div>;
}
