import express, { type Express, type Request, type Response } from 'express';
import { prisma } from "./lib/prisma.ts";
import { Prisma } from "../generated/prisma/client.ts"
import cors from 'cors';

const app: Express = express();
app.use(express.json());
app.use(cors());
app.get('/api/health-check', (req: Request, res: Response) => {
  res.send('Server is Healthy');
});

app.post('/api/add-exercise', async (req: Request, res: Response) => {
  try {

    const { name, instructions, imageUrl, videoUrl, muscles } = req.body;
    if (!name || !Array.isArray(muscles) || muscles.length === 0) {
      return res.status(400).json({ message: "Exercise Name and Atleast 1 muscle groups is required" })
    }

    const exercise = await prisma.exercise.create({
      data: {
        name: name,
        instructions: instructions,
        imageUrl: imageUrl,
        videoUrl: videoUrl,
        muscles: {
          create: muscles.map((muscle: any) => ({
            muscleId: Number(muscle.id),
            role: muscle.role ?? "PRIMARY",
          }))
        }
      }
    });
    res.status(201).json({ message: "Exercise Added", data: exercise });
  }
  catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code == "P2002") {
      return res.status(409).json({ message: "Exercise Already Exists" });
    }
    return res.status(500).json({ message: "Failed To Add Exercise", error: err });
  }
});

app.get('/api/exercises', async (req: Request, res: Response) => {
  try {
    const searchTerm =typeof req.query.searchTerm === 'string' ? req.query.searchTerm :undefined;
    const exercises = await prisma.exercise.findMany({
      where:searchTerm ? {
        name:{
          contains:searchTerm,
          mode: 'insensitive'
        }
      }:undefined
    });
    return res.status(200).json({ message: "Exercises Fetched!", data: exercises });
  }
  catch (err) {
    return res.status(500).json({ message: "Failed to Fetch Exercises", error: err });
  }
})

app.post('/api/add-musclegroup', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const muscleGroup = await prisma.muscle.create({
      data: {
        name: name
      }
    });
    return res.status(201).json({ message: "Muscle Group Added", data: muscleGroup })
  }
  catch (err) {
    return res.status(500).json({ message: "Failed to Add Muscle Group!", error: err });
  }
})

app.get('/api/musclegroups', async (req: Request, res: Response) => {
  try {
    const muscleGroups = await prisma.muscle.findMany();
    return res.status(200).json({ message: "Muscle Groups Fetched!", data: muscleGroups });
  }
  catch (err) {
    return res.status(500).json({ message: "Failed To Fetch Muscle Groups!", error: err });
  }
})

app.post('/api/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userAuth = await prisma.user.create({
      data: {
        email: email,
        password: password
      }
    });
    return res.status(200).json({ message: "User Created Successfully", data: userAuth })
  }
  catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code == "P2002") {
      return res.status(409).json({ message: "User Already Exists" });
    }
    return res.status(500).json({ message: "User Signup Failed!", error: err })
  }
})

app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userAuth = await prisma.user.findFirst({
      where: { email, password }
    });
    if (userAuth) {
      return res.status(200).json({ message: "User Signin Successful", data: userAuth })
    }
    else {
      return res.status(404).json({ message: "User Not Found, Please Signup" })
    }
  }
  catch (err) {
    return res.status(500).json({ message: "Login Unsuccessful", error: err })
  }
})

app.post('/api/add-workout', async (req: Request, res: Response) => {
  try {
    const { name, userId } = req.body;
    const workoutData = await prisma.workout.create({
      data: {
        name: name,
        userId: Number(userId)
      }
    });
    return res.status(200).json({ message: "Workout Added Successfully", data: workoutData })
  }
  catch (err) {
    console.error(err);

    return res.status(500).json({ message: "Failed To Add Workout", error: err })
  }
})

app.post('/api/remove-workout', async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.body;
    const workoutData = await prisma.workout.delete({
      where: {
        id:workoutId
      }
    });
    return res.status(200).json({ message: "Workout Removed Successfully", data: workoutData })
  }
  catch (err) {
    console.error(err);

    return res.status(500).json({ message: "Failed To Delete Workout", error: err })
  }
})

app.get('/api/workouts', async (req: Request, res: Response) => {
  try {
    const userId = Number(req.query.userId);
    const workouts = await prisma.workout.findMany({
      where: { userId }
    });
    return res.status(200).json({ message: "Workouts Fetched!", data: workouts });
  }
  catch (err) {
    return res.status(500).json({ message: "Failed To Fetch Workouts!", error: err });
  }
})

app.post('/api/workout/add-exercise', async (req: Request, res: Response) => {
  try {
    const { workoutId, exerciseId, sets, reps, rest, weight } = req.body;
    const exerciseData = await prisma.workoutExercise.create({
      data: {
        workoutId,
        exerciseId: Number(exerciseId),
        sets: sets ?? 3,
        reps: reps ?? 12,
        rest: rest ?? 120,
        weight: weight ?? 0
      },
      include:{
        exercise:true
      }
    });
    return res.status(200).json({ message: "Exercise Added Successfully", data: exerciseData })
  }
  catch (err) {
    console.error(err);

    return res.status(500).json({ message: "Failed To Add Exercise", error: err })
  }
})

app.post('/api/workout/remove-exercise', async (req: Request, res: Response) => {
  try {
    const { workoutId, exerciseId } = req.body;
    const exerciseData = await prisma.workoutExercise.delete({
      where: {
        workoutId_exerciseId:{workoutId:workoutId,
        exerciseId: Number(exerciseId),
      }}
    });
    return res.status(200).json({ message: "Exercise Deleted Successfully", data: exerciseData })
  }
  catch (err) {
    console.error(err);

    return res.status(500).json({ message: "Failed To Delete Exercise", error: err })
  }
})

app.get('/api/workout/exercises', async (req: Request, res: Response) => {
  try {
    const workoutId = Number(req.query.workoutId);
    const exercises = await prisma.workoutExercise.findMany({
      where: { workoutId },
      include: {
        exercise: true
      }
    });
    return res.status(200).json({ message: "Exercises Fetched!", data: exercises });
  }
  catch (err) {
    return res.status(500).json({ message: "Failed To Fetch Exercises!", error: err });
  }
})


app.listen( process.env.PORT || 3000);