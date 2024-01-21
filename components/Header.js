import {ConnectButton} from '@web3uikit/web3'
import React, {useEffect} from 'react'
import {useMoralis} from "react-moralis";

export const Header = () => {
  const { authenticate, isAuthenticated, user,account } = useMoralis();
  console.log(account)
  useEffect(()=>{
    console.log(account,'account')
  },[account])
  
  return (
      <nav className="p-5 border-b-2 flex flex-row">
        <h1 className="py-4 px-4 font-bold text-3xl"> Decentralized Lottery</h1>
        <div className="ml-auto py-2 px-4">
          <ConnectButton moralisAuth={false}/>
        </div>
      </nav>
  )
}
