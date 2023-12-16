import { Level, Meal, Feature, Cuisine } from '@prisma/client';
import prisma from '@/lib/prisma';

export type RecipeParams = {
  meal?: Meal;
  feature?: Feature;
  cuisine?: Cuisine;
  level?: Level;
  searchWord?: string[] | string;
  take?: number;
};

export async function getRecipes(params: RecipeParams) {
  try {
    const { meal, feature, cuisine, level, searchWord, take } = params;

    let query = [];
    let searchStrings = '';

    if (meal) {
      query.push({
        meals: {
          has: meal,
        },
      });
    }

    if (feature) {
      query.push({
        features: {
          has: feature,
        },
      });
    }

    if (cuisine) {
      query.push({
        cuisines: {
          has: cuisine,
        },
      });
    }

    if (level) {
      query.push({
        level: {
          equals: level,
        },
      });
    }

    if (searchWord) {
      if (Array.isArray(searchWord)) {
        const searchAndQuery = searchWord.join(' & ');
        searchStrings = searchAndQuery;
      } else {
        searchStrings = searchWord;
      }

      query.push(
        {
          title: {
            search: searchStrings,
          },
        },
        {
          description: {
            search: searchStrings,
          },
        },
        {
          ingredients: {
            hasSome: [searchStrings],
          },
        },
        {
          note: {
            search: searchStrings,
          },
        }
      );
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        ...(query && query.length
          ? { OR: query, NOT: { public: false } }
          : {
              public: true,
            }),
      },
      include: {
        reviews: true,
      },
      take: take || undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeRecipes = recipes.map((recipe) => ({
      ...recipe,
      reviews: recipe.reviews.map((review) => ({
        ...review,
        createdAt: review.createdAt.toISOString(),
      })),
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt?.toISOString() || null,
    }));

    return safeRecipes;
  } catch (error) {
    console.error(error);
    return [];
  }
}
