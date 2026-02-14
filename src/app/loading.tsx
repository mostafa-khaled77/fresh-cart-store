import CatSelekton from "./categories/loading";
import ProductSelekton from "./products/loading";


export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="w-full bg-slate-100 h-[500px] animate-pulse flex items-center px-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 gap-12">
           <div className="space-y-6">
              <div className="h-4 bg-slate-200 w-32 rounded-full"></div>
              <div className="h-20 bg-slate-200 w-full rounded-2xl"></div>
              <div className="h-6 bg-slate-200 w-2/3 rounded-xl"></div>
           </div>
           <div className="bg-slate-200 h-80 rounded-[2rem]"></div>
        </div>
      </div>

      <section className="py-12 px-10">
        <div className="flex justify-between mb-8">
          <div className="h-8 bg-slate-200 w-48 rounded"></div>
          <div className="h-6 bg-slate-200 w-24 rounded"></div>
        </div>
        <div className="flex gap-6 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <CatSelekton key={i} />
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-10">
        <div className="h-10 bg-slate-200 w-64 mx-auto mb-10 rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <ProductSelekton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}