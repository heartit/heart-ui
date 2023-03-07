import Link from "next/link"

interface contractAddressesInterface {
    [key: string]: string[]
}

export default function Blog() {
    return (
        <div className="flex flex-col items-center space-y-4 pb-10">
            <div className="bg-[#00FFD1] text-[#0F4C75] rounded-md p-5 m-5 w-1/2">
                <div className="bg-[#0000001c] rounded-md p-3">
                    <h1 className="text-2xl text-[#FF1E1E] font-bold">
                        An Intro to the Heart
                    </h1>
                    <h2 className="text-sm text-[#FF1E1E] font-bold">
                        March 7, 2023
                    </h2>
                </div>
                <div>
                    <p className="pt-2">
                        The digital world has too much of a brain, but not
                        enough of a heart.
                    </p>

                    <p className="pt-5 text-xl font-bold">The HeartIt Goal</p>
                    <p className="pt-2">
                        The goal is to have the humans of all over the planet
                        express how they feel about a word, sentence, picture,
                        or essentially any digital data by{" "}
                        <Link href="/" className="underline">
                            Hearting It
                        </Link>
                        . These pieces of info (HeartBeats as we call them) get
                        stored anonymously on the Ethereum blockchain through
                        our open-source smart contract, making HeartIt the
                        informant of how we humans have been feeling about a
                        specific subject at any given time.
                    </p>

                    <p className="pt-5 text-xl font-bold">Applications</p>
                    <p className="pt-2">
                        HeartIt can be beneficial in two ways for those who
                        participate by hearting it:
                    </p>
                    <ul className="list-disc list-inside pt-2">
                        <li>
                            Third-party companies can grab our database, which
                            is accessible on the Ethereum blockchain, and align
                            their plans accordding to their users' feelings.
                            They can also reward the helpful and accurate
                            participants by using the "reward" function inside
                            the HeartIt contract.
                        </li>
                        <li>
                            HeartIt is also planning to introduce native
                            applications that let users who heart data gain
                            income based on how accurate and useful their
                            contributions are. To showcase this endeavor take a
                            look at{" "}
                            <Link href="/heartearth" className="underline">
                                HeartEarth
                            </Link>
                            .
                        </li>
                    </ul>

                    <p className="pt-5 text-xl font-bold">Current HeartIt</p>
                    <p className="pt-2">
                        HeartIt currently consists of a smart contract which
                        takes a text input and six basic feelings the user has
                        regarding that input; it then combines and stores these
                        information as a "HeartBeat". These beats can be
                        retrieved all at once, or as a targeted search. All
                        these functionalities are provided at the{" "}
                        <Link href="/" className="underline">
                            HeartIt Homepage
                        </Link>
                        .
                    </p>
                    <p className="pt-2">
                        As a showcase we have also provided the{" "}
                        <Link href="/heartearth" className="underline">
                            HeartEarth
                        </Link>{" "}
                        page where a simple HeartIt application is presented.
                    </p>
                    <p className="pt-2">
                        The HeartEarth is a smart contract that gets the
                        Heartbeats concerning the words "tree" and "fuel" from
                        the HeartIt, and decides whether to remove the trees or
                        the fuel from an emoji-based frame. Assuming the goal of
                        the HeartEarth is to reach a clear weather, it will
                        reward those who have hearted the word "tree" as Good
                        (9/9) or the word "fuel" as Bad (9/9).
                    </p>
                </div>
                <div className="pt-5 text-xl font-bold">Future HeartIt</div>
                <p className="pt-2">HeartIt will improve thusly:</p>
                <ul className="list-disc pt-2 list-inside">
                    <li className="font-bold pt-3">Heart.sol Smart Contract</li>
                    <ol className="list-decimal list-inside space-y-1 pl-5 mt-2">
                        <li></li>
                        <li></li>
                    </ol>
                    <li className="font-bold pt-3">
                        Application Smart Contracts
                    </li>
                    <ol className="list-decimal list-inside space-y-1 pl-5 mt-2">
                        <li></li>
                    </ol>
                    <li className="font-bold pt-3">User Interface (UI)</li>
                    <ol className="list-decimal list-inside space-y-1 pl-5 mt-2">
                        <li></li>
                    </ol>
                </ul>
            </div>
            <div className="bg-[#00FFD1] text-[#0F4C75] rounded-md p-5 m-5 w-1/2">
                <div className="bg-[#0000001c] rounded-md p-3">
                    <h1 className="text-2xl text-[#FF1E1E] font-bold">
                        Tao Te Ching
                    </h1>
                    <h2 className="text-sm text-[#FF1E1E] font-bold">
                        Chapter 8
                    </h2>
                </div>
                <div className="italic">
                    <p className="pt-2">
                        The best quality/character is like water.
                    </p>
                    <p className="pt-2">
                        The water's goodness is that it benefits the myriad
                        things but does not quarrel,
                        <br />
                        and it willingly goes to where others hate,
                        <br />
                        thus it is almost like the Dao.
                    </p>
                    <p className="pt-2">
                        It is good to be/live on the ground,
                        <br />
                        <span className="text-[#FF2828] font-semibold">
                            to deepen a heart,
                        </span>
                        <br />
                        to love people while associating with them,
                        <br />
                        to keep one's word while talking,
                        <br />
                        to be peace while governing,
                        <br /> to do what one is capable of, <br />
                        to act at a fit time.
                    </p>
                    <p className="pt-2">
                        Because of the non-fighting-over,
                        <br />
                        there will be no blame.
                    </p>
                </div>
                <div className="pt-5 text-sm">
                    Source:{" "}
                    <a
                        className="underline"
                        href="https://en.wikisource.org/wiki/Translation:Tao_Te_Ching#Chapter_8_(%E7%AC%AC%E5%85%AB%E7%AB%A0)"
                        target="_blank"
                    >
                        WikiSource
                    </a>
                </div>
            </div>
        </div>
    )
}
