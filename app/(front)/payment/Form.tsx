/*'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';
import { toast } from 'react-toastify';

interface VendorGroup {
  items: any[];
  total: number;
  paymentDetails: {
    method: 'till' | 'paybill';
    number: string;
    accountName?: string;
  } | null;
  vendorName?: string;
}

const Form = () => {
  const router = useRouter();
  const { items, savePaymentMethod, shippingAddress } = useCartService();
  const [vendorGroups, setVendorGroups] = useState<Record<string, VendorGroup>>({});
  const [paymentCodes, setPaymentCodes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shippingAddress) {
      return router.push('/shipping');
    }

    if (items.length === 0) {
      return router.push('/cart');
    }

    const initializeVendorGroups = async () => {
      setLoading(true);
      try {
        // First create basic vendor groups
        const groups: Record<string, VendorGroup> = {};
        items.forEach((item) => {
          if (!groups[item.vendor]) {
            groups[item.vendor] = {
              items: [],
              total: 0,
              paymentDetails: null,
              //vendorName: item.vendorName,
            };
          }
          groups[item.vendor].items.push(item);
          groups[item.vendor].total += item.price * item.qty;
        });

        // Then fetch payment details for each vendor
        const updatedGroups = { ...groups };
        const fetchPromises = Object.keys(updatedGroups).map(async (vendorId) => {
          try {
            const res = await fetch(`/api/vendor/shop?userId=${vendorId}`);
            if (res.ok) {
              const shop = await res.json();
              if (shop.paymentDetails) {
                updatedGroups[vendorId].paymentDetails = shop.paymentDetails;
              }
            }
          } catch (err) {
            console.error(`Failed to fetch details for vendor ${vendorId}:`, err);
            toast.error(`Failed to load payment details for ${updatedGroups[vendorId].vendorName || 'vendor'}`);
          }
        });

        await Promise.all(fetchPromises);
        setVendorGroups(updatedGroups);
      } catch (error) {
        console.error('Error initializing vendor groups:', error);
        toast.error('Failed to load payment information');
      } finally {
        setLoading(false);
      }
    };

    initializeVendorGroups();
  }, [items, router, shippingAddress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all payment codes are entered
    const allCodesEntered = Object.keys(vendorGroups).every(
      vendorId => paymentCodes[vendorId]?.trim()
    );
    
    if (!allCodesEntered) {
      toast.error('Please enter M-Pesa codes for all vendors');
      return;
    }

    savePaymentMethod('mpesa');
    router.push('/place-order');
  };

  const handlePaymentCodeChange = (vendorId: string, code: string) => {
    setPaymentCodes((prev) => ({ ...prev, [vendorId]: code }));
  };

  if (loading) {
    return (
      <div>
        <CheckoutSteps current={2} />
        <div className="mx-auto my-4 max-w-4xl">
          <div className="card bg-base-300">
            <div className="card-body">
              <h1 className="card-title">Vendor Payment Details</h1>
              <div className="flex justify-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CheckoutSteps current={2} />
      <div className="mx-auto my-4 max-w-4xl">
        <div className="card bg-base-300">
          <div className="card-body">
            <h1 className="card-title">Vendor Payment Details</h1>
            <form onSubmit={handleSubmit}>
              {Object.entries(vendorGroups).map(([vendorId, group]) => (
                <div key={vendorId} className="mb-6 rounded-lg bg-base-100 p-4">
                  <h2 className="text-lg font-bold">
                    {group.vendorName || 'Vendor'} Items
                  </h2>
                  <div className="my-2">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.map((item: any) => (
                          <tr key={item.slug}>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>Ksh {item.price.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold">Payment Details</h3>
                    <div className="my-2">
                      <p>Total Amount: <strong>Ksh {group.total.toFixed(2)}</strong></p>
                      <p>Payment Method: <strong>M-Pesa</strong></p>
                      {group.paymentDetails ? (
                        <>
                          <p>
                            {group.paymentDetails.method === 'paybill' ? 'Paybill' : 'Till'}:{' '}
                            <strong>{group.paymentDetails.number}</strong>
                          </p>
                          {group.paymentDetails.method === 'paybill' && (
                            <p>
                              Account Name: <strong>{group.paymentDetails.accountName}</strong>
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-warning">Payment details not available for this vendor</p>
                      )}
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">M-Pesa Transaction Code</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter M-Pesa code"
                        className="input input-bordered"
                        value={paymentCodes[vendorId] || ''}
                        onChange={(e) => handlePaymentCodeChange(vendorId, e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  className="btn"
                  onClick={() => router.back()}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Continue to Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;*/

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';
import { toast } from 'react-toastify';

