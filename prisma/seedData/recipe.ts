import { Level, Meal, Feature, Cuisine } from '@prisma/client';

export const recipes1 = (userId: string) => {
  return [
    {
      userId,
      title: 'Chicken Fry',
      description: 'Chicken Fry with sauce',
      image:
        'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702247291/chicken.jpg',
      ingredients: [
        '4 bone-in, skin-on chicken pieces (such as breasts, thighs, drumsticks)',
        '2 cups buttermilk',
        '2 cups all-purpose flour',
        '1 tablespoon salt',
        '1 tablespoon black pepper',
      ],
      directions: [
        {
          step: 1,
          content:
            'Place the chicken pieces in a large bowl and cover them with buttermilk. Let them marinate in the refrigerator for at least 1 hour, or overnight for best results.',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702247291/chicken.jpg',
        },
        {
          step: 2,
          content:
            'In a shallow dish, mix together the flour, salt, pepper, paprika, garlic powder, and onion powder.',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702247291/chicken.jpg',
        },
        {
          step: 3,
          content:
            'Remove the chicken from the buttermilk, shaking off any excess.',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702247291/chicken.jpg',
        },
        {
          step: 4,
          content:
            'Dredge the chicken pieces in the flour mixture, shaking off any excess.',
          image: null,
        },
        {
          step: 5,
          content:
            'Heat vegetable oil in a large skillet or Dutch oven until it reaches 350°F (175°C).',
          image: null,
        },
      ],
      servings: 4,
      cookingTimeNumber: 1,
      cookingTimeUnit: 'hour',
      level: Level.MIDDLE,
      meals: [Meal['DINNER']],
      features: [Feature['COMFORT_FOOD']],
      cuisines: [Cuisine['JAPANESE']],
      note: 'Add salt to taste',
      public: true,
    },
    {
      userId,
      title: 'Homemade Dumplings',
      description: 'Chicken Fry with sauce',
      image:
        'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702247291/dumpling.jpg',
      ingredients: [
        '1 lb ground pork or chicken',
        '2 cups finely chopped cabbage',
        '2 green onions, finely chopped',
        '2 cloves garlic, minced',
      ],
      directions: [
        {
          step: 1,
          content:
            'In a large bowl, combine the ground pork or chicken, chopped cabbage, green onions, garlic, soy sauce, sesame oil, ginger, salt, and black pepper. Mix until well combined.',
          image: null,
        },
        {
          step: 2,
          content:
            'To assemble the dumplings, place a small spoonful of the filling in the center of a dumpling wrapper.',
          image: null,
        },
        {
          step: 3,
          content:
            'Dip your finger in water and moisten the edges of the wrapper.',
          image: null,
        },
        {
          step: 4,
          content:
            'Fold the wrapper in half over the filling to form a half-moon shape, pressing the edges together to seal tightly.',
          image: null,
        },
      ],
      servings: 4,
      cookingTimeNumber: 1,
      cookingTimeUnit: 'hour',
      level: Level.MIDDLE,
      meals: [Meal['DINNER']],
      features: [Feature['PARTY']],
      cuisines: [Cuisine['JAPANESE']],
      note: 'Add salt to taste',
      public: true,
    },
  ];
};

export const recipes2 = (userId: string) => {
  return [
    {
      userId: userId,
      title: 'Pasta',
      description: 'Pasta with tomato sauce',
      image:
        'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/pasta.jpg',
      ingredients: ['pasta 100g', 'tomato sauce 100g', '2cups of water'],
      directions: [
        {
          step: 1,
          content:
            'Bring a large pot of generously salted water to a boil. Fill a large bowl with cold water. Drop the broccoli into the boiling water and cook until crisp-tender and bright green, about 2 minutes. Remove with a slotted spoon and plunge into the cold water to stop the cooking. Let sit until cool, then drain and set aside.',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/pasta.jpg',
        },
        {
          step: 2,
          content:
            'Return the water in the pot to a boil and cook the rigatoni according to the package directions for al dente. Drain in a colander and transfer to a large bowl. Toss the pasta with 2 tablespoons of the olive oil to coat evenly and refrigerate until cooled completely, about 10 minutes. ',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/pasta.jpg',
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
      level: Level.MIDDLE,
      meals: [Meal['LUNCH']],
      features: [Feature['CLASSIC'], Feature['ONE_POT_MEAL']],
      cuisines: [Cuisine['ITALIAN']],
      note: 'Add salt to taste',
      public: true,
    },
    {
      userId: userId,
      title: 'Omelette',
      description: 'Omelette with cheese',
      image:
        'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/omelette.jpg',
      ingredients: [
        '2 eggs',
        '1 tablespoon milk or water',
        'Salt and pepper to taste',
        '1 tablespoon butter or oil',
        'Fillings of your choice (e.g., cheese, vegetables, ham)',
      ],
      directions: [
        { step: 1, content: 'Crack the eggs into a bowl.', image: null },
        { step: 2, content: 'Add milk or water to the bowl.', image: null },
        {
          step: 3,
          content:
            'Season with salt and pepper, then whisk until well combined.',
          image: null,
        },
        {
          step: 4,
          content:
            'Heat butter or oil in a non-stick skillet over medium heat until melted and hot.',
          image: null,
        },
        {
          step: 5,
          content:
            'Pour the egg mixture into the skillet, tilting to spread it evenly.',
          image: null,
        },
        {
          step: 6,
          content:
            'Let the omelette cook undisturbed for about 2 minutes, or until the edges start to set.',
          image: null,
        },
      ],
      servings: 2,
      cookingTimeNumber: 30,
      cookingTimeUnit: 'minutes',
      level: Level.EASY,
      meals: [Meal['LUNCH']],
      features: [Feature['COMFORT_FOOD']],
      cuisines: [Cuisine['ITALIAN']],
      note: 'Add salt to taste',
      public: true,
    },
    {
      userId: userId,
      title: 'Tacos',
      description: 'Tacos with chicken',
      image:
        'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/tacos.jpg',
      ingredients: [
        '1 lb ground beef or turkey',
        '1 packet taco seasoning mix',
        '1/4 cup water',
        '8 small corn or flour tortillas',
        '1 cup shredded lettuce',
        '1 cup diced tomatoes',
        '1/2 cup diced onions',
      ],
      directions: [
        {
          step: 1,
          content:
            'In a skillet, cook the ground beef or turkey over medium-high heat until browned and cooked through.',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/tacos.jpg',
        },
        {
          step: 2,
          content:
            'Add the taco seasoning mix and water to the skillet. Stir well to combine.',
          image:
            'https://res.cloudinary.com/dgqvhw33f/image/upload/v1702176627/tacos.jpg',
        },
        {
          step: 3,
          content:
            'Reduce the heat to low and let the meat mixture simmer for 5-10 minutes, stirring occasionally, until thickened.',
          image: null,
        },
      ],
      servings: 4,
      cookingTimeNumber: 1,
      cookingTimeUnit: 'hour',
      level: Level.EASY,
      meals: [Meal['APPETIZER']],
      features: [Feature['CLASSIC'], Feature['ONE_POT_MEAL']],
      cuisines: [Cuisine['MEXICAN']],
      note: 'Add salt to taste',
      public: true,
    },
  ];
};
