import React, { useState, useEffect } from 'react';
import { User } from '@/types/types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Badge } from './Badge';
import { GradientButton } from './GradientButton';

interface UserListProps {
  token: string;
}

export const UserList = ({ token }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

 /* useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/users?page=${currentPage}`);
        const usersWithAvatars = response.data.data.map((user: User) => ({
          ...user,
          avatar: `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`,
          fullName: `${user.firstName} ${user.lastName}`
        }));
        setUsers(usersWithAvatars);
        setTotalPages(response.data.pages);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to load users');
        } else {
          setError('Failed to load users');
        }
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);*/
useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log(`📡 Fetching users for page ${currentPage}...`);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `https://shaddynab-new.onrender.com/api/users?page=${currentPage}`,
        config
      );

      const usersWithAvatars = response.data.data.map((user: User) => ({
        ...user,
        avatar: `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`,
        fullName: `${user.firstName} ${user.lastName}`,
      }));

      setUsers(usersWithAvatars);
      setTotalPages(response.data.pages);

      console.log(`✅ Successfully loaded ${usersWithAvatars.length} users.`);
    } catch (err) {
      const errorMessage =
        axios.isAxiosError(err)
          ? err.response?.data?.message || 'Failed to load users'
          : 'Failed to load users';

      console.error(`❌ Error loading users:`, errorMessage);

      setError(errorMessage);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    fetchUsers();
  }
}, [currentPage, token]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'purple';
      case 'seller': return 'blue';
      case 'customer': return 'green';
      default: return 'yellow';
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'green' : 'red';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewUser = (id: string) => {
    router.push(`/users/${id}`);
  };

  const handleAddUser = () => {
    router.push('/users/new');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <div className="text-center py-12">Loading users...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">
            {users.length} {users.length === 1 ? 'user' : 'users'} showing
          </p>
        </div>
        <GradientButton className="mt-4 md:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Add New User</span>
        </GradientButton>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200">
          <div className="col-span-4 font-medium text-gray-700">User</div>
          <div className="col-span-3 font-medium text-gray-700">Contact</div>
          <div className="col-span-2 font-medium text-gray-700">Role</div>
          <div className="col-span-2 font-medium text-gray-700">Status</div>
          <div className="col-span-1 font-medium text-gray-700">Actions</div>
        </div>

        {users.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No users found. Add your first user to get started.
          </div>
        ) : (
          users.map(user => (
            <div key={user._id} className="grid grid-cols-12 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="col-span-4 flex items-center">
                <img src={user.avatar} alt={user.fullName} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{user.fullName}</p>
                  <p className="text-sm text-gray-500">Joined {formatDate(user.createdAt)}</p>
                </div>
              </div>
              <div className="col-span-3 flex flex-col justify-center">
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <Badge color={getRoleColor(user.role)}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
                {user.member && (
                  <Badge color="blue">
                    Member
                  </Badge>
                )}
              </div>
              <div className="col-span-2 flex items-center">
                <Badge color={getStatusColor(user.isActive)}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <button
                  onClick={() => handleViewUser(user._id)}
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border ${currentPage === page ? 'bg-purple-600 text-white border-purple-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};