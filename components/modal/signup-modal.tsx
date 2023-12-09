'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSignUpModal } from '@/store';
import { SignUpForm } from '@/components/form';

export function SignUpModal() {
  const { isOpen, onClose } = useSignUpModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  );
}
