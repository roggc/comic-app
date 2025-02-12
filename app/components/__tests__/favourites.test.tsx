// __tests__/Favourites.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Favourites from '@/app/components/favourites' // Ajusta la ruta según tu estructura
import { useFavoritesStore } from '@/app/store/favoritesStore'
import type { ImageProps, StaticImageData } from 'next/image'

// Mock de Next/Image para renderizar un <img> normal
jest.mock('next/image', () => {
    const FakeImage = ({ src, ...rest }: ImageProps) => {
        let srcString: string
        if (typeof src === 'string') {
            srcString = src
        } else {
            // Convertimos primero a unknown y luego a StaticImageData para obtener la propiedad src
            srcString = (src as unknown as StaticImageData).src
        }
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={srcString} {...rest} />
        )
    }
    FakeImage.displayName = 'FakeImage'
    return FakeImage
})

// Mock de Next/Link para renderizar un <a>
jest.mock('next/link', () => {
    const FakeLink = ({
        children,
        href,
        onClick,
    }: {
        children: React.ReactNode
        href: string
        onClick: () => void
    }) => (
        <a href={href} onClick={onClick}>
            {children}
        </a>
    )
    FakeLink.displayName = 'FakeLink'
    return FakeLink
})

describe('Favourites component', () => {
    const testFavoriteIds = new Set<number>([1, 2, 3]) // Ejemplo de favoritos

    beforeEach(() => {
        // Reinicia la store para cada test
        useFavoritesStore.setState({
            favoriteIds: testFavoriteIds,
            setIsFavorites: jest.fn(), // Sobrescribe con un mock para poder espiar la llamada
        })
    })

    it('renderiza el enlace, la imagen y el contador de favoritos', () => {
        render(<Favourites />)

        // Verifica que el link tiene href "/"
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/')

        // Verifica que la imagen se renderiza con el alt correcto
        const img = screen.getByAltText('Favourite icon')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', '/heart-full.png')

        // Verifica que se muestra el tamaño del Set (en este caso 3)
        expect(
            screen.getByText(testFavoriteIds.size.toString())
        ).toBeInTheDocument()
    })

    it('llama a setIsFavorites al hacer clic en el enlace', () => {
        render(<Favourites />)

        // Obtenemos el enlace
        const link = screen.getByRole('link')
        // Simula el clic
        fireEvent.click(link)

        // Verifica que setIsFavorites fue llamada
        expect(useFavoritesStore.getState().setIsFavorites).toHaveBeenCalled()
    })
})
