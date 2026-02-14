import Image from "next/image";
import { getLoggedUserCart } from "../_actions/cart.actions";
import CartControl from "../_components/CartControl/CartControl";
import { ShoppingBag, ShoppingCart, ArrowRight } from "lucide-react";
import ClearUserCart from "../_components/ClearUserCart/ClearUserCart";
import { CartProduct, CartResponse } from "@/interfaces/CartResponse.interface";

export default async function CartPage() {
    const cartData: CartResponse = await getLoggedUserCart();
    console.log(cartData)

    if (!cartData || cartData.numOfCartItems === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="bg-gray-100 p-8 rounded-full">
                   <ShoppingCart size={64} className="text-gray-300" />
                </div>
                <h1 className="text-3xl font-bold text-slate-800"> Your Shopping Cart Is Empty 🛒</h1>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                        <ShoppingBag className="text-yellow-400" size={32} />
                        Shopping Cart
                    </h1>
                    <ClearUserCart cartId={cartData.cartId}/>
                </div>
                

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    <div className="lg:col-span-2 space-y-4">
                        {cartData?.data?.products?.map((item: CartProduct) => (
                            <div key={item._id} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-shadow">
                                
                                
                                <div className="relative w-32 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image 
                                        src={item.product.imageCover} 
                                        alt={item.product.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-contain p-2 hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                
                                <div className="flex-1 w-full text-center md:text-left">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{item.product.title}</h3>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                                        <span className="text-sm text-gray-400">Price per unit:</span>
                                        <span className="font-bold text-slate-900">{item.price} EGP</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                                        <CartControl productId={item.product.id} count={item.count} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1 sticky top-24">
                        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-10"></div>
                            
                            <h2 className="text-2xl font-bold mb-8 border-b border-slate-700 pb-4">Order Summary</h2>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between text-slate-400 font-medium">
                                    <span>Total Items</span>
                                    <span className="text-white">{cartData.numOfCartItems}</span>
                                </div>
                                <div className="flex justify-between text-slate-400 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-green-400 uppercase text-sm font-bold">Free</span>
                                </div>
                                <div className="flex justify-between text-slate-400 font-medium pb-4">
                                    <span>Taxes</span>
                                    <span className="text-white">0.00 EGP</span>
                                </div>
                                
                                <div className="border-t border-slate-700 pt-6 mt-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-bold">Total Price</span>
                                        <div className="text-right">
                                            <p className="text-3xl font-black text-yellow-400">{cartData?.data?.totalCartPrice}</p>
                                            <p className="text-xs text-slate-400 italic">EGP Inclusive of VAT</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full bg-yellow-400 text-slate-900 font-black py-4 rounded-xl mt-8 hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 group uppercase tracking-tight">
                                Checkout Now
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}