import connectMongoDB from '@/libs/mongodb';
import Review from '@/models/reviewSchema';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const { restaurant, rating, review } = await request.json();
    await connectMongoDB();
    await Review.create({ restaurant, rating, review });
    return NextResponse.json({ message: 'Review added successfully '}, { status: 201});
}