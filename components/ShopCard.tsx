import { FC } from 'react';

interface ShopCardProps {
  name: string;
  rating: number;
}

const ShopCard: FC<ShopCardProps> = ({ name, rating }) => {
  return (
    <div className="p-6 border-2 border-[#182155] rounded-xl shadow-lg bg-white">
      <h3 className="text-xl font-semibold text-[#182155]">{name}</h3>
      <p className="text-md text-[#182155]">Shop Rating: {rating} stars</p>
    </div>
  );
};

export default ShopCard;
