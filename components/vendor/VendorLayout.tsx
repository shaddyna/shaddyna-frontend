import Link from 'next/link';
import { ReactNode } from 'react';

interface VendorLayoutProps {
  children: ReactNode;
  activeItem: string;
  vendorId: string;
}

const VendorLayout = ({ children, activeItem, vendorId }: VendorLayoutProps) => {
  return (
    <div className='relative flex flex-grow'>
      <div className='grid w-full md:grid-cols-5'>
        <div className='bg-base-200'>
          <ul className='menu gap-1'>
            {/*<li>
              <Link
                className={activeItem === 'dashboard' ? 'active' : ''}
                href={`/vendor/${vendorId}/dashboard`}
              >
                Dashboard
              </Link>
            </li>*/}
            <li>
              <Link
                className={activeItem === 'orders' ? 'active' : ''}
                href={`/vendor/${vendorId}/orders`}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                className={activeItem === 'products' ? 'active' : ''}
                href={`/vendor/${vendorId}/products`}
              >
                Products
              </Link>
            </li>
          </ul>
        </div>
        <div className='px-4 md:col-span-4'>{children}</div>
      </div>
    </div>
  );
};

export default VendorLayout;