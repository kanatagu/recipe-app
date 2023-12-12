'use server';

import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/service';

type FavoriteRecipeParams = {
  recipeId: string;
};

export const addFavoriteRecipe = async ({ recipeId }: FavoriteRecipeParams) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    await prisma.favoriteUserRecipe.create({
      data: {
        recipeId,
        userId: currentUser.id,
      },
    });
  } catch (error) {
    throw new Error('Failed to add recipe to favorites');
  }
};

export const deleteFavoriteRecipe = async (favoriteId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    await prisma.favoriteUserRecipe.delete({
      where: {
        id: favoriteId,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete recipe from favorites');
  }
};
