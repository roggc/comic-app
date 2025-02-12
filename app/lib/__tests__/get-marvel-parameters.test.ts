// getMarvelParameters.test.ts
import getMarvelParameters from '../get-marvel-parameters'
import crypto from 'crypto'

describe('getMarvelParameters', () => {
    beforeAll(() => {
        // Usa fake timers para fijar la fecha
        jest.useFakeTimers({ legacyFakeTimers: false })
        // Fijamos la fecha a 2022-01-01T12:00:00Z
        jest.setSystemTime(new Date('2022-01-01T12:00:00Z').getTime())
        // Establece las variables de entorno necesarias para el test
        process.env.MARVEL_PRIVATE_KEY = 'abcd'
        process.env.MARVEL_PUBLIC_KEY = '1234'
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('retorna ts, hash y publicKey correctos', () => {
        // La función calcula ts como:
        // new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime().toString()
        // Con now = new Date('2022-01-01T12:00:00Z') y asumiendo zona horaria UTC,
        // new Date(2022, 0, 1) equivale a 2022-01-01T00:00:00 en UTC.
        // Por ejemplo, new Date(2022, 0, 1).getTime() === 1640995200000.
        const expectedTs = new Date(2022, 0, 1).getTime().toString()
        // Concatenamos expectedTs con las claves conocidas
        const data = expectedTs + 'abcd' + '1234'
        const expectedHash = crypto.createHash('md5').update(data).digest('hex')

        const result = getMarvelParameters()
        expect(result.ts).toBe(expectedTs)
        expect(result.hash).toBe(expectedHash)
        expect(result.publicKey).toBe('1234')
    })
})
