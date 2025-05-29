// components/ui/skeleton.tsx
import { cn } from '@/lib/utils';
import { HTMLAttributes, forwardRef } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className
      )}
      {...props}
    />
  )
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };