

/*import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import { Star, MapPin, ShoppingBag, Mail, Phone, Instagram, Facebook, Twitter, Heart, Share2, Clock } from 'lucide-react';

import shopService from '@/lib/services/shopService';
import productService from '@/lib/services/productService';
import mongoose from 'mongoose';
import AddToCart from '@/components/products/AddToCart'; // Import the AddToCart component

export default async function ShopPage({ params }: { params: { id: string } }) {
  const shop = await shopService.getShopById(params.id);
  if (!shop) notFound();

  const vendorId =
    typeof shop.owner === 'object' && '_id' in shop.owner
      ? (shop.owner as { _id: { toString: () => string } })._id.toString()
      : shop.owner?.toString?.() ?? '';

  if (!mongoose.Types.ObjectId.isValid(vendorId)) {
    console.error('Invalid vendorId:', vendorId);
    throw new Error('Invalid vendor ID');
  }

  const buffer = await fetch(shop.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );
  const { base64 } = await getPlaiceholder(buffer);

  const shopProducts = await productService.getByVendor(vendorId);

  return (
    <div className="bg-white min-h-screen">
 
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <Image
          src={shop.image}
          alt={shop.name}
          placeholder='blur'
          blurDataURL={base64}
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47]/60 via-[#0f1c47]/30 to-transparent" />
        

        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{shop.name}</h1>
            <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
              <MapPin className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-white text-sm sm:text-base">{shop.location}</span>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3">
            <button
              className="p-2 sm:p-3 rounded-full bg-[#0f1c47]/50 text-white hover:bg-[#0f1c47]/70"
            >
              <Heart size={16} className="sm:w-5" />
            </button>
            
            <button
              className="p-2 sm:p-3 rounded-full bg-[#0f1c47]/50 text-white hover:bg-[#0f1c47]/70"
            >
              <Share2 size={16} className="sm:w-5" />
            </button>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-0 sm:py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12">
    
          <div className="lg:w-1/3 space-y-4 sm:space-y-6 md:space-y-8">
      
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">About {shop.name}</h2>
              <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">{shop.description}</p>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-[#bf2c7e]/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                    <ShoppingBag className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-black">Categories</h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                      {shop.categories.map((category, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-0.5 text-black sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-[#bf2c7e]/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                    <Clock className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-black">Established</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {shop.createdAt
                        ? new Date(shop.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-[#bf2c7e]/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                    <MapPin className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-black">Location</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{shop.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
        
            <div className="bg-white pt-0 pl-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">Contact</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                  <a href={`mailto:${shop.contact.email}`} className="text-gray-700 hover:text-[#bf2c7e] text-sm sm:text-base">
                    {shop.contact.email}
                  </a>
                </div>
                
                {shop.contact.phone && (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Phone className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                    <a href={`tel:${shop.contact.phone}`} className="text-gray-700 hover:text-[#bf2c7e] text-sm sm:text-base">
                      {shop.contact.phone}
                    </a>
                  </div>
                )}
                
                {(shop.contact.instagram || shop.contact.facebook || shop.contact.twitter) && (
                  <div className="pt-2">
                    <h3 className="font-medium mb-2 text-sm sm:text-base text-black">Social Media</h3>
                    <div className="flex gap-3 sm:gap-4">
                      {shop.contact.instagram && (
                        <a 
                          href={shop.contact.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-[#bf2c7e]"
                        >
                          <Instagram size={16} className="sm:w-5" />
                        </a>
                      )}
                      {shop.contact.facebook && (
                        <a 
                          href={shop.contact.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-[#bf2c7e]"
                        >
                          <Facebook size={16} className="sm:w-5" />
                        </a>
                      )}
                      {shop.contact.twitter && (
                        <a 
                          href={shop.contact.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-[#bf2c7e]"
                        >
                          <Twitter size={16} className="sm:w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">Hours & Policies</h2>
              
          
              {shop.workingHours && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base text-black">Working Hours</h3>
                  <div className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    {Object.entries(shop.workingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize">{day}:</span>
                        {hours.closed ? (
                          <span className="text-gray-500">Closed</span>
                        ) : (
                          <span>{hours.open} - {hours.close}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
    
              {(shop.policies?.returnPolicy || shop.policies?.shippingPolicy) && (
                <div>
                  <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base text-black">Policies</h3>
                  <div className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    {shop.policies.returnPolicy && (
                      <p className="flex items-center gap-1 sm:gap-2">
                        <span className="font-semibold">Returns:</span> {shop.policies.returnPolicy}
                      </p>
                    )}
                    {shop.policies.shippingPolicy && (
                      <p className="flex items-center gap-1 sm:gap-2">
                        <span className="font-semibold">Shipping:</span> {shop.policies.shippingPolicy}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
   
          <div className="lg:w-2/3">
            <div className="border-b border-[#bf2c7e]/20 mb-4 sm:mb-6 md:mb-8">
              <nav className="-mb-px flex space-x-4 sm:space-x-8">
                <button
                  className="whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm border-[#bf2c7e] text-[#bf2c7e]"
                >
                  Products
                </button>
              </nav>
            </div>
            
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {shopProducts.map((product) => (
                  <div key={product._id} className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-lg font-semibold text-black mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#bf2c7e] font-bold text-lg">Ksh {product.price.toFixed(2)}</span>
                
                      <AddToCart
                        item={{
                          ...product,
                          product: product._id?.toString?.() ?? '',
                          vendor: product.vendor?.toString?.() ?? '',
                          qty: 0,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {shopProducts.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-gray-600 text-sm sm:text-base">No products available in this shop yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}*/

