import * as z from 'zod';

export const reviewSchema = z.object({
  rating: z.coerce.number().min(0).max(5),
  comment: z
    .string()
    .max(300, { message: 'Comment must be less than 300 characters' })
    .nullable(),
});
