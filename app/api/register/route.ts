import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, email, password } = body;

    // check if user data provided
    if (!firstName || !email || !password) {
      return new NextResponse('Please fill all the fields!', { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create user
    const user = await prisma.user.create({
      data: {
        firstName,
        email,
        password,
      },
    });

    // return user
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error(error, 'REGISTER ERROR');

    // check if user already exists
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return new NextResponse('User already exists', { status: 409 });
    }

    // return error
    return new NextResponse(error.message, { status: 500 });
  }
}
