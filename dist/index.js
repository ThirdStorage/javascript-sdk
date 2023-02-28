import { Buffer } from 'buffer';
import retry from 'async-retry';
import axios from 'axios';
import { SiweMessage } from 'siwe';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClientProvider, QueryClient, parseMutationArgs, useMutation as useMutation$1, useQueryClient as useQueryClient$1, useIsRestoring, useQueryErrorResetBoundary, notifyManager, InfiniteQueryObserver, QueryObserver } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { Client, createClient as createClient$1, watchProvider, getProvider, watchWebSocketProvider, watchSigner, getContract, deepEqual, getAccount, watchAccount, connect, disconnect, getNetwork, watchNetwork, signMessage, signTypedData, switchNetwork, readContracts, parseContractResult, writeContract, prepareWriteContract, prepareSendTransaction, sendTransaction, fetchBlockNumber, fetchFeeData, fetchBalance, fetchSigner, readContract, fetchToken, fetchEnsAddress, fetchEnsAvatar, fetchEnsName, fetchEnsResolver, fetchTransaction, waitForTransaction } from '@wagmi/core';
import { BigNumber } from 'ethers';
import React, { useState } from 'react';
import pkg from 'use-sync-external-store/shim/index.js';
import withSelector_js from 'use-sync-external-store/shim/with-selector.js';
import { debounce } from '@wagmi/core/internal';
import { configureChains } from 'wagmi';
import { walletConnectProvider, modalConnectors, EthereumClient } from '@web3modal/ethereum';
import { mainnet } from 'wagmi/chains';
import { ArcanaConnector } from '@arcana/auth-wagmi';
import { publicProvider } from 'wagmi/providers/public';

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

//@ts-nocheck
// @ts-ignore
const Context$1 = React.createContext(undefined);
const queryClientContext$1 = React.createContext(undefined);
function AuthWrapper(props) {
    const { children, appName = "Third Storage", walletConnectProjectId = null, arcanaAppId = null, } = props;
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
    new EthereumClient(client, chains);
    return (React.createElement("div", null,
        React.createElement(WagmiConfig, { client: client }, React.createElement(Context$1.Provider, {
            children: React.createElement(QueryClientProvider, {
                children,
                client: client.queryClient,
                context: queryClientContext$1,
            }),
            value: client,
        }))));
}

