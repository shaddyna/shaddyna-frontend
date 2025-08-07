/*'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import useSWR from 'swr';
import { ChevronDown, Moon, ShoppingCart, Sun, Search as SearchIcon, User, LayoutDashboard, History, LogOut, AlignJustify } from 'lucide-react';
import { motion } from 'framer-motion';

import useCartService from '@/lib/hooks/useCartStore';
import useLayoutService from '@/lib/hooks/useLayout';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const SearchBox = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const router = useRouter();

  const [formCategory, setFormCategory] = useState(category);
  const [formQuery, setFormQuery] = useState(q);

  const { data: categories, error, isLoading } = useSWR('/api/products/categories');

  if (error) return <div className="text-[#bf2c7e]">{error.message}</div>;
  if (isLoading) return <div className="skeleton h-10 w-64 rounded-full"></div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?category=${formCategory}&q=${formQuery}`);
  };

  return (
<form onSubmit={handleSubmit} className="relative w-full max-w-md">
 
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <SearchIcon className="h-5 w-5 text-gray-400" />
  </div>


  <input
    type="text"
    placeholder="Search products..."
    defaultValue={formQuery}
    onChange={(e) => setFormQuery(e.target.value)}
    className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] text-sm"
  />


  <select
    name="category"
    defaultValue={formCategory}
    onChange={(e) => setFormCategory(e.target.value)}
    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none text-sm text-gray-600 appearance-none cursor-pointer"
  >
    <option value="all">All</option>
    {categories?.map((c: string) => (
      <option key={c} value={c}>
        {c}
      </option>
    ))}
  </select>


  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
    <ChevronDown className="w-4 h-4 text-gray-500" />
  </div>
</form>
  );
};

const Menu = () => {
  const { items, init } = useCartService();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useLayoutService();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    init();
  };

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      {/* Theme Toggle *
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-[#bf2c7e]/10 transition-colors"
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-gray-700" />
        ) : (
          <Sun className="w-5 h-5 text-gray-700" />
        )}
   

      <Link href="/cart" className="relative" aria-label="Shopping Cart">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {items.length > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {items.reduce((a, c) => a + c.qty, 0)}
          </motion.span>
        )}
      </Link>

 
      {session && session.user ? (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="flex items-center gap-1 cursor-pointer hover:text-[#bf2c7e] transition-colors">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">{session.user.name}</span>
            <ChevronDown className="w-4 h-4" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 border border-gray-100 mt-2 z-50"
          >
            {session.user.role === 'superAdmin' && (
              <li onClick={handleClick}>
                <Link href="/superadmin/dashboard" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                  <LayoutDashboard className="w-4 h-4" />
                  Super Admin Dashboard
                </Link>
              </li>
            )}
            {session.user.role === 'vendor' && (
              <>
                <li onClick={handleClick}>
                  <Link href={`/vendor/${session.user._id}/dashboard`} className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                    <LayoutDashboard className="w-4 h-4" />
                    Vendor Dashboard
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link href={`/vendor/${session.user._id}/shop`} className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                    <LayoutDashboard className="w-4 h-4" />
                    My Shop
                  </Link>
                </li>
              </>
            )}
              {session.user.role === 'user' && (
              <li onClick={handleClick}>
                <Link href="/become-seller" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                  <LayoutDashboard className="w-4 h-4" />
                  Become a Seller
                </Link>
              </li>
            )}
            <li onClick={handleClick}>
                  <Link href="/skills" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                    <LayoutDashboard className="w-4 h-4" />
                    Skills Marketplace
                  </Link>
                </li>
              <li onClick={handleClick}>
                <Link href="/inquiries" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                  <History className="w-4 h-4" />
                  Skill Inquiries
                </Link>
              </li>
              <li onClick={handleClick}>
              <Link href="/order-history" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                <History className="w-4 h-4" />
                Order history
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/profile" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                <User className="w-4 h-4" />
                Profile
              </Link>
            </li>
            <li onClick={handleClick}>
              <button 
                type="button" 
                onClick={signOutHandler}
                className="flex items-center gap-2 text-[#bf2c7e] hover:bg-red-50 w-full text-left px-4 py-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button
          className="px-4 py-2 rounded-full bg-[#bf2c7e] hover:bg-[#0f1c47] text-white font-medium transition-colors"
          type="button"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
      
          <div className="flex items-center gap-4">
            {/*<button className="md:hidden p-2 rounded-full hover:bg-[#bf2c7e]/10">
              <AlignJustify className="w-5 h-5 text-gray-700" />
        
            <Link href="/" className="text-xl font-bold text-[#bf2c7e]">
              Shaddyna
            </Link>
          </div>

      
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <SearchBox />
          </div>

        
          <Menu />

        
          <button 
            className="md:hidden p-2 rounded-full hover:bg-[#bf2c7e]/10"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <SearchIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>

      {searchOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden my-2"
          >
            <SearchBox />
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;*/

