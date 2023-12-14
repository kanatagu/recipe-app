-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "level" TYPE "Level" USING "level"::text::"Level";
