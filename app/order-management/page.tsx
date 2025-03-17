"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Order, Product } from '@/types/order';
import HeadNavigation from '@/components/HeadNavigation';
import BottomNavigationBar from '@/components/BottomNav';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import Back from '@/components/Back';
import { FaSpinner } from 'react-icons/fa6';
import axios from 'axios';
import { FaArrowLeft, FaEllipsisV, FaPlus, FaSave } from 'react-icons/fa';

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
type PaymentStatus = 'paid' | 'unpaid';
type DeliveryStatus = 'pending' | 'shipped' | 'delivered';

const OrderManagement: React.FC = () => {
 /* const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('https://shaddyna-backend.onrender.com/api/orders/orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: PaymentStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus }),
      });
      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, paymentStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const updateDeliveryStatus = async (orderId: string, deliveryStatus: DeliveryStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryStatus }),
      });
      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, deliveryStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };*/
    const [sellers, setSellers] = useState<Order[]>([]);
    const [newSeller, setNewSeller] = useState({ name: "", status: "" });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [viewSeller, setViewSeller] = useState<Order | null>(null);
    const [editSeller, setEditSeller] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
      const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
      const dropdownRef = useRef<HTMLDivElement>(null);
      const ellipsisRef = useRef<HTMLButtonElement>(null);
  
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
              ellipsisRef.current && !ellipsisRef.current.contains(event.target as Node)) {
            setOpenDropdownId(null);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
    
  
      const handleMenuToggle = (sellerId: string) => {
        setOpenDropdownId(prevId => prevId === sellerId ? null : sellerId);
      };
  
      const modifiedHandleView = (seller: Order) => {
        setViewSeller(seller);
        setOpenDropdownId(null);
      };
    
      const modifiedHandleEdit = (sellerId: string) => {
        handleEdit(sellerId);
        setOpenDropdownId(null);
      };
    
      const modifiedHandleDelete = (sellerId: string) => {
        handleDelete(sellerId);
        setOpenDropdownId(null);
      };
  
  
  
    useEffect(() => {
      const fetchSellers = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            "https://shaddyna-backend.onrender.com/api/orders/orders"
          );
          setSellers(response.data);
        } catch (err: any) {
          setError(err.message || "Failed to fetch sellers.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchSellers();
    }, []);
  
    const handleDelete = async (_id: string) => {
      try {
        await axios.delete(`/api/sellers/${_id}`);
        setSellers(sellers.filter((seller) => seller.id !== _id));
      } catch (err) {
        console.error("Failed to delete seller:", err);
      }
    };
  
    const handleEdit = (_id: string) => {
      const sellerToEdit = sellers.find((seller) => seller.id === _id);
      if (sellerToEdit) {
        setEditSeller(sellerToEdit);
      }
    };
  
    const handleAddSeller = async () => {
      if (!newSeller.name || !newSeller.status) return;
  
      try {
        const response = await axios.post("/api/sellers", newSeller);
        setSellers([...sellers, response.data]);
        setNewSeller({ name: "", status: "" });
        setIsFormVisible(false);
      } catch (err) {
        console.error("Failed to add seller:", err);
      }
    };
  
    const handleBack = () => {
      setViewSeller(null);
      setEditSeller(null);
    };
  
    const handleSaveEdit = async () => {
      if (editSeller) {
        try {
          const response = await axios.put(
            `https://shaddyna-backend.onrender.com/api/sellers/edit/${editSeller.id}`,
            editSeller
          );
          setSellers(
            sellers.map((seller) =>
              seller.id === editSeller.id ? response.data : seller
            )
          );
          setEditSeller(null);
        } catch (err) {
          console.error("Failed to update seller:", err);
        }
      }
    };
  
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'active':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'inactive':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

  return (
    <div className="bg-gray-50 min-h-screen">
    <Back title={"Seller Management"} />
    <div className="container mx-auto p-4 lg:p-6">
      {loading ? (
        <div className="flex min-h-screen justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-[#1a365d]" />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      ) : (
        <>
          {viewSeller ? (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={handleBack}
                className="mb-6 flex items-center text-[#1a365d] hover:text-[#ec4899] transition-colors"
              >
                <FaArrowLeft className="mr-2" /> Back to Sellers
              </button>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{viewSeller.id}</h2>
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(viewSeller.status)}`}>
                    {viewSeller.status}
                  </span>
                </div>
              </div>
            </div>
          ) : editSeller ? (
            <div className="max-w-2xl mx-auto">
              <button
                onClick={handleBack}
                className="mb-6 flex items-center text-[#1a365d] hover:text-[#ec4899] transition-colors"
              >
                <FaArrowLeft className="mr-2" /> Back to Sellers
              </button>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Seller</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editSeller.id}
                      onChange={(e) => setEditSeller({ ...editSeller, id: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={editSeller.status}
                      onChange={(e) => setEditSeller({ ...editSeller, id: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSaveEdit}
                    className="w-full bg-gradient-to-r from-[#1a365d] to-[#ec4899] text-white px-6 py-3 rounded-lg font-medium hover:from-[#172554] hover:to-[#db2777] transition-all"
                  >
                    <FaSave className="inline mr-2" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                {!isFormVisible && (
                  <button
                    onClick={() => setIsFormVisible(true)}
                    className="bg-gradient-to-r from-[#1a365d] to-[#ec4899] text-white px-6 py-3 rounded-lg font-medium hover:from-[#172554] hover:to-[#db2777] transition-all"
                  >
                    <FaPlus className="inline mr-2" /> Add New Seller
                  </button>
                )}
              </div>

              {isFormVisible && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Seller</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={newSeller.name}
                        onChange={(e) => setNewSeller({ ...newSeller, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                        placeholder="Enter seller name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={newSeller.status}
                        onChange={(e) => setNewSeller({ ...newSeller, status: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a365d] focus:border-transparent"
                      >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handleAddSeller}
                        className="flex-1 bg-gradient-to-r from-[#1a365d] to-[#ec4899] text-white px-6 py-3 rounded-lg font-medium hover:from-[#172554] hover:to-[#db2777] transition-all"
                      >
                        Add Seller
                      </button>
                      <button
                        onClick={() => setIsFormVisible(false)}
                        className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sellers.map((seller) => (
                    <div key={seller.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">{seller.id}</h3>
                        <div className="relative">
                          <button 
                            ref={ellipsisRef}
                            onClick={() => handleMenuToggle(seller.id)}
                            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg"
                          >
                            <FaEllipsisV />
                          </button>
                          
                          {openDropdownId === seller.id && (
                            <div 
                              ref={dropdownRef}
                              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-10"
                            >
                              <button
                                onClick={() => modifiedHandleView(seller)}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => modifiedHandleEdit(seller.id)}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => modifiedHandleDelete(seller.id)}
                                className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 text-left"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* ... rest of the card content */}
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(seller.status)}`}>
                          {seller.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
            </>
          )}
        </>
      )}
    </div>
    <Footer />
  </div>
    /*<div>
      <HeadNavigation />
      <div className="bg-gray-50 min-h-screen flex flex-col">
    <div className="container mx-auto p-4">
    <div className="flex items-center justify-between pb-4">
    <BackButton />
    <h1 className="text-3xl font-bold text-[#182155]">
      Admin Order
    </h1>
  </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <div
              key={`${order.id}-${index}`}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
            >
              <h2 className="text-xl font-bold mb-2">Order ID: {String(order.orderId)}</h2>
              <p className="text-sm text-gray-600 mb-1">Seller ID: {String(order.sellerId)}</p>
              <p className="text-sm text-gray-600 mb-1">Shelf ID: {String(order.shelfId)}</p>
              <p className="text-sm text-gray-600 mb-1">
                Products: {order.products.map((product) => product.name).join(', ')}
              </p>
              <p className="text-sm text-gray-600 mb-1">Price: {order.products[0]?.price ?? 0}</p>
              <p className="text-sm text-gray-600 mb-1">
                Quantity: {order.products.reduce((acc, product) => acc + product.quantity, 0)}
              </p>
              <p className="text-sm text-gray-600 mb-1">Total Amount: {order.amount ?? 0}</p>
              <p className="text-sm text-gray-600 mb-1">MPesa Code: {String(order.mpesaCode ?? 'N/A')}</p>
              <p className="text-sm text-gray-600 mb-1">MPesa Name: {String(order.mpesaName ?? 'N/A')}</p>
              <p className="text-sm text-gray-600 mb-1">MPesa Number: {String(order.mpesaNumber ?? 'N/A')}</p>
              <p className="text-sm text-gray-600 mb-1">Shipping Info: {String(order.shippingInfo ?? 'N/A')}</p>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status:
                </label>
                <select
                  value={order.payment_status}
                  onChange={(e) =>
                    updatePaymentStatus(order.id, e.target.value as PaymentStatus)
                  }
                  className="border px-2 py-1 w-full rounded"
                >
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Status:
                </label>
                <select
                  value={order.delivery_status}
                  onChange={(e) =>
                    updateDeliveryStatus(order.id, e.target.value as DeliveryStatus)
                  }
                  className="border px-2 py-1 w-full rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Status:
                </label>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.id, e.target.value as OrderStatus)
                  }
                  className="border px-2 py-1 w-full rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    <Footer />
    <BottomNavigationBar />
    </div>*/
  );
};

export default OrderManagement;

