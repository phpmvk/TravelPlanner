-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "depCity" TEXT NOT NULL,
    "arrCity" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,

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

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
