'use client';

import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Container, NavSp } from '@/components/layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { RecipeSearch } from '@/components/recipe';

import { useSignInModal } from '@/store';
import { SafeUserType } from '@/types/user';

type HeaderProps = {
  currentUser?: SafeUserType | null;
};

export function Header({ currentUser }: HeaderProps) {
  const router = useRouter();
  const { onOpen } = useSignInModal();

  const likeHandler = () => {
    if (currentUser) {
      router.push('/favorites');
      return;
    }

    onOpen();
  };

  const logoutHandler = () => {
    signOut();
    router.push('/');
  };

  return (
    <header className='sticky top-0 z-40'>
      <div className='w-full bg-white py-2 md:py-3 border-b-[1px] shadow-sm'>
        <Container main={false}>
          <div className='flex justify-between items-center'>
            <div className='w-[90px] sm:w-[118px]'>
              <Link href='/' className='hover:opacity-80'>
                <Image
                  src='/images/logo/logo.png'
                  width={118}
                  height={48}
                  alt='logo'
                  // className='h-11 object-contain'
                />
              </Link>
            </div>

            <div className='md:hidden'>
              <NavSp currentUser={currentUser} />
            </div>

            <div className='items-center hidden md:flex'>
              <RecipeSearch />
            </div>

            <div className='gap-6 items-center hidden md:flex'>
              {currentUser ? (
                <>
                  <Button
                    onClick={likeHandler}
                    className='hover:opacity-80 hover:bg-white'
                    variant='ghost'
                  >
                    <div className='flex gap-2 items-center font-semibold text-lg'>
                      <FaHeart size={22} className='fill-rose-500' />
                      Liked
                    </div>
                  </Button>

                  <Menubar className='border-none justify-center gap-8 p-0'>
                    <MenubarMenu>
                      <MenubarTrigger className='group p-0 rounded-full font-semibold hover:cursor-pointer transition hover:opacity-70'>
                        <Avatar>
                          <AvatarImage src={currentUser?.image || ''} />
                          <AvatarFallback>
                            <FiUser />
                          </AvatarFallback>
                        </Avatar>
                      </MenubarTrigger>
                      <MenubarContent align='end' hideWhenDetached={true}>
                        <MenubarItem
                          className='cursor-pointer text-lg font-semibold'
                          onClick={() => router.push('/posts')}
                        >
                          My Posts
                        </MenubarItem>
                        <MenubarItem
                          className='cursor-pointer text-lg font-semibold'
                          onClick={() => router.push('/account')}
                        >
                          Account
                        </MenubarItem>
                        <MenubarItem className='cursor-pointer text-lg font-semibold'>
                          <button
                            className='flex items-center gap-2 w-full'
                            onClick={logoutHandler}
                          >
                            <FiLogOut />
                            Logout
                          </button>
                        </MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </>
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
