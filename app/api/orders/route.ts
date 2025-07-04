/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import  OrderItem  from '@/lib/models/OrderModel';
import ProductModel from '@/lib/models/ProductModel';
import { round2 } from '@/lib/utils';
import mongoose from 'mongoose';

type OrderItem = {
  product: string;
  name: string;
  slug: string;
  qty: number;
  image: string;
  price: number;
  vendor: string;
};


const calcPrices = (orderItems: OrderItem[]) => {
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export const POST = auth(async (req: any) => {
  if (!req.auth) {
    console.error('[POST /api/orders] ❌ Unauthorized - no auth data');
    return Response.json({ message: 'unauthorized' }, { status: 401 });
  }

  // Log the full auth object
  console.log('[POST /api/orders] ✅ Authenticated user:', req.auth.user);

  const rawUser = req.auth.user;

  // Extract user._id and ensure it's in a valid format
  const rawUserId = rawUser?._id;

  console.log('[POST /api/orders] 🔍 Raw user._id:', rawUserId);

  let userId: mongoose.Types.ObjectId;
  try {
    userId =
      typeof rawUserId === 'string'
        ? new mongoose.Types.ObjectId(rawUserId)
        : new mongoose.Types.ObjectId(
            rawUserId?.toHexString?.() || rawUserId?.toString?.(),
          );
  } catch (err) {
    console.error('[POST /api/orders] ❌ Invalid user ID:', err);
    return Response.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const payload = await req.json();
    console.log('[POST /api/orders] 📦 Payload:', payload);

    await dbConnect();
    console.log('[POST /api/orders] ✅ Database connected.');

    const dbProductPrices = await ProductModel.find(
      {
        _id: { $in: payload.items.map((x: { _id: string }) => x._id) },
      },
      'price',
    );

    const dbOrderItems = payload.items.map((x: { _id: string }) => ({
      ...x,
      product: x._id,
      price: dbProductPrices.find((item) => item._id.toString() === x._id)
        ?.price,
      _id: undefined,
    }));

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      user: userId,
    });

    const createdOrder = await newOrder.save();
    console.log('[POST /api/orders] ✅ Order created:', createdOrder._id);

    return Response.json(
      { message: 'Order has been created', order: createdOrder },
      { status: 201 },
    );
  } catch (err: any) {
    console.error('[POST /api/orders] ❌ Failed to create order:', err);
    return Response.json({ message: err.message }, { status: 500 });
  }
});
*/

import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import ProductModel from '@/lib/models/ProductModel';
import ShopModel from '@/lib/models/ShopModel';
import { round2 } from '@/lib/utils';
import mongoose from 'mongoose';

type OrderItem = {
  product: string;
  name: string;
  slug: string;
  qty: number;
  image: string;
  price: number;
  vendor: string;
  vendorPaymentCode?: string;
};

const calcPrices = (orderItems: OrderItem[]) => {
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export const POST = auth(async (req: any) => {
  if (!req.auth) {
    console.error('[POST /api/orders] ❌ Unauthorized - no auth data');
    return Response.json({ message: 'unauthorized' }, { status: 401 });
  }

  console.log('[POST /api/orders] ✅ Authenticated user:', req.auth.user);

  const rawUser = req.auth.user;
  const rawUserId = rawUser?._id;
  console.log('[POST /api/orders] 🔍 Raw user._id:', rawUserId);

  let userId: mongoose.Types.ObjectId;
  try {
    userId =
      typeof rawUserId === 'string'
        ? new mongoose.Types.ObjectId(rawUserId)
        : new mongoose.Types.ObjectId(
            rawUserId?.toHexString?.() || rawUserId?.toString?.(),
          );
  } catch (err) {
    console.error('[POST /api/orders] ❌ Invalid user ID:', err);
    return Response.json({ message: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const payload = await req.json();
    console.log('[POST /api/orders] 📦 Payload:', payload);

    await dbConnect();
    console.log('[POST /api/orders] ✅ Database connected.');

    // Get product prices and vendor info
    const dbProductPrices = await ProductModel.find(
      {
        _id: { $in: payload.items.map((x: { product: string }) => x.product) },
      },
      'price vendor',
    );

    // Create order items with vendor payment codes
    const dbOrderItems = payload.items.map((x: any) => {
      const product = dbProductPrices.find(
        (item) => item._id.toString() === x.product
      );
      return {
        ...x,
        product: x.product,
        price: product?.price,
        vendor: product?.vendor.toString(),
        vendorPaymentCode: x.vendorPaymentCode || '',
        _id: undefined,
      };
    });

    // Calculate order totals
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    // Create the new order
    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod || 'mpesa',
      user: userId,
    });

    // Reduce product quantities in stock
    const bulkOps = dbOrderItems.map((item: any) => ({
      updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(item.product) },
        update: { $inc: { countInStock: -item.qty } },
      },
    }));

    await ProductModel.bulkWrite(bulkOps);
    const createdOrder = await newOrder.save();

    console.log('[POST /api/orders] ✅ Order created:', createdOrder._id);

    return Response.json(
      { 
        message: 'Order has been created', 
        order: createdOrder 
      },
      { status: 201 },
    );
  } catch (err: any) {
    console.error('[POST /api/orders] ❌ Failed to create order:', err);
    return Response.json({ message: err.message }, { status: 500 });
  }
});