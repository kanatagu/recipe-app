'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

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

import { signUpResolver, SignUpSchema } from '@/schema';
import { useSignInModal, useSignUpModal } from '@/store';

export function SignUpForm() {
  const router = useRouter();
  const { onOpen: onSignInOpen } = useSignInModal();
  const { isOpen: isSignUpOpen, onClose: onSignUpClose } = useSignUpModal();

  const form = useForm<SignUpSchema>({
    resolver: signUpResolver,
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmationPassword: '',
    },
  });

  const { control, handleSubmit } = form;

  const onSignUp = (data: SignUpSchema) => {
    console.log('submit!', data);
  };

  const toSignInHandler = () => {
    if (isSignUpOpen) {
      onSignUpClose();
      onSignInOpen();
      return;
    }

    router.push('/signin');
  };

  return (
    <div>
      <Heading center>Create Your Account</Heading>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSignUp)} className='space-y-6 mt-8'>
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='John Doe'
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

          <FormField
            control={control}
            name='confirmationPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            <Button type='submit' size={'lg'} className='text-lg'>
              Create Account
            </Button>
          </div>
        </form>
      </Form>

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
