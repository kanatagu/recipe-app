/*
  Warnings:

  - The values [JAPNESE] on the enum `Cuisine` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Cuisine_new" AS ENUM ('ITALIAN', 'AMERICAN', 'MEXICAN', 'INDIAN', 'GREEK', 'JAPANESE', 'CHINESE', 'KOREAN', 'OTHERS');
ALTER TABLE "Recipe" ALTER COLUMN "cuisines" TYPE "Cuisine_new"[] USING ("cuisines"::text::"Cuisine_new"[]);
ALTER TYPE "Cuisine" RENAME TO "Cuisine_old";
ALTER TYPE "Cuisine_new" RENAME TO "Cuisine";
DROP TYPE "Cuisine_old";
COMMIT;
