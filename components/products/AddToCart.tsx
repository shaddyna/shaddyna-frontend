'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import useCartService from '@/lib/hooks/useCartStore';
import  OrderItem  from '@/lib/models/OrderModel';

type OrderItem = {
  product: string;
  name: string;
  slug: string;
  qty: number;
  image: string;
  price: number;
  vendor: string;
};

const AddToCart = ({ item }: { item: OrderItem }) => {
  const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  const addToCartHandler = () => {
    increase(item);
  };

  return existItem ? (
    <div className="flex items-center border border-[#bf2c7e] rounded-full bg-[#bf2c7e]">
      <button
        className="w-8 h-8 flex items-center justify-center text-[#bf2c7e] hover:bg-[#bf2c7e] rounded-l-full transition-colors duration-200"
        type="button"
        onClick={() => decrease(existItem)}
      >
        -
      </button>
      <span className="px-2 text-sm font-medium text-[#bf2c7e] min-w-[1.5rem] text-center">
        {existItem.qty}
      </span>
      <button
        className="w-8 h-8 flex items-center justify-center text-[#bf2c7e] hover:bg-[#bf2c7e] rounded-r-full transition-colors duration-200"
        type="button"
        onClick={() => increase(existItem)}
      >
        +
      </button>
    </div>
  ) : (
    <button
      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-[#bf2c7e] to-[#bf2c7e] hover:from-[#bf2c7e] hover:to-[#bf2c7e] text-white font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200"
      type="button"
      onClick={addToCartHandler}
    >
      <ShoppingCart size={18} strokeWidth={2} />
      Add to cart
    </button>
  );
};

export default AddToCart;