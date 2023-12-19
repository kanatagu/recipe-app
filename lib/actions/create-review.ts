'use server';

import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/service';
import { reviewSchema } from '@/schema';

export const createReview = async (formData: FormData, recipeId: string) => {
  const validatedFields = reviewSchema.safeParse({
    rating: formData.get('rating'),
    comment: formData.get('comment'),
  });

  if (!validatedFields.success) {
    return {
      status: 'Error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { rating, comment } = validatedFields.data;

    return prisma.$transaction(async (tx) => {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        throw new Error('User not found');
      }

      if (!currentUser) {
        throw new Error('User not found');
      }

      const review = await tx.review.create({
        data: {
          rating,
          comment,
          recipeId,
          userId: currentUser.id,
        },
      });

      // Get all review to calculate average rating
      const reviews = await tx.review.findMany({
        where: {
          recipeId,
        },
      });

      // update recipe average rating
      const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
      const averageRating =
        Math.floor((totalRating / reviews.length) * 10) / 10;

      await tx.recipe.update({
        where: {
          id: recipeId,
        },
        data: {
          averageRating,
        },
      });

      return {
        status: 'Success',
        values: {
          rating: review.rating,
          comment: review.comment,
        },
      };
    });
  } catch (error) {
    throw new Error('Failed to create review');
  }
};
