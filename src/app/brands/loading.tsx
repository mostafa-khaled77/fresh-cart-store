import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center mb-16 space-y-3">
        <Skeleton className="h-10 w-64 rounded-full" />
        <Skeleton className="h-1.5 w-16 bg-yellow-400/20 rounded-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-4">
            <Skeleton className="h-40 w-40 md:h-48 md:w-48 rounded-[2rem]" />
            
            <Skeleton className="h-5 w-24 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}