import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Roboto_Condensed } from 'next/font/google'
import './globals.css'
import NProgressClient from './components/nprogress-client'

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
    title: 'Create Next App',
    description: 'Generated by create next app',
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
                className={`${robotoCondensed.variable} ${geistSans.variable} ${geistMono.variable}  antialiased`}
            >
                {children}
                <NProgressClient />
            </body>
        </html>
    )
}
