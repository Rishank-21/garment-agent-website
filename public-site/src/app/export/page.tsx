import { ShieldCheck, PackageCheck, FileCheck2, ShipWheel } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "International Apparel Export Capacity | Himat Textile", description: "Explore Himat Textile's export-support, quality verification, packaging and documentation capabilities." };

const support = [
  { title: "Quality verification", desc: "Keep sizing, shrinkage, colorfastness, fabric and construction details visible before dispatch.", icon: ShieldCheck },
  { title: "Export documentation", desc: "Coordinate the relevant shipment and customs documentation around the buyer’s destination requirements.", icon: FileCheck2 },
  { title: "Secure packaging", desc: "Discuss polybags, cartons, labels, barcodes and moisture considerations for the chosen product.", icon: PackageCheck },
  { title: "Shipment coordination", desc: "Work through delivery expectations, freight timelines and the practical handoff from sourcing to export.", icon: ShipWheel },
];

export default function ExportPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#C89A3D] selection:text-[#FFFFFF]">
      <main>
        <EditorialPageIntro
          eyebrow="08 / Export Support"
          title={<>From Ahmedabad<br /><span className="text-transparent stroke-text">to the next</span><br />market.</>}
          description="Export support starts with the right product, the right documentation and a clear understanding of the delivery requirement. Himat Textile helps buyers move through that conversation with confidence."
          image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1400"
          imageAlt="Garment export logistics"
          ctaLabel="Discuss export requirements"
          ctaHref="/#enquiry"
        />

        <section className="paper-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#FFFFFF] text-[#1A1A1A]">
          <div className="mx-auto max-w-[1280px]">
            <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">// EXPORT SUPPORT / PRACTICAL READINESS</span>
            <div className="accent-rule mt-5 h-1 bg-[#C89A3D] w-12" />
            <h2 className="mt-7 max-w-4xl font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl text-[#0A1F2B]">Clear details make<br />global buying easier.</h2>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {support.map(({ title, desc, icon: Icon }, index) => (
                <article key={title} className="bg-[#FFFFFF] border border-[#E8E2D8] p-8 rounded-xl transition-all hover:border-[#C89A3D] hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <Icon size={24} className="text-[#C89A3D]" />
                    <span className="font-mono text-[10px] text-[#667085]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-16 font-display text-2xl font-bold uppercase leading-tight text-[#0A1F2B]">{title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[#667085]">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0A1F2B] text-[#FFFFFF] px-5 py-20 sm:px-8 lg:px-12 lg:py-24 border-t border-[#E8E2D8]/10">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <h2 className="font-display text-3xl font-bold uppercase leading-none tracking-tight sm:text-5xl text-white">Sourcing first.<br />Shipping next.</h2>
            <div className="border-t border-white/10 pt-5 text-sm leading-relaxed text-[#FFFFFF]/70">
              <p>International orders benefit from a B2B product brief, realistic quantity planning and documented quality expectations. Specific export claims, certifications and logistics arrangements should be confirmed directly for each requirement.</p>
              <p className="mt-5 text-[#FFFFFF]/90">Tell us the product, market, quantity and delivery context to start the right conversation.</p>
            </div>
          </div>
        </section>
        <HimatInquiry />
      </main>
    </div>
  );
}
