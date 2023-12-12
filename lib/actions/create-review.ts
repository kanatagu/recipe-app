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
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { rating, comment } = validatedFields.data;

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        recipeId,
        userId: currentUser.id,
      },
    });

    return {
      status: 'Success',
      values: {
        rating: review.rating,
        comment: review.comment,
      },
    };
  } catch (error) {
    throw new Error('Failed to create review');
  }
};
