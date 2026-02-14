"use client"
import { removeItem, updateQuantity } from "@/app/_actions/cart.actions";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, Loader2 } from "lucide-react";
import { CartContext, CartContextType } from "@/context/CartContext";

export default function CartControl({ productId, count }: { productId: string, count: number }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    
    const { setCartCount } = useContext(CartContext) as CartContextType;
    
    async function handleUpdate(type: 'plus' | 'minus') {
    setIsUpdating(true);
    try {
        const newCount = type === 'plus' ? count + 1 : count - 1;
        const res = await updateQuantity(productId, newCount);
        if (res.status === "success") {
            toast.success("Updated!");
            setCartCount(res.numOfCartItems); 
        } else {
            toast.error("Update failed");
        }
    } catch (error) {
            toast.error("Network Error");
        } finally {
            setIsUpdating(false);
        }
    }

    const handleRemove = async () => {
        setIsRemoving(true);
        try {
            const res = await removeItem(productId);
            if (res.status === "success") {
                toast.success("Item removed");
                setCartCount(res.numOfCartItems); 
            } else {
                toast.error("Remove failed");
            }
        } catch (error) {
            toast.error("Network Error");
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center p-1 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
                <motion.button 
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleUpdate('minus')}
                    disabled={isUpdating || isRemoving || count <= 1}
                    className="w-9 h-9 flex items-center justify-center bg-white text-slate-600 rounded-xl shadow-sm hover:text-red-500 disabled:opacity-30 transition-all"
                >
                    <Minus size={16} strokeWidth={3} />
                </motion.button>
                
                <div className="relative overflow-hidden px-4 min-w-[45px] flex justify-center">
                    <AnimatePresence mode="wait">
                        {isUpdating ? (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Loader2 size={16} className="animate-spin text-blue-500" />
                            </motion.div>
                        ) : (
                            <motion.span 
                                key="count"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-lg font-black text-slate-800"
                            >
                                {count}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
                
                <motion.button 
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleUpdate('plus')}
                    disabled={isUpdating || isRemoving}
                    className="w-9 h-9 flex items-center justify-center bg-white text-slate-600 rounded-xl shadow-sm hover:text-green-600 transition-all"
                >
                    <Plus size={16} strokeWidth={3} />
                </motion.button>
            </div>

            <motion.button 
                whileHover="hover"
                onClick={handleRemove}
                disabled={isUpdating || isRemoving}
                className="group relative flex items-center gap-2 text-red-500 font-bold bg-red-50/50 hover:bg-red-500 hover:text-white px-5 py-2.5 rounded-2xl transition-all duration-300 min-w-[120px] justify-center"
            >
                <AnimatePresence mode="wait">
                    {isRemoving ? (
                        <motion.div
                            key="removing-loader"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <Loader2 size={18} className="animate-spin" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="trash-icon"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            variants={{
                                hover: { 
                                    rotate: [0, -10, 10, -10, 10, 0],
                                    transition: { duration: 0.4, repeat: Infinity }
                                }
                            }}
                        >
                            <Trash2 size={18} />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <span className="text-sm">
                    {isRemoving ? "Removing..." : "Remove"}
                </span>
            </motion.button>
        </div>
    );
}