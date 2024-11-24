/* Jake code

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "./libs/mongodb";
import { User } from "./models/userSchema";
import { verifyPassword } from "./libs/auth";



const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jvskeeb" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongoDB();

        // Find user by email
        const user = await User.findOne({ email: credentials?.username });

        if (!user) {
          throw new Error("No user found with the provided email.");
        }

        // Verify password
        const isValid = await verifyPassword(credentials?.password!, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials.");
        }

        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
*/ 


import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; 
import bcrypt from "bcryptjs";
import { User } from "./models/userSchema";
import connectMongoDB from "./libs/mongodb";

interface UserType {
    _id: string;
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
            username: { label: "username", type: "text" },
            password: { label: "password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials) return null;
        
            try {
                var user = null;
                await connectMongoDB();
                if (User !== undefined) {
                    user = await User.findOne({ username: credentials.username }).lean<UserType | null>();
                }        
                if (user) {
                    const password = String(credentials.password);
                    const isMatch = await bcrypt.compare(
                      password,
                      user.password
                    );

                    if (isMatch) {
                        return{
                            id: user._id.toString(),
                            name: user.username,
                        };
                    } else {
                        console.log("Username or Password is not correct"); 
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
