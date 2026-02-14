'use server'

import { revalidatePath } from "next/cache"
import getUserToken from "./getUserToken"
import { WishlistResponse } from "@/interfaces/wishlist.interface";

//Get logged user wishlist
export async function getLoggedUserWishlist(): Promise<WishlistResponse | null> {
    const token = await getUserToken();
    if(!token) return null;
    const res = await fetch(`${process.env.BASE_URL}/wishlist` , {
        method:"GET",
        headers:{
            "token" : token,
            cache: 'no-store'
        }
    });
    return await res.json()
}


// Add Product To WishList
export async function AddProductToWishlist(productId : string){
    const token = await getUserToken()
    if(!token) return {status: "fail", message: "Unauthorized" }
    const res = await fetch(`${process.env.BASE_URL}/wishlist` , {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "token":token,
        },
        body:JSON.stringify({productId})
    })
    const data = await res.json();
    revalidatePath('/wishlist'); 
    return data
}


// Remove product from wishlist
export async function removeProductFromWishlist(productId: string){
    const token = await getUserToken();
    if (!token) return { status: "fail" };
    const res = await fetch(`${process.env.BASE_URL}/wishlist/${productId}` , {
        method:"DELETE",
        headers:{"token" : token}
    })
    const data = await res.json();
    revalidatePath('/wishlist'); 
    return data
}