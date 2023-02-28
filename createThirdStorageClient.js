import { ThirdStorageClient } from "./ThirdClient.js";

export async function createThirdStorageClient(serverUrl) {
  let isConnected = false;
  let connectedAddress = "";
  const res = await (new ThirdStorageClient(serverUrl)).signedInWallet();

  console.log(res)
  if (res) {
    isConnected = true;
    connectedAddress = res;
  }

  return new ThirdStorageClient(serverUrl, isConnected, connectedAddress);
}
