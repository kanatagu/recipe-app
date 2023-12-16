import prisma from '@/lib/prisma';

export type RecipePopularParams = {
  searchWord?: string[] | string;
};

export async function getPopularRecipes(params: RecipePopularParams) {
  const { searchWord } = params;
  let query = [];
  let searchStrings = '';

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

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        ...(query && query.length
          ? { OR: query, NOT: { public: false } }
          : {
              public: true,
            }),
      },
      take: 12,
      orderBy: {
        averageRating: { sort: 'desc', nulls: 'last' },
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
