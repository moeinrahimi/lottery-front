

import {ConnectButton} from '@web3uikit/web3'
import React, {useEffect} from 'react'
import {useMoralis} from "react-moralis";
import { Header } from '../components/Header';
import {LotteryEntrance} from "../components/LotteryEntrance";

const supportedChains = ["31337", "11155111"]

    export const Raffle = () => {
        const { isWeb3Enabled, chainId } = useMoralis();
        
    return (
       <div>
           <Header />
           {isWeb3Enabled ? (
               <div>
                   {supportedChains.includes(parseInt(chainId).toString()) ? (
                       <div className="flex flex-row">
                           <LotteryEntrance className="p-8" />
                       </div>
                       ) : (
                           <div>{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>
                           )}
               </div>
               ) : (
                   <div>Please connect to a Wallet</div>
                   )}
    </div>
        );
    }
