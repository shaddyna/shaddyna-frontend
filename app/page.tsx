// pages/index.tsx

{/*import React from 'react';
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
    <div className="px-4 py-0"> {/* Padding added here for the whole page *
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

export default HomePage;*/}

// pages/index.tsx
import React from 'react';
import CategoriesList from '@/components/CategoriesList';
import HeroSection from '@/components/HeroSection';
import Products from '@/components/Products';
import HeadNavigation from '@/components/HeadNavigation';
import Footer from '@/components/Footer';
import Shop from '@/components/shop';
import HeroCarousel from '@/components/Courosel';
import BrandSection from '@/components/BrandSection';
import ShaddynaButton from '@/components/ShaddynaButton';
import SearchBar from '@/components/Search';
import BottomNav from '@/components/BottomNav';
import HomeFooter from '@/components/FooterHome';

// New Ad Component
const ResponsiveAd: React.FC<{ position: string }> = ({ position }) => {
  return (
    <div className="my-4 mx-auto p-4 bg-white rounded-lg shadow-sm max-w-4xl">
      <div className="text-center text-gray-500 text-sm mb-2">
        Sponsored Content
      </div>
      <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center">
        {/* Replace this div with your actual ad component or integration */}
        <span>Ad Slot ({position})</span>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  // Define your page structure with ad placements
  const pageStructure = [
    // Initial content
    {
      type: 'content',
      component: (
        <div className="hidden lg:block" key="categories-desktop">
          <CategoriesList />
        </div>
      )
    },
    {
      type: 'content',
      component: (
        <HeroSection
          key="hero-section"
          title="Welcome to Our Website"
          subtitle="We offer the best products for you."
          imageUrl='https://i.pinimg.com/736x/73/57/6e/73576e43a90f2a098311711b35d20dbe.jpg'
          buttonText="Shop Now"
          buttonLink="/"
        />
      )
    },
    // First ad after hero section
    { type: 'ad', adId: 'hero_post_1' },

    {
      type: 'content',
      component: <HeroCarousel key="hero-carousel" />
    },
    // Ad after carousel
    { type: 'ad', adId: 'post_carousel' },

    {
      type: 'content',
      component: (
        <div className="block lg:hidden" key="categories-mobile">
          <CategoriesList />
        </div>
      )
    },
    {
      type: 'content',
      component: <ShaddynaButton key="shaddyna-btn" loading={false} />
    },
    {
      type: 'content',
      component: (
        <div key="shop-section">
          {/*<h1 className="text-center text-3xl font-semibold text-gray-800 pb-4 pt-2">
            Our Shops
          </h1>*/}
          <Shop />
        </div>
      )
    },
    // Ad after shop section
    { type: 'ad', adId: 'post_shop' },
    {
      type: 'content',
      component: <Products key="products" />
    },
    {
      type: 'content',
      component: (
        <div key="brand-section">
          <h1 className="text-center text-3xl font-semibold text-gray-800 pb-4">
            Our Featured Brands
          </h1>
          <BrandSection />
        </div>
      )
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <HeadNavigation />
      <SearchBar />
      <div className="px-4 py-0">
        {pageStructure.map((item, index) => {
          if (item.type === 'ad') {
            return <ResponsiveAd 
                     key={`ad-${item.adId}`} 
                     position={item.adId!}  // Non-null assertion since we ensure adId exists
                   />;
          }
          return item.component ? React.cloneElement(item.component, { 
            key: item.component.key || `content-${index}`
          }) : null;
        })}
      </div>
      <HomeFooter />
      <BottomNav />
    </div>
  );
};

export default HomePage;
