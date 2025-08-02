/*'use client';

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
        
        {/* Stock Badge *
        {product.countInStock <= 10 && (
          <span className={`absolute top-2 left-2 rounded-full px-2 py-1 text-xs text-white ${
            product.countInStock === 0 ? 'bg-gray-600' : 'bg-[#bf2c7e]'
          }`}>
            {product.countInStock === 0 ? 'Out of Stock' : 'Low Stock'}
          </span>
        )}
      </div>

      <div className="p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-md font-medium text-gray-900">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-md font-bold text-[#bf2c7e]">Ksh {product.price}</span>
          
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

export default ProductItem;*/

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

  // Always use the main image field, fallback to placeholder if error
  const imageSrc = imageError ? '/images/placeholder.jpg' : product.image;

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
            product.countInStock === 0 ? 'bg-gray-600' : 'bg-[#bf2c7e]'
          }`}>
            {product.countInStock === 0 ? 'Out of Stock' : 'Low Stock'}
          </span>
        )}
      </div>

      <div className="p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-md font-medium text-gray-900">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-md font-bold text-[#bf2c7e]">Ksh {product.price}</span>
          
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