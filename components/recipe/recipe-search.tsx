'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, KeyboardEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import qs from 'query-string';

import { Input } from '@/components/ui/input';

export const RecipeSearch = () => {
  const router = useRouter();
  const params = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const submitByEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      let currentQuery = {};
      let searchArray: string[] = [];

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const userInput = inputRef?.current?.value;

      if (userInput) {
        searchArray = userInput.split(' ');
        searchArray = searchArray.filter((word) => word.length > 0);
        searchArray = searchArray.map((word) => encodeURIComponent(word));
      }

      const updatedQuery = {
        ...currentQuery,
        searchWord: searchArray,
      };

      const url = qs.stringifyUrl(
        {
          url: '/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    }
  };

  return (
    <div className='flex items-center relative'>
      <FiSearch className='absolute left-3' />
      <Input
        type={'text'}
        name={'searchWord'}
        placeholder='Search a recipe..'
        aria-label='Search a recipe'
        className='pl-10 md:w-96 text-base'
        onKeyDown={(e) => submitByEnter(e)}
        ref={inputRef}
      />
    </div>
  );
};
