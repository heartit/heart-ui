import Link from "next/link"
import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="flex justify-between bg-[#FF1E1E] p-5 mb-3 bg-[#FD8A8A]">
            <div className="flex flex-row">
                <Link className="text-2xl font-bold text-white mx-5" href="/">
                    <span className="text-4xl">♥</span>it
                </Link>
                <Link
                    href="/heartearth"
                    className="border border-white font-bold rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-red-800 hover:outline-none focus:outline-none focus:shadow-outline "
                >
                    <div className="text-white flow flow-col">
                        <div>heart</div>
                        <div className="mt-[-13px]">
                            <span className="invisible">h</span>earth
                        </div>
                    </div>
                </Link>
            </div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
