//@ts-nocheck
import wagmi from "./wagmi";
import React, { useState, useEffect } from "react";

export function ArcanaAuthButton({ thirdStorageClient }) {
  const [isInitializing, setIsInitializing] = useState(false);

  const { useAccount, useSignMessage, useNetwork, useConnect } = wagmi;

  const { connectAsync, connectors, isLoading } = useConnect();

  const { address, isConnected } = useAccount();

  const { signMessageAsync } = useSignMessage();
  const { chain: activeChain } = useNetwork();

  const signIn = async (a = null, chainId = null) => {
    try {
      let res = {};
      if (!isConnected) {
        res = await connectAsync({
          connector: connectors[3],
        });

        a = res.account;
        chainId = res.chain?.id;
      } else {
        a = address;
        chainId = activeChain?.id;
        if (!address || !chainId) return;
      }
      setIsInitializing(false);
      if (await thirdStorageClient.signIn(a, chainId, signMessageAsync)) {
        alert("Logged in!");
        window.location.href = window.location.href;
      }
    } catch (error) {
      setIsInitializing(false);
      console.log(error.message);
    }
  };

  return (
    <button
      onClick={async () => {
        setIsInitializing(true);
        await signIn();
      }}
      disabled={
        !connectors[3].ready || isConnected || thirdStorageClient.isConnected
      }
      className="p-3 border rounded-xl border-gray-400 text-[#ffffff9d] title"
    >
      {isInitializing
        ? "Connecting"
        : isConnected
        ? `Connected to ${thirdStorageClient.connectedAddress.substring(
            0,
            3
          )}...${thirdStorageClient.connectedAddress.substring(
            thirdStorageClient.connectedAddress.length - 3,
            thirdStorageClient.connectedAddress.length
          )} `
        : "Connect Wallet with Arcana"}
    </button>
  );
}
