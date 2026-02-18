"use server";

import getUserToken from "./getUserToken";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

async function getFrontendUrl() {
  if (process.env.NEXT_PUBLIC_FRONTEND_URL) {
    return process.env.NEXT_PUBLIC_FRONTEND_URL;
  }
  
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

export async function createCashOrder(cartId: string, shippingAddress: { details: string; phone: string; city: string }) {
  const token = await getUserToken();
  if (!token) return { status: "fail", message: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/orders/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        "token": token 
      },
      body: JSON.stringify({ shippingAddress }), 
    });
    
    const data = await res.json();
    
    if (res.ok && (data.status === "success" || data.data)) {
        revalidatePath("/cart");
        revalidatePath("/allorders");
        return { status: "success", data };
    } else {
        return { status: "error", message: data.message || "Order placement failed" };
    }

  } catch (error) {
    return { status: "error", message: "Network connection failed" };
  }
}

export async function createVisaOrder(cartId: string, shippingAddress: { details: string; phone: string; city: string }) {
  const token = await getUserToken();
  if (!token) return { status: "fail", message: "Unauthorized" };

  const frontendUrl = await getFrontendUrl();
  console.log("Visa Checkout - Frontend URL:", frontendUrl);
  console.log("Visa Checkout - Cart ID:", cartId);

  try {
    const res = await fetch(`${API_URL}/orders/checkout-session/${cartId}?url=${frontendUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
        "token": token 
      },
      body: JSON.stringify({ shippingAddress }), 
    });
    
    const data = await res.json();

    if (res.ok && data.status === "success") {
        revalidatePath("/cart");
        return { status: "success", session: data.session };
    } else {
        return { status: "error", message: data.message || "Visa payment failed to start" };
    }

  } catch (error) {
    return { status: "error", message: "Connection to payment gateway failed" };
  }
}