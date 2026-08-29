import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Workout } from './CreateWorkout';
import type { Exercise } from './Exercises';
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
    const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
    const [searchTerm, setSearchTerm] = useState<String>('');
    const [resultExercises, setResultExercises] = useState<Exercise[]>([]);
    const { workoutId } = useParams<{ workoutId: string }>();
    const location = useLocation();
    const workout = location.state?.workout as Workout;

    useEffect(() => {
        async function getExercises() {
            try {
                if (!workoutId) {
                    throw new Error("workoutId not found in Params");
                }
                const response = await fetch(`/api/workout/exercises?workoutId=${workoutId}`);
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
            const searchResponse = await fetch(`/api/exercises?searchTerm=${searchTerm}`);
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
                        {e.exercise.name}
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
                    </li>
                ))}
            </ul>
        </>
    )
}

export default WorkoutExercises;