"use server";

import { getUserIdFromToken } from "../../../utils/auth";
import getUserToken from "./getUserToken";

export async function getUserOrders() {
  const token = await getUserToken();
  if (!token) return { status: "fail", message: "Unauthorized" };

  const userId = getUserIdFromToken(token);
  if (!userId) return { status: "fail", message: "Invalid User Identification" };

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
      method: "GET",
      headers: { "token": token }, 
      cache: "no-store",
    });

    const data = await res.json();
    
    if (Array.isArray(data)) {
      return { status: "success", data: data };
    }
    
    return { status: "error", message: "Unexpected response format" };

  } catch (error) {
    console.error("Get Orders Error:", error);
    return { status: "error", message: "Could not retrieve orders" };
  }
}