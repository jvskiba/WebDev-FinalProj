import mongoose, { Schema, Document, Model } from 'mongoose';

interface Review extends Document {
    restaurant: string;
    rating: string;
    review: string;
    image?: string;
}

const reviewSchema = new Schema<Review>({
    restaurant: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
}, { collection : 'Reviews' });

const Review: Model<Review> = mongoose.models.Review || mongoose.model<Review>('ProjectData', reviewSchema);
export default Review;