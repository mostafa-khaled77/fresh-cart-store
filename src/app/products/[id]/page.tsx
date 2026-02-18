import React from "react";
import SpecificProductSlider from "@/app/_components/SpecificProductSlider/SpecificProductSlider";
import getSpecificProduct from "@/apis/Products/specificProduct.api";
import { Product } from "@/interfaces/product.interface";
import ProductDetailsAction from "@/app/_components/ProductDetailsAction/ProductDetailsAction";
import { getReviwesForProduct } from "@/app/_actions/reviews.action";
import ReviewsCard from "@/app/_components/ReviewsCard/ReviewsCard";
import { ProductReview, ReviewsResponse } from "@/interfaces/reviews.interface";
import getUserToken from "@/app/_actions/getUserToken";

export default async function ProductDetails({ params }: { params: { id: string }; }) {
  const { id } = await params;
  const token = await getUserToken();
  const data: Product = await getSpecificProduct(id);
  const reviewsData: ReviewsResponse = await getReviwesForProduct(id);

  return (
    <div className="min-h-screen bg-white py-10 md:py-20">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

          <div className="w-full lg:w-1/3 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <SpecificProductSlider data={data} />
          </div>

          <div className="w-full lg:w-2/3 flex flex-col justify-center">
            <div className="space-y-6">
              <span className="text-green-600 font-bold text-xs uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full w-fit">
                {data.category.name}
              </span>

              <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">
                {data.title}
              </h1>

              <p className="text-slate-600 leading-relaxed text-sm md:text-base max-w-2xl font-medium">
                {data.description}
              </p>

              <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Price</span>
                  <span className="text-2xl font-black text-slate-900">{data.price} <small className="text-xs text-slate-500">EGP</small></span>
                </div>

                <div className="h-10 w-[1px] bg-slate-100"></div>

                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Rating</span>
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-star text-amber-400 text-sm"></i>
                    <span className="font-black text-slate-900">{data.ratingsAverage}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <ProductDetailsAction id={id} />
              </div>
              <div>
                <ReviewsCard reviews={reviewsData?.data || []} ProductId={id} token={token || ""}/>
              </div>              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}