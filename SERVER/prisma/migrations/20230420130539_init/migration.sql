/*
  Warnings:

  - Added the required column `idTrip` to the `Journey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Journey" ADD COLUMN     "idTrip" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_idTrip_fkey" FOREIGN KEY ("idTrip") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
