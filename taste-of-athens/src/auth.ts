
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; 
import bcrypt from "bcryptjs";
import { User } from "./models/userSchema";
import connectMongoDB from "./libs/mongodb";

interface UserType {
    id: string;
    username: string;
    password: string;
}

export const {
    handlers: { GET, POST},
    auth,
    signIn, 
    signOut,
} = NextAuth({
    ...authConfig,
providers: [
    CredentialsProvider({ 
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
        },
    async authorize(credentials) {
        if (!credentials) return null;
        
        try {
            var user = null;
            /*if (User !== undefined) {
                user = await User.findOne({ username: credentials.username }).lean<UserType | null>();
            }          */
            if (user) {
                const password = String(credentials.password);
                const isMatch = await bcrypt.compare(
                password,
                user.password
            );

                if (isMatch) {
                    return{
                        id: user.id.toString(),
                        name: user.username,
                    };
                } else {
                    console.log("Email or Password is not correct"); 
                    return null;
                }
            } else {
                console.log("User not found");
                return null;
            }
        } catch (error: any) {
            console.log("An error occurred: ", error);
            return null;
        }
    },
}),
],
});