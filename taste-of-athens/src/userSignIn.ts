import { signIn, signOut } from "next-auth/react";
import { AuthError } from "next-auth";

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
      if (err instanceof AuthError) {
        switch (err.type) {
                  case "CredentialsSignin":
                      return { msg: "Invalid credentials" , status: "error"};
                  case "CredentialsSignin":
                      throw err;
                  default:
                      return { msg: "Something went wrong", status: "error" };
              }
      }
    }
  }