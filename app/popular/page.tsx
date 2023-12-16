import { EmptyResult, NavCategory } from '@/components/layout';
import { Container } from '@/components/layout';
import { Heading } from '@/components/ui';
import { RecipeCard } from '@/components/recipe';

import {
  getCurrentUser,
  getPopularRecipes,
  RecipePopularParams,
} from '@/lib/service';

type PopularProps = {
  searchParams: RecipePopularParams;
};

export default async function Popular({ searchParams }: PopularProps) {
  const popularRecipes = await getPopularRecipes(searchParams);
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <NavCategory />
      <main>
        <Heading>Popular Home Recipes</Heading>
        {popularRecipes.length === 0 ? (
          <EmptyResult showReset />
        ) : (
          <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8'>
            {popularRecipes.map((recipe) => (
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
