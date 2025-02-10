import { getMarvelData } from './lib/marvel-api'
import { Character } from './types/marvel/character'
import Header from './components/header'
import Card from './components/card/card'

export default async function Home() {
    const { data } = await getMarvelData('characters')

    return (
        <div className="">
            <Header />
            <div className="overflow-auto grid grid-cols-2 gap-4 p-4">
                {data.results.map((character: Character) => (
                    <Card key={character.id} character={character} />
                ))}
            </div>
        </div>
    )
}
