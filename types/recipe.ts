import { Recipe, FavoriteUserRecipe } from '@prisma/client';

export type SafeRecipeType = Omit<Recipe, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string | null;
};

export type SafeFavoriteType = Omit<
  FavoriteUserRecipe,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string;
  updatedAt: string | null;
};
