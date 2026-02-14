import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, HeartOff, Star } from "lucide-react";
import { getLoggedUserWishlist } from "../_actions/wishlist.actions";
import WishListControl from "../_components/WishListControl/WishListControl";
import { WishlistResponse } from "@/interfaces/wishlist.interface";
import { Product } from "@/interfaces/product.interface";

export default async function WishList() {
  const wishListData: WishlistResponse | null = await getLoggedUserWishlist();

  if (!wishListData || wishListData.count === 0) {
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
              You have <span className="text-red-500 font-bold">{wishListData.count} items</span> saved for later
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishListData.data.map((product: Product) => (
            <div 
              key={product._id} 
              className="group relative bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 line-clamp-1 flex-1">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg text-xs font-bold">
                    <Star size={12} fill="currentColor" />
                    <span>{product.ratingsAverage}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-400 mb-4">{product.category.name}</p>

                <div className="flex items-center justify-between mt-auto gap-3">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">
                    {product.price} <small className="text-xs font-medium uppercase">EGP</small>
                  </span>

                  <div className="flex items-center gap-2">
                    <WishListControl productId={product._id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}