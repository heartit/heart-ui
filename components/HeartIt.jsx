import { useWeb3Contract, useMoralis } from "react-moralis"
import { contractAddresses, abi } from "../constants"
import { useNotification } from "web3uikit"
import { BigNumber, ethers, ContractTransaction } from "ethers"
import { useEffect, useState } from "react"

/*interface contractAddressesInterface {
    [key: string]: string[]
}*/

export default function HeartIt() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const heartAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [beats, setBeats] = useState([])
    const [allBeats, setAllBeats] = useState([])
    const [dataInput, setDataInput] = useState("")
    const [rhythmInput, setRhythmInput] = useState("00000000")
    const [getBeatsData, setGetBeatsData] = useState("")
    const [avgRhythm, setAvgRhythm] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [displayResults, setDisplayResults] = useState(false)

    const { runContractFunction: addBeat } = useWeb3Contract({
        abi: abi,
        contractAddress: heartAddress,
        functionName: "addBeat",
        params: { _data: dataInput, _rhythm: parseInt(rhythmInput) },
    })

    const { runContractFunction: getBeats } = useWeb3Contract({
        abi: abi,
        contractAddress: heartAddress,
        functionName: "getBeats",
        params: { _data: getBeatsData },
    })

    const { runContractFunction: getAllBeats } = useWeb3Contract({
        abi: abi,
        contractAddress: heartAddress,
        functionName: "getAllBeats",
        params: {},
    })

    async function updateUI() {
        console.log("[W8] Updating UI...")
        const allBeatsCalled = await getAllBeats()
        setAllBeats(allBeatsCalled)
    }

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        console.log("TX", tx)
        updateUI()
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    async function getBeatsFromData() {
        const beats = await getBeats()
        let rhythm = [0, 0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < beats.length; i++) {
            let iter = 0
            const initIndex = 8 - beats[i].rhythm.toString().length
            for (let j = initIndex; j < rhythm.length; j++) {
                rhythm[j] += parseInt(beats[i].rhythm.toString()[iter++])
            }
        }
        const avg = []
        for (let k = 0; k < rhythm.length; k++) {
            avg.push(rhythm[k] / beats.length)
        }
        avg.push(beats.length)
        setAvgRhythm(avg)
        setDisplayResults(true)
    }

    String.prototype.replaceAt = function (index, replacement) {
        return (
            this.substring(0, index) +
            replacement +
            this.substring(index + replacement.length)
        )
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-evenly text-gray-700">
            {heartAddress ? (
                <div className="bg-[#31C6D4] flex flex-col items-center md:grid md:grid-cols-2 gap-4 rounded-md p-3 mb-10 w-5/6 md:w-auto md:p-5 mb-10 w-5/6 md:w-auto md:m-5">
                    <div className="col-span-2 text-xl font-bold text-white">
                        Heart It
                    </div>
                    <input
                        type="text"
                        id="data-input"
                        className="bg-[#0F3460] text-cyan-200 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  col-span-2 "
                        placeholder="What do you want to Heart? Example: Tree"
                        required
                        onChange={(e) => setDataInput(e.target.value)}
                    />
                    <div className="flex flex-col space-y-2 p-7 w-80 bg-[#00FFD1] rounded-md">
                        <div className="self-center font-semibold">Good</div>
                        <input
                            id="good-input"
                            type="range"
                            className="w-full"
                            min="0"
                            max="9"
                            step="1"
                            defaultValue="0"
                            onChange={(e) => {
                                setRhythmInput(
                                    rhythmInput.replaceAt(0, e.target.value)
                                )
                            }}
                        />
                        <ul className="flex justify-between w-full px-[10px]">
                            <li className="flex justify-center relative">
                                <span className="absolute">0</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">1</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">2</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">3</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">4</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">5</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">6</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">7</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">8</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">9</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-2 p-7 w-80 bg-[#00FFD1] rounded-md">
                        <div className="self-center font-semibold">Bad</div>
                        <input
                            id="bad-input"
                            type="range"
                            className="w-full"
                            min="0"
                            max="9"
                            step="1"
                            defaultValue="0"
                            onChange={(e) => {
                                setRhythmInput(
                                    rhythmInput.replaceAt(1, e.target.value)
                                )
                            }}
                        />
                        <ul className="flex justify-between w-full px-[10px]">
                            <li className="flex justify-center relative">
                                <span className="absolute">0</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">1</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">2</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">3</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">4</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">5</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">6</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">7</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">8</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">9</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-2 p-7 w-80 bg-[#00FFD1] rounded-md">
                        <div className="self-center font-semibold">Happy</div>
                        <input
                            id="happy-input"
                            type="range"
                            className="w-full"
                            min="0"
                            max="9"
                            step="1"
                            defaultValue="0"
                            onChange={(e) => {
                                setRhythmInput(
                                    rhythmInput.replaceAt(2, e.target.value)
                                )
                            }}
                        />
                        <ul className="flex justify-between w-full px-[10px]">
                            <li className="flex justify-center relative">
                                <span className="absolute">0</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">1</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">2</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">3</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">4</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">5</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">6</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">7</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">8</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">9</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-2 p-7 w-80 bg-[#00FFD1] rounded-md">
                        <div className="self-center font-semibold">Sad</div>
                        <input
                            id="sad-input"
                            type="range"
                            className="w-full"
                            min="0"
                            max="9"
                            step="1"
                            defaultValue="0"
                            onChange={(e) => {
                                setRhythmInput(
                                    rhythmInput.replaceAt(3, e.target.value)
                                )
                            }}
                        />
                        <ul className="flex justify-between w-full px-[10px]">
                            <li className="flex justify-center relative">
                                <span className="absolute">0</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">1</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">2</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">3</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">4</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">5</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">6</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">7</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">8</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">9</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-2 p-7 w-80 bg-[#00FFD1] rounded-md">
                        <div className="self-center font-semibold">
                            Surprise
                        </div>
                        <input
                            id="surprise-input"
                            type="range"
                            className="w-full"
                            min="0"
                            max="9"
                            step="1"
                            defaultValue="0"
                            onChange={(e) => {
                                setRhythmInput(
                                    rhythmInput.replaceAt(4, e.target.value)
                                )
                            }}
                        />
                        <ul className="flex justify-between w-full px-[10px]">
                            <li className="flex justify-center relative">
                                <span className="absolute">0</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">1</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">2</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">3</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">4</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">5</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">6</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">7</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">8</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">9</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-2 p-7 w-80 bg-[#00FFD1] rounded-md">
                        <div className="self-center font-semibold">Fear</div>
                        <input
                            id="fear-input"
                            type="range"
                            className="w-full"
                            min="0"
                            max="9"
                            step="1"
                            defaultValue="0"
                            onChange={(e) => {
                                setRhythmInput(
                                    rhythmInput.replaceAt(5, e.target.value)
                                )
                            }}
                        />
                        <ul className="flex justify-between w-full px-[10px]">
                            <li className="flex justify-center relative">
                                <span className="absolute">0</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">1</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">2</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">3</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">4</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">5</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">6</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">7</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">8</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">9</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-2 p-7 w-80 bg-[#00FFD1] rounded-md">
                        <div className="self-center font-semibold">Anger</div>
                        <input
                            id="anger-input"
                            type="range"
                            className="w-full"
                            min="0"
                            max="9"
                            step="1"
                            defaultValue="0"
                            onChange={(e) => {
                                setRhythmInput(
                                    rhythmInput.replaceAt(6, e.target.value)
                                )
                            }}
                        />
                        <ul className="flex justify-between w-full px-[10px]">
                            <li className="flex justify-center relative">
                                <span className="absolute">0</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">1</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">2</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">3</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">4</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">5</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">6</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">7</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">8</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">9</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-2 p-7 w-80 bg-[#00FFD1] rounded-md">
                        <div className="self-center font-semibold">Disgust</div>
                        <input
                            id="disgust-input"
                            type="range"
                            className="w-full"
                            min="0"
                            max="9"
                            step="1"
                            defaultValue="0"
                            onChange={(e) => {
                                setRhythmInput(
                                    rhythmInput.replaceAt(7, e.target.value)
                                )
                            }}
                        />
                        <ul className="flex justify-between w-full px-[10px]">
                            <li className="flex justify-center relative">
                                <span className="absolute">0</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">1</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">2</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">3</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">4</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">5</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">6</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">7</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">8</span>
                            </li>
                            <li className="flex justify-center relative">
                                <span className="absolute">9</span>
                            </li>
                        </ul>
                    </div>
                    <button
                        type="button"
                        className="bg-[#FF1E1E] text-white font-bold rounded-md px-4 py-2 m-2 md:mx-40 transition duration-500 ease select-none hover:bg-red-800 hover:outline-none focus:outline-none focus:shadow-outline col-span-2"
                        onClick={async () => {
                            await addBeat({
                                onSuccess: (tx) => handleSuccess(tx),
                            })
                        }}
                    >
                        Heart It!
                    </button>
                </div>
            ) : (
                <div>HeartAddress not found!</div>
            )}
            <div className="flex flex-col items-center">
                <div className="bg-[#B4E4FF] rounded-md p-5 mb-10  w-5/6 md:w-auto md:m-5">
                    <div className="font-semibold">Search the Heart!</div>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <input
                            type="text"
                            id="get-data-input"
                            className="bg-[#0F3460] text-cyan-200 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  col-span-2 "
                            placeholder="Get rhythms about: Tree"
                            required
                            onChange={(e) => setGetBeatsData(e.target.value)}
                        />
                        <button
                            type="button"
                            className="bg-[#FF1E1E] text-white font-bold rounded-md px-4 py-2 m-2  transition duration-500 ease select-none hover:bg-red-800 focus:outline-none focus:shadow-outline"
                            onClick={async () => await getBeatsFromData()}
                        >
                            Search Heart!
                        </button>
                    </div>
                    {displayResults && (
                        <div className="space-y-2 p-7 mt-2 bg-[#00FFD1] rounded-md">
                            <div className="font-semibold">
                                Number of Entries: {avgRhythm[8]}
                            </div>
                            <div className="font-semibold">Averages:</div>
                            <div className="grid grid-cols-4 gap-3">
                                <div>Good: {avgRhythm[0].toFixed(2)}</div>
                                <div>Bad: {avgRhythm[1].toFixed(2)}</div>
                                <div>Happy: {avgRhythm[2].toFixed(2)}</div>
                                <div>Sad: {avgRhythm[3].toFixed(2)}</div>
                                <div>Surprise: {avgRhythm[4].toFixed(2)}</div>
                                <div>Fear: {avgRhythm[5].toFixed(2)}</div>
                                <div>Anger: {avgRhythm[6].toFixed(2)}</div>
                                <div>Disgust: {avgRhythm[7].toFixed(2)}</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="bg-[#B4E4FF] rounded-md p-5 mb-10  w-5/6 md:w-auto md:m-5 content-center">
                    <div className="font-semibold mb-4">Heart History</div>
                    <div className="overflow-y-scroll h-80  rounded-md bg-[#00FFD1]">
                        <table className="p-1 rounded-md border-separate border-spacing-2 ">
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Rhythm</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {allBeats.map((beat, index) => (
                                    <tr key={index}>
                                        <td>
                                            {beat.data.length > 10
                                                ? beat.data.slice(0, 10) + "..."
                                                : beat.data}
                                        </td>
                                        <td>{beat.rhythm.toString()}</td>
                                        <td>
                                            {beat.addr.slice(0, 10)}...
                                            {beat.addr.slice(28)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
