import { hash } from 'bcrypt';

export const user1 = async () => {
  const randomUserName = Math.random().toString(36).slice(-8);
  const password = await hash('password', 10);
  return {
    email: 'test@test.com',
    name: 'Test User',
    hashedPassword: password,
    username: randomUserName,
  };
};

export const user2 = async () => {
  const randomUserName = Math.random().toString(36).slice(-8);
  const password = await hash('password', 10);
  return {
    email: 'test2@test.com',
    name: 'Test User2',
    hashedPassword: password,
    username: randomUserName,
  };
};
