import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";

const deliveryOptions = [
  {
    id: "standard",
    name: "Standard Delivery",
    price: 0,
  },
  {
    id: "express",
    name: "Express Delivery",
    price: 9.99,
  },
  {
    id: "priority",
    name: "Priority Delivery",
    price: 19.99,
  },
];

export const OrderSummary = () => {
  const { items, totalPrice } = useCartStore();
  const { deliveryMethod } = useCheckoutStore();

  return (
    <div className="bg-white p-6 rounded-xl border border-[#bf2c7e] sticky top-24">
      <h2 className="text-xl font-bold text-[#0f1c47] mb-6">Order Summary</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-[#0f1c47]">{item.name}</h4>
                <p className="text-sm text-[#0f1c47]">
                  Size: {item.size} • Qty: {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-medium text-[#0f1c47]">Ksh {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-[#bf2c7e] my-6"></div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-[#0f1c47]">Subtotal</span>
          <span className="font-medium text-[#0f1c47]">Ksh {totalPrice().toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#0f1c47]">Shipping</span>
          <span className="font-medium text-[#0f1c47]">
            {deliveryMethod
              ? deliveryMethod === "standard"
                ? "Free"
                : `Ksh ${
                    deliveryOptions.find((o) => o.id === deliveryMethod)?.price.toFixed(2)
                  }`
              : "Not selected"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#0f1c47]">Tax</span>
          <span className="font-medium text-[#0f1c47]">Calculated at checkout</span>
        </div>
        <div className="border-t border-[#bf2c7e] my-3"></div>
        <div className="flex justify-between">
          <span className="text-lg font-bold text-[#0f1c47]">Total</span>
          <span className="text-lg font-bold text-[#bf2c7e]">
            Ksh  
            {(
              totalPrice() +
              (deliveryMethod === "standard"
                ? 0
                : deliveryOptions.find((o) => o.id === deliveryMethod)?.price || 0)
            ).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};