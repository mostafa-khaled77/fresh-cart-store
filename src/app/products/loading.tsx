import { Skeleton } from "@/components/ui/skeleton"

export default function ProductSelekton() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <div className="flex justify-center mb-10">
        <Skeleton className="h-12 w-48" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 border p-4 rounded-xl">
            <Skeleton className="h-60 w-full rounded-xl" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-full" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-10 flex-1 rounded-lg" />
              <Skeleton className="h-10 w-11 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}