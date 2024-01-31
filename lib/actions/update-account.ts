'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/service';
import { accountSchema } from '@/schema';

type State = {
  errors?: {
    name?: string[];
    username?: string[];
    email?: string[];
    image?: string[];
  };
  values?: {
    name?: string;
    username?: string;
    email?: string;
    image?: string;
  };
  status?: 'Success' | 'Error' | null;
  message?: string | null;
};

export const updateAccount = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  console.log('name', formData.get('name'));
  console.log('username', formData.get('username'));
  console.log('email', formData.get('email'));
  console.log('image', formData.get('image'));

  const validatedFields = accountSchema.safeParse({
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
    image: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, username, email, image } = validatedFields.data;

  try {
    return {
      status: 'Success',
      values: {
        name: 'aaa',
      },
    };
  } catch (error) {
    return {
      status: 'Error',
      message: 'Failed to Update Account',
    };
  }
};
