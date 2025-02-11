import { Comic } from '@/app/types/marvel/comic'
import Image from 'next/image'

const WIDTH = 164
const ASPECT_RATIO = 2 / 3
const HEIGHT = WIDTH / ASPECT_RATIO

type ComicCardProps = {
    comic: Comic
}

export default function ComicCard({ comic }: ComicCardProps) {
    return (
        <div className="flex-shrink-0 flex flex-col gap-4 max-w-[164px]">
            <div
                className="relative"
                style={{
                    height: `${HEIGHT}px`,
                    width: `${WIDTH}px`,
                }}
            >
                <Image
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 14vw"
                    className="object-fill"
                />
            </div>
            <div className="text-black text-sm font-medium whitespace-normal break-words w-full">
                {comic.title}
            </div>
            <div className="font-normal text-xs">
                {new Date(
                    comic.dates.find((date) => date.type === 'onsaleDate')
                        ?.date ?? ''
                ).getFullYear()}
            </div>
        </div>
    )
}
