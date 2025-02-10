import Image from 'next/image'

export default function Header() {
    return (
        <div className="p-4 bg-black sticky top-0 z-10">
            <Image
                src="/Marvel logo.png" // La ruta relativa desde la carpeta public
                alt="Marvel logo" // Texto alternativo para la imagen
                width={130} // Especifica el ancho en píxeles
                height={52} // Especifica la altura en píxeles
            />
        </div>
    )
}
