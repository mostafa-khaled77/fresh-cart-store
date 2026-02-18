"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addAddress } from "@/app/_actions/address.actions";
import { MapPin, Phone, Building2, Home, Loader2, Save } from "lucide-react";
import RemoveAddress from "../RemoveAddress/RemoveAddress";
import { Address } from "@/app/addresses/page";

export default function AddressCart({ address }: { address: Address }) {



    return (
        <>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-colors duration-500"></div>

            <div className="flex justify-between items-start relative z-10">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-900 text-yellow-400 p-2 rounded-xl shadow-lg shadow-slate-200">
                            <Home size={16} strokeWidth={2.5} />
                        </div>
                        <span className="font-black text-slate-800 tracking-tight uppercase text-sm">
                            {address.name || 'My Home'}
                        </span>
                    </div>
                </div>

                <RemoveAddress addressId={address._id} />
            </div>

            <div className="mt-8 space-y-4 relative z-10">
                <div className="flex items-start gap-3">
                    <div className="mt-1 bg-slate-100 p-1.5 rounded-md text-slate-400">
                        <MapPin size={14} />
                    </div>
                    <p className="text-slate-600 font-semibold leading-snug">
                        {address.details}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-50">
                        <Building2 size={16} className="text-yellow-600" />
                        <span className="text-xs font-bold text-slate-500 uppercase">{address.city}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-50">
                        <Phone size={16} className="text-yellow-600" />
                        <span className="text-xs font-bold text-slate-500 tracking-tighter">{address.phone}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Address</span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-yellow-500">
                    <i className="fa-solid fa-arrow-right-long text-sm"></i>
                </div>
            </div>
        </>
    );
}