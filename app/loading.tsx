'use client'

import { useEffect } from 'react'
import { useLoadingStore } from '@/app/store/loadingStore'

export default function Loading() {
    const { setIsNotLoaded, setIsLoaded } = useLoadingStore()
    useEffect(() => {
        setIsNotLoaded()
        return () => {
            setIsLoaded()
        }
    }, [])

    // Define the Loading UI here
    return <div className="p-4">Loading...</div>
}
