'use client'

import { useFavoritesStore } from '@/app/store/favoritesStore'

export default function FavoritesTitle() {
    const { isFavorites } = useFavoritesStore()

    return (
        <div
            className={`text-2xl font-bold px-4 transition-all duration-500 ${isFavorites ? 'max-h-20 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}
        >
            FAVORITES
        </div>
    )
}
