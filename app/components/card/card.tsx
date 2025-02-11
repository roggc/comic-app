'use client'

import { Character } from '@/app/types/marvel/character'
import './card.css'
import Image from 'next/image'
import Heart from '@/app/components/heart'
import { useState } from 'react'
import Link from 'next/link'

type CardProps = {
    character: Character
}

export default function Card({ character }: CardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link
            href={`/detail/${character.id}?name=${encodeURIComponent(character.name)}&image=${encodeURIComponent(`${character.thumbnail.path}.${character.thumbnail.extension}`)}&description=${encodeURIComponent(character.description)}`}
        >
            <div
                className="cut-corner-br group overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative h-48 w-full border-b-4 border-marvelred">
                    <Image
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 14vw"
                        className="object-fill"
                    />
                </div>
                <div className="p-4 pb-8 flex justify-between items-center bg-black relative">
                    <div className="text-white text-sm truncate z-10">
                        {character.name.toUpperCase()}
                    </div>
                    <Heart bgIsRed={isHovered} id={character.id} />
                    <div className="absolute top-0 left-0 w-full bg-marvelred h-0 group-hover:h-full transition-all duration-500 ease-out z-0"></div>
                </div>
            </div>
        </Link>
    )
}
