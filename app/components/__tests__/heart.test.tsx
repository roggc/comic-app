// __tests__/Heart.test.tsx
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Heart from '@/app/components/heart'
import { useFavoritesStore } from '@/app/store/favoritesStore'

// Mock de next/image para renderizar una etiqueta <img>
jest.mock('next/image', () => (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
})

describe('Heart component', () => {
    const testId = 123 // ID de ejemplo

    beforeEach(() => {
        // Reinicia el estado de la store antes de cada test.
        useFavoritesStore.setState({
            favoriteIds: new Set<number>(),
        })
    })

    it('se renderiza con el ícono vacío cuando no está favorito', () => {
        render(<Heart id={testId} />)
        const img = screen.getByAltText('Weather it is favourite or not')
        expect(img).toHaveAttribute('src', '/heart-empty.png')
    })

    it('cambia a favorito al hacer clic, y vuelve al estado no favorito al hacer clic de nuevo', async () => {
        render(<Heart id={testId} />)
        const img = screen.getByAltText('Weather it is favourite or not')

        // Inicialmente, el ícono debe ser el de corazón vacío
        expect(img).toHaveAttribute('src', '/heart-empty.png')

        // Simula el clic para agregar a favoritos.
        fireEvent.click(img)

        // Espera a que se actualice el estado en la store
        await waitFor(() => {
            expect(useFavoritesStore.getState().favoriteIds.has(testId)).toBe(
                true
            )
        })

        // Luego, el componente debe re-renderizarse mostrando el ícono de corazón lleno.
        const updatedImg = screen.getByAltText('Weather it is favourite or not')
        expect(updatedImg).toHaveAttribute('src', '/heart-full.png')

        // Simula un segundo clic para quitar de favoritos.
        fireEvent.click(updatedImg)

        // Espera a que el estado se actualice nuevamente.
        await waitFor(() => {
            expect(useFavoritesStore.getState().favoriteIds.has(testId)).toBe(
                false
            )
        })

        const finalImg = screen.getByAltText('Weather it is favourite or not')
        expect(finalImg).toHaveAttribute('src', '/heart-empty.png')
    })
})
