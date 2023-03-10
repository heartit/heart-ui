import Link from "next/link"
import Image from "next/image"

interface contractAddressesInterface {
    [key: string]: string[]
}

export default function Blog() {
    return (
        <div className="flex flex-col items-center space-y-4 pb-10">
            <div className="bg-[#00FFD1] text-[#0F4C75] rounded-md p-5 m-5 w-1/2">
                <div className="bg-[#0000001c] rounded-md p-3">
                    <h1 className="text-2xl text-[#FF1E1E] font-bold">
                        An Intro to the HeartIt
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

                    <div className="pt-5 text-xl font-bold">Overview</div>
                    <p className="pt-2">
                        HeartIt is all about connecting the digital world to the
                        human emotions and consequently benefitting participants
                        financially (if they apply accurate emotions) and
                        morally (by driving other companies to achieve what
                        people feel is good.)
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
                <div className="pt-5 text-xl font-bold">HeartIt Plans</div>
                <p className="pt-2">HeartIt will improve thusly:</p>
                <ul className="list-disc pt-2 list-inside">
                    <li className="font-bold pt-3">Heart.sol Smart Contract</li>
                    <ol className="list-decimal list-inside space-y-1 pl-5 mt-2">
                        <li className="italic">
                            Deeper and more precise emotion-detection tools
                        </li>
                        <p className="pl-5">
                            A more detailed detection will replace the currently
                            basic one, with an even more simple interface, for a
                            higher accuracy and broader range of relative data.
                        </p>
                        <Image
                            src="/emotions-wheel.png"
                            alt="Emotion Wheel"
                            width={300}
                            height={300}
                            className="mx-auto"
                        />
                        <li className="italic">
                            Secure the Heart smart contract
                        </li>
                        <p className="pl-5">
                            Secure the contract against any kind of attack,
                            especially the Sybil attack to prevent bots from
                            populating the database with all possible outcomes.
                            A token may also be announced to punish such actions
                            by making the process inprofitable and punishing if
                            they are not a human.
                        </p>
                        <p className="pl-5">
                            The reputation of a wallet along with analysis of
                            other HeartBeats will add to the security and
                            quality of the outcome concerning various data of
                            interest.
                        </p>
                        <li className="italic pt-2">
                            Emotion detection using wearables and smartphones
                        </li>
                        <p className="pl-5">
                            Smartphones and wearables can be used in various
                            ways to gather even more precise data from the
                            users, provided they agree to do so. There are a few
                            researches that demonstrate how such methods can
                            lead to significant results in detecting and
                            validating emotions.
                        </p>
                        <p className="pl-5">
                            As an example{" "}
                            <a
                                href="https://arxiv.org/abs/1806.08518"
                                className="underline"
                                target="_blank"
                            >
                                Emotion-Recognition Using Smart Watch Sensor
                                Data
                            </a>{" "}
                            is a research based on scraping emotions from
                            smartwatches, focusing on the walking patterns of
                            the wearer.
                        </p>
                        <p className="pl-5">
                            Here is another research article focusing on reading
                            different signals to recognize emotions using smart
                            wearables:{" "}
                            <a
                                href="https://arxiv.org/abs/2207.14640"
                                className="underline"
                                target="_blank"
                            >
                                Emotion Recognition based on Sensor data
                                analysis using LightGBM
                            </a>
                        </p>
                        <Image
                            src="/emotion-sensor.png"
                            alt="Emotion Sensor"
                            width={400}
                            height={400}
                            className="mx-auto"
                        />
                        <li className="italic">
                            Accepting any piece of digital data as input
                        </li>
                        <p className="pl-5">
                            We are starting by just text as input, but HeartIt
                            will be able to accept any digital data including
                            pictures, audio, video, etc. This will eventually
                            lead to HeartIt becoming the emotional source of any
                            digital data.
                        </p>
                    </ol>
                    <li className="font-bold pt-3">
                        Application Smart Contracts
                    </li>
                    <ol className="list-decimal list-inside space-y-1 pl-5 mt-2">
                        <p>
                            In this section the applications of near-future are
                            presented, on which our team is currently focused
                            on. These apps are based on HeartIt and will be
                            open-source, decentralized, and trustless, as the
                            HeartIt core itself. They will also be highly
                            profitable for those who take part in Hearting It,
                            money-wise; it will help HeartIt get a kickstart and
                            move strongly towards an ecosystem where emotions as
                            well as profits are exceptionally valued.
                        </p>
                        <p className="pt-2">
                            It is needless to say that there are a lot of
                            applications for accurate emotion detection results.
                            Use cases include fields such as video gaming,
                            medical diagnosis, education, employee safety,
                            patient care, car safety, autonomous cars, fraud
                            detection, recruiting, connected home, public
                            service, and retails, to name a few.
                        </p>
                        <p className="pt-2">
                            The following are native HeartIt applications on
                            which the team is currently focused.
                        </p>
                        <li className="italic pt-2">Crypto Exchange</li>
                        <p className="pl-5">
                            The smart contract associated with this exchange
                            will use the info (Heartbeats) gathered by the
                            HeartIt contract to predict the market. It will
                            utilize machine learning along with data mining, and
                            when it predicts the market and makes profit, it
                            will autonomously share the profit among the
                            accurate HeartIt participants.
                        </p>
                        <li className="italic pt-2">Marketplace</li>
                        <p className="pl-5">
                            A decentralized marketplace where digital assets
                            (like NFTs) will be valued by HeartIt data, and once
                            their sold, the accurate contributors to the
                            relative data will be rewarded from the profit that
                            asset makes.
                        </p>
                        <li className="italic pt-2">Social Network</li>
                        <p className="pl-5">
                            This will be a social network where the content is
                            valued more than the user. The content will be
                            sorted and valued by the HeartIt database.
                        </p>
                    </ol>
                    <li className="font-bold pt-3">
                        User Experience (UX) and User Interface (UI)
                    </li>
                    <ol className="list-decimal list-inside space-y-1 pl-5 mt-2">
                        <p className="pt-2">
                            The UI will keep its simplicity and neon colors.
                            &#9786; The following are the main focus of what is
                            coming up in UI and UX.
                        </p>
                        <li className="italic pt-2">Targeted Data</li>
                        <p className="pl-5">
                            Based on various applications mentioned above, we
                            will have different categories where certain data
                            (initially words) will be provided for the users to
                            Heart so that they can make more profit later on.
                        </p>
                        <li className="italic pt-2">
                            Responsive to different screen sizes
                        </li>
                        <li className="italic pt-2">
                            More user-friendly emotion selector for even more
                            detailed emotional terms
                        </li>
                        <li className="italic pt-2">Native wallet connector</li>
                        <li className="italic pt-2">
                            More details on searching data from the Heart
                        </li>
                        <li className="italic pt-2">
                            More informative Heart History, Heart search results
                        </li>
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
