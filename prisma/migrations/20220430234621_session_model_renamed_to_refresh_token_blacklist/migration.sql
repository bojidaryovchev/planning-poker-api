/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Session";

-- CreateTable
CREATE TABLE "RefreshTokenBlacklist" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshTokenBlacklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokenBlacklist_refreshToken_key" ON "RefreshTokenBlacklist"("refreshToken");
