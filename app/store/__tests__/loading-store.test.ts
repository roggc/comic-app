// loadingStore.test.ts
import { useLoadingStore } from '../loadingStore' // ajusta la ruta

describe('LoadingStore', () => {
    beforeEach(() => {
        // Reinicia el estado de la store antes de cada test
        useLoadingStore.setState({
            isLoaded: false,
        })
    })

    it('debe tener isLoaded en false inicialmente', () => {
        const state = useLoadingStore.getState()
        expect(state.isLoaded).toBe(false)
    })

    it('debe cambiar isLoaded a true al llamar a setIsLoaded', () => {
        const { setIsLoaded } = useLoadingStore.getState()
        setIsLoaded()
        expect(useLoadingStore.getState().isLoaded).toBe(true)
    })

    it('debe cambiar isLoaded a false al llamar a setIsNotLoaded', () => {
        const { setIsLoaded, setIsNotLoaded } = useLoadingStore.getState()
        // Primero lo activamos
        setIsLoaded()
        expect(useLoadingStore.getState().isLoaded).toBe(true)
        // Luego lo desactivamos
        setIsNotLoaded()
        expect(useLoadingStore.getState().isLoaded).toBe(false)
    })
})
