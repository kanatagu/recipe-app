'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Level, Meal, Feature, Cuisine } from '@prisma/client';

export const recipeSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title must be less than 100 characters' }),
  description: z
    .string()
    .max(300, { message: 'Description must be less than 500 characters' })
    .optional(),
  image: z.instanceof(File).nullable().or(z.string().url()),
  ingredients: z
    .array(
      z.object({
        text: z
          .string()
          .min(1, { message: 'Ingredient is required.' })
          .max(100, { message: 'Ingredient must be less than 100 characters' }),
      })
    )
    .min(1, { message: 'At least 1 ingredient is required.' }),
  directions: z
    .array(
      z.object({
        step: z.number(),
        content: z
          .string()
          .min(1, { message: 'Ingredient is required.' })
          .max(500, {
            message: 'Description must be less than 500 characters',
          }),
        image: z.instanceof(File).nullable().or(z.string().url()),
      })
    )
    .min(1, { message: 'At least 1 direction is required.' }),
  // TODO: refactor to nullable
  servings: z.number().positive(),
  cookingTimeNumber: z.number().positive(),
  cookingTimeUnit: z.union([z.literal('minutes'), z.literal('hours')]),
  level: z.union([
    z.literal(Level['EASY']),
    z.literal(Level['MIDDLE']),
    z.literal(Level['DIFFICULT']),
  ]),
  meals: z.array(
    z.union([
      z.literal(Meal['BREAKFAST']),
      z.literal(Meal['LUNCH']),
      z.literal(Meal['DINNER']),
      z.literal(Meal['SIDE_DISH']),
      z.literal(Meal['SOUP']),
      z.literal(Meal['APPETIZER']),
      z.literal(Meal['DESSERT']),
    ])
  ),
  features: z.array(
    z.union([
      z.literal(Feature['SIMPLE_QUICK']),
      z.literal(Feature['CLASSIC']),
      z.literal(Feature['COMFORT_FOOD']),
      z.literal(Feature['PARTY']),
      z.literal(Feature['ONE_POT_MEAL']),
      z.literal(Feature['HEALTHY']),
      z.literal(Feature['VEGETARIAN']),
      z.literal(Feature['VEGAN']),
    ])
  ),
  cuisines: z.array(
    z.union([
      z.literal(Cuisine['ITALIAN']),
      z.literal(Cuisine['AMERICAN']),
      z.literal(Cuisine['MEXICAN']),
      z.literal(Cuisine['INDIAN']),
      z.literal(Cuisine['GREEK']),
      z.literal(Cuisine['JAPANESE']),
      z.literal(Cuisine['CHINESE']),
      z.literal(Cuisine['KOREAN']),
      z.literal(Cuisine['OTHERS']),
    ])
  ),
  note: z
    .string()
    .max(300, { message: 'Note must be less than 300 characters' }),
  public: z.string(),
});

export type RecipeSchema = z.infer<typeof recipeSchema>;
export const recipeResolver = zodResolver(recipeSchema);
