'use client'

import { useFavoritesStore } from '@/app/store/favoritesStore'

type ResultsCountProps = {
    resultsCount: number
}

export default function ResultsCount({ resultsCount }: ResultsCountProps) {
    const { isFavorites, favoriteIds } = useFavoritesStore()

    const count = isFavorites ? favoriteIds.size : resultsCount

    return (
        <div className="text-xs">{`${count} RESULT${count === 1 ? '' : 'S'}`}</div>
    )
}
