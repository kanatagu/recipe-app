import { User } from '@prisma/client';
import { SafeFavoriteType, SafeRecipeType } from './recipe';

export type SafeUserType = Omit<
  User,
  'hashedPassword' | 'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string | null;
  emailVerified: string | null;
  favorites: SafeFavoriteType[];
  postedRecipes: SafeRecipeType[];
};
