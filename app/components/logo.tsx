import Image from 'next/image'

export default function Logo() {
    return (
        <Image
            src="/Marvel logo.png" // La ruta relativa desde la carpeta public
            alt="Marvel logo" // Texto alternativo para la imagen
            width={130} // Especifica el ancho en píxeles
            height={52} // Especifica la altura en píxeles
        />
    )
}
