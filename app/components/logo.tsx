'use client'

import Image from 'next/image'
import { useFavoritesStore } from '@/app/store/favoritesStore'

export default function Logo() {
    const { setIsNotFavorites } = useFavoritesStore()

    return (
        <Image
            src="/Marvel logo.png" // La ruta relativa desde la carpeta public
            alt="Marvel logo" // Texto alternativo para la imagen
            width={130} // Especifica el ancho en píxeles
            height={52} // Especifica la altura en píxeles
            onClick={setIsNotFavorites}
        />
    )
}
