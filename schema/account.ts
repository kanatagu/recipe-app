import * as z from 'zod';

export const accountSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Please enter a name.',
    })
    .min(1, { message: 'Please enter a name.' })
    .max(30, { message: 'Name must be less than 30 characters' })
    .nullable(),
  username: z
    .string({
      invalid_type_error: 'Please enter a username.',
    })
    .min(1, { message: 'Please enter a username.' })
    .max(30, { message: 'Username must be less than 30 characters' })
    .nullable(),
  email: z
    .string({
      invalid_type_error: 'Please enter an email address.',
    })
    .min(1, { message: 'Please enter an email address.' })
    .email({ message: 'Please enter a valid email address.' })
    .nullable(),
  image: z
    .string({
      invalid_type_error: 'Please select an image',
    })
    .nullable(),
});
