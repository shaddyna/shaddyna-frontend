// app/api/vendor/[vendorId]/orders/route.ts
/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { vendorId: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: 'unauthorized' },
      { status: 401 }
    );
  }

  // Check if the requesting user is the vendor or an admin
  const { user } = session;
  if (user.role !== 'superAdmin' && user._id !== params.vendorId) {
    return NextResponse.json(
      { message: 'unauthorized' },
      { status: 403 }
    );
  }

  await dbConnect();

  try {
    // Find all orders that have items with this vendor
    const orders = await OrderModel.find({
      'items.vendor': params.vendorId
    })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .lean();

    // Filter the items to only include those from this vendor
    interface OrderItem {
      vendor: string;
      product: string;
      price: number;
      qty: number;
      [key: string]: any;
    }

    interface Order {
      _id: any;
      user: {
      _id: string;
      name: string;
      email: string;
      [key: string]: any;
      };
      items: OrderItem[];
      createdAt: Date;
      updatedAt: Date;
      [key: string]: any;
    }

    interface FilteredOrder extends Omit<Order, 'items' | '_id' | 'createdAt' | 'updatedAt'> {
      items: OrderItem[];
      _id: string;
      createdAt: string;
      updatedAt: string;
    }

    const filteredOrders: FilteredOrder[] = (orders as unknown as Order[]).map((order: Order) => ({
      ...order,
      items: order.items.filter((item: OrderItem) => item.vendor.toString() === params.vendorId),
      _id: order._id.toString(),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    }));

    return NextResponse.json(filteredOrders);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}*/

import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { vendorId: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: 'unauthorized' },
      { status: 401 }
    );
  }

  const { user } = session;
  if (user.role !== 'superAdmin' && user._id !== params.vendorId) {
    return NextResponse.json(
      { message: 'unauthorized' },
      { status: 403 }
    );
  }

  await dbConnect();

  try {
    const orders = await OrderModel.find({
      'items.vendor': params.vendorId
    })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .lean();

    const filteredOrders = (orders as any[]).map(order => ({
      ...order,
      items: order.items.filter((item: any) => item.vendor.toString() === params.vendorId),
      _id: (order._id as any).toString(),
      createdAt: (order.createdAt as Date).toISOString(),
      updatedAt: (order.updatedAt as Date).toISOString(),
    }));

    return NextResponse.json(filteredOrders);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { vendorId: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { message: 'unauthorized' },
      { status: 401 }
    );
  }

  const { user } = session;
  if (user.role !== 'superAdmin' && user._id !== params.vendorId) {
    return NextResponse.json(
      { message: 'unauthorized' },
      { status: 403 }
    );
  }

  await dbConnect();

  try {
    const { orderId, itemId, vendorPaymentConfirmed } = await request.json();

    const updatedOrder = await OrderModel.findOneAndUpdate(
      {
        _id: orderId,
        'items._id': itemId,
        'items.vendor': params.vendorId
      },
      {
        $set: {
          'items.$.vendorPaymentConfirmed': vendorPaymentConfirmed,
          'items.$.vendorPaymentCode': `paid-${Date.now()}`
        }
      },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { message: 'Order or item not found' },
        { status: 404 }
      );
    }

    const vendorItem = updatedOrder.items.find(
      (item: any) => item._id.toString() === itemId && 
      item.vendor.toString() === params.vendorId
    );

    return NextResponse.json({
      message: 'Payment status updated',
      item: {
        ...vendorItem.toObject(),
        _id: vendorItem._id.toString(),
        vendor: vendorItem.vendor.toString()
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}