/*
  Warnings:

  - You are about to drop the `RefreshTokenBlacklist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RefreshTokenBlacklist";

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_refreshToken_key" ON "RefreshToken"("refreshToken");
