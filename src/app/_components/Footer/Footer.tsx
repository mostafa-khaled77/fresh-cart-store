import React from 'react'
import Link from 'next/link'
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag className="w-10 h-10 bg-yellow-500 text-black rounded-[12px] p-2" />
            <span className="text-2xl font-black tracking-tight">E-STORE</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Discover the latest trends in fashion and technology. We provide high-quality products with a seamless shopping experience.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-yellow-500 hover:text-black transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-yellow-500 hover:text-black transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-yellow-500 hover:text-black transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Shopping</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/products" className="hover:text-yellow-400 transition-colors">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-yellow-400 transition-colors">Featured Categories</Link></li>
            <li><Link href="/brands" className="hover:text-yellow-400 transition-colors">Top Brands</Link></li>
            <li><Link href="/wishlist" className="hover:text-yellow-400 transition-colors">My Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/profile" className="hover:text-yellow-400 transition-colors">My Account</Link></li>
            <li><Link href="/allorders" className="hover:text-yellow-400 transition-colors">Track Orders</Link></li>
            <li><Link href="/addresses" className="hover:text-yellow-400 transition-colors">Shipping Addresses</Link></li>
            <li><Link href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-indigo-500" />
              <span>+20 1285836097</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-indigo-500" />
              <span>support@e-store.com</span>
            </li>
            <li className="flex items-center gap-3 italic">
              <MapPin className="w-4 h-4 text-indigo-500" />
              <span>Cairo, Egypt</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 FreshCart. All rights reserved.</p>
        <div className="flex gap-6 uppercase tracking-widest font-bold">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>Cash on delivery</span>
        </div>
      </div>
    </footer>
  )
}