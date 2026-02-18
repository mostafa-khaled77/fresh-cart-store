"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserRound, LogOut, User, Heart, ShoppingBag,
  Headset, Package, LogIn, UserPlus, Loader2,
  MapPin
} from "lucide-react";
import { CartContext, CartContextType } from "@/context/CartContext";
import { WishListContext, WishListContextType } from "@/context/WishListContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const { data: session, status } = useSession();

  const { cartCount, isLoading: isCartLoading } = useContext(CartContext) as CartContextType;
  const { wishListCount, isLoading: isWishLoading } = useContext(WishListContext) as WishListContextType;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 md:px-12 ${scrolled ? "bg-white shadow-md py-3" : "bg-slate-100 py-5"
        }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-yellow-400 p-2 rounded-lg transition-all duration-300 group-hover:bg-slate-800">
              <i className="fa-solid fa-cart-shopping text-black group-hover:text-yellow-400"></i>
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tighter">
              FRESH<span className="text-yellow-500">CART</span>
            </span>
          </Link>

          {/* Main Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/50 rounded-full px-2 py-1 border border-slate-200">
            <Link href="/" className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${path === "/" ? "bg-yellow-400 text-black shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
              Home
            </Link>
            <Link href="/products" className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${path === "/products" ? "bg-yellow-400 text-black shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
              Products
            </Link>
            <Link href="/categories" className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${path === "/categories" ? "bg-yellow-400 text-black shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
              Categories
            </Link>
            <Link href="/brands" className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${path === "/brands" ? "bg-yellow-400 text-black shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
              Brands
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {status === "authenticated" && (
              <>
                <Link href="/wishlist" className="relative p-2 text-slate-700 hover:text-red-500 transition-colors">
                  <Heart size={22} strokeWidth={2.5} />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                    {isWishLoading ? (
                      <Loader2 size={10} className="animate-spin" />
                    ) : (
                      wishListCount || 0
                    )}
                  </span>
                </Link>

                <Link href="/cart" className="relative p-2 text-slate-700 hover:text-yellow-600 transition-colors">
                  <ShoppingBag size={22} strokeWidth={2.5} />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                    {isCartLoading ? (
                      <Loader2 size={10} className="animate-spin" />
                    ) : (
                      cartCount || 0
                    )}
                  </span>
                </Link>
                <div className="w-[1px] h-6 bg-slate-200 mx-1 hidden md:block"></div>
              </>
            )}

            {/* Auth Logic Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200 hover:border-yellow-400 hover:bg-yellow-50">
                  <UserRound size={18} className="text-slate-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-2 z-[110]">
                {status === "authenticated" ? (
                  <>
                    <DropdownMenuLabel className="font-bold text-slate-900 p-3">
                      {session?.user?.name || "My Account"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="rounded-xl p-3 cursor-pointer">
                      <Link href="/profile" className="flex items-center w-full"><User className="mr-2 h-4 w-4 text-yellow-500" />Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl p-3 cursor-pointer">
                      <Link href="/allorders" className="flex items-center w-full"><Package className="mr-2 h-4 w-4 text-yellow-500" />My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl p-3 cursor-pointer">
                      <Link href="/addresses" className="flex items-center w-full">
                        <MapPin className="mr-2 h-4 w-4 text-yellow-500" /> My Addresses
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} className="rounded-xl p-3 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" /> Log Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="rounded-xl p-3 cursor-pointer outline-none hover:bg-yellow-400 hover:text-slate-900 group">
                      <Link href="/login" className="flex items-center w-full">
                        <LogIn className="mr-2 h-4 w-4" />
                        <span className="font-semibold">Login</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-xl p-3 cursor-pointer outline-none hover:bg-yellow-400 hover:text-slate-900 group">
                      <Link href="/register" className="flex items-center w-full">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span className="font-semibold">Register</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(true)} className="lg:hidden p-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 active:scale-90 transition-all">
              <i className="fa-solid fa-bars-staggered text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[150] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl flex flex-col">
            <div className="p-6 flex justify-between items-center border-b">
              <span className="text-xl font-black text-slate-800 italic tracking-widest">MENU</span>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <Link href="/" onClick={() => setIsOpen(false)} className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${path === "/" ? "bg-yellow-400 text-black shadow-lg shadow-yellow-100" : "hover:bg-slate-50 text-slate-600"}`}>
                <span>Home</span> <i className="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
              </Link>
              <Link href="/products" onClick={() => setIsOpen(false)} className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${path === "/products" ? "bg-yellow-400 text-black shadow-lg shadow-yellow-100" : "hover:bg-slate-50 text-slate-600"}`}>
                <span>Products</span> <i className="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
              </Link>
              <Link href="/categories" onClick={() => setIsOpen(false)} className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${path === "/categories" ? "bg-yellow-400 text-black shadow-lg shadow-yellow-100" : "hover:bg-slate-50 text-slate-600"}`}>
                <span>Categories</span> <i className="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
              </Link>
              <Link href="/brands" onClick={() => setIsOpen(false)} className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${path === "/brands" ? "bg-yellow-400 text-black shadow-lg shadow-yellow-100" : "hover:bg-slate-50 text-slate-600"}`}>
                <span>Brands</span> <i className="fa-solid fa-chevron-right text-[10px] opacity-40"></i>
              </Link>
            </div>

            <div className="mt-auto p-6 border-t bg-slate-50">
              {status === "authenticated" ? (
                <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center justify-center gap-3 w-full bg-red-500 text-white p-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
                  <LogOut size={18} /> Log Out
                </button>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white p-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all">
                  <i className="fa-solid fa-right-to-bracket"></i> Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mb-24 md:mb-28"></div>
    </>
  );
}