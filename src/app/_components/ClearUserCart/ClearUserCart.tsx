"use client"
import React, { useContext } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { clearCart } from "@/app/_actions/cart.actions";
import { toast } from "sonner";
import { CartContext, CartContextType } from "@/context/CartContext";

export default function ClearUserCart({cartId}:{cartId:string}) {
    const { setCartCount } = useContext(CartContext) as CartContextType;
    const [isLoading, setIsLoading] = React.useState(false);

   async function handleClear() {
    try {
        setIsLoading(true);
        let res = await clearCart();
        if (res.status === "success" || res.message === "success") {
            toast.success("Cart cleared successfully!");
            setCartCount(0); 
        }
    } catch (error) {
        toast.error('Something Went Wrong');
    } finally {
        setIsLoading(false);
    }
}
    return (
      <button onClick={handleClear} disabled={isLoading} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300">
        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        Clear Cart
      </button>
    );
}