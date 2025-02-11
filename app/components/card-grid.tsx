'use client'

import { Character } from '@/app/types/marvel/character'
import Card from '@/app/components/card/card'
import { useFavoritesStore } from '@/app/store/favoritesStore'

type CardGridProps = {
    data: {
        results: Character[]
    }
}

export default function CardGrid({ data }: CardGridProps) {
    const { isFavorites, favoriteIds } = useFavoritesStore()

    const results = isFavorites
        ? data.results.filter((character: Character) =>
              favoriteIds.has(character.id)
          )
        : data.results

    return (
        <div
            className={`overflow-auto grid grid-cols-2 gap-4 p-4 pt-0  transition-all duration-500 ${isFavorites ? 'mt-4' : 'mt-0'}`}
        >
            {results.map((character: Character) => (
                <Card key={character.id} character={character} />
            ))}
        </div>
    )
}
