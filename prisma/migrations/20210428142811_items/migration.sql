/*
  Warnings:

  - You are about to drop the column `kategorie` on the `ItemInfo` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ItemInfo` table. All the data in the column will be lost.
  - Added the required column `kategorieId` to the `ItemInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `ItemInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ItemInfo" DROP COLUMN "kategorie",
DROP COLUMN "type",
ADD COLUMN     "kategorieId" TEXT NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Kategorie" (
    "id" TEXT NOT NULL,
    "kategorie" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "kategorie" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kategorie.kategorie_unique" ON "Kategorie"("kategorie");

-- CreateIndex
CREATE UNIQUE INDEX "Type.kategorie_unique" ON "Type"("kategorie");

-- AddForeignKey
ALTER TABLE "ItemInfo" ADD FOREIGN KEY ("kategorieId") REFERENCES "Kategorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInfo" ADD FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
