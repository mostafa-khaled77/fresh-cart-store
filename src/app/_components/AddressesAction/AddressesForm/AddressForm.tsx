"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addAddress } from "@/app/_actions/address.actions";
import { MapPin, Phone, Building2, Home, Loader2, Save } from "lucide-react";

export default function AddressForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const addressData = {
      name: formData.get("name") as string,
      details: formData.get("details") as string,
      phone: formData.get("phone") as string,
      city: formData.get("city") as string,
    };

    setIsSubmitting(true);
    try {
      const res = await addAddress(addressData);
      if (res.status === "success") {
        toast.success("Address added successfully! 🎉");
        router.push("/addresses");
        router.refresh(); 
      } else {
        toast.error(res.message || "Failed to add address");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase text-slate-500 flex items-center gap-2">
            <Home size={14} /> Address Label
          </label>
          <input required name="name" type="text" placeholder="e.g. Home, Office" 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-yellow-400 focus:bg-white outline-none font-medium transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase text-slate-500 flex items-center gap-2">
            <Building2 size={14} /> City
          </label>
          <input required name="city" type="text" placeholder="Cairo" 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-yellow-400 focus:bg-white outline-none font-medium transition-all" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase text-slate-500 flex items-center gap-2">
          <Phone size={14} /> Phone Number
        </label>
        <input required name="phone" type="tel" placeholder="01xxxxxxxxx" 
          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-yellow-400 focus:bg-white outline-none font-medium transition-all" />
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase text-slate-500 flex items-center gap-2">
          <MapPin size={14} /> Detailed Address
        </label>
        <textarea required name="details" placeholder="Street name, Building number, Apartment..." 
          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:border-yellow-400 focus:bg-white outline-none font-medium transition-all h-32 resize-none" />
      </div>

      <button disabled={isSubmitting} type="submit" 
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-black py-4 rounded-2xl shadow-lg shadow-yellow-100 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 uppercase text-sm">
        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (
          <> <Save size={20} /> Save Address </>
        )}
      </button>
    </form>
  );
}