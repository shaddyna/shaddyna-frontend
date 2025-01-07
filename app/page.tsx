// pages/index.tsx

import React from 'react';
import CategoriesList from '@/components/CategoriesList';
import HeroSection from '@/components/HeroSection';
import Products from '@/components/Products';
import HeadNavigation from '@/components/HeadNavigation';
import Footer from '@/components/Footer';
import Shop from '@/components/shop';
import BottomNavigationBar from '@/components/BottomNav';

const HomePage: React.FC = () => {
  return (
    <div>
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
        buttonLink="/shop" // Replace with your shop link
      /> 
      
      <div className="block lg:hidden">
      <CategoriesList />
      </div>
      <Shop />
      <Products/>
      
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>
  );
};

export default HomePage;
