/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const products = await ProductModel.find();
  return Response.json(products);
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const product = new ProductModel({
    name: 'sample name',
    slug: 'sample-name-' + Math.random(),
    image:
      'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReviews: 0,
  });
  try {
    await product.save();
    return Response.json(
      { message: 'Product created successfully', product },
      {
        status: 201,
      },
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}) as any;
*/

import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || req.auth.user?.role !== 'superAdmin') {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const products = await ProductModel.find();
  return new Response(
    JSON.stringify(products),
    {
      status: 200,
    },
  );
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || req.auth.user?.role !== 'superAdmin') {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const product = new ProductModel({
    name: 'sample name',
    slug: 'sample-name-' + Math.random(),
    image: 'https://res.cloudinary.com/dqxlehni0/image/upload/v1715622109/No_Image_Available_kbdno1.jpg',
    price: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
    description: 'sample description',
    rating: 0,
    numReviews: 0,
  });
  try {
    await product.save();
    return new Response(
      JSON.stringify({
        message: 'Product created successfully',
        product,
      }),
      {
        status: 201,
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