/*
  Warnings:

  - You are about to drop the column `skin` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `head` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `face` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Avatar` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Avatar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatar" DROP COLUMN "skin",
DROP COLUMN "head",
DROP COLUMN "face",
DROP COLUMN "body",
ADD COLUMN     "skinUrl" TEXT,
ADD COLUMN     "skinId" TEXT,
ADD COLUMN     "headUrl" TEXT,
ADD COLUMN     "headId" TEXT,
ADD COLUMN     "faceUrl" TEXT,
ADD COLUMN     "faceId" TEXT,
ADD COLUMN     "bodyUrl" TEXT,
ADD COLUMN     "bodyId" TEXT,
ADD COLUMN     "itemId" TEXT NOT NULL;
