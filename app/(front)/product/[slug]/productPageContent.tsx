'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import AddToCart from '@/components/products/AddToCart';
import { Rating } from '@/components/products/Rating';
import { convertDocToObj } from '@/lib/utils';

const ProductPageContent = ({ product, blurDataURL }: any) => {
  const router = useRouter();

  return (
    <div className='my-2 px-4'>
      <div className='my-4'>
        <button onClick={() => router.back()} className='btn'>
          ← Back
        </button>
      </div>
      <div className='grid gap-4 md:grid-cols-4'>
        <div className='relative aspect-square md:col-span-2'>
          <Image
            src={product.image}
            alt={product.name}
            placeholder='blur'
            blurDataURL={blurDataURL}
            width={640}
            height={640}
            sizes='100vw'
            className='h-full w-full object-contain'
          />
        </div>
        <div>
          <ul className='space-y-4'>
            <li><h1 className='text-xl'>{product.name}</h1></li>
            <li>
              <Rating
                value={product.rating}
                caption={`${product.numReviews} ratings`}
              />
            </li>
            <li>{product.brand}</li>
            <li><div className='divider'></div></li>
            <li><p>Description: {product.description}</p></li>
          </ul>
        </div>
        <div>
          <div className='card mt-3 bg-base-300 shadow-xl md:mt-0'>
            <div className='card-body'>
              <div className='flex justify-between'>
                <div>Price</div>
                <div>Ksh {product.price}</div>
              </div>
              <div className='mb-2 flex justify-between'>
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                </div>
              </div>
              {product.countInStock !== 0 && (
                <div className='card-actions justify-center'>
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      qty: 0,
                      color: '',
                      size: '',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageContent;
