import { getMarvelData } from '@/app/lib/marvel-api'
import Header from '@/app/components/header'
import DetailCard from '@/app/components/detail-card/detail-card'
import ComicCardGrid from '@/app/components/comic-card-grid'
import { Comic } from '@/app/types/marvel/comic'

const LIMIT = 20

export default async function Detail({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { name?: string; image?: string; description?: string }
}) {
    const { name, image, description } = await searchParams
    const { id } = await params
    const { data } = await getMarvelData('comics', '', id, LIMIT)

    return (
        <>
            <Header />
            <DetailCard
                name={name ?? ''}
                image={image ?? ''}
                description={description ?? ''}
                id={id}
            />
            <div className="font-bold text-2xl px-4 pt-10 pb-5">COMICS</div>
            <ComicCardGrid
                results={data.results.sort((c1: Comic, c2: Comic) => {
                    const date1Str =
                        c1.dates.find((date) => date.type === 'onsaleDate')
                            ?.date ?? ''
                    const date2Str =
                        c2.dates.find((date) => date.type === 'onsaleDate')
                            ?.date ?? ''
                    const time1 = new Date(date1Str).getTime()
                    const time2 = new Date(date2Str).getTime()

                    // Manejo de fechas inválidas
                    if (isNaN(time1) && isNaN(time2)) return 0
                    if (isNaN(time1)) return 1
                    if (isNaN(time2)) return -1

                    return time2 - time1
                })}
            />
        </>
    )
}
