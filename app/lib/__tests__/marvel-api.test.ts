// getMarvelData.test.ts
import { getMarvelData } from '../marvel-api'

// Mockear la función getMarvelParameters
jest.mock('../get-marvel-parameters', () => ({
    __esModule: true,
    default: () => ({
        ts: 'testTs',
        hash: 'testHash',
        publicKey: 'testPublicKey',
    }),
}))

describe('getMarvelData', () => {
    beforeEach(() => {
        // Mockear global.fetch
        global.fetch = jest.fn()
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('retorna los datos JSON cuando la respuesta es ok', async () => {
        // Creamos una respuesta simulada
        const fakeResponseData = { some: 'data' }
        ;(global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => fakeResponseData,
        })

        // Llamamos a la función
        const result = await getMarvelData('characters', 'Spider', '12345', 50)

        // Verificamos que se llamó a fetch una vez
        expect(global.fetch).toHaveBeenCalledTimes(1)

        // Verificamos que la URL generada contenga los parámetros esperados.
        // Por ejemplo, la URL debería incluir "ts=testTs", "apikey=testPublicKey" y "hash=testHash".
        const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string
        expect(calledUrl).toContain('ts=testTs')
        expect(calledUrl).toContain('apikey=testPublicKey')
        expect(calledUrl).toContain('hash=testHash')
        expect(calledUrl).toContain('nameStartsWith=Spider')
        expect(calledUrl).toContain('characters=12345')
        expect(calledUrl).toContain('limit=50')

        // Comprobamos que la función retorna el JSON simulado
        expect(result).toEqual(fakeResponseData)
    })

    it('lanza un error cuando la respuesta no es ok', async () => {
        // Simulamos una respuesta no exitosa
        ;(global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
        })

        await expect(getMarvelData('characters')).rejects.toThrow(
            'Error al obtener los datos de la API'
        )
    })
})
