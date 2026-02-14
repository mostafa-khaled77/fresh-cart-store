'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import CategoryCard from '../CategoryCard/CategoryCard';

export default function CategorySliderCard({data}: any) {
  return (
    <div className="w-full py-6">
      <Swiper
        style={{ width: '100%' }}
        spaceBetween={20} 
        loop={true}
        speed={4000} 
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, FreeMode]}
        breakpoints={{
          0: { slidesPerView: 1.4 },     
          480: { slidesPerView: 2.2 },   
          768: { slidesPerView: 3.2 },   
          1024: { slidesPerView: 4.2 },  
          1440: { slidesPerView: 5.2 },  
        }}
        className="mySwiper"
      >
        {data?.map((category: any) => (
          <SwiperSlide key={category._id} className="pb-4">
            <CategoryCard
              image={category.image}
              name={category.name}
              link={`/categories/${category._id}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}