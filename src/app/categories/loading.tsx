export default function CatSelekton() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-28 pb-20 px-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl">
        
        <aside className="lg:col-span-1">
          <div className="sticky top-28 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 animate-pulse">
            <div className="h-2 w-16 bg-slate-200 mx-auto mb-4 rounded"></div>
            <div className="h-6 w-32 bg-slate-200 mx-auto rounded-lg"></div>
            <div className="h-1 w-8 bg-slate-100 mx-auto mt-4 rounded-full"></div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="mb-10 flex justify-between items-center animate-pulse">
            <div className="h-8 w-40 bg-slate-200 rounded-xl"></div>
            <div className="h-10 w-32 bg-slate-200 rounded-2xl"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 animate-pulse">
                <div className="aspect-square w-full bg-slate-100 rounded-[1.5rem] mb-4"></div>
                <div className="h-4 w-3/4 bg-slate-100 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
              </div>
            ))}
          </div>
        </main>
        
      </div>
    </div>
  );
}