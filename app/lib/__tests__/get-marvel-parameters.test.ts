// getMarvelParameters.test.ts
import getMarvelParameters from '../get-marvel-parameters'
import crypto from 'crypto'

describe('getMarvelParameters', () => {
    // Guarda la implementación original de Date.now
    const originalDateNow = Date.now

    beforeAll(() => {
        // Asignamos valores fijos a las variables de entorno
        process.env.MARVEL_PRIVATE_KEY = 'abcd'
        process.env.MARVEL_PUBLIC_KEY = '1234'
    })

    afterAll(() => {
        // Restauramos Date.now
        Date.now = originalDateNow
    })

    it('retorna ts, hash y publicKey correctos', () => {
        // Fijamos el timestamp
        const fixedTimestamp = 1600000000000
        Date.now = jest.fn(() => fixedTimestamp)

        const result = getMarvelParameters()
        expect(result.ts).toBe(fixedTimestamp.toString())

        // Concatenamos los valores esperados
        const expectedData = fixedTimestamp.toString() + 'abcd' + '1234'
        const expectedHash = crypto
            .createHash('md5')
            .update(expectedData)
            .digest('hex')

        expect(result.hash).toBe(expectedHash)
        expect(result.publicKey).toBe('1234')
    })
})
