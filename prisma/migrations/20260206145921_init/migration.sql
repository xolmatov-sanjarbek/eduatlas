-- CreateTable
CREATE TABLE "Scholarship" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAT" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "fieldOfStduy" TEXT[],
    "degreeLevel" TEXT NOT NULL,
    "targetCountry" TEXT NOT NULL,
    "eligibleRegions" TEXT[],
    "deadline" TIMESTAMP(3),
    "officialWebsite" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
);
