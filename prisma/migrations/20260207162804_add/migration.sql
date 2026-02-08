-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('STUDENT', 'UNIVERSITY');

-- AlterTable
ALTER TABLE "Scholarship" ADD COLUMN     "universityId" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "University_email_key" ON "University"("email");

-- AddForeignKey
ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE SET NULL ON UPDATE CASCADE;
