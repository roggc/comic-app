'use client'

import Image from 'next/image'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import Link from 'next/link'

export default function Favourites() {
    const { favoriteIds, setIsFavorites } = useFavoritesStore()

    return (
        <Link href="/" onClick={setIsFavorites}>
            <div className="flex gap-2 p-2 cursor-pointer">
                <Image
                    src="/heart-full.png"
                    alt="Favourite icon"
                    width={24}
                    height={22}
                    style={{ width: '24px', height: 'auto' }}
                />
                <div className="text-white">{favoriteIds.size}</div>
            </div>
        </Link>
    )
}
