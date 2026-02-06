/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Scholarship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Scholarship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scholarship" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Scholarship_slug_key" ON "Scholarship"("slug");
