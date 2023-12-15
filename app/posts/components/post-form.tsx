'use client';

import { useState, useEffect, useMemo } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { DynamicIngredients } from './dynamic-ingredients';
import { ImageUpload } from './image-upload';
import { DynamicDirections } from './dynamic-directions';

import { recipeResolver, RecipeSchema } from '@/schema';
import { levels, meals, features, cuisines } from '@/constants';
import { SafeRecipeDetailType } from '@/types';
import { parsedDirectionData } from '@/lib/utils';

import { useCreateRecipe } from '../hooks/use-create-recipe';
import { useEditRecipe } from '../hooks/use-edit-recipe';

type PropsFormProps = {
  recipe?: SafeRecipeDetailType;
};

export const PostForm = ({ recipe }: PropsFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const parsedDirections = useMemo(() => {
    if (!recipe?.directions)
      return [
        {
          image: null,
          step: 1,
          content: '',
        },
      ];

    return parsedDirectionData(recipe?.directions);
  }, [recipe?.directions]);

  const form = useForm<RecipeSchema>({
    resolver: recipeResolver,
    defaultValues: {
      title: recipe?.title || '',
      description: recipe?.description || '',
      image: recipe?.image || null,
      ingredients: recipe?.ingredients.map((ingredient) => ({
        text: ingredient,
      })) || [
        {
          text: '',
        },
      ],
      directions: parsedDirections,
      servings: recipe?.servings || 0,
      cookingTimeNumber: recipe?.cookingTimeNumber || 0,
      cookingTimeUnit:
        (recipe?.cookingTimeUnit as 'minutes' | 'hours') || 'minutes',
      level: recipe?.level || 'EASY',
      meals: recipe?.meals || [],
      features: recipe?.features || [],
      cuisines: recipe?.cuisines || [],
      note: recipe?.note || '',
      public: recipe?.public ? 'true' : 'false',
    },
  });

  useEffect(() => {
    setImagePreview(recipe?.image || null);
  }, [recipe?.image]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const { onCreateRecipe } = useCreateRecipe();
  const { onEditRecipe } = useEditRecipe(recipe?.id);

  const onChangeUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];

    setValue('image', fileObject);
    setImagePreview(window.URL.createObjectURL(fileObject));
  };

  const onAction: () => void = handleSubmit(
    recipe ? onEditRecipe : onCreateRecipe
  );

  return (
    <Form {...form}>
      <form action={onAction} className='flex flex-col gap-14 mt-8'>
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
                        placeholder='Description about your recipe'
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

        <DynamicDirections defaultDirections={parsedDirections} />

        <div className='flex flex-col sm:flex-row gap-6 sm:gap-14'>
          <FormField
            control={control}
            name='servings'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base' isRequired>
                  Servings
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='2'
                    {...field}
                    className='text-sm md:text-base w-28'
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      setValue('servings', value);
                    }}
                    value={watch('servings')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-2 relative mr-24 items-end'>
            <FormField
              control={control}
              name='cookingTimeNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm md:text-base' isRequired>
                    Cooking Time
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='30'
                      {...field}
                      className='text-sm md:text-base w-28'
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        setValue('cookingTimeNumber', value);
                      }}
                      value={watch('cookingTimeNumber')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='cookingTimeUnit'
              aria-label='cookingTimeUnit'
              render={({ field }) => (
                <FormItem
                  className={`absolute top-8 ${
                    errors.cookingTimeNumber?.message ? '-right-2' : '-right-24'
                  }`}
                >
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='minutes' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value='minutes'
                          className='text-sm md:text-base'
                        >
                          minutes
                        </SelectItem>
                        <SelectItem
                          value='hours'
                          className='text-sm md:text-base'
                        >
                          hours
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name='level'
            aria-label='level'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base'>Level</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='w-32 '>
                        <SelectValue placeholder='Easy' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem
                          key={level.id}
                          value={level.id}
                          className='text-sm md:text-base'
                        >
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <h2 className='font-bold text-lg'>Category</h2>

          <div className='mt-6 flex flex-col gap-10'>
            <FormField
              control={form.control}
              name='meals'
              render={() => (
                <FormItem>
                  <FormLabel className='text-base md:text-lg'>Meals</FormLabel>
                  <div className='flex flex-wrap items-center gap-x-8 gap-y-4 mt-4'>
                    {meals.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='meals'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className='flex items-center gap-1 min-w-[124px]'
                              noSpace
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>

                              <FormLabel className='font-normal text-sm md:text-base'>
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='features'
              render={() => (
                <FormItem>
                  <FormLabel className='text-base md:text-lg'>
                    Features
                  </FormLabel>
                  <div className='flex flex-wrap items-center gap-x-8 gap-y-4 mt-4'>
                    {features.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='features'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className='flex items-center gap-1 min-w-[140px]'
                              noSpace
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>

                              <FormLabel className='font-normal text-sm md:text-base'>
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='cuisines'
              render={() => (
                <FormItem>
                  <FormLabel className='text-base md:text-lg'>
                    Cuisines
                  </FormLabel>
                  <div className='flex flex-wrap items-center gap-x-8 gap-y-4 mt-4'>
                    {cuisines.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='cuisines'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className='flex items-center gap-1 min-w-[124px]'
                              noSpace
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>

                              <FormLabel className='font-normal text-sm md:text-base'>
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={control}
          name='note'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm md:text-base'>Note</FormLabel>
              <FormDescription>
                Add any helpful tips about ingredient substitutions, serving, or
                storage here.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder='e.g. You can experiment with different herbs or spices to make it uniquely yours.'
                  className='text-sm md:text-base flex-grow'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='public'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel className='text-sm md:text-base'>
                Are you ready to post?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={'true'} />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      Public ( Anyone can see this recipe )
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='false' />
                    </FormControl>
                    <FormLabel className='font-normal'>
                      Private ( Only you can see this recipe )
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex items-center mt-4'>
          <SubmitButton text='Save' />
        </div>
      </form>
    </Form>
  );
};
