// components/NProgressClient.tsx
'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import '@/app/nprogress.css'

export default function NProgressClient() {
    const pathname = usePathname()

    useEffect(() => {
        NProgress.start()
        const timer = setTimeout(() => {
            NProgress.done()
        }, 500)

        return () => {
            clearTimeout(timer)
            NProgress.done()
        }
    }, [pathname])

    return null
}
