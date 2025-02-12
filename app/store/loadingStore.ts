import { create } from 'zustand'

interface LoadingStore {
    isLoaded: boolean
    setIsLoaded: () => void
    setIsNotLoaded: () => void
}

export const useLoadingStore = create<LoadingStore>((set) => ({
    isLoaded: false,
    setIsLoaded: () => set(() => ({ isLoaded: true })),
    setIsNotLoaded: () => set(() => ({ isLoaded: false })),
}))
