import { Level, Meal, Feature, Cuisine } from '@prisma/client';

export const recipe = (userId: string) => {
  return {
    userId,
    title: 'Chicken Fry',
    description: 'Chicken Fry with sauce',
    image:
      'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702247291/grvltn5ynlbscz6bdgav.jpg',
    ingredients: ['chicken 100g', 'rice 100g', '1 cup of water'],
    directions: [
      { step: 1, content: 'Cook chicken', image: null },
      { step: 2, content: 'Cook rice', image: null },
    ],
    servings: 4,
    cookingTimeNumber: 1,
    cookingTimeUnit: 'hour',
    level: [Level['MIDDLE']],
    meals: [Meal['DINNER']],
    features: [Feature['COMFORT_FOOD']],
    cuisines: [Cuisine['JAPANESE']],
    notes: 'Add salt to taste',
    public: true,
  };
};

export const recipes = (userId: string) => {
  return [
    {
      userId: userId,
      title: 'Pasta',
      description: 'Pasta with tomato sauce',
      image:
        'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/xokmbwafdz9tqmoelcbt.jpg',
      ingredients: ['pasta 100g', 'tomato sauce 100g', '2cups of water'],
      directions: [
        {
          step: 1,
          content:
            'Bring a large pot of generously salted water to a boil. Fill a large bowl with cold water. Drop the broccoli into the boiling water and cook until crisp-tender and bright green, about 2 minutes. Remove with a slotted spoon and plunge into the cold water to stop the cooking. Let sit until cool, then drain and set aside.',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/xokmbwafdz9tqmoelcbt.jpg',
        },
        {
          step: 2,
          content:
            'Return the water in the pot to a boil and cook the rigatoni according to the package directions for al dente. Drain in a colander and transfer to a large bowl. Toss the pasta with 2 tablespoons of the olive oil to coat evenly and refrigerate until cooled completely, about 10 minutes. ',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/xokmbwafdz9tqmoelcbt.jpg',
        },
        {
          step: 3,
          content:
            'Meanwhile, add the remaining 1/3 cup olive oil to a blender with the spinach, Parmesan, almonds, basil, lemon juice, chives and 1/4 cup water and puree until completely smooth. Pour the pesto over top of the pasta and add the reserved broccoli, red peppers, sun-dried tomatoes, mozzarella, vinegar and 1 teaspoon salt. Toss gently until well combined. Transfer to a serving bowl and sprinkle with more chopped chives. Cover and refrigerate until ready to serve, up to 4 hours.',
          image: null,
        },
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
      directions: [
        { step: 1, content: 'Mix eggs and cheese', image: null },
        { step: 2, content: 'Cook for 10 minutes', image: null },
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
      directions: [
        { step: 1, content: 'Cook chicken', image: null },
        { step: 2, content: 'Cook rice', image: null },
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
      directions: [
        {
          step: 1,
          content:
            'Bring a large pot of generously salted water to a boil. Fill a large bowl with cold water. Drop the broccoli into the boiling water and cook until crisp-tender and bright green, about 2 minutes. Remove with a slotted spoon and plunge into the cold water to stop the cooking. Let sit until cool, then drain and set aside.',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/xokmbwafdz9tqmoelcbt.jpg',
        },
        {
          step: 2,
          content:
            'Return the water in the pot to a boil and cook the rigatoni according to the package directions for al dente. Drain in a colander and transfer to a large bowl. Toss the pasta with 2 tablespoons of the olive oil to coat evenly and refrigerate until cooled completely, about 10 minutes. ',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/xokmbwafdz9tqmoelcbt.jpg',
        },
        {
          step: 3,
          content:
            'Meanwhile, add the remaining 1/3 cup olive oil to a blender with the spinach, Parmesan, almonds, basil, lemon juice, chives and 1/4 cup water and puree until completely smooth. Pour the pesto over top of the pasta and add the reserved broccoli, red peppers, sun-dried tomatoes, mozzarella, vinegar and 1 teaspoon salt. Toss gently until well combined. Transfer to a serving bowl and sprinkle with more chopped chives. Cover and refrigerate until ready to serve, up to 4 hours.',
          image: null,
        },
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
