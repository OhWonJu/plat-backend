/*
  Warnings:

  - Added the required column `color` to the `Avatar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatar" ADD COLUMN     "color" TEXT NOT NULL;
