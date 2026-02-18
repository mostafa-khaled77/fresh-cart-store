"use server";
import { revalidatePath } from "next/cache";
import getUserToken from "./getUserToken";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

async function handleResponse(res: Response) {
  if (!res.ok) {
    return { status: "error", message: `API Error: ${res.status}` };
  }
  try {
    const text = await res.text();
    return text ? JSON.parse(text) : { status: "error", message: "Empty response" };
  } catch (error) {
    return { status: "error", message: "Invalid JSON response" };
  }
}

// Add Product to Cart
export async function addToCart(productId: string) {
    const token = await getUserToken(); 
    if (!token) return { status: "fail", message: "Unauthorized" };

    try {
        const res = await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token, 
            },
            body: JSON.stringify({ productId }) 
        });

        const data = await res.json();
        revalidatePath("/cart");
        return data; 
    } catch (error) {
         return { status: "error", message: "Connection failed" };
    }
}

// Get All Cart Data
export async function getLoggedUserCart() {
  const token = await getUserToken();
  if (!token) return { status: "fail" };
  
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "GET",
      headers: {
        "token": token,
      },
      cache: "no-store", 
    });

    const data = await handleResponse(res);
    return data;
  } catch (error) {
    return null;
  }
}

// Remove Item From Cart
export async function removeItem(productId: string) {
  const token = await getUserToken();
  if (!token) return { status: "fail" };

  try {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: { token: token },
    });
    const data = await handleResponse(res);
    revalidatePath("/cart");
    return data;
  } catch (error) {
    return null;
  }
}

// Update Quantity For Items
export async function updateQuantity(productId: string, count: number) {
  const token = await getUserToken();
  if (!token) return { status: "fail" };

  try {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ count }),
    });
    const data = await handleResponse(res);
    revalidatePath("/cart");
    return data;
  } catch (error) {
    return null;
  }
}

// Clear All Cart
export async function clearCart() {
  const token = await getUserToken();
  if (!token) return { status: "fail" };

  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "DELETE",
      headers: { token: token },
    });
    const data = await handleResponse(res);
    revalidatePath("/cart");
    revalidatePath("/allorders");
    return data;
  } catch (error) {
    return null;
  }
}