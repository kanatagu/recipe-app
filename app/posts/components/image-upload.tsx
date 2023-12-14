'use client';

import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type ImageUploadProps = {
  onChangeUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
};

export const ImageUpload = ({
  onChangeUploadImage,
  imagePreview,
}: ImageUploadProps) => {
  return (
    <AspectRatio ratio={3 / 2}>
      <div
        className={`relative flex flex-col justify-center items-center hover:opacity-70 transition border-dashed border-2 s-center gap-4 text-neutral-600 w-full h-full`}
      >
        <Input
          type='file'
          id='image'
          name='image'
          accept='image/*'
          className='absolute inset-0 h-full w-full opacity-0 z-20  cursor-pointer'
          onChange={(e) => onChangeUploadImage(e)}
        />

        <TbPhotoPlus size={40} />
        <div className='font-semibold text-lg'>Click to upload</div>

        {imagePreview && (
          <div className='absolute inset-0 w-full h-full'>
            <Image
              fill
              style={{ objectFit: 'cover' }}
              src={imagePreview}
              alt='House'
            />
          </div>
        )}
      </div>
    </AspectRatio>
  );
};
