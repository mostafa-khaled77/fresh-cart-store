"use client"
import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Mail, ShieldCheck } from "lucide-react"

export default function UserProfileCard() {
  const { data: session } = useSession()

  const userInitial = session?.user?.name 
    ? session.user.name.trim().charAt(0).toUpperCase() 
    : "U"

  return (
    <Card className="rounded-2xl relative overflow-hidden border-none bg-black/5 backdrop-blur-md p-8 shadow-none w-full border-b border-black/5">
      
      <div className="flex flex-col items-center text-center gap-4">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-black/10 p-1 shadow-xl">
            <AvatarImage src={""} alt={session?.user?.name || "User"} />
            <AvatarFallback className="bg-slate-900 text-amber-400 text-3xl font-black">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-amber-500 bg-green-500" />
        </div>

        <div className="space-y-1.5 w-full">
          <h3 className="text-[20px] font-black text-slate-900 leading-none">
            {session?.user?.name || "Your Profile"}
          </h3>
          
          <div className="flex items-center justify-center gap-1.5">
            <Mail size={12} className="text-slate-900/60" />
            <p className="text-[12px] font-bold text-slate-900/60 truncate max-w-[200px]">
              {session?.user?.email || "user@example.com"}
            </p>
          </div>

          <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-400 shadow-lg">
            <ShieldCheck size={12} />
            Verified Profile
          </div>
        </div>
      </div>
    </Card>
  )
}