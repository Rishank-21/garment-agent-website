import { getBusinessGuideBySlug, recordGuideView } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: GuideDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return { title: "Guide Not Found | Himat Textile" };
  const guide = await getBusinessGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found | Himat Textile" };
  return {
    title: `${guide.title} | Himat Textile Sourcing Guide`,
    description: guide.content.substring(0, 155) + "...",
  };
}

interface GuideDetailsProps {
  params: Promise<{ slug: string }>;
}

export default async function GuideDetailsPage({ params }: GuideDetailsProps) {
  const { slug } = await params;
  if (!slug) notFound();

  // Fetch the guide
  const guide = await getBusinessGuideBySlug(slug);
  if (!guide) notFound();

  // Increment view count directly on the server
  await recordGuideView(slug);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white selection:bg-white selection:text-black">
      <main className="pt-16 lg:pt-28">
        <div className="mx-auto max-w-[900px] px-5 py-12 sm:px-8">
          <Link
            href="/guide"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white mb-8"
          >
            <ArrowLeft size={12} /> Back to Sourcing Guide
          </Link>

          <article className="space-y-8">
            <div className="space-y-4">
              <span className="mono-label text-[10px] text-white/50 uppercase">Himat Textile Sourcing Guide</span>
              <h1 className="font-display text-4xl font-black uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl">
                {guide.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-white/40 pt-2 border-y border-white/10 py-3">
                <span>Published in India</span>
                <span>•</span>
                <span>{guide.views + 1} Views</span>
              </div>
            </div>

            {guide.coverImage && (
              <div className="aspect-video w-full overflow-hidden bg-neutral-900 border border-white/10">
                <img
                  src={guide.coverImage}
                  alt={guide.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed text-white/80 space-y-6">
              {guide.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
