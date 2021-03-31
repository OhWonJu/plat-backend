-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loginSecret" TEXT,
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "point" INTEGER NOT NULL DEFAULT 0;
