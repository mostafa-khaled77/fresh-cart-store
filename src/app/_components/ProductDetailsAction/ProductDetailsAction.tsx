'use client'
import { addToCart } from "@/app/_actions/cart.actions";
import { AddProductToWishlist } from "@/app/_actions/wishlist.actions";
import { Button } from "@/components/ui/button";
import { CartContext, CartContextType } from "@/context/CartContext";
import { WishListContext, WishListContextType } from "@/context/WishListContext";
import { CartResponse } from "@/interfaces/CartResponse.interface";
import { Loader2 } from "lucide-react"; 
import React, { useContext } from "react";
import { toast } from "sonner";

export default function ProductDetailsAction({ id }: { id: string }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingHeart, setIsLoadingHeart] = React.useState(false);
  
  const { setCartCount } = useContext(CartContext) as CartContextType;
  const { setWishListCount } = useContext(WishListContext) as WishListContextType;

  async function handleAddToCart() {
    setIsLoading(true);
    try {
      const response: CartResponse = await addToCart(id);
      if (response.status === 'success') {
        toast.success("Added to cart successfully! 🛒");
        setCartCount(response.numOfCartItems);
      } else {
        toast.error(response.message || "Failed To Add");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

   async function handleAddToWishList() {
  setIsLoadingHeart(true);
  try {
    const data = await AddProductToWishlist(id);
    if (data.status === 'success') {
      const newCount = data.count || (data.data ? data.data.length : undefined);
      if (newCount !== undefined) {
        setWishListCount(newCount);
      }
      toast.success("Added to your favorites! ❤️", {
        description: "We'll keep it safe for you.",
        style: { background: "#fef2f2", color: "#991b1b", border: "1px solid #fee2e2" }
      });
    } else {
      toast.error(data.message || "Failed To Add");
    }
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setIsLoadingHeart(false);
  }
}
  

  return (
    <div className="flex gap-5 mt-8 items-center w-full">
      <Button
        className="flex-1 bg-black text-white cursor-pointer hover:bg-slate-800 h-12 rounded-xl transition-all"
        variant="default"
        disabled={isLoading}
        onClick={handleAddToCart}
      >
        {isLoading ?<Loader2 className="mr-2 h-4 w-4 animate-spin" />: <i className="fas fa-shopping-cart mr-2 text-xs"></i> }
        Add to Cart
      </Button>

       <Button disabled={isLoadingHeart} onClick={handleAddToWishList} className="flex bg-white cursor-pointer items-center justify-center w-10 h-10 border border-gray-200 rounded-xl text-gray-400 hover:border-red-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300">
            {isLoadingHeart ? <Loader2 size={20} className="animate-spin text-red-500" /> : <i className="fa-regular fa-heart"></i>}
        </Button>
    </div>
  );
}