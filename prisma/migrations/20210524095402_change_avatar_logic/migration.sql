/*
  Warnings:

  - You are about to drop the column `skinUrl` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `skinId` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `faceUrl` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `faceId` on the `Avatar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Avatar" DROP COLUMN "skinUrl",
DROP COLUMN "skinId",
DROP COLUMN "faceUrl",
DROP COLUMN "faceId",
ADD COLUMN     "legUrl" TEXT,
ADD COLUMN     "legId" TEXT;
