"use client"
import { deleteReview, updateReview } from "@/app/_actions/reviews.action"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"

export default function ReviewActions({ reviewId, ProductId, initialReview, initialRating }: { reviewId: string, ProductId: string, initialReview: string, initialRating: number }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialReview);
    const [rating, setRating] = useState(initialRating);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const handleUpdate = async () => {
        setIsLoadingUpdate(true);
        const res = await updateReview(reviewId, ProductId, { review: text, rating: rating });
        console.log(res);
        if (res?.data?._id) {
            toast.success("Updated!");
            setIsEditing(false);
        }
        setIsLoadingUpdate(false);
    }

    const handleDelete = async () => {
        setIsLoadingDelete(true);
        const res = await deleteReview(reviewId, ProductId);
        if (res.message === "success") {
            toast.success("Review deleted successfully");
        } else {
            toast.error('please try again');
        }
        setIsLoadingDelete(false);
    }
    return (

        <>
            <div className="w-full">
                {isEditing ? (
                    <div className="space-y-3 p-3 bg-slate-50 rounded-xl">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                    key={s}
                                    onClick={() => setRating(s)}
                                    className={`w-4 h-4 cursor-pointer ${s <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                                />
                            ))}
                        </div>
                        <Textarea value={text} onChange={(e) => setText(e.target.value)} />
                        <div className="flex justify-end gap-2">
                            <Button onClick={() => setIsEditing(false)} className="cursor-pointer flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-slate-400 bg-red-500 hover:bg-red-600 text-black rounded-xl transition-all">Cancel</Button>
                            <Button onClick={handleUpdate} className="cursor-pointer flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-slate-400 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl transition-all" disabled={isLoadingUpdate}>Save</Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-50">
                        <Button onClick={() => setIsEditing(true)} className="bg-yellow-400 text-black">
                            Edit
                        </Button>
                        <Button onClick={handleDelete} disabled={isLoadingDelete} className="bg-red-500 text-white">
                            {isLoadingDelete && <Loader2 className="animate-spin" />}  Delete
                        </Button>
                    </div>
                )}
            </div>
        </>

    )
}