/*
  Warnings:

  - You are about to drop the column `fieldOfStduy` on the `Scholarship` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAT` on the `Scholarship` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Scholarship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scholarship" DROP COLUMN "fieldOfStduy",
DROP COLUMN "updatedAT",
ADD COLUMN     "fieldOfStudy" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
