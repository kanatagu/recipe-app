'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/ui';
import { Stars } from '@/components/recipe';
import { FavoriteButton, EditDeleteButton } from '@/components/recipe';

import { SafeRecipeType, SafeUserType } from '@/types';
import { meals, features, cuisines, levels } from '@/constants';

type RecipeCardProps = {
  recipe: SafeRecipeType;
  currentUser: SafeUserType | null;
};

export function RecipeCard({ recipe, currentUser }: RecipeCardProps) {
  const router = useRouter();

  const showThreeTags = () => {
    const allEnums = [...meals, ...features, ...cuisines, ...levels];
    const allTags = [
      ...recipe.meals,
      ...recipe.cuisines,
      ...recipe.features,
      ...recipe.level,
    ];

    const threeArray = allTags.slice(0, 3);
    const displayTags = threeArray.map((tag) => {
      const foundTag = allEnums.find((enumTag) => enumTag.id === tag);
      return foundTag?.name;
    });

    return displayTags;
  };

  const isMyPost = currentUser?.postedRecipes.some(
    (postedRecipe) => postedRecipe.id === recipe.id
  );

  return (
    <Card
      className='group cursor-pointer flex flex-col'
      onClick={() => router.push(`/recipes/${recipe.id}`)}
    >
      <CardHeader className='p-0 relative overflow-hidden'>
        <AspectRatio ratio={3 / 2}>
          <Image
            fill
            src={recipe.image || '/images/default_image.jpg'}
            alt='Recipe Image'
            className='object-cover h-full w-full group-hover:scale-110 transition'
          />
        </AspectRatio>

        {isMyPost ? (
          <EditDeleteButton recipeId={recipe.id} />
        ) : (
          <FavoriteButton currentUser={currentUser} recipeId={recipe.id} />
        )}
      </CardHeader>

      <CardContent className='p-4 flex flex-col flex-grow'>
        <div className='flex gap-3 flex-wrap flex-grow items-start'>
          {showThreeTags().map((tag) => (
            <Badge variant='outline' key={tag} className='flex-grow-0'>
              {tag}
            </Badge>
          ))}
        </div>

        <div className='mt-3 line-clamp-3 group-hover:text-slate-600 transition'>
          <Heading as='h2'>{recipe.title}</Heading>
        </div>

        <div className='mt-4 flex gap-4'>
          <Stars rating={recipe.averageRating || 0} />
          <span className='text-sm'>{recipe.averageRating || 0} rating</span>
        </div>
      </CardContent>
    </Card>
  );
}
