import express, { type Express, type Request, type Response } from 'express';
import { prisma } from "./lib/prisma.ts";
import { Prisma } from "../generated/prisma/client.ts"

const app: Express = express();
app.use(express.json());

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
    const exercises = await prisma.exercise.findMany();
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

app.listen(3000);