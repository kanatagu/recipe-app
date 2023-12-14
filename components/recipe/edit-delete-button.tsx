'use client';

import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

type EditDeleteButtonProps = {
  recipeId: string;
};

export const EditDeleteButton = ({ recipeId }: EditDeleteButtonProps) => {
  const route = useRouter();

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    e.stopPropagation();

    if (type === 'edit') {
      return route.push(`/posts/edit/${recipeId}`);
    }

    if (type === 'delete') {
      return console.log('Open Delete Modal!');
    }
  };

  return (
    <div className='absolute flex gap-2 items-center right-2 z-10'>
      <Button
        variant='outline'
        size='icon'
        className='rounded-full bg-slate-50 text-primary border-slate-50 hover:text-primary hover:bg-orange-50'
        aria-label='Edit Post'
        onClick={(e) => onClickHandler(e, 'edit')}
      >
        <FiEdit2 />
      </Button>
      <Button
        variant='outline'
        size='icon'
        className='rounded-full bg-slate-50 text-primary border-slate-50 hover:text-primary hover:bg-orange-50'
        aria-label='Delete Post'
      >
        <FiTrash2 />
      </Button>
    </div>
  );
};
