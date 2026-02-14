'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Product } from '@/interfaces/product.interface';
interface Props {
  data: Product; 
}

export default function SpecificProductSlider({data}:Props) {
  return (
  <>
   <Swiper
      className="w-full h-full"
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        reverseDirection: false,
      }}
      modules={[Autoplay]}
    >
        {data.images.map((img:string, index:number) => (
          <SwiperSlide key={index}><img src={img} alt={data.title} /> </SwiperSlide>
        ))}
     
    </Swiper>
  </>
  )
}
