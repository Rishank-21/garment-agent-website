import { NextResponse } from "next/server";
import { recordClick, recordImpression, recordWhatsappClick } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { id, action } = (await req.json()) as { id: number; action: "click" | "impression" | "whatsapp" };

    if (!id || !action) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (action === "impression") {
      await recordImpression(id);
    } else if (action === "click") {
      await recordClick(id);
    } else if (action === "whatsapp") {
      await recordWhatsappClick(id);
    } else {
      return new NextResponse("Invalid action type", { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API/AdAction] Error processing ad action:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
