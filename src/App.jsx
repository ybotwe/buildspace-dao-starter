import { useEffect, useMemo, useState } from "react";
import { useWeb3 } from "@3rdweb/hooks";


const App = () => {

  const { connectWallet, address, error, provider} = useWeb3();
  console.log('👋🏾 Address:', address);

  if(!address){
    return (
      <div className="landing">
        <h1>Welcome to CharityDAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero btn-black">
          Connect with Metamask
        </button>
        <br></br>
        <button onClick={() => connectWallet("walletconnect")} className="btn-hero btn-blue">
          Connect with WalletConnect
        </button>
        <br></br>
        <button onClick={() => connectWallet("walletlink")} className="btn-hero btn-white">
          Connect with Coinbase Wallet
        </button>
        <br></br>
      </div>
    );
  }


  return (
    <div className="landing">
      <h1>👀 wallet connected, now what!</h1>
    </div>
  );
};

export default App;
