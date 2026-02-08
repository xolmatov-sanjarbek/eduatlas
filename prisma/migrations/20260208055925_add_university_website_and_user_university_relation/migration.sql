/*
  Warnings:

  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "University" ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "universityId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE SET NULL ON UPDATE CASCADE;
