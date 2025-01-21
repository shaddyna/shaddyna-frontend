/*"use client"
import BackButton from '@/components/BackButton';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import Products from '@/components/Products';
import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const ShopDetails: React.FC = () => {
  const [reviews, setReviews] = useState([
    { user: 'Jane Doe', rating: 5, comment: 'Amazing sneakers, loved the quality!' },
    { user: 'John Smith', rating: 4, comment: 'Great selection, but delivery took a bit long.' },
  ]);
  
  const [newReview, setNewReview] = useState({
    user: '',
    rating: 0,
    comment: '',
  });

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.user && newReview.rating && newReview.comment) {
      setReviews([
        ...reviews,
        { user: newReview.user, rating: Number(newReview.rating), comment: newReview.comment },
      ]);
      setNewReview({ user: '', rating: 0, comment: '' }); // Reset form
    } else {
      alert('Please fill in all fields');
    }
  };

  const shop = {
    id: '1',
    name: 'Stylish Sneakers Shop',
    location: 'New York, USA',
    image: 'https://i.pinimg.com/236x/fa/c5/71/fac571b9e25da30a89669e8848bb41db.jpg',
    description: 'A shop specializing in stylish sneakers for every occasion.',
    rating: 4.5,
    productsCount: 120,
    joinDate: '2022-05-15',
    contacts: 'contact@stylishsneakers.com, (123) 456-7890',
    successfulSalesCount: 450, // New field for successful sales count
    products: [
      { name: 'Sneaker 1', price: '$50', image: 'https://via.placeholder.com/150' },
      { name: 'Sneaker 2', price: '$70', image: 'https://via.placeholder.com/150' },
      { name: 'Sneaker 3', price: '$90', image: 'https://via.placeholder.com/150' },
      { name: 'Sneaker 4', price: '$120', image: 'https://via.placeholder.com/150' },
    ],
    socialLinks: {
      facebook: 'https://facebook.com/stylishsneakers',
      instagram: 'https://instagram.com/stylishsneakers',
      twitter: 'https://twitter.com/stylishsneakers',
    },
  };

  const relatedShops = [
    { name: 'Elegant Watches', image: 'https://i.pinimg.com/236x/3d/bd/88/3dbd885b326e461ae2cdc39f0e610edf.jpg' },
    { name: 'Casual Clothing Store', image: 'https://i.pinimg.com/236x/57/62/e7/5762e7b853030df4ed346844b99e3f62.jpg' },
    { name: 'Premium Tech Gadgets', image: 'https://i.pinimg.com/236x/52/46/d6/5246d62865736d91905f64d32556ba0f.jpg' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">

    <HeadNavigation />
    <div className="container mx-auto p-6">
    <div className="flex items-center justify-start mb-8 px-0">
          {/* Back Button *
          <BackButton />
        </div>
      {/* Shop Header *
<div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-8 px-6 sm:px-12 md:px-16">
  {/* Shop Image *
  <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full shadow-lg border-4 border-[#ff199c]">
    <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
  </div>
  {/* Shop Info *
<div className="flex flex-col items-start space-y-2 w-full md:w-3/4">
  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">
    {shop.name}
  </h1>
  <p className="text-base sm:text-lg text-gray-600 font-medium">{shop.location}</p>
  <p className="text-sm sm:text-base text-gray-500 mt-2">{shop.description}</p>

  <div className="flex items-center mt-4 space-x-4">
    <span className="text-yellow-500 text-xl sm:text-2xl">⭐ {shop.rating}</span>
    <span className="text-sm sm:text-base text-gray-500">({shop.productsCount} Products)</span>
  </div>

  <div className="mt-4 space-y-2">
    <p className="text-sm sm:text-base text-gray-500">
      <span className="font-semibold">Joined on:</span> {new Date(shop.joinDate).toLocaleDateString()}
    </p>
    <p className="text-sm sm:text-base text-gray-500">
      <span className="font-semibold">Successful Sales:</span> {shop.successfulSalesCount}
    </p>
  </div>
</div>

{/* Follow Button *
<div className="w-full md:w-auto flex justify-center md:ml-auto mt-6 md:mt-0">
  <button className="py-3 px-6 sm:py-3 sm:px-8 md:py-2 md:px-6 lg:py-3 lg:px-8 bg-[#ff199c] text-white rounded-xl hover:bg-pink-700 transition-all duration-300 text-sm md:text-md font-semibold shadow-lg transform hover:scale-105">
    Follow Shop
  </button>
</div>
</div>

{/* Shop Products *
<Products/>
{/* Shop Contacts *
<div className="mb-10">
  <h2 className="text-2xl sm:text-3xl font-semibold text-[#333333] mb-6">Contact</h2>
  <p className="text-sm sm:text-base text-gray-600">
    Email: <a href={`mailto:${shop.contacts.split(', ')[0]}`} className="text-[#ff199c] hover:underline">{shop.contacts.split(', ')[0]}</a>
  </p>
  <p className="text-sm sm:text-base text-gray-600">Phone: {shop.contacts.split(', ')[1]}</p>
</div>

{/* Shop Reviews *
<div className="mb-12">
  <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mb-6 mt-8">Customer Reviews</h2>
  <div className="space-y-8">
    {reviews.map((review, index) => (
      <div key={index} className="border-b border-gray-300 pb-6">
        <p className="font-semibold text-[#182155] text-lg">{review.user}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500 text-xl">{`⭐ ${review.rating}`}</span>
        </div>
        <p className="text-[#182155] mt-2 text-base">{review.comment}</p>
      </div>
    ))}
  </div>
</div>


{/* Add Review Form *
<div>
  <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mt-8 mb-6">Add Your Review</h2>
  <form onSubmit={handleSubmitReview} className="space-y-6">
    <input
      type="text"
      name="user"
      value={newReview.user}
      onChange={handleReviewChange}
      placeholder="Your Name"
      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#ff199c] focus:ring-2 focus:outline-none placeholder:text-[#ff199c] text-[#182155]"
    />
    <input
      type="number"
      name="rating"
      value={newReview.rating}
      onChange={handleReviewChange}
      placeholder="Rating (1-5)"
      min="1"
      max="5"
      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#ff199c] focus:ring-2 focus:outline-none placeholder:text-[#ff199c] text-[#182155]"
    />
    <textarea
      name="comment"
      value={newReview.comment}
      onChange={handleReviewChange}
      placeholder="Your Review"
      rows={4}
      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#ff199c] focus:ring-2 focus:outline-none placeholder:text-[#ff199c] text-[#182155]"
    />
    <button
      type="submit"
      className="w-full py-3 bg-[#182155] text-white rounded-lg hover:bg-[#e61c8d] transition duration-300 text-lg font-semibold shadow-md transform hover:scale-105"
    >
      Submit Review
    </button>
  </form>
</div>




{/* Social Media Links *
<div className="mt-8 mb-6">
  <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mb-4">Follow Us</h2>
  <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 mt-4">
  {/* Facebook *
  <a 
    href={shop.socialLinks.facebook} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center text-[#3b5998] hover:text-[#ff199c] transition duration-300 text-lg font-medium space-x-2"
  >
    <FaFacebookF className="text-xl" />
    <span>Facebook</span>
  </a>

  {/* Instagram *
  <a 
    href={shop.socialLinks.instagram} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center text-[#e1306c] hover:text-[#ff199c] transition duration-300 text-lg font-medium space-x-2"
  >
    <FaInstagram className="text-xl" />
    <span>Instagram</span>
  </a>

  {/* Twitter *
  <a 
    href={shop.socialLinks.twitter} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center text-[#1da1f2] hover:text-[#ff199c] transition duration-300 text-lg font-medium space-x-2"
  >
    <FaTwitter className="text-xl" />
    <span>Twitter</span>
  </a>
</div>

</div>


{/* Related Shops *
<h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mb-6 mt-8">Related Shops</h2>
<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 overflow-x-auto py-2">
  {relatedShops.map((relatedShop, index) => (
    <div key={index} className="max-w-xs w-full p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <img 
        src={relatedShop.image} 
        alt={relatedShop.name} 
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <p className="text-center text-[#182155] font-semibold text-lg sm:text-xl lg:text-2xl">{relatedShop.name}</p>
    </div>
  ))}
</div>



    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default ShopDetails;*/






