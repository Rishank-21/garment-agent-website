import { Building2, CheckCircle2, Factory, Files, UsersRound } from "lucide-react";
import { HimatInquiry } from "@/components/HimatInquiry";
import { EditorialPageIntro } from "@/components/EditorialPageIntro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Himat Textile — Sourcing & Manufacturing History",
  description: "Learn about Himat Textile's capabilities, factory standards, quality control verification, and client-first garment sourcing process.",
};

const capabilities = [
  { icon: Factory, title: "Manufacturing dialogue", text: "A structured working conversation around garments, fabrics and market requirements." },
  { icon: UsersRound, title: "Buyer-minded support", text: "Support for wholesalers, retailers, fashion brands and emerging businesses." },
  { icon: Files, title: "Documentation awareness", text: "A process that can surface relevant product, packaging or export details for your brief." },
  { icon: CheckCircle2, title: "Verification first", text: "Current certifications and factory information can be supplied and validated directly with Himat Textile." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#C89A3D] selection:text-[#FFFFFF]">
      <main>
        <EditorialPageIntro
          eyebrow="02 / Who We Are"
          title={<>Two generations.<br /><span className="text-transparent stroke-text">One trusted</span><br />vision.</>}
          description="Built on trust, relationships and textile experience, Himat Textile connects traditional Indian wholesale expertise with the evolving needs of modern fashion businesses."
          image="/images/ahmedabad_market_gheekanta.jpg"
          imageAlt="Garment tailoring workshop"
          ctaLabel="Start an enquiry"
          ctaHref="/#enquiry"
        />

        <section className="paper-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28 bg-[#FFFFFF] text-[#1A1A1A]">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">// STORY / NOT A SLOGAN</span>
              <div className="accent-rule mt-5 h-1 bg-[#C89A3D] w-12" />
              <h2 className="mt-7 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl text-[#0A1F2B]">Experience becomes more useful when it evolves.</h2>
            </div>
            <div className="space-y-5 text-sm leading-relaxed text-[#667085] sm:text-base">
              <p>Himat Textile is positioned as a garment partner rather than simply a textile supplier. That distinction matters to buyers who need a conversation about products, categories, market positioning and delivery expectations.</p>
              <p>The company story, facilities, capacity and current credentials should be confirmed from verified Himat Textile information. This platform intentionally makes no unsupported claims about years in business, production output, factory locations or certifications.</p>
              <div className="grid gap-3 border-t border-[#E8E2D8] pt-5 sm:grid-cols-3">
                <div><p className="font-display text-3xl font-bold text-[#C89A3D]">02</p><p className="mono-label mt-2 text-[9px] text-[#667085]">Generations</p></div>
                <div><p className="font-display text-3xl font-bold text-[#C89A3D]">01</p><p className="mono-label mt-2 text-[9px] text-[#667085]">Trusted vision</p></div>
                <div><p className="font-display text-3xl font-bold text-[#C89A3D]">∞</p><p className="mono-label mt-2 text-[9px] text-[#667085]">Relationships</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0A1F2B] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 text-[#FFFFFF] border-t border-[#E8E2D8]/10">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-5">
              <div><span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">Capabilities / factory highlights</span><h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl text-white">Verify the detail.<br />Keep the vision.</h2></div>
              <Building2 size={26} className="hidden text-[#C89A3D] sm:block" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <article key={title} className="bg-[#122D3B] p-7 border border-white/10 rounded-xl transition-colors hover:bg-[#122D3B]/80 sm:p-9"><Icon size={20} className="text-[#C89A3D]" /><h3 className="mt-16 font-display text-3xl font-bold uppercase leading-tight text-white">{title}</h3><p className="mt-4 max-w-sm text-sm leading-relaxed text-[#FFFFFF]/70">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="paper-surface border-y border-[#E8E2D8] bg-[#F6F3ED] px-5 py-16 sm:px-8 lg:px-12 lg:py-24 text-[#1A1A1A]">
          <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div><span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block">Certifications status</span><h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-[#0A1F2B] sm:text-5xl">Evidence belongs in the buying file.</h2></div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[['Current status','Confirm with Himat Textile'],['Buyer action','Request the relevant current certificates for your product and market.'],['Documentation','Verified files can be shared as part of the sourcing and compliance discussion.']].map(([label, text]) => (
                <div key={label} className="bg-white border border-[#E8E2D8] p-6 rounded-xl hover:border-[#C89A3D] transition-all hover:shadow-lg"><p className="mono-label text-[10px] text-[#667085]">{label}</p><p className="mt-8 font-display text-xl font-bold uppercase leading-tight text-[#0A1F2B]">{text}</p></div>
              ))}
            </div>
          </div>
        </section>
        <HimatInquiry />
      </main>
    </div>
  );
}
