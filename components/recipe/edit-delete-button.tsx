'use client';

import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

type EditDeleteButtonProps = {
  recipeId: string;
  large?: boolean;
};

export const EditDeleteButton = ({
  recipeId,
  large = false,
}: EditDeleteButtonProps) => {
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
    <div className='absolute flex gap-3 items-center right-2 z-10'>
      <Button
        variant='outline'
        size='icon'
        className={`rounded-full bg-orange-50 text-primary border-orange-50 hover:text-primary hover:bg-orange-100 ${
          large ? 'w-14 h-14 ¥' : 'w-10 h-10'
        }`}
        aria-label='Edit Post'
        onClick={(e) => onClickHandler(e, 'edit')}
      >
        <FiEdit2 size={large ? 24 : 18} />
      </Button>
      <Button
        variant='outline'
        size='icon'
        className={`rounded-full bg-orange-50 text-primary border-slate-50 hover:text-primary hover:bg-orange-100 ${
          large ? 'w-14 h-14' : 'w-10 h-10'
        }`}
        aria-label='Delete Post'
      >
        <FiTrash2 size={large ? 24 : 18} />
      </Button>
    </div>
  );
};
