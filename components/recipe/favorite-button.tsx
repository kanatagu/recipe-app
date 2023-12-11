'use client';

import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { useSignInModal } from '@/store';
import { SafeUserType } from '@/types';
import { addFavoriteRecipe, deleteFavoriteRecipe } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type FavoriteButtonProps = {
  currentUser: SafeUserType | null;
  recipeId: string;
  large?: boolean;
};

export const FavoriteButton = ({
  currentUser,
  recipeId,
  large = false,
}: FavoriteButtonProps) => {
  const router = useRouter();
  const { onOpen } = useSignInModal();
  const { toast } = useToast();

  const isFavorite = currentUser?.favorites.some(
    (favorite) => favorite.recipeId === recipeId
  );

  const onAddHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return onOpen();
    }

    await addFavoriteRecipe({ recipeId, userId: currentUser.id })
      .then(() => {
        router.refresh();
        toast({
          variant: 'success',
          title: 'Added to favorites!',
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

  const onDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return onOpen();
    }

    const favoriteId = currentUser.favorites.find(
      (favorite) => favorite.recipeId === recipeId
    )?.id;

    if (favoriteId) {
      await deleteFavoriteRecipe(favoriteId)
        .then(() => {
          router.refresh();
          toast({
            variant: 'success',
            title: 'Remove from favorites!',
          });
        })
        .catch(() => {
          toast({
            variant: 'destructive',
            title: 'Something went wrong...',
            description: 'Please try again later.',
          });
        });
    }

    if (!favoriteId) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong...',
        description: 'Please try again later.',
      });
    }
  };

  if (isFavorite) {
    return (
      <Button
        className={`absolute right-2 z-10 rounded-full border-none bg-red-200 hover:bg-red-100 ${
          large ? 'w-14 h-14' : 'w-10 h-10'
        }`}
        variant='outline'
        size='icon'
        onClick={onDeleteHandler}
        aria-label='Remove from favorites'
      >
        <FaHeart size={large ? 24 : 18} className='fill-rose-500' />
      </Button>
    );
  }

  return (
    <Button
      className={`absolute right-2 z-10 rounded-full bg-white ${
        large ? 'w-14 h-14' : 'w-10 h-10'
      }`}
      variant='outline'
      size='icon'
      onClick={onAddHandler}
      aria-label='Add to favorites'
    >
      <FiHeart size={large ? 24 : 18} className='text-gray-400' />
    </Button>
  );
};
