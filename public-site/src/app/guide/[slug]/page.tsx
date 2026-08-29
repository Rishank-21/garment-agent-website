import { getBusinessGuideBySlug, recordGuideView } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { HimatInquiry } from "@/components/HimatInquiry";
import type { Metadata } from "next";

export const revalidate = 60;
interface GuideDetailsProps { params: Promise<{ slug: string }>; }
export async function generateMetadata({ params }: GuideDetailsProps): Promise<Metadata> { const { slug } = await params; const guide = await getBusinessGuideBySlug(slug); if (!guide) return { title: "Guide Not Found | Himat Textile" }; return { title: `${guide.title} | Himat Textile Sourcing Guide`, description: `${guide.content.substring(0, 155)}...` }; }

export default async function GuideDetailsPage({ params }: GuideDetailsProps) {
  const { slug } = await params; if (!slug) notFound(); const guide = await getBusinessGuideBySlug(slug); if (!guide) notFound(); await recordGuideView(slug);
  return <div className="min-h-screen bg-[#161612] text-[#F4EFE6]"><main>
    <section className="bg-[#161612] px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40"><div className="mx-auto max-w-[1000px]"><Link href="/guide" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4EFE6]/50 transition-colors hover:text-[#C19040]"><ArrowLeft size={12} /> Back to sourcing guide</Link><div className="mt-10"><span className="mono-label text-[10px] text-[#C19040]">Himat Textile / Business Guide</span><div className="mt-5 h-[3px] w-16 bg-gradient-to-r from-[#C95A1A] to-[#C19040]" /><h1 className="mt-7 font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[.88] tracking-[-.07em]">{guide.title}</h1><div className="mt-8 flex flex-wrap items-center gap-4 border-y border-[#F4EFE6]/15 py-3 font-mono text-[10px] uppercase tracking-wider text-[#F4EFE6]/45"><span>Published in India</span><span className="text-[#C95A1A]">•</span><span>{guide.views + 1} views</span></div></div></div></section>
    <section className="paper-surface px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto max-w-[900px]">{guide.coverImage && <div className="mb-12 aspect-video w-full overflow-hidden bg-[#E7E0D3]"><img src={guide.coverImage} alt={guide.title} className="h-full w-full object-cover" /></div>}<article className="space-y-6 text-base leading-8 text-[#161612]/75 sm:text-lg">{guide.content.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}</article><div className="mt-14 border-t border-[#161612]/15 pt-6"><Link href="/#enquiry" className="orange-button inline-flex items-center gap-2 px-5 py-3 text-[10px] font-bold uppercase tracking-[.16em]">Talk to our garment team <ArrowUpRight size={14} /></Link></div></div></section>
    <HimatInquiry />
  </main></div>;
}
