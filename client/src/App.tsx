import { useEffect, useState } from 'react';

type Exercise = {
  id: number,
  name: String,
  muscleGroup: String
}
function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/get-exercises").then((res) => {
      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }
      return res.json();
    }).then((json: { message: string, data: Exercise[] }) => {
      setExercises(json.data);
    }).catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p>{error}</p>
  }
  return (
    <>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            {exercise.name} - {exercise.muscleGroup ?? "N/A"}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
