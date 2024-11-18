import connectMongoDB from "@/libs/mongodb";
import Review from "@/models/reviewSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET() {
    await connectMongoDB();
    const reviews = await Review.find();
    return NextResponse.json({ reviews });
}