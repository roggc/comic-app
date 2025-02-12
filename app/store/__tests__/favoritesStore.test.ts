// favoritesStore.test.ts
import { useFavoritesStore } from '@/app/store/favoritesStore'

describe('FavoritesStore', () => {
    // Reiniciamos el estado de la store antes de cada test.
    beforeEach(() => {
        useFavoritesStore.setState({
            isFavorites: false,
            favoriteIds: new Set<number>(),
        })
    })

    it('debe tener el estado inicial', () => {
        const state = useFavoritesStore.getState()
        expect(state.isFavorites).toBe(false)
        expect(state.favoriteIds.size).toBe(0)
    })

    it('debe activar isFavorites al llamar a setIsFavorites', () => {
        const { setIsFavorites, isFavorites } = useFavoritesStore.getState()
        setIsFavorites()
        const newState = useFavoritesStore.getState()
        expect(newState.isFavorites).toBe(true)
    })

    it('debe desactivar isFavorites al llamar a setIsNotFavorites', () => {
        const { setIsFavorites, setIsNotFavorites } =
            useFavoritesStore.getState()
        // Primero activamos y luego desactivamos.
        setIsFavorites()
        expect(useFavoritesStore.getState().isFavorites).toBe(true)
        setIsNotFavorites()
        expect(useFavoritesStore.getState().isFavorites).toBe(false)
    })

    it('debe agregar un id favorito con addFavorite', () => {
        const { addFavorite, favoriteIds } = useFavoritesStore.getState()
        addFavorite(5)
        expect(useFavoritesStore.getState().favoriteIds.has(5)).toBe(true)
    })

    it('debe remover un id favorito con removeFavorite', () => {
        const { addFavorite, removeFavorite } = useFavoritesStore.getState()
        // Primero lo agregamos.
        addFavorite(7)
        expect(useFavoritesStore.getState().favoriteIds.has(7)).toBe(true)
        // Luego lo removemos.
        removeFavorite(7)
        expect(useFavoritesStore.getState().favoriteIds.has(7)).toBe(false)
    })
})
