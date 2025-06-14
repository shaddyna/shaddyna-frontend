/*import React from 'react';
import { User } from '@/types/types';
import { Badge } from '../user/Badge';
import { GradientButton } from '../user/GradientButton';
import { InfoCard } from './InfoCard';

interface ProfileTabProps {
  user: User;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ user }) => (
  <div className="space-y-6">
    <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
      <div className="relative">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <div className="absolute -bottom-2 -right-2 bg-[#7e22ce] text-white rounded-full p-1 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-purple-600">{user.email}</p>
        <p className="text-sm text-gray-500 mt-1">{user.location}</p>
        
        <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
          <Badge color="purple">Verified Seller</Badge>
          <Badge color="blue">Premium Member</Badge>
        </div>
      </div>
    </div>
    
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-xl">
      <h3 className="font-semibold text-gray-900 mb-2">About</h3>
      <p className="text-gray-700">{user.bio}</p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InfoCard 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        }
        title="Member Since"
        value={user.joinDate}
        color="purple"
      />
      
      <InfoCard 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        }
        title="Location"
        value={user.location}
        color="blue"
      />
    </div>
    
    <GradientButton>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
      <span>Edit Profile</span>
    </GradientButton>
  </div>
);*/

// In your parent component that fetches the user data
import React, { useState, useEffect } from 'react';
import { User } from '@/types/profile';
import { Badge } from '../user/Badge';
import { GradientButton } from '../user/GradientButton';
import { InfoCard } from './InfoCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface ProfileTabProps {
  initialUser: User;
  token: string;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ initialUser, token }) => {
  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: initialUser.firstName,
    lastName: initialUser.lastName,
    email: initialUser.email,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /*useEffect(() => {
    setUser(initialUser);
    setFormData({
      firstName: initialUser.firstName,
      lastName: initialUser.lastName,
      email: initialUser.email,
    });
  }, [initialUser]);*/
  useEffect(() => {
  console.log('Collected user data:', initialUser); // ✅ Log user data

  setUser(initialUser);
  setFormData({
    firstName: initialUser.firstName,
    lastName: initialUser.lastName,
    email: initialUser.email,
  });
}, [initialUser]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.put(
        '/api/users/me',
        formData,
        config
      );

      setUser(data.data);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      // Refresh the page to ensure all data is up to date
      //router.replace(router.asPath);
    } catch (error) {
      let errorMessage = 'Failed to update profile';
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as any).response === 'object' &&
        (error as any).response !== null &&
        'data' in (error as any).response &&
        (error as any).response.data &&
        Array.isArray((error as any).response.data.errors) &&
        (error as any).response.data.errors[0]?.msg
      ) {
        errorMessage = (error as any).response.data.errors[0].msg;
      }
      toast.error(errorMessage);
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string | Date) => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative">
          <img 
            src={user.avatar || '/default-avatar.png'} 
            alt={`${user.firstName} ${user.lastName}`} 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-[#7e22ce] text-white rounded-full p-1 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-2 border"
                required
              />
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
            <p className="text-purple-600">{user.email}</p>
            
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              {user.role === 'admin' && <Badge color="red">Admin</Badge>}
              {user.role === 'seller' && <Badge color="purple">Seller</Badge>}
              {user.member && <Badge color="blue">Premium Member</Badge>}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-xl">
        <h3 className="font-semibold text-gray-900 mb-2">Account Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-gray-700 font-medium">
              {user.isActive ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-red-600">Inactive</span>
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Login</p>
            <p className="text-gray-700 font-medium">
              {user.lastLogin ? formatDate(user.lastLogin) : 'Never logged in'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          }
          title="Member Since"
          value={formatDate(user.createdAt)}
          color="purple"
        />
        
        <InfoCard 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          }
          title="Role"
          value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          color="blue"
        />
      </div>
      
      {!isEditing && (
        <GradientButton >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span>Edit Profile</span>
        </GradientButton>
      )}
    </div>
  );
};