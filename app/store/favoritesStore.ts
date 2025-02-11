import { create } from 'zustand'

interface FavoritesStore {
    favoritesCount: number
    addFavorite: () => void
    removeFavorite: () => void
    isFavorites: boolean
    setIsFavorites: () => void
    setIsNotFavorites: () => void
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
    favoritesCount: 0,
    addFavorite: () =>
        set((state) => ({ favoritesCount: state.favoritesCount + 1 })),
    removeFavorite: () =>
        set((state) => ({ favoritesCount: state.favoritesCount - 1 })),
    isFavorites: false,
    setIsFavorites: () => set(() => ({ isFavorites: true })),
    setIsNotFavorites: () => set(() => ({ isFavorites: false })),
}))
