// app/api/vendor/[vendorId]/orders/route.ts
/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const GET = auth(async (req: any, { params }: { params: { vendorId: string } }) => {
  if (!req.auth || !['vendor', 'admin'].includes(req.auth.user?.role)) {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }

  // Check if the vendor is accessing their own orders
  if (req.auth.user?.role === 'vendor' && req.auth.user?._id !== params.vendorId) {
    return new Response(
      JSON.stringify({ message: 'You can only view your own orders' }),
      {
        status: 403,
      },
    );
  }

  await dbConnect();

  try {
    // Find all orders that have items belonging to this vendor
    const orders = await OrderModel.find({
      'items.vendor': params.vendorId
    })
      .populate('user', 'name email')
      .populate('items.product', 'name slug')
      .sort({ createdAt: -1 }); // Sort by newest first

    return new Response(
      JSON.stringify(orders),
      {
        status: 200,
      },
    );
  } catch (err: any) {
    |     const fetchOrders = async () => {
  15 |       const res = await fetch(`/api/vendor/${vendorId}/orders`);
> 16 |       const data = await res.json();
     |                              ^
  17 |       setOrders(data);
  18 |     };
  19 |return new Response(
      JSON.stringify({ message: err.message }),
      {
        status: 500,
      },
    );
  }
}) as any;*/

/*
  import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || !['vendor', 'admin'].includes(req.auth.user?.role)) {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }

  // Check if the vendor is accessing their own orders
  if (req.auth.user?.role === 'vendor' && req.auth.user?._id !== req.params.vendorId) {
    return new Response(
      JSON.stringify({ message: 'unauthorized - can only view your own orders' }),
      {
        status: 403,
      },
    );
  }

  await dbConnect();

  try {
    // Find all orders that have items belonging to this vendor
    const orders = await OrderModel.find({
      'items.vendor': req.params.vendorId
    })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate('user', 'name email') // Populate user info
      .lean();

    // Filter items to only include those from this vendor
    interface OrderItem {
      vendor: string;
      product: string;
      price: number;
      qty: number;
      [key: string]: any;
    }

    interface Order {
      _id: string;
      user: {
        _id: string;
        name: string;
        email: string;
        [key: string]: any;
      };
      items: OrderItem[];
      createdAt: string;
      [key: string]: any;
    }

    interface FilteredOrder extends Order {
      items: OrderItem[];
      itemsPrice: number;
    }

    const filteredOrders: FilteredOrder[] = ((orders as unknown) as Order[]).map(order => ({
      ...order,
      items: order.items.filter((item: OrderItem) => item.vendor.toString() === req.params.vendorId),
      // Recalculate totals for only the vendor's items
      itemsPrice: order.items
        .filter((item: OrderItem) => item.vendor.toString() === req.params.vendorId)
        .reduce((sum: number, item: OrderItem) => sum + item.price * item.qty, 0),
    }));

    return new Response(
      JSON.stringify(filteredOrders),
      {
        status: 200,
      },
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ message: err.message }),
      {
        status: 500,
      },
    );
  }
}) as any;*/

// app/api/vendor/[vendorId]/orders/route.ts
// app/api/vendor/[vendorId]/orders/route.ts
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
}