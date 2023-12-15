'use client';

import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';

import { deleteRecipe } from '@/lib/actions';

type EditDeleteButtonProps = {
  recipeId: string;
  large?: boolean;
};

export const EditDeleteButton = ({
  recipeId,
  large = false,
}: EditDeleteButtonProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const onDeleteHandler = async () => {
    await deleteRecipe({ recipeId })
      .then(() => {
        router.refresh();
        toast({
          variant: 'success',
          title: 'Successfully deleted!',
        });
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Something went wrong...',
          description: 'Please try again later.',
        });
      });
  };

  return (
    <div className='flex gap-3 items-center'>
      <Button
        variant='outline'
        size='icon'
        className={`rounded-full bg-orange-50 text-primary border-orange-50 hover:text-primary hover:bg-orange-100 ${
          large ? 'sm:w-14 sm:h-14' : 'w-10 h-10'
        }`}
        aria-label='Edit Post'
        onClick={() => router.push(`/posts/edit/${recipeId}`)}
      >
        <FiEdit2 size={18} />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className={`rounded-full bg-orange-50 text-primary border-slate-50 hover:text-primary hover:bg-orange-100 ${
              large ? 'sm:w-14 sm:h-14' : 'w-10 h-10'
            }`}
            aria-label='Delete Post'
          >
            <FiTrash2 size={18} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              recipe from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteHandler}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