/*"use client";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";

interface Shop {
  id: string;
  name: string;
  sellerId: string;
}

const ShopDetails = ({ params }: { params: {
  [x: string]: any; id: string 
} }) => {
  const [shop, setShop] = useState<Shop | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paramId, setParamId] = useState<string | null>(null);

  useEffect(() => {
    // Assuming params is a Promise, we unwrap it asynchronously
    if (params) {
      params.then((unwrappedParams: { id: SetStateAction<string | null>; }) => {
        setParamId(unwrappedParams.id);
      });
    }
  }, [params]);

  useEffect(() => {
    if (paramId) {
      axios
        .get(`https://shaddyna-backend.onrender.com/api/shops/${paramId}`)
        .then((response) => {
          setShop(response.data.shop);
          setLoading(false);
        })
        .catch((err) => {
          setError("Error fetching shop details");
          setLoading(false);
        });
    }
  }, [paramId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!shop) return <div>Shop not found</div>;

  return (
    <div>
      <h1>{shop.name}</h1>
      {/* Render other shop details *
    </div>
  );
};

export default ShopDetails;*/





/*"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '@/components/BackButton';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import Products from '@/components/Products';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import Back from '@/components/Back';

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Shop {
  _id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  productsCount: number;
  joinDate: string;
  contacts: string;
  successfulSalesCount: number;
  products: Array<{ name: string; price: string; image: string }>;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

const ShopDetails: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: '', rating: 0, comment: '' });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const shopId = window.location.pathname.split('/').pop(); // Assuming the shop ID is part of the URL path

  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await axios.get(`https://shaddyna-backend.onrender.com/api/shops/${shopId}`);
        setShop(response.data.shop);
        setReviews(response.data.reviews); // Assuming reviews are part of the response
      } catch (err) {
        setError('Failed to fetch shop details');
      } finally {
        setLoading(false);
      }
    };

    if (shopId) {
      fetchShopDetails();
    }
  }, [shopId]);

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.user && newReview.rating && newReview.comment) {
      setReviews([...reviews, { ...newReview, rating: Number(newReview.rating) }]);
      setNewReview({ user: '', rating: 0, comment: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !shop) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Back title={'Shop details'} />
      <div className="container mx-auto p-6">
        {/* Shop Header *
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-8 px-6 sm:px-12 md:px-16">
          <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full shadow-lg border-4 border-[#ff199c]">
            <img src={shop.image || 'https://via.placeholder.com/150'} alt={shop.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col items-start space-y-2 w-full md:w-3/4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">{shop.name}</h1>
            <p className="text-base sm:text-lg text-gray-600 font-medium">{shop.location}</p>
            <p className="text-sm sm:text-base text-gray-500 mt-2">{shop.description}</p>

            <div className="flex items-center mt-4 space-x-4">
              <span className="text-yellow-500 text-xl sm:text-2xl">⭐ {shop.rating}</span>
              <span className="text-sm sm:text-base text-gray-500">({shop.productsCount} Products)</span>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm sm:text-base text-gray-500">
                <span className="font-semibold">Joined on:</span> {new Date(shop.joinDate).toLocaleDateString()}
              </p>
              <p className="text-sm sm:text-base text-gray-500">
                <span className="font-semibold">Successful Sales:</span> {shop.successfulSalesCount}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-center md:ml-auto mt-6 md:mt-0">
            <button className="py-3 px-6 sm:py-3 sm:px-8 md:py-2 md:px-6 lg:py-3 lg:px-8 bg-[#ff199c] text-white rounded-xl hover:bg-pink-700 transition-all duration-300 text-sm md:text-md font-semibold shadow-lg transform hover:scale-105">
              Follow Shop
            </button>
          </div>
        </div>

        {/* Shop Products *
        <Products 

        {/* Shop Contacts *
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#333333] mb-6">Contact</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Email: {/*<a href={`mailto:${shop.contacts.split(', ')[0]}`} className="text-[#ff199c] hover:underline">{shop.contacts.split(', ')[0]}</a>*
          </p>
          <p className="text-sm sm:text-base text-gray-600">Phone: </p>
        </div>

        {/* Shop Reviews *
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mb-6 mt-8">Customer Reviews</h2>
          <div className="space-y-8">
            {/*{reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-300 pb-6">
                <p className="font-semibold text-[#182155] text-lg">{review.user}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 text-xl">⭐ {review.rating}</span>
                </div>
                <p className="text-[#182155] mt-2 text-base">{review.comment}</p>
              </div>
            ))}*
          </div>
        </div>

        {/* Add Review Form *
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mt-8 mb-6">Add Your Review</h2>
          <form onSubmit={handleSubmitReview} className="space-y-6">
            <input
              type="text"
              name="user"
              value={newReview.user}
              onChange={handleReviewChange}
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#ff199c] focus:ring-2 focus:outline-none placeholder:text-[#ff199c] text-[#182155]"
            />
            <input
              type="number"
              name="rating"
              value={newReview.rating}
              onChange={handleReviewChange}
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#ff199c] focus:ring-2 focus:outline-none placeholder:text-[#ff199c] text-[#182155]"
            />
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleReviewChange}
              placeholder="Your Review"
              rows={4}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-[#ff199c] focus:ring-2 focus:outline-none placeholder:text-[#ff199c] text-[#182155]"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#182155] text-white rounded-lg hover:bg-[#e61c8d] transition duration-300 text-lg font-semibold shadow-md transform hover:scale-105"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Social Media Links *
        <div className="mt-8 mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mb-6">Follow Us</h2>
          <div className="flex space-x-6">
            <a  target="_blank" rel="noopener noreferrer">
              <FaFacebookF size={24} className="text-[#182155]" />
            </a>
            <a  target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} className="text-[#182155]" />
            </a>
            <a target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} className="text-[#182155]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Navigation *
      <BottomNavigationBar />
      <Footer />
    </div>
  );
};

export default ShopDetails;



/*"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserSellerStore } from "@/store/useUserSellerStore"; // Update the import path if necessary

interface Product {
  sellerId: string;
  _id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  shopName?: string;
  rating: number;
}

const ShopDetails: React.FC = () => {
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUser = useUserSellerStore((state) => state.fetchCurrentUser);

  useEffect(() => {
    const initializeSeller = async () => {
      try {
        await fetchCurrentUser();
        const currentUserRole = useUserSellerStore.getState().currentUserRole;

        if (currentUserRole === "seller") {
          const { user, sellers } = useUserSellerStore.getState();
          if (!user) {
            console.error("User is null.");
            return;
          }

          const seller = sellers.find((seller) => seller.email === user.email);
          if (seller) {
            setSellerId(seller._id);
            console.log(`Seller ID set to: ${seller._id}`);

            // Fetch products associated with the seller
            fetchSellerProducts(seller._id);
          } else {
            console.error("No matching seller found for the current user.");
          }
        }
      } catch (error) {
        console.error("An error occurred during seller initialization:", error);
      }
    };

    const fetchSellerProducts = async (sellerId: string) => {
      try {
        const response = await axios.get(
          `https://shaddyna-backend.onrender.com/api/products/all`
        );

        const products = response.data.products; // Ensure products are accessed correctly
        const filteredProducts = products.filter(
          (product: Product) => product.sellerId === sellerId
        );

        setProducts(filteredProducts);
      } catch (err) {
        console.error("Failed to fetch seller products:", err);
        setError("Failed to fetch seller products.");
      } finally {
        setLoading(false);
      }
    };

    initializeSeller();
  }, [fetchCurrentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Seller Products</h1>
      {products.length > 0 ? (
        <div className="products-container">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.images[0]}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found for this seller.</p>
      )}
    </div>
  );
};

export default ShopDetails;*/
"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '@/components/BackButton';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import HeadNavigation from '@/components/HeadNavigation';
import { FaFacebookF, FaHeart, FaInstagram, FaShoppingCart, FaTwitter } from 'react-icons/fa';
import Back from '@/components/Back';
import { useRouter } from "next/navigation";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Shop {
  createdAt: string | number | Date;
  _id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  rating: number;
  productsCount: number;
  joinDate: string;
  contacts: string;
  successfulSalesCount: number;
  products: Array<{ name: string; price: string; image: string }>;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}

