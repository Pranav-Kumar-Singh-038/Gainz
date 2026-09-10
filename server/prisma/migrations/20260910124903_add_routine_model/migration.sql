-- CreateTable
CREATE TABLE "Routine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutineWorkout" (
    "id" SERIAL NOT NULL,
    "routineId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "RoutineWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Routine_userId_idx" ON "Routine"("userId");

-- CreateIndex
CREATE INDEX "RoutineWorkout_routineId_idx" ON "RoutineWorkout"("routineId");

-- CreateIndex
CREATE INDEX "RoutineWorkout_workoutId_idx" ON "RoutineWorkout"("workoutId");

-- CreateIndex
CREATE UNIQUE INDEX "RoutineWorkout_routineId_order_key" ON "RoutineWorkout"("routineId", "order");

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineWorkout" ADD CONSTRAINT "RoutineWorkout_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineWorkout" ADD CONSTRAINT "RoutineWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
