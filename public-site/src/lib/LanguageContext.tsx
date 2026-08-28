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
    nav_contact: "Contact",
    btn_start_enquiry: "Start Enquiry",
    
    // Hero
    hero_tagline: "Your Garment Guide In Ahmedabad",
    hero_title_1: "BUILT FOR",
    hero_title_2: "THE BUSINESS",
    hero_title_3: "OF FASHION.",
    hero_subtitle: "Your Trusted Partner for Sourcing, Private Label & Global Exports.",
    hero_description: "From product sourcing to custom manufacturing, we help wholesalers, retailers and fashion businesses find the right garments with confidence.",
    btn_view_collection: "View Collection",
    btn_start_enquiry_upper: "START AN ENQUIRY",
    hero_small_text: "AHMEDABAD, INDIA | SOURCING • WHOLESALE • PRIVATE LABEL • EXPORT",

    // Marquee Strip
    strip_text_1: "2nd Generation Garment Partner",
    strip_text_2: "Men's, Women's, Kids Wear",
    strip_text_3: "Bedsheets & Fabrics Sourcing",
    strip_text_4: "Wholesale & Private Label Sourcing",

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
    cat_womens_title: "WOMEN'S WEAR",
    cat_womens_desc: "Contemporary styles • Ethnic • Western",
    cat_mens_title: "MEN'S WEAR",
    cat_mens_desc: "Casual • Fashion • Everyday essentials",
    cat_kids_title: "KIDS WEAR",
    cat_kids_desc: "Trendy • Comfortable • Value-focused",
    cat_ethnic_title: "ETHNIC WEAR",
    cat_ethnic_desc: "Traditional craftsmanship with modern styling",
    cat_western_title: "WESTERN WEAR",
    cat_western_desc: "Contemporary fashion for global markets",
    cat_private_label_title: "CUSTOM / PRIVATE LABEL",
    cat_private_label_desc: "Develop your own collection with us.",
    btn_explore_all: "EXPLORE ALL GARMENTS →",

    // Why Himat Textile
    why_label: "MORE THAN A GARMENT SUPPLIER.",
    why_title: "We help businesses source, develop and grow their apparel collections.",
    why_01_title: "GARMENT SOURCING",
    why_01_desc: "Find the right products, styles and price points for your market.",
    why_02_title: "QUALITY FOCUS",
    why_02_desc: "Product selection and quality checks with attention to detail.",
    why_03_title: "PRIVATE LABEL",
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
    btn_start_private_label: "START YOUR PRIVATE LABEL →",

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
    ex_badge_private_label: "PRIVATE LABEL",
    ex_badge_export: "EXPORT SUPPORT",
    btn_discuss_requirement: "DISCUSS YOUR REQUIREMENT →",

    // Enquiry Section
    enq_label: "08 / Begin a Sourcing Conversation",
    enq_desc_top: "Let's Build Your Next Collection.",
    enq_desc_p: "Tell Himat Textile what you are building. Selecting your product lines and estimated order size helps our design and fabric teams prepare the right brief.",
    enq_title: "HAVE A REQUIREMENT?",
    enq_subtitle: "Tell us what you’re looking for.",
    enq_field_name: "Name / Contact Person",
    enq_field_company: "Business / Company Name *",
    enq_field_phone: "WhatsApp / Mobile *",
    enq_field_email: "Work Email",
    enq_field_requirement: "Garment Requirements *",
    enq_field_quantity: "Quantity / MOQ *",
    enq_field_market: "Your Market / Country",
    enq_field_station: "Station (State & Area) *",
    enq_placeholder_station: "e.g. Indore, Madhya Pradesh",
    enq_field_message: "Sourcing Message *",
    enq_placeholder_msg: "Describe your requirement in detail (fabric type, styles, sizes, or delivery schedules).",
    btn_send_enquiry: "SEND ENQUIRY →",
    btn_whatsapp_us: "WHATSAPP US →",
    whatsapp_floating: "Chat on WhatsApp",
    whatsapp_chat_desk: "WhatsApp: Sourcing Chat ↗",
    call_direct_desk: "Call: Direct Desk",

    // Brand Statement
    bs_title_1: "BUILT ON TRUST.",
    bs_title_2: "DRIVEN BY FASHION.",
    bs_title_3: "READY FOR BUSINESS.",
    bs_subtitle: "Garment Sourcing • Wholesale • Private Label • Global Apparel Exports",
    bs_location: "Ahmedabad, India",

    // Footer
    foot_desc: "Your trusted partner for garment sourcing, private label production and global apparel exports.",
    foot_quick_links: "QUICK LINKS",
    foot_contact: "CONTACT",
    foot_address: "21 Hira Bhai Market, 1st Floor, Kankaria Road, Ahmedabad – 380002, Gujarat, India",
    foot_email: "EMAIL",
    foot_website: "WEBSITE",
    foot_social: "SOCIAL",
    foot_rights: "ALL RIGHTS RESERVED.",
  },
  hi: {
    // Header
    nav_about: "हमारे बारे में",
    nav_garments: "गारमेंट्स",
    nav_capabilities: "क्षमताएं",
    nav_network: "नेटवर्क",
    nav_guide: "बिजनेस गाइड",
    nav_contact: "संपर्क",
    btn_start_enquiry: "पूछताछ शुरू करें",
    
    // Hero
    hero_tagline: "अहमदाबाद में आपका गारमेंट गाइड",
    hero_title_1: "फैशन के",
    hero_title_2: "बिजनेस के लिए",
    hero_title_3: "निर्मित।",
    hero_subtitle: "गारमेंट सोर्सिंग, प्राइवेट लेबल और वैश्विक परिधान निर्यात के लिए आपका भरोसेमंद साथी।",
    hero_description: "उत्पाद सोर्सिंग से लेकर कस्टम विनिर्माण तक, हम थोक विक्रेताओं, खुदरा विक्रेताओं और फैशन व्यवसायों को विश्वास के साथ सही परिधान खोजने में मदद करते हैं।",
    btn_view_collection: "कलेक्शन देखें",
    btn_start_enquiry_upper: "पूछताछ शुरू करें",
    hero_small_text: "अहमदाबाद, भारत | सोर्सिंग • थोक • प्राइवेट लेबल • निर्यात",

    // Marquee Strip
    strip_text_1: "दूसरी पीढ़ी का गारमेंट पार्टनर",
    strip_text_2: "मेन्स, विमेन्स, किड्स वियर",
    strip_text_3: "बेडशीट और फैब्रिक्स सोर्सिंग",
    strip_text_4: "थोक और प्राइवेट लेबल सोर्सिंग",

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
    cat_womens_title: "विमेन्स वियर (महिला परिधान)",
    cat_womens_desc: "आधुनिक शैलियों • एथनिक • वेस्टर्न",
    cat_mens_title: "मेन्स वियर (पुरुष परिधान)",
    cat_mens_desc: "कैजुअल • फैशन • रोजमर्रा की जरूरतें",
    cat_kids_title: "किड्स वियर (बच्चों के कपड़े)",
    cat_kids_desc: "ट्रेंडी • आरामदायक • वैल्यू-फोकस्ड",
    cat_ethnic_title: "एथनिक वियर (पारंपरिक पोशाक)",
    cat_ethnic_desc: "आधुनिक स्टाइलिंग के साथ पारंपरिक शिल्प कौशल",
    cat_western_title: "वेस्टर्न वियर",
    cat_western_desc: "वैश्विक बाजारों के लिए समकालीन फैशन",
    cat_private_label_title: "कस्टम / प्राइवेट लेबल",
    cat_private_label_desc: "हमारे साथ अपना खुद का कलेक्शन विकसित करें।",
    btn_explore_all: "सभी गारमेंट्स देखें →",

    // Why Himat Textile
    why_label: "सिर्फ एक गारमेंट सप्लायर से कहीं अधिक।",
    why_title: "हम व्यवसायों को उनके परिधान कलेक्शन को सोर्स करने, विकसित करने और बढ़ाने में मदद करते हैं।",
    why_01_title: "गारमेंट सोर्सिंग",
    why_01_desc: "अपने बाजार के लिए सही उत्पाद, स्टाइल और मूल्य बिंदु खोजें।",
    why_02_title: "गुणवत्ता पर ध्यान",
    why_02_desc: "विस्तृत विवरण पर ध्यान देने के साथ उत्पाद चयन और गुणवत्ता की जाँच।",
    why_03_title: "प्राइवेट लेबल",
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
    btn_start_private_label: "अपना प्राइवेट लेबल शुरू करें →",

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
    ex_badge_private_label: "प्राइवेट लेबल",
    ex_badge_export: "निर्यात सहायता",
    btn_discuss_requirement: "अपनी आवश्यकता पर चर्चा करें →",

    // Enquiry Section
    enq_label: "08 / सोर्सिंग बातचीत शुरू करें",
    enq_desc_top: "आइए आपका अगला कलेक्शन बनाएं।",
    enq_desc_p: "हिम्मत टेक्सटाइल को बताएं कि आप क्या बना रहे हैं। आपकी उत्पाद लाइनों और अनुमानित ऑर्डर आकार का चयन हमारे डिजाइन और फैब्रिक टीमों को सही संक्षिप्त विवरण तैयार करने में मदद करता है।",
    enq_title: "कोई आवश्यकता है?",
    enq_subtitle: "हमें बताएं कि आप क्या ढूंढ रहे हैं।",
    enq_field_name: "नाम / संपर्क व्यक्ति",
    enq_field_company: "व्यवसाय / कंपनी का नाम *",
    enq_field_phone: "व्हाट्सएप / मोबाइल नंबर *",
    enq_field_email: "कार्य ईमेल",
    enq_field_requirement: "परिधान आवश्यकताएं *",
    enq_field_quantity: "मात्रा / एमओक्यू *",
    enq_field_market: "आपका बाजार / देश",
    enq_field_station: "स्टेशन (राज्य और क्षेत्र) *",
    enq_placeholder_station: "उदा. इंदौर, मध्य प्रदेश",
    enq_field_message: "सोर्सिंग संदेश *",
    enq_placeholder_msg: "अपनी आवश्यकता का विस्तार से वर्णन करें (कपड़े का प्रकार, शैली, आकार, या वितरण कार्यक्रम)।",
    btn_send_enquiry: "पूछताछ भेजें →",
    btn_whatsapp_us: "व्हाट्सएप करें →",
    whatsapp_floating: "व्हाट्सएप चैट",
    whatsapp_chat_desk: "व्हाट्सएप: सोर्सिंग चैट ↗",
    call_direct_desk: "कॉल: डायरेक्ट डेस्क",

    // Brand Statement
    bs_title_1: "भरोसे पर निर्मित।",
    bs_title_2: "फैशन से प्रेरित।",
    bs_title_3: "बिजनेस के लिए तैयार।",
    bs_subtitle: "गारमेंट सोर्सिंग • होलसेल • प्राइवेट लेबल • ग्लोबल अपैरल एक्सपोर्ट्स",
    bs_location: "अहमदाबाद, भारत",

    // Footer
    foot_desc: "गारमेंट सोर्सिंग, प्राइवेट लेबल उत्पादन और वैश्विक परिधान निर्यात के लिए आपका भरोसेमंद साथी।",
    foot_quick_links: "त्वरित लिंक्स",
    foot_contact: "संपर्क",
    foot_address: "21 हीरा भाई मार्केट, पहली मंजिल, कांकरिया रोड, अहमदाबाद - 380002, गुजरात, भारत",
    foot_email: "ईमेल",
    foot_website: "वेबसाइट",
    foot_social: "सोशल मीडिया",
    foot_rights: "सर्वाधिकार सुरक्षित।",
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
