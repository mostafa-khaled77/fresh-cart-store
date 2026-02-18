"use client"
import React, { useState } from 'react'
import { ProductReview } from '@/interfaces/reviews.interface'
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addReview } from '@/app/_actions/reviews.action';
import { getUserIdFromToken } from '../../../../utils/auth';
import ReviewActions from '../ReviewActions/ReviewActions';

export default function ReviewsCard({ reviews, ProductId, token }: { reviews: ProductReview[], ProductId: string, token: string }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");
    const [newReview, setNewReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const userIdFromToken = getUserIdFromToken(token);

    async function handleAddReview() {
        setIsLoading(true)
        const res = await addReview(ProductId, { review, rating });
        if (res?.data?._id!) {
            console.log(res);
            toast.success("Review added successfully");
            setReview("");
            setRating(0);
        } else {
            toast.error(res?.errors?.msg);
        }
        setIsLoading(false)
    }
    return (
        <div className="mt-12 max-w-5xl mx-auto px-4">

            <div className="mb-12 bg-slate-50/50 p-4 rounded-[2.5rem] border border-slate-100 shadow-sm backdrop-blur-sm">
                <div className="space-y-1">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                            Share Your Experience
                        </h3>
                        <div className="flex items-center gap-1 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="transition-transform active:scale-90"
                                >
                                    <Star
                                        className={`w-5 h-5 ${star <= (hover || rating)
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-slate-200"
                                            } transition-colors duration-200`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your thoughts here..."
                            className="min-h-[120px] rounded-[1.5rem] border-none bg-white p-6 shadow-inner focus-visible:ring-indigo-100 text-base resize-none placeholder:text-slate-400"
                        />

                        <div className="flex justify-end">
                            <Button
                                disabled={isLoading || !review || !rating}
                                onClick={() => handleAddReview()}
                                className="h-12 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5"
                            >
                                Submit Review
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                    <div
                        key={review._id}
                        className="relative p-6 rounded-[2rem] bg-white border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] hover:border-indigo-100 transition-all duration-300"
                    >
                        <div className="flex flex-col h-full relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white font-black text-base shadow-md">
                                        {review.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 leading-none mb-1">
                                            {review.user.name}
                                        </h4>
                                        <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-0.5 rounded-md w-fit">
                                            <span className="text-[10px] font-black text-amber-600">{review.rating}</span>
                                            <i className="fa-solid fa-star text-[8px] text-amber-400"></i>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                    {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6 flex-1">
                                {review.review}
                            </p>

                            {review.user._id === userIdFromToken && (
                                <ReviewActions
                                    reviewId={review._id}
                                    ProductId={ProductId}
                                    initialReview={review.review}
                                    initialRating={review.rating}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}