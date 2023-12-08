'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FiSearch, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

import { Container } from '@/components/layout/container';
import { NavSp } from '@/components/layout/nav-sp';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex justify-between items-center'>
            <div>
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

            <NavSp isOpen={isMenuOpen} />

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

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Avatar>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </NavigationMenuTrigger>
                    {/* TODO fix style */}
                    <NavigationMenuContent>
                      <ul>
                        <li>
                          <Link href='/' legacyBehavior passHref>
                            <NavigationMenuLink
                              className={
                                navigationMenuTriggerStyle() + 'w-[300px]'
                              }
                            >
                              My Posts
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <li>
                          <Link href='/' legacyBehavior passHref>
                            <NavigationMenuLink
                              className={navigationMenuTriggerStyle()}
                            >
                              My Account
                            </NavigationMenuLink>
                          </Link>
                        </li>
                        <hr />
                        <li>
                          <Button className='w-full flex gap-2' variant='ghost'>
                            <FiLogOut />
                            Logout
                          </Button>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};
