/*
  Warnings:

  - Added the required column `type` to the `ObjectPosition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ObjectPosition" ADD COLUMN     "type" TEXT NOT NULL;
