// __tests__/Logo.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Logo from '@/app/components/logo'
import { useFavoritesStore } from '@/app/store/favoritesStore'

// Mock de next/image para que renderice un <img> normal
jest.mock('next/image', () => (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
})

// Mock de next/link para renderizar un <a>
jest.mock('next/link', () => {
    return ({
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
