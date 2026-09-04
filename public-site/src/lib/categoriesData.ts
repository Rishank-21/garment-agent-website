export interface HimatVariantItem {
  name: string;
  note: string;
  image: string;
}

export type HimatCategoryTone =
  | "tone-ink"
  | "tone-paper"
  | "tone-terracotta-light"
  | "tone-maroon-rich"
  | "tone-gold-light"
  | "tone-warm-sand"
  | "tone-slate-light"
  | "tone-slate-dark";

export interface HimatCategoryItem {
  id: string;
  index: string;
  title: string;
  line: string;
  description: string;
  tone: HimatCategoryTone;
  detailImage: string;
  fabric: string;
  finish: string;
  colors: string[];
  variants: HimatVariantItem[];
}

export const HIMAT_CATEGORIES: HimatCategoryItem[] = [
  {
    id: "mens-wear",
    index: "01",
    title: "Men's Wear",
    line: "Sharper cuts. Direct Ahmedabad mill pricing.",
    description: "From daily wear pre-shrunk cotton chinos to breathable 60s pure linen shirts, source volume readymade menswear lines built for high retail repeat turnarounds.",
    tone: "tone-ink",
    detailImage: "/manus-storage/mafatlal-materials-detail_6b9c0b66.jpg",
    fabric: "Combed Cotton & Pure Linen",
    finish: "180–240 GSM pre-shrunk twill & poplin",
    colors: ["#171A1D", "#B18443", "#FE6311", "#3B4D3C"],
    variants: [
      { name: "Cotton Twill Chinos", note: "240 GSM / pre-shrunk twill weave", image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800" },
      { name: "Pure Linen Shirts", note: "60s pure linen blend / breathable drape", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800" },
      { name: "Combed Cotton Tees", note: "180 GSM bio-wash / soft jersey", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800" },
      { name: "Everyday Stretch Lowers", note: "Terry cotton blend / ribbed cuffs", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800" },
    ],
  },
  {
    id: "womens-wear",
    index: "02",
    title: "Women's Wear",
    line: "Fast-moving commercial designs for retail demand.",
    description: "Vibrant ethnic ensembles, contemporary western silhouettes, and everyday co-ord sets updated weekly to match seasonal festival and retail buying calendars.",
    tone: "tone-terracotta-light",
    detailImage: "/images/ethnic_wear.jpg",
    fabric: "14 Kg Heavy Rayon & Slub Cotton",
    finish: "Colorfast reactive print & foil finish",
    colors: ["#FE6311", "#831843", "#171A1D", "#D97706"],
    variants: [
      { name: "Printed 2-Pc Co-Ord Sets", note: "14 Kg heavy rayon / foil detailing", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800" },
      { name: "Straight Daily Kurtis", note: "100% breathable cotton / round neck", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800" },
      { name: "Western Blouses & Tunics", note: "Combed poplin / tailored drape", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800" },
      { name: "Flared Rayon Palazzos", note: "Elasticated waistband / fluid fall", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800" },
    ],
  },
  {
    id: "kids-wear",
    index: "03",
    title: "Kids Wear",
    line: "Gentle on skin. Built for daily play and repeat wash.",
    description: "Tested for zero harsh chemical residue, heavy reinforced seams, and breathable combed cotton knits designed for playful movement and repeat commercial laundry cycles.",
    tone: "tone-gold-light",
    detailImage: "/manus-storage/mafatlal-materials-detail_6b9c0b66.jpg",
    fabric: "100% Bio-Washed Combed Cotton",
    finish: "180 GSM single jersey & interlock knit",
    colors: ["#2563EB", "#F59E0B", "#10B981", "#EC4899"],
    variants: [
      { name: "Boys Co-Ord Short Sets", note: "Combed cotton / crew-neck & shorts", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800" },
      { name: "Girls Festive Cotton Frocks", note: "Soft cambric prints / delicate frills", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800" },
      { name: "Infant & Toddler Playwear", note: "Nickel-free snap buttons / bio-soft", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=800" },
    ],
  },
  {
    id: "ethnic-wear",
    index: "04",
    title: "Ethnic Ensembles",
    line: "Craft traditions translated into production volume.",
    description: "Rooted in Ahmedabad's historic printing hubs (Safal & Gheekanta), combining artisan hand-block motifs, zari highlights, and discharge prints with factory scale delivery.",
    tone: "tone-maroon-rich",
    detailImage: "/images/ethnic_wear.jpg",
    fabric: "Mulmul Cotton, Chanderi & Rayon",
    finish: "Pre-shrunk wash with metallic accents",
    colors: ["#7C2D12", "#B45309", "#15803D", "#1E3A8A"],
    variants: [
      { name: "Embroidered Kurta Sets", note: "Zari neck detailing with dupatta", image: "/images/ethnic_wear.jpg" },
      { name: "Artisan Hand-Block Tunics", note: "Natural Bagru & Dabu block prints", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800" },
      { name: "Festive Anarkali Ensembles", note: "Flowing flared silhouette / gold border", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800" },
    ],
  },
  {
    id: "western-wear",
    index: "05",
    title: "Western Apparel",
    line: "Modern silhouettes ready for boutique and retail shelves.",
    description: "Clean-lined urban styling, fine collar fusing, smooth buttonholing, and export-grade sewing for multi-brand stores and emerging fashion labels.",
    tone: "tone-slate-light",
    detailImage: "/manus-storage/stitchform-hero-manufacturing_f2850b59.jpg",
    fabric: "Cotton Oxford, Tencel & Poplin",
    finish: "Fine yarn count with peached hand feel",
    colors: ["#1F2937", "#0284C7", "#FAF8F5", "#D97706"],
    variants: [
      { name: "Resort Cuban Collar Shirts", note: "Breathable drape / relaxed boxy fit", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800" },
      { name: "Tailored Stretch Chinos", note: "Pre-cured lycra twill / tapered cut", image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=800" },
      { name: "Everyday Oxford Shirts", note: "60s pure combed cotton yarn", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800" },
    ],
  },
  {
    id: "fabrics",
    index: "06",
    title: "Fabric Sourcing",
    line: "Direct mill pricing from Gujarat's composite spinning clusters.",
    description: "Unbeatable wholesale rates direct from Gujarat's weaving and spinning mills. Available in greige roll formats, mill-finished bolts, or custom lab-dipped pantone dyeing lots.",
    tone: "tone-slate-dark",
    detailImage: "/images/fabrics_sourcing.jpg",
    fabric: "100% Combed Cotton, Rayon 30/30 & Denim",
    finish: "EPI / PPI and GSM laboratory certified",
    colors: ["#171A1D", "#FE6311", "#3B82F6", "#FDFBF7"],
    variants: [
      { name: "Auto-Loom Cotton Bolts", note: "40s–60s combed yarn / pure cotton", image: "/images/fabrics_sourcing.jpg" },
      { name: "Reactive Dyed Rayon Lots", note: "14 Kg weight / certified colorfastness", image: "/manus-storage/mafatlal-materials-detail_6b9c0b66.jpg" },
      { name: "Ring-Spun Denim Weaves", note: "10–14.5 Oz cotton twill denim", image: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=800" },
    ],
  },
  {
    id: "bedsheets",
    index: "07",
    title: "Bedsheets & Home",
    line: "Institutional, hospitality, and retail packed bedding.",
    description: "Commercial and export-grade pure cotton sheets, satin stripe hotel sets, and double beds with matching pillow covers. Packed in attractive retail PVC zip bags or bulk bales.",
    tone: "tone-gold-light",
    detailImage: "/images/custom_bedsheet.jpg",
    fabric: "Pure Cotton 200–400 TC & Glace Cotton",
    finish: "Pre-shrunk, mercerised luster & color-locked",
    colors: ["#FFFFFF", "#FEF3C7", "#E11D48", "#1E3A8A"],
    variants: [
      { name: "Hotel Satin Stripe Sheets", note: "300 TC pure cotton / crisp hotel hand", image: "/images/custom_bedsheet.jpg" },
      { name: "Printed Double Bedsheets", note: "Rotary screen pigment & reactive print", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800" },
      { name: "Fitted Elastic Sheet Sets", note: "Deep pockets / export retail packing", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800" },
    ],
  },
  {
    id: "white-labeling",
    index: "08",
    title: "White Labeling",
    line: "Turn our production floor into your private brand atelier.",
    description: "Bring your sketches, garment samples, or tech packs. We grade the patterns, source matching fabrics, attach your custom woven damask labels, and dispatch export-ready boxed orders.",
    tone: "tone-paper",
    detailImage: "/manus-storage/stitchform-private-label_b6cb424d.jpg",
    fabric: "Custom Mill Specification per Brand Tech Pack",
    finish: "AQL 2.5 final batch quality audit",
    colors: ["#171A1D", "#FE6311", "#FFB51A", "#FFFFFF"],
    variants: [
      { name: "Woven Damask Neck Labels", note: "High-definition weave / ultra-soft fold", image: "/manus-storage/stitchform-private-label_b6cb424d.jpg" },
      { name: "Custom Hangtags & Barcodes", note: "Heavy card stock with embossed foil", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800" },
      { name: "Retail Packaging & Seals", note: "Branded polybags in master cartons", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=800" },
    ],
  },
];
