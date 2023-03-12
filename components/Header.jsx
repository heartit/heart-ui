import Link from "next/link"
import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="flex flex-wrap justify-center md:justify-between bg-[#FF1E1E] p-5 mb-5 md:mb-3 bg-[#FD8A8A]">
            <div className="flex flex-col md:flex-row mb-5 md:mb-auto">
                <div className="group relative flex justify-center mb-5 md:mb-auto">
                    <Link
                        className="text-2xl font-bold text-white mx-5"
                        href="/"
                    >
                        <span className="text-4xl">♥</span>it
                    </Link>
                    <div className="absolute transition inline-block px-3 py-2 text-sm font-medium text-white bg-[#3EC70B] rounded-lg shadow-sm top-14 tooltip scale-0 group-hover:scale-100">
                        HeartIt!
                    </div>
                </div>
                <div className="flex flex-row ">
                    <div className="group relative flex justify-center">
                        <Link
                            href="/heartearth"
                            className="border border-white font-bold rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-red-800 hover:outline-none focus:outline-none focus:shadow-outline "
                        >
                            <div className="text-white flow flow-col text-sm">
                                <div>HEART</div>
                                <div className="mt-[-9px]">
                                    <span className="invisible">H</span>EARTH
                                </div>
                            </div>
                        </Link>
                        <div className="w-[120px] absolute transition inline-block px-3 py-2 text-sm font-medium text-white bg-[#3EC70B] rounded-lg shadow-sm top-14 tooltip scale-0 group-hover:scale-100">
                            A showcase of HeartIt application
                        </div>
                    </div>
                    <div className="group relative flex justify-center mx-5">
                        <Link
                            href="/blog"
                            className="flex place-items-center text-sm text-white border border-white font-bold rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-red-800 hover:outline-none focus:outline-none focus:shadow-outline"
                        >
                            BLOG
                        </Link>
                        <div className="w-[120px] absolute transition inline-block px-3 py-2 text-sm font-medium text-white bg-[#3EC70B] rounded-lg shadow-sm top-14 tooltip scale-0 group-hover:scale-100">
                            Where the Heart is, and will be
                        </div>
                    </div>
                </div>
            </div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
