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
    console.log('searchWord', searchWord);

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

    // TODO search with keyword
    if (searchWord) {
      let searchStrings = searchWord;
      if (Array.isArray(searchWord)) {
        console.log('配列');
        const searchAndQuery = searchWord.join(' & ');
        searchStrings = searchAndQuery;
      }
      console.log('searchStrings', searchStrings);

      // query = {
      //   ...query,
      //   title: {
      //     search: searchStrings,
      //   },
      //   description: {
      //     search: searchStrings,
      //   },
      //   ingredients: {
      //     has: searchStrings,
      //   },
      //   note: {
      //     search: searchStrings,
      //   },
      // };
    }

    console.log('query', query);

    const recipes = await prisma.recipe.findMany({
      where: {
        public: true,
        ...query,
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
