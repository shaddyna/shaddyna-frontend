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
import HeroCarousel from '@/components/hero/HeroCarousel';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Shaddyna',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Shaddyna - For great ideas and great products',
};

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6 p-4 md:gap-12 md:p-6">
      <HeroCarousel />
      <Categories />
      <Icons />
      

      <section className="space-y-4">
        <Suspense fallback={<ProductItemsSkeleton qty={8} name="Latest Products" />}>
          <ProductItems />
        </Suspense>
      </section>

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

  
      <section className="space-y-4">
        <Suspense fallback={<ProductItemsSkeleton qty={4} name="Top Rated" />}>
          <Slider />
        </Suspense>
      </section>


      <section className="space-y-4">
        <Suspense fallback={<ShopsSkeleton qty={4} />}>
          <Shops />
        </Suspense>
      </section>
    </div>
  );
};

export default HomePage;