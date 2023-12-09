'use server';

import bcrypt from 'bcrypt';
import { SignUpSchema } from '@/schema';
import prisma from '@/libs/prisma';

export const signUp = async ({ email, password, name }: SignUpSchema) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // TODO sign in

  return user;
};
