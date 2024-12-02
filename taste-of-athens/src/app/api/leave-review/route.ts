import connectMongoDB from '@/libs/mongodb';
import Review from '@/models/reviewSchema';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const { restaurant, rating, review, image } = await request.json();
    await connectMongoDB();
    try {
        await Review.create({ restaurant, rating, review, image });
        return NextResponse.json({ message: 'Review added successfully'}, { status: 201});
    } catch (err) {
        return NextResponse.json({ message: 'Failed to add review' }, { status: 400});
    }
}