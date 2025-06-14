import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({ children, className = '' }) => (
  <button className={`w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-all shadow-md flex items-center justify-center space-x-2 ${className}`}>
    {children}
  </button>
);