"use client"
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import useSWR from 'swr';
import { ChevronDown, Moon, ShoppingCart, Sun, Search as SearchIcon, User, LayoutDashboard, History, LogOut, AlignJustify, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import useCartService from '@/lib/hooks/useCartStore';
import useLayoutService from '@/lib/hooks/useLayout';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const SearchBox = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  const router = useRouter();

  const [formCategory, setFormCategory] = useState(category);
  const [formQuery, setFormQuery] = useState(q);

  const { data: categories, error, isLoading } = useSWR('/api/products/categories');

  if (error) return <div className="text-[#bf2c7e]">{error.message}</div>;
  if (isLoading) return <div className="skeleton h-10 w-64 rounded-full"></div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?category=${formCategory}&q=${formQuery}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search products..."
        defaultValue={formQuery}
        onChange={(e) => setFormQuery(e.target.value)}
        className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] text-sm"
      />

      {/* Select Dropdown */}
      <select
        name="category"
        defaultValue={formCategory}
        onChange={(e) => setFormCategory(e.target.value)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none text-sm text-gray-600 appearance-none cursor-pointer"
      >
        <option value="all">All</option>
        {categories?.map((c: string) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Chevron Icon */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </form>
  );
};

const UserMenu = ({ session, signOutHandler, handleClick }: { 
  session: any, 
  signOutHandler: () => void, 
  handleClick: () => void 
}) => (
  <div className="dropdown dropdown-end">
    <label tabIndex={0} className="flex items-center gap-1 cursor-pointer hover:text-[#bf2c7e] transition-colors">
      <User className="w-5 h-5" />
      <span className="hidden sm:inline font-medium">{session.user.name}</span>
      <ChevronDown className="w-4 h-4" />
    </label>
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 border border-gray-100 mt-2 z-50"
    >
      {session.user.role === 'superAdmin' && (
        <li onClick={handleClick}>
          <Link href="/superadmin/dashboard" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
            <LayoutDashboard className="w-4 h-4" />
            Super Admin Dashboard
          </Link>
        </li>
      )}
      {session.user.role === 'vendor' && (
        <>
          <li onClick={handleClick}>
            <Link href={`/vendor/${session.user._id}/orders`} className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
              <LayoutDashboard className="w-4 h-4" />
              Vendor Dashboard
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link href={`/vendor/${session.user._id}/shop`} className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
              <LayoutDashboard className="w-4 h-4" />
              My Shop
            </Link>
          </li>
        </>
      )}
      {session.user.role === 'user' && (
        <li onClick={handleClick}>
          <Link href="/become-seller" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
            <LayoutDashboard className="w-4 h-4" />
            Become a Seller
          </Link>
        </li>
      )}
      {/*<li onClick={handleClick}>
        <Link href="/skills" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
          <LayoutDashboard className="w-4 h-4" />
          Skills Marketplace
        </Link>
      </li>
      <li onClick={handleClick}>
        <Link href="/inquiries" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
          <History className="w-4 h-4" />
          Skill Inquiries
        </Link>
      </li>*/}
      <li onClick={handleClick}>
        <Link href="/order-history" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
          <History className="w-4 h-4" />
          Order history
        </Link>
      </li>
      <li>
        <Link href="" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
          <DollarSign className="w-4 h-4" />
          Sell Shaddyna
        </Link>
      </li>
      <li onClick={handleClick}>
        <Link href="/profile" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
          <User className="w-4 h-4" />
          Profile
        </Link>
      </li>
      <li onClick={handleClick}>
        <button 
          type="button" 
          onClick={signOutHandler}
          className="flex items-center gap-2 text-[#bf2c7e] hover:bg-red-50 w-full text-left px-4 py-2"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </li>
    </ul>
  </div>
);

const CartIcon = ({ items }: { items: any[] }) => (
  <Link href="/cart" className="relative" aria-label="Shopping Cart">
    <ShoppingCart className="w-6 h-6 text-gray-700" />
    {items.length > 0 && (
      <motion.span 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
      >
        {items.reduce((a, c) => a + c.qty, 0)}
      </motion.span>
    )}
  </Link>
);

const SignInButton = () => (
  <button
    className="px-4 py-2 rounded-full bg-[#bf2c7e] hover:bg-[#0f1c47] text-white font-medium transition-colors text-sm sm:text-base"
    type="button"
    onClick={() => signIn()}
  >
    Sign in
  </button>
);

const Menu = () => {
  const { items, init } = useCartService();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useLayoutService();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    init();
  };

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
      {/* Cart */}
      <CartIcon items={items} />

      {/* User Menu or Sign In */}
      {session?.user ? (
        <UserMenu session={session} signOutHandler={signOutHandler} handleClick={handleClick} />
      ) : (
        <SignInButton />
      )}
    </div>
  );
};

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*<div className="flex justify-between items-center h-16">
          {/* Logo and mobile menu button *
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-[#bf2c7e]">
              Shaddyna
            </Link>
          </div>

          {/* Desktop Search - Hidden on mobile *
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <SearchBox />
          </div>

          {/* User menu and cart *
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {/* Mobile search button *
            <button 
              className="md:hidden p-2 rounded-full hover:bg-[#bf2c7e]/10"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5 text-gray-700" />
            </button>

            {/* Menu *
            <Menu />
          </div>
        </div>*/}
            <div className="flex justify-between items-center h-16">
      {/* Logo and mobile menu button */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/shaddyna4.png"
            alt="Shaddyna Logo"
            width={120}
            height={60}
            priority
          />
        </Link>
      </div>

      {/* Desktop Search - Hidden on mobile */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <SearchBox />
      </div>

      {/* User menu and cart */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        {/* Mobile search button */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-[#bf2c7e]/10"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="Search"
        >
          <SearchIcon className="w-5 h-5 text-gray-700" />
        </button>

        {/* Menu */}
        <Menu />
      </div>
    </div>

        {/* Mobile search - appears when searchOpen is true */}
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden my-2"
          >
            <SearchBox />
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;