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
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#C89A3D] selection:text-[#FFFFFF]">
      <main>
        <EditorialPageIntro
          eyebrow="04 / What We Can Support"
          title={<>Built around<br /><span className="text-transparent stroke-text">your garment</span><br />requirement.</>}
          description="Our network connects businesses with relevant sourcing and manufacturing capabilities based on product requirements, market context and commercial priorities."
          image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400"
          imageAlt="Apparel sourcing and manufacturing"
          ctaLabel="Discuss your requirement"
          ctaHref="/#enquiry"
        />

        <section className="paper-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#FFFFFF] text-[#1A1A1A]">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-3xl">
              <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">// HIMAT TEXTILE CAN SUPPORT</span>
              <div className="accent-rule mt-5 h-1 bg-[#C89A3D] w-12" />
              <h2 className="mt-7 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl text-[#0A1F2B]">From product idea<br />to buying decision.</h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#667085]">The strongest sourcing conversations make the product, quantity, price and delivery expectation clear before production begins.</p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map(({ title, desc, icon: Icon }, index) => (
                <article key={title} className="bg-[#FFFFFF] border border-[#E8E2D8] p-7 rounded-xl transition-all hover:border-[#C89A3D] hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <Icon size={22} className="text-[#C89A3D]" />
                    <span className="font-mono text-[10px] text-[#667085]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-16 font-display text-2xl font-bold uppercase leading-tight text-[#0A1F2B]">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#667085]">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0A1F2B] text-[#FFFFFF] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 border-t border-[#E8E2D8]/10">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2">
            <div>
              <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">Manufacturing connection</span>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-none tracking-tight sm:text-5xl text-white">Relevant capability.<br />Clear conversation.</h2>
            </div>
            <div className="border-t border-white/10 pt-5 text-sm leading-relaxed text-[#FFFFFF]/70">
              <p>We do not present every factory as owned or operated by Himat Textile. Instead, our network connects businesses with relevant sourcing and manufacturing capabilities based on their product requirements.</p>
              <p className="mt-5 text-[#FFFFFF]/90">That keeps the process practical, transparent and aligned to the brief.</p>
            </div>
          </div>
        </section>
        <HimatInquiry />
      </main>
    </div>
  );
}
