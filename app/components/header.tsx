import Logo from './logo'
import Favourites from './favourites'

export default function Header() {
    return (
        <div className="p-4 bg-black sticky top-0 z-10 flex justify-between items-center">
            <Logo />
            <Favourites />
        </div>
    )
}
