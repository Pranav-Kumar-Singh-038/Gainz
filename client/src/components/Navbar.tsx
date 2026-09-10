import MenuItem from './MenuItem.tsx';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, NotepadText, X } from 'lucide-react'

function Navbar() {
    const navigate = useNavigate();

    function navigateToExercises() {
        navigate('/exercises')
    }
    function navigateToRoutines() {
        navigate('/routines')
    }
    function closeNavbar() {
        // navigate('/exercises')
    }
    return (
        <div className="h-full w-1/4 bg-zinc-900 flex-col justify-center p-3">
            <div className="flex items-center pt-3">
                <img src="/Gainz_Logo.svg" className="size-12"></img>
                <div className="text-white tracking-widest text-2xl font-extrabold">GAINZ</div>
                <X
                    onClick={() => closeNavbar}
                    className="ml-auto mb-5 text-zinc-400 hover:text-white "
                />
            </div>
            <MenuItem itemName="Exercises" onClick={navigateToExercises} icon={Dumbbell}></MenuItem>
            <MenuItem itemName="Routines" onClick={navigateToRoutines} icon={NotepadText}></MenuItem>

        </div>
    )
}

export default Navbar;