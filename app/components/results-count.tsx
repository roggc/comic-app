'use client'

import { Character } from '@/app/types/marvel/character'
import { useResults } from '@/app/hooks'

type ResultsCountProps = {
    data: { results: Character[] }
}

export default function ResultsCount({ data }: ResultsCountProps) {
    const results = useResults(data)
    const count = results.length

    return (
        <div className="text-xs">{`${count} RESULT${count === 1 ? '' : 'S'}`}</div>
    )
}
