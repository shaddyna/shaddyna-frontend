/*import React from 'react';
import { Member } from '@/types/types';
import { GradientButton } from './GradientButton';
import { Badge } from './Badge';

interface MembersRequestsTabProps {
  members: Member[];
}

export const MembersTab: React.FC<MembersRequestsTabProps> = ({ members }) => (
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

import React, { useEffect, useState } from 'react';
import { MemberRequest } from '@/types/types';
import { Badge } from './Badge';
import { GradientButton } from './GradientButton';
import { Spinner } from './Spinner';
import { useToast } from '@/components/ui/toast';

interface MemberRequestsTabProps {
  isAdmin?: boolean;
}

export const MemberRequestsTab: React.FC<MemberRequestsTabProps> = ({ isAdmin = false }) => {
  const [requests, setRequests] = useState<MemberRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [hasFetched, setHasFetched] = useState(false);


useEffect(() => {
  let isMounted = true;

  const fetchRequests = async () => {
    try {
      setLoading(true);
      console.log("📡 Fetching member requests...");

      const response = await fetch('https://shaddynab-new.onrender.com/api/membersrequests');
      const data = await response.json();

      console.log("📦 Raw response data:", data);

      if (response.ok && Array.isArray(data)) {
        if (isMounted) {
          setRequests(data);
          console.log(`✅ Successfully fetched ${data.length} requests.`);
        }

        toast?.({
          title: 'Success',
          description: 'Requests loaded successfully.',
        });
      } else {
        throw new Error(data?.message || 'Failed to fetch requests');
      }

      if (isMounted) setHasFetched(true);
    } catch (error) {
      console.error("❌ Failed to fetch requests:", error);
      toast?.({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  if (!hasFetched) {
    fetchRequests();
  }

  return () => {
    isMounted = false;
  };
}, [hasFetched]);



  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/membersrequests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (response.ok) {
        setRequests(requests.map(req => 
          req._id === id ? { ...req, status: data.data.status } : req
        ));
        toast({
          title: 'Success',
          description: `Request ${status}`,
        });
      } else {
        throw new Error(data.message || 'Failed to update request');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Membership Requests</h2>
          <p className="text-sm text-gray-500">
            {isAdmin ? 'Manage membership requests' : 'View your membership requests'}
          </p>
        </div>
        {isAdmin && (
          <div className="flex space-x-2">
            <GradientButton>
              <span>Export</span>
            </GradientButton>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <p className="text-gray-500">No membership requests found</p>
          </div>
        ) : (
          requests.map(request => (
            <div 
              key={request._id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                    <span className="text-lg font-medium text-purple-600">
                      {/*{request.userId.email}*/}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 truncate">{request.userId.email}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Applied on {new Date(request.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <Badge 
                      color={
                        request.status === 'approved' ? 'green' : 
                        request.status === 'rejected' ? 'red' : 'yellow'
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Payment Method</p>
                      <p className="font-medium capitalize">{request.paymentMethod}</p>
                    </div>
                    {request.paymentMethod === 'mpesa' && (
                      <div>
                        <p className="text-gray-500">MPESA Code</p>
                        <p className="font-medium">{request.mpesaCode}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium">KSh {request.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {isAdmin && request.status === 'pending' && (
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-2">
                  <button 
                    onClick={() => handleStatusUpdate(request._id, 'rejected')}
                    className="px-4 py-2 text-sm bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(request._id, 'approved')}
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};