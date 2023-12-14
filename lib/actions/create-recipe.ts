'use server';

import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/service';
import { RecipeSchema } from '@/schema';

export const createRecipe = async (formData: RecipeSchema) => {
  console.log({ formData });

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('User not found');
    }

    // const review = await prisma.review.create({
    //   data: {
    //     rating,
    //     comment,
    //     recipeId,
    //     userId: currentUser.id,
    //   },
    // });

    // return {
    //   status: 'Success',
    //   values: {
    //     rating: review.rating,
    //     comment: review.comment,
    //   },
    // };
  } catch (error) {
    throw new Error('Failed to create review');
  }
};
