'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import qs from 'query-string';

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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActiveCategory = (key: string) => {
    const hasParam = searchParams.has(key);
    return hasParam;
  };

  const isActiveItem = (key: string, value: string) => {
    const searchParamValue = searchParams.get(key);
    return searchParamValue === value;
  };

  const routerPushWithQuery = (key: string, value?: string) => {
    const searchWord = searchParams?.get('searchWord');

    if (!value) {
      const url = qs.stringifyUrl(
        {
          url: `/${key}`,
          query: {
            ...(searchWord && { searchWord: searchWord }),
          },
        },
        { skipNull: true }
      );
      return router.push(url);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: {
          [key]: value,
          ...(searchWord && { searchWord: searchWord }),
        },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    // TODO Change layout for SP
    <ScrollArea>
      <nav className='md:pt-2 pb-6'>
        <Menubar className='border-none justify-center gap-8 p-0'>
          <MenubarMenu>
            <MenubarTrigger
              className={`w-30 text-lg font-semibold hover:cursor-pointer hover:text-slate-500 transition ${
                pathname === '/popular' && 'bg-slate-100'
              }`}
              // onClick={() => router.push('/popular')}
              onClick={() => routerPushWithQuery('popular')}
            >
              POPULAR
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className={`w-30 text-lg font-semibold hover:cursor-pointer hover:text-slate-500 transition ${
                isActiveCategory('meal') && 'bg-slate-100'
              }`}
            >
              MEALS
            </MenubarTrigger>
            <MenubarContent>
              {meals.map((meal) => (
                <MenubarItem
                  key={meal.id}
                  className={`text-md py-4 px-2 hover:cursor-pointer ${
                    isActiveItem('meal', meal.id) && 'bg-slate-100'
                  }`}
                  // onClick={() => router.push(`/?meal=${meal.id}`)}
                  onClick={() => routerPushWithQuery('meal', meal.id)}
                >
                  {meal.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className={`w-30 text-lg font-semibold hover:cursor-pointer hover:text-slate-500 transition ${
                isActiveCategory('feature') && 'bg-slate-100'
              }`}
            >
              FEATURES
            </MenubarTrigger>
            <MenubarContent>
              {features.map((feature) => (
                <MenubarItem
                  key={feature.id}
                  className={`text-md py-4 px-2 hover:cursor-pointer ${
                    isActiveItem('feature', feature.id) && 'bg-slate-100'
                  }`}
                  // onClick={() => router.push(`/?feature=${feature.id}`)}
                  onClick={() => routerPushWithQuery('feature', feature.id)}
                >
                  {feature.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className={`w-30 text-lg font-semibold hover:cursor-pointer hover:text-slate-500 transition ${
                isActiveCategory('cuisine') && 'bg-slate-100'
              }`}
            >
              CUISINES
            </MenubarTrigger>
            <MenubarContent>
              {cuisines.map((cuisine) => (
                <MenubarItem
                  key={cuisine.id}
                  className={`text-md py-4 px-2 hover:cursor-pointer ${
                    isActiveItem('cuisine', cuisine.id) && 'bg-slate-100'
                  }`}
                  // onClick={() => router.push(`/?cuisine=${cuisine.id}`)}
                  onClick={() => routerPushWithQuery('cuisine', cuisine.id)}
                >
                  {cuisine.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              className={`w-30 text-lg font-semibold hover:cursor-pointer hover:text-slate-500 transition ${
                isActiveCategory('level') && 'bg-slate-100'
              }`}
            >
              LEVELS
            </MenubarTrigger>
            <MenubarContent>
              {levels.map((level) => (
                <MenubarItem
                  key={level.id}
                  className={`text-md py-4 px-2 hover:cursor-pointer ${
                    isActiveItem('level', level.id) && 'bg-slate-100'
                  }`}
                  // onClick={() => router.push(`/?level=${level.id}`)}
                  onClick={() => routerPushWithQuery('level', level.id)}
                >
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
