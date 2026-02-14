"use client";
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { getLoggedUserCart } from "@/app/_actions/cart.actions";
import { useSession } from "next-auth/react"; // ضيف دي

export interface CartContextType {
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const { status } = useSession();

  async function updateInitialCount() {
    if (status !== "authenticated") return; 

    try {
      const res = await getLoggedUserCart();
      if (res && res.status === "success") {
        setCartCount(res.numOfCartItems);
      }
    } catch (error) {
      console.error("Failed to fetch initial cart count", error);
    }
  }

  useEffect(() => {
    updateInitialCount();
  }, [status]); 

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}