import ComicCard from './comic-card'
import { Comic } from '@/app/types/marvel/comic'

type ComicCardGridProps = {
    results: Comic[]
}

export default function ComicCardGrid({ results }: ComicCardGridProps) {
    return (
        <div className="flex gap-4 overflow-x-auto px-4 pb-4">
            {results.map((comic: Comic) => (
                <ComicCard key={comic.id} comic={comic} />
            ))}
        </div>
    )
}
