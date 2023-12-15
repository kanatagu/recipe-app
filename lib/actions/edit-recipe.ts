'use server';

import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/service';
import { RecipeSchema } from '@/schema';
import { RecipeDirectionType } from '@/types';

type ServerRecipeType = Omit<RecipeSchema, 'image' | 'directions'> & {
  image: string | null;
  directions: RecipeDirectionType[];
};

export const editRecipe = async (formData: ServerRecipeType, id: string) => {
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

    const recipe = await prisma.recipe.update({
      where: {
        id,
        userId: currentUser.id,
      },
      data: {
        ...formData,
        ingredients: stringIngredients,
        public: booleanPublic,
      },
    });

    return;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to edit recipe');
  }
};
