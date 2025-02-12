// ComicCard.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import ComicCard from '@/app/components/comic-card'
import { Comic } from '@/app/types/marvel/comic'
import type { ImageProps, StaticImageData } from 'next/image'

// Mockear el componente Image de Next.js para que se renderice como una <img>
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
