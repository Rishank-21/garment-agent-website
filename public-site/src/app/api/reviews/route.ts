import { NextResponse } from "next/server";
import { createReview } from "@/lib/db";
import { ReviewValues } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const { author, rating, text, date } = (await req.json()) as ReviewValues;

    if (!author || !text) {
      return new NextResponse("Name and review details are required", { status: 400 });
    }

    const review = await createReview({
      author,
      rating: rating ?? 5,
      text,
      date: date || "just now",
      isActive: false // Admin approval is required!
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("[API/Reviews] Error creating review:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
