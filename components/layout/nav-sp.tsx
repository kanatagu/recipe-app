'use client';

import { FaHeart } from 'react-icons/fa';
import { FiSearch, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { SafeUserType } from '@/types';

type NavSpProps = {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: SafeUserType | null;
};

// TODO Move to search input and login to header
export function NavSp({ isOpen, onClose, currentUser }: NavSpProps) {
  const router = useRouter();

  const onClickItemHandler = (url: string) => {
    onClose();
    router.push(url);
  };

  const logoutHandler = () => {
    signOut();
    router.push('/');
  };

  return (
    <nav
      className={`${
        isOpen ? 'right-0' : '-right-full'
      } top-[67px] transition-all duration-500 md:hidden absolute w-full z-20 bg-white h-[calc(100vh-68px)]`}
    >
      <div className='h-full px-4 py-8 w-full'>
        <div className='flex items-center flex-start relative'>
          <FiSearch className='absolute left-2' />
          <Input placeholder='Search a recipe..' className='pl-8' />
        </div>

        {currentUser ? (
          <>
            <div className='flex flex-col gap-4 mt-6 p-2 text-lg'>
              <button
                className='flex gap-2 items-center font-semibold p-2'
                onClick={() => onClickItemHandler('/favorites')}
              >
                <FaHeart size={20} className='fill-rose-500' />
                Liked
              </button>
              <button
                className='font-semibold p-2 text-left'
                onClick={() => onClickItemHandler('/posts')}
              >
                My Posts
              </button>
              <button
                className='font-semibold p-2 text-left'
                onClick={() => onClickItemHandler('/account')}
              >
                Account
              </button>
            </div>
            <div className='mt-6 '>
              <Button
                className='flex gap-2  w-full'
                variant='outline'
                onClick={logoutHandler}
              >
                <FiLogOut />
                Logout
              </Button>
            </div>
          </>
        ) : (
          <div className=''>
            <Button
              variant='outline'
              className='font-semibold p-2 w-2/4 mt-8'
              onClick={() => onClickItemHandler('/signin')}
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
