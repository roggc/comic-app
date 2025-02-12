// Card.test.tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Card from '@/app/components/card/card'
import { Character } from '@/app/types/marvel/character'

// Mock de Next/Image para renderizar una etiqueta img
jest.mock('next/image', () => (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
})

// Mock de Next/Link para renderizar un anchor
jest.mock('next/link', () => {
    return ({
        children,
        href,
    }: {
        children: React.ReactNode
        href: string
    }) => <a href={href}>{children}</a>
})

// Mock del componente Heart para que podamos inspeccionar la prop bgIsRed
jest.mock('@/app/components/heart', () => (props: any) => {
    return <div data-testid="heart" data-bg-is-red={props.bgIsRed} />
})

// Objeto de ejemplo para Character
const sampleCharacter: Character = {
    id: 123,
    name: 'Spider-Man',
    description: 'A friendly neighborhood Spider-Man.',
    thumbnail: {
        path: 'https://example.com/spiderman',
        extension: 'jpg',
    },
    // Otras propiedades que requiera la interfaz
}

describe('Card component', () => {
    it('renderiza el nombre, la imagen y el link correctamente', () => {
        render(<Card character={sampleCharacter} />)

        // Verifica que el nombre (en mayúsculas) se renderiza
        expect(screen.getByText('SPIDER-MAN')).toBeInTheDocument()

        // Verifica que el link contiene la ruta correcta
        const link = screen.getByRole('link') as HTMLAnchorElement
        expect(link).toHaveAttribute(
            'href',
            expect.stringContaining(`/detail/${sampleCharacter.id}`)
        )
        // Verifica que el nombre se pasa como query param (codificado)
        expect(link.href).toContain(encodeURIComponent(sampleCharacter.name))

        // Verifica que la imagen se renderiza con el alt correcto
        const img = screen.getByAltText(sampleCharacter.name)
        expect(img).toBeInTheDocument()
        // Opcional: se puede comprobar que la src contiene la URL esperada
        expect(img).toHaveAttribute(
            'src',
            expect.stringContaining('https://example.com/spiderman')
        )
    })

    it('actualiza la prop bgIsRed del Heart al hacer hover', () => {
        render(<Card character={sampleCharacter} />)

        // Buscamos el contenedor que tiene los eventos de hover.
        // En este caso, lo identificamos por la clase "cut-corner-br".
        const container = document.querySelector('.cut-corner-br')
        expect(container).toBeInTheDocument()

        // Inicialmente, el estado de hover es false y por tanto bgIsRed debe ser false.
        let heart = screen.getByTestId('heart')
        expect(heart).toHaveAttribute('data-bg-is-red', 'false')

        // Simulamos el mouse enter para activar el hover.
        fireEvent.mouseEnter(container!)
        heart = screen.getByTestId('heart')
        expect(heart).toHaveAttribute('data-bg-is-red', 'true')

        // Simulamos el mouse leave para desactivar el hover.
        fireEvent.mouseLeave(container!)
        heart = screen.getByTestId('heart')
        expect(heart).toHaveAttribute('data-bg-is-red', 'false')
    })
})
