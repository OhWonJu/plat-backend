/*
  Warnings:

  - Added the required column `scope` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "scope" BOOLEAN NOT NULL,
ADD COLUMN     "code" TEXT[];
