import { getMarvelData } from './lib/marvel-api'
import Header from './components/header'
import Search from './components/search'
import FavoritesTitle from './components/favorites-title'
import CardGrid from './components/card-grid'

export default async function Home({
    searchParams,
}: {
    searchParams: { nameStartsWith?: string }
}) {
    const awaitedSearchParams = await searchParams
    const { data } = await getMarvelData(
        'characters',
        awaitedSearchParams.nameStartsWith
    )

    return (
        <>
            <Header />
            <FavoritesTitle />
            <Search data={data} />
            <CardGrid data={data} />
        </>
    )
}
