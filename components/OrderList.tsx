import React from 'react';
import  OrderItem  from './OrderItem';

// TypeScript interface for the order item data
interface OrderListProps {
  orders: Order[];
}

export interface Order {
  _id: string;
  customerName: string;
  customerAddress: string;
  deliveryStatus: string;
  deliveryPerson: string;
  orderTime: string;
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="mt-5">
      {orders.length === 0 ? (
        <p>No orders assigned yet.</p>
      ) : (
        orders.map((order) => <OrderItem key={order._id} order={order} />)
      )}
    </div>
  );
};

export default OrderList;

