import MenuItem from './MenuItem.tsx';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, NotepadText, X } from 'lucide-react'
import {useNavbarStore} from '../store/useNavbarStore'


function Navbar() {
    const navigate = useNavigate();
    const visible = useNavbarStore((state) => state.visible);
    const close = useNavbarStore(state => state.close);
    function navigateToExercises() {
        navigate('/exercises')
    }
    function navigateToRoutines() {
        navigate('/routines')
    }
    function closeNavbar() {
        close();
    }

    if (!visible) {
        return null;
    }
    return (
        <div className="absolute inset-y-0  left-0 z-20 h-full w-1/4 bg-zinc-900 flex flex-col justify-start p-3">
            <div className="flex items-center pt-3">
                <img src="/Gainz_Logo.svg" className="size-12"></img>
                <div className="text-white tracking-widest text-2xl font-extrabold">GAINZ</div>
                <X
                    onClick={closeNavbar}
                    className="ml-auto mb-5 text-zinc-400 hover:text-white "
                />
            </div>
            <MenuItem itemName="Exercises" onClick={navigateToExercises} icon={Dumbbell}></MenuItem>
            <MenuItem itemName="Routines" onClick={navigateToRoutines} icon={NotepadText}></MenuItem>

        </div>)
}

export default Navbar;