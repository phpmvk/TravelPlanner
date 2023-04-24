-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "depCity" TEXT NOT NULL,
    "arrCity" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journey" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "depCity" TEXT NOT NULL,
    "arrCity" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "transportType" TEXT NOT NULL,
    "idTrip" INTEGER NOT NULL,

    CONSTRAINT "Journey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "depCity" TEXT NOT NULL,
    "arrCity" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "activityType" TEXT NOT NULL,
    "additionalInfo" TEXT,
    "idTrip" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_idTrip_fkey" FOREIGN KEY ("idTrip") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_idTrip_fkey" FOREIGN KEY ("idTrip") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
