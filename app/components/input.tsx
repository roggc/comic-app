import SearchIcon from '@/app/components/search-icon'

export default function Input() {
    return (
        <div className="h-[27px] border-b border-black pb-2 flex gap-3">
            <SearchIcon />
            <input
                type="text"
                placeholder="SEARCH A CHARACTER..."
                className="w-full bg-transparent focus:outline-none"
            />
        </div>
    )
}
