// Reusable Card Component
import { highlightMatch } from "@/utils/filterProducts";
interface CardProps {
    imgSrc: string;
    name: string;
    highlight: string;
    extra?: string;
  }
  
  const Card: React.FC<CardProps> = ({ imgSrc, name, highlight, extra }) => (
    <div className="border p-4 rounded-lg shadow-md bg-white flex flex-col items-center">
      <img src={imgSrc} alt={name} className="w-20 h-20 object-cover mb-2 rounded-full" />
      <h3 className="text-lg text-gray-800 font-semibold">{highlightMatch(name, highlight)}</h3>
      {extra && <p className="text-gray-600">{extra}</p>}
    </div>
  );
  
  export default Card;
  