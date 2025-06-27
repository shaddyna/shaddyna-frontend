/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ShopModel from '@/lib/models/ShopModel';
import UserModel from '@/lib/models/UserModel';
import { NextResponse } from 'next/server';

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.shop) {
    return NextResponse.json(
      { message: 'Unauthorized or no shop found' },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const shop = await ShopModel.findById(req.auth.user.shop);
    if (!shop) {
      return NextResponse.json({ message: 'Shop not found' }, { status: 404 });
    }
    return NextResponse.json(shop);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error fetching shop' },
      { status: 500 }
    );
  }
});


// Update the POST handler to include payment details validation
export const POST = auth(async (req: any) => {
  if (!req.auth || req.auth.user.role !== 'vendor') {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const body = await req.json();
    
    // Check if user already has a shop
    const existingShop = await ShopModel.findOne({ owner: req.auth.user._id });
    if (existingShop) {
      return NextResponse.json(
        { message: 'User already has a shop' },
        { status: 400 }
      );
    }

    // Validate payment details
    if (!body.paymentDetails || !body.paymentDetails.method || !body.paymentDetails.number) {
      return NextResponse.json(
        { message: 'Payment details are required' },
        { status: 400 }
      );
    }

    if (body.paymentDetails.method === 'paybill' && !body.paymentDetails.accountName) {
      return NextResponse.json(
        { message: 'Business/Account name is required for paybill' },
        { status: 400 }
      );
    }

    const shop = new ShopModel({
      ...body,
      owner: req.auth.user._id,
    });

    const createdShop = await shop.save();
    
    // Update user with shop reference
    await UserModel.findByIdAndUpdate(req.auth.user._id, {
      shop: createdShop._id,
    });

    return NextResponse.json(createdShop, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error creating shop' },
      { status: 500 }
    );
  }
});

// Update the PUT handler to include payment details
export const PUT = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.shop) {
    return NextResponse.json(
      { message: 'Unauthorized or no shop found' },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const body = await req.json();
    
    // Validate payment details for updates
    if (body.paymentDetails) {
      if (!body.paymentDetails.method || !body.paymentDetails.number) {
        return NextResponse.json(
          { message: 'Payment method and number are required' },
          { status: 400 }
        );
      }

      if (body.paymentDetails.method === 'paybill' && !body.paymentDetails.accountName) {
        return NextResponse.json(
          { message: 'Business/Account name is required for paybill' },
          { status: 400 }
        );
      }
    }

    const updatedShop = await ShopModel.findByIdAndUpdate(
      req.auth.user.shop,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedShop) {
      return NextResponse.json({ message: 'Shop not found' }, { status: 404 });
    }

    return NextResponse.json(updatedShop);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error updating shop' },
      { status: 500 }
    );
  }
});*/

/*export const POST = auth(async (req: any) => {
  if (!req.auth || req.auth.user.role !== 'vendor') {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const body = await req.json();
    
    // Check if user already has a shop
    const existingShop = await ShopModel.findOne({ owner: req.auth.user._id });
    if (existingShop) {
      return NextResponse.json(
        { message: 'User already has a shop' },
        { status: 400 }
      );
    }

    const shop = new ShopModel({
      ...body,
      owner: req.auth.user._id,
    });

    const createdShop = await shop.save();
    
    // Update user with shop reference
    await UserModel.findByIdAndUpdate(req.auth.user._id, {
      shop: createdShop._id,
    });

    return NextResponse.json(createdShop, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error creating shop' },
      { status: 500 }
    );
  }
});

/*export const PUT = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.shop) {
    return NextResponse.json(
      { message: 'Unauthorized or no shop found' },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const body = await req.json();
    
    const updatedShop = await ShopModel.findByIdAndUpdate(
      req.auth.user.shop,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedShop) {
      return NextResponse.json({ message: 'Shop not found' }, { status: 404 });
    }

    return NextResponse.json(updatedShop);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error updating shop' },
      { status: 500 }
    );
  }
});*/


import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ShopModel from '@/lib/models/ShopModel';
import UserModel from '@/lib/models/UserModel';
import { NextResponse } from 'next/server';

// Public endpoint to get payment details by shop ID or owner ID
export const GET = async (req: Request) => {
  await dbConnect();
  
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get('shopId');
    const userId = searchParams.get('userId');

    if (!shopId && !userId) {
      return NextResponse.json(
        { message: 'Either shopId or userId must be provided' },
        { status: 400 }
      );
    }

    let shop;
    if (shopId) {
      shop = await ShopModel.findById(shopId).select('paymentDetails name');
    } else if (userId) {
      shop = await ShopModel.findOne({ owner: userId }).select('paymentDetails name');
    }

    if (!shop) {
      return NextResponse.json({ message: 'Shop not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: shop.name,
      paymentDetails: shop.paymentDetails
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error fetching payment details' },
      { status: 500 }
    );
  }
};

// Protected endpoints below (require authentication)

export const POST = auth(async (req: any) => {
  if (!req.auth || req.auth.user.role !== 'vendor') {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const body = await req.json();
    
    // Check if user already has a shop
    const existingShop = await ShopModel.findOne({ owner: req.auth.user._id });
    if (existingShop) {
      return NextResponse.json(
        { message: 'User already has a shop' },
        { status: 400 }
      );
    }

    // Validate payment details
    if (!body.paymentDetails || !body.paymentDetails.method || !body.paymentDetails.number) {
      return NextResponse.json(
        { message: 'Payment details are required' },
        { status: 400 }
      );
    }

    if (body.paymentDetails.method === 'paybill' && !body.paymentDetails.accountName) {
      return NextResponse.json(
        { message: 'Business/Account name is required for paybill' },
        { status: 400 }
      );
    }

    const shop = new ShopModel({
      ...body,
      owner: req.auth.user._id,
    });

    const createdShop = await shop.save();
    
    // Update user with shop reference
    await UserModel.findByIdAndUpdate(req.auth.user._id, {
      shop: createdShop._id,
    });

    return NextResponse.json(createdShop, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error creating shop' },
      { status: 500 }
    );
  }
});

export const PUT = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.shop) {
    return NextResponse.json(
      { message: 'Unauthorized or no shop found' },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const body = await req.json();
    
    // Validate payment details for updates
    if (body.paymentDetails) {
      if (!body.paymentDetails.method || !body.paymentDetails.number) {
        return NextResponse.json(
          { message: 'Payment method and number are required' },
          { status: 400 }
        );
      }

      if (body.paymentDetails.method === 'paybill' && !body.paymentDetails.accountName) {
        return NextResponse.json(
          { message: 'Business/Account name is required for paybill' },
          { status: 400 }
        );
      }
    }

    const updatedShop = await ShopModel.findByIdAndUpdate(
      req.auth.user.shop,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedShop) {
      return NextResponse.json({ message: 'Shop not found' }, { status: 404 });
    }

    return NextResponse.json(updatedShop);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error updating shop' },
      { status: 500 }
    );
  }
});
