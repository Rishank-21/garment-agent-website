import { Palette, Scissors, Tag, Truck } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Custom White Label Sourcing | Himat Textile", description: "Build brand equity with customized garment lines under your own label through Himat Textile's sourcing and production network." };

const steps = [
  { step: "01", title: "Shape the concept", desc: "Share the product direction, market, fit, quantity and commercial intention behind your collection.", icon: Palette },
  { step: "02", title: "Develop the product", desc: "Work through fabric selection, product development, sampling and the details that make the garment yours.", icon: Scissors },
  { step: "03", title: "Apply your brand", desc: "Coordinate labels, tags, packaging, trims and other branding requirements for your white labeling.", icon: Tag },
  { step: "04", title: "Prepare the order", desc: "Move from approved samples to production planning, quality checks and delivery coordination.", icon: Truck },
];

export default function WhiteLabelingPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#C89A3D] selection:text-[#FFFFFF]">
      <main>
        <EditorialPageIntro
          eyebrow="05 / White Labeling"
          title={<>Your brand.<br /><span className="text-transparent stroke-text">Your vision.</span><br />Our expertise.</>}
          description="From concept to finished garment, we support businesses looking to create their own apparel collections through a relevant sourcing and manufacturing network."
          image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400"
          imageAlt="White labeling apparel development"
          ctaLabel="Start your white labeling"
          ctaHref="/#enquiry"
        />

        <section className="paper-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#FFFFFF] text-[#1A1A1A]">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-6 border-b border-[#E8E2D8] pb-8 lg:flex-row lg:items-end">
              <div>
                <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">// MAKE YOUR OWN BRAND</span>
                <div className="accent-rule mt-5 h-1 bg-[#C89A3D] w-12" />
                <h2 className="mt-7 max-w-4xl font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl text-[#0A1F2B]">A collection is more<br />than a product list.</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#667085]">Build a focused range of cotton pants, shirts, T-shirts, ladies wear, kids wear or a custom garment collection around your customer and market.</p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ step, title, desc, icon: Icon }) => (
                <article key={step} className="bg-[#FFFFFF] border border-[#E8E2D8] p-7 rounded-xl transition-all hover:border-[#C89A3D] hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <Icon size={22} className="text-[#C89A3D]" />
                    <span className="font-mono text-[10px] text-[#667085]">{step}</span>
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
            <h2 className="font-display text-3xl font-bold uppercase leading-none tracking-tight sm:text-5xl text-white">Custom design.<br />Fabric sourcing.<br />Production support.</h2>
            <div className="border-t border-white/10 pt-5 text-sm leading-relaxed text-[#FFFFFF]/70">
              <p>White labeling is a working process. The final scope depends on the garment category, fabric, quantity, sampling requirements, branding details and delivery plan.</p>
              <p className="mt-5 text-[#FFFFFF]/90">Bring your vision and we will help map the next practical step.</p>
            </div>
          </div>
        </section>
        <HimatInquiry />
      </main>
    </div>
  );
}
