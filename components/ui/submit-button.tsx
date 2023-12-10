'use client';

import { useFormStatus } from 'react-dom';
import { PiSpinnerGap } from 'react-icons/pi';
import { Button, ButtonProps } from '@/components/ui/button';

type SubmitButtonProps = {
  text: string;
} & ButtonProps;

export function SubmitButton({ text, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size={'lg'}
      className='text-lg'
      disabled={pending}
      {...props}
    >
      {pending ? (
        <>
          <PiSpinnerGap className='mr-3 animate-spin' />
          Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
}
