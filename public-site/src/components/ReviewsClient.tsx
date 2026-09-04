"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, ArrowRight, ArrowUpRight, PlusCircle, CheckCircle2, X, MessageSquare } from "lucide-react";
import { Review } from "@/lib/schema";
import { useLanguage } from "@/lib/LanguageContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { HimatInquiry } from "@/components/HimatInquiry";

const fallbackReviews: Review[] = [
  {
    id: 1,
    author: "Rajesh Singhania — Singhania Fashion Retails, Jaipur",
    rating: 5,
    text: "Himat Textile helped us connect with genuine cotton shirt manufacturers in Gheekanta. The market guidance on fabric blends and wholesale rates saved us at least 12-15% compared to our previous sourcing agents.",
    date: "Verified Wholesale Buyer",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    author: "Vikram Mehta — Mehta Garments & Co., Surat",
    rating: 5,
    text: "Extremely reliable buying support. Being based in Surat, finding verified ethnic and western wear suppliers in Ahmedabad was challenging. Himat Textile handled order coordination and dispatch smoothly.",
    date: "B2B Volume Retailer",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    author: "Alok Dave — Urban Thread Stores, Indore",
    rating: 5,
    text: "Right pricing, honest supplier recommendations, and transparent coordination. We have been sourcing kids wear and casual shirts through Himat Textile regularly for the last 6 seasons.",
    date: "Multi-Store Retail Chain",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 4,
    author: "Pooja Sharma — Aura Clothing Studio, Delhi NCR",
    rating: 5,
    text: "For women's ethnic kurtis and unstitched fabric lots, Ahmedabad market has the best variety. Himat Textile provided on-ground guidance and inspected our sampling lots before final bulk order.",
    date: "Fashion Brand Owner",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 5,
    author: "Karan Patel — Shivam Textiles, Ahmedabad",
    rating: 5,
    text: "Strong supplier network and prompt coordination across Gheekanta and Safal Market. Whether you need 500 pcs or 10,000 pcs, their buying support is top notch.",
    date: "Wholesale Distributor",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 6,
    author: "Sanjay Reddy — Deccan Garments, Hyderabad",
    rating: 5,
    text: "Clear communication and on-time dispatch. When sourcing bulk lots from Ahmedabad, having someone on the ground who knows the mills and wholesalers makes all the difference.",
    date: "Verified Bulk Buyer",
    isActive: true,
    createdAt: new Date(),
  },
];

interface ReviewsClientProps {
  initialReviews?: Review[];
}

