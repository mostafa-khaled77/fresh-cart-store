import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brand } from "@/interfaces/brand.interface"; 
import Image from "next/image";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Card className="relative w-72 overflow-hidden rounded-3xl cursor-pointer group border-none shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <CardTitle className="bg-gray-50 flex items-center justify-center p-6 relative h-48">
          <Image
            src={brand.image}
            alt={brand.name}
            fill 
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 bg-white">
        <p className="line-clamp-1 font-bold text-gray-700 text-center uppercase tracking-wide">
          {brand.name}
        </p>
      </CardContent>

      <div className="
        absolute inset-0 bg-black/40 backdrop-blur-[2px]
        flex items-center justify-center
        transform translate-y-full opacity-0
        group-hover:translate-y-0 group-hover:opacity-100
        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
      ">
        <div className="text-center">
           <h2 className="text-white text-xl font-extrabold uppercase tracking-widest">
            View Brand
          </h2>
          <div className="h-1 w-10 bg-white mx-auto mt-2 rounded-full"></div>
        </div>
      </div>
    </Card>
  );
}