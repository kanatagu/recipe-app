import { EmptyResult, NavCategory } from '@/components/layout';
import { Container } from '@/components/layout';
import { RecipeCard } from '@/components/recipe';
import { Heading } from '@/components/ui';

import { getCurrentUser, getRecipes, RecipeParams } from '@/lib/service';

type TopProps = {
  searchParams: RecipeParams;
};

export default async function Top({ searchParams }: TopProps) {
  const recipes = await getRecipes(searchParams);
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <NavCategory />
      <main>
        <Heading>Latest Home Recipes</Heading>
        {recipes.length === 0 ? (
          <EmptyResult showReset />
        ) : (
          <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8'>
            {recipes.map((recipe) => (
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
