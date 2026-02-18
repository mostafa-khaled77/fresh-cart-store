import Image from "next/image";
import { HeartOff, Star } from "lucide-react";
import Link from "next/link";
import WishListControl from "../WishListControl/WishListControl"; 
import { WishlistResponse } from "@/interfaces/wishlist.interface";
import { Product } from "@/interfaces/product.interface";

export default function WishlistContent({ wishListData }: { wishListData: WishlistResponse | null }) {
  if (!wishListData || wishListData.count === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center animate-in fade-in duration-500">
        <div className="bg-amber-50 p-8 rounded-full"><HeartOff size={40} className="text-amber-200" /></div>
        <div className="space-y-1">
          <h2 className="text-lg font-black text-slate-800 uppercase">Empty Wishlist</h2>
          <Link href="/products" className="inline-block mt-4 px-8 py-3 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest">Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {wishListData?.data?.map((product: Product) => (
          <div key={product._id} className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-square bg-slate-50">
              <Image src={product.imageCover} alt={product.title} fill className="object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-slate-800 line-clamp-1 text-xs">{product.title}</h3>
                <div className="flex items-center gap-1 text-yellow-500 font-bold text-[9px]">
                  <Star size={10} fill="currentColor" /> {product.ratingsAverage}
                </div>
              </div>
              <p className="text-[9px] text-slate-400 mb-3 font-bold uppercase">{product.category.name}</p>
              <div className="flex items-center justify-between gap-2">
                <span className="text-base font-black text-slate-900 tracking-tighter">{product.price} EGP</span>
                <WishListControl productId={product._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}