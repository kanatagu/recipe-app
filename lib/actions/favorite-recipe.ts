'use server';

import prisma from '@/lib/prisma';

type FavoriteRecipeParams = {
  recipeId: string;
  userId: string;
};

export const addFavoriteRecipe = async ({
  recipeId,
  userId,
}: FavoriteRecipeParams) => {
  try {
    await prisma.favoriteUserRecipe.create({
      data: {
        recipeId,
        userId,
      },
    });
  } catch (error) {
    throw new Error('Failed to add recipe to favorites');
  }
};

export const deleteFavoriteRecipe = async (favoriteId: string) => {
  try {
    await prisma.favoriteUserRecipe.delete({
      where: {
        id: favoriteId,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete recipe from favorites');
  }
};
