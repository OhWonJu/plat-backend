-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "groupId" TEXT;

-- CreateTable
CREATE TABLE "ObjectPosition" (
    "id" SERIAL NOT NULL,
    "groupId" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "x" INTEGER NOT NULL DEFAULT -1,
    "y" INTEGER NOT NULL DEFAULT -1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ObjectPosition" ADD FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
