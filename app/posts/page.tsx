import Link from 'next/link';

import { EmptyResult } from '@/components/layout';
import { Container } from '@/components/layout';
import { Heading } from '@/components/ui';
import { RecipeCard } from '@/components/recipe';
import { Button } from '@/components/ui/button';

import { getCurrentUser } from '@/lib/service';

export default async function Posts() {
  const currentUser = await getCurrentUser();

  const postedRecipes = currentUser?.postedRecipes;

  return (
    <Container>
      <main>
        <div className='flex justify-between items-center sm:mt-8'>
          <Heading>My Posts</Heading>
          <Button size='lg' className='sm:text-base' asChild>
            <Link href='/posts/create'>Add New Recipe</Link>
          </Button>
        </div>

        {!postedRecipes || postedRecipes.length === 0 ? (
          <EmptyResult
            title={'No Posted Recipes'}
            subtitle={'You can add a new recipe from Add New Recipe button.'}
          />
        ) : (
          <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8'>
            {postedRecipes.map((recipe) => (
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
