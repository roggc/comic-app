import { Character } from '@/app/types/marvel/character'
import { useFavoritesStore } from '@/app/store/favoritesStore'

export function useResults(data: { results: Character[] }) {
    const { isFavorites, favoriteIds } = useFavoritesStore()

    const results = isFavorites
        ? data?.results.filter((character: Character) =>
              favoriteIds.has(character.id)
          )
        : data?.results

    return results
}
