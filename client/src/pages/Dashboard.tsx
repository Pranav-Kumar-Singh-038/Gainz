import { useNavigate } from 'react-router-dom';

function Dashboard({ setLoggedIn }: { setLoggedIn: (value: boolean) => void }) {
    const navigate = useNavigate();

    function navigateToCreateWorkout() {
        navigate('/create-workout');
    }

    function performLogout() {
        localStorage.removeItem('userId');
        alert('Logout Successful');
        navigate('/login');
        setLoggedIn(false);
    }


    return (
        <>
            <div className="flex h-screen">
                <h1>Dashboard</h1>
                <button onClick={navigateToCreateWorkout}>Create Workout</button>
                <button onClick={performLogout}>Logout</button>
            </div>

        </>

    )
}

export default Dashboard;