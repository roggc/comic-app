// __tests__/Logo.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Logo from '@/app/components/logo'
import { useFavoritesStore } from '@/app/store/favoritesStore'
import type { ImageProps, StaticImageData } from 'next/image'

// Mock de next/image para que renderice un <img> normal
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

// Mock de next/link para renderizar un <a>
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

describe('Logo component', () => {
    // Antes de cada test, sobrescribimos setIsNotFavorites en la store para poder espiarla
    beforeEach(() => {
        useFavoritesStore.setState({
            setIsNotFavorites: jest.fn(),
        })
    })

    it('renderiza la imagen con el alt correcto y el link con href "/"', () => {
        render(<Logo />)
        const img = screen.getByAltText('Marvel logo')
        expect(img).toBeInTheDocument()
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', '/')
    })

    it('llama a setIsNotFavorites al hacer clic en el logo', () => {
        render(<Logo />)
        const link = screen.getByRole('link')
        // Simulamos el clic
        fireEvent.click(link)

        // Obtenemos el estado actual de la store
        const { setIsNotFavorites } = useFavoritesStore.getState()
        expect(setIsNotFavorites).toHaveBeenCalled()
    })
})
