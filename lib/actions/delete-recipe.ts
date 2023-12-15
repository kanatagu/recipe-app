'use server';

import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/service';

type DeleteRecipeParams = {
  recipeId: string;
};

export const deleteRecipe = async ({ recipeId }: DeleteRecipeParams) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    await prisma.recipe.delete({
      where: {
        id: recipeId,
        userId: currentUser.id,
      },
    });
  } catch (error) {
    throw new Error('Failed to delete recipe');
  }
};
