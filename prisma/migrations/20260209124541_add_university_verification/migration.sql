-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "Scholarship" ADD COLUMN     "isEdited" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "University" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;
