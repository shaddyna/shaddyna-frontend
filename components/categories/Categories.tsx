/*import Image from 'next/image';
import Link from 'next/link';
import Handbags from '../../public/images/categories/Handbags.webp';
import Pants from '../../public/images/categories/Pants.webp';
import Shirts from '../../public/images/categories/Shirts.webp'
import images from '../../public/hero6.jpg';

const Categories = () => {
  return (
    <div className="px-0 sm:px-0">
 
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:hidden">
        <Link
          href="/search?category=Shirts"
          className="group relative col-span-2 aspect-[2/1] overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02]"
        >
          <Image
            src={images}
            alt="Collection of shirts"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          <Overlay category="Shirts" />
        </Link>

        <Link
          href="/search?category=Pants"
          className="group relative aspect-square overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02]"
        >
          <Image
            src={Pants}
            alt="Collection of pants"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 767px) 50vw, 25vw"
          />
          <Overlay category="Pants" />
        </Link>

        <Link
          href="/search?category=Handbags"
          className="group relative aspect-square overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02]"
        >
          <Image
            src={Handbags}
            alt="Collection of handbags"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 767px) 50vw, 25vw"
          />
          <Overlay category="Handbags" />
        </Link>
      </div>


      <div className="hidden grid-cols-3 gap-5 md:grid lg:gap-6">
        <Link
          href="/search?category=Shirts"
          className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg transition-all hover:scale-[1.015] hover:shadow-xl"
        >
          <Image
            src={Shirts}
            alt="Collection of shirts"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <Overlay category="Shirts" desktop />
        </Link>

        <Link
          href="/search?category=Pants"
          className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg transition-all hover:scale-[1.015] hover:shadow-xl"
        >
          <Image
            src={Pants}
            alt="Collection of pants"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <Overlay category="Pants" desktop />
        </Link>

        <Link
          href="/search?category=Handbags"
          className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg transition-all hover:scale-[1.015] hover:shadow-xl"
        >
          <Image
            src={Handbags}
            alt="Collection of handbags"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <Overlay category="Handbags" desktop />
        </Link>
      </div>
    </div>
  );
};

const Overlay = ({ category, desktop = false }: { category: string; desktop?: boolean }) => {
  return (
    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${desktop ? 'bg-black/10 hover:bg-black/20' : 'bg-black/20 hover:bg-black/40'}`}>
      <span className={`rounded-full bg-white/90 px-4 py-2 font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all duration-300 ${desktop ? 'text-lg group-hover:scale-110 group-hover:px-5' : 'text-sm group-hover:scale-105 group-hover:px-5 sm:text-base'}`}>
        Shop {category}
      </span>
    </div>
  );
};

export default Categories;*/

import Image from 'next/image';
import Link from 'next/link';
import Handbags from '../../public/images/categories/Handbags.webp';
import Pants from '../../public/images/categories/Pants.webp';
import Shirts from '../../public/images/categories/Shirts.webp';
import images from '../../public/hero6.jpg';

const Categories = () => {
  return (
    <div className="px-0 sm:px-0">
      {/* Mobile Layout (xs and sm) - Horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 md:hidden">
        {/*<div className="flex w-full min-w-[calc(100%-1rem)] flex-shrink-0 gap-3">
          <Link
            href="/search?category=Shirts"
            className="group relative aspect-[2/1] w-full min-w-[calc(100%-0.75rem)] overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02]"
            //className="group relative aspect-square w-40 flex-shrink-0 overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02]"
          >
            <Image
              src={images}
              alt="Collection of shirts"
              fill
              className="object-cover"
              placeholder="blur"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
            <Overlay category="Shirts" />
          </Link>
        </div>*/}
                <Link
          href="/search?category=Pants"
          className="group relative aspect-square w-40 flex-shrink-0 overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02]"
        >
          <Image
            src={Shirts}
            alt="Collection of pants"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 767px) 160px, 25vw"
          />
          <Overlay category="Shirts" />
        </Link>
        
        <Link
          href="/search?category=Pants"
          className="group relative aspect-square w-40 flex-shrink-0 overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02]"
        >
          <Image
            src={Pants}
            alt="Collection of pants"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 767px) 160px, 25vw"
          />
          <Overlay category="Pants" />
        </Link>

        <Link
          href="/search?category=Handbags"
          className="group relative aspect-square w-40 flex-shrink-0 overflow-hidden rounded-xl shadow-md transition-transform hover:scale-[1.02]"
        >
          <Image
            src={Handbags}
            alt="Collection of handbags"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(max-width: 767px) 160px, 25vw"
          />
          <Overlay category="Handbags" />
        </Link>
      </div>

      {/* Desktop Layout (md and above) */}
      <div className="hidden grid-cols-3 gap-5 md:grid lg:gap-6">
        <Link
          href="/search?category=Shirts"
          className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg transition-all hover:scale-[1.015] hover:shadow-xl"
        >
          <Image
            src={Shirts}
            alt="Collection of shirts"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <Overlay category="Shirts" desktop />
        </Link>

        <Link
          href="/search?category=Pants"
          className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg transition-all hover:scale-[1.015] hover:shadow-xl"
        >
          <Image
            src={Pants}
            alt="Collection of pants"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <Overlay category="Pants" desktop />
        </Link>

        <Link
          href="/search?category=Handbags"
          className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg transition-all hover:scale-[1.015] hover:shadow-xl"
        >
          <Image
            src={Handbags}
            alt="Collection of handbags"
            fill
            className="object-cover"
            placeholder="blur"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
          <Overlay category="Handbags" desktop />
        </Link>
      </div>
    </div>
  );
};

const Overlay = ({ category, desktop = false }: { category: string; desktop?: boolean }) => {
  return (
    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${desktop ? 'bg-black/10 hover:bg-black/20' : 'bg-black/20 hover:bg-black/40'}`}>
      <span className={`rounded-full bg-white/90 px-4 py-2 font-medium text-gray-900 shadow-lg backdrop-blur-sm transition-all duration-300 ${desktop ? 'text-lg group-hover:scale-110 group-hover:px-5' : 'text-sm group-hover:scale-105 group-hover:px-5 sm:text-base'}`}>
        {category}
      </span>
    </div>
  );
};

export default Categories;