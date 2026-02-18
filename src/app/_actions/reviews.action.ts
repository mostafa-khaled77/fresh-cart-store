"use server"
import { ProductReview, ReviewsResponse } from "@/interfaces/reviews.interface"
import getUserToken from "./getUserToken"
import { revalidatePath } from "next/cache"



// Get All Reviews for a Product
export async function getReviwesForProduct(ProductId: string):Promise<ReviewsResponse> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${ProductId}/reviews`)
    const data = await res.json()
    return data
}





// Add Review
type AddReview = {
    review: string,
    rating: number
}
export async function addReview(ProductId:string , values:AddReview) {
    const token = await getUserToken()
    if(!token) return
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${ProductId}/reviews` , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": token
        },
        body: JSON.stringify({review: values.review, rating: values.rating})
    })
    const data = await res.json();
    if(res.ok){
        revalidatePath(`/products/${ProductId}`)
    }
    return data
}


// Delete Review
export async function deleteReview(reviewId: string, ProductId: string) {
    const token = await getUserToken();
    if (!token) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "token": token }
    });

    const data = res.status !== 204 ? await res.json() : { message : "success", status: "Removed Succesfully" };

    if (res.ok) {
        revalidatePath(`/products/${ProductId}`);
    }

    return data;
}


// Update Review
export async function updateReview(reviewId: string, ProductId: string , values:AddReview) {
    const token = await getUserToken();
    if (!token) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${reviewId}`, {
        method: "PUT",
        headers: { 
        "token": token ,
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({review: values.review, rating: values.rating})
    });

    if (res.ok) {
        revalidatePath(`/products/${ProductId}`);
    }

    return res.json();
}