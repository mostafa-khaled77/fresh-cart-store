'use client'

import React, { useContext, useState } from "react";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation"; 
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { removeProductFromWishlist } from "@/app/_actions/wishlist.actions";
import { addToCart } from "@/app/_actions/cart.actions";
import { CartContext, CartContextType } from "@/context/CartContext";
import { WishListContext, WishListContextType } from "@/context/WishListContext";

export default function WishListControl({ productId }: { productId: string }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter(); 
  const {setCartCount} = useContext(CartContext) as CartContextType;
  const { setWishListCount } = useContext(WishListContext) as WishListContextType;

 const handleRemove = async () => {
    setIsRemoving(true);
    const res = await removeProductFromWishlist(productId);
    if (res.status === "success") {
      toast.success("Removed from wishlist");
      if (res.data) {
        setWishListCount(res.data.length);
      }
      router.refresh();
    } else {
      toast.error("Failed to remove");
    }
    setIsRemoving(false);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    const res = await addToCart(productId);
    if (res.status === "success") {
      setCartCount(res.numOfCartItems)
      toast.success("Added to cart! 🛒");
      router.refresh(); 
    }
    setIsAdding(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        onClick={handleRemove}
        disabled={isRemoving}
        className="group/trash h-11 w-11 p-0 rounded-2xl border border-slate-100 bg-slate-100 text-red-400 hover:bg-red-50 hover:border-red-100 hover:text-red-500 transition-all duration-300 shadow-sm"
      >
        {isRemoving ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} className="group-hover/trash:animate-bounce" />}
      </Button>

      <Button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="h-11 w-11 p-0 bg-slate-900 text-white rounded-2xl hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-lg shadow-slate-200 active:scale-90"
      >
        {isAdding ? <Loader2 size={20} className="animate-spin" /> : <ShoppingCart size={20} />}
      </Button>
    </div>
  );
}