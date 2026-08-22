"use client";

import React, { useState, useTransition, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  MessageSquare,
  Star,
  Globe,
  FileText,
  Settings as SettingsIcon,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Sparkles,
  LoaderCircle,
  X,
  FileCheck,
  Menu
} from "lucide-react";
import { toast } from "sonner";
import {
  Product,
  Advertisement,
  Review,
  Brand,
  City,
  BusinessGuide,
  Setting,
  ProductValues,
  AdvertisementValues,
  ReviewValues,
  BrandValues,
  CityValues,
  BusinessGuideValues
} from "@/lib/schema";
import * as actions from "@/app/actions";

type Tab = "overview" | "products" | "advertisements" | "enquiries" | "reviews" | "network" | "guides" | "settings";

interface AdminDashboardClientProps {
  initialInquiries: any[];
  initialProducts: Product[];
  initialAdvertisements: Advertisement[];
  initialReviews: Review[];
  initialBrands: Brand[];
  initialCities: City[];
  initialGuides: BusinessGuide[];
  initialSettings: Setting[];
}

export default function AdminDashboardClient({
  initialInquiries,
  initialProducts,
  initialAdvertisements,
  initialReviews,
  initialBrands,
  initialCities,
  initialGuides,
  initialSettings
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  // Local state for records
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [products, setProducts] = useState(initialProducts);
  const [advertisements, setAdvertisements] = useState(initialAdvertisements);
  const [reviews, setReviews] = useState(initialReviews);
  const [brands, setBrands] = useState(initialBrands);
  const [cities, setCities] = useState(initialCities);
  const [guides, setGuides] = useState(initialGuides);
  const [settings, setSettings] = useState(initialSettings);

  // Search filter local states
  const [prodSearch, setProdSearch] = useState("");
  const [enqSearch, setEnqSearch] = useState("");

  // Modals state
  const [productModal, setProductModal] = useState<{ open: boolean; editId?: number; form: ProductValues }>({
    open: false,
    form: { title: "", slug: "", category: "mens wear", description: "", fabricDetails: "", moq: "200 Pcs", imageUrl: "", style: "", targetMarket: "", isActive: true }
  });

  const [adModal, setAdModal] = useState<{ open: boolean; editId?: number; form: AdvertisementValues }>({
    open: false,
    form: { title: "", description: "", imageUrl: "", linkUrl: "", buttonText: "Learn More", placement: "homepage", status: "active", isActive: true }
  });

  const [reviewModal, setReviewModal] = useState<{ open: boolean; editId?: number; form: ReviewValues }>({
    open: false,
    form: { author: "", rating: 5, text: "", date: "Today", isActive: true }
  });

  const [brandModal, setBrandModal] = useState<{ open: boolean; editId?: number; form: BrandValues }>({
    open: false,
    form: { name: "", logoUrl: "", isActive: true }
  });

  const [cityModal, setCityModal] = useState<{ open: boolean; editId?: number; form: CityValues }>({
    open: false,
    form: { name: "", latitude: "20", longitude: "78", isActive: true }
  });

  const [guideModal, setGuideModal] = useState<{ open: boolean; editId?: number; form: BusinessGuideValues }>({
    open: false,
    form: { title: "", slug: "", content: "", coverImage: "", status: "DRAFT" }
  });

  const [inquiryNotesModal, setInquiryNotesModal] = useState<{ open: boolean; id?: number; notes: string; status: "NEW" | "REPLIED" | "ARCHIVED" }>({
    open: false,
    notes: "",
    status: "NEW"
  });

  // AI & Image Upload states
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Re-fetch all data function
  const refreshData = () => {
    startTransition(async () => {
      try {
        const [p, ad, inq, rev, b, c, g, s] = await Promise.all([
          actions.listProducts(),
          actions.listAdvertisements(),
          actions.listInquiries(),
          actions.listReviews(),
          actions.listBrands(),
          actions.listCities(),
          actions.listBusinessGuides(),
          actions.listSettings()
        ]);
        setProducts(p);
        setAdvertisements(ad);
        setInquiries(inq);
        setReviews(rev);
        setBrands(b);
        setCities(c);
        setGuides(g);
        setSettings(s);
      } catch (err) {
        toast.error("Failed to sync latest database changes.");
      }
    });
  };

  // Sign out
  const handleSignOut = async () => {
    if (!confirm("Are you sure you want to sign out?")) return;
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Signed out successfully.");
        router.push("/login");
      }
    } catch (e) {
      toast.error("Failed to sign out.");
    }
  };

  // Image Upload helper
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, folder: "products" | "advertisements" | "brands" | "guides", onUploaded: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast.warning("Image must be smaller than 4MB.");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dataUrl: reader.result as string, folder })
        });
        if (res.ok) {
          const data = await res.json();
          onUploaded(data.url);
          toast.success("Image uploaded successfully.");
        } else {
          const err = await res.text();
          toast.error(err || "Upload failed.");
        }
      } catch (err) {
        toast.error("Upload error.");
      } finally {
        setIsUploading(false);
      }
    };
  };

  // Gemini AI Sourcing Description Generator helper
  const handleAiGenerate = async (fabricType: string, style: string, targetMarket: string, onGenerated: (desc: string) => void) => {
    if (!fabricType || !style || !targetMarket) {
      toast.warning("Please fill in Fabric Type, Style, and Target Market first.");
      return;
    }

    setIsAiGenerating(true);
    try {
      const res = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fabricType, style, targetMarket })
      });

      if (res.ok) {
        const data = await res.json();
        onGenerated(data.description);
        toast.success("Sourcing description generated by Gemini AI.");
      } else {
        const err = await res.text();
        toast.error(err || "Generation failed.");
      }
    } catch (err) {
      toast.error("AI generation failed.");
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col md:flex-row selection:bg-white selection:text-black">
      {/* Mobile Sidebar Overlay Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* 1. Left Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-[#090909] flex flex-col justify-between p-6 shrink-0 h-screen md:sticky md:top-0 transition-transform duration-300 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center border border-white font-display text-xs font-black tracking-tighter">
              HT
            </div>
            <div>
              <h2 className="font-display text-sm font-black uppercase leading-none">Himat Control</h2>
              <span className="mono-label text-[8px] text-white/40 block mt-1">CMS PORTAL v2.0</span>
            </div>
          </div>
 
          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "products", label: "Products Catalog", icon: Package },
              { id: "advertisements", label: "Advertisements", icon: ImageIcon },
              { id: "enquiries", label: "B2B Enquiries", icon: MessageSquare },
              { id: "reviews", label: "Client Reviews", icon: Star },
              { id: "network", label: "Network & Brands", icon: Globe },
              { id: "guides", label: "Business Guides", icon: FileText },
              { id: "settings", label: "System Settings", icon: SettingsIcon },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id as Tab)}
                className={`w-full flex items-center gap-3 px-3 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === item.id
                    ? "bg-white text-black"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="mono-label text-[8px] text-white/50">Authorized: Himat Admin</span>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-between border border-white/20 hover:border-white hover:bg-white hover:text-black py-2.5 px-4 text-[9px] font-bold uppercase tracking-[0.16em] transition-colors"
          >
            <span>Sign Out</span>
            <LogOut size={12} />
          </button>
        </div>
      </aside>

      {/* 2. Main Portal Space */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="h-16 border-b border-white/10 px-4 md:px-8 flex items-center justify-between bg-[#090909]/60 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 border border-white/20 hover:border-white text-white md:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={18} />
            </button>
            <h1 className="font-display text-base md:text-lg font-black uppercase tracking-wider">
              {activeTab === "overview" && "Gateway Overview"}
              {activeTab === "products" && "Garment Products"}
              {activeTab === "advertisements" && "Promotion Campaigns"}
              {activeTab === "enquiries" && "B2B Lead Inbox"}
              {activeTab === "reviews" && "Verified Reviews"}
              {activeTab === "network" && "Network, Cities & Brands"}
              {activeTab === "guides" && "Editorial Sourcing Guides"}
              {activeTab === "settings" && "Portal Settings"}
            </h1>
            {isPending && <LoaderCircle className="animate-spin text-white/40" size={14} />}
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={refreshData}
              className="mono-label text-[9px] border border-white/15 px-3 py-1.5 text-white/70 hover:border-white hover:text-white"
            >
              Sync Database
            </button>
            <span className="mono-label text-[9px] text-white/45">
              Current Port: 3001 (Production Restricted)
            </span>
          </div>
        </header>

        {/* Tab View Contents */}
        <main className="flex-grow p-8 overflow-y-auto">
          
          {/* ================= OVERVIEW TAB ================= */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stat Cards Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "B2B Enquiries", count: inquiries.length, desc: `${inquiries.filter(i => i.status === "NEW").length} unprocessed new leads` },
                  { label: "Active Products", count: products.filter(p => p.isActive).length, desc: "Sourcing catalog items active" },
                  { label: "Live Promotions", count: advertisements.filter(a => a.isActive).length, desc: "Dismissible banners display" },
                  { label: "Sourcing Guides", count: guides.length, desc: `${guides.reduce((acc, g) => acc + (g.views || 0), 0)} views registered` }
                ].map((stat, i) => (
                  <div key={i} className="border border-white/10 bg-[#111] p-6 space-y-4">
                    <span className="mono-label text-[9px] text-white/40 block">{stat.label}</span>
                    <div className="font-display text-4xl font-black">{stat.count}</div>
                    <p className="text-[11px] text-white/50">{stat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Sub-sections */}
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Recent leads */}
                <div className="border border-white/10 bg-[#111] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-display text-sm font-black uppercase tracking-wider">Latest B2B Enquiries</h3>
                    <button onClick={() => setActiveTab("enquiries")} className="mono-label text-[8px] text-white/50 hover:text-white">View Inbox →</button>
                  </div>
                  <div className="space-y-3">
                    {inquiries.slice(0, 5).map((inq) => (
                      <div key={inq.id} className="flex justify-between items-start border-b border-white/5 pb-2 text-xs">
                        <div>
                          <h4 className="font-bold text-white uppercase">{inq.companyName}</h4>
                          <p className="text-white/50 text-[10px] mt-0.5">{inq.productInterest} / Qty: {inq.quantity}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-[8px] font-bold uppercase mono-label ${
                          inq.status === "NEW" ? "bg-red-950 text-red-400 border border-red-800" :
                          inq.status === "REPLIED" ? "bg-emerald-950 text-emerald-400 border border-emerald-800" :
                          "bg-stone-900 text-stone-400"
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live promotion views */}
                <div className="border border-white/10 bg-[#111] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-display text-sm font-black uppercase tracking-wider">Promotion Banner Stats</h3>
                    <button onClick={() => setActiveTab("advertisements")} className="mono-label text-[8px] text-white/50 hover:text-white">View Campaign →</button>
                  </div>
                  <div className="space-y-3">
                    {advertisements.map((ad) => {
                      const ctr = ad.impressions ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : "0.0";
                      return (
                        <div key={ad.id} className="flex justify-between items-center border-b border-white/5 pb-2 text-xs">
                          <div>
                            <h4 className="font-bold text-white uppercase truncate max-w-xs">{ad.title}</h4>
                            <p className="text-white/50 text-[10px] uppercase tracking-wider mt-0.5">{ad.placement} placement</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[10px] font-bold text-white">{ad.clicks} Clicks</span>
                            <span className="text-[10px] text-white/40 block">CTR: {ctr}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= PRODUCTS TAB ================= */}
          {activeTab === "products" && (
            <div className="space-y-6">
              {/* Actions Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <input
                  type="text"
                  placeholder="Filter by title or category..."
                  value={prodSearch}
                  onChange={(e) => setProdSearch(e.target.value)}
                  className="bg-[#111] border border-white/15 py-2.5 px-4 text-xs text-white outline-none focus:border-white min-w-xs"
                />
                <button
                  onClick={() => setProductModal({ open: true, form: { title: "", slug: "", category: "mens wear", description: "", fabricDetails: "", moq: "200 Pcs", imageUrl: "", style: "", targetMarket: "", isActive: true } })}
                  className="bg-white text-black font-bold uppercase tracking-wider text-[10px] px-5 py-3.5 flex items-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  <Plus size={14} /> Add New Product
                </button>
              </div>

              {/* Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products
                  .filter(p => p.title.toLowerCase().includes(prodSearch.toLowerCase()) || p.category.toLowerCase().includes(prodSearch.toLowerCase()))
                  .map((p) => (
                    <div key={p.id} className="border border-white/10 bg-[#111] flex flex-col justify-between group hover:border-white/20 transition-all">
                      <div>
                        <div className="aspect-[4/3] bg-neutral-900 overflow-hidden relative">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.title} className="h-full w-full object-cover transition-all duration-500" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold uppercase tracking-widest text-[9px]">No image</div>
                          )}
                          <span className={`absolute right-3 top-3 px-2 py-0.5 text-[8px] font-bold uppercase mono-label ${
                            p.isActive ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-red-950 text-red-400 border border-red-800"
                          }`}>
                            {p.isActive ? "ACTIVE" : "INACTIVE"}
                          </span>
                        </div>
                        <div className="p-5 space-y-3">
                          <span className="mono-label text-[9px] text-white/45 block">{p.category} / MOQ {p.moq}</span>
                          <h3 className="font-display text-xl font-black uppercase tracking-tight leading-none text-white">{p.title}</h3>
                          <p className="text-xs text-white/50 line-clamp-3">{p.description}</p>
                          <div className="border-t border-white/10 pt-3 text-[10px] text-white/40">
                            <strong>Fabric:</strong> {p.fabricDetails}
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0 border-t border-white/5 mt-4 flex gap-2">
                        <button
                          onClick={() => setProductModal({ open: true, editId: p.id, form: { ...p } })}
                          className="flex-1 border border-white/15 hover:border-white text-[9px] font-bold uppercase py-2.5 flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Edit size={12} /> Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete product "${p.title}"?`)) return;
                            await actions.deleteProduct(p.id);
                            toast.success("Product deleted.");
                            refreshData();
                          }}
                          className="border border-red-950 text-red-400 hover:bg-red-950/20 py-2.5 px-3 flex items-center justify-center transition-colors"
                          aria-label="Delete product"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ================= ADVERTISEMENTS TAB ================= */}
          {activeTab === "advertisements" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setAdModal({ open: true, form: { title: "", description: "", imageUrl: "", linkUrl: "", buttonText: "Learn More", placement: "homepage", status: "active", isActive: true } })}
                  className="bg-white text-black font-bold uppercase tracking-wider text-[10px] px-5 py-3.5 flex items-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  <Plus size={14} /> Add Advertisement Banner
                </button>
              </div>

              {/* Table */}
              <div className="border border-white/10 bg-[#111] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="mono-label text-[9px] text-white/50 border-b border-white/10 bg-[#090909]">
                    <tr>
                      <th className="p-4">Title & Placement</th>
                      <th className="p-4">Link URL</th>
                      <th className="p-4">Impressions</th>
                      <th className="p-4">Clicks</th>
                      <th className="p-4">CTR</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {advertisements.map((ad) => {
                      const ctr = ad.impressions ? ((ad.clicks / ad.impressions) * 100).toFixed(1) : "0.0";
                      return (
                        <tr key={ad.id} className="hover:bg-white/5">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {ad.imageUrl && <img src={ad.imageUrl} alt="" className="h-10 w-16 object-cover bg-stone-800 border border-white/10 shrink-0" />}
                              <div>
                                <h4 className="font-bold text-white uppercase">{ad.title}</h4>
                                <span className="mono-label text-[8px] text-white/40 block mt-0.5">{ad.placement}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-white/50 font-mono text-[10px] break-all">{ad.linkUrl || "—"}</td>
                          <td className="p-4 font-bold text-white">{ad.impressions}</td>
                          <td className="p-4 font-bold text-white">{ad.clicks}</td>
                          <td className="p-4 font-bold text-white">{ctr}%</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 text-[8px] font-bold uppercase mono-label ${
                              ad.isActive ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-red-950 text-red-400 border border-red-800"
                            }`}>
                              {ad.isActive ? "ACTIVE" : "INACTIVE"}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => setAdModal({ open: true, editId: ad.id, form: { ...ad } })}
                                className="border border-white/10 hover:border-white p-2 transition-colors"
                              >
                                <Edit size={12} />
                              </button>
                              <button
                                onClick={async () => {
                                  if (!confirm(`Delete advertisement "${ad.title}"?`)) return;
                                  await actions.deleteAdvertisement(ad.id);
                                  toast.success("Ad deleted.");
                                  refreshData();
                                }}
                                className="border border-red-950 text-red-400 hover:bg-red-950/20 p-2 transition-colors"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= ENQUIRIES TAB ================= */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Search leads by company, contact, or email..."
                value={enqSearch}
                onChange={(e) => setEnqSearch(e.target.value)}
                className="bg-[#111] border border-white/15 py-2.5 px-4 text-xs text-white outline-none focus:border-white min-w-xs"
              />

              {/* Leads Table */}
              <div className="border border-white/10 bg-[#111] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="mono-label text-[9px] text-white/50 border-b border-white/10 bg-[#090909]">
                    <tr>
                      <th className="p-4">Company & Buyer</th>
                      <th className="p-4">Contact Channels</th>
                      <th className="p-4">Interest & Volume</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Admin Notes</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {inquiries
                      .filter(i => 
                        (i.companyName || "").toLowerCase().includes(enqSearch.toLowerCase()) || 
                        (i.contactName || "").toLowerCase().includes(enqSearch.toLowerCase()) ||
                        (i.email || "").toLowerCase().includes(enqSearch.toLowerCase())
                      )
                      .map((inq) => (
                        <tr key={inq.id} className="hover:bg-white/5 align-top">
                          <td className="p-4">
                            <h4 className="font-bold text-white uppercase">{inq.companyName}</h4>
                            <span className="text-[10px] text-white/45 block mt-0.5">{inq.contactName || "no name"}</span>
                          </td>
                          <td className="p-4 space-y-1 text-white/60">
                            <div className="font-mono text-[10px]">{inq.email || "—"}</div>
                            <div className="text-[10px]">{inq.phone || "—"}</div>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-white uppercase tracking-wider text-[10px] block">{inq.productInterest}</span>
                            <span className="text-[10px] text-white/45 mt-0.5 block">MOQ Qty: {inq.quantity}</span>
                          </td>
                          <td className="p-4 max-w-xs">
                            <p className="text-white/70 line-clamp-3 text-[11px] leading-relaxed break-words">{inq.message}</p>
                          </td>
                          <td className="p-4 max-w-xs text-amber-300/80 text-[10px] italic leading-normal">
                            {inq.adminNotes || "No notes"}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 text-[8px] font-bold uppercase mono-label ${
                              inq.status === "NEW" ? "bg-red-950 text-red-400 border border-red-800" :
                              inq.status === "REPLIED" ? "bg-emerald-950 text-emerald-400 border border-emerald-800" :
                              "bg-stone-900 text-stone-400 animate-none"
                            }`}>
                              {inq.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => setInquiryNotesModal({ open: true, id: inq.id, notes: inq.adminNotes || "", status: inq.status })}
                                className="border border-white/10 hover:border-white px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                              >
                                <FileCheck size={11} /> Reply / Log
                              </button>
                              <button
                                onClick={async () => {
                                  if (!confirm("Delete lead permanently?")) return;
                                  await actions.deleteInquiry(inq.id);
                                  toast.success("Lead removed.");
                                  refreshData();
                                }}
                                className="border border-red-950 text-red-400 hover:bg-red-950/20 p-2.5 transition-colors"
                                aria-label="Delete inquiry"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= REVIEWS TAB ================= */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setReviewModal({ open: true, form: { author: "", rating: 5, text: "", date: "Today", isActive: true } })}
                  className="bg-white text-black font-bold uppercase tracking-wider text-[10px] px-5 py-3.5 flex items-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  <Plus size={14} /> Add Client Review
                </button>
              </div>

              {/* Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="border border-white/10 bg-[#111] p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-amber-500 fill-amber-500">
                          {Array(rev.rating).fill(0).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                        <span className="text-[9px] text-white/40 font-mono">{rev.date || "verified"}</span>
                      </div>
                      <p className="text-sm italic text-white/80 leading-relaxed">"{rev.text}"</p>
                      <h4 className="mt-4 font-bold text-xs uppercase text-white/60 tracking-wider">— {rev.author}</h4>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-6 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="mono-label text-[8px] uppercase tracking-wider text-white/50">Status</span>
                        <span className={`px-2 py-0.5 text-[8px] font-bold uppercase mono-label ${
                          rev.isActive ? "bg-emerald-950 text-emerald-400 border border-emerald-800" :
                          "bg-red-950 text-red-400 border border-red-800 animate-pulse"
                        }`}>
                          {rev.isActive ? "APPROVED" : "PENDING APPROVAL"}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {!rev.isActive && (
                          <button
                            onClick={async () => {
                              await actions.updateReview(rev.id, { isActive: true });
                              toast.success("Review approved and published!");
                              refreshData();
                            }}
                            className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white text-[9px] font-bold uppercase py-2 flex items-center justify-center gap-1 transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => setReviewModal({ open: true, editId: rev.id, form: { ...rev } })}
                          className="flex-1 border border-white/15 hover:border-white text-[9px] font-bold uppercase py-2 flex items-center justify-center gap-1 transition-colors"
                        >
                          <Edit size={11} /> Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete review from "${rev.author}"?`)) return;
                            await actions.deleteReview(rev.id);
                            toast.success("Review deleted.");
                            refreshData();
                          }}
                          className="border border-red-950 text-red-400 hover:bg-red-950/20 px-3 py-2 flex items-center justify-center transition-colors"
                          aria-label="Delete review"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= NETWORK & BRANDS TAB ================= */}
          {activeTab === "network" && (
            <div className="space-y-8">
              {/* Brands Panel */}
              <div className="border border-white/10 bg-[#111] p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <h3 className="font-display text-sm font-black uppercase tracking-wider">Partnership Brands</h3>
                  <button
                    onClick={() => setBrandModal({ open: true, form: { name: "", logoUrl: "", isActive: true } })}
                    className="border border-white/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider hover:border-white"
                  >
                    Add Brand Partner
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {brands.map((b) => (
                    <div key={b.id} className="border border-white/5 bg-black p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white uppercase text-xs">{b.name}</h4>
                        {b.logoUrl && <span className="text-[9px] text-white/40 block truncate max-w-[120px] mt-0.5">{b.logoUrl}</span>}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setBrandModal({ open: true, editId: b.id, form: { ...b } })}
                          className="border border-white/10 hover:border-white p-1.5 transition-colors"
                        >
                          <Edit size={11} />
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete brand "${b.name}"?`)) return;
                            await actions.deleteBrand(b.id);
                            toast.success("Brand deleted.");
                            refreshData();
                          }}
                          className="border border-red-950 text-red-400 hover:bg-red-950/20 p-1.5 transition-colors"
                          aria-label="Delete brand"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cities Panel */}
              <div className="border border-white/10 bg-[#111] p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <h3 className="font-display text-sm font-black uppercase tracking-wider">Network Hub Cities</h3>
                  <button
                    onClick={() => setCityModal({ open: true, form: { name: "", latitude: "20", longitude: "78", isActive: true } })}
                    className="border border-white/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider hover:border-white"
                  >
                    Add City Hub
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {cities.map((c) => (
                    <div key={c.id} className="border border-white/5 bg-black p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white uppercase text-xs">{c.name}</h4>
                        <span className="text-[9px] text-white/40 block mt-0.5">Lat: {c.latitude}, Lng: {c.longitude}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCityModal({ open: true, editId: c.id, form: { ...c } })}
                          className="border border-white/10 hover:border-white p-1.5 transition-colors"
                        >
                          <Edit size={11} />
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete city "${c.name}"?`)) return;
                            await actions.deleteCity(c.id);
                            toast.success("City deleted.");
                            refreshData();
                          }}
                          className="border border-red-950 text-red-400 hover:bg-red-950/20 p-1.5 transition-colors"
                          aria-label="Delete city"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= BUSINESS GUIDES TAB ================= */}
          {activeTab === "guides" && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setGuideModal({ open: true, form: { title: "", slug: "", content: "", coverImage: "", status: "DRAFT" } })}
                  className="bg-white text-black font-bold uppercase tracking-wider text-[10px] px-5 py-3.5 flex items-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  <Plus size={14} /> Add Business Guide
                </button>
              </div>

              {/* Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {guides.map((g) => (
                  <div key={g.id} className="border border-white/10 bg-[#111] p-6 flex flex-col justify-between">
                    <div>
                      {g.coverImage && <img src={g.coverImage} alt="" className="aspect-video w-full object-cover mb-4 border border-white/10" />}
                      <span className="mono-label text-[8px] bg-white/15 px-2 py-0.5 text-white/70 uppercase">{g.status}</span>
                      <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white mt-2 leading-none">{g.title}</h3>
                      <p className="text-[10px] font-mono text-white/40 mt-1">/guide/{g.slug}</p>
                      <p className="mt-3 text-xs leading-relaxed text-white/60 line-clamp-4">{g.content}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="mono-label text-[9px] text-white/40">{g.views} Reads</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setGuideModal({ open: true, editId: g.id, form: { ...g } })}
                          className="border border-white/15 hover:border-white px-3 py-1.5 text-[9px] font-bold uppercase flex items-center gap-1 transition-colors"
                        >
                          <Edit size={11} /> Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm(`Delete guide "${g.title}"?`)) return;
                            await actions.deleteBusinessGuide(g.id);
                            toast.success("Guide deleted.");
                            refreshData();
                          }}
                          className="border border-red-950 text-red-400 hover:bg-red-950/20 p-2 transition-colors"
                          aria-label="Delete guide"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= SETTINGS TAB ================= */}
          {activeTab === "settings" && (
            <div className="max-w-2xl border border-white/10 bg-[#111] p-8 space-y-6">
              <div className="border-b border-white/10 pb-3">
                <span className="mono-label text-[9px] text-white/40">Configuration</span>
                <h3 className="font-display text-lg font-black uppercase tracking-wider mt-1">Global System Settings</h3>
              </div>

              <div className="space-y-4">
                {[
                  { key: "admin_alert_email", label: "Business Alert Email Address", placeholder: "owner@himattextile.com", desc: "Incoming B2B inquiries will dispatch alerts to this address." },
                  { key: "whatsapp_contact_number", label: "WhatsApp Sourcing Mobile", placeholder: "+919876543210", desc: "Country-code prefix included. Connects buyers directly." }
                ].map((item) => {
                  const savedVal = settings.find(s => s.key === item.key)?.value || "";
                  return (
                    <div key={item.key} className="space-y-1.5">
                      <label className="mono-label text-[9px] text-white/55 block">{item.label}</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          defaultValue={savedVal}
                          id={`setting-${item.key}`}
                          placeholder={item.placeholder}
                          className="flex-1 bg-black border border-white/10 px-4 py-3 text-xs text-white outline-none focus:border-white/30"
                        />
                        <button
                          onClick={async () => {
                            const val = (document.getElementById(`setting-${item.key}`) as HTMLInputElement)?.value || "";
                            await actions.setSetting(item.key, val);
                            toast.success("System setting updated.");
                            refreshData();
                          }}
                          className="bg-white text-black font-bold uppercase tracking-wider text-[9px] px-4 py-2 hover:bg-neutral-200 transition-colors"
                        >
                          Save
                        </button>
                      </div>
                      <p className="text-[10px] text-white/40 leading-normal">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ================= PRODUCT MODAL ================= */}
      {productModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl border border-white/10 bg-stone-900 p-8 space-y-6 text-xs max-h-[90vh] overflow-y-auto">
            <button onClick={() => setProductModal({ open: false, form: productModal.form })} className="absolute right-4 top-4 text-white/40 hover:text-white"><X size={18} /></button>
            <h3 className="font-display text-2xl font-black uppercase tracking-wider border-b border-white/10 pb-3">{productModal.editId ? "Edit Product" : "Add Product"}</h3>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (productModal.editId) {
                await actions.updateProduct(productModal.editId, productModal.form);
                toast.success("Product updated.");
              } else {
                await actions.createProduct(productModal.form);
                toast.success("Product created.");
              }
              setProductModal({ open: false, form: productModal.form });
              refreshData();
            }} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Product Title</label>
                  <input required type="text" value={productModal.form.title} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, title: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Slug</label>
                  <input required type="text" value={productModal.form.slug} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, slug: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Category</label>
                  <select value={productModal.form.category} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, category: e.target.value as any } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white">
                    <option value="mens wear">men's wear</option>
                    <option value="womens wear">women's wear</option>
                    <option value="kids wear">kids' wear</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">MOQ Requirement</label>
                  <input required type="text" value={productModal.form.moq} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, moq: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Garment Style</label>
                  <input type="text" placeholder="e.g. Polo Shirt" value={productModal.form.style || ""} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, style: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Fabric Type & Specifications</label>
                  <input required type="text" placeholder="e.g. 240 GSM Combed Cotton" value={productModal.form.fabricDetails} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, fabricDetails: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Target Sourcing Market</label>
                  <input type="text" placeholder="e.g. Premium retail brands" value={productModal.form.targetMarket || ""} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, targetMarket: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
              </div>

              {/* Gemini AI Generator */}
              <div className="border border-white/10 bg-black/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="mono-label text-[9px] text-amber-400 font-bold flex items-center gap-1"><Sparkles size={11} /> Gemini AI Sourcing Copywriter</span>
                  <button type="button" disabled={isAiGenerating} onClick={() => handleAiGenerate(productModal.form.fabricDetails, productModal.form.style || "", productModal.form.targetMarket || "", desc => setProductModal({ ...productModal, form: { ...productModal.form, description: desc } }))} className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-800/40 text-black font-black uppercase text-[8px] px-3 py-1.5 tracking-wider">
                    {isAiGenerating ? "Generating..." : "Generate Description"}
                  </button>
                </div>
                <p className="text-[10px] text-white/40 leading-normal">Fills the description area using authoritative copy optimized for B2B buyers.</p>
              </div>

              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Product Description</label>
                <textarea required rows={4} value={productModal.form.description} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, description: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 items-end">
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Product Image URL</label>
                  <input type="text" value={productModal.form.imageUrl || ""} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, imageUrl: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Upload Image to Cloudinary</label>
                  <input type="file" accept="image/*" disabled={isUploading} onChange={e => handleImageUpload(e, "products", url => setProductModal({ ...productModal, form: { ...productModal.form, imageUrl: url } }))} className="w-full bg-black border border-white/10 px-3 py-1 text-white outline-none focus:border-white" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="prod-active" checked={productModal.form.isActive} onChange={e => setProductModal({ ...productModal, form: { ...productModal.form, isActive: e.target.checked } })} />
                <label htmlFor="prod-active" className="mono-label text-[9px] text-white/60">Display active in catalog</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setProductModal({ open: false, form: productModal.form })} className="border border-white/15 px-4 py-2.5 uppercase font-bold text-[9px] tracking-wider hover:border-white">Cancel</button>
                <button type="submit" className="bg-white text-black font-bold uppercase text-[9px] tracking-wider px-6 py-2.5 hover:bg-neutral-200">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= ADVERTISEMENT MODAL ================= */}
      {adModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
          <div className="relative w-full max-w-lg border border-white/10 bg-stone-900 p-8 space-y-6 text-xs">
            <button onClick={() => setAdModal({ open: false, form: adModal.form })} className="absolute right-4 top-4 text-white/40 hover:text-white"><X size={18} /></button>
            <h3 className="font-display text-2xl font-black uppercase tracking-wider border-b border-white/10 pb-3">{adModal.editId ? "Edit Advertisement" : "Add Advertisement"}</h3>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (adModal.editId) {
                await actions.updateAdvertisement(adModal.editId, adModal.form);
                toast.success("Ad updated.");
              } else {
                await actions.createAdvertisement(adModal.form);
                toast.success("Ad created.");
              }
              setAdModal({ open: false, form: adModal.form });
              refreshData();
            }} className="space-y-4">
              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Campaign Title</label>
                <input required type="text" value={adModal.form.title} onChange={e => setAdModal({ ...adModal, form: { ...adModal.form, title: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
              </div>

              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Campaign Description</label>
                <textarea rows={3} value={adModal.form.description || ""} onChange={e => setAdModal({ ...adModal, form: { ...adModal.form, description: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Placement Zone</label>
                  <select value={adModal.form.placement} onChange={e => setAdModal({ ...adModal, form: { ...adModal.form, placement: e.target.value as any } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white">
                    <option value="homepage">Homepage Banner</option>
                    <option value="hero">Featured Sponsorship</option>
                    <option value="midpage">Midpage Announcement</option>
                    <option value="popup">Overlay Popup</option>
                    <option value="footer">Sticky Footer Brief</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Button Text</label>
                  <input type="text" value={adModal.form.buttonText || ""} onChange={e => setAdModal({ ...adModal, form: { ...adModal.form, buttonText: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Call-to-Action Link URL</label>
                <input type="text" placeholder="https://" value={adModal.form.linkUrl || ""} onChange={e => setAdModal({ ...adModal, form: { ...adModal.form, linkUrl: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 items-end">
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Banner Image URL</label>
                  <input type="text" value={adModal.form.imageUrl || ""} onChange={e => setAdModal({ ...adModal, form: { ...adModal.form, imageUrl: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Upload Image</label>
                  <input type="file" accept="image/*" disabled={isUploading} onChange={e => handleImageUpload(e, "advertisements", url => setAdModal({ ...adModal, form: { ...adModal.form, imageUrl: url } }))} className="w-full bg-black border border-white/10 px-3 py-1 text-white outline-none focus:border-white" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="ad-active" checked={adModal.form.isActive} onChange={e => setAdModal({ ...adModal, form: { ...adModal.form, isActive: e.target.checked } })} />
                <label htmlFor="ad-active" className="mono-label text-[9px] text-white/60">Activate campaign</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setAdModal({ open: false, form: adModal.form })} className="border border-white/15 px-4 py-2.5 uppercase font-bold text-[9px] tracking-wider hover:border-white">Cancel</button>
                <button type="submit" className="bg-white text-black font-bold uppercase text-[9px] tracking-wider px-6 py-2.5 hover:bg-neutral-200">Save Ad</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= REVIEW MODAL ================= */}
      {reviewModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
          <div className="relative w-full max-w-md border border-white/10 bg-stone-900 p-8 space-y-6 text-xs">
            <button onClick={() => setReviewModal({ open: false, form: reviewModal.form })} className="absolute right-4 top-4 text-white/40 hover:text-white"><X size={18} /></button>
            <h3 className="font-display text-xl font-black uppercase tracking-wider border-b border-white/10 pb-3">{reviewModal.editId ? "Edit Review" : "Add Review"}</h3>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (reviewModal.editId) {
                await actions.updateReview(reviewModal.editId, reviewModal.form);
                toast.success("Review updated.");
              } else {
                await actions.createReview(reviewModal.form);
                toast.success("Review created.");
              }
              setReviewModal({ open: false, form: reviewModal.form });
              refreshData();
            }} className="space-y-4">
              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Author & Title</label>
                <input required type="text" placeholder="e.g. Ramesh K. (Distributor)" value={reviewModal.form.author} onChange={e => setReviewModal({ ...reviewModal, form: { ...reviewModal.form, author: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Rating Stars (1-5)</label>
                  <select value={reviewModal.form.rating} onChange={e => setReviewModal({ ...reviewModal, form: { ...reviewModal.form, rating: Number(e.target.value) } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white">
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Published Date</label>
                  <input required type="text" value={reviewModal.form.date || ""} onChange={e => setReviewModal({ ...reviewModal, form: { ...reviewModal.form, date: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Review Text Content</label>
                <textarea required rows={4} value={reviewModal.form.text} onChange={e => setReviewModal({ ...reviewModal, form: { ...reviewModal.form, text: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setReviewModal({ open: false, form: reviewModal.form })} className="border border-white/15 px-4 py-2.5 uppercase font-bold text-[9px] tracking-wider hover:border-white">Cancel</button>
                <button type="submit" className="bg-white text-black font-bold uppercase text-[9px] tracking-wider px-6 py-2.5 hover:bg-neutral-200">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= BRAND MODAL ================= */}
      {brandModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
          <div className="relative w-full max-w-md border border-white/10 bg-stone-900 p-8 space-y-6 text-xs">
            <button onClick={() => setBrandModal({ open: false, form: brandModal.form })} className="absolute right-4 top-4 text-white/40 hover:text-white"><X size={18} /></button>
            <h3 className="font-display text-xl font-black uppercase tracking-wider border-b border-white/10 pb-3">{brandModal.editId ? "Edit Brand" : "Add Brand"}</h3>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (brandModal.editId) {
                await actions.updateBrand(brandModal.editId, brandModal.form);
                toast.success("Brand updated.");
              } else {
                await actions.createBrand(brandModal.form);
                toast.success("Brand created.");
              }
              setBrandModal({ open: false, form: brandModal.form });
              refreshData();
            }} className="space-y-4">
              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Brand Name</label>
                <input required type="text" value={brandModal.form.name} onChange={e => setBrandModal({ ...brandModal, form: { ...brandModal.form, name: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 items-end">
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Logo Image URL</label>
                  <input type="text" value={brandModal.form.logoUrl || ""} onChange={e => setBrandModal({ ...brandModal, form: { ...brandModal.form, logoUrl: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Upload Logo</label>
                  <input type="file" accept="image/*" disabled={isUploading} onChange={e => handleImageUpload(e, "brands", url => setBrandModal({ ...brandModal, form: { ...brandModal.form, logoUrl: url } }))} className="w-full bg-black border border-white/10 px-3 py-1 text-white outline-none focus:border-white" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setBrandModal({ open: false, form: brandModal.form })} className="border border-white/15 px-4 py-2.5 uppercase font-bold text-[9px] tracking-wider hover:border-white">Cancel</button>
                <button type="submit" className="bg-white text-black font-bold uppercase text-[9px] tracking-wider px-6 py-2.5 hover:bg-neutral-200">Save Brand</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= CITY MODAL ================= */}
      {cityModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
          <div className="relative w-full max-w-md border border-white/10 bg-stone-900 p-8 space-y-6 text-xs">
            <button onClick={() => setCityModal({ open: false, form: cityModal.form })} className="absolute right-4 top-4 text-white/40 hover:text-white"><X size={18} /></button>
            <h3 className="font-display text-xl font-black uppercase tracking-wider border-b border-white/10 pb-3">{cityModal.editId ? "Edit City Hub" : "Add City Hub"}</h3>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (cityModal.editId) {
                await actions.updateCity(cityModal.editId, cityModal.form);
                toast.success("City hub updated.");
              } else {
                await actions.createCity(cityModal.form);
                toast.success("City hub created.");
              }
              setCityModal({ open: false, form: cityModal.form });
              refreshData();
            }} className="space-y-4">
              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">City Hub Name</label>
                <input required type="text" value={cityModal.form.name} onChange={e => setCityModal({ ...cityModal, form: { ...cityModal.form, name: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Latitude (Y mapping)</label>
                  <input required type="text" value={cityModal.form.latitude || ""} onChange={e => setCityModal({ ...cityModal, form: { ...cityModal.form, latitude: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Longitude (X mapping)</label>
                  <input required type="text" value={cityModal.form.longitude || ""} onChange={e => setCityModal({ ...cityModal, form: { ...cityModal.form, longitude: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setCityModal({ open: false, form: cityModal.form })} className="border border-white/15 px-4 py-2.5 uppercase font-bold text-[9px] tracking-wider hover:border-white">Cancel</button>
                <button type="submit" className="bg-white text-black font-bold uppercase text-[9px] tracking-wider px-6 py-2.5 hover:bg-neutral-200">Save Hub</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= GUIDE MODAL ================= */}
      {guideModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl border border-white/10 bg-stone-900 p-8 space-y-6 text-xs max-h-[90vh] overflow-y-auto">
            <button onClick={() => setGuideModal({ open: false, form: guideModal.form })} className="absolute right-4 top-4 text-white/40 hover:text-white"><X size={18} /></button>
            <h3 className="font-display text-2xl font-black uppercase tracking-wider border-b border-white/10 pb-3">{guideModal.editId ? "Edit Business Guide" : "Add Business Guide"}</h3>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (guideModal.editId) {
                await actions.updateBusinessGuide(guideModal.editId, guideModal.form);
                toast.success("Guide updated.");
              } else {
                await actions.createBusinessGuide(guideModal.form);
                toast.success("Guide created.");
              }
              setGuideModal({ open: false, form: guideModal.form });
              refreshData();
            }} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Guide Title</label>
                  <input required type="text" value={guideModal.form.title} onChange={e => setGuideModal({ ...guideModal, form: { ...guideModal.form, title: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
                <div className="space-y-1">
                  <label className="mono-label text-[9px] text-white/50 block">Slug (URL friendly)</label>
                  <input required type="text" value={guideModal.form.slug} onChange={e => setGuideModal({ ...guideModal, form: { ...guideModal.form, slug: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Cover Image URL</label>
                <div className="flex gap-4 items-end">
                  <input type="text" value={guideModal.form.coverImage || ""} onChange={e => setGuideModal({ ...guideModal, form: { ...guideModal.form, coverImage: e.target.value } })} className="flex-1 bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
                  <input type="file" accept="image/*" disabled={isUploading} onChange={e => handleImageUpload(e, "guides", url => setGuideModal({ ...guideModal, form: { ...guideModal.form, coverImage: url } }))} className="bg-black border border-white/10 px-3 py-1 text-white outline-none focus:border-white text-[10px]" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Publish Status</label>
                <select value={guideModal.form.status} onChange={e => setGuideModal({ ...guideModal, form: { ...guideModal.form, status: e.target.value as any } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white">
                  <option value="DRAFT">draft</option>
                  <option value="PUBLISHED">published</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Article Markdown Content</label>
                <textarea required rows={10} value={guideModal.form.content} onChange={e => setGuideModal({ ...guideModal, form: { ...guideModal.form, content: e.target.value } })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white font-mono" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setGuideModal({ open: false, form: guideModal.form })} className="border border-white/15 px-4 py-2.5 uppercase font-bold text-[9px] tracking-wider hover:border-white">Cancel</button>
                <button type="submit" className="bg-white text-black font-bold uppercase text-[9px] tracking-wider px-6 py-2.5 hover:bg-neutral-200">Save Guide</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= INQUIRY NOTES MODAL ================= */}
      {inquiryNotesModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
          <div className="relative w-full max-w-md border border-white/10 bg-stone-900 p-8 space-y-6 text-xs">
            <button onClick={() => setInquiryNotesModal({ open: false, notes: "", status: "NEW" })} className="absolute right-4 top-4 text-white/40 hover:text-white"><X size={18} /></button>
            <h3 className="font-display text-xl font-black uppercase tracking-wider border-b border-white/10 pb-3">Update B2B Lead Status</h3>

            <form onSubmit={async (e) => {
              e.preventDefault();
              if (inquiryNotesModal.id) {
                await actions.updateInquiry(inquiryNotesModal.id, {
                  status: inquiryNotesModal.status,
                  adminNotes: inquiryNotesModal.notes
                });
                toast.success("Lead status updated.");
              }
              setInquiryNotesModal({ open: false, notes: "", status: "NEW" });
              refreshData();
            }} className="space-y-4">
              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Lead Status</label>
                <select value={inquiryNotesModal.status} onChange={e => setInquiryNotesModal({ ...inquiryNotesModal, status: e.target.value as any })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white">
                  <option value="NEW">NEW</option>
                  <option value="REPLIED">REPLIED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="mono-label text-[9px] text-white/50 block">Internal Admin Notes & Log</label>
                <textarea rows={4} value={inquiryNotesModal.notes} onChange={e => setInquiryNotesModal({ ...inquiryNotesModal, notes: e.target.value })} className="w-full bg-black border border-white/10 px-3 py-2 text-white outline-none focus:border-white" />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setInquiryNotesModal({ open: false, notes: "", status: "NEW" })} className="border border-white/15 px-4 py-2.5 uppercase font-bold text-[9px] tracking-wider hover:border-white">Cancel</button>
                <button type="submit" className="bg-white text-black font-bold uppercase text-[9px] tracking-wider px-6 py-2.5 hover:bg-neutral-200">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
