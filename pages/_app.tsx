import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { MoralisProvider } from "react-moralis"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-[#F1F7B5]">
            <MoralisProvider initializeOnMount={false}>
                <Component {...pageProps} />
            </MoralisProvider>
        </div>
    )
}
