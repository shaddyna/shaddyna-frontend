"use client"
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
          {/* Back Button */}
          <BackButton />
        </div>
      {/* Shop Header */}
<div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 mb-8 px-6 sm:px-12 md:px-16">
  {/* Shop Image */}
  <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full shadow-lg border-4 border-[#ff199c]">
    <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
  </div>

  {/* Shop Info */}
<div className="flex flex-col items-start space-y-4 w-full md:w-3/4">
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

{/* Follow Button */}
<div className="w-full md:w-auto flex justify-center md:ml-auto mt-6 md:mt-0">
  <button className="py-3 px-6 sm:py-3 sm:px-8 md:py-2 md:px-6 lg:py-3 lg:px-8 bg-[#ff199c] text-white rounded-xl hover:bg-pink-700 transition-all duration-300 text-sm md:text-md font-semibold shadow-lg transform hover:scale-105">
    Follow Shop
  </button>
</div>
</div>

{/* Shop Products */}
<Products/>
{/* Shop Contacts */}
<div className="mb-10">
  <h2 className="text-2xl sm:text-3xl font-semibold text-[#333333] mb-6">Contact</h2>
  <p className="text-sm sm:text-base text-gray-600">
    Email: <a href={`mailto:${shop.contacts.split(', ')[0]}`} className="text-[#ff199c] hover:underline">{shop.contacts.split(', ')[0]}</a>
  </p>
  <p className="text-sm sm:text-base text-gray-600">Phone: {shop.contacts.split(', ')[1]}</p>
</div>

{/* Shop Reviews */}
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


{/* Add Review Form */}
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




{/* Social Media Links */}
<div className="mt-8 mb-6">
  <h2 className="text-2xl sm:text-3xl font-semibold text-[#182155] mb-4">Follow Us</h2>
  <div className="flex space-x-6 mt-4">
    {/* Facebook */}
    <a 
      href={shop.socialLinks.facebook} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-center text-[#3b5998] hover:text-[#ff199c] transition duration-300 text-lg font-medium space-x-2"
    >
      <FaFacebookF className="text-xl" />
      <span>Facebook</span>
    </a>

    {/* Instagram */}
    <a 
      href={shop.socialLinks.instagram} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-center text-[#e1306c] hover:text-[#ff199c] transition duration-300 text-lg font-medium space-x-2"
    >
      <FaInstagram className="text-xl" />
      <span>Instagram</span>
    </a>

    {/* Twitter */}
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


{/* Related Shops */}
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

export default ShopDetails;
