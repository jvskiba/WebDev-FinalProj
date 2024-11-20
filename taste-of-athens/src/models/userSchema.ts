import  mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    username: string;
    password: string;
}

const userSchema = new Schema<User>({
    username: {type: String, required: true, unique: true }, 
    password: {type: String, required: true },
});

const User = mongoose.models. User ?? mongoose.model("User", userSchema);
export default User;