/*import { Metadata } from 'next';
import { Suspense } from 'react';

import Categories from '@/components/categories/Categories';
import Icons from '@/components/icons/Icons';
import ProductItems, {
  ProductItemsSkeleton,
} from '@/components/products/ProductItems';
import Slider from '@/components/slider/Slider';
import { ShopsSkeleton } from '@/components/shops/ShopsSkeleton';
import Shops from '@/components/shops/shops';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Shaddyna',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Shaddyna - For great ideas and great products',
};

const HomePage = () => {
  return (
    <div className='my-0 flex flex-col gap-4 md:gap-16 p-4'>
      <Categories />
      <Icons />
      <Suspense
        fallback={<ProductItemsSkeleton qty={8} name='Latest Products' />}
      >
        <ProductItems />
      </Suspense>

 
      <div className="w-full px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
    
          <div className="relative">
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-4 w-max md:w-full">
             
                <div className="w-[280px] flex-shrink-0 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-bold text-yellow-800">Holiday Sale!</h3>
                    <p className="text-sm text-yellow-600 mt-1">Up to 50% off selected items</p>
                  </div>
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full ml-4">New</span>
                </div>

            
                <div className="w-[280px] flex-shrink-0 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-bold text-blue-800">New Professionals</h3>
                    <p className="text-sm text-blue-600 mt-1">Discover recently joined experts</p>
                  </div>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-4">Hot</span>
                </div>

            
                <div className="w-[280px] flex-shrink-0 bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-bold text-pink-800">Limited Time Offer</h3>
                    <p className="text-sm text-pink-600 mt-1">Book now and get 20% off</p>
                  </div>
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full ml-4">Sale</span>
                </div>

                <div className="w-[280px] flex-shrink-0 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-bold text-green-800">New Arrivals</h3>
                    <p className="text-sm text-green-600 mt-1">Fresh products just added</p>
                  </div>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-4">New</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<ProductItemsSkeleton qty={4} name='Top Rated' />}>
        <Slider />
      </Suspense>

      <Suspense fallback={<ShopsSkeleton qty={4} />}>
        <Shops />
      </Suspense>

      {/*<ReadMore>
        <Text />
      </ReadMore>*
    </div>
  );
};

export default HomePage;*/

import { Metadata } from 'next';
import { Suspense } from 'react';

import Categories from '@/components/categories/Categories';
import Icons from '@/components/icons/Icons';
import ProductItems, {
  ProductItemsSkeleton,
} from '@/components/products/ProductItems';
import Slider from '@/components/slider/Slider';
import { ShopsSkeleton } from '@/components/shops/ShopsSkeleton';
import Shops from '@/components/shops/shops';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Shaddyna',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Shaddyna - For great ideas and great products',
};

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:gap-12 md:p-6">
      <Categories />
      <Icons />
      
      {/* Latest Products Section */}
      <section className="space-y-4">
        <Suspense fallback={<ProductItemsSkeleton qty={8} name="Latest Products" />}>
          <ProductItems />
        </Suspense>
      </section>

      {/* Promotional Banners */}
      <section className="overflow-hidden">
        <div className="container mx-auto px-0">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {[
              {
                id: 1,
                title: "Holiday Sale!",
                desc: "Up to 50% off selected items",
                bg: "from-yellow-50 to-yellow-100",
                border: "border-yellow-200",
                text: "text-yellow-800",
                accent: "bg-yellow-500",
                badge: "New"
              },
              {
                id: 2,
                title: "New Professionals",
                desc: "Discover recently joined experts",
                bg: "from-blue-50 to-blue-100",
                border: "border-blue-200",
                text: "text-blue-800",
                accent: "bg-blue-500",
                badge: "Hot"
              },
              {
                id: 3,
                title: "Limited Time Offer",
                desc: "Book now and get 20% off",
                bg: "from-pink-50 to-pink-100",
                border: "border-pink-200",
                text: "text-pink-800",
                accent: "bg-pink-500",
                badge: "Sale"
              },
              {
                id: 4,
                title: "New Arrivals",
                desc: "Fresh products just added",
                bg: "from-green-50 to-green-100",
                border: "border-green-200",
                text: "text-green-800",
                accent: "bg-green-500",
                badge: "New"
              }
            ].map((banner) => (
              <div 
                key={banner.id}
                className={`w-[280px] flex-shrink-0 snap-start rounded-lg border p-6 transition-all hover:shadow-md ${banner.bg} ${banner.border}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-bold ${banner.text}`}>{banner.title}</h3>
                    <p className={`mt-1 text-sm ${banner.text.replace('800', '600')}`}>
                      {banner.desc}
                    </p>
                  </div>
                  <span className={`ml-4 rounded-full px-2 py-1 text-xs text-white ${banner.accent}`}>
                    {banner.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Products */}
      <section className="space-y-4">
        <Suspense fallback={<ProductItemsSkeleton qty={4} name="Top Rated" />}>
          <Slider />
        </Suspense>
      </section>

      {/* Featured Shops */}
      <section className="space-y-4">
        <Suspense fallback={<ShopsSkeleton qty={4} />}>
          <Shops />
        </Suspense>
      </section>
    </div>
  );
};

export default HomePage;