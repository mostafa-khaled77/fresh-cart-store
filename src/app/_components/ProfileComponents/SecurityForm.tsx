"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react" 
import { toast } from "sonner"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { passwordSchema } from "@/schema/profile.schema"
import { updatePassword } from "../../_actions/profile.actions"

export default function SecurityForm() {
  const { data: session, update } = useSession()
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errMsg, setErrMsg] = useState(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(passwordSchema)
  })

const onSubmit = async (data: any) => {
    const res = await updatePassword(data);
    
    if (res.message === "success") {
      setErrMsg(null);
      await update({ 
          user: session?.user,
          token: res.token
      })
      toast.success("Password updated successfully! 🔐")
      reset()
    } else {
      setErrMsg(res.errors?.msg || res.message)
    }
}

  return (
    <div className="animate-in fade-in duration-500 max-w-xl">
      <div className="mb-8 border-b border-slate-50 pb-6">
        <h2 className="text-xl md:text-2xl font-black uppercase text-slate-900 flex items-center gap-2">
          <ShieldCheck className="text-amber-500" size={24} /> Security
        </h2>
        <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-1 ml-1">Password Management</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {[ {id: "current", label: "Current Password", reg: "currentPassword", show: showCurrent, set: setShowCurrent},
           {id: "new", label: "New Password", reg: "password", show: showNew, set: setShowNew},
           {id: "confirm", label: "Confirm Password", reg: "rePassword", show: showConfirm, set: setShowConfirm}
        ].map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-[10px] font-black uppercase text-slate-500 ml-1">{field.label}</Label>
            <div className="relative">
              <Input id={field.id} type={field.show ? "text" : "password"} {...register(field.reg as any)} className="pr-10 border-slate-200 rounded-xl font-bold h-12" />
              <button type="button" onClick={() => field.set(!field.show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                {field.show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {field.reg === "currentPassword" && errMsg && <p className="text-red-500 text-[9px] font-bold uppercase">{errMsg}</p>}
            {errors[field.reg as keyof typeof errors] && <p className="text-red-500 text-[9px] font-bold uppercase">{(errors[field.reg as keyof typeof errors]?.message as string)}</p>}
          </div>
        ))}
        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-12 h-12 bg-slate-900 hover:bg-amber-400 hover:text-black text-white font-black uppercase text-[11px] tracking-widest rounded-xl transition-all">
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  )
}