/*import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();
  await dbConnect();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return Response.json(
      { message: 'User has been created' },
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
};
*/

// app/api/auth/register/route.ts
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const POST = async (request: NextRequest) => {
  const { name, email, password, referralCode } = await request.json();
  
  await dbConnect();
  
  try {
    // Check if referredBy user exists if referral code is provided
    let referredByUser = null;
    if (referralCode) {
      referredByUser = await UserModel.findOne({ referralCode });
      if (!referredByUser) {
        return Response.json(
          { message: 'Invalid referral code' },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    
    // Generate unique referral code for the new user
    const userReferralCode = uuidv4().substring(0, 8).toUpperCase();
    
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      referralCode: userReferralCode,
      referredBy: referralCode || undefined,
    });

    await newUser.save();

    // If this user was referred, increment the referrer's count
    if (referredByUser) {
      await UserModel.findByIdAndUpdate(referredByUser._id, {
        $inc: { referralCount: 1 }
      });
    }

    return Response.json(
      { 
        message: 'User has been created',
        referralCode: userReferralCode 
      },
      { status: 201 }
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      { status: 500 }
    );
  }
};