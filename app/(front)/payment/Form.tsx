/*'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';

const Form = () => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { savePaymentMethod, paymentMethod, shippingAddress } =
    useCartService();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentMethod(selectedPaymentMethod);
    router.push('/place-order');
  };

  useEffect(() => {
    if (!shippingAddress) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || 'PayPal');
  }, [paymentMethod, router, shippingAddress]);

  return (
    <div>
      <CheckoutSteps current={2} />
      <div className='card mx-auto my-4 max-w-sm bg-base-300'>
        <div className='card-body'>
          <h1 className='card-title'>Payment Method</h1>
          <form onSubmit={handleSubmit}>
            {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
              <div key={payment}>
                <label className='label cursor-pointer'>
                  <span className='label-text'>{payment}</span>
                  <input
                    type='radio'
                    name='paymentMethod'
                    className='radio'
                    value={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                </label>
              </div>
            ))}
            <div className='my-2'>
              <button type='submit' className='btn btn-primary w-full'>
                Next
              </button>
            </div>
            <div className='my-2'>
              <button
                type='button'
                className='btn my-2 w-full'
                onClick={() => router.back()}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;
*/

// app/payment/Form.tsx
/*'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CheckoutSteps from '@/components/checkout/CheckoutSteps';
import useCartService from '@/lib/hooks/useCartStore';

const Form = () => {
  const router = useRouter();
  const { items, savePaymentMethod, shippingAddress } = useCartService();
  const [vendorGroups, setVendorGroups] = useState<Record<string, any>>({});
  const [paymentCodes, setPaymentCodes] = useState<Record<string, string>>({});

useEffect(() => {
  if (!shippingAddress) {
    return router.push('/shipping');
  }

  // Group items by vendor
  const groups: Record<string, any> = {};
  items.forEach((item) => {
    if (!groups[item.vendor]) {
      groups[item.vendor] = {
        items: [],
        total: 0,
        paymentDetails: null,
      };
    }
    groups[item.vendor].items.push(item);
    groups[item.vendor].total += item.price * item.qty;
  });

  // Fetch payment details for each vendor
  const fetchVendorDetails = async () => {
    const updatedGroups = { ...groups };
    for (const vendorId of Object.keys(updatedGroups)) {
      try {
        const res = await fetch(`/api/users/${vendorId}/shop`);
        if (res.ok) {
          const shop = await res.json();
          updatedGroups[vendorId].paymentDetails = shop.paymentDetails;
        }
      } catch (err) {
        console.error(`Failed to fetch details for vendor ${vendorId}:`, err);
      }
    }
    setVendorGroups(updatedGroups);
  };

  fetchVendorDetails();
}, [items, router, shippingAddress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentMethod('mpesa');
    router.push('/place-order');
  };

  const handlePaymentCodeChange = (vendorId: string, code: string) => {
    setPaymentCodes((prev) => ({ ...prev, [vendorId]: code }));
  };

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
                  <h2 className="text-lg font-bold">Vendor Items</h2>
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
                            <td>Ksh {item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold">Payment Details</h3>
                    <div className="my-2">
                      <p>Total Amount: Ksh {group.total.toFixed(2)}</p>
                      <p>Payment Method: M-Pesa</p>
                      {group.paymentDetails && (
                        <>
                          <p>Paybill: {group.paymentDetails.number}</p>
                          <p>Account Name: {group.paymentDetails.accountName || 'N/A'}</p>
                        </>
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
                >
                  Continue to Review
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

export default Form;