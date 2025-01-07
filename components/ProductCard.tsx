import { FC } from 'react';

interface ProductCardProps {
  name: string;
  price: number;
  rating: number;
}

const ProductCard: FC<ProductCardProps> = ({ name, price, rating }) => {
  return (
    <div className="p-6 border-2 border-[#182155] rounded-xl shadow-lg bg-white">
      <h3 className="text-xl font-semibold text-[#182155]">{name}</h3>
      <p className="text-lg text-[#ff199c]">Price: ${price}</p>
      <p className="text-md text-[#182155]">Rating: {rating} stars</p>
    </div>
  );
};

export default ProductCard;
