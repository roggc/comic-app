import crypto from 'crypto'

const getMarvelParameters = () => {
    // Genera un timestamp (por ejemplo, usando el número de milisegundos actuales)
    const ts = Date.now().toString()

    // Define tus claves (se recomienda que las almacenes en variables de entorno)
    const privateKey = process.env.MARVEL_PRIVATE_KEY // e.g., "abcd"
    const publicKey = process.env.MARVEL_PUBLIC_KEY // e.g., "1234"

    // Concatena los valores según lo requerido por la API
    const data = ts + privateKey + publicKey

    // Calcula el hash md5 en formato hexadecimal
    const hash = crypto.createHash('md5').update(data).digest('hex')

    return { ts, hash, publicKey }
}

export default getMarvelParameters
