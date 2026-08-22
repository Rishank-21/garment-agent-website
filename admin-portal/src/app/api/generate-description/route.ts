import { NextResponse } from "next/server";
import { generateProductDescription } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { fabricType, style, targetMarket } = (await req.json()) as {
      fabricType: string;
      style: string;
      targetMarket: string;
    };

    if (!fabricType || !style || !targetMarket) {
      return new NextResponse("Missing required inputs", { status: 400 });
    }

    const description = await generateProductDescription({ fabricType, style, targetMarket });
    return NextResponse.json({ description });
  } catch (error: any) {
    console.error("[API/GenerateDescription] Error:", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}
