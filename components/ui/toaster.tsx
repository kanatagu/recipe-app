'use client';

import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} variant={variant} {...props} className='w-fit'>
            <div className='flex items-start gap-2'>
              <div className='pt-1'>
                {variant === 'success' && <FaCheckCircle />}
                {variant === 'destructive' && <FaExclamationCircle />}
              </div>
              <div className='flex flex-col gap-1 items-start'>
                {title && <ToastTitle className='text-md'>{title}</ToastTitle>}
                {description && (
                  <ToastDescription className='text-sm'>
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
