import { Level, Meal, Feature, Cuisine } from '@prisma/client';
import prisma from '@/lib/prisma';

export type RecipeParams = {
  meals?: Meal;
  features?: Feature;
  cuisines?: Cuisine;
  level?: Level;
};

export async function getRecipes(params: RecipeParams) {
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        public: true,
        // meals: {
        //   // has: params.meals,
        // },
        // features: {
        //   // has: params.features,
        // },
        // cuisines: {
        //   // has: params.cuisines,
        // },
        // level: {
        //   // has: params.level,
        // },
      },
      // select: {
      //   id: true,
      //   title: true,
      //   description: true,
      //   image: true,
      //   ingredients: true,
      //   instructions: true,
      //   servings: true,
      //   cookingTimeNumber: true,
      //   cookingTimeUnit: true,
      //   level: true,
      //   meals: true,
      //   features: true,
      //   cuisines: true,
      //   notes: true,
      //   public: true,
      //   createdAt: true,
      //   updatedAt: true,
      //   user: {
      //     select: {
      //       id: true,
      //       name: true,
      //       image: true,
      //     },
      //   },
      // },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeRecipes = recipes.map((recipe) => ({
      ...recipe,
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt?.toISOString() || null,
    }));

    return safeRecipes;
  } catch (error) {
    console.error(error);
    return [];
  }
}
