import getSpecificCategotries from "@/apis/Categories/getSpecificCategories.api";
import SubCategoriesCards from "@/app/_components/SubCategoriesCards/SubCategoriesCards";
import React from "react";
import { Category } from "@/interfaces/category.interface";

interface CategoryPageProps {
  params: Promise<{ _id: string }>; 
}
export default async function CategoryDetails({ params }: CategoryPageProps) {
  const { _id } = await params; 
  const data: Category = await getSpecificCategotries(_id);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-5xl">
        
        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 mb-8 transition-all hover:shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
              <div className="absolute inset-0 bg-yellow-400 rounded-[2rem] rotate-6 scale-95 opacity-20"></div>
              <img
                src={data.image}
                alt={data.name}
                className="relative z-10 w-full h-full object-cover rounded-[2rem] shadow-xl border-4 border-white"
              />
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="h-[2px] w-8 bg-yellow-400"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Main Category</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-3 tracking-tight">
                {data.name}
              </h1>
              <p className="text-slate-500 max-w-xl leading-relaxed mx-auto md:mx-0">
                Discover our curated sub-collections for <span className="text-slate-900 font-semibold">{data.name}</span>. 
                Everything you need in one place.
              </p>
            </div>

            <div className="hidden xl:block bg-slate-50 border border-slate-100 p-4 rounded-3xl">
               <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">Status</p>
               <p className="text-green-600 font-bold flex items-center gap-2 text-sm">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 Active Collection
               </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-1.5 h-8 bg-yellow-400 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Sub Categories</h2>
              <p className="text-sm text-slate-400">Explore specific departments</p>
            </div>
          </div>

          <div className="w-full">
            <SubCategoriesCards _id={_id} />
          </div>
        </div>

      </div>
    </div>
  );
}