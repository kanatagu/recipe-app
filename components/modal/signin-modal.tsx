'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSignInModal } from '@/store';
import { SignInForm } from '@/components/form';

export function SignInModal() {
  const { isOpen, onClose } = useSignInModal();
  console.log('isOpen', isOpen);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <SignInForm />
      </DialogContent>
    </Dialog>
  );
}
