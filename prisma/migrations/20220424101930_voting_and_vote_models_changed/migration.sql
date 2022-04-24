/*
  Warnings:

  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deckId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Vote` table. All the data in the column will be lost.
  - The primary key for the `Voting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deckId` on the `Voting` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Voting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,votingId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Vote` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Voting` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_gameId_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Voting" DROP CONSTRAINT "Voting_deckId_fkey";

-- DropForeignKey
ALTER TABLE "Voting" DROP CONSTRAINT "Voting_userId_fkey";

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
DROP COLUMN "deckId",
DROP COLUMN "gameId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Voting" DROP CONSTRAINT "Voting_pkey",
DROP COLUMN "deckId",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hasFinished" BOOLEAN DEFAULT false,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Voting_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_votingId_key" ON "Vote"("userId", "votingId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES "Voting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
