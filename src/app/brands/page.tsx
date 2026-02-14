import { log } from "console";
import React from "react";
import Link from "next/link";
import BrandCard from "../_components/BrandCard/BrandCard";
import { Brand } from "./../../interfaces/brand.interface";
import getAllBrands from "@/apis/Brands/getAllBrands.api";

export default async function Brands() {
  const data: Brand[] = await getAllBrands();

  return (
    <>
      <div className="container mx-auto w-[80%]">
        <div className="flex gap-6 flex-wrap justify-center py-10">
          {data.map((brand: Brand) => (
            <Link key={brand._id} href={`/brands/${brand._id}`}>
              <BrandCard brand={brand} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
