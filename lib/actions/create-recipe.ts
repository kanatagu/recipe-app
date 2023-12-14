'use server';

import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/service';
import { RecipeSchema } from '@/schema';

export type ServerDirectionType = {
  step: number;
  content: string;
  image: string | null;
};

type ServerRecipeType = Omit<RecipeSchema, 'image' | 'directions'> & {
  image: string | null;
  directions: ServerDirectionType[];
};

export const createRecipe = async (formData: ServerRecipeType) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const { ingredients, public: publicType } = formData;

    const stringIngredients = ingredients.map((ingredient) => {
      return ingredient.text;
    });

    const booleanPublic = publicType === 'true';

    await prisma.recipe.create({
      data: {
        ...formData,
        ingredients: stringIngredients,
        public: booleanPublic,
        userId: currentUser.id,
      },
    });

    return;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create recipe');
  }
};
