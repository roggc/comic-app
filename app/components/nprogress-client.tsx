// components/NProgressClient.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import '@/app/nprogress.css'
import { useLoadingStore } from '@/app/store/loadingStore'

const BIG_DELAY = 7000

export default function NProgressClient() {
    const pathname = usePathname()
    const { isLoaded } = useLoadingStore()

    useEffect(() => {
        if (isLoaded) return
        NProgress.start()
        const timer = setTimeout(() => {
            NProgress.done()
        }, BIG_DELAY)

        return () => {
            clearTimeout(timer)
            NProgress.done()
        }
    }, [pathname, isLoaded])

    return null
}
