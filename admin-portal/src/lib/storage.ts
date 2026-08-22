import crypto from "crypto";

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return { cloudName, apiKey, apiSecret };
}

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  const cloudinaryConfig = getCloudinaryConfig();
  if (cloudinaryConfig) {
    const { cloudName, apiKey, apiSecret } = cloudinaryConfig;
    const key = normalizeKey(relKey);

    let dataUrl: string;
    if (typeof data === "string") {
      if (data.startsWith("data:")) {
        dataUrl = data;
      } else {
        const base64 = Buffer.from(data).toString("base64");
        dataUrl = `data:${contentType};base64,${base64}`;
      }
    } else {
      const base64 = Buffer.from(data).toString("base64");
      dataUrl = `data:${contentType};base64,${base64}`;
    }

    const lastDot = key.lastIndexOf(".");
    let publicId = key;
    if (lastDot !== -1) {
      publicId = key.slice(0, lastDot);
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const params: Record<string, string> = {
      public_id: publicId,
      timestamp,
    };

    const sortedKeys = Object.keys(params).sort();
    const paramString = sortedKeys.map((k) => `${k}=${params[k]}`).join("&");
    const stringToSign = `${paramString}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

    const formData = new FormData();
    formData.append("file", dataUrl);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("public_id", publicId);
    formData.append("signature", signature);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudinary upload failed (${response.status}): ${errorText}`);
    }

    const result = (await response.json()) as { public_id: string; secure_url: string };
    return { key: result.public_id, url: result.secure_url };
  }

  // Fallback if no Cloudinary is configured (e.g. return a mock or local path)
  const key = normalizeKey(relKey);
  console.warn("[Storage] Cloudinary not configured. Fallback to placeholder image.");
  return { key, url: `https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600` };
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  const cloudinaryConfig = getCloudinaryConfig();
  if (cloudinaryConfig) {
    return {
      key,
      url: `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${key}`,
    };
  }
  return { key, url: `https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600` };
}

export async function storageGetSignedUrl(relKey: string): Promise<string> {
  const cloudinaryConfig = getCloudinaryConfig();
  if (cloudinaryConfig) {
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${normalizeKey(relKey)}`;
  }
  return `https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600`;
}
