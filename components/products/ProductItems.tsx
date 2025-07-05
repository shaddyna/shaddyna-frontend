/*import productService from '@/lib/services/productService';
import { convertDocToObj, delay } from '@/lib/utils';

import ProductItem from './ProductItem';

const ProductItems = async () => {
  await delay(4000);
  const latestProducts = await productService.getLatest();

  return (
    <div>
      <h2 className='my-2 text-2xl md:my-4'>Latest Products</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObj(product)} />
        ))}
      </div>
    </div>
  );
};

export default ProductItems;

const ProductItemSkeleton = () => {
  return (
    <div className='card mb-4 bg-base-300'>
      <div>
        <div className='skeleton relative aspect-square h-full w-full' />
      </div>
      <div className='card-body'>
        <div className='skeleton mb-2 h-6 w-3/4' />
        <div className='skeleton mb-2 h-4 w-1/2' />
        <div className='skeleton mb-2 h-4 w-1/3' />
        <div className='card-actions flex items-center justify-between'>
          <div className='skeleton h-8 w-20' />
        </div>
      </div>
    </div>
  );
};

export const ProductItemsSkeleton = ({
  qty,
  name,
}: {
  qty: number;
  name: string;
}) => {
  return (
    <div>
      <h2 className='my-2 text-2xl md:my-4'>{name}</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {Array.from({ length: qty }).map((_, i) => {
          return <ProductItemSkeleton key={i} />;
        })}
      </div>
    </div>
  );
};
*/

import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';
import ProductItem from './ProductItem';

const ProductItems = async () => {
  const latestProducts = await productService.getLatest();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Latest Products</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObj(product)} />
        ))}
      </div>
    </div>
  );
};

// Skeleton loader component
const ProductItemSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-100 shadow-sm">
      <div className="aspect-square w-full animate-pulse bg-gray-200" />
      <div className="p-3">
        <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2">
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Named export for the skeleton loader
export const ProductItemsSkeleton = ({
  qty,
  name,
}: {
  qty: number;
  name: string;
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{name}</h2>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: qty }).map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default ProductItems;