"use client"
import Link from 'next/link';
import { ReactNode } from 'react';

interface VendorLayoutProps {
  children: ReactNode;
  activeItem: string;
  vendorId: string;
}

const VendorEditLayout = ({ children, activeItem, vendorId }: VendorLayoutProps) => {
  return (
    <div className='relative flex flex-grow'>
      <div className='grid w-full md:grid-cols-5'>
        <div className=''>
          <ul className='menu gap-1'>
       
          </ul>
        </div>
        <div className='px-4 md:col-span-4'>{children}</div>
      </div>
    </div>
  );
};

export default VendorEditLayout;
