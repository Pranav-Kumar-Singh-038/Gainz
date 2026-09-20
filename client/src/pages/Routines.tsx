import { useState, useEffect } from 'react';
import Card from '../components/Card.tsx'
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import {NotepadText} from 'lucide-react';

type Routine = {
    name: string,
    id: number,
    userId: number,
    createdAt: string,
    updatedAt: string
}

function Routines() {
    const navigate = useNavigate();

    function navigateToCreateRoutine() {
        navigate(`/create-routine`)
    }

    function navigateToRoutine(routineId: number) {
        navigate(`/routine/${routineId}`)
    }

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
        <div className='bg-black h-screen'>
            <div className="text-white tracking-widest text-3xl font-semibold pl-3 pt-3">Routines</div>
            <Card itemName={"New Routine"} onClick={() => navigateToCreateRoutine()} icon={NotepadText}></Card>
            <div className='text-white tracking-wider text-xl font-semibold pl-4 pt-3'>My Routines</div>
            <ul>{routines.map((routine) => (
                <li key={routine.id}>
                    <Card itemName={routine.name} onClick={() => navigateToRoutine(routine.id)}></Card>
                </li>
            ))}</ul>
        </div>
    )
}

export default Routines;