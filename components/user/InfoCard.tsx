import React from 'react';

interface InfoCardProps {
  icon?: React.ReactNode;
  title: string;
  value: string;
  color: 'purple' | 'blue' | 'green' | 'yellow' | 'red';
  isCenter?: boolean;
  
}

const colorClasses = {
  purple: 'bg-purple-100 text-purple-600',
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  red: 'bg-red-100 text-red-600'
};

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, color }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);