import { Card } from "@/components/ui/card"

export function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="p-4">
              <div className="flex gap-4">
                <div className="relative w-24 h-24 bg-gray-200 rounded-md" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-1/3 bg-gray-200 rounded" />
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-gray-200 rounded" />
                      <div className="h-8 w-8 bg-gray-200 rounded" />
                      <div className="h-8 w-8 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="flex items-center gap-4">
                      <div className="h-5 w-20 bg-gray-200 rounded" />
                      <div className="h-8 w-8 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <div className="h-5 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-24 bg-gray-200 rounded" />
              </div>
              <div className="flex justify-between">
                <div className="h-5 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-32 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <div className="h-6 w-16 bg-gray-200 rounded" />
                <div className="h-6 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 