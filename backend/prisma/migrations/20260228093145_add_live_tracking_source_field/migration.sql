-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'strava',
ALTER COLUMN "stravaId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "TileHistory_newUser_idx" ON "TileHistory"("newUser");

-- AddForeignKey
ALTER TABLE "TileHistory" ADD CONSTRAINT "TileHistory_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
