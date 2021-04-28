/*
  Warnings:

  - A unique constraint covering the columns `[itemName]` on the table `ItemInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemName` to the `ItemInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemInfo" ADD COLUMN     "itemName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ItemInfo.itemName_unique" ON "ItemInfo"("itemName");
