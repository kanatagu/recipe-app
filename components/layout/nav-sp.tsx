'use client';

import { FaHeart } from 'react-icons/fa';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { RecipeSearch } from '@/components/recipe';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { SafeUserType } from '@/types';

type NavSpProps = {
  currentUser?: SafeUserType | null;
};

export function NavSp({ currentUser }: NavSpProps) {
  const router = useRouter();

  const logoutHandler = () => {
    signOut();
    router.push('/');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size='icon'>
          <FiMenu size='32' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className='py-12'>
          <RecipeSearch />
          {currentUser ? (
            <>
              <div className='flex flex-col gap-4 mt-6 p-2 text-lg'>
                <SheetClose asChild>
                  <Button
                    variant='ghost'
                    className='gap-2 font-semibold text-lg justify-start p-0'
                    onClick={() => router.push('/favorites')}
                  >
                    <FaHeart size={20} className='fill-rose-500' />
                    Liked
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    variant='ghost'
                    className='gap-2 font-semibold text-lg justify-start p-0'
                    onClick={() => router.push('/posts')}
                  >
                    My Posts
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    variant='ghost'
                    className='gap-2 font-semibold text-lg justify-start p-0'
                    onClick={() => router.push('/account')}
                  >
                    Account
                  </Button>
                </SheetClose>
              </div>
              <div className='mt-6 '>
                <SheetClose asChild>
                  <Button
                    className='flex gap-2  w-full'
                    variant='outline'
                    onClick={logoutHandler}
                  >
                    <FiLogOut />
                    Logout
                  </Button>
                </SheetClose>
              </div>
            </>
          ) : (
            <div className=''>
              <SheetClose asChild>
                <Button
                  variant='outline'
                  className='font-semibold p-2 w-2/4 mt-8'
                  onClick={() => router.push('/signin')}
                >
                  Sign In
                </Button>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
