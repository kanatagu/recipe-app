import { Recipe, FavoriteUserRecipe, User, Review } from '@prisma/client';

export type SafeRecipeType = Omit<Recipe, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string | null;
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
  reviewedBy: User;
};

export type SafeFavoriteType = Omit<
  FavoriteUserRecipe,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string;
  updatedAt: string | null;
};

export type RecipeDirection = {
  step: number;
  content: string;
  image: string | null;
};
