export const garmentCategories = ["knitwear", "woven", "denim", "sportswear"] as const;
export type GarmentCategory = (typeof garmentCategories)[number];

export type InquiryAlertPayload = {
  companyName: string;
  contactName?: string | null;
  email?: string | null;
  phone?: string | null;
  productInterest: string;
  quantity?: string | null;
  message: string;
  station?: string | null;
};

export function buildInquiryOwnerAlert(input: InquiryAlertPayload) {
  const value = (item?: string | null) => item?.trim() || "Not provided";
  const fields: Array<[string, string]> = [
    ["Company name", value(input.companyName)],
    ["Contact name", value(input.contactName)],
    ["Email", value(input.email)],
    ["Phone", value(input.phone)],
    ["Product interest", value(input.productInterest)],
    ["Quantity", value(input.quantity)],
    ["Station", value(input.station)],
    ["Message", value(input.message)],
  ];

  return {
    title: `New Himat Textile inquiry — ${value(input.companyName)}`,
    content: ["A new B2B inquiry has been submitted.", "", ...fields.map(([label, item]) => `${label}: ${item}`)].join("\n"),
  };
}

export function isAdvertisementCurrentlyActive(input: {
  isActive: boolean;
  startsAt?: Date | null;
  endsAt?: Date | null;
}, now = new Date()) {
  if (!input.isActive) return false;
  if (input.startsAt && input.startsAt.getTime() > now.getTime()) return false;
  if (input.endsAt && input.endsAt.getTime() < now.getTime()) return false;
  return true;
}
