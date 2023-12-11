import prisma from '@/lib/prisma';

export async function getRecipe(id: string) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
      include: {
        reviews: {
          include: {
            reviewedBy: true,
          },
        },
        postedBy: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });

    if (!recipe) return null;

    const safeRecipe = {
      ...recipe,
      reviews: recipe.reviews.map((review) => ({
        ...review,
        createdAt: review.createdAt?.toISOString(),
      })),
      createdAt: recipe.createdAt?.toISOString(),
      updatedAt: recipe.updatedAt?.toISOString() || null,
    };

    return safeRecipe;
  } catch (error) {
    throw new Error('Failed to get a recipe');
  }
}
