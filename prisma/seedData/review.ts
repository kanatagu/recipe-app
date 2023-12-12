export const review = (recipeId: string, userId: string) => {
  return {
    userId,
    recipeId,
    rating: 4,
    comment: 'This is a great recipe! I would recommend it to everyone',
  };
};
