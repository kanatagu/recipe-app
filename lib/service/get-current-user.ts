import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        postedRecipes: true,
        favorites: true,
      },
    });

    if (!currentUser) return null;

    const safeRecipe = currentUser.postedRecipes.map((recipe) => ({
      ...recipe,
      createdAt: recipe.createdAt?.toISOString(),
      updatedAt: recipe.updatedAt?.toISOString() || null,
    }));

    const safeFavorite = currentUser.favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt?.toISOString(),
      updatedAt: favorite.updatedAt?.toISOString() || null,
    }));

    const { hashedPassword, ...rest } = currentUser;
    return {
      ...rest,
      postedRecipes: safeRecipe,
      favorites: safeFavorite,
      createdAt: currentUser.createdAt?.toISOString(),
      updatedAt: currentUser.updatedAt?.toISOString() || null,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch {
    return null;
  }
}