interface VendorGroup {
  items: any[];
  total: number;
  paymentDetails: {
    method: 'till' | 'paybill';
    number: string;
    accountName?: string;
  } | null;
  vendorName?: string;
}

const Form = () => {
  const router = useRouter();
  const { items, savePaymentMethod, shippingAddress } = useCartService();
  const [vendorGroups, setVendorGroups] = useState<Record<string, VendorGroup>>({});
  const [paymentCodes, setPaymentCodes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shippingAddress) {
      return router.push('/shipping');
    }

    if (items.length === 0) {
      return router.push('/cart');
    }

    const initializeVendorGroups = async () => {
      setLoading(true);
      try {
        // First create basic vendor groups
        const groups: Record<string, VendorGroup> = {};
        items.forEach((item) => {
          if (!groups[item.vendor]) {
            groups[item.vendor] = {
              items: [],
              total: 0,
              paymentDetails: null,
              //vendorName: item.vendorName,
            };
          }
          groups[item.vendor].items.push(item);
          groups[item.vendor].total += item.price * item.qty;
        });

        // Then fetch payment details for each vendor
        const updatedGroups = { ...groups };
        const fetchPromises = Object.keys(updatedGroups).map(async (vendorId) => {
          try {
            const res = await fetch(`/api/vendor/shop?userId=${vendorId}`);
            if (res.ok) {
              const shop = await res.json();
              if (shop.paymentDetails) {
                updatedGroups[vendorId].paymentDetails = shop.paymentDetails;
              }
            }
          } catch (err) {
            console.error(`Failed to fetch details for vendor ${vendorId}:`, err);
            toast.error(`Failed to load payment details for ${updatedGroups[vendorId].vendorName || 'vendor'}`);
          }
        });

        await Promise.all(fetchPromises);
        setVendorGroups(updatedGroups);
      } catch (error) {
        console.error('Error initializing vendor groups:', error);
        toast.error('Failed to load payment information');
      } finally {
        setLoading(false);
      }
    };

    initializeVendorGroups();
  }, [items, router, shippingAddress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all payment codes are entered
    const allCodesEntered = Object.keys(vendorGroups).every(
      vendorId => paymentCodes[vendorId]?.trim()
    );
    
    if (!allCodesEntered) {
      toast.error('Please enter M-Pesa codes for all vendors');
      return;
    }

    savePaymentMethod('mpesa');
    router.push('/place-order');
  };

  const handlePaymentCodeChange = (vendorId: string, code: string) => {
    setPaymentCodes((prev) => ({ ...prev, [vendorId]: code }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <CheckoutSteps current={2} />
          <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#bf2c7e] p-6">
              <h1 className="text-2xl font-bold text-white">Vendor Payment Details</h1>
            </div>
            <div className="p-8 flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf2c7e]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <CheckoutSteps current={2} />
        
        <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#bf2c7e] p-6">
            <h1 className="text-2xl font-bold text-white">Vendor Payment Details</h1>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {Object.entries(vendorGroups).map(([vendorId, group]) => (
                <div key={vendorId} className="mb-8 rounded-lg border border-gray-200 p-6 last:mb-0">
                  <h2 className="text-xl font-bold text-[#bf2c7e] mb-4">
                    {group.vendorName || 'Vendor'} Items
                  </h2>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {group.items.map((item: any) => (
                          <tr key={item.slug}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.qty}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ksh {item.price.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-[#bf2c7e] mb-3">Payment Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Total Amount:</span> 
                        <span className="font-bold ml-2">Ksh {group.total.toFixed(2)}</span>
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Payment Method:</span> 
                        <span className="font-bold ml-2">M-Pesa</span>
                      </p>
                      {group.paymentDetails ? (
                        <>
                          <p className="text-gray-700">
                            <span className="font-medium">
                              {group.paymentDetails.method === 'paybill' ? 'Paybill' : 'Till'}:
                            </span> 
                            <span className="font-bold ml-2">{group.paymentDetails.number}</span>
                          </p>
                          {group.paymentDetails.method === 'paybill' && (
                            <p className="text-gray-700">
                              <span className="font-medium">Account Name:</span> 
                              <span className="font-bold ml-2">{group.paymentDetails.accountName}</span>
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-yellow-600 font-medium">Payment details not available for this vendor</p>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        M-Pesa Transaction Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter M-Pesa code"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#bf2c7e] focus:border-[#bf2c7e] transition-colors"
                        value={paymentCodes[vendorId] || ''}
                        onChange={(e) => handlePaymentCodeChange(vendorId, e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  className="px-6 py-2 border border-[#bf2c7e] text-[#bf2c7e] rounded-lg hover:bg-[#fce7f3] transition-colors"
                  onClick={() => router.back()}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#bf2c7e] text-white rounded-lg hover:bg-[#a8246e] transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Continue to Review'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;