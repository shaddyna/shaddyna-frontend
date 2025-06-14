import React from 'react';
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
);