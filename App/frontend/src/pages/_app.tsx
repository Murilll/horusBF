import Header from '@/components/Common/Header/Header'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Analytics />
            <SpeedInsights />
            <Header />
            <Component {...pageProps} />
        </>
    )
}