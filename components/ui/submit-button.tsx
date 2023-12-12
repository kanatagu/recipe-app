'use client';

import { useFormStatus } from 'react-dom';
import { PiSpinnerGap } from 'react-icons/pi';
import { Button, ButtonProps } from '@/components/ui/button';

type SubmitButtonProps = {
  text: string;
  showPendingText?: boolean;
} & ButtonProps;

export function SubmitButton({
  text,
  showPendingText = true,
  ...props
}: SubmitButtonProps) {
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
          <PiSpinnerGap
            className={`${showPendingText && 'mr-3'} animate-spin`}
          />
          {showPendingText && 'Please wait'}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
