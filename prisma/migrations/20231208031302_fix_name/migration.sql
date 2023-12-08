/*
  Warnings:

  - The values [SIDE_DISHE] on the enum `Meal` will be removed. If these variants are still used in the database, this will fail.
  - The `cuisines` column on the `Recipe` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Cuisine" AS ENUM ('ITALIAN', 'AMERICAN', 'MEXICAN', 'INDIAN', 'GREEK', 'JAPNESE', 'CHINESE', 'KOREAN', 'OTHERS');

-- AlterEnum
ALTER TYPE "Feature" ADD VALUE 'HEALTHY';

-- AlterEnum
BEGIN;
CREATE TYPE "Meal_new" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SIDE_DISH', 'SOUP', 'APPETIZER', 'DESSERT');
ALTER TABLE "Recipe" ALTER COLUMN "meals" TYPE "Meal_new"[] USING ("meals"::text::"Meal_new"[]);
ALTER TYPE "Meal" RENAME TO "Meal_old";
ALTER TYPE "Meal_new" RENAME TO "Meal";
DROP TYPE "Meal_old";
COMMIT;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cuisines",
ADD COLUMN     "cuisines" "Cuisine"[];

-- DropEnum
DROP TYPE "CUISINE";
