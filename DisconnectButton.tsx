//@ts-nocheck
import React, {useEffect, useState} from "react";
import wagmi from "./wagmi";

export function DisconnectButton({thirdStorageClient}) {

    const { useAccount, useDisconnect } = wagmi;

    const { disconnect } = useDisconnect();

    return (
        <button
            onClick={async () => {
                await thirdStorageClient.signOut();
                await disconnect();
                window.location.href = window.location.href
            }}
            disabled={ !thirdStorageClient.isConnected}
            className="p-3 border rounded-xl border-gray-400 text-[#ffffff9d] title"
        >
            {!thirdStorageClient.isConnected
                ? `Connect Wallet to disconnect`
                : "Disconnect Wallet"}
        </button>
    );
}
