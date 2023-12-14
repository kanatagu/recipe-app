'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SubmitButton } from '@/components/ui/submit-button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ImageUpload } from './image-upload';
import { DynamicIngredients } from './dynamic-ingredients';
import { DynamicDirections } from './dynamic-directions';

import { createRecipe } from '@/lib/actions/create-recipe';
import { recipeResolver, RecipeSchema } from '@/schema';

export const PostForm = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<RecipeSchema>({
    resolver: recipeResolver,
    defaultValues: {
      title: '',
      description: '',
      image: null,
      ingredients: [
        {
          text: '',
        },
      ],
      directions: [
        {
          image: null,
          step: 1,
          content: '',
        },
      ],
      servings: null,
      cookingTimeNumber: null,
      cookingTimeUnit: 'minutes',
      level: [],
      meals: [],
      features: [],
      cuisines: [],
      note: null,
      public: false,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const onChangeUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];

    setValue('image', fileObject);
    setImagePreview(window.URL.createObjectURL(fileObject));
  };

  const onCreateRecipe: () => void = handleSubmit(
    async (data: RecipeSchema) => {
      console.log({ data });
      // const response = await createRecipe(data);
      // console.log({ response });
    }
  );

  console.log({ errors });

  return (
    <Form {...form}>
      <form action={onCreateRecipe} className='flex flex-col gap-14 mt-8'>
        <div className='flex flex-col sm:flex-row justify-between gap-6'>
          <div className='sm:w-1/2 flex flex-col gap-10'>
            <FormField
              control={control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired className='text-sm md:text-base'>
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Pasta'
                      {...field}
                      className='text-sm md:text-base'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='h-full flex-grow'>
              <FormField
                control={control}
                name='description'
                render={({ field }) => (
                  <FormItem className='h-full flex flex-col'>
                    <FormLabel className='text-sm md:text-base'>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Description about yor recipe'
                        className='text-sm md:text-base flex-grow'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='sm:w-1/2 relative'>
            <Label className='text-sm md:text-base'>Photo</Label>
            <ImageUpload
              imagePreview={imagePreview}
              onChangeUploadImage={onChangeUploadImage}
            />
            {imagePreview && (
              <Button
                variant='outline'
                size='sm'
                className='mt-2 text-right absolute -bottom-10 right-0'
                onClick={() => {
                  setValue('image', null);
                  setImagePreview(null);
                }}
              >
                Delete Photo
              </Button>
            )}
          </div>
        </div>

        <DynamicIngredients />

        <DynamicDirections />

        <div className='flex items-center mt-4'>
          <SubmitButton text='Save' />
        </div>
      </form>
    </Form>
  );
};
