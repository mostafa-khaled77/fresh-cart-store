import React from "react";
import CategorySliderCard from "../CategorySliderCard/CategorySliderCard";
import Link from "next/link";
import GetAllCategories from "@/apis/Categories/getAllCategories.api";
import { Category } from "@/interfaces/category.interface";

export default async function CategorySlider() {
  const data: Category[] = await GetAllCategories();
  return (
    <section className=" py-12 bg-slate-50/50">
        <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4 px-10">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800">Top Categories</h2>
            <p className="text-slate-500 mt-1">Explore our wide range of products</p>
          </div>
          
          <Link 
            href="/categories" 
            className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
          >
            See All Categories
            <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
        <div className="relative">
           <CategorySliderCard data={data} />
        </div>
    </section>
  );

}