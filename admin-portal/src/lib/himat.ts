import { nanoid } from "nanoid";
import { storagePut } from "./storage";

export const garmentCategories = ["knitwear", "woven", "denim", "sportswear"] as const;
export type GarmentCategory = (typeof garmentCategories)[number];

const dataUrlPattern = /^data:(image\/(?:jpeg|png|webp|gif));base64,([A-Za-z0-9+/=]+)$/;

export function parseImageDataUrl(dataUrl: string) {
  const match = dataUrlPattern.exec(dataUrl);
  if (!match) {
    throw new Error("Please upload a valid PNG, JPG, WEBP, or GIF image.");
  }

  const [, contentType, base64] = match;
  const extension = contentType === "image/jpeg" ? "jpg" : contentType.replace("image/", "");
  return { contentType, extension, data: Buffer.from(base64, "base64") };
}

export async function uploadHimatImage(
  userId: number | string,
  dataUrl: string,
  folder: "products" | "advertisements" | "brands" | "guides"
) {
  const image = parseImageDataUrl(dataUrl);
  if (image.data.byteLength > 10 * 1024 * 1024) {
    throw new Error("Images must be smaller than 10 MB.");
  }

  return storagePut(
    `himat-textile/${userId}/${folder}/${nanoid(14)}.${image.extension}`,
    image.data,
    image.contentType
  );
}
