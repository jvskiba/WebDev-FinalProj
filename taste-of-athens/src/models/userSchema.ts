import mongoose, { Schema, Document, Model } from 'mongoose';

interface User extends Document {
    username: string;
    password: string;
}

const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User: Model<User> = mongoose.models.Item || mongoose.model<User>('User', userSchema);
export default User;