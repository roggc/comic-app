import { getMarvelData } from '@/app/lib/marvel-api'
import Header from '@/app/components/header'
import DetailCard from '@/app/components/detail-card/detail-card'

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
        </>
    )
}
