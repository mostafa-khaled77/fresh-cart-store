'use server'
import { revalidatePath } from "next/cache";
import getUserToken from "./getUserToken";




// Add Product to Cart
export async function addToCart(productId: string) {
    const token = await getUserToken();
    if (!token) return { status: "fail", message: "Unauthorized" };

    const res = await fetch(`${process.env.BASE_URL}/cart` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": token
        },
        body: JSON.stringify({ productId })
    });
    const data = await res.json();
    revalidatePath('/cart'); 
    return data;
}

// Get All Cart Data
export async function getLoggedUserCart() {
    const token = await getUserToken();
    if(!token) return { status: "fail" };
    
    const res = await fetch(`${process.env.BASE_URL}/cart`, {
        method: "GET",
        headers: { "token": token },
        cache: 'no-store'
    });
 
    if (!res.ok) {
        return null; 
    }

    return await res.json();
}

// Remove Item From Cart
export async function removeItem(productId: string) {
    const token = await getUserToken();
    if (!token) return { status: "fail" };

    const res = await fetch(`${process.env.BASE_URL}/${productId}`, {
        method: "DELETE",
        headers: { "token": token }
    });
    const data = await res.json();
    revalidatePath('/cart');
    return data;
}

// Update Quantity For Items
export async function updateQuantity(productId: string, count: number) {
    const token = await getUserToken();
    if (!token) return { status: "fail" };
    
    const res = await fetch(`${process.env.BASE_URL}/${productId}`, { 
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "token": token
        },
        body: JSON.stringify({ count })
    });
    const data = await res.json();
    revalidatePath('/cart');
    return data;
}

// Clear All Cart
export async function clearCart(cartId:string) {
    const token = await getUserToken();
    if (!token) return { status: "fail" };

    const res = await fetch(`${process.env.BASE_URL}`, { 
        method: "DELETE",
        headers: { "token": token }
    });
    const data = await res.json();
    revalidatePath('/cart');
    return data;
}