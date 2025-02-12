import { getMarvelData } from './lib/marvel-api'
import Search from './components/search'
import FavoritesTitle from './components/favorites-title'
import CardGrid from './components/card-grid'

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ nameStartsWith?: string }>
}) {
    const awaitedSearchParams = await searchParams
    const { data } = await getMarvelData(
        'characters',
        awaitedSearchParams.nameStartsWith
    )

    return (
        <>
            <FavoritesTitle />
            <Search data={data} />
            <CardGrid data={data} />
        </>
    )
}
