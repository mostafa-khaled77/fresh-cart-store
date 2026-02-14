import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import getProducts from "@/apis/Products/products.api";
import { Product } from "@/interfaces/product.interface";

export default async function GetAllProducts() {
  let data: Product[] = await getProducts();
  return (
    <>
      <div className="container mx-auto max-w-7xl px-4">
        <h1 className="text-4xl md:text-5xl text-center mt-9 font-bold text-gray-800 relative after:block after:w-16 after:h-0.5 after:bg-black after:mx-auto after:mt-3">
          All Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-10">
          {data.map((product: Product) => (
            <ProductCard key={product.id} product={product} id={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}
