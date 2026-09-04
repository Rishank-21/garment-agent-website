"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ShieldCheck, Star, ArrowRight, X, LoaderCircle, MapPin, Clock, Phone, Sparkles, Shirt, Scissors, Package, Globe } from "lucide-react";
import Link from "next/link";
import { Product, Advertisement, Review, Brand } from "@/lib/schema";

import { HimatInquiry } from "@/components/HimatInquiry";
import { HIMAT_CATEGORIES } from "@/lib/categoriesData";
import HimatCategoryDeck from "@/components/HimatCategoryDeck";
import CategoryChipsFilter from "@/components/CategoryChipsFilter";
import { triggerInquiryForCategory } from "@/lib/inquiryEvents";
import HeroSlider from "@/components/HeroSlider";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import IndiaNetwork from "@/components/IndiaNetwork";
import { useLanguage } from "@/lib/LanguageContext";

const fallbackReviews = [
  { id: 1, author: "Rajesh Kumar (Garment Retailer, Delhi)", rating: 5, text: "Excellent collection of cotton twill pants and linen shirts. Pricing is very B2B friendly with fast door-to-door dispatch.", date: "1 week ago" },
  { id: 2, author: "Priya Sharma (D2C Brand Owner, Mumbai)", rating: 5, text: "Sourced custom white-labeling women\x27s wear from Himat. The quality of stitching, bio-washing, and custom tags is world-class.", date: "3 weeks ago" },
  { id: 3, author: "Amit Patel (Regional Wholesaler, Indore)", rating: 5, text: "Reliable B2B partner in Ahmedabad. Their direct mill sourcing network saves us 15-20% on fabric procurement.", date: "1 month ago" },
];

interface HomeClientProps {
  reviews: Review[];
  brands: Brand[];
  advertisements: Advertisement[];
}

