/*
  Warnings:

  - A unique constraint covering the columns `[feedId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like.feedId_userId_unique" ON "Like"("feedId", "userId");
