/*import React from 'react';
import { Member } from '@/types/types';
import { GradientButton } from './GradientButton';
import { Badge } from './Badge';

interface MembersTabProps {
  members: Member[];
}

export const MembersTab: React.FC<MembersTabProps> = ({ members }) => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
        <p className="text-sm text-gray-500">Manage your shop collaborators</p>
      </div>
      <GradientButton>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
        </svg>
        <span>Invite Member</span>
      </GradientButton>
    </div>
    
    <div className="space-y-4">
      {members.map(member => (
        <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
          <div className="flex items-center space-x-4">
            <img 
              src={member.avatar} 
              alt={member.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">{member.name}</h3>
                <Badge color={member.role === 'Admin' ? 'purple' : 'blue'}>
                  {member.role}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">Joined {new Date(member.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
            <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
              Message
            </button>
            <button className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
              Manage
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);*/

import React, { useState, useEffect } from 'react';
import { Member } from '@/types/types';
import { GradientButton } from './GradientButton';
import { Badge } from './Badge';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface MembersTabProps {
  initialMembers?: Member[];
  isAdmin?: boolean;
}

export const MembersTab: React.FC<MembersTabProps> = ({ 
  initialMembers = [],
  isAdmin = false
}) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [loading, setLoading] = useState(!initialMembers.length);
  const [error, setError] = useState('');
  const router = useRouter();

useEffect(() => {
  const fetchMembers = async () => {
    try {
      setLoading(true);
      console.log("🔄 Fetching members...");

      const response = await axios.get('https://shaddynab-new.onrender.com/api/members');

      const membersWithDisplayData = response.data.data.map((member: Member) => ({
        ...member,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`,
        role: member.status === 'active' ? 'Member' : 'Pending'
      }));

      setMembers(membersWithDisplayData);
      console.log("✅ Members fetched successfully");
      toast.success("Members loaded successfully");
    } catch (err) {
      console.error("❌ Failed to fetch members:", err);

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to load members');
      }

      toast.error('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  fetchMembers();
}, []);



  const handleInviteMember = () => {
    router.push('/members/invite');
  };

  const handleMessageMember = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleManageMember = (memberId: string) => {
    router.push(`/members/${memberId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'pending': return 'yellow';
      case 'inactive': return 'red';
      default: return 'blue';
    }
  };

  if (loading) return <div className="text-center py-8">Loading members...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!members.length) return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900">No members found</h3>
      <p className="text-gray-500 mt-1">Get started by inviting your first member</p>
      {isAdmin && (
        <div className="mt-6">
          <GradientButton >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
            </svg>
            <span>Invite Member</span>
          </GradientButton>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Team Members</h2>
          <p className="text-sm text-gray-500">Manage your membership requests</p>
        </div>
        {isAdmin && (
          <GradientButton >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
            </svg>
            <span>Invite Member</span>
          </GradientButton>
        )}
      </div>
      
      <div className="space-y-4">
        {members.map(member => (
          <div key={member._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
            <div className="flex items-center space-x-4">
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                  <Badge color={getBadgeColor(member.status)}>
                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    Paid: KES {member.amount}
                  </span>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                    {member.mpesaCode}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Joined {formatDate(member.createdAt)}
              </p>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleMessageMember(member.email)}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                >
                  Message
                </button>
                {isAdmin && (
                  <button 
                    onClick={() => handleManageMember(member._id)}
                    className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                  >
                    Manage
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};