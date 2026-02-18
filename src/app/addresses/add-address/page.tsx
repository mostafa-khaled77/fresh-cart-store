import AddressForm from "@/app/_components/AddressesAction/AddressesForm/AddressForm";
import { MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddAddressPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/addresses" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to Addresses
        </Link>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white">
            <h1 className="text-2xl font-black flex items-center gap-3">
              <MapPin className="text-yellow-400" /> Add New Address
            </h1>
            <p className="text-slate-400 text-sm mt-1">Please provide accurate shipping details</p>
          </div>

          <AddressForm /> 
          
        </div>
      </div>
    </div>
  );
}