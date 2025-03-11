/*import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MiniCartItem } from "@/types/products";

interface MiniCartProps {
  items: MiniCartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, amount: number) => void;
  onSubmit: () => void;
}

export const MiniCart: React.FC<MiniCartProps> = ({
  items,
  onRemove,
  onQuantityChange,
  onSubmit,
}) => (
  <div className="fixed right-4 bottom-20 bg-white rounded-lg shadow-xl p-4 w-80 max-h-[60vh] overflow-y-auto border border-gray-100 z-50">
    <h3 className="text-lg font-bold mb-4">Mini Cart</h3>
    {items.length === 0 ? (
      <p className="text-gray-500 text-center">Your mini cart is empty</p>
    ) : (
      <>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{item.name}</h4>
              <p className="text-gray-600">Kes {item.price}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => onQuantityChange(item.id, -1)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <FaMinus size={12} />
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => onQuantityChange(item.id, 1)}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold mb-4">
            <span>Total:</span>
            <span>
              Kes{" "}
              {items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
            </span>
          </div>
          <button
            onClick={onSubmit}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add All to Cart
          </button>
        </div>
      </>
    )}
  </div>
);*/

import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MiniCartItem } from "@/types/products";

interface MiniCartProps {
  items: MiniCartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, amount: number) => void;
  onSubmit: () => void;
  onClose: () => void; // New prop for closing the cart
}

export const MiniCart: React.FC<MiniCartProps> = ({
  items,
  onRemove,
  onQuantityChange,
  onSubmit,
  onClose, // Added onClose prop
}) => (
  <div className="fixed right-4 bottom-20 bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl p-5 w-80 max-h-[60vh] overflow-y-auto border border-gray-200 z-50">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-bold text-gray-800">Mini Cart</h3>
      {items.length === 0 && (
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-600 text-lg font-bold transition"
        >
          ×
        </button>
      )}
    </div>
    {items.length === 0 ? (
      <p className="text-gray-500 text-center">Your mini cart is empty</p>
    ) : (
      <>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-4 border-b pb-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg shadow-sm"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-gray-700">{item.name}</h4>
              <p className="text-gray-600 text-sm">Kes {item.price}</p>
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => onQuantityChange(item.id, -1)}
                  className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-gray-200 transition"
                >
                  <FaMinus size={14} />
                </button>
                <span className="w-6 text-center font-semibold text-gray-700">{item.quantity}</span>
                <button
                  onClick={() => onQuantityChange(item.id, 1)}
                  className="text-gray-500 hover:text-blue-600 p-1 rounded-full hover:bg-gray-200 transition"
                >
                  <FaPlus size={14} />
                </button>
              </div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700 text-lg"
            >
              ×
            </button>
          </div>
        ))}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold mb-4 text-gray-800">
            <span>Total:</span>
            <span>
              Kes {items.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onSubmit}
            className="w-full bg-[#0f1c47] text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Add All to Cart
          </button>
        </div>
      </>
    )}
  </div>
);
