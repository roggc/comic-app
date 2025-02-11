import { create } from 'zustand'

interface FavoritesStore {
    favoritesCount: number
    addFavorite: () => void
    removeFavorite: () => void
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
    favoritesCount: 0,
    addFavorite: () =>
        set((state) => ({ favoritesCount: state.favoritesCount + 1 })),
    removeFavorite: () =>
        set((state) => ({ favoritesCount: state.favoritesCount - 1 })),
}))
