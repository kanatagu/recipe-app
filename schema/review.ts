import * as z from 'zod';

export const reviewSchema = z.object({
  rating: z.coerce.number().min(0).max(5),
  comment: z
    .string()
    .max(500, { message: 'Comment must be less than 500 characters' })
    .nullable(),
});
