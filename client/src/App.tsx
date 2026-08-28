import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Exercises from './pages/Exercises'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login';
function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("userId") !== null
  );

  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ?
          (<Route path="/" element={<Dashboard />} />) :
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
