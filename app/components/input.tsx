'use client'

import SearchIcon from '@/app/components/search-icon'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Input() {
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    useEffect(() => {
        // Configuramos un temporizador de 3000ms (3 segundos)
        const timer = setTimeout(() => {
            // Actualizamos la URL con el parámetro de búsqueda.
            // Si searchTerm está vacío, se elimina el parámetro.
            const newUrl = searchTerm ? `/?nameStartsWith=${searchTerm}` : '/'
            router.push(newUrl)
        }, 500)

        // Limpiamos el temporizador si el usuario sigue escribiendo
        return () => clearTimeout(timer)
    }, [searchTerm, router])

    return (
        <div className="h-[27px] border-b border-black pb-2 flex gap-3">
            <SearchIcon />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SEARCH A CHARACTER..."
                className="w-full bg-transparent focus:outline-none"
            />
        </div>
    )
}
