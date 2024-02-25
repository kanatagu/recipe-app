'use server';

import cloudinary from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';

export const uploadImage: (
  formData: FormData
) => Promise<UploadApiResponse | undefined> = async (formData) => {
  const image = (await formData.get('image')) as File;
  const fileBuffer = await image.arrayBuffer();

  const mime = image.type;
  const encoding = 'base64';
  const base64Data = Buffer.from(fileBuffer).toString('base64');
  const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {
    const uploadToCloudinary: () => Promise<UploadApiResponse> = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload(fileUri, {
            folder: 'recipe-app',
            invalidate: true,
          })
          .then((result) => {
            console.log(result);
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };

    const result = await uploadToCloudinary();

    return result;
  } catch (error) {
    console.error('Error uploading image', error);
    return;
  }
};
