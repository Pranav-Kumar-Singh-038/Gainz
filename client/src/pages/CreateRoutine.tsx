import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api.ts';
import Button from '../components/Button';
import Input from '../components/Input';

export type Workout =
    {
        id: number,
        name: string,
        userId: number,
        createdAt: string,
        updatedAt: string
    }

function CreateRoutine() {

    const [routineName, setRoutineName] = useState<string>('');
    const navigate = useNavigate();


    async function createRoutine() {
        try {
            const userIdString = localStorage.getItem("userId");
            if (!userIdString) {
                throw new Error("userId not found in localStorage");
            }
            const userId = parseInt(userIdString);
            const response = await api('/api/create-routine', {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ userId: userId, name: routineName })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed To Create Routine");
            }
            alert("Routine Added Successfully");
        }
        catch (err) {
            alert(`${err}`)
        }
    }

    return (
        <div className='bg-black h-screen'>
            <div className="flex items-center justify-between p-2">
                <div className="text-white tracking-widest text-3xl font-semibold pl-3 pt-3">Create Routine</div>
                <Button itemName="Save" onClick={createRoutine}></Button>
            </div>
            <Input label={'Routine Title'} placeholder="Workout Routine Title" value={routineName}
                onChange={(e) => setRoutineName(e.target.value)}></Input>
        </div>
    )
}

export default CreateRoutine;