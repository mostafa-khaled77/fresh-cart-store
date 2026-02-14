'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image'; 
import { Product } from '@/interfaces/product.interface';
import { addToCart } from '@/app/_actions/cart.actions';
import { toast } from 'sonner';
import { CartResponse } from '@/interfaces/CartResponse.interface';
import React, { useContext } from "react";
import { CartContext, CartContextType } from "@/context/CartContext";
import { AddProductToWishlist } from "@/app/_actions/wishlist.actions";
import { Loader2, ShoppingCart, Heart, Check } from "lucide-react"; 
import { WishListContext, WishListContextType } from "@/context/WishListContext";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  product: Product;
  id?: string;
}

export default function ProductCard({ product , id }: ProductCardProps) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [isLoadingHeart, setIsLoadingHeart] = React.useState(false);
  const {setCartCount} = useContext(CartContext) as CartContextType;
  const {setWishListCount} = useContext(WishListContext) as WishListContextType;
 const productId = id || product._id;
  async function handleAddToCart(){
    setStatus("loading");
    const response: CartResponse = await addToCart(productId);
    if(response.status === 'success'){ 
      setCartCount(response.numOfCartItems);
      setStatus("success");
      toast.success("Added to cart! 🛒");
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      setStatus("idle");
      toast.error(response.message || "Failed To Add");
    }
  }

  async function handleAddToWishList(){
    setIsLoadingHeart(true);
    const data = await AddProductToWishlist(productId);
    if(data.status === 'success'){ 
      setWishListCount(data.data.length);
      toast.success("Added to favorites! ❤️", {
        style: { background: "#fef2f2", color: "#991b1b", border: "1px solid #fee2e2" }
      });
    } else {
      toast.error(data.message || "Failed To Add");
    }
    setIsLoadingHeart(false);
  }

  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className='group py-3 hover:shadow-2xl transition-all duration-500 border-none shadow-md overflow-hidden flex flex-col h-full bg-white'>
        
        <Link href={`/products/${product.id}`} className="flex-grow">
          <CardHeader className="p-0 overflow-hidden">
              <div className="relative h-60 w-full group-hover:scale-110 transition-transform duration-700 ease-in-out">
                <Image 
                  src={product.imageCover} 
                  alt={product.title} 
                  fill 
                  className="object-contain p-4" 
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
              </div>
              <div className="px-4 mt-3">
                <CardDescription className="text-green-600 font-bold text-[10px] uppercase tracking-widest">
                  {product.category.name}
                </CardDescription>
              </div>
          </CardHeader>
          
          <CardContent className="px-4 py-2">
            <CardTitle className="text-sm line-clamp-2 font-bold text-gray-800 h-10 group-hover:text-yellow-600 transition-colors">
              {product.title}
            </CardTitle>
          </CardContent>

          <CardFooter className="px-4 pb-4">
            <div className="flex justify-between items-center w-full">
              <span className="font-black text-xl text-slate-900">{product.price} <small className="text-[10px] text-slate-500">EGP</small></span>
              <span className="flex gap-1 items-center bg-yellow-50 px-2.5 py-1 rounded-full border border-yellow-100">
                <i className="fa-solid fa-star text-yellow-500 text-[10px]"></i>
                <p className='text-[11px] font-black text-yellow-700'>{product.ratingsAverage}</p>
              </span>
            </div>
          </CardFooter>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 px-4 pb-2 mt-auto">
          <Button 
            disabled={status !== "idle"} 
            onClick={handleAddToCart} 
            className={`relative flex-1 font-bold h-11 rounded-xl transition-all duration-500 overflow-hidden ${
              status === "success" ? "bg-green-500 hover:bg-green-600" : "bg-slate-900 hover:bg-yellow-400 hover:text-black"
            }`}
          >
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.div key="idle" initial={{ y: 10 }} animate={{ y: 0 }} exit={{ y: -10 }} className="flex items-center">
                  <ShoppingCart size={16} className="mr-2" /> Add to Cart
                </motion.div>
              )}
              {status === "loading" && (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
                  <Loader2 size={18} className="animate-spin" />
                </motion.div>
              )}
              {status === "success" && (
                <motion.div key="success" initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex items-center">
                  <Check size={18} className="mr-2" /> Done!
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <Button 
            disabled={isLoadingHeart} 
            onClick={handleAddToWishList} 
            className={`flex items-center justify-center w-11 h-11 border rounded-xl transition-all duration-300 ${
              isLoadingHeart ? "bg-slate-50" : "bg-white hover:border-red-500 hover:bg-red-50 text-gray-400 hover:text-red-500 shadow-sm"
            }`}
          >
            {isLoadingHeart ? (
              <Loader2 size={18} className="animate-spin text-red-500" />
            ) : (
              <motion.div whileTap={{ scale: 1.4 }}>
                <Heart size={18} />
              </motion.div>
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}