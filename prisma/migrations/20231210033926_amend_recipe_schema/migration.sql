/*
  Warnings:

  - The `instructions` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `cookingTimeNumber` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookingTimeUnit` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servings` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "cookingTimeNumber" INTEGER NOT NULL,
ADD COLUMN     "cookingTimeUnit" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "servings" INTEGER NOT NULL,
DROP COLUMN "instructions",
ADD COLUMN     "instructions" JSONB[];
