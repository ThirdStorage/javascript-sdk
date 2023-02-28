import retry from "async-retry";
import axios from "axios";
import { SiweMessage } from "siwe";
import wagmi from "./wagmi";

export class ThirdStorageClient {
  serverUrl;
  encryptionAuthSig;
  litNodeClient;
  litJsSdk;
  axios;
  public;
  private;
  database;
  ipfs;
  ipns;
  wagmi;
  isConnected = false;
  connectedAddress = "";
  isInitialized = false;
  /**
   * Initialize a new SDK Instance
   * @param serverUrl
   * @param isConnected
   * @param connectedAddress
   */
  constructor(serverUrl, isConnected = false, connectedAddress = "") {
    this.serverUrl = serverUrl;
    axios.defaults.baseURL = serverUrl;
    axios.defaults.withCredentials = true;

    this.axios = axios;

    this.public = new PublicClass(this);
    this.private = new PrivateClass(this);
    this.database = new DatabaseClass(this);
    this.ipfs = new IPFSClass(this);
    this.ipns = new IPNSClass(this);
    this.wagmi = wagmi;
    this.isConnected = isConnected;
    this.connectedAddress = connectedAddress;
    // this._initEncryption();
  }

  async initialize() {
    const res = await this.signedInWallet();
    if (res) {
      this.isConnected = true;
      this.connectedAddress = res;
    }

    // this._initEncryption();

    this.isInitialized = true;
  }

  /**
   * Method for authentication
   * @param address //Wallet address
   * @param chainId
   * @param signMessageAsync //Method used to signMessage provided by Wagmi
   * @returns {Promise<boolean>}
   */
  async signIn(address, chainId, signMessageAsync) {
    const nonceRes = await this.axios.get("/auth/nonce");
    const nonce = await nonceRes.data;

    const message = new SiweMessage({
      domain: window.location.host,
      address: address,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      chainId,
      nonce: nonce,
    });

    const signature = await signMessageAsync({
      message: message.prepareMessage(),
    });

    const verifyRes = (
      await this.axios.post(
        "auth/verify",
        { message, signature },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).data;

    if (!verifyRes.ok) {
      throw new Error("Error verifying message");
    } else {
      return true;
    }
  }

  /**
   * Get the current Signed Wallet
   * @returns {Promise<*|boolean>} //Wallet address if authenticated else false
   */
  async signedInWallet() {
    return (await this.axios.get("auth/me")).data?.address ?? false;
  }

  /**
   * Logout the current authenticated user
   * @returns {Promise<boolean>}
   */
  async signOut() {
    await axios.post("/auth/logout");
    return true;
  }

  /**
   * Set a key for the current user
   * @param key
   * @param value
   * @param isPrivate
   * @returns {Promise<*>}
   */
  async set(key, value, isPrivate = false) {
    value = isPrivate ? await this._encryptData(value, {}) : value;

    return await this._serverFetch({
      path: "set",
      method: `POST`,
      body: { key, value, type: isPrivate ? "private" : "public" },
    });
  }

  /**
   * Get data for a given key
   * @param key
   * @param isPrivate
   * @returns {Promise<{[p: string]: *}|*>}
   */
  async get(key, isPrivate = false) {
    const rawData = await this._serverFetch({
      path: `get?key=${key}&type=${isPrivate ? "private" : "public"}`,
      method: "GET",
    });

    if (isPrivate && this._isEncryptedData(rawData)) {
      const decryptedData = await this._decryptData(rawData.data, {});
      return {
        ...rawData,
        data: decryptedData,
      };
    }

    return rawData;
  }

  /**
   * Sign message for encryption using LitJsSDK
   * @returns {Promise<*>}
   */
  async signMessageForEncryption() {
    if (typeof window === "undefined") {
      throw new Error("Encryption messages can only be signed in the browser");
    }
    this.encryptionAuthSig = await this.litJsSdk.checkAndSignAuthMessage({
      chain: "ethereum",
    });
    return this.encryptionAuthSig;
  }

  /**
   * Get current Encryption Auth Signature
   * @returns {*}
   */
  getEncryptionAuthSignature() {
    return this.encryptionAuthSig;
  }

  async _serverFetch({ path, method, body }) {
    let res;

    if (method === "POST") {
      res = await this.axios.post(path, body);
    } else {
      res = await this.axios.get(path);
    }

    return res.data;
  }

  async _initEncryption() {
    this.litJsSdk = await this._getLitSdkWithRetry();
    this.litNodeClient = new this.litJsSdk.LitNodeClient({
      debug: true,
      alertWhenUnauthorized: typeof window !== "undefined",
    });

    await this.litNodeClient.connect({ debug: true });
  }

  async _getLitSdkWithRetry() {
    // polyfill hack for lit sdk to work in browser
    if (typeof window !== "undefined") {
      window.global = globalThis;
    }

    const sdk = await retry(
      async () => {
        // @ts-ignore return the lit instance if it is defined on the client
        if (typeof window !== "undefined" && window.LitJsSdk) {
          // @ts-ignore
          return window.LitJsSdk;
        }

        // @ts-ignore - TODO - declare types
        const { default: LitJsSdk } = await import("lit-js-sdk");
        return LitJsSdk;
      },
      {
        // retries: 5,
        // factor: 2, // exponential
        // maxTimeout: 5 * 60 * 1000, // 5 minutes
      }
    );

    if (!sdk) {
      throw new Error(
        "Failed to initialize encryption - lit sdk may not be installed"
      );
    }

    return sdk;
  }

  async _encryptData(dataToEncrypt, opts) {
    if (!this.litJsSdk || !this.litNodeClient) {
      throw new Error("Encryption not initialized");
    }

    const stringified = JSON.stringify(dataToEncrypt);
    const resp = await this.litJsSdk.encryptString(stringified);
    if (!resp) {
      throw new Error("Failed to encrypt");
    }
    const { encryptedString, symmetricKey } = resp;
    const authSig =
      opts.overrideEncryptionAuthSig ||
      this.encryptionAuthSig ||
      (await this.signMessageForEncryption());

    if (!authSig) {
      throw new Error("Auth sig is not defined");
    }

    // gate it to the connected user
    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: authSig.address,
        },
      },
    ];
    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain: "ethereum",
    });
    const encryptedData = await this._getDataUrl(encryptedString);
    return {
      ownerAddress: authSig.address,
      encryptedSymmetricKey: this.litJsSdk.uint8arrayToString(
        encryptedSymmetricKey,
        "base16"
      ),
      encryptedData,
    };
  }

  async _decryptData(dataToDecrypt, opts = {}) {
    if (!this.litJsSdk || !this.litNodeClient) {
      throw new Error("Encryption not initialized");
    }

    const {
      encryptedData,
      encryptedSymmetricKey,
      ownerAddress,
    } = dataToDecrypt;

    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
          comparator: "=",
          value: ownerAddress,
        },
      },
    ];

    const authSig =
      opts?.overrideEncryptionAuthSig ||
      this.encryptionAuthSig ||
      (await this.signMessageForEncryption());

    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions,
      toDecrypt: encryptedSymmetricKey,
      chain: "ethereum",
      authSig,
    });

    const blob = await (await fetch(encryptedData)).blob();
    const decryptedString = await this.litJsSdk.decryptString(
      blob,
      symmetricKey
    );

    if (!decryptedString) {
      throw new Error("Failed to decrypt");
    }

    return JSON.parse(decryptedString);
  }

  _isEncryptedData(maybeEncryptedData) {
    return !!maybeEncryptedData?.data?.encryptedSymmetricKey;
  }

  _getDataUrl(blob) {
    return new Promise((resolve) => {
      const fr = new FileReader();

      fr.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          resolve(fr.result?.toString() || "");
        },
        false
      );

      fr.readAsDataURL(blob);
    });
  }
}