interface Product {
  id: string;
  images: string[];   // Array of image URLs (strings)
  _id: string;
  name: string;
  price: number;
  image: string;      // The main image (if you still need it)
  sellerId: string;
  rating: number; 
}


const ShopDetails: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: '', rating: 0, comment: '' });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { items: cartItems, addItem } = useCartStore();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { items: wishlistItems, addItem: addToWishlist } = useWishlistStore();
  

  const shopId = window.location.pathname.split('/').pop(); // Assuming the shop ID is part of the URL path

  useEffect(() => {
    const fetchShopDetails = async () => {
      if (!shopId) return;
  
      try {
        console.log("Fetching shop details for shopId:", shopId);
  
        // Fetch shop details
        const { data: shopResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/shops/${shopId}`
        );
        console.log("Shop Response:", shopResponse);
  
        const { shop: shopData, reviews } = shopResponse;
        const sellerId = shopData?.sellerId?._id || shopData?.sellerId;
  
        setShop(shopData);
        setReviews(reviews);
  
        // Fetch all products
        const { data: productsResponse } = await axios.get(
          `https://shaddyna-backend.onrender.com/api/products/all`
        );
        console.log("Products Response:", productsResponse);

        // Destructure products array safely
        const { products: productsArray } = productsResponse; // Extract products array

        console.log("Destructured Products Array:", productsArray);

        // Check if productsArray is an array
        if (!Array.isArray(productsArray)) {
          throw new Error("Products response is not an array");
        }
  
        // Filter products by sellerId
        const shopProducts = productsArray.filter(
          (product: { sellerId: { toString: () => any } }) =>
            product.sellerId?.toString() === sellerId?.toString()
        );
        console.log("Filtered Shop Products:", shopProducts);
  
        setProducts(shopProducts);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setError("Failed to fetch shop details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchShopDetails();
  }, [shopId]);
  
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.user && newReview.rating && newReview.comment) {
      setReviews([...reviews, { ...newReview, rating: Number(newReview.rating) }]);
      setNewReview({ user: '', rating: 0, comment: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

   const renderStars = (rating: number) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5;
  
      return (
        <>
          {Array.from({ length: fullStars }, (_, i) => (
            <AiFillStar key={i} className="text-yellow-400" />
          ))}
          {halfStar && <AiFillStar className="text-yellow-400" />}
          {Array.from(
            { length: 5 - fullStars - (halfStar ? 1 : 0) },
            (_, i) => (
              <AiOutlineStar key={i} className="text-gray-300" />
            )
          )}
        </>
      );
    };
  
    const handleAddToCart = (product: Product) => {
      const productExists = cartItems.some((item) => item._id === product.id);
  
      if (productExists) {
        setSnackbarMessage("Product already added to cart!");
        return;
      }
  
      const cartItem = {
        _id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0], // Use the first image from the array
        color: "default", // Placeholder for color
        stock: 10, // Placeholder for stock
        sellerId: product.sellerId, // Placeholder for sellerId
      };
  
      addItem(cartItem);
      setSnackbarMessage("Product added to cart!");
    };
  
    const handleWishlistClick = (product: Product) => {
      addToWishlist(product); // Add to the wishlist store
      setSnackbarMessage("Product added to wishlist!");
    };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !shop) {
    return <div>Error: {error}</div>;
  }

  // Inline component for displaying shop products
  const ShopProducts: React.FC<{ products: Product[] }> = ({ products }) => {
    const router = useRouter();
    return (
      <div className="mt-8 pb-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mb-6">Shop Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg shadow-md p-2">
              <img
                src={product.images[0] || "/placeholder-image.png"} // Fallback image if the product has no image
                alt={product.name}
                className="w-full h-36 sm:h-48 object-contain" // object-contain keeps the aspect ratio
                onClick={() => router.push(`/product/${product._id}`)} // Ensure correct ID is passed
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-2">Price: Ksh {product.price}</p>
              <div className="flex items-center mt-2">{renderStars(product.rating)}</div>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#182155] text-white py-1 px-3 sm:py-1.5 sm:px-5 rounded-full font-bold text-xs sm:text-sm shadow-md hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-1"
                >
                  <FaShoppingCart className="text-sm sm:text-base" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleWishlistClick(product)}
                  className="text-[#ff199c] hover:text-red-600 transition-transform transform hover:scale-110 sm:hover:scale-125"
                >
                  <FaHeart size={16} className="sm:size-[20px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Back title={'Shop details'} />
      <div className="container mx-auto p-6">
        {/* Shop Header */}
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-8 px-6 sm:px-12 md:px-16">
          <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full shadow-lg border-4 border-[#ff199c]">
            <img src={shop.image || 'https://via.placeholder.com/150'} alt={shop.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col items-start space-y-2 w-full md:w-3/4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 leading-tight">{shop.name}</h1>
            <p className="text-base sm:text-lg text-gray-600 font-medium">{shop.location}</p>
            <p className="text-sm sm:text-base text-gray-500 mt-2">{shop.description}</p>

            <div className="flex items-center mt-4 space-x-4">
              <span className="text-yellow-500 text-xl sm:text-2xl">⭐ {shop.rating}</span>
              <span className="text-sm sm:text-base text-gray-500">({products.length} Products)</span>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm sm:text-base text-gray-500">
              <span className="font-semibold">Joined on:</span> {new Date(shop.createdAt).toLocaleDateString()}

              </p>
              <p className="text-sm sm:text-base text-gray-500">
                <span className="font-semibold">Successful Sales:</span> {shop.successfulSalesCount}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-center md:ml-auto mt-6 md:mt-0">
            <button className="py-3 px-6 sm:py-3 sm:px-8 md:py-2 md:px-6 lg:py-3 lg:px-8 bg-[#ff199c] text-white rounded-xl hover:bg-pink-700 transition-all duration-300 text-sm md:text-md font-semibold shadow-lg transform hover:scale-105">
              Follow Shop
            </button>
          </div>
        </div>

        {/* Shop Products */}
        <ShopProducts products={products} />

        {/* Shop Contacts */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#333333] mb-0">Contact</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Email: {/*<a href={`mailto:${shop.contacts.split(', ')[0]}`} className="text-[#ff199c] hover:underline">{shop.contacts.split(', ')[0]}</a>*/}
          </p>
          <p className="text-sm sm:text-base text-gray-600">Phone: {/*{shop.contacts.split(', ')[1]}*/}</p>
        </div>

        {/* Shop Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mb-6 mt-8">Customer Reviews</h2>
          <div className="space-y-8">
            {/*{reviews.map((review, index) => (
              <div key={index} className="border-b pb-6 mb-6">
                <p className="text-lg font-semibold text-gray-800">{review.user}</p>
                <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
                <p className="mt-2 text-gray-500">{review.comment}</p>
              </div>
            ))}*/}
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
            <div className="space-y-2">
              <input
                type="text"
                name="user"
                value={newReview.user}
                onChange={handleReviewChange}
                placeholder="Your name"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff199c] transition"
              />
              <input
                type="number"
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                min={1}
                max={5}
                placeholder="Your rating (1-5)"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff199c] transition"
              />
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleReviewChange}
                placeholder="Your review"
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ff199c] transition"
                rows={5}
              ></textarea>
            </div>
            <button type="submit" className="mt-4 w-full py-2 bg-[#ff199c] text-white rounded-lg hover:bg-pink-700 transition">
              Submit Review
            </button>
          </form>
        </div>
      </div>

      <Footer />
      <BottomNavigationBar />
    </div>
  );
};

export default ShopDetails;
