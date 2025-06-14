import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color: 'purple' | 'blue' | 'green' | 'yellow' | 'red';
}

const colorClasses = {
  purple: 'bg-purple-100 text-purple-800',
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800'
};

export const Badge: React.FC<BadgeProps> = ({ children, color }) => (
  <span className={`px-2 py-1 text-xs rounded-full ${colorClasses[color]}`}>
    {children}
  </span>
);