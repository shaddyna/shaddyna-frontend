// app/api/vendor/[vendorId]/orders/route.ts
import { auth } from '@/lib/auth';
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
    return new Response(
      JSON.stringify({ message: err.message }),
      {
        status: 500,
      },
    );
  }
}) as any;