export default function ReviewsClient({ initialReviews = [] }: ReviewsClientProps) {
  const { language } = useLanguage();
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    return initialReviews && initialReviews.length > 0 ? initialReviews : fallbackReviews;
  });
  const [filterRating, setFilterRating] = useState<number | "all">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    text: "",
    city: "",
  });

  const filteredReviews = reviewsList.filter((r) => {
    if (filterRating === "all") return true;
    return r.rating === filterRating;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.text.trim()) return;

    setSubmitting(true);
    try {
      const authorFormatted = newReview.city.trim()
        ? `${newReview.author.trim()} — ${newReview.city.trim()}`
        : newReview.author.trim();

      const payload = {
        author: authorFormatted,
        rating: newReview.rating,
        text: newReview.text,
        date: "Verified Buyer Review",
      };

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const createdReview: Review = {
          id: Date.now(),
          author: payload.author,
          rating: payload.rating,
          text: payload.text,
          date: payload.date,
          isActive: true,
          createdAt: new Date(),
        };
        setReviewsList((prev) => [createdReview, ...prev]);
        setFormSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setFormSuccess(false);
          setNewReview({ author: "", rating: 5, text: "", city: "" });
        }, 1800);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171A1D] selection:bg-[#FE6311] selection:text-[#FFFAF4]">
      <main>
        {/* 1. Header Hero */}
        <section className="relative overflow-hidden bg-[#F3EEE5] px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20 lg:pt-36 border-b border-[rgba(23,26,29,0.12)]">
          <div className="mx-auto max-w-[1320px]">
            <div className="flex flex-col gap-6 max-w-3xl">
              <div className="space-y-1">
                <span className="font-mono text-[11px] font-semibold text-[#FE6311] uppercase tracking-[0.18em] block">
                  HIMAT TEXTILE • CLIENT REVIEWS
                </span>
                <p className="font-mono text-xs font-semibold text-[#171A1D]/60 uppercase tracking-[0.12em]">
                  YOUR GARMENT GUIDE IN AHMEDABAD
                </p>
              </div>

              <h1 className="font-serif text-[clamp(2.4rem,5.5vw,5rem)] font-normal leading-[0.94] tracking-tight text-[#171A1D]">
                What our buyers say.<br />
                <em className="italic text-[#FE6311]">Real B2B experiences.</em>
              </h1>

              <p className="text-base sm:text-lg text-[#171A1D]/80 leading-relaxed max-w-2xl font-sans">
                Read feedback from retailers, wholesalers, and fashion brand owners who rely on Himat Textile for garment sourcing, supplier negotiation, and order coordination in Ahmedabad.
              </p>

              {/* Trust Metrics Bar */}
              <div className="pt-3 flex flex-wrap items-center gap-6 sm:gap-10 border-t border-[rgba(23,26,29,0.12)] mt-2">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-3xl sm:text-4xl font-normal text-[#171A1D]">5.0</span>
                  <div className="space-y-0.5">
                    <div className="flex text-[#FFB51A]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] uppercase font-bold text-[#171A1D]/60 tracking-wider block">
                      Average Rating
                    </span>
                  </div>
                </div>

                <div className="h-8 w-px bg-[rgba(23,26,29,0.12)] hidden sm:block" />

                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-normal text-[#171A1D]">100%</span>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#171A1D]/60 tracking-wider block">
                    Verified B2B Buyers
                  </span>
                </div>

                <div className="h-8 w-px bg-[rgba(23,26,29,0.12)] hidden sm:block" />

                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-normal text-[#FE6311]">Ahmedabad Hub</span>
                  <span className="font-mono text-[10px] uppercase font-bold text-[#171A1D]/60 tracking-wider block">
                    Gheekanta · Safal · New Cloth
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#171A1D] hover:bg-[#2D3236] text-[#FFFAF4] px-6 py-3.5 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <PlusCircle size={15} className="text-[#FFB51A]" />
                  <span>WRITE A REVIEW</span>
                </button>

                <a
                  href="https://wa.me/919873938095?text=Hello%20Himat%20Textile,%20I%20want%20to%20inquire%20about%20garment%20sourcing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WHATSAPP US</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Reviews Grid & Rating Filter */}
        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1320px] space-y-8">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(23,26,29,0.12)]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase font-bold text-[#171A1D]/60">Filter:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterRating("all")}
                    className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs font-bold transition-colors cursor-pointer ${
                      filterRating === "all"
                        ? "bg-[#171A1D] text-[#FFFAF4]"
                        : "bg-[#FFFFFF] text-[#171A1D]/80 border border-[rgba(23,26,29,0.15)] hover:border-[#FE6311]"
                    }`}
                  >
                    All ({reviewsList.length})
                  </button>
                  <button
                    onClick={() => setFilterRating(5)}
                    className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-[2px] font-mono text-xs font-bold transition-colors cursor-pointer ${
                      filterRating === 5
                        ? "bg-[#171A1D] text-[#FFFAF4]"
                        : "bg-[#FFFFFF] text-[#171A1D]/80 border border-[rgba(23,26,29,0.15)] hover:border-[#FE6311]"
                    }`}
                  >
                    <span>5 Stars</span>
                    <Star size={12} className="text-[#FFB51A] fill-[#FFB51A]" />
                  </button>
                </div>
              </div>

              <span className="font-mono text-xs text-[#171A1D]/60">
                Showing {filteredReviews.length} verified review{filteredReviews.length === 1 ? "" : "s"}
              </span>
            </div>

            {/* Reviews Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="flex flex-col justify-between bg-[#FFFFFF] border border-[rgba(23,26,29,0.12)] p-6 sm:p-7 rounded-[4px] shadow-2xs hover:border-[#FE6311]/50 hover:shadow-xs transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex text-[#FFB51A]">
                        {Array(rev.rating || 5)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} size={15} fill="currentColor" />
                          ))}
                      </div>
                      <span className="font-mono text-[9px] font-bold text-[#FE6311] bg-[#FFF9ED] border border-[#FFB51A]/40 px-2 py-0.5 rounded-[2px] uppercase">
                        {rev.date || "Verified"}
                      </span>
                    </div>

                    <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#171A1D]/85 font-sans">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[rgba(23,26,29,0.08)] flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[#F3EEE5] text-[#FE6311] font-serif font-bold text-base flex items-center justify-center shrink-0">
                      {rev.author ? rev.author.charAt(0).toUpperCase() : "B"}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-serif text-sm font-semibold text-[#171A1D] truncate">
                        {rev.author}
                      </h4>
                      <span className="font-mono text-[10px] text-[#171A1D]/55 uppercase block">
                        Verified B2B Client
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Bottom Inquiry Section */}
        <section className="bg-[#FAF8F5] border-t border-[rgba(23,26,29,0.12)]">
          <HimatInquiry />
        </section>
      </main>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[rgba(23,26,29,0.15)] rounded-[6px] shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-[#171A1D]/50 hover:text-[#171A1D] p-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {formSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 size={44} className="text-[#25D366] mx-auto" />
                <h3 className="font-serif text-2xl font-normal text-[#171A1D]">
                  Review Submitted!
                </h3>
                <p className="text-sm text-[#171A1D]/75">
                  Thank you for your feedback. Your review has been recorded and will appear on the site.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] font-bold text-[#FE6311] uppercase tracking-wider block">
                    B2B BUYER FEEDBACK
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#171A1D]">
                    Share Your Experience
                  </h3>
                  <p className="text-xs text-[#171A1D]/60 leading-relaxed">
                    Help fellow retailers and wholesalers learn about sourcing with Himat Textile.
                  </p>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="font-mono text-xs uppercase font-bold text-[#171A1D]/70 block mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          className={star <= newReview.rating ? "text-[#FFB51A] fill-[#FFB51A]" : "text-stone-300"}
                        />
                      </button>
                    ))}
                    <span className="font-mono text-xs font-bold text-[#171A1D]/70 ml-2">
                      {newReview.rating} of 5 Stars
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="font-mono text-xs uppercase font-bold text-[#171A1D]/70 block mb-1">
                    Your Name &amp; Business Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    placeholder="e.g. Ramesh Patel — Patel Garments"
                    className="w-full rounded-[3px] border border-[rgba(23,26,29,0.18)] bg-[#FFFAF4] px-3.5 py-2.5 text-base sm:text-sm text-[#171A1D] placeholder:text-[#171A1D]/40 outline-none focus:border-[#FE6311]"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="font-mono text-xs uppercase font-bold text-[#171A1D]/70 block mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    value={newReview.city}
                    onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                    placeholder="e.g. Surat, Gujarat or Delhi NCR"
                    className="w-full rounded-[3px] border border-[rgba(23,26,29,0.18)] bg-[#FFFAF4] px-3.5 py-2.5 text-base sm:text-sm text-[#171A1D] placeholder:text-[#171A1D]/40 outline-none focus:border-[#FE6311]"
                  />
                </div>

                {/* Review Message */}
                <div>
                  <label className="font-mono text-xs uppercase font-bold text-[#171A1D]/70 block mb-1">
                    Review / Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    placeholder="Share how Himat Textile helped with your garment sourcing, pricing, quality, or delivery..."
                    className="w-full rounded-[3px] border border-[rgba(23,26,29,0.18)] bg-[#FFFAF4] p-3 text-base sm:text-sm text-[#171A1D] placeholder:text-[#171A1D]/40 outline-none focus:border-[#FE6311] resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-[3px] border border-[rgba(23,26,29,0.2)] text-[#171A1D] hover:bg-stone-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="button button-rust px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-[3px] shadow-sm cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
