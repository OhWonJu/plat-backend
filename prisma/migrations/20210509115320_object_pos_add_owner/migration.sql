/*
  Warnings:

  - Added the required column `owner` to the `ObjectPosition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ObjectPosition" ADD COLUMN     "owner" TEXT NOT NULL;
