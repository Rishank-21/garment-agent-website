"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    nav_about: "About",
    nav_garments: "Garments",
    nav_capabilities: "Capabilities",
    nav_network: "Network",
    nav_guide: "Business Guide",
    nav_white_labeling: "White Labeling",
    nav_export: "Export",
    nav_contact: "Contact",
    nav_reviews: "Reviews",
    btn_start_enquiry: "Start Enquiry",
    
    // Hero
    hero_tagline: "Your Garment Guide In Ahmedabad",
    hero_title_1: "BUILT FOR",
    hero_title_2: "THE BUSINESS",
    hero_title_3: "OF FASHION.",
    hero_subtitle: "Your Trusted Partner for Sourcing, White Labeling & Global Exports.",
    hero_description: "From product sourcing to custom manufacturing, we help wholesalers, retailers and fashion businesses find the right garments with confidence.",
    btn_view_collection: "View Collection",
    btn_start_enquiry_upper: "START AN ENQUIRY",
    hero_small_text: "AHMEDABAD, INDIA | SOURCING • WHOLESALE • WHITE LABELING • EXPORT",

    // Marquee Strip
    strip_text_1: "2nd Generation Garment Partner",
    strip_text_2: "Men's, Women's, Kids Wear",
    strip_text_3: "Bedsheets & Fabrics Sourcing",
    strip_text_4: "Wholesale & White Labeling Sourcing",

    // Legacy Section
    legacy_label: "02 / Evolving Vision",
    legacy_title: "Two generations. One evolving vision.",
    legacy_desc: "Built on a foundation of trust, verified relationships, and direct logistics experience across Indian textile regions. We bridge the legacy of wholesale reliability with the creative demands of present-day fashion businesses.",
    legacy_link: "Our Heritage story",

    // Serving Sourcing
    solutions_label: "06 / Client Profiles",
    solutions_title: "Serving the Sourcing Ecosystem",

    // Price architecture
    price_label: "09 / Price Architecture",
    price_title: "Built for Different Price Points",
    price_moq: "MOQ Requirement",

    // Trust/Google
    trust_label: "10 / Client Trust",
    trust_sub: "(365 Google Reviews)",
    trust_desc: "Clothing supplier · Ahmedabad, Gujarat",
    trust_btn: "Write a Review",

    // Location
    loc_label: "Office Headquarter",
    loc_title: "Our Location",
    loc_address_title: "Address",
    loc_address_text: "First Floor, Hira Bhai 21, Dayanand Rd, Sarangpur, Sherkotda, Ahmedabad, Gujarat 380022",
    loc_hours_title: "Operating Hours",
    loc_hours_text: "Open · Closes 9:30 pm",
    loc_call_title: "Call Sourcing Desk",
    loc_directions_btn: "Get Directions",

    // Review Modal
    rev_modal_title: "Write a Google Review",
    rev_modal_subtitle: "Submit your rating and feedback. Approved reviews are displayed on the brand home page.",
    rev_label_name: "Your Name / Title",
    rev_placeholder_name: "e.g. Ramesh Sakhala (Retailer)",
    rev_label_rating: "Rating",
    rev_label_feedback: "Review Feedback",
    rev_placeholder_feedback: "Share your sourcing experience with Himat Textile...",
    rev_btn_submit: "Submit Review",
    rev_btn_submitting: "Submitting...",

    // Category Section
    cat_title: "EXPLORE OUR GARMENTS",
    cat_subtitle: "Discover commercially relevant styles selected for today’s wholesale and retail markets.",
    cat_mens_title: "MEN'S WEAR",
    cat_mens_desc: "Cotton Pants • Shirts • Lowers • Linen Wear • T-Shirts",
    cat_womens_title: "WOMEN'S WEAR",
    cat_womens_desc: "Ethnic • 3pc • Kurtis • Co-ord Sets • Palazzo • Leggings • Dupatta",
    cat_kids_title: "KIDS WEAR",
    cat_kids_desc: "Cotton Pants • Shirts • Lowers • Linen Wear • T-Shirts",
    cat_bedsheets_title: "BEDSHEETS",
    cat_bedsheets_desc: "Packed • Roll",
    cat_fabrics_title: "FABRICS",
    cat_fabrics_desc: "Mills • Process House • Assortments",
    cat_private_label_title: "CUSTOM / WHITE LABELING",
    cat_private_label_desc: "Develop your own collection with us.",
    btn_explore_all: "EXPLORE ALL GARMENTS →",

    // Why Himat Textile
    why_label: "MORE THAN A GARMENT SUPPLIER.",
    why_title: "We help businesses source, develop and grow their apparel collections.",
    why_01_title: "GARMENT SOURCING",
    why_01_desc: "Find the right products, styles and price points for your market.",
    why_02_title: "QUALITY FOCUS",
    why_02_desc: "Product selection and quality checks with attention to detail.",
    why_03_title: "WHITE LABELING",
    why_03_desc: "Build collections under your own brand with customized requirements.",
    why_04_title: "WHOLESALE SUPPORT",
    why_04_desc: "Commercially focused products for retailers and wholesalers.",
    why_05_title: "GLOBAL EXPORTS",
    why_05_desc: "Supporting apparel requirements beyond Indian markets.",
    why_06_title: "LONG-TERM PARTNERSHIPS",
    why_06_desc: "Our focus is not just one order — it’s building lasting business relationships.",

    // Private Label Section
    pl_title_1: "YOUR BRAND.",
    pl_title_2: "YOUR VISION.",
    pl_title_3: "OUR EXPERTISE.",
    pl_description: "From concept to finished garment, we support businesses looking to create their own apparel collections.",
    pl_step_1: "CUSTOM DESIGN",
    pl_step_2: "FABRIC SOURCING",
    pl_step_3: "SAMPLING",
    pl_step_4: "PRODUCTION",
    pl_step_5: "PACKAGING",
    pl_step_6: "EXPORT SUPPORT",
    btn_start_private_label: "START YOUR WHITE LABELING →",

    // Business Guide Section
    bg_title: "YOUR GARMENT GUIDE IN AHMEDABAD",
    bg_subtitle: "Buying garments is not only about finding products. It’s about finding the RIGHT products, RIGHT quantities and RIGHT price.",
    bg_desc: "We help retailers and wholesalers with:",
    bg_point_1_title: "PRODUCT SELECTION",
    bg_point_1_desc: "Choose commercially relevant varieties.",
    bg_point_2_title: "STOCK PLANNING",
    bg_point_2_desc: "Avoid overstocking and unnecessary inventory.",
    bg_point_3_title: "SIZE-WISE BUYING",
    bg_point_3_desc: "Plan quantities according to market demand.",
    bg_point_4_title: "VARIETY MANAGEMENT",
    bg_point_4_desc: "More useful variety without blocking excessive capital.",
    bg_point_5_title: "PURCHASING GUIDANCE",
    bg_point_5_desc: "Make smarter buying decisions.",
    btn_talk_team: "Talk to our garment team →",

    // Lookbook Section
    lookbook_title: "CURATED FOR YOUR MARKET",
    lookbook_subtitle: "A constantly evolving selection of garments designed around changing customer preferences.",
    lookbook_tab_new: "NEW ARRIVALS",
    lookbook_tab_best: "BEST SELLERS",
    lookbook_tab_trending: "TRENDING STYLES",
    lookbook_tab_picks: "WHOLESALE PICKS",
    btn_view_collection_arrow: "VIEW COLLECTION →",

    // Export Section
    ex_label: "08 / Export Capacity",
    ex_title_1: "FROM AHMEDABAD",
    ex_title_2: "TO GLOBAL MARKETS.",
    ex_desc: "With our sourcing and manufacturing network, Himat Textile supports apparel businesses looking for reliable garment solutions from India.",
    ex_subheading: "INDIA → GLOBAL",
    ex_badge_sourcing: "SOURCING",
    ex_badge_production: "PRODUCTION",
    ex_badge_private_label: "WHITE LABELING",
    ex_badge_export: "EXPORT SUPPORT",
    btn_discuss_requirement: "DISCUSS YOUR REQUIREMENT →",

    // Enquiry Section
    enq_label: "Direct Sourcing Desk",
    enq_desc_top: "Let's Build Your Next Collection.",
    enq_desc_p: "Connect directly with our Ahmedabad manufacturing floor. Share your requirements below to receive wholesale catalog pricing, sample swatches, or custom production quotes within 24 hours.",
    enq_title: "HAVE A REQUIREMENT?",
    enq_subtitle: "Tell us what you’re looking for.",
    enq_field_name: "Your Name",
    enq_field_company: "Business or Shop Name *",
    enq_field_phone: "WhatsApp Number *",
    enq_field_email: "Email Address (Optional)",
    enq_field_requirement: "What are you looking to source? *",
    enq_field_quantity: "Estimated Quantity",
    enq_field_market: "Your City / Market",
    enq_field_station: "Your City & State *",
    enq_placeholder_station: "e.g. Indore, Madhya Pradesh or Mumbai, Maharashtra",
    enq_field_message: "Tell us about your requirement *",
    enq_placeholder_msg: "Mention approximate quantity, fabric preferences, custom branding, or target delivery dates...",
    btn_send_enquiry: "Send Sourcing Inquiry →",
    btn_whatsapp_us: "WHATSAPP US →",
    whatsapp_floating: "Chat on WhatsApp",
    whatsapp_chat_desk: "WhatsApp: Sourcing Chat ↗",
    call_direct_desk: "Call: Direct Desk",

    // Brand Statement
    bs_title_1: "BUILT ON TRUST.",
    bs_title_2: "DRIVEN BY FASHION.",
    bs_title_3: "READY FOR BUSINESS.",
    bs_subtitle: "Garment Sourcing • Wholesale • White Labeling • Global Apparel Exports",
    bs_location: "Ahmedabad, India",

    // Footer
    foot_desc: "Your trusted partner for garment sourcing, white labeling production and global apparel exports.",
    foot_quick_links: "QUICK LINKS",
    foot_contact: "CONTACT",
    foot_address: "21 Hira Bhai Market, 1st Floor, Kankaria Road, Ahmedabad – 380002, Gujarat, India",
    foot_email: "EMAIL",
    foot_website: "WEBSITE",
    foot_social: "SOCIAL",
    foot_rights: "ALL RIGHTS RESERVED.",

    // Hero Slider B2B
    hero_eyebrow: "HIMAT TEXTILE — YOUR GARMENT GUIDE IN AHMEDABAD",
    hero_headline_1: "Source the craft.",
    hero_headline_2: "Scale the garment.",
    hero_desc_main: "Your trusted B2B garment sourcing partner in Ahmedabad. We connect retailers, wholesalers, and growing fashion brands with reliable manufacturers across men's, women's, kids' wear, and mill-direct fabrics.",
    btn_explore_catalog: "Explore Garment Catalog",
    btn_bulk_quote: "Request a Bulk Quote",
    hero_district_tag: "Ahmedabad Textile & Garment District",
    badge_wholesale_market: "Wholesale Market",
    badge_garment_district: "Garment District",
    badge_ready_stock: "Ready Stock",
    badge_direct_mill: "Direct Mill Supply",
    badge_central_hub: "Central Textile Hub",
    note_b2b_sourcing: "B2B Garment Sourcing",
    note_supplier_conn: "Supplier Connections",
    note_buying_support: "Buying Support",
    note_pan_india: "Pan-India Dispatch",

    // Marquee Items
    ticker_item_1: "YOUR GARMENT GUIDE IN AHMEDABAD",
    ticker_item_2: "B2B GARMENT SOURCING",
    ticker_item_3: "SUPPLIER CONNECTIONS",
    ticker_item_4: "BUYING SUPPORT",
    ticker_item_5: "MEN'S, WOMEN'S & KIDS' WEAR",
    ticker_item_6: "ETHNIC WEAR & BED SHEET LOTS",
    ticker_item_7: "FABRIC SOURCING & WHITE LABELLING",
    ticker_item_8: "PAN-INDIA TRANSPORT DISPATCH",

    // Section 2 - About & What We Do
    about_kicker: "ABOUT HIMAT TEXTILE",
    about_tagline: "YOUR GARMENT GUIDE IN AHMEDABAD",
    about_headline_1: "We Connect You With",
    about_headline_2: "The Right Garments.",
    about_p1: "Himat Textile is a B2B garment sourcing and buying support partner based in Ahmedabad, helping retailers, wholesalers, resellers and growing fashion businesses find the right products from reliable suppliers.",
    about_p2: "We understand that garment sourcing is more than just finding a product. It is about getting the right quality, right price, right supplier and right support for your business.",
    about_p3: "With strong knowledge of Ahmedabad’s garment market and a wide network of B2B suppliers, we make the buying process simpler, faster and more transparent.",
    what_we_do_title: "WHAT WE DO",
    what_we_do_swipe: "Swipe or auto-scroll →",
    wwd_1_title: "Product Sourcing",
    wwd_1_desc: "Find garments according to your category, quality, style and budget.",
    wwd_2_title: "Supplier Connection",
    wwd_2_desc: "Connect with suitable manufacturers, wholesalers and suppliers.",
    wwd_3_title: "Price & Deal Support",
    wwd_3_desc: "Help you understand market pricing and negotiate better deals.",
    wwd_4_title: "Order Coordination",
    wwd_4_desc: "Stay connected with suppliers and help coordinate your requirements.",
    wwd_5_title: "Dispatch Support",
    wwd_5_desc: "Assist with packing, dispatch and communication until order moves forward.",
    our_approach: "OUR APPROACH",
    approach_sub: "Right Product • Right Supplier • Right Deal",
    approach_desc: "We don’t believe in simply selling you a product. We help you find what fits your business. From your first requirement to supplier coordination and dispatch, Himat Textile is here to make garment sourcing easier.",
    market_hub_title: "Ahmedabad Garment Market Hub",
    market_hub_desc: "On-ground coordination across Gheekanta, New Cloth Market, and local manufacturing clusters.",

    // Section 4 - Catalogue
    cat_banner_kicker: "HT/003 — B2B SOURCING CATALOGUE",
    cat_banner_title_1: "Every category.",
    cat_banner_title_2: "Its own sourcing system.",
    cat_banner_desc: "Explore readymade apparel production lines and bulk mill fabrics. Select any card to expand high-detail cuts, stitch specifications, and color availability.",
    cat_showing_3: "SHOWING 3 OF 7 GARMENT CATEGORIES",
    cat_more_categories: "MORE SOURCING CATEGORIES",
    cat_more_title: "Explore Ethnic, Bedsheets, Mill Fabrics & White Labelling",
    cat_more_desc: "Discover our complete collection of 7 garment categories with mill-direct pricing, custom tech packs, and dispatch schedules.",
    btn_explore_7: "EXPLORE ALL 7 CATEGORIES",
    btn_inquire_wa: "INQUIRE ON WHATSAPP",
    need_quote_kicker: "NEED A SPECIFICATION-LED QUOTE?",
    bring_brief_1: "Bring the brief.",
    bring_brief_2: "We’ll build the garment.",
    bring_brief_desc: "Connect directly with our Ahmedabad manufacturing desk. Share your required quantities, target price points, or custom tech packs for instant lot availability and doorstep freight estimates.",
    feat_direct_mill: "Direct Mill Pricing",
    feat_tech_pack: "Custom Tech Pack Support",
    feat_logistics: "Pan-India Logistics",
    btn_connect_wa: "CONNECT ON WHATSAPP",
    btn_explore_full: "EXPLORE FULL CATALOG",

    // Section 5 - White Labeling
    pl_atelier_kicker: "HT/005 — WHITE LABELING & PRIVATE LABEL ATELIER",
    pl_atelier_seal: "Himat Textile / Atelier",
    pl_atelier_title_1: "Your Brand.",
    pl_atelier_title_2: "Your Labels.",
    pl_atelier_title_3: "Our Mill Access.",
    pl_atelier_desc: "From tech pack specification to final carton dispatch, we manufacture ready-to-sell apparel collections under your brand with customized woven tags, branded trims, graded size charts, and retail packaging.",
    btn_start_label_brief: "START YOUR LABEL BRIEF",
    btn_explore_atelier: "EXPLORE ATELIER CAPABILITY",
    pl_callout_top: "Your Brand / Our Floor",
    pl_callout_mid_1: "Made from",
    pl_callout_mid_2: "your brief.",
    pl_callout_desc: "Private-label readymade apparel and home furnishings manufactured to your exact GSM, cut, and finishing.",
    pl_callout_sub: "Apparel · Woven Damask · Trims · Packaging",
    pl_workflow_label: "PRIVATE LABEL WORKFLOW",
    pl_step1_sub: "BRIEF THE IDEA / PATTERN · FIT · PALETTE",
    pl_step1_title: "Start with your product concept.",
    pl_step1_desc: "Bring a reference sample, technical sketch, or market benchmark. We align custom pattern grading, fabric composition, GSM, and target retail price points.",
    pl_step1_tag1: "Custom Patterns",
    pl_step1_tag2: "Graded Sizing",
    pl_step1_tag3: "Mill Lab Dips",
    pl_step2_sub: "BUILD THE SAMPLE / STITCH · EMBROIDERY · PRINT",
    pl_step2_title: "Turn it into an approved piece.",
    pl_step2_desc: "Our sample masters cut, stitch, and finish pre-production prototypes. Review real drape, seam strength, pocket placement, and wash feel before bulk cutting begins.",
    pl_step2_tag1: "Pre-Prod Sample",
    pl_step2_tag2: "Screen & Digital Print",
    pl_step2_tag3: "Durability QC",
    pl_step3_sub: "LABEL FOR LAUNCH / TAGS · PACKAGING · DISPATCH",
    pl_step3_title: "Put your name on every garment.",
    pl_step3_desc: "Woven neck damask labels, branded satin wash-care tags, custom hangtags, branded buttons, barcode stickers, and retail polybags packaged into shelf-ready cartons.",
    pl_step3_tag1: "Woven Damask",
    pl_step3_tag2: "Custom Hangtags",
    pl_step3_tag3: "Pan-India Logistics",
    pl_cap_title: "MANUFACTURING CAPABILITIES",
    pl_cap1_name: "Custom Tech Packs",
    pl_cap1_desc: "Fits, sizing & styling specs",
    pl_cap2_name: "Mill-Direct Fabrics",
    pl_cap2_desc: "Quality yarn & precision shades",
    pl_cap3_name: "Physical Sampling",
    pl_cap3_desc: "Fit verification before cutting",
    pl_cap4_name: "Bulk Production",
    pl_cap4_desc: "Rigid stitch & wash QC lines",
    pl_cap5_name: "Custom Packaging",
    pl_cap5_desc: "Woven tags, barcodes & boxes",
    pl_cap6_name: "Pan-India Freight",
    pl_cap6_desc: "Doorstep transport corridors",

    // Section 8 - Business Sourcing Advisory
    advisory_kicker: "[ B2B SOURCING ADVISORY ]",
    advisory_title_1: "YOUR GARMENT GUIDE",
    advisory_title_2: "IN AHMEDABAD.",
    advisory_highlight: "Buying garments is not only about finding products. It's about finding the RIGHT products, RIGHT quantities and RIGHT price.",
    advisory_desc: "We guide you through the textile markets of Ahmedabad to select fast-moving apparel lines, reduce dead stock risk, and match seasonal retail buying calendars.",
    btn_talk_team_caps: "TALK TO OUR GARMENT TEAM",
    adv_1_title: "Product Selection",
    adv_1_desc: "Choose commercially relevant varieties suited to your target retail segment.",
    adv_2_title: "Stock Planning",
    adv_2_desc: "Avoid overstocking and reduce dead inventory capital lock-ups.",
    adv_3_title: "Size-Wise Buying",
    adv_3_desc: "Plan size ratios and color quantities according to actual regional demand.",
    adv_4_title: "Variety Management",
    adv_4_desc: "Offer more compelling variety without blocking excessive working capital.",
    adv_5_title: "Purchasing Guidance",
    adv_5_desc: "Make smarter buying decisions direct from verified Ahmedabad mills.",

    // Section 10 - Exports
    export_kicker: "// GLOBAL APPAREL EXPORTS",
    export_title_1: "FROM AHMEDABAD",
    export_title_2: "TO GLOBAL MARKETS.",
    export_desc_main: "Leveraging our manufacturing connections and quality control protocols, Himat Textile supports international apparel buyers, retail chains, and distributors with reliable export supply from India.",
    exp_card_1_title: "Sourcing",
    exp_card_1_desc: "Scalable volume capacities across woven, knitted, and ethnic apparel lines.",
    exp_card_2_title: "Production QC",
    exp_card_2_desc: "Rigid sizing checks, shrinkage control, and colorfastness inspections.",
    exp_card_3_title: "White Labeling",
    exp_card_3_desc: "Custom private labelling, barcode tagging, and export polybag packaging.",
    exp_card_4_title: "Export Support",
    exp_card_4_desc: "Customs documentation, bill of lading, and port logistics coordination.",
    btn_discuss_req_caps: "DISCUSS YOUR REQUIREMENT",

    // Category Chips & Decks
    chip_verticals: "SOURCING VERTICALS",
    chip_all_systems: "All Garment Sourcing Systems",
    chip_selected: "Selected:",
    chip_all: "All Categories",
    deck_direct_mill: "Direct Mill Lots",
    deck_quality_qc: "100% Quality QC",
    deck_dispatch: "Pan-India Dispatch",
    deck_material_proof: "Material proof",
    deck_spin_weave: "Spin / weave / stitch",
    deck_configure: "Configure catalog",
    deck_typical_spec: "Typical spec",
    deck_avail_colours: "Available colours",

    // Footer
    foot_cat_heading: "GARMENT CATEGORIES",
    foot_contact_heading: "CONTACT HIMAT TEXTILE",
    foot_hub_name: "Ahmedabad Sourcing Hub",
    foot_address_line1: "21, Hiralal Market, First Floor,",
    foot_address_line2: "Khatra Road, Ahmedabad,",
    foot_address_line3: "Gujarat, India",
    foot_verified: "VERIFIED",
    foot_alert_kicker: "LIMITED TIME SOURCING ALERT",
  },
  hi: {
    // Header
    nav_about: "हमारे बारे में",
    nav_garments: "गारमेंट्स",
    nav_capabilities: "क्षमताएं",
    nav_network: "नेटवर्क",
    nav_guide: "बिजनेस गाइड",
    nav_white_labeling: "व्हाइट लेबलिंग",
    nav_export: "निर्यात",
    nav_contact: "संपर्क",
    nav_reviews: "समीक्षाएं",
    btn_start_enquiry: "पूछताछ शुरू करें",
    
    // Hero
    hero_tagline: "अहमदाबाद में आपका गारमेंट गाइड",
    hero_title_1: "फैशन के",
    hero_title_2: "बिजनेस के लिए",
    hero_title_3: "निर्मित।",
    hero_subtitle: "गारमेंट सोर्सिंग, व्हाइट लेबलिंग और वैश्विक परिधान निर्यात के लिए आपका भरोसेमंद साथी।",
    hero_description: "उत्पाद सोर्सिंग से लेकर कस्टम विनिर्माण तक, हम थोक विक्रेताओं, खुदरा विक्रेताओं और फैशन व्यवसायों को विश्वास के साथ सही परिधान खोजने में मदद करते हैं।",
    btn_view_collection: "कलेक्शन देखें",
    btn_start_enquiry_upper: "पूछताछ शुरू करें",
    hero_small_text: "अहमदाबाद, भारत | सोर्सिंग • थोक • व्हाइट लेबलिंग • निर्यात",
    
    // Marquee Strip
    strip_text_1: "दूसरी पीढ़ी का गारमेंट पार्टनर",
    strip_text_2: "मेन्स, विमेन्स, किड्स वियर",
    strip_text_3: "बेडशीट और फैब्रिक्स सोर्सिंग",
    strip_text_4: "थोक और व्हाइट लेबलिंग सोर्सिंग",

    // Legacy Section
    legacy_label: "02 / विकसित होता दृष्टिकोण",
    legacy_title: "दो पीढ़ियाँ। एक विकसित होता दृष्टिकोण।",
    legacy_desc: "भारतीय कपड़ा क्षेत्रों में विश्वास, सत्यापित संबंधों और प्रत्यक्ष रसद अनुभव की नींव पर निर्मित। हम आज के फैशन व्यवसायों की रचनात्मक मांगों के साथ थोक विश्वसनीयता की विरासत को जोड़ते हैं।",
    legacy_link: "हमारी विरासत की कहानी",

    // Serving Sourcing
    solutions_label: "06 / ग्राहक प्रोफ़ाइल",
    solutions_title: "सोर्सिंग इकोसिस्टम की सेवा",

    // Price architecture
    price_label: "09 / मूल्य संरचना",
    price_title: "विभिन्न मूल्य बिंदुओं के लिए निर्मित",
    price_moq: "न्यूनतम मात्रा (MOQ) आवश्यकता",

    // Trust/Google
    trust_label: "10 / ग्राहक विश्वास",
    trust_sub: "(365 गूगल समीक्षाएं)",
    trust_desc: "कपड़ा आपूर्तिकर्ता · अहमदाबाद, गुजरात",
    trust_btn: "समीक्षा लिखें",

    // Location
    loc_label: "कार्यालय मुख्यालय",
    loc_title: "हमारा स्थान",
    loc_address_title: "पता",
    loc_address_text: "पहली मंजिल, हीरा भाई 21, दयानंद रोड, सारंगपुर, शेरकोटडा, अहमदाबाद, गुजरात 380022",
    loc_hours_title: "संचालन का समय",
    loc_hours_text: "खुला है · रात 9:30 बजे बंद होता है",
    loc_call_title: "सोर्सिंग डेस्क को कॉल करें",
    loc_directions_btn: "दिशा-निर्देश प्राप्त करें",

    // Review Modal
    rev_modal_title: "गूगल समीक्षा लिखें",
    rev_modal_subtitle: "अपनी रेटिंग और प्रतिक्रिया सबमिट करें। स्वीकृत समीक्षाएं ब्रांड के होम पेज पर प्रदर्शित की जाती हैं।",
    rev_label_name: "आपका नाम / पद",
    rev_placeholder_name: "उदा. रमेश साखला (रिटेलर)",
    rev_label_rating: "रेटिंग",
    rev_label_feedback: "समीक्षा प्रतिक्रिया",
    rev_placeholder_feedback: "हिम्मत टेक्सटाइल के साथ अपने सोर्सिंग अनुभव को साझा करें...",
    rev_btn_submit: "समीक्षा सबमिट करें",
    rev_btn_submitting: "सबमिट किया जा रहा है...",

    // Category Section
    cat_title: "हमारे गारमेंट्स एक्सप्लोर करें",
    cat_subtitle: "आज के थोक और खुदरा बाजारों के लिए चुने गए व्यावसायिक रूप से प्रासंगिक शैलियों की खोज करें।",
    cat_mens_title: "मेन्स वियर (पुरुष परिधान)",
    cat_mens_desc: "कॉटन पैंट • शर्ट • लोअर • लिनन वियर • टी-शर्ट",
    cat_womens_title: "महिला परिधान",
    cat_womens_desc: "एथनिक • 3 पीस • कुर्ती • को-ऑर्ड सेट्स • प्लाजो • लेगिंग्स • दुपट्टा",
    cat_kids_title: "बच्चों के कपड़े",
    cat_kids_desc: "कॉटन पैंट • शर्ट • लोअर • लिनन वियर • टी-शर्ट",
    cat_bedsheets_title: "बेडशीट्स",
    cat_bedsheets_desc: "पैक्ड • रोल",
    cat_fabrics_title: "फैब्रिक्स",
    cat_fabrics_desc: "मिल्स • प्रोसेस हाउस • असॉर्टमेंट्स",
    cat_private_label_title: "कस्टम / व्हाइट लेबलिंग",
    cat_private_label_desc: "हमारे साथ अपना खुद का कलेक्शन विकसित करें।",
    btn_explore_all: "सभी गारमेंट्स देखें →",

    // Why Himat Textile
    why_label: "सिर्फ एक गारमेंट सप्लायर से कहीं अधिक।",
    why_title: "हम व्यवसायों को उनके परिधान कलेक्शन को सोर्स करने, विकसित करने और बढ़ाने में मदद करते हैं।",
    why_01_title: "गारमेंट सोर्सिंग",
    why_01_desc: "अपने बाजार के लिए सही उत्पाद, स्टाइल और मूल्य बिंदु खोजें।",
    why_02_title: "गुणवत्ता पर ध्यान",
    why_02_desc: "विस्तृत विवरण पर ध्यान देने के साथ उत्पाद चयन और गुणवत्ता की जाँच।",
    why_03_title: "WHITE LABELING (व्हाइट लेबलिंग)",
    why_03_desc: "अपनी खुद की ब्रांड के तहत अनुकूलित आवश्यकताओं के साथ कलेक्शन बनाएं।",
    why_04_title: "थोक सहायता",
    why_04_desc: "खुदरा विक्रेताओं और थोक विक्रेताओं के लिए व्यावसायिक रूप से केंद्रित उत्पाद।",
    why_05_title: "वैश्विक निर्यात",
    why_05_desc: "भारतीय बाजारों से बाहर परिधान आवश्यकताओं का समर्थन करना।",
    why_06_title: "दीर्घकालिक साझेदारी",
    why_06_desc: "हमारा ध्यान सिर्फ एक ऑर्डर पर नहीं है — यह स्थायी व्यावसायिक संबंध बनाने पर है।",

    // Private Label Section
    pl_title_1: "आपका ब्रांड।",
    pl_title_2: "आपका दृष्टिकोण।",
    pl_title_3: "हमारी विशेषज्ञता।",
    pl_description: "अवधारणा से लेकर तैयार परिधान तक, हम अपना खुद का परिधान कलेक्शन बनाने की इच्छा रखने वाले व्यवसायों का समर्थन करते हैं।",
    pl_step_1: "कस्टम डिजाइन",
    pl_step_2: "फैब्रिक सोर्सिंग",
    pl_step_3: "सैंपलिंग",
    pl_step_4: "उत्पादन (मैन्युफैक्चरिंग)",
    pl_step_5: "पैकेजिंग",
    pl_step_6: "निर्यात सहायता",
    btn_start_private_label: "अपनी व्हाइट लेबलिंग शुरू करें →",

    // Business Guide Section
    bg_title: "अहमदाबाद में आपका गारमेंट गाइड",
    bg_subtitle: "कपड़े खरीदना केवल उत्पाद ढूंढने के बारे में नहीं है। यह सही उत्पाद, सही मात्रा और सही कीमत खोजने के बारे में है।",
    bg_desc: "हम खुदरा विक्रेताओं और थोक विक्रेताओं की मदद करते हैं:",
    bg_point_1_title: "उत्पाद चयन",
    bg_point_1_desc: "व्यावसायिक रूप से प्रासंगिक किस्मों को चुनें।",
    bg_point_2_title: "स्टॉक की योजना",
    bg_point_2_desc: "अत्यधिक स्टॉक और अनावश्यक इन्वेंट्री से बचें।",
    bg_point_3_title: "साइज-वार खरीदारी",
    bg_point_3_desc: "बाजार की मांग के अनुसार मात्रा की योजना बनाएं।",
    bg_point_4_title: "वैरायटी प्रबंधन",
    bg_point_4_desc: "अत्यधिक पूंजी को अवरुद्ध किए बिना अधिक उपयोगी वैरायटी पाएं।",
    bg_point_5_title: "खरीद मार्गदर्शन",
    bg_point_5_desc: "बेहतर और समझदारी से खरीदारी के निर्णय लें।",
    btn_talk_team: "हमारी गारमेंट टीम से बात करें →",

    // Lookbook Section
    lookbook_title: "आपके बाजार के लिए विशेष रूप से क्यूरेटेड",
    lookbook_subtitle: "बदलती ग्राहकों की प्राथमिकताओं के अनुसार तैयार किए गए गारमेंट्स का लगातार विकसित होने वाला चयन।",
    lookbook_tab_new: "न्यू अराइवल्स",
    lookbook_tab_best: "बेस्ट सेलर्स",
    lookbook_tab_trending: "ट्रेंडिंग स्टाइल्स",
    lookbook_tab_picks: "होलसेल पिक्स",
    btn_view_collection_arrow: "कलेक्शन देखें →",

    // Export Section
    ex_label: "08 / निर्यात क्षमता",
    ex_title_1: "अहमदाबाद से",
    ex_title_2: "वैश्विक बाजारों तक।",
    ex_desc: "हमारे सोर्सिंग और मैन्युफैक्चरिंग नेटवर्क के साथ, हिम्मत टेक्सटाइल भारत से विश्वसनीय गारमेंट समाधान चाहने वाले परिधान व्यवसायों का समर्थन करता है।",
    ex_subheading: "भारत → वैश्विक",
    ex_badge_sourcing: "सोर्सिंग",
    ex_badge_production: "उत्पादन",
    ex_badge_private_label: "व्हाइट लेबलिंग",
    ex_badge_export: "निर्यात सहायता",
    btn_discuss_requirement: "अपनी आवश्यकता पर चर्चा करें →",

    // Enquiry Section
    enq_label: "डायरेक्ट सोर्सिंग डेस्क",
    enq_desc_top: "आइए आपका अगला कलेक्शन बनाएं।",
    enq_desc_p: "अहमदाबाद मैन्युफैक्चरिंग फ्लोर से सीधे जुड़ें। अपनी आवश्यकताएं साझा करें और 24 घंटे के भीतर थोक कैटलॉग रेट्स, सैंपल और प्रोडक्शन कोट्स प्राप्त करें।",
    enq_title: "कोई आवश्यकता है?",
    enq_subtitle: "हमें बताएं कि आप क्या ढूंढ रहे हैं।",
    enq_field_name: "आपका पूरा नाम",
    enq_field_company: "दुकान या कंपनी का नाम *",
    enq_field_phone: "व्हाट्सएप नंबर *",
    enq_field_email: "ईमेल आईडी (वैकल्पिक)",
    enq_field_requirement: "कैटिगरी चुनें (जो आपको चाहिए) *",
    enq_field_quantity: "अनुमानित ऑर्डर मात्रा",
    enq_field_market: "आपका शहर / राज्य",
    enq_field_station: "आपका शहर और राज्य *",
    enq_placeholder_station: "उदा. इंदौर, मध्य प्रदेश या मुंबई, महाराष्ट्र",
    enq_field_message: "ऑर्डर विवरण व विशेष आवश्यकताएं *",
    enq_placeholder_msg: "अनुमानित मात्रा, फैब्रिक पसंद, कस्टम लेबलिंग या डिलीवरी की समयसीमा यहाँ लिखें...",
    btn_send_enquiry: "पूछताछ भेजें →",
    btn_whatsapp_us: "व्हाट्सएप करें →",
    whatsapp_floating: "व्हाट्सएप चैट",
    whatsapp_chat_desk: "व्हाट्सएप: सोर्सिंग चैट ↗",
    call_direct_desk: "कॉल: डायरेक्ट डेस्क",

    // Brand Statement
    bs_title_1: "भरोसे पर निर्मित।",
    bs_title_2: "फैशन से प्रेरित।",
    bs_title_3: "बिजनेस के लिए तैयार।",
    bs_subtitle: "गारमेंट सोर्सिंग • होलसेल • व्हाइट लेबलिंग • ग्लोबल अपैरल एक्सपोर्ट्स",
    bs_location: "अहमदाबाद, भारत",

    // Footer
    foot_desc: "गारमेंट सोर्सिंग, व्हाइट लेबलिंग उत्पादन और वैश्विक परिधान निर्यात के लिए आपका भरोसेमंद साथी।",
    foot_quick_links: "त्वरित लिंक्स",
    foot_contact: "संपर्क",
    foot_address: "21 हीरा भाई मार्केट, पहली मंजिल, कांकरिया रोड, अहमदाबाद - 380002, गुजरात, भारत",
    foot_email: "ईमेल",
    foot_website: "वेबसाइट",
    foot_social: "सोशल मीडिया",
    foot_rights: "सर्वाधिकार सुरक्षित।",

    // Hero Slider B2B
    hero_eyebrow: "हिम्मत टेक्सटाइल — अहमदाबाद में आपका गारमेंट गाइड",
    hero_headline_1: "क्राफ्ट की सोर्सिंग करें।",
    hero_headline_2: "गारमेंट का विस्तार करें।",
    hero_desc_main: "अहमदाबाद में आपका विश्वसनीय B2B गारमेंट सोर्सिंग पार्टनर। हम मेन्स, विमेन्स, किड्स वियर और मिल-डायरेक्ट फैब्रिक्स में खुदरा और थोक विक्रेताओं को सत्यापित निर्माताओं से जोड़ते हैं।",
    btn_explore_catalog: "गारमेंट कैटलॉग देखें",
    btn_bulk_quote: "थोक रेट्स व कोट प्राप्त करें",
    hero_district_tag: "अहमदाबाद टेक्सटाइल और गारमेंट मार्केट",
    badge_wholesale_market: "थोक बाजार",
    badge_garment_district: "गारमेंट मार्केट",
    badge_ready_stock: "रेडी स्टॉक",
    badge_direct_mill: "डायरेक्ट मिल सप्लाई",
    badge_central_hub: "सेंट्रल टेक्सटाइल हब",
    note_b2b_sourcing: "B2B गारमेंट सोर्सिंग",
    note_supplier_conn: "सप्लायर कनेक्शन",
    note_buying_support: "बायिंग सपोर्ट",
    note_pan_india: "अखिल भारतीय डिस्पैच",

    // Marquee Items
    ticker_item_1: "अहमदाबाद में आपका गारमेंट गाइड",
    ticker_item_2: "B2B गारमेंट सोर्सिंग",
    ticker_item_3: "विश्वसनीय सप्लायर कनेक्शन",
    ticker_item_4: "थोक खरीद व डील सपोर्ट",
    ticker_item_5: "मेन्स, विमेन्स और किड्स वियर",
    ticker_item_6: "एथनिक वियर व बेडशीट लॉट्स",
    ticker_item_7: "फैब्रिक सोर्सिंग व व्हाइट लेबलिंग",
    ticker_item_8: "अखिल भारतीय ट्रांसपोर्ट डिस्पैच",

    // Section 2 - About & What We Do
    about_kicker: "हिम्मत टेक्सटाइल के बारे में",
    about_tagline: "अहमदाबाद में आपका गारमेंट गाइड",
    about_headline_1: "हम आपको जोड़ते हैं",
    about_headline_2: "सही गारमेंट्स और सप्लायर्स से।",
    about_p1: "हिम्मत टेक्सटाइल अहमदाबाद में एक B2B गारमेंट सोर्सिंग और खरीद सहायता भागीदार है, जो खुदरा विक्रेताओं, थोक विक्रेताओं और बढ़ते फैशन ब्रांड्स को विश्वसनीय सप्लायर्स से सही उत्पाद खोजने में मदद करता है।",
    about_p2: "हम समझते हैं कि गारमेंट सोर्सिंग केवल उत्पाद खोजने से कहीं अधिक है। यह आपके व्यवसाय के लिए सही गुणवत्ता, सही कीमत, सही सप्लायर और विश्वसनीय सपोर्ट प्राप्त करने के बारे में है।",
    about_p3: "अहमदाबाद के कपड़ा बाजार के गहन ज्ञान और B2B सप्लायर्स के विस्तृत नेटवर्क के साथ, हम खरीद प्रक्रिया को सरल, तेज और पारदर्शी बनाते हैं।",
    what_we_do_title: "हम क्या करते हैं",
    what_we_do_swipe: "स्वाइप करें →",
    wwd_1_title: "प्रोडक्ट सोर्सिंग",
    wwd_1_desc: "आपकी श्रेणी, गुणवत्ता, स्टाइल और बजट के अनुसार गारमेंट्स खोजें।",
    wwd_2_title: "सप्लायर कनेक्शन",
    wwd_2_desc: "उपयुक्त निर्माताओं, थोक विक्रेताओं और सप्लायर्स से सीधे जुड़ें।",
    wwd_3_title: "मूल्य व डील सहायता",
    wwd_3_desc: "बाजार मूल्य समझें और बेहतर दरों पर सौदे तय करने में मदद पाएं।",
    wwd_4_title: "ऑर्डर समन्वय",
    wwd_4_desc: "सप्लायर्स के साथ निरंतर संपर्क रखें और अपनी आवश्यकताओं का समन्वय करें।",
    wwd_5_title: "डिस्पैच सहायता",
    wwd_5_desc: "पैकिंग, ट्रांसपोर्ट डिस्पैच और डिलीवरी ट्रैकिंग में पूरी सहायता प्राप्त करें।",
    our_approach: "हमारा दृष्टिकोण",
    approach_sub: "सही प्रोडक्ट • सही सप्लायर • सही डील",
    approach_desc: "हम केवल कोई भी उत्पाद बेचने में विश्वास नहीं करते। हम वह खोजने में मदद करते हैं जो आपके व्यवसाय के अनुकूल हो। पहली आवश्यकता से लेकर सप्लायर समन्वय और डिस्पैच तक, हिम्मत टेक्सटाइल आपकी गारमेंट सोर्सिंग को आसान बनाता है।",
    market_hub_title: "अहमदाबाद गारमेंट मार्केट हब",
    market_hub_desc: "घीकांटा, न्यू क्लॉथ मार्केट और स्थानीय मैन्युफैक्चरिंग क्लस्टर्स में ऑन-ग्राउंड समन्वय।",

    // Section 4 - Catalogue
    cat_banner_kicker: "HT/003 — B2B सोर्सिंग कैटलॉग",
    cat_banner_title_1: "हर कैटिगरी।",
    cat_banner_title_2: "अपनी समर्पित सोर्सिंग प्रणाली।",
    cat_banner_desc: "रेडीमेड गारमेंट प्रोडक्शन लाइन्स और बल्क मिल फैब्रिक्स एक्सप्लोर करें। किसी भी कार्ड को चुनकर सिलाई विवरण और रंग उपलब्धता देखें।",
    cat_showing_3: "7 में से 3 श्रेणियां दिखाई जा रही हैं",
    cat_more_categories: "अन्य सोर्सिंग श्रेणियां",
    cat_more_title: "एथनिक, बेडशीट्स, मिल फैब्रिक्स और व्हाइट लेबलिंग देखें",
    cat_more_desc: "मिल-डायरेक्ट दरों, कस्टम टेक पैक्स और डिस्पैच शेड्यूल के साथ हमारी सभी 7 गारमेंट श्रेणियों का पूरा संग्रह देखें।",
    btn_explore_7: "सभी 7 श्रेणियां देखें",
    btn_inquire_wa: "व्हाट्सएप पर जानकारी लें",
    need_quote_kicker: "कस्टम स्पेसिफिकेशन कोट चाहिए?",
    bring_brief_1: "अपनी आवश्यकता बताएं।",
    bring_brief_2: "हम तैयार करेंगे परिधान।",
    bring_brief_desc: "अहमदाबाद मैन्युफैक्चरिंग डेस्क से सीधे जुड़ें। अपनी आवश्यक मात्रा, लक्षित मूल्य या कस्टम टेक पैक साझा करें और तुरंत दरें प्राप्त करें।",
    feat_direct_mill: "डायरेक्ट मिल मूल्य",
    feat_tech_pack: "कस्टम टेक पैक सपोर्ट",
    feat_logistics: "अखिल भारतीय लॉजिस्टिक्स",
    btn_connect_wa: "व्हाट्सएप पर संपर्क करें",
    btn_explore_full: "पूरा कैटलॉग देखें",

    // Section 5 - White Labeling
    pl_atelier_kicker: "HT/005 — व्हाइट लेबलिंग और प्राइवेट लेबल",
    pl_atelier_seal: "हिम्मत टेक्सटाइल / एटेलियर",
    pl_atelier_title_1: "आपका ब्रांड।",
    pl_atelier_title_2: "आपके लेबल्स।",
    pl_atelier_title_3: "हमारा मिल एक्सेस।",
    pl_atelier_desc: "टेक पैक से लेकर अंतिम कार्टन डिस्पैच तक, हम आपके ब्रांड के तहत अनुकूलित लेबल, ट्रिम्स, साइज चार्ट और पैकेजिंग के साथ रेडी-टू-सेल गारमेंट्स बनाते हैं।",
    btn_start_label_brief: "अपना लेबल ब्रीफ शुरू करें",
    btn_explore_atelier: "एटेलियर क्षमताएं देखें",
    pl_callout_top: "आपका ब्रांड / हमारी मैन्युफैक्चरिंग",
    pl_callout_mid_1: "आपकी आवश्यकतानुसार",
    pl_callout_mid_2: "तैयार किया गया।",
    pl_callout_desc: "आपके सटीक जीएसएम, कट और फिनिशिंग के अनुसार निर्मित प्राइवेट-लेबल रेडीमेड परिधान और होम टेक्सटाइल्स।",
    pl_callout_sub: "परिधान · वोवन डैमास्क · ट्रिम्स · पैकेजिंग",
    pl_workflow_label: "प्राइवेट लेबल वर्कफ़्लो",
    pl_step1_sub: "01 आइडिया ब्रीफ / पैटर्न · फिट · शेड्स",
    pl_step1_title: "अपने उत्पाद की अवधारणा से शुरुआत करें।",
    pl_step1_desc: "रेफरेंस सैंपल, तकनीकी स्केच या मार्केट बेंचमार्क लाएं। हम कस्टम पैटर्न, फैब्रिक संरचना, जीएसएम और खुदरा मूल्य बिंदुओं को संरेखित करते हैं।",
    pl_step1_tag1: "कस्टम पैटर्न",
    pl_step1_tag2: "साइजिंग ग्रेडिंग",
    pl_step1_tag3: "मिल लैब डिप्स",
    pl_step2_sub: "02 सैंपल निर्माण / सिलाई · एम्ब्रॉयडरी · प्रिंट",
    pl_step2_title: "इसे स्वीकृत प्रोटोटाइप में बदलें।",
    pl_step2_desc: "हमारे सैंपल मास्टर्स प्री-प्रोडक्शन सैंपल तैयार करते हैं। बल्क कटिंग शुरू होने से पहले वास्तविक ड्रेप, सिलाई मजबूती और वॉश फील की समीक्षा करें।",
    pl_step2_tag1: "प्री-प्रोडक्शन सैंपल",
    pl_step2_tag2: "स्क्रीन व डिजिटल प्रिंट",
    pl_step2_tag3: "ड्यूरेबिलिटी QC",
    pl_step3_sub: "03 ब्रांडिंग व लॉन्च / टैग्स · पैकेजिंग · डिस्पैच",
    pl_step3_title: "हर परिधान पर अपना नाम लगाएं।",
    pl_step3_desc: "वोवन नेक डैमास्क लेबल, ब्रांडेड सैटिन वॉश-केयर टैग, कस्टम हैंगटैग, बारकोड स्टिकर और रिटेल पॉलीबैग कार्टन में पैक किए जाते हैं।",
    pl_step3_tag1: "वोवन डैमास्क",
    pl_step3_tag2: "कस्टम हैंगटैग",
    pl_step3_tag3: "अखिल भारतीय लॉजिस्टिक्स",
    pl_cap_title: "मैन्युफैक्चरिंग क्षमताएं",
    pl_cap1_name: "कस्टम टेक पैक्स",
    pl_cap1_desc: "फिटिंग, साइज और स्टाइलिंग स्पेसिफिकेशन",
    pl_cap2_name: "मिल-डायरेक्ट फैब्रिक्स",
    pl_cap2_desc: "गुणवत्तापूर्ण यार्न और सटीक शेड्स",
    pl_cap3_name: "फिजिकल सैंपलिंग",
    pl_cap3_desc: "कटिंग से पहले फिट सत्यापन",
    pl_cap4_name: "बल्क प्रोडक्शन",
    pl_cap4_desc: "सख्त सिलाई और वॉश QC लाइन्स",
    pl_cap5_name: "कस्टम पैकेजिंग",
    pl_cap5_desc: "वोवन टैग्स, बारकोड और बॉक्सेस",
    pl_cap6_name: "अखिल भारतीय फ्रेट",
    pl_cap6_desc: "डोरस्टेप ट्रांसपोर्ट कॉरिडोर्स",

    // Section 8 - Business Sourcing Advisory
    advisory_kicker: "[ B2B सोर्सिंग सलाह ]",
    advisory_title_1: "अहमदाबाद में आपका",
    advisory_title_2: "गारमेंट गाइड।",
    advisory_highlight: "कपड़े खरीदना केवल उत्पाद खोजने के बारे में नहीं है। यह सही उत्पाद, सही मात्रा और सही कीमत खोजने के बारे में है।",
    advisory_desc: "हम अहमदाबाद के कपड़ा बाजारों में तेजी से बिकने वाले परिधानों का चयन करने, डेड स्टॉक के जोखिम को कम करने और मौसमी खरीद के लिए आपका मार्गदर्शन करते हैं।",
    btn_talk_team_caps: "हमारी गारमेंट टीम से बात करें",
    adv_1_title: "उत्पाद चयन",
    adv_1_desc: "अपने लक्षित खुदरा क्षेत्र के लिए व्यावसायिक रूप से उपयुक्त किस्मों को चुनें।",
    adv_2_title: "स्टॉक प्लानिंग",
    adv_2_desc: "अत्यधिक स्टॉक से बचें और डेड इन्वेंट्री में पूंजी फंसने से रोकें।",
    adv_3_title: "साइज-वार खरीद",
    adv_3_desc: "वास्तविक क्षेत्रीय मांग के अनुसार साइज अनुपात और रंगों की योजना बनाएं।",
    adv_4_title: "वैरायटी प्रबंधन",
    adv_4_desc: "अधिक कार्यशील पूंजी को अवरुद्ध किए बिना अधिक आकर्षक वैरायटी प्रदान करें।",
    adv_5_title: "खरीद मार्गदर्शन",
    adv_5_desc: "सत्यापित अहमदाबाद मिलों से सीधे बेहतर और समझदारी भरे निर्णय लें।",

    // Section 10 - Exports
    export_kicker: "// वैश्विक परिधान निर्यात",
    export_title_1: "अहमदाबाद से",
    export_title_2: "वैश्विक बाजारों तक।",
    export_desc_main: "हमारे विनिर्माण संपर्कों और गुणवत्ता नियंत्रण प्रोटोकॉल का लाभ उठाते हुए, हिम्मत टेक्सटाइल अंतरराष्ट्रीय परिधान खरीदारों और वितरकों को भारत से विश्वसनीय निर्यात आपूर्ति प्रदान करता है।",
    exp_card_1_title: "सोर्सिंग",
    exp_card_1_desc: "वोवन, निटेड और एथनिक परिधानों में स्केलेबल वॉल्यूम क्षमता।",
    exp_card_2_title: "उत्पादन QC",
    exp_card_2_desc: "सख्त साइजिंग जांच, सिकुड़न नियंत्रण और रंग स्थिरता निरीक्षण।",
    exp_card_3_title: "व्हाइट लेबलिंग",
    exp_card_3_desc: "कस्टम प्राइवेट लेबलिंग, बारकोड टैगिंग और एक्सपोर्ट पॉलीबैग पैकेजिंग।",
    exp_card_4_title: "निर्यात सहायता",
    exp_card_4_desc: "सीमा शुल्क दस्तावेज, बिल ऑफ लैडिंग और पोर्ट लॉजिस्टिक्स समन्वय।",
    btn_discuss_req_caps: "अपनी आवश्यकता पर चर्चा करें",

    // Category Chips & Decks
    chip_verticals: "सोर्सिंग श्रेणियां",
    chip_all_systems: "सभी गारमेंट सोर्सिंग प्रणालियां",
    chip_selected: "चयनित:",
    chip_all: "सभी श्रेणियां",
    deck_direct_mill: "डायरेक्ट मिल लॉट्स",
    deck_quality_qc: "100% गुणवत्ता QC",
    deck_dispatch: "अखिल भारतीय डिस्पैच",
    deck_material_proof: "मटीरियल प्रूफ",
    deck_spin_weave: "कताई / बुनाई / सिलाई",
    deck_configure: "कैटलॉग कोट प्राप्त करें",
    deck_typical_spec: "विशिष्ट स्पेसिफिकेशन",
    deck_avail_colours: "उपलब्ध रंग",

    // Footer
    foot_cat_heading: "गारमेंट श्रेणियां",
    foot_contact_heading: "हिम्मत टेक्सटाइल से संपर्क करें",
    foot_hub_name: "अहमदाबाद सोर्सिंग हब",
    foot_address_line1: "21, हीरालाल मार्केट, पहली मंजिल,",
    foot_address_line2: "खटरा रोड, अहमदाबाद,",
    foot_address_line3: "गुजरात, भारत",
    foot_verified: "सत्यापित खरीदार",
    foot_alert_kicker: "सीमित समय अलर्ट",
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("himat_lang") as Language;
    if (saved === "en" || saved === "hi") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("himat_lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
