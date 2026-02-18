import React from "react";
import CategoryCard from "../_components/CategoryCard/CategoryCard";
import GetAllCategories from "@/apis/Categories/getAllCategories.api";
import { Category } from "@/interfaces/category.interface";
export const dynamic = "force-dynamic";
export default async function Categories() {
  const data: Category[] = await GetAllCategories();

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
      </div>
    </div>
  );
}
