"use client";

import { useState, useEffect, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, ShoppingBag, ChevronDown, ChevronUp, Search, X, Mail, Phone, Instagram, Facebook, Twitter, Heart, Share2, ArrowLeft, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import NavbarTwo from "@/components/HeaderTwo";
import LuxuryFooter from "@/components/LuxuryFooter";

// Extending the boutique data structure with more details
interface Boutique {
  id: number;
  name: string;
  owner: string;
  location: string;
  rating: number;
  products: number;
  category: string;
  image: string;
  featured: string[];
  description: string;
  contact?: {
    email: string;
    phone: string;
    social: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  };
  hours?: {
    weekdays: string;
    weekends: string;
  };
  policies?: {
    returns: string;
    shipping: string;
  };
  productsList?: {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
  }[];
}

const boutiques: Boutique[] = [
  {
    id: 1,
    name: "Velvet Underground",
    owner: "Sophia Chen",
    location: "Milan, Italy",
    rating: 4.9,
    products: 42,
    category: "Luxury Streetwear",
    image: "https://i.pinimg.com/736x/77/ea/a2/77eaa2802affc0b41489388e2d2bdc2e.jpg",
    featured: [
      "https://i.pinimg.com/736x/8e/3e/6a/8e3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg",
      "https://i.pinimg.com/736x/5a/3e/6a/5a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg",
      "https://i.pinimg.com/736x/9a/3e/6a/9a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg"
    ],
    description: "Cutting-edge streetwear meets Italian craftsmanship. Limited edition drops monthly.",
    contact: {
      email: "contact@velvetunderground.com",
      phone: "+39 02 1234567",
      social: {
        instagram: "@velvetunderground",
        facebook: "VelvetUndergroundMilan",
        twitter: "@VUnderground"
      }
    },
    hours: {
      weekdays: "10:00 AM - 8:00 PM",
      weekends: "11:00 AM - 6:00 PM"
    },
    policies: {
      returns: "14-day return policy",
      shipping: "Worldwide shipping available"
    },
    productsList: [
      {
        id: 101,
        name: "Neon Trench Coat",
        price: "€1,250",
        image: "https://i.pinimg.com/736x/8e/3e/6a/8e3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg",
        category: "Outerwear"
      },
      {
        id: 102,
        name: "Silk Street Hoodie",
        price: "€680",
        image: "https://i.pinimg.com/736x/5a/3e/6a/5a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg",
        category: "Tops"
      },
      {
        id: 103,
        name: "Leather Cargo Pants",
        price: "€890",
        image: "https://i.pinimg.com/736x/9a/3e/6a/9a3e6a6c8a1a9b1e8e3e6a6c8a1a9b1e.jpg",
        category: "Bottoms"
      },
      {
        id: 104,
        name: "Limited Edition Sneakers",
        price: "€950",
        image: "https://i.pinimg.com/736x/70/cf/84/70cf84d4d824e5994022b0f489ef81d9.jpg",
        category: "Footwear"
      }
    ]
  },
  // ... (other boutiques with similar extended data)
];


/*interface PageProps {
  params: {
    id: string;
  };
}

const BoutiqueDetailPage: FC<PageProps> = ({ params }) => {*/

const BoutiqueDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [boutique, setBoutique] = useState<Boutique | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const foundBoutique = boutiques.find(b => b.id === parseInt(params.id));
    if (foundBoutique) {
      setBoutique(foundBoutique);
    } else {
      // Handle boutique not found
      router.push('/boutiques');
    }
  }, [params.id, router]);

  if (!boutique) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
      </div>
    );
  }

  const handleShare = () => {
    setIsShareOpen(!isShareOpen);
    if (navigator.share) {
      navigator.share({
        title: boutique.name,
        text: `Check out ${boutique.name} on our platform`,
        url: window.location.href,
      }).catch(() => setIsShareOpen(true));
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <NavbarTwo />

      {/* Boutique Header */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={boutique.image}
          alt={boutique.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c47]/60 via-[#0f1c47]/30 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 bg-[#0f1c47]/50 hover:bg-[#0f1c47]/70 text-white p-3 rounded-full transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        
        {/* Boutique Title and Actions */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-white">{boutique.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <MapPin className="text-[#bf2c7e]" size={18} />
              <span className="text-white">{boutique.location}</span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-full ${isFavorite ? 'bg-[#bf2c7e] text-black' : 'bg-[#0f1c47]/50 text-white hover:bg-[#0f1c47]/70'}`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-[#0f1c47]/50 text-white hover:bg-[#0f1c47]/70"
              >
                <Share2 size={20} />
              </button>
              
              <AnimatePresence>
                {isShareOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-xl p-3 w-48 z-10"
                  >
                    <p className="text-sm font-medium mb-2">Share via</p>
                    <div className="flex justify-between">
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <Facebook size={20} />
                      </a>
                      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out ${encodeURIComponent(boutique.name)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                        <Twitter size={20} />
                      </a>
                      <a href={`mailto:?subject=${encodeURIComponent(boutique.name)}&body=Check out this boutique: ${encodeURIComponent(window.location.href)}`} className="text-gray-600 hover:text-gray-800">
                        <Mail size={20} />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Boutique Info */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              {/* About Section */}
              <div className="bg-white p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">About {boutique.name}</h2>
                <p className="text-gray-700 mb-6">{boutique.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#bf2c7e]/10 p-2 rounded-lg">
                      <Star className="text-[#bf2c7e]" size={20} fill="#bf2c7e" />
                    </div>
                    <div>
                      <h3 className="font-medium">Rating</h3>
                      <p className="text-gray-600">{boutique.rating}/5 ({Math.floor(boutique.rating * 20)} reviews)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#bf2c7e]/10 p-2 rounded-lg">
                      <ShoppingBag className="text-[#bf2c7e]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Products</h3>
                      <p className="text-gray-600">{boutique.products}+ unique items</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#bf2c7e]/10 p-2 rounded-lg">
                      <MapPin className="text-[#bf2c7e]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-gray-600">{boutique.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Section */}
              <div className="bg-white p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Contact</h2>
                <div className="space-y-4">
                  {boutique.contact?.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="text-gray-500" size={18} />
                      <a href={`mailto:${boutique.contact.email}`} className="text-gray-700 hover:text-[#bf2c7e]">
                        {boutique.contact.email}
                      </a>
                    </div>
                  )}
                  
                  {boutique.contact?.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="text-gray-500" size={18} />
                      <a href={`tel:${boutique.contact.phone}`} className="text-gray-700 hover:text-[#bf2c7e]">
                        {boutique.contact.phone}
                      </a>
                    </div>
                  )}
                  
                  {boutique.contact?.social && (
                    <div className="pt-2">
                      <h3 className="font-medium mb-2">Social Media</h3>
                      <div className="flex gap-4">
                        {boutique.contact.social.instagram && (
                          <a 
                            href={`https://instagram.com/${boutique.contact.social.instagram.replace('@', '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-[#bf2c7e]"
                          >
                            <Instagram size={20} />
                          </a>
                        )}
                        {boutique.contact.social.facebook && (
                          <a 
                            href={`https://facebook.com/${boutique.contact.social.facebook}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-[#bf2c7e]"
                          >
                            <Facebook size={20} />
                          </a>
                        )}
                        {boutique.contact.social.twitter && (
                          <a 
                            href={`https://twitter.com/${boutique.contact.social.twitter.replace('@', '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-[#bf2c7e]"
                          >
                            <Twitter size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Hours & Policies */}
              <div className="bg-white p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Hours & Policies</h2>
                
                {boutique.hours && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Opening Hours</h3>
                    <div className="space-y-1 text-gray-700">
                      <p>Weekdays: {boutique.hours.weekdays}</p>
                      <p>Weekends: {boutique.hours.weekends}</p>
                    </div>
                  </div>
                )}
                
                {boutique.policies && (
                  <div>
                    <h3 className="font-medium mb-2">Policies</h3>
                    <div className="space-y-1 text-gray-700">
                      <p>Returns: {boutique.policies.returns}</p>
                      <p>Shipping: {boutique.policies.shipping}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Navigation Tabs */}
            <div className="border-b border-[#bf2c7e]/20 mb-8">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'products'
                      ? 'border-[#bf2c7e] text-[#bf2c7e]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'about'
                      ? 'border-[#bf2c7e] text-[#bf2c7e]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  About the Boutique
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reviews'
                      ? 'border-[#bf2c7e] text-[#bf2c7e]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Reviews
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div>
              {/* Products Tab */}
              {activeTab === 'products' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {boutique.productsList?.map(product => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        className="bg-white border border-[#bf2c7e]/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                          <button 
                            className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                            onClick={() => setIsFavorite(!isFavorite)}
                          >
                            <Heart 
                              size={18} 
                              className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'} 
                            />
                          </button>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg">{product.name}</h3>
                              <p className="text-gray-500 text-sm">{product.category}</p>
                            </div>
                            <span className="font-bold text-[#bf2c7e]">{product.price}</span>
                          </div>
                          <button className="w-full mt-4 py-2 bg-[#bf2c7e] text-white rounded-lg hover:bg-[#9f2565] transition-colors">
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button className="px-6 py-3 border-2 border-[#bf2c7e] rounded-full font-bold hover:bg-[#bf2c7e] hover:text-white transition-colors">
                      View All {boutique.products} Products
                    </button>
                  </div>
                </div>
              )}
              
              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">The Story</h3>
                    <div className="prose max-w-none text-gray-700">
                      <p>
                        {boutique.description}
                      </p>
                      <p className="mt-4">
                        Founded by {boutique.owner}, {boutique.name} has been redefining luxury fashion since its inception. 
                        With a focus on {boutique.category.toLowerCase()}, the boutique has become a destination for those 
                        seeking unique, high-quality pieces that stand out from mainstream fashion.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">Featured Collection</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {boutique.featured.map((image, index) => (
                        <div key={index} className="relative h-40 rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`Featured ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-4">The Designer</h3>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#bf2c7e]">
                        <img
                          src={boutique.image}
                          alt={boutique.owner}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{boutique.owner}</h4>
                        <p className="text-gray-600 mb-4">Founder & Creative Director</p>
                        <p className="text-gray-700">
                          With over 15 years in the fashion industry, {boutique.owner.split(' ')[0]} has cultivated a unique 
                          aesthetic that blends traditional craftsmanship with contemporary design. Their vision for 
                          {boutique.name} was to create a space where fashion meets art.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-[#bf2c7e]/10 p-4 rounded-full">
                      <Star className="text-[#bf2c7e]" size={32} fill="#bf2c7e" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Average Rating</p>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold">{boutique.rating}</span>
                        <span className="text-gray-500">/5</span>
                        <span className="text-gray-500">({Math.floor(boutique.rating * 20)} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Sample Review 1 */}
                    <div className="border-b border-[#bf2c7e]/20 pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                            <img 
                              src="https://randomuser.me/api/portraits/women/32.jpg" 
                              alt="Reviewer" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium">Emma R.</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-[#bf2c7e]" size={16} fill="#bf2c7e" />
                          <span className="font-medium">5.0</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">
                        Absolutely in love with my purchase from {boutique.name}! The quality is exceptional and the design is 
                        so unique. {boutique.owner.split(' ')[0]} has an incredible eye for detail.
                      </p>
                      <p className="text-sm text-gray-500">Purchased: Neon Trench Coat • 2 weeks ago</p>
                    </div>
                    
                    {/* Sample Review 2 */}
                    <div className="border-b border-[#bf2c7e]/20 pb-6">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                            <img 
                              src="https://randomuser.me/api/portraits/men/45.jpg" 
                              alt="Reviewer" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-medium">James L.</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-[#bf2c7e]" size={16} fill="#bf2c7e" />
                          <Star className="text-[#bf2c7e]" size={16} fill="#bf2c7e" />
                          <Star className="text-[#bf2c7e]" size={16} fill="#bf2c7e" />
                          <Star className="text-[#bf2c7e]" size={16} fill="#bf2c7e" />
                          <Star className="text-gray-300" size={16} />
                          <span className="font-medium">4.0</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">
                        Beautiful pieces, though shipping took longer than expected. The quality makes up for it though. 
                        Will definitely be shopping here again.
                      </p>
                      <p className="text-sm text-gray-500">Purchased: Silk Street Hoodie • 1 month ago</p>
                    </div>
                    
                    <button className="w-full mt-6 py-3 border-2 border-[#bf2c7e] rounded-full font-bold hover:bg-[#bf2c7e] hover:text-white transition-colors">
                      Load More Reviews
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Location Map Section */}
      <div className="bg-[#0f1c47] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Visit Us</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 p-8">
                <h3 className="text-xl font-bold mb-4">Our Location</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#bf2c7e]" size={20} />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">Via Monte Napoleone 8, {boutique.location}</p>
                    </div>
                  </div>
                  
                  {boutique.hours && (
                    <div className="flex items-start gap-4">
                      <div className="bg-[#bf2c7e]/10 p-1 rounded-lg">
                        <Clock className="text-[#bf2c7e]" size={18} />
                      </div>
                      <div>
                        <p className="font-medium">Opening Hours</p>
                        <p className="text-gray-600">Weekdays: {boutique.hours.weekdays}</p>
                        <p className="text-gray-600">Weekends: {boutique.hours.weekends}</p>
                      </div>
                    </div>
                  )}
                  
                  <button className="mt-4 w-full py-3 bg-[#bf2c7e] text-white rounded-lg hover:bg-[#9f2565] transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
              
              <div className="md:w-2/3 h-96">
                {/* Map Placeholder - In a real app, you'd use Google Maps or similar */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto text-[#bf2c7e]" size={40} />
                    <p className="mt-2 font-medium">{boutique.name}</p>
                    <p className="text-gray-600">{boutique.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Boutiques Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Similar Boutiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {boutiques
            .filter(b => b.id !== boutique.id && b.category === boutique.category)
            .slice(0, 3)
            .map(boutique => (
              <motion.div
                key={boutique.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-[#bf2c7e]/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={boutique.image}
                    alt={boutique.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{boutique.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="text-[#bf2c7e]" size={16} />
                    <span className="text-gray-600 text-sm">{boutique.location}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{boutique.description}</p>
                  <button 
                    onClick={() => router.push(`/boutiques/${boutique.id}`)}
                    className="w-full py-2 bg-[#bf2c7e] hover:bg-[#9f2565] text-white font-bold rounded-lg transition-colors"
                  >
                    Visit Boutique
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      <LuxuryFooter />
    </div>
  );
};

export default BoutiqueDetailPage;