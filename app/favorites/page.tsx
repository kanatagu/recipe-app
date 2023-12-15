import { EmptyResult, NavCategory } from '@/components/layout';
import { Container } from '@/components/layout';
import { Heading } from '@/components/ui';
import { RecipeCard } from '@/components/recipe';

import { getCurrentUser, getFavorites } from '@/lib/service';

export default async function Favorites() {
  const favoriteRecipes = await getFavorites();
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <NavCategory />
      <main>
        <Heading>My Favorite Recipes</Heading>
        {favoriteRecipes.length === 0 ? (
          <EmptyResult showReset />
        ) : (
          <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8'>
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </main>
    </Container>
  );
}
