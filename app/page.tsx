import { getMarvelData } from './lib/marvel-api'
import Header from './components/header'
import Search from './components/search'
import FavoritesTitle from './components/favorites-title'
import CardGrid from './components/card-grid'

export default async function Home() {
    const { data } = await getMarvelData('characters')

    return (
        <>
            <Header />
            <FavoritesTitle />
            <Search />
            <CardGrid data={data} />
        </>
    )
}
