'use client'

import Image from 'next/image'
import { useFavoritesStore } from '@/app/store/favoritesStore'

type HeartProps = {
    bgIsRed?: boolean
    id: number
}

export default function Heart({ bgIsRed, id }: HeartProps) {
    const { addFavorite, removeFavorite, favoriteIds } = useFavoritesStore()

    const isFavorite = favoriteIds.has(id)

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(id)
        } else {
            addFavorite(id)
        }
    }

    return (
        <Image
            src={isFavorite ? '/heart-full.png' : '/heart-empty.png'}
            alt="Weather it is favourite or not"
            width={isFavorite ? 24 : 26}
            height={isFavorite ? 22 : 25}
            onClick={toggleFavorite}
            className={`cursor-pointer z-10 transition duration-500 ${bgIsRed ? 'filter brightness-0 invert' : ''}`}
            style={{ width: 12, height: 'auto' }}
        />
    )
}
