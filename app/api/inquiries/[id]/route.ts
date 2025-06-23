// app/api/inquiries/[id]/route.ts
/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import InquiryModel from '@/lib/models/InquiryModel';

import { NextResponse } from 'next/server';

// Update inquiry status (accept/reject)
export const PUT = auth(async (req: any, { params }: { params: { id: string } }) => {
  if (!req.auth) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = req.auth;
  const { status } = await req.json();

  if (!['accepted', 'rejected'].includes(status)) {
    return NextResponse.json(
      { message: 'Invalid status' },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const inquiry = await InquiryModel.findById(params.id);
    if (!inquiry) {
      return NextResponse.json(
        { message: 'Inquiry not found' },
        { status: 404 }
      );
    }

    // Check if user is the seller
    if (inquiry.seller.toString() !== user._id) {
      return NextResponse.json(
        { message: 'Not authorized' },
        { status: 403 }
      );
    }

    inquiry.status = status;
    await inquiry.save();
    return NextResponse.json(
      { message: `Inquiry ${status} successfully`, inquiry }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
});*/

// app/api/inquiries/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import InquiryModel from '@/lib/models/InquiryModel';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = session;
  const { id } = params;

  const { status } = await req.json();

  if (!['accepted', 'rejected'].includes(status)) {
    return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
  }

  await dbConnect();

  try {
    const inquiry = await InquiryModel.findById(id);
    if (!inquiry) {
      return NextResponse.json({ message: 'Inquiry not found' }, { status: 404 });
    }

    if (inquiry.seller.toString() !== user._id) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    inquiry.status = status;
    await inquiry.save();

    return NextResponse.json({
      message: `Inquiry ${status} successfully`,
      inquiry,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = session;
  const { id } = params;

  await dbConnect();

  try {
    const inquiry = await InquiryModel.findById(id);
    if (!inquiry) {
      return NextResponse.json({ message: 'Inquiry not found' }, { status: 404 });
    }

    if (inquiry.seller.toString() !== user._id) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    await inquiry.remove();
    return NextResponse.json({ message: 'Inquiry deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}