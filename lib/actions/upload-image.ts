'use server';

import cloudinary from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';

export const uploadImage: (
  formData: FormData
) => Promise<UploadApiResponse | undefined> = async (formData) => {
  const image = formData.get('image') as File;
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const res = await new Promise(
    (resolve: (value: UploadApiResponse | undefined) => void, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'recipe-app',
          },
          function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        )
        .end(buffer);
    }
  );
  return res;
};
