// pages/index.tsx

import React from 'react';
import CategoriesList from '@/components/CategoriesList';
import HeroSection from '@/components/HeroSection';
import Products from '@/components/Products';
import HeadNavigation from '@/components/HeadNavigation';
import Footer from '@/components/Footer';
import Shop from '@/components/shop';
import BottomNavigationBar from '@/components/BottomNav';
import HeroCarousel from '@/components/Courosel';
import BrandSection from '@/components/BrandSection';
import ShaddynaButton from '@/components/ShaddynaButton';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HeadNavigation />
    <div className="px-4 py-0"> {/* Padding added here for the whole page */}
      <div className="hidden lg:block">
        <CategoriesList />
      </div>
      <HeroSection
        title="Welcome to Our Website"
        subtitle="We offer the best products for you."
        imageUrl='https://i.pinimg.com/736x/73/57/6e/73576e43a90f2a098311711b35d20dbe.jpg'
        //imageUrl="https://i.pinimg.com/736x/30/80/d8/3080d8d5f2c890c4f3fde3e9b1645449.jpg" // Replace with your image path
        buttonText="Shop Now"
        buttonLink="/" // Replace with your shop link
      /> 

      <HeroCarousel />
      
      <div className="block lg:hidden">
      <CategoriesList />
      </div>
      <ShaddynaButton loading={false} />
      <h1 className="text-center text-3xl font-semibold text-gray-800 pb-4 pt-2">Our Shops</h1>
      <Shop />
      <Products/>
      <h1 className="text-center text-3xl font-semibold text-gray-800 pb-4">Our Featured Brands</h1>
      <BrandSection />

    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default HomePage;
