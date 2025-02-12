// __tests__/Home.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { getMarvelData } from '@/app/lib/marvel-api'

// Mock de getMarvelData para que retorne datos predecibles
jest.mock('@/app/lib/marvel-api', () => ({
    getMarvelData: jest.fn(),
}))

// Mock de los componentes hijos para simplificar el test
jest.mock('@/app/components/header', () => () => (
    <div data-testid="header">Header</div>
))
jest.mock('@/app/components/favorites-title', () => () => (
    <div data-testid="favorites-title">FavoritesTitle</div>
))
jest.mock('@/app/components/search', () => ({ data }: { data: any }) => (
    <div data-testid="search">Search: {JSON.stringify(data)}</div>
))
jest.mock('@/app/components/card-grid', () => ({ data }: { data: any }) => (
    <div data-testid="card-grid">CardGrid: {JSON.stringify(data)}</div>
))

describe('Home page', () => {
    const fakeData = { results: [{ id: 1, name: 'Spider-Man' }] }

    beforeEach(() => {
        // Configuramos el mock para getMarvelData
        ;(getMarvelData as jest.Mock).mockResolvedValue({ data: fakeData })
    })

    it('renderiza correctamente los componentes y llama a getMarvelData con el parámetro esperado', async () => {
        // Simulamos searchParams con un valor
        const searchParams = Promise.resolve({ nameStartsWith: 'Spider' })

        // Como Home es una función asíncrona, esperamos su resultado.
        const homeElement = await Home({ searchParams })

        // Renderizamos el resultado del server component
        render(homeElement)

        // Verificamos que se renderizan los componentes hijos mockeados
        expect(screen.getByTestId('header')).toBeInTheDocument()
        expect(screen.getByTestId('favorites-title')).toBeInTheDocument()
        expect(screen.getByTestId('search')).toBeInTheDocument()
        expect(screen.getByTestId('card-grid')).toBeInTheDocument()

        // Verificamos que getMarvelData se llamó con los parámetros correctos.
        expect(getMarvelData).toHaveBeenCalledWith('characters', 'Spider')
    })
})
