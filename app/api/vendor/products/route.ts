

// C:\Users\Admin\Desktop\Fashion-Corner-Next.js-Ecommerce\app\api\vendor\products\route.ts
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/lib/models/ProductModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || !['vendor', 'admin'].includes(req.auth.user?.role)) {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  
  await dbConnect();
  
  // For vendors, only get their own products
  // Admins can see all products (if needed)
  const filter = req.auth.user?.role === 'vendor' 
    ? { vendor: req.auth.user._id }
    : {};
    
  const products = await ProductModel.find(filter).populate('vendor', 'name email');
  return new Response(
    JSON.stringify(products),
    {
      status: 200,
    },
  );
}) as any;


// app/api/vendor/products/route.ts
export const POST = auth(async (req: any) => {
  if (!req.auth || !['vendor', 'admin'].includes(req.auth.user?.role)) {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  
  await dbConnect();
  
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.slug || !data.price || !data.category || 
        !data.brand || !data.description || !data.countInStock) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Ensure at least one image is provided
    if (!data.image && (!data.images || data.images.length === 0)) {
      return new Response(
        JSON.stringify({ message: 'At least one image is required' }),
        { status: 400 }
      );
    }

    const product = new ProductModel({
      name: data.name,
      slug: data.slug,
      image: data.image || data.images[0],
      images: data.images || [],
      price: data.price,
      category: data.category,
      brand: data.brand,
      countInStock: data.countInStock,
      description: data.description,
      rating: 0,
      numReviews: 0,
      vendor: req.auth.user._id,
    });
    
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session || !['vendor', 'superAdmin'].includes(session.user?.role ?? '')) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const product = await ProductModel.findById(params.id);
  if (!product) {
    return Response.json({ message: 'Product not found' }, { status: 404 });
  }

  if (
    session.user.role === 'vendor' &&
    product.vendor.toString() !== session.user._id
  ) {
    return Response.json(
      { message: 'Unauthorized - can only delete own products' },
      { status: 403 }
    );
  }

  await ProductModel.deleteOne({ _id: params.id });
  return Response.json({ message: 'Product deleted successfully' });
}

