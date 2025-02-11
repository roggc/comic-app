import ComicCard from './comic-card'
import { Comic } from '@/app/types/marvel/comic'

type ComicCardGridProps = {
    data: {
        results: Comic[]
    }
}

export default function ComicCardGrid({ data }: ComicCardGridProps) {
    return (
        <div className="flex gap-4 overflow-x-auto px-4 pb-4">
            {data.results.map((comic: Comic) => (
                <ComicCard key={comic.id} comic={comic} />
            ))}
        </div>
    )
}
