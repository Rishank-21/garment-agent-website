import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/db";
import { alertHimatTextileOwner } from "@/lib/himatEmail";
import { InquiryValues } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as InquiryValues;

    if (!body.companyName || !body.productInterest || !body.quantity || !body.message) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Save to database
    const inquiry = await createInquiry(body);
    if (!inquiry) {
      return new NextResponse("Failed to save inquiry", { status: 500 });
    }

    // Dispatch email alert
    try {
      await alertHimatTextileOwner({
        companyName: body.companyName,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        productInterest: body.productInterest,
        quantity: body.quantity,
        message: body.message,
      });
    } catch (e) {
      console.warn("[API/Inquiry] Failed to send email alert:", e);
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error("[API/Inquiry] Error processing inquiry:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
