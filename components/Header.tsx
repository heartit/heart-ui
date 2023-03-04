import Link from "next/link"
import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="flex justify-between bg-red-700 p-5 mb-3 bg-[#FD8A8A]">
            <div className="flex flex-row">
                <Link
                    className="text-2xl font-bold text-[#C21010] mx-5"
                    href="/"
                >
                    ❤️it
                </Link>
                <Link
                    href="/heartearth"
                    className="border border-[#C21010] font-bold rounded-md px-4 py-2  transition duration-500 ease select-none hover:bg-red-800 hover:outline-none focus:outline-none focus:shadow-outline "
                >
                    <span className="text-[#1A2902]">H</span>
                    <span className="text-[#344C11]">E</span>
                    <span className="text-[#778D45]">A</span>
                    <span className="text-[#AEC09A]">R</span>
                    <span className="text-[#AEC670]">T</span>
                    <span className="text-[#344C11]">E</span>
                    <span className="text-[#778D45]">A</span>
                    <span className="text-[#AEC09A]">R</span>
                    <span className="text-[#AEC670]">T</span>
                    <span className="text-[#1A2902]">H</span>
                </Link>
            </div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
