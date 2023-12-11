import { EmptyResult, NavCategory } from '@/components/layout';
import { Container } from '@/components/layout';
import { RecipeInfo } from './components/recipe-info';

import { getCurrentUser, getRecipe } from '@/lib/service';

export default async function RecipeDetails({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await getRecipe(params.id);
  const currentUser = await getCurrentUser();

  console.log(recipe);

  if (!recipe) return <EmptyResult />;

  return (
    <Container maxWidth={'max-w-[910px]'}>
      <NavCategory />
      <main>
        <RecipeInfo recipe={recipe} currentUser={currentUser} />
      </main>
    </Container>
  );
}
