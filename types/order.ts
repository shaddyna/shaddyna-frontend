// types/order.ts
export type Product = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
    stock: number;
    sellerId: string;
    payment_status: 'paid' | 'unpaid';
    shippingInfo: string;
    delivery_status: 'pending' | 'shipped' | 'delivered';
    date: string;
    mpesaCode: string;
    mpesaName: string;
    mpesaNumber: string;
    amount: number;
  };
  
  export type Order = {
    id: string;
    orderId: string;
    sellerId: string;
    date: string;
    mpesaCode: string;
    mpesaName: string;
    mpesaNumber: string;
    amount: number;
    shippingInfo: string;
    delivery_status: 'pending' | 'shipped' | 'delivered';
    payment_status: 'paid' | 'unpaid';
    products: Product[];
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    createdAt: string;
  };
  