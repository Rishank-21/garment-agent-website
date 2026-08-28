import { listPublicBusinessGuides } from "@/lib/db";
import Link from "next/link";
import { MoveRight } from "lucide-react";

import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Garment Sourcing Guides & Industry Insights | Himat Textile",
  description: "Access editorial guides and B2B apparel industry insights on starting a garment brand, managing MOQ cycles, and catalog sourcing logistics.",
};

export default async function BusinessGuidePage() {
  const guides = await listPublicBusinessGuides();

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-white selection:text-black">
      <main className="pt-16 lg:pt-28">
        <section className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 lg:px-12">
          <span className="mono-label text-[10px] text-white/50 uppercase">Garment Business Sourcing Guide</span>
          <h1 className="mt-4 font-display text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl sm:leading-[0.85]">
            Editorial Guides & Insights.
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/60">
            Articles and resources to help retailers, fashion brands, and emerging labels navigate catalog sourcing, private label production, and supply chains.
          </p>
        </section>

        {/* Blogs Grid */}
        <section className="border-t border-white/10 py-16 bg-[#111]">
          <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
            {guides.length === 0 ? (
              <div className="text-center py-12 mono-label text-white/40">No guides found.</div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2">
                {guides.map((guide) => (
                  <div
                    key={guide.id}
                    className="group border border-white/10 bg-[#0d0d0d] p-6 hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {guide.coverImage && (
                        <div className="aspect-video overflow-hidden bg-neutral-900 mb-6">
                          <img
                            src={guide.coverImage}
                            alt={guide.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <span className="mono-label text-[9px] text-white/40">PUBLISHED ARTICLE</span>
                      <h3 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-white group-hover:text-white/80 transition-colors">
                        {guide.title}
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-white/60 line-clamp-3">
                        {guide.content}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="mono-label text-[9px] text-white/40">{guide.views} Reads</span>
                      <Link
                        href={`/guide/${guide.slug}`}
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white"
                      >
                        Read Guide <MoveRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
