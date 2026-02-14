import React from "react";
import { getProductsBySubCategory } from "@/apis/SubCategories/getProductsBySubCategory";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import getSpecificCategotries from "@/apis/Categories/getSpecificCategories.api";
import { Category } from "@/interfaces/category.interface";
import { Product } from "@/interfaces/product.interface";

interface CategoryPageProps {
  params: Promise<{ 
    _id: string; 
    subid: string 
  }>; 
}

export default async function CategoryDetails({ params }: CategoryPageProps) {
  const { _id, subid } = await params;
  
  const mainCategory: Category = await getSpecificCategotries(_id);
  const products: Product[] = await getProductsBySubCategory(subid);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20 px-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl">
        
        <aside className="lg:col-span-1">
          <div className="sticky top-28 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 text-center">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
              Category
            </h2>
            <h3 className="text-xl font-black text-slate-900 uppercase leading-tight">
              {mainCategory?.name}
            </h3>
            <div className="h-1 w-8 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="mb-10 flex justify-between items-center">
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              Products
            </h1>
            
            <div className="bg-white border border-slate-100 px-6 py-2 rounded-2xl shadow-sm text-slate-800 font-bold flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <span className="text-sm tracking-tight">
                {products?.length || 0} Items Found
              </span>
            </div>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid place-items-center h-80 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 text-center">
              <div>
                <span className="text-6xl block mb-4 opacity-20">🏜️</span>
                <h3 className="text-slate-800 font-bold text-xl uppercase italic">
                  No Products Found
                </h3>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}