// app/shop/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, ShoppingBag, Mail, Phone, Instagram, Facebook, Twitter, Heart, Share2, Clock } from 'lucide-react';

import shopService from '@/lib/services/shopService';
import productService from '@/lib/services/productService';
import mongoose from 'mongoose';
import ProductItem from '@/components/products/ProductItem';

export default async function ShopPage({ params }: { params: { id: string } }) {
  const shop = await shopService.getShopById(params.id);
  if (!shop) notFound();

  const vendorId =
    typeof shop.owner === 'object' && '_id' in shop.owner
      ? (shop.owner as { _id: { toString: () => string } })._id.toString()
      : shop.owner?.toString?.() ?? '';

  if (!mongoose.Types.ObjectId.isValid(vendorId)) {
    console.error('Invalid vendorId:', vendorId);
    throw new Error('Invalid vendor ID');
  }

  const shopProducts = await productService.getByVendor(vendorId);

  return (
    <div className="bg-white min-h-screen">
      {/* Shop Header */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <Image
          src={shop.image}
          alt={shop.name}
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47]/60 via-[#0f1c47]/30 to-transparent" />
        
        {/* Shop Title and Actions */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{shop.name}</h1>
            <div className="flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
              <MapPin className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-white text-sm sm:text-base">{shop.location}</span>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3">
            <button className="p-2 sm:p-3 rounded-full bg-[#0f1c47]/50 text-white hover:bg-[#0f1c47]/70">
              <Heart size={16} className="sm:w-5" />
            </button>
            <button className="p-2 sm:p-3 rounded-full bg-[#0f1c47]/50 text-white hover:bg-[#0f1c47]/70">
              <Share2 size={16} className="sm:w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12">
          {/* Left Column - Shop Info */}
          <div className="lg:w-1/3 space-y-4 sm:space-y-6 md:space-y-8">
            {/* About Section */}
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">About {shop.name}</h2>
              <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6">{shop.description}</p>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-[#bf2c7e]/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                    <ShoppingBag className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-black">Categories</h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                      {shop.categories.map((category, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-0.5 text-black sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-[#bf2c7e]/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                    <Clock className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-black">Established</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {shop.createdAt
                        ? new Date(shop.createdAt).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="bg-[#bf2c7e]/10 p-1.5 sm:p-2 rounded-md sm:rounded-lg">
                    <MapPin className="text-[#bf2c7e] w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base text-black">Location</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{shop.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Section */}
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-black">Contact</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Mail className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                  <a href={`mailto:${shop.contact.email}`} className="text-gray-700 hover:text-[#bf2c7e] text-sm sm:text-base">
                    {shop.contact.email}
                  </a>
                </div>
                
                {shop.contact.phone && (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Phone className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                    <a href={`tel:${shop.contact.phone}`} className="text-gray-700 hover:text-[#bf2c7e] text-sm sm:text-base">
                      {shop.contact.phone}
                    </a>
                  </div>
                )}
                
                {(shop.contact.instagram || shop.contact.facebook || shop.contact.twitter) && (
                  <div className="pt-2">
                    <h3 className="font-medium mb-2 text-sm sm:text-base text-black">Social Media</h3>
                    <div className="flex gap-3 sm:gap-4">
                      {shop.contact.instagram && (
                        <a 
                          href={shop.contact.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-[#bf2c7e]"
                        >
                          <Instagram size={16} className="sm:w-5" />
                        </a>
                      )}
                      {shop.contact.facebook && (
                        <a 
                          href={shop.contact.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-[#bf2c7e]"
                        >
                          <Facebook size={16} className="sm:w-5" />
                        </a>
                      )}
                      {shop.contact.twitter && (
                        <a 
                          href={shop.contact.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-[#bf2c7e]"
                        >
                          <Twitter size={16} className="sm:w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Products */}
          <div className="lg:w-2/3">
            <div className="border-b border-[#bf2c7e]/20 mb-4 sm:mb-6 md:mb-8">
              <nav className="-mb-px flex space-x-4 sm:space-x-8">
                <button className="whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm border-[#bf2c7e] text-[#bf2c7e]">
                  Products
                </button>
              </nav>
            </div>
            
            <div>
              {shopProducts.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {shopProducts.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-gray-600 text-sm sm:text-base">No products available in this shop yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}