"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import  Link  from 'next/link';

export default function HomeSlider() {
  const banners = [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070",
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
  ];

  return (<>
  
  <section className="relative w-full bg-slate-100 py-16 md:py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="z-10">
          <span className="inline-block px-4 py-1.5 bg-yellow-400 text-black text-xs font-black uppercase tracking-widest rounded-full mb-6">
            Exclusive Offer -30% Off
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
            Stay Fresh, <br />
            <span className="text-yellow-500 underline decoration-black">Shop Smart.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-md leading-relaxed">
            Get your daily essentials delivered to your doorstep with the best prices and highest quality in town.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href={`/products`} className="bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-95">
              Shop Now <i className="fa-solid fa-arrow-right ml-2"></i>
            </Link>
            <Link href={`/categories`} className="bg-white text-black border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              View Categories
            </Link>
          </div>

          <div className="mt-12 flex gap-8">
             <div className="flex items-center gap-2">
                <i className="fa-solid fa-truck-fast text-yellow-500"></i>
                <span className="text-sm font-bold text-slate-700">Free Delivery</span>
             </div>
             <div className="flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-yellow-500"></i>
                <span className="text-sm font-bold text-slate-700">Secure Payment</span>
             </div>
          </div>
        </div>

       <div className="relative">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-yellow-400/20 rounded-full blur-3xl"></div>

  <div className="relative z-10 bg-white p-4 rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
    
    <div className="rounded-[1.5rem] overflow-hidden w-full h-[400px]">
      <Swiper
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="h-full w-full"
      >
       {banners.map((img, index) => (
          <SwiperSlide key={index}>
            <img 
              src={img} 
              className="w-full h-full object-cover" 
              alt="banner"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
      <div className="absolute -bottom-6 left-4 md:-left-6 bg-white p-3 md:p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20 w-max max-w-[200px] md:max-w-none">
        <div className="bg-green-100 p-2 rounded-full shrink-0">
          <i className="fa-solid fa-bolt text-green-600 text-sm md:text-base"></i>
        </div>
        <div>
          <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase">100% Organic</p>
          <p className="font-black text-slate-800 text-xs md:text-sm leading-tight">Mode & Tech</p>
        </div>
      </div>

  </div>
</div>

      </div>
    </section>
  
  
  </>
  )
}