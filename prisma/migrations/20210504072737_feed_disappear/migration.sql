/*
  Warnings:

  - The `disappearTime` column on the `Feed` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Feed" DROP COLUMN "disappearTime",
ADD COLUMN     "disappearTime" INTEGER;
