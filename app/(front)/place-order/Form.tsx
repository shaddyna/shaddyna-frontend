/*'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';

const Form = () => {
  const router = useRouter();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  const [vendorGroups, setVendorGroups] = useState<Record<string, any>>({});
  const [paymentCodes, setPaymentCodes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment');
    }
    if (items.length === 0) {
      return router.push('/');
    }

    // Group items by vendor
    const groups: Record<string, any> = {};
    items.forEach((item) => {
      if (!groups[item.vendor]) {
        groups[item.vendor] = {
          items: [],
          total: 0,
        };
      }
      groups[item.vendor].items.push(item);
      groups[item.vendor].total += item.price * item.qty;
    });
    setVendorGroups(groups);
  }, [paymentMethod, router, items]);

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      // Prepare vendor payment confirmations
      const vendorPayments = Object.keys(paymentCodes).map((vendorId) => ({
        vendorId,
        paymentCode: paymentCodes[vendorId],
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items: items.map(item => ({
            ...item,
            vendorPaymentCode: paymentCodes[item.vendor] || '',
          })),
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        clear();
        toast.success('Order placed successfully');
        return router.push(`/order/${data.order._id}`);
      } else {
        toast.error(data.message);
      }
    },
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>Loading...</>;

  return (
    <div>
      <CheckoutSteps current={4} />

      <div className="my-4 grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}{' '}
              </p>
              <div>
                <Link className="btn" href="/shipping">
                  Edit
                </Link>
              </div>
            </div>
          </div>

          {Object.entries(vendorGroups).map(([vendorId, group]) => (
            <div key={vendorId} className="card mt-4 bg-base-300">
              <div className="card-body">
                <h2 className="card-title">Vendor Items</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item: any) => (
                      <tr key={item.slug}>
                        <td>
                          <Link
                            href={`/product/${item.slug}`}
                            className="flex items-center"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                            <span className="px-2">{item.name}</span>
                          </Link>
                        </td>
                        <td>
                          <span>{item.qty}</span>
                        </td>
                        <td>Ksh {item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4">
                  <h3 className="font-semibold">Payment Confirmation</h3>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">M-Pesa Transaction Code</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter M-Pesa code"
                      className="input input-bordered"
                      value={paymentCodes[vendorId] || ''}
                      onChange={(e) =>
                        setPaymentCodes((prev) => ({
                          ...prev,
                          [vendorId]: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <p className="mt-2">Total: Ksh {group.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Order Summary</h2>
              <ul className="space-y-3">
                <li>
                  <div className="flex justify-between">
                    <div>Items</div>
                    <div>Ksh {itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>Tax</div>
                    <div>Ksh {taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>Shipping</div>
                    <div>Ksh {shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>Total</div>
                    <div>Ksh {totalPrice}</div>
                  </div>
                </li>

                <li>
                  <button
                    onClick={() => placeOrder()}
                    disabled={isPlacing}
                    className="btn btn-primary w-full"
                  >
                    {isPlacing && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Place Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;*/


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';

const Form = () => {
  const router = useRouter();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clear,
  } = useCartService();

  const [vendorGroups, setVendorGroups] = useState<Record<string, any>>({});
  const [paymentCodes, setPaymentCodes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!paymentMethod) {
      return router.push('/payment');
    }
    if (items.length === 0) {
      return router.push('/');
    }

    // Group items by vendor
    const groups: Record<string, any> = {};
    items.forEach((item) => {
      if (!groups[item.vendor]) {
        groups[item.vendor] = {
          items: [],
          total: 0,
        };
      }
      groups[item.vendor].items.push(item);
      groups[item.vendor].total += item.price * item.qty;
    });
    setVendorGroups(groups);
  }, [paymentMethod, router, items]);

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    `/api/orders/mine`,
    async (url) => {
      // Prepare vendor payment confirmations
      const vendorPayments = Object.keys(paymentCodes).map((vendorId) => ({
        vendorId,
        paymentCode: paymentCodes[vendorId],
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items: items.map(item => ({
            ...item,
            vendorPaymentCode: paymentCodes[item.vendor] || '',
          })),
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        clear();
        toast.success('Order placed successfully');
        return router.push(`/order/${data.order._id}`);
      } else {
        toast.error(data.message);
      }
    },
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <CheckoutSteps current={4} />

        <div className="mt-8 grid md:grid-cols-4 md:gap-6">
          {/* Left Column - Shipping and Vendor Items */}
          <div className="space-y-6 md:col-span-3">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[#bf2c7e] p-4">
                <h2 className="text-xl font-bold text-white">Shipping Address</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700">{shippingAddress.fullName}</p>
                <p className="text-gray-700 mt-2">
                  {shippingAddress.address}, {shippingAddress.city},{' '}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
                <div className="mt-4">
                  <Link 
                    href="/shipping" 
                    className="inline-block px-4 py-2 border border-[#bf2c7e] text-[#bf2c7e] rounded-lg hover:bg-[#fce7f3] transition-colors"
                  >
                    Edit Address
                  </Link>
                </div>
              </div>
            </div>

            {/* Vendor Items */}
            {Object.entries(vendorGroups).map(([vendorId, group]) => (
              <div key={vendorId} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-[#bf2c7e] p-4">
                  <h2 className="text-xl font-bold text-white">Vendor Items</h2>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {group.items.map((item: any) => (
                          <tr key={item.slug}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Link
                                href={`/product/${item.slug}`}
                                className="flex items-center hover:text-[#bf2c7e] transition-colors"
                              >
                                <div className="flex-shrink-0 h-10 w-10">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={40}
                                    height={40}
                                    className="rounded-md"
                                  />
                                </div>
                                <span className="ml-3">{item.name}</span>
                              </Link>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                              {item.qty}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                              Ksh {item.price.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-[#bf2c7e] mb-3">Payment Confirmation</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          M-Pesa Transaction Code
                        </label>
                        <input
                          type="text"
                          placeholder="Enter M-Pesa code"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-colors"
                          value={paymentCodes[vendorId] || ''}
                          onChange={(e) =>
                            setPaymentCodes((prev) => ({
                              ...prev,
                              [vendorId]: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <p className="text-gray-700 font-medium">
                        Vendor Total: <span className="font-bold">Ksh {group.total.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
              <div className="bg-[#bf2c7e] p-4">
                <h2 className="text-xl font-bold text-white">Order Summary</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Items</span>
                    <span className="font-medium">Ksh {itemsPrice.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Ksh {taxPrice.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Ksh {shippingPrice.toFixed(2)}</span>
                  </li>
                  <li className="flex justify-between pt-2">
                    <span className="text-lg font-bold text-[#bf2c7e]">Total</span>
                    <span className="text-lg font-bold">Ksh {totalPrice.toFixed(2)}</span>
                  </li>
                </ul>

                <button
                  onClick={() => placeOrder()}
                  disabled={isPlacing}
                  className="mt-6 w-full px-6 py-3 bg-[#bf2c7e] text-white rounded-lg hover:bg-[#a8246e] transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isPlacing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Placing Order...
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;