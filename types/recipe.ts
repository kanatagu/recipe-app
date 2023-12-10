import { Recipe } from '@prisma/client';

export type SafeRecipeType = Omit<Recipe, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string | null;
};
