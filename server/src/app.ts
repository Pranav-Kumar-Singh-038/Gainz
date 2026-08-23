import express, { type Express, type Request, type Response } from 'express';
import { prisma } from "./lib/prisma.ts";
import {Prisma} from "../generated/prisma/client.ts"

const app: Express = express();
app.use(express.json());

app.get('/api/health-check', (req: Request, res: Response) => {
  res.send('Server is Healthy');
});

app.post('/api/add-exercises', async (req: Request, res: Response) => {
  try {
    const { name, muscleGroup } = req.body;
    const exercise = await prisma.exercise.create({
      data: {
        name: name,
        muscleGroup: muscleGroup
      }
    });
    res.status(201).json({ message: "Exercise Added", data: exercise });
  }
  catch (err) {
    if(err instanceof Prisma.PrismaClientKnownRequestError && err.code =="P2002" )
    {
      return res.status(409).json({ message: "Exercise Already Exists"});
    }
    return res.status(500).json({ message: "Failed To Add Exercise", error: err });
  }
});

app.get('/api/get-exercises', async (req: Request, res: Response)=>{
  try{
    const exercises = await prisma.exercise.findMany();
    return res.status(200).json({message:"Exercises Fetched!", data:exercises});
  }
  catch(err)
  {
    return res.status(500).json({message:"Failed to Fetch Exercises", error:err});
  }
})
app.listen(3000);