/*
  Warnings:

  - Added the required column `itemInfoId` to the `ObjectPosition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ObjectPosition" ADD COLUMN     "itemInfoId" TEXT NOT NULL;
