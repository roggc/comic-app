import getMarvelParameters from './get-marvel-parameters'

const marvelBaseUrl = 'http://gateway.marvel.com/v1/public'

// lib/api.ts
export async function getMarvelData(type: string) {
    const { ts, hash, publicKey } = getMarvelParameters()
    // La opción "next: { revalidate: 60 }" permite que Next.js almacene en caché la respuesta durante 60 segundos.
    const res = await fetch(
        `${marvelBaseUrl}/${type}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=50`,
        {
            next: { revalidate: 24 * 60 * 60 },
        }
    )

    if (!res.ok) {
        throw new Error('Error al obtener los datos de la API')
    }

    return res.json()
}
