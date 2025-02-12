// useResults.test.ts
import { renderHook } from '@testing-library/react'
import { useResults } from '@/app/hooks/use-results'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import { Character } from '@/app/types/marvel/character'

// Datos de ejemplo para testear
const sampleData = {
    results: [
        {
            id: 1,
            name: 'Character A',
            description: 'Description A',
            thumbnail: { path: 'path', extension: 'jpg' },
        },
        {
            id: 2,
            name: 'Character B',
            description: 'Description B',
            thumbnail: { path: 'path', extension: 'jpg' },
        },
        {
            id: 3,
            name: 'Character C',
            description: 'Description C',
            thumbnail: { path: 'path', extension: 'jpg' },
        },
    ],
}

describe('useResults hook', () => {
    beforeEach(() => {
        // Reiniciamos el estado de la store antes de cada test para evitar contaminación
        useFavoritesStore.setState({
            isFavorites: false,
            favoriteIds: new Set<number>(),
        })
    })

    it('debe retornar todos los resultados cuando isFavorites es false', () => {
        // Nos aseguramos de que isFavorites es false
        useFavoritesStore.setState({ isFavorites: false })
        const { result } = renderHook(() => useResults(sampleData))
        expect(result.current).toEqual(sampleData.results)
    })

    it('debe retornar solo los resultados favoritos cuando isFavorites es true', () => {
        // Configuramos el store para que esté en modo favoritos y con algunos ids marcados
        useFavoritesStore.setState({
            isFavorites: true,
            favoriteIds: new Set<number>([1, 3]),
        })
        const { result } = renderHook(() => useResults(sampleData))
        // Esperamos obtener solo los personajes cuyos id sean 1 y 3
        const expected = sampleData.results.filter((char: Character) =>
            [1, 3].includes(char.id)
        )
        expect(result.current).toEqual(expected)
    })
})
