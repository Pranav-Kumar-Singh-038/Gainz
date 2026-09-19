import { create } from 'zustand'

type NavbarStore = {
    visible: boolean,
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const useNavbarStore = create<NavbarStore>((set) => ({
    visible: true,
    open: () => set({ visible: true }),
    close: () => set({ visible: false }),
    toggle: () => set((s) => ({ visible: !s.visible }))
}))