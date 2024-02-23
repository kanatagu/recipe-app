import { RecipeDirectionType } from '@/types';
import { Recipe } from '@prisma/client';

export const parsedDirectionData = (directions: Recipe['directions']) => {
  const directionsString = JSON.stringify(directions);

  if (directionsString) {
    const parsedDirections: RecipeDirectionType[] =
      JSON.parse(directionsString);
    return parsedDirections;
  }
};
