"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Heart, Star, ShoppingBag, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { items, addItem } = useCartStore();
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Only run if router is ready and id exists
    if (router.isReady && id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/products/${id}`);
          setProduct(response.data.product);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || 'Failed to fetch product');
          } else if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Failed to fetch product');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [router.isReady, id]);

  const isWishlisted = product ? wishlistItems.some(item => item.id === product._id) : false;

  const toggleWishlist = () => {
    if (!product) return;
    
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        designer: product.designer,
        price: product.price,
        image: product.images[0]
      });
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize) return;
    
    addItem({
      id: product._id,
      name: product.name,
      designer: product.designer,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      stock: product.stock
    });
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="bg-[#bf2c7e]/10 p-4 rounded-full mb-4">
          <ShoppingBag size={40} className="text-[#bf2c7e]" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link href="/collections" passHref>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-[#bf2c7e] hover:bg-[#9f2565] text-white font-bold rounded-full"
          >
            Browse Collections
          </motion.button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleWishlist}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Heart
                  size={24}
                  fill={isWishlisted ? "#bf2c7e" : "none"}
                  className={isWishlisted ? "text-[#bf2c7e]" : "text-gray-700"}
                />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share2 size={24} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 mb-4">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-[#bf2c7e] text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-[#bf2c7e]' : 'border-transparent'}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center">
                  <Star size={20} className="text-[#bf2c7e] fill-[#bf2c7e]" />
                  <span className="ml-1 text-gray-700">{product.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-gray-500 text-lg">{product.designer}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <p className="text-2xl font-bold text-[#bf2c7e]">
                  Ksh {product.price.toLocaleString()}
                </p>
                {product.originalPrice && (
                  <p className="text-gray-400 text-lg line-through">
                    Ksh {product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-[#bf2c7e] mt-1">
                  Save Ksh {(product.originalPrice - product.price).toLocaleString()} (
                  {Math.round((1 - product.price / product.originalPrice) * 100)}%)
                </p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">
                {product.designer} {product.name} is a premium quality product that combines style and functionality.
                Perfect for everyday use while maintaining a sophisticated look.
              </p>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                  {product.category.main}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                  {product.category.sub}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                  {product.category.brand}
                </span>
              </div>
            </div>

            {/* Attributes */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-gray-500">{key}</span>
                    <span className="text-sm font-medium text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <motion.button
                    key={size}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-[#bf2c7e] text-white border-[#bf2c7e]'
                        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="px-3 py-2 text-gray-600 disabled:text-gray-300"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={!!product.stock && quantity >= product.stock}
                  className="px-3 py-2 text-gray-600 disabled:text-gray-300"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {product.stock} available
              </p>
            </div>

            {/* Add to Cart */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full py-3 px-6 rounded-full font-bold flex items-center justify-center gap-2 ${
                selectedSize
                  ? 'bg-[#bf2c7e] hover:bg-[#9f2565] text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingBag size={20} />
              Add to Bag - Ksh {(product.price * quantity).toLocaleString()}
            </motion.button>

            {/* Shop Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Sold by</h3>
              <Link href={`/shops/${product.shop._id}`} className="inline-block">
                <p className="text-[#bf2c7e] hover:underline">{product.shop.name}</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Recommended Products Section */}
        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">You may also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Recommended products would be rendered here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetailPage;