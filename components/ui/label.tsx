'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/shadcn-ui';

const labelVariants = cva(
  'text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { isRequired?: boolean }
>(({ className, isRequired, ...props }, ref) => (
  <div className='flex gap-1 flex-start'>
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
    {isRequired && <span className='text-red-500'>*</span>}
  </div>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
