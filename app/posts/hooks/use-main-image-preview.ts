import { useState, useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { RecipeSchema } from '@/schema';

export const useMainImagePreview = (
  defaultImage: string | null | undefined,
  setValue: UseFormSetValue<RecipeSchema>
) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setImagePreview(defaultImage || null);
  }, [defaultImage]);

  const onChangeUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];

    setValue('image', fileObject);
    setImagePreview(window.URL.createObjectURL(fileObject));
  };

  const deleteImage = () => {
    setValue('image', null);
    setImagePreview(null);
  };

  return {
    imagePreview,
    onChangeUploadImage,
    deleteImage,
  };
};
