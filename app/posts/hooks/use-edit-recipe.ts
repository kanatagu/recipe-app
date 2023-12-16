import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';

import { editRecipe, uploadImage } from '@/lib/actions';
import { RecipeSchema } from '@/schema';
import { RecipeDirectionType } from '@/types';

export const useEditRecipe = (id: string | undefined) => {
  const { toast } = useToast();
  const router = useRouter();

  const onEditRecipe = async (data: RecipeSchema) => {
    let imageWithUrl = data.image;
    let directionsWithUrl: RecipeDirectionType[] = [];

    try {
      if (data.image && typeof data.image !== 'string') {
        const formData = new FormData();
        formData.append('image', data.image);
        const res = await uploadImage(formData);

        if (res) imageWithUrl = res?.url;
      }

      for (let i = 0; i < data.directions.length; i++) {
        if (
          data.directions[i].image &&
          typeof data.directions[i].image !== 'string'
        ) {
          const formData = new FormData();
          formData.append('image', data.directions[i].image as File);
          const res = await uploadImage(formData);
          directionsWithUrl.push({
            ...data.directions[i],
            image: res?.url || null,
          });
        } else {
          directionsWithUrl.push({
            ...data.directions[i],
            image: data.directions[i].image as string | null,
          });
        }
      }

      if (!id) throw new Error('Recipe id not found');

      const actionParam = {
        ...data,
        image: imageWithUrl as string | null,
        directions: directionsWithUrl,
      };

      await editRecipe(actionParam, id);

      router.refresh();
      toast({
        variant: 'success',
        title: 'Successfully edited your recipe!',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong...',
        description: 'Please try again later.',
      });
      console.error(error);
    }
  };

  return {
    onEditRecipe,
  };
};
