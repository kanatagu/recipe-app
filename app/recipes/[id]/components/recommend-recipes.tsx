import { RecipeCard } from '@/components/recipe';
import { Heading } from '@/components/ui';

import { getRecipes } from '@/lib/service';
import { SafeUserType } from '@/types';

type RecommendRecipesProps = {
  currentUser: SafeUserType | null;
};

// TODO Change same category or search words and except user's recipe
export const RecommendRecipes = async ({
  currentUser,
}: RecommendRecipesProps) => {
  const recipes = await getRecipes({ take: 3 });

  return (
    <div className=''>
      <Heading as='h2'>More Recipes</Heading>
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8'>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};
