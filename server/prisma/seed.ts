import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const connectionString = `${process.env.DATABASE_URL}`;
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const MUSCLE_GROUPS = [
  "Chest",
  "Shoulders",
  "Back",
  "Legs",
  "Biceps",
  "Triceps",
  "Core",
  "Forearms",
] as const;

const DATASET_MUSCLE_MAP: Record<string, string> = {
  chest: "Chest",
  shoulders: "Shoulders",
  lats: "Back",
  "middle back": "Back",
  "lower back": "Back",
  traps: "Back",
  neck: "Back",
  quadriceps: "Legs",
  hamstrings: "Legs",
  glutes: "Legs",
  calves: "Legs",
  abductors: "Legs",
  adductors: "Legs",
  abdominals: "Core",
  biceps: "Biceps",
  triceps: "Triceps",
  forearms: "Forearms",
};

const IMAGE_BASE =
  "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

interface DatasetExercise {
  name: string;
  instructions?: string[];
  images?: string[];
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
}

async function main() {
  const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "data", "exercises.json");
  const exercises: DatasetExercise[] = JSON.parse(readFileSync(filePath, "utf-8"));

  const muscleIdByName = new Map<string, number>();
  for (const name of MUSCLE_GROUPS) {
    const muscle = await prisma.muscle.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    muscleIdByName.set(name, muscle.id);
  }

  let seeded = 0;
  let skipped = 0;

  for (const exercise of exercises) {
    try {
      const muscleLinks = [
        ...(exercise.primaryMuscles ?? []).map((m) => ({
          name: DATASET_MUSCLE_MAP[m],
          role: "PRIMARY" as const,
        })),
        ...(exercise.secondaryMuscles ?? []).map((m) => ({
          name: DATASET_MUSCLE_MAP[m],
          role: "SECONDARY" as const,
        })),
      ]
        .filter((m): m is { name: string; role: "PRIMARY" | "SECONDARY" } => m.name !== undefined)
        .filter((m, i, arr) => arr.findIndex((x) => x.name === m.name) === i);

      if (muscleLinks.length === 0) {
        skipped++;
        console.warn(`Skipped "${exercise.name}": no mappable muscles`);
        continue;
      }

      await prisma.exercise.upsert({
        where: { name: exercise.name },
        update: {
          instructions: exercise.instructions?.join("\n"),
          imageUrl: exercise.images?.[0] ? IMAGE_BASE + exercise.images[0] : null,
          muscles: {
            deleteMany: {},
            create: muscleLinks.map((m) => ({
              muscleId: muscleIdByName.get(m.name)!,
              role: m.role,
            })),
          },
        },
        create: {
          name: exercise.name,
          instructions: exercise.instructions?.join("\n"),
          imageUrl: exercise.images?.[0] ? IMAGE_BASE + exercise.images[0] : null,
          muscles: {
            create: muscleLinks.map((m) => ({
              muscleId: muscleIdByName.get(m.name)!,
              role: m.role,
            })),
          },
        },
      });
      seeded++;
    } catch (err) {
      skipped++;
      console.error(`Failed to seed "${exercise.name}":`, err);
    }
  }

  console.log(`Done. Seeded: ${seeded}, Skipped: ${skipped}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error("Seed failed:", err);
    await prisma.$disconnect();
    process.exit(1);
  });
