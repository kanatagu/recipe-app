import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/service';

export async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const favoriteIds = currentUser.favorites.map(
      (favorite) => favorite.recipeId
    );

    const favorites = await prisma.recipe.findMany({
      where: {
        id: {
          in: [...favoriteIds],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt?.toISOString(),
      updatedAt: favorite.updatedAt?.toISOString() || null,
    }));

    return safeFavorites;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}
