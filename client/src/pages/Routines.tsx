import { useState, useEffect } from 'react';
import {api} from '../lib/api';
type Routine = {
    name: string,
    id: number,
    userId: number,
    createdAt: string,
    updatedAt: string
}

function Routines() {
    useEffect(() => {
        async function getRoutines() {
            try {
                const userIdString = localStorage.getItem("userId");
                if (!userIdString) {
                    throw new Error("userId not found in localStorage");
                }
                const userId = parseInt(userIdString);
                const response = await api(`/api/routines?userId=${userId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed To Get Routines");
                }
                const responseData = await response.json();
                const routines = responseData.data;
                setRoutines(routines);
            }
            catch (err) {
                alert(`${err}`);
            }
        }
        getRoutines();
    }, [])

    const [routines, setRoutines] = useState<Routine[]>([]);
    return (
        <ul>{routines.map((routine) => (
            <li key={routine.id}>
                {routine.name}
            </li>
        ))}</ul>
    )
}

export default Routines;