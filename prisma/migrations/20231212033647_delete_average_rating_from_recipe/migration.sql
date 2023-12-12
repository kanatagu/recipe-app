/*
  Warnings:

  - You are about to drop the column `averageRating` on the `Recipe` table. All the data in the column will be lost.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "averageRating";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;
