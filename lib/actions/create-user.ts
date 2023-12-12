'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { signUpSchema } from '@/schema';

type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmationPassword?: string[];
  };
  values?: {
    name?: string;
    email?: string;
  };
  status?: 'Success' | 'Error' | null;
  message?: string | null;
};

export const createUser = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const validatedFields = signUpSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    confirmationPassword: formData.get('confirmationPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const randomUserName = Math.random().toString(36).slice(-8);

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        name,
        username: randomUserName,
      },
    });

    return {
      status: 'Success',
      values: {
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    return {
      status: 'Error',
      message: 'Failed to Create User',
    };
  }
};
