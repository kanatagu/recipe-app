'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const signUpSchema = z
  .object({
    email: z.string().email('This is not valid email address'),
    name: z
      .string()
      .max(30, { message: 'Name must be less than 30 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password must contain at least 8 characters' }),
    confirmationPassword: z.string().min(8, {
      message: 'Password must contain at least 8 characters',
    }),
  })
  .refine((schema) => schema.password === schema.confirmationPassword, {
    path: ['confirmationPassword'],
    message: 'Password and confirmation password must match',
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
export const signUpResolver = zodResolver(signUpSchema);
