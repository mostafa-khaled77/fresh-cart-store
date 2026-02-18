
"use server";
import { cookies } from "next/headers";
import getUserToken from "./getUserToken";


export async function updateUserData(formData: { name: string, email: string, phone: string }) {
  const token = await getUserToken();
    if (!token) return { status: "fail", message: "Unauthorized" };
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/updateMe/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token": token || "",
    },
    body: JSON.stringify(formData),
  });
  return await res.json();
}

export async function updatePassword(passwords: any) {
  const token = await getUserToken();
  if (!token) return { status: "fail", message: "Unauthorized" };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token": token,
    },
    body: JSON.stringify(passwords),
  });
  return await res.json();
}