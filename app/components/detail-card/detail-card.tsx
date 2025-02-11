'use client'

import './detail-card.css'
import Image from 'next/image'
import Heart from '@/app/components/heart'

type CardProps = {
    name: string
    image: string
    description: string
    id: string
}

export default function DetailCard({
    name,
    image,
    description,
    id,
}: CardProps) {
    return (
        <div className="cut-corner-br">
            <div className="relative h-96 w-full">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 14vw"
                    className="object-fill"
                />
            </div>
            <div className="bg-black grid grid-cols-1 gap-6 px-4 pt-6 pb-12">
                <div className="flex justify-between items-center">
                    <div className="text-white text-[2rem] truncate z-10">
                        {name.toUpperCase()}
                    </div>
                    <Heart bgIsRed={false} id={parseInt(id, 10)} isBig />
                </div>
                <div className="text-white">{description}</div>
            </div>
        </div>
    )
}
