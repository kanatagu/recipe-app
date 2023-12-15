import { Recipe, FavoriteUserRecipe, User, Review } from '@prisma/client';
import { SafeUserType } from '@/types';

export type SafeRecipeType = Omit<Recipe, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string | null;
  reviews?: SafeReviewType[];
};

type RecipeDetailsUser = Pick<User, 'id' | 'username' | 'image'>;

export type SafeRecipeDetailType = Omit<Recipe, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string | null;
  postedBy: RecipeDetailsUser;
  reviews: SafeReviewType[];
};

export type SafeReviewType = Omit<Review, 'createdAt'> & {
  createdAt: string;
  reviewedBy?: SafeUserType | User;
};

export type SafeFavoriteType = Omit<
  FavoriteUserRecipe,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string;
  updatedAt: string | null;
};

export type RecipeDirectionType = {
  step: number;
  content: string;
  image: string | null;
};
