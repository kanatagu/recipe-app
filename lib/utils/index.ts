import {
  SafeReviewType,
  RecipeDirectionType,
} from '@/types';
import { Recipe } from '@prisma/client';

export const calculateAverageRating = (
  reviews: SafeReviewType[] | undefined
) => {
  if (!reviews || reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((acc, curr) => {
    return acc + curr.rating;
  }, 0);

  return totalRating / reviews.length;
};

export const parsedDirectionData = (
  directions: Recipe['directions']
) => {
  const directionsString = JSON.stringify(directions);

  if (directionsString) {
    const parsedDirections: RecipeDirectionType[] =
      JSON.parse(directionsString);
    return parsedDirections;
  }
};
