"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { toast } from "sonner"
import { profileSchema } from "@/schema/profile.schema"
import { updateUserData } from "../../_actions/profile.actions"

export default function PersonalInfoFormInProfile() {
  const { data: session , update } = useSession()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", phone: "" }
  })

  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || ""
      })
    }
  }, [session, reset])

const onSubmit = async (data: any) => {
    const { email, ...updateDataWithoutEmail } = data;
    const res = await updateUserData(updateDataWithoutEmail);
    
    if (res.message === "success") {
      await update({
          user: {
            ...session?.user, 
            name: data.name,
            phone: data.phone
          },
          token: res.token,
      })
      toast.success("Profile updated", { 
        style: { background: '#fbbf24', color: '#000', fontWeight: 'bold' } 
      })
    } else {
      toast.error(res.errors?.msg || res.message)
    }
}

  return (
    <div className="animate-in fade-in duration-500 text-left">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-black uppercase text-slate-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-400 rounded-full inline-block"></span>
          Personal Details
        </h2>
        <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-1 ml-4">
          Identity & Contact
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl">
        <div className="grid grid-cols-1 gap-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Full Name</label>
            <input {...register("name")} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-amber-500 outline-none font-bold text-sm" />
            {errors.name && <p className="text-red-500 text-[9px] font-bold uppercase">{errors.name.message as string}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Phone Number</label>
            <input {...register("phone")} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-amber-500 outline-none font-bold text-sm" />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email Address</label>
          <input {...register("email")} disabled className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl cursor-not-allowed font-bold text-slate-400 text-sm" />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-amber-300 text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-amber-400 transition-all active:scale-95 border-b-4 border-amber-600">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}