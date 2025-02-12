// __tests__/Detail.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import Detail from '@/app/detail/[id]/page'
import { getMarvelData } from '@/app/lib/marvel-api'

// Mock de getMarvelData para controlar su respuesta
jest.mock('@/app/lib/marvel-api', () => ({
    getMarvelData: jest.fn(),
}))

jest.mock('@/app/components/header', () => {
    const FakeHeader = () => <div data-testid="header">Header</div>
    FakeHeader.displayName = 'FakeHeader'
    return FakeHeader
})

type DetailCardProps = {
    name: string
    image: string
    description: string
    id: string
}

jest.mock('@/app/components/detail-card/detail-card', () => {
    const FakeDetailCard = (props: DetailCardProps) => (
        <div data-testid="detail-card">
            DetailCard: {props.name}, {props.image}, {props.description},{' '}
            {props.id}
        </div>
    )
    FakeDetailCard.displayName = 'FakeDetailCard'
    return FakeDetailCard
})

type ComicCardGridProps = {
    results: {
        id: number
        title: string
        dates: { type: string; date: string }[]
    }[]
}

jest.mock('@/app/components/comic-card-grid', () => {
    const FakeComicCardGrid = (props: ComicCardGridProps) => (
        <div data-testid="comic-card-grid">
            ComicCardGrid with {JSON.stringify(props.results)}
        </div>
    )
    FakeComicCardGrid.displayName = 'FakeComicCardGrid'
    return FakeComicCardGrid
})

// Datos de ejemplo para comics
const fakeComicsData = {
    results: [
        {
            id: 1,
            title: 'Comic 1',
            dates: [{ type: 'onsaleDate', date: '2022-01-01T00:00:00Z' }],
            // otras propiedades que no son necesarias para el test
        },
        {
            id: 2,
            title: 'Comic 2',
            dates: [{ type: 'onsaleDate', date: '2023-01-01T00:00:00Z' }],
        },
    ],
}

describe('Detail page', () => {
    beforeEach(() => {
        // Configuramos el mock para getMarvelData para que resuelva con fakeComicsData
        ;(getMarvelData as jest.Mock).mockResolvedValue({
            data: fakeComicsData,
        })
    })

    it('renderiza correctamente la página de detalle con los datos recibidos', async () => {
        // Simulamos los parámetros como promesas resueltas
        const paramsPromise = Promise.resolve({ id: '123' })
        const searchParamsPromise = Promise.resolve({
            name: 'Spider-Man',
            image: 'https://example.com/spiderman.jpg',
            description: 'A friendly neighborhood Spider-Man',
        })

        // Llamamos a la función de página (es asíncrona)
        const pageElement = await Detail({
            params: paramsPromise,
            searchParams: searchParamsPromise,
        })

        // Renderizamos el JSX retornado
        render(pageElement)

        // Verificamos que se rendericen los componentes hijos
        expect(screen.getByTestId('header')).toBeInTheDocument()

        // DetailCard debe recibir los props correctos
        expect(screen.getByTestId('detail-card')).toHaveTextContent(
            'Spider-Man'
        )
        expect(screen.getByTestId('detail-card')).toHaveTextContent(
            'https://example.com/spiderman.jpg'
        )
        expect(screen.getByTestId('detail-card')).toHaveTextContent(
            'A friendly neighborhood Spider-Man'
        )
        expect(screen.getByTestId('detail-card')).toHaveTextContent('123')

        // ComicCardGrid se renderiza y contiene los datos ficticios de comics
        expect(screen.getByTestId('comic-card-grid')).toBeInTheDocument()
        expect(screen.getByTestId('comic-card-grid')).toHaveTextContent(
            'Comic 1'
        )
        expect(screen.getByTestId('comic-card-grid')).toHaveTextContent(
            'Comic 2'
        )

        // Verificamos que getMarvelData se llamó con los parámetros adecuados
        expect(getMarvelData).toHaveBeenCalledWith('comics', '', '123', 20)
    })
})
