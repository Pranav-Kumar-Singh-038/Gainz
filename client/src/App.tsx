import { useEffect, useState } from 'react';

type Exercise = {
  id: number,
  name: string,
  instructions: string | null,
  imageUrl: string | null,
  videoUrl: string | null,
}
function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/exercises").then((res) => {
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
            {exercise.name} - {exercise.instructions ?? "N/A"}
            {exercise.imageUrl && <img src={exercise.imageUrl} alt={exercise.name} />}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
