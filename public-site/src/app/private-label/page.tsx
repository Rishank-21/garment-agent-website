import { Palette, Scissors, Tag, Truck } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Custom Private Label Sourcing | Himat Textile", description: "Build brand equity with customized garment lines under your own label through Himat Textile's sourcing and production network." };

const steps = [
  { step: "01", title: "Shape the concept", desc: "Share the product direction, market, fit, quantity and commercial intention behind your collection.", icon: Palette },
  { step: "02", title: "Develop the product", desc: "Work through fabric selection, product development, sampling and the details that make the garment yours.", icon: Scissors },
  { step: "03", title: "Apply your brand", desc: "Coordinate labels, tags, packaging, trims and other branding requirements for your private label.", icon: Tag },
  { step: "04", title: "Prepare the order", desc: "Move from approved samples to production planning, quality checks and delivery coordination.", icon: Truck },
];

export default function PrivateLabelPage() {
  return <div className="min-h-screen bg-[#151613] text-[#f7f2e9]"><main>
    <EditorialPageIntro eyebrow="05 / Private Label" title={<>Your brand.<br /><span className="text-transparent stroke-text">Your vision.</span><br />Our expertise.</>} description="From concept to finished garment, we support businesses looking to create their own apparel collections through a relevant sourcing and manufacturing network." image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1400" imageAlt="Private label apparel development" ctaLabel="Start your private label" ctaHref="/#enquiry" />
    <section className="paper-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1500px]"><div className="flex flex-col justify-between gap-6 border-b border-[#151613]/15 pb-8 lg:flex-row lg:items-end"><div><span className="mono-label text-[10px] text-[#f05a24]">Make your own brand</span><div className="accent-rule mt-5" /><h2 className="mt-7 max-w-4xl font-display text-5xl font-black uppercase leading-[.86] tracking-[-.08em] sm:text-7xl">A collection is more<br />than a product list.</h2></div><p className="max-w-sm text-sm leading-relaxed text-[#151613]/65">Build a focused range of cotton pants, shirts, T-shirts, ladies wear, kids wear or a custom garment collection around your customer and market.</p></div><div className="mt-14 grid gap-px bg-[#151613]/15 md:grid-cols-2 lg:grid-cols-4">{steps.map(({ step, title, desc, icon: Icon }) => <article key={step} className="bg-[#f7f2e9] p-7 transition-colors hover:bg-[#e9e2d5]"><div className="flex items-center justify-between"><Icon size={22} className="text-[#f05a24]" /><span className="font-mono text-[10px] text-[#151613]/45">{step}</span></div><h3 className="mt-16 font-display text-2xl font-black uppercase leading-[.9] tracking-[-.06em]">{title}</h3><p className="mt-4 text-sm leading-relaxed text-[#151613]/65">{desc}</p></article>)}</div></div></section>
    <section className="bg-[#1e201c] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-2"><h2 className="font-display text-4xl font-black uppercase leading-[.86] tracking-[-.07em] sm:text-6xl">Custom design.<br />Fabric sourcing.<br />Production support.</h2><div className="border-t border-[#f7f2e9]/15 pt-5 text-sm leading-relaxed text-[#f7f2e9]/65"><p>Private label is a working process. The final scope depends on the garment category, fabric, quantity, sampling requirements, branding details and delivery plan.</p><p className="mt-5 text-[#f7f2e9]/85">Bring your vision and we will help map the next practical step.</p></div></div></section>
    <HimatInquiry /></main></div>;
}
