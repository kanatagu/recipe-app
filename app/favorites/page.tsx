import { EmptyResult, NavCategory } from '@/components/layout';
import { Container } from '@/components/layout';
import { Heading } from '@/components/ui';
import { RecipeCard } from '@/components/recipe';

import { getCurrentUser } from '@/lib/service';

export default async function Favorites() {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <NavCategory />
      <main>
        <Heading>My Favorite Recipes</Heading>
      </main>
    </Container>
  );
}
