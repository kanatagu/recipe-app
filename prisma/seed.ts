import { PrismaClient, Level, Meal, Feature, Cuisine } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const recipes = (userId: string) => {
  return [
    {
      userId: userId,
      title: 'Pasta',
      description: 'Pasta with tomato sauce',
      image:
        'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/xokmbwafdz9tqmoelcbt.jpg',
      ingredients: ['pasta 100g', 'tomato sauce 100g', '2cups of water'],
      instructions: [
        {
          step: 1,
          description: 'Boil water',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/xokmbwafdz9tqmoelcbt.jpg',
        },
        { step: 2, description: 'Add pasta', image: null },
        { step: 3, description: 'Cook for 10 minutes', image: null },
      ],
      servings: 1,
      cookingTimeNumber: 1,
      cookingTimeUnit: 'hour',
      level: [Level['EASY']],
      meals: [Meal['LUNCH']],
      features: [Feature['CLASSIC'], Feature['ONE_POT_MEAL']],
      cuisines: [Cuisine['ITALIAN']],
      notes: 'Add salt to taste',
      public: true,
    },
    {
      userId: userId,
      title: 'Omelette',
      description: 'Omelette with cheese',
      image:
        'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/xokmbwafdz9tqmoelcbt.jpg',
      ingredients: ['2 eggs', 'cheese 50g', '1 cup of water'],
      instructions: [
        { step: 1, description: 'Mix eggs and cheese', image: null },
        { step: 2, description: 'Cook for 10 minutes', image: null },
      ],
      servings: 2,
      cookingTimeNumber: 30,
      cookingTimeUnit: 'minutes',
      level: [Level['EASY']],
      meals: [Meal['LUNCH']],
      features: [Feature['COMFORT_FOOD']],
      cuisines: [Cuisine['ITALIAN']],
      notes: 'Add salt to taste',
      public: true,
    },
    {
      userId: userId,
      title: 'Chicken paprikash',
      description: 'Chicken paprikash with rice',
      image:
        'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/xokmbwafdz9tqmoelcbt.jpg',
      ingredients: ['chicken 100g', 'rice 100g', '1 cup of water'],
      instructions: [
        { step: 1, description: 'Cook chicken', image: null },
        { step: 2, description: 'Cook rice', image: null },
      ],
      servings: 2,
      cookingTimeNumber: 2,
      cookingTimeUnit: 'hour',
      level: [Level['MIDDLE']],
      meals: [Meal['DINNER']],
      features: [Feature['PARTY']],
      cuisines: [Cuisine['ITALIAN']],
      notes: 'Add salt to taste',
      public: false,
    },
    {
      userId: userId,
      title: 'Tacos',
      description: 'Tacos with chicken',
      image:
        'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/xokmbwafdz9tqmoelcbt.jpg',
      ingredients: ['chicken 100g', 'tortilla 100g', '1 cup of water'],
      instructions: [
        { step: 1, description: 'Cook chicken', image: null },
        { step: 2, description: 'Cook tortilla', image: null },
      ],
      servings: 4,
      cookingTimeNumber: 1,
      cookingTimeUnit: 'hour',
      level: [Level['DIFFICULT']],
      meals: [Meal['APPETIZER']],
      features: [Feature['CLASSIC'], Feature['ONE_POT_MEAL']],
      cuisines: [Cuisine['MEXICAN']],
      notes: 'Add salt to taste',
      public: true,
    },
  ];
};

async function main() {
  const password = await hash('password', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
      hashedPassword: password,
    },
  });

  for (const recipe of recipes(user.id)) {
    await prisma.recipe.create({
      data: recipe,
    });
  }

  console.log('Seed data created successfully');
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
