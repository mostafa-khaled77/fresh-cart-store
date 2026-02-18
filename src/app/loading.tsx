import CatSelekton from "./categories/loading";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <div className="w-full bg-slate-50 h-[300px] md:h-[500px] animate-pulse flex items-center">
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            <div className="h-3 md:h-4 bg-slate-200 w-24 md:w-32 rounded-full"></div>
            <div className="h-12 md:h-20 bg-slate-200 w-full rounded-2xl"></div>
            <div className="h-5 md:h-6 bg-slate-200 w-2/3 rounded-xl"></div>
            <div className="h-10 md:h-12 bg-slate-200 w-32 md:w-40 rounded-xl"></div>
          </div>
          <div className="hidden md:block bg-slate-200 h-64 lg:h-80 rounded-[2rem] w-full"></div>
        </div>
      </div>

      <section className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="h-7 bg-slate-200 w-32 md:w-48 rounded-lg"></div>
          <div className="h-5 bg-slate-200 w-16 md:w-24 rounded-lg"></div>
        </div>
        
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 no-scrollbar">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-shrink-0">
              <CatSelekton />
            </div>
          ))}
        </div>
      </section>


    </main>
  );
}