"use server";
import { revalidatePath } from "next/cache";
import getUserToken from "./getUserToken";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

// Get Logged User Addresses
export async function getLoggedUserAddresses() {
  const token = await getUserToken();
  if (!token) return { status: "fail", message: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/addresses`, {
      method: "GET",
      headers: {
        token: token,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return { status: "error", message: "Failed to fetch addresses" };
  }
}

// Add Address
export async function addAddress(addressDetails: { name: string; details: string; phone: string; city: string }) {
  const token = await getUserToken();
  if (!token) return { status: "fail", message: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(addressDetails),
    });

    const data = await res.json();
    if (data.status === "success") {
      revalidatePath("/profile"); 
      return data;
    }
    return { status: "error", message: data.message || "Failed to add address" };
  } catch (error) {
    return { status: "error", message: "Network error" };
  }
}

// Remove Address
export async function removeAddress(addressId: string) {
  const token = await getUserToken();
  if (!token) return { status: "fail", message: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        token: token,
      },
    });

    const data = await res.json();
    if (data.status === "success") {
      revalidatePath("/profile");
      return data;
    }
    return { status: "error", message: data.message || "Failed to remove address" };
  } catch (error) {
    return { status: "error", message: "Network error" };
  }
}
