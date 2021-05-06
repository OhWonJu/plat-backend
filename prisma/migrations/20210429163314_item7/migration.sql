/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemId` on the `Item` table. All the data in the column will be lost.
  - The required column `id` was added to the `Item` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `itemInfoId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "itemId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "itemInfoId" TEXT NOT NULL,
ADD PRIMARY KEY ("id");
