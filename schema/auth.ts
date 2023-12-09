import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export const emailSchema = {
  email: z.string().email('This is not valid email address'),
};
export const nameSchema = {
  name: z.string().max(30, { message: 'Name must be less than 30 characters' }),
};
export const passwordSchema = {
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' }),
};

const signUpSchema = z
  .object({
    confirmationPassword: z.string().min(8, {
      message: 'Password must contain at least 8 characters',
    }),
    ...emailSchema,
    ...nameSchema,
    ...passwordSchema,
  })
  .refine((schema) => schema.password === schema.confirmationPassword, {
    path: ['confirmationPassword'],
    message: 'Password and confirmation password must match',
  });

const signInSchema = z.object({
  ...emailSchema,
  ...nameSchema,
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export const signUpResolver = zodResolver(signUpSchema);

export type SignInSchema = z.infer<typeof signInSchema>;
export const signInResolver = zodResolver(signInSchema);
