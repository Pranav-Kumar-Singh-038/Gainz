import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    function navigateToExercises() {
        navigate('/exercises')
    }
    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={navigateToExercises}>Exercises</button>
        </>

    )
}

export default Dashboard;