/*

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/models/ProductModel';
import { toast } from 'react-hot-toast';
import useCartService from '@/lib/hooks/useCartStore';
import { useEffect, useState } from 'react';

const ProductItem = ({ product }: { product: Product }) => {
  const { increase } = useCartService();
  const [blurDataURL, setBlurDataURL] = useState<string>('');
  const [imageError, setImageError] = useState(false);

  // Get the first image from the images array or fallback to the main image
  const productImage = product.images?.length > 0 ? product.images[0] : product.image;

  useEffect(() => {
    const fetchBlurData = async () => {
      try {
        // First check if the image URL is valid
        const response = await fetch(productImage, { method: 'HEAD' });
        if (!response.ok) {
          setImageError(true);
          return;
        }

        const blurResponse = await fetch(`https://i.pinimg.com/736x/9b/ca/9b/9bca9beab731e58a8b08854f2c41c8bc.jpg`);
        if (!blurResponse.ok) {
          throw new Error('Failed to fetch blur data');
        }
        const data = await blurResponse.json();
        setBlurDataURL(data.base64);
      } catch (error) {
        console.error('Image processing error:', error);
        setImageError(true);
      }
    };

    fetchBlurData();
  }, [productImage]);

  const addToCartHandler = () => {
    increase({
      product: product._id?.toString() ?? '',
      name: product.name,
      slug: product.slug,
      qty: 1,
      image: productImage, // Use the same image here for consistency
      price: product.price,
      vendor: product.vendor?.toString() ?? '',
    });
    toast.success('Added to cart');
  };

  // Fallback image if the main image fails to load
  const imageSrc = imageError ? '/images/placeholder.jpg' : productImage;

  return (
    <div className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-[#bf2c7e]/50 transition-all duration-300 shadow-sm hover:shadow-md sm:shadow-md sm:hover:shadow-lg">

      <div className="relative h-48 xs:h-56 sm:h-64 overflow-hidden">
        <Link href={`/product/${product.slug}`} className="relative aspect-square h-full w-full">
        <Image
          src={product.image}
          alt={product.name}
          //placeholder='blur'
          //blurDataURL={blurDataURL}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          width={640}
          height={640}
          sizes='100vw'
          className='h-full w-full object-contain'
        />
        </Link>

     
        <div className="absolute top-2 left-2 flex gap-2 z-10">
          {product.countInStock <= 10 && product.countInStock > 0 && (
            <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
              Low Stock
            </span>
          )}
          {product.countInStock === 0 && (
            <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>


      <div className="p-3 sm:p-4">
        <div className="mb-2">
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-500 text-xs mt-1">{product.brand}</p>
        </div>

        <div className="flex items-center mb-2">
        
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="text-sm sm:text-base font-bold text-[#bf2c7e]">
            Ksh {product.price}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`p-2 rounded-full transition-colors ${
                product.countInStock === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-[#bf2c7e] hover:text-white'
              }`}
            >
              <ShoppingCart size={16} />
            </button>
            <Link href={`/product/${product.slug}`}>
              <button className="p-2 bg-gray-100 hover:bg-[#bf2c7e] hover:text-white rounded-full transition-colors">
                <Eye size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;*/

// ProductItem.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/models/ProductModel';
import { toast } from 'react-hot-toast';
import useCartService from '@/lib/hooks/useCartStore';
import { useState } from 'react';

const ProductItem = ({ product }: { product: Product }) => {
  const { increase } = useCartService();
  const [imageError, setImageError] = useState(false);

  const productImage = product.images?.length > 0 ? product.images[0] : product.image;
  const imageSrc = imageError ? '/images/placeholder.jpg' : productImage;

  const addToCartHandler = () => {
    increase({
      product: product._id?.toString() ?? '',
      name: product.name,
      slug: product.slug,
      qty: 1,
      image: imageSrc,
      price: product.price,
      vendor: product.vendor?.toString() ?? '',
    });
    toast.success('Added to cart');
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        </Link>
        
        {/* Stock Badge */}
        {product.countInStock <= 10 && (
          <span className={`absolute top-2 left-2 rounded-full px-2 py-1 text-xs text-white ${
            product.countInStock === 0 ? 'bg-gray-600' : 'bg-pink-600'
          }`}>
            {product.countInStock === 0 ? 'Out of Stock' : 'Low Stock'}
          </span>
        )}
      </div>

      <div className="p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-gray-900">{product.name}</h3>
        </Link>
        <p className="mt-1 text-xs text-gray-500">{product.brand}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-bold text-[#bf2c7e]">Ksh {product.price}</span>
          
          <div className="flex gap-2">
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`rounded-full p-2 transition-colors ${
                product.countInStock === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-[#bf2c7e] hover:text-white'
              }`}
            >
              <ShoppingCart size={16} />
            </button>
            <Link href={`/product/${product.slug}`}>
              <button className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-[#bf2c7e] hover:text-white">
                <Eye size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;