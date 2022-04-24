-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "deckId" TEXT;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;
