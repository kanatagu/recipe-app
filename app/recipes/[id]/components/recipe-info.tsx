import Image from 'next/image';
import { FiUser } from 'react-icons/fi';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui';
import { FavoriteButton, EditDeleteButton, Stars } from '@/components/recipe';
import { Button } from '@/components/ui/button';
import { Review } from './review';
import { RecommendRecipes } from '@/app/recipes/[id]/components';

import { SafeRecipeDetailType, SafeUserType, RecipeDirection } from '@/types';
import { calculateAverageRating } from '@/lib/utils';

type RecipeInfoProps = {
  recipe: SafeRecipeDetailType;
  currentUser: SafeUserType | null;
};

export const RecipeInfo = async ({ recipe, currentUser }: RecipeInfoProps) => {
  const directionsString = JSON.stringify(recipe.directions);
  const directions: RecipeDirection[] = JSON.parse(directionsString);

  const averageRating = calculateAverageRating(recipe.reviews);

  const isMyPost = currentUser?.postedRecipes.some(
    (postedRecipe) => postedRecipe.id === recipe.id
  );

  return (
    <div className='flex flex-col gap-6 sm:gap-10 mt-4 sm:mt-6'>
      <div className='relative flex flex-col gap-4 sm:gap-6'>
        <div className='flex items-center justify-between'>
          <Heading>{recipe.title}</Heading>
          {isMyPost ? (
            <EditDeleteButton recipeId={recipe.id} large />
          ) : (
            <FavoriteButton
              currentUser={currentUser}
              recipeId={recipe.id}
              large
            />
          )}
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8'>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={currentUser?.image || ''} />
              <AvatarFallback>
                <FiUser />
              </AvatarFallback>
            </Avatar>
            <div>{recipe.postedBy.username}</div>
          </div>
          <div className='flex gap-4 items-center'>
            <span>{averageRating} rating</span>
            <div className='flex gap-2'>
              <Stars rating={averageRating} />
              <span>( {recipe.reviews.length} )</span>
            </div>
          </div>
        </div>

        <div>
          <Image
            alt='Recipe Image'
            src={recipe.image || '/images/default_image.jpg'}
            height={533}
            width={830}
            className='object-cover w-full mx-auto'
          />
        </div>

        <p className='sm:text-lg'>{recipe.description}</p>

        <div>
          <Separator className='my-3' />
          <div className='flex justify-between px-4 sm:px-10 items-center'>
            <div className='flex flex-col sm:flex-row gap-2 md:gap-20'>
              <div>
                <span className='font-semibold'>Level : </span>
                <span>{recipe.level}</span>
              </div>
              <div>
                <span className='font-semibold'>Servings : </span>
                <span>{recipe.servings}</span>
              </div>
              <div>
                <span className='font-semibold'>Time : </span>
                <span>{recipe.cookingTimeNumber} </span>
                <span>{recipe.cookingTimeUnit}</span>
              </div>
            </div>
            {/* TODO Print */}
            <Button>PRINT</Button>
          </div>
          <Separator className='my-3' />
        </div>
      </div>

      <div>
        <Heading as='h2'>Ingredients</Heading>
        <ul className='list-disc px-4 mt-4 sm:text-lg'>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <Heading as='h2'>Directions</Heading>
        <ul className='mt-4'>
          {directions.map((direction) => (
            <li key={direction.step} className='mt-6'>
              <span className='font-bold'>STEP {direction.step}</span>
              <div className='flex flex-col sm:flex-row gap-2 sm:gap-10 mt-2 sm:text-lg'>
                <p className='w-full'>{direction.content}</p>
                {direction.image && (
                  <Image
                    src={direction.image}
                    alt={`Picture of ${direction.step}`}
                    width={600}
                    height={400}
                    className='object-contain w-full sm:w-1/3 flex-shrink-0'
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Heading as='h2'>Note</Heading>
        <p className='mt-4 sm:text-lg'>{recipe.note}</p>
      </div>

      <Review
        reviews={recipe.reviews}
        currentUser={currentUser}
        recipeId={recipe.id}
      />

      <RecommendRecipes currentUser={currentUser} />
    </div>
  );
};
