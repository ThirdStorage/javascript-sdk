"use strict";

// Object.defineProperty(exports, '__esModule', { value: true });

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  QueryClient,
  QueryClientProvider,
  useIsRestoring,
  useQueryClient as useQueryClientReactQuery,
  notifyManager,
  useQueryErrorResetBoundary,
  parseMutationArgs,
  useMutation as useMutationReactQuery,
  QueryObserver,
  InfiniteQueryObserver,
} from "@tanstack/react-query";
import { persistQueryClient as persistQueryClientReactQuery } from "@tanstack/react-query-persist-client";
import {
  createClient as createClientCore,
  watchProvider as watchProviderCore,
  getProvider as getProviderCore,
  watchWebSocketProvider as watchWebSocketProviderCore,
  fetchBlockNumber as fetchBlockNumberCore,
  fetchFeeData as fetchFeeDataCore,
  deepEqual as deepEqualCore,
  watchAccount as watchAccountCore,
  getAccount as getAccountCore,
  fetchBalance as fetchBalanceCore,
  connect as connectCore,
  disconnect as disconnectCore,
  watchNetwork as watchNetworkCore,
  getNetwork as getNetworkCore,
  fetchSigner as fetchSignerCore,
  watchSigner as watchSignerCore,
  signMessage as signMessageCore,
  signTypedData as signTypedDataCore,
  switchNetwork as switchNetworkCore,
  getContract as getContractCore,
  readContracts as readContractsCore,
  readContract as readContractCore,
  parseContractResult as parseContractResultCore,
  writeContract as writeContractCore,
  prepareWriteContract as prepareWriteContractCore,
  fetchToken as fetchTokenCore,
  fetchEnsAddress as fetchEnsAddressCore,
  fetchEnsAvatar as fetchEnsAvatarCore,
  fetchEnsName as fetchEnsNameCore,
  fetchEnsResolver as fetchEnsResolverCore,
  fetchTransaction as fetchTransactionCore,
  prepareSendTransaction as prepareSendTransactionCore,
  sendTransaction as sendTransactionCore,
  waitForTransaction as waitForTransactionCore,
  Client as ClientCore,
} from "@wagmi/core";
import { BigNumber as BigNumberEthers } from "ethers";
import React from "react";
import pkg from "use-sync-external-store/shim/index.js";
import withSelector_js from "use-sync-external-store/shim/with-selector.js";
import { debounce as debounceInternal } from "@wagmi/core/internal";
import {
  Context as ThirdStorageContext,
  queryClientContext as ThirdStorageQueryClientContext,
} from "./AuthWrapper.js";

const exports = new Object();
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(
          n,
          k,
          d.get
            ? d
            : {
                enumerable: true,
                get: function () {
                  return e[k];
                },
              }
        );
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/ _interopNamespace(React);
var pkg__namespace = /*#__PURE__*/ _interopNamespace(pkg);

const findAndReplace = (cacheRef, _ref) => {
  let { find, replace } = _ref;

  if (cacheRef && find(cacheRef)) {
    return replace(cacheRef);
  }

  if (typeof cacheRef !== "object") {
    return cacheRef;
  }

  if (Array.isArray(cacheRef)) {
    return cacheRef.map((item) =>
      findAndReplace(item, {
        find,
        replace,
      })
    );
  }

  if (cacheRef instanceof Object) {
    return Object.entries(cacheRef).reduce((curr, _ref2) => {
      let [key, value] = _ref2;
      return {
        ...curr,
        [key]: findAndReplace(value, {
          find,
          replace,
        }),
      };
    }, {});
  }

  return cacheRef;
};

function deserialize(cachedString) {
  const cache = JSON.parse(cachedString);
  const deserializedCacheWithBigNumbers = findAndReplace(cache, {
    find: (data) => data.type === "BigNumber",
    replace: (data) => BigNumberEthers.from(data.hex),
  });
  return deserializedCacheWithBigNumbers;
}

/**
 * @function getReferenceKey
 *
 * @description
 * get the reference key for the circular value
 *
 * @param keys the keys to build the reference key from
 * @param cutoff the maximum number of keys to include
 * @returns the reference key
 */
function getReferenceKey(keys, cutoff) {
  return keys.slice(0, cutoff).join(".") || ".";
}
/**
 * @function getCutoff
 *
 * @description
 * faster `Array.prototype.indexOf` implementation build for slicing / splicing
 *
 * @param array the array to match the value in
 * @param value the value to match
 * @returns the matching index, or -1
 */

function getCutoff(array, value) {
  const { length } = array;

  for (let index = 0; index < length; ++index) {
    if (array[index] === value) {
      return index + 1;
    }
  }

  return 0;
}

/**
 * @function createReplacer
 *
 * @description
 * create a replacer method that handles circular values
 *
 * @param [replacer] a custom replacer to use for non-circular values
 * @param [circularReplacer] a custom replacer to use for circular methods
 * @returns the value to stringify
 */
function createReplacer(replacer, circularReplacer) {
  const hasReplacer = typeof replacer === "function";
  const hasCircularReplacer = typeof circularReplacer === "function";
  const cache = [];
  const keys = [];
  return function replace(key, value) {
    if (typeof value === "object") {
      if (cache.length) {
        const thisCutoff = getCutoff(cache, this);

        if (thisCutoff === 0) {
          cache[cache.length] = this;
        } else {
          cache.splice(thisCutoff);
          keys.splice(thisCutoff);
        }

        keys[keys.length] = key;
        const valueCutoff = getCutoff(cache, value);

        if (valueCutoff !== 0) {
          return hasCircularReplacer
            ? circularReplacer.call(
                this,
                key,
                value,
                getReferenceKey(keys, valueCutoff)
              )
            : `[ref=${getReferenceKey(keys, valueCutoff)}]`;
        }
      } else {
        cache[0] = value;
        keys[0] = key;
      }
    }

    return hasReplacer ? replacer.call(this, key, value) : value;
  };
}
/**
 * @function stringify
 *
 * @description
 * stringifier that handles circular values
 * Forked from https://github.com/planttheidea/fast-stringify
 *
 * @param value to stringify
 * @param [replacer] a custom replacer function for handling standard values
 * @param [indent] the number of spaces to indent the output by
 * @param [circularReplacer] a custom replacer function for handling circular values
 * @returns the stringified output
 */

function serialize(value, replacer, indent, circularReplacer) {
  return JSON.stringify(
    value,
    createReplacer(replacer, circularReplacer),
    indent ?? undefined
  );
}

export function createClient(_ref) {
  let {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1_000 * 60 * 60 * 24,
          // 24 hours
          networkMode: "offlineFirst",
          refetchOnWindowFocus: false,
          retry: 0,
        },
        mutations: {
          networkMode: "offlineFirst",
        },
      },
    }),
    persister = typeof window !== "undefined"
      ? createSyncStoragePersister({
          key: "wagmi.cache",
          storage: window.localStorage,
          serialize,
          deserialize,
        })
      : undefined,
    ...config
  } = _ref;
  const client = createClientCore(config);
  if (persister)
    persistQueryClientReactQuery({
      queryClient,
      persister,
      dehydrateOptions: {
        shouldDehydrateQuery: (query) =>
          query.cacheTime !== 0 && // Note: adding a `persist` flag to a query key will instruct the
          // persister whether or not to persist the response of the query.
          query.queryKey[0].persist !== false,
      },
    });
  return Object.assign(client, {
    queryClient,
  });
}

export const Context = /*#__PURE__*/ React__namespace.createContext(undefined);
export const queryClientContext = /*#__PURE__*/ React__namespace.createContext(
  undefined
);
export function WagmiConfig(_ref) {
  let { children, client } = _ref;
  return /*#__PURE__*/ React__namespace.createElement(
    Context.Provider,
    {
      value: client,
    },
    /*#__PURE__*/ React__namespace.createElement(
      QueryClientProvider,
      {
        client: client.queryClient,
        context: queryClientContext,
      },
      children
    )
  );
}
function useClient() {
  const client = React__namespace.useContext(ThirdStorageContext);
  if (!client)
    throw new Error(
      [
        "`useClient` must be used within `WagmiConfig`.\n",
        "Read more: https://wagmi.sh/docs/WagmiConfig",
      ].join("\n")
    );
  return client;
}

