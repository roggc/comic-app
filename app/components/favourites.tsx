import Image from 'next/image'

export default function Favourites() {
    return (
        <div className="flex gap-2 p-2">
            <Image
                src="/heart-full.png"
                alt="Favourite icon"
                width={24}
                height={22}
                style={{ width: '24px', height: 'auto' }}
            />
            <div className="text-white">3</div>
        </div>
    )
}
