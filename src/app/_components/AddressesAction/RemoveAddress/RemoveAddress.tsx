'use client'
import { removeAddress } from '@/app/_actions/address.actions'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'


export default function RemoveAddress({addressId}:{addressId:string}) {
    const [loading, setLoading] = useState(false);

    async function handleRemoveAddress() {
        try{
            setLoading(true);
            const res = await removeAddress(addressId);
            if(res.status === "success"){
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        }catch(error){
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
        
    }
    return (
        <>
            <Button onClick={handleRemoveAddress} disabled={loading} className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-500 hover:text-white hover:rotate-12 transition-all duration-300">
                {loading ? <Loader2 className="animate-spin" /> : <Trash2 size={18} />}
            </Button>
        </>
    )
}
