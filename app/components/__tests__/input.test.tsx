import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Input from '@/app/components/input'
import { useRouter } from 'next/navigation'

// Mock de useRouter para poder espiar la función push
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

describe('Input component', () => {
    let pushMock: jest.Mock

    beforeEach(() => {
        pushMock = jest.fn()
        ;(useRouter as jest.Mock).mockReturnValue({ push: pushMock })
        jest.useFakeTimers() // Activa los fake timers para controlar el setTimeout
    })

    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
        jest.resetAllMocks()
    })

    it('llama a router.push con el parámetro de búsqueda cuando se introduce texto y se espera el retraso', () => {
        render(<Input />)
        const input = screen.getByPlaceholderText('SEARCH A CHARACTER...')

        // Simulamos que el usuario escribe "Spider"
        fireEvent.change(input, { target: { value: 'Spider' } })

        // Avanzamos el temporizador en 500ms (el delay configurado)
        act(() => {
            jest.advanceTimersByTime(500)
        })

        // Verificamos que se llamó a router.push con la URL correspondiente
        expect(pushMock).toHaveBeenCalledWith('/?nameStartsWith=Spider')
    })

    it('llama a router.push con "/" cuando el input está vacío', () => {
        render(<Input />)
        const input = screen.getByPlaceholderText('SEARCH A CHARACTER...')

        // Simulamos que el usuario escribe algo y luego lo borra
        fireEvent.change(input, { target: { value: 'Spider' } })
        fireEvent.change(input, { target: { value: '' } })

        act(() => {
            jest.advanceTimersByTime(500)
        })

        // Se debe llamar a "/" al no haber texto
        expect(pushMock).toHaveBeenCalledWith('/')
    })

    it('reinicia el temporizador si el usuario sigue escribiendo antes del delay', () => {
        render(<Input />)
        const input = screen.getByPlaceholderText('SEARCH A CHARACTER...')

        // Simulamos que el usuario escribe "S" y avanza menos de 500ms
        fireEvent.change(input, { target: { value: 'S' } })
        act(() => {
            jest.advanceTimersByTime(300)
        })
        // El temporizador aún no se ha disparado, así que push no debe haberse llamado
        expect(pushMock).not.toHaveBeenCalled()

        // El usuario sigue escribiendo "Spi"
        fireEvent.change(input, { target: { value: 'Spi' } })
        act(() => {
            jest.advanceTimersByTime(500)
        })
        // Ahora debería haberse llamado a router.push con el valor actualizado
        expect(pushMock).toHaveBeenCalledWith('/?nameStartsWith=Spi')
    })
})
