/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemCode` on the `Item` table. All the data in the column will be lost.
  - Added the required column `itemName` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "itemCode",
ADD COLUMN     "itemName" TEXT NOT NULL,
ADD PRIMARY KEY ("userId", "itemName");
