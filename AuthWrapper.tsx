//@ts-nocheck
import { WagmiConfig, createClient } from "./wagmi";
import { configureChains } from "wagmi";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { mainnet } from "wagmi/chains";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { publicProvider } from "wagmi/providers/public";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";

// @ts-ignore
export const Context = React.createContext(undefined);
export const queryClientContext = React.createContext(undefined);

export function AuthWrapper(props) {
  const {
    children,
    appName = "Third Storage",
    walletConnectProjectId = null,
    arcanaAppId = null,
  } = props;

  const chains = [mainnet];
  const { provider } = configureChains(chains, [
    walletConnectProvider({ projectId: walletConnectProjectId }),
    publicProvider(),
  ]);

  const connector = (chains) => {
    return new ArcanaConnector({
      chains,
      options: {
        appId: arcanaAppId,
      },
    });
  };

  const client = createClient({
    autoConnect: true,
    connectors: [
      ...modalConnectors({
        appName: appName,
        chains,
      }),
      connector(chains),
    ],
    provider,
  });

  const ethereumClient = new EthereumClient(client, chains);

  return (
    <div>
      <WagmiConfig client={client}>
        {React.createElement(Context.Provider, {
          children: React.createElement(QueryClientProvider, {
            children,
            client: client.queryClient,
            context: queryClientContext,
          }),
          value: client,
        })}
        {/*<Web3Modal*/}
        {/*  ethereumClient={ethereumClient}*/}
        {/*  projectId={walletConnectProjectId}*/}
        {/*/>*/}
      </WagmiConfig>
    </div>
  );
}
