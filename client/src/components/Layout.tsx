import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.tsx'
import {Menu} from 'lucide-react';
import { useNavbarStore } from '../store/useNavbarStore';

function Layout() {
    const open=useNavbarStore(state=>state.open);
    const visible=useNavbarStore(state=>state.visible);

    function openNavbar()
    {
        open();
    }

    return (
        <div className='relative flex h-screen overflow-hidden'>
            <Navbar></Navbar>
            <main className='flex-1 overflow-auto'>
                <div className="h-17 bg-zinc-800 flex items-center px-3" onClick={openNavbar}>
                    {!visible && <Menu className='text-gray-300'></Menu>}
                </div>
                <Outlet></Outlet>
            </main>
        </div>

    )
}

export default Layout;