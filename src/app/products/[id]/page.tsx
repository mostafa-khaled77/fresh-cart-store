import React from "react";
import { Button } from "@/components/ui/button";
import SpecificProductSlider from "@/app/_components/SpecificProductSlider/SpecificProductSlider";
import getSpecificProduct from "@/apis/Products/specificProduct.api";
import { Product } from "@/interfaces/product.interface";
import ProductDetailsAction from "@/app/_components/ProductDetailsAction/ProductDetailsAction";

export default async function ProductDetails({params,}: {params: { id: string };}) {
  let { id } = await params;
  let data: Product = await getSpecificProduct(id);
  return (
    <>
      <div className="min-h-screen flex justify-center items-center ">
        <div className="container flex-col md:flex-row p-10 mx-auto flex items-center gap-10">
          <div className="md:w-1/4 max-w-full border p-5 rounded-lg shadow-lg border-black ">
            <SpecificProductSlider data={data} />
          </div>
          <div className="w-full md:w-3/4 p-10 rounded-lg shadow-lg border-black ">
            <h2 className="text-xl md:text-3xl font-bold mb-5">{data.title}</h2>
            <p className="text-lg mb-3">{data.description}</p>
            <div className="flex gap-8 items-center">
              <span>{data.price} EGP</span>
              <span className="flex gap-1 items-center">
                <i className="fa-solid fa-star text-[#FFD43B]"></i>
                {data.ratingsAverage}
              </span>
            </div>
            <div className="flex gap-5 mt-8 items-center">
              <ProductDetailsAction id={id}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
