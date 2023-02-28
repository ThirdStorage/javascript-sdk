"use strict";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { mainnet } from "wagmi/chains";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Children } from "react";

import React from "react"

const _wagmi = { WagmiConfig, createClient, configureChains };
const _ethereum = { EthereumClient, modalConnectors, walletConnectProvider };
const _react = { Web3Modal };
const _chains = { mainnet };
const _authWagmi = { ArcanaConnector };
const _public = { publicProvider };
const _react2 = { Children };

export function AuthWrapper(_ref) {
  let {
    children,
    appName = "Third Storage",
    walletConnectProjectId = null,
    arcanaAppId = null,
  } = _ref;
  const chains = [_chains.mainnet];
  const { provider } = (0, _wagmi.configureChains)(chains, [
    (0, _ethereum.walletConnectProvider)({
      projectId: walletConnectProjectId,
    }),
    (0, _public.publicProvider)(),
  ]);
  const connector = (chains) => {
    return new _authWagmi.ArcanaConnector({
      chains,
      options: {
        appId: arcanaAppId,
      },
    });
  };
  const client = (0, _wagmi.createClient)({
    autoConnect: true,
    connectors: [
      ...(0, _ethereum.modalConnectors)({
        appName: appName,
        chains,
      }),
      connector(chains),
    ],
    provider,
  });
  const ethereumClient = new _ethereum.EthereumClient(client, chains);
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement(
      _wagmi.WagmiConfig,
      {
        client: client,
      },
      _react2.Children.map(children, (child) => ({
        child,
      }))
    ),
    /*#__PURE__*/ React.createElement(_react.Web3Modal, {
      projectId: walletConnectProjectId,
      ethereumClient: ethereumClient,
    })
  );
}
