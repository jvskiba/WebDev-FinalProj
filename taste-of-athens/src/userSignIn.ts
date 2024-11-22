import { signIn } from "next-auth/react";
//import { signIn, signOut } from "@/auth";
import connectMongoDB from "./libs/mongodb";

export async function doLogout() {
//await signOut({ redirectTo: "/"});
}

export async function doCredentialLogin (formData: FormData): Promise<any> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    try {
        const response = await signIn("credentials", { 
            username, password,
            redirect: false,
        });
        return response;
    } catch (err: any) {
        throw err;
    }
}