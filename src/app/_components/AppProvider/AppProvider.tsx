"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "../Navbar/Navbar";
import { CartProvider } from "@/context/CartContext";
import { WishListProvider } from "@/context/WishListContext";
import Footer from "../Footer/Footer";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <SessionProvider>
        <WishListProvider>
          <CartProvider>
            <Toaster position="bottom-center" richColors />
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </WishListProvider>
      </SessionProvider>
    </>
  );
}
