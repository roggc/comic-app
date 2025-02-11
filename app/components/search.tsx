import Input from '@/app/components/input'
import ResultsCount from './results-count'

type SearchProps = {
    resultsCount: number
}

export default function Search({ resultsCount }: SearchProps) {
    return (
        <div className="px-4 py-3 grid grid-col-1 gap-3 my-6">
            <Input />
            <ResultsCount resultsCount={resultsCount} />
        </div>
    )
}
