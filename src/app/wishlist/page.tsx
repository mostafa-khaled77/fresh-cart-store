import React from "react";
import Link from "next/link";
import { Heart, HeartOff } from "lucide-react";
import { getLoggedUserWishlist } from "../_actions/wishlist.actions";
import { WishlistResponse } from "@/interfaces/wishlist.interface";
import WishlistContent from "../_components/WishlistContent/WishlistContent";

export const dynamic = "force-dynamic";

export default async function WishList() {
  const wishListData: WishlistResponse | null = await getLoggedUserWishlist();

  const hasItems = wishListData && wishListData.data && wishListData.data.length > 0;

  if (!hasItems) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="bg-red-50 p-10 rounded-full">
            <HeartOff size={80} className="text-red-200" strokeWidth={1.5} />
          </div>
          <Heart 
            size={24} 
            className="text-red-400 absolute -top-2 -right-2 animate-bounce" 
            fill="currentColor" 
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-800">Your Wishlist is Empty!</h1>
          <p className="text-slate-500 max-w-[300px] mx-auto font-medium">
            Looks like you haven't found your favorites yet. Start exploring and save what you love!
          </p>
        </div>

        <Link
          href="/products"
          className="mt-4 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Wishlist</h1>
            <p className="text-slate-500 mt-2 font-medium">
              You have <span className="text-red-500 font-bold">{wishListData.count || wishListData.data.length} items</span> saved for later
            </p>
          </div>
        </div>

        <WishlistContent wishListData={wishListData} />
      </div>
    </div>
  );
}