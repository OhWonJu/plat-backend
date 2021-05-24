/*
  Warnings:

  - You are about to drop the column `x` on the `ObjectPosition` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `ObjectPosition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ObjectPosition" DROP COLUMN "x",
DROP COLUMN "y",
ADD COLUMN     "grid" INTEGER NOT NULL DEFAULT -1;
