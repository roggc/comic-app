import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Roboto_Condensed } from 'next/font/google'
import './globals.css'
import NProgressClient from './components/nprogress-client'
import Header from '@/app/components/header'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

const robotoCondensed = Roboto_Condensed({
    variable: '--font-roboto-condensed',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Super Marvel comics app',
    description: 'All the Marvel comics you could ever want',
}

export const viewport: Viewport = {
    width: 'device-width, initial-scale=1.0',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${robotoCondensed.variable} ${geistSans.variable} ${geistMono.variable}  antialiased bg-white text-black`}
            >
                <Header />
                {children}
                <NProgressClient />
            </body>
        </html>
    )
}
