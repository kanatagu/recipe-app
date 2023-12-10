import { Level, Meal, Feature, Cuisine } from '@prisma/client';
import prisma from '@/lib/prisma';

export type RecipeParams = {
  meal?: Meal;
  feature?: Feature;
  cuisine?: Cuisine;
  level?: Level;
};

export async function getRecipes(params: RecipeParams) {
  try {
    const { meal, feature, cuisine, level } = params;

    let query = {};

    if (meal) {
      query = {
        meals: {
          has: meal,
        },
      };
    }

    if (feature) {
      query = {
        features: {
          has: feature,
        },
      };
    }

    if (cuisine) {
      query = {
        cuisines: {
          has: cuisine,
        },
      };
    }

    if (level) {
      query = {
        level: {
          has: level,
        },
      };
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        public: true,
        ...query,
      },
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
