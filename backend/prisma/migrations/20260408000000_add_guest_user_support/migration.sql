-- AlterTable: Make stravaAthleteId nullable (for guest/anonymous users)
ALTER TABLE "User" ALTER COLUMN "stravaAthleteId" DROP NOT NULL;

-- AddColumn: Guest user identifier (UUID stored in localStorage)
ALTER TABLE "User" ADD COLUMN "guestId" TEXT;
ALTER TABLE "User" ADD COLUMN "isGuest" BOOLEAN NOT NULL DEFAULT false;

-- AddConstraint: guestId must be unique when set
CREATE UNIQUE INDEX "User_guestId_key" ON "User"("guestId");
