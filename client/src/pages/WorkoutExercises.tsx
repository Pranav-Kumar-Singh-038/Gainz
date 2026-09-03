import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Workout } from './CreateWorkout';
import type { Exercise } from './Exercises';
import {api} from '../lib/api.ts';

type WorkoutExercise =
    {
        workoutId: number,
        exerciseId: number,
        sets: number,
        reps: number,
        rest: number,
        exercise: Exercise
    }
function WorkoutExercises() {
    const [sets, setSets] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [rest, setRest] = useState<number>(0);
    const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
    const [searchTerm, setSearchTerm] = useState<String>('');
    const [resultExercises, setResultExercises] = useState<Exercise[]>([]);
    const { workoutId } = useParams<{ workoutId: string }>();
    const location = useLocation();
    const workout = location.state?.workout as Workout;

    async function removeExerciseFromWorkout(exerciseId: number | string) {
        try {
            const workoutIdNumber = Number(workoutId);
            const response = await api('/api/workout/remove-exercise', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    workoutId: workoutIdNumber,
                    exerciseId: exerciseId,
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to Remove Workout")
            }
            setExercises(exercises.filter(e =>
                !(e.workoutId === Number(workoutId) && e.exerciseId === exerciseId)
            ))            
            alert(`Exercise Removed SuccessFully`)
        }
        catch (err) {
            alert(`${err}`);
        }
    }

    async function addExerciseToWorkout(exerciseId: number | string) {
        try {
            const workoutIdNumber = Number(workoutId);
            const response = await api('/api/workout/add-exercise', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    workoutId: workoutIdNumber,
                    exerciseId: exerciseId,
                    sets: sets,
                    reps: reps,
                    rest: rest
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add Workout")
            }
            const responseData = await response.json();
            const exerciseData = responseData.data;
            setExercises([...exercises, exerciseData])
            // console.log(JSON.stringify(resultExercises));
            alert(`Exercise Added SuccessFully`)
        }
        catch (err) {
            alert(`${err}`);
        }
    }

    useEffect(() => {
        async function getExercises() {
            try {
                if (!workoutId) {
                    throw new Error("workoutId not found in Params");
                }
                const response = await api(`/api/workout/exercises?workoutId=${workoutId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed To Get Exercises");
                }
                const responseData = await response.json();
                const exercisesData = responseData.data;
                setExercises(exercisesData);
            }
            catch (err) {
                console.log(JSON.stringify(err));
                alert(`${err}`);
            }
        }
        getExercises();
    }, [])

    async function searchExercises() {
        try {
            const searchResponse = await api(`/api/exercises?searchTerm=${searchTerm}`);
            if (!searchResponse.ok) {
                const errorData = await searchResponse.json();
                throw new Error(errorData.message || "Error Fetching Exercises")
            }
            const responseData = await searchResponse.json();
            const exercises = responseData.data;
            setResultExercises(exercises);

        }
        catch (err) {
            alert(`${err}`)
        }

    }

    return (
        <>
            <h2>{workout.name}</h2>
            <ul>
                {exercises.map((e) => (
                    <li key={e.exercise.id}>
                        <p>Name - {e.exercise.name}, Sets - {e.sets}, Reps - {e.reps}, Rest Time - {e.rest}s</p>
                        <button onClick={() => removeExerciseFromWorkout(e.exercise.id)}>Remove Exercise</button>
                    </li>
                ))}

            </ul>
            <h4>Add Exercises</h4>
            <input placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button onClick={searchExercises}>Search</button>
            <h1>Exercises</h1>
            <ul>
                {resultExercises.map((exercise) => (
                    <li key={exercise.id}>
                        {exercise.name} - {exercise.instructions ?? "N/A"}
                        {exercise.imageUrl && <img src={exercise.imageUrl} alt={exercise.name} />}
                        {<input placeholder="Sets" onChange={(e) => { setSets(parseInt(e.target.value, 10)) }}></input>}
                        {<input placeholder="Reps" onChange={(e) => { setReps(parseInt(e.target.value, 10)) }}></input>}
                        {<input placeholder="Rest Time (in seconds)" onChange={(e) => { setRest(parseInt(e.target.value, 10)) }}></input>}
                        {<button onClick={() => addExerciseToWorkout(exercise.id)}>Add Exercise</button>}

                    </li>
                ))}
            </ul>
        </>
    )
}

export default WorkoutExercises;