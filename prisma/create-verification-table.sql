-- Run this once if the verification table is missing (Google sign-in will fail without it).
-- Usage: psql $DATABASE_URL -f prisma/create-verification-table.sql
-- Or in Node: npx prisma db execute --file prisma/create-verification-table.sql

CREATE TABLE IF NOT EXISTS "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "verification_identifier_idx" ON "verification"("identifier");
