"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Heart, ShoppingCart, ArrowLeft, Star, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useCartStore } from '@/stores/cartStore';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  designer: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  isNew: boolean;
  stock: number;
  category: {
    main: string;
    sub: string;
    brand: string;
  };
  attributes: Record<string, string>;
  shop: {
    _id: string;
    name: string;
  };
  owner?: {
    firstName: string;
    lastName: string;
  };
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const { items: wishlistItems, addItem, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const isWishlisted = wishlistItems.some((item) => item.id === product?._id);
  const itemCount = useCartStore((state) => state.itemCount());
  const router = useRouter();
  
  const handleClick = () => {
    router.push("/cart");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://shaddynab-new.onrender.com/api/products/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError('Failed to fetch product details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const toggleWishlist = () => {
    if (!product) return;
    
    if (isWishlisted) {
      removeItem(product._id);
    } else {
      addItem({
        id: product._id,
        name: product.name,
        designer: product.designer,
        price: product.price,
        image: product.images[0],
      });
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product._id,
      name: product.name,
      designer: product.designer,
      price: product.price,
      image: product.images[0],
      size: selectedSize || "",
      //quantity: quantity,
      stock: product.stock,
    });
  };

  const nextImage = () => {
    if (!product) return;
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    if (!product) return;
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
      </div>
    );
  }
  
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  // Extract available sizes from attributes
  const sizes = product.attributes?.size?.split(',') || [];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header with back button and cart */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <Link href="/products" className="flex items-center text-gray-600 hover:text-[#bf2c7e] transition-colors text-sm sm:text-base">
            <ArrowLeft size={16} className="mr-1 sm:mr-2" />
            Back to Products
          </Link>

          <motion.button
            onClick={handleClick}
            className="md:hidden text-black relative"
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Product Content */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery */}
            <div className="md:w-1/2 relative">
              <div className="relative h-72 sm:h-80 md:h-full overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 sm:p-2 shadow-md hover:bg-[#bf2c7e] hover:text-white transition-colors z-10"
                    >
                      <ChevronLeft className='text-black' size={18} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 sm:p-2 shadow-md hover:bg-[#bf2c7e] hover:text-white transition-colors z-10"
                    >
                      <ChevronRight className='text-black' size={18} />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2 z-10">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                      New
                    </span>
                  )}
                  {product.stock <= 10 && product.stock > 0 && (
                    <span className="bg-amber-500 text-white text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                      {product.stock} left
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex p-2 sm:p-3 md:p-4 space-x-2 overflow-x-auto">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-md overflow-hidden border ${selectedImage === index ? 'border-[#bf2c7e]' : 'border-transparent'}`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-4 sm:p-5 md:p-6 lg:p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">{product.designer}</p>
                </div>

                <button
                  onClick={toggleWishlist}
                  className={`p-1 sm:p-2 rounded-full ${isWishlisted ? 'text-[#bf2c7e]' : 'text-gray-400 hover:text-[#bf2c7e]'}`}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center mt-3 sm:mt-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      className={i < product.rating ? 'text-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mt-4 sm:mt-6">
                <p className="text-xl sm:text-2xl font-bold text-[#bf2c7e]">
                  Ksh {product.price.toLocaleString()}
                </p>
                {product.originalPrice && (
                  <p className="text-base sm:text-lg text-gray-400 line-through">
                    Ksh {product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Shop Info */}
              <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-600">Sold by:</p>
                <p className="font-medium text-sm sm:text-base text-black">{product.shop.name}</p>
                {product.owner && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Owner: {product.owner.firstName} {product.owner.lastName}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-100 text-gray-800 text-xs sm:text-sm rounded-full">
                  {product.category.brand}
                </span>
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-100 text-gray-800 text-xs sm:text-sm rounded-full">
                  {product.category.main}
                </span>
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-100 text-gray-800 text-xs sm:text-sm rounded-full">
                  {product.category.sub}
                </span>
              </div>

              {/* Size Selection */}
              {sizes.length > 0 && (
                <div className="mt-4 sm:mt-6">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-900">Size</h3>
                  <div className="mt-1 sm:mt-2 flex flex-wrap gap-1 sm:gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 sm:px-4 sm:py-2 border rounded-md text-xs sm:text-sm font-medium ${selectedSize === size ? 'bg-[#bf2c7e] text-white border-[#bf2c7e]' : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'}`}
                      >
                        {size.trim()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-4 sm:mt-6">
                <h3 className="text-xs sm:text-sm font-medium text-gray-900">Quantity</h3>
                <div className="mt-1 sm:mt-2 flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 sm:p-2 border border-gray-300 text-black rounded-l-md bg-gray-50 hover:bg-gray-100 text-sm sm:text-base"
                  >
                    -
                  </button>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 text-black border-t border-b border-gray-300 bg-white text-center text-sm sm:text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-1 sm:p-2 border border-gray-300 text-black rounded-r-md bg-gray-50 hover:bg-gray-100 text-sm sm:text-base"
                  >
                    +
                  </button>
                  <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-gray-500">
                    {product.stock} available
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-md sm:rounded-lg font-medium flex items-center justify-center text-sm sm:text-base ${product.stock === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#bf2c7e] hover:bg-[#9f2565] text-white'}`}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>

              {/* Product Attributes */}
              {Object.keys(product.attributes).length > 0 && (
                <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">Product Details</h3>
                  <dl className="mt-2 sm:mt-4 divide-y divide-gray-200">
                    {Object.entries(product.attributes)
                      .filter(([key]) => key !== 'size')
                      .map(([key, value]) => (
                        <div key={key} className="py-3 sm:py-4 grid grid-cols-3 gap-2 sm:gap-4">
                          <dt className="text-xs sm:text-sm font-medium text-gray-500 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </dt>
                          <dd className="text-xs sm:text-sm text-gray-900 col-span-2 capitalize">
                            {value}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}