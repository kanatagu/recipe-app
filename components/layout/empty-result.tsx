'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type EmptyResultProps = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

export const EmptyResult = ({
  title = 'No results found.',
  subtitle = 'Try changing your search or filter.',
  showReset,
}: EmptyResultProps) => {
  const router = useRouter();

  return (
    <div className='flex flex-col gap-4 mt-20 items-center'>
      <p className='text-xl'>{title}</p>
      <p className='text-lg'>{subtitle}</p>
      {showReset ? (
        <Button
          variant='outline'
          className='mt-4'
          onClick={() => router.push('/')}
        >
          Remove all filters
        </Button>
      ) : (
        <Button
          variant='outline'
          className='mt-4'
          onClick={() => router.push('/')}
        >
          Back to Top
        </Button>
      )}
    </div>
  );
};
