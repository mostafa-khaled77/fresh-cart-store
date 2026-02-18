"use server";

// 1. Send Reset Code
export async function forgetPassword(userEmail: string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "email": userEmail.trim() }), 
    });
    const data = await res.json();
    console.log(data)
    return data; 
  }



// 2. Verify Code
export async function verifyResetCode(resetCode: string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "resetCode": resetCode }),
    });
    const data = await res.json();
    return data;
}

// 3. Reset Password
export async function resetPassword(userEmail: string, newPass: string) {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "email": userEmail,
        "newPassword": newPass,
      }),
    });
    const data = await res.json();
    return data;
}