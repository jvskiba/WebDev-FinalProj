import connectMongoDB from '@/libs/mongodb';
import Review from '@/models/reviewSchema';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

interface RouteParams {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    await connectMongoDB();
    const review = await Review.findOne({ _id: id });
    return NextResponse.json({ review }, { status: 200 });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const { restaurant: restaurant, rating: rating, review: review } = await request.json();
    await connectMongoDB();
    await Review.findByIdAndUpdate(id, { restaurant, rating, review });
    return NextResponse.json({ message: 'Review updated' }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: RouteParams ) {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    await connectMongoDB();
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
        return NextResponse.json({ message: 'Review not found' }, { status: 404});
    }

    return NextResponse.json({ message: 'Review deleted '}, { status: 200 });
}