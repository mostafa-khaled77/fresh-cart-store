"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, MapPin, Phone, FileText, CreditCard, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CartResponse } from "@/interfaces/CartResponse.interface";
import { getLoggedUserCart } from "@/app/_actions/cart.actions";
import { createVisaOrder } from "@/app/_actions/checkout.actions";
import { CheckoutFormValues, checkoutSchema } from "@/schema/checkoutSchema";
import { Address } from "@/app/addresses/page";
import { Checkbox } from "@/components/ui/checkbox";
import { addAddress } from "@/app/_actions/address.actions";

export default function CheckoutVisaForm({ initialData, cartId, savedAddresses }: { initialData: CartResponse | null; cartId?: string; savedAddresses: Address[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartData, setCartData] = useState<CartResponse | null>(initialData);
  const [isLoadingCart, setIsLoadingCart] = useState(!initialData);
  const [saveAddress, setSaveAddress] = useState(false);

  const router = useRouter();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });




  useEffect(() => {
    async function fetchCart() {
      if (initialData && cartData) {
        setIsLoadingCart(false);
        return;
      }
      try {
        const res = await getLoggedUserCart();
        if (res?.status === "success" && res.data) {
          setCartData(res);
        } else {
          toast.error("Your cart is empty.");
          router.push("/cart");
        }
      } catch (err) {
        toast.error("Failed to load cart.");
      } finally {
        setIsLoadingCart(false);
      }
    }
    fetchCart();
  }, [router, initialData, cartData]);

 const onSubmit = async (data: CheckoutFormValues) => {
    const finalCartId = cartId || cartData?.data?._id || cartData?.cartId;
    if (!finalCartId) {
      toast.error("Invalid Cart ID. Please refresh.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (saveAddress) {
        try {
          await addAddress({
            name: data.city,
            details: data.details,
            phone: data.phone,
            city: data.city
          });
        } catch (addrErr) {
          console.error("Failed to save address:", addrErr);
        }
      }

      const res = await createVisaOrder(finalCartId, data);
      if (res.status === "success") {
        toast.success("Redirecting to Secure Payment...");
        window.location.href = res.session.url;
      } else {
        toast.error(res.message || "Payment failed to start.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoadingCart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={48} className="animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/cart" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors text-slate-600 border border-gray-100">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
            Visa Checkout
            <CreditCard className="text-blue-600" size={28} />
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-slate-900 p-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Shipping Address</h2>
              </div>
              {savedAddresses.length > 0 && (
                <div className="px-8 py-6 bg-slate-50/50 border-b border-gray-100">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-[0.2em] ml-1">
                    Choose Saved Address
                  </p>
                  <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                    {savedAddresses.map((addr: Address) => (
                      <div
                        key={addr._id}
                        onClick={() => {
                          setValue("details", addr.details);
                          setValue("phone", addr.phone);
                          setValue("city", addr.city);
                          toast.success(`Shipping to: ${addr.name}`);
                        }}
                        className="flex-shrink-0 w-64 cursor-pointer group relative bg-white border-2 border-slate-100 rounded-2xl p-4 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300 active:scale-95"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-slate-900 text-yellow-400 p-2 rounded-lg group-hover:bg-yellow-400 group-hover:text-slate-900 transition-colors">
                            <MapPin size={14} />
                          </div>
                          <span className="font-black text-slate-800 uppercase text-[11px] tracking-tight truncate">
                            {addr.name}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-slate-500 text-[10px] font-bold truncate flex items-center gap-1">
                            {addr.city}
                          </p>
                          <p className="text-slate-400 text-[10px] truncate leading-tight italic">
                            {addr.details}
                          </p>
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-8">
                <form id="visa-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 ml-1">
                      <FileText size={14} /> Details
                    </label>
                    <textarea
                      {...register("details")}
                      placeholder="Street address, building, floor..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-600 focus:bg-white outline-none font-medium text-sm transition-all resize-none h-24"
                    />
                    {errors.details && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.details.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 ml-1">
                        <Phone size={14} /> Phone Number
                      </label>
                      <input {...register("phone")} type="tel" placeholder="01xxxxxxxxx" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-600 focus:bg-white outline-none font-medium text-sm transition-all" />
                      {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 ml-1">
                        <MapPin size={14} /> City
                      </label>
                      <input {...register("city")} type="text" placeholder="Cairo..." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-600 focus:bg-white outline-none font-medium text-sm transition-all" />
                      {errors.city && <p className="text-red-500 text-[10px] font-bold ml-1">{errors.city.message}</p>}
                    </div>
                  </div>
                   <div className="flex items-center space-x-3 space-y-0 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 mt-6">
                    <Checkbox
                      id="saveAddress"
                      checked={saveAddress}
                      onCheckedChange={(checked) => setSaveAddress(checked as boolean)}
                      className="border-slate-300 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 data-[state=checked]:text-slate-900"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="saveAddress"
                        className="text-sm font-bold text-slate-700 cursor-pointer select-none"
                      >
                        Save this address for future use
                      </label>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Your shipping details will be saved to your profile for faster checkout next time.
                      </p>
                    </div>
                  </div>

                

                </form>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 sticky top-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-slate-50 p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="text-blue-600" /> Order Summary
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 mb-6 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartData?.data?.products?.map((item) => (
                    <div key={item._id} className="flex gap-4 items-center">
                      <div className="relative w-12 h-12 bg-gray-50 rounded-lg flex-shrink-0 border border-gray-100">
                        <Image src={item.product.imageCover} alt={item.product.title} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 truncate">{item.product.title}</h4>
                        <p className="text-xs text-slate-500">{item.count} x {item.price} EGP</p>
                      </div>
                      <div className="font-bold text-sm text-slate-900">{item.count * item.price}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-slate-500 text-sm font-medium">
                    <span>Subtotal</span>
                    <span>{cartData?.data?.totalCartPrice} EGP</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm font-medium">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                  </div>
                  <div className="flex justify-between text-slate-900 text-lg font-black pt-2">
                    <span>Total</span>
                    <span>{cartData?.data?.totalCartPrice} EGP</span>
                  </div>
                </div>

                <button
                  type="submit" form="visa-form" disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-black py-4 rounded-xl mt-8 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200 disabled:opacity-70 uppercase text-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : `Pay ${cartData?.data?.totalCartPrice} EGP Now`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}