export default function HomeClient({ reviews, brands, advertisements }: HomeClientProps) {
  const [activeSolution, setActiveSolution] = useState(0);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const recordedAdIds = useRef<Set<number>>(new Set());

  const [hiddenAdIds, setHiddenAdIds] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({ author: "", rating: 5, text: "", date: "Today" });
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState("");

  const { language, t } = useLanguage();

  const translatedSolutions = [
    { 
      name: language === "hi" ? "à¤°à¤¿à¤Ÿà¥‡à¤²à¤°à¥à¤¸ (à¤–à¥à¤¦à¤°à¤¾ à¤µà¤¿à¤•à¥à¤°à¥‡à¤¤à¤¾)" : "Retailers", 
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800", 
      copy: language === "hi" ? "à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤‡à¤¨à¥à¤µà¥‡à¤‚à¤Ÿà¥à¤°à¥€ à¤ªà¥à¤¨à¤ƒà¤ªà¥‚à¤°à¥à¤¤à¤¿ à¤•à¥‡ à¤²à¤¿à¤ à¤¤à¥ˆà¤¯à¤¾à¤° à¤•à¥ˆà¤Ÿà¤²à¥‰à¤— à¤¸à¤‚à¤—à¥à¤°à¤¹, à¤•à¤® à¤à¤®à¤“à¤•à¥à¤¯à¥‚ à¤”à¤° à¤¤à¥‡à¤œ à¤¡à¤¿à¤²à¥€à¤µà¤°à¥€à¥¤" : "Fast-moving commercial styles, competitive pricing, and flexible low MOQs for healthy retail store margins." 
    },
    { 
      name: language === "hi" ? "à¤¹à¥‹à¤²à¤¸à¥‡à¤²à¤°à¥à¤¸ (à¤¥à¥‹à¤• à¤µà¤¿à¤•à¥à¤°à¥‡à¤¤à¤¾)" : "Wholesalers", 
      image: "/images/wholesalers_b2b.jpg", 
      copy: language === "hi" ? "à¤‰à¤šà¥à¤š à¤®à¤¾à¤¤à¥à¤°à¤¾ à¤®à¥‡à¤‚ à¤•à¤ªà¤¡à¤¼à¥‡ à¤•à¤¾ à¤ªà¥à¤°à¤¸à¤‚à¤¸à¥à¤•à¤°à¤£ à¤”à¤° à¤µà¤¿à¤¶à¥à¤µà¤¸à¤¨à¥€à¤¯ à¤…à¤–à¤¿à¤² à¤­à¤¾à¤°à¤¤à¥€à¤¯ à¤ªà¤°à¤¿à¤µà¤¹à¤¨ à¤—à¤²à¤¿à¤¯à¤¾à¤°à¥‡à¥¤" : "Bulk lot assortments, direct spinning mill pricing, and dedicated pan-India logistics corridors." 
    },
    { 
      name: language === "hi" ? "à¤¡à¤¿à¤¸à¥à¤Ÿà¥à¤°à¥€à¤¬à¥à¤¯à¥‚à¤Ÿà¤°à¥à¤¸ (à¤µà¤¿à¤¤à¤°à¤•)" : "Distributors", 
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800", 
      copy: language === "hi" ? "à¤®à¥Œà¤¸à¤®à¥€ à¤¸à¤®à¤¯-à¤¸à¤¾à¤°à¤¿à¤£à¥€ à¤•à¥‡ à¤…à¤¨à¥à¤¸à¤¾à¤° à¤•à¤¸à¥à¤Ÿà¤® à¤‰à¤¤à¥à¤ªà¤¾à¤¦à¤¨ à¤šà¤•à¥à¤° à¤”à¤° à¤¨à¤¿à¤°à¤‚à¤¤à¤° à¤—à¥à¤£à¤µà¤¤à¥à¤¤à¤¾à¥¤" : "Regional inventory pipelines, volume consistency, and structured production cycles for seasonal retail demand." 
    },
    { 
      name: language === "hi" ? "à¤«à¥ˆà¤¶à¤¨ à¤¬à¥à¤°à¤¾à¤‚à¤¡à¥à¤¸" : "Fashion Brands", 
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800", 
      copy: language === "hi" ? "à¤µà¥à¤¹à¤¾à¤‡à¤Ÿ-à¤²à¥‡à¤¬à¤²à¤¿à¤‚à¤— à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£, à¤•à¤¸à¥à¤Ÿà¤® à¤Ÿà¥ˆà¤—, à¤µà¤¿à¤¶à¥‡à¤· à¤«à¥ˆà¤¬à¥à¤°à¤¿à¤• à¤”à¤° à¤—à¥à¤£à¤µà¤¤à¥à¤¤à¤¾ à¤¨à¤¿à¤¯à¤‚à¤¤à¥à¤°à¤£à¥¤" : "Full white-label OEM execution, custom sizing tech packs, woven branding tags, and export-grade packaging." 
    },
    { 
      name: language === "hi" ? "à¤¨à¤ à¤µà¥à¤¯à¤µà¤¸à¤¾à¤¯" : "New Businesses", 
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=800", 
      copy: language === "hi" ? "à¤‰à¤¤à¥à¤ªà¤¾à¤¦ à¤šà¤¯à¤¨, à¤¸à¤¾à¤‡à¤œ à¤°à¥‡à¤¶à¤¿à¤¯à¥‹ à¤”à¤° à¤…à¤¹à¤®à¤¦à¤¾à¤¬à¤¾à¤¦ à¤•à¤ªà¤¡à¤¼à¤¾ à¤¬à¤¾à¤œà¤¾à¤° à¤®à¥‡à¤‚ à¤¸à¤¹à¥€ à¤–à¤°à¥€à¤¦à¤¾à¤°à¥€ à¤ªà¤° à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤¨à¥¤" : "Strategic buying advisory, size-ratio planning, fast-selling style curation, and low capital risk sampling." 
    },
  ];

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.author || !newReviewForm.text) {
      setReviewMessage(language === "hi" ? "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¸à¤­à¥€ à¤«à¤¼à¥€à¤²à¥à¤¡ à¤­à¤°à¥‡à¤‚à¥¤" : "Please fill in all fields.");
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
        setReviewMessage(language === "hi" ? "à¤§à¤¨à¥à¤¯à¤µà¤¾à¤¦ï¼ à¤†à¤ªà¤•à¥€ à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤¬à¤®à¤¿à¤Ÿ à¤•à¤° à¤¦à¥€ à¤—à¤ˆ à¤¹à¥ˆà¥¤ à¤µà¥à¤¯à¤µà¤¸à¥à¤¥à¤¾à¤ªà¤• à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤¸à¥à¤µà¥€à¤•à¥ƒà¤¤ à¤¹à¥‹à¤¨à¥‡ à¤•à¥‡ à¤¬à¤¾à¤¦ à¤¯à¤¹ à¤¸à¤¾à¤‡à¤Ÿ à¤ªà¤° à¤¦à¤¿à¤–à¤¾à¤ˆ à¤¦à¥‡à¤—à¥€à¥¤" : "Thank you! Your review has been submitted for verification. It will appear on the site once approved by the admin.");
        setNewReviewForm({ author: "", rating: 5, text: "", date: "Today" });
      } else {
        setReviewMessage(language === "hi" ? "à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤¸à¤¬à¤®à¤¿à¤Ÿ à¤•à¤°à¤¨à¥‡ à¤®à¥‡à¤‚ à¤µà¤¿à¤«à¤²à¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥à¤¨: à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤" : "Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setReviewMessage(language === "hi" ? "à¤à¤• à¤¤à¥à¤°à¥à¤Ÿà¤¿ à¤¹à¥à¤ˆà¥¤ à¤•à¥ƒà¤ªà¤¯à¤¾ à¤ªà¥à¤¨: à¤ªà¥à¤°à¤¯à¤¾à¤¸ à¤•à¤°à¥‡à¤‚à¥¤" : "An error occurred. Please try again.");
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

  useEffect(() => {
    if (!advertisements || advertisements.length === 0) return;
    
    const activePopup = advertisements.find(ad => ad.placement === "popup" && ad.isActive && !hiddenAdIds.includes(ad.id));
    if (activePopup && !recordedAdIds.current.has(activePopup.id)) {
      recordedAdIds.current.add(activePopup.id);
      recordAdAction(activePopup.id, "impression");
    }

    const activeMidpage = advertisements.find(ad => ad.placement === "midpage" && ad.isActive && !hiddenAdIds.includes(ad.id));
    if (activeMidpage && !recordedAdIds.current.has(activeMidpage.id)) {
      recordedAdIds.current.add(activeMidpage.id);
      recordAdAction(activeMidpage.id, "impression");
    }

    const activeFooter = advertisements.find(ad => ad.placement === "footer" && ad.isActive && !hiddenAdIds.includes(ad.id));
    if (activeFooter && !recordedAdIds.current.has(activeFooter.id)) {
      recordedAdIds.current.add(activeFooter.id);
      recordAdAction(activeFooter.id, "impression");
    }

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

  const handleSolutionHover = (idx: number) => {
    setActiveSolution(idx);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#FAF8F5] text-[#1A1A1A] selection:bg-[#F5B014] selection:text-[#181511]">
      <main>
        {/* 1. Fullscreen Hero Slider & Marquee Ticker */}
        <HeroSlider />

        {/* 2. About Himat Textile / Your Garment Guide in Ahmedabad */}
        <section id="about" className="relative overflow-hidden bg-[#FAF8F5] px-5 py-20 text-[#171A1D] sm:px-8 lg:px-12 lg:py-28 border-b border-[rgba(23,26,29,0.12)]">
          <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-[11px] font-semibold text-[#FE6311] uppercase tracking-[0.18em] block">
                  ABOUT HIMAT TEXTILE
                </span>
                <p className="font-mono text-xs font-semibold text-[#171A1D]/60 uppercase tracking-[0.12em]">
                  YOUR GARMENT GUIDE IN AHMEDABAD
                </p>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[0.95] tracking-tight text-[#171A1D]">
                We Connect You With<br />
                <em className="italic text-[#FE6311]">The Right Garments.</em>
              </h2>

              <p className="text-base font-medium text-[#171A1D]/90 leading-relaxed max-w-xl">
                Himat Textile is a B2B garment sourcing and buying support partner based in Ahmedabad, helping retailers, wholesalers, resellers and growing fashion businesses find the right products from reliable suppliers.
              </p>

              <p className="text-sm leading-relaxed text-[#171A1D]/80 max-w-xl">
                We understand that garment sourcing is more than just finding a product. It is about getting the right quality, right price, right supplier and right support for your business.
              </p>

              <p className="text-sm leading-relaxed text-[#171A1D]/75 max-w-xl">
                With strong knowledge of Ahmedabad’s garment market and a wide network of B2B suppliers, we make the buying process simpler, faster and more transparent.
              </p>

              {/* WHAT WE DO (5 Clean Minimal Cards) */}
              <div className="pt-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#171A1D]/60 block mb-3">
                  WHAT WE DO
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                  {[
                    { title: "Product Sourcing", desc: "Find garments according to your category, quality, style and budget." },
                    { title: "Supplier Connection", desc: "Connect with suitable manufacturers, wholesalers and suppliers." },
                    { title: "Price & Deal Support", desc: "Help you understand market pricing and negotiate better deals." },
                    { title: "Order Coordination", desc: "Stay connected with suppliers and help coordinate your requirements." },
                    { title: "Dispatch Support", desc: "Assist with packing, dispatch and communication until order moves forward." },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="bg-[#FFFFFF] border border-[rgba(23,26,29,0.08)] p-4 rounded-[3px] shadow-2xs hover:border-[#FE6311]/40 transition-colors"
                    >
                      <h4 className="font-serif text-sm font-semibold text-[#171A1D] uppercase tracking-wide mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#171A1D]/70 leading-relaxed m-0">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* OUR APPROACH */}
              <div className="bg-[#FFFFFF] border border-[rgba(23,26,29,0.12)] p-6 rounded-[4px] max-w-xl space-y-3 shadow-xs">
                <span className="font-mono text-[9.5px] font-bold text-[#FE6311] uppercase tracking-wider block">
                  OUR APPROACH
                </span>
                <p className="font-serif text-lg sm:text-xl font-semibold text-[#171A1D]">
                  Right Product • Right Supplier • Right Deal
                </p>
                <p className="text-xs sm:text-sm text-[#171A1D]/75 leading-relaxed m-0">
                  We don’t believe in simply selling you a product. We help you find what fits your business. From your first requirement to supplier coordination and dispatch, Himat Textile is here to make garment sourcing easier.
                </p>
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/919873938095?text=Hello%20Himat%20Textile,%20I%20am%20looking%20for%20garments%20in%20Ahmedabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WHATSAPP US</span>
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      triggerInquiryForCategory({
                        categoryTitle: "Market Guidance",
                        variantName: "Ahmedabad Garment Sourcing & Buying Support",
                      })
                    }
                    className="inline-flex items-center gap-2 bg-[#171A1D] hover:bg-[#2D3236] text-[#FFFAF4] px-5 py-3 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>START ENQUIRY</span>
                    <ArrowUpRight size={14} className="text-[#FFB51A]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Clean Ground Working Photo */}
            <div>
              <div className="relative overflow-hidden border border-[rgba(23,26,29,0.12)] bg-[#FFFFFF] rounded-[4px] shadow-md group">
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EFE9DF]">
                  <img
                    src="/images/ahmedabad_market_gheekanta.jpg"
                    alt="Ahmedabad Garment Wholesale Market Hub"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 bg-[#FFFFFF] border-t border-[rgba(23,26,29,0.08)]">
                  <p className="font-serif text-base font-semibold text-[#171A1D] mb-1">
                    Ahmedabad Garment Market Hub
                  </p>
                  <p className="text-xs text-[#171A1D]/70 leading-relaxed m-0">
                    On-ground coordination across Gheekanta, New Cloth Market, and local manufacturing clusters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured Brands Marquee */}
        <section className="bg-[#F3EFEA] py-8 text-[#1A1A1A] overflow-hidden border-y border-[#E2DDD5]">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <p className="mono-label text-[9px] font-bold text-[#66625D] uppercase tracking-widest text-center mb-4">
              {language === "hi" ? "à¤¹à¤®à¤¾à¤°à¥‡ à¤¨à¥‡à¤Ÿà¤µà¤°à¥à¤• à¤¸à¥‡ à¤¸à¥‹à¤°à¥à¤¸à¤¿à¤‚à¤— à¤•à¤°à¤¨à¥‡ à¤µà¤¾à¤²à¥‡ à¤¬à¥à¤°à¤¾à¤‚à¤¡à¥à¤¸ à¤”à¤° à¤ªà¤¾à¤°à¥à¤Ÿà¤¨à¤°à¥à¤¸" : "TRUSTED SOURCING PARTNERS & BRANDS ACROSS INDIA"}
            </p>
            <div className="flex select-none overflow-hidden">
              <div className="marquee-track flex shrink-0 items-center whitespace-nowrap font-serif-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#1A1A1A]/40">
                {(() => {
                  const list = brands && brands.length > 0
                    ? brands
                    : [
                        { name: "VOGUE WEAR", logoUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=120" },
                        { name: "STYLE CREW", logoUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=120" },
                        { name: "URBAN CLOSET", logoUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=120" },
                        { name: "STITCH STUDIO", logoUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=120" },
                        { name: "FASHION CO", logoUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=120" },
                        { name: "TREND SHAPER", logoUrl: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=120" }
                      ];
                  const repeated = Array(6).fill(list).flat();
                  return repeated.map((brand, idx) => (
                    <React.Fragment key={`${brand.name}-${idx}`}>
                      <span className="mx-8 hover:text-[#FE6311] transition-colors inline-flex items-center gap-3">
                        {brand.logoUrl && (
                          <img
                            src={brand.logoUrl}
                            alt={brand.name}
                            className="h-6 w-6 rounded-full object-cover grayscale opacity-45 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        <span className="font-bold">{brand.name}</span>
                      </span>
                      <span className="mx-4 text-[#F5B014] select-none">â—†</span>
                    </React.Fragment>
                  ));
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Garment Systems / Sourcing Catalogue (Matching Garment Screen) */}
        <section id="categories" className="bg-[#FAF8F5] border-b border-[rgba(23,26,29,0.12)] text-[#171A1D]">
          {/* Header Banner */}
          <div className="pt-20 pb-12 px-5 sm:px-8 lg:px-12 max-w-[1320px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="font-mono text-[9px] font-bold text-[#FE6311] bg-[#FFFAF4] px-3.5 py-1.5 rounded-full uppercase block mb-3 w-fit shadow-xs">
                  HT/003 — B2B SOURCING CATALOGUE
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[0.92] tracking-tight text-[#171A1D]">
                  Every category.<br />
                  <em className="italic text-[#FE6311]">Its own sourcing system.</em>
                </h2>
              </div>
              <p className="max-w-md text-sm text-[#171A1D]/75 leading-relaxed">
                Explore readymade apparel production lines and bulk mill fabrics. Select any card to expand high-detail cuts, stitch specifications, and color availability.
              </p>
            </div>
          </div>

          {/* Enhanced Category Chips Filter Bar */}
          <CategoryChipsFilter
            selectedFilter={selectedCategoryFilter}
            onSelectFilter={setSelectedCategoryFilter}
            categories={HIMAT_CATEGORIES}
          />

          {/* Category Decks List (Alternating expanding cards) */}
          <div className="filtered-categories">
            {(selectedCategoryFilter === "all"
              ? HIMAT_CATEGORIES
              : HIMAT_CATEGORIES.filter((c) => c.id === selectedCategoryFilter)
            ).map((category) => (
              <HimatCategoryDeck key={category.id} category={category} />
            ))}
          </div>

          {/* Specification-Led Quote CTA Banner */}
          <div className="uniforms-cta bg-[#F3EEE5] py-16 sm:py-20 px-6 sm:px-12 border-t border-b border-[rgba(23,26,29,0.12)]">
            <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-[#FE6311] uppercase tracking-wider bg-[#FFFAF4] px-3.5 py-1.5 rounded-[2px] border border-[rgba(254,99,17,0.2)] shadow-xs mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FE6311]" />
                  NEED A SPECIFICATION-LED QUOTE?
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[0.95] tracking-tight text-[#171A1D]">
                  Bring the brief.<br />
                  <em className="italic text-[#FE6311]">We’ll build the garment.</em>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#171A1D]/75 leading-relaxed">
                  Connect directly with our Ahmedabad manufacturing desk. Share your required quantities, target price points, or custom tech packs for instant lot availability and doorstep freight estimates.
                </p>

                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-[rgba(23,26,29,0.1)] text-xs text-[#171A1D]/80 font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-[#FE6311] font-bold">✓</span> Direct Mill Pricing
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-[#FE6311] font-bold">✓</span> Custom Tech Pack Support
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-[#FE6311] font-bold">✓</span> Pan-India Logistics
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto lg:min-w-[280px] shrink-0">
                <a
                  href="https://wa.me/919873938095?text=Hello%20Himat%20Textile,%20I%20want%20to%20inquire%20about%20bulk%20garment%20sourcing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5B] text-white px-7 py-4 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>CONNECT ON WHATSAPP</span>
                </a>
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#171A1D] hover:bg-[#2D3236] text-[#FFFAF4] px-7 py-4 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>EXPLORE FULL CATALOG</span>
                  <ArrowUpRight size={16} className="text-[#FFB51A]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. White Labeling & Private Label Atelier (Komal Creation Inspired) */}
        <section id="white-labeling" className="brand-lab-section relative overflow-hidden bg-[#E4DBD0] text-[#171A1D] border-t border-[rgba(23,26,29,0.12)]">
          <div className="max-w-[1320px] mx-auto">
            {/* Top Heading Row */}
            <div className="brand-lab-heading">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9.5px] font-bold text-[#FE6311] bg-[#FFFAF4] px-3.5 py-1.5 rounded-[2px] uppercase inline-flex items-center gap-2 border border-[rgba(254,99,17,0.2)] shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FE6311]" />
                    HT/005 — WHITE LABELING & PRIVATE LABEL ATELIER
                  </span>
                  <span className="hidden sm:inline-flex maker-seal text-[9px] font-mono text-[#171A1D]/60 border border-dashed border-[#171A1D]/30 px-2.5 py-0.5 rounded-full">
                    Himat Textile / Atelier
                  </span>
                </div>

                <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.9] tracking-tight text-[#171A1D]">
                  Your Brand.<br />
                  <em className="italic text-[#FE6311]">Your Labels.</em><br />
                  Our Mill Access.
                </h2>

                <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[#171A1D]/75">
                  From tech pack specification to final carton dispatch, we manufacture ready-to-sell apparel collections under your brand with customized woven tags, branded trims, graded size charts, and retail packaging.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      triggerInquiryForCategory({
                        categoryTitle: "White Labeling",
                        variantName: "Private Label Collection",
                        fabric: "Custom Mill Weaves & Trims",
                      })
                    }
                    className="inline-flex items-center gap-2.5 bg-[#171A1D] hover:bg-[#2D3236] text-[#FFFAF4] px-7 py-4 text-xs font-mono font-bold tracking-wider rounded-[3px] shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>START YOUR LABEL BRIEF</span>
                    <ArrowUpRight size={16} className="text-[#FFB51A]" />
                  </button>

                  <Link
                    href="/white-labeling"
                    className="inline-flex items-center gap-2 px-6 py-4 text-xs font-mono font-bold tracking-wider text-[#171A1D] hover:text-[#FE6311] transition-colors border-b border-current"
                  >
                    <span>EXPLORE ATELIER CAPABILITY</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Atelier Callout Box (Signature Komal Creation Stamp) */}
              <div className="brand-lab-callout">
                <span>Your Brand / Our Floor</span>
                <strong>
                  Made from<br />
                  <em>your brief.</em>
                </strong>
                <p className="text-xs text-[#FFFAF4]/85 leading-relaxed m-0 font-sans">
                  Private-label readymade apparel and home furnishings manufactured to your exact GSM, cut, and finishing.
                </p>
                <small>Apparel · Woven Damask · Trims · Packaging</small>
              </div>
            </div>

            {/* 3 Iconic Architecture Step Cards (Komal Creation Style) */}
            <div className="brand-lab-steps">
              {/* Step 1 */}
              <article className="brand-step group">
                <div className="brand-step-image">
                  <img
                    src="/manus-storage/mafatlal-materials-detail_6b9c0b66.jpg"
                    alt="Custom design and tech pack verification"
                    loading="lazy"
                  />
                  <span className="brand-step-number">01</span>
                </div>
                <div className="brand-step-copy">
                  <small>BRIEF THE IDEA / PATTERN · FIT · PALETTE</small>
                  <h3>Start with your product concept.</h3>
                  <p>
                    Bring a reference sample, technical sketch, or market benchmark. We align custom pattern grading, fabric composition, GSM, and target retail price points.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[rgba(23,26,29,0.08)] text-[10px] font-mono font-semibold text-[#171A1D]/70">
                    <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-[2px]">Custom Patterns</span>
                    <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-[2px]">Graded Sizing</span>
                    <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-[2px]">Mill Lab Dips</span>
                  </div>
                </div>
              </article>

              {/* Step 2 */}
              <article className="brand-step group">
                <div className="brand-step-image">
                  <img
                    src="/manus-storage/mafatlal-tailoring_9872bd9e.jpg"
                    alt="Sample development and precision stitching"
                    loading="lazy"
                  />
                  <span className="brand-step-number">02</span>
                </div>
                <div className="brand-step-copy">
                  <small>BUILD THE SAMPLE / STITCH · EMBROIDERY · PRINT</small>
                  <h3>Turn it into an approved piece.</h3>
                  <p>
                    Our sample masters cut, stitch, and finish pre-production prototypes. Review real drape, seam strength, pocket placement, and wash feel before bulk cutting begins.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[rgba(23,26,29,0.08)] text-[10px] font-mono font-semibold text-[#171A1D]/70">
                    <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-[2px]">Pre-Prod Sample</span>
                    <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-[2px]">Screen & Digital Print</span>
                    <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-[2px]">Durability QC</span>
                  </div>
                </div>
              </article>

              {/* Step 3 */}
              <article className="brand-step group">
                <div className="brand-step-image">
                  <img
                    src="/manus-storage/stitchform-private-label_b6cb424d.jpg"
                    alt="Private label branding, packaging and dispatch"
                    loading="lazy"
                  />
                  <span className="brand-step-number">03</span>
                </div>
                <div className="brand-step-copy">
                  <small>LABEL FOR LAUNCH / TAGS · PACKAGING · DISPATCH</small>
                  <h3>Put your name on every garment.</h3>
                  <p>
                    Woven neck damask labels, branded satin wash-care tags, custom hangtags, branded buttons, barcode stickers, and retail polybags packaged into shelf-ready cartons.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[rgba(23,26,29,0.08)] text-[10px] font-mono font-semibold text-[#171A1D]/70">
                    <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-[2px]">Woven Damask</span>
                    <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-[2px]">Custom Hangtags</span>
                    <span className="bg-[#EFE9DF] px-2.5 py-1 rounded-[2px]">Pan-India Logistics</span>
                  </div>
                </div>
              </article>
            </div>

            {/* Bottom 6-Step Capabilities Horizontal Ribbon */}
            <div className="mt-14 pt-8 border-t border-[rgba(23,26,29,0.12)]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { step: "01", name: "Custom Tech Packs", desc: "Fits, sizing & styling specs" },
                  { step: "02", name: "Mill-Direct Fabrics", desc: "Quality yarn & precision shades" },
                  { step: "03", name: "Physical Sampling", desc: "Fit verification before cutting" },
                  { step: "04", name: "Bulk Production", desc: "Rigid stitch & wash QC lines" },
                  { step: "05", name: "Custom Packaging", desc: "Woven tags, barcodes & boxes" },
                  { step: "06", name: "Pan-India Freight", desc: "Doorstep transport corridors" },
                ].map((cap) => (
                  <div key={cap.step} className="bg-[#FFFAF4]/80 border border-[rgba(23,26,29,0.08)] p-3.5 rounded-[3px]">
                    <span className="font-mono text-[10px] font-bold text-[#FE6311] block mb-1">
                      {cap.step}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-[#171A1D] leading-tight mb-1">
                      {cap.name}
                    </h4>
                    <p className="text-[11px] text-[#171A1D]/70 leading-snug m-0">
                      {cap.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Client Profiles / Sourcing Ecosystem (Interactive Segment Hover) */}
        <section className="relative overflow-hidden bg-[#FAF8F5] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 border-t border-[#E2DDD5]">
          <div className="relative mx-auto max-w-[1280px]">
            <span className="mono-label text-[9px] font-bold text-[#E94B0C] uppercase block mb-2 bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs w-fit shadow-xs">
              [ {t("solutions_label")} ]
            </span>
            <h2 className="mt-2 font-serif-display text-4xl font-black uppercase tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl">
              {t("solutions_title")}
            </h2>
            
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] mt-12">
              <div className="divide-y divide-[#E2DDD5] border-t border-b border-[#E2DDD5]">
                {translatedSolutions.map((sol, idx) => (
                  <div
                    key={sol.name}
                    onMouseEnter={() => handleSolutionHover(idx)}
                    onClick={() => handleSolutionHover(idx)}
                    className={`group py-7 flex flex-col justify-between md:flex-row md:items-center cursor-pointer transition-all ${
                      activeSolution === idx ? "border-l-4 border-[#F5B014] pl-4 bg-[#FFFFFF] shadow-xs rounded-r-xs" : ""
                    }`}
                  >
                    <h3 className={`font-serif-display text-2xl font-black uppercase tracking-tight transition-colors sm:text-3xl md:text-4xl ${
                      activeSolution === idx ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40 group-hover:text-[#1A1A1A]"
                    }`}>
                      {sol.name}
                    </h3>
                    <p className={`mt-2 max-w-sm text-xs sm:text-sm transition-colors md:mt-0 ${
                      activeSolution === idx ? "text-[#1A1A1A] font-medium" : "text-[#66625D]/70 group-hover:text-[#66625D]"
                    }`}>
                      {sol.copy}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dynamic Solution Image Preview */}
              <div className="hidden lg:block relative h-full min-h-[420px] border border-[#E2DDD5] bg-[#FFFFFF] overflow-hidden rounded-xs shadow-sm">
                {translatedSolutions.map((sol, idx) => (
                  <div
                    key={`sol-img-${idx}`}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      activeSolution === idx ? "opacity-95 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    }`}
                  >
                    <img
                      src={sol.image}
                      alt={sol.name}
                      className="w-full h-full object-cover transition-transform duration-[4000ms] hover:scale-105"
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="mono-label text-[8.5px] text-[#FFD44D] tracking-widest block mb-1 font-bold uppercase">0{activeSolution + 1} / CLIENT SEGMENTS</span>
                  <h4 className="font-serif-display text-2xl font-black uppercase text-white tracking-wider">{translatedSolutions[activeSolution]?.name}</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Business Guide Section (Advisory-Style Sourcing Intelligence) */}
        <section className="bg-[#FFFFFF] py-24 px-5 sm:px-8 lg:px-12 border-t border-[#E2DDD5] text-[#1A1A1A]">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <span className="mono-label text-[9px] font-bold text-[#E94B0C] tracking-widest uppercase bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs inline-block shadow-xs">
                  [ B2B SOURCING ADVISORY ]
                </span>
                <h2 className="font-serif-display text-4xl font-black uppercase tracking-tight text-[#1A1A1A] sm:text-5xl lg:text-6xl leading-none">
                  YOUR GARMENT GUIDE<br /><span className="italic font-normal text-[#FE6311]">IN AHMEDABAD.</span>
                </h2>
                <p className="text-sm font-bold text-[#FE6311]">
                  Buying garments is not only about finding products. It's about finding the RIGHT products, RIGHT quantities and RIGHT price.
                </p>
                <div className="h-px bg-[#E2DDD5] w-24" />
                <p className="text-xs sm:text-sm leading-relaxed text-[#66625D]">
                  We guide you through the textile markets of Ahmedabad to select fast-moving apparel lines, reduce dead stock risk, and match seasonal retail buying calendars.
                </p>
                <div className="pt-2">
                  <Link
                    href="/#enquiry"
                    className="gold-button inline-flex items-center gap-2 px-7 py-4 text-[10.5px] font-black uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 rounded-xs shadow-sm"
                  >
                    TALK TO OUR GARMENT TEAM <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="grid gap-5">
                {[
                  { step: "01", title: "Product Selection", desc: "Choose commercially relevant varieties suited to your target retail segment." },
                  { step: "02", title: "Stock Planning", desc: "Avoid overstocking and reduce dead inventory capital lock-ups." },
                  { step: "03", title: "Size-Wise Buying", desc: "Plan size ratios and color quantities according to actual regional demand." },
                  { step: "04", title: "Variety Management", desc: "Offer more compelling variety without blocking excessive working capital." },
                  { step: "05", title: "Purchasing Guidance", desc: "Make smarter buying decisions direct from verified Ahmedabad mills." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-5 border-b border-[#E2DDD5] pb-4 items-start">
                    <span className="font-mono text-xs font-bold text-[#252525] bg-[#FFB51A] px-2 py-0.5 rounded-xs shrink-0 mt-1">{item.step}</span>
                    <div>
                      <h3 className="font-serif-display text-base font-bold uppercase tracking-wider text-[#1A1A1A]">{item.title}</h3>
                      <p className="mt-1 text-xs text-[#66625D] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. India Network Map Section */}
        <IndiaNetwork />

        {/* 10. Global Apparel Export Section (Warm Dark Charcoal Background) */}
        <section className="bg-[#141414] py-24 px-5 sm:px-8 lg:px-12 text-[#FAF8F5] border-t border-black/30">
          <div className="mx-auto max-w-[1280px]">
            <span className="mono-label text-[9px] font-bold text-[#F5B014] uppercase block tracking-wider">// GLOBAL APPAREL EXPORTS</span>
            <div className="grid gap-12 border-t border-white/15 pt-6 mt-4 lg:grid-cols-2">
              <h2 className="font-serif-display text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl sm:leading-[0.94] text-[#FAF8F5]">
                FROM AHMEDABAD<br /><span className="italic font-normal text-[#F5B014]">TO GLOBAL MARKETS.</span>
              </h2>
              <div className="space-y-8">
                <p className="text-sm leading-relaxed text-[#FAF8F5]/85">
                  Leveraging our manufacturing connections and quality control protocols, Himat Textile supports international apparel buyers, retail chains, and distributors with reliable export supply from India.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: "Sourcing", desc: "Scalable volume capacities across woven, knitted, and ethnic apparel lines." },
                    { title: "Production QC", desc: "Rigid sizing checks, shrinkage control, and colorfastness inspections." },
                    { title: "White Labeling", desc: "Custom private labelling, barcode tagging, and export polybag packaging." },
                    { title: "Export Support", desc: "Customs documentation, bill of lading, and port logistics coordination." }
                  ].map(item => (
                    <div key={item.title} className="border border-white/15 bg-white/5 p-5 rounded-xs shadow-xs hover:border-[#F5B014] transition-colors">
                      <ShieldCheck size={20} className="text-[#F5B014]" />
                      <h4 className="mt-4 font-serif-display text-base font-bold uppercase tracking-wider text-[#FAF8F5]">{item.title}</h4>
                      <p className="mt-1 text-xs text-[#FAF8F5]/75 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Link
                    href="/#enquiry"
                    className="gold-button inline-flex items-center gap-2 px-7 py-4 text-[10.5px] font-black uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 rounded-xs shadow-md"
                  >
                    DISCUSS YOUR REQUIREMENT <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Price Architecture / Segments Section */}
        <section className="bg-[#FAF8F5] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 border-t border-[#E2DDD5] text-[#1A1A1A]">
          <div className="mx-auto max-w-[1280px]">
            <span className="mono-label text-[9px] font-bold text-[#E94B0C] uppercase tracking-wider bg-[#FFF9E6] px-3.5 py-1.5 rounded-xs inline-block mb-3 shadow-xs">
              [ PRICE SEGMENTS ]
            </span>
            <h2 className="font-serif-display text-4xl font-black uppercase tracking-tight text-[#1A1A1A] sm:text-5xl">
              TAILORED FOR YOUR<br /><span className="italic font-normal text-[#FE6311]">BUSINESS MODEL.</span>
            </h2>
            
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  name: language === "hi" ? "वैल्यू सेगमेंट (बजट रेंज)" : "Value Segment",
                  desc: language === "hi" ? "बड़े खुदरा अभियानों के लिए प्रतिस्पर्धी शुरुआती मूल्य, बिना किसी फैब्रिक गुणवत्ता समझौते के लागत-प्रभावी मिश्रण।" : "Competitive entry-level pricing for mass retail campaigns, utilizing cost-effective blends without compromising fabric structure.",
                  isHighlight: false
                },
                {
                  name: language === "hi" ? "मिड-रेंज (मध्यम श्रृंखला)" : "Mid-Range",
                  desc: language === "hi" ? "कार्ड्ड और कंघी वाले सूती कपड़े, संरचित बुनावट, और मानक धुलाई प्रक्रिया। उभरते फैशन स्टोर के लिए सर्वश्रेष्ठ।" : "Standard retail qualities including carded and combed cotton, structured knits, and standard washes. Best for emerging fashion stores.",
                  isHighlight: false
                },
                {
                  name: language === "hi" ? "प्रीमियम रेंज" : "Premium Range",
                  desc: language === "hi" ? "उच्च गुणवत्ता वाले जैविक कपड़े, विस्तृत धुलाई तकनीक, कस्टम ट्रिम्स और लक्जरी फिनिशिंग।" : "High-grade organic fabrics, detailed wash techniques, heavy weight options, custom trims, and luxury finishing processes.",
                  isHighlight: true
                }
              ].map(item => (
                <div 
                  key={item.name} 
                  className={`flex flex-col justify-between p-7 rounded-xs transition-all hover:-translate-y-1.5 hover:shadow-xl shadow-xs ${
                    item.isHighlight 
                      ? "border-2 border-[#F5B014] bg-[#FFFFFF] shadow-md" 
                      : "border border-[#E2DDD5] bg-[#FFFFFF] hover:border-[#F5B014]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif-display text-xl font-bold uppercase tracking-wider text-[#1A1A1A]">{item.name}</h3>
                      {item.isHighlight && (
                        <span className="mono-label text-[8px] font-bold text-[#252525] bg-[#FFB51A] px-2 py-0.5 rounded-xs">
                          FLAGSHIP
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#66625D]">{item.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      triggerInquiryForCategory({
                        categoryTitle: item.name,
                        variantName: `${item.name} Sourcing Tier`,
                      })
                    }
                    className="mt-6 pt-4 border-t border-[#E2DDD5] flex items-center justify-between w-full text-xs font-mono font-bold text-[#1A1A1A] hover:text-[#FE6311] transition-colors cursor-pointer"
                  >
                    <span>{language === "hi" ? "इस सेगमेंट की पूछताछ करें" : "Inquire This Segment"}</span>
                    <ArrowUpRight size={15} className="text-[#FE6311]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12. Client Reviews Section */}
        <section className="bg-[#F3EFEA] px-5 py-24 text-[#1A1A1A] sm:px-8 lg:px-12 lg:py-32 border-t border-[#E2DDD5]">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-6">
                <span className="mono-label text-[9px] font-bold text-[#E94B0C] uppercase bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs inline-block shadow-xs">
                  [ B2B CLIENT TRUST ]
                </span>
                <h2 className="font-serif-display text-4xl font-black uppercase tracking-tight text-[#1A1A1A]">
                  WHAT OUR PARTNERS SAY.
                </h2>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-5xl font-serif-display font-black tracking-tighter text-[#1A1A1A]">5.0</span>
                  <div className="space-y-0.5">
                    <div className="flex text-[#F5B014] fill-[#F5B014]">
                      {Array(5).fill(0).map((_, i) => <Star key={i} size={17} fill="currentColor" />)}
                    </div>
                    <p className="text-[9.5px] uppercase font-bold text-[#66625D] tracking-wider">
                      Based on Verified B2B Wholesale Reviews
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#66625D] font-mono tracking-wider uppercase">
                  Consistent Quality & Delivery for Wholesalers & Retailers
                </p>
                <div className="pt-4">
                  <button
                    suppressHydrationWarning={true}
                    onClick={() => setIsReviewModalOpen(true)}
                    className="gold-button inline-flex items-center gap-2 px-7 py-4 text-[10.5px] font-black uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 rounded-xs shadow-sm"
                  >
                    WRITE A REVIEW
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                {(reviews && reviews.length > 0 ? reviews.filter(r => r.isActive) : fallbackReviews).map(rev => (
                  <div key={rev.id} className="border border-[#E2DDD5] bg-[#FFFFFF] p-6 rounded-xs shadow-xs hover:border-[#F5B014] transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="flex text-[#F5B014] fill-[#F5B014]">
                        {Array(rev.rating).fill(0).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                      <span className="text-[9px] font-mono font-bold text-[#FE6311] bg-[#FFF9E6] px-2 py-0.5 rounded-xs">{rev.date || (language === "hi" ? "à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤" : "VERIFIED")}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A] font-medium">"{rev.text}"</p>
                    <h4 className="mt-3 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{rev.author}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13. Google Map & Office Location Section */}
        <section className="bg-[#FFFFFF] border-y border-[#E2DDD5] text-[#1A1A1A] px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
              {/* Location Details */}
              <div className="space-y-8">
                <div>
                  <span className="mono-label text-[9px] font-bold text-[#E94B0C] tracking-widest uppercase bg-[#FFF9E6] border border-[#FFB51A]/40 px-3.5 py-1.5 rounded-xs inline-block mb-3 shadow-xs">
                    [ VISIT OUR SHOWROOM ]
                  </span>
                  <h2 className="font-serif-display text-4xl font-black uppercase tracking-tight sm:text-5xl text-[#1A1A1A]">
                    HEADQUARTERS
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <MapPin className="text-[#FE6311] shrink-0 mt-1" size={22} />
                    <div>
                      <h4 className="font-serif-display text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{t("loc_address_title")}</h4>
                      <p className="mt-1 text-sm text-[#66625D] leading-relaxed max-w-sm">
                        {t("loc_address_text")}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <Clock className="text-[#FE6311] shrink-0 mt-1" size={22} />
                    <div>
                      <h4 className="font-serif-display text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{t("loc_hours_title")}</h4>
                      <p className="mt-1 text-sm text-[#66625D]">
                        {t("loc_hours_text")}
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-4">
                    <Phone className="text-[#FE6311] shrink-0 mt-1" size={22} />
                    <div>
                      <h4 className="font-serif-display text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">{t("loc_call_title")}</h4>
                      <a href="tel:+919873938095" className="mt-1 text-sm text-[#FE6311] hover:underline font-mono font-bold">
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
                    className="gold-button inline-flex items-center gap-2 px-7 py-4 text-[10.5px] font-black uppercase tracking-[.18em] transition-transform hover:-translate-y-0.5 rounded-xs shadow-sm"
                  >
                    GET DIRECTIONS <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="relative border border-[#E2DDD5] overflow-hidden bg-[#FAF8F5] h-[440px] rounded-xs shadow-sm">
                <iframe
                  width="100%"
                  height="100%"
                  className="w-full h-full hover:contrast-105 transition-all duration-500"
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

        {/* 14. Enquiry Lead Generation */}
        <HimatInquiry />

        {/* 15. Final Brand Statement Section (Warm Dark Charcoal Background) */}
        <section className="bg-[#141414] py-24 px-5 sm:px-8 lg:px-12 border-t border-black/30 text-[#FAF8F5]">
          <div className="mx-auto max-w-[1280px] text-center space-y-6">
            <span className="mono-label text-[9px] font-bold text-[#F5B014] tracking-[0.25em] uppercase block">
              // {t("bs_location")}
            </span>
            <h2 className="font-serif-display text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF8F5]">
              <span className="block text-[#FAF8F5]">{t("bs_title_1")}</span>
              <span className="block italic text-[#F5B014]">{t("bs_title_2")}</span>
              <span className="block text-[#FAF8F5]">{t("bs_title_3")}</span>
            </h2>
            <div className="mx-auto h-0.5 bg-[#F5B014] w-20 my-4" />
            <p className="mx-auto max-w-2xl text-xs sm:text-sm font-medium tracking-wider text-[#FAF8F5]/85 uppercase leading-relaxed font-sans">
              {t("bs_subtitle")}
            </p>
          </div>
        </section>

        {/* Active Popup Overlay Advertisement */}
        {mounted && (() => {
          const activePopup = advertisements?.find(ad => ad.placement === "popup" && ad.isActive && !hiddenAdIds.includes(ad.id));
          if (!activePopup) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414]/85 p-5 backdrop-blur-sm">
              <div className="relative w-full max-w-lg border border-[#E2DDD5] bg-[#FFFFFF] p-8 text-[#1A1A1A] space-y-6 rounded-xs shadow-2xl">
                <button
                  onClick={() => handleHideAd(activePopup.id)}
                  className="absolute right-4 top-4 border border-[#1A1A1A]/20 bg-transparent px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:border-[#F5B014] hover:text-[#FE6311] rounded-xs"
                >
                  [X]
                </button>
                <div className="space-y-2">
                  <span className="mono-label text-[8.5px] font-bold text-[#FE6311] uppercase tracking-widest">{language === "hi" ? "à¤¸à¥€à¤®à¤¿à¤¤ à¤¸à¤®à¤¯ à¤…à¤²à¤°à¥à¤Ÿ" : "LIMITED TIME SOURCING ALERT"}</span>
                  <h3 className="font-serif-display text-2xl font-bold uppercase leading-none tracking-tight text-[#1A1A1A]">{activePopup.title}</h3>
                  {activePopup.description && <p className="text-sm leading-relaxed text-[#66625D]">{activePopup.description}</p>}
                </div>
                {activePopup.imageUrl && (
                  <img
                    src={activePopup.imageUrl}
                    alt="Highlight"
                    className="w-full h-48 object-cover border border-[#E2DDD5] rounded-xs"
                  />
                )}
                <div className="flex gap-4 pt-2">
                  {activePopup.linkUrl && (
                    <a
                      href={activePopup.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => recordAdAction(activePopup.id, "click")}
                      className="flex-1 gold-button py-3.5 text-center text-[10px] font-black uppercase tracking-widest rounded-xs transition-colors shadow-xs"
                    >
                      {activePopup.buttonText || (language === "hi" ? "à¤¸à¥Œà¤¦à¤¾ à¤¦à¥‡à¤–à¥‡à¤‚" : "View Deal")}
                    </a>
                  )}
                  <button
                    onClick={() => handleHideAd(activePopup.id)}
                    className="flex-1 border border-[#1A1A1A] bg-transparent py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] rounded-xs transition-colors hover:bg-[#F5B014] hover:text-[#181511] hover:border-[#F5B014]"
                  >
                    {language === "hi" ? "à¤¬à¤‚à¤¦ à¤•à¤°à¥‡à¤‚" : "Dismiss"}
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Review Submission Dialog Modal */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#141414]/85 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-lg border border-[#E2DDD5] bg-[#FFFFFF] p-8 text-[#1A1A1A] rounded-xs shadow-2xl">
              <button
                onClick={() => {
                  setIsReviewModalOpen(false);
                  setReviewMessage("");
                }}
                className="absolute right-4 top-4 text-[#66625D] hover:text-[#1A1A1A]"
              >
                <X size={20} />
              </button>

              <h3 className="font-serif-display text-2xl font-bold uppercase tracking-tight text-[#1A1A1A]">{t("rev_modal_title")}</h3>
              <p className="text-xs text-[#66625D] mt-1">{t("rev_modal_subtitle")}</p>

              <form onSubmit={handleReviewSubmit} className="mt-6 space-y-5">
                {/* Author Name */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] font-bold uppercase tracking-wider text-[#66625D] block">{t("rev_label_name")}</label>
                  <input
                    suppressHydrationWarning={true}
                    type="text"
                    required
                    placeholder={t("rev_placeholder_name")}
                    value={newReviewForm.author}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, author: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2DDD5] px-4 py-3 text-sm rounded-xs focus:border-[#F5B014] focus:outline-none"
                  />
                </div>

                {/* Stars Rating Selection */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] font-bold uppercase tracking-wider text-[#66625D] block">{t("rev_label_rating")}</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        suppressHydrationWarning={true}
                        key={star}
                        type="button"
                        onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                        className={`text-2xl ${newReviewForm.rating >= star ? "text-[#F5B014]" : "text-stone-300"}`}
                      >
                        â˜…
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] font-bold uppercase tracking-wider text-[#66625D] block">{t("rev_label_feedback")}</label>
                  <textarea
                    suppressHydrationWarning={true}
                    required
                    rows={4}
                    placeholder={t("rev_placeholder_feedback")}
                    value={newReviewForm.text}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, text: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#E2DDD5] px-4 py-3 text-sm rounded-xs focus:border-[#F5B014] focus:outline-none resize-none"
                  />
                </div>

                {/* Action Feedback */}
                {reviewMessage && (
                  <p className="text-xs text-[#1A1A1A] bg-[#FFF9E6] border border-[#FFB51A]/40 p-3 rounded-xs leading-relaxed font-mono font-semibold">
                    {reviewMessage}
                  </p>
                )}

                {/* Submit button */}
                <button
                  suppressHydrationWarning={true}
                  type="submit"
                  disabled={isReviewSubmitting}
                  className="w-full gold-button py-4 text-[10.5px] font-black uppercase tracking-[.18em] flex items-center justify-center gap-2 rounded-xs shadow-md"
                >
                  {isReviewSubmitting ? (
                    <>
                      {t("rev_btn_submitting")}
                      <LoaderCircle size={14} className="animate-spin" />
                    </>
                  ) : (
                    t("rev_btn_submit")
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}






