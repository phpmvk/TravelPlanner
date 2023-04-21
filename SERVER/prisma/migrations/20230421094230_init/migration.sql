/*
  Warnings:

  - Added the required column `idTrip` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "idTrip" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_idTrip_fkey" FOREIGN KEY ("idTrip") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
