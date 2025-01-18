"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import axios from "axios";
import { FaShoppingCart, FaRegClock, FaCalendarAlt } from "react-icons/fa"; // Adding icons
import Back from "@/components/Back";
import Footer from "@/components/Footer";
import BottomNavigationBar from "@/components/BottomNav";

interface Order {
  _id: string;
  customerId: string;
  customerName: string;
  mpesaCode: string;
  mpesaName: string;
  mpesaNumber: string;
  amount: number;
  shipping_fee: number;
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    additionalInfo?: string;
  };
  products: { name: string; quantity: number }[];
  price: number;
  delivery_status: string;
  payment_status: string;
  date: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { customerId } = useParams(); // Get dynamic parameter from URL

  useEffect(() => {
    if (!customerId) {
      console.error("Customer ID is missing");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://shaddyna-backend.onrender.com/api/orders/orders/customer/${customerId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  // Function to format the date into a human-readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return { formattedDate, time };
  };

  if (loading) return <p className="text-center text-lg text-gray-500">Loading orders...</p>;

  if (!orders.length) return <p className="text-center text-lg text-gray-500">No orders found for this customer.</p>;

  return (
    <div>
      <Back title={"Customer Orders"} />
    <div className="bg-white p-4 min-h-screen">
      <div className="space-y-6">
        {orders.map((order) => {
          const { formattedDate, time } = formatDate(order.date);

          return (
            <div key={order._id} className="border-2 border-[#ff199c] rounded-lg shadow-lg p-3 transition-transform transform ">
              <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl sm:text-xl text-[#182155] font-bold">Order ID: {order._id}</h2>

                <FaShoppingCart className="text-[#ff199c] text-3xl" />
              </div>
              <p className="text-[#182155]">Customer: {order.customerName}</p>
              <p className="text-[#182155]">M-Pesa Code: {order.mpesaCode}</p>
              <p className="text-[#182155]">Total Amount: <span className="font-semibold text-[#ff199c]">Kshs {order.amount}</span></p>

              <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex items-center text-[#182155]">
                {/* Calendar Icon for Date */}
                <FaCalendarAlt className="mr-2 text-lg text-[#ff199c]" />
                <div>
                  <span className="font-semibold text-lg">{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-center text-[#182155]">
                {/* Clock Icon for Time */}
                <FaRegClock className="mr-2 text-lg text-[#ff199c]" />
                <div>
                  <span className="text-lg text-gray-600">{time}</span>
                </div>
              </div>
            </div>       
          </div>

                <div className={`text-sm font-semibold ${order.delivery_status === 'Shipped' ? 'text-green-500' : 'text-red-500'} w-full sm:w-auto`}>
                  Delivery Status: {order.delivery_status}
                </div>
                <div className={`text-sm font-semibold ${order.payment_status === 'Paid' ? 'text-green-500' : 'text-red-500'} w-full sm:w-auto`}>
                  Payment Status: {order.payment_status}
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#182155]">Shipping Info</h3>
              <div className="bg-[#f7f7f7] p-4 rounded-lg shadow-sm text-gray-800">
                <p>{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.postalCode}</p>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#182155]">Products</h3>
              <ul className="list-disc pl-6">
                {order.products.map((product, index) => (
                  <li key={index} className="text-[#182155]">
                    {product.name} (x{product.quantity})
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
    <BottomNavigationBar />
    <Footer />
    </div>
  );
};

export default Orders;
