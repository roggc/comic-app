// ComicCard.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import ComicCard from '@/app/components/comic-card'
import { Comic } from '@/app/types/marvel/comic'

// Mockear el componente Image de Next.js para que se renderice como una <img>
jest.mock('next/image', () => (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
})

const sampleComic: Comic = {
    id: 1,
    title: 'Test Comic',
    thumbnail: {
        path: 'https://example.com/image',
        extension: 'jpg',
    },
    dates: [
        { type: 'onsaleDate', date: '2022-01-01T00:00:00Z' },
        { type: 'focDate', date: '2021-12-01T00:00:00Z' },
    ],
}

describe('ComicCard', () => {
    it('renderiza el título, la imagen y el año correctamente', () => {
        render(<ComicCard comic={sampleComic} />)

        // Verifica que se muestra el título
        expect(screen.getByText('Test Comic')).toBeInTheDocument()

        // Verifica que la imagen se renderiza con el alt correcto y que su src contiene la URL esperada
        const img = screen.getByAltText('Test Comic')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute(
            'src',
            expect.stringContaining('https://example.com/image')
        )

        // Verifica que se muestra el año correcto (2022)
        expect(screen.getByText('2022')).toBeInTheDocument()
    })
})
