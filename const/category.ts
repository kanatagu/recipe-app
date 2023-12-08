import { Level, Meal, Feature, Cuisine } from '@prisma/client';

export const levels = [
  { id: Level.EASY, name: 'Easy' },
  { id: Level.MIDDLE, name: 'Middle' },
  { id: Level.DIFFICULT, name: 'Difficult' },
];

export const meals = [
  { id: Meal.BREAKFAST, name: 'Breakfast' },
  { id: Meal.LUNCH, name: 'Lunch' },
  { id: Meal.DINNER, name: 'Dinner' },
  { id: Meal.SIDE_DISH, name: 'Side Dish' },
  { id: Meal.SOUP, name: 'Soup' },
  { id: Meal.APPETIZER, name: 'Appetizer' },
  { id: Meal.DESSERT, name: 'Dessert' },
];

export const features = [
  { id: Feature.SIMPLE_QUICK, name: 'Simple & Quick' },
  { id: Feature.CLASSIC, name: 'Classic' },
  { id: Feature.COMFORT_FOOD, name: 'Comfort Food' },
  { id: Feature.PARTY, name: 'Party Food' },
  { id: Feature.ONE_POT_MEAL, name: 'One Pot Meal' },
  { id: Feature.HEALTHY, name: 'Healthy' },
];

export const cuisines = [
  { id: Cuisine.ITALIAN, name: 'Italian' },
  { id: Cuisine.AMERICAN, name: 'American' },
  { id: Cuisine.MEXICAN, name: 'Mexican' },
  { id: Cuisine.INDIAN, name: 'Indian' },
  { id: Cuisine.GREEK, name: 'Greek' },
  { id: Cuisine.JAPANESE, name: 'Japanese' },
  { id: Cuisine.CHINESE, name: 'Chinese' },
  { id: Cuisine.KOREAN, name: 'Korean' },
  { id: Cuisine.OTHERS, name: 'Others' },
];
