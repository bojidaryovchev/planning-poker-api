-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
