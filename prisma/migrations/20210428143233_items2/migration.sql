/*
  Warnings:

  - The primary key for the `Kategorie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Kategorie` table. All the data in the column will be lost.
  - The primary key for the `Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Type` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemInfo" DROP CONSTRAINT "ItemInfo_kategorieId_fkey";

-- DropForeignKey
ALTER TABLE "ItemInfo" DROP CONSTRAINT "ItemInfo_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Type" DROP CONSTRAINT "Type_kategorieId_fkey";

-- DropIndex
DROP INDEX "Type.type_unique";

-- DropIndex
DROP INDEX "Kategorie.kategorie_unique";

-- AlterTable
ALTER TABLE "Kategorie" DROP CONSTRAINT "Kategorie_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("kategorie");

-- AlterTable
ALTER TABLE "Type" DROP CONSTRAINT "Type_pkey",
DROP COLUMN "id",
ADD PRIMARY KEY ("type");

-- AddForeignKey
ALTER TABLE "ItemInfo" ADD FOREIGN KEY ("kategorieId") REFERENCES "Kategorie"("kategorie") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInfo" ADD FOREIGN KEY ("typeId") REFERENCES "Type"("type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD FOREIGN KEY ("kategorieId") REFERENCES "Kategorie"("kategorie") ON DELETE CASCADE ON UPDATE CASCADE;
