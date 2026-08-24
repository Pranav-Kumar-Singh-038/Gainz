/*
  Warnings:

  - You are about to drop the column `muscleGroup` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MuscleRole" AS ENUM ('PRIMARY', 'SECONDARY', 'TERTIARY');

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "muscleGroup",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "instructions" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "videoUrl" TEXT;

-- CreateTable
CREATE TABLE "Muscle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseMuscle" (
    "exerciseId" INTEGER NOT NULL,
    "muscleId" INTEGER NOT NULL,
    "role" "MuscleRole" NOT NULL,

    CONSTRAINT "ExerciseMuscle_pkey" PRIMARY KEY ("exerciseId","muscleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Muscle_name_key" ON "Muscle"("name");

-- CreateIndex
CREATE INDEX "ExerciseMuscle_muscleId_idx" ON "ExerciseMuscle"("muscleId");

-- CreateIndex
CREATE INDEX "Exercise_name_idx" ON "Exercise"("name");

-- AddForeignKey
ALTER TABLE "ExerciseMuscle" ADD CONSTRAINT "ExerciseMuscle_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseMuscle" ADD CONSTRAINT "ExerciseMuscle_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "Muscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
