import { NextResponse } from "next/server";
import { uploadHimatImage } from "@/lib/himat";

export async function POST(req: Request) {
  try {
    const { dataUrl, folder } = (await req.json()) as {
      dataUrl: string;
      folder: "products" | "advertisements" | "brands" | "guides";
    };

    if (!dataUrl || !folder) {
      return new NextResponse("Missing required inputs", { status: 400 });
    }

    const userId = "admin-id";
    const result = await uploadHimatImage(userId, dataUrl, folder);
    
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("[API/Upload] Error processing image upload:", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}
