import { SafeReviewType } from '@/types';

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
