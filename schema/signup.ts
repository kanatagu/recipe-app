import * as z from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: 'Please enter an email address.',
      })
      .email({ message: 'Please enter a valid email address.' }),
    name: z
      .string({
        invalid_type_error: 'Please enter a name.',
      })
      .min(1, { message: 'Please enter a name.' })
      .max(30, { message: 'Name must be less than 30 characters' }),
    password: z
      .string({
        invalid_type_error: 'Please enter a password.',
      })
      .min(8, { message: 'Password must contain at least 8 characters' }),
    confirmationPassword: z.string().min(8, {
      message: 'Password must contain at least 8 characters',
    }),
  })
  .refine((schema) => schema.password === schema.confirmationPassword, {
    path: ['confirmationPassword'],
    message: 'Password and confirmation password must match',
  });
