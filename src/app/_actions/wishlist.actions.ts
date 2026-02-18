"use server";
import { revalidatePath } from "next/cache";
import getUserToken from "./getUserToken";
import { WishlistResponse } from "@/interfaces/wishlist.interface";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

async function handleResponse(res: Response) {
    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Wishlist API Error (${res.status}):`, errorText);
        return null;
    }
    try {
        const text = await res.text();
        return text ? JSON.parse(text) : null;
    } catch (error) {
        return null;
    }
}

export async function getLoggedUserWishlist(): Promise<WishlistResponse | null> {
    const token = await getUserToken();
    if (!token) return null;

    try {
        const res = await fetch(`${API_URL}/wishlist`, {
            method: "GET",
            headers: {
                "token": token,
            },
            cache: 'no-store', 
        });

        const data = await handleResponse(res);
        
        if (data && (data.status === "success" || data.count >= 0)) {
            console.log("Wishlist Data Received:", JSON.stringify(data, null, 2));
            return data;
        }
        
        return null;
    } catch (error) {
        return null;
    }
}

export async function AddProductToWishlist(productId : string){
    const token = await getUserToken();
    if(!token) return { status: "fail", message: "Unauthorized" };
    
    try {
        const res = await fetch(`${API_URL}/wishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token,
            },
            body: JSON.stringify({ productId })
        });
        
        const data = await handleResponse(res);
        revalidatePath('/wishlist'); 
        revalidatePath('/', 'layout'); 
        return data;
    } catch (error) {
        return { status: "fail", message: "Network error" };
    }
}

export async function removeProductFromWishlist(productId: string){
    const token = await getUserToken();
    if (!token) return { status: "fail" };
    
    try {
        const res = await fetch(`${API_URL}/wishlist/${productId}`, {
            method: "DELETE",
            headers: { "token": token }
        });
        
        const data = await handleResponse(res);
        revalidatePath('/wishlist'); 
        revalidatePath('/', 'layout');
        return data;
    } catch (error) {
        return { status: "fail", message: "Network error" };
    }
}