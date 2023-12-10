import prisma from '@/lib/prisma';

export async function getPopularRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        public: true,
      },
      take: 12,
      orderBy: {
        averageRating: 'desc',
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
