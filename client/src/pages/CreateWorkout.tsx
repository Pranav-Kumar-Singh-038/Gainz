import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {api} from '../lib/api.ts';

export type Workout =
    {
        id: number,
        name: string,
        userId: number,
        createdAt: string,
        updatedAt: string
    }
function CreateWorkout() {
    const [workoutName, setWorkoutName] = useState<string>('');
    const [userWorkouts, setUserWorkouts] = useState<Workout[]>([]);
    const navigate = useNavigate();

    async function deleteWorkout(workoutId: number) {
        try {
            const response = await api('/api/remove-workout', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ workoutId: workoutId })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed To Delete Workout");
            }
            setUserWorkouts(userWorkouts.filter(e =>!(e.id === Number(workoutId))))
            alert(`Workout Removed SuccessFully`)
        }
        catch (err) {
            alert(`${err}`);
        }
    }

    function navigateModifyWorkout(workout: Workout) {
        navigate(`/workout/${workout.id}/exercises`, { state: { workout } });
    }

    useEffect(() => {
        async function getWorkouts() {
            try {
                const userIdString = localStorage.getItem("userId");
                if (!userIdString) {
                    throw new Error("userId not found in localStorage");
                }
                const userId = parseInt(userIdString);
                const response = await api(`/api/workouts?userId=${userId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed To Get Workouts");
                }
                const responseData = await response.json();
                const workouts = responseData.data;
                setUserWorkouts(workouts);
            }
            catch (err) {
                // console.log(JSON.stringify(err));
                alert(`${err}`);
            }
        }
        getWorkouts();
    }, [])

    async function createWorkout() {
        try {
            const userIdString = localStorage.getItem("userId");
            if (!userIdString) {
                throw new Error("userId not found in localStorage");
            }
            const userId = parseInt(userIdString);
            const response = await api('/api/add-workout', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ userId: userId, name: workoutName })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed To Create Workout");
            }
            const responseData = await response.json();
            const newWorkout = responseData.data;
            setUserWorkouts([...userWorkouts, newWorkout]);
            alert("Workout Added Successfully");
        }
        catch (err) {
            alert(`${err}`)
        }
    }
    return (
        <>
            <h1>Create Workout</h1>
            <h4>Name</h4>
            <input placeholder="Name" onChange={e => { setWorkoutName(e.target.value) }}></input>
            <button onClick={createWorkout}>Create</button>
            <ul>
                {userWorkouts.map((workout) => (
                    <li key={workout.id}>
                        {workout.name}<button onClick={() => { navigateModifyWorkout(workout) }}>Modify Workout</button>
                        <button onClick={() => { deleteWorkout(workout.id) }}>Delete Workout</button>
                    </li>
                ))}
            </ul>
        </>
    )
}
export default CreateWorkout