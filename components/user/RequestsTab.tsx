import React from 'react';
import { Request } from '@/types/types';
import { Badge } from './Badge';

interface RequestsTabProps {
  requests: Request[];
}

export const RequestsTab: React.FC<RequestsTabProps> = ({ requests }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl font-bold text-gray-900">My Requests</h2>
      <p className="text-sm text-gray-500">Track your membership and seller requests</p>
    </div>
    
    <div className="space-y-4">
      {requests.map(request => (
        <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 capitalize">{request.type} Request</h3>
              <p className="text-xs text-gray-500 mt-1">{new Date(request.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
              {request.message && (
                <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded-lg">
                  {request.message}
                </p>
              )}
            </div>
            <Badge 
              color={
                request.status === 'approved' ? 'green' :
                request.status === 'pending' ? 'yellow' :
                'red'
              }
            >
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
          </div>
          
          {request.status === 'pending' && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end space-x-2">
              <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
                Cancel
              </button>
              <button className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
                View Details
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);