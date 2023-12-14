'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { FiX } from 'react-icons/fi';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { RecipeSchema } from '@/schema';

export const DynamicIngredients = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RecipeSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const emptyArrayErrorMessage = errors?.ingredients?.root?.message;

  return (
    <div>
      <FormField
        control={control}
        name='ingredients'
        render={() => (
          <FormItem>
            <FormLabel isRequired className={'text-sm md:text-base'}>
              Ingredients
            </FormLabel>

            <div className='flex flex-col gap-4 mt-2'>
              {fields.map((_, index) => (
                <div key={index} className='flex items-start  sm:w-1/2 gap-4'>
                  <FormField
                    control={control}
                    name={`ingredients.${index}.text`}
                    render={({ field }) => (
                      <FormItem className='flex-grow'>
                        <FormControl>
                          <Input
                            placeholder='½ cup warm water'
                            {...field}
                            className='text-sm md:text-base'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant='outline'
                    size='icon'
                    className=' text-slate-500'
                    type='button'
                    onClick={() => remove(index)}
                  >
                    <FiX size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </FormItem>
        )}
      />

      {/* Error Message for empty array */}
      {emptyArrayErrorMessage && (
        <p className='mt-1 text-sm font-medium text-destructive'>
          {emptyArrayErrorMessage}
        </p>
      )}

      <Button
        type='button'
        variant='primaryOutline'
        onClick={() => append({ text: '' })}
        className='mt-4'
      >
        Add Ingredient
      </Button>
    </div>
  );
};
