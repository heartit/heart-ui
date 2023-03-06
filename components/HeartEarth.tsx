import { useWeb3Contract, useMoralis } from "react-moralis"
import {
    contractAddresses,
    abi,
    earthAbi,
    earthContractAddresses,
} from "../constants"
import { useNotification } from "web3uikit"
import { BigNumber, ethers, ContractTransaction } from "ethers"
import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "../styles/Home.module.css"

interface contractAddressesInterface {
    [key: string]: string[]
}

export default function HeartEarth() {
    const rewardeeBeats = []

    const addresses: contractAddressesInterface = earthContractAddresses
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const heartEarthAddress =
        chainId in addresses ? addresses[chainId][0] : null

    const heartAddresses: contractAddressesInterface = contractAddresses
    const heartAddress =
        chainId in heartAddresses ? heartAddresses[chainId][0] : null

    const [treeLeaveItStatus, setTreeLeaveItStatus] = useState(false)
    const [fuelLeaveItStatus, setFuelLeaveItStatus] = useState(false)
    const [getBeatsData, setGetBeatsData] = useState("")
    const [treeAvgRhythm, setTreeAvgRhythm] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
    const [fuelAvgRhythm, setFuelAvgRhythm] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
    const [displayResults, setDisplayResults] = useState(false)
    const [leaveItDisplayResults, setLeaveItDisplayResults] = useState(false)
    const [weatherCondition, setWeatherCondition] = useState("normal")
    const [rewardeeAmntInput, setRewardeeAmntInput] = useState("0")

    const { runContractFunction: treeLeaveIt } = useWeb3Contract({
        abi: earthAbi,
        contractAddress: heartEarthAddress!,
        functionName: "leaveIt",
        params: { _data: "tree" },
    })

    const { runContractFunction: fuelLeaveIt } = useWeb3Contract({
        abi: earthAbi,
        contractAddress: heartEarthAddress!,
        functionName: "leaveIt",
        params: { _data: "fuel" },
    })

    const { runContractFunction: getTreeBeats } = useWeb3Contract({
        abi: abi,
        contractAddress: heartAddress!,
        functionName: "getBeats",
        params: { _data: "tree" },
    })

    const { runContractFunction: getFuelBeats } = useWeb3Contract({
        abi: abi,
        contractAddress: heartAddress!,
        functionName: "getBeats",
        params: { _data: "fuel" },
    })

    const { runContractFunction: reward } = useWeb3Contract({
        abi: abi,
        contractAddress: heartAddress!,
        functionName: "reward",
        params: { _beats: rewardeeBeats },
        msgValue: ethers.utils.parseUnits(rewardeeAmntInput),
    })

    async function getBeatsFromData(_data) {
        const treeBeats = await getTreeBeats()
        const fuelBeats = await getFuelBeats()

        let rhythm = [0, 0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < treeBeats.length; i++) {
            let iter = 0
            const initIndex = 8 - treeBeats[i].rhythm.toString().length
            for (let j = initIndex; j < rhythm.length; j++) {
                rhythm[j] += parseInt(treeBeats[i].rhythm.toString()[iter++])
            }
            if (treeBeats[i].rhythm.toString() == "90000000")
                rewardeeBeats.push({
                    data: treeBeats[i].data,
                    addr: treeBeats[i].addr,
                    rhythm: treeBeats[i].rhythm.toString(),
                    goalRhythm: "90000000",
                })
        }

        /*[
        {
            data: "tree",
            addr: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
            rhythm: 90000000,
            goalRhythm: 90000000,
        },
        ]*/
        const treeAvg = []
        for (let k = 0; k < rhythm.length; k++) {
            treeAvg.push(rhythm[k] / treeBeats.length)
        }

        let fuelRhythm = [0, 0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < fuelBeats.length; i++) {
            let iter = 0
            const initIndex = 8 - fuelBeats[i].rhythm.toString().length
            for (let j = initIndex; j < fuelRhythm.length; j++) {
                fuelRhythm[j] += parseInt(
                    fuelBeats[i].rhythm.toString()[iter++]
                )
            }
            console.log(fuelBeats[i].rhythm.toString(), "9000000")
            if (fuelBeats[i].rhythm.toString() == "9000000")
                rewardeeBeats.push({
                    data: fuelBeats[i].data,
                    addr: fuelBeats[i].addr,
                    rhythm: fuelBeats[i].rhythm.toString(),
                    goalRhythm: "9000000",
                })
        }
        console.log("rewardee beats", rewardeeBeats)

        const fuelAvg = []
        for (let k = 0; k < fuelRhythm.length; k++) {
            fuelAvg.push(fuelRhythm[k] / fuelBeats.length)
        }

        treeAvg.push(treeBeats.length)
        fuelAvg.push(fuelBeats.length)
        setTreeAvgRhythm(treeAvg)
        setFuelAvgRhythm(fuelAvg)
        setDisplayResults(true)
    }

    async function callLeaveIt() {
        const treeLeaveItCalled = await treeLeaveIt()
        const fuelLeaveItCalled = await fuelLeaveIt()
        setTreeLeaveItStatus(treeLeaveItCalled)
        setFuelLeaveItStatus(fuelLeaveItCalled)
        if (treeLeaveItCalled && fuelLeaveItCalled)
            setWeatherCondition("normal")
        else if (treeLeaveItCalled) setWeatherCondition("clear")
        else if (fuelLeaveItCalled) setWeatherCondition("polluted")
        setLeaveItDisplayResults(true)
    }

    async function updateUI() {
        console.log("[W8] Updating UI...")
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div className="grid grid-cols-2 items-center justify-evenly text-gray-700">
            <div className="flex flex-col bg-[#31C6D4] rounded-md p-5 m-5 place-items-center space-y-3">
                <div className="text-xl font-bold text-white self-start">
                    HeartEarth
                </div>
                <div className="flex flex-col place-items-center bg-[#00FFD1] rounded-md w-[75%] p-7 space-y-2 ">
                    <p className="self-start">
                        1. Check to see whether "tree" and "fuel" are{" "}
                        <b>Good</b> or <b>Bad</b>:
                    </p>
                    <button
                        className=" bg-[#FF1E1E] text-white font-bold rounded-md w-fit px-4 py-2 m-2  transition duration-500 ease select-none hover:bg-red-800 hover:outline-none focus:outline-none focus:shadow-outline "
                        onClick={async () => {
                            await getBeatsFromData()
                        }}
                    >
                        Get Tree and Fuel from Heart
                    </button>
                    {displayResults && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 p-7 mt-2 bg-[#13E3BE] rounded-md">
                                <div>
                                    <div className="font-semibold">Tree</div>
                                    Number of Entries: {treeAvgRhythm[8]}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        Good: {treeAvgRhythm[0].toFixed(2)}
                                    </div>
                                    <div>
                                        Bad: {treeAvgRhythm[1].toFixed(2)}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2 p-7 mt-2 bg-[#13E3BE] rounded-md">
                                <div>
                                    <div className="font-semibold">Fuel</div>
                                    Number of Entries: {fuelAvgRhythm[8]}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        Good: {fuelAvgRhythm[0].toFixed(2)}
                                    </div>
                                    <div>
                                        Bad: {fuelAvgRhythm[1].toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col place-items-center bg-[#00FFD1] rounded-md w-[75%] p-7 space-y-2 ">
                    <p>
                        2. Get the <b>leaveIt</b> result for "tree" and "fuel"
                        from the HeartEarth contract and apply the result to the
                        emojis (real-world sample):
                    </p>
                    <button
                        className="bg-[#FF1E1E] text-white font-bold rounded-md px-4 py-2 m-2 mx-40 transition duration-500 ease select-none hover:bg-red-800 hover:outline-none focus:outline-none focus:shadow-outline col-span-2"
                        onClick={async () => await callLeaveIt()}
                    >
                        Get HeartEarth Result and Apply
                    </button>
                    {leaveItDisplayResults && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 p-7 mt-2 bg-[#13E3BE] rounded-md">
                                <div>
                                    <div className="font-semibold">Tree</div>
                                </div>
                                <div>{treeLeaveItStatus.toString()}</div>
                            </div>
                            <div className="space-y-2 p-7 mt-2 bg-[#13E3BE] rounded-md">
                                <div>
                                    <div className="font-semibold">Fuel</div>
                                </div>
                                <div>{fuelLeaveItStatus.toString()}</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col place-items-center bg-[#00FFD1] rounded-md w-[75%] p-7 space-y-2 ">
                    <p>
                        3. Assuming the logic of the HeartEarth is to clear the
                        air, reward the contributors who had participated
                        positively in Heart contract, hearting "tree" as{" "}
                        <b>Good</b> or "fuel" as <b>Bad</b>:
                    </p>

                    <input
                        type="text"
                        id="rewardee-amnt-input"
                        className="bg-[#0F3460] text-cyan-200 w-[60%] text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  col-span-2 "
                        placeholder="How much ETH to pay the rewardees?"
                        required
                        onChange={(e) => {
                            if (!isNaN(e.target.value))
                                setRewardeeAmntInput(e.target.value)
                        }}
                    />
                    <button
                        className="bg-[#FF1E1E] text-white font-bold rounded-md px-4 py-2 m-2 mx-40 transition duration-500 ease select-none hover:bg-red-800 hover:outline-none focus:outline-none focus:shadow-outline col-span-2"
                        onClick={async () => await reward()}
                    >
                        Reward Effective Hearters
                    </button>
                </div>
            </div>
            <div className="bg-[#B4E4FF] rounded-md p-5 m-5">
                <div className="text-xl">HeartEarth</div>
                <div className="font-bold">
                    A Sample Usage of HeartIt Showcase
                </div>
                {weatherCondition == "normal" && (
                    <div className="flex flex-col place-items-center bg-gray-500 rounded-md p-5 m-5 text-5xl">
                        <div>🌫️🌫️🌫️🌫️🌫️🌫️🌥🌫️🌫️</div>
                        <div>🌫️🌫️🌫️🌫️🌫️🌫️🌫️🌫️🌫️</div>
                        <div>🌫️🌫️🌫️🌫️🌫️🌫️🌫️🌫️🌫️</div>
                        <div>🌳🌲🏭🌳🏭🌴🏭🌳🌲</div>
                    </div>
                )}
                {weatherCondition == "clear" && (
                    <div className="flex flex-col place-items-center bg-blue-400 rounded-md p-5 m-5 text-5xl">
                        <div>
                            ☁️<span className="invisible">🌫️🌫️🌫️🌫️</span>☁️🌞
                            <span className="invisible">🌫️</span>☁️
                        </div>
                        <div>
                            <span className="invisible">🌫️🌫️</span>☁️
                            <span className="invisible">🌫️🌫️🌫️🌫️</span>☁️
                            <span className="invisible">🌫️</span>
                        </div>
                        <div>
                            🌈<span className="invisible">🌫️🌫️🌫️</span>☁️
                            <span className="invisible">🌫️🌫️🌫️🌫️</span>
                        </div>
                        <div>
                            🌳🌲<span className="invisible">🏭</span>🌳
                            <span className="invisible">🏭</span>🌴
                            <span className="invisible">🏭</span>🌳🌲
                        </div>
                    </div>
                )}
                {weatherCondition == "polluted" && (
                    <div className="flex flex-col place-items-center bg-gray-700 rounded-md p-5 m-5 text-5xl">
                        <div>🌫️🌫️🌫️🌫️🌫️🌫️🌫️🌫️🌫️</div>
                        <div>🌫️🌫️🌫️🌫️🌫️🌫️🌫️🌫️🌫️</div>
                        <div>🌫️🌫️🌫️🌫️🌫️🌫️🌫️🌫️🌫️</div>
                        <div>🌫️🌫️🏭🌫️🏭🌫️🏭🌫️🌫️</div>
                    </div>
                )}

                <p>
                    HeartEarth smart contract is a simple example to showcase
                    how the HeartIt smart contract can be utilized to move any
                    subject towards a good and harmonious version of itself,
                    based on how people from all over the world have expressed
                    their feelings regarding various pieces of related
                    information.
                </p>
                <p>
                    In this example, the HeartEarth project will get Heartbeats
                    about the words "tree" and "fuel" from the HeartIt and will
                    check the rhythms on each:
                </p>
                <p>
                    1. If they are mostly "Good" with rhythm 90000000, the
                    HeartEarth agent will leave them be by the "leaveIt"
                    function programmed inside the contract.
                </p>
                <p>
                    2. If they are mostly "Bad" with rhythm 9000000, the
                    HeartEarth agent will remove them, since it will get a
                    "false" response from the "leaveIt" function.
                </p>
            </div>
        </div>
    )
}
