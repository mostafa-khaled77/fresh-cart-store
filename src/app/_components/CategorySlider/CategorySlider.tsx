import React from "react";
import CategorySliderCard from "../CategorySliderCard/CategorySliderCard";
import Link from "next/link";
import GetAllCategories from "@/apis/Categories/getAllCategories.api";
import { Category } from "@/interfaces/category.interface";

export default async function CategorySlider() {
  const data: Category[] = await GetAllCategories();
  return (
    <section className=" py-12 bg-slate-50/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-slate-100 pb-6 px-4 md:px-10 gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800 uppercase">
            Top Categories
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium">
            Explore our wide range of products
          </p>
        </div>

        <Link
          href="/categories"
          className="inline-flex items-center gap-2 bg-slate-50 text-slate-700 px-5 py-2.5 rounded-full text-sm font-bold border border-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-300 shadow-sm group"
        >
          See All Categories
          <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
        </Link>
      </div>
      <div className="relative">
        <CategorySliderCard data={data} />
      </div>
    </section>
  );

}