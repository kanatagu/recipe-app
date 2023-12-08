'use client';

import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FiSearch, FiLogOut } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type NavSpProps = {
  isOpen: boolean;
};
export const NavSp = ({ isOpen }: NavSpProps) => {
  return (
    <nav
      className={`${
        isOpen ? 'right-0' : '-right-full'
      } top-[68px] transition-all duration-500 md:hidden absolute w-full z-20 bg-white`}
    >
      <div className='h-full px-4 py-8 w-full'>
        <div className='flex items-center flex-start relative'>
          <FiSearch className='absolute left-2' />
          <Input placeholder='Search a recipe..' className='pl-8' />
        </div>

        <div className='flex flex-col gap-4 mt-10 p-2'>
          <Link href='/' className='flex gap-2 items-center font-semibold p-2'>
            <FaHeart size={20} className='fill-rose-600' />
            Liked
          </Link>
          <Link href='/' className='font-semibold p-2'>
            My Posts
          </Link>
          <Link href='/ ' className='font-semibold p-2'>
            My Account
          </Link>
          <Button className='flex gap-2' variant='outline'>
            <FiLogOut />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};