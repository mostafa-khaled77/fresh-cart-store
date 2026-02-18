"use client"
import Link from "next/link"
import { User, Shield, Heart, Package } from "lucide-react"

export default function ProfileSideBar({ activeTab }: { activeTab: string }) {
  const menus = [
    { id: "profile", label: "Identity", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "orders", label: "Orders", icon: Package },
  ]

  return (
    <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar items-center">
      {menus.map((item) => (
        <Link
          key={item.id}
          href={`/profile?tab=${item.id}`}
          className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all whitespace-nowrap min-w-fit lg:w-full ${
            activeTab === item.id 
            ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
            : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-100"
          }`}
        >
          <item.icon size={16} />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}