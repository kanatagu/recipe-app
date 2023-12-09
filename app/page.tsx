import Image from 'next/image';
import { NavCategory } from '@/components/layout';
import { Container } from '@/components/layout';
import { RecipeCard } from '@/components/recipe';
import { Heading } from '../components/ui';

export default function Top() {
  return (
    <Container>
      <NavCategory />
      <main>
        <Heading>Latest Home Recipes</Heading>
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8'>
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      </main>
    </Container>
  );
}
