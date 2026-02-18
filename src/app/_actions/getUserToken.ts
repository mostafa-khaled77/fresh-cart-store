'use server'
import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"

export default async function getUserToken() {
    const cookieStore = await cookies();
    
    // Check both cookie names (secure in prod, normal in dev)
    const token = cookieStore.get("__Secure-next-auth.session-token")?.value || 
                  cookieStore.get("next-auth.session-token")?.value;

    if (!token) return null;

    try {
        const decoded = await decode({
            token: token,
            secret: process.env.NEXTAUTH_SECRET!
        });
        
        // Return the token stored in the session payload
        return decoded?.token as string || null;
    } catch (e) {
        console.error("Token decoding failed:", e);
        return null;
    }
}