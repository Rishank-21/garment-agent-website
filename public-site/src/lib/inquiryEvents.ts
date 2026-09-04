export function mapCategoryToRequirement(categoryTitle: string): string {
  const norm = categoryTitle.toLowerCase();
  if (norm.includes("women")) return "Women's Wear";
  if (norm.includes("men")) return "Men's Wear";
  if (norm.includes("kid")) return "Kids Wear";
  if (norm.includes("ethnic")) return "Ethnic Wear";
  if (norm.includes("bedsheet") || norm.includes("home")) return "Bedsheets";
  if (norm.includes("fabric")) return "Fabrics Sourcing";
  if (norm.includes("white") || norm.includes("label")) return "White Labeling";
  if (norm.includes("western")) return "Western Wear";
  return "Men's Wear";
}

export interface InquiryEventDetail {
  requirement: string;
  message: string;
  categoryTitle: string;
  variantName?: string;
}

export function triggerInquiryForCategory({
  categoryTitle,
  variantName,
  variantNote,
  fabric,
}: {
  categoryTitle: string;
  variantName?: string;
  variantNote?: string;
  fabric?: string;
}) {
  const requirement = mapCategoryToRequirement(categoryTitle);

  let message = "";
  if (variantName) {
    const specDetails = [variantNote, fabric].filter(Boolean).join(" | ");
    message = `Inquiry for ${categoryTitle} — ${variantName}${specDetails ? ` (${specDetails})` : ""}. Looking for wholesale volume pricing, MOQ, catalog swatches, and door-step dispatch timeline.`;
  } else {
    message = `Inquiry for ${categoryTitle} catalog${fabric ? ` (${fabric})` : ""}. Looking for bulk wholesale pricing, MOQ, digital catalog, and sample swatches.`;
  }

  const detail: InquiryEventDetail = {
    requirement,
    message,
    categoryTitle,
    variantName,
  };

  if (typeof window !== "undefined") {
    // Save to session storage in case of page transition
    try {
      sessionStorage.setItem("himat_pending_inquiry", JSON.stringify(detail));
    } catch {
      // ignore
    }

    // Dispatch event to any active HimatInquiry component on current page
    window.dispatchEvent(new CustomEvent("himat-fill-inquiry", { detail }));

    // Scroll to the inquiry form on the current page
    const enquiryEl = document.getElementById("enquiry") || document.getElementById("contact");
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: "smooth", block: "start" });

      // Focus the first interactive field after smooth scroll
      setTimeout(() => {
        const input = enquiryEl.querySelector("input:not([type=hidden])") as HTMLInputElement;
        if (input) {
          input.focus({ preventScroll: true });
        }
      }, 550);
    } else {
      // If form is not on current page, redirect to /catalog#enquiry
      window.location.href = `/catalog#enquiry`;
    }
  }
}
