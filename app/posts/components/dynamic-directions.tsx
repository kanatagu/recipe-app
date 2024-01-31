'use client';

import { useEffect, useState } from 'react';
import { useFieldArray, useWatch, useFormContext } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from './image-upload';

import { RecipeSchema } from '@/schema';
import { RecipeDirectionType } from '@/types';

type DynamicDirectionsProps = {
  defaultDirections: RecipeDirectionType[] | undefined;
};

export const DynamicDirections = ({
  defaultDirections,
}: DynamicDirectionsProps) => {
  const [imagePreviews, setImagePreviews] = useState<
    { indexNumber: number; image: string | null }[] | null
  >(null);

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<RecipeSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'directions',
  });

  const hasErrorForItem = Array.isArray(errors.directions);
  const emptyArrayErrorMessage = errors?.directions?.root?.message;

  const value = useWatch({
    name: 'directions',
    control,
  });

  useEffect(() => {
    if (defaultDirections) {
      const previewArray = defaultDirections.map((direction, index) => ({
        indexNumber: index,
        image: direction.image,
      }));
      setImagePreviews(previewArray);
    }
  }, [defaultDirections]);

  // Update step numbers and preview after each render as remove() will not update them
  useEffect(() => {
    fields.forEach((_, index) => {
      setValue(`directions.${index}.step`, index + 1);
    });

    const newPreviews = fields.map((direction, index) => {
      if (!direction.image)
        return {
          indexNumber: index,
          image: null,
        };

      if (typeof direction.image === 'string') {
        return {
          indexNumber: index,
          image: direction.image,
        };
      }

      return {
        indexNumber: index,
        image: window.URL.createObjectURL(direction.image),
      };
    });

    setImagePreviews(newPreviews);
  }, [fields, setValue]);

  const onChangeUploadImage = (
    index: number,
    e?: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e?.target.files) {
      const fileObject = e.target.files[0];

      setValue(`directions.${index}.image`, fileObject);

      setImagePreviews((preview) => {
        if (!preview)
          return [
            {
              indexNumber: index,
              image: window.URL.createObjectURL(fileObject),
            },
          ];

        const newPreview = [...preview];
        newPreview[index] = {
          indexNumber: index,
          image: window.URL.createObjectURL(fileObject),
        };

        return newPreview;
      });

      return;
    }
  };

  return (
    <div>
      <FormField
        control={control}
        name='directions'
        render={() => (
          <FormItem>
            <FormLabel className='text-sm md:text-base' isRequired>
              Directions
            </FormLabel>
            <div className='flex flex-col gap-8 mt-2'>
              {fields.map((_, index) => (
                <div key={index}>
                  <div className='flex items-center justify-between'>
                    <span className='font-semibold'>Step {index + 1}</span>
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
                  <div className='flex flex-col sm:flex-row gap-4 mt-2 items-stretch'>
                    <FormField
                      control={control}
                      name={`directions.${index}.content`}
                      render={({ field }) => (
                        <FormItem className='sm:w-full flex flex-col'>
                          <FormControl>
                            <Textarea
                              placeholder='e.g. Preheat oven to 400°F (200°C).'
                              {...field}
                              value={value[index]?.content || ''}
                              className='text-sm md:text-base h-full min-h-[120px]'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='w-1/2 sm:w-2/5 '>
                      <ImageUpload
                        onChangeUploadImage={(e) =>
                          onChangeUploadImage(index, e)
                        }
                        imagePreview={
                          imagePreviews?.find(
                            (preview) => preview.indexNumber === index
                          )?.image || null
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FormItem>
        )}
      />

      {emptyArrayErrorMessage && (
        <p className='mt-1 text-sm font-medium text-destructive'>
          {emptyArrayErrorMessage}
        </p>
      )}

      <Button
        type='button'
        variant='primaryOutline'
        onClick={() => {
          append({
            image: null,
            step: value.length + 1,
            content: '',
          });
        }}
        className={`${hasErrorForItem ? 'mt-12' : 'mt-4'}`}
      >
        Add Direction
      </Button>
    </div>
  );
};