class PublicClass {
  client;
  constructor(client) {
    this.client = client;
  }

  async set(key, value) {
    return this.client.set(key, value, false);
  }

  async get(key) {
    return this.client.get(key, false);
  }
}

class PrivateClass {
  client;
  constructor(client) {
    this.client = client;
  }

  async set(key, value) {
    return this.client.set(key, value, true);
  }

  async get(key) {
    return this.client.get(key, true);
  }
}

class DatabaseClass {
  client;
  constructor(client) {
    this.client = client;
  }

  async set(key, value) {
    return (
      await this.client.axios.post(
        "db/set",
        { key, value },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).data.data[key];
  }

  async get(key) {
    return (
      (
        await this.client.axios.get("db/get", {
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).data.data[key] ?? null
    );
  }
}

class IPFSClass {
  client;
  constructor(client) {
    this.client = client;
  }

  async set(key, file) {
    let data = new FormData();
    data.append("key", key);
    data.append("file", file);
    return (
      await this.client.axios.post("storage/set", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data.cid;
  }

  async get(key) {
    return (
      (
        await this.client.axios.get("storage/get", {
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).data?.data?.filter((file) => file.name === key)[0].cid ?? null
    );
  }
}

class IPNSClass {
  client;
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a new IPNS name, stores the file in IPFS and stores its CID in the generated name
   * @param key
   * @param file
   * @returns {Promise<*>}
   */
  async set(key, file) {
    let data = new FormData();
    data.append("key", key);
    data.append("file", file);
    return (
      await this.client.axios.post("storage/ipns/set", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data.name;
  }

  async get(key) {
    return (
      (
        await this.client.axios.get("storage/ipns/get", {
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).data?.data?.filter((file) => file.name === key)[0].value ?? null
    );
  }
}
