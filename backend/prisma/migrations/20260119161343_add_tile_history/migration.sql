-- CreateTable
CREATE TABLE "TileHistory" (
    "id" SERIAL NOT NULL,
    "tileId" TEXT NOT NULL,
    "previousUser" INTEGER,
    "newUser" INTEGER NOT NULL,
    "activityId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TileHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TileHistory_tileId_idx" ON "TileHistory"("tileId");

-- AddForeignKey
ALTER TABLE "TileHistory" ADD CONSTRAINT "TileHistory_newUser_fkey" FOREIGN KEY ("newUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TileHistory" ADD CONSTRAINT "TileHistory_previousUser_fkey" FOREIGN KEY ("previousUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
