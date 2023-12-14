'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FiSearch, FiLogOut, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Container, NavSp } from '@/components/layout';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';

import { useSignInModal } from '@/store';
import { SafeUserType } from '@/types/user';

type HeaderProps = {
  currentUser?: SafeUserType | null;
};

export function Header({ currentUser }: HeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const spNavClose = () => {
    setIsMenuOpen(false);
  };

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

            <NavSp
              isOpen={isMenuOpen}
              onClose={spNavClose}
              currentUser={currentUser}
            />

            <div className='items-center hidden md:flex'>
              <FiSearch className='relative left-7' />
              <Input
                placeholder='Search a recipe..'
                className='pl-10 w-96 text-base'
              />
            </div>
            <div className='gap-6 items-center hidden md:flex'>
              {currentUser ? (
                <>
                  <button onClick={likeHandler}>
                    <div className='flex gap-2 items-center font-semibold text-lg'>
                      <FaHeart size={22} className='fill-rose-500' />
                      Liked
                    </div>
                  </button>

                  <Menubar className='border-none justify-center gap-8 p-0'>
                    <MenubarMenu>
                      <MenubarTrigger className='p-0 rounded-full font-semibold hover:cursor-pointer hover:bg-white active:bg-white transition'>
                        <Avatar>
                          <AvatarImage src={currentUser?.image || ''} />
                          <AvatarFallback>
                            <FiUser />
                          </AvatarFallback>
                        </Avatar>
                      </MenubarTrigger>
                      <MenubarContent align='end'>
                        <MenubarItem className='cursor-pointer text-lg font-semibold'>
                          <Link href='/posts' className='w-full'>
                            My Posts
                          </Link>
                        </MenubarItem>
                        <MenubarItem className='cursor-pointer text-lg font-semibold'>
                          <Link href='/account' className='w-full'>
                            Account
                          </Link>
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

                  {/* <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className='gap-2 hover:bg-white'>
                          <Avatar>
                            <AvatarImage src={currentUser?.image || ''} />
                            <AvatarFallback>
                              <FiUser />
                            </AvatarFallback>
                          </Avatar>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul>
                            <li>
                              <NavigationMenuLink>
                                <Link href='/posts'>My Posts</Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink>
                                <Link href='/account'>Account</Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <button
                                className='flex items-center gap-2 w-full'
                                onClick={logoutHandler}
                              >
                                <FiLogOut />
                                Logout
                              </button>
                            </li>
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu> */}

                  {/* <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src={currentUser?.image || ''} />
                        <AvatarFallback>
                          <FiUser />
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side='bottom'>
                      <DropdownMenuItem className='cursor-pointer text-lg w-36'>
                        <Link href='/posts'>My Posts</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className='cursor-pointer text-lg'>
                        <Link href='/account'>Account</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='cursor-pointer text-lg'>
                        <button
                          className='flex items-center gap-2 w-full'
                          onClick={logoutHandler}
                        >
                          <FiLogOut />
                          Logout
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> */}
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
