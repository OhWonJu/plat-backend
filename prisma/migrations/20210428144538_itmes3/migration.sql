/*
  Warnings:

  - You are about to drop the column `kategorieId` on the `ItemInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemInfo" DROP CONSTRAINT "ItemInfo_kategorieId_fkey";

-- AlterTable
ALTER TABLE "ItemInfo" DROP COLUMN "kategorieId";
