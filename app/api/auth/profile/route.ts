/*import bcrypt from 'bcryptjs';

import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const PUT = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  }
  const { user } = req.auth;
  const { name, email, password } = await req.json();
  await dbConnect();
  try {
    const dbUser = await UserModel.findById(user._id);
    if (!dbUser) {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        },
      );
    }
    dbUser.name = name;
    dbUser.email = email;
    dbUser.password = password
      ? await bcrypt.hash(password, 5)
      : dbUser.password;
    await dbUser.save();
    return Response.json({ message: 'User has been updated' });
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
});*/

// app/api/auth/profile/route.ts
import bcrypt from 'bcryptjs';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const PUT = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  }
  const { user } = req.auth;
  const { name, email, password } = await req.json();
  
  await dbConnect();
  
  try {
    const dbUser = await UserModel.findById(user._id);
    if (!dbUser) {
      return Response.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Update user fields
    dbUser.name = name;
    dbUser.email = email;
    dbUser.password = password
      ? await bcrypt.hash(password, 5)
      : dbUser.password;

    await dbUser.save();

    // Return updated user data including referral information
    return Response.json({ 
      message: 'User has been updated',
      user: {
        name: dbUser.name,
        email: dbUser.email,
        referralCode: dbUser.referralCode,
        referralCount: dbUser.referralCount,
        referredBy: dbUser.referredBy
      }
    });
    
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      { status: 500 }
    );
  }
});

// Add GET endpoint to fetch referral data
export const GET = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  }
  const { user } = req.auth;
  
  await dbConnect();
  
  try {
    const dbUser = await UserModel.findById(user._id).select('referralCode referralCount referredBy');
    if (!dbUser) {
      return Response.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json({
      referralCode: dbUser.referralCode,
      referralCount: dbUser.referralCount,
      referredBy: dbUser.referredBy
    });
    
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      { status: 500 }
    );
  }
});
