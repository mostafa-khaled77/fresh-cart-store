import getProducts from "@/apis/Products/products.api";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@/interfaces/product.interface";

export default async function GetAllProducts() {
  const products: Product[] = await getProducts();

  return (
    <section className="py-12 px-4 md:px-8 lg:px-12 bg-white">
      <div className="container mx-auto">
        <div className="mb-10 flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
            Our Collection
          </h2>
          <div className="h-1.5 w-20 bg-slate-900 mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product._id} 
              product={JSON.parse(JSON.stringify(product))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}