import { create } from 'zustand'

interface FavoritesStore {
    isFavorites: boolean
    setIsFavorites: () => void
    setIsNotFavorites: () => void
    favoriteIds: Set<number>
    addFavorite: (id: number) => void
    removeFavorite: (id: number) => void
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
    isFavorites: false,
    setIsFavorites: () => set(() => ({ isFavorites: true })),
    setIsNotFavorites: () => set(() => ({ isFavorites: false })),
    favoriteIds: new Set(), // Inicialmente vacío
    addFavorite: (id: number) =>
        set((state) => {
            // Creamos una nueva instancia del Set y añadimos el id
            const newSet = new Set(state.favoriteIds)
            newSet.add(id)
            return { favoriteIds: newSet }
        }),
    removeFavorite: (id: number) =>
        set((state) => {
            const newSet = new Set(state.favoriteIds)
            newSet.delete(id)
            return { favoriteIds: newSet }
        }),
}))
