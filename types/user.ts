import { User } from '@prisma/client';

export type SafeUserType = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string | null;
  emailVerified: string | null;
};
