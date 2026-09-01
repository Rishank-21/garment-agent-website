"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ShieldCheck, Star, ArrowRight, X, LoaderCircle, MapPin, Clock, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Product, Advertisement, Review, Brand } from "@/lib/schema";

import { HimatInquiry } from "@/components/HimatInquiry";
import HeroSlider from "@/components/HeroSlider";
import HorizontalProducts from "@/components/HorizontalProducts";
import IndiaNetwork from "@/components/IndiaNetwork";
import gsap from "gsap";
import { useLanguage } from "@/lib/LanguageContext";

const fallbackReviews = [
  { id: 1, author: "Rajesh Kumar (Garment Retailer)", rating: 5, text: "Excellent collection of knitwear. Pricing is very B2B friendly. Delivery is always on time.", date: "1 week ago" },
  { id: 2, author: "Priya Sharma (Fashion Brand Owner)", rating: 5, text: "Sourced white-labeling women's wear from Himat. Quality of stitching and fabric selection is outstanding.", date: "3 weeks ago" },
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

  const { language, t } = useLanguage();

  const translatedSolutions = [
    { name: language === "hi" ? "रिटेलर्स (खुदरा विक्रेता)" : "Retailers", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800", copy: language === "hi" ? "त्वरित इन्वेंट्री पुनःपूर्ति के लिए तैयार कैटलॉग संग्रह।" : "Catalog collections ready for quick inventory replenishment." },
    { name: language === "hi" ? "होलसेलर्स (थोक विक्रेता)" : "Wholesalers", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?q=80&w=800", copy: language === "hi" ? "उच्च मात्रा में कपड़े का प्रसंस्करण और विश्वसनीय परिवहन।" : "High-volume fabric processing and reliable multi-city transport." },
    { name: language === "hi" ? "डिस्ट्रीब्यूटर्स (वितरक)" : "Distributors", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800", copy: language === "hi" ? "मौसमी समय-सारिणी के अनुसार कस्टम उत्पादन चक्र।" : "Bespoke production cycles mapped against seasonal schedules." },
    { name: language === "hi" ? "फैशन ब्रांड्स" : "Fashion Brands", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800", copy: language === "hi" ? "व्हाइट-लेवलिंग निर्माण, स्टाइलिंग विवरण, कस्टम टैग।" : "White-labeling manufacturing, styling details, custom tags." },
    { name: language === "hi" ? "नए व्यवसाय" : "New Businesses", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=800", copy: language === "hi" ? "उत्पाद चयन, स्टाइल और उत्पादन शुरू करने पर मार्गदर्शन।" : "Guidance on product selection, style curation, and wholesale sourcing." },
  ];

  useEffect(() => {
    console.log("Advertisements prop in HomeClient:", JSON.stringify(advertisements));
  }, [advertisements]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.author || !newReviewForm.text) {
      setReviewMessage(language === "hi" ? "कृपया सभी फ़ील्ड भरें।" : "Please fill in all fields.");
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
        setReviewMessage(language === "hi" ? "धन्यवाद! आपकी समीक्षा सत्यापन के लिए सबमिट कर दी गई है। व्यवस्थापक द्वारा स्वीकृत होने के बाद यह साइट पर दिखाई देगी।" : "Thank you! Your review has been submitted for verification. It will appear on the site once approved by the admin.");
        setNewReviewForm({ author: "", rating: 5, text: "", date: "Today" });
      } else {
        setReviewMessage(language === "hi" ? "समीक्षा सबमिट करने में विफल। कृपया पुन: प्रयास करें।" : "Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setReviewMessage(language === "hi" ? "एक त्रुटि हुई। कृपया पुन: प्रयास करें।" : "An error occurred. Please try again.");
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

  // B2B Hover transitions
  const handleSolutionHover = (idx: number) => {
    setActiveSolution(idx);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#C89A3D] selection:text-[#FFFFFF]">
      <main>
        {/* 1. Fullscreen Hero Slider */}
        <HeroSlider />

        {/* 2. Trust Strip Marquee */}
        <section className="relative overflow-hidden border-y border-[#E8E2D8] bg-[#F6F3ED] py-4 text-[#1A1A1A]">
          <div className="flex select-none overflow-hidden">
            <div className="marquee-track flex shrink-0 items-center whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
              {Array(4).fill(0).map((_, i) => (
                <React.Fragment key={i}>
                  <span>{t("strip_text_1")}</span>
                  <span className="mx-6 text-[#C89A3D]">•</span>
                  <span>{t("strip_text_2")}</span>
                  <span className="mx-6 text-[#C89A3D]">•</span>
                  <span>{t("strip_text_3")}</span>
                  <span className="mx-6 text-[#C89A3D]">•</span>
                  <span>{t("strip_text_4")}</span>
                  <span className="mx-6 text-[#C89A3D]">•</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* 3. About / Our Story (Page 2: Who We Are) */}
        <section id="about" className="relative overflow-hidden bg-[#FFFFFF] px-5 py-20 text-[#1A1A1A] sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-widest block">// WHO WE ARE</span>
              <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl text-[#0A1F2B]">
                TWO GENERATIONS.<br />ONE TRUSTED VISION.
              </h2>
              <p className="text-base font-semibold text-[#C89A3D]">
                From traditional wholesale expertise to modern garment sourcing.
              </p>
              <p className="max-w-xl text-sm leading-relaxed text-[#667085]">
                Built on trust, relationships and decades of textile experience, Himat Textile connects traditional Indian wholesale expertise with the evolving needs of modern fashion businesses.
              </p>
              
              {/* Stat Points Grid */}
              <div className="grid gap-6 border-t border-[#E8E2D8] pt-8 sm:grid-cols-3">
                <div className="space-y-1">
                  <span className="block font-display text-3xl font-bold text-[#0A1F2B]">2 GEN</span>
                  <span className="mono-label text-[8px] text-[#667085] tracking-wider block">Family Business</span>
                </div>
                <div className="space-y-1">
                  <span className="block font-display text-3xl font-bold text-[#0A1F2B]">TRUSTED</span>
                  <span className="mono-label text-[8px] text-[#667085] tracking-wider block">Wholesale Network</span>
                </div>
                <div className="space-y-1">
                  <span className="block font-display text-3xl font-bold text-[#0A1F2B]">GLOBAL</span>
                  <span className="mono-label text-[8px] text-[#667085] tracking-wider block">India → Worldwide</span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border border-[#E8E2D8] bg-[#F6F3ED] aspect-video lg:aspect-[4/3] rounded-xl">
              <img
                src="/images/weaving_loom.png"
                alt="Industrial weaving loom heritage"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute left-6 top-6 grid h-10 w-10 place-items-center rounded-md border border-[#E8E2D8] bg-[#FFFFFF] font-display text-xs font-bold text-[#0A1F2B]">
                HT
              </div>
            </div>
          </div>
        </section>

        {/* Featured Brands Marquee */}
        <section className="bg-[#F6F3ED] py-12 text-[#1A1A1A] overflow-hidden border-t border-[#E8E2D8]/50">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <p className="mono-label text-[9px] text-[#667085] uppercase tracking-widest text-center mb-6">
              {language === "hi" ? "हमारे भागीदारों से सोर्सिंग करने वाले चुनिंदा ब्रांड" : "Featured Brands Sourcing From Our Partners"}
            </p>
            <div className="flex select-none overflow-hidden">
              <div className="marquee-track flex shrink-0 items-center whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight md:text-3xl text-[#1A1A1A]/20">
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
                      <span className="mx-8 hover:text-[#0A1F2B] transition-colors inline-flex items-center gap-3">
                        {brand.logoUrl && (
                          <img
                            src={brand.logoUrl}
                            alt={brand.name}
                            className="h-8 w-8 rounded-full object-cover grayscale opacity-30 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        <span>{brand.name}</span>
                      </span>
                      <span className="mx-4 opacity-25 select-none">•</span>
                    </React.Fragment>
                  ));
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* Explore Our Garments Section (Page 3) */}
        <section id="categories" className="bg-[#F6F3ED] py-24 px-5 sm:px-8 lg:px-12 border-b border-[#E8E2D8] text-[#1A1A1A]">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-widest block mb-3">// GARMENT SOURCING</span>
                <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-[#0A1F2B] sm:text-5xl">
                  EXPLORE OUR<br />GARMENT COLLECTION.
                </h2>
              </div>
              <p className="mt-4 md:mt-0 max-w-md text-sm text-[#667085]">
                Discover commercially relevant styles selected for today's wholesale and retail markets.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "WOMEN'S WEAR", desc: "Contemporary styles • Ethnic • Western", link: "/catalog?category=womens%20wear" },
                { title: "MEN'S WEAR", desc: "Casual • Fashion • Everyday Essentials", link: "/catalog?category=mens%20wear" },
                { title: "KIDS WEAR", desc: "Trendy • Comfortable • Value-focused", link: "/catalog?category=kids%20wear" },
                { title: "ETHNIC WEAR", desc: "Traditional craftsmanship with modern styling.", link: "/catalog?category=ethnic%20wear" },
                { title: "WESTERN WEAR", desc: "Contemporary fashion for modern and global markets.", link: "/catalog?category=western%20wear" },
                { title: "CUSTOM / WHITE LABELING", desc: "Develop your own collection with Himat Textile.", link: "/#enquiry" },
              ].map((cat, idx) => (
                <Link
                  key={idx}
                  href={cat.link}
                  className="group relative block overflow-hidden border border-[#E8E2D8] bg-[#FFFFFF] p-8 rounded-xl hover:border-[#C89A3D] transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="mono-label text-[9px] text-[#C89A3D] tracking-widest block mb-4">0{idx + 1}</span>
                  <h3 className="font-display text-xl font-bold uppercase tracking-wider text-[#0A1F2B] group-hover:text-[#C89A3D] transition-colors">{cat.title}</h3>
                  <p className="mt-2 text-xs text-[#667085] leading-relaxed">{cat.desc}</p>
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={16} className="text-[#C89A3D]" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/catalog"
                className="gold-button inline-flex items-center gap-2 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 rounded-md"
              >
                EXPLORE ALL GARMENTS <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Curated Collection Lookbook Section (Page 8) */}
        <section className="bg-[#FFFFFF] py-24 border-t border-[#E8E2D8]">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <span className="mono-label text-[10px] text-[#C89A3D] uppercase block mb-3">// EDITORIAL LOOKBOOK</span>
                <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-[#0A1F2B] sm:text-5xl">
                  CURATED FOR<br />YOUR MARKET.
                </h2>
              </div>
              <p className="mt-4 md:mt-0 max-w-sm text-sm text-[#667085]">
                A constantly evolving selection of garments designed around changing customer preferences.
              </p>
            </div>
            
            {/* Filter Tabs Preview */}
            <div className="flex flex-wrap gap-2 mt-8 border-b border-[#E8E2D8] pb-4 text-[9px] font-bold uppercase tracking-widest text-[#667085]">
              <span className="border-r border-[#E8E2D8] pr-4 text-[#0A1F2B] font-extrabold">NEW ARRIVALS</span>
              <span className="border-r border-[#E8E2D8] px-4">BEST SELLERS</span>
              <span className="border-r border-[#E8E2D8] px-4">TRENDING STYLES</span>
              <span className="pl-4">WHOLESALE PICKS</span>
            </div>
          </div>
          
          <HorizontalProducts />

          <div className="text-center mt-12">
            <Link
              href="/catalog"
              className="gold-button inline-flex items-center gap-2 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 rounded-md"
            >
              VIEW COLLECTION <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* 5. White Labeling Section (Page 4) */}
        <section id="white-labeling" className="relative overflow-hidden bg-[#0A1F2B] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 border-t border-[#E8E2D8]/10 text-[#FFFFFF]">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200"
              alt="Apparel manufacturing catalog background"
              className="h-full w-full object-cover grayscale"
              loading="lazy"
            />
          </div>
          <div className="relative mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <span className="mono-label text-[10px] text-[#C89A3D] uppercase block tracking-wider">// WHITE LABELING SERVICES</span>
              <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-7xl">
                YOUR BRAND.<br />YOUR VISION.<br />OUR EXPERTISE.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-[#FFFFFF]/70">
                From concept to finished garment, we support businesses looking to create their own apparel collections.
              </p>
              <div className="pt-4">
                <Link
                  href="/#enquiry"
                  className="gold-button inline-flex items-center gap-2 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 rounded-md"
                >
                  START WHITE LABELING <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="border-l border-white/20 pl-6 space-y-6">
              {[
                { step: "01", name: "CUSTOM DESIGN", desc: "Design according to your specifications." },
                { step: "02", name: "FABRIC SOURCING", desc: "Selecting quality yarn and fabrics." },
                { step: "03", name: "SAMPLING", desc: "Pre-production sample before bulk." },
                { step: "04", name: "PRODUCTION", desc: "Bulk manufacturing with quality controls." },
                { step: "05", name: "PACKAGING", desc: "Custom tagging and branded packaging." },
                { step: "06", name: "EXPORT SUPPORT", desc: "Global shipping and logistics assistance." },
              ].map((item) => (
                <div key={item.step} className="group border-b border-white/10 pb-4">
                  <div className="flex items-baseline justify-between">
                    <span className="mono-label text-[10px] text-white/40 group-hover:text-white transition-colors">{item.step}</span>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">{item.name}</h3>
                  </div>
                  <p className="mt-1 text-xs text-[#FFFFFF]/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. B2B Solutions Interactive Segment Hover */}
        <section className="relative overflow-hidden bg-[#F6F3ED] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 border-t border-[#E8E2D8]">
          <div className="relative mx-auto max-w-[1280px]">
            <span className="mono-label text-[10px] text-[#C89A3D] uppercase block mb-2">// {t("solutions_label")}</span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-[#0A1F2B] sm:text-5xl lg:text-6xl">
              {t("solutions_title")}
            </h2>
            
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] mt-12">
              <div className="divide-y divide-[#E8E2D8] border-t border-b border-[#E8E2D8]">
                {translatedSolutions.map((sol, idx) => (
                  <div
                    key={sol.name}
                    onMouseEnter={() => handleSolutionHover(idx)}
                    className={`group py-8 flex flex-col justify-between md:flex-row md:items-center cursor-pointer transition-colors ${
                      activeSolution === idx ? "border-l-2 border-[#C89A3D] pl-4 bg-[#C89A3D]/5" : ""
                    }`}
                  >
                    <h3 className={`font-display text-3xl font-bold uppercase tracking-tight transition-colors sm:text-4xl md:text-5xl ${
                      activeSolution === idx ? "text-[#C89A3D]" : "text-[#0A1F2B]/50 group-hover:text-[#0A1F2B]"
                    }`}>
                      {sol.name}
                    </h3>
                    <p className={`mt-2 max-w-sm text-sm transition-colors md:mt-0 ${
                      activeSolution === idx ? "text-[#1A1A1A]" : "text-[#667085]/60 group-hover:text-[#667085]"
                    }`}>
                      {sol.copy}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dynamic Solution Image Preview (Premium Visual Component) */}
              <div className="hidden lg:block relative h-full min-h-[420px] border border-[#E8E2D8] bg-[#FFFFFF] overflow-hidden rounded-xl">
                {translatedSolutions.map((sol, idx) => (
                  <div
                    key={`sol-img-${idx}`}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      activeSolution === idx ? "opacity-90 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    }`}
                  >
                    <img
                      src={sol.image}
                      alt={sol.name}
                      className="w-full h-full object-cover transition-transform duration-[4000ms] hover:scale-105"
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#F6F3ED] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="mono-label text-[9px] text-[#C89A3D] tracking-widest block mb-2">0{activeSolution + 1} / Solutions</span>
                  <h4 className="font-display text-2xl font-bold uppercase text-[#0A1F2B] tracking-wider">{translatedSolutions[activeSolution]?.name}</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Business Guide Section (Page 5) */}
        <section className="bg-[#FFFFFF] py-24 px-5 sm:px-8 lg:px-12 border-t border-[#E8E2D8] text-[#1A1A1A]">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <span className="mono-label text-[10px] text-[#C89A3D] tracking-widest uppercase block">// B2B SOURCING SUPPORT</span>
                <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-[#0A1F2B] sm:text-5xl lg:text-6xl leading-none">
                  YOUR GARMENT GUIDE<br />IN AHMEDABAD.
                </h2>
                <p className="text-sm font-semibold text-[#C89A3D]">
                  Buying garments is not only about finding products. It's about finding the RIGHT products, RIGHT quantities and RIGHT price.
                </p>
                <div className="h-px bg-[#E8E2D8] w-24" />
                <p className="text-xs leading-relaxed text-[#667085]">
                  We guide you through the textile markets of Ahmedabad to select products that sell fast, reduce capital lock-ups, and match seasonal retail demands.
                </p>
                <div className="pt-2">
                  <Link
                    href="/#enquiry"
                    className="gold-button inline-flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 rounded-md"
                  >
                    TALK TO OUR GARMENT TEAM <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="grid gap-6">
                {[
                  { step: "01", title: "PRODUCT SELECTION", desc: "Choose commercially relevant varieties." },
                  { step: "02", title: "STOCK PLANNING", desc: "Avoid overstocking and unnecessary inventory." },
                  { step: "03", title: "SIZE-WISE BUYING", desc: "Plan quantities according to market demand." },
                  { step: "04", title: "VARIETY MANAGEMENT", desc: "More useful variety without blocking excessive capital." },
                  { step: "05", title: "PURCHASING GUIDANCE", desc: "Make smarter buying decisions." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 border-b border-[#E8E2D8] pb-5 items-start">
                    <span className="font-mono text-xs text-[#C89A3D] shrink-0 mt-1">{item.step}</span>
                    <div>
                      <h3 className="font-display text-base font-bold uppercase tracking-wider text-[#0A1F2B]">{item.title}</h3>
                      <p className="mt-1 text-xs text-[#667085] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. India Network Map Section */}
        <IndiaNetwork />

        {/* 9. Export Section (Page 6) */}
        <section className="bg-[#0A1F2B] py-24 px-5 sm:px-8 lg:px-12 text-[#FFFFFF] border-t border-[#E8E2D8]/10">
          <div className="mx-auto max-w-[1280px]">
            <span className="mono-label text-[10px] text-[#C89A3D] uppercase block tracking-wider">// GLOBAL APPAREL EXPORTS</span>
            <div className="grid gap-12 border-t border-white/10 pt-6 mt-4 lg:grid-cols-2">
              <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-7xl sm:leading-[0.88] text-white">
                FROM AHMEDABAD<br />TO GLOBAL MARKETS.
              </h2>
              <div className="space-y-8">
                <p className="text-sm leading-relaxed text-[#FFFFFF]/70">
                  With our sourcing and manufacturing network, Himat Textile supports apparel businesses looking for reliable garment solutions from India.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: t("ex_badge_sourcing"), desc: language === "hi" ? "विदेशी शिपमेंट के लिए सोर्सिंग क्षमता का विस्तार करें।" : "Scale capacity for overseas containers." },
                    { title: t("ex_badge_production"), desc: language === "hi" ? "आकार परीक्षण, सिकुड़न और रंग की जांच।" : "Sizing tests, shrinkage checks, colorfastness." },
                    { title: "WHITE LABELING", desc: language === "hi" ? "कस्टम पैकिंग, पॉलीबैग, थोक डिब्बे।" : "Custom labelling, polybags, bulk cartons." },
                    { title: t("ex_badge_export"), desc: language === "hi" ? "दस्तावेज़ीकरण, सीमा शुल्क निकासी सहायता।" : "Documentation, bill of lading assistance." }
                  ].map(item => (
                    <div key={item.title} className="border border-white/10 bg-[#122D3B] p-5 rounded-xl">
                      <ShieldCheck size={20} className="text-[#C89A3D]" />
                      <h4 className="mt-6 font-display text-base font-bold uppercase tracking-wider text-white">{item.title}</h4>
                      <p className="mt-1 text-xs text-[#FFFFFF]/60 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Link
                    href="/#enquiry"
                    className="gold-button inline-flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 rounded-md"
                  >
                    DISCUSS YOUR REQUIREMENT <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Price Segment Cards */}
        <section className="bg-[#FFFFFF] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 border-t border-[#E8E2D8] text-[#1A1A1A]">
          <div className="mx-auto max-w-[1280px]">
            <span className="mono-label text-[10px] text-[#C89A3D] uppercase tracking-wider block mb-2">// PRICE SEGMENTS</span>
            <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-[#0A1F2B] sm:text-5xl">
              TAILORED FOR YOUR<br />BUSINESS MODEL.
            </h2>
            
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  name: language === "hi" ? "वैल्यू सेगमेंट (बजट श्रृंखला)" : "Value Segment",
                  desc: language === "hi" ? "बड़े खुदरा अभियानों के लिए प्रतिस्पर्धी शुरुआती मूल्य, बिना किसी फैब्रिक गुणवत्ता समझौते के लागत प्रभावी मिश्रण।" : "Competitive entry-level pricing for mass retail campaigns, utilizing cost-effective blends without compromising fabric structure.",
                  moq: language === "hi" ? "1 पीस (थोक दर)" : "1 Pc (Bulk Rate)"
                },
                {
                  name: language === "hi" ? "मिड-रेंज (मध्यम श्रृंखला)" : "Mid-Range",
                  desc: language === "hi" ? "कार्ड्ड और कंघी वाले सूती कपड़े, संरचित बुनावट, और मानक धुलाई प्रक्रिया। उभरते फैशन स्टोर के लिए सर्वश्रेष्ठ।" : "Standard retail qualities including carded and combed cotton, structured knits, and standard washes. Best for emerging fashion stores.",
                  moq: language === "hi" ? "1 पीस (थोक)" : "1 Pc (Wholesale)"
                },
                {
                  name: language === "hi" ? "प्रीमियम रेंज" : "Premium Range",
                  desc: language === "hi" ? "उच्च गुणवत्ता वाले जैविक कपड़े, विस्तृत धुलाई तकनीक, कस्टम ट्रिम्स और लक्जरी फिनिशिंग।" : "High-grade organic fabrics, detailed wash techniques, heavy weight options, custom trims, and luxury finishing processes.",
                  moq: language === "hi" ? "1 पीस (सैंपल)" : "1 Pc (Sample)"
                }
              ].map(item => (
                <div key={item.name} className="flex flex-col justify-between border border-[#E8E2D8] bg-[#FFFFFF] p-6 rounded-xl hover:border-[#C89A3D] transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wider text-[#0A1F2B]">{item.name}</h3>
                    <p className="mt-4 text-xs leading-relaxed text-[#667085]">{item.desc}</p>
                  </div>
                  <div className="mt-8 border-t border-[#E8E2D8] pt-4 flex items-center justify-between">
                    <span className="mono-label text-[9px] text-[#667085] uppercase">{language === "hi" ? "न्यूनतम ऑर्डर" : "Minimum Order"}</span>
                    <span className="text-xs font-bold text-[#C89A3D]">{item.moq}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 12.5 Featured Promotions / B2B Sponsorships */}
        {advertisements && advertisements.some(ad => ad.placement === "hero" && ad.isActive && !hiddenAdIds.includes(ad.id)) && (
          <section className="bg-[#161612] py-16 px-5 sm:px-8 lg:px-12 border-t border-white/5">
            <div className="mx-auto max-w-[1500px]">
              <span className="mono-label text-[10px] text-white/40 uppercase">{language === "hi" ? "प्रायोजित विज्ञापन" : "Featured Sponsorships"}</span>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {advertisements.filter(ad => ad.placement === "hero" && ad.isActive && !hiddenAdIds.includes(ad.id)).map(ad => (
                  <div key={ad.id} className="relative border border-white/10 bg-[#1E211E] p-5 flex flex-col justify-between group hover:border-white/20 transition-all">
                    <button
                      suppressHydrationWarning={true}
                      onClick={() => handleHideAd(ad.id)}
                      className="absolute right-3 top-3 border border-white/10 bg-transparent px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white/40 hover:border-white hover:text-white"
                    >
                      {language === "hi" ? "बंद करें" : "Dismiss"}
                    </button>
                    <div className="space-y-4">
                      {ad.imageUrl && (
                        <div className="aspect-video overflow-hidden border border-white/5 bg-stone-900">
                          <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover transition-all duration-500" />
                        </div>
                      )}
                      <div>
                        <span className="mono-label text-[8px] bg-[#C19040]/15 px-2 py-0.5 text-white/70 uppercase">{language === "hi" ? "प्रचार" : "Promotion"}</span>
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
                          {ad.buttonText || (language === "hi" ? "अधिक जानें" : "Learn More")} <ArrowUpRight size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 11. Google Reviews */}
        <section className="bg-[#F6F3ED] px-5 py-24 text-[#1A1A1A] sm:px-8 lg:px-12 lg:py-32 border-t border-[#E8E2D8]">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-6">
                <span className="mono-label text-[10px] text-[#C89A3D] uppercase block tracking-wider">// B2B CLIENT TRUST</span>
                <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-[#0A1F2B]">
                  WHAT OUR PARTNERS SAY.
                </h2>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-5xl font-bold tracking-tighter text-[#0A1F2B]">5.0</span>
                  <div className="space-y-0.5">
                    <div className="flex text-[#C89A3D] fill-[#C89A3D]">
                      {Array(5).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-[10px] uppercase font-bold text-[#667085] tracking-wider">
                      Based on Wholesale Reviews
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#667085]/80 font-mono tracking-wider uppercase">
                  Consistent Quality & Delivery for Wholesalers & Retailers
                </p>
                <div className="pt-4">
                  <button
                    suppressHydrationWarning={true}
                    onClick={() => setIsReviewModalOpen(true)}
                    className="gold-button inline-flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 rounded-md"
                  >
                    WRITE A REVIEW
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {(reviews && reviews.length > 0 ? reviews.filter(r => r.isActive) : fallbackReviews).map(rev => (
                  <div key={rev.id} className="border-b border-[#E8E2D8] pb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex text-[#C89A3D] fill-[#C89A3D]">
                        {Array(rev.rating).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                      <span className="text-[10px] text-[#667085]/60">{rev.date || (language === "hi" ? "सत्यापित" : "verified")}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]">"{rev.text}"</p>
                    <h4 className="mt-2 text-xs font-bold uppercase tracking-wider text-[#667085]">{rev.author}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 12. Google Map Office Location Section */}
        <section className="bg-[#FFFFFF] border-y border-[#E8E2D8] text-[#1A1A1A] px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
              {/* Location Details */}
              <div className="space-y-8">
                <div>
                  <span className="mono-label text-[10px] text-[#C89A3D] tracking-widest uppercase block mb-3">// VISIT OUR SHOWROOM</span>
                  <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl text-[#0A1F2B]">
                    HEADQUARTERS
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <MapPin className="text-[#C89A3D] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#667085]">{t("loc_address_title")}</h4>
                      <p className="mt-1 text-sm text-[#1A1A1A] leading-relaxed max-w-sm">
                        {t("loc_address_text")}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <Clock className="text-[#C89A3D] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#667085]">{t("loc_hours_title")}</h4>
                      <p className="mt-1 text-sm text-[#1A1A1A]">
                        {t("loc_hours_text")}
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-4">
                    <Phone className="text-[#C89A3D] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#667085]">{t("loc_call_title")}</h4>
                      <a href="tel:+919873938095" className="mt-1 text-sm text-[#C89A3D] hover:underline font-mono font-bold">
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
                    className="gold-button inline-flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-[.18em] transition-transform hover:-translate-y-0.5 rounded-md"
                  >
                    GET DIRECTIONS <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="relative border border-[#E8E2D8] overflow-hidden bg-[#F6F3ED] h-[450px] rounded-xl shadow-sm">
                <iframe
                  width="100%"
                  height="100%"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
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
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0A1F2B]/90 backdrop-blur-md p-4">
            <div className="relative w-full max-w-lg border border-[#E8E2D8] bg-[#FFFFFF] p-8 text-[#1A1A1A] rounded-xl shadow-2xl">
              <button
                onClick={() => {
                  setIsReviewModalOpen(false);
                  setReviewMessage("");
                }}
                className="absolute right-4 top-4 text-[#667085] hover:text-[#0A1F2B]"
              >
                <X size={20} />
              </button>

              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#0A1F2B]">{t("rev_modal_title")}</h3>
              <p className="text-xs text-[#667085] mt-1">{t("rev_modal_subtitle")}</p>

              <form onSubmit={handleReviewSubmit} className="mt-6 space-y-5">
                {/* Author Name */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] uppercase tracking-wider text-[#667085] block">{t("rev_label_name")}</label>
                  <input
                    suppressHydrationWarning={true}
                    type="text"
                    required
                    placeholder={t("rev_placeholder_name")}
                    value={newReviewForm.author}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, author: e.target.value })}
                    className="w-full bg-[#F6F3ED] border border-[#E8E2D8] px-4 py-3 text-sm rounded-md focus:border-[#C89A3D] focus:outline-none"
                  />
                </div>

                {/* Stars Rating Selection */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] uppercase tracking-wider text-[#667085] block">{t("rev_label_rating")}</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        suppressHydrationWarning={true}
                        key={star}
                        type="button"
                        onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                        className={`text-2xl ${newReviewForm.rating >= star ? "text-[#C89A3D]" : "text-stone-300"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] uppercase tracking-wider text-[#667085] block">{t("rev_label_feedback")}</label>
                  <textarea
                    suppressHydrationWarning={true}
                    required
                    rows={4}
                    placeholder={t("rev_placeholder_feedback")}
                    value={newReviewForm.text}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, text: e.target.value })}
                    className="w-full bg-[#F6F3ED] border border-[#E8E2D8] px-4 py-3 text-sm rounded-md focus:border-[#C89A3D] focus:outline-none resize-none"
                  />
                </div>

                {/* Action Feedback */}
                {reviewMessage && (
                  <p className="text-xs text-[#C89A3D] leading-relaxed font-mono font-semibold">
                    {reviewMessage}
                  </p>
                )}

                {/* Submit button */}
                <button
                  suppressHydrationWarning={true}
                  type="submit"
                  disabled={isReviewSubmitting}
                  className="w-full gold-button py-4 text-[10px] font-bold uppercase tracking-[.18em] flex items-center justify-center gap-2 rounded-md"
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

        {/* 13. Dynamic Announcement Banner */}
        {advertisements && advertisements.some(ad => ad.placement === "midpage" && ad.isActive && !hiddenAdIds.includes(ad.id)) && (
          <section className="relative bg-[#0A1F2B] py-16 px-5 sm:px-8 lg:px-12 text-[#FFFFFF] text-center border-y border-white/10">
            {advertisements.filter(ad => ad.placement === "midpage" && ad.isActive && !hiddenAdIds.includes(ad.id)).slice(0, 1).map(ad => (
              <div key={ad.id} className="max-w-3xl mx-auto space-y-4 relative">
                <button
                  onClick={() => handleHideAd(ad.id)}
                  className="absolute right-0 top-0 border border-white/20 bg-transparent px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-white/60 hover:border-white hover:text-white"
                >
                  {language === "hi" ? "[बंद करें]" : "[CLOSE AD]"}
                </button>
                <span className="mono-label text-[9px] text-[#C89A3D] uppercase tracking-widest block">{language === "hi" ? "घोषणा" : "ANNOUNCEMENT"}</span>
                <h3 className="font-display text-3xl font-bold uppercase tracking-wide mt-2 text-white">{ad.title}</h3>
                {ad.description && <p className="text-sm text-[#FFFFFF]/70">{ad.description}</p>}
                {ad.linkUrl && (
                  <a
                    href={ad.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => recordAdAction(ad.id, "click")}
                    className="mt-4 inline-flex items-center gap-2 border border-[#C89A3D] bg-[#C89A3D] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black rounded-md hover:bg-[#A9781D] hover:border-[#A9781D]"
                  >
                    {ad.buttonText || (language === "hi" ? "अधिक जानें" : "Learn More")} <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* 14. Enquiry Lead Generation */}
        <HimatInquiry />

        {/* 15. Final Brand Statement Section */}
        <section className="bg-[#0A1F2B] py-24 px-5 sm:px-8 lg:px-12 border-t border-[#E8E2D8]/10 text-white">
          <div className="mx-auto max-w-[1280px] text-center space-y-6">
            <span className="mono-label text-[10px] text-[#C89A3D] tracking-[0.3em] uppercase block">
              // {t("bs_location")}
            </span>
            <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-white">
              <span className="block text-white">{t("bs_title_1")}</span>
              <span className="block text-transparent stroke-text">{t("bs_title_2")}</span>
              <span className="block text-white">{t("bs_title_3")}</span>
            </h2>
            <div className="mx-auto h-0.5 bg-[#C89A3D]/25 w-24 my-4" />
            <p className="mx-auto max-w-2xl text-xs sm:text-sm font-semibold tracking-wider text-white/70 uppercase leading-relaxed">
              {t("bs_subtitle")}
            </p>
          </div>
        </section>

        {/* Active Popup Overlay Advertisement */}
        {mounted && (() => {
          const activePopup = advertisements?.find(ad => ad.placement === "popup" && ad.isActive && !hiddenAdIds.includes(ad.id));
          if (!activePopup) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1F2B]/90 p-5 backdrop-blur-sm">
              <div className="relative w-full max-w-lg border border-white/10 bg-[#122D3B] p-8 text-white space-y-6 rounded-xl">
                <button
                  onClick={() => handleHideAd(activePopup.id)}
                  className="absolute right-4 top-4 border border-white/20 bg-transparent px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white/60 hover:border-white hover:text-white"
                >
                  [X]
                </button>
                <div className="space-y-3">
                  <span className="mono-label text-[8px] text-[#C89A3D] uppercase tracking-widest">{language === "hi" ? "सीमित समय अलर्ट" : "LIMITED TIME ALERT"}</span>
                  <h3 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-white">{activePopup.title}</h3>
                  {activePopup.description && <p className="text-sm leading-relaxed text-white/75">{activePopup.description}</p>}
                </div>
                {activePopup.imageUrl && (
                  <img
                    src={activePopup.imageUrl}
                    alt="Highlight"
                    className="w-full h-48 object-cover border border-white/10 rounded-md"
                  />
                )}
                <div className="flex gap-4 pt-2">
                  {activePopup.linkUrl && (
                    <a
                      href={activePopup.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => recordAdAction(activePopup.id, "click")}
                      className="flex-1 bg-[#C89A3D] py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-black rounded-md transition-colors hover:bg-[#A9781D]"
                    >
                      {activePopup.buttonText || (language === "hi" ? "सौदा देखें" : "View Deal")}
                    </a>
                  )}
                  <button
                    onClick={() => handleHideAd(activePopup.id)}
                    className="flex-1 border border-white/30 bg-transparent py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-white rounded-md transition-colors hover:border-white"
                  >
                    {language === "hi" ? "बंद करें" : "Dismiss"}
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
            <div className="fixed bottom-4 inset-x-5 z-40 mx-auto max-w-[1280px] border border-white/15 bg-[#0A1F2B]/95 p-5 text-white backdrop-blur-md flex flex-col justify-between items-center gap-4 md:flex-row shadow-2xl rounded-xl">
              <div className="flex items-center gap-4">
                <span className="mono-label text-[8px] bg-[#C89A3D]/10 px-2 py-1 text-[#C89A3D] uppercase font-bold">{language === "hi" ? "नवीनतम संक्षिप्त" : "LATEST BRIEF"}</span>
                <div>
                  <h4 className="font-display text-base font-bold uppercase tracking-tight leading-none text-white">{activeFooterAd.title}</h4>
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
                    className="bg-[#C89A3D] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-black hover:bg-[#A9781D] transition-colors text-center w-full md:w-auto rounded-md"
                  >
                    {activeFooterAd.buttonText || (language === "hi" ? "अधिक जानें" : "Learn More")}
                  </a>
                )}
                <button
                  onClick={() => handleHideAd(activeFooterAd.id)}
                  className="border border-white/20 bg-transparent px-3 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-white/60 hover:border-white hover:text-white transition-colors rounded-md"
                >
                  {language === "hi" ? "[बंद करें]" : "[DISMISS]"}
                </button>
              </div>
            </div>
          );
        })()}

        {/* WhatsApp Floating Chat Button */}
        <a
          href="https://wa.me/919873938095"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#20ba5a] active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare size={18} fill="currentColor" />
          <span className="text-xs font-bold uppercase tracking-wider font-mono">
            {t("whatsapp_floating")}
          </span>
        </a>
      </main>
    </div>
  );
}
