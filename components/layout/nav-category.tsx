'use client';

import { useRouter } from 'next/navigation';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { meals, cuisines, features, levels } from '@/constants';

export function NavCategory() {
  const router = useRouter();

  return (
    // TODO Change layout for SP
    <ScrollArea>
      <nav className='md:pt-2 pb-6'>
        <Menubar className='border-none justify-center gap-8 p-0'>
          <MenubarMenu>
            <MenubarTrigger
              className='w-30 text-lg font-semibold hover:cursor-pointer hover:text-slate-500 transition'
              onClick={() => router.push('/popular')}
            >
              POPULAR
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className='w-30 text-lg font-semibold hover:cursor-pointer hover:text-slate-500 transition'>
              MEALS
            </MenubarTrigger>
            <MenubarContent>
              {meals.map((meal) => (
                <MenubarItem key={meal.id} className='text-md py-4 px-2'>
                  {meal.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className='w-30 text-lg font-semibold hover:cursor-pointer hover:text-slate-500 transition'>
              FEATURES
            </MenubarTrigger>
            <MenubarContent>
              {features.map((feature) => (
                <MenubarItem key={feature.id} className='text-md py-4 px-2'>
                  {feature.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className='w-30 text-lg font-semibold hover:cursor-pointer hover:text-slate-500 transition'>
              CUISINES
            </MenubarTrigger>
            <MenubarContent>
              {cuisines.map((cuisine) => (
                <MenubarItem key={cuisine.id} className='text-md py-4 px-2'>
                  {cuisine.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className='w-30 text-lg font-semibold hover:cursor-pointer hover:text-slate-500 transition'>
              LEVELS
            </MenubarTrigger>
            <MenubarContent>
              {levels.map((level) => (
                <MenubarItem key={level.id} className='text-md py-4 px-2'>
                  {level.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </nav>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
