import Input from '@/app/components/input'
import ResultsCount from './results-count'
import { Character } from '@/app/types/marvel/character'

type SearchProps = {
    data: { results: Character[] }
}

export default function Search({ data }: SearchProps) {
    return (
        <div className="px-4 py-3 grid grid-col-1 gap-3 my-6">
            <Input />
            <ResultsCount data={data} />
        </div>
    )
}
