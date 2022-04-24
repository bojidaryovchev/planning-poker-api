-- CreateTable
CREATE TABLE "Voting" (
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,

    CONSTRAINT "Voting_pkey" PRIMARY KEY ("userId","gameId","deckId")
);

-- CreateTable
CREATE TABLE "Vote" (
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "votingId" TEXT NOT NULL,
    "card" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("userId","gameId","deckId","votingId")
);

-- AddForeignKey
ALTER TABLE "Voting" ADD CONSTRAINT "Voting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voting" ADD CONSTRAINT "Voting_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voting" ADD CONSTRAINT "Voting_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_gameId_deckId_fkey" FOREIGN KEY ("userId", "gameId", "deckId") REFERENCES "Voting"("userId", "gameId", "deckId") ON DELETE RESTRICT ON UPDATE CASCADE;
