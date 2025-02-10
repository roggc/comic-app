import { getMarvelData } from './lib/marvel-api'
import { Character } from './types/marvel/character'

export default async function Home() {
    const { data } = await getMarvelData('characters')

    return (
        <div className="">
            {data.results.map((character: Character) => (
                <img
                    key={character.id}
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                />
            ))}
        </div>
    )
}
