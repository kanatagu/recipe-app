import { PrismaClient } from '@prisma/client';

import { recipes2, recipes1 } from './seedData/recipe';
import { user1 as user1Data, user2 as user2Data } from './seedData/user';
import { review } from './seedData/review';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const data1 = await user1Data();
  const user1 = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: data1,
  });

  const data2 = await user2Data();
  const user2 = await prisma.user.upsert({
    where: { email: 'test2@test.com' },
    update: {},
    create: data2,
  });

  // Recipes by user1
  const recipeIds1 = [];
  for (const recipe of recipes1(user1.id)) {
    const createdRecipe = await prisma.recipe.create({
      data: recipe,
    });
    recipeIds1.push(createdRecipe.id);
  }

  // Recipe by user2
  const recipeIds2 = [];
  for (const recipe of recipes2(user2.id)) {
    const createdRecipe = await prisma.recipe.create({
      data: recipe,
    });
    recipeIds2.push(createdRecipe.id);
  }

  // Review by user1
  await prisma.review.create({
    data: review(recipeIds2[0], user1.id),
  });

  await prisma.recipe.update({
    where: {
      id: recipeIds2[0],
    },
    data: {
      averageRating: review(recipeIds2[0], user1.id).rating,
    },
  });

  await prisma.review.create({
    data: review(recipeIds2[1], user1.id),
  });

  await prisma.recipe.update({
    where: {
      id: recipeIds2[1],
    },
    data: {
      averageRating: review(recipeIds2[1], user1.id).rating,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
