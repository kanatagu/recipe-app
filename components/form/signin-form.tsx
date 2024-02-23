'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter, usePathname } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Heading } from '@/components/ui';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '../ui/separator';

import { signInResolver, SignInSchema } from '@/schema';
import { useSignInModal, useSignUpModal } from '@/store';

export function SignInForm() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { isOpen: isSignInOpen, onClose: onSignInClose } = useSignInModal();
  const { onOpen: onSignUpOpen } = useSignUpModal();
  const form = useForm<SignInSchema>({
    resolver: signInResolver,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { control, handleSubmit } = form;

  const onSignIn = (data: SignInSchema) => {
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        onSignInClose();
        router.refresh();

        if (pathname === '/signin') {
          router.push('/');
          router.refresh();
        }
      }

      if (callback?.error) {
        toast({
          variant: 'destructive',
          title: 'Invalid login credentials.',
          description: 'Please try again.',
        });
      }
    });
  };

  const toSignUpHandler = () => {
    if (isSignInOpen) {
      onSignInClose();
      onSignUpOpen();
      return;
    }

    router.push('/signup');
  };

  return (
    <div>
      <Heading center>Welcome Back!</Heading>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSignIn)} className='space-y-6  mt-8'>
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='example@gmail.com'
                    {...field}
                    className='text-sm md:text-base'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Password'
                    {...field}
                    className='text-sm md:text-base'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='text-center'>
            <Button type='submit' size={'lg'} className='text-lg w-full'>
              Sign In
            </Button>
          </div>
        </form>
      </Form>

      <div className='text-center mt-6 text-neutral-500 font-light'>
        <div className='flex items-center justify-between'>
          <Separator className='w-[42%]' />
          <p>or</p>
          <Separator className='w-[42%]' />
        </div>

        <Button
          variant='outline'
          className='w-full flex items-center gap-4 mt-6'
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <FcGoogle className='h-4 w-4' />
          Sign in with Google
        </Button>
      </div>

      <div className='text-center mt-8 text-neutral-500 font-light'>
        <p>Don&apos;t have account yet?</p>
        <button
          className='text-neutral-800 cursor-pointer hover:underline'
          onClick={toSignUpHandler}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
