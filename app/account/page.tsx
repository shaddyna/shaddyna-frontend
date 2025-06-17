/*"use client";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { User,} from '@/types/profile';
import { ProfileHeader } from '@/components/user/ProfileHeader';
import { TabNavigation } from '@/components/user/TabNavigation';
import { ProfileTab } from '@/components/user/ProfileTab';
import { ShopTab } from '@/components/user/ShopTab';
import { ProductsTab } from '@/components/user/ProductsTab';
import { OrdersTab } from '@/components/user/OrdersTab';
import { SkillsTab } from '@/components/user/SkillsTab';
import { MembersTab } from '@/components/user/MembersTab';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Order, TabType } from '@/types/types';
import { SellerList } from '@/components/user/SellersTab';
import { ShopList } from '@/components/user/ShopList';
import { UserList } from '@/components/user/UserList';
import { MemberRequestsTab } from '@/components/user/MembersRequests';


const ProfilePage = () => {
  const { user, token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const orders: Order[] = [
    {
      id: 'order-789',
      date: '2023-05-15',
      status: 'completed',
      total: 149.98,
      items: 2,
      thumbnail: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'order-790',
      date: '2023-06-02',
      status: 'pending',
      total: 89.99,
      items: 1,
      thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80'
    }
  ];


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("✅ User loaded:", response.data.data);
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error('❌ Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <div className="text-red-500 text-center py-8">Failed to load user data</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab initialUser={currentUser} token={token ?? ""} />;
      case 'shop':
        return <ShopTab userId={currentUser._id} isOwner token={token ?? ""} />;
      case 'products':
        return <ProductsTab userId={currentUser._id} isOwner token={token ?? ""} />;
      case 'orders':
        return <OrdersTab orders={orders} />;
      case 'skills':
        return <SkillsTab userId={currentUser._id} isOwner token={token ?? ""} />;
      case 'members':
        return <MembersTab />;
      case 'membersrequests':
        return <MemberRequestsTab/>;  
       case 'sellers':
        return <SellerList/>; 
      case 'shops':
        return <ShopList/>;   
           case 'users':
        return <UserList token={token ?? ""}/>;     
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>{currentUser.firstName} | Profile</title>
        <meta name="description" content="User profile page for multi-vendor e-commerce app" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          name={currentUser.firstName}
          title="Shaddyna"
          subtitle={`Welcome back, ${currentUser.firstName}! 👋`}
        />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;*/

"use client";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { User } from '@/types/profile';
import { ProfileHeader } from '@/components/user/ProfileHeader';
import { TabNavigation } from '@/components/user/TabNavigation';
import { ProfileTab } from '@/components/user/ProfileTab';
import { ShopTab } from '@/components/user/ShopTab';
import { ProductsTab } from '@/components/user/ProductsTab';
import { OrdersTab } from '@/components/user/OrdersTab';
import { SkillsTab } from '@/components/user/SkillsTab';
import { MembersTab } from '@/components/user/MembersTab';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Order, TabType } from '@/types/types';
import { SellerList } from '@/components/user/SellersTab';
import { ShopList } from '@/components/user/ShopList';
import { UserList } from '@/components/user/UserList';
import { MemberRequestsTab } from '@/components/user/MembersRequests';

const ProfilePage = () => {
  const { user, token } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  const orders: Order[] = [
    {
      id: 'order-789',
      date: '2023-05-15',
      status: 'completed',
      total: 149.98,
      items: 2,
      thumbnail: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80'
    },
    {
      id: 'order-790',
      date: '2023-06-02',
      status: 'pending',
      total: 89.99,
      items: 1,
      thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80'
    }
  ];

  useEffect(() => {
    if (!token || !user) {
      router.replace('/auth/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("✅ User loaded:", response.data.data);
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error('❌ Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, user, router]);

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <div className="text-red-500 text-center py-8">Failed to load user data</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab initialUser={currentUser} token={token ?? ""} />;
      case 'shop':
        return <ShopTab userId={currentUser._id} isOwner token={token ?? ""} />;
      case 'products':
        return <ProductsTab userId={currentUser._id} isOwner token={token ?? ""} />;
      case 'orders':
        return <OrdersTab orders={orders} />;
      case 'skills':
        return <SkillsTab userId={currentUser._id} isOwner token={token ?? ""} />;
      case 'members':
        return <MembersTab />;
      case 'membersrequests':
        return <MemberRequestsTab />;
      case 'sellers':
        return <SellerList />;
      case 'shops':
        return <ShopList />;
      case 'users':
        return <UserList token={token ?? ""} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Head>
        <title>{currentUser.firstName} | Profile</title>
        <meta name="description" content="User profile page for multi-vendor e-commerce app" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          name={currentUser.firstName}
          title="Shaddyna"
          subtitle={`Welcome back, ${currentUser.firstName}! 👋`}
        />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
