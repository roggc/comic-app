'use client'

import Image from 'next/image'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import Link from 'next/link'

export default function Logo() {
    const { setIsNotFavorites } = useFavoritesStore()

    return (
        <Link href="/" onClick={setIsNotFavorites}>
            <Image
                src="/Marvel logo.png" // La ruta relativa desde la carpeta public
                alt="Marvel logo" // Texto alternativo para la imagen
                width={130} // Especifica el ancho en píxeles
                height={52} // Especifica la altura en píxeles
                className="cursor-pointer"
            />
        </Link>
    )
}
