'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useFavoritesStore } from '@/app/store/favoritesStore'

type HeartProps = {
    bgIsRed?: boolean
}

export default function Heart({ bgIsRed }: HeartProps) {
    const [isFavourite, setIsFavourite] = useState(false)
    const { addFavorite, removeFavorite } = useFavoritesStore()

    const toggleFavourite = () => {
        setIsFavourite((currentValue) => !currentValue)
        if (isFavourite) {
            removeFavorite()
        } else {
            addFavorite()
        }
    }

    return (
        <Image
            src={isFavourite ? '/heart-full.png' : '/heart-empty.png'}
            alt="Weather it is favourite or not"
            width={isFavourite ? 24 : 26}
            height={isFavourite ? 22 : 25}
            onClick={toggleFavourite}
            className={`cursor-pointer z-10 transition duration-500 ${bgIsRed ? 'filter brightness-0 invert' : ''}`}
            style={{ width: 12, height: 'auto' }}
        />
    )
}
