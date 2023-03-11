import "../styles/globals.css"
//import type { AppProps } from "next/app"
import { MoralisProvider } from "react-moralis"

export default function App({ Component, pageProps }) {
    return (
        <div className="bg-[#FFFF00]">
            <MoralisProvider initializeOnMount={false}>
                <Component {...pageProps} />
            </MoralisProvider>
        </div>
    )
}
