import { Card } from "@/components/ui/card"

export function CheckoutSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Skeleton */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-5 w-20 bg-gray-200 rounded" />
                    <div className="h-10 w-full bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-5 w-20 bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-200 rounded" />
                </div>
              ))}
              <div className="h-10 w-full bg-gray-200 rounded mt-6" />
            </div>
          </Card>
        </div>

        {/* Summary Skeleton */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
            <div className="space-y-4 mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </div>
                  <div className="h-5 w-20 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-5 w-24 bg-gray-200 rounded" />
                  <div className="h-5 w-20 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 