'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FiSearch, FiLogOut, FiMenu, FiX, FiUser } from 'react-icons/fi';

import { Container, NavSp } from '@/components/layout';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useSignInModal } from '@/store';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authorized = false;

  const spNavClose = () => {
    setIsMenuOpen(false);
  };

  const { onOpen } = useSignInModal();

  return (
    <header className='fixed w-full bg-white z-20 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container main={false}>
          <div className='flex justify-between items-center'>
            <div onClick={() => setIsMenuOpen(false)}>
              <Link href='/' className='hover:opacity-80'>
                Recipe
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='md:hidden'
            >
              {isMenuOpen ? <FiX size='34' /> : <FiMenu size='34' />}
            </button>

            <NavSp isOpen={isMenuOpen} onClose={spNavClose} />

            <div className='items-center hidden md:flex'>
              <FiSearch className='relative left-7' />
              <Input placeholder='Search a recipe..' className='pl-10 w-96' />
            </div>
            <div className='gap-6 items-center hidden md:flex'>
              <Link href='/dashboard'>
                <div className='flex gap-2 items-center font-semibold text-lg'>
                  <FaHeart size={22} className='fill-rose-500' />
                  Liked
                </div>
              </Link>

              {authorized ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      {/* TODO Actual Image*/}
                      <AvatarImage src='' />
                      <AvatarFallback>
                        <FiUser />
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side='bottom'>
                    <DropdownMenuItem className='cursor-pointer text-base w-36'>
                      My Posts
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer text-base'>
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='cursor-pointer text-base'>
                      <FiLogOut />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button className='flex items-center gap-2' onClick={onOpen}>
                  <Avatar>
                    <AvatarImage src='' />
                    <AvatarFallback>
                      <FiUser />
                    </AvatarFallback>
                  </Avatar>
                  Sign in
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
