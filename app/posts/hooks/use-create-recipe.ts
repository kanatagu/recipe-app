import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';

import { createRecipe, uploadImage} from '@/lib/actions';
import { RecipeSchema } from '@/schema';
import {  RecipeDirectionType } from '@/types';

export const useCreateRecipe = () => {
  const { toast } = useToast();
  const router = useRouter();

  const onCreateRecipe = async (data: RecipeSchema) => {
    let imageWithUrl = null;
    let directionsWithUrl: RecipeDirectionType[] = [];

    try {
      if (data.image) {
        const formData = new FormData();
        formData.append('image', data.image);
        const res = await uploadImage(formData);
        imageWithUrl = res?.url || null;
      }

      for (let i = 0; i < data.directions.length; i++) {
        if (data.directions[i].image) {
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
            image: null,
          });
        }
      }

      const actionParam = {
        ...data,
        image: imageWithUrl,
        directions: directionsWithUrl,
      };

      await createRecipe(actionParam);

      router.refresh();
      router.push('/posts');
      toast({
        variant: 'success',
        title: 'Successfully created your recipe!',
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
    onCreateRecipe,
  };
};
