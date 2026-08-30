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
    { name: language === "hi" ? "होलसेलर्स (थोक विक्रेता)" : "Wholesalers", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800", copy: language === "hi" ? "उच्च मात्रा में कपड़े का प्रसंस्करण और विश्वसनीय परिवहन।" : "High-volume fabric processing and reliable multi-city transport." },
    { name: language === "hi" ? "डिस्ट्रीब्यूटर्स (वितरक)" : "Distributors", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800", copy: language === "hi" ? "मौसमी समय-सारिणी के अनुसार कस्टम उत्पादन चक्र।" : "Bespoke production cycles mapped against seasonal schedules." },
    { name: language === "hi" ? "फैशन ब्रांड्स" : "Fashion Brands", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800", copy: language === "hi" ? "व्हाइट-लेवलिंग निर्माण, स्टाइलिंग विवरण, कस्टम टैग।" : "White-labeling manufacturing, styling details, custom tags." },
    { name: language === "hi" ? "नए व्यवसाय" : "New Businesses", image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800", copy: language === "hi" ? "उत्पाद चयन, स्टाइल और उत्पादन शुरू करने पर मार्गदर्शन।" : "Guidance on product selection, style curation, and wholesale sourcing." },
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
    <div className="min-h-screen overflow-hidden bg-[#161612] text-[#F4EFE6] selection:bg-[#C95A1A] selection:text-[#F4EFE6]">
      <main>
        {/* 1. Fullscreen Hero Slider */}
        <HeroSlider />

        {/* 2. Trust Strip Marquee */}
        <section className="relative overflow-hidden border-y border-[#161612]/12 bg-[#F4EFE6] py-4 text-[#161612] transition-colors hover:bg-[#E7E0D3]">
          <div className="flex select-none overflow-hidden">
            <div className="marquee-track flex shrink-0 items-center whitespace-nowrap font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
              {Array(4).fill(0).map((_, i) => (
                <React.Fragment key={i}>
                  <span>{t("strip_text_1")}</span>
                  <span className="mx-6 text-black/30">•</span>
                  <span>{t("strip_text_2")}</span>
                  <span className="mx-6 text-black/30">•</span>
                  <span>{t("strip_text_3")}</span>
                  <span className="mx-6 text-black/30">•</span>
                  <span>{t("strip_text_4")}</span>
                  <span className="mx-6 text-black/30">•</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Category Grid Section */}
        <section id="categories" className="bg-[#0f0f0f] py-24 px-5 sm:px-8 lg:px-12 border-b border-white/5">
          <div className="mx-auto max-w-[1500px]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="mono-label text-[10px] text-white/40 uppercase tracking-widest block mb-3">// {t("cat_title")}</span>
                <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
                  {t("cat_title")}
                </h2>
              </div>
              <p className="mt-4 md:mt-0 max-w-md text-sm text-white/60">
                {t("cat_subtitle")}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: t("cat_mens_title"), desc: t("cat_mens_desc"), link: "/catalog?category=mens%20wear" },
                { title: t("cat_womens_title"), desc: t("cat_womens_desc"), link: "/catalog?category=womens%20wear" },
                { title: t("cat_kids_title"), desc: t("cat_kids_desc"), link: "/catalog?category=kids%20wear" },
                { title: t("cat_bedsheets_title"), desc: t("cat_bedsheets_desc"), link: "/catalog?category=bedsheets" },
                { title: t("cat_fabrics_title"), desc: t("cat_fabrics_desc"), link: "/catalog?category=fabrics" },
                { title: t("cat_private_label_title"), desc: t("cat_private_label_desc"), link: "/#enquiry" },
              ].map((cat, idx) => (
                <Link
                  key={idx}
                  href={cat.link}
                  className="group relative block overflow-hidden border border-white/10 bg-[#23251f] p-8 hover:border-white/30 transition-all hover:-translate-y-1"
                >
                  <span className="mono-label text-[9px] text-[#C19040] tracking-widest block mb-4">0{idx + 1}</span>
                  <h3 className="font-display text-xl font-black uppercase tracking-wider text-white group-hover:text-[#C19040] transition-colors">{cat.title}</h3>
                  <p className="mt-2 text-xs text-white/50">{cat.desc}</p>
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={16} className="text-white" />
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 border border-[#C19040] bg-[#C19040] text-[#161612] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5"
              >
                {t("btn_explore_all")}
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Legacy Section (2nd Generation Notes) */}
        <section className="relative overflow-hidden bg-[#E7E0D3] px-5 py-20 text-[#161612] sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="space-y-6">
              <span className="mono-label text-[10px] text-black/50 uppercase">{t("legacy_label")}</span>
              <h2 className="font-display text-4xl font-black uppercase leading-none tracking-[-0.07em] sm:text-7xl sm:leading-[0.82]">
                {t("legacy_title")}
              </h2>
              <div className="h-0.5 bg-[#161612]/20 w-16" />
              <p className="max-w-xl text-sm leading-relaxed text-black/75 sm:text-base">
                {t("legacy_desc")}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-70 transition-opacity"
              >
                {t("legacy_link")} <ArrowUpRight size={14} />
              </Link>
            </div>

             <div className="relative overflow-hidden border border-black/10 bg-stone-900 aspect-video lg:aspect-[4/3]">
              <img
                src="/images/weaving_loom.png"
                alt="Industrial weaving loom heritage"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute left-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-black/30 font-display text-xs font-black">
                02
              </div>
            </div>
          </div>
        </section>

        {/* Featured Brands Marquee */}
        <section className="bg-[#F4EFE6] py-12 text-[#161612] overflow-hidden border-t border-[#161612]/8">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
            <p className="mono-label text-[9px] text-black/45 uppercase tracking-widest text-center mb-6">
              {language === "hi" ? "हमारे भागीदारों से सोर्सिंग करने वाले चुनिंदा ब्रांड" : "Featured Brands Sourcing From Our Partners"}
            </p>
            <div className="flex select-none overflow-hidden">
              <div className="marquee-track flex shrink-0 items-center whitespace-nowrap font-display text-2xl font-black uppercase tracking-tight md:text-3xl text-black/25">
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
                      <span className="mx-8 hover:text-black transition-colors inline-flex items-center gap-3">
                        {brand.logoUrl && (
                          <img
                            src={brand.logoUrl}
                            alt={brand.name}
                            className="h-8 w-8 rounded-full object-cover grayscale opacity-30 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                        <span>{brand.name}</span>
                      </span>
                      <span className="mx-4 opacity-35 select-none">•</span>
                    </React.Fragment>
                  ));
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Horizontal Scrolling Product Gallery */}
        <HorizontalProducts />

        {/* 6. Why Himat Textile Section */}
        <section className="bg-[#1E211E] py-24 px-5 sm:px-8 lg:px-12 border-t border-[#F4EFE6]/8">
          <div className="mx-auto max-w-[1500px]">
            <div className="max-w-3xl mb-16 space-y-4">
              <span className="mono-label text-[10px] text-[#C19040] tracking-widest uppercase block">// {t("why_label")}</span>
              <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl leading-none">
                {t("why_title")}
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: t("why_01_title"), desc: t("why_01_desc") },
                { title: t("why_02_title"), desc: t("why_02_desc") },
                { title: t("why_03_title"), desc: t("why_03_desc") },
                { title: t("why_04_title"), desc: t("why_04_desc") },
                { title: t("why_05_title"), desc: t("why_05_desc") },
                { title: t("why_06_title"), desc: t("why_06_desc") },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-white/10 bg-[#1E211E] p-8 hover:border-white/20 transition-all"
                >
                  <span className="font-mono text-xs text-[#C19040] block mb-4">0{idx + 1}</span>
                  <h3 className="font-display text-lg font-black uppercase tracking-wider text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Private Label Customizer */}
        <section className="relative overflow-hidden bg-[#161612] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
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
              <span className="mono-label text-[10px] text-white/50 uppercase">05 / White Labeling</span>
              <h2 className="font-display text-4xl font-black uppercase leading-none tracking-[-0.07em] sm:text-7xl sm:leading-[0.8] md:text-8xl">
                {t("pl_title_1")}<br />{t("pl_title_2")}<br />{t("pl_title_3")}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-white/70">
                {t("pl_description")}
              </p>
            </div>

            <div className="border-l border-white/20 pl-6 space-y-6">
              {[
                { step: "01", name: t("pl_step_1"), desc: language === "hi" ? "आपकी आवश्यकताओं के अनुसार डिजाइन।" : "Design according to your specifications." },
                { step: "02", name: t("pl_step_2"), desc: language === "hi" ? "गुणवत्तापूर्ण कपड़े और धागे का चयन।" : "Selecting quality yarn and fabrics." },
                { step: "03", name: t("pl_step_3"), desc: language === "hi" ? "उत्पादन से पहले प्री-प्रोडक्शन सैंपल।" : "Pre-production sample before bulk." },
                { step: "04", name: t("pl_step_4"), desc: language === "hi" ? "गुणवत्ता नियंत्रण के साथ थोक उत्पादन।" : "Bulk manufacturing with quality controls." },
                { step: "05", name: t("pl_step_5"), desc: language === "hi" ? "कस्टम टैग और ब्रांडेड पैकिंग।" : "Custom tagging and branded packaging." },
                { step: "06", name: t("pl_step_6"), desc: language === "hi" ? "वैश्विक शिपिंग और परिवहन सहायता।" : "Global shipping and logistics assistance." },
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
                {t("btn_start_private_label")}
              </Link>
            </div>
          </div>
        </section>

        {/* 8. B2B Solutions Interactive Segment Hover */}
        <section className="relative overflow-hidden bg-[#161612] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">

          <div className="relative mx-auto max-w-[1500px]">
            <span className="mono-label text-[10px] text-white/40 uppercase">{t("solutions_label")}</span>
            <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("solutions_title")}
            </h2>
            
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] mt-12">
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {translatedSolutions.map((sol, idx) => (
                  <div
                    key={sol.name}
                    onMouseEnter={() => handleSolutionHover(idx)}
                    className={`group py-8 flex flex-col justify-between md:flex-row md:items-center cursor-pointer transition-colors ${
                      activeSolution === idx ? "border-l-2 border-[#C19040] pl-4 bg-white/3" : ""
                    }`}
                  >
                    <h3 className={`font-display text-3xl font-black uppercase tracking-tight transition-colors sm:text-4xl md:text-5xl ${
                      activeSolution === idx ? "text-[#C19040]" : "text-white/50 group-hover:text-white"
                    }`}>
                      {sol.name}
                    </h3>
                    <p className={`mt-2 max-w-sm text-sm transition-colors md:mt-0 ${
                      activeSolution === idx ? "text-[#F4EFE6]" : "text-white/45 group-hover:text-white/80"
                    }`}>
                      {sol.copy}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dynamic Solution Image Preview (Premium Visual Component) */}
              <div className="hidden lg:block relative h-full min-h-[420px] border border-white/10 bg-stone-900 overflow-hidden">
                {translatedSolutions.map((sol, idx) => (
                  <div
                    key={`sol-img-${idx}`}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      activeSolution === idx ? "opacity-60 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    }`}
                  >
                    <img
                      src={sol.image}
                      alt={sol.name}
                      className="w-full h-full object-cover grayscale transition-transform duration-[4000ms] hover:scale-110"
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161612] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="mono-label text-[9px] text-[#C19040] tracking-widest block mb-2">0{activeSolution + 1} / Solutions</span>
                  <h4 className="font-display text-2xl font-black uppercase text-white tracking-wider">{translatedSolutions[activeSolution]?.name}</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Business Guide Section */}
        <section className="bg-[#161612] py-24 px-5 sm:px-8 lg:px-12 border-t border-[#F4EFE6]/8">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-6">
                <span className="mono-label text-[10px] text-[#C19040] tracking-widest uppercase block">// {t("nav_guide")}</span>
                <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl leading-none">
                  {t("bg_title")}
                </h2>
                <p className="text-sm leading-relaxed text-white/70">
                  {t("bg_subtitle")}
                </p>
                <div className="h-px bg-[#C19040]/10 w-24" />
                <p className="text-xs font-mono uppercase tracking-wider text-white/55">
                  {t("bg_desc")}
                </p>
                <div className="pt-2">
                  <Link
                    href="/#enquiry"
                    className="inline-flex items-center gap-2 border border-[#C19040] bg-[#C19040] text-[#161612] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5"
                  >
                    {t("btn_talk_team")}
                  </Link>
                </div>
              </div>

              <div className="grid gap-6">
                {[
                  { step: "01", title: t("bg_point_1_title"), desc: t("bg_point_1_desc") },
                  { step: "02", title: t("bg_point_2_title"), desc: t("bg_point_2_desc") },
                  { step: "03", title: t("bg_point_3_title"), desc: t("bg_point_3_desc") },
                  { step: "04", title: t("bg_point_4_title"), desc: t("bg_point_4_desc") },
                  { step: "05", title: t("bg_point_5_title"), desc: t("bg_point_5_desc") },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 border-b border-white/10 pb-5 items-start">
                    <span className="font-mono text-xs text-[#C19040] shrink-0 mt-1">{item.step}</span>
                    <div>
                      <h3 className="font-display text-base font-black uppercase tracking-wider text-white">{item.title}</h3>
                      <p className="mt-1 text-xs text-white/55">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10. India Network Map Section */}
        <IndiaNetwork />

        {/* 11. Export section */}
        <section className="bg-[#161612] py-24 px-5 sm:px-8 lg:px-12 text-white border-t border-white/5">
          <div className="mx-auto max-w-[1500px]">
            <span className="mono-label text-[10px] text-white/40 uppercase">{t("ex_label")}</span>
            <div className="grid gap-12 border-t border-white/10 pt-6 mt-4 lg:grid-cols-2">
              <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tight sm:text-7xl sm:leading-[0.85]">
                {t("ex_title_1")}<br />{t("ex_title_2")}
              </h2>
              <div className="space-y-8">
                <p className="text-sm leading-relaxed text-white/70">
                  {t("ex_desc")}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { title: t("ex_badge_sourcing"), desc: language === "hi" ? "विदेशी शिपमेंट के लिए सोर्सिंग क्षमता का विस्तार करें।" : "Scale capacity for overseas containers." },
                    { title: t("ex_badge_production"), desc: language === "hi" ? "आकार परीक्षण, सिकुड़न और रंग की जांच।" : "Sizing tests, shrinkage checks, colorfastness." },
                    { title: t("ex_badge_private_label"), desc: language === "hi" ? "कस्टम पैकिंग, पॉलीबैग, थोक डिब्बे।" : "Custom labelling, polybags, bulk cartons." },
                    { title: t("ex_badge_export"), desc: language === "hi" ? "दस्तावेज़ीकरण, सीमा शुल्क निकासी सहायता।" : "Documentation, bill of lading assistance." }
                  ].map(item => (
                    <div key={item.title} className="border border-white/10 bg-[#111] p-5">
                      <ShieldCheck size={20} className="text-white/60" />
                      <h4 className="mt-6 font-display text-base font-black uppercase tracking-wider">{item.title}</h4>
                      <p className="mt-1 text-xs text-white/50">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Link
                    href="/#enquiry"
                    className="inline-flex items-center gap-2 border border-[#C19040] bg-[#C19040] text-[#161612] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5"
                  >
                    {t("btn_discuss_requirement")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Price Segment Cards */}
        <section className="bg-[#23251f] px-5 py-24 sm:px-8 lg:px-12 lg:py-32 border-t border-[#F4EFE6]/8">
          <div className="mx-auto max-w-[1500px]">
            <span className="mono-label text-[10px] text-white/40 uppercase">{t("price_label")}</span>
            <h2 className="mt-2 font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
              {t("price_title")}
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
                <div key={item.name} className="flex flex-col justify-between border border-white/10 bg-[#1E211E] p-6 hover:border-white/20 transition-all">
                  <div>
                    <h3 className="font-display text-xl font-black uppercase tracking-wider text-white">{item.name}</h3>
                    <p className="mt-4 text-xs leading-relaxed text-white/60">{item.desc}</p>
                  </div>
                  <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between">
                    <span className="mono-label text-[9px] text-white/40 uppercase">{language === "hi" ? "न्यूनतम ऑर्डर" : "Minimum Order"}</span>
                    <span className="text-xs font-bold text-white">{item.moq}</span>
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

        {/* 13. Google Reviews */}
        <section className="bg-[#F4EFE6] px-5 py-24 text-[#161612] sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-6">
                <span className="mono-label text-[10px] text-black/50 uppercase block">{t("trust_label")}</span>
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
                      {t("trust_sub")}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-black/60 font-mono tracking-wider uppercase">
                  {t("trust_desc")}
                </p>
                <div className="pt-4">
                  <button
                    suppressHydrationWarning={true}
                    onClick={() => setIsReviewModalOpen(true)}
                    className="border border-[#C95A1A] bg-[#C95A1A] text-[#F4EFE6] px-6 py-3 text-[10px] font-bold uppercase tracking-[.18em] transition-transform hover:-translate-y-0.5"
                  >
                    {t("trust_btn")}
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
                      <span className="text-[10px] text-black/45">{rev.date || (language === "hi" ? "सत्यापित" : "verified")}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-black/85">"{rev.text}"</p>
                    <h4 className="mt-2 text-xs font-bold uppercase tracking-wider text-black/60">{rev.author}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13b. Google Map Office Location Section */}
        <section className="bg-[#0a0a0a] border-y border-white/10 text-white px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
              {/* Location Details */}
              <div className="space-y-8">
                <div>
                  <span className="mono-label text-[10px] text-white/40 tracking-widest uppercase block mb-3">{t("loc_label")}</span>
                  <h2 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl text-white">
                    {t("loc_title")}
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <MapPin className="text-[#C95A1A] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white/50">{t("loc_address_title")}</h4>
                      <p className="mt-1 text-sm text-white/80 leading-relaxed max-w-sm">
                        {t("loc_address_text")}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <Clock className="text-[#C95A1A] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white/50">{t("loc_hours_title")}</h4>
                      <p className="mt-1 text-sm text-white/80">
                        {t("loc_hours_text")}
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex gap-4">
                    <Phone className="text-[#C95A1A] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white/50">{t("loc_call_title")}</h4>
                      <a href="tel:+919873938095" className="mt-1 text-sm text-[#C95A1A] hover:underline font-mono">
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
                    className="inline-flex items-center gap-2 border border-[#C19040] bg-[#C19040] text-[#161612] px-6 py-3 text-[10px] font-bold uppercase tracking-[.18em] transition-transform hover:-translate-y-0.5"
                  >
                    {t("loc_directions_btn")} <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="relative border border-white/10 overflow-hidden bg-[#161612]/40 h-[450px]">
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
          <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#161612]/85 backdrop-blur-md p-4">
            <div className="relative w-full max-w-lg border border-white/10 bg-[#1E211E] p-8 text-white">
              <button
                onClick={() => {
                  setIsReviewModalOpen(false);
                  setReviewMessage("");
                }}
                className="absolute right-4 top-4 text-white/50 hover:text-white"
              >
                <X size={20} />
              </button>

              <h3 className="font-display text-2xl font-black uppercase tracking-tight">{t("rev_modal_title")}</h3>
              <p className="text-xs text-white/50 mt-1">{t("rev_modal_subtitle")}</p>

              <form onSubmit={handleReviewSubmit} className="mt-6 space-y-5">
                {/* Author Name */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] uppercase tracking-wider text-white/50 block">{t("rev_label_name")}</label>
                  <input
                    suppressHydrationWarning={true}
                    type="text"
                    required
                    placeholder={t("rev_placeholder_name")}
                    value={newReviewForm.author}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, author: e.target.value })}
                    className="w-full bg-[#23251f] border border-white/15 px-4 py-3 text-sm focus:border-white focus:outline-none"
                  />
                </div>

                {/* Stars Rating Selection */}
                <div className="space-y-1">
                  <label className="mono-label text-[9px] uppercase tracking-wider text-white/50 block">{t("rev_label_rating")}</label>
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
                  <label className="mono-label text-[9px] uppercase tracking-wider text-white/50 block">{t("rev_label_feedback")}</label>
                  <textarea
                    suppressHydrationWarning={true}
                    required
                    rows={4}
                    placeholder={t("rev_placeholder_feedback")}
                    value={newReviewForm.text}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, text: e.target.value })}
                    className="w-full bg-[#23251f] border border-white/15 px-4 py-3 text-sm focus:border-white focus:outline-none resize-none"
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
                  className="w-full bg-[#C19040] text-[#161612] py-4 text-[10px] font-bold uppercase tracking-[.18em] flex items-center justify-center gap-2 hover:bg-[#C19040]/85 transition-all"
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

        {/* 14. Dynamic Advertisement Space / Announcement Banner */}
        {advertisements && advertisements.some(ad => ad.placement === "midpage" && ad.isActive && !hiddenAdIds.includes(ad.id)) && (
          <section className="relative bg-stone-900 py-16 px-5 sm:px-8 lg:px-12 text-white text-center border-y border-white/10">
            {advertisements.filter(ad => ad.placement === "midpage" && ad.isActive && !hiddenAdIds.includes(ad.id)).slice(0, 1).map(ad => (
              <div key={ad.id} className="max-w-3xl mx-auto space-y-4 relative">
                <button
                  onClick={() => handleHideAd(ad.id)}
                  className="absolute right-0 top-0 border border-white/20 bg-transparent px-3 py-1 text-[8px] font-bold uppercase tracking-wider text-white/60 hover:border-white hover:text-white"
                >
                  {language === "hi" ? "[बंद करें]" : "[CLOSE AD]"}
                </button>
                <span className="mono-label text-[9px] text-white/50 uppercase tracking-widest block">{language === "hi" ? "घोषणा" : "ANNOUNCEMENT"}</span>
                <h3 className="font-display text-3xl font-black uppercase tracking-wide mt-2">{ad.title}</h3>
                {ad.description && <p className="text-sm text-white/70">{ad.description}</p>}
                {ad.linkUrl && (
                  <a
                    href={ad.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => recordAdAction(ad.id, "click")}
                    className="mt-4 inline-flex items-center gap-2 border border-white bg-[#C19040] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-black"
                  >
                    {ad.buttonText || (language === "hi" ? "अधिक जानें" : "Learn More")} <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* 15. Final Brand Statement Section */}
        <section className="bg-[#161612] py-24 px-5 sm:px-8 lg:px-12 border-t border-white/5">
          <div className="mx-auto max-w-[1500px] text-center space-y-6">
            <span className="mono-label text-[10px] text-[#C19040] tracking-[0.3em] uppercase block">
              // {t("bs_location")}
            </span>
            <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="block text-white">{t("bs_title_1")}</span>
              <span className="block text-transparent stroke-text">{t("bs_title_2")}</span>
              <span className="block text-white">{t("bs_title_3")}</span>
            </h2>
            <div className="mx-auto h-0.5 bg-[#C19040]/20 w-24 my-4" />
            <p className="mx-auto max-w-2xl text-xs sm:text-sm font-semibold tracking-wider text-white/70 uppercase leading-relaxed">
              {t("bs_subtitle")}
            </p>
          </div>
        </section>

        {/* 16. Inquiry Lead Generation */}
        <HimatInquiry />

        {/* Active Popup Overlay Advertisement */}
        {mounted && (() => {
          const activePopup = advertisements?.find(ad => ad.placement === "popup" && ad.isActive && !hiddenAdIds.includes(ad.id));
          if (!activePopup) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161612]/85 p-5 backdrop-blur-sm">
              <div className="relative w-full max-w-lg border border-white/10 bg-stone-900 p-8 text-white space-y-6">
                <button
                  onClick={() => handleHideAd(activePopup.id)}
                  className="absolute right-4 top-4 border border-white/20 bg-transparent px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white/60 hover:border-white hover:text-white"
                >
                  [X]
                </button>
                <div className="space-y-3">
                  <span className="mono-label text-[8px] text-white/50 uppercase tracking-widest">{language === "hi" ? "सीमित समय अलर्ट" : "LIMITED TIME ALERT"}</span>
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
                      className="flex-1 border border-white bg-[#C19040] py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-black transition-colors hover:bg-transparent hover:text-white"
                    >
                      {activePopup.buttonText || (language === "hi" ? "सौदा देखें" : "View Deal")}
                    </a>
                  )}
                  <button
                    onClick={() => handleHideAd(activePopup.id)}
                    className="flex-1 border border-white/30 bg-transparent py-3.5 text-center text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:border-white"
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
            <div className="fixed bottom-4 inset-x-5 z-40 mx-auto max-w-[1440px] border border-white/15 bg-[#161612]/95 p-5 text-white backdrop-blur-md flex flex-col justify-between items-center gap-4 md:flex-row shadow-2xl">
              <div className="flex items-center gap-4">
                <span className="mono-label text-[8px] bg-[#C19040]/10 px-2 py-1 text-white/70 uppercase">{language === "hi" ? "नवीनतम संक्षिप्त" : "LATEST BRIEF"}</span>
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
                    className="border border-white bg-[#C19040] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-black hover:bg-transparent hover:text-white transition-colors text-center w-full md:w-auto"
                  >
                    {activeFooterAd.buttonText || (language === "hi" ? "अधिक जानें" : "Learn More")}
                  </a>
                )}
                <button
                  onClick={() => handleHideAd(activeFooterAd.id)}
                  className="border border-white/20 bg-transparent px-3 py-2.5 text-[9px] font-bold uppercase tracking-[.15em] text-white/60 hover:border-white hover:text-white transition-colors"
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
