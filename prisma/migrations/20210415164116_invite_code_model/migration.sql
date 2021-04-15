/*
  Warnings:

  - You are about to drop the column `code` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "code";

-- CreateTable
CREATE TABLE "Code" (
    "id" SERIAL NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Code.groupId_userId_unique" ON "Code"("groupId", "userId");

-- AddForeignKey
ALTER TABLE "Code" ADD FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
