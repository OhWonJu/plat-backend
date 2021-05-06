/*
  Warnings:

  - You are about to drop the column `groupId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_groupId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "groupId";

-- CreateTable
CREATE TABLE "_GroupToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToItem_AB_unique" ON "_GroupToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToItem_B_index" ON "_GroupToItem"("B");

-- AddForeignKey
ALTER TABLE "_GroupToItem" ADD FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToItem" ADD FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
