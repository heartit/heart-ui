import Head from "next/head"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import Header from "../components/Header"
import Blog from "../components/Blog"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <>
            <Head>
                <title className="text-3xl font-bold underline">HeartIt</title>
                <meta name="description" content="Heart It!" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Blog />
        </>
    )
}
