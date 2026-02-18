import React from 'react';

export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="h-10 w-48 bg-gray-200 rounded-full mb-8 animate-pulse"></div>

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              
              <div className="bg-slate-800 p-6 flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-slate-600 rounded animate-pulse"></div>
                </div>
                <div className="flex gap-4">
                  <div className="h-6 w-20 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-slate-700 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}