import React from 'react';
import { MapPin, Plus, Home, Phone, Building2 } from 'lucide-react';
import Link from 'next/link';
import { getLoggedUserAddresses } from '../_actions/address.actions';
import RemoveAddress from '../_components/AddressesAction/RemoveAddress/RemoveAddress';
import AddressCart from '../_components/AddressesAction/AddressCart/AddressCart';
export interface Address {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}

export default async function AddressesPage() {
    const res = await getLoggedUserAddresses();
    const addresses: Address[] = res?.data || [];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">
                            <MapPin className="text-yellow-500" size={32} />
                            My Addresses
                        </h1>
                        <p className="text-slate-500 mt-1 font-medium">Manage your shipping locations for faster checkout</p>
                    </div>

                    <Link href="/addresses/add-address" className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                        <Plus size={20} />
                        Add New Address
                    </Link>
                </div>

                {addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((addr: Address) => (
                            <div key={addr._id} className="group bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-yellow-400/50 transition-all duration-500 relative overflow-hidden">

                                <AddressCart address={addr} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">No addresses found</h3>
                        <p className="text-slate-500 mb-8">You haven&apos;t added any addresses to your account yet.</p>
                        <Link href="/addresses/add-address" className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-8 py-3 rounded-2xl font-black hover:bg-yellow-500 transition-all">
                            Add Your First Address
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}