var _excluded = ["queryClient", "persister"];
var exports = new Object();
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== "default") {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function get() {
            return e[k];
          }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var pkg__namespace = /*#__PURE__*/_interopNamespace(pkg);
var findAndReplace = function findAndReplace(cacheRef, _ref) {
  var find = _ref.find,
    replace = _ref.replace;
  if (cacheRef && find(cacheRef)) {
    return replace(cacheRef);
  }
  if (_typeof(cacheRef) !== "object") {
    return cacheRef;
  }
  if (Array.isArray(cacheRef)) {
    return cacheRef.map(function (item) {
      return findAndReplace(item, {
        find: find,
        replace: replace
      });
    });
  }
  if (cacheRef instanceof Object) {
    return Object.entries(cacheRef).reduce(function (curr, _ref2) {
      var _ref7 = _slicedToArray(_ref2, 2),
        key = _ref7[0],
        value = _ref7[1];
      return _objectSpread2(_objectSpread2({}, curr), {}, _defineProperty({}, key, findAndReplace(value, {
        find: find,
        replace: replace
      })));
    }, {});
  }
  return cacheRef;
};
function deserialize(cachedString) {
  var cache = JSON.parse(cachedString);
  var deserializedCacheWithBigNumbers = findAndReplace(cache, {
    find: function find(data) {
      return data.type === "BigNumber";
    },
    replace: function replace(data) {
      return BigNumber.from(data.hex);
    }
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
  var length = array.length;
  for (var index = 0; index < length; ++index) {
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
  var hasReplacer = typeof replacer === "function";
  var hasCircularReplacer = typeof circularReplacer === "function";
  var cache = [];
  var keys = [];
  return function replace(key, value) {
    if (_typeof(value) === "object") {
      if (cache.length) {
        var thisCutoff = getCutoff(cache, this);
        if (thisCutoff === 0) {
          cache[cache.length] = this;
        } else {
          cache.splice(thisCutoff);
          keys.splice(thisCutoff);
        }
        keys[keys.length] = key;
        var valueCutoff = getCutoff(cache, value);
        if (valueCutoff !== 0) {
          return hasCircularReplacer ? circularReplacer.call(this, key, value, getReferenceKey(keys, valueCutoff)) : "[ref=".concat(getReferenceKey(keys, valueCutoff), "]");
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
  return JSON.stringify(value, createReplacer(replacer, circularReplacer), indent !== null && indent !== void 0 ? indent : undefined);
}
function createClient(_ref) {
  var _ref$queryClient = _ref.queryClient,
    queryClient = _ref$queryClient === void 0 ? new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1000 * 60 * 60 * 24,
          // 24 hours
          networkMode: "offlineFirst",
          refetchOnWindowFocus: false,
          retry: 0
        },
        mutations: {
          networkMode: "offlineFirst"
        }
      }
    }) : _ref$queryClient,
    _ref$persister = _ref.persister,
    persister = _ref$persister === void 0 ? typeof window !== "undefined" ? createSyncStoragePersister({
      key: "wagmi.cache",
      storage: window.localStorage,
      serialize: serialize,
      deserialize: deserialize
    }) : undefined : _ref$persister,
    config = _objectWithoutProperties(_ref, _excluded);
  var client = createClient$1(config);
  if (persister) persistQueryClient({
    queryClient: queryClient,
    persister: persister,
    dehydrateOptions: {
      shouldDehydrateQuery: function shouldDehydrateQuery(query) {
        return query.cacheTime !== 0 &&
        // Note: adding a `persist` flag to a query key will instruct the
        // persister whether or not to persist the response of the query.
        query.queryKey[0].persist !== false;
      }
    }
  });
  return Object.assign(client, {
    queryClient: queryClient
  });
}
var Context = /*#__PURE__*/React__namespace.createContext(undefined);
var queryClientContext = /*#__PURE__*/React__namespace.createContext(undefined);
function WagmiConfig(_ref) {
  var children = _ref.children,
    client = _ref.client;
  return /*#__PURE__*/React__namespace.createElement(Context.Provider, {
    value: client
  }, /*#__PURE__*/React__namespace.createElement(QueryClientProvider, {
    client: client.queryClient,
    context: queryClientContext
  }, children));
}
function useClient() {
  var client = React__namespace.useContext(Context$1);
  if (!client) throw new Error(["`useClient` must be used within `WagmiConfig`.\n", "Read more: https://wagmi.sh/docs/WagmiConfig"].join("\n"));
  return client;
}
var useSyncExternalStore = pkg__namespace.useSyncExternalStore;
function isQueryKey(value) {
  return Array.isArray(value);
}
function parseQueryArgs(arg1, arg2, arg3) {
  if (!isQueryKey(arg1)) {
    return arg1;
  }
  if (typeof arg2 === "function") {
    return _objectSpread2(_objectSpread2({}, arg3), {}, {
      queryKey: arg1,
      queryFn: arg2
    });
  }
  return _objectSpread2(_objectSpread2({}, arg2), {}, {
    queryKey: arg1
  });
}
function shouldThrowError(_useErrorBoundary, params) {
  // Allow useErrorBoundary function to override throwing behavior on a per-error basis
  if (typeof _useErrorBoundary === "function") {
    return _useErrorBoundary.apply(void 0, _toConsumableArray(params));
  }
  return !!_useErrorBoundary;
}
function trackResult(result, observer) {
  var trackedResult = {};
  Object.keys(result).forEach(function (key) {
    Object.defineProperty(trackedResult, key, {
      configurable: false,
      enumerable: true,
      get: function get() {
        // @ts-expect-error – aware we are mutating private `trackedProps` property.
        observer.trackedProps.add(key);
        return result[key];
      }
    });
  });
  return trackedResult;
}
function useBaseQuery(options, Observer) {
  var queryClient = useQueryClient$1({
    context: options.context
  });
  var isRestoring = useIsRestoring();
  var errorResetBoundary = useQueryErrorResetBoundary();
  var defaultedOptions = queryClient.defaultQueryOptions(options); // Make sure results are optimistically set in fetching state before subscribing or updating options

  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic"; // Include callbacks in batch renders

  if (defaultedOptions.onError) {
    defaultedOptions.onError = notifyManager.batchCalls(defaultedOptions.onError);
  }
  if (defaultedOptions.onSuccess) {
    defaultedOptions.onSuccess = notifyManager.batchCalls(defaultedOptions.onSuccess);
  }
  if (defaultedOptions.onSettled) {
    defaultedOptions.onSettled = notifyManager.batchCalls(defaultedOptions.onSettled);
  }
  if (defaultedOptions.suspense) {
    // Always set stale time when using suspense to prevent
    // fetching again when directly mounting after suspending
    if (typeof defaultedOptions.staleTime !== "number") {
      defaultedOptions.staleTime = 1000;
    }
  }
  if (defaultedOptions.suspense || defaultedOptions.useErrorBoundary) {
    // Prevent retrying failed query if the error boundary has not been reset yet
    if (!errorResetBoundary.isReset()) {
      defaultedOptions.retryOnMount = false;
    }
  }
  var _React__namespace$use = React__namespace.useState(function () {
      return new Observer(queryClient, defaultedOptions);
    }),
    _React__namespace$use2 = _slicedToArray(_React__namespace$use, 1),
    observer = _React__namespace$use2[0];
  var result = observer.getOptimisticResult(defaultedOptions);
  useSyncExternalStore(React__namespace.useCallback(function (onStoreChange) {
    return isRestoring ? function () {
      return undefined;
    } : observer.subscribe(notifyManager.batchCalls(onStoreChange));
  }, [observer, isRestoring]), function () {
    return observer.getCurrentResult();
  }, function () {
    return observer.getCurrentResult();
  });
  React__namespace.useEffect(function () {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
  React__namespace.useEffect(function () {
    // Do not notify on updates because of changes in the options because
    // these changes should already be reflected in the optimistic result.
    observer.setOptions(defaultedOptions, {
      listeners: false
    });
  }, [defaultedOptions, observer]); // Handle suspense

  if (defaultedOptions.suspense && result.isLoading && result.isFetching && !isRestoring) {
    throw observer.fetchOptimistic(defaultedOptions).then(function (_ref) {
      var _defaultedOptions$onS, _defaultedOptions$onS2;
      var data = _ref.data;
      (_defaultedOptions$onS = defaultedOptions.onSuccess) === null || _defaultedOptions$onS === void 0 ? void 0 : _defaultedOptions$onS.call(defaultedOptions, data);
      (_defaultedOptions$onS2 = defaultedOptions.onSettled) === null || _defaultedOptions$onS2 === void 0 ? void 0 : _defaultedOptions$onS2.call(defaultedOptions, data, null);
    })["catch"](function (error) {
      var _defaultedOptions$onE, _defaultedOptions$onS3;
      errorResetBoundary.clearReset();
      (_defaultedOptions$onE = defaultedOptions.onError) === null || _defaultedOptions$onE === void 0 ? void 0 : _defaultedOptions$onE.call(defaultedOptions, error);
      (_defaultedOptions$onS3 = defaultedOptions.onSettled) === null || _defaultedOptions$onS3 === void 0 ? void 0 : _defaultedOptions$onS3.call(defaultedOptions, undefined, error);
    });
  } // Handle error boundary

  if (result.isError && !errorResetBoundary.isReset() && !result.isFetching && shouldThrowError(defaultedOptions.useErrorBoundary, [result.error, observer.getCurrentQuery()])) {
    throw result.error;
  }
  var status = result.status === "loading" && result.fetchStatus === "idle" ? "idle" : result.status;
  var isIdle = status === "idle";
  var isLoading = status === "loading" && result.fetchStatus === "fetching";
  return _objectSpread2(_objectSpread2({}, result), {}, {
    defaultedOptions: defaultedOptions,
    isIdle: isIdle,
    isLoading: isLoading,
    observer: observer,
    status: status
  });
}
function useInfiniteQuery(arg1, arg2, arg3) {
  var parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  var baseQuery = useBaseQuery(_objectSpread2({
    context: queryClientContext$1
  }, parsedOptions), InfiniteQueryObserver);
  var result = {
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
      remove: baseQuery.remove
    }
  }; // Handle result property usage tracking

  return !baseQuery.defaultedOptions.notifyOnChangeProps ? trackResult(result, baseQuery.observer) : result;
}
function useMutation(arg1, arg2, arg3) {
  var options = parseMutationArgs(arg1, arg2, arg3);
  return useMutation$1(_objectSpread2({
    context: queryClientContext$1
  }, options));
}
function useQuery(arg1, arg2, arg3) {
  var parsedOptions = parseQueryArgs(arg1, arg2, arg3);
  var baseQuery = useBaseQuery(_objectSpread2({
    context: queryClientContext$1
  }, parsedOptions), QueryObserver);
  var result = {
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
      remove: baseQuery.remove
    }
  }; // Handle result property usage tracking

  return !baseQuery.defaultedOptions.notifyOnChangeProps ? trackResult(result, baseQuery.observer) : result;
}
var useQueryClient = function useQueryClient() {
  return useQueryClient$1({
    context: queryClientContext$1
  });
};
function useProvider() {
  var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    chainId = _ref8.chainId;
  return withSelector_js.useSyncExternalStoreWithSelector(function (cb) {
    return watchProvider({
      chainId: chainId
    }, cb);
  }, function () {
    return getProvider({
      chainId: chainId
    });
  }, function () {
    return getProvider({
      chainId: chainId
    });
  }, function (x) {
    return x;
  }, function (a, b) {
    return a.network.chainId === b.network.chainId;
  });
}
function useWebSocketProvider() {
  var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    chainId = _ref9.chainId;
  return withSelector_js.useSyncExternalStoreWithSelector(function (cb) {
    return watchWebSocketProvider({
      chainId: chainId
    }, cb);
  }, function () {
    return watchWebSocketProvider({
      chainId: chainId
    });
  }, function () {
    return watchWebSocketProvider({
      chainId: chainId
    });
  }, function (x) {
    return x;
  }, function (a, b) {
    return (a === null || a === void 0 ? void 0 : a.network.chainId) === (b === null || b === void 0 ? void 0 : b.network.chainId);
  });
}
function useChainId() {
  var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    chainId = _ref10.chainId;
  var provider = useProvider({
    chainId: chainId
  });
  return provider.network.chainId;
}
function useForceUpdate() {
  var _React__namespace$use3 = React__namespace.useReducer(function (x) {
      return x + 1;
    }, 0),
    _React__namespace$use4 = _slicedToArray(_React__namespace$use3, 2),
    forceUpdate = _React__namespace$use4[1];
  return forceUpdate;
}
var queryKey$f = function queryKey$f(_ref) {
  var chainId = _ref.chainId;
  return [{
    entity: "blockNumber",
    chainId: chainId
  }];
};
var queryFn$f = function queryFn$f(_ref2) {
  var _ref2$queryKey = _slicedToArray(_ref2.queryKey, 1),
    chainId = _ref2$queryKey[0].chainId;
  return fetchBlockNumber({
    chainId: chainId
  });
};
function useBlockNumber() {
  var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref11$cacheTime = _ref11.cacheTime,
    cacheTime = _ref11$cacheTime === void 0 ? 0 : _ref11$cacheTime,
    chainId_ = _ref11.chainId,
    _ref11$enabled = _ref11.enabled,
    enabled = _ref11$enabled === void 0 ? true : _ref11$enabled,
    staleTime = _ref11.staleTime,
    suspense = _ref11.suspense,
    _ref11$watch = _ref11.watch,
    watch = _ref11$watch === void 0 ? false : _ref11$watch,
    onBlock = _ref11.onBlock,
    onError = _ref11.onError,
    onSettled = _ref11.onSettled,
    onSuccess = _ref11.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  var provider = useProvider({
    chainId: chainId
  });
  var webSocketProvider = useWebSocketProvider({
    chainId: chainId
  });
  var queryClient = useQueryClient();
  React__namespace.useEffect(function () {
    if (!watch && !onBlock) return; // We need to debounce the listener as we want to opt-out
    // of the behavior where ethers emits a "block" event for
    // every block that was missed in between the `pollingInterval`.
    // We are setting a wait time of 1 as emitting an event in
    // ethers takes ~0.1ms.

    var listener = debounce(function (blockNumber) {
      // Just to be safe in case the provider implementation
      // calls the event callback after .off() has been called
      if (watch) queryClient.setQueryData(queryKey$f({
        chainId: chainId
      }), blockNumber);
      if (onBlock) onBlock(blockNumber);
    }, 1);
    var provider_ = webSocketProvider !== null && webSocketProvider !== void 0 ? webSocketProvider : provider;
    provider_.on("block", listener);
    return function () {
      provider_.off("block", listener);
    };
  }, [chainId, onBlock, provider, queryClient, watch, webSocketProvider]);
  return useQuery(queryKey$f({
    chainId: chainId
  }), queryFn$f, {
    cacheTime: cacheTime,
    enabled: enabled,
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
}
var queryKey$e = function queryKey$e(_ref) {
  var chainId = _ref.chainId,
    formatUnits = _ref.formatUnits;
  return [{
    entity: "feeData",
    chainId: chainId,
    formatUnits: formatUnits
  }];
};
var queryFn$e = function queryFn$e(_ref2) {
  var _ref2$queryKey2 = _slicedToArray(_ref2.queryKey, 1),
    _ref2$queryKey2$ = _ref2$queryKey2[0],
    chainId = _ref2$queryKey2$.chainId,
    formatUnits = _ref2$queryKey2$.formatUnits;
  return fetchFeeData({
    chainId: chainId,
    formatUnits: formatUnits
  });
};
function useFeeData() {
  var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    cacheTime = _ref12.cacheTime,
    chainId_ = _ref12.chainId,
    _ref12$enabled = _ref12.enabled,
    enabled = _ref12$enabled === void 0 ? true : _ref12$enabled,
    _ref12$formatUnits = _ref12.formatUnits,
    formatUnits = _ref12$formatUnits === void 0 ? "wei" : _ref12$formatUnits,
    staleTime = _ref12.staleTime,
    suspense = _ref12.suspense,
    watch = _ref12.watch,
    onError = _ref12.onError,
    onSettled = _ref12.onSettled,
    onSuccess = _ref12.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  var feeDataQuery = useQuery(queryKey$e({
    chainId: chainId,
    formatUnits: formatUnits
  }), queryFn$e, {
    cacheTime: cacheTime,
    enabled: enabled,
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
  var _useBlockNumber = useBlockNumber({
      chainId: chainId,
      watch: watch
    }),
    blockNumber = _useBlockNumber.data;
  React__namespace.useEffect(function () {
    if (!enabled) return;
    if (!watch) return;
    if (!blockNumber) return;
    feeDataQuery.refetch(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);
  return feeDataQuery;
}
function useInvalidateOnBlock(_ref) {
  var chainId = _ref.chainId,
    enabled = _ref.enabled,
    queryKey = _ref.queryKey;
  var queryClient = useQueryClient();
  useBlockNumber({
    chainId: chainId,
    onBlock: enabled ? function () {
      return queryClient.invalidateQueries(queryKey);
    } : undefined
  });
}
var isPlainObject = function isPlainObject(obj) {
  return _typeof(obj) === "object" && !Array.isArray(obj);
};
function useSyncExternalStoreWithTracked(subscribe, getSnapshot) {
  var getServerSnapshot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getSnapshot;
  var isEqual = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (a, b) {
    return deepEqual(a, b);
  };
  var trackedKeys = React__namespace.useRef([]);
  var result = withSelector_js.useSyncExternalStoreWithSelector(subscribe, getSnapshot, getServerSnapshot, function (x) {
    return x;
  }, function (a, b) {
    if (isPlainObject(a) && isPlainObject(b)) {
      var _iterator = _createForOfIteratorHelper(trackedKeys.current),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          var equal = isEqual(a[key], b[key]);
          if (!equal) return false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return true;
    }
    return isEqual(a, b);
  });
  if (isPlainObject(result)) {
    var trackedResult = _objectSpread2({}, result);
    Object.defineProperties(trackedResult, Object.entries(trackedResult).reduce(function (res, _ref) {
      var _ref13 = _slicedToArray(_ref, 2),
        key = _ref13[0],
        value = _ref13[1];
      return _objectSpread2(_objectSpread2({}, res), {}, _defineProperty({}, key, {
        configurable: false,
        enumerable: true,
        get: function get() {
          if (!trackedKeys.current.includes(key)) {
            trackedKeys.current.push(key);
          }
          return value;
        }
      }));
    }, {}));
    return trackedResult;
  }
  return result;
}
function useAccount() {
  var _previousAccount$curr, _previousAccount$curr2, _previousAccount$curr3;
  var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    onConnect = _ref14.onConnect,
    onDisconnect = _ref14.onDisconnect;
  var account = useSyncExternalStoreWithTracked(watchAccount, getAccount);
  var previousAccount = React__namespace.useRef();
  if (!!onConnect && ((_previousAccount$curr = previousAccount.current) === null || _previousAccount$curr === void 0 ? void 0 : _previousAccount$curr.status) !== "connected" && account.status === "connected") onConnect({
    address: account.address,
    connector: account.connector,
    isReconnected: ((_previousAccount$curr2 = previousAccount.current) === null || _previousAccount$curr2 === void 0 ? void 0 : _previousAccount$curr2.status) === "reconnecting"
  });
  if (!!onDisconnect && ((_previousAccount$curr3 = previousAccount.current) === null || _previousAccount$curr3 === void 0 ? void 0 : _previousAccount$curr3.status) == "connected" && account.status === "disconnected") onDisconnect();
  previousAccount.current = account;
  return account;
}
var queryKey$d = function queryKey$d(_ref) {
  var addressOrName = _ref.addressOrName,
    chainId = _ref.chainId,
    formatUnits = _ref.formatUnits,
    token = _ref.token;
  return [{
    entity: "balance",
    addressOrName: addressOrName,
    chainId: chainId,
    formatUnits: formatUnits,
    token: token
  }];
};
var queryFn$d = function queryFn$d(_ref2) {
  var _ref2$queryKey3 = _slicedToArray(_ref2.queryKey, 1),
    _ref2$queryKey3$ = _ref2$queryKey3[0],
    addressOrName = _ref2$queryKey3$.addressOrName,
    chainId = _ref2$queryKey3$.chainId,
    formatUnits = _ref2$queryKey3$.formatUnits,
    token = _ref2$queryKey3$.token;
  if (!addressOrName) throw new Error("address is required");
  return fetchBalance({
    addressOrName: addressOrName,
    chainId: chainId,
    formatUnits: formatUnits,
    token: token
  });
};
function useBalance() {
  var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    addressOrName = _ref15.addressOrName,
    cacheTime = _ref15.cacheTime,
    chainId_ = _ref15.chainId,
    _ref15$enabled = _ref15.enabled,
    enabled = _ref15$enabled === void 0 ? true : _ref15$enabled,
    formatUnits = _ref15.formatUnits,
    staleTime = _ref15.staleTime,
    suspense = _ref15.suspense,
    token = _ref15.token,
    watch = _ref15.watch,
    onError = _ref15.onError,
    onSettled = _ref15.onSettled,
    onSuccess = _ref15.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  var balanceQuery = useQuery(queryKey$d({
    addressOrName: addressOrName,
    chainId: chainId,
    formatUnits: formatUnits,
    token: token
  }), queryFn$d, {
    cacheTime: cacheTime,
    enabled: Boolean(enabled && addressOrName),
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
  var _useBlockNumber2 = useBlockNumber({
      chainId: chainId,
      watch: watch
    }),
    blockNumber = _useBlockNumber2.data;
  React__namespace.useEffect(function () {
    if (!enabled) return;
    if (!watch) return;
    if (!blockNumber) return;
    if (!addressOrName) return;
    balanceQuery.refetch(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);
  return balanceQuery;
}
var mutationKey$6 = function mutationKey$6(args) {
  return [_objectSpread2({
    entity: "connect"
  }, args)];
};
var mutationFn$6 = function mutationFn$6(args) {
  var connector = args.connector,
    chainId = args.chainId;
  if (!connector) throw new Error("connector is required");
  return connect({
    connector: connector,
    chainId: chainId
  });
};
function useConnect() {
  var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    chainId = _ref16.chainId,
    connector = _ref16.connector,
    onError = _ref16.onError,
    onMutate = _ref16.onMutate,
    onSettled = _ref16.onSettled,
    onSuccess = _ref16.onSuccess;
  var client = useClient();
  var _useMutation = useMutation(mutationKey$6({
      connector: connector,
      chainId: chainId
    }), mutationFn$6, {
      onError: onError,
      onMutate: onMutate,
      onSettled: onSettled,
      onSuccess: onSuccess
    }),
    data = _useMutation.data,
    error = _useMutation.error,
    isError = _useMutation.isError,
    isIdle = _useMutation.isIdle,
    isLoading = _useMutation.isLoading,
    isSuccess = _useMutation.isSuccess,
    mutate = _useMutation.mutate,
    mutateAsync = _useMutation.mutateAsync,
    reset = _useMutation.reset,
    status = _useMutation.status,
    variables = _useMutation.variables;
  var connect = React__namespace.useCallback(function (args) {
    var _ref17, _ref18;
    return mutate({
      chainId: (_ref17 = args === null || args === void 0 ? void 0 : args.chainId) !== null && _ref17 !== void 0 ? _ref17 : chainId,
      connector: (_ref18 = args === null || args === void 0 ? void 0 : args.connector) !== null && _ref18 !== void 0 ? _ref18 : connector
    });
  }, [chainId, connector, mutate]);
  var connectAsync = React__namespace.useCallback(function (args) {
    var _ref19, _ref20;
    return mutateAsync({
      chainId: (_ref19 = args === null || args === void 0 ? void 0 : args.chainId) !== null && _ref19 !== void 0 ? _ref19 : chainId,
      connector: (_ref20 = args === null || args === void 0 ? void 0 : args.connector) !== null && _ref20 !== void 0 ? _ref20 : connector
    });
  }, [chainId, connector, mutateAsync]);
  return {
    connect: connect,
    connectAsync: connectAsync,
    connectors: client.connectors,
    data: data,
    error: error,
    isError: isError,
    isIdle: isIdle,
    isLoading: isLoading,
    isSuccess: isSuccess,
    pendingConnector: variables === null || variables === void 0 ? void 0 : variables.connector,
    reset: reset,
    status: status,
    variables: variables
  };
}
var mutationKey$5 = [{
  entity: "disconnect"
}];
var mutationFn$5 = function mutationFn$5() {
  return disconnect();
};
function useDisconnect() {
  var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _onError = _ref21.onError,
    onMutate = _ref21.onMutate,
    _onSettled = _ref21.onSettled,
    _onSuccess = _ref21.onSuccess;
  var _useMutation2 = useMutation(mutationKey$5, mutationFn$5, _objectSpread2(_objectSpread2(_objectSpread2({}, _onError ? {
      onError: function onError(error, _variables, context) {
        _onError(error, context);
      }
    } : {}), {}, {
      onMutate: onMutate
    }, _onSettled ? {
      onSettled: function onSettled(_data, error, _variables, context) {
        _onSettled(error, context);
      }
    } : {}), _onSuccess ? {
      onSuccess: function onSuccess(_data, _variables, context) {
        _onSuccess(context);
      }
    } : {})),
    error = _useMutation2.error,
    isError = _useMutation2.isError,
    isIdle = _useMutation2.isIdle,
    isLoading = _useMutation2.isLoading,
    isSuccess = _useMutation2.isSuccess,
    disconnect = _useMutation2.mutate,
    disconnectAsync = _useMutation2.mutateAsync,
    reset = _useMutation2.reset,
    status = _useMutation2.status;
  return {
    disconnect: disconnect,
    disconnectAsync: disconnectAsync,
    error: error,
    isError: isError,
    isIdle: isIdle,
    isLoading: isLoading,
    isSuccess: isSuccess,
    reset: reset,
    status: status
  };
}
function useNetwork() {
  return useSyncExternalStoreWithTracked(watchNetwork, getNetwork);
}
var queryKey$c = function queryKey$c(_ref) {
  var chainId = _ref.chainId;
  return [{
    entity: "signer",
    chainId: chainId,
    persist: false
  }];
};
var queryFn$c = function queryFn$c(_ref2) {
  var _ref2$queryKey4 = _slicedToArray(_ref2.queryKey, 1),
    chainId = _ref2$queryKey4[0].chainId;
  return fetchSigner({
    chainId: chainId
  });
};
function useSigner() {
  var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    chainId_ = _ref22.chainId,
    suspense = _ref22.suspense,
    onError = _ref22.onError,
    onSettled = _ref22.onSettled,
    onSuccess = _ref22.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  var signerQuery = useQuery(queryKey$c({
    chainId: chainId
  }), queryFn$c, {
    cacheTime: 0,
    staleTime: Infinity,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
  var queryClient = useQueryClient();
  React__namespace.useEffect(function () {
    var unwatch = watchSigner({
      chainId: chainId
    }, function (signer) {
      return queryClient.setQueryData(queryKey$c({
        chainId: chainId
      }), signer);
    });
    return unwatch;
  }, [queryClient, chainId]);
  return signerQuery;
}
var mutationKey$4 = function mutationKey$4(args) {
  return [_objectSpread2({
    entity: "signMessage"
  }, args)];
};
var mutationFn$4 = function mutationFn$4(args) {
  var message = args.message;
  if (!message) throw new Error("message is required");
  return signMessage({
    message: message
  });
};
function useSignMessage() {
  var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    message = _ref23.message,
    onError = _ref23.onError,
    onMutate = _ref23.onMutate,
    onSettled = _ref23.onSettled,
    onSuccess = _ref23.onSuccess;
  var _useMutation3 = useMutation(mutationKey$4({
      message: message
    }), mutationFn$4, {
      onError: onError,
      onMutate: onMutate,
      onSettled: onSettled,
      onSuccess: onSuccess
    }),
    data = _useMutation3.data,
    error = _useMutation3.error,
    isError = _useMutation3.isError,
    isIdle = _useMutation3.isIdle,
    isLoading = _useMutation3.isLoading,
    isSuccess = _useMutation3.isSuccess,
    mutate = _useMutation3.mutate,
    mutateAsync = _useMutation3.mutateAsync,
    reset = _useMutation3.reset,
    status = _useMutation3.status,
    variables = _useMutation3.variables;
  var signMessage = React__namespace.useCallback(function (args) {
    return mutate(args || {
      message: message
    });
  }, [message, mutate]);
  var signMessageAsync = React__namespace.useCallback(function (args) {
    return mutateAsync(args || {
      message: message
    });
  }, [message, mutateAsync]);
  return {
    data: data,
    error: error,
    isError: isError,
    isIdle: isIdle,
    isLoading: isLoading,
    isSuccess: isSuccess,
    reset: reset,
    signMessage: signMessage,
    signMessageAsync: signMessageAsync,
    status: status,
    variables: variables
  };
}
function mutationKey$3(_ref) {
  var domain = _ref.domain,
    types = _ref.types,
    value = _ref.value;
  return [{
    entity: "signTypedData",
    domain: domain,
    types: types,
    value: value
  }];
}
function mutationFn$3(args) {
  var domain = args.domain,
    types = args.types,
    value = args.value;
  if (!domain) throw new Error("domain is required");
  if (!types) throw new Error("types is required");
  if (!value) throw new Error("value is required");
  return signTypedData({
    domain: domain,
    types: types,
    value: value
  });
}
function useSignTypedData() {
  var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    domain = _ref24.domain,
    types = _ref24.types,
    value = _ref24.value,
    onError = _ref24.onError,
    onMutate = _ref24.onMutate,
    onSettled = _ref24.onSettled,
    onSuccess = _ref24.onSuccess;
  var _useMutation4 = useMutation(mutationKey$3({
      domain: domain,
      types: types,
      value: value
    }), mutationFn$3, {
      onError: onError,
      onMutate: onMutate,
      onSettled: onSettled,
      onSuccess: onSuccess
    }),
    data = _useMutation4.data,
    error = _useMutation4.error,
    isError = _useMutation4.isError,
    isIdle = _useMutation4.isIdle,
    isLoading = _useMutation4.isLoading,
    isSuccess = _useMutation4.isSuccess,
    mutate = _useMutation4.mutate,
    mutateAsync = _useMutation4.mutateAsync,
    reset = _useMutation4.reset,
    status = _useMutation4.status,
    variables = _useMutation4.variables;
  var signTypedData = React__namespace.useCallback(function (args) {
    var _ref25, _ref26, _ref27;
    return mutate({
      domain: (_ref25 = args === null || args === void 0 ? void 0 : args.domain) !== null && _ref25 !== void 0 ? _ref25 : domain,
      types: (_ref26 = args === null || args === void 0 ? void 0 : args.types) !== null && _ref26 !== void 0 ? _ref26 : types,
      value: (_ref27 = args === null || args === void 0 ? void 0 : args.value) !== null && _ref27 !== void 0 ? _ref27 : value
    });
  }, [domain, types, value, mutate]);
  var signTypedDataAsync = React__namespace.useCallback(function (args) {
    var _ref28, _ref29, _ref30;
    return mutateAsync({
      domain: (_ref28 = args === null || args === void 0 ? void 0 : args.domain) !== null && _ref28 !== void 0 ? _ref28 : domain,
      types: (_ref29 = args === null || args === void 0 ? void 0 : args.types) !== null && _ref29 !== void 0 ? _ref29 : types,
      value: (_ref30 = args === null || args === void 0 ? void 0 : args.value) !== null && _ref30 !== void 0 ? _ref30 : value
    });
  }, [domain, types, value, mutateAsync]);
  return {
    data: data,
    error: error,
    isError: isError,
    isIdle: isIdle,
    isLoading: isLoading,
    isSuccess: isSuccess,
    reset: reset,
    signTypedData: signTypedData,
    signTypedDataAsync: signTypedDataAsync,
    status: status,
    variables: variables
  };
}
var mutationKey$2 = function mutationKey$2(args) {
  return [_objectSpread2({
    entity: "switchNetwork"
  }, args)];
};
var mutationFn$2 = function mutationFn$2(args) {
  var chainId = args.chainId;
  if (!chainId) throw new Error("chainId is required");
  return switchNetwork({
    chainId: chainId
  });
};
function useSwitchNetwork() {
  var _client$chains;
  var _client$connector;
  var _ref31 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    chainId = _ref31.chainId,
    throwForSwitchChainNotSupported = _ref31.throwForSwitchChainNotSupported,
    onError = _ref31.onError,
    onMutate = _ref31.onMutate,
    onSettled = _ref31.onSettled,
    onSuccess = _ref31.onSuccess;
  var client = useClient();
  var forceUpdate = useForceUpdate();
  var _useMutation5 = useMutation(mutationKey$2({
      chainId: chainId
    }), mutationFn$2, {
      onError: onError,
      onMutate: onMutate,
      onSettled: onSettled,
      onSuccess: onSuccess
    }),
    data = _useMutation5.data,
    error = _useMutation5.error,
    isError = _useMutation5.isError,
    isIdle = _useMutation5.isIdle,
    isLoading = _useMutation5.isLoading,
    isSuccess = _useMutation5.isSuccess,
    mutate = _useMutation5.mutate,
    mutateAsync = _useMutation5.mutateAsync,
    reset = _useMutation5.reset,
    status = _useMutation5.status,
    variables = _useMutation5.variables;
  var switchNetwork_ = React__namespace.useCallback(function (chainId_) {
    return mutate({
      chainId: chainId_ !== null && chainId_ !== void 0 ? chainId_ : chainId
    });
  }, [chainId, mutate]);
  var switchNetworkAsync_ = React__namespace.useCallback(function (chainId_) {
    return mutateAsync({
      chainId: chainId_ !== null && chainId_ !== void 0 ? chainId_ : chainId
    });
  }, [chainId, mutateAsync]); // Trigger update when connector changes since not all connectors support chain switching

  React__namespace.useEffect(function () {
    var unwatch = client.subscribe(function (_ref) {
      var chains = _ref.chains,
        connector = _ref.connector;
      return {
        chains: chains,
        connector: connector
      };
    }, forceUpdate);
    return unwatch;
  }, [client, forceUpdate]);
  var switchNetwork;
  var switchNetworkAsync;
  var supportsSwitchChain = !!((_client$connector = client.connector) !== null && _client$connector !== void 0 && _client$connector.switchChain);
  if (throwForSwitchChainNotSupported || supportsSwitchChain) {
    switchNetwork = switchNetwork_;
    switchNetworkAsync = switchNetworkAsync_;
  }
  return {
    chains: (_client$chains = client.chains) !== null && _client$chains !== void 0 ? _client$chains : [],
    data: data,
    error: error,
    isError: isError,
    isIdle: isIdle,
    isLoading: isLoading,
    isSuccess: isSuccess,
    pendingChainId: variables === null || variables === void 0 ? void 0 : variables.chainId,
    reset: reset,
    status: status,
    switchNetwork: switchNetwork,
    switchNetworkAsync: switchNetworkAsync,
    variables: variables
  };
}
function useContract() {
  var _ref32 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    address = _ref32.address,
    abi = _ref32.abi,
    signerOrProvider = _ref32.signerOrProvider;
  return React__namespace.useMemo(function () {
    if (!address || !abi) return null;
    return getContract({
      address: address,
      abi: abi,
      signerOrProvider: signerOrProvider === null ? undefined : signerOrProvider
    });
  }, [address, abi, signerOrProvider]);
}
function useContractEvent() {
  var _ref33 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    address = _ref33.address,
    chainId = _ref33.chainId,
    abi = _ref33.abi,
    listener = _ref33.listener,
    eventName = _ref33.eventName,
    once = _ref33.once;
  var provider = useProvider({
    chainId: chainId
  });
  var webSocketProvider = useWebSocketProvider({
    chainId: chainId
  });
  var contract = useContract({
    address: address,
    // TODO: Remove cast and still support `Narrow<TAbi>`
    abi: abi,
    signerOrProvider: webSocketProvider !== null && webSocketProvider !== void 0 ? webSocketProvider : provider
  });
  var callbackRef = React__namespace.useRef(listener);
  callbackRef.current = listener;
  React__namespace.useEffect(function () {
    if (!contract || !eventName) return;
    var handler = function handler() {
      return callbackRef.current.apply(callbackRef, arguments);
    };
    if (once) contract.once(eventName, handler);else contract.on(eventName, handler);
    return function () {
      contract.off(eventName, handler);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, eventName]);
}
function queryKey$b(_ref) {
  var allowFailure = _ref.allowFailure,
    cacheKey = _ref.cacheKey,
    overrides = _ref.overrides;
  return [{
    entity: "readContractsInfinite",
    allowFailure: allowFailure,
    cacheKey: cacheKey,
    overrides: overrides
  }];
}
function queryFn$b(_ref2) {
  var contracts = _ref2.contracts;
  return function (_ref3) {
    var _ref3$queryKey = _slicedToArray(_ref3.queryKey, 1),
      _ref3$queryKey$ = _ref3$queryKey[0],
      allowFailure = _ref3$queryKey$.allowFailure,
      overrides = _ref3$queryKey$.overrides,
      pageParam = _ref3.pageParam;
    return readContracts({
      allowFailure: allowFailure,
      contracts: contracts(pageParam || undefined),
      overrides: overrides
    });
  };
}
function useContractInfiniteReads(_ref4) {
  var allowFailure = _ref4.allowFailure,
    cacheKey = _ref4.cacheKey,
    cacheTime = _ref4.cacheTime,
    contracts = _ref4.contracts,
    _ref4$enabled = _ref4.enabled,
    enabled_ = _ref4$enabled === void 0 ? true : _ref4$enabled,
    getNextPageParam = _ref4.getNextPageParam,
    _ref4$isDataEqual = _ref4.isDataEqual,
    isDataEqual = _ref4$isDataEqual === void 0 ? deepEqual : _ref4$isDataEqual,
    keepPreviousData = _ref4.keepPreviousData,
    onError = _ref4.onError,
    onSettled = _ref4.onSettled,
    onSuccess = _ref4.onSuccess,
    overrides = _ref4.overrides,
    select = _ref4.select,
    staleTime = _ref4.staleTime,
    suspense = _ref4.suspense;
  var queryKey_ = React__namespace.useMemo(function () {
    return queryKey$b({
      allowFailure: allowFailure,
      cacheKey: cacheKey,
      overrides: overrides
    });
  }, [allowFailure, cacheKey, overrides]);
  var enabled = React__namespace.useMemo(function () {
    var enabled = Boolean(enabled_ && contracts);
    return enabled;
  }, [contracts, enabled_]);
  return useInfiniteQuery(queryKey_, queryFn$b({
    contracts: contracts
  }), {
    cacheTime: cacheTime,
    enabled: enabled,
    getNextPageParam: getNextPageParam,
    isDataEqual: isDataEqual,
    keepPreviousData: keepPreviousData,
    select: select,
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
} // TODO: Fix return type inference for `useContractInfiniteReads` when using `paginatedIndexesConfig`

function paginatedIndexesConfig(fn, _ref5) {
  var perPage = _ref5.perPage,
    start = _ref5.start,
    direction = _ref5.direction;
  var contracts = function contracts() {
    var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return _toConsumableArray(Array(perPage).keys()).map(function (index) {
      return direction === "increment" ? start + index + page * perPage : start - index - page * perPage;
    }).filter(function (index) {
      return index >= 0;
    }).map(fn).flat();
  };
  return {
    contracts: contracts,
    getNextPageParam: function getNextPageParam(lastPage, pages) {
      return (lastPage === null || lastPage === void 0 ? void 0 : lastPage.length) === perPage ? pages.length : undefined;
    }
  };
}
function queryKey$a(_ref, _ref2) {
  var address = _ref.address,
    args = _ref.args,
    chainId = _ref.chainId,
    functionName = _ref.functionName,
    overrides = _ref.overrides;
  var blockNumber = _ref2.blockNumber;
  return [{
    entity: "readContract",
    address: address,
    args: args,
    blockNumber: blockNumber,
    chainId: chainId,
    functionName: functionName,
    overrides: overrides
  }];
}
function queryFn$a(_ref3) {
  var abi = _ref3.abi;
  return /*#__PURE__*/function () {
    var _ref34 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref4) {
      var _yield$readContractCo;
      var _ref4$queryKey, _ref4$queryKey$, address, args, chainId, functionName, overrides;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _ref4$queryKey = _slicedToArray(_ref4.queryKey, 1), _ref4$queryKey$ = _ref4$queryKey[0], address = _ref4$queryKey$.address, args = _ref4$queryKey$.args, chainId = _ref4$queryKey$.chainId, functionName = _ref4$queryKey$.functionName, overrides = _ref4$queryKey$.overrides;
            if (abi) {
              _context.next = 3;
              break;
            }
            throw new Error("abi is required");
          case 3:
            if (address) {
              _context.next = 5;
              break;
            }
            throw new Error("address is required");
          case 5:
            _context.next = 7;
            return readContract({
              address: address,
              args: args,
              chainId: chainId,
              // TODO: Remove cast and still support `Narrow<TAbi>`
              abi: abi,
              functionName: functionName,
              overrides: overrides
            });
          case 7:
            _context.t1 = _yield$readContractCo = _context.sent;
            _context.t0 = _context.t1 !== null;
            if (!_context.t0) {
              _context.next = 11;
              break;
            }
            _context.t0 = _yield$readContractCo !== void 0;
          case 11:
            if (!_context.t0) {
              _context.next = 15;
              break;
            }
            _context.t2 = _yield$readContractCo;
            _context.next = 16;
            break;
          case 15:
            _context.t2 = null;
          case 16:
            return _context.abrupt("return", _context.t2);
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref34.apply(this, arguments);
    };
  }();
}
function useContractRead() {
  var _ref35 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    abi = _ref35.abi,
    address = _ref35.address,
    functionName = _ref35.functionName,
    args = _ref35.args,
    chainId_ = _ref35.chainId,
    overrides = _ref35.overrides,
    _ref35$cacheOnBlock = _ref35.cacheOnBlock,
    cacheOnBlock = _ref35$cacheOnBlock === void 0 ? false : _ref35$cacheOnBlock,
    cacheTime = _ref35.cacheTime,
    _ref35$enabled = _ref35.enabled,
    enabled_ = _ref35$enabled === void 0 ? true : _ref35$enabled,
    _ref35$isDataEqual = _ref35.isDataEqual,
    isDataEqual = _ref35$isDataEqual === void 0 ? deepEqual : _ref35$isDataEqual,
    _select = _ref35.select,
    staleTime = _ref35.staleTime,
    suspense = _ref35.suspense,
    watch = _ref35.watch,
    onError = _ref35.onError,
    onSettled = _ref35.onSettled,
    onSuccess = _ref35.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  var _useBlockNumber3 = useBlockNumber({
      chainId: chainId,
      enabled: watch || cacheOnBlock,
      watch: watch
    }),
    blockNumber = _useBlockNumber3.data;
  var queryKey_ = React__namespace.useMemo(function () {
    return queryKey$a({
      address: address,
      args: args,
      chainId: chainId,
      functionName: functionName,
      overrides: overrides
    }, {
      blockNumber: cacheOnBlock ? blockNumber : undefined
    });
  }, [address, args, blockNumber, cacheOnBlock, chainId, functionName, overrides]);
  var enabled = React__namespace.useMemo(function () {
    var enabled = Boolean(enabled_ && abi && address && functionName);
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber);
    return enabled;
  }, [abi, address, blockNumber, cacheOnBlock, enabled_, functionName]);
  useInvalidateOnBlock({
    chainId: chainId,
    enabled: watch && !cacheOnBlock,
    queryKey: queryKey_
  });
  return useQuery(queryKey_, queryFn$a({
    // TODO: Remove cast and still support `Narrow<TAbi>`
    abi: abi
  }), {
    cacheTime: cacheTime,
    enabled: enabled,
    isDataEqual: isDataEqual,
    select: function select(data) {
      var result = abi && functionName ? parseContractResult({
        // TODO: Remove cast and still support `Narrow<TAbi>`
        abi: abi,
        data: data,
        functionName: functionName
      }) : data;
      return _select ? _select(result) : result;
    },
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
}
function queryKey$9(_ref, _ref2) {
  var allowFailure = _ref.allowFailure,
    contracts = _ref.contracts,
    overrides = _ref.overrides;
  var blockNumber = _ref2.blockNumber,
    chainId = _ref2.chainId;
  return [{
    entity: "readContracts",
    allowFailure: allowFailure,
    blockNumber: blockNumber,
    chainId: chainId,
    contracts: (contracts !== null && contracts !== void 0 ? contracts : []).map(function (_ref3) {
      var address = _ref3.address,
        args = _ref3.args,
        chainId = _ref3.chainId,
        functionName = _ref3.functionName;
      return {
        address: address,
        args: args,
        chainId: chainId,
        functionName: functionName
      };
    }),
    overrides: overrides
  }];
}
function queryFn$9(_ref4) {
  var abis = _ref4.abis;
  return function (_ref5) {
    var _ref5$queryKey = _slicedToArray(_ref5.queryKey, 1),
      _ref5$queryKey$ = _ref5$queryKey[0],
      allowFailure = _ref5$queryKey$.allowFailure,
      contracts_ = _ref5$queryKey$.contracts,
      overrides = _ref5$queryKey$.overrides;
    var contracts = contracts_.map(function (contract, i) {
      return _objectSpread2(_objectSpread2({}, contract), {}, {
        abi: abis[i]
      });
    });
    return readContracts({
      allowFailure: allowFailure,
      contracts: contracts,
      overrides: overrides
    });
  };
}
function useContractReads() {
  var _ref36 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref36$allowFailure = _ref36.allowFailure,
    allowFailure = _ref36$allowFailure === void 0 ? true : _ref36$allowFailure,
    _ref36$cacheOnBlock = _ref36.cacheOnBlock,
    cacheOnBlock = _ref36$cacheOnBlock === void 0 ? false : _ref36$cacheOnBlock,
    cacheTime = _ref36.cacheTime,
    contracts = _ref36.contracts,
    overrides = _ref36.overrides,
    _ref36$enabled = _ref36.enabled,
    enabled_ = _ref36$enabled === void 0 ? true : _ref36$enabled,
    _ref36$isDataEqual = _ref36.isDataEqual,
    isDataEqual = _ref36$isDataEqual === void 0 ? deepEqual : _ref36$isDataEqual,
    keepPreviousData = _ref36.keepPreviousData,
    onError = _ref36.onError,
    onSettled = _ref36.onSettled,
    onSuccess = _ref36.onSuccess,
    _select2 = _ref36.select,
    staleTime = _ref36.staleTime,
    suspense = _ref36.suspense,
    watch = _ref36.watch;
  var _useBlockNumber4 = useBlockNumber({
      enabled: watch || cacheOnBlock,
      watch: watch
    }),
    blockNumber = _useBlockNumber4.data;
  var chainId = useChainId();
  var queryKey_ = React__namespace.useMemo(function () {
    return queryKey$9({
      allowFailure: allowFailure,
      contracts: contracts,
      overrides: overrides
    }, {
      blockNumber: cacheOnBlock ? blockNumber : undefined,
      chainId: chainId
    });
  }, [allowFailure, blockNumber, cacheOnBlock, chainId, contracts, overrides]);
  var enabled = React__namespace.useMemo(function () {
    var enabled = Boolean(enabled_ && (contracts === null || contracts === void 0 ? void 0 : contracts.every(function (x) {
      return x.abi && x.address && x.functionName;
    })));
    if (cacheOnBlock) enabled = Boolean(enabled && blockNumber);
    return enabled;
  }, [blockNumber, cacheOnBlock, contracts, enabled_]);
  useInvalidateOnBlock({
    enabled: watch && !cacheOnBlock,
    queryKey: queryKey_
  });
  var abis = (contracts !== null && contracts !== void 0 ? contracts : []).map(function (_ref6) {
    var abi = _ref6.abi;
    return abi;
  });
  return useQuery(queryKey_, queryFn$9({
    abis: abis
  }), {
    cacheTime: cacheTime,
    enabled: enabled,
    isDataEqual: isDataEqual,
    keepPreviousData: keepPreviousData,
    staleTime: staleTime,
    select: function select(data) {
      var result = data.map(function (data, i) {
        var _ref38;
        var _ref37 = (_ref38 = contracts === null || contracts === void 0 ? void 0 : contracts[i]) !== null && _ref38 !== void 0 ? _ref38 : {},
          abi = _ref37.abi,
          functionName = _ref37.functionName;
        return abi && functionName ? parseContractResult({
          abi: abi,
          functionName: functionName,
          data: data
        }) : data;
      });
      return _select2 ? _select2(result) : result;
    },
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
}
function mutationKey$1(_ref) {
  var address = _ref.address,
    args = _ref.args,
    chainId = _ref.chainId,
    abi = _ref.abi,
    functionName = _ref.functionName,
    overrides = _ref.overrides,
    request = _ref.request;
  return [{
    entity: "writeContract",
    address: address,
    args: args,
    chainId: chainId,
    abi: abi,
    functionName: functionName,
    overrides: overrides,
    request: request
  }];
}
function mutationFn$1(_ref2) {
  var address = _ref2.address,
    args = _ref2.args,
    chainId = _ref2.chainId,
    abi = _ref2.abi,
    functionName = _ref2.functionName,
    mode = _ref2.mode,
    overrides = _ref2.overrides,
    request = _ref2.request;
  if (!address) throw new Error("address is required");
  if (!abi) throw new Error("abi is required");
  if (!functionName) throw new Error("functionName is required");
  switch (mode) {
    case "prepared":
      {
        if (!request) throw new Error("request is required");
        return writeContract({
          mode: "prepared",
          address: address,
          chainId: chainId,
          abi: abi,
          functionName: functionName,
          request: request
        });
      }
    case "recklesslyUnprepared":
      return writeContract({
        address: address,
        abi: abi,
        functionName: functionName,
        args: args,
        chainId: chainId,
        mode: "recklesslyUnprepared",
        overrides: overrides
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
  var _ref39 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    address = _ref39.address,
    args = _ref39.args,
    chainId = _ref39.chainId,
    abi = _ref39.abi,
    functionName = _ref39.functionName,
    mode = _ref39.mode,
    overrides = _ref39.overrides,
    request = _ref39.request,
    onError = _ref39.onError,
    onMutate = _ref39.onMutate,
    onSettled = _ref39.onSettled,
    onSuccess = _ref39.onSuccess;
  var _useMutation6 = useMutation(mutationKey$1({
      address: address,
      abi: abi,
      functionName: functionName,
      args: args,
      chainId: chainId,
      mode: mode,
      overrides: overrides,
      request: request
    }), mutationFn$1, {
      onError: onError,
      onMutate: onMutate,
      onSettled: onSettled,
      onSuccess: onSuccess
    }),
    data = _useMutation6.data,
    error = _useMutation6.error,
    isError = _useMutation6.isError,
    isIdle = _useMutation6.isIdle,
    isLoading = _useMutation6.isLoading,
    isSuccess = _useMutation6.isSuccess,
    mutate = _useMutation6.mutate,
    mutateAsync = _useMutation6.mutateAsync,
    reset = _useMutation6.reset,
    status = _useMutation6.status,
    variables = _useMutation6.variables;
  var write = React__namespace.useCallback(function (overrideConfig) {
    var _ref40, _ref41;
    return mutate({
      address: address,
      args: (_ref40 = overrideConfig === null || overrideConfig === void 0 ? void 0 : overrideConfig.recklesslySetUnpreparedArgs) !== null && _ref40 !== void 0 ? _ref40 : args,
      chainId: chainId,
      abi: abi,
      functionName: functionName,
      mode: overrideConfig ? "recklesslyUnprepared" : mode,
      overrides: (_ref41 = overrideConfig === null || overrideConfig === void 0 ? void 0 : overrideConfig.recklesslySetUnpreparedOverrides) !== null && _ref41 !== void 0 ? _ref41 : overrides,
      request: request
    });
  }, [address, args, chainId, abi, functionName, mode, mutate, overrides, request]);
  var writeAsync = React__namespace.useCallback(function (overrideConfig) {
    var _ref42, _ref43;
    return mutateAsync({
      address: address,
      args: (_ref42 = overrideConfig === null || overrideConfig === void 0 ? void 0 : overrideConfig.recklesslySetUnpreparedArgs) !== null && _ref42 !== void 0 ? _ref42 : args,
      chainId: chainId,
      abi: abi,
      functionName: functionName,
      mode: overrideConfig ? "recklesslyUnprepared" : mode,
      overrides: (_ref43 = overrideConfig === null || overrideConfig === void 0 ? void 0 : overrideConfig.recklesslySetUnpreparedOverrides) !== null && _ref43 !== void 0 ? _ref43 : overrides,
      request: request
    });
  }, [address, args, chainId, abi, functionName, mode, mutateAsync, overrides, request]);
  return {
    data: data,
    error: error,
    isError: isError,
    isIdle: isIdle,
    isLoading: isLoading,
    isSuccess: isSuccess,
    reset: reset,
    status: status,
    variables: variables,
    write: mode === "prepared" && !request ? undefined : write,
    writeAsync: mode === "prepared" && !request ? undefined : writeAsync
  };
}
function queryKey$8(_ref, _ref2) {
  var args = _ref.args,
    address = _ref.address,
    chainId = _ref.chainId,
    functionName = _ref.functionName,
    overrides = _ref.overrides;
  var activeChainId = _ref2.activeChainId,
    signerAddress = _ref2.signerAddress;
  return [{
    entity: "prepareContractTransaction",
    activeChainId: activeChainId,
    address: address,
    args: args,
    chainId: chainId,
    functionName: functionName,
    overrides: overrides,
    signerAddress: signerAddress
  }];
}
function queryFn$8(_ref3) {
  var abi = _ref3.abi,
    signer = _ref3.signer;
  return function (_ref4) {
    var _ref4$queryKey2 = _slicedToArray(_ref4.queryKey, 1),
      _ref4$queryKey2$ = _ref4$queryKey2[0],
      args = _ref4$queryKey2$.args,
      address = _ref4$queryKey2$.address,
      chainId = _ref4$queryKey2$.chainId,
      functionName = _ref4$queryKey2$.functionName,
      overrides = _ref4$queryKey2$.overrides;
    if (!abi) throw new Error("abi is required");
    return prepareWriteContract({
      args: args,
      address: address,
      chainId: chainId,
      // TODO: Remove cast and still support `Narrow<TAbi>`
      abi: abi,
      functionName: functionName,
      overrides: overrides,
      signer: signer
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
  var _ref44 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    address = _ref44.address,
    abi = _ref44.abi,
    functionName = _ref44.functionName,
    chainId = _ref44.chainId,
    args = _ref44.args,
    overrides = _ref44.overrides,
    cacheTime = _ref44.cacheTime,
    _ref44$enabled = _ref44.enabled,
    enabled = _ref44$enabled === void 0 ? true : _ref44$enabled,
    staleTime = _ref44.staleTime,
    suspense = _ref44.suspense,
    onError = _ref44.onError,
    onSettled = _ref44.onSettled,
    onSuccess = _ref44.onSuccess;
  var activeChainId = useChainId();
  var _useSigner = useSigner({
      chainId: chainId !== null && chainId !== void 0 ? chainId : activeChainId
    }),
    signer = _useSigner.data;
  var prepareContractWriteQuery = useQuery(queryKey$8({
    address: address,
    functionName: functionName,
    chainId: chainId,
    args: args,
    overrides: overrides
  }, {
    activeChainId: activeChainId,
    signerAddress: signer === null || signer === void 0 ? void 0 : signer._address
  }), queryFn$8({
    // TODO: Remove cast and still support `Narrow<TAbi>`
    abi: abi,
    signer: signer
  }), {
    cacheTime: cacheTime,
    enabled: Boolean(enabled && abi && address && functionName && signer),
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
  return Object.assign(prepareContractWriteQuery, {
    config: _objectSpread2({
      abi: abi,
      address: address,
      args: args,
      functionName: functionName,
      mode: "prepared",
      overrides: overrides,
      request: undefined
    }, prepareContractWriteQuery.data)
  });
}
var queryKey$7 = function queryKey$7(_ref) {
  var address = _ref.address,
    chainId = _ref.chainId,
    formatUnits = _ref.formatUnits;
  return [{
    entity: "token",
    address: address,
    chainId: chainId,
    formatUnits: formatUnits
  }];
};
var queryFn$7 = function queryFn$7(_ref2) {
  var _ref2$queryKey5 = _slicedToArray(_ref2.queryKey, 1),
    _ref2$queryKey5$ = _ref2$queryKey5[0],
    address = _ref2$queryKey5$.address,
    chainId = _ref2$queryKey5$.chainId,
    formatUnits = _ref2$queryKey5$.formatUnits;
  if (!address) throw new Error("address is required");
  return fetchToken({
    address: address,
    chainId: chainId,
    formatUnits: formatUnits
  });
};
function useToken() {
  var _ref45 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    address = _ref45.address,
    chainId_ = _ref45.chainId,
    _ref45$formatUnits = _ref45.formatUnits,
    formatUnits = _ref45$formatUnits === void 0 ? "ether" : _ref45$formatUnits,
    cacheTime = _ref45.cacheTime,
    _ref45$enabled = _ref45.enabled,
    enabled = _ref45$enabled === void 0 ? true : _ref45$enabled,
    _ref45$staleTime = _ref45.staleTime,
    staleTime = _ref45$staleTime === void 0 ? 1000 * 60 * 60 * 24 : _ref45$staleTime,
    suspense = _ref45.suspense,
    onError = _ref45.onError,
    onSettled = _ref45.onSettled,
    onSuccess = _ref45.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  return useQuery(queryKey$7({
    address: address,
    chainId: chainId,
    formatUnits: formatUnits
  }), queryFn$7, {
    cacheTime: cacheTime,
    enabled: Boolean(enabled && address),
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
}
var queryKey$6 = function queryKey$6(_ref) {
  var chainId = _ref.chainId,
    name = _ref.name;
  return [{
    entity: "ensAddress",
    chainId: chainId,
    name: name
  }];
};
var queryFn$6 = function queryFn$6(_ref2) {
  var _ref2$queryKey6 = _slicedToArray(_ref2.queryKey, 1),
    _ref2$queryKey6$ = _ref2$queryKey6[0],
    chainId = _ref2$queryKey6$.chainId,
    name = _ref2$queryKey6$.name;
  if (!name) throw new Error("name is required");
  return fetchEnsAddress({
    chainId: chainId,
    name: name
  });
};
function useEnsAddress() {
  var _ref46 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    cacheTime = _ref46.cacheTime,
    chainId_ = _ref46.chainId,
    _ref46$enabled = _ref46.enabled,
    enabled = _ref46$enabled === void 0 ? true : _ref46$enabled,
    name = _ref46.name,
    _ref46$staleTime = _ref46.staleTime,
    staleTime = _ref46$staleTime === void 0 ? 1000 * 60 * 60 * 24 : _ref46$staleTime,
    suspense = _ref46.suspense,
    onError = _ref46.onError,
    onSettled = _ref46.onSettled,
    onSuccess = _ref46.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  return useQuery(queryKey$6({
    chainId: chainId,
    name: name
  }), queryFn$6, {
    cacheTime: cacheTime,
    enabled: Boolean(enabled && chainId && name),
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
}
var queryKey$5 = function queryKey$5(_ref) {
  var addressOrName = _ref.addressOrName,
    chainId = _ref.chainId;
  return [{
    entity: "ensAvatar",
    addressOrName: addressOrName,
    chainId: chainId
  }];
};
var queryFn$5 = function queryFn$5(_ref2) {
  var _ref2$queryKey7 = _slicedToArray(_ref2.queryKey, 1),
    _ref2$queryKey7$ = _ref2$queryKey7[0],
    addressOrName = _ref2$queryKey7$.addressOrName,
    chainId = _ref2$queryKey7$.chainId;
  if (!addressOrName) throw new Error("addressOrName is required");
  return fetchEnsAvatar({
    addressOrName: addressOrName,
    chainId: chainId
  });
};
function useEnsAvatar() {
  var _ref47 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    addressOrName = _ref47.addressOrName,
    cacheTime = _ref47.cacheTime,
    chainId_ = _ref47.chainId,
    _ref47$enabled = _ref47.enabled,
    enabled = _ref47$enabled === void 0 ? true : _ref47$enabled,
    _ref47$staleTime = _ref47.staleTime,
    staleTime = _ref47$staleTime === void 0 ? 1000 * 60 * 60 * 24 : _ref47$staleTime,
    suspense = _ref47.suspense,
    onError = _ref47.onError,
    onSettled = _ref47.onSettled,
    onSuccess = _ref47.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  return useQuery(queryKey$5({
    addressOrName: addressOrName,
    chainId: chainId
  }), queryFn$5, {
    cacheTime: cacheTime,
    enabled: Boolean(enabled && addressOrName && chainId),
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
}
var queryKey$4 = function queryKey$4(_ref) {
  var address = _ref.address,
    chainId = _ref.chainId;
  return [{
    entity: "ensName",
    address: address,
    chainId: chainId
  }];
};
var queryFn$4 = function queryFn$4(_ref2) {
  var _ref2$queryKey8 = _slicedToArray(_ref2.queryKey, 1),
    _ref2$queryKey8$ = _ref2$queryKey8[0],
    address = _ref2$queryKey8$.address,
    chainId = _ref2$queryKey8$.chainId;
  if (!address) throw new Error("address is required");
  return fetchEnsName({
    address: address,
    chainId: chainId
  });
};
function useEnsName() {
  var _ref48 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    address = _ref48.address,
    cacheTime = _ref48.cacheTime,
    chainId_ = _ref48.chainId,
    _ref48$enabled = _ref48.enabled,
    enabled = _ref48$enabled === void 0 ? true : _ref48$enabled,
    _ref48$staleTime = _ref48.staleTime,
    staleTime = _ref48$staleTime === void 0 ? 1000 * 60 * 60 * 24 : _ref48$staleTime,
    suspense = _ref48.suspense,
    onError = _ref48.onError,
    onSettled = _ref48.onSettled,
    onSuccess = _ref48.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  return useQuery(queryKey$4({
    address: address,
    chainId: chainId
  }), queryFn$4, {
    cacheTime: cacheTime,
    enabled: Boolean(enabled && address && chainId),
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
}
var queryKey$3 = function queryKey$3(_ref) {
  var chainId = _ref.chainId,
    name = _ref.name;
  return [{
    entity: "ensResolver",
    chainId: chainId,
    name: name
  }];
};
var queryFn$3 = function queryFn$3(_ref2) {
  var _ref2$queryKey9 = _slicedToArray(_ref2.queryKey, 1),
    _ref2$queryKey9$ = _ref2$queryKey9[0],
    chainId = _ref2$queryKey9$.chainId,
    name = _ref2$queryKey9$.name;
  if (!name) throw new Error("name is required");
  return fetchEnsResolver({
    chainId: chainId,
    name: name
  });
};
function useEnsResolver() {
  var _ref49 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    cacheTime = _ref49.cacheTime,
    chainId_ = _ref49.chainId,
    _ref49$enabled = _ref49.enabled,
    enabled = _ref49$enabled === void 0 ? true : _ref49$enabled,
    name = _ref49.name,
    _ref49$staleTime = _ref49.staleTime,
    staleTime = _ref49$staleTime === void 0 ? 1000 * 60 * 60 * 24 : _ref49$staleTime,
    suspense = _ref49.suspense,
    onError = _ref49.onError,
    onSettled = _ref49.onSettled,
    onSuccess = _ref49.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  return useQuery(queryKey$3({
    chainId: chainId,
    name: name
  }), queryFn$3, {
    cacheTime: cacheTime,
    enabled: Boolean(enabled && chainId && name),
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
}
function queryKey$2(_ref, _ref2) {
  var chainId = _ref.chainId,
    request = _ref.request;
  var activeChainId = _ref2.activeChainId,
    signerAddress = _ref2.signerAddress;
  return [{
    entity: "prepareSendTransaction",
    activeChainId: activeChainId,
    chainId: chainId,
    request: request,
    signerAddress: signerAddress
  }];
}
function queryFn$2(_ref3) {
  var signer = _ref3.signer;
  return function (_ref4) {
    var _ref4$queryKey3 = _slicedToArray(_ref4.queryKey, 1),
      _ref4$queryKey3$ = _ref4$queryKey3[0],
      chainId = _ref4$queryKey3$.chainId,
      request = _ref4$queryKey3$.request;
    if (!(request !== null && request !== void 0 && request.to)) throw new Error("request.to is required");
    return prepareSendTransaction({
      chainId: chainId,
      request: _objectSpread2(_objectSpread2({}, request), {}, {
        to: request.to
      }),
      signer: signer
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
  var _ref50 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    chainId = _ref50.chainId,
    request = _ref50.request,
    cacheTime = _ref50.cacheTime,
    _ref50$enabled = _ref50.enabled,
    enabled = _ref50$enabled === void 0 ? true : _ref50$enabled,
    _ref50$staleTime = _ref50.staleTime,
    staleTime = _ref50$staleTime === void 0 ? 1000 * 60 * 60 * 24 : _ref50$staleTime,
    suspense = _ref50.suspense,
    onError = _ref50.onError,
    onSettled = _ref50.onSettled,
    onSuccess = _ref50.onSuccess;
  var activeChainId = useChainId();
  var _useSigner2 = useSigner({
      chainId: chainId !== null && chainId !== void 0 ? chainId : activeChainId
    }),
    signer = _useSigner2.data;
  var prepareSendTransactionQuery = useQuery(queryKey$2({
    request: request,
    chainId: chainId
  }, {
    activeChainId: activeChainId,
    signerAddress: signer === null || signer === void 0 ? void 0 : signer._address
  }), queryFn$2({
    signer: signer
  }), {
    cacheTime: cacheTime,
    enabled: Boolean(enabled && signer && request && request.to),
    isDataEqual: deepEqual,
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
  return Object.assign(prepareSendTransactionQuery, {
    config: _objectSpread2({
      request: undefined,
      mode: "prepared"
    }, prepareSendTransactionQuery.data)
  });
}
var mutationKey = function mutationKey(args) {
  return [_objectSpread2({
    entity: "sendTransaction"
  }, args)];
};
var mutationFn = function mutationFn(_ref) {
  var chainId = _ref.chainId,
    mode = _ref.mode,
    request = _ref.request;
  return sendTransaction({
    chainId: chainId,
    mode: mode,
    request: request
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
  var chainId = _ref2.chainId,
    mode = _ref2.mode,
    request = _ref2.request,
    onError = _ref2.onError,
    onMutate = _ref2.onMutate,
    onSettled = _ref2.onSettled,
    onSuccess = _ref2.onSuccess;
  var _useMutation7 = useMutation(mutationKey({
      chainId: chainId,
      mode: mode,
      request: request
    }), mutationFn, {
      onError: onError,
      onMutate: onMutate,
      onSettled: onSettled,
      onSuccess: onSuccess
    }),
    data = _useMutation7.data,
    error = _useMutation7.error,
    isError = _useMutation7.isError,
    isIdle = _useMutation7.isIdle,
    isLoading = _useMutation7.isLoading,
    isSuccess = _useMutation7.isSuccess,
    mutate = _useMutation7.mutate,
    mutateAsync = _useMutation7.mutateAsync,
    reset = _useMutation7.reset,
    status = _useMutation7.status,
    variables = _useMutation7.variables;
  var sendTransaction = React__namespace.useCallback(function (args) {
    var _ref51;
    return mutate({
      chainId: chainId,
      mode: mode,
      request: (_ref51 = args === null || args === void 0 ? void 0 : args.recklesslySetUnpreparedRequest) !== null && _ref51 !== void 0 ? _ref51 : request
    });
  }, [chainId, mode, mutate, request]);
  var sendTransactionAsync = React__namespace.useCallback(function (args) {
    var _ref52;
    return mutateAsync({
      chainId: chainId,
      mode: mode,
      request: (_ref52 = args === null || args === void 0 ? void 0 : args.recklesslySetUnpreparedRequest) !== null && _ref52 !== void 0 ? _ref52 : request
    });
  }, [chainId, mode, mutateAsync, request]);
  return {
    data: data,
    error: error,
    isError: isError,
    isIdle: isIdle,
    isLoading: isLoading,
    isSuccess: isSuccess,
    reset: reset,
    sendTransaction: mode === "prepared" && !request ? undefined : sendTransaction,
    sendTransactionAsync: mode === "prepared" && !request ? undefined : sendTransactionAsync,
    status: status,
    variables: variables
  };
}
var queryKey$1 = function queryKey$1(_ref) {
  var chainId = _ref.chainId,
    hash = _ref.hash;
  return [{
    entity: "transaction",
    chainId: chainId,
    hash: hash
  }];
};
var queryFn$1 = function queryFn$1(_ref2) {
  var _ref2$queryKey10 = _slicedToArray(_ref2.queryKey, 1),
    _ref2$queryKey10$ = _ref2$queryKey10[0],
    chainId = _ref2$queryKey10$.chainId,
    hash = _ref2$queryKey10$.hash;
  if (!hash) throw new Error("hash is required");
  return fetchTransaction({
    chainId: chainId,
    hash: hash
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
  var _ref53 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref53$cacheTime = _ref53.cacheTime,
    cacheTime = _ref53$cacheTime === void 0 ? 0 : _ref53$cacheTime,
    chainId_ = _ref53.chainId,
    _ref53$enabled = _ref53.enabled,
    enabled = _ref53$enabled === void 0 ? true : _ref53$enabled,
    hash = _ref53.hash,
    staleTime = _ref53.staleTime,
    suspense = _ref53.suspense,
    onError = _ref53.onError,
    onSettled = _ref53.onSettled,
    onSuccess = _ref53.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  return useQuery(queryKey$1({
    chainId: chainId,
    hash: hash
  }), queryFn$1, {
    cacheTime: cacheTime,
    enabled: Boolean(enabled && hash),
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
}
var queryKey = function queryKey(_ref) {
  var confirmations = _ref.confirmations,
    chainId = _ref.chainId,
    hash = _ref.hash,
    timeout = _ref.timeout,
    wait = _ref.wait;
  return [{
    entity: "waitForTransaction",
    confirmations: confirmations,
    chainId: chainId,
    hash: hash,
    timeout: timeout,
    wait: wait
  }];
};
var queryFn = function queryFn(_ref2) {
  var _ref2$queryKey11 = _slicedToArray(_ref2.queryKey, 1),
    _ref2$queryKey11$ = _ref2$queryKey11[0],
    chainId = _ref2$queryKey11$.chainId,
    confirmations = _ref2$queryKey11$.confirmations,
    hash = _ref2$queryKey11$.hash,
    timeout = _ref2$queryKey11$.timeout,
    wait = _ref2$queryKey11$.wait;
  return waitForTransaction({
    chainId: chainId,
    confirmations: confirmations,
    hash: hash,
    timeout: timeout,
    wait: wait
  });
};
function useWaitForTransaction() {
  var _ref54 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    chainId_ = _ref54.chainId,
    confirmations = _ref54.confirmations,
    hash = _ref54.hash,
    timeout = _ref54.timeout,
    wait = _ref54.wait,
    cacheTime = _ref54.cacheTime,
    _ref54$enabled = _ref54.enabled,
    enabled = _ref54$enabled === void 0 ? true : _ref54$enabled,
    staleTime = _ref54.staleTime,
    suspense = _ref54.suspense,
    onError = _ref54.onError,
    onSettled = _ref54.onSettled,
    onSuccess = _ref54.onSuccess;
  var chainId = useChainId({
    chainId: chainId_
  });
  return useQuery(queryKey({
    chainId: chainId,
    confirmations: confirmations,
    hash: hash,
    timeout: timeout,
    wait: wait
  }), queryFn, {
    cacheTime: cacheTime,
    enabled: Boolean(enabled && (hash || wait)),
    staleTime: staleTime,
    suspense: suspense,
    onError: onError,
    onSettled: onSettled,
    onSuccess: onSuccess
  });
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

exports.Client = Client;

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

var ThirdStorageClient = /*#__PURE__*/function () {
  /**
   * Initialize a new SDK Instance
   * @param serverUrl
   * @param isConnected
   * @param connectedAddress
   */
  function ThirdStorageClient(serverUrl) {
    var isConnected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var connectedAddress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    _classCallCheck(this, ThirdStorageClient);
    _defineProperty(this, "serverUrl", void 0);
    _defineProperty(this, "encryptionAuthSig", void 0);
    _defineProperty(this, "litNodeClient", void 0);
    _defineProperty(this, "litJsSdk", void 0);
    _defineProperty(this, "axios", void 0);
    _defineProperty(this, "public", void 0);
    _defineProperty(this, "private", void 0);
    _defineProperty(this, "database", void 0);
    _defineProperty(this, "ipfs", void 0);
    _defineProperty(this, "ipns", void 0);
    _defineProperty(this, "wagmi", void 0);
    _defineProperty(this, "isConnected", false);
    _defineProperty(this, "connectedAddress", "");
    _defineProperty(this, "isInitialized", false);
    this.serverUrl = serverUrl;
    axios.defaults.baseURL = serverUrl;
    axios.defaults.withCredentials = true;
    this.axios = axios;
    this["public"] = new PublicClass(this);
    this["private"] = new PrivateClass(this);
    this.database = new DatabaseClass(this);
    this.ipfs = new IPFSClass(this);
    this.ipns = new IPNSClass(this);
    this.wagmi = exports;
    this.isConnected = isConnected;
    this.connectedAddress = connectedAddress;
    // this._initEncryption();
  }
  _createClass(ThirdStorageClient, [{
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var res;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.signedInWallet();
            case 2:
              res = _context.sent;
              if (res) {
                this.isConnected = true;
                this.connectedAddress = res;
              }

              // this._initEncryption();

              this.isInitialized = true;
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function initialize() {
        return _initialize.apply(this, arguments);
      }
      return initialize;
    }()
    /**
     * Method for authentication
     * @param address //Wallet address
     * @param chainId
     * @param signMessageAsync //Method used to signMessage provided by Wagmi
     * @returns {Promise<boolean>}
     */
  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(address, chainId, signMessageAsync) {
        var nonceRes, nonce, message, signature, verifyRes;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.axios.get("/auth/nonce");
            case 2:
              nonceRes = _context2.sent;
              _context2.next = 5;
              return nonceRes.data;
            case 5:
              nonce = _context2.sent;
              message = new SiweMessage({
                domain: window.location.host,
                address: address,
                statement: "Sign in with Ethereum to the app.",
                uri: window.location.origin,
                version: "1",
                chainId: chainId,
                nonce: nonce
              });
              _context2.next = 9;
              return signMessageAsync({
                message: message.prepareMessage()
              });
            case 9:
              signature = _context2.sent;
              _context2.next = 12;
              return this.axios.post("auth/verify", {
                message: message,
                signature: signature
              }, {
                headers: {
                  "Content-Type": "application/json"
                }
              });
            case 12:
              verifyRes = _context2.sent.data;
              if (verifyRes.ok) {
                _context2.next = 17;
                break;
              }
              throw new Error("Error verifying message");
            case 17:
              return _context2.abrupt("return", true);
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function signIn(_x, _x2, _x3) {
        return _signIn.apply(this, arguments);
      }
      return signIn;
    }()
    /**
     * Get the current Signed Wallet
     * @returns {Promise<*|boolean>} //Wallet address if authenticated else false
     */
  }, {
    key: "signedInWallet",
    value: function () {
      var _signedInWallet = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _yield$this$axios$get, _yield$this$axios$get2;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.axios.get("auth/me");
            case 2:
              _context3.t2 = _yield$this$axios$get2 = _context3.sent.data;
              _context3.t1 = _context3.t2 === null;
              if (_context3.t1) {
                _context3.next = 6;
                break;
              }
              _context3.t1 = _yield$this$axios$get2 === void 0;
            case 6:
              if (!_context3.t1) {
                _context3.next = 10;
                break;
              }
              _context3.t3 = void 0;
              _context3.next = 11;
              break;
            case 10:
              _context3.t3 = _yield$this$axios$get2.address;
            case 11:
              _context3.t4 = _yield$this$axios$get = _context3.t3;
              _context3.t0 = _context3.t4 !== null;
              if (!_context3.t0) {
                _context3.next = 15;
                break;
              }
              _context3.t0 = _yield$this$axios$get !== void 0;
            case 15:
              if (!_context3.t0) {
                _context3.next = 19;
                break;
              }
              _context3.t5 = _yield$this$axios$get;
              _context3.next = 20;
              break;
            case 19:
              _context3.t5 = false;
            case 20:
              return _context3.abrupt("return", _context3.t5);
            case 21:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function signedInWallet() {
        return _signedInWallet.apply(this, arguments);
      }
      return signedInWallet;
    }()
    /**
     * Logout the current authenticated user
     * @returns {Promise<boolean>}
     */
  }, {
    key: "signOut",
    value: function () {
      var _signOut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return axios.post("/auth/logout");
            case 2:
              return _context4.abrupt("return", true);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function signOut() {
        return _signOut.apply(this, arguments);
      }
      return signOut;
    }()
    /**
     * Set a key for the current user
     * @param key
     * @param value
     * @param isPrivate
     * @returns {Promise<*>}
     */
  }, {
    key: "set",
    value: function () {
      var _set = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(key, value) {
        var isPrivate,
          _args5 = arguments;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              isPrivate = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : false;
              if (!isPrivate) {
                _context5.next = 7;
                break;
              }
              _context5.next = 4;
              return this._encryptData(value, {});
            case 4:
              _context5.t0 = _context5.sent;
              _context5.next = 8;
              break;
            case 7:
              _context5.t0 = value;
            case 8:
              value = _context5.t0;
              _context5.next = 11;
              return this._serverFetch({
                path: "set",
                method: "POST",
                body: {
                  key: key,
                  value: value,
                  type: isPrivate ? "private" : "public"
                }
              });
            case 11:
              return _context5.abrupt("return", _context5.sent);
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function set(_x4, _x5) {
        return _set.apply(this, arguments);
      }
      return set;
    }()
    /**
     * Get data for a given key
     * @param key
     * @param isPrivate
     * @returns {Promise<{[p: string]: *}|*>}
     */
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(key) {
        var isPrivate,
          rawData,
          decryptedData,
          _args6 = arguments;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              isPrivate = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : false;
              _context6.next = 3;
              return this._serverFetch({
                path: "get?key=".concat(key, "&type=").concat(isPrivate ? "private" : "public"),
                method: "GET"
              });
            case 3:
              rawData = _context6.sent;
              if (!(isPrivate && this._isEncryptedData(rawData))) {
                _context6.next = 9;
                break;
              }
              _context6.next = 7;
              return this._decryptData(rawData.data, {});
            case 7:
              decryptedData = _context6.sent;
              return _context6.abrupt("return", _objectSpread2(_objectSpread2({}, rawData), {}, {
                data: decryptedData
              }));
            case 9:
              return _context6.abrupt("return", rawData);
            case 10:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function get(_x6) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Sign message for encryption using LitJsSDK
     * @returns {Promise<*>}
     */
  }, {
    key: "signMessageForEncryption",
    value: function () {
      var _signMessageForEncryption = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              if (!(typeof window === "undefined")) {
                _context7.next = 2;
                break;
              }
              throw new Error("Encryption messages can only be signed in the browser");
            case 2:
              _context7.next = 4;
              return this.litJsSdk.checkAndSignAuthMessage({
                chain: "ethereum"
              });
            case 4:
              this.encryptionAuthSig = _context7.sent;
              return _context7.abrupt("return", this.encryptionAuthSig);
            case 6:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function signMessageForEncryption() {
        return _signMessageForEncryption.apply(this, arguments);
      }
      return signMessageForEncryption;
    }()
    /**
     * Get current Encryption Auth Signature
     * @returns {*}
     */
  }, {
    key: "getEncryptionAuthSignature",
    value: function getEncryptionAuthSignature() {
      return this.encryptionAuthSig;
    }
  }, {
    key: "_serverFetch",
    value: function () {
      var _serverFetch2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref) {
        var path, method, body, res;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              path = _ref.path, method = _ref.method, body = _ref.body;
              if (!(method === "POST")) {
                _context8.next = 7;
                break;
              }
              _context8.next = 4;
              return this.axios.post(path, body);
            case 4:
              res = _context8.sent;
              _context8.next = 10;
              break;
            case 7:
              _context8.next = 9;
              return this.axios.get(path);
            case 9:
              res = _context8.sent;
            case 10:
              return _context8.abrupt("return", res.data);
            case 11:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function _serverFetch(_x7) {
        return _serverFetch2.apply(this, arguments);
      }
      return _serverFetch;
    }()
  }, {
    key: "_initEncryption",
    value: function () {
      var _initEncryption2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this._getLitSdkWithRetry();
            case 2:
              this.litJsSdk = _context9.sent;
              this.litNodeClient = new this.litJsSdk.LitNodeClient({
                debug: true,
                alertWhenUnauthorized: typeof window !== "undefined"
              });
              _context9.next = 6;
              return this.litNodeClient.connect({
                debug: true
              });
            case 6:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function _initEncryption() {
        return _initEncryption2.apply(this, arguments);
      }
      return _initEncryption;
    }()
  }, {
    key: "_getLitSdkWithRetry",
    value: function () {
      var _getLitSdkWithRetry2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var sdk;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              // polyfill hack for lit sdk to work in browser
              if (typeof window !== "undefined") {
                window.global = globalThis;
              }
              _context11.next = 3;
              return retry( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
                var _yield$import, LitJsSdk;
                return _regeneratorRuntime().wrap(function _callee10$(_context10) {
                  while (1) switch (_context10.prev = _context10.next) {
                    case 0:
                      if (!(typeof window !== "undefined" && window.LitJsSdk)) {
                        _context10.next = 2;
                        break;
                      }
                      return _context10.abrupt("return", window.LitJsSdk);
                    case 2:
                      _context10.next = 4;
                      return import('lit-js-sdk');
                    case 4:
                      _yield$import = _context10.sent;
                      LitJsSdk = _yield$import["default"];
                      return _context10.abrupt("return", LitJsSdk);
                    case 7:
                    case "end":
                      return _context10.stop();
                  }
                }, _callee10);
              })), {
                // retries: 5,
                // factor: 2, // exponential
                // maxTimeout: 5 * 60 * 1000, // 5 minutes
              });
            case 3:
              sdk = _context11.sent;
              if (sdk) {
                _context11.next = 6;
                break;
              }
              throw new Error("Failed to initialize encryption - lit sdk may not be installed");
            case 6:
              return _context11.abrupt("return", sdk);
            case 7:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function _getLitSdkWithRetry() {
        return _getLitSdkWithRetry2.apply(this, arguments);
      }
      return _getLitSdkWithRetry;
    }()
  }, {
    key: "_encryptData",
    value: function () {
      var _encryptData2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(dataToEncrypt, opts) {
        var stringified, resp, encryptedString, symmetricKey, authSig, accessControlConditions, encryptedSymmetricKey, encryptedData;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              if (!(!this.litJsSdk || !this.litNodeClient)) {
                _context12.next = 2;
                break;
              }
              throw new Error("Encryption not initialized");
            case 2:
              stringified = JSON.stringify(dataToEncrypt);
              _context12.next = 5;
              return this.litJsSdk.encryptString(stringified);
            case 5:
              resp = _context12.sent;
              if (resp) {
                _context12.next = 8;
                break;
              }
              throw new Error("Failed to encrypt");
            case 8:
              encryptedString = resp.encryptedString, symmetricKey = resp.symmetricKey;
              _context12.t0 = opts.overrideEncryptionAuthSig || this.encryptionAuthSig;
              if (_context12.t0) {
                _context12.next = 14;
                break;
              }
              _context12.next = 13;
              return this.signMessageForEncryption();
            case 13:
              _context12.t0 = _context12.sent;
            case 14:
              authSig = _context12.t0;
              if (authSig) {
                _context12.next = 17;
                break;
              }
              throw new Error("Auth sig is not defined");
            case 17:
              // gate it to the connected user
              accessControlConditions = [{
                contractAddress: "",
                standardContractType: "",
                chain: "ethereum",
                method: "",
                parameters: [":userAddress"],
                returnValueTest: {
                  comparator: "=",
                  value: authSig.address
                }
              }];
              _context12.next = 20;
              return this.litNodeClient.saveEncryptionKey({
                accessControlConditions: accessControlConditions,
                symmetricKey: symmetricKey,
                authSig: authSig,
                chain: "ethereum"
              });
            case 20:
              encryptedSymmetricKey = _context12.sent;
              _context12.next = 23;
              return this._getDataUrl(encryptedString);
            case 23:
              encryptedData = _context12.sent;
              return _context12.abrupt("return", {
                ownerAddress: authSig.address,
                encryptedSymmetricKey: this.litJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"),
                encryptedData: encryptedData
              });
            case 25:
            case "end":
              return _context12.stop();
          }
        }, _callee12, this);
      }));
      function _encryptData(_x8, _x9) {
        return _encryptData2.apply(this, arguments);
      }
      return _encryptData;
    }()
  }, {
    key: "_decryptData",
    value: function () {
      var _decryptData2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(dataToDecrypt) {
        var opts,
          encryptedData,
          encryptedSymmetricKey,
          ownerAddress,
          accessControlConditions,
          authSig,
          symmetricKey,
          blob,
          decryptedString,
          _args13 = arguments;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              opts = _args13.length > 1 && _args13[1] !== undefined ? _args13[1] : {};
              if (!(!this.litJsSdk || !this.litNodeClient)) {
                _context13.next = 3;
                break;
              }
              throw new Error("Encryption not initialized");
            case 3:
              encryptedData = dataToDecrypt.encryptedData, encryptedSymmetricKey = dataToDecrypt.encryptedSymmetricKey, ownerAddress = dataToDecrypt.ownerAddress;
              accessControlConditions = [{
                contractAddress: "",
                standardContractType: "",
                chain: "ethereum",
                method: "",
                parameters: [":userAddress"],
                returnValueTest: {
                  comparator: "=",
                  value: ownerAddress
                }
              }];
              _context13.t0 = (opts === null || opts === void 0 ? void 0 : opts.overrideEncryptionAuthSig) || this.encryptionAuthSig;
              if (_context13.t0) {
                _context13.next = 10;
                break;
              }
              _context13.next = 9;
              return this.signMessageForEncryption();
            case 9:
              _context13.t0 = _context13.sent;
            case 10:
              authSig = _context13.t0;
              _context13.next = 13;
              return this.litNodeClient.getEncryptionKey({
                accessControlConditions: accessControlConditions,
                toDecrypt: encryptedSymmetricKey,
                chain: "ethereum",
                authSig: authSig
              });
            case 13:
              symmetricKey = _context13.sent;
              _context13.next = 16;
              return fetch(encryptedData);
            case 16:
              _context13.next = 18;
              return _context13.sent.blob();
            case 18:
              blob = _context13.sent;
              _context13.next = 21;
              return this.litJsSdk.decryptString(blob, symmetricKey);
            case 21:
              decryptedString = _context13.sent;
              if (decryptedString) {
                _context13.next = 24;
                break;
              }
              throw new Error("Failed to decrypt");
            case 24:
              return _context13.abrupt("return", JSON.parse(decryptedString));
            case 25:
            case "end":
              return _context13.stop();
          }
        }, _callee13, this);
      }));
      function _decryptData(_x10) {
        return _decryptData2.apply(this, arguments);
      }
      return _decryptData;
    }()
  }, {
    key: "_isEncryptedData",
    value: function _isEncryptedData(maybeEncryptedData) {
      var _maybeEncryptedData$d;
      return !!(maybeEncryptedData !== null && maybeEncryptedData !== void 0 && (_maybeEncryptedData$d = maybeEncryptedData.data) !== null && _maybeEncryptedData$d !== void 0 && _maybeEncryptedData$d.encryptedSymmetricKey);
    }
  }, {
    key: "_getDataUrl",
    value: function _getDataUrl(blob) {
      return new Promise(function (resolve) {
        var fr = new FileReader();
        fr.addEventListener("load", function () {
          var _fr$result;
          // convert image file to base64 string
          resolve(((_fr$result = fr.result) === null || _fr$result === void 0 ? void 0 : _fr$result.toString()) || "");
        }, false);
        fr.readAsDataURL(blob);
      });
    }
  }]);
  return ThirdStorageClient;
}();
var PublicClass = /*#__PURE__*/function () {
  function PublicClass(client) {
    _classCallCheck(this, PublicClass);
    _defineProperty(this, "client", void 0);
    this.client = client;
  }
  _createClass(PublicClass, [{
    key: "set",
    value: function () {
      var _set2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(key, value) {
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", this.client.set(key, value, false));
            case 1:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this);
      }));
      function set(_x11, _x12) {
        return _set2.apply(this, arguments);
      }
      return set;
    }()
  }, {
    key: "get",
    value: function () {
      var _get2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(key) {
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              return _context15.abrupt("return", this.client.get(key, false));
            case 1:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function get(_x13) {
        return _get2.apply(this, arguments);
      }
      return get;
    }()
  }]);
  return PublicClass;
}();
var PrivateClass = /*#__PURE__*/function () {
  function PrivateClass(client) {
    _classCallCheck(this, PrivateClass);
    _defineProperty(this, "client", void 0);
    this.client = client;
  }
  _createClass(PrivateClass, [{
    key: "set",
    value: function () {
      var _set3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(key, value) {
        return _regeneratorRuntime().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", this.client.set(key, value, true));
            case 1:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function set(_x14, _x15) {
        return _set3.apply(this, arguments);
      }
      return set;
    }()
  }, {
    key: "get",
    value: function () {
      var _get3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(key) {
        return _regeneratorRuntime().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              return _context17.abrupt("return", this.client.get(key, true));
            case 1:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this);
      }));
      function get(_x16) {
        return _get3.apply(this, arguments);
      }
      return get;
    }()
  }]);
  return PrivateClass;
}();
var DatabaseClass = /*#__PURE__*/function () {
  function DatabaseClass(client) {
    _classCallCheck(this, DatabaseClass);
    _defineProperty(this, "client", void 0);
    this.client = client;
  }
  _createClass(DatabaseClass, [{
    key: "set",
    value: function () {
      var _set4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(key, value) {
        return _regeneratorRuntime().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return this.client.axios.post("db/set", {
                key: key,
                value: value
              }, {
                headers: {
                  "Content-Type": "application/json"
                }
              });
            case 2:
              _context18.t0 = key;
              return _context18.abrupt("return", _context18.sent.data.data[_context18.t0]);
            case 4:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function set(_x17, _x18) {
        return _set4.apply(this, arguments);
      }
      return set;
    }()
  }, {
    key: "get",
    value: function () {
      var _get4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(key) {
        var _yield$this$client$ax;
        return _regeneratorRuntime().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return this.client.axios.get("db/get", {
                headers: {
                  "Content-Type": "application/json"
                }
              });
            case 2:
              _context19.t1 = key;
              _context19.t2 = _yield$this$client$ax = _context19.sent.data.data[_context19.t1];
              _context19.t0 = _context19.t2 !== null;
              if (!_context19.t0) {
                _context19.next = 7;
                break;
              }
              _context19.t0 = _yield$this$client$ax !== void 0;
            case 7:
              if (!_context19.t0) {
                _context19.next = 11;
                break;
              }
              _context19.t3 = _yield$this$client$ax;
              _context19.next = 12;
              break;
            case 11:
              _context19.t3 = null;
            case 12:
              return _context19.abrupt("return", _context19.t3);
            case 13:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function get(_x19) {
        return _get4.apply(this, arguments);
      }
      return get;
    }()
  }]);
  return DatabaseClass;
}();
var IPFSClass = /*#__PURE__*/function () {
  function IPFSClass(client) {
    _classCallCheck(this, IPFSClass);
    _defineProperty(this, "client", void 0);
    this.client = client;
  }
  _createClass(IPFSClass, [{
    key: "set",
    value: function () {
      var _set5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(key, file) {
        var data;
        return _regeneratorRuntime().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              data = new FormData();
              data.append("key", key);
              data.append("file", file);
              _context20.next = 5;
              return this.client.axios.post("storage/set", data, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
            case 5:
              return _context20.abrupt("return", _context20.sent.data.cid);
            case 6:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function set(_x20, _x21) {
        return _set5.apply(this, arguments);
      }
      return set;
    }()
  }, {
    key: "get",
    value: function () {
      var _get5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(key) {
        var _yield$this$client$ax2, _yield$this$client$ax3, _yield$this$client$ax4;
        return _regeneratorRuntime().wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return this.client.axios.get("storage/get", {
                headers: {
                  "Content-Type": "application/json"
                }
              });
            case 2:
              _context21.t2 = _yield$this$client$ax3 = _context21.sent.data;
              _context21.t1 = _context21.t2 === null;
              if (_context21.t1) {
                _context21.next = 6;
                break;
              }
              _context21.t1 = _yield$this$client$ax3 === void 0;
            case 6:
              if (!_context21.t1) {
                _context21.next = 10;
                break;
              }
              _context21.t3 = void 0;
              _context21.next = 11;
              break;
            case 10:
              _context21.t3 = (_yield$this$client$ax4 = _yield$this$client$ax3.data) === null || _yield$this$client$ax4 === void 0 ? void 0 : _yield$this$client$ax4.filter(function (file) {
                return file.name === key;
              })[0].cid;
            case 11:
              _context21.t4 = _yield$this$client$ax2 = _context21.t3;
              _context21.t0 = _context21.t4 !== null;
              if (!_context21.t0) {
                _context21.next = 15;
                break;
              }
              _context21.t0 = _yield$this$client$ax2 !== void 0;
            case 15:
              if (!_context21.t0) {
                _context21.next = 19;
                break;
              }
              _context21.t5 = _yield$this$client$ax2;
              _context21.next = 20;
              break;
            case 19:
              _context21.t5 = null;
            case 20:
              return _context21.abrupt("return", _context21.t5);
            case 21:
            case "end":
              return _context21.stop();
          }
        }, _callee21, this);
      }));
      function get(_x22) {
        return _get5.apply(this, arguments);
      }
      return get;
    }()
  }]);
  return IPFSClass;
}();
var IPNSClass = /*#__PURE__*/function () {
  function IPNSClass(client) {
    _classCallCheck(this, IPNSClass);
    _defineProperty(this, "client", void 0);
    this.client = client;
  }

  /**
   * Creates a new IPNS name, stores the file in IPFS and stores its CID in the generated name
   * @param key
   * @param file
   * @returns {Promise<*>}
   */
  _createClass(IPNSClass, [{
    key: "set",
    value: function () {
      var _set6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(key, file) {
        var data;
        return _regeneratorRuntime().wrap(function _callee22$(_context22) {
          while (1) switch (_context22.prev = _context22.next) {
            case 0:
              data = new FormData();
              data.append("key", key);
              data.append("file", file);
              _context22.next = 5;
              return this.client.axios.post("storage/ipns/set", data, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              });
            case 5:
              return _context22.abrupt("return", _context22.sent.data.name);
            case 6:
            case "end":
              return _context22.stop();
          }
        }, _callee22, this);
      }));
      function set(_x23, _x24) {
        return _set6.apply(this, arguments);
      }
      return set;
    }()
  }, {
    key: "get",
    value: function () {
      var _get6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(key) {
        var _yield$this$client$ax5, _yield$this$client$ax6, _yield$this$client$ax7;
        return _regeneratorRuntime().wrap(function _callee23$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return this.client.axios.get("storage/ipns/get", {
                headers: {
                  "Content-Type": "application/json"
                }
              });
            case 2:
              _context23.t2 = _yield$this$client$ax6 = _context23.sent.data;
              _context23.t1 = _context23.t2 === null;
              if (_context23.t1) {
                _context23.next = 6;
                break;
              }
              _context23.t1 = _yield$this$client$ax6 === void 0;
            case 6:
              if (!_context23.t1) {
                _context23.next = 10;
                break;
              }
              _context23.t3 = void 0;
              _context23.next = 11;
              break;
            case 10:
              _context23.t3 = (_yield$this$client$ax7 = _yield$this$client$ax6.data) === null || _yield$this$client$ax7 === void 0 ? void 0 : _yield$this$client$ax7.filter(function (file) {
                return file.name === key;
              })[0].value;
            case 11:
              _context23.t4 = _yield$this$client$ax5 = _context23.t3;
              _context23.t0 = _context23.t4 !== null;
              if (!_context23.t0) {
                _context23.next = 15;
                break;
              }
              _context23.t0 = _yield$this$client$ax5 !== void 0;
            case 15:
              if (!_context23.t0) {
                _context23.next = 19;
                break;
              }
              _context23.t5 = _yield$this$client$ax5;
              _context23.next = 20;
              break;
            case 19:
              _context23.t5 = null;
            case 20:
              return _context23.abrupt("return", _context23.t5);
            case 21:
            case "end":
              return _context23.stop();
          }
        }, _callee23, this);
      }));
      function get(_x25) {
        return _get6.apply(this, arguments);
      }
      return get;
    }()
  }]);
  return IPNSClass;
}();

function createThirdStorageClient(_x) {
  return _createThirdStorageClient.apply(this, arguments);
}
function _createThirdStorageClient() {
  _createThirdStorageClient = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(serverUrl) {
    var isConnected, connectedAddress, res;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          isConnected = false;
          connectedAddress = "";
          _context.next = 4;
          return new ThirdStorageClient(serverUrl).signedInWallet();
        case 4:
          res = _context.sent;
          console.log(res);
          if (res) {
            isConnected = true;
            connectedAddress = res;
          }
          return _context.abrupt("return", new ThirdStorageClient(serverUrl, isConnected, connectedAddress));
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _createThirdStorageClient.apply(this, arguments);
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function ArcanaAuthButton({ thirdStorageClient }) {
    const [isInitializing, setIsInitializing] = useState(false);
    const { useAccount, useSignMessage, useNetwork, useConnect } = exports;
    const { connectAsync, connectors, isLoading } = useConnect();
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { chain: activeChain } = useNetwork();
    const signIn = (a = null, chainId = null) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let res = {};
            if (!isConnected) {
                res = yield connectAsync({
                    connector: connectors[3],
                });
                a = res.account;
                chainId = (_a = res.chain) === null || _a === void 0 ? void 0 : _a.id;
            }
            else {
                a = address;
                chainId = activeChain === null || activeChain === void 0 ? void 0 : activeChain.id;
                if (!address || !chainId)
                    return;
            }
            setIsInitializing(false);
            if (yield thirdStorageClient.signIn(a, chainId, signMessageAsync)) {
                alert("Logged in!");
                window.location.href = window.location.href;
            }
        }
        catch (error) {
            setIsInitializing(false);
            console.log(error.message);
        }
    });
    return (React.createElement("button", { onClick: () => __awaiter(this, void 0, void 0, function* () {
            setIsInitializing(true);
            yield signIn();
        }), disabled: !connectors[3].ready || isConnected || thirdStorageClient.isConnected, className: "p-3 border rounded-xl border-gray-400 text-[#ffffff9d] title" }, isInitializing
        ? "Connecting"
        : isConnected
            ? `Connected to ${thirdStorageClient.connectedAddress.substring(0, 3)}...${thirdStorageClient.connectedAddress.substring(thirdStorageClient.connectedAddress.length - 3, thirdStorageClient.connectedAddress.length)} `
            : "Connect Wallet with Arcana"));
}

function MetamaskAuthButton({ thirdStorageClient }) {
    const [isInitializing, setIsInitializing] = useState(false);
    const { useAccount, useSignMessage, useNetwork, useConnect } = exports;
    const { connectAsync, connectors, isLoading } = useConnect();
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { chain: activeChain } = useNetwork();
    const signIn = (a = null, chainId = null) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            let res = {};
            if (!isConnected) {
                res = yield connectAsync({
                    connector: connectors[1],
                });
                a = res.account;
                chainId = (_a = res.chain) === null || _a === void 0 ? void 0 : _a.id;
            }
            else {
                a = address;
                chainId = activeChain === null || activeChain === void 0 ? void 0 : activeChain.id;
                if (!address || !chainId)
                    return;
            }
            setIsInitializing(false);
            if (yield thirdStorageClient.signIn(a, chainId, signMessageAsync)) {
                alert("Logged in!");
                window.location.href = window.location.href;
            }
        }
        catch (error) {
            setIsInitializing(false);
            console.log(error.message);
        }
    });
    return (React.createElement("button", { onClick: () => __awaiter(this, void 0, void 0, function* () {
            setIsInitializing(true);
            yield signIn();
        }), disabled: !connectors[1].ready || isConnected || thirdStorageClient.isConnected, className: "p-3 border rounded-xl border-gray-400 text-[#ffffff9d] title" }, isInitializing
        ? "Connecting"
        : isConnected
            ? `Connected to ${thirdStorageClient.connectedAddress.substring(0, 3)}...${thirdStorageClient.connectedAddress.substring(thirdStorageClient.connectedAddress.length - 3, thirdStorageClient.connectedAddress.length)} `
            : "Connect Wallet with Metamask"));
}

function DisconnectButton({ thirdStorageClient }) {
    const { useAccount, useDisconnect } = exports;
    const { disconnect } = useDisconnect();
    return (React.createElement("button", { onClick: () => __awaiter(this, void 0, void 0, function* () {
            yield thirdStorageClient.signOut();
            yield disconnect();
            window.location.href = window.location.href;
        }), disabled: !thirdStorageClient.isConnected, className: "p-3 border rounded-xl border-gray-400 text-[#ffffff9d] title" }, !thirdStorageClient.isConnected
        ? `Connect Wallet to disconnect`
        : "Disconnect Wallet"));
}

window.Buffer = Buffer;

export { ArcanaAuthButton, AuthWrapper, Context$1 as Context, DisconnectButton, MetamaskAuthButton, ThirdStorageClient, createThirdStorageClient, queryClientContext$1 as queryClientContext };