const useSyncExternalStore = pkg__namespace.useSyncExternalStore;

function isQueryKey(value) {
  return Array.isArray(value);
}

function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }

  if (typeof arg2 === "function") {
    return { ...arg3, queryKey: arg1, queryFn: arg2 };
  }

  return { ...arg2, queryKey: arg1 };
}
function shouldThrowError(_useErrorBoundary, params) {
  // Allow useErrorBoundary function to override throwing behavior on a per-error basis
  if (typeof _useErrorBoundary === "function") {
    return _useErrorBoundary(...params);
  }

  return !!_useErrorBoundary;
}
function trackResult(result, observer) {
  const trackedResult = {};
  Object.keys(result).forEach((key) => {
    Object.defineProperty(trackedResult, key, {
      configurable: false,
      enumerable: true,
      get: () => {
        // @ts-expect-error – aware we are mutating private `trackedProps` property.
        observer.trackedProps.add(key);
        return result[key];
      },
    });
  });
  return trackedResult;
}

function useBaseQuery(options, Observer) {
  const queryClient = useQueryClientReactQuery({
    context: options.context,
  });
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const defaultedOptions = queryClient.defaultQueryOptions(options); // Make sure results are optimistically set in fetching state before subscribing or updating options

  defaultedOptions._optimisticResults = isRestoring
    ? "isRestoring"
    : "optimistic"; // Include callbacks in batch renders

  if (defaultedOptions.onError) {
    defaultedOptions.onError = notifyManager.batchCalls(
      defaultedOptions.onError
    );
  }

  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = notifyManager.batchCalls(
      defaultedOptions.onSuccess
    );
  }

  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = notifyManager.batchCalls(
      defaultedOptions.onSettled
    );
  }

  if (defaultedOptions.suspense) {
    // Always set stale time when using suspense to prevent
    // fetching again when directly mounting after suspending
    if (typeof defaultedOptions.staleTime !== "number") {
      defaultedOptions.staleTime = 1_000;
    }
  }

  if (defaultedOptions.suspense || defaultedOptions.useErrorBoundary) {
    // Prevent retrying failed query if the error boundary has not been reset yet
    if (!errorResetBoundary.isReset()) {
      defaultedOptions.retryOnMount = false;
    }
  }

  const [observer] = React__namespace.useState(
    () => new Observer(queryClient, defaultedOptions)
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  useSyncExternalStore(
    React__namespace.useCallback(
      (onStoreChange) =>
        isRestoring
          ? () => undefined
          : observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer, isRestoring]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  React__namespace.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
  React__namespace.useEffect(() => {
    // Do not notify on updates because of changes in the options because
    // these changes should already be reflected in the optimistic result.
    observer.setOptions(defaultedOptions, {
      listeners: false,
    });
  }, [defaultedOptions, observer]); // Handle suspense

  if (
    defaultedOptions.suspense &&
    result.isLoading &&
    result.isFetching &&
    !isRestoring
  ) {
    throw observer
      .fetchOptimistic(defaultedOptions)
      .then((_ref) => {
        var _defaultedOptions$onS, _defaultedOptions$onS2;

        let { data } = _ref;
        (_defaultedOptions$onS = defaultedOptions.onSuccess) === null ||
        _defaultedOptions$onS === void 0
          ? void 0
          : _defaultedOptions$onS.call(defaultedOptions, data);
        (_defaultedOptions$onS2 = defaultedOptions.onSettled) === null ||
        _defaultedOptions$onS2 === void 0
          ? void 0
          : _defaultedOptions$onS2.call(defaultedOptions, data, null);
      })
      .catch((error) => {
        var _defaultedOptions$onE, _defaultedOptions$onS3;

        errorResetBoundary.clearReset();
        (_defaultedOptions$onE = defaultedOptions.onError) === null ||
        _defaultedOptions$onE === void 0
          ? void 0
          : _defaultedOptions$onE.call(defaultedOptions, error);
        (_defaultedOptions$onS3 = defaultedOptions.onSettled) === null ||
        _defaultedOptions$onS3 === void 0
          ? void 0
          : _defaultedOptions$onS3.call(defaultedOptions, undefined, error);
      });
  } // Handle error boundary

  if (
    result.isError &&
    !errorResetBoundary.isReset() &&
    !result.isFetching &&
    shouldThrowError(defaultedOptions.useErrorBoundary, [
      result.error,
      observer.getCurrentQuery(),
    ])
  ) {
    throw result.error;
  }

  const status =
    result.status === "loading" && result.fetchStatus === "idle"
      ? "idle"
      : result.status;
  const isIdle = status === "idle";
  const isLoading = status === "loading" && result.fetchStatus === "fetching";
  return { ...result, defaultedOptions, isIdle, isLoading, observer, status };
}

function useInfiniteQuery(arg1, arg2, arg3) {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  const baseQuery = useBaseQuery(
    {
      context: ThirdStorageQueryClientContext,
      ...parsedOptions,
    },
    InfiniteQueryObserver
  );
  const result = {
    data: baseQuery.data,
    error: baseQuery.error,
    fetchNextPage: baseQuery.fetchNextPage,
    fetchStatus: baseQuery.fetchStatus,
    hasNextPage: baseQuery.hasNextPage,
    isError: baseQuery.isError,
    isFetched: baseQuery.isFetched,
    isFetchedAfterMount: baseQuery.isFetchedAfterMount,
    isFetching: baseQuery.isFetching,
    isFetchingNextPage: baseQuery.isFetchingNextPage,
    isIdle: baseQuery.isIdle,
    isLoading: baseQuery.isLoading,
    isRefetching: baseQuery.isRefetching,
    isSuccess: baseQuery.isSuccess,
    refetch: baseQuery.refetch,
    status: baseQuery.status,
    internal: {
      dataUpdatedAt: baseQuery.dataUpdatedAt,
      errorUpdatedAt: baseQuery.errorUpdatedAt,
      failureCount: baseQuery.failureCount,
      // TODO: Remove `isFetchedAfterMount` in next minor version (v0.8).
      isFetchedAfterMount: baseQuery.isFetchedAfterMount,
      isLoadingError: baseQuery.isLoadingError,
      isPaused: baseQuery.isPaused,
      isPlaceholderData: baseQuery.isPlaceholderData,
      isPreviousData: baseQuery.isPreviousData,
      isRefetchError: baseQuery.isRefetchError,
      isStale: baseQuery.isStale,
      remove: baseQuery.remove,
    },
  }; // Handle result property usage tracking

  return !baseQuery.defaultedOptions.notifyOnChangeProps
    ? trackResult(result, baseQuery.observer)
    : result;
}

function useMutation(arg1, arg2, arg3) {
  const options = parseMutationArgs(arg1, arg2, arg3);
  return useMutationReactQuery({
    context: ThirdStorageQueryClientContext,
    ...options,
  });
}

function useQuery(arg1, arg2, arg3) {
  const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  const baseQuery = useBaseQuery(
    {
      context: ThirdStorageQueryClientContext,
      ...parsedOptions,
    },
    QueryObserver
  );
  const result = {
    data: baseQuery.data,
    error: baseQuery.error,
    fetchStatus: baseQuery.fetchStatus,
    isError: baseQuery.isError,
    isFetched: baseQuery.isFetched,
    isFetchedAfterMount: baseQuery.isFetchedAfterMount,
    isFetching: baseQuery.isFetching,
    isIdle: baseQuery.isIdle,
    isLoading: baseQuery.isLoading,
    isRefetching: baseQuery.isRefetching,
    isSuccess: baseQuery.isSuccess,
    refetch: baseQuery.refetch,
    status: baseQuery.status,
    internal: {
      dataUpdatedAt: baseQuery.dataUpdatedAt,
      errorUpdatedAt: baseQuery.errorUpdatedAt,
      failureCount: baseQuery.failureCount,
      // TODO: Remove `isFetchedAfterMount` in next minor version (v0.8).
      isFetchedAfterMount: baseQuery.isFetchedAfterMount,
      isLoadingError: baseQuery.isLoadingError,
      isPaused: baseQuery.isPaused,
      isPlaceholderData: baseQuery.isPlaceholderData,
      isPreviousData: baseQuery.isPreviousData,
      isRefetchError: baseQuery.isRefetchError,
      isStale: baseQuery.isStale,
      remove: baseQuery.remove,
    },
  }; // Handle result property usage tracking

  return !baseQuery.defaultedOptions.notifyOnChangeProps
    ? trackResult(result, baseQuery.observer)
    : result;
}

const useQueryClient = () =>
  useQueryClientReactQuery({
    context: ThirdStorageQueryClientContext,
  });

function useProvider() {
  let { chainId } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return withSelector_js.useSyncExternalStoreWithSelector(
    (cb) =>
      watchProviderCore(
        {
          chainId,
        },
        cb
      ),
    () =>
      getProviderCore({
        chainId,
      }),
    () =>
      getProviderCore({
        chainId,
      }),
    (x) => x,
    (a, b) => a.network.chainId === b.network.chainId
  );
}

function useWebSocketProvider() {
  let { chainId } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return withSelector_js.useSyncExternalStoreWithSelector(
    (cb) =>
      watchWebSocketProviderCore(
        {
          chainId,
        },
        cb
      ),
    () =>
      watchWebSocketProviderCore({
        chainId,
      }),
    () =>
      watchWebSocketProviderCore({
        chainId,
      }),
    (x) => x,
    (a, b) =>
      (a === null || a === void 0 ? void 0 : a.network.chainId) ===
      (b === null || b === void 0 ? void 0 : b.network.chainId)
  );
}

function useChainId() {
  let { chainId } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const provider = useProvider({
    chainId,
  });
  return provider.network.chainId;
}

function useForceUpdate() {
  const [, forceUpdate] = React__namespace.useReducer((x) => x + 1, 0);
  return forceUpdate;
}

const queryKey$f = (_ref) => {
  let { chainId } = _ref;
  return [
    {
      entity: "blockNumber",
      chainId,
    },
  ];
};

const queryFn$f = (_ref2) => {
  let {
    queryKey: [{ chainId }],
  } = _ref2;
  return fetchBlockNumberCore({
    chainId,
  });
};

function useBlockNumber() {
  let {
    cacheTime = 0,
    chainId: chainId_,
    enabled = true,
    staleTime,
    suspense,
    watch = false,
    onBlock,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  const provider = useProvider({
    chainId,
  });
  const webSocketProvider = useWebSocketProvider({
    chainId,
  });
  const queryClient = useQueryClient();
  React__namespace.useEffect(() => {
    if (!watch && !onBlock) return; // We need to debounce the listener as we want to opt-out
    // of the behavior where ethers emits a "block" event for
    // every block that was missed in between the `pollingInterval`.
    // We are setting a wait time of 1 as emitting an event in
    // ethers takes ~0.1ms.

    const listener = debounceInternal((blockNumber) => {
      // Just to be safe in case the provider implementation
      // calls the event callback after .off() has been called
      if (watch)
        queryClient.setQueryData(
          queryKey$f({
            chainId,
          }),
          blockNumber
        );
      if (onBlock) onBlock(blockNumber);
    }, 1);
    const provider_ = webSocketProvider ?? provider;
    provider_.on("block", listener);
    return () => {
      provider_.off("block", listener);
    };
  }, [chainId, onBlock, provider, queryClient, watch, webSocketProvider]);
  return useQuery(
    queryKey$f({
      chainId,
    }),
    queryFn$f,
    {
      cacheTime,
      enabled,
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
}

const queryKey$e = (_ref) => {
  let { chainId, formatUnits } = _ref;
  return [
    {
      entity: "feeData",
      chainId,
      formatUnits,
    },
  ];
};

const queryFn$e = (_ref2) => {
  let {
    queryKey: [{ chainId, formatUnits }],
  } = _ref2;
  return fetchFeeDataCore({
    chainId,
    formatUnits,
  });
};

function useFeeData() {
  let {
    cacheTime,
    chainId: chainId_,
    enabled = true,
    formatUnits = "wei",
    staleTime,
    suspense,
    watch,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  const feeDataQuery = useQuery(
    queryKey$e({
      chainId,
      formatUnits,
    }),
    queryFn$e,
    {
      cacheTime,
      enabled,
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
  const { data: blockNumber } = useBlockNumber({
    chainId,
    watch,
  });
  React__namespace.useEffect(() => {
    if (!enabled) return;
    if (!watch) return;
    if (!blockNumber) return;
    feeDataQuery.refetch(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);
  return feeDataQuery;
}

function useInvalidateOnBlock(_ref) {
  let { chainId, enabled, queryKey } = _ref;
  const queryClient = useQueryClient();
  useBlockNumber({
    chainId,
    onBlock: enabled
      ? () => queryClient.invalidateQueries(queryKey)
      : undefined,
  });
}

const isPlainObject = (obj) => typeof obj === "object" && !Array.isArray(obj);

function useSyncExternalStoreWithTracked(subscribe, getSnapshot) {
  let getServerSnapshot =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : getSnapshot;
  let isEqual =
    arguments.length > 3 && arguments[3] !== undefined
      ? arguments[3]
      : (a, b) => deepEqualCore(a, b);
  const trackedKeys = React__namespace.useRef([]);
  const result = withSelector_js.useSyncExternalStoreWithSelector(
    subscribe,
    getSnapshot,
    getServerSnapshot,
    (x) => x,
    (a, b) => {
      if (isPlainObject(a) && isPlainObject(b)) {
        for (const key of trackedKeys.current) {
          const equal = isEqual(a[key], b[key]);
          if (!equal) return false;
        }

        return true;
      }

      return isEqual(a, b);
    }
  );

  if (isPlainObject(result)) {
    const trackedResult = { ...result };
    Object.defineProperties(
      trackedResult,
      Object.entries(trackedResult).reduce((res, _ref) => {
        let [key, value] = _ref;
        return {
          ...res,
          [key]: {
            configurable: false,
            enumerable: true,
            get: () => {
              if (!trackedKeys.current.includes(key)) {
                trackedKeys.current.push(key);
              }

              return value;
            },
          },
        };
      }, {})
    );
    return trackedResult;
  }

  return result;
}

function useAccount() {
  var _previousAccount$curr, _previousAccount$curr2, _previousAccount$curr3;

  let { onConnect, onDisconnect } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const account = useSyncExternalStoreWithTracked(
    watchAccountCore,
    getAccountCore
  );
  const previousAccount = React__namespace.useRef();
  if (
    !!onConnect &&
    ((_previousAccount$curr = previousAccount.current) === null ||
    _previousAccount$curr === void 0
      ? void 0
      : _previousAccount$curr.status) !== "connected" &&
    account.status === "connected"
  )
    onConnect({
      address: account.address,
      connector: account.connector,
      isReconnected:
        ((_previousAccount$curr2 = previousAccount.current) === null ||
        _previousAccount$curr2 === void 0
          ? void 0
          : _previousAccount$curr2.status) === "reconnecting",
    });
  if (
    !!onDisconnect &&
    ((_previousAccount$curr3 = previousAccount.current) === null ||
    _previousAccount$curr3 === void 0
      ? void 0
      : _previousAccount$curr3.status) == "connected" &&
    account.status === "disconnected"
  )
    onDisconnect();
  previousAccount.current = account;
  return account;
}

const queryKey$d = (_ref) => {
  let { addressOrName, chainId, formatUnits, token } = _ref;
  return [
    {
      entity: "balance",
      addressOrName,
      chainId,
      formatUnits,
      token,
    },
  ];
};

const queryFn$d = (_ref2) => {
  let {
    queryKey: [{ addressOrName, chainId, formatUnits, token }],
  } = _ref2;
  if (!addressOrName) throw new Error("address is required");
  return fetchBalanceCore({
    addressOrName,
    chainId,
    formatUnits,
    token,
  });
};

function useBalance() {
  let {
    addressOrName,
    cacheTime,
    chainId: chainId_,
    enabled = true,
    formatUnits,
    staleTime,
    suspense,
    token,
    watch,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  const balanceQuery = useQuery(
    queryKey$d({
      addressOrName,
      chainId,
      formatUnits,
      token,
    }),
    queryFn$d,
    {
      cacheTime,
      enabled: Boolean(enabled && addressOrName),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
  const { data: blockNumber } = useBlockNumber({
    chainId,
    watch,
  });
  React__namespace.useEffect(() => {
    if (!enabled) return;
    if (!watch) return;
    if (!blockNumber) return;
    if (!addressOrName) return;
    balanceQuery.refetch(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);
  return balanceQuery;
}

const mutationKey$6 = (args) => [
  {
    entity: "connect",
    ...args,
  },
];

const mutationFn$6 = (args) => {
  const { connector, chainId } = args;
  if (!connector) throw new Error("connector is required");
  return connectCore({
    connector,
    chainId,
  });
};

function useConnect() {
  let { chainId, connector, onError, onMutate, onSettled, onSuccess } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const client = useClient();
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(
    mutationKey$6({
      connector,
      chainId,
    }),
    mutationFn$6,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    }
  );
  const connect = React__namespace.useCallback(
    (args) => {
      return mutate({
        chainId:
          (args === null || args === void 0 ? void 0 : args.chainId) ?? chainId,
        connector:
          (args === null || args === void 0 ? void 0 : args.connector) ??
          connector,
      });
    },
    [chainId, connector, mutate]
  );
  const connectAsync = React__namespace.useCallback(
    (args) => {
      return mutateAsync({
        chainId:
          (args === null || args === void 0 ? void 0 : args.chainId) ?? chainId,
        connector:
          (args === null || args === void 0 ? void 0 : args.connector) ??
          connector,
      });
    },
    [chainId, connector, mutateAsync]
  );
  return {
    connect,
    connectAsync,
    connectors: client.connectors,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingConnector:
      variables === null || variables === void 0 ? void 0 : variables.connector,
    reset,
    status,
    variables,
  };
}

const mutationKey$5 = [
  {
    entity: "disconnect",
  },
];

const mutationFn$5 = () => disconnectCore();

function useDisconnect() {
  let { onError, onMutate, onSettled, onSuccess } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate: disconnect,
    mutateAsync: disconnectAsync,
    reset,
    status,
  } = useMutation(mutationKey$5, mutationFn$5, {
    ...(onError
      ? {
          onError(error, _variables, context) {
            onError(error, context);
          },
        }
      : {}),
    onMutate,
    ...(onSettled
      ? {
          onSettled(_data, error, _variables, context) {
            onSettled(error, context);
          },
        }
      : {}),
    ...(onSuccess
      ? {
          onSuccess(_data, _variables, context) {
            onSuccess(context);
          },
        }
      : {}),
  });
  return {
    disconnect,
    disconnectAsync,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
  };
}

function useNetwork() {
  return useSyncExternalStoreWithTracked(watchNetworkCore, getNetworkCore);
}

const queryKey$c = (_ref) => {
  let { chainId } = _ref;
  return [
    {
      entity: "signer",
      chainId,
      persist: false,
    },
  ];
};

const queryFn$c = (_ref2) => {
  let {
    queryKey: [{ chainId }],
  } = _ref2;
  return fetchSignerCore({
    chainId,
  });
};

function useSigner() {
  let { chainId: chainId_, suspense, onError, onSettled, onSuccess } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  const signerQuery = useQuery(
    queryKey$c({
      chainId,
    }),
    queryFn$c,
    {
      cacheTime: 0,
      staleTime: Infinity,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
  const queryClient = useQueryClient();
  React__namespace.useEffect(() => {
    const unwatch = watchSignerCore(
      {
        chainId,
      },
      (signer) =>
        queryClient.setQueryData(
          queryKey$c({
            chainId,
          }),
          signer
        )
    );
    return unwatch;
  }, [queryClient, chainId]);
  return signerQuery;
}

const mutationKey$4 = (args) => [
  {
    entity: "signMessage",
    ...args,
  },
];

const mutationFn$4 = (args) => {
  const { message } = args;
  if (!message) throw new Error("message is required");
  return signMessageCore({
    message,
  });
};

function useSignMessage() {
  let { message, onError, onMutate, onSettled, onSuccess } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(
    mutationKey$4({
      message,
    }),
    mutationFn$4,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    }
  );
  const signMessage = React__namespace.useCallback(
    (args) =>
      mutate(
        args || {
          message,
        }
      ),
    [message, mutate]
  );
  const signMessageAsync = React__namespace.useCallback(
    (args) =>
      mutateAsync(
        args || {
          message,
        }
      ),
    [message, mutateAsync]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    signMessage,
    signMessageAsync,
    status,
    variables,
  };
}

function mutationKey$3(_ref) {
  let { domain, types, value } = _ref;
  return [
    {
      entity: "signTypedData",
      domain,
      types,
      value,
    },
  ];
}

function mutationFn$3(args) {
  const { domain, types, value } = args;
  if (!domain) throw new Error("domain is required");
  if (!types) throw new Error("types is required");
  if (!value) throw new Error("value is required");
  return signTypedDataCore({
    domain,
    types,
    value,
  });
}

function useSignTypedData() {
  let { domain, types, value, onError, onMutate, onSettled, onSuccess } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(
    mutationKey$3({
      domain,
      types,
      value,
    }),
    mutationFn$3,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    }
  );
  const signTypedData = React__namespace.useCallback(
    (args) =>
      mutate({
        domain:
          (args === null || args === void 0 ? void 0 : args.domain) ?? domain,
        types:
          (args === null || args === void 0 ? void 0 : args.types) ?? types,
        value:
          (args === null || args === void 0 ? void 0 : args.value) ?? value,
      }),
    [domain, types, value, mutate]
  );
  const signTypedDataAsync = React__namespace.useCallback(
    (args) =>
      mutateAsync({
        domain:
          (args === null || args === void 0 ? void 0 : args.domain) ?? domain,
        types:
          (args === null || args === void 0 ? void 0 : args.types) ?? types,
        value:
          (args === null || args === void 0 ? void 0 : args.value) ?? value,
      }),
    [domain, types, value, mutateAsync]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    signTypedData,
    signTypedDataAsync,
    status,
    variables,
  };
}

const mutationKey$2 = (args) => [
  {
    entity: "switchNetwork",
    ...args,
  },
];

const mutationFn$2 = (args) => {
  const { chainId } = args;
  if (!chainId) throw new Error("chainId is required");
  return switchNetworkCore({
    chainId,
  });
};

function useSwitchNetwork() {
  var _client$connector;

  let {
    chainId,
    throwForSwitchChainNotSupported,
    onError,
    onMutate,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const client = useClient();
  const forceUpdate = useForceUpdate();
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(
    mutationKey$2({
      chainId,
    }),
    mutationFn$2,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    }
  );
  const switchNetwork_ = React__namespace.useCallback(
    (chainId_) =>
      mutate({
        chainId: chainId_ ?? chainId,
      }),
    [chainId, mutate]
  );
  const switchNetworkAsync_ = React__namespace.useCallback(
    (chainId_) =>
      mutateAsync({
        chainId: chainId_ ?? chainId,
      }),
    [chainId, mutateAsync]
  ); // Trigger update when connector changes since not all connectors support chain switching

  React__namespace.useEffect(() => {
    const unwatch = client.subscribe((_ref) => {
      let { chains, connector } = _ref;
      return {
        chains,
        connector,
      };
    }, forceUpdate);
    return unwatch;
  }, [client, forceUpdate]);
  let switchNetwork;
  let switchNetworkAsync;
  const supportsSwitchChain = !!(
    (_client$connector = client.connector) !== null &&
    _client$connector !== void 0 &&
    _client$connector.switchChain
  );

  if (throwForSwitchChainNotSupported || supportsSwitchChain) {
    switchNetwork = switchNetwork_;
    switchNetworkAsync = switchNetworkAsync_;
  }

  return {
    chains: client.chains ?? [],
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    pendingChainId:
      variables === null || variables === void 0 ? void 0 : variables.chainId,
    reset,
    status,
    switchNetwork,
    switchNetworkAsync,
    variables,
  };
}

function useContract() {
  let { address, abi, signerOrProvider } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return React__namespace.useMemo(() => {
    if (!address || !abi) return null;
    return getContractCore({
      address,
      abi,
      signerOrProvider:
        signerOrProvider === null ? undefined : signerOrProvider,
    });
  }, [address, abi, signerOrProvider]);
}

function useContractEvent() {
  let { address, chainId, abi, listener, eventName, once } =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const provider = useProvider({
    chainId,
  });
  const webSocketProvider = useWebSocketProvider({
    chainId,
  });
  const contract = useContract({
    address,
    // TODO: Remove cast and still support `Narrow<TAbi>`
    abi: abi,
    signerOrProvider: webSocketProvider ?? provider,
  });
  const callbackRef = React__namespace.useRef(listener);
  callbackRef.current = listener;
  React__namespace.useEffect(() => {
    if (!contract || !eventName) return;

    const handler = function () {
      return callbackRef.current(...arguments);
    };

    if (once) contract.once(eventName, handler);
    else contract.on(eventName, handler);
    return () => {
      contract.off(eventName, handler);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, eventName]);
}

function queryKey$b(_ref) {
  let { allowFailure, cacheKey, overrides } = _ref;
  return [
    {
      entity: "readContractsInfinite",
      allowFailure,
      cacheKey,
      overrides,
    },
  ];
}

function queryFn$b(_ref2) {
  let { contracts } = _ref2;
  return (_ref3) => {
    let {
      queryKey: [{ allowFailure, overrides }],
      pageParam,
    } = _ref3;
    return readContractsCore({
      allowFailure,
      contracts: contracts(pageParam || undefined),
      overrides,
    });
  };
}

function useContractInfiniteReads(_ref4) {
  let {
    allowFailure,
    cacheKey,
    cacheTime,
    contracts,
    enabled: enabled_ = true,
    getNextPageParam,
    isDataEqual = deepEqualCore,
    keepPreviousData,
    onError,
    onSettled,
    onSuccess,
    overrides,
    select,
    staleTime,
    suspense,
  } = _ref4;
  const queryKey_ = React__namespace.useMemo(
    () =>
      queryKey$b({
        allowFailure,
        cacheKey,
        overrides,
      }),
    [allowFailure, cacheKey, overrides]
  );
  const enabled = React__namespace.useMemo(() => {
    const enabled = Boolean(enabled_ && contracts);
    return enabled;
  }, [contracts, enabled_]);
  return useInfiniteQuery(
    queryKey_,
    queryFn$b({
      contracts,
    }),
    {
      cacheTime,
      enabled,
      getNextPageParam,
      isDataEqual,
      keepPreviousData,
      select,
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
} // TODO: Fix return type inference for `useContractInfiniteReads` when using `paginatedIndexesConfig`

function paginatedIndexesConfig(fn, _ref5) {
  let { perPage, start, direction } = _ref5;

  const contracts = function () {
    let page =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return [...Array(perPage).keys()]
      .map((index) => {
        return direction === "increment"
          ? start + index + page * perPage
          : start - index - page * perPage;
      })
      .filter((index) => index >= 0)
      .map(fn)
      .flat();
  };

  return {
    contracts,

    getNextPageParam(lastPage, pages) {
      return (lastPage === null || lastPage === void 0
        ? void 0
        : lastPage.length) === perPage
        ? pages.length
        : undefined;
    },
  };
}

function queryKey$a(_ref, _ref2) {
  let { address, args, chainId, functionName, overrides } = _ref;
  let { blockNumber } = _ref2;
  return [
    {
      entity: "readContract",
      address,
      args,
      blockNumber,
      chainId,
      functionName,
      overrides,
    },
  ];
}

function queryFn$a(_ref3) {
  let { abi } = _ref3;
  return async (_ref4) => {
    let {
      queryKey: [{ address, args, chainId, functionName, overrides }],
    } = _ref4;
    if (!abi) throw new Error("abi is required");
    if (!address) throw new Error("address is required");
    return (
      (await readContractCore({
        address,
        args,
        chainId,
        // TODO: Remove cast and still support `Narrow<TAbi>`
        abi: abi,
        functionName,
        overrides,
      })) ?? null
    );
  };
}

function useContractRead() {
  let {
    abi,
    address,
    functionName,
    args,
    chainId: chainId_,
    overrides,
    cacheOnBlock = false,
    cacheTime,
    enabled: enabled_ = true,
    isDataEqual = deepEqualCore,
    select,
    staleTime,
    suspense,
    watch,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  const { data: blockNumber } = useBlockNumber({
    chainId,
    enabled: watch || cacheOnBlock,
    watch,
  });
  const queryKey_ = React__namespace.useMemo(
    () =>
      queryKey$a(
        {
          address,
          args,
          chainId,
          functionName,
          overrides,
        },
        {
          blockNumber: cacheOnBlock ? blockNumber : undefined,
        }
      ),
    [address, args, blockNumber, cacheOnBlock, chainId, functionName, overrides]
  );
  const enabled = React__namespace.useMemo(() => {
    let enabled = Boolean(enabled_ && abi && address && functionName);
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber);
    return enabled;
  }, [abi, address, blockNumber, cacheOnBlock, enabled_, functionName]);
  useInvalidateOnBlock({
    chainId,
    enabled: watch && !cacheOnBlock,
    queryKey: queryKey_,
  });
  return useQuery(
    queryKey_,
    queryFn$a({
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi,
    }),
    {
      cacheTime,
      enabled,
      isDataEqual,

      select(data) {
        const result =
          abi && functionName
            ? parseContractResultCore({
                // TODO: Remove cast and still support `Narrow<TAbi>`
                abi: abi,
                data,
                functionName,
              })
            : data;
        return select ? select(result) : result;
      },

      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
}

function queryKey$9(_ref, _ref2) {
  let { allowFailure, contracts, overrides } = _ref;
  let { blockNumber, chainId } = _ref2;
  return [
    {
      entity: "readContracts",
      allowFailure,
      blockNumber,
      chainId,
      contracts: (contracts ?? []).map((_ref3) => {
        let { address, args, chainId, functionName } = _ref3;
        return {
          address,
          args,
          chainId,
          functionName,
        };
      }),
      overrides,
    },
  ];
}

function queryFn$9(_ref4) {
  let { abis } = _ref4;
  return (_ref5) => {
    let {
      queryKey: [{ allowFailure, contracts: contracts_, overrides }],
    } = _ref5;
    const contracts = contracts_.map((contract, i) => ({
      ...contract,
      abi: abis[i],
    }));
    return readContractsCore({
      allowFailure,
      contracts,
      overrides,
    });
  };
}

function useContractReads() {
  let {
    allowFailure = true,
    cacheOnBlock = false,
    cacheTime,
    contracts,
    overrides,
    enabled: enabled_ = true,
    isDataEqual = deepEqualCore,
    keepPreviousData,
    onError,
    onSettled,
    onSuccess,
    select,
    staleTime,
    suspense,
    watch,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const { data: blockNumber } = useBlockNumber({
    enabled: watch || cacheOnBlock,
    watch,
  });
  const chainId = useChainId();
  const queryKey_ = React__namespace.useMemo(
    () =>
      queryKey$9(
        {
          allowFailure,
          contracts,
          overrides,
        },
        {
          blockNumber: cacheOnBlock ? blockNumber : undefined,
          chainId,
        }
      ),
    [allowFailure, blockNumber, cacheOnBlock, chainId, contracts, overrides]
  );
  const enabled = React__namespace.useMemo(() => {
    let enabled = Boolean(
      enabled_ &&
        (contracts === null || contracts === void 0
          ? void 0
          : contracts.every((x) => x.abi && x.address && x.functionName))
    );
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber);
    return enabled;
  }, [blockNumber, cacheOnBlock, contracts, enabled_]);
  useInvalidateOnBlock({
    enabled: watch && !cacheOnBlock,
    queryKey: queryKey_,
  });
  const abis = (contracts ?? []).map((_ref6) => {
    let { abi } = _ref6;
    return abi;
  });
  return useQuery(
    queryKey_,
    queryFn$9({
      abis,
    }),
    {
      cacheTime,
      enabled,
      isDataEqual,
      keepPreviousData,
      staleTime,

      select(data) {
        const result = data.map((data, i) => {
          const { abi, functionName } =
            (contracts === null || contracts === void 0
              ? void 0
              : contracts[i]) ?? {};
          return abi && functionName
            ? parseContractResultCore({
                abi,
                functionName,
                data,
              })
            : data;
        });
        return select ? select(result) : result;
      },

      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
}

function mutationKey$1(_ref) {
  let { address, args, chainId, abi, functionName, overrides, request } = _ref;
  return [
    {
      entity: "writeContract",
      address,
      args,
      chainId,
      abi,
      functionName,
      overrides,
      request,
    },
  ];
}

function mutationFn$1(_ref2) {
  let {
    address,
    args,
    chainId,
    abi,
    functionName,
    mode,
    overrides,
    request,
  } = _ref2;
  if (!address) throw new Error("address is required");
  if (!abi) throw new Error("abi is required");
  if (!functionName) throw new Error("functionName is required");

  switch (mode) {
    case "prepared": {
      if (!request) throw new Error("request is required");
      return writeContractCore({
        mode: "prepared",
        address,
        chainId,
        abi,
        functionName,
        request,
      });
    }

    case "recklesslyUnprepared":
      return writeContractCore({
        address,
        abi,
        functionName,
        args,
        chainId,
        mode: "recklesslyUnprepared",
        overrides,
      });
  }
}
/**
 * @description Hook for calling an ethers Contract [write](https://docs.ethers.io/v5/api/contract/contract/#Contract--write)
 * method.
 *
 * It is highly recommended to pair this with the [`usePrepareContractWrite` hook](/docs/prepare-hooks/usePrepareContractWrite)
 * to [avoid UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 *
 * const { config } = usePrepareContractWrite({
 *  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  abi: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */

function useContractWrite() {
  let {
    address,
    args,
    chainId,
    abi,
    functionName,
    mode,
    overrides,
    request,
    onError,
    onMutate,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(
    mutationKey$1({
      address,
      abi,
      functionName,
      args,
      chainId,
      mode,
      overrides,
      request,
    }),
    mutationFn$1,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    }
  );
  const write = React__namespace.useCallback(
    (overrideConfig) => {
      return mutate({
        address,
        args:
          (overrideConfig === null || overrideConfig === void 0
            ? void 0
            : overrideConfig.recklesslySetUnpreparedArgs) ?? args,
        chainId,
        abi,
        functionName,
        mode: overrideConfig ? "recklesslyUnprepared" : mode,
        overrides:
          (overrideConfig === null || overrideConfig === void 0
            ? void 0
            : overrideConfig.recklesslySetUnpreparedOverrides) ?? overrides,
        request,
      });
    },
    [
      address,
      args,
      chainId,
      abi,
      functionName,
      mode,
      mutate,
      overrides,
      request,
    ]
  );
  const writeAsync = React__namespace.useCallback(
    (overrideConfig) => {
      return mutateAsync({
        address,
        args:
          (overrideConfig === null || overrideConfig === void 0
            ? void 0
            : overrideConfig.recklesslySetUnpreparedArgs) ?? args,
        chainId,
        abi,
        functionName,
        mode: overrideConfig ? "recklesslyUnprepared" : mode,
        overrides:
          (overrideConfig === null || overrideConfig === void 0
            ? void 0
            : overrideConfig.recklesslySetUnpreparedOverrides) ?? overrides,
        request,
      });
    },
    [
      address,
      args,
      chainId,
      abi,
      functionName,
      mode,
      mutateAsync,
      overrides,
      request,
    ]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables,
    write: mode === "prepared" && !request ? undefined : write,
    writeAsync: mode === "prepared" && !request ? undefined : writeAsync,
  };
}

function queryKey$8(_ref, _ref2) {
  let { args, address, chainId, functionName, overrides } = _ref;
  let { activeChainId, signerAddress } = _ref2;
  return [
    {
      entity: "prepareContractTransaction",
      activeChainId,
      address,
      args,
      chainId,
      functionName,
      overrides,
      signerAddress,
    },
  ];
}

function queryFn$8(_ref3) {
  let { abi, signer } = _ref3;
  return (_ref4) => {
    let {
      queryKey: [{ args, address, chainId, functionName, overrides }],
    } = _ref4;
    if (!abi) throw new Error("abi is required");
    return prepareWriteContractCore({
      args,
      address,
      chainId,
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi,
      functionName,
      overrides,
      signer,
    });
  };
}
/**
 * @description Hook for preparing a contract write to be sent via [`useContractWrite`](/docs/hooks/useContractWrite).
 *
 * Eagerly fetches the parameters required for sending a contract write transaction such as the gas estimate.
 *
 * @example
 * import { useContractWrite, usePrepareContractWrite } from 'wagmi'
 *
 * const { config } = usePrepareContractWrite({
 *  address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
 *  abi: wagmigotchiABI,
 *  functionName: 'feed',
 * })
 * const { data, isLoading, isSuccess, write } = useContractWrite(config)
 *
 */

function usePrepareContractWrite() {
  let {
    address,
    abi,
    functionName,
    chainId,
    args,
    overrides,
    cacheTime,
    enabled = true,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const activeChainId = useChainId();
  const { data: signer } = useSigner({
    chainId: chainId ?? activeChainId,
  });
  const prepareContractWriteQuery = useQuery(
    queryKey$8(
      {
        address,
        functionName,
        chainId,
        args,
        overrides,
      },
      {
        activeChainId,
        signerAddress:
          signer === null || signer === void 0 ? void 0 : signer._address,
      }
    ),
    queryFn$8({
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi,
      signer,
    }),
    {
      cacheTime,
      enabled: Boolean(enabled && abi && address && functionName && signer),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
  return Object.assign(prepareContractWriteQuery, {
    config: {
      abi,
      address,
      args,
      functionName,
      mode: "prepared",
      overrides,
      request: undefined,
      ...prepareContractWriteQuery.data,
    },
  });
}

const queryKey$7 = (_ref) => {
  let { address, chainId, formatUnits } = _ref;
  return [
    {
      entity: "token",
      address,
      chainId,
      formatUnits,
    },
  ];
};

const queryFn$7 = (_ref2) => {
  let {
    queryKey: [{ address, chainId, formatUnits }],
  } = _ref2;
  if (!address) throw new Error("address is required");
  return fetchTokenCore({
    address,
    chainId,
    formatUnits,
  });
};

function useToken() {
  let {
    address,
    chainId: chainId_,
    formatUnits = "ether",
    cacheTime,
    enabled = true,
    staleTime = 1_000 * 60 * 60 * 24,
    // 24 hours
    suspense,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  return useQuery(
    queryKey$7({
      address,
      chainId,
      formatUnits,
    }),
    queryFn$7,
    {
      cacheTime,
      enabled: Boolean(enabled && address),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
}

const queryKey$6 = (_ref) => {
  let { chainId, name } = _ref;
  return [
    {
      entity: "ensAddress",
      chainId,
      name,
    },
  ];
};

const queryFn$6 = (_ref2) => {
  let {
    queryKey: [{ chainId, name }],
  } = _ref2;
  if (!name) throw new Error("name is required");
  return fetchEnsAddressCore({
    chainId,
    name,
  });
};

function useEnsAddress() {
  let {
    cacheTime,
    chainId: chainId_,
    enabled = true,
    name,
    staleTime = 1_000 * 60 * 60 * 24,
    // 24 hours
    suspense,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  return useQuery(
    queryKey$6({
      chainId,
      name,
    }),
    queryFn$6,
    {
      cacheTime,
      enabled: Boolean(enabled && chainId && name),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
}

const queryKey$5 = (_ref) => {
  let { addressOrName, chainId } = _ref;
  return [
    {
      entity: "ensAvatar",
      addressOrName,
      chainId,
    },
  ];
};

const queryFn$5 = (_ref2) => {
  let {
    queryKey: [{ addressOrName, chainId }],
  } = _ref2;
  if (!addressOrName) throw new Error("addressOrName is required");
  return fetchEnsAvatarCore({
    addressOrName,
    chainId,
  });
};

function useEnsAvatar() {
  let {
    addressOrName,
    cacheTime,
    chainId: chainId_,
    enabled = true,
    staleTime = 1_000 * 60 * 60 * 24,
    // 24 hours
    suspense,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  return useQuery(
    queryKey$5({
      addressOrName,
      chainId,
    }),
    queryFn$5,
    {
      cacheTime,
      enabled: Boolean(enabled && addressOrName && chainId),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
}

const queryKey$4 = (_ref) => {
  let { address, chainId } = _ref;
  return [
    {
      entity: "ensName",
      address,
      chainId,
    },
  ];
};

const queryFn$4 = (_ref2) => {
  let {
    queryKey: [{ address, chainId }],
  } = _ref2;
  if (!address) throw new Error("address is required");
  return fetchEnsNameCore({
    address,
    chainId,
  });
};

function useEnsName() {
  let {
    address,
    cacheTime,
    chainId: chainId_,
    enabled = true,
    staleTime = 1_000 * 60 * 60 * 24,
    // 24 hours
    suspense,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  return useQuery(
    queryKey$4({
      address,
      chainId,
    }),
    queryFn$4,
    {
      cacheTime,
      enabled: Boolean(enabled && address && chainId),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
}

const queryKey$3 = (_ref) => {
  let { chainId, name } = _ref;
  return [
    {
      entity: "ensResolver",
      chainId,
      name,
    },
  ];
};

const queryFn$3 = (_ref2) => {
  let {
    queryKey: [{ chainId, name }],
  } = _ref2;
  if (!name) throw new Error("name is required");
  return fetchEnsResolverCore({
    chainId,
    name,
  });
};

function useEnsResolver() {
  let {
    cacheTime,
    chainId: chainId_,
    enabled = true,
    name,
    staleTime = 1_000 * 60 * 60 * 24,
    // 24 hours
    suspense,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  return useQuery(
    queryKey$3({
      chainId,
      name,
    }),
    queryFn$3,
    {
      cacheTime,
      enabled: Boolean(enabled && chainId && name),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
}

function queryKey$2(_ref, _ref2) {
  let { chainId, request } = _ref;
  let { activeChainId, signerAddress } = _ref2;
  return [
    {
      entity: "prepareSendTransaction",
      activeChainId,
      chainId,
      request,
      signerAddress,
    },
  ];
}

function queryFn$2(_ref3) {
  let { signer } = _ref3;
  return (_ref4) => {
    let {
      queryKey: [{ chainId, request }],
    } = _ref4;
    if (!(request !== null && request !== void 0 && request.to))
      throw new Error("request.to is required");
    return prepareSendTransactionCore({
      chainId,
      request: { ...request, to: request.to },
      signer,
    });
  };
}
/**
 * @description Hook for preparing a transaction to be sent via [`useSendTransaction`](/docs/hooks/useSendTransaction).
 *
 * Eagerly fetches the parameters required for sending a transaction such as the gas estimate and resolving an ENS address (if required).
 *
 * @example
 * import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
 *
 * const config = usePrepareSendTransaction({
 *   to: 'moxey.eth',
 *   value: parseEther('1'),
 * })
 * const result = useSendTransaction(config)
 */

function usePrepareSendTransaction() {
  let {
    chainId,
    request,
    cacheTime,
    enabled = true,
    staleTime = 1_000 * 60 * 60 * 24,
    // 24 hours
    suspense,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const activeChainId = useChainId();
  const { data: signer } = useSigner({
    chainId: chainId ?? activeChainId,
  });
  const prepareSendTransactionQuery = useQuery(
    queryKey$2(
      {
        request,
        chainId,
      },
      {
        activeChainId,
        signerAddress:
          signer === null || signer === void 0 ? void 0 : signer._address,
      }
    ),
    queryFn$2({
      signer,
    }),
    {
      cacheTime,
      enabled: Boolean(enabled && signer && request && request.to),
      isDataEqual: deepEqualCore,
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
  return Object.assign(prepareSendTransactionQuery, {
    config: {
      request: undefined,
      mode: "prepared",
      ...prepareSendTransactionQuery.data,
    },
  });
}

const mutationKey = (args) => [
  {
    entity: "sendTransaction",
    ...args,
  },
];

const mutationFn = (_ref) => {
  let { chainId, mode, request } = _ref;
  return sendTransactionCore({
    chainId,
    mode,
    request,
  });
};
/**
 * @description Hook for sending a transaction.
 *
 * It is recommended to pair this with the [`usePrepareSendTransaction` hook](/docs/prepare-hooks/usePrepareSendTransaction)
 * to [avoid UX pitfalls](https://wagmi.sh/docs/prepare-hooks/intro#ux-pitfalls-without-prepare-hooks).
 *
 * @example
 * import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
 *
 * const config = usePrepareSendTransaction({
 *   request: {
 *     to: 'moxey.eth',
 *     value: parseEther('1'),
 *   }
 * })
 * const result = useSendTransaction(config)
 */

function useSendTransaction(_ref2) {
  let {
    chainId,
    mode,
    request,
    onError,
    onMutate,
    onSettled,
    onSuccess,
  } = _ref2;
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
    variables,
  } = useMutation(
    mutationKey({
      chainId,
      mode,
      request,
    }),
    mutationFn,
    {
      onError,
      onMutate,
      onSettled,
      onSuccess,
    }
  );
  const sendTransaction = React__namespace.useCallback(
    (args) =>
      mutate({
        chainId,
        mode,
        request:
          (args === null || args === void 0
            ? void 0
            : args.recklesslySetUnpreparedRequest) ?? request,
      }),
    [chainId, mode, mutate, request]
  );
  const sendTransactionAsync = React__namespace.useCallback(
    (args) =>
      mutateAsync({
        chainId,
        mode,
        request:
          (args === null || args === void 0
            ? void 0
            : args.recklesslySetUnpreparedRequest) ?? request,
      }),
    [chainId, mode, mutateAsync, request]
  );
  return {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    sendTransaction:
      mode === "prepared" && !request ? undefined : sendTransaction,
    sendTransactionAsync:
      mode === "prepared" && !request ? undefined : sendTransactionAsync,
    status,
    variables,
  };
}

const queryKey$1 = (_ref) => {
  let { chainId, hash } = _ref;
  return [
    {
      entity: "transaction",
      chainId,
      hash,
    },
  ];
};

const queryFn$1 = (_ref2) => {
  let {
    queryKey: [{ chainId, hash }],
  } = _ref2;
  if (!hash) throw new Error("hash is required");
  return fetchTransactionCore({
    chainId,
    hash,
  });
};
/**
 * @description Fetches transaction for hash
 *
 * @example
 * import { useTransaction } from 'wagmi'
 *
 * const result = useTransaction({
 *  chainId: 1,
 *  hash: '0x...',
 * })
 */

function useTransaction() {
  let {
    cacheTime = 0,
    chainId: chainId_,
    enabled = true,
    hash,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  return useQuery(
    queryKey$1({
      chainId,
      hash,
    }),
    queryFn$1,
    {
      cacheTime,
      enabled: Boolean(enabled && hash),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
}

const queryKey = (_ref) => {
  let { confirmations, chainId, hash, timeout, wait } = _ref;
  return [
    {
      entity: "waitForTransaction",
      confirmations,
      chainId,
      hash,
      timeout,
      wait,
    },
  ];
};

const queryFn = (_ref2) => {
  let {
    queryKey: [{ chainId, confirmations, hash, timeout, wait }],
  } = _ref2;
  return waitForTransactionCore({
    chainId,
    confirmations,
    hash,
    timeout,
    wait,
  });
};

function useWaitForTransaction() {
  let {
    chainId: chainId_,
    confirmations,
    hash,
    timeout,
    wait,
    cacheTime,
    enabled = true,
    staleTime,
    suspense,
    onError,
    onSettled,
    onSuccess,
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const chainId = useChainId({
    chainId: chainId_,
  });
  return useQuery(
    queryKey({
      chainId,
      confirmations,
      hash,
      timeout,
      wait,
    }),
    queryFn,
    {
      cacheTime,
      enabled: Boolean(enabled && (hash || wait)),
      staleTime,
      suspense,
      onError,
      onSettled,
      onSuccess,
    }
  );
}

// Object.defineProperty(exports, 'AddChainError', {
//   enumerable: true,
//   get: function () { return core.AddChainError; }
// });
// Object.defineProperty(exports, 'ChainDoesNotSupportMulticallError', {
//   enumerable: true,
//   get: function () { return core.ChainDoesNotSupportMulticallError; }
// });
// Object.defineProperty(exports, 'ChainMismatchError', {
//   enumerable: true,
//   get: function () { return core.ChainMismatchError; }
// });
// Object.defineProperty(exports, 'ChainNotConfiguredError', {
//   enumerable: true,
//   get: function () { return core.ChainNotConfiguredError; }
// });
// Object.defineProperty(exports, "Client", {
//   enumerable: true,
//   get: function () {
//     return core.Client;
//   },
// });

exports.Client = ClientCore;

// Object.defineProperty(exports, 'Connector', {
//   enumerable: true,
//   get: function () { return core.Connector; }
// });
// Object.defineProperty(exports, 'ConnectorAlreadyConnectedError', {
//   enumerable: true,
//   get: function () { return core.ConnectorAlreadyConnectedError; }
// });
// Object.defineProperty(exports, 'ConnectorNotFoundError', {
//   enumerable: true,
//   get: function () { return core.ConnectorNotFoundError; }
// });
// Object.defineProperty(exports, 'ContractMethodDoesNotExistError', {
//   enumerable: true,
//   get: function () { return core.ContractMethodDoesNotExistError; }
// });
// Object.defineProperty(exports, 'ContractMethodNoResultError', {
//   enumerable: true,
//   get: function () { return core.ContractMethodNoResultError; }
// });
// Object.defineProperty(exports, 'ContractMethodRevertedError', {
//   enumerable: true,
//   get: function () { return core.ContractMethodRevertedError; }
// });
// Object.defineProperty(exports, 'ContractResultDecodeError', {
//   enumerable: true,
//   get: function () { return core.ContractResultDecodeError; }
// });
// Object.defineProperty(exports, 'ProviderChainsNotFound', {
//   enumerable: true,
//   get: function () { return core.ProviderChainsNotFound; }
// });
// Object.defineProperty(exports, 'ProviderRpcError', {
//   enumerable: true,
//   get: function () { return core.ProviderRpcError; }
// });
// Object.defineProperty(exports, 'ResourceUnavailableError', {
//   enumerable: true,
//   get: function () { return core.ResourceUnavailableError; }
// });
// Object.defineProperty(exports, 'RpcError', {
//   enumerable: true,
//   get: function () { return core.RpcError; }
// });
// Object.defineProperty(exports, 'SwitchChainError', {
//   enumerable: true,
//   get: function () { return core.SwitchChainError; }
// });
// Object.defineProperty(exports, 'SwitchChainNotSupportedError', {
//   enumerable: true,
//   get: function () { return core.SwitchChainNotSupportedError; }
// });
// Object.defineProperty(exports, 'UserRejectedRequestError', {
//   enumerable: true,
//   get: function () { return core.UserRejectedRequestError; }
// });
// Object.defineProperty(exports, 'alchemyRpcUrls', {
//   enumerable: true,
//   get: function () { return core.alchemyRpcUrls; }
// });
// Object.defineProperty(exports, 'allChains', {
//   enumerable: true,
//   get: function () { return core.allChains; }
// });
// Object.defineProperty(exports, 'chain', {
//   enumerable: true,
//   get: function () { return core.chain; }
// });
// Object.defineProperty(exports, 'chainId', {
//   enumerable: true,
//   get: function () { return core.chainId; }
// });
// Object.defineProperty(exports, 'configureChains', {
//   enumerable: true,
//   get: function () { return core.configureChains; }
// });
// Object.defineProperty(exports, 'createStorage', {
//   enumerable: true,
//   get: function () { return core.createStorage; }
// });
// Object.defineProperty(exports, 'deepEqual', {
//   enumerable: true,
//   get: function () { return core.deepEqual; }
// });
// Object.defineProperty(exports, 'defaultChains', {
//   enumerable: true,
//   get: function () { return core.defaultChains; }
// });
// Object.defineProperty(exports, 'defaultL2Chains', {
//   enumerable: true,
//   get: function () { return core.defaultL2Chains; }
// });
// Object.defineProperty(exports, 'erc20ABI', {
//   enumerable: true,
//   get: function () { return core.erc20ABI; }
// });
// Object.defineProperty(exports, 'erc721ABI', {
//   enumerable: true,
//   get: function () { return core.erc721ABI; }
// });
// Object.defineProperty(exports, 'etherscanBlockExplorers', {
//   enumerable: true,
//   get: function () { return core.etherscanBlockExplorers; }
// });
// Object.defineProperty(exports, 'infuraRpcUrls', {
//   enumerable: true,
//   get: function () { return core.infuraRpcUrls; }
// });
// Object.defineProperty(exports, 'publicRpcUrls', {
//   enumerable: true,
//   get: function () { return core.publicRpcUrls; }
// });
// Object.defineProperty(exports, 'readContracts', {
//   enumerable: true,
//   get: function () { return core.readContracts; }
// });
exports.Context = Context;
exports.WagmiConfig = WagmiConfig;
exports.createClient = createClient;
exports.deserialize = deserialize;
exports.paginatedIndexesConfig = paginatedIndexesConfig;
exports.serialize = serialize;
exports.useAccount = useAccount;
exports.useBalance = useBalance;
exports.useBlockNumber = useBlockNumber;
exports.useClient = useClient;
exports.useConnect = useConnect;
exports.useContract = useContract;
exports.useContractEvent = useContractEvent;
exports.useContractInfiniteReads = useContractInfiniteReads;
exports.useContractRead = useContractRead;
exports.useContractReads = useContractReads;
exports.useContractWrite = useContractWrite;
exports.useDisconnect = useDisconnect;
exports.useEnsAddress = useEnsAddress;
exports.useEnsAvatar = useEnsAvatar;
exports.useEnsName = useEnsName;
exports.useEnsResolver = useEnsResolver;
exports.useFeeData = useFeeData;
exports.useInfiniteQuery = useInfiniteQuery;
exports.useMutation = useMutation;
exports.useNetwork = useNetwork;
exports.usePrepareContractWrite = usePrepareContractWrite;
exports.usePrepareSendTransaction = usePrepareSendTransaction;
exports.useProvider = useProvider;
exports.useQuery = useQuery;
exports.useQueryClient = useQueryClient;
exports.useSendTransaction = useSendTransaction;
exports.useSignMessage = useSignMessage;
exports.useSignTypedData = useSignTypedData;
exports.useSigner = useSigner;
exports.useSwitchNetwork = useSwitchNetwork;
exports.useToken = useToken;
exports.useTransaction = useTransaction;
exports.useWaitForTransaction = useWaitForTransaction;
exports.useWebSocketProvider = useWebSocketProvider;

export default exports;
