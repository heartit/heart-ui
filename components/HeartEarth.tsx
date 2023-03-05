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

interface contractAddressesInterface {
    [key: string]: string[]
}

export default function HeartEarth() {
    const addresses: contractAddressesInterface = earthContractAddresses
    console.log("addresses", addresses)
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: string = parseInt(chainIdHex!).toString()
    const heartEarthAddress =
        chainId in addresses ? addresses[chainId][0] : null

    const [leaveItStatus, setLeaveItStatus] = useState(false)

    const { runContractFunction: leaveIt } = useWeb3Contract({
        abi: earthAbi,
        contractAddress: heartEarthAddress!,
        functionName: "leaveIt",
        params: { _data: "tree" },
    })

    async function updateUI() {
        console.log("[W8] Updating UI...")
        const leaveItCalled = await leaveIt()
        console.log("called", leaveItCalled)
        setLeaveItStatus(leaveItCalled)
        console.log(leaveItStatus)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return <div>{leaveItStatus.toString()}hi</div>
}
