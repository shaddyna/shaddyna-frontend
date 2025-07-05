/*

import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
import { Shop } from '@/lib/models/ShopModel';

const ShopItem = async ({ shop }: { shop: Shop }) => {
  const buffer = await fetch(shop.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <Link href={`/shop/${shop._id}`} className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-[#bf2c7e]/50 transition-all duration-300 shadow-sm hover:shadow-md sm:shadow-md sm:hover:shadow-lg block">
    
      <div className="relative h-48 xs:h-56 sm:h-64 overflow-hidden">
        <Image
          src={shop.image}
          alt={shop.name}
          placeholder='blur'
          blurDataURL={base64}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
       
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-10 h-10 text-[#bf2c7e] hover:text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

     
      <div className="p-3 sm:p-4">
        <div className="mb-2">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
            {shop.name}
          </h3>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{shop.description}</p>
        </div>

       
        <div className="flex flex-wrap gap-1 mt-2">
          {shop.categories.map((category) => (
            <span key={category} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ShopItem;*/

// ShopItem.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
import { Shop } from '@/lib/models/ShopModel';

const ShopItem = async ({ shop }: { shop: Shop }) => {
  const buffer = await fetch(shop.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <Link 
      href={`/shop/${shop._id}`} 
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={shop.image}
          alt={shop.name}
          placeholder="blur"
          blurDataURL={base64}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* View Shop Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-full bg-white/80 p-3 text-[#bf2c7e] backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="line-clamp-1 text-md font-medium text-gray-900">{shop.name}</h3>
        <p className="line-clamp-2 mt-1 text-sm text-gray-500">{shop.description}</p>
        
        <div className="mt-2 flex flex-wrap gap-1">
          {shop.categories.slice(0, 3).map((category) => (
            <span 
              key={category} 
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
            >
              {category}
            </span>
          ))}
          {shop.categories.length > 3 && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
              +{shop.categories.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ShopItem;