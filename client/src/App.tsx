import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Exercises from './pages/Exercises'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
import CreateWorkout from './pages/CreateWorkout'
import WorkoutExercises from './pages/WorkoutExercises'

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("userId") !== null
  );

  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ?
          (<Route path="/" element={<Dashboard setLoggedIn={setLoggedIn} />} />) :
          (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/"
                element={<Navigate to="/signup" replace />}
              />
            </>
          )}

        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/create-workout" element={<CreateWorkout/>}></Route>
        <Route path="/workout/:workoutId/exercises" element={<WorkoutExercises/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
