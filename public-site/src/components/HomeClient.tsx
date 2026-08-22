"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ShieldCheck, Star, ArrowRight, X, LoaderCircle, MapPin, Clock, Phone } from "lucide-react";
import Link from "next/link";
import { Product, Advertisement, Review, Brand } from "@/lib/schema";

import { HimatInquiry } from "@/components/HimatInquiry";
import HeroSlider from "@/components/HeroSlider";
import HorizontalProducts from "@/components/HorizontalProducts";
import IndiaNetwork from "@/components/IndiaNetwork";
import gsap from "gsap";

const solutions = [
  { name: "Retailers", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800", copy: "Catalog collections ready for quick inventory replenishment." },
  { name: "Wholesalers", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800", copy: "High-volume fabric processing and reliable multi-city transport." },
  { name: "Distributors", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800", copy: "Bespoke production cycles mapped against seasonal schedules." },
  { name: "Fashion Brands", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800", copy: "Private-label manufacturing, styling details, custom tags." },
  { name: "New Businesses", image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800", copy: "Guidance on MOQ, style selection, and starting production." },
];

const fallbackReviews = [
  { id: 1, author: "Rajesh Kumar (Garment Retailer)", rating: 5, text: "Excellent collection of knitwear. MOQ is very B2B friendly. Delivery is always on time.", date: "1 week ago" },
  { id: 2, author: "Priya Sharma (Fashion Brand Owner)", rating: 5, text: "Sourced private-label women's wear from Himat. Quality of stitching and fabric selection is outstanding.", date: "3 weeks ago" },
  { id: 3, author: "Amit Patel (Wholesaler)", rating: 5, text: "Reliable B2B partner. Their multi-city network helps us source quickly for our regional stores.", date: "1 month ago" },
];

interface HomeClientProps {
  reviews: Review[];
  brands: Brand[];
  advertisements: Advertisement[];
}

export default function HomeClient({ reviews, brands, advertisements }: HomeClientProps) {
  const [activeSolution, setActiveSolution] = useState(0);
  const solutionsBgRef = useRef<HTMLDivElement>(null);
  const recordedAdIds = useRef<Set<number>>(new Set());

  const [hiddenAdIds, setHiddenAdIds] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({ author: "", rating: 5, text: "", date: "Today" });
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    console.log("Advertisements prop in HomeClient:", JSON.stringify(advertisements));
  }, [advertisements]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.author || !newReviewForm.text) {
      setReviewMessage("Please fill in all fields.");
      return;
    }
    setIsReviewSubmitting(true);
    setReviewMessage("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReviewForm),
      });
      if (res.ok) {
        setReviewMessage("Thank you! Your review has been submitted for verification. It will appear on the site once approved by the admin.");
        setNewReviewForm({ author: "", rating: 5, text: "", date: "Today" });
      } else {
        setReviewMessage("Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setReviewMessage("An error occurred. Please try again.");
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("hidden_ad_ids");
      if (saved) {
        setHiddenAdIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const recordAdAction = async (id: number, action: "click" | "impression" | "whatsapp") => {
    try {
      await fetch("/api/advertisements/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
    } catch (e) {
      console.warn("Failed to record ad action:", e);
    }
  };

  // Record impressions for visible ads
  useEffect(() => {
    if (!advertisements || advertisements.length === 0) return;
    
    // Popup ad
    const activePopup = advertisements.find(ad => ad.placement === "popup" && ad.isActive && !hiddenAdIds.includes(ad.id));
    if (activePopup && !recordedAdIds.current.has(activePopup.id)) {
      recordedAdIds.current.add(activePopup.id);
      recordAdAction(activePopup.id, "impression");
    }

    // Midpage ad
    const activeMidpage = advertisements.find(ad => ad.placement === "midpage" && ad.isActive && !hiddenAdIds.includes(ad.id));
    if (activeMidpage && !recordedAdIds.current.has(activeMidpage.id)) {
      recordedAdIds.current.add(activeMidpage.id);
      recordAdAction(activeMidpage.id, "impression");
    }

    // Footer ad
    const activeFooter = advertisements.find(ad => ad.placement === "footer" && ad.isActive && !hiddenAdIds.includes(ad.id));
    if (activeFooter && !recordedAdIds.current.has(activeFooter.id)) {
      recordedAdIds.current.add(activeFooter.id);
      recordAdAction(activeFooter.id, "impression");
    }

    // Hero ads (displayed as sponsorships)
    const visibleHeroAds = advertisements.filter(ad => ad.placement === "hero" && ad.isActive && !hiddenAdIds.includes(ad.id));
    visibleHeroAds.forEach(ad => {
      if (!recordedAdIds.current.has(ad.id)) {
        recordedAdIds.current.add(ad.id);
        recordAdAction(ad.id, "impression");
      }
    });
  }, [advertisements, hiddenAdIds]);

  const handleHideAd = (id: number) => {
    const next = [...hiddenAdIds, id];
    setHiddenAdIds(next);
    try {
      localStorage.setItem("hidden_ad_ids", JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  // B2B Hover Background transitions via GSAP
  const handleSolutionHover = (idx: number) => {
    setActiveSolution(idx);
    const targetImage = solutionsBgRef.current?.querySelectorAll(".solution-bg-img")[idx];
    const allImages = solutionsBgRef.current?.querySelectorAll(".solution-bg-img");

    if (allImages && targetImage) {
      gsap.to(allImages, { opacity: 0, scale: 1, duration: 0.6, ease: "power2.out" });
      gsap.to(targetImage, { opacity: 0.35, scale: 1.08, duration: 0.8, ease: "power2.out" });
    }
  };

  useEffect(() => {
    const firstImage = solutionsBgRef.current?.querySelectorAll(".solution-bg-img")[0];
    if (firstImage) {
      gsap.set(firstImage, { opacity: 0.35, scale: 1.08 });
    }
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-[#0d0d0d] text-white selection:bg-white selection:text-black">
      <main>
        {/* 1. Fullscreen Hero Slider */}
        <HeroSlider />

        {/* 2. Trust Strip Marquee */}
        <section className="relative overflow-hidden border-y border-white/10 bg-white py-4 text-black transition-colors hover:bg-neutral-100">
          <div className="flex select-none overflow-hidden">
            <div className="marquee-track flex shrink-0 items-center whitespace-nowrap font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
              {Array(4).fill(0).map((_, i) => (
                <React.Fragment key={i}>
                  <span>2nd Generation Garment Partner</span>
                  <span className="mx-6 text-black/30">•</span>
                  <span>Men's, Women's, Kids Catalog</span>
                  <span className="mx-6 text-black/30">•</span>
                  <span>Multi-City Supply Network</span>
                  <span className="mx-6 text-black/30">•</span>
                  <span>Wholesale & Private Label Sourcing</span>
                  <span className="mx-6 text-black/30">•</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Legacy Section (2nd Generation Notes) */}
        <section className="relative overflow-hidden bg-[#bdbdb9] px-5 py-20 text-black sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <span className="mono-label text-[10px] text-black/50 uppercase">02 / Evolving Vision</span>
              <h2 className="font-display text-5xl font-black uppercase leading-[0.82] tracking-[-0.07em] sm:text-7xl">
                Two generations.<br />One evolving vision.
              </h2>
              <div className="h-0.5 bg-black/20 w-16" />
              <p className="max-w-xl text-sm leading-relaxed text-black/75 sm:text-base">
                Built on a foundation of trust, verified relationships, and direct logistics experience across Indian textile regions. We bridge the legacy of wholesale reliability with the creative demands of present-day fashion businesses.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-70 transition-opacity"
              >
                Our Heritage story <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="relative overflow-hidden border border-black/10 bg-stone-900 aspect-video lg:aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200"
                alt="Garment tailoring workshop heritage"
                className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-black/30 font-display text-xs font-black">
                02
              </div>
            </div>
          </div>
        </section>

        {/* Featured Brands Marquee */}
        <section className="bg-white py-12 text-black overflow-hidden border-t border-black/5">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <p className="mono-label text-[9px] text-black/45 uppercase tracking-widest text-center mb-6">Featured Brands Sourcing From Our Partners</p>
            <div className="flex select-none overflow-hidden">
              <div className="marquee-track flex shrink-0 items-center whitespace-nowrap font-display text-2xl font-black uppercase tracking-tight md:text-3xl text-black/25">
                {(() => {
                  const list = brands && brands.length > 0
                    ? brands.map((b) => b.name)
                    : ["VOGUE WEAR", "STYLE CREW", "URBAN CLOSET", "STITCH STUDIO", "FASHION CO", "TREND SHAPER"];
                  const repeated = Array(6).fill(list).flat();
                  return repeated.map((brandName, idx) => (
                    <React.Fragment key={`${brandName}-${idx}`}>
                      <span className="mx-8 hover:text-black transition-colors">{brandName}</span>
                      <span className="mx-4 opacity-35 select-none">•</span>
                    </React.Fragment>
                  ));
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Horizontal Scrolling Product Gallery */}
        <HorizontalProducts />

        {/* 5. Private Label Customizer */}
        <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="absolute inset-0 opacity-15">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200"
              alt="Apparel manufacturing catalog background"
              className="h-full w-full object-cover grayscale"
              loading="lazy"
            />
          </div>
          <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="mono-label text-[10px] text-white/50 uppercase">05 / Custom Brand Solutions</span>
              <h2 className="font-display text-5xl font-black uppercase leading-[0.8] tracking-[-0.07em] sm:text-7xl md:text-8xl">
                Your Brand.<br />Our Garments.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/70">
                Launch bespoke fashion lines without operational overhead. We manage technical design packs, select high-grade yarn fabrics, and handle complete packaging support.
              </p>
            </div>

            <div className="border-l border-white/20 pl-6 space-y-6">
              {[
                { step: "01", name: "Select Concept", desc: "Choose block sizing, weights, and fits." },
                { step: "02", name: "Customize Colors", desc: "Select custom dye washes and fabrics." },
                { step: "03", name: "Apply Branding", desc: "Add bespoke main labels and care tags." },
                { step: "04", name: "Bulk Delivery", desc: "Finished garment shipments delivered globally." },
              ].map((item) => (
                <div key={item.step} className="group border-b border-white/10 pb-4">
                  <div className="flex items-baseline justify-between">
                    <span className="mono-label text-[10px] text-white/40 group-hover:text-white transition-colors">{item.step}</span>
                    <h3 className="font-display text-lg font-black uppercase tracking-wide text-white">{item.name}</h3>
                  </div>
                  <p className="mt-1 text-xs text-white/60">{item.desc}</p>
                </div>
              ))}
              <Link
                href="/#enquiry"
                className="inline-flex items-center gap-2 pt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:opacity-75"
              >
                Start Custom Order <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. B2B Solutions Interactive Segment Hover */}
        <section className="relative overflow-hidden bg-black px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div ref={solutionsBgRef} className="absolute inset-0 pointer-events-none transition-all duration-700">
            {solutions.map((sol, idx) => (
              <div
                key={`bg-${sol.name}`}
                className="solution-bg-img absolute inset-0 bg-cover bg-center opacity-0 transition-all duration-700"
                style={{ backgroundImage: `url(${sol.image})` }}
              />
            ))}
            <div className="absolute inset-0 bg-black/85" />
          </div>

          <div className="relative mx-auto max-w-[1500px]">
            <span className="mono-label text-[10px] text-white/40 uppercase">06 / Client Profiles</span>
            <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              Serving the Sourcing Ecosystem
            </h2>
            
            <div className="mt-12 divide-y divide-white/10 border-t border-white/10">
              {solutions.map((sol, idx) => (
                <div
                  key={sol.name}
                  onMouseEnter={() => handleSolutionHover(idx)}
                  className="group py-8 flex flex-col justify-between md:flex-row md:items-center cursor-pointer transition-colors"
                >
                  <h3 className="font-display text-3xl font-black uppercase tracking-tight text-white/50 group-hover:text-white transition-colors sm:text-4xl md:text-5xl">
                    {sol.name}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-white/45 group-hover:text-white/80 transition-colors md:mt-0">
                    {sol.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. India Network Map Section */}
        <IndiaNetwork />

        {/* 8. Export section */}
        <section className="bg-black py-24 px-5 sm:px-8 lg:px-12 text-white border-t border-white/5">
          <div className="mx-auto max-w-[1500px]">
            <span className="mono-label text-[10px] text-white/40 uppercase">08 / Export Capacity</span>
            <div className="grid gap-12 border-t border-white/10 pt-6 mt-4 lg:grid-cols-2">
              <h2 className="font-display text-5xl font-black uppercase leading-[0.85] tracking-tight sm:text-7xl">
                From India<br />to global markets.
              </h2>
              <div className="space-y-8">
                <p className="text-sm leading-relaxed text-white/70">
                  We manage international garment shipments, ensuring export quality testing, custom cargo packaging, and complete customs documentation for smooth transit.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Bulk Sourcing", desc: "Scale capacity for overseas containers." },
                    { title: "Quality Focus", desc: "Sizing tests, shrinkage checks, colorfastness." },
                    { title: "Export Logistics", desc: "Documentation, bill of lading assistance." },
                    { title: "Pre-pack Cargo", desc: "Custom labelling, polybags, bulk cartons." }
                  ].map(item => (
                    <div key={item.title} className="border border-white/10 bg-[#111] p-5">
                      <ShieldCheck size={20} className="text-white/60" />
                      <h4 className="mt-6 font-display text-base font-black uppercase tracking-wider">{item.title}</h4>
                      <p className="mt-1 text-xs text-white/50">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Price Segment Cards */}
        <section className="bg-[#141414] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 border-t border-white/5">
          <div className="mx-auto max-w-[1500px]">
            <span className="mono-label text-[10px] text-white/40 uppercase">09 / Price Architecture</span>
            <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
              Built for Different Price Points
            </h2>
            
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { name: "Value Segment", desc: "Competitive entry-level pricing for mass retail campaigns, utilizing cost-effective blends without compromising fabric structure.", moq: "500 Pcs" },
                { name: "Mid-Range", desc: "Standard retail qualities including carded and combed cotton, structured knits, and standard washes. Best for emerging fashion stores.", moq: "200 Pcs" },
                { name: "Premium Range", desc: "High-grade organic fabrics, detailed wash techniques, heavy weight options, custom trims, and luxury finishing processes.", moq: "100 Pcs" }
              ].map(item => (
                <div key={item.name} className="flex flex-col justify-between border border-white/10 bg-[#0d0d0d] p-6 hover:border-white/20 transition-all">
                  <div>
                    <h3 className="font-display text-xl font-black uppercase tracking-wider text-white">{item.name}</h3>
                    <p className="mt-4 text-xs leading-relaxed text-white/60">{item.desc}</p>
                  </div>
                  <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between">
                    <span className="mono-label text-[9px] text-white/40 uppercase">MOQ Requirement</span>
                    <span className="text-xs font-bold text-white">{item.moq}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9.5 Featured Promotions / B2B Sponsorships */}
        {advertisements && advertisements.some(ad => ad.placement === "hero" && ad.isActive && !hiddenAdIds.includes(ad.id)) && (
          <section className="bg-black py-16 px-5 sm:px-8 lg:px-12 border-t border-white/5">
            <div className="mx-auto max-w-[1500px]">
              <span className="mono-label text-[10px] text-white/40 uppercase">Featured Sponsorships</span>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {advertisements.filter(ad => ad.placement === "hero" && ad.isActive && !hiddenAdIds.includes(ad.id)).map(ad => (
                  <div key={ad.id} className="relative border border-white/10 bg-[#0d0d0d] p-5 flex flex-col justify-between group hover:border-white/20 transition-all">
                    <button
                      suppressHydrationWarning={true}
                      onClick={() => handleHideAd(ad.id)}
                      className="absolute right-3 top-3 border border-white/10 bg-transparent px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white/40 hover:border-white hover:text-white"
                    >
                      Dismiss
                    </button>
                    <div className="space-y-4">
                      {ad.imageUrl && (
                        <div className="aspect-video overflow-hidden border border-white/5 bg-stone-900">
                          <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover transition-all duration-500" />
                        </div>
                      )}
                      <div>
                        <span className="mono-label text-[8px] bg-white/15 px-2 py-0.5 text-white/70 uppercase">Promotion</span>
                        <h3 className="mt-2 font-display text-lg font-black uppercase tracking-wider text-white">{ad.title}</h3>
                        {ad.description && <p className="mt-2 text-xs leading-relaxed text-white/60">{ad.description}</p>}
                      </div>
                    </div>
                    {ad.linkUrl && (
                      <div className="mt-6 border-t border-white/10 pt-4">
                        <a
                          href={ad.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => recordAdAction(ad.id, "click")}
                          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:opacity-75"
                        >
                          {ad.buttonText || "Learn More"} <ArrowUpRight size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 10. Google Reviews */}
        <section className="bg-[#bdbdb9] px-5 py-24 text-black sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-6">
                <span className="mono-label text-[10px] text-black/50 uppercase block">10 / Client Trust</span>
                <h2 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl">
                  Himat Textile
                </h2>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-5xl font-black tracking-tighter">5.0</span>
                  <div className="space-y-0.5">
                    <div className="flex text-amber-500 fill-amber-500">
                      {Array(5).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-[10px] uppercase font-bold text-black/75 tracking-wider">
                      (365 Google Reviews)
                    </p>
                  </div>
                </div>
                <p className="text-xs text-black/60 font-mono tracking-wider uppercase">
                  Clothing supplier · Ahmedabad, Gujarat
                </p>
                <div className="pt-4">
                  <button
                    suppressHydrationWarning={true}
                    onClick={() => setIsReviewModalOpen(true)}
                    className="border border-black bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[.18em] transition-transform hover:-translate-y-0.5"
                  >
                    Write a Review
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {(reviews && reviews.length > 0 ? reviews.filter(r => r.isActive) : fallbackReviews).map(rev => (
                  <div key={rev.id} className="border-b border-black/15 pb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-600 fill-amber-600">
                        {Array(rev.rating).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                      <span className="text-[10px] text-black/45">{rev.date || "verified"}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-black/85">"{rev.text}"</p>
                    <h4 className="mt-2 text-xs font-bold uppercase tracking-wider text-black/60">{rev.author}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10b. Google Map Office Location Section */}
        <section className="bg-[#0a0a0a] border-y border-white/10 text-white px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
              {/* Location Details */}
              <div className="space-y-8">
                <div>
                  <span className="mono-label text-[10px] text-white/40 tracking-widest uppercase block mb-3">Office Headquarter</span>
                  <h2 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl text-white">
                    Our Location
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <MapPin className="text-[#3b82f6] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white/50">Address</h4>
                      <p className="mt-1 text-sm text-white/80 leading-relaxed max-w-sm">
                        First Floor, Hira Bhai 21, Dayanand Rd, Sarangpur, Sherkotda, Ahmedabad, Gujarat 380022
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <Clock className="text-[#3b82f6] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white/50">Operating Hours</h4>
                      <p className="mt-1 text-sm text-white/80">
                        Open · Closes 9:30 pm
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-4">
                    <Phone className="text-[#3b82f6] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white/50">Call Sourcing Desk</h4>
                      <a href="tel:+919873938095" className="mt-1 text-sm text-[#3b82f6] hover:underline font-mono">
                        +91 98739 38095
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Himat+Textile+Ahmedabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[.18em] transition-transform hover:-translate-y-0.5"
                  >
                    Get Directions <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="relative border border-white/10 overflow-hidden bg-black/40 h-[450px]">
                <iframe
                  width="100%"
                  height="100%"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.235928751515!2d72.59253457597143!3d23.01509337918345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87a9170dfdf7%3A0xe4a40733d3b76cf6!2sHimat%20Textile!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Review Submission Dialog Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <div className="relative w-full max-w-lg border border-white/10 bg-[#0d0d0d] p-8 text-white">
              <button
                onClick={() => {
                  setIsReviewModalOpen(false);
                  setReviewMessage("");
                }}
                className="absolute right-4 top-4 text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>

              <h3 className="font-display text-2xl font-black uppercase tracking-tight">Write a Google Review</h3>
              <p className="text-xs text-white/50 mt-1">Submit your rating and feedback. Approved reviews are displayed on the brand home page.</p>

              <form onSubmit={handleReviewSubmit} className="mt-6 space-y-5">
                {/* Author Name */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] uppercase tracking-wider text-white/50 block">Your Name / Title</label>
                  <input
                    suppressHydrationWarning={true}
                    type="text"
                    required
                    placeholder="e.g. Ramesh Sakhala (Retailer)"
                    value={newReviewForm.author}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, author: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-4 py-3 text-sm focus:border-white focus:outline-none"
                  />
                </div>

                {/* Stars Rating Selection */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] uppercase tracking-wider text-white/50 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        suppressHydrationWarning={true}
                        key={star}
                        type="button"
                        onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                        className={`text-2xl ${newReviewForm.rating >= star ? "text-amber-500" : "text-white/20"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] uppercase tracking-wider text-white/50 block">Review Feedback</label>
                  <textarea
                    suppressHydrationWarning={true}
                    required
                    rows={4}
                    placeholder="Share your sourcing experience with Himat Textile..."
                    value={newReviewForm.text}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, text: e.target.value })}
                    className="w-full bg-[#161616] border border-white/15 px-4 py-3 text-sm focus:border-white focus:outline-none resize-none"
                  />
                </div>

                {/* Action Feedback */}
                {reviewMessage && (
                  <p className="text-xs text-amber-400 leading-relaxed font-mono">
                    {reviewMessage}
                  </p>
                )}

                {/* Submit button */}
                <button
                  suppressHydrationWarning={true}
                  type="submit"
                  disabled={isReviewSubmitting}
                  className="w-full bg-white text-black py-4 text-[10px] font-bold uppercase tracking-[.18em] flex items-center justify-center gap-2 hover:bg-white/95 transition-all"
                >
                  {isReviewSubmitting ? (
                    <>
                      Submitting...
                      <LoaderCircle size={14} className="animate-spin" />
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}


        {/* 12. Dynamic Advertisement Space / Announcement Banner */}
        {advertisements && advertisements.some(ad => ad.placement === "midpage" && ad.isActive && !hiddenAdIds.includes(ad.id)) && (
          <section className="relative bg-stone-900 py-16 px-5 sm:px-8 lg:px-12 text-white text-center border-y border-white/10">
            {advertisements.filter(ad => ad.placement === "midpage" && ad.isActive && !hiddenAdIds.includes(ad.id)).slice(0, 1).map(ad => (
              <div key={ad.id} className="max-w-3xl mx-auto space-y-4 relative">
                <button
                  onClick={() => handleHideAd(ad.id)}
                  className="absolute right-0 top-0 border border-white/20 bg-transparent px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-white/60 hover:border-white hover:text-white"
                >
                  [CLOSE AD]
                </button>
                <span className="mono-label text-[9px] text-white/50 uppercase tracking-widest block">ANNOUNCEMENT</span>
                <h3 className="font-display text-3xl font-black uppercase tracking-wide mt-2">{ad.title}</h3>
                {ad.description && <p className="text-sm text-white/70">{ad.description}</p>}
                {ad.linkUrl && (
                  <a
                    href={ad.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => recordAdAction(ad.id, "click")}
                    className="mt-4 inline-flex items-center gap-2 border border-white bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black"
                  >
                    {ad.buttonText || "Learn More"} <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* 13. Inquiry Lead Generation */}
        <HimatInquiry />

        {/* Active Popup Overlay Advertisement */}
        {mounted && (() => {
          const activePopup = advertisements?.find(ad => ad.placement === "popup" && ad.isActive && !hiddenAdIds.includes(ad.id));
          if (!activePopup) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm">
              <div className="relative w-full max-w-lg border border-white/10 bg-stone-900 p-8 text-white space-y-6">
                <button
                  onClick={() => handleHideAd(activePopup.id)}
                  className="absolute right-4 top-4 border border-white/20 bg-transparent px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white/60 hover:border-white hover:text-white"
                >
                  [X]
                </button>
                <div className="space-y-3">
                  <span className="mono-label text-[8px] text-white/50 uppercase tracking-widest">LIMITED TIME ALERT</span>
                  <h3 className="font-display text-4xl font-black uppercase leading-none tracking-tight">{activePopup.title}</h3>
                  {activePopup.description && <p className="text-sm leading-relaxed text-white/77">{activePopup.description}</p>}
                </div>
                {activePopup.imageUrl && (
                  <img
                    src={activePopup.imageUrl}
                    alt="Highlight"
                    className="w-full h-48 object-cover border border-white/10"
                  />
                )}
                <div className="flex gap-4 pt-2">
                  {activePopup.linkUrl && (
                    <a
                      href={activePopup.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => recordAdAction(activePopup.id, "click")}
                      className="flex-1 border border-white bg-white py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-transparent hover:text-white"
                    >
                      {activePopup.buttonText || "View Deal"}
                    </a>
                  )}
                  <button
                    onClick={() => handleHideAd(activePopup.id)}
                    className="flex-1 border border-white/30 bg-transparent py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:border-white"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Active Footer Space Advertisement */}
        {(() => {
          const activeFooterAd = advertisements?.find(ad => ad.placement === "footer" && ad.isActive && !hiddenAdIds.includes(ad.id));
          if (!activeFooterAd) return null;
          return (
            <div className="fixed bottom-4 inset-x-5 z-40 mx-auto max-w-[1440px] border border-white/15 bg-black/95 p-5 text-white backdrop-blur-md flex flex-col justify-between items-center gap-4 md:flex-row shadow-2xl">
              <div className="flex items-center gap-4">
                <span className="mono-label text-[8px] bg-white/10 px-2 py-1 text-white/70 uppercase">LATEST BRIEF</span>
                <div>
                  <h4 className="font-display text-base font-black uppercase tracking-tight leading-none">{activeFooterAd.title}</h4>
                  {activeFooterAd.description && <p className="text-xs text-white/60 mt-1">{activeFooterAd.description}</p>}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
                {activeFooterAd.linkUrl && (
                  <a
                    href={activeFooterAd.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => recordAdAction(activeFooterAd.id, "click")}
                    className="border border-white bg-white px-4 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-black hover:bg-transparent hover:text-white transition-colors text-center w-full md:w-auto"
                  >
                    {activeFooterAd.buttonText || "Learn More"}
                  </a>
                )}
                <button
                  onClick={() => handleHideAd(activeFooterAd.id)}
                  className="border border-white/20 bg-transparent px-3 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-white/60 hover:border-white hover:text-white transition-colors"
                >
                  [DISMISS]
                </button>
              </div>
            </div>
          );
        })()}
      </main>
    </div>
  );
}
