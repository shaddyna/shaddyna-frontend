/*'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { formatNumber } from '@/lib/utils';
import { Link } from 'lucide-react';

const VendorOrders = ({ vendorId }: { vendorId: string }) => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`/api/vendor/${vendorId}/orders`);
      const data = await res.json();
      setOrders(data);
    };

    if (session && session.user?._id === vendorId) {
      fetchOrders();
    }
  }, [session, vendorId]);

  if (!session || session.user?._id !== vendorId) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div>
      <h1 className='py-4 text-2xl'>Orders</h1>
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>Ksh {formatNumber(order.totalPrice)}</td>
                <td>{order.isDelivered ? 'Delivered' : 'Pending'}</td>
                <td>
                  <Link
                    href={`/vendor/${vendorId}/orders/${order._id}`}
                    className='btn btn-ghost btn-sm'
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorOrders;*/

'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { formatNumber } from '@/lib/utils';
import { Link } from 'lucide-react';

interface OrderItem {
  _id: string;
  name: string;
  qty: number;
  price: number;
  vendorPaymentConfirmed: boolean;
  vendorPaymentCode: string;
  [key: string]: any;
}

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
  isDelivered: boolean;
  [key: string]: any;
}

const VendorOrders = ({ vendorId }: { vendorId: string }) => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`/api/vendor/${vendorId}/orders`);
      const data = await res.json();
      setOrders(data);
    };

    if (session && session.user?._id === vendorId) {
      fetchOrders();
    }
  }, [session, vendorId]);

  const handlePaymentConfirmation = async (orderId: string, itemId: string) => {
    try {
      const res = await fetch(`/api/vendor/${vendorId}/orders`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          itemId,
          vendorPaymentConfirmed: true
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId
              ? {
                  ...order,
                  items: order.items.map(item =>
                    item._id === itemId
                      ? { ...item, ...data.item }
                      : item
                  )
                }
              : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  if (!session || session.user?._id !== vendorId) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div>
      <h1 className='py-4 text-2xl'>Orders</h1>
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Payment Code</th>
              <th>Payment Status</th>
              <th>Date</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.flatMap(order =>
              order.items.map(item => (
                <tr key={`${order._id}-${item._id}`}>
                  <td>{order._id.slice(-6)}</td>
                  <td>{order.user.name}</td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>Ksh {formatNumber(item.price)}</td>
                  <td>{item.vendorPaymentCode}</td>
                  <td>
                    {item.vendorPaymentConfirmed ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePaymentConfirmation(order._id, item._id)}
                        className="btn btn-xs btn-primary"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>Ksh {formatNumber(item.price * item.qty)}</td>
                  <td>
                    <Link
                      href={`/vendor/${vendorId}/orders/${order._id}`}
                      className='btn btn-ghost btn-sm'
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorOrders;