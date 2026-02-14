import React from "react";
import Link from "next/link";
import getAllSubCategories from "@/apis/SubCategories/getAllSubCategories";
import { SubCategory } from "@/interfaces/subcategory.interface";

export default async function SubCategoriesCards({ _id }: { _id: string }) {
  let data: SubCategory[] = await getAllSubCategories(_id);

  return (
    <div className="w-full">
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((sub: SubCategory) => (
            <Link
              key={sub._id}
              href={`/categories/${_id}/subcategories/${sub._id}`}
              className="group relative flex flex-col items-center justify-center h-48 rounded-[2rem] bg-white border border-slate-100 
                         shadow-[0_10px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] 
                         hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-yellow-50 rounded-full group-hover:scale-[3] transition-transform duration-700" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-md transition-all">
                  <span className="text-2xl">✨</span>
                </div>

                <h2 className="text-slate-800 font-bold text-lg group-hover:text-yellow-600 transition-colors">
                  {sub.name}
                </h2>
                <p className="text-slate-400 text-xs mt-1 font-medium uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  View Collection
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
          <div className="text-4xl mb-3 opacity-20">📂</div>
          <h2 className="text-slate-400 font-bold text-lg">
            No Sub Categories Available
          </h2>
        </div>
      )}
    </div>
  );
}
