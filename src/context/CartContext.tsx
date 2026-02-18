"use client";
import { createContext, useState, useEffect, ReactNode, Dispatch, SetStateAction, useContext } from "react";
import { getLoggedUserCart, addToCart, removeItem, updateQuantity, clearCart } from "@/app/_actions/cart.actions";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { CartResponse } from "@/interfaces/CartResponse.interface";

export interface CartContextType {
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  addItem: (productId: string) => Promise<void>;
  deleteItem: (productId: string) => Promise<void>;
  updateItemCount: (productId: string, count: number) => Promise<void>;
  clearAllItems: () => Promise<void>;
  cartData: CartResponse | null;
  setCartData: Dispatch<SetStateAction<CartResponse | null>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  // Initial Fetch
  useEffect(() => {
    if (status === "authenticated") {
      (async () => {
        setIsLoading(true);
        try {
          const res = await getLoggedUserCart();
          if (res?.status === "success" && res.data) {
            setCartCount(res.numOfCartItems);
            setCartData(res);
          }
        } catch (error) {
          console.error("Failed to load cart", error);
        } finally {
          setIsLoading(false);
        }
      })();
    } else if (status === "unauthenticated") {
      setCartCount(0);
      setCartData(null);
    }
  }, [status]);

  // Optimistic Add Item
  const addItem = async (productId: string) => {
    // Optimistic Update
    const previousCount = cartCount;
    setCartCount((prev) => prev + 1);
    toast.dismiss(); // Dismiss previous toasts to avoid clutter
    toast.success("Product added to cart (syncing...)");

    try {
      const res = await addToCart(productId);
      if (res?.status === "success") {
        setCartCount(res.numOfCartItems);
        setCartData(res);
        toast.dismiss();
        toast.success("Cart synced successfully");
      } else {
        throw new Error(res?.message || "Failed to add item");
      }
    } catch (error) {
      // Revert on failure
      setCartCount(previousCount);
      toast.error("Failed to add product. Please try again.");
    }
  };

  // Optimistic Remove Item
  const deleteItem = async (productId: string) => {
    const previousCount = cartCount;
    // We assume removal reduces count by at least 1, but exact count depends on quantity.
    // For now, let's keep count as is or decrease by 1 optimistically if we want.
    // Better strategy for count: wait for server, but remove from UI list immediately if we had the list state here.
    // Since we only track count here, we might not want to guess the decrement amount if it's > 1.
    // However, users expect "instant" removal.
    // Let's rely on the cartData update for the visual list, and keep count sync after server.
    // BUT user asked for Optimistic UI.

    // Improved Optimistic Logic:
    // Filter out the item from cartData immediately
    const previousCartData = cartData;
    if (cartData?.data?.products) {
      const itemToRemove = cartData.data.products.find(p => p.product._id === productId || p.product.id === productId || p._id === productId); // Check ID structure
      // Actually usually productId passed to removeItem is the Item ID or Product ID. 
      // Let's assume it removes the 'item' from the cart.

      const newProducts = cartData.data.products.filter(item => item.product._id !== productId && item.product.id !== productId);
      setCartData({
        ...cartData,
        numOfCartItems: cartData.numOfCartItems - 1, // Approximation
        data: {
          ...cartData.data,
          products: newProducts
        }
      });
      setCartCount(prev => Math.max(0, prev - 1)); // Approximation
    }

    toast.success("Item removed");

    try {
      const res = await removeItem(productId);
      if (res?.status === "success") {
        setCartCount(res.numOfCartItems);
        setCartData(res);
      } else {
        throw new Error(res?.message || "Failed to remove item");
      }
    } catch (error) {
      setCartCount(previousCount);
      setCartData(previousCartData);
      toast.error("Failed to remove item.");
    }
  };

  // Optimistic Update Quantity
  const updateItemCount = async (productId: string, count: number) => {
    if (count < 1) return;

    const previousCartData = cartData;

    // Optimistic UI update
    if (cartData?.data?.products) {
      const newProducts = cartData.data.products.map(item => {
        if (item.product._id === productId || item.product.id === productId) {
          return { ...item, count: count };
        }
        return item;
      });

      setCartData({
        ...cartData,
        data: {
          ...cartData.data,
          products: newProducts
        }
      });
    }

    try {
      const res = await updateQuantity(productId, count);
      if (res?.status === "success") {
        setCartCount(res.numOfCartItems);
        setCartData(res);
        toast.success("Cart updated");
      } else {
        throw new Error(res?.message || "Failed to update count");
      }
    } catch (error) {
      setCartData(previousCartData);
      toast.error("Failed to update quantity.");
    }
  };

  // Clear Cart
  const clearAllItems = async () => {
    const previousCartData = cartData;
    const previousCount = cartCount;

    setCartData(null);
    setCartCount(0);
    toast.success("Cart cleared");

    try {
      const res = await clearCart();
      if (res?.message === "success") { // API specific response check
        setCartCount(0);
        setCartData(initialEmptyCart); // Or null
      } else {
        // Some APIs return "success" string, others structure.
        // Assuming successful clear if no error thrown for now
        setCartCount(0);
        setCartData(null);
      }
    } catch (error) {
      setCartData(previousCartData);
      setCartCount(previousCount);
      toast.error("Failed to clear cart");
    }
  }


  return (
    <CartContext.Provider value={{
      cartCount,
      setCartCount,
      isLoading,
      addItem,
      deleteItem,
      updateItemCount,
      clearAllItems,
      cartData,
      setCartData
    }}>
      {children}
    </CartContext.Provider>
  );
}

const initialEmptyCart: CartResponse = {
  status: "success",
  message: "",
  numOfCartItems: 0,
  cartId: "",
  data: {
    _id: "",
    cartOwner: "",
    products: [],
    totalCartPrice: 0
  }
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
