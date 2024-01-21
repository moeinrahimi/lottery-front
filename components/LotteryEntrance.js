import abi from '../constants/abi.json';
import contractAddresses from '../constants/contractAddresses.json';
import {ConnectButton} from '@web3uikit/web3'
import React, {useEffect, useState} from 'react'
import {useMoralis, useWeb3Contract} from "react-moralis";
import {ethers}from 'ethers'
import {useNotification} from "web3uikit";
export const LotteryEntrance = () => {
    const dispatch=useNotification()
    const [fee,setFee]=useState("0")
    const [numPlayers,setNumPlayers]=useState("0")
    const [recentWinner,setrecentWinner]=useState("0")
    
    const {chainId: chainIdHex,isWeb3Enabled,enableWeb3} = useMoralis()
    const chainId = parseInt(chainIdHex)
    
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    
    const {runContractFunction:enterRaffle,  isLoading,
        isFetching,} = useWeb3Contract({
    abi:abi,
    contractAddress:raffleAddress,
    functionName:"enterRaffle",
    msgValue:fee,
    params:{}
  })
    const {runContractFunction:getEntranceFee} = useWeb3Contract({
        abi:abi,
        contractAddress:raffleAddress,
        functionName:"getEntranceFee",
        
        params:{}
    })
    const {runContractFunction:getRecentWinner} = useWeb3Contract({
        abi:abi,
        contractAddress:raffleAddress,
        functionName:"getRecentWinner",

        params:{}
    })
    const {runContractFunction:getNumberOfPlayers} = useWeb3Contract({
        abi:abi,
        contractAddress:raffleAddress,
        functionName:"getNumberOfPlayers",

        params:{}
    })
    async function updateUI(){
        const entranceFee = (await getEntranceFee()).toString()
        const recentWinner = (await getRecentWinner()).toString()
        const numbPlayers = (await getNumberOfPlayers()).toString()
        console.log(recentWinner,numbPlayers)
        console.log(entranceFee,'entrance fee')
        setFee(entranceFee)
        setrecentWinner(recentWinner)
        setNumPlayers(numbPlayers)
    }
    useEffect(()=>{
        if (isWeb3Enabled){
        
            updateUI()
            
        }
    },[isWeb3Enabled])
    const handleSuccess=async(tx)=>{
        console.log('here')
        await tx.wait(1)
        console.log('here2')
        handleNewNotification(tx)
        await updateUI()
    }
    const handleNewNotification=(tx)=>{
        dispatch({
            type:'info',
            message:"Transaction Complete!",
            position:"topR",
            icon:'bell',
            title:"Tx Notificatoin"
        })
    }
   return (
        <div className="p-5">
            <h1 className="py-4 px-4 font-bold text-3xl">Lottery</h1>
            {raffleAddress ? (
                <>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await enterRaffle({
                                // onComplete:
                                // onError:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                            ) : (
                                "Enter Raffle"
                                )}
                    </button>
                <div>Entrance Fee: {ethers.utils.formatUnits(fee, "ether")} ETH</div>
                <div>The current number of players is: {numPlayers}</div>
                <div>The most previous winner was: {recentWinner}</div>
                </>
                ) : (
                    <div>Please connect to a supported chain </div>
                    )}
        </div>
        )
}