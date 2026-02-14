
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { Product } from "@/interfaces/product.interface";
import { Brand } from "@/interfaces/brand.interface";
import Image from "next/image";
import getSpecificBrand, { getProductsByBrand } from "@/apis/Brands/getSpecificBrands";




export default async function Page({ params }: { params: { _id: string } }) {
  const { _id: id } = await params;
  const brandData: Brand = await getSpecificBrand(id);
  const brandProducts: Product[] = await getProductsByBrand(id);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50/50 w-full overflow-x-hidden">
      <aside className="w-max-full md:w-1/4 p-4 md:p-6 sticky top-0 md:h-screen z-30 flex-shrink-0">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden p-8 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-32 h-32 md:w-40 md:h-40 group overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center">
            <Image
              src={brandData.image}
              alt={brandData.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="
        absolute inset-0 bg-black/40 backdrop-blur-[2px]
        flex items-center justify-center
        transform translate-y-full opacity-0
        group-hover:translate-y-0 group-hover:opacity-100
        transition-all duration-500 ease-in-out
      "
            >
              <i className="fa-solid fa-eye text-white text-2xl"></i>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              {brandData.name}
            </h1>
            <div className="mt-4">
              {brandProducts.length > 0 ? (
                <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 py-2 px-5 rounded-full text-xs font-bold border border-green-100">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  {brandProducts.length} Products
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 py-2 px-5 rounded-full text-xs font-bold border border-red-100">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8">
        <div className="mb-12">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
              Collections
            </h2>
            <span className="flex-1 h-[1px] bg-gray-200"></span>
          </div>
          <div className="w-12 h-1.5 bg-yellow-400 mt-1 rounded-full"></div>
        </div>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {brandProducts.map((product: Product) => (
              <div key={product._id} className="h-full">
                <ProductCard product={product} id={product._id} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <i className="fa-solid fa-box-open text-4xl text-gray-300"></i>
            </div>
            <p className="text-gray-500 font-bold text-lg">
              No products found for this brand
            </p>
            <p className="text-gray-400 text-sm">
              Check back later or browse other brands.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
