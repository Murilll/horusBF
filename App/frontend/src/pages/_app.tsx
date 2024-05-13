import Header from '@/components/Common/Header/Header'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Analytics />
            <SpeedInsights />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Header />
                <Component {...pageProps} />
            </LocalizationProvider>
        </>
    )
}