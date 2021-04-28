/*
  Warnings:

  - You are about to drop the column `kategorie` on the `Type` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `Type` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategorieId` to the `Type` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Type.kategorie_unique";

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "kategorie",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "kategorieId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Type.type_unique" ON "Type"("type");

-- AddForeignKey
ALTER TABLE "Type" ADD FOREIGN KEY ("kategorieId") REFERENCES "Kategorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
