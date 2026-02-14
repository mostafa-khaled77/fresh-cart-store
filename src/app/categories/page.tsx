import Link from "next/link";
import React from "react";
import CategoryCard from "../_components/CategoryCard/CategoryCard";
import GetAllCategories from "@/apis/Categories/getAllCategories.api";
import getAllSubCategories from "@/apis/SubCategories/getAllSubCategories";
import { SubCategory } from "@/interfaces/subcategory.interface";
import { Category } from "@/interfaces/category.interface";

export default async function Categories() {
  const data: Category[] = await GetAllCategories();
  const subCategories: SubCategory[] = await getAllSubCategories();

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="pt-16 pb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            All Categories
          </h1>
          <p className="text-slate-500 mb-4">Explore our main collections</p>
          <div className="w-16 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.map((category: Category) => (
            <div
              key={category._id}
              className="group relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <CategoryCard
                image={category.image}
                name={category.name}
                link={`/categories/${category._id}`}
              />
            </div>
          ))}
        </div>

        <div className="pt-24 pb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            All Sub Categories
          </h1>
          <p className="text-slate-500 mb-4">Discover more specific items</p>
          <div className="w-16 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subCategories.map((sub: SubCategory, index: number) => (
            <Link
              href={`/categories/${sub.category}/subcategories/${sub._id}`}
              key={sub._id}
              className="group relative flex items-center p-6 rounded-[1.5rem] bg-white/70 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-yellow-100/50 to-orange-100/50 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

              <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                {index + 1}
              </div>

              <div className="relative z-10 ml-5 text-left">
                <h2 className="text-slate-700 font-bold text-lg group-hover:text-slate-900 transition-colors">
                  {sub.name}
                </h2>
                <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">
                  Explore items
                </span>
              </div>

              <div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                <span className="text-yellow-500 text-xl">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
