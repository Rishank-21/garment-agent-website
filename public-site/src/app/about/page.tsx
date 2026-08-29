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
    <div className="min-h-screen bg-[#161612] text-[#F4EFE6]">
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

        <section className="paper-surface px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <span className="mono-label text-[10px] text-[#C95A1A]">Story / not a slogan</span>
              <div className="accent-rule mt-5" />
              <h2 className="mt-7 font-display text-5xl font-black uppercase leading-[.88] tracking-[-.08em] sm:text-7xl">Experience becomes more useful when it evolves.</h2>
            </div>
            <div className="space-y-5 text-sm leading-relaxed text-[#161612]/70 sm:text-base">
              <p>Himat Textile is positioned as a garment partner rather than simply a textile supplier. That distinction matters to buyers who need a conversation about products, categories, market positioning and delivery expectations.</p>
              <p>The company story, facilities, capacity and current credentials should be confirmed from verified Himat Textile information. This platform intentionally makes no unsupported claims about years in business, production output, factory locations or certifications.</p>
              <div className="grid gap-3 border-t border-[#161612]/15 pt-5 sm:grid-cols-3">
                <div><p className="font-display text-3xl text-[#C95A1A]">02</p><p className="mono-label mt-2 text-[9px] text-[#161612]/50">Generations</p></div>
                <div><p className="font-display text-3xl text-[#C95A1A]">01</p><p className="mono-label mt-2 text-[9px] text-[#161612]/50">Trusted vision</p></div>
                <div><p className="font-display text-3xl text-[#C95A1A]">∞</p><p className="mono-label mt-2 text-[9px] text-[#161612]/50">Relationships</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1E211E] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 flex items-end justify-between border-b border-[#F4EFE6]/15 pb-5">
              <div><span className="mono-label text-[10px] text-[#C19040]">Capabilities / factory highlights</span><h2 className="mt-4 font-display text-5xl font-black uppercase leading-[.86] tracking-[-.08em] sm:text-7xl">Verify the detail.<br />Keep the vision.</h2></div>
              <Building2 size={26} className="hidden text-[#C95A1A] sm:block" />
            </div>
            <div className="grid gap-px bg-[#F4EFE6]/12 sm:grid-cols-2">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <article key={title} className="bg-[#161612] p-7 transition-colors hover:bg-[#23251f] sm:p-9"><Icon size={20} className="text-[#C95A1A]" /><h3 className="mt-16 font-display text-3xl font-black uppercase leading-[.9] tracking-[-.07em]">{title}</h3><p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F4EFE6]/60">{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="paper-surface border-y border-[#161612]/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div><span className="mono-label text-[10px] text-[#C95A1A]">Certifications status</span><h2 className="mt-4 font-display text-4xl font-black uppercase leading-[.88] tracking-[-.08em] sm:text-5xl">Evidence belongs in the buying file.</h2></div>
            <div className="grid gap-px bg-[#161612]/15 sm:grid-cols-3">
              {[['Current status','Confirm with Himat Textile'],['Buyer action','Request the relevant current certificates for your product and market.'],['Documentation','Verified files can be shared as part of the sourcing and compliance discussion.']].map(([label, text]) => <div key={label} className="bg-[#F4EFE6] p-6"><p className="mono-label text-[10px] text-[#161612]/45">{label}</p><p className="mt-8 font-display text-xl font-black uppercase leading-[.9] tracking-[-.06em]">{text}</p></div>)}
            </div>
          </div>
        </section>
        <HimatInquiry />
      </main>
    </div>
  );
}
