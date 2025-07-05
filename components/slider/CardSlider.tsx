/*'use client';

import { useState, useEffect } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface IProducts {
  children: React.ReactNode;
}

const CardSlider = ({ children }: IProducts) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {/* {products.map((product) => (
          <CarouselItem
            key={product.slug}
            className='sm:basis-1/2 md:basis-1/3 lg:basis-1/4'
          >
            <ProductItem product={convertDocToObj(product)} />
          </CarouselItem>
        ))} *
        {children}
      </CarouselContent>
      <CarouselPrevious className='absolute left-4 top-1/2' disabled={false} />
      <CarouselNext className='absolute right-4 top-1/2' disabled={false} />
    </Carousel>
  );
};

export default CardSlider;*/

// components/slider/CardSlider.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface IProducts {
  children: React.ReactNode;
}

const CardSlider = ({ children }: IProducts) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel 
      setApi={setApi} 
      opts={{ 
        loop: true,
        align: 'start', // Better alignment for mobile
        slidesToScroll: 2, // Scroll 2 items at a time on mobile
      }}
      className="relative"
    >
      <CarouselContent className="-ml-2"> {/* Reduced negative margin */}
        {children}
      </CarouselContent>
      <CarouselPrevious 
        className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10" 
        disabled={false} 
      />
      <CarouselNext 
        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10" 
        disabled={false} 
      />
    </Carousel>
  );
};

export default CardSlider;
