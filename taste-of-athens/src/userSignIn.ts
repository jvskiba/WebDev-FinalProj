import { signIn, signOut } from "next-auth/react";

// Function to logout and return to home
export async function doLogout() {
    await signOut({ redirectTo: "/"});
}

// Function to signin
export async function doCredentialLogin (formData: FormData): Promise<any> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    try {
        const response = await signIn("credentials",
          { 
            username, 
            password,
            redirect: false,
          }
        );
        return response;
    } catch (err: any) {
        throw err;
    }
  }