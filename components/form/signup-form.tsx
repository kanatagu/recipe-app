'use client';

import { useFormState } from 'react-dom';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

import { SubmitButton } from '@/components/ui/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heading } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { useSignInModal, useSignUpModal } from '@/store';
import { createUser } from '@/lib/actions';

export function SignUpForm() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { onOpen: onSignInOpen } = useSignInModal();
  const { isOpen: isSignUpOpen, onClose: onSignUpClose } = useSignUpModal();

  const initialState = {
    errors: {},
    values: {},
    message: null,
    status: null,
  };

  const [state, dispatch] = useFormState(createUser, initialState);

  const toSignInHandler = () => {
    if (isSignUpOpen) {
      onSignUpClose();
      onSignInOpen();
      return;
    }

    if (pathname === '/signup') {
      router.push('/signin');
    }
  };

  useEffect(() => {
    if (state.status === 'Error') {
      toast({
        variant: 'destructive',
        title: 'Something went wrong...',
        description: 'Please try again later.',
      });
    }

    if (state.status === 'Success') {
      toast({
        variant: 'success',
        title: 'Successfully created your account!',
        description: 'Please login to continue.',
      });
      toSignInHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div>
      <Heading center>Create Your Account</Heading>
      <form action={dispatch} className='space-y-6 mt-8'>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='email' isRequired>
            Email
          </Label>
          <Input
            type='email'
            id='email'
            name='email'
            placeholder='example@gmail.com'
          />
          {state?.errors?.email &&
            state.errors.email.map((error) => (
              <p
                key={error}
                className='text-red-600 text-sm'
                id='name-error'
                aria-live='polite'
              >
                {error}
              </p>
            ))}
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='name' isRequired>
            Name
          </Label>
          <Input type='text' id='name' name='name' placeholder='John Doe' />
          {state?.errors?.name &&
            state.errors.name.map((error) => (
              <p
                key={error}
                className='text-red-600 text-sm'
                id='name-error'
                aria-live='polite'
              >
                {error}
              </p>
            ))}
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='password' isRequired>
            Password
          </Label>
          <Input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
          />
          {state?.errors?.password &&
            state.errors.password.map((error) => (
              <p
                key={error}
                className='text-red-600 text-sm'
                id='name-error'
                aria-live='polite'
              >
                {error}
              </p>
            ))}
        </div>

        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='confirmationPassword' isRequired>
            Confirm Password
          </Label>
          <Input
            type='password'
            id='confirmationPassword'
            name='confirmationPassword'
            placeholder='Password'
          />
          {state?.errors?.confirmationPassword &&
            state.errors.confirmationPassword.map((error) => (
              <p
                key={error}
                className='text-red-600 text-sm'
                id='name-error'
                aria-live='polite'
              >
                {error}
              </p>
            ))}
        </div>

        <div className='text-center'>
          <SubmitButton text='Create Account' className='w-full' />
        </div>
      </form>
      <div className='text-center mt-6 text-neutral-500 font-light'>
        <div className='flex items-center justify-between'>
          <Separator className='w-[42%]' />
          <p>or</p>
          <Separator className='w-[42%]' />
        </div>

        <Button
          variant='outline'
          className='w-full flex items-center gap-4 mt-6'
          onClick={() => signIn('google')}
        >
          <FcGoogle className='h-4 w-4' />
          Sign up with Google
        </Button>
      </div>
      <div className='text-center mt-8 text-neutral-500 font-light'>
        <p>Already have an account?</p>
        <button
          className='text-neutral-800 cursor-pointer hover:underline'
          onClick={toSignInHandler}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
