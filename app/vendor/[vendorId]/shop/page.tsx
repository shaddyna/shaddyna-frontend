/*import ShopForm from '@/components/ShopForm';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ShopModel from '@/lib/models/ShopModel';
import { redirect } from 'next/navigation';

export default async function VendorShopPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  
  // Redirect if not authenticated or not the correct vendor
  /*if (!session || !session.user || session.user._id !== params.id) {
    redirect('/signin');
  }*
if (!session ) {
    redirect('/signin');
  }
  await dbConnect();
  
  let shop = null;
  if (session.user.shop) {
    shop = await ShopModel.findById(session.user.shop).lean();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {shop ? 'Your Shop' : 'Create Your Shop'}
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ShopForm initialData={shop} />
      </div>
    </div>
  );
}*/

import ShopForm from '@/components/ShopForm';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ShopModel from '@/lib/models/ShopModel';
import { redirect } from 'next/navigation';

export default async function VendorShopPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  
  // Redirect if not authenticated or not the correct vendor
  /*if (!session || !session.user || session.user._id !== params.id) {
    redirect('/signin');
  }*/
if (!session ) {
    redirect('/signin');
  }
  await dbConnect();
  
  let shop = null;
  if (session.user.shop) {
    const result = await ShopModel.findById(session.user.shop).lean();
    if (result && !Array.isArray(result)) {
      // Map result to Shop type
      shop = {
        _id: result._id?.toString?.() ?? '',
        name: result.name ?? '',
        owner: result.owner ?? '',
        description: result.description ?? '',
        location: result.location ?? '',
        image: result.image ?? '',
        isActive: result.isActive ?? false,
        createdAt: result.createdAt ?? '',
        categories: result.categories ?? [],
        contact: result.contact ?? '',
        workingHours: result.workingHours ?? '',
      };
    } else {
      shop = null;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {shop ? 'Your Shop' : 'Create Your Shop'}
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ShopForm initialData={shop} />
      </div>
    </div>
  );
}