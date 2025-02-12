'use client'

import ComicCard from './comic-card'
import { Comic } from '@/app/types/marvel/comic'
import { useLoadingStore } from '@/app/store/loadingStore'
import { useEffect } from 'react'

type ComicCardGridProps = {
    results: Comic[]
}

export default function ComicCardGrid({ results }: ComicCardGridProps) {
    const { setIsLoaded } = useLoadingStore()

    useEffect(() => {
        setIsLoaded()
    }, [])

    return (
        <div className="xl:px-12 xl:pb-12">
            <div className="flex gap-4 overflow-x-auto px-4 pb-4 xl:px-0 xl:overflow-auto">
                {results.map((comic: Comic) => (
                    <ComicCard key={comic.id} comic={comic} />
                ))}
            </div>
        </div>
    )
}
