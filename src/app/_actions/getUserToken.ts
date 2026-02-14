'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers"

export default async function getUserToken() {
    const cookieStore = await cookies();
    const encryptedToken =  cookieStore.get("__Secure-next-auth.session-token") || 
                            cookieStore.get("next-auth.session-token");
    if (!encryptedToken) return null;
    let decodedToken = await decode({
        token : encryptedToken?.value , 
        secret : process.env.NEXTAUTH_SECRET!
    });
   return decodedToken?.token as string || null;
}