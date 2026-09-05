import MenuItem from './MenuItem.tsx';
import {useNavigate} from 'react-router-dom';

function Navbar() {
    const navigate=useNavigate();
    
    function navigateToExercises() {
        navigate('/exercises')
    }
    return (
        <div className="h-full w-1/4 bg-zinc-900 flex-col justify-center p-3">
            <div className="flex items-center pt-3">
                <img src="/Gainz_Logo.svg" className="size-12"></img>
                <div className="text-white tracking-widest text-2xl font-extrabold">GAINZ</div>
            </div>
            <MenuItem itemName="Exercises" onClick={navigateToExercises}></MenuItem>
        </div>
    )
}

export default Navbar;