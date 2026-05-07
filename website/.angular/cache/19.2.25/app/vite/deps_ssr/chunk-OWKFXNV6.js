import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  require_async
} from "./chunk-RATDSHE6.js";
import {
  require_express
} from "./chunk-Z5YJFFGF.js";
import {
  __async,
  __asyncGenerator,
  __await,
  __commonJS,
  __esm,
  __export,
  __objRest,
  __require,
  __spreadProps,
  __spreadValues,
  __toCommonJS,
  __toESM,
  __yieldStar
} from "./chunk-PNXJXBRO.js";

// node_modules/@opentelemetry/api/build/esm/version.js
var VERSION;
var init_version = __esm({
  "node_modules/@opentelemetry/api/build/esm/version.js"() {
    VERSION = "1.9.1";
  }
});

// node_modules/@opentelemetry/api/build/esm/internal/semver.js
function _makeCompatibilityCheck(ownVersion) {
  const acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
  const rejectedVersions = /* @__PURE__ */ new Set();
  const myVersionMatch = ownVersion.match(re);
  if (!myVersionMatch) {
    return () => false;
  }
  const ownVersionParsed = {
    major: +myVersionMatch[1],
    minor: +myVersionMatch[2],
    patch: +myVersionMatch[3],
    prerelease: myVersionMatch[4]
  };
  if (ownVersionParsed.prerelease != null) {
    return function isExactmatch(globalVersion) {
      return globalVersion === ownVersion;
    };
  }
  function _reject(v) {
    rejectedVersions.add(v);
    return false;
  }
  function _accept(v) {
    acceptedVersions.add(v);
    return true;
  }
  return function isCompatible2(globalVersion) {
    if (acceptedVersions.has(globalVersion)) {
      return true;
    }
    if (rejectedVersions.has(globalVersion)) {
      return false;
    }
    const globalVersionMatch = globalVersion.match(re);
    if (!globalVersionMatch) {
      return _reject(globalVersion);
    }
    const globalVersionParsed = {
      major: +globalVersionMatch[1],
      minor: +globalVersionMatch[2],
      patch: +globalVersionMatch[3],
      prerelease: globalVersionMatch[4]
    };
    if (globalVersionParsed.prerelease != null) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major !== globalVersionParsed.major) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major === 0) {
      if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
        return _accept(globalVersion);
      }
      return _reject(globalVersion);
    }
    if (ownVersionParsed.minor <= globalVersionParsed.minor) {
      return _accept(globalVersion);
    }
    return _reject(globalVersion);
  };
}
var re, isCompatible;
var init_semver = __esm({
  "node_modules/@opentelemetry/api/build/esm/internal/semver.js"() {
    init_version();
    re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
    isCompatible = _makeCompatibilityCheck(VERSION);
  }
});

// node_modules/@opentelemetry/api/build/esm/internal/global-utils.js
function registerGlobal(type, instance, diag3, allowOverride = false) {
  var _a2;
  const api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a2 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a2 !== void 0 ? _a2 : {
    version: VERSION
  };
  if (!allowOverride && api[type]) {
    const err = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${type}`);
    diag3.error(err.stack || err.message);
    return false;
  }
  if (api.version !== VERSION) {
    const err = new Error(`@opentelemetry/api: Registration of version v${api.version} for ${type} does not match previously registered API v${VERSION}`);
    diag3.error(err.stack || err.message);
    return false;
  }
  api[type] = instance;
  diag3.debug(`@opentelemetry/api: Registered a global for ${type} v${VERSION}.`);
  return true;
}
function getGlobal(type) {
  var _a2, _b;
  const globalVersion = (_a2 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a2 === void 0 ? void 0 : _a2.version;
  if (!globalVersion || !isCompatible(globalVersion)) {
    return;
  }
  return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
}
function unregisterGlobal(type, diag3) {
  diag3.debug(`@opentelemetry/api: Unregistering a global for ${type} v${VERSION}.`);
  const api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
  if (api) {
    delete api[type];
  }
}
var major, GLOBAL_OPENTELEMETRY_API_KEY, _global;
var init_global_utils = __esm({
  "node_modules/@opentelemetry/api/build/esm/internal/global-utils.js"() {
    init_version();
    init_semver();
    major = VERSION.split(".")[0];
    GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for(`opentelemetry.js.api.${major}`);
    _global = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};
  }
});

// node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js
function logProxy(funcName, namespace, args) {
  const logger2 = getGlobal("diag");
  if (!logger2) {
    return;
  }
  return logger2[funcName](namespace, ...args);
}
var DiagComponentLogger;
var init_ComponentLogger = __esm({
  "node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js"() {
    init_global_utils();
    DiagComponentLogger = class {
      constructor(props) {
        this._namespace = props.namespace || "DiagComponentLogger";
      }
      debug(...args) {
        return logProxy("debug", this._namespace, args);
      }
      error(...args) {
        return logProxy("error", this._namespace, args);
      }
      info(...args) {
        return logProxy("info", this._namespace, args);
      }
      warn(...args) {
        return logProxy("warn", this._namespace, args);
      }
      verbose(...args) {
        return logProxy("verbose", this._namespace, args);
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/diag/types.js
var DiagLogLevel;
var init_types = __esm({
  "node_modules/@opentelemetry/api/build/esm/diag/types.js"() {
    (function(DiagLogLevel2) {
      DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
      DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
      DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
      DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
      DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
      DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
      DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
    })(DiagLogLevel || (DiagLogLevel = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js
function createLogLevelDiagLogger(maxLevel, logger2) {
  if (maxLevel < DiagLogLevel.NONE) {
    maxLevel = DiagLogLevel.NONE;
  } else if (maxLevel > DiagLogLevel.ALL) {
    maxLevel = DiagLogLevel.ALL;
  }
  logger2 = logger2 || {};
  function _filterFunc(funcName, theLevel) {
    const theFunc = logger2[funcName];
    if (typeof theFunc === "function" && maxLevel >= theLevel) {
      return theFunc.bind(logger2);
    }
    return function() {
    };
  }
  return {
    error: _filterFunc("error", DiagLogLevel.ERROR),
    warn: _filterFunc("warn", DiagLogLevel.WARN),
    info: _filterFunc("info", DiagLogLevel.INFO),
    debug: _filterFunc("debug", DiagLogLevel.DEBUG),
    verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
  };
}
var init_logLevelLogger = __esm({
  "node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js"() {
    init_types();
  }
});

// node_modules/@opentelemetry/api/build/esm/api/diag.js
var API_NAME, DiagAPI;
var init_diag = __esm({
  "node_modules/@opentelemetry/api/build/esm/api/diag.js"() {
    init_ComponentLogger();
    init_logLevelLogger();
    init_types();
    init_global_utils();
    API_NAME = "diag";
    DiagAPI = class _DiagAPI {
      /** Get the singleton instance of the DiagAPI API */
      static instance() {
        if (!this._instance) {
          this._instance = new _DiagAPI();
        }
        return this._instance;
      }
      /**
       * Private internal constructor
       * @private
       */
      constructor() {
        function _logProxy(funcName) {
          return function(...args) {
            const logger2 = getGlobal("diag");
            if (!logger2) return;
            return logger2[funcName](...args);
          };
        }
        const self2 = this;
        const setLogger = (logger2, optionsOrLogLevel = {
          logLevel: DiagLogLevel.INFO
        }) => {
          var _a2, _b, _c;
          if (logger2 === self2) {
            const err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
            self2.error((_a2 = err.stack) !== null && _a2 !== void 0 ? _a2 : err.message);
            return false;
          }
          if (typeof optionsOrLogLevel === "number") {
            optionsOrLogLevel = {
              logLevel: optionsOrLogLevel
            };
          }
          const oldLogger = getGlobal("diag");
          const newLogger = createLogLevelDiagLogger((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : DiagLogLevel.INFO, logger2);
          if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
            const stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
            oldLogger.warn(`Current logger will be overwritten from ${stack}`);
            newLogger.warn(`Current logger will overwrite one already registered from ${stack}`);
          }
          return registerGlobal("diag", newLogger, self2, true);
        };
        self2.setLogger = setLogger;
        self2.disable = () => {
          unregisterGlobal(API_NAME, self2);
        };
        self2.createComponentLogger = (options) => {
          return new DiagComponentLogger(options);
        };
        self2.verbose = _logProxy("verbose");
        self2.debug = _logProxy("debug");
        self2.info = _logProxy("info");
        self2.warn = _logProxy("warn");
        self2.error = _logProxy("error");
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/baggage/internal/baggage-impl.js
var BaggageImpl;
var init_baggage_impl = __esm({
  "node_modules/@opentelemetry/api/build/esm/baggage/internal/baggage-impl.js"() {
    BaggageImpl = class _BaggageImpl {
      constructor(entries) {
        this._entries = entries ? new Map(entries) : /* @__PURE__ */ new Map();
      }
      getEntry(key) {
        const entry = this._entries.get(key);
        if (!entry) {
          return void 0;
        }
        return Object.assign({}, entry);
      }
      getAllEntries() {
        return Array.from(this._entries.entries());
      }
      setEntry(key, entry) {
        const newBaggage = new _BaggageImpl(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
      }
      removeEntry(key) {
        const newBaggage = new _BaggageImpl(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
      }
      removeEntries(...keys) {
        const newBaggage = new _BaggageImpl(this._entries);
        for (const key of keys) {
          newBaggage._entries.delete(key);
        }
        return newBaggage;
      }
      clear() {
        return new _BaggageImpl();
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/baggage/internal/symbol.js
var baggageEntryMetadataSymbol;
var init_symbol = __esm({
  "node_modules/@opentelemetry/api/build/esm/baggage/internal/symbol.js"() {
    baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
  }
});

// node_modules/@opentelemetry/api/build/esm/baggage/utils.js
function createBaggage(entries = {}) {
  return new BaggageImpl(new Map(Object.entries(entries)));
}
function baggageEntryMetadataFromString(str) {
  if (typeof str !== "string") {
    diag.error(`Cannot create baggage metadata from unknown type: ${typeof str}`);
    str = "";
  }
  return {
    __TYPE__: baggageEntryMetadataSymbol,
    toString() {
      return str;
    }
  };
}
var diag;
var init_utils = __esm({
  "node_modules/@opentelemetry/api/build/esm/baggage/utils.js"() {
    init_diag();
    init_baggage_impl();
    init_symbol();
    diag = DiagAPI.instance();
  }
});

// node_modules/@opentelemetry/api/build/esm/context/context.js
function createContextKey(description) {
  return Symbol.for(description);
}
var BaseContext, ROOT_CONTEXT;
var init_context = __esm({
  "node_modules/@opentelemetry/api/build/esm/context/context.js"() {
    BaseContext = class _BaseContext {
      /**
       * Construct a new context which inherits values from an optional parent context.
       *
       * @param parentContext a context from which to inherit values
       */
      constructor(parentContext) {
        const self2 = this;
        self2._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
        self2.getValue = (key) => self2._currentContext.get(key);
        self2.setValue = (key, value) => {
          const context2 = new _BaseContext(self2._currentContext);
          context2._currentContext.set(key, value);
          return context2;
        };
        self2.deleteValue = (key) => {
          const context2 = new _BaseContext(self2._currentContext);
          context2._currentContext.delete(key);
          return context2;
        };
      }
    };
    ROOT_CONTEXT = new BaseContext();
  }
});

// node_modules/@opentelemetry/api/build/esm/diag/consoleLogger.js
var consoleMap, _originalConsoleMethods, DiagConsoleLogger;
var init_consoleLogger = __esm({
  "node_modules/@opentelemetry/api/build/esm/diag/consoleLogger.js"() {
    consoleMap = [{
      n: "error",
      c: "error"
    }, {
      n: "warn",
      c: "warn"
    }, {
      n: "info",
      c: "info"
    }, {
      n: "debug",
      c: "debug"
    }, {
      n: "verbose",
      c: "trace"
    }];
    _originalConsoleMethods = {};
    if (typeof console !== "undefined") {
      const keys = ["error", "warn", "info", "debug", "trace", "log"];
      for (const key of keys) {
        if (typeof console[key] === "function") {
          _originalConsoleMethods[key] = console[key];
        }
      }
    }
    DiagConsoleLogger = class {
      constructor() {
        function _consoleFunc(funcName) {
          return function(...args) {
            let theFunc = _originalConsoleMethods[funcName];
            if (typeof theFunc !== "function") {
              theFunc = _originalConsoleMethods["log"];
            }
            if (typeof theFunc !== "function" && console) {
              theFunc = console[funcName];
              if (typeof theFunc !== "function") {
                theFunc = console.log;
              }
            }
            if (typeof theFunc === "function") {
              return theFunc.apply(console, args);
            }
          };
        }
        for (let i = 0; i < consoleMap.length; i++) {
          this[consoleMap[i].n] = _consoleFunc(consoleMap[i].c);
        }
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/metrics/NoopMeter.js
function createNoopMeter() {
  return NOOP_METER;
}
var NoopMeter, NoopMetric, NoopCounterMetric, NoopUpDownCounterMetric, NoopGaugeMetric, NoopHistogramMetric, NoopObservableMetric, NoopObservableCounterMetric, NoopObservableGaugeMetric, NoopObservableUpDownCounterMetric, NOOP_METER, NOOP_COUNTER_METRIC, NOOP_GAUGE_METRIC, NOOP_HISTOGRAM_METRIC, NOOP_UP_DOWN_COUNTER_METRIC, NOOP_OBSERVABLE_COUNTER_METRIC, NOOP_OBSERVABLE_GAUGE_METRIC, NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
var init_NoopMeter = __esm({
  "node_modules/@opentelemetry/api/build/esm/metrics/NoopMeter.js"() {
    NoopMeter = class {
      constructor() {
      }
      /**
       * @see {@link Meter.createGauge}
       */
      createGauge(_name, _options) {
        return NOOP_GAUGE_METRIC;
      }
      /**
       * @see {@link Meter.createHistogram}
       */
      createHistogram(_name, _options) {
        return NOOP_HISTOGRAM_METRIC;
      }
      /**
       * @see {@link Meter.createCounter}
       */
      createCounter(_name, _options) {
        return NOOP_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createUpDownCounter}
       */
      createUpDownCounter(_name, _options) {
        return NOOP_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableGauge}
       */
      createObservableGauge(_name, _options) {
        return NOOP_OBSERVABLE_GAUGE_METRIC;
      }
      /**
       * @see {@link Meter.createObservableCounter}
       */
      createObservableCounter(_name, _options) {
        return NOOP_OBSERVABLE_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableUpDownCounter}
       */
      createObservableUpDownCounter(_name, _options) {
        return NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.addBatchObservableCallback}
       */
      addBatchObservableCallback(_callback, _observables) {
      }
      /**
       * @see {@link Meter.removeBatchObservableCallback}
       */
      removeBatchObservableCallback(_callback) {
      }
    };
    NoopMetric = class {
    };
    NoopCounterMetric = class extends NoopMetric {
      add(_value, _attributes) {
      }
    };
    NoopUpDownCounterMetric = class extends NoopMetric {
      add(_value, _attributes) {
      }
    };
    NoopGaugeMetric = class extends NoopMetric {
      record(_value, _attributes) {
      }
    };
    NoopHistogramMetric = class extends NoopMetric {
      record(_value, _attributes) {
      }
    };
    NoopObservableMetric = class {
      addCallback(_callback) {
      }
      removeCallback(_callback) {
      }
    };
    NoopObservableCounterMetric = class extends NoopObservableMetric {
    };
    NoopObservableGaugeMetric = class extends NoopObservableMetric {
    };
    NoopObservableUpDownCounterMetric = class extends NoopObservableMetric {
    };
    NOOP_METER = new NoopMeter();
    NOOP_COUNTER_METRIC = new NoopCounterMetric();
    NOOP_GAUGE_METRIC = new NoopGaugeMetric();
    NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
    NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
    NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
    NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
    NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
  }
});

// node_modules/@opentelemetry/api/build/esm/metrics/Metric.js
var ValueType;
var init_Metric = __esm({
  "node_modules/@opentelemetry/api/build/esm/metrics/Metric.js"() {
    (function(ValueType2) {
      ValueType2[ValueType2["INT"] = 0] = "INT";
      ValueType2[ValueType2["DOUBLE"] = 1] = "DOUBLE";
    })(ValueType || (ValueType = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/propagation/TextMapPropagator.js
var defaultTextMapGetter, defaultTextMapSetter;
var init_TextMapPropagator = __esm({
  "node_modules/@opentelemetry/api/build/esm/propagation/TextMapPropagator.js"() {
    defaultTextMapGetter = {
      get(carrier, key) {
        if (carrier == null) {
          return void 0;
        }
        return carrier[key];
      },
      keys(carrier) {
        if (carrier == null) {
          return [];
        }
        return Object.keys(carrier);
      }
    };
    defaultTextMapSetter = {
      set(carrier, key, value) {
        if (carrier == null) {
          return;
        }
        carrier[key] = value;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js
var NoopContextManager;
var init_NoopContextManager = __esm({
  "node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js"() {
    init_context();
    NoopContextManager = class {
      active() {
        return ROOT_CONTEXT;
      }
      with(_context, fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      bind(_context, target) {
        return target;
      }
      enable() {
        return this;
      }
      disable() {
        return this;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/api/context.js
var API_NAME2, NOOP_CONTEXT_MANAGER, ContextAPI;
var init_context2 = __esm({
  "node_modules/@opentelemetry/api/build/esm/api/context.js"() {
    init_NoopContextManager();
    init_global_utils();
    init_diag();
    API_NAME2 = "context";
    NOOP_CONTEXT_MANAGER = new NoopContextManager();
    ContextAPI = class _ContextAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Context API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _ContextAPI();
        }
        return this._instance;
      }
      /**
       * Set the current context manager.
       *
       * @returns true if the context manager was successfully registered, else false
       */
      setGlobalContextManager(contextManager) {
        return registerGlobal(API_NAME2, contextManager, DiagAPI.instance());
      }
      /**
       * Get the currently active context
       */
      active() {
        return this._getContextManager().active();
      }
      /**
       * Execute a function with an active context
       *
       * @param context context to be active during function execution
       * @param fn function to execute in a context
       * @param thisArg optional receiver to be used for calling fn
       * @param args optional arguments forwarded to fn
       */
      with(context2, fn, thisArg, ...args) {
        return this._getContextManager().with(context2, fn, thisArg, ...args);
      }
      /**
       * Bind a context to a target function or event emitter
       *
       * @param context context to bind to the event emitter or function. Defaults to the currently active context
       * @param target function or event emitter to bind
       */
      bind(context2, target) {
        return this._getContextManager().bind(context2, target);
      }
      _getContextManager() {
        return getGlobal(API_NAME2) || NOOP_CONTEXT_MANAGER;
      }
      /** Disable and remove the global context manager */
      disable() {
        this._getContextManager().disable();
        unregisterGlobal(API_NAME2, DiagAPI.instance());
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js
var TraceFlags;
var init_trace_flags = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js"() {
    (function(TraceFlags2) {
      TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
      TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
    })(TraceFlags || (TraceFlags = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js
var INVALID_SPANID, INVALID_TRACEID, INVALID_SPAN_CONTEXT;
var init_invalid_span_constants = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js"() {
    init_trace_flags();
    INVALID_SPANID = "0000000000000000";
    INVALID_TRACEID = "00000000000000000000000000000000";
    INVALID_SPAN_CONTEXT = {
      traceId: INVALID_TRACEID,
      spanId: INVALID_SPANID,
      traceFlags: TraceFlags.NONE
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js
var NonRecordingSpan;
var init_NonRecordingSpan = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js"() {
    init_invalid_span_constants();
    NonRecordingSpan = class {
      constructor(spanContext = INVALID_SPAN_CONTEXT) {
        this._spanContext = spanContext;
      }
      // Returns a SpanContext.
      spanContext() {
        return this._spanContext;
      }
      // By default does nothing
      setAttribute(_key, _value) {
        return this;
      }
      // By default does nothing
      setAttributes(_attributes) {
        return this;
      }
      // By default does nothing
      addEvent(_name, _attributes) {
        return this;
      }
      addLink(_link) {
        return this;
      }
      addLinks(_links) {
        return this;
      }
      // By default does nothing
      setStatus(_status) {
        return this;
      }
      // By default does nothing
      updateName(_name) {
        return this;
      }
      // By default does nothing
      end(_endTime) {
      }
      // isRecording always returns false for NonRecordingSpan.
      isRecording() {
        return false;
      }
      // By default does nothing
      recordException(_exception, _time) {
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/context-utils.js
function getSpan(context2) {
  return context2.getValue(SPAN_KEY) || void 0;
}
function getActiveSpan() {
  return getSpan(ContextAPI.getInstance().active());
}
function setSpan(context2, span) {
  return context2.setValue(SPAN_KEY, span);
}
function deleteSpan(context2) {
  return context2.deleteValue(SPAN_KEY);
}
function setSpanContext(context2, spanContext) {
  return setSpan(context2, new NonRecordingSpan(spanContext));
}
function getSpanContext(context2) {
  var _a2;
  return (_a2 = getSpan(context2)) === null || _a2 === void 0 ? void 0 : _a2.spanContext();
}
var SPAN_KEY;
var init_context_utils = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/context-utils.js"() {
    init_context();
    init_NonRecordingSpan();
    init_context2();
    SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js
function isValidHex(id, length) {
  if (typeof id !== "string" || id.length !== length) return false;
  let r = 0;
  for (let i = 0; i < id.length; i += 4) {
    r += (isHex[id.charCodeAt(i)] | 0) + (isHex[id.charCodeAt(i + 1)] | 0) + (isHex[id.charCodeAt(i + 2)] | 0) + (isHex[id.charCodeAt(i + 3)] | 0);
  }
  return r === length;
}
function isValidTraceId(traceId) {
  return isValidHex(traceId, 32) && traceId !== INVALID_TRACEID;
}
function isValidSpanId(spanId) {
  return isValidHex(spanId, 16) && spanId !== INVALID_SPANID;
}
function isSpanContextValid(spanContext) {
  return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
function wrapSpanContext(spanContext) {
  return new NonRecordingSpan(spanContext);
}
var isHex;
var init_spancontext_utils = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js"() {
    init_invalid_span_constants();
    init_NonRecordingSpan();
    isHex = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]);
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js
function isSpanContext(spanContext) {
  return spanContext !== null && typeof spanContext === "object" && "spanId" in spanContext && typeof spanContext["spanId"] === "string" && "traceId" in spanContext && typeof spanContext["traceId"] === "string" && "traceFlags" in spanContext && typeof spanContext["traceFlags"] === "number";
}
var contextApi, NoopTracer;
var init_NoopTracer = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js"() {
    init_context2();
    init_context_utils();
    init_NonRecordingSpan();
    init_spancontext_utils();
    contextApi = ContextAPI.getInstance();
    NoopTracer = class {
      // startSpan starts a noop span.
      startSpan(name, options, context2 = contextApi.active()) {
        const root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) {
          return new NonRecordingSpan();
        }
        const parentFromContext = context2 && getSpanContext(context2);
        if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) {
          return new NonRecordingSpan(parentFromContext);
        } else {
          return new NonRecordingSpan();
        }
      }
      startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        const parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = setSpan(parentContext, span);
        return contextApi.with(contextWithSpanSet, fn, void 0, span);
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js
var NOOP_TRACER, ProxyTracer;
var init_ProxyTracer = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js"() {
    init_NoopTracer();
    NOOP_TRACER = new NoopTracer();
    ProxyTracer = class {
      constructor(provider, name, version, options) {
        this._provider = provider;
        this.name = name;
        this.version = version;
        this.options = options;
      }
      startSpan(name, options, context2) {
        return this._getTracer().startSpan(name, options, context2);
      }
      startActiveSpan(_name, _options, _context, _fn) {
        const tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
      }
      /**
       * Try to get a tracer from the proxy tracer provider.
       * If the proxy tracer provider has no delegate, return a noop tracer.
       */
      _getTracer() {
        if (this._delegate) {
          return this._delegate;
        }
        const tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer) {
          return NOOP_TRACER;
        }
        this._delegate = tracer;
        return this._delegate;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js
var NoopTracerProvider;
var init_NoopTracerProvider = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js"() {
    init_NoopTracer();
    NoopTracerProvider = class {
      getTracer(_name, _version, _options) {
        return new NoopTracer();
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js
var NOOP_TRACER_PROVIDER, ProxyTracerProvider;
var init_ProxyTracerProvider = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js"() {
    init_ProxyTracer();
    init_NoopTracerProvider();
    NOOP_TRACER_PROVIDER = new NoopTracerProvider();
    ProxyTracerProvider = class {
      /**
       * Get a {@link ProxyTracer}
       */
      getTracer(name, version, options) {
        var _a2;
        return (_a2 = this.getDelegateTracer(name, version, options)) !== null && _a2 !== void 0 ? _a2 : new ProxyTracer(this, name, version, options);
      }
      getDelegate() {
        var _a2;
        return (_a2 = this._delegate) !== null && _a2 !== void 0 ? _a2 : NOOP_TRACER_PROVIDER;
      }
      /**
       * Set the delegate tracer provider
       */
      setDelegate(delegate) {
        this._delegate = delegate;
      }
      getDelegateTracer(name, version, options) {
        var _a2;
        return (_a2 = this._delegate) === null || _a2 === void 0 ? void 0 : _a2.getTracer(name, version, options);
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/SamplingResult.js
var SamplingDecision;
var init_SamplingResult = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/SamplingResult.js"() {
    (function(SamplingDecision2) {
      SamplingDecision2[SamplingDecision2["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision2[SamplingDecision2["RECORD"] = 1] = "RECORD";
      SamplingDecision2[SamplingDecision2["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision || (SamplingDecision = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/span_kind.js
var SpanKind;
var init_span_kind = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/span_kind.js"() {
    (function(SpanKind2) {
      SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
      SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
      SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
      SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
      SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
    })(SpanKind || (SpanKind = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/status.js
var SpanStatusCode;
var init_status = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/status.js"() {
    (function(SpanStatusCode2) {
      SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
      SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
      SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
    })(SpanStatusCode || (SpanStatusCode = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-validators.js
function validateKey(key) {
  return VALID_KEY_REGEX.test(key);
}
function validateValue(value) {
  return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
}
var VALID_KEY_CHAR_RANGE, VALID_KEY, VALID_VENDOR_KEY, VALID_KEY_REGEX, VALID_VALUE_BASE_REGEX, INVALID_VALUE_COMMA_EQUAL_REGEX;
var init_tracestate_validators = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-validators.js"() {
    VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
    VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
    VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
    VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
    VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
    INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-impl.js
var MAX_TRACE_STATE_ITEMS, MAX_TRACE_STATE_LEN, LIST_MEMBERS_SEPARATOR, LIST_MEMBER_KEY_VALUE_SPLITTER, TraceStateImpl;
var init_tracestate_impl = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-impl.js"() {
    init_tracestate_validators();
    MAX_TRACE_STATE_ITEMS = 32;
    MAX_TRACE_STATE_LEN = 512;
    LIST_MEMBERS_SEPARATOR = ",";
    LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
    TraceStateImpl = class _TraceStateImpl {
      constructor(rawTraceState) {
        this._internalState = /* @__PURE__ */ new Map();
        if (rawTraceState) this._parse(rawTraceState);
      }
      set(key, value) {
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      }
      unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      }
      get(key) {
        return this._internalState.get(key);
      }
      serialize() {
        return Array.from(this._internalState.keys()).reduceRight((agg, key) => {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
      }
      _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN) return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reduceRight((agg, part) => {
          const listMember = part.trim();
          const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
          if (i !== -1) {
            const key = listMember.slice(0, i);
            const value = listMember.slice(i + 1, part.length);
            if (validateKey(key) && validateValue(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
        }
      }
      // @ts-expect-error TS6133 Accessed in tests only.
      _keys() {
        return Array.from(this._internalState.keys()).reverse();
      }
      _clone() {
        const traceState = new _TraceStateImpl();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/internal/utils.js
function createTraceState(rawTraceState) {
  return new TraceStateImpl(rawTraceState);
}
var init_utils2 = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/internal/utils.js"() {
    init_tracestate_impl();
  }
});

// node_modules/@opentelemetry/api/build/esm/context-api.js
var context;
var init_context_api = __esm({
  "node_modules/@opentelemetry/api/build/esm/context-api.js"() {
    init_context2();
    context = ContextAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/esm/diag-api.js
var diag2;
var init_diag_api = __esm({
  "node_modules/@opentelemetry/api/build/esm/diag-api.js"() {
    init_diag();
    diag2 = DiagAPI.instance();
  }
});

// node_modules/@opentelemetry/api/build/esm/metrics/NoopMeterProvider.js
var NoopMeterProvider, NOOP_METER_PROVIDER;
var init_NoopMeterProvider = __esm({
  "node_modules/@opentelemetry/api/build/esm/metrics/NoopMeterProvider.js"() {
    init_NoopMeter();
    NoopMeterProvider = class {
      getMeter(_name, _version, _options) {
        return NOOP_METER;
      }
    };
    NOOP_METER_PROVIDER = new NoopMeterProvider();
  }
});

// node_modules/@opentelemetry/api/build/esm/api/metrics.js
var API_NAME3, MetricsAPI;
var init_metrics = __esm({
  "node_modules/@opentelemetry/api/build/esm/api/metrics.js"() {
    init_NoopMeterProvider();
    init_global_utils();
    init_diag();
    API_NAME3 = "metrics";
    MetricsAPI = class _MetricsAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Metrics API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _MetricsAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global meter provider.
       * Returns true if the meter provider was successfully registered, else false.
       */
      setGlobalMeterProvider(provider) {
        return registerGlobal(API_NAME3, provider, DiagAPI.instance());
      }
      /**
       * Returns the global meter provider.
       */
      getMeterProvider() {
        return getGlobal(API_NAME3) || NOOP_METER_PROVIDER;
      }
      /**
       * Returns a meter from the global meter provider.
       */
      getMeter(name, version, options) {
        return this.getMeterProvider().getMeter(name, version, options);
      }
      /** Remove the global meter provider */
      disable() {
        unregisterGlobal(API_NAME3, DiagAPI.instance());
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/metrics-api.js
var metrics;
var init_metrics_api = __esm({
  "node_modules/@opentelemetry/api/build/esm/metrics-api.js"() {
    init_metrics();
    metrics = MetricsAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/esm/propagation/NoopTextMapPropagator.js
var NoopTextMapPropagator;
var init_NoopTextMapPropagator = __esm({
  "node_modules/@opentelemetry/api/build/esm/propagation/NoopTextMapPropagator.js"() {
    NoopTextMapPropagator = class {
      /** Noop inject function does nothing */
      inject(_context, _carrier) {
      }
      /** Noop extract function does nothing and returns the input context */
      extract(context2, _carrier) {
        return context2;
      }
      fields() {
        return [];
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/baggage/context-helpers.js
function getBaggage(context2) {
  return context2.getValue(BAGGAGE_KEY) || void 0;
}
function getActiveBaggage() {
  return getBaggage(ContextAPI.getInstance().active());
}
function setBaggage(context2, baggage) {
  return context2.setValue(BAGGAGE_KEY, baggage);
}
function deleteBaggage(context2) {
  return context2.deleteValue(BAGGAGE_KEY);
}
var BAGGAGE_KEY;
var init_context_helpers = __esm({
  "node_modules/@opentelemetry/api/build/esm/baggage/context-helpers.js"() {
    init_context2();
    init_context();
    BAGGAGE_KEY = createContextKey("OpenTelemetry Baggage Key");
  }
});

// node_modules/@opentelemetry/api/build/esm/api/propagation.js
var API_NAME4, NOOP_TEXT_MAP_PROPAGATOR, PropagationAPI;
var init_propagation = __esm({
  "node_modules/@opentelemetry/api/build/esm/api/propagation.js"() {
    init_global_utils();
    init_NoopTextMapPropagator();
    init_TextMapPropagator();
    init_context_helpers();
    init_utils();
    init_diag();
    API_NAME4 = "propagation";
    NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator();
    PropagationAPI = class _PropagationAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
        this.createBaggage = createBaggage;
        this.getBaggage = getBaggage;
        this.getActiveBaggage = getActiveBaggage;
        this.setBaggage = setBaggage;
        this.deleteBaggage = deleteBaggage;
      }
      /** Get the singleton instance of the Propagator API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _PropagationAPI();
        }
        return this._instance;
      }
      /**
       * Set the current propagator.
       *
       * @returns true if the propagator was successfully registered, else false
       */
      setGlobalPropagator(propagator) {
        return registerGlobal(API_NAME4, propagator, DiagAPI.instance());
      }
      /**
       * Inject context into a carrier to be propagated inter-process
       *
       * @param context Context carrying tracing data to inject
       * @param carrier carrier to inject context into
       * @param setter Function used to set values on the carrier
       */
      inject(context2, carrier, setter = defaultTextMapSetter) {
        return this._getGlobalPropagator().inject(context2, carrier, setter);
      }
      /**
       * Extract context from a carrier
       *
       * @param context Context which the newly created context will inherit from
       * @param carrier Carrier to extract context from
       * @param getter Function used to extract keys from a carrier
       */
      extract(context2, carrier, getter = defaultTextMapGetter) {
        return this._getGlobalPropagator().extract(context2, carrier, getter);
      }
      /**
       * Return a list of all fields which may be used by the propagator.
       */
      fields() {
        return this._getGlobalPropagator().fields();
      }
      /** Remove the global propagator */
      disable() {
        unregisterGlobal(API_NAME4, DiagAPI.instance());
      }
      _getGlobalPropagator() {
        return getGlobal(API_NAME4) || NOOP_TEXT_MAP_PROPAGATOR;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/propagation-api.js
var propagation;
var init_propagation_api = __esm({
  "node_modules/@opentelemetry/api/build/esm/propagation-api.js"() {
    init_propagation();
    propagation = PropagationAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/esm/api/trace.js
var API_NAME5, TraceAPI;
var init_trace = __esm({
  "node_modules/@opentelemetry/api/build/esm/api/trace.js"() {
    init_global_utils();
    init_ProxyTracerProvider();
    init_spancontext_utils();
    init_context_utils();
    init_diag();
    API_NAME5 = "trace";
    TraceAPI = class _TraceAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
        this._proxyTracerProvider = new ProxyTracerProvider();
        this.wrapSpanContext = wrapSpanContext;
        this.isSpanContextValid = isSpanContextValid;
        this.deleteSpan = deleteSpan;
        this.getSpan = getSpan;
        this.getActiveSpan = getActiveSpan;
        this.getSpanContext = getSpanContext;
        this.setSpan = setSpan;
        this.setSpanContext = setSpanContext;
      }
      /** Get the singleton instance of the Trace API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _TraceAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global tracer.
       *
       * @returns true if the tracer provider was successfully registered, else false
       */
      setGlobalTracerProvider(provider) {
        const success = registerGlobal(API_NAME5, this._proxyTracerProvider, DiagAPI.instance());
        if (success) {
          this._proxyTracerProvider.setDelegate(provider);
        }
        return success;
      }
      /**
       * Returns the global tracer provider.
       */
      getTracerProvider() {
        return getGlobal(API_NAME5) || this._proxyTracerProvider;
      }
      /**
       * Returns a tracer from the global tracer provider.
       */
      getTracer(name, version) {
        return this.getTracerProvider().getTracer(name, version);
      }
      /** Remove the global tracer provider */
      disable() {
        unregisterGlobal(API_NAME5, DiagAPI.instance());
        this._proxyTracerProvider = new ProxyTracerProvider();
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace-api.js
var trace;
var init_trace_api = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace-api.js"() {
    init_trace();
    trace = TraceAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DiagConsoleLogger: () => DiagConsoleLogger,
  DiagLogLevel: () => DiagLogLevel,
  INVALID_SPANID: () => INVALID_SPANID,
  INVALID_SPAN_CONTEXT: () => INVALID_SPAN_CONTEXT,
  INVALID_TRACEID: () => INVALID_TRACEID,
  ProxyTracer: () => ProxyTracer,
  ProxyTracerProvider: () => ProxyTracerProvider,
  ROOT_CONTEXT: () => ROOT_CONTEXT,
  SamplingDecision: () => SamplingDecision,
  SpanKind: () => SpanKind,
  SpanStatusCode: () => SpanStatusCode,
  TraceFlags: () => TraceFlags,
  ValueType: () => ValueType,
  baggageEntryMetadataFromString: () => baggageEntryMetadataFromString,
  context: () => context,
  createContextKey: () => createContextKey,
  createNoopMeter: () => createNoopMeter,
  createTraceState: () => createTraceState,
  default: () => esm_default,
  defaultTextMapGetter: () => defaultTextMapGetter,
  defaultTextMapSetter: () => defaultTextMapSetter,
  diag: () => diag2,
  isSpanContextValid: () => isSpanContextValid,
  isValidSpanId: () => isValidSpanId,
  isValidTraceId: () => isValidTraceId,
  metrics: () => metrics,
  propagation: () => propagation,
  trace: () => trace
});
var esm_default;
var init_esm = __esm({
  "node_modules/@opentelemetry/api/build/esm/index.js"() {
    init_utils();
    init_context();
    init_consoleLogger();
    init_types();
    init_NoopMeter();
    init_Metric();
    init_TextMapPropagator();
    init_ProxyTracer();
    init_ProxyTracerProvider();
    init_SamplingResult();
    init_span_kind();
    init_status();
    init_trace_flags();
    init_utils2();
    init_spancontext_utils();
    init_invalid_span_constants();
    init_context_api();
    init_diag_api();
    init_metrics_api();
    init_propagation_api();
    init_trace_api();
    esm_default = {
      context,
      diag: diag2,
      metrics,
      propagation,
      trace
    };
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/types/Logger.js
var init_Logger = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/types/Logger.js"() {
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/types/LoggerProvider.js
var init_LoggerProvider = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/types/LoggerProvider.js"() {
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/types/LogRecord.js
var SeverityNumber;
var init_LogRecord = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/types/LogRecord.js"() {
    (function(SeverityNumber2) {
      SeverityNumber2[SeverityNumber2["UNSPECIFIED"] = 0] = "UNSPECIFIED";
      SeverityNumber2[SeverityNumber2["TRACE"] = 1] = "TRACE";
      SeverityNumber2[SeverityNumber2["TRACE2"] = 2] = "TRACE2";
      SeverityNumber2[SeverityNumber2["TRACE3"] = 3] = "TRACE3";
      SeverityNumber2[SeverityNumber2["TRACE4"] = 4] = "TRACE4";
      SeverityNumber2[SeverityNumber2["DEBUG"] = 5] = "DEBUG";
      SeverityNumber2[SeverityNumber2["DEBUG2"] = 6] = "DEBUG2";
      SeverityNumber2[SeverityNumber2["DEBUG3"] = 7] = "DEBUG3";
      SeverityNumber2[SeverityNumber2["DEBUG4"] = 8] = "DEBUG4";
      SeverityNumber2[SeverityNumber2["INFO"] = 9] = "INFO";
      SeverityNumber2[SeverityNumber2["INFO2"] = 10] = "INFO2";
      SeverityNumber2[SeverityNumber2["INFO3"] = 11] = "INFO3";
      SeverityNumber2[SeverityNumber2["INFO4"] = 12] = "INFO4";
      SeverityNumber2[SeverityNumber2["WARN"] = 13] = "WARN";
      SeverityNumber2[SeverityNumber2["WARN2"] = 14] = "WARN2";
      SeverityNumber2[SeverityNumber2["WARN3"] = 15] = "WARN3";
      SeverityNumber2[SeverityNumber2["WARN4"] = 16] = "WARN4";
      SeverityNumber2[SeverityNumber2["ERROR"] = 17] = "ERROR";
      SeverityNumber2[SeverityNumber2["ERROR2"] = 18] = "ERROR2";
      SeverityNumber2[SeverityNumber2["ERROR3"] = 19] = "ERROR3";
      SeverityNumber2[SeverityNumber2["ERROR4"] = 20] = "ERROR4";
      SeverityNumber2[SeverityNumber2["FATAL"] = 21] = "FATAL";
      SeverityNumber2[SeverityNumber2["FATAL2"] = 22] = "FATAL2";
      SeverityNumber2[SeverityNumber2["FATAL3"] = 23] = "FATAL3";
      SeverityNumber2[SeverityNumber2["FATAL4"] = 24] = "FATAL4";
    })(SeverityNumber || (SeverityNumber = {}));
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/types/LoggerOptions.js
var init_LoggerOptions = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/types/LoggerOptions.js"() {
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/types/AnyValue.js
var init_AnyValue = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/types/AnyValue.js"() {
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js
var NoopLogger, NOOP_LOGGER;
var init_NoopLogger = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js"() {
    NoopLogger = /** @class */
    (function() {
      function NoopLogger2() {
      }
      NoopLogger2.prototype.emit = function(_logRecord) {
      };
      return NoopLogger2;
    })();
    NOOP_LOGGER = new NoopLogger();
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js
var NoopLoggerProvider, NOOP_LOGGER_PROVIDER;
var init_NoopLoggerProvider = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js"() {
    init_NoopLogger();
    NoopLoggerProvider = /** @class */
    (function() {
      function NoopLoggerProvider2() {
      }
      NoopLoggerProvider2.prototype.getLogger = function(_name, _version, _options) {
        return new NoopLogger();
      };
      return NoopLoggerProvider2;
    })();
    NOOP_LOGGER_PROVIDER = new NoopLoggerProvider();
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/platform/node/globalThis.js
var _globalThis;
var init_globalThis = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/platform/node/globalThis.js"() {
    _globalThis = typeof globalThis === "object" ? globalThis : global;
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/platform/node/index.js
var init_node = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/platform/node/index.js"() {
    init_globalThis();
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/platform/index.js
var init_platform = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/platform/index.js"() {
    init_node();
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js
function makeGetter(requiredVersion, instance, fallback) {
  return function(version) {
    return version === requiredVersion ? instance : fallback;
  };
}
var GLOBAL_LOGS_API_KEY, _global2, API_BACKWARDS_COMPATIBILITY_VERSION;
var init_global_utils2 = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js"() {
    init_platform();
    GLOBAL_LOGS_API_KEY = Symbol.for("io.opentelemetry.js.api.logs");
    _global2 = _globalThis;
    API_BACKWARDS_COMPATIBILITY_VERSION = 1;
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/api/logs.js
var LogsAPI;
var init_logs = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/api/logs.js"() {
    init_global_utils2();
    init_NoopLoggerProvider();
    LogsAPI = /** @class */
    (function() {
      function LogsAPI2() {
      }
      LogsAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new LogsAPI2();
        }
        return this._instance;
      };
      LogsAPI2.prototype.setGlobalLoggerProvider = function(provider) {
        if (_global2[GLOBAL_LOGS_API_KEY]) {
          return this.getLoggerProvider();
        }
        _global2[GLOBAL_LOGS_API_KEY] = makeGetter(API_BACKWARDS_COMPATIBILITY_VERSION, provider, NOOP_LOGGER_PROVIDER);
        return provider;
      };
      LogsAPI2.prototype.getLoggerProvider = function() {
        var _a2, _b;
        return (_b = (_a2 = _global2[GLOBAL_LOGS_API_KEY]) === null || _a2 === void 0 ? void 0 : _a2.call(_global2, API_BACKWARDS_COMPATIBILITY_VERSION)) !== null && _b !== void 0 ? _b : NOOP_LOGGER_PROVIDER;
      };
      LogsAPI2.prototype.getLogger = function(name, version, options) {
        return this.getLoggerProvider().getLogger(name, version, options);
      };
      LogsAPI2.prototype.disable = function() {
        delete _global2[GLOBAL_LOGS_API_KEY];
      };
      return LogsAPI2;
    })();
  }
});

// node_modules/@opentelemetry/api-logs/build/esm/index.js
var esm_exports2 = {};
__export(esm_exports2, {
  NOOP_LOGGER: () => NOOP_LOGGER,
  NOOP_LOGGER_PROVIDER: () => NOOP_LOGGER_PROVIDER,
  NoopLogger: () => NoopLogger,
  NoopLoggerProvider: () => NoopLoggerProvider,
  SeverityNumber: () => SeverityNumber,
  logs: () => logs
});
var logs;
var init_esm2 = __esm({
  "node_modules/@opentelemetry/api-logs/build/esm/index.js"() {
    init_Logger();
    init_LoggerProvider();
    init_LogRecord();
    init_LoggerOptions();
    init_AnyValue();
    init_NoopLogger();
    init_NoopLoggerProvider();
    init_logs();
    logs = LogsAPI.getInstance();
  }
});

// node_modules/@genkit-ai/core/lib/logging.mjs
var logging_exports = {};
__export(logging_exports, {
  logger: () => logger
});
function getLogger() {
  if (!global[loggerKey]) {
    global[loggerKey] = _defaultLogger;
  }
  return global[loggerKey];
}
var LOG_LEVELS, loggerKey, _defaultLogger, Logger, logger;
var init_logging = __esm({
  "node_modules/@genkit-ai/core/lib/logging.mjs"() {
    init_esm();
    init_esm2();
    LOG_LEVELS = ["debug", "info", "warn", "error"];
    loggerKey = "__genkit_logger";
    _defaultLogger = {
      shouldLog(targetLevel) {
        return LOG_LEVELS.indexOf(this.level) <= LOG_LEVELS.indexOf(targetLevel);
      },
      debug(...args) {
        this.shouldLog("debug") && console.debug(...args);
      },
      info(...args) {
        this.shouldLog("info") && console.info(...args);
      },
      warn(...args) {
        this.shouldLog("warn") && console.warn(...args);
      },
      error(...args) {
        this.shouldLog("error") && console.error(...args);
      },
      level: "info"
    };
    Logger = class {
      defaultLogger = _defaultLogger;
      _emitOtel(level, args, explicitBody, explicitAttributes) {
        if (process.env.GENKIT_OTEL_ENABLE_LOGS !== "true") {
          return;
        }
        try {
          const currentLevel = getLogger().level || "info";
          if (LOG_LEVELS.indexOf(currentLevel) > LOG_LEVELS.indexOf(level)) {
            return;
          }
          const otelLogger = logs.getLogger("genkit-logger");
          let severityNumber;
          switch (level) {
            case "debug":
              severityNumber = SeverityNumber.DEBUG;
              break;
            case "info":
              severityNumber = SeverityNumber.INFO;
              break;
            case "warn":
              severityNumber = SeverityNumber.WARN;
              break;
            case "error":
              severityNumber = SeverityNumber.ERROR;
              break;
            default:
              severityNumber = SeverityNumber.UNSPECIFIED;
              break;
          }
          let body;
          const attributes = explicitAttributes || {};
          if (explicitBody !== void 0) {
            body = explicitBody;
          } else if (args.length === 1 && typeof args[0] === "string") {
            body = args[0];
          } else {
            const util = __require("util");
            body = util.format(...args);
          }
          let activeContext;
          try {
            activeContext = context.active();
          } catch (e) {
          }
          otelLogger.emit(__spreadValues({
            severityNumber,
            severityText: level.toUpperCase(),
            body,
            attributes
          }, activeContext ? {
            context: activeContext
          } : {}));
        } catch (err) {
        }
      }
      init(fn) {
        global[loggerKey] = fn;
      }
      info(...args) {
        getLogger().info.apply(getLogger(), args);
        this._emitOtel("info", args);
      }
      debug(...args) {
        getLogger().debug.apply(getLogger(), args);
        this._emitOtel("debug", args);
      }
      error(...args) {
        getLogger().error.apply(getLogger(), args);
        this._emitOtel("error", args);
      }
      warn(...args) {
        getLogger().warn.apply(getLogger(), args);
        this._emitOtel("warn", args);
      }
      setLogLevel(level) {
        getLogger().level = level;
      }
      logStructured(msg, metadata) {
        getLogger().info(msg, metadata);
        this._emitOtel("info", [], msg, metadata);
      }
      logStructuredError(msg, metadata) {
        getLogger().error(msg, metadata);
        this._emitOtel("error", [], msg, metadata);
      }
    };
    logger = new Logger();
  }
});

// node_modules/@cfworker/json-schema/dist/commonjs/deep-compare-strict.js
var require_deep_compare_strict = __commonJS({
  "node_modules/@cfworker/json-schema/dist/commonjs/deep-compare-strict.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.deepCompareStrict = deepCompareStrict;
    function deepCompareStrict(a, b) {
      const typeofa = typeof a;
      if (typeofa !== typeof b) {
        return false;
      }
      if (Array.isArray(a)) {
        if (!Array.isArray(b)) {
          return false;
        }
        const length = a.length;
        if (length !== b.length) {
          return false;
        }
        for (let i = 0; i < length; i++) {
          if (!deepCompareStrict(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
      if (typeofa === "object") {
        if (!a || !b) {
          return a === b;
        }
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        const length = aKeys.length;
        if (length !== bKeys.length) {
          return false;
        }
        for (const k of aKeys) {
          if (!deepCompareStrict(a[k], b[k])) {
            return false;
          }
        }
        return true;
      }
      return a === b;
    }
  }
});

// node_modules/@cfworker/json-schema/dist/commonjs/pointer.js
var require_pointer = __commonJS({
  "node_modules/@cfworker/json-schema/dist/commonjs/pointer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.encodePointer = encodePointer;
    exports.escapePointer = escapePointer;
    function encodePointer(p) {
      return encodeURI(escapePointer(p));
    }
    function escapePointer(p) {
      return p.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});

// node_modules/@cfworker/json-schema/dist/commonjs/dereference.js
var require_dereference = __commonJS({
  "node_modules/@cfworker/json-schema/dist/commonjs/dereference.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.initialBaseURI = exports.ignoredKeyword = exports.schemaMapKeyword = exports.schemaArrayKeyword = exports.schemaKeyword = void 0;
    exports.dereference = dereference;
    var pointer_js_1 = require_pointer();
    exports.schemaKeyword = {
      additionalItems: true,
      unevaluatedItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      unevaluatedProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };
    exports.schemaArrayKeyword = {
      prefixItems: true,
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    exports.schemaMapKeyword = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependentSchemas: true
    };
    exports.ignoredKeyword = {
      id: true,
      $id: true,
      $ref: true,
      $schema: true,
      $anchor: true,
      $vocabulary: true,
      $comment: true,
      default: true,
      enum: true,
      const: true,
      required: true,
      type: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    exports.initialBaseURI = typeof self !== "undefined" && self.location && self.location.origin !== "null" ? new URL(self.location.origin + self.location.pathname + location.search) : new URL("https://github.com/cfworker");
    function dereference(schema, lookup = /* @__PURE__ */ Object.create(null), baseURI = exports.initialBaseURI, basePointer = "") {
      if (schema && typeof schema === "object" && !Array.isArray(schema)) {
        const id = schema.$id || schema.id;
        if (id) {
          const url = new URL(id, baseURI.href);
          if (url.hash.length > 1) {
            lookup[url.href] = schema;
          } else {
            url.hash = "";
            if (basePointer === "") {
              baseURI = url;
            } else {
              dereference(schema, lookup, baseURI);
            }
          }
        }
      } else if (schema !== true && schema !== false) {
        return lookup;
      }
      const schemaURI = baseURI.href + (basePointer ? "#" + basePointer : "");
      if (lookup[schemaURI] !== void 0) {
        throw new Error(`Duplicate schema URI "${schemaURI}".`);
      }
      lookup[schemaURI] = schema;
      if (schema === true || schema === false) {
        return lookup;
      }
      if (schema.__absolute_uri__ === void 0) {
        Object.defineProperty(schema, "__absolute_uri__", {
          enumerable: false,
          value: schemaURI
        });
      }
      if (schema.$ref && schema.__absolute_ref__ === void 0) {
        const url = new URL(schema.$ref, baseURI.href);
        url.hash = url.hash;
        Object.defineProperty(schema, "__absolute_ref__", {
          enumerable: false,
          value: url.href
        });
      }
      if (schema.$recursiveRef && schema.__absolute_recursive_ref__ === void 0) {
        const url = new URL(schema.$recursiveRef, baseURI.href);
        url.hash = url.hash;
        Object.defineProperty(schema, "__absolute_recursive_ref__", {
          enumerable: false,
          value: url.href
        });
      }
      if (schema.$anchor) {
        const url = new URL("#" + schema.$anchor, baseURI.href);
        lookup[url.href] = schema;
      }
      for (let key in schema) {
        if (exports.ignoredKeyword[key]) {
          continue;
        }
        const keyBase = `${basePointer}/${(0, pointer_js_1.encodePointer)(key)}`;
        const subSchema = schema[key];
        if (Array.isArray(subSchema)) {
          if (exports.schemaArrayKeyword[key]) {
            const length = subSchema.length;
            for (let i = 0; i < length; i++) {
              dereference(subSchema[i], lookup, baseURI, `${keyBase}/${i}`);
            }
          }
        } else if (exports.schemaMapKeyword[key]) {
          for (let subKey in subSchema) {
            dereference(subSchema[subKey], lookup, baseURI, `${keyBase}/${(0, pointer_js_1.encodePointer)(subKey)}`);
          }
        } else {
          dereference(subSchema, lookup, baseURI, keyBase);
        }
      }
      return lookup;
    }
  }
});

// node_modules/@cfworker/json-schema/dist/commonjs/format.js
var require_format = __commonJS({
  "node_modules/@cfworker/json-schema/dist/commonjs/format.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.format = void 0;
    var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
    var HOSTNAME = /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i;
    var URIREF = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    var URITEMPLATE = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
    var URL_ = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)(?:\.(?:[a-z\u{00a1}-\u{ffff}0-9]+-?)*[a-z\u{00a1}-\u{ffff}0-9]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu;
    var UUID = /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
    var JSON_POINTER = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
    var JSON_POINTER_URI_FRAGMENT = /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i;
    var RELATIVE_JSON_POINTER = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
    var EMAIL = (input) => {
      if (input[0] === '"') return false;
      const [name, host, ...rest] = input.split("@");
      if (!name || !host || rest.length !== 0 || name.length > 64 || host.length > 253) return false;
      if (name[0] === "." || name.endsWith(".") || name.includes("..")) return false;
      if (!/^[a-z0-9.-]+$/i.test(host) || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(name)) return false;
      return host.split(".").every((part) => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i.test(part));
    };
    var IPV4 = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
    var IPV6 = /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i;
    var DURATION = (input) => input.length > 1 && input.length < 80 && (/^P\d+([.,]\d+)?W$/.test(input) || /^P[\dYMDTHS]*(\d[.,]\d+)?[YMDHS]$/.test(input) && /^P([.,\d]+Y)?([.,\d]+M)?([.,\d]+D)?(T([.,\d]+H)?([.,\d]+M)?([.,\d]+S)?)?$/.test(input));
    function bind(r) {
      return r.test.bind(r);
    }
    exports.format = {
      date,
      time: time.bind(void 0, false),
      "date-time": date_time,
      duration: DURATION,
      uri,
      "uri-reference": bind(URIREF),
      "uri-template": bind(URITEMPLATE),
      url: bind(URL_),
      email: EMAIL,
      hostname: bind(HOSTNAME),
      ipv4: bind(IPV4),
      ipv6: bind(IPV6),
      regex,
      uuid: bind(UUID),
      "json-pointer": bind(JSON_POINTER),
      "json-pointer-uri-fragment": bind(JSON_POINTER_URI_FRAGMENT),
      "relative-json-pointer": bind(RELATIVE_JSON_POINTER)
    };
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    function date(str) {
      const matches = str.match(DATE);
      if (!matches) return false;
      const year = +matches[1];
      const month = +matches[2];
      const day = +matches[3];
      return month >= 1 && month <= 12 && day >= 1 && day <= (month == 2 && isLeapYear(year) ? 29 : DAYS[month]);
    }
    function time(full, str) {
      const matches = str.match(TIME);
      if (!matches) return false;
      const hour = +matches[1];
      const minute = +matches[2];
      const second = +matches[3];
      const timeZone = !!matches[5];
      return (hour <= 23 && minute <= 59 && second <= 59 || hour == 23 && minute == 59 && second == 60) && (!full || timeZone);
    }
    var DATE_TIME_SEPARATOR = /t|\s/i;
    function date_time(str) {
      const dateTime = str.split(DATE_TIME_SEPARATOR);
      return dateTime.length == 2 && date(dateTime[0]) && time(true, dateTime[1]);
    }
    var NOT_URI_FRAGMENT = /\/|:/;
    var URI_PATTERN = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function uri(str) {
      return NOT_URI_FRAGMENT.test(str) && URI_PATTERN.test(str);
    }
    var Z_ANCHOR = /[^\\]\\Z/;
    function regex(str) {
      if (Z_ANCHOR.test(str)) return false;
      try {
        new RegExp(str, "u");
        return true;
      } catch (e) {
        return false;
      }
    }
  }
});

// node_modules/@cfworker/json-schema/dist/commonjs/types.js
var require_types = __commonJS({
  "node_modules/@cfworker/json-schema/dist/commonjs/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.OutputFormat = void 0;
    var OutputFormat;
    (function(OutputFormat2) {
      OutputFormat2[OutputFormat2["Flag"] = 1] = "Flag";
      OutputFormat2[OutputFormat2["Basic"] = 2] = "Basic";
      OutputFormat2[OutputFormat2["Detailed"] = 4] = "Detailed";
    })(OutputFormat || (exports.OutputFormat = OutputFormat = {}));
  }
});

// node_modules/@cfworker/json-schema/dist/commonjs/ucs2-length.js
var require_ucs2_length = __commonJS({
  "node_modules/@cfworker/json-schema/dist/commonjs/ucs2-length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ucs2length = ucs2length;
    function ucs2length(s) {
      let result = 0;
      let length = s.length;
      let index = 0;
      let charCode;
      while (index < length) {
        result++;
        charCode = s.charCodeAt(index++);
        if (charCode >= 55296 && charCode <= 56319 && index < length) {
          charCode = s.charCodeAt(index);
          if ((charCode & 64512) == 56320) {
            index++;
          }
        }
      }
      return result;
    }
  }
});

// node_modules/@cfworker/json-schema/dist/commonjs/validate.js
var require_validate = __commonJS({
  "node_modules/@cfworker/json-schema/dist/commonjs/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.validate = validate;
    var deep_compare_strict_js_1 = require_deep_compare_strict();
    var dereference_js_1 = require_dereference();
    var format_js_1 = require_format();
    var pointer_js_1 = require_pointer();
    var ucs2_length_js_1 = require_ucs2_length();
    function validate(instance, schema, draft = "2019-09", lookup = (0, dereference_js_1.dereference)(schema), shortCircuit = true, recursiveAnchor = null, instanceLocation = "#", schemaLocation = "#", evaluated = /* @__PURE__ */ Object.create(null)) {
      if (schema === true) {
        return {
          valid: true,
          errors: []
        };
      }
      if (schema === false) {
        return {
          valid: false,
          errors: [{
            instanceLocation,
            keyword: "false",
            keywordLocation: instanceLocation,
            error: "False boolean schema."
          }]
        };
      }
      const rawInstanceType = typeof instance;
      let instanceType;
      switch (rawInstanceType) {
        case "boolean":
        case "number":
        case "string":
          instanceType = rawInstanceType;
          break;
        case "object":
          if (instance === null) {
            instanceType = "null";
          } else if (Array.isArray(instance)) {
            instanceType = "array";
          } else {
            instanceType = "object";
          }
          break;
        default:
          throw new Error(`Instances of "${rawInstanceType}" type are not supported.`);
      }
      const {
        $ref,
        $recursiveRef,
        $recursiveAnchor,
        type: $type,
        const: $const,
        enum: $enum,
        required: $required,
        not: $not,
        anyOf: $anyOf,
        allOf: $allOf,
        oneOf: $oneOf,
        if: $if,
        then: $then,
        else: $else,
        format: $format,
        properties: $properties,
        patternProperties: $patternProperties,
        additionalProperties: $additionalProperties,
        unevaluatedProperties: $unevaluatedProperties,
        minProperties: $minProperties,
        maxProperties: $maxProperties,
        propertyNames: $propertyNames,
        dependentRequired: $dependentRequired,
        dependentSchemas: $dependentSchemas,
        dependencies: $dependencies,
        prefixItems: $prefixItems,
        items: $items,
        additionalItems: $additionalItems,
        unevaluatedItems: $unevaluatedItems,
        contains: $contains,
        minContains: $minContains,
        maxContains: $maxContains,
        minItems: $minItems,
        maxItems: $maxItems,
        uniqueItems: $uniqueItems,
        minimum: $minimum,
        maximum: $maximum,
        exclusiveMinimum: $exclusiveMinimum,
        exclusiveMaximum: $exclusiveMaximum,
        multipleOf: $multipleOf,
        minLength: $minLength,
        maxLength: $maxLength,
        pattern: $pattern,
        __absolute_ref__,
        __absolute_recursive_ref__
      } = schema;
      const errors = [];
      if ($recursiveAnchor === true && recursiveAnchor === null) {
        recursiveAnchor = schema;
      }
      if ($recursiveRef === "#") {
        const refSchema = recursiveAnchor === null ? lookup[__absolute_recursive_ref__] : recursiveAnchor;
        const keywordLocation = `${schemaLocation}/$recursiveRef`;
        const result = validate(instance, recursiveAnchor === null ? schema : recursiveAnchor, draft, lookup, shortCircuit, refSchema, instanceLocation, keywordLocation, evaluated);
        if (!result.valid) {
          errors.push({
            instanceLocation,
            keyword: "$recursiveRef",
            keywordLocation,
            error: "A subschema had errors."
          }, ...result.errors);
        }
      }
      if ($ref !== void 0) {
        const uri = __absolute_ref__ || $ref;
        const refSchema = lookup[uri];
        if (refSchema === void 0) {
          let message = `Unresolved $ref "${$ref}".`;
          if (__absolute_ref__ && __absolute_ref__ !== $ref) {
            message += `  Absolute URI "${__absolute_ref__}".`;
          }
          message += `
Known schemas:
- ${Object.keys(lookup).join("\n- ")}`;
          throw new Error(message);
        }
        const keywordLocation = `${schemaLocation}/$ref`;
        const result = validate(instance, refSchema, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, keywordLocation, evaluated);
        if (!result.valid) {
          errors.push({
            instanceLocation,
            keyword: "$ref",
            keywordLocation,
            error: "A subschema had errors."
          }, ...result.errors);
        }
        if (draft === "4" || draft === "7") {
          return {
            valid: errors.length === 0,
            errors
          };
        }
      }
      if (Array.isArray($type)) {
        let length = $type.length;
        let valid = false;
        for (let i = 0; i < length; i++) {
          if (instanceType === $type[i] || $type[i] === "integer" && instanceType === "number" && instance % 1 === 0 && instance === instance) {
            valid = true;
            break;
          }
        }
        if (!valid) {
          errors.push({
            instanceLocation,
            keyword: "type",
            keywordLocation: `${schemaLocation}/type`,
            error: `Instance type "${instanceType}" is invalid. Expected "${$type.join('", "')}".`
          });
        }
      } else if ($type === "integer") {
        if (instanceType !== "number" || instance % 1 || instance !== instance) {
          errors.push({
            instanceLocation,
            keyword: "type",
            keywordLocation: `${schemaLocation}/type`,
            error: `Instance type "${instanceType}" is invalid. Expected "${$type}".`
          });
        }
      } else if ($type !== void 0 && instanceType !== $type) {
        errors.push({
          instanceLocation,
          keyword: "type",
          keywordLocation: `${schemaLocation}/type`,
          error: `Instance type "${instanceType}" is invalid. Expected "${$type}".`
        });
      }
      if ($const !== void 0) {
        if (instanceType === "object" || instanceType === "array") {
          if (!(0, deep_compare_strict_js_1.deepCompareStrict)(instance, $const)) {
            errors.push({
              instanceLocation,
              keyword: "const",
              keywordLocation: `${schemaLocation}/const`,
              error: `Instance does not match ${JSON.stringify($const)}.`
            });
          }
        } else if (instance !== $const) {
          errors.push({
            instanceLocation,
            keyword: "const",
            keywordLocation: `${schemaLocation}/const`,
            error: `Instance does not match ${JSON.stringify($const)}.`
          });
        }
      }
      if ($enum !== void 0) {
        if (instanceType === "object" || instanceType === "array") {
          if (!$enum.some((value) => (0, deep_compare_strict_js_1.deepCompareStrict)(instance, value))) {
            errors.push({
              instanceLocation,
              keyword: "enum",
              keywordLocation: `${schemaLocation}/enum`,
              error: `Instance does not match any of ${JSON.stringify($enum)}.`
            });
          }
        } else if (!$enum.some((value) => instance === value)) {
          errors.push({
            instanceLocation,
            keyword: "enum",
            keywordLocation: `${schemaLocation}/enum`,
            error: `Instance does not match any of ${JSON.stringify($enum)}.`
          });
        }
      }
      if ($not !== void 0) {
        const keywordLocation = `${schemaLocation}/not`;
        const result = validate(instance, $not, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, keywordLocation);
        if (result.valid) {
          errors.push({
            instanceLocation,
            keyword: "not",
            keywordLocation,
            error: 'Instance matched "not" schema.'
          });
        }
      }
      let subEvaluateds = [];
      if ($anyOf !== void 0) {
        const keywordLocation = `${schemaLocation}/anyOf`;
        const errorsLength = errors.length;
        let anyValid = false;
        for (let i = 0; i < $anyOf.length; i++) {
          const subSchema = $anyOf[i];
          const subEvaluated = Object.create(evaluated);
          const result = validate(instance, subSchema, draft, lookup, shortCircuit, $recursiveAnchor === true ? recursiveAnchor : null, instanceLocation, `${keywordLocation}/${i}`, subEvaluated);
          errors.push(...result.errors);
          anyValid = anyValid || result.valid;
          if (result.valid) {
            subEvaluateds.push(subEvaluated);
          }
        }
        if (anyValid) {
          errors.length = errorsLength;
        } else {
          errors.splice(errorsLength, 0, {
            instanceLocation,
            keyword: "anyOf",
            keywordLocation,
            error: "Instance does not match any subschemas."
          });
        }
      }
      if ($allOf !== void 0) {
        const keywordLocation = `${schemaLocation}/allOf`;
        const errorsLength = errors.length;
        let allValid = true;
        for (let i = 0; i < $allOf.length; i++) {
          const subSchema = $allOf[i];
          const subEvaluated = Object.create(evaluated);
          const result = validate(instance, subSchema, draft, lookup, shortCircuit, $recursiveAnchor === true ? recursiveAnchor : null, instanceLocation, `${keywordLocation}/${i}`, subEvaluated);
          errors.push(...result.errors);
          allValid = allValid && result.valid;
          if (result.valid) {
            subEvaluateds.push(subEvaluated);
          }
        }
        if (allValid) {
          errors.length = errorsLength;
        } else {
          errors.splice(errorsLength, 0, {
            instanceLocation,
            keyword: "allOf",
            keywordLocation,
            error: `Instance does not match every subschema.`
          });
        }
      }
      if ($oneOf !== void 0) {
        const keywordLocation = `${schemaLocation}/oneOf`;
        const errorsLength = errors.length;
        const matches = $oneOf.filter((subSchema, i) => {
          const subEvaluated = Object.create(evaluated);
          const result = validate(instance, subSchema, draft, lookup, shortCircuit, $recursiveAnchor === true ? recursiveAnchor : null, instanceLocation, `${keywordLocation}/${i}`, subEvaluated);
          errors.push(...result.errors);
          if (result.valid) {
            subEvaluateds.push(subEvaluated);
          }
          return result.valid;
        }).length;
        if (matches === 1) {
          errors.length = errorsLength;
        } else {
          errors.splice(errorsLength, 0, {
            instanceLocation,
            keyword: "oneOf",
            keywordLocation,
            error: `Instance does not match exactly one subschema (${matches} matches).`
          });
        }
      }
      if (instanceType === "object" || instanceType === "array") {
        Object.assign(evaluated, ...subEvaluateds);
      }
      if ($if !== void 0) {
        const keywordLocation = `${schemaLocation}/if`;
        const conditionResult = validate(instance, $if, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, keywordLocation, evaluated).valid;
        if (conditionResult) {
          if ($then !== void 0) {
            const thenResult = validate(instance, $then, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, `${schemaLocation}/then`, evaluated);
            if (!thenResult.valid) {
              errors.push({
                instanceLocation,
                keyword: "if",
                keywordLocation,
                error: `Instance does not match "then" schema.`
              }, ...thenResult.errors);
            }
          }
        } else if ($else !== void 0) {
          const elseResult = validate(instance, $else, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, `${schemaLocation}/else`, evaluated);
          if (!elseResult.valid) {
            errors.push({
              instanceLocation,
              keyword: "if",
              keywordLocation,
              error: `Instance does not match "else" schema.`
            }, ...elseResult.errors);
          }
        }
      }
      if (instanceType === "object") {
        if ($required !== void 0) {
          for (const key of $required) {
            if (!(key in instance)) {
              errors.push({
                instanceLocation,
                keyword: "required",
                keywordLocation: `${schemaLocation}/required`,
                error: `Instance does not have required property "${key}".`
              });
            }
          }
        }
        const keys = Object.keys(instance);
        if ($minProperties !== void 0 && keys.length < $minProperties) {
          errors.push({
            instanceLocation,
            keyword: "minProperties",
            keywordLocation: `${schemaLocation}/minProperties`,
            error: `Instance does not have at least ${$minProperties} properties.`
          });
        }
        if ($maxProperties !== void 0 && keys.length > $maxProperties) {
          errors.push({
            instanceLocation,
            keyword: "maxProperties",
            keywordLocation: `${schemaLocation}/maxProperties`,
            error: `Instance does not have at least ${$maxProperties} properties.`
          });
        }
        if ($propertyNames !== void 0) {
          const keywordLocation = `${schemaLocation}/propertyNames`;
          for (const key in instance) {
            const subInstancePointer = `${instanceLocation}/${(0, pointer_js_1.encodePointer)(key)}`;
            const result = validate(key, $propertyNames, draft, lookup, shortCircuit, recursiveAnchor, subInstancePointer, keywordLocation);
            if (!result.valid) {
              errors.push({
                instanceLocation,
                keyword: "propertyNames",
                keywordLocation,
                error: `Property name "${key}" does not match schema.`
              }, ...result.errors);
            }
          }
        }
        if ($dependentRequired !== void 0) {
          const keywordLocation = `${schemaLocation}/dependantRequired`;
          for (const key in $dependentRequired) {
            if (key in instance) {
              const required = $dependentRequired[key];
              for (const dependantKey of required) {
                if (!(dependantKey in instance)) {
                  errors.push({
                    instanceLocation,
                    keyword: "dependentRequired",
                    keywordLocation,
                    error: `Instance has "${key}" but does not have "${dependantKey}".`
                  });
                }
              }
            }
          }
        }
        if ($dependentSchemas !== void 0) {
          for (const key in $dependentSchemas) {
            const keywordLocation = `${schemaLocation}/dependentSchemas`;
            if (key in instance) {
              const result = validate(instance, $dependentSchemas[key], draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, `${keywordLocation}/${(0, pointer_js_1.encodePointer)(key)}`, evaluated);
              if (!result.valid) {
                errors.push({
                  instanceLocation,
                  keyword: "dependentSchemas",
                  keywordLocation,
                  error: `Instance has "${key}" but does not match dependant schema.`
                }, ...result.errors);
              }
            }
          }
        }
        if ($dependencies !== void 0) {
          const keywordLocation = `${schemaLocation}/dependencies`;
          for (const key in $dependencies) {
            if (key in instance) {
              const propsOrSchema = $dependencies[key];
              if (Array.isArray(propsOrSchema)) {
                for (const dependantKey of propsOrSchema) {
                  if (!(dependantKey in instance)) {
                    errors.push({
                      instanceLocation,
                      keyword: "dependencies",
                      keywordLocation,
                      error: `Instance has "${key}" but does not have "${dependantKey}".`
                    });
                  }
                }
              } else {
                const result = validate(instance, propsOrSchema, draft, lookup, shortCircuit, recursiveAnchor, instanceLocation, `${keywordLocation}/${(0, pointer_js_1.encodePointer)(key)}`);
                if (!result.valid) {
                  errors.push({
                    instanceLocation,
                    keyword: "dependencies",
                    keywordLocation,
                    error: `Instance has "${key}" but does not match dependant schema.`
                  }, ...result.errors);
                }
              }
            }
          }
        }
        const thisEvaluated = /* @__PURE__ */ Object.create(null);
        let stop = false;
        if ($properties !== void 0) {
          const keywordLocation = `${schemaLocation}/properties`;
          for (const key in $properties) {
            if (!(key in instance)) {
              continue;
            }
            const subInstancePointer = `${instanceLocation}/${(0, pointer_js_1.encodePointer)(key)}`;
            const result = validate(instance[key], $properties[key], draft, lookup, shortCircuit, recursiveAnchor, subInstancePointer, `${keywordLocation}/${(0, pointer_js_1.encodePointer)(key)}`);
            if (result.valid) {
              evaluated[key] = thisEvaluated[key] = true;
            } else {
              stop = shortCircuit;
              errors.push({
                instanceLocation,
                keyword: "properties",
                keywordLocation,
                error: `Property "${key}" does not match schema.`
              }, ...result.errors);
              if (stop) break;
            }
          }
        }
        if (!stop && $patternProperties !== void 0) {
          const keywordLocation = `${schemaLocation}/patternProperties`;
          for (const pattern in $patternProperties) {
            const regex = new RegExp(pattern, "u");
            const subSchema = $patternProperties[pattern];
            for (const key in instance) {
              if (!regex.test(key)) {
                continue;
              }
              const subInstancePointer = `${instanceLocation}/${(0, pointer_js_1.encodePointer)(key)}`;
              const result = validate(instance[key], subSchema, draft, lookup, shortCircuit, recursiveAnchor, subInstancePointer, `${keywordLocation}/${(0, pointer_js_1.encodePointer)(pattern)}`);
              if (result.valid) {
                evaluated[key] = thisEvaluated[key] = true;
              } else {
                stop = shortCircuit;
                errors.push({
                  instanceLocation,
                  keyword: "patternProperties",
                  keywordLocation,
                  error: `Property "${key}" matches pattern "${pattern}" but does not match associated schema.`
                }, ...result.errors);
              }
            }
          }
        }
        if (!stop && $additionalProperties !== void 0) {
          const keywordLocation = `${schemaLocation}/additionalProperties`;
          for (const key in instance) {
            if (thisEvaluated[key]) {
              continue;
            }
            const subInstancePointer = `${instanceLocation}/${(0, pointer_js_1.encodePointer)(key)}`;
            const result = validate(instance[key], $additionalProperties, draft, lookup, shortCircuit, recursiveAnchor, subInstancePointer, keywordLocation);
            if (result.valid) {
              evaluated[key] = true;
            } else {
              stop = shortCircuit;
              errors.push({
                instanceLocation,
                keyword: "additionalProperties",
                keywordLocation,
                error: `Property "${key}" does not match additional properties schema.`
              }, ...result.errors);
            }
          }
        } else if (!stop && $unevaluatedProperties !== void 0) {
          const keywordLocation = `${schemaLocation}/unevaluatedProperties`;
          for (const key in instance) {
            if (!evaluated[key]) {
              const subInstancePointer = `${instanceLocation}/${(0, pointer_js_1.encodePointer)(key)}`;
              const result = validate(instance[key], $unevaluatedProperties, draft, lookup, shortCircuit, recursiveAnchor, subInstancePointer, keywordLocation);
              if (result.valid) {
                evaluated[key] = true;
              } else {
                errors.push({
                  instanceLocation,
                  keyword: "unevaluatedProperties",
                  keywordLocation,
                  error: `Property "${key}" does not match unevaluated properties schema.`
                }, ...result.errors);
              }
            }
          }
        }
      } else if (instanceType === "array") {
        if ($maxItems !== void 0 && instance.length > $maxItems) {
          errors.push({
            instanceLocation,
            keyword: "maxItems",
            keywordLocation: `${schemaLocation}/maxItems`,
            error: `Array has too many items (${instance.length} > ${$maxItems}).`
          });
        }
        if ($minItems !== void 0 && instance.length < $minItems) {
          errors.push({
            instanceLocation,
            keyword: "minItems",
            keywordLocation: `${schemaLocation}/minItems`,
            error: `Array has too few items (${instance.length} < ${$minItems}).`
          });
        }
        const length = instance.length;
        let i = 0;
        let stop = false;
        if ($prefixItems !== void 0) {
          const keywordLocation = `${schemaLocation}/prefixItems`;
          const length2 = Math.min($prefixItems.length, length);
          for (; i < length2; i++) {
            const result = validate(instance[i], $prefixItems[i], draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${i}`, `${keywordLocation}/${i}`);
            evaluated[i] = true;
            if (!result.valid) {
              stop = shortCircuit;
              errors.push({
                instanceLocation,
                keyword: "prefixItems",
                keywordLocation,
                error: `Items did not match schema.`
              }, ...result.errors);
              if (stop) break;
            }
          }
        }
        if ($items !== void 0) {
          const keywordLocation = `${schemaLocation}/items`;
          if (Array.isArray($items)) {
            const length2 = Math.min($items.length, length);
            for (; i < length2; i++) {
              const result = validate(instance[i], $items[i], draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${i}`, `${keywordLocation}/${i}`);
              evaluated[i] = true;
              if (!result.valid) {
                stop = shortCircuit;
                errors.push({
                  instanceLocation,
                  keyword: "items",
                  keywordLocation,
                  error: `Items did not match schema.`
                }, ...result.errors);
                if (stop) break;
              }
            }
          } else {
            for (; i < length; i++) {
              const result = validate(instance[i], $items, draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${i}`, keywordLocation);
              evaluated[i] = true;
              if (!result.valid) {
                stop = shortCircuit;
                errors.push({
                  instanceLocation,
                  keyword: "items",
                  keywordLocation,
                  error: `Items did not match schema.`
                }, ...result.errors);
                if (stop) break;
              }
            }
          }
          if (!stop && $additionalItems !== void 0) {
            const keywordLocation2 = `${schemaLocation}/additionalItems`;
            for (; i < length; i++) {
              const result = validate(instance[i], $additionalItems, draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${i}`, keywordLocation2);
              evaluated[i] = true;
              if (!result.valid) {
                stop = shortCircuit;
                errors.push({
                  instanceLocation,
                  keyword: "additionalItems",
                  keywordLocation: keywordLocation2,
                  error: `Items did not match additional items schema.`
                }, ...result.errors);
              }
            }
          }
        }
        if ($contains !== void 0) {
          if (length === 0 && $minContains === void 0) {
            errors.push({
              instanceLocation,
              keyword: "contains",
              keywordLocation: `${schemaLocation}/contains`,
              error: `Array is empty. It must contain at least one item matching the schema.`
            });
          } else if ($minContains !== void 0 && length < $minContains) {
            errors.push({
              instanceLocation,
              keyword: "minContains",
              keywordLocation: `${schemaLocation}/minContains`,
              error: `Array has less items (${length}) than minContains (${$minContains}).`
            });
          } else {
            const keywordLocation = `${schemaLocation}/contains`;
            const errorsLength = errors.length;
            let contained = 0;
            for (let j = 0; j < length; j++) {
              const result = validate(instance[j], $contains, draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${j}`, keywordLocation);
              if (result.valid) {
                evaluated[j] = true;
                contained++;
              } else {
                errors.push(...result.errors);
              }
            }
            if (contained >= ($minContains || 0)) {
              errors.length = errorsLength;
            }
            if ($minContains === void 0 && $maxContains === void 0 && contained === 0) {
              errors.splice(errorsLength, 0, {
                instanceLocation,
                keyword: "contains",
                keywordLocation,
                error: `Array does not contain item matching schema.`
              });
            } else if ($minContains !== void 0 && contained < $minContains) {
              errors.push({
                instanceLocation,
                keyword: "minContains",
                keywordLocation: `${schemaLocation}/minContains`,
                error: `Array must contain at least ${$minContains} items matching schema. Only ${contained} items were found.`
              });
            } else if ($maxContains !== void 0 && contained > $maxContains) {
              errors.push({
                instanceLocation,
                keyword: "maxContains",
                keywordLocation: `${schemaLocation}/maxContains`,
                error: `Array may contain at most ${$maxContains} items matching schema. ${contained} items were found.`
              });
            }
          }
        }
        if (!stop && $unevaluatedItems !== void 0) {
          const keywordLocation = `${schemaLocation}/unevaluatedItems`;
          for (i; i < length; i++) {
            if (evaluated[i]) {
              continue;
            }
            const result = validate(instance[i], $unevaluatedItems, draft, lookup, shortCircuit, recursiveAnchor, `${instanceLocation}/${i}`, keywordLocation);
            evaluated[i] = true;
            if (!result.valid) {
              errors.push({
                instanceLocation,
                keyword: "unevaluatedItems",
                keywordLocation,
                error: `Items did not match unevaluated items schema.`
              }, ...result.errors);
            }
          }
        }
        if ($uniqueItems) {
          for (let j = 0; j < length; j++) {
            const a = instance[j];
            const ao = typeof a === "object" && a !== null;
            for (let k = 0; k < length; k++) {
              if (j === k) {
                continue;
              }
              const b = instance[k];
              const bo = typeof b === "object" && b !== null;
              if (a === b || ao && bo && (0, deep_compare_strict_js_1.deepCompareStrict)(a, b)) {
                errors.push({
                  instanceLocation,
                  keyword: "uniqueItems",
                  keywordLocation: `${schemaLocation}/uniqueItems`,
                  error: `Duplicate items at indexes ${j} and ${k}.`
                });
                j = Number.MAX_SAFE_INTEGER;
                k = Number.MAX_SAFE_INTEGER;
              }
            }
          }
        }
      } else if (instanceType === "number") {
        if (draft === "4") {
          if ($minimum !== void 0 && ($exclusiveMinimum === true && instance <= $minimum || instance < $minimum)) {
            errors.push({
              instanceLocation,
              keyword: "minimum",
              keywordLocation: `${schemaLocation}/minimum`,
              error: `${instance} is less than ${$exclusiveMinimum ? "or equal to " : ""} ${$minimum}.`
            });
          }
          if ($maximum !== void 0 && ($exclusiveMaximum === true && instance >= $maximum || instance > $maximum)) {
            errors.push({
              instanceLocation,
              keyword: "maximum",
              keywordLocation: `${schemaLocation}/maximum`,
              error: `${instance} is greater than ${$exclusiveMaximum ? "or equal to " : ""} ${$maximum}.`
            });
          }
        } else {
          if ($minimum !== void 0 && instance < $minimum) {
            errors.push({
              instanceLocation,
              keyword: "minimum",
              keywordLocation: `${schemaLocation}/minimum`,
              error: `${instance} is less than ${$minimum}.`
            });
          }
          if ($maximum !== void 0 && instance > $maximum) {
            errors.push({
              instanceLocation,
              keyword: "maximum",
              keywordLocation: `${schemaLocation}/maximum`,
              error: `${instance} is greater than ${$maximum}.`
            });
          }
          if ($exclusiveMinimum !== void 0 && instance <= $exclusiveMinimum) {
            errors.push({
              instanceLocation,
              keyword: "exclusiveMinimum",
              keywordLocation: `${schemaLocation}/exclusiveMinimum`,
              error: `${instance} is less than ${$exclusiveMinimum}.`
            });
          }
          if ($exclusiveMaximum !== void 0 && instance >= $exclusiveMaximum) {
            errors.push({
              instanceLocation,
              keyword: "exclusiveMaximum",
              keywordLocation: `${schemaLocation}/exclusiveMaximum`,
              error: `${instance} is greater than or equal to ${$exclusiveMaximum}.`
            });
          }
        }
        if ($multipleOf !== void 0) {
          const remainder = instance % $multipleOf;
          if (Math.abs(0 - remainder) >= 11920929e-14 && Math.abs($multipleOf - remainder) >= 11920929e-14) {
            errors.push({
              instanceLocation,
              keyword: "multipleOf",
              keywordLocation: `${schemaLocation}/multipleOf`,
              error: `${instance} is not a multiple of ${$multipleOf}.`
            });
          }
        }
      } else if (instanceType === "string") {
        const length = $minLength === void 0 && $maxLength === void 0 ? 0 : (0, ucs2_length_js_1.ucs2length)(instance);
        if ($minLength !== void 0 && length < $minLength) {
          errors.push({
            instanceLocation,
            keyword: "minLength",
            keywordLocation: `${schemaLocation}/minLength`,
            error: `String is too short (${length} < ${$minLength}).`
          });
        }
        if ($maxLength !== void 0 && length > $maxLength) {
          errors.push({
            instanceLocation,
            keyword: "maxLength",
            keywordLocation: `${schemaLocation}/maxLength`,
            error: `String is too long (${length} > ${$maxLength}).`
          });
        }
        if ($pattern !== void 0 && !new RegExp($pattern, "u").test(instance)) {
          errors.push({
            instanceLocation,
            keyword: "pattern",
            keywordLocation: `${schemaLocation}/pattern`,
            error: `String does not match pattern.`
          });
        }
        if ($format !== void 0 && format_js_1.format[$format] && !format_js_1.format[$format](instance)) {
          errors.push({
            instanceLocation,
            keyword: "format",
            keywordLocation: `${schemaLocation}/format`,
            error: `String does not match format "${$format}".`
          });
        }
      }
      return {
        valid: errors.length === 0,
        errors
      };
    }
  }
});

// node_modules/@cfworker/json-schema/dist/commonjs/validator.js
var require_validator = __commonJS({
  "node_modules/@cfworker/json-schema/dist/commonjs/validator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Validator = void 0;
    var dereference_js_1 = require_dereference();
    var validate_js_1 = require_validate();
    var Validator = class {
      schema;
      draft;
      shortCircuit;
      lookup;
      constructor(schema, draft = "2019-09", shortCircuit = true) {
        this.schema = schema;
        this.draft = draft;
        this.shortCircuit = shortCircuit;
        this.lookup = (0, dereference_js_1.dereference)(schema);
      }
      validate(instance) {
        return (0, validate_js_1.validate)(instance, this.schema, this.draft, this.lookup, this.shortCircuit);
      }
      addSchema(schema, id) {
        if (id) {
          schema = __spreadProps(__spreadValues({}, schema), {
            $id: id
          });
        }
        (0, dereference_js_1.dereference)(schema, this.lookup);
      }
    };
    exports.Validator = Validator;
  }
});

// node_modules/@cfworker/json-schema/dist/commonjs/index.js
var require_commonjs = __commonJS({
  "node_modules/@cfworker/json-schema/dist/commonjs/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
          enumerable: true,
          get: function() {
            return m[k];
          }
        };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __exportStar(require_deep_compare_strict(), exports);
    __exportStar(require_dereference(), exports);
    __exportStar(require_format(), exports);
    __exportStar(require_pointer(), exports);
    __exportStar(require_types(), exports);
    __exportStar(require_ucs2_length(), exports);
    __exportStar(require_validate(), exports);
    __exportStar(require_validator(), exports);
  }
});

// node_modules/ajv/dist/compile/codegen/code.js
var require_code = __commonJS({
  "node_modules/ajv/dist/compile/codegen/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    var _CodeOrName = class {
    };
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s)) throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return {
          [this.str]: 1
        };
      }
    };
    exports.Name = Name;
    var _Code = class extends _CodeOrName {
      constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1) return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a2;
        return (_a2 = this._str) !== null && _a2 !== void 0 ? _a2 : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a2;
        return (_a2 = this._names) !== null && _a2 !== void 0 ? _a2 : this._names = this._items.reduce((names, c) => {
          if (c instanceof Name) names[c.str] = (names[c.str] || 0) + 1;
          return names;
        }, {});
      }
    };
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      const code = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
      }
      return new _Code(code);
    }
    exports._ = _;
    var plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports.str = str;
    function addCodeArg(code, arg) {
      if (arg instanceof _Code) code.push(...arg._items);
      else if (arg instanceof Name) code.push(arg);
      else code.push(interpolate(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""') return a;
      if (a === '""') return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"') return;
        if (typeof b != "string") return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"') return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name)) return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  }
});

// node_modules/ajv/dist/compile/codegen/scope.js
var require_scope = __commonJS({
  "node_modules/ajv/dist/compile/codegen/scope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    var code_1 = require_code();
    var ValueError = class extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    };
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
    exports.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    var Scope = class {
      constructor({
        prefixes,
        parent
      } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a2, _b;
        if (((_b = (_a2 = this._parent) === null || _a2 === void 0 ? void 0 : _a2._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = {
          prefix,
          index: 0
        };
      }
    };
    exports.Scope = Scope;
    var ValueScopeName = class extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, {
        property,
        itemIndex
      }) {
        this.value = value;
        this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    };
    exports.ValueScopeName = ValueScopeName;
    var line = (0, code_1._)`\n`;
    var ValueScope = class extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = __spreadProps(__spreadValues({}, opts), {
          _n: opts.lines ? line : code_1.nil
        });
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a2;
        if (value.ref === void 0) throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const {
          prefix
        } = name;
        const valueKey = (_a2 = value.key) !== null && _a2 !== void 0 ? _a2 : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name) return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, {
          property: prefix,
          itemIndex
        });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs) return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0) throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_1._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0) throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs) continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name)) return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code = (0, code_1._)`${code}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code;
      }
    };
    exports.ValueScope = ValueScope;
  }
});

// node_modules/ajv/dist/compile/codegen/index.js
var require_codegen = __commonJS({
  "node_modules/ajv/dist/compile/codegen/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    var code_1 = require_code();
    var scope_1 = require_scope();
    var code_2 = require_code();
    Object.defineProperty(exports, "_", {
      enumerable: true,
      get: function() {
        return code_2._;
      }
    });
    Object.defineProperty(exports, "str", {
      enumerable: true,
      get: function() {
        return code_2.str;
      }
    });
    Object.defineProperty(exports, "strConcat", {
      enumerable: true,
      get: function() {
        return code_2.strConcat;
      }
    });
    Object.defineProperty(exports, "nil", {
      enumerable: true,
      get: function() {
        return code_2.nil;
      }
    });
    Object.defineProperty(exports, "getProperty", {
      enumerable: true,
      get: function() {
        return code_2.getProperty;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return code_2.stringify;
      }
    });
    Object.defineProperty(exports, "regexpCode", {
      enumerable: true,
      get: function() {
        return code_2.regexpCode;
      }
    });
    Object.defineProperty(exports, "Name", {
      enumerable: true,
      get: function() {
        return code_2.Name;
      }
    });
    var scope_2 = require_scope();
    Object.defineProperty(exports, "Scope", {
      enumerable: true,
      get: function() {
        return scope_2.Scope;
      }
    });
    Object.defineProperty(exports, "ValueScope", {
      enumerable: true,
      get: function() {
        return scope_2.ValueScope;
      }
    });
    Object.defineProperty(exports, "ValueScopeName", {
      enumerable: true,
      get: function() {
        return scope_2.ValueScopeName;
      }
    });
    Object.defineProperty(exports, "varKinds", {
      enumerable: true,
      get: function() {
        return scope_2.varKinds;
      }
    });
    exports.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    var Node = class {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    };
    var Def = class extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({
        es5,
        _n
      }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (!names[this.name.str]) return;
        if (this.rhs) this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    };
    var Assign = class extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({
        _n
      }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects) return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        const names = this.lhs instanceof code_1.Name ? {} : __spreadValues({}, this.lhs.names);
        return addExprNames(names, this.rhs);
      }
    };
    var AssignOp = class extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({
        _n
      }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    };
    var Label = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({
        _n
      }) {
        return `${this.label}:` + _n;
      }
    };
    var Break = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({
        _n
      }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    };
    var Throw = class extends Node {
      constructor(error) {
        super();
        this.error = error;
      }
      render({
        _n
      }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    };
    var AnyCode = class extends Node {
      constructor(code) {
        super();
        this.code = code;
      }
      render({
        _n
      }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    };
    var ParentNode = class extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
      }
      optimizeNodes() {
        const {
          nodes
        } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n)) nodes.splice(i, 1, ...n);
          else if (n) nodes[i] = n;
          else nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names, constants) {
        const {
          nodes
        } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names, constants)) continue;
          subtractNames(names, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
      }
    };
    var BlockNode = class extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    };
    var Root = class extends ParentNode {
    };
    var Else = class extends BlockNode {
    };
    Else.kind = "else";
    var If = class _If extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else) code += "else " + this.else.render(opts);
        return code;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true) return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false) return e instanceof _If ? e : e.nodes;
          if (this.nodes.length) return this;
          return new _If(not(cond), e instanceof _If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length) return void 0;
        return this;
      }
      optimizeNames(names, constants) {
        var _a2;
        this.else = (_a2 = this.else) === null || _a2 === void 0 ? void 0 : _a2.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else)) return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else) addNames(names, this.else.names);
        return names;
      }
    };
    If.kind = "if";
    var For = class extends BlockNode {
    };
    For.kind = "for";
    var ForLoop = class extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants)) return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    };
    var ForRange = class extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const {
          name,
          from,
          to
        } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
      }
    };
    var ForIter = class extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants)) return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    };
    var Func = class extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    };
    Func.kind = "func";
    var Return = class extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    };
    Return.kind = "return";
    var Try = class extends BlockNode {
      render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch) code += this.catch.render(opts);
        if (this.finally) code += this.finally.render(opts);
        return code;
      }
      optimizeNodes() {
        var _a2, _b;
        super.optimizeNodes();
        (_a2 = this.catch) === null || _a2 === void 0 ? void 0 : _a2.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names, constants) {
        var _a2, _b;
        super.optimizeNames(names, constants);
        (_a2 = this.catch) === null || _a2 === void 0 ? void 0 : _a2.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        if (this.catch) addNames(names, this.catch.names);
        if (this.finally) addNames(names, this.finally.names);
        return names;
      }
    };
    var Catch = class extends BlockNode {
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    };
    Catch.kind = "catch";
    var Finally = class extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    };
    Finally.kind = "finally";
    var CodeGen = class {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = __spreadProps(__spreadValues({}, opts), {
          _n: opts.lines ? "\n" : ""
        });
        this._extScope = extScope;
        this._scope = new scope_1.Scope({
          parent: extScope
        });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant) this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function") c();
        else if (c !== code_1.nil) this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
          if (code.length > 1) code.push(",");
          code.push(key);
          if (key !== value || this.opts.es5) {
            code.push(":");
            (0, code_1.addCodeArg)(code, value);
          }
        }
        code.push("}");
        return new code_1._Code(code);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node, forBody) {
        this._blockNode(node);
        if (forBody) this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name, (0, code_1._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1) throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode) throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body) this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0) throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody) this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
      }
      _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
      }
    };
    exports.CodeGen = CodeGen;
    function addNames(names, from) {
      for (const n in from) names[n] = (names[n] || 0) + (from[n] || 0);
      return names;
    }
    function addExprNames(names, from) {
      return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
    }
    function optimizeExpr(expr, names, constants) {
      if (expr instanceof code_1.Name) return replaceName(expr);
      if (!canOptimize(expr)) return expr;
      return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name) c = replaceName(c);
        if (c instanceof code_1._Code) items.push(...c._items);
        else items.push(c);
        return items;
      }, []));
      function replaceName(n) {
        const c = constants[n.str];
        if (c === void 0 || names[n.str] !== 1) return n;
        delete names[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
      }
    }
    function subtractNames(names, from) {
      for (const n in from) names[n] = (names[n] || 0) - (from[n] || 0);
    }
    function not(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
    }
    exports.not = not;
    var andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    var orCode = mappend(exports.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
    }
  }
});

// node_modules/ajv/dist/compile/util.js
var require_util = __commonJS({
  "node_modules/ajv/dist/compile/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
    var codegen_1 = require_codegen();
    var code_1 = require_code();
    function toHash(arr) {
      const hash = {};
      for (const item of arr) hash[item] = true;
      return hash;
    }
    exports.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      if (typeof schema == "boolean") return schema;
      if (Object.keys(schema).length === 0) return true;
      checkUnknownRules(it, schema);
      return !schemaHasRules(schema, it.self.RULES.all);
    }
    exports.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema = it.schema) {
      const {
        opts,
        self: self2
      } = it;
      if (!opts.strictSchema) return;
      if (typeof schema === "boolean") return;
      const rules = self2.RULES.keywords;
      for (const key in schema) {
        if (!rules[key]) checkStrictMode(it, `unknown keyword: "${key}"`);
      }
    }
    exports.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean") return !schema;
      for (const key in schema) if (rules[key]) return true;
      return false;
    }
    exports.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES) {
      if (typeof schema == "boolean") return !schema;
      for (const key in schema) if (key !== "$ref" && RULES.all[key]) return true;
      return false;
    }
    exports.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({
      topSchemaRef,
      schemaPath
    }, schema, keyword, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean") return schema;
        if (typeof schema == "string") return (0, codegen_1._)`${schema}`;
      }
      return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
    }
    exports.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    exports.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    exports.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      if (typeof str == "number") return `${str}`;
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs) f(x);
      } else {
        f(xs);
      }
    }
    exports.eachItem = eachItem;
    function makeMergeEvaluated({
      mergeNames,
      mergeToName,
      mergeValues,
      resultToName
    }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    exports.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
          gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
          if (from === true) {
            gen.assign(to, true);
          } else {
            gen.assign(to, (0, codegen_1._)`${to} || {}`);
            setEvaluated(gen, to, from);
          }
        }),
        mergeValues: (from, to) => from === true ? true : __spreadValues(__spreadValues({}, from), to),
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === true ? true : Math.max(from, to),
        resultToName: (gen, items) => gen.var("items", items)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === true) return gen.var("props", true);
      const props = gen.var("props", (0, codegen_1._)`{}`);
      if (ps !== void 0) setEvaluated(gen, props, ps);
      return props;
    }
    exports.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
    }
    exports.setEvaluated = setEvaluated;
    var snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
      });
    }
    exports.useFunc = useFunc;
    var Type;
    (function(Type2) {
      Type2[Type2["Num"] = 0] = "Num";
      Type2[Type2["Str"] = 1] = "Str";
    })(Type || (exports.Type = Type = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    exports.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (!mode) return;
      msg = `strict mode: ${msg}`;
      if (mode === true) throw new Error(msg);
      it.self.logger.warn(msg);
    }
    exports.checkStrictMode = checkStrictMode;
  }
});

// node_modules/ajv/dist/compile/names.js
var require_names = __commonJS({
  "node_modules/ajv/dist/compile/names.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var names = {
      // validation function arguments
      data: new codegen_1.Name("data"),
      // data passed to validation function
      // args passed from referencing schema
      valCxt: new codegen_1.Name("valCxt"),
      // validation/data context - should not be used directly, it is destructured to the names below
      instancePath: new codegen_1.Name("instancePath"),
      parentData: new codegen_1.Name("parentData"),
      parentDataProperty: new codegen_1.Name("parentDataProperty"),
      rootData: new codegen_1.Name("rootData"),
      // root data - same as the data passed to the first/top validation function
      dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
      // used to support recursiveRef and dynamicRef
      // function scoped variables
      vErrors: new codegen_1.Name("vErrors"),
      // null or array of validation errors
      errors: new codegen_1.Name("errors"),
      // counter of validation errors
      this: new codegen_1.Name("this"),
      // "globals"
      self: new codegen_1.Name("self"),
      scope: new codegen_1.Name("scope"),
      // JTD serialize/parse name for JSON string and position
      json: new codegen_1.Name("json"),
      jsonPos: new codegen_1.Name("jsonPos"),
      jsonLen: new codegen_1.Name("jsonLen"),
      jsonPart: new codegen_1.Name("jsonPart")
    };
    exports.default = names;
  }
});

// node_modules/ajv/dist/compile/errors.js
var require_errors = __commonJS({
  "node_modules/ajv/dist/compile/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    exports.keywordError = {
      message: ({
        keyword
      }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({
        keyword,
        schemaType
      }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
      const {
        it
      } = cxt;
      const {
        gen,
        compositeRule,
        allErrors
      } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
      const {
        it
      } = cxt;
      const {
        gen,
        compositeRule,
        allErrors
      } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({
      gen,
      keyword,
      schemaValue,
      data,
      errsCount,
      it
    }) {
      if (errsCount === void 0) throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_1._)`${err}.data`, data);
        }
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
      gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const {
        gen,
        validateName,
        schemaEnv
      } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    var E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      // also used in JTD errors
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error, errorPaths) {
      const {
        createErrors
      } = cxt.it;
      if (createErrors === false) return (0, codegen_1._)`{}`;
      return errorObject(cxt, error, errorPaths);
    }
    function errorObject(cxt, error, errorPaths = {}) {
      const {
        gen,
        it
      } = cxt;
      const keyValues = [errorInstancePath(it, errorPaths), errorSchemaPath(cxt, errorPaths)];
      extraErrorProps(cxt, error, keyValues);
      return gen.object(...keyValues);
    }
    function errorInstancePath({
      errorPath
    }, {
      instancePath
    }) {
      const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    function errorSchemaPath({
      keyword,
      it: {
        errSchemaPath
      }
    }, {
      schemaPath,
      parentSchema
    }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
      if (schemaPath) {
        schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, {
      params,
      message
    }, keyValues) {
      const {
        keyword,
        data,
        schemaValue,
        it
      } = cxt;
      const {
        opts,
        propertyName,
        topSchemaRef,
        schemaPath
      } = it;
      keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      if (propertyName) keyValues.push([E.propertyName, propertyName]);
    }
  }
});

// node_modules/ajv/dist/compile/validate/boolSchema.js
var require_boolSchema = __commonJS({
  "node_modules/ajv/dist/compile/validate/boolSchema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var boolError = {
      message: "boolean schema is false"
    };
    function topBoolOrEmptySchema(it) {
      const {
        gen,
        schema,
        validateName
      } = it;
      if (schema === false) {
        falseSchemaError(it, false);
      } else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, null);
        gen.return(true);
      }
    }
    exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      const {
        gen,
        schema
      } = it;
      if (schema === false) {
        gen.var(valid, false);
        falseSchemaError(it);
      } else {
        gen.var(valid, true);
      }
    }
    exports.boolOrEmptySchema = boolOrEmptySchema;
    function falseSchemaError(it, overrideAllErrors) {
      const {
        gen,
        data
      } = it;
      const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it
      };
      (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
    }
  }
});

// node_modules/ajv/dist/compile/rules.js
var require_rules = __commonJS({
  "node_modules/ajv/dist/compile/rules.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getRules = exports.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    var jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
      return typeof x == "string" && jsonTypes.has(x);
    }
    exports.isJSONType = isJSONType;
    function getRules() {
      const groups = {
        number: {
          type: "number",
          rules: []
        },
        string: {
          type: "string",
          rules: []
        },
        array: {
          type: "array",
          rules: []
        },
        object: {
          type: "object",
          rules: []
        }
      };
      return {
        types: __spreadProps(__spreadValues({}, groups), {
          integer: true,
          boolean: true,
          null: true
        }),
        rules: [{
          rules: []
        }, groups.number, groups.string, groups.array, groups.object],
        post: {
          rules: []
        },
        all: {},
        keywords: {}
      };
    }
    exports.getRules = getRules;
  }
});

// node_modules/ajv/dist/compile/validate/applicability.js
var require_applicability = __commonJS({
  "node_modules/ajv/dist/compile/validate/applicability.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({
      schema,
      self: self2
    }, type) {
      const group = self2.RULES.types[type];
      return group && group !== true && shouldUseGroup(schema, group);
    }
    exports.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema, group) {
      return group.rules.some((rule) => shouldUseRule(schema, rule));
    }
    exports.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema, rule) {
      var _a2;
      return schema[rule.keyword] !== void 0 || ((_a2 = rule.definition.implements) === null || _a2 === void 0 ? void 0 : _a2.some((kwd) => schema[kwd] !== void 0));
    }
    exports.shouldUseRule = shouldUseRule;
  }
});

// node_modules/ajv/dist/compile/validate/dataType.js
var require_dataType = __commonJS({
  "node_modules/ajv/dist/compile/validate/dataType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
    var rules_1 = require_rules();
    var applicability_1 = require_applicability();
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType || (exports.DataType = DataType = {}));
    function getSchemaTypes(schema) {
      const types = getJSONTypes(schema.type);
      const hasNull = types.includes("null");
      if (hasNull) {
        if (schema.nullable === false) throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types.length && schema.nullable !== void 0) {
          throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true) types.push("null");
      }
      return types;
    }
    exports.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types.every(rules_1.isJSONType)) return types;
      throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    exports.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types) {
      const {
        gen,
        data,
        opts
      } = it;
      const coerceTo = coerceToTypes(types, opts.coerceTypes);
      const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
      if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
          if (coerceTo.length) coerceData(it, types, coerceTo);
          else reportTypeError(it);
        });
      }
      return checkTypes;
    }
    exports.coerceAndCheckDataType = coerceAndCheckDataType;
    var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types, coerceTypes) {
      return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
    }
    function coerceData(it, types, coerceTo) {
      const {
        gen,
        data,
        opts
      } = it;
      const dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
      const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
      if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
      }
      gen.if((0, codegen_1._)`${coerced} !== undefined`);
      for (const t of coerceTo) {
        if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
          coerceSpecificType(t);
        }
      }
      gen.else();
      reportTypeError(it);
      gen.endIf();
      gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
      });
      function coerceSpecificType(t) {
        switch (t) {
          case "string":
            gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
            return;
          case "number":
            gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "integer":
            gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "boolean":
            gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
            return;
          case "null":
            gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
            gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
        }
      }
    }
    function assignParentData({
      gen,
      parentData,
      parentDataProperty
    }, expr) {
      gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
    }
    function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
      const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
      let cond;
      switch (dataType) {
        case "null":
          return (0, codegen_1._)`${data} ${EQ} null`;
        case "array":
          cond = (0, codegen_1._)`Array.isArray(${data})`;
          break;
        case "object":
          cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
          break;
        case "integer":
          cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
      }
      return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
      function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
      }
    }
    exports.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data, strictNums, correct) {
      if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
      }
      let cond;
      const types = (0, util_1.toHash)(dataTypes);
      if (types.array && types.object) {
        const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
      } else {
        cond = codegen_1.nil;
      }
      if (types.number) delete types.integer;
      for (const t in types) cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
      return cond;
    }
    exports.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({
        schema
      }) => `must be ${schema}`,
      params: ({
        schema,
        schemaValue
      }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      (0, errors_1.reportError)(cxt, typeError);
    }
    exports.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      const {
        gen,
        data,
        schema
      } = it;
      const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
      return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
      };
    }
  }
});

// node_modules/ajv/dist/compile/validate/defaults.js
var require_defaults = __commonJS({
  "node_modules/ajv/dist/compile/validate/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.assignDefaults = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function assignDefaults(it, ty) {
      const {
        properties,
        items
      } = it.schema;
      if (ty === "object" && properties) {
        for (const key in properties) {
          assignDefault(it, key, properties[key].default);
        }
      } else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
      }
    }
    exports.assignDefaults = assignDefaults;
    function assignDefault(it, prop, defaultValue) {
      const {
        gen,
        compositeRule,
        data,
        opts
      } = it;
      if (defaultValue === void 0) return;
      const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
      if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
      }
      let condition = (0, codegen_1._)`${childData} === undefined`;
      if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
      }
      gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
    }
  }
});

// node_modules/ajv/dist/vocabularies/code.js
var require_code2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    var util_2 = require_util();
    function checkReportMissingProp(cxt, prop) {
      const {
        gen,
        data,
        it
      } = cxt;
      gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({
          missingProperty: (0, codegen_1._)`${prop}`
        }, true);
        cxt.error();
      });
    }
    exports.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({
      gen,
      data,
      it: {
        opts
      }
    }, properties, missing) {
      return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
    }
    exports.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({
        missingProperty: missing
      }, true);
      cxt.error();
    }
    exports.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
      });
    }
    exports.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data, property) {
      return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    exports.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
      return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    exports.propertyInData = propertyInData;
    function noPropertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
      return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
    }
    exports.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap) {
      return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    exports.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap) {
      return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
    }
    exports.schemaProperties = schemaProperties;
    function callValidateCode({
      schemaCode,
      data,
      it: {
        gen,
        topSchemaRef,
        schemaPath,
        errorPath
      },
      it
    }, func, context2, passSchema) {
      const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
      const valCxt = [[names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)], [names_1.default.parentData, it.parentData], [names_1.default.parentDataProperty, it.parentDataProperty], [names_1.default.rootData, names_1.default.rootData]];
      if (it.opts.dynamicRef) valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
      const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
      return context2 !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context2}, ${args})` : (0, codegen_1._)`${func}(${args})`;
    }
    exports.callValidateCode = callValidateCode;
    var newRegExp = (0, codegen_1._)`new RegExp`;
    function usePattern({
      gen,
      it: {
        opts
      }
    }, pattern) {
      const u = opts.unicodeRegExp ? "u" : "";
      const {
        regExp
      } = opts.code;
      const rx = regExp(pattern, u);
      return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
      });
    }
    exports.usePattern = usePattern;
    function validateArray(cxt) {
      const {
        gen,
        data,
        keyword,
        it
      } = cxt;
      const valid = gen.name("valid");
      if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
      }
      gen.var(valid, true);
      validateItems(() => gen.break());
      return valid;
      function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: util_1.Type.Num
          }, valid);
          gen.if((0, codegen_1.not)(valid), notValid);
        });
      }
    }
    exports.validateArray = validateArray;
    function validateUnion(cxt) {
      const {
        gen,
        schema,
        keyword,
        it
      } = cxt;
      if (!Array.isArray(schema)) throw new Error("ajv implementation error");
      const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
      if (alwaysValid && !it.opts.unevaluated) return;
      const valid = gen.let("valid", false);
      const schValid = gen.name("_valid");
      gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
          keyword,
          schemaProp: i,
          compositeRule: true
        }, schValid);
        gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        if (!merged) gen.if((0, codegen_1.not)(valid));
      }));
      cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
    }
    exports.validateUnion = validateUnion;
  }
});

// node_modules/ajv/dist/compile/validate/keyword.js
var require_keyword = __commonJS({
  "node_modules/ajv/dist/compile/validate/keyword.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var code_1 = require_code2();
    var errors_1 = require_errors();
    function macroKeywordCode(cxt, def) {
      const {
        gen,
        keyword,
        schema,
        parentSchema,
        it
      } = cxt;
      const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
      const schemaRef = useKeyword(gen, keyword, macroSchema);
      if (it.opts.validateSchema !== false) it.self.validateSchema(macroSchema, true);
      const valid = gen.name("valid");
      cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true
      }, valid);
      cxt.pass(valid, () => cxt.error(true));
    }
    exports.macroKeywordCode = macroKeywordCode;
    function funcKeywordCode(cxt, def) {
      var _a2;
      const {
        gen,
        keyword,
        schema,
        parentSchema,
        $data,
        it
      } = cxt;
      checkAsyncKeyword(it, def);
      const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
      const validateRef = useKeyword(gen, keyword, validate);
      const valid = gen.let("valid");
      cxt.block$data(valid, validateKeyword);
      cxt.ok((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid);
      function validateKeyword() {
        if (def.errors === false) {
          assignValid();
          if (def.modifying) modifyData(cxt);
          reportErrs(() => cxt.error());
        } else {
          const ruleErrs = def.async ? validateAsync() : validateSync();
          if (def.modifying) modifyData(cxt);
          reportErrs(() => addErrs(cxt, ruleErrs));
        }
      }
      function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
      }
      function validateSync() {
        const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
      }
      function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !("compile" in def && !$data || def.schema === false);
        gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
      }
      function reportErrs(errors) {
        var _a3;
        gen.if((0, codegen_1.not)((_a3 = def.valid) !== null && _a3 !== void 0 ? _a3 : valid), errors);
      }
    }
    exports.funcKeywordCode = funcKeywordCode;
    function modifyData(cxt) {
      const {
        gen,
        data,
        it
      } = cxt;
      gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
    }
    function addErrs(cxt, errs) {
      const {
        gen
      } = cxt;
      gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
      }, () => cxt.error());
    }
    function checkAsyncKeyword({
      schemaEnv
    }, def) {
      if (def.async && !schemaEnv.$async) throw new Error("async keyword in sync schema");
    }
    function useKeyword(gen, keyword, result) {
      if (result === void 0) throw new Error(`keyword "${keyword}" failed to compile`);
      return gen.scopeValue("keyword", typeof result == "function" ? {
        ref: result
      } : {
        ref: result,
        code: (0, codegen_1.stringify)(result)
      });
    }
    function validSchemaType(schema, schemaType, allowUndefined = false) {
      return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
    }
    exports.validSchemaType = validSchemaType;
    function validateKeywordUsage({
      schema,
      opts,
      self: self2,
      errSchemaPath
    }, def, keyword) {
      if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
      }
      const deps = def.dependencies;
      if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
      }
      if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
          const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self2.errorsText(def.validateSchema.errors);
          if (opts.validateSchema === "log") self2.logger.error(msg);
          else throw new Error(msg);
        }
      }
    }
    exports.validateKeywordUsage = validateKeywordUsage;
  }
});

// node_modules/ajv/dist/compile/validate/subschema.js
var require_subschema = __commonJS({
  "node_modules/ajv/dist/compile/validate/subschema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function getSubschema(it, {
      keyword,
      schemaProp,
      schema,
      schemaPath,
      errSchemaPath,
      topSchemaRef
    }) {
      if (keyword !== void 0 && schema !== void 0) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
      }
      if (keyword !== void 0) {
        const sch = it.schema[keyword];
        return schemaProp === void 0 ? {
          schema: sch,
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`
        } : {
          schema: sch[schemaProp],
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
        };
      }
      if (schema !== void 0) {
        if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
          throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
          schema,
          schemaPath,
          topSchemaRef,
          errSchemaPath
        };
      }
      throw new Error('either "keyword" or "schema" must be passed');
    }
    exports.getSubschema = getSubschema;
    function extendSubschemaData(subschema, it, {
      dataProp,
      dataPropType: dpType,
      data,
      dataTypes,
      propertyName
    }) {
      if (data !== void 0 && dataProp !== void 0) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
      }
      const {
        gen
      } = it;
      if (dataProp !== void 0) {
        const {
          errorPath,
          dataPathArr,
          opts
        } = it;
        const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
      }
      if (data !== void 0) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
        dataContextProps(nextData);
        if (propertyName !== void 0) subschema.propertyName = propertyName;
      }
      if (dataTypes) subschema.dataTypes = dataTypes;
      function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = /* @__PURE__ */ new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
      }
    }
    exports.extendSubschemaData = extendSubschemaData;
    function extendSubschemaMode(subschema, {
      jtdDiscriminator,
      jtdMetadata,
      compositeRule,
      createErrors,
      allErrors
    }) {
      if (compositeRule !== void 0) subschema.compositeRule = compositeRule;
      if (createErrors !== void 0) subschema.createErrors = createErrors;
      if (allErrors !== void 0) subschema.allErrors = allErrors;
      subschema.jtdDiscriminator = jtdDiscriminator;
      subschema.jtdMetadata = jtdMetadata;
    }
    exports.extendSubschemaMode = extendSubschemaMode;
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/json-schema-traverse/index.js
var require_json_schema_traverse = __commonJS({
  "node_modules/json-schema-traverse/index.js"(exports, module) {
    "use strict";
    var traverse = module.exports = function(schema, opts, cb) {
      if (typeof opts == "function") {
        cb = opts;
        opts = {};
      }
      cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      };
      var post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema, "", schema);
    };
    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };
    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    traverse.propsKeywords = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };
    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == "object" && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i = 0; i < sch.length; i++) _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == "object") {
              for (var prop in sch) _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
            _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    function escapeJsonPtr(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});

// node_modules/ajv/dist/compile/resolve.js
var require_resolve = __commonJS({
  "node_modules/ajv/dist/compile/resolve.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
    var util_1 = require_util();
    var equal = require_fast_deep_equal();
    var traverse = require_json_schema_traverse();
    var SIMPLE_INLINED = /* @__PURE__ */ new Set(["type", "format", "pattern", "maxLength", "minLength", "maxProperties", "minProperties", "maxItems", "minItems", "maximum", "minimum", "uniqueItems", "multipleOf", "required", "enum", "const"]);
    function inlineRef(schema, limit = true) {
      if (typeof schema == "boolean") return true;
      if (limit === true) return !hasRef(schema);
      if (!limit) return false;
      return countKeys(schema) <= limit;
    }
    exports.inlineRef = inlineRef;
    var REF_KEYWORDS = /* @__PURE__ */ new Set(["$ref", "$recursiveRef", "$recursiveAnchor", "$dynamicRef", "$dynamicAnchor"]);
    function hasRef(schema) {
      for (const key in schema) {
        if (REF_KEYWORDS.has(key)) return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef)) return true;
        if (typeof sch == "object" && hasRef(sch)) return true;
      }
      return false;
    }
    function countKeys(schema) {
      let count = 0;
      for (const key in schema) {
        if (key === "$ref") return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key)) continue;
        if (typeof schema[key] == "object") {
          (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
        }
        if (count === Infinity) return Infinity;
      }
      return count;
    }
    function getFullPath(resolver, id = "", normalize) {
      if (normalize !== false) id = normalizeId(id);
      const p = resolver.parse(id);
      return _getFullPath(resolver, p);
    }
    exports.getFullPath = getFullPath;
    function _getFullPath(resolver, p) {
      const serialized = resolver.serialize(p);
      return serialized.split("#")[0] + "#";
    }
    exports._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    exports.normalizeId = normalizeId;
    function resolveUrl(resolver, baseId, id) {
      id = normalizeId(id);
      return resolver.resolve(baseId, id);
    }
    exports.resolveUrl = resolveUrl;
    var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema, baseId) {
      if (typeof schema == "boolean") return {};
      const {
        schemaId,
        uriResolver
      } = this.opts;
      const schId = normalizeId(schema[schemaId] || baseId);
      const baseIds = {
        "": schId
      };
      const pathPrefix = getFullPath(uriResolver, schId, false);
      const localRefs = {};
      const schemaRefs = /* @__PURE__ */ new Set();
      traverse(schema, {
        allKeys: true
      }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === void 0) return;
        const fullPath = pathPrefix + jsonPtr;
        let innerBaseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string") innerBaseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = innerBaseId;
        function addRef(ref) {
          const _resolve = this.opts.uriResolver.resolve;
          ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref);
          if (schemaRefs.has(ref)) throw ambiguos(ref);
          schemaRefs.add(ref);
          let schOrRef = this.refs[ref];
          if (typeof schOrRef == "string") schOrRef = this.refs[schOrRef];
          if (typeof schOrRef == "object") {
            checkAmbiguosRef(sch, schOrRef.schema, ref);
          } else if (ref !== normalizeId(fullPath)) {
            if (ref[0] === "#") {
              checkAmbiguosRef(sch, localRefs[ref], ref);
              localRefs[ref] = sch;
            } else {
              this.refs[ref] = fullPath;
            }
          }
          return ref;
        }
        function addAnchor(anchor) {
          if (typeof anchor == "string") {
            if (!ANCHOR.test(anchor)) throw new Error(`invalid anchor "${anchor}"`);
            addRef.call(this, `#${anchor}`);
          }
        }
      });
      return localRefs;
      function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== void 0 && !equal(sch1, sch2)) throw ambiguos(ref);
      }
      function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
      }
    }
    exports.getSchemaRefs = getSchemaRefs;
  }
});

// node_modules/ajv/dist/compile/validate/index.js
var require_validate2 = __commonJS({
  "node_modules/ajv/dist/compile/validate/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
    var boolSchema_1 = require_boolSchema();
    var dataType_1 = require_dataType();
    var applicability_1 = require_applicability();
    var dataType_2 = require_dataType();
    var defaults_1 = require_defaults();
    var keyword_1 = require_keyword();
    var subschema_1 = require_subschema();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var errors_1 = require_errors();
    function validateFunctionCode(it) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          topSchemaObjCode(it);
          return;
        }
      }
      validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
    }
    exports.validateFunctionCode = validateFunctionCode;
    function validateFunction({
      gen,
      validateName,
      schema,
      schemaEnv,
      opts
    }, body) {
      if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
          gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
          destructureValCxtES5(gen, opts);
          gen.code(body);
        });
      } else {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
      }
    }
    function destructureValCxt(opts) {
      return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
    }
    function destructureValCxtES5(gen, opts) {
      gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef) gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
      }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef) gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
      });
    }
    function topSchemaObjCode(it) {
      const {
        schema,
        opts,
        gen
      } = it;
      validateFunction(it, () => {
        if (opts.$comment && schema.$comment) commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated) resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
      });
      return;
    }
    function resetEvaluated(it) {
      const {
        gen,
        validateName
      } = it;
      it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
    }
    function funcSourceUrl(schema, opts) {
      const schId = typeof schema == "object" && schema[opts.schemaId];
      return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
    }
    function subschemaCode(it, valid) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          subSchemaObjCode(it, valid);
          return;
        }
      }
      (0, boolSchema_1.boolOrEmptySchema)(it, valid);
    }
    function schemaCxtHasRules({
      schema,
      self: self2
    }) {
      if (typeof schema == "boolean") return !schema;
      for (const key in schema) if (self2.RULES.all[key]) return true;
      return false;
    }
    function isSchemaObj(it) {
      return typeof it.schema != "boolean";
    }
    function subSchemaObjCode(it, valid) {
      const {
        schema,
        gen,
        opts
      } = it;
      if (opts.$comment && schema.$comment) commentKeyword(it);
      updateContext(it);
      checkAsyncSchema(it);
      const errsCount = gen.const("_errs", names_1.default.errors);
      typeAndKeywords(it, errsCount);
      gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
    }
    function checkKeywords(it) {
      (0, util_1.checkUnknownRules)(it);
      checkRefsAndKeywords(it);
    }
    function typeAndKeywords(it, errsCount) {
      if (it.opts.jtd) return schemaKeywords(it, [], false, errsCount);
      const types = (0, dataType_1.getSchemaTypes)(it.schema);
      const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
      schemaKeywords(it, types, !checkedTypes, errsCount);
    }
    function checkRefsAndKeywords(it) {
      const {
        schema,
        errSchemaPath,
        opts,
        self: self2
      } = it;
      if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self2.RULES)) {
        self2.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
      }
    }
    function checkNoDefault(it) {
      const {
        schema,
        opts
      } = it;
      if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
      }
    }
    function updateContext(it) {
      const schId = it.schema[it.opts.schemaId];
      if (schId) it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
    }
    function checkAsyncSchema(it) {
      if (it.schema.$async && !it.schemaEnv.$async) throw new Error("async schema in sync schema");
    }
    function commentKeyword({
      gen,
      schemaEnv,
      schema,
      errSchemaPath,
      opts
    }) {
      const msg = schema.$comment;
      if (opts.$comment === true) {
        gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
      } else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", {
          ref: schemaEnv.root
        });
        gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
      }
    }
    function returnResults(it) {
      const {
        gen,
        schemaEnv,
        validateName,
        ValidationError,
        opts
      } = it;
      if (schemaEnv.$async) {
        gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated) assignEvaluated(it);
        gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
      }
    }
    function assignEvaluated({
      gen,
      evaluated,
      props,
      items
    }) {
      if (props instanceof codegen_1.Name) gen.assign((0, codegen_1._)`${evaluated}.props`, props);
      if (items instanceof codegen_1.Name) gen.assign((0, codegen_1._)`${evaluated}.items`, items);
    }
    function schemaKeywords(it, types, typeErrors, errsCount) {
      const {
        gen,
        schema,
        data,
        allErrors,
        opts,
        self: self2
      } = it;
      const {
        RULES
      } = self2;
      if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
        return;
      }
      if (!opts.jtd) checkStrictTypes(it, types);
      gen.block(() => {
        for (const group of RULES.rules) groupKeywords(group);
        groupKeywords(RULES.post);
      });
      function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group)) return;
        if (group.type) {
          gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
          iterateKeywords(it, group);
          if (types.length === 1 && types[0] === group.type && typeErrors) {
            gen.else();
            (0, dataType_2.reportTypeError)(it);
          }
          gen.endIf();
        } else {
          iterateKeywords(it, group);
        }
        if (!allErrors) gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
      }
    }
    function iterateKeywords(it, group) {
      const {
        gen,
        schema,
        opts: {
          useDefaults
        }
      } = it;
      if (useDefaults) (0, defaults_1.assignDefaults)(it, group.type);
      gen.block(() => {
        for (const rule of group.rules) {
          if ((0, applicability_1.shouldUseRule)(schema, rule)) {
            keywordCode(it, rule.keyword, rule.definition, group.type);
          }
        }
      });
    }
    function checkStrictTypes(it, types) {
      if (it.schemaEnv.meta || !it.opts.strictTypes) return;
      checkContextTypes(it, types);
      if (!it.opts.allowUnionTypes) checkMultipleTypes(it, types);
      checkKeywordTypes(it, it.dataTypes);
    }
    function checkContextTypes(it, types) {
      if (!types.length) return;
      if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
      }
      types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
          strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
      });
      narrowSchemaTypes(it, types);
    }
    function checkMultipleTypes(it, ts) {
      if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
      }
    }
    function checkKeywordTypes(it, ts) {
      const rules = it.self.RULES.all;
      for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
          const {
            type
          } = rule.definition;
          if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
            strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
          }
        }
      }
    }
    function hasApplicableType(schTs, kwdT) {
      return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
    }
    function includesType(ts, t) {
      return ts.includes(t) || t === "integer" && ts.includes("number");
    }
    function narrowSchemaTypes(it, withTypes) {
      const ts = [];
      for (const t of it.dataTypes) {
        if (includesType(withTypes, t)) ts.push(t);
        else if (withTypes.includes("integer") && t === "number") ts.push("integer");
      }
      it.dataTypes = ts;
    }
    function strictTypesError(it, msg) {
      const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
      msg += ` at "${schemaPath}" (strictTypes)`;
      (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
    }
    var KeywordCxt = class {
      constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
          this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        } else {
          this.schemaCode = this.schemaValue;
          if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
            throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
          }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
          this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
      }
      result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
      }
      failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction) failAction();
        else this.error();
        if (successAction) {
          this.gen.else();
          successAction();
          if (this.allErrors) this.gen.endIf();
        } else {
          if (this.allErrors) this.gen.endIf();
          else this.gen.else();
        }
      }
      pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), void 0, failAction);
      }
      fail(condition) {
        if (condition === void 0) {
          this.error();
          if (!this.allErrors) this.gen.if(false);
          return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors) this.gen.endIf();
        else this.gen.else();
      }
      fail$data(condition) {
        if (!this.$data) return this.fail(condition);
        const {
          schemaCode
        } = this;
        this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
      }
      error(append, errorParams, errorPaths) {
        if (errorParams) {
          this.setParams(errorParams);
          this._error(append, errorPaths);
          this.setParams({});
          return;
        }
        this._error(append, errorPaths);
      }
      _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
      }
      $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
      }
      reset() {
        if (this.errsCount === void 0) throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
      }
      ok(cond) {
        if (!this.allErrors) this.gen.if(cond);
      }
      setParams(obj, assign) {
        if (assign) Object.assign(this.params, obj);
        else this.params = obj;
      }
      block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
          this.check$data(valid, $dataValid);
          codeBlock();
        });
      }
      check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data) return;
        const {
          gen,
          schemaCode,
          schemaType,
          def
        } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil) gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
          gen.elseIf(this.invalid$data());
          this.$dataError();
          if (valid !== codegen_1.nil) gen.assign(valid, false);
        }
        gen.else();
      }
      invalid$data() {
        const {
          gen,
          schemaCode,
          schemaType,
          def,
          it
        } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
          if (schemaType.length) {
            if (!(schemaCode instanceof codegen_1.Name)) throw new Error("ajv implementation error");
            const st = Array.isArray(schemaType) ? schemaType : [schemaType];
            return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
          }
          return codegen_1.nil;
        }
        function invalid$DataSchema() {
          if (def.validateSchema) {
            const validateSchemaRef = gen.scopeValue("validate$data", {
              ref: def.validateSchema
            });
            return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
          }
          return codegen_1.nil;
        }
      }
      subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = __spreadProps(__spreadValues(__spreadValues({}, this.it), subschema), {
          items: void 0,
          props: void 0
        });
        subschemaCode(nextContext, valid);
        return nextContext;
      }
      mergeEvaluated(schemaCxt, toName) {
        const {
          it,
          gen
        } = this;
        if (!it.opts.unevaluated) return;
        if (it.props !== true && schemaCxt.props !== void 0) {
          it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== void 0) {
          it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
      }
      mergeValidEvaluated(schemaCxt, valid) {
        const {
          it,
          gen
        } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
          gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
          return true;
        }
      }
    };
    exports.KeywordCxt = KeywordCxt;
    function keywordCode(it, keyword, def, ruleType) {
      const cxt = new KeywordCxt(it, def, keyword);
      if ("code" in def) {
        def.code(cxt, ruleType);
      } else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      } else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
      } else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      }
    }
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, {
      dataLevel,
      dataNames,
      dataPathArr
    }) {
      let jsonPointer;
      let data;
      if ($data === "") return names_1.default.rootData;
      if ($data[0] === "/") {
        if (!JSON_POINTER.test($data)) throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
      } else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches) throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
          if (up >= dataLevel) throw new Error(errorMsg("property/index", up));
          return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel) throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer) return data;
      }
      let expr = data;
      const segments = jsonPointer.split("/");
      for (const segment of segments) {
        if (segment) {
          data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
          expr = (0, codegen_1._)`${expr} && ${data}`;
        }
      }
      return expr;
      function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
      }
    }
    exports.getData = getData;
  }
});

// node_modules/ajv/dist/runtime/validation_error.js
var require_validation_error = __commonJS({
  "node_modules/ajv/dist/runtime/validation_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ValidationError = class extends Error {
      constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
      }
    };
    exports.default = ValidationError;
  }
});

// node_modules/ajv/dist/compile/ref_error.js
var require_ref_error = __commonJS({
  "node_modules/ajv/dist/compile/ref_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var resolve_1 = require_resolve();
    var MissingRefError = class extends Error {
      constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
      }
    };
    exports.default = MissingRefError;
  }
});

// node_modules/ajv/dist/compile/index.js
var require_compile = __commonJS({
  "node_modules/ajv/dist/compile/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
    var codegen_1 = require_codegen();
    var validation_error_1 = require_validation_error();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var validate_1 = require_validate2();
    var SchemaEnv = class {
      constructor(env) {
        var _a2;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object") schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a2 = env.baseId) !== null && _a2 !== void 0 ? _a2 : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
      }
    };
    exports.SchemaEnv = SchemaEnv;
    function compileSchema(sch) {
      const _sch = getCompilingSchema.call(this, sch);
      if (_sch) return _sch;
      const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
      const {
        es5,
        lines
      } = this.opts.code;
      const {
        ownProperties
      } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, {
        es5,
        lines,
        ownProperties
      });
      let _ValidationError;
      if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
          ref: validation_error_1.default,
          code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
        });
      }
      const validateName = gen.scopeName("validate");
      sch.validateName = validateName;
      const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        // TODO can its length be used as dataLevel if nil is removed?
        dataLevel: 0,
        dataTypes: [],
        definedProperties: /* @__PURE__ */ new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? {
          ref: sch.schema,
          code: (0, codegen_1.stringify)(sch.schema)
        } : {
          ref: sch.schema
        }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._)`""`,
        opts: this.opts,
        self: this
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        if (this.opts.code.process) sourceCode = this.opts.code.process(sourceCode, sch);
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, {
          ref: validate
        });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async) validate.$async = true;
        if (this.opts.code.source === true) {
          validate.source = {
            validateName,
            validateCode,
            scopeValues: gen._values
          };
        }
        if (this.opts.unevaluated) {
          const {
            props,
            items
          } = schemaCxt;
          validate.evaluated = {
            props: props instanceof codegen_1.Name ? void 0 : props,
            items: items instanceof codegen_1.Name ? void 0 : items,
            dynamicProps: props instanceof codegen_1.Name,
            dynamicItems: items instanceof codegen_1.Name
          };
          if (validate.source) validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
      } catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode) this.logger.error("Error compiling schema, function code:", sourceCode);
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
    }
    exports.compileSchema = compileSchema;
    function resolveRef(root, baseId, ref) {
      var _a2;
      ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
      const schOrFunc = root.refs[ref];
      if (schOrFunc) return schOrFunc;
      let _sch = resolve.call(this, root, ref);
      if (_sch === void 0) {
        const schema = (_a2 = root.localRefs) === null || _a2 === void 0 ? void 0 : _a2[ref];
        const {
          schemaId
        } = this.opts;
        if (schema) _sch = new SchemaEnv({
          schema,
          schemaId,
          root,
          baseId
        });
      }
      if (_sch === void 0) return;
      return root.refs[ref] = inlineOrCompile.call(this, _sch);
    }
    exports.resolveRef = resolveRef;
    function inlineOrCompile(sch) {
      if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs)) return sch.schema;
      return sch.validate ? sch : compileSchema.call(this, sch);
    }
    function getCompilingSchema(schEnv) {
      for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv)) return sch;
      }
    }
    exports.getCompilingSchema = getCompilingSchema;
    function sameSchemaEnv(s1, s2) {
      return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    function resolve(root, ref) {
      let sch;
      while (typeof (sch = this.refs[ref]) == "string") ref = sch;
      return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
    }
    function resolveSchema(root, ref) {
      const p = this.opts.uriResolver.parse(ref);
      const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
      let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
      if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
      }
      const id = (0, resolve_1.normalizeId)(refPath);
      const schOrRef = this.refs[id] || this.schemas[id];
      if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object") return;
        return getJsonPointer.call(this, p, sch);
      }
      if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object") return;
      if (!schOrRef.validate) compileSchema.call(this, schOrRef);
      if (id === (0, resolve_1.normalizeId)(ref)) {
        const {
          schema
        } = schOrRef;
        const {
          schemaId
        } = this.opts;
        const schId = schema[schemaId];
        if (schId) baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({
          schema,
          schemaId,
          root,
          baseId
        });
      }
      return getJsonPointer.call(this, p, schOrRef);
    }
    exports.resolveSchema = resolveSchema;
    var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set(["properties", "patternProperties", "enum", "dependencies", "definitions"]);
    function getJsonPointer(parsedRef, {
      baseId,
      schema,
      root
    }) {
      var _a2;
      if (((_a2 = parsedRef.fragment) === null || _a2 === void 0 ? void 0 : _a2[0]) !== "/") return;
      for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean") return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === void 0) return;
        schema = partSchema;
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
      }
      let env;
      if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
      }
      const {
        schemaId
      } = this.opts;
      env = env || new SchemaEnv({
        schema,
        schemaId,
        root,
        baseId
      });
      if (env.schema !== env.root.schema) return env;
      return void 0;
    }
  }
});

// node_modules/ajv/dist/refs/data.json
var require_data = __commonJS({
  "node_modules/ajv/dist/refs/data.json"(exports, module) {
    module.exports = {
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
        }
      },
      additionalProperties: false
    };
  }
});

// node_modules/fast-uri/lib/utils.js
var require_utils = __commonJS({
  "node_modules/fast-uri/lib/utils.js"(exports, module) {
    "use strict";
    var isUUID = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu);
    var isIPv4 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
    var isHexPair = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu);
    var isUnreserved = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu);
    var isPathCharacter = RegExp.prototype.test.bind(/^[\da-z\-._~!$&'()*+,;=:@/]$/iu);
    function stringArrayToHexStripped(input) {
      let acc = "";
      let code = 0;
      let i = 0;
      for (i = 0; i < input.length; i++) {
        code = input[i].charCodeAt(0);
        if (code === 48) {
          continue;
        }
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
          return "";
        }
        acc += input[i];
        break;
      }
      for (i += 1; i < input.length; i++) {
        code = input[i].charCodeAt(0);
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
          return "";
        }
        acc += input[i];
      }
      return acc;
    }
    var nonSimpleDomain = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
    function consumeIsZone(buffer) {
      buffer.length = 0;
      return true;
    }
    function consumeHextets(buffer, address, output) {
      if (buffer.length) {
        const hex = stringArrayToHexStripped(buffer);
        if (hex !== "") {
          address.push(hex);
        } else {
          output.error = true;
          return false;
        }
        buffer.length = 0;
      }
      return true;
    }
    function getIPV6(input) {
      let tokenCount = 0;
      const output = {
        error: false,
        address: "",
        zone: ""
      };
      const address = [];
      const buffer = [];
      let endipv6Encountered = false;
      let endIpv6 = false;
      let consume = consumeHextets;
      for (let i = 0; i < input.length; i++) {
        const cursor = input[i];
        if (cursor === "[" || cursor === "]") {
          continue;
        }
        if (cursor === ":") {
          if (endipv6Encountered === true) {
            endIpv6 = true;
          }
          if (!consume(buffer, address, output)) {
            break;
          }
          if (++tokenCount > 7) {
            output.error = true;
            break;
          }
          if (i > 0 && input[i - 1] === ":") {
            endipv6Encountered = true;
          }
          address.push(":");
          continue;
        } else if (cursor === "%") {
          if (!consume(buffer, address, output)) {
            break;
          }
          consume = consumeIsZone;
        } else {
          buffer.push(cursor);
          continue;
        }
      }
      if (buffer.length) {
        if (consume === consumeIsZone) {
          output.zone = buffer.join("");
        } else if (endIpv6) {
          address.push(buffer.join(""));
        } else {
          address.push(stringArrayToHexStripped(buffer));
        }
      }
      output.address = address.join("");
      return output;
    }
    function normalizeIPv6(host) {
      if (findToken(host, ":") < 2) {
        return {
          host,
          isIPV6: false
        };
      }
      const ipv6 = getIPV6(host);
      if (!ipv6.error) {
        let newHost = ipv6.address;
        let escapedHost = ipv6.address;
        if (ipv6.zone) {
          newHost += "%" + ipv6.zone;
          escapedHost += "%25" + ipv6.zone;
        }
        return {
          host: newHost,
          isIPV6: true,
          escapedHost
        };
      } else {
        return {
          host,
          isIPV6: false
        };
      }
    }
    function findToken(str, token) {
      let ind = 0;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === token) ind++;
      }
      return ind;
    }
    function removeDotSegments(path) {
      let input = path;
      const output = [];
      let nextSlash = -1;
      let len = 0;
      while (len = input.length) {
        if (len === 1) {
          if (input === ".") {
            break;
          } else if (input === "/") {
            output.push("/");
            break;
          } else {
            output.push(input);
            break;
          }
        } else if (len === 2) {
          if (input[0] === ".") {
            if (input[1] === ".") {
              break;
            } else if (input[1] === "/") {
              input = input.slice(2);
              continue;
            }
          } else if (input[0] === "/") {
            if (input[1] === "." || input[1] === "/") {
              output.push("/");
              break;
            }
          }
        } else if (len === 3) {
          if (input === "/..") {
            if (output.length !== 0) {
              output.pop();
            }
            output.push("/");
            break;
          }
        }
        if (input[0] === ".") {
          if (input[1] === ".") {
            if (input[2] === "/") {
              input = input.slice(3);
              continue;
            }
          } else if (input[1] === "/") {
            input = input.slice(2);
            continue;
          }
        } else if (input[0] === "/") {
          if (input[1] === ".") {
            if (input[2] === "/") {
              input = input.slice(2);
              continue;
            } else if (input[2] === ".") {
              if (input[3] === "/") {
                input = input.slice(3);
                if (output.length !== 0) {
                  output.pop();
                }
                continue;
              }
            }
          }
        }
        if ((nextSlash = input.indexOf("/", 1)) === -1) {
          output.push(input);
          break;
        } else {
          output.push(input.slice(0, nextSlash));
          input = input.slice(nextSlash);
        }
      }
      return output.join("");
    }
    var HOST_DELIMS = {
      "@": "%40",
      "/": "%2F",
      "?": "%3F",
      "#": "%23",
      ":": "%3A"
    };
    var HOST_DELIM_RE = /[@/?#:]/g;
    var HOST_DELIM_NO_COLON_RE = /[@/?#]/g;
    function reescapeHostDelimiters(host, isIP) {
      const re2 = isIP ? HOST_DELIM_NO_COLON_RE : HOST_DELIM_RE;
      re2.lastIndex = 0;
      return host.replace(re2, (ch) => HOST_DELIMS[ch]);
    }
    function normalizePercentEncoding(input, decodeUnreserved = false) {
      if (input.indexOf("%") === -1) {
        return input;
      }
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (decodeUnreserved && isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        output += input[i];
      }
      return output;
    }
    function normalizePathEncoding(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (decoded !== "." && isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        if (isPathCharacter(input[i])) {
          output += input[i];
        } else {
          output += escape(input[i]);
        }
      }
      return output;
    }
    function escapePreservingEscapes(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        output += escape(input[i]);
      }
      return output;
    }
    function recomposeAuthority(component) {
      const uriTokens = [];
      if (component.userinfo !== void 0) {
        uriTokens.push(component.userinfo);
        uriTokens.push("@");
      }
      if (component.host !== void 0) {
        let host = unescape(component.host);
        if (!isIPv4(host)) {
          const ipV6res = normalizeIPv6(host);
          if (ipV6res.isIPV6 === true) {
            host = `[${ipV6res.escapedHost}]`;
          } else {
            host = reescapeHostDelimiters(host, false);
          }
        }
        uriTokens.push(host);
      }
      if (typeof component.port === "number" || typeof component.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(component.port));
      }
      return uriTokens.length ? uriTokens.join("") : void 0;
    }
    module.exports = {
      nonSimpleDomain,
      recomposeAuthority,
      reescapeHostDelimiters,
      normalizePercentEncoding,
      normalizePathEncoding,
      escapePreservingEscapes,
      removeDotSegments,
      isIPv4,
      isUUID,
      normalizeIPv6,
      stringArrayToHexStripped
    };
  }
});

// node_modules/fast-uri/lib/schemes.js
var require_schemes = __commonJS({
  "node_modules/fast-uri/lib/schemes.js"(exports, module) {
    "use strict";
    var {
      isUUID
    } = require_utils();
    var URN_REG = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
    var supportedSchemeNames = (
      /** @type {const} */
      ["http", "https", "ws", "wss", "urn", "urn:uuid"]
    );
    function isValidSchemeName(name) {
      return supportedSchemeNames.indexOf(
        /** @type {*} */
        name
      ) !== -1;
    }
    function wsIsSecure(wsComponent) {
      if (wsComponent.secure === true) {
        return true;
      } else if (wsComponent.secure === false) {
        return false;
      } else if (wsComponent.scheme) {
        return wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === "w" || wsComponent.scheme[0] === "W") && (wsComponent.scheme[1] === "s" || wsComponent.scheme[1] === "S") && (wsComponent.scheme[2] === "s" || wsComponent.scheme[2] === "S");
      } else {
        return false;
      }
    }
    function httpParse(component) {
      if (!component.host) {
        component.error = component.error || "HTTP URIs must have a host.";
      }
      return component;
    }
    function httpSerialize(component) {
      const secure = String(component.scheme).toLowerCase() === "https";
      if (component.port === (secure ? 443 : 80) || component.port === "") {
        component.port = void 0;
      }
      if (!component.path) {
        component.path = "/";
      }
      return component;
    }
    function wsParse(wsComponent) {
      wsComponent.secure = wsIsSecure(wsComponent);
      wsComponent.resourceName = (wsComponent.path || "/") + (wsComponent.query ? "?" + wsComponent.query : "");
      wsComponent.path = void 0;
      wsComponent.query = void 0;
      return wsComponent;
    }
    function wsSerialize(wsComponent) {
      if (wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === "") {
        wsComponent.port = void 0;
      }
      if (typeof wsComponent.secure === "boolean") {
        wsComponent.scheme = wsComponent.secure ? "wss" : "ws";
        wsComponent.secure = void 0;
      }
      if (wsComponent.resourceName) {
        const [path, query] = wsComponent.resourceName.split("?");
        wsComponent.path = path && path !== "/" ? path : void 0;
        wsComponent.query = query;
        wsComponent.resourceName = void 0;
      }
      wsComponent.fragment = void 0;
      return wsComponent;
    }
    function urnParse(urnComponent, options) {
      if (!urnComponent.path) {
        urnComponent.error = "URN can not be parsed";
        return urnComponent;
      }
      const matches = urnComponent.path.match(URN_REG);
      if (matches) {
        const scheme = options.scheme || urnComponent.scheme || "urn";
        urnComponent.nid = matches[1].toLowerCase();
        urnComponent.nss = matches[2];
        const urnScheme = `${scheme}:${options.nid || urnComponent.nid}`;
        const schemeHandler = getSchemeHandler(urnScheme);
        urnComponent.path = void 0;
        if (schemeHandler) {
          urnComponent = schemeHandler.parse(urnComponent, options);
        }
      } else {
        urnComponent.error = urnComponent.error || "URN can not be parsed.";
      }
      return urnComponent;
    }
    function urnSerialize(urnComponent, options) {
      if (urnComponent.nid === void 0) {
        throw new Error("URN without nid cannot be serialized");
      }
      const scheme = options.scheme || urnComponent.scheme || "urn";
      const nid = urnComponent.nid.toLowerCase();
      const urnScheme = `${scheme}:${options.nid || nid}`;
      const schemeHandler = getSchemeHandler(urnScheme);
      if (schemeHandler) {
        urnComponent = schemeHandler.serialize(urnComponent, options);
      }
      const uriComponent = urnComponent;
      const nss = urnComponent.nss;
      uriComponent.path = `${nid || options.nid}:${nss}`;
      options.skipEscape = true;
      return uriComponent;
    }
    function urnuuidParse(urnComponent, options) {
      const uuidComponent = urnComponent;
      uuidComponent.uuid = uuidComponent.nss;
      uuidComponent.nss = void 0;
      if (!options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid))) {
        uuidComponent.error = uuidComponent.error || "UUID is not valid.";
      }
      return uuidComponent;
    }
    function urnuuidSerialize(uuidComponent) {
      const urnComponent = uuidComponent;
      urnComponent.nss = (uuidComponent.uuid || "").toLowerCase();
      return urnComponent;
    }
    var http = (
      /** @type {SchemeHandler} */
      {
        scheme: "http",
        domainHost: true,
        parse: httpParse,
        serialize: httpSerialize
      }
    );
    var https = (
      /** @type {SchemeHandler} */
      {
        scheme: "https",
        domainHost: http.domainHost,
        parse: httpParse,
        serialize: httpSerialize
      }
    );
    var ws = (
      /** @type {SchemeHandler} */
      {
        scheme: "ws",
        domainHost: true,
        parse: wsParse,
        serialize: wsSerialize
      }
    );
    var wss = (
      /** @type {SchemeHandler} */
      {
        scheme: "wss",
        domainHost: ws.domainHost,
        parse: ws.parse,
        serialize: ws.serialize
      }
    );
    var urn = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn",
        parse: urnParse,
        serialize: urnSerialize,
        skipNormalize: true
      }
    );
    var urnuuid = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn:uuid",
        parse: urnuuidParse,
        serialize: urnuuidSerialize,
        skipNormalize: true
      }
    );
    var SCHEMES = (
      /** @type {Record<SchemeName, SchemeHandler>} */
      {
        http,
        https,
        ws,
        wss,
        urn,
        "urn:uuid": urnuuid
      }
    );
    Object.setPrototypeOf(SCHEMES, null);
    function getSchemeHandler(scheme) {
      return scheme && (SCHEMES[
        /** @type {SchemeName} */
        scheme
      ] || SCHEMES[
        /** @type {SchemeName} */
        scheme.toLowerCase()
      ]) || void 0;
    }
    module.exports = {
      wsIsSecure,
      SCHEMES,
      isValidSchemeName,
      getSchemeHandler
    };
  }
});

// node_modules/fast-uri/index.js
var require_fast_uri = __commonJS({
  "node_modules/fast-uri/index.js"(exports, module) {
    "use strict";
    var {
      normalizeIPv6,
      removeDotSegments,
      recomposeAuthority,
      normalizePercentEncoding,
      normalizePathEncoding,
      escapePreservingEscapes,
      reescapeHostDelimiters,
      isIPv4,
      nonSimpleDomain
    } = require_utils();
    var {
      SCHEMES,
      getSchemeHandler
    } = require_schemes();
    function normalize(uri, options) {
      if (typeof uri === "string") {
        uri = /** @type {T} */
        normalizeString(uri, options);
      } else if (typeof uri === "object") {
        uri = /** @type {T} */
        parse(serialize(uri, options), options);
      }
      return uri;
    }
    function resolve(baseURI, relativeURI, options) {
      const schemelessOptions = options ? Object.assign({
        scheme: "null"
      }, options) : {
        scheme: "null"
      };
      const resolved = resolveComponent(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true);
      schemelessOptions.skipEscape = true;
      return serialize(resolved, schemelessOptions);
    }
    function resolveComponent(base, relative, options, skipNormalization) {
      const target = {};
      if (!skipNormalization) {
        base = parse(serialize(base, options), options);
        relative = parse(serialize(relative, options), options);
      }
      options = options || {};
      if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
      } else {
        if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (!relative.path) {
            target.path = base.path;
            if (relative.query !== void 0) {
              target.query = relative.query;
            } else {
              target.query = base.query;
            }
          } else {
            if (relative.path[0] === "/") {
              target.path = removeDotSegments(relative.path);
            } else {
              if ((base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0) && !base.path) {
                target.path = "/" + relative.path;
              } else if (!base.path) {
                target.path = relative.path;
              } else {
                target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
              }
              target.path = removeDotSegments(target.path);
            }
            target.query = relative.query;
          }
          target.userinfo = base.userinfo;
          target.host = base.host;
          target.port = base.port;
        }
        target.scheme = base.scheme;
      }
      target.fragment = relative.fragment;
      return target;
    }
    function equal(uriA, uriB, options) {
      const normalizedA = normalizeComparableURI(uriA, options);
      const normalizedB = normalizeComparableURI(uriB, options);
      return normalizedA !== void 0 && normalizedB !== void 0 && normalizedA.toLowerCase() === normalizedB.toLowerCase();
    }
    function serialize(cmpts, opts) {
      const component = {
        host: cmpts.host,
        scheme: cmpts.scheme,
        userinfo: cmpts.userinfo,
        port: cmpts.port,
        path: cmpts.path,
        query: cmpts.query,
        nid: cmpts.nid,
        nss: cmpts.nss,
        uuid: cmpts.uuid,
        fragment: cmpts.fragment,
        reference: cmpts.reference,
        resourceName: cmpts.resourceName,
        secure: cmpts.secure,
        error: ""
      };
      const options = Object.assign({}, opts);
      const uriTokens = [];
      const schemeHandler = getSchemeHandler(options.scheme || component.scheme);
      if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(component, options);
      if (component.path !== void 0) {
        if (!options.skipEscape) {
          component.path = escapePreservingEscapes(component.path);
          if (component.scheme !== void 0) {
            component.path = component.path.split("%3A").join(":");
          }
        } else {
          component.path = normalizePercentEncoding(component.path);
        }
      }
      if (options.reference !== "suffix" && component.scheme) {
        uriTokens.push(component.scheme, ":");
      }
      const authority = recomposeAuthority(component);
      if (authority !== void 0) {
        if (options.reference !== "suffix") {
          uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (component.path && component.path[0] !== "/") {
          uriTokens.push("/");
        }
      }
      if (component.path !== void 0) {
        let s = component.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
          s = removeDotSegments(s);
        }
        if (authority === void 0 && s[0] === "/" && s[1] === "/") {
          s = "/%2F" + s.slice(2);
        }
        uriTokens.push(s);
      }
      if (component.query !== void 0) {
        uriTokens.push("?", component.query);
      }
      if (component.fragment !== void 0) {
        uriTokens.push("#", component.fragment);
      }
      return uriTokens.join("");
    }
    var URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
    function getParseError(parsed, matches) {
      if (matches[2] !== void 0 && parsed.path && parsed.path[0] !== "/") {
        return 'URI path must start with "/" when authority is present.';
      }
      if (typeof parsed.port === "number" && (parsed.port < 0 || parsed.port > 65535)) {
        return "URI port is malformed.";
      }
      return void 0;
    }
    function parseWithStatus(uri, opts) {
      const options = Object.assign({}, opts);
      const parsed = {
        scheme: void 0,
        userinfo: void 0,
        host: "",
        port: void 0,
        path: "",
        query: void 0,
        fragment: void 0
      };
      let malformedAuthorityOrPort = false;
      let isIP = false;
      if (options.reference === "suffix") {
        if (options.scheme) {
          uri = options.scheme + ":" + uri;
        } else {
          uri = "//" + uri;
        }
      }
      const matches = uri.match(URI_PARSE);
      if (matches) {
        parsed.scheme = matches[1];
        parsed.userinfo = matches[3];
        parsed.host = matches[4];
        parsed.port = parseInt(matches[5], 10);
        parsed.path = matches[6] || "";
        parsed.query = matches[7];
        parsed.fragment = matches[8];
        if (isNaN(parsed.port)) {
          parsed.port = matches[5];
        }
        const parseError = getParseError(parsed, matches);
        if (parseError !== void 0) {
          parsed.error = parsed.error || parseError;
          malformedAuthorityOrPort = true;
        }
        if (parsed.host) {
          const ipv4result = isIPv4(parsed.host);
          if (ipv4result === false) {
            const ipv6result = normalizeIPv6(parsed.host);
            parsed.host = ipv6result.host.toLowerCase();
            isIP = ipv6result.isIPV6;
          } else {
            isIP = true;
          }
        }
        if (parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && parsed.query === void 0 && !parsed.path) {
          parsed.reference = "same-document";
        } else if (parsed.scheme === void 0) {
          parsed.reference = "relative";
        } else if (parsed.fragment === void 0) {
          parsed.reference = "absolute";
        } else {
          parsed.reference = "uri";
        }
        if (options.reference && options.reference !== "suffix" && options.reference !== parsed.reference) {
          parsed.error = parsed.error || "URI is not a " + options.reference + " reference.";
        }
        const schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
          if (parsed.host && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === false && nonSimpleDomain(parsed.host)) {
            try {
              parsed.host = URL.domainToASCII(parsed.host.toLowerCase());
            } catch (e) {
              parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
            }
          }
        }
        if (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) {
          if (uri.indexOf("%") !== -1) {
            if (parsed.scheme !== void 0) {
              parsed.scheme = unescape(parsed.scheme);
            }
            if (parsed.host !== void 0) {
              parsed.host = reescapeHostDelimiters(unescape(parsed.host), isIP);
            }
          }
          if (parsed.path) {
            parsed.path = normalizePathEncoding(parsed.path);
          }
          if (parsed.fragment) {
            try {
              parsed.fragment = encodeURI(decodeURIComponent(parsed.fragment));
            } catch {
              parsed.error = parsed.error || "URI malformed";
            }
          }
        }
        if (schemeHandler && schemeHandler.parse) {
          schemeHandler.parse(parsed, options);
        }
      } else {
        parsed.error = parsed.error || "URI can not be parsed.";
      }
      return {
        parsed,
        malformedAuthorityOrPort
      };
    }
    function parse(uri, opts) {
      return parseWithStatus(uri, opts).parsed;
    }
    function normalizeString(uri, opts) {
      return normalizeStringWithStatus(uri, opts).normalized;
    }
    function normalizeStringWithStatus(uri, opts) {
      const {
        parsed,
        malformedAuthorityOrPort
      } = parseWithStatus(uri, opts);
      return {
        normalized: malformedAuthorityOrPort ? uri : serialize(parsed, opts),
        malformedAuthorityOrPort
      };
    }
    function normalizeComparableURI(uri, opts) {
      if (typeof uri === "string") {
        const {
          normalized,
          malformedAuthorityOrPort
        } = normalizeStringWithStatus(uri, opts);
        return malformedAuthorityOrPort ? void 0 : normalized;
      }
      if (typeof uri === "object") {
        return serialize(uri, opts);
      }
    }
    var fastUri = {
      SCHEMES,
      normalize,
      resolve,
      resolveComponent,
      equal,
      serialize,
      parse
    };
    module.exports = fastUri;
    module.exports.default = fastUri;
    module.exports.fastUri = fastUri;
  }
});

// node_modules/ajv/dist/runtime/uri.js
var require_uri = __commonJS({
  "node_modules/ajv/dist/runtime/uri.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var uri = require_fast_uri();
    uri.code = 'require("ajv/dist/runtime/uri").default';
    exports.default = uri;
  }
});

// node_modules/ajv/dist/core.js
var require_core = __commonJS({
  "node_modules/ajv/dist/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_1 = require_validate2();
    Object.defineProperty(exports, "KeywordCxt", {
      enumerable: true,
      get: function() {
        return validate_1.KeywordCxt;
      }
    });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", {
      enumerable: true,
      get: function() {
        return codegen_1._;
      }
    });
    Object.defineProperty(exports, "str", {
      enumerable: true,
      get: function() {
        return codegen_1.str;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return codegen_1.stringify;
      }
    });
    Object.defineProperty(exports, "nil", {
      enumerable: true,
      get: function() {
        return codegen_1.nil;
      }
    });
    Object.defineProperty(exports, "Name", {
      enumerable: true,
      get: function() {
        return codegen_1.Name;
      }
    });
    Object.defineProperty(exports, "CodeGen", {
      enumerable: true,
      get: function() {
        return codegen_1.CodeGen;
      }
    });
    var validation_error_1 = require_validation_error();
    var ref_error_1 = require_ref_error();
    var rules_1 = require_rules();
    var compile_1 = require_compile();
    var codegen_2 = require_codegen();
    var resolve_1 = require_resolve();
    var dataType_1 = require_dataType();
    var util_1 = require_util();
    var $dataRefSchema = require_data();
    var uri_1 = require_uri();
    var defaultRegExp = (str, flags) => new RegExp(str, flags);
    defaultRegExp.code = "new RegExp";
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set(["validate", "serialize", "parse", "wrapper", "root", "schema", "keyword", "pattern", "formats", "validate$data", "func", "obj", "Error"]);
    var removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    var deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    var MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a2 = o.code) === null || _a2 === void 0 ? void 0 : _a2.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? __spreadProps(__spreadValues({}, o.code), {
          optimize,
          regExp
        }) : {
          optimize,
          regExp
        },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    var Ajv = class {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = __spreadValues(__spreadValues({}, opts), requiredOptions(opts));
        const {
          es5,
          lines
        } = this.opts.code;
        this.scope = new codegen_2.ValueScope({
          scope: {},
          prefixes: EXT_SCOPE_NAMES,
          es5,
          lines
        });
        this.logger = getLogger2(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats) addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords) addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object") this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const {
          $data,
          meta,
          schemaId
        } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = __spreadValues({}, $dataRefSchema);
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data) this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const {
          meta,
          schemaId
        } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v) throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v)) this.errors = v.errors;
        return valid;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const {
          loadSchema
        } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        function runCompileAsync(_schema, _meta) {
          return __async(this, null, function* () {
            yield loadMetaSchema.call(this, _schema.$schema);
            const sch = this._addSchema(_schema, _meta);
            return sch.validate || _compileAsync.call(this, sch);
          });
        }
        function loadMetaSchema($ref) {
          return __async(this, null, function* () {
            if ($ref && !this.getSchema($ref)) {
              yield runCompileAsync.call(this, {
                $ref
              }, true);
            }
          });
        }
        function _compileAsync(sch) {
          return __async(this, null, function* () {
            try {
              return this._compileSchemaEnv(sch);
            } catch (e) {
              if (!(e instanceof ref_error_1.default)) throw e;
              checkLoaded.call(this, e);
              yield loadMissingSchema.call(this, e.missingSchema);
              return _compileAsync.call(this, sch);
            }
          });
        }
        function checkLoaded({
          missingSchema: ref,
          missingRef
        }) {
          if (this.refs[ref]) {
            throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        function loadMissingSchema(ref) {
          return __async(this, null, function* () {
            const _schema = yield _loadSchema.call(this, ref);
            if (!this.refs[ref]) yield loadMetaSchema.call(this, _schema.$schema);
            if (!this.refs[ref]) this.addSchema(_schema, ref, meta);
          });
        }
        function _loadSchema(ref) {
          return __async(this, null, function* () {
            const p = this._loading[ref];
            if (p) return p;
            try {
              return yield this._loading[ref] = loadSchema(ref);
            } finally {
              delete this._loading[ref];
            }
          });
        }
      }
      // Adds schema to the instance
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema) this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id;
        if (typeof schema === "object") {
          const {
            schemaId
          } = this.opts;
          id = schema[schemaId];
          if (id !== void 0 && typeof id != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean") return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== void 0 && typeof $schema != "string") {
          throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log") this.logger.error(message);
          else throw new Error(message);
        }
        return valid;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string") keyRef = sch;
        if (sch === void 0) {
          const {
            schemaId
          } = this.opts;
          const root = new compile_1.SchemaEnv({
            schema: {},
            schemaId
          });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch) return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object") this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id = schemaKeyRef[this.opts.schemaId];
            if (id) {
              id = (0, resolve_1.normalizeId)(id);
              delete this.schemas[id];
              delete this.refs[id];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions) {
        for (const def of definitions) this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword;
        if (typeof kwdOrDef == "string") {
          keyword = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword = def.keyword;
          if (Array.isArray(keyword) && !keyword.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
          (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = __spreadProps(__spreadValues({}, def), {
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        });
        (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword) {
        const {
          RULES
        } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword);
          if (i >= 0) group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format) {
        if (typeof format == "string") format = new RegExp(format);
        this.formats[name] = format;
        return this;
      }
      errorsText(errors = this.errors, {
        separator = ", ",
        dataVar = "data"
      } = {}) {
        if (!errors || errors.length === 0) return "No errors";
        return errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments) keywords = keywords[seg];
          for (const key in rules) {
            const rule = rules[key];
            if (typeof rule != "object") continue;
            const {
              $data
            } = rule.definition;
            const schema = keywords[key];
            if ($data && schema) keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const {
          schemaId
        } = this.opts;
        if (typeof schema == "object") {
          id = schema[schemaId];
        } else {
          if (this.opts.jtd) throw new Error("schema must be object");
          else if (typeof schema != "boolean") throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0) return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({
          schema,
          schemaId,
          meta,
          baseId,
          localRefs
        });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId) this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema) this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
          throw new Error(`schema with key or id "${id}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta) this._compileMetaSchema(sch);
        else compile_1.compileSchema.call(this, sch);
        if (!sch.validate) throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    };
    Ajv.ValidationError = validation_error_1.default;
    Ajv.MissingRefError = ref_error_1.default;
    exports.default = Ajv;
    function checkOptions(checkOpts, options, msg, log = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options) this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_1.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas) return;
      if (Array.isArray(optsSchemas)) this.addSchema(optsSchemas);
      else for (const key in optsSchemas) this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format) this.addFormat(name, format);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword) def.keyword = keyword;
        this.addKeyword(def);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = __spreadValues({}, this.opts);
      for (const opt of META_IGNORE_OPTIONS) delete metaOpts[opt];
      return metaOpts;
    }
    var noLogs = {
      log() {
      },
      warn() {
      },
      error() {
      }
    };
    function getLogger2(logger2) {
      if (logger2 === false) return noLogs;
      if (logger2 === void 0) return console;
      if (logger2.log && logger2.warn && logger2.error) return logger2;
      throw new Error("logger must implement log, warn and error methods");
    }
    var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def) {
      const {
        RULES
      } = this;
      (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd]) throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd)) throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def) return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword, definition, dataType) {
      var _a2;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType && post) throw new Error('keyword with "post" flag cannot have "type"');
      const {
        RULES
      } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({
        type: t
      }) => t === dataType);
      if (!ruleGroup) {
        ruleGroup = {
          type: dataType,
          rules: []
        };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword] = true;
      if (!definition) return;
      const rule = {
        keyword,
        definition: __spreadProps(__spreadValues({}, definition), {
          type: (0, dataType_1.getJSONTypes)(definition.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        })
      };
      if (definition.before) addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else ruleGroup.rules.push(rule);
      RULES.all[keyword] = rule;
      (_a2 = definition.implements) === null || _a2 === void 0 ? void 0 : _a2.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def) {
      let {
        metaSchema
      } = def;
      if (metaSchema === void 0) return;
      if (def.$data && this.opts.$data) metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    var $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return {
        anyOf: [schema, $dataRef]
      };
    }
  }
});

// node_modules/ajv/dist/vocabularies/core/id.js
var require_id = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/id.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var def = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/core/ref.js
var require_ref = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/ref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.callRef = exports.getValidate = void 0;
    var ref_error_1 = require_ref_error();
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var def = {
      keyword: "$ref",
      schemaType: "string",
      code(cxt) {
        const {
          gen,
          schema: $ref,
          it
        } = cxt;
        const {
          baseId,
          schemaEnv: env,
          validateName,
          opts,
          self: self2
        } = it;
        const {
          root
        } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId) return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self2, root, baseId, $ref);
        if (schOrEnv === void 0) throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv) return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
          if (env === root) return callRef(cxt, validateName, env, env.$async);
          const rootName = gen.scopeValue("root", {
            ref: root
          });
          return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
          const v = getValidate(cxt, sch);
          callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
          const schName = gen.scopeValue("schema", opts.code.source === true ? {
            ref: sch,
            code: (0, codegen_1.stringify)(sch)
          } : {
            ref: sch
          });
          const valid = gen.name("valid");
          const schCxt = cxt.subschema({
            schema: sch,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: $ref
          }, valid);
          cxt.mergeEvaluated(schCxt);
          cxt.ok(valid);
        }
      }
    };
    function getValidate(cxt, sch) {
      const {
        gen
      } = cxt;
      return sch.validate ? gen.scopeValue("validate", {
        ref: sch.validate
      }) : (0, codegen_1._)`${gen.scopeValue("wrapper", {
        ref: sch
      })}.validate`;
    }
    exports.getValidate = getValidate;
    function callRef(cxt, v, sch, $async) {
      const {
        gen,
        it
      } = cxt;
      const {
        allErrors,
        schemaEnv: env,
        opts
      } = it;
      const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
      if ($async) callAsyncRef();
      else callSyncRef();
      function callAsyncRef() {
        if (!env.$async) throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
          gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
          addEvaluatedFrom(v);
          if (!allErrors) gen.assign(valid, true);
        }, (e) => {
          gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
          addErrorsFrom(e);
          if (!allErrors) gen.assign(valid, false);
        });
        cxt.ok(valid);
      }
      function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
      }
      function addErrorsFrom(source) {
        const errs = (0, codegen_1._)`${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
        gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      }
      function addEvaluatedFrom(source) {
        var _a2;
        if (!it.opts.unevaluated) return;
        const schEvaluated = (_a2 = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a2 === void 0 ? void 0 : _a2.evaluated;
        if (it.props !== true) {
          if (schEvaluated && !schEvaluated.dynamicProps) {
            if (schEvaluated.props !== void 0) {
              it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
            }
          } else {
            const props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
          }
        }
        if (it.items !== true) {
          if (schEvaluated && !schEvaluated.dynamicItems) {
            if (schEvaluated.items !== void 0) {
              it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
            }
          } else {
            const items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
          }
        }
      }
    }
    exports.callRef = callRef;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/core/index.js
var require_core2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var id_1 = require_id();
    var ref_1 = require_ref();
    var core = ["$schema", "$id", "$defs", "$vocabulary", {
      keyword: "$comment"
    }, "definitions", id_1.default, ref_1.default];
    exports.default = core;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitNumber.js
var require_limitNumber = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var ops = codegen_1.operators;
    var KWDs = {
      maximum: {
        okStr: "<=",
        ok: ops.LTE,
        fail: ops.GT
      },
      minimum: {
        okStr: ">=",
        ok: ops.GTE,
        fail: ops.LT
      },
      exclusiveMaximum: {
        okStr: "<",
        ok: ops.LT,
        fail: ops.GTE
      },
      exclusiveMinimum: {
        okStr: ">",
        ok: ops.GT,
        fail: ops.LTE
      }
    };
    var error = {
      message: ({
        keyword,
        schemaCode
      }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({
        keyword,
        schemaCode
      }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    var def = {
      keyword: Object.keys(KWDs),
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const {
          keyword,
          data,
          schemaCode
        } = cxt;
        cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/multipleOf.js
var require_multipleOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var error = {
      message: ({
        schemaCode
      }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
      params: ({
        schemaCode
      }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
    };
    var def = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const {
          gen,
          data,
          schemaCode,
          it
        } = cxt;
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320) pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitLength.js
var require_limitLength = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var ucs2length_1 = require_ucs2length();
    var error = {
      message({
        keyword,
        schemaCode
      }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
      },
      params: ({
        schemaCode
      }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const {
          keyword,
          data,
          schemaCode,
          it
        } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/pattern.js
var require_pattern = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var code_1 = require_code2();
    var util_1 = require_util();
    var codegen_1 = require_codegen();
    var error = {
      message: ({
        schemaCode
      }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
      params: ({
        schemaCode
      }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
    };
    var def = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const {
          gen,
          data,
          $data,
          schema,
          schemaCode,
          it
        } = cxt;
        const u = it.opts.unicodeRegExp ? "u" : "";
        if ($data) {
          const {
            regExp
          } = it.opts.code;
          const regExpCode = regExp.code === "new RegExp" ? (0, codegen_1._)`new RegExp` : (0, util_1.useFunc)(gen, regExp);
          const valid = gen.let("valid");
          gen.try(() => gen.assign(valid, (0, codegen_1._)`${regExpCode}(${schemaCode}, ${u}).test(${data})`), () => gen.assign(valid, false));
          cxt.fail$data((0, codegen_1._)`!${valid}`);
        } else {
          const regExp = (0, code_1.usePattern)(cxt, schema);
          cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitProperties.js
var require_limitProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var error = {
      message({
        keyword,
        schemaCode
      }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
      },
      params: ({
        schemaCode
      }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const {
          keyword,
          data,
          schemaCode
        } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/required.js
var require_required = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/required.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({
        params: {
          missingProperty
        }
      }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
      params: ({
        params: {
          missingProperty
        }
      }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
    };
    var def = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const {
          gen,
          schema,
          schemaCode,
          data,
          $data,
          it
        } = cxt;
        const {
          opts
        } = it;
        if (!$data && schema.length === 0) return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors) allErrorsMode();
        else exitOnErrorMode();
        if (opts.strictRequired) {
          const props = cxt.parentSchema.properties;
          const {
            definedProperties
          } = cxt.it;
          for (const requiredKey of schema) {
            if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
              const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
              const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
              (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
            }
          }
        }
        function allErrorsMode() {
          if (useLoop || $data) {
            cxt.block$data(codegen_1.nil, loopAllRequired);
          } else {
            for (const prop of schema) {
              (0, code_1.checkReportMissingProp)(cxt, prop);
            }
          }
        }
        function exitOnErrorMode() {
          const missing = gen.let("missing");
          if (useLoop || $data) {
            const valid = gen.let("valid", true);
            cxt.block$data(valid, () => loopUntilMissing(missing, valid));
            cxt.ok(valid);
          } else {
            gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
          }
        }
        function loopAllRequired() {
          gen.forOf("prop", schemaCode, (prop) => {
            cxt.setParams({
              missingProperty: prop
            });
            gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
          });
        }
        function loopUntilMissing(missing, valid) {
          cxt.setParams({
            missingProperty: missing
          });
          gen.forOf(missing, schemaCode, () => {
            gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
            gen.if((0, codegen_1.not)(valid), () => {
              cxt.error();
              gen.break();
            });
          }, codegen_1.nil);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitItems.js
var require_limitItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var error = {
      message({
        keyword,
        schemaCode
      }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({
        schemaCode
      }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const {
          keyword,
          data,
          schemaCode
        } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal;
  }
});

// node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
var require_uniqueItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var dataType_1 = require_dataType();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: ({
        params: {
          i,
          j
        }
      }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
      params: ({
        params: {
          i,
          j
        }
      }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
    };
    var def = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: true,
      error,
      code(cxt) {
        const {
          gen,
          data,
          $data,
          schema,
          parentSchema,
          schemaCode,
          it
        } = cxt;
        if (!$data && !schema) return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
          const i = gen.let("i", (0, codegen_1._)`${data}.length`);
          const j = gen.let("j");
          cxt.setParams({
            i,
            j
          });
          gen.assign(valid, true);
          gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
          return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
          const item = gen.name("item");
          const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
          const indices = gen.const("indices", (0, codegen_1._)`{}`);
          gen.for((0, codegen_1._)`;${i}--;`, () => {
            gen.let(item, (0, codegen_1._)`${data}[${i}]`);
            gen.if(wrongType, (0, codegen_1._)`continue`);
            if (itemTypes.length > 1) gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
            gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
              gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
              cxt.error();
              gen.assign(valid, false).break();
            }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
          });
        }
        function loopN2(i, j) {
          const eql = (0, util_1.useFunc)(gen, equal_1.default);
          const outer = gen.name("outer");
          gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
            cxt.error();
            gen.assign(valid, false).break(outer);
          })));
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/const.js
var require_const = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/const.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to constant",
      params: ({
        schemaCode
      }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
    };
    var def = {
      keyword: "const",
      $data: true,
      error,
      code(cxt) {
        const {
          gen,
          data,
          $data,
          schemaCode,
          schema
        } = cxt;
        if ($data || schema && typeof schema == "object") {
          cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        } else {
          cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/enum.js
var require_enum = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to one of the allowed values",
      params: ({
        schemaCode
      }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
    };
    var def = {
      keyword: "enum",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const {
          gen,
          data,
          $data,
          schema,
          schemaCode,
          it
        } = cxt;
        if (!$data && schema.length === 0) throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
          valid = gen.let("valid");
          cxt.block$data(valid, loopEnum);
        } else {
          if (!Array.isArray(schema)) throw new Error("ajv implementation error");
          const vSchema = gen.const("vSchema", schemaCode);
          valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.assign(valid, false);
          gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
          const sch = schema[i];
          return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/index.js
var require_validation = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var limitNumber_1 = require_limitNumber();
    var multipleOf_1 = require_multipleOf();
    var limitLength_1 = require_limitLength();
    var pattern_1 = require_pattern();
    var limitProperties_1 = require_limitProperties();
    var required_1 = require_required();
    var limitItems_1 = require_limitItems();
    var uniqueItems_1 = require_uniqueItems();
    var const_1 = require_const();
    var enum_1 = require_enum();
    var validation = [
      // number
      limitNumber_1.default,
      multipleOf_1.default,
      // string
      limitLength_1.default,
      pattern_1.default,
      // object
      limitProperties_1.default,
      required_1.default,
      // array
      limitItems_1.default,
      uniqueItems_1.default,
      // any
      {
        keyword: "type",
        schemaType: ["string", "array"]
      },
      {
        keyword: "nullable",
        schemaType: "boolean"
      },
      const_1.default,
      enum_1.default
    ];
    exports.default = validation;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
var require_additionalItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.validateAdditionalItems = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({
        params: {
          len
        }
      }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({
        params: {
          len
        }
      }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const {
          parentSchema,
          it
        } = cxt;
        const {
          items
        } = parentSchema;
        if (!Array.isArray(items)) {
          (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        validateAdditionalItems(cxt, items);
      }
    };
    function validateAdditionalItems(cxt, items) {
      const {
        gen,
        schema,
        data,
        keyword,
        it
      } = cxt;
      it.items = true;
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      if (schema === false) {
        cxt.setParams({
          len: items.length
        });
        cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
      } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
      }
      function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: util_1.Type.Num
          }, valid);
          if (!it.allErrors) gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
      }
    }
    exports.validateAdditionalItems = validateAdditionalItems;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/items.js
var require_items = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/items.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.validateTuple = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(cxt) {
        const {
          schema,
          it
        } = cxt;
        if (Array.isArray(schema)) return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema)) return;
        cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    function validateTuple(cxt, extraItems, schArr = cxt.schema) {
      const {
        gen,
        parentSchema,
        data,
        keyword,
        it
      } = cxt;
      checkStrictTuple(parentSchema);
      if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
      }
      const valid = gen.name("valid");
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch)) return;
        gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
          keyword,
          schemaProp: i,
          dataProp: i
        }, valid));
        cxt.ok(valid);
      });
      function checkStrictTuple(sch) {
        const {
          opts,
          errSchemaPath
        } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
          const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
          (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
      }
    }
    exports.validateTuple = validateTuple;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/prefixItems.js
var require_prefixItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var items_1 = require_items();
    var def = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/items2020.js
var require_items2020 = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var additionalItems_1 = require_additionalItems();
    var error = {
      message: ({
        params: {
          len
        }
      }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({
        params: {
          len
        }
      }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const {
          schema,
          parentSchema,
          it
        } = cxt;
        const {
          prefixItems
        } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema)) return;
        if (prefixItems) (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/contains.js
var require_contains = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({
        params: {
          min,
          max
        }
      }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
      params: ({
        params: {
          min,
          max
        }
      }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
    };
    var def = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: true,
      error,
      code(cxt) {
        const {
          gen,
          schema,
          parentSchema,
          data,
          it
        } = cxt;
        let min;
        let max;
        const {
          minContains,
          maxContains
        } = parentSchema;
        if (it.opts.next) {
          min = minContains === void 0 ? 1 : minContains;
          max = maxContains;
        } else {
          min = 1;
        }
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        cxt.setParams({
          min,
          max
        });
        if (max === void 0 && min === 0) {
          (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
          return;
        }
        if (max !== void 0 && min > max) {
          (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
          cxt.fail();
          return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          let cond = (0, codegen_1._)`${len} >= ${min}`;
          if (max !== void 0) cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
          cxt.pass(cond);
          return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === void 0 && min === 1) {
          validateItems(valid, () => gen.if(valid, () => gen.break()));
        } else if (min === 0) {
          gen.let(valid, true);
          if (max !== void 0) gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
        } else {
          gen.let(valid, false);
          validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
          const schValid = gen.name("_valid");
          const count = gen.let("count", 0);
          validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword: "contains",
              dataProp: i,
              dataPropType: util_1.Type.Num,
              compositeRule: true
            }, _valid);
            block();
          });
        }
        function checkLimits(count) {
          gen.code((0, codegen_1._)`${count}++`);
          if (max === void 0) {
            gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
          } else {
            gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, false).break());
            if (min === 1) gen.assign(valid, true);
            else gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true));
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/dependencies.js
var require_dependencies = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    exports.error = {
      message: ({
        params: {
          property,
          depsCount,
          deps
        }
      }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({
        params: {
          property,
          depsCount,
          deps,
          missingProperty
        }
      }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    var def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({
      schema
    }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__") continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const {
        gen,
        data,
        it
      } = cxt;
      if (Object.keys(propertyDeps).length === 0) return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0) continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_1.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const {
        gen,
        data,
        keyword,
        it
      } = cxt;
      const valid = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop])) continue;
        gen.if(
          (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({
              keyword,
              schemaProp: prop
            }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
          },
          () => gen.var(valid, true)
          // TODO var
        );
        cxt.ok(valid);
      }
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
var require_propertyNames = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "property name must be valid",
      params: ({
        params
      }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
    };
    var def = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error,
      code(cxt) {
        const {
          gen,
          schema,
          data,
          it
        } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
          cxt.setParams({
            propertyName: key
          });
          cxt.subschema({
            keyword: "propertyNames",
            data: key,
            dataTypes: ["string"],
            propertyName: key,
            compositeRule: true
          }, valid);
          gen.if((0, codegen_1.not)(valid), () => {
            cxt.error(true);
            if (!it.allErrors) gen.break();
          });
        });
        cxt.ok(valid);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
var require_additionalProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var util_1 = require_util();
    var error = {
      message: "must NOT have additional properties",
      params: ({
        params
      }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
    };
    var def = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: true,
      trackErrors: true,
      error,
      code(cxt) {
        const {
          gen,
          schema,
          parentSchema,
          data,
          errsCount,
          it
        } = cxt;
        if (!errsCount) throw new Error("ajv implementation error");
        const {
          allErrors,
          opts
        } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema)) return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
          gen.forIn("key", data, (key) => {
            if (!props.length && !patProps.length) additionalPropertyCode(key);
            else gen.if(isAdditional(key), () => additionalPropertyCode(key));
          });
        }
        function isAdditional(key) {
          let definedProp;
          if (props.length > 8) {
            const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
            definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
          } else if (props.length) {
            definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
          } else {
            definedProp = codegen_1.nil;
          }
          if (patProps.length) {
            definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
          }
          return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
          gen.code((0, codegen_1._)`delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
          if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
            deleteAdditional(key);
            return;
          }
          if (schema === false) {
            cxt.setParams({
              additionalProperty: key
            });
            cxt.error();
            if (!allErrors) gen.break();
            return;
          }
          if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            const valid = gen.name("valid");
            if (opts.removeAdditional === "failing") {
              applyAdditionalSchema(key, valid, false);
              gen.if((0, codegen_1.not)(valid), () => {
                cxt.reset();
                deleteAdditional(key);
              });
            } else {
              applyAdditionalSchema(key, valid);
              if (!allErrors) gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
          }
        }
        function applyAdditionalSchema(key, valid, errors) {
          const subschema = {
            keyword: "additionalProperties",
            dataProp: key,
            dataPropType: util_1.Type.Str
          };
          if (errors === false) {
            Object.assign(subschema, {
              compositeRule: true,
              createErrors: false,
              allErrors: false
            });
          }
          cxt.subschema(subschema, valid);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/properties.js
var require_properties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var validate_1 = require_validate2();
    var code_1 = require_code2();
    var util_1 = require_util();
    var additionalProperties_1 = require_additionalProperties();
    var def = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const {
          gen,
          schema,
          parentSchema,
          data,
          it
        } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
          additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
          it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
          it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0) return;
        const valid = gen.name("valid");
        for (const prop of properties) {
          if (hasDefault(prop)) {
            applyPropertySchema(prop);
          } else {
            gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
            applyPropertySchema(prop);
            if (!it.allErrors) gen.else().var(valid, true);
            gen.endIf();
          }
          cxt.it.definedProperties.add(prop);
          cxt.ok(valid);
        }
        function hasDefault(prop) {
          return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
        }
        function applyPropertySchema(prop) {
          cxt.subschema({
            keyword: "properties",
            schemaProp: prop,
            dataProp: prop
          }, valid);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
var require_patternProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var util_2 = require_util();
    var def = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const {
          gen,
          schema,
          data,
          parentSchema,
          it
        } = cxt;
        const {
          opts
        } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
          return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
          it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const {
          props
        } = it;
        validatePatternProperties();
        function validatePatternProperties() {
          for (const pat of patterns) {
            if (checkProperties) checkMatchingProperties(pat);
            if (it.allErrors) {
              validateProperties(pat);
            } else {
              gen.var(valid, true);
              validateProperties(pat);
              gen.if(valid);
            }
          }
        }
        function checkMatchingProperties(pat) {
          for (const prop in checkProperties) {
            if (new RegExp(pat).test(prop)) {
              (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
            }
          }
        }
        function validateProperties(pat) {
          gen.forIn("key", data, (key) => {
            gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
              const alwaysValid = alwaysValidPatterns.includes(pat);
              if (!alwaysValid) {
                cxt.subschema({
                  keyword: "patternProperties",
                  schemaProp: pat,
                  dataProp: key,
                  dataPropType: util_2.Type.Str
                }, valid);
              }
              if (it.opts.unevaluated && props !== true) {
                gen.assign((0, codegen_1._)`${props}[${key}]`, true);
              } else if (!alwaysValid && !it.allErrors) {
                gen.if((0, codegen_1.not)(valid), () => gen.break());
              }
            });
          });
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/not.js
var require_not = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/not.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var util_1 = require_util();
    var def = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      code(cxt) {
        const {
          gen,
          schema,
          it
        } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          cxt.fail();
          return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
          keyword: "not",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
      },
      error: {
        message: "must NOT be valid"
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/anyOf.js
var require_anyOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var code_1 = require_code2();
    var def = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: {
        message: "must match a schema in anyOf"
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/oneOf.js
var require_oneOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "must match exactly one schema in oneOf",
      params: ({
        params
      }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
    };
    var def = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: true,
      error,
      code(cxt) {
        const {
          gen,
          schema,
          parentSchema,
          it
        } = cxt;
        if (!Array.isArray(schema)) throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator) return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({
          passing
        });
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
          schArr.forEach((sch, i) => {
            let schCxt;
            if ((0, util_1.alwaysValidSchema)(it, sch)) {
              gen.var(schValid, true);
            } else {
              schCxt = cxt.subschema({
                keyword: "oneOf",
                schemaProp: i,
                compositeRule: true
              }, schValid);
            }
            if (i > 0) {
              gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
            }
            gen.if(schValid, () => {
              gen.assign(valid, true);
              gen.assign(passing, i);
              if (schCxt) cxt.mergeEvaluated(schCxt, codegen_1.Name);
            });
          });
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/allOf.js
var require_allOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var util_1 = require_util();
    var def = {
      keyword: "allOf",
      schemaType: "array",
      code(cxt) {
        const {
          gen,
          schema,
          it
        } = cxt;
        if (!Array.isArray(schema)) throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch)) return;
          const schCxt = cxt.subschema({
            keyword: "allOf",
            schemaProp: i
          }, valid);
          cxt.ok(valid);
          cxt.mergeEvaluated(schCxt);
        });
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/if.js
var require_if = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/if.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({
        params
      }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
      params: ({
        params
      }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
    };
    var def = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      error,
      code(cxt) {
        const {
          gen,
          parentSchema,
          it
        } = cxt;
        if (parentSchema.then === void 0 && parentSchema.else === void 0) {
          (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse) return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
          const ifClause = gen.let("ifClause");
          cxt.setParams({
            ifClause
          });
          gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else if (hasThen) {
          gen.if(schValid, validateClause("then"));
        } else {
          gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
          const schCxt = cxt.subschema({
            keyword: "if",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, schValid);
          cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
          return () => {
            const schCxt = cxt.subschema({
              keyword
            }, schValid);
            gen.assign(valid, schValid);
            cxt.mergeValidEvaluated(schCxt, valid);
            if (ifClause) gen.assign(ifClause, (0, codegen_1._)`${keyword}`);
            else cxt.setParams({
              ifClause: keyword
            });
          };
        }
      }
    };
    function hasSchema(it, keyword) {
      const schema = it.schema[keyword];
      return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
    }
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/thenElse.js
var require_thenElse = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var util_1 = require_util();
    var def = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({
        keyword,
        parentSchema,
        it
      }) {
        if (parentSchema.if === void 0) (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/index.js
var require_applicator = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var additionalItems_1 = require_additionalItems();
    var prefixItems_1 = require_prefixItems();
    var items_1 = require_items();
    var items2020_1 = require_items2020();
    var contains_1 = require_contains();
    var dependencies_1 = require_dependencies();
    var propertyNames_1 = require_propertyNames();
    var additionalProperties_1 = require_additionalProperties();
    var properties_1 = require_properties();
    var patternProperties_1 = require_patternProperties();
    var not_1 = require_not();
    var anyOf_1 = require_anyOf();
    var oneOf_1 = require_oneOf();
    var allOf_1 = require_allOf();
    var if_1 = require_if();
    var thenElse_1 = require_thenElse();
    function getApplicator(draft2020 = false) {
      const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default
      ];
      if (draft2020) applicator.push(prefixItems_1.default, items2020_1.default);
      else applicator.push(additionalItems_1.default, items_1.default);
      applicator.push(contains_1.default);
      return applicator;
    }
    exports.default = getApplicator;
  }
});

// node_modules/ajv/dist/vocabularies/format/format.js
var require_format2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/format/format.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var error = {
      message: ({
        schemaCode
      }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
      params: ({
        schemaCode
      }) => (0, codegen_1._)`{format: ${schemaCode}}`
    };
    var def = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: true,
      error,
      code(cxt, ruleType) {
        const {
          gen,
          data,
          $data,
          schema,
          schemaCode,
          it
        } = cxt;
        const {
          opts,
          errSchemaPath,
          schemaEnv,
          self: self2
        } = it;
        if (!opts.validateFormats) return;
        if ($data) validate$DataFormat();
        else validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self2.formats,
            code: opts.code.formats
          });
          const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
          const fType = gen.let("fType");
          const format = gen.let("format");
          gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef));
          cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
          function unknownFmt() {
            if (opts.strictSchema === false) return codegen_1.nil;
            return (0, codegen_1._)`${schemaCode} && !${format}`;
          }
          function invalidFmt() {
            const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`;
            const validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
            return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
          }
        }
        function validateFormat() {
          const formatDef = self2.formats[schema];
          if (!formatDef) {
            unknownFormat();
            return;
          }
          if (formatDef === true) return;
          const [fmtType, format, fmtRef] = getFormat(formatDef);
          if (fmtType === ruleType) cxt.pass(validCondition());
          function unknownFormat() {
            if (opts.strictSchema === false) {
              self2.logger.warn(unknownMsg());
              return;
            }
            throw new Error(unknownMsg());
            function unknownMsg() {
              return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
            }
          }
          function getFormat(fmtDef) {
            const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
            const fmt = gen.scopeValue("formats", {
              key: schema,
              ref: fmtDef,
              code
            });
            if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
              return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
            }
            return ["string", fmtDef, fmt];
          }
          function validCondition() {
            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
              if (!schemaEnv.$async) throw new Error("async format in sync schema");
              return (0, codegen_1._)`await ${fmtRef}(${data})`;
            }
            return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/format/index.js
var require_format3 = __commonJS({
  "node_modules/ajv/dist/vocabularies/format/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var format_1 = require_format2();
    var format = [format_1.default];
    exports.default = format;
  }
});

// node_modules/ajv/dist/vocabularies/metadata.js
var require_metadata = __commonJS({
  "node_modules/ajv/dist/vocabularies/metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.contentVocabulary = exports.metadataVocabulary = void 0;
    exports.metadataVocabulary = ["title", "description", "default", "deprecated", "readOnly", "writeOnly", "examples"];
    exports.contentVocabulary = ["contentMediaType", "contentEncoding", "contentSchema"];
  }
});

// node_modules/ajv/dist/vocabularies/draft7.js
var require_draft7 = __commonJS({
  "node_modules/ajv/dist/vocabularies/draft7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var core_1 = require_core2();
    var validation_1 = require_validation();
    var applicator_1 = require_applicator();
    var format_1 = require_format3();
    var metadata_1 = require_metadata();
    var draft7Vocabularies = [core_1.default, validation_1.default, (0, applicator_1.default)(), format_1.default, metadata_1.metadataVocabulary, metadata_1.contentVocabulary];
    exports.default = draft7Vocabularies;
  }
});

// node_modules/ajv/dist/vocabularies/discriminator/types.js
var require_types2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DiscrError = void 0;
    var DiscrError;
    (function(DiscrError2) {
      DiscrError2["Tag"] = "tag";
      DiscrError2["Mapping"] = "mapping";
    })(DiscrError || (exports.DiscrError = DiscrError = {}));
  }
});

// node_modules/ajv/dist/vocabularies/discriminator/index.js
var require_discriminator = __commonJS({
  "node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var codegen_1 = require_codegen();
    var types_1 = require_types2();
    var compile_1 = require_compile();
    var ref_error_1 = require_ref_error();
    var util_1 = require_util();
    var error = {
      message: ({
        params: {
          discrError,
          tagName
        }
      }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
      params: ({
        params: {
          discrError,
          tag,
          tagName
        }
      }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
    };
    var def = {
      keyword: "discriminator",
      type: "object",
      schemaType: "object",
      error,
      code(cxt) {
        const {
          gen,
          data,
          schema,
          parentSchema,
          it
        } = cxt;
        const {
          oneOf
        } = parentSchema;
        if (!it.opts.discriminator) {
          throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string") throw new Error("discriminator: requires propertyName");
        if (schema.mapping) throw new Error("discriminator: mapping is not supported");
        if (!oneOf) throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, {
          discrError: types_1.DiscrError.Tag,
          tag,
          tagName
        }));
        cxt.ok(valid);
        function validateMapping() {
          const mapping = getMapping();
          gen.if(false);
          for (const tagValue in mapping) {
            gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
            gen.assign(valid, applyTagSchema(mapping[tagValue]));
          }
          gen.else();
          cxt.error(false, {
            discrError: types_1.DiscrError.Mapping,
            tag,
            tagName
          });
          gen.endIf();
        }
        function applyTagSchema(schemaProp) {
          const _valid = gen.name("valid");
          const schCxt = cxt.subschema({
            keyword: "oneOf",
            schemaProp
          }, _valid);
          cxt.mergeEvaluated(schCxt, codegen_1.Name);
          return _valid;
        }
        function getMapping() {
          var _a2;
          const oneOfMapping = {};
          const topRequired = hasRequired(parentSchema);
          let tagRequired = true;
          for (let i = 0; i < oneOf.length; i++) {
            let sch = oneOf[i];
            if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
              const ref = sch.$ref;
              sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref);
              if (sch instanceof compile_1.SchemaEnv) sch = sch.schema;
              if (sch === void 0) throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
            }
            const propSch = (_a2 = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a2 === void 0 ? void 0 : _a2[tagName];
            if (typeof propSch != "object") {
              throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
            }
            tagRequired = tagRequired && (topRequired || hasRequired(sch));
            addMappings(propSch, i);
          }
          if (!tagRequired) throw new Error(`discriminator: "${tagName}" must be required`);
          return oneOfMapping;
          function hasRequired({
            required
          }) {
            return Array.isArray(required) && required.includes(tagName);
          }
          function addMappings(sch, i) {
            if (sch.const) {
              addMapping(sch.const, i);
            } else if (sch.enum) {
              for (const tagValue of sch.enum) {
                addMapping(tagValue, i);
              }
            } else {
              throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
            }
          }
          function addMapping(tagValue, i) {
            if (typeof tagValue != "string" || tagValue in oneOfMapping) {
              throw new Error(`discriminator: "${tagName}" values must be unique strings`);
            }
            oneOfMapping[tagValue] = i;
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/refs/json-schema-draft-07.json
var require_json_schema_draft_07 = __commonJS({
  "node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports, module) {
    module.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
        },
        simpleTypes: {
          enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: true,
        readOnly: {
          type: "boolean",
          default: false
        },
        examples: {
          type: "array",
          items: true
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
          default: true
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
          }
        },
        propertyNames: { $ref: "#" },
        const: true,
        enum: {
          type: "array",
          items: true,
          minItems: 1,
          uniqueItems: true
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: true
    };
  }
});

// node_modules/ajv/dist/ajv.js
var require_ajv = __commonJS({
  "node_modules/ajv/dist/ajv.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
    var core_1 = require_core();
    var draft7_1 = require_draft7();
    var discriminator_1 = require_discriminator();
    var draft7MetaSchema = require_json_schema_draft_07();
    var META_SUPPORT_DATA = ["/properties"];
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var Ajv = class extends core_1.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator) this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta) return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    };
    exports.Ajv = Ajv;
    module.exports = exports = Ajv;
    module.exports.Ajv = Ajv;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = Ajv;
    var validate_1 = require_validate2();
    Object.defineProperty(exports, "KeywordCxt", {
      enumerable: true,
      get: function() {
        return validate_1.KeywordCxt;
      }
    });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", {
      enumerable: true,
      get: function() {
        return codegen_1._;
      }
    });
    Object.defineProperty(exports, "str", {
      enumerable: true,
      get: function() {
        return codegen_1.str;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return codegen_1.stringify;
      }
    });
    Object.defineProperty(exports, "nil", {
      enumerable: true,
      get: function() {
        return codegen_1.nil;
      }
    });
    Object.defineProperty(exports, "Name", {
      enumerable: true,
      get: function() {
        return codegen_1.Name;
      }
    });
    Object.defineProperty(exports, "CodeGen", {
      enumerable: true,
      get: function() {
        return codegen_1.CodeGen;
      }
    });
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports, "ValidationError", {
      enumerable: true,
      get: function() {
        return validation_error_1.default;
      }
    });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports, "MissingRefError", {
      enumerable: true,
      get: function() {
        return ref_error_1.default;
      }
    });
  }
});

// node_modules/ajv-formats/dist/formats.js
var require_formats = __commonJS({
  "node_modules/ajv-formats/dist/formats.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
    function fmtDef(validate, compare) {
      return {
        validate,
        compare
      };
    }
    exports.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: fmtDef(date, compareDate),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: fmtDef(getTime(true), compareTime),
      "date-time": fmtDef(getDateTime(true), compareDateTime),
      "iso-time": fmtDef(getTime(), compareIsoTime),
      "iso-date-time": fmtDef(getDateTime(), compareIsoDateTime),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte,
      // signed 32 bit integer
      int32: {
        type: "number",
        validate: validateInt32
      },
      // signed 64 bit integer
      int64: {
        type: "number",
        validate: validateInt64
      },
      // C-type float
      float: {
        type: "number",
        validate: validateNumber
      },
      // C-type double
      double: {
        type: "number",
        validate: validateNumber
      },
      // hint to the UI to hide input strings
      password: true,
      // unchecked string payload
      binary: true
    };
    exports.fastFormats = __spreadProps(__spreadValues({}, exports.fullFormats), {
      date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
      time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareTime),
      "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
      "iso-time": fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoTime),
      "iso-date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareIsoDateTime),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    });
    exports.formatNames = Object.keys(exports.fullFormats);
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
    var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function date(str) {
      const matches = DATE.exec(str);
      if (!matches) return false;
      const year = +matches[1];
      const month = +matches[2];
      const day = +matches[3];
      return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
    }
    function compareDate(d1, d2) {
      if (!(d1 && d2)) return void 0;
      if (d1 > d2) return 1;
      if (d1 < d2) return -1;
      return 0;
    }
    var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
    function getTime(strictTimeZone) {
      return function time(str) {
        const matches = TIME.exec(str);
        if (!matches) return false;
        const hr = +matches[1];
        const min = +matches[2];
        const sec = +matches[3];
        const tz = matches[4];
        const tzSign = matches[5] === "-" ? -1 : 1;
        const tzH = +(matches[6] || 0);
        const tzM = +(matches[7] || 0);
        if (tzH > 23 || tzM > 59 || strictTimeZone && !tz) return false;
        if (hr <= 23 && min <= 59 && sec < 60) return true;
        const utcMin = min - tzM * tzSign;
        const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
        return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
      };
    }
    function compareTime(s1, s2) {
      if (!(s1 && s2)) return void 0;
      const t1 = (/* @__PURE__ */ new Date("2020-01-01T" + s1)).valueOf();
      const t2 = (/* @__PURE__ */ new Date("2020-01-01T" + s2)).valueOf();
      if (!(t1 && t2)) return void 0;
      return t1 - t2;
    }
    function compareIsoTime(t1, t2) {
      if (!(t1 && t2)) return void 0;
      const a1 = TIME.exec(t1);
      const a2 = TIME.exec(t2);
      if (!(a1 && a2)) return void 0;
      t1 = a1[1] + a1[2] + a1[3];
      t2 = a2[1] + a2[2] + a2[3];
      if (t1 > t2) return 1;
      if (t1 < t2) return -1;
      return 0;
    }
    var DATE_TIME_SEPARATOR = /t|\s/i;
    function getDateTime(strictTimeZone) {
      const time = getTime(strictTimeZone);
      return function date_time(str) {
        const dateTime = str.split(DATE_TIME_SEPARATOR);
        return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1]);
      };
    }
    function compareDateTime(dt1, dt2) {
      if (!(dt1 && dt2)) return void 0;
      const d1 = new Date(dt1).valueOf();
      const d2 = new Date(dt2).valueOf();
      if (!(d1 && d2)) return void 0;
      return d1 - d2;
    }
    function compareIsoDateTime(dt1, dt2) {
      if (!(dt1 && dt2)) return void 0;
      const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
      const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
      const res = compareDate(d1, d2);
      if (res === void 0) return void 0;
      return res || compareTime(t1, t2);
    }
    var NOT_URI_FRAGMENT = /\/|:/;
    var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function uri(str) {
      return NOT_URI_FRAGMENT.test(str) && URI.test(str);
    }
    var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function byte(str) {
      BYTE.lastIndex = 0;
      return BYTE.test(str);
    }
    var MIN_INT32 = -(2 ** 31);
    var MAX_INT32 = 2 ** 31 - 1;
    function validateInt32(value) {
      return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
    }
    function validateInt64(value) {
      return Number.isInteger(value);
    }
    function validateNumber() {
      return true;
    }
    var Z_ANCHOR = /[^\\]\\Z/;
    function regex(str) {
      if (Z_ANCHOR.test(str)) return false;
      try {
        new RegExp(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }
});

// node_modules/ajv-formats/dist/limit.js
var require_limit = __commonJS({
  "node_modules/ajv-formats/dist/limit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.formatLimitDefinition = void 0;
    var ajv_1 = require_ajv();
    var codegen_1 = require_codegen();
    var ops = codegen_1.operators;
    var KWDs = {
      formatMaximum: {
        okStr: "<=",
        ok: ops.LTE,
        fail: ops.GT
      },
      formatMinimum: {
        okStr: ">=",
        ok: ops.GTE,
        fail: ops.LT
      },
      formatExclusiveMaximum: {
        okStr: "<",
        ok: ops.LT,
        fail: ops.GTE
      },
      formatExclusiveMinimum: {
        okStr: ">",
        ok: ops.GT,
        fail: ops.LTE
      }
    };
    var error = {
      message: ({
        keyword,
        schemaCode
      }) => (0, codegen_1.str)`should be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({
        keyword,
        schemaCode
      }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    exports.formatLimitDefinition = {
      keyword: Object.keys(KWDs),
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const {
          gen,
          data,
          schemaCode,
          keyword,
          it
        } = cxt;
        const {
          opts,
          self: self2
        } = it;
        if (!opts.validateFormats) return;
        const fCxt = new ajv_1.KeywordCxt(it, self2.RULES.all.format.definition, "format");
        if (fCxt.$data) validate$DataFormat();
        else validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self2.formats,
            code: opts.code.formats
          });
          const fmt = gen.const("fmt", (0, codegen_1._)`${fmts}[${fCxt.schemaCode}]`);
          cxt.fail$data((0, codegen_1.or)((0, codegen_1._)`typeof ${fmt} != "object"`, (0, codegen_1._)`${fmt} instanceof RegExp`, (0, codegen_1._)`typeof ${fmt}.compare != "function"`, compareCode(fmt)));
        }
        function validateFormat() {
          const format = fCxt.schema;
          const fmtDef = self2.formats[format];
          if (!fmtDef || fmtDef === true) return;
          if (typeof fmtDef != "object" || fmtDef instanceof RegExp || typeof fmtDef.compare != "function") {
            throw new Error(`"${keyword}": format "${format}" does not define "compare" function`);
          }
          const fmt = gen.scopeValue("formats", {
            key: format,
            ref: fmtDef,
            code: opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(format)}` : void 0
          });
          cxt.fail$data(compareCode(fmt));
        }
        function compareCode(fmt) {
          return (0, codegen_1._)`${fmt}.compare(${data}, ${schemaCode}) ${KWDs[keyword].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    var formatLimitPlugin = (ajv) => {
      ajv.addKeyword(exports.formatLimitDefinition);
      return ajv;
    };
    exports.default = formatLimitPlugin;
  }
});

// node_modules/ajv-formats/dist/index.js
var require_dist = __commonJS({
  "node_modules/ajv-formats/dist/index.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var formats_1 = require_formats();
    var limit_1 = require_limit();
    var codegen_1 = require_codegen();
    var fullName = new codegen_1.Name("fullFormats");
    var fastName = new codegen_1.Name("fastFormats");
    var formatsPlugin = (ajv, opts = {
      keywords: true
    }) => {
      if (Array.isArray(opts)) {
        addFormats(ajv, opts, formats_1.fullFormats, fullName);
        return ajv;
      }
      const [formats, exportName] = opts.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName];
      const list = opts.formats || formats_1.formatNames;
      addFormats(ajv, list, formats, exportName);
      if (opts.keywords) (0, limit_1.default)(ajv);
      return ajv;
    };
    formatsPlugin.get = (name, mode = "full") => {
      const formats = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
      const f = formats[name];
      if (!f) throw new Error(`Unknown format "${name}"`);
      return f;
    };
    function addFormats(ajv, list, fs, exportName) {
      var _a2;
      var _b;
      (_a2 = (_b = ajv.opts.code).formats) !== null && _a2 !== void 0 ? _a2 : _b.formats = (0, codegen_1._)`require("ajv-formats/dist/formats").${exportName}`;
      for (const f of list) ajv.addFormat(f, fs[f]);
    }
    module.exports = exports = formatsPlugin;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = formatsPlugin;
  }
});

// node_modules/zod/v3/helpers/util.cjs
var require_util2 = __commonJS({
  "node_modules/zod/v3/helpers/util.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getParsedType = exports.ZodParsedType = exports.objectUtil = exports.util = void 0;
    var util;
    (function(util2) {
      util2.assertEqual = (_) => {
      };
      function assertIs(_arg) {
      }
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item)) return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (exports.util = util = {}));
    var objectUtil;
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return __spreadValues(__spreadValues({}, first), second);
      };
    })(objectUtil || (exports.objectUtil = objectUtil = {}));
    exports.ZodParsedType = util.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]);
    var getParsedType = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return exports.ZodParsedType.undefined;
        case "string":
          return exports.ZodParsedType.string;
        case "number":
          return Number.isNaN(data) ? exports.ZodParsedType.nan : exports.ZodParsedType.number;
        case "boolean":
          return exports.ZodParsedType.boolean;
        case "function":
          return exports.ZodParsedType.function;
        case "bigint":
          return exports.ZodParsedType.bigint;
        case "symbol":
          return exports.ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return exports.ZodParsedType.array;
          }
          if (data === null) {
            return exports.ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return exports.ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return exports.ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return exports.ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return exports.ZodParsedType.date;
          }
          return exports.ZodParsedType.object;
        default:
          return exports.ZodParsedType.unknown;
      }
    };
    exports.getParsedType = getParsedType;
  }
});

// node_modules/zod/v3/ZodError.cjs
var require_ZodError = __commonJS({
  "node_modules/zod/v3/ZodError.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ZodError = exports.quotelessJson = exports.ZodIssueCode = void 0;
    var util_js_1 = require_util2();
    exports.ZodIssueCode = util_js_1.util.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
    var quotelessJson = (obj) => {
      const json = JSON.stringify(obj, null, 2);
      return json.replace(/"([^"]+)":/g, "$1:");
    };
    exports.quotelessJson = quotelessJson;
    var ZodError = class _ZodError extends Error {
      get errors() {
        return this.issues;
      }
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = {
          _errors: []
        };
        const processError = (error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || {
                    _errors: []
                  };
                } else {
                  curr[el] = curr[el] || {
                    _errors: []
                  };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      static assert(value) {
        if (!(value instanceof _ZodError)) {
          throw new Error(`Not a ZodError: ${value}`);
        }
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util_js_1.util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            const firstEl = sub.path[0];
            fieldErrors[firstEl] = fieldErrors[firstEl] || [];
            fieldErrors[firstEl].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return {
          formErrors,
          fieldErrors
        };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    exports.ZodError = ZodError;
    ZodError.create = (issues) => {
      const error = new ZodError(issues);
      return error;
    };
  }
});

// node_modules/zod/v3/locales/en.cjs
var require_en = __commonJS({
  "node_modules/zod/v3/locales/en.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ZodError_js_1 = require_ZodError();
    var util_js_1 = require_util2();
    var errorMap = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodError_js_1.ZodIssueCode.invalid_type:
          if (issue.received === util_js_1.ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodError_js_1.ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util_js_1.util.jsonStringifyReplacer)}`;
          break;
        case ZodError_js_1.ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util_js_1.util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util_js_1.util.joinValues(issue.options)}`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util_js_1.util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util_js_1.util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodError_js_1.ZodIssueCode.too_small:
          if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "bigint") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else message = "Invalid input";
          break;
        case ZodError_js_1.ZodIssueCode.too_big:
          if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else message = "Invalid input";
          break;
        case ZodError_js_1.ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodError_js_1.ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodError_js_1.ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodError_js_1.ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util_js_1.util.assertNever(issue);
      }
      return {
        message
      };
    };
    exports.default = errorMap;
  }
});

// node_modules/zod/v3/errors.cjs
var require_errors2 = __commonJS({
  "node_modules/zod/v3/errors.cjs"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.defaultErrorMap = void 0;
    exports.setErrorMap = setErrorMap;
    exports.getErrorMap = getErrorMap;
    var en_js_1 = __importDefault(require_en());
    exports.defaultErrorMap = en_js_1.default;
    var overrideErrorMap = en_js_1.default;
    function setErrorMap(map) {
      overrideErrorMap = map;
    }
    function getErrorMap() {
      return overrideErrorMap;
    }
  }
});

// node_modules/zod/v3/helpers/parseUtil.cjs
var require_parseUtil = __commonJS({
  "node_modules/zod/v3/helpers/parseUtil.cjs"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isAsync = exports.isValid = exports.isDirty = exports.isAborted = exports.OK = exports.DIRTY = exports.INVALID = exports.ParseStatus = exports.EMPTY_PATH = exports.makeIssue = void 0;
    exports.addIssueToContext = addIssueToContext;
    var errors_js_1 = require_errors2();
    var en_js_1 = __importDefault(require_en());
    var makeIssue = (params) => {
      const {
        data,
        path,
        errorMaps,
        issueData
      } = params;
      const fullPath = [...path, ...issueData.path || []];
      const fullIssue = __spreadProps(__spreadValues({}, issueData), {
        path: fullPath
      });
      if (issueData.message !== void 0) {
        return __spreadProps(__spreadValues({}, issueData), {
          path: fullPath,
          message: issueData.message
        });
      }
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, {
          data,
          defaultError: errorMessage
        }).message;
      }
      return __spreadProps(__spreadValues({}, issueData), {
        path: fullPath,
        message: errorMessage
      });
    };
    exports.makeIssue = makeIssue;
    exports.EMPTY_PATH = [];
    function addIssueToContext(ctx, issueData) {
      const overrideMap = (0, errors_js_1.getErrorMap)();
      const issue = (0, exports.makeIssue)({
        issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          // contextual error map is first priority
          ctx.schemaErrorMap,
          // then schema-bound map if available
          overrideMap,
          // then global override map
          overrideMap === en_js_1.default ? void 0 : en_js_1.default
          // then global default map
        ].filter((x) => !!x)
      });
      ctx.common.issues.push(issue);
    }
    var ParseStatus = class _ParseStatus {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid") this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted") this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted") return exports.INVALID;
          if (s.status === "dirty") status.dirty();
          arrayValue.push(s.value);
        }
        return {
          status: status.value,
          value: arrayValue
        };
      }
      static mergeObjectAsync(status, pairs) {
        return __async(this, null, function* () {
          const syncPairs = [];
          for (const pair of pairs) {
            const key = yield pair.key;
            const value = yield pair.value;
            syncPairs.push({
              key,
              value
            });
          }
          return _ParseStatus.mergeObjectSync(status, syncPairs);
        });
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const {
            key,
            value
          } = pair;
          if (key.status === "aborted") return exports.INVALID;
          if (value.status === "aborted") return exports.INVALID;
          if (key.status === "dirty") status.dirty();
          if (value.status === "dirty") status.dirty();
          if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key.value] = value.value;
          }
        }
        return {
          status: status.value,
          value: finalObject
        };
      }
    };
    exports.ParseStatus = ParseStatus;
    exports.INVALID = Object.freeze({
      status: "aborted"
    });
    var DIRTY = (value) => ({
      status: "dirty",
      value
    });
    exports.DIRTY = DIRTY;
    var OK = (value) => ({
      status: "valid",
      value
    });
    exports.OK = OK;
    var isAborted = (x) => x.status === "aborted";
    exports.isAborted = isAborted;
    var isDirty = (x) => x.status === "dirty";
    exports.isDirty = isDirty;
    var isValid = (x) => x.status === "valid";
    exports.isValid = isValid;
    var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
    exports.isAsync = isAsync;
  }
});

// node_modules/zod/v3/helpers/typeAliases.cjs
var require_typeAliases = __commonJS({
  "node_modules/zod/v3/helpers/typeAliases.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  }
});

// node_modules/zod/v3/helpers/errorUtil.cjs
var require_errorUtil = __commonJS({
  "node_modules/zod/v3/helpers/errorUtil.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.errorUtil = void 0;
    var errorUtil;
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? {
        message
      } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
    })(errorUtil || (exports.errorUtil = errorUtil = {}));
  }
});

// node_modules/zod/v3/types.cjs
var require_types3 = __commonJS({
  "node_modules/zod/v3/types.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.discriminatedUnion = exports.date = exports.boolean = exports.bigint = exports.array = exports.any = exports.coerce = exports.ZodFirstPartyTypeKind = exports.late = exports.ZodSchema = exports.Schema = exports.ZodReadonly = exports.ZodPipeline = exports.ZodBranded = exports.BRAND = exports.ZodNaN = exports.ZodCatch = exports.ZodDefault = exports.ZodNullable = exports.ZodOptional = exports.ZodTransformer = exports.ZodEffects = exports.ZodPromise = exports.ZodNativeEnum = exports.ZodEnum = exports.ZodLiteral = exports.ZodLazy = exports.ZodFunction = exports.ZodSet = exports.ZodMap = exports.ZodRecord = exports.ZodTuple = exports.ZodIntersection = exports.ZodDiscriminatedUnion = exports.ZodUnion = exports.ZodObject = exports.ZodArray = exports.ZodVoid = exports.ZodNever = exports.ZodUnknown = exports.ZodAny = exports.ZodNull = exports.ZodUndefined = exports.ZodSymbol = exports.ZodDate = exports.ZodBoolean = exports.ZodBigInt = exports.ZodNumber = exports.ZodString = exports.ZodType = void 0;
    exports.NEVER = exports.void = exports.unknown = exports.union = exports.undefined = exports.tuple = exports.transformer = exports.symbol = exports.string = exports.strictObject = exports.set = exports.record = exports.promise = exports.preprocess = exports.pipeline = exports.ostring = exports.optional = exports.onumber = exports.oboolean = exports.object = exports.number = exports.nullable = exports.null = exports.never = exports.nativeEnum = exports.nan = exports.map = exports.literal = exports.lazy = exports.intersection = exports.instanceof = exports.function = exports.enum = exports.effect = void 0;
    exports.datetimeRegex = datetimeRegex;
    exports.custom = custom;
    var ZodError_js_1 = require_ZodError();
    var errors_js_1 = require_errors2();
    var errorUtil_js_1 = require_errorUtil();
    var parseUtil_js_1 = require_parseUtil();
    var util_js_1 = require_util2();
    var ParseInputLazyPath = class {
      constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (Array.isArray(this._key)) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    };
    var handleResult = (ctx, result) => {
      if ((0, parseUtil_js_1.isValid)(result)) {
        return {
          success: true,
          data: result.value
        };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error) return this._error;
            const error = new ZodError_js_1.ZodError(ctx.common.issues);
            this._error = error;
            return this._error;
          }
        };
      }
    };
    function processCreateParams(params) {
      if (!params) return {};
      const {
        errorMap,
        invalid_type_error,
        required_error,
        description
      } = params;
      if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
      }
      if (errorMap) return {
        errorMap,
        description
      };
      const customMap = (iss, ctx) => {
        const {
          message
        } = params;
        if (iss.code === "invalid_enum_value") {
          return {
            message: message ?? ctx.defaultError
          };
        }
        if (typeof ctx.data === "undefined") {
          return {
            message: message ?? required_error ?? ctx.defaultError
          };
        }
        if (iss.code !== "invalid_type") return {
          message: ctx.defaultError
        };
        return {
          message: message ?? invalid_type_error ?? ctx.defaultError
        };
      };
      return {
        errorMap: customMap,
        description
      };
    }
    var ZodType = class {
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return (0, util_js_1.getParsedType)(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: (0, util_js_1.getParsedType)(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new parseUtil_js_1.ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: (0, util_js_1.getParsedType)(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if ((0, parseUtil_js_1.isAsync)(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success) return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        const ctx = {
          common: {
            issues: [],
            async: params?.async ?? false,
            contextualErrorMap: params?.errorMap
          },
          path: params?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: (0, util_js_1.getParsedType)(data)
        };
        const result = this._parseSync({
          data,
          path: ctx.path,
          parent: ctx
        });
        return handleResult(ctx, result);
      }
      "~validate"(data) {
        const ctx = {
          common: {
            issues: [],
            async: !!this["~standard"].async
          },
          path: [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: (0, util_js_1.getParsedType)(data)
        };
        if (!this["~standard"].async) {
          try {
            const result = this._parseSync({
              data,
              path: [],
              parent: ctx
            });
            return (0, parseUtil_js_1.isValid)(result) ? {
              value: result.value
            } : {
              issues: ctx.common.issues
            };
          } catch (err) {
            if (err?.message?.toLowerCase()?.includes("encountered")) {
              this["~standard"].async = true;
            }
            ctx.common = {
              issues: [],
              async: true
            };
          }
        }
        return this._parseAsync({
          data,
          path: [],
          parent: ctx
        }).then((result) => (0, parseUtil_js_1.isValid)(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        });
      }
      parseAsync(data, params) {
        return __async(this, null, function* () {
          const result = yield this.safeParseAsync(data, params);
          if (result.success) return result.data;
          throw result.error;
        });
      }
      safeParseAsync(data, params) {
        return __async(this, null, function* () {
          const ctx = {
            common: {
              issues: [],
              contextualErrorMap: params?.errorMap,
              async: true
            },
            path: params?.path || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: (0, util_js_1.getParsedType)(data)
          };
          const maybeAsyncResult = this._parse({
            data,
            path: ctx.path,
            parent: ctx
          });
          const result = yield (0, parseUtil_js_1.isAsync)(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult);
          return handleResult(ctx, result);
        });
      }
      refine(check, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return {
              message
            };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = () => ctx.addIssue(__spreadValues({
            code: ZodError_js_1.ZodIssueCode.custom
          }, getIssueProperties(val)));
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: {
            type: "refinement",
            refinement
          }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
          version: 1,
          vendor: "zod",
          validate: (data) => this["~validate"](data)
        };
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects(__spreadProps(__spreadValues({}, processCreateParams(this._def)), {
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: {
            type: "transform",
            transform
          }
        }));
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault(__spreadProps(__spreadValues({}, processCreateParams(this._def)), {
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        }));
      }
      brand() {
        return new ZodBranded(__spreadValues({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this
        }, processCreateParams(this._def)));
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch(__spreadProps(__spreadValues({}, processCreateParams(this._def)), {
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        }));
      }
      describe(description) {
        const This = this.constructor;
        return new This(__spreadProps(__spreadValues({}, this._def), {
          description
        }));
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      readonly() {
        return ZodReadonly.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    exports.ZodType = ZodType;
    exports.Schema = ZodType;
    exports.ZodSchema = ZodType;
    var cuidRegex = /^c[^\s-]{8,}$/i;
    var cuid2Regex = /^[0-9a-z]+$/;
    var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
    var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    var nanoidRegex = /^[a-z0-9_-]{21}$/i;
    var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
    var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
    var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    var emojiRegex;
    var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
    var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
    var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
    var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
    var dateRegex = new RegExp(`^${dateRegexSource}$`);
    function timeRegexSource(args) {
      let secondsRegexSource = `[0-5]\\d`;
      if (args.precision) {
        secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
      } else if (args.precision == null) {
        secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
      }
      const secondsQuantifier = args.precision ? "+" : "?";
      return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
    }
    function timeRegex(args) {
      return new RegExp(`^${timeRegexSource(args)}$`);
    }
    function datetimeRegex(args) {
      let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
      const opts = [];
      opts.push(args.local ? `Z?` : `Z`);
      if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
      regex = `${regex}(${opts.join("|")})`;
      return new RegExp(`^${regex}$`);
    }
    function isValidIP(ip, version) {
      if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
      }
      if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
      }
      return false;
    }
    function isValidJWT(jwt, alg) {
      if (!jwtRegex.test(jwt)) return false;
      try {
        const [header] = jwt.split(".");
        if (!header) return false;
        const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
        const decoded = JSON.parse(atob(base64));
        if (typeof decoded !== "object" || decoded === null) return false;
        if ("typ" in decoded && decoded?.typ !== "JWT") return false;
        if (!decoded.alg) return false;
        if (alg && decoded.alg !== alg) return false;
        return true;
      } catch {
        return false;
      }
    }
    function isValidCidr(ip, version) {
      if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
        return true;
      }
      if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
        return true;
      }
      return false;
    }
    var ZodString = class _ZodString extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx2, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.string,
            received: ctx2.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const status = new parseUtil_js_1.ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                (0, parseUtil_js_1.addIssueToContext)(ctx, {
                  code: ZodError_js_1.ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                (0, parseUtil_js_1.addIssueToContext)(ctx, {
                  code: ZodError_js_1.ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "email",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "emoji") {
            if (!emojiRegex) {
              emojiRegex = new RegExp(_emojiRegex, "u");
            }
            if (!emojiRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "emoji",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "uuid",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "nanoid") {
            if (!nanoidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "nanoid",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "cuid",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "cuid2",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ulid") {
            if (!ulidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "ulid",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "url",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "regex",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "includes") {
            if (!input.data.includes(check.value, check.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: {
                  includes: check.value,
                  position: check.position
                },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: {
                  startsWith: check.value
                },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: {
                  endsWith: check.value
                },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "date") {
            const regex = dateRegex;
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: "date",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "time") {
            const regex = timeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                validation: "time",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "duration") {
            if (!durationRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "duration",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ip") {
            if (!isValidIP(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "ip",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "jwt") {
            if (!isValidJWT(input.data, check.alg)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "jwt",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cidr") {
            if (!isValidCidr(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "cidr",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64") {
            if (!base64Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "base64",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64url") {
            if (!base64urlRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                validation: "base64url",
                code: ZodError_js_1.ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_js_1.util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: input.data
        };
      }
      _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), __spreadValues({
          validation,
          code: ZodError_js_1.ZodIssueCode.invalid_string
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      _addCheck(check) {
        return new _ZodString(__spreadProps(__spreadValues({}, this._def), {
          checks: [...this._def.checks, check]
        }));
      }
      email(message) {
        return this._addCheck(__spreadValues({
          kind: "email"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      url(message) {
        return this._addCheck(__spreadValues({
          kind: "url"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      emoji(message) {
        return this._addCheck(__spreadValues({
          kind: "emoji"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      uuid(message) {
        return this._addCheck(__spreadValues({
          kind: "uuid"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      nanoid(message) {
        return this._addCheck(__spreadValues({
          kind: "nanoid"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      cuid(message) {
        return this._addCheck(__spreadValues({
          kind: "cuid"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      cuid2(message) {
        return this._addCheck(__spreadValues({
          kind: "cuid2"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      ulid(message) {
        return this._addCheck(__spreadValues({
          kind: "ulid"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      base64(message) {
        return this._addCheck(__spreadValues({
          kind: "base64"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      base64url(message) {
        return this._addCheck(__spreadValues({
          kind: "base64url"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      jwt(options) {
        return this._addCheck(__spreadValues({
          kind: "jwt"
        }, errorUtil_js_1.errorUtil.errToObj(options)));
      }
      ip(options) {
        return this._addCheck(__spreadValues({
          kind: "ip"
        }, errorUtil_js_1.errorUtil.errToObj(options)));
      }
      cidr(options) {
        return this._addCheck(__spreadValues({
          kind: "cidr"
        }, errorUtil_js_1.errorUtil.errToObj(options)));
      }
      datetime(options) {
        if (typeof options === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            local: false,
            message: options
          });
        }
        return this._addCheck(__spreadValues({
          kind: "datetime",
          precision: typeof options?.precision === "undefined" ? null : options?.precision,
          offset: options?.offset ?? false,
          local: options?.local ?? false
        }, errorUtil_js_1.errorUtil.errToObj(options?.message)));
      }
      date(message) {
        return this._addCheck({
          kind: "date",
          message
        });
      }
      time(options) {
        if (typeof options === "string") {
          return this._addCheck({
            kind: "time",
            precision: null,
            message: options
          });
        }
        return this._addCheck(__spreadValues({
          kind: "time",
          precision: typeof options?.precision === "undefined" ? null : options?.precision
        }, errorUtil_js_1.errorUtil.errToObj(options?.message)));
      }
      duration(message) {
        return this._addCheck(__spreadValues({
          kind: "duration"
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      regex(regex, message) {
        return this._addCheck(__spreadValues({
          kind: "regex",
          regex
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      includes(value, options) {
        return this._addCheck(__spreadValues({
          kind: "includes",
          value,
          position: options?.position
        }, errorUtil_js_1.errorUtil.errToObj(options?.message)));
      }
      startsWith(value, message) {
        return this._addCheck(__spreadValues({
          kind: "startsWith",
          value
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      endsWith(value, message) {
        return this._addCheck(__spreadValues({
          kind: "endsWith",
          value
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      min(minLength, message) {
        return this._addCheck(__spreadValues({
          kind: "min",
          value: minLength
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      max(maxLength, message) {
        return this._addCheck(__spreadValues({
          kind: "max",
          value: maxLength
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      length(len, message) {
        return this._addCheck(__spreadValues({
          kind: "length",
          value: len
        }, errorUtil_js_1.errorUtil.errToObj(message)));
      }
      /**
       * Equivalent to `.min(1)`
       */
      nonempty(message) {
        return this.min(1, errorUtil_js_1.errorUtil.errToObj(message));
      }
      trim() {
        return new _ZodString(__spreadProps(__spreadValues({}, this._def), {
          checks: [...this._def.checks, {
            kind: "trim"
          }]
        }));
      }
      toLowerCase() {
        return new _ZodString(__spreadProps(__spreadValues({}, this._def), {
          checks: [...this._def.checks, {
            kind: "toLowerCase"
          }]
        }));
      }
      toUpperCase() {
        return new _ZodString(__spreadProps(__spreadValues({}, this._def), {
          checks: [...this._def.checks, {
            kind: "toUpperCase"
          }]
        }));
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
      }
      get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
      }
      get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
      }
      get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
      }
      get isBase64url() {
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min) min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max) max = ch.value;
          }
        }
        return max;
      }
    };
    exports.ZodString = ZodString;
    ZodString.create = (params) => {
      return new ZodString(__spreadValues({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: params?.coerce ?? false
      }, processCreateParams(params)));
    };
    function floatSafeRemainder(val, step) {
      const valDecCount = (val.toString().split(".")[1] || "").length;
      const stepDecCount = (step.toString().split(".")[1] || "").length;
      const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
      const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
      const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
      return valInt % stepInt / 10 ** decCount;
    }
    var ZodNumber = class _ZodNumber extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx2, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.number,
            received: ctx2.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        let ctx = void 0;
        const status = new parseUtil_js_1.ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util_js_1.util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_js_1.util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: input.data
        };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_js_1.errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_js_1.errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_js_1.errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_js_1.errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodNumber(__spreadProps(__spreadValues({}, this._def), {
          checks: [...this._def.checks, {
            kind,
            value,
            inclusive,
            message: errorUtil_js_1.errorUtil.toString(message)
          }]
        }));
      }
      _addCheck(check) {
        return new _ZodNumber(__spreadProps(__spreadValues({}, this._def), {
          checks: [...this._def.checks, check]
        }));
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      safe(message) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil_js_1.errorUtil.toString(message)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min) min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max) max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util_js_1.util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null;
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min) min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max) max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    exports.ZodNumber = ZodNumber;
    ZodNumber.create = (params) => {
      return new ZodNumber(__spreadValues({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: params?.coerce || false
      }, processCreateParams(params)));
    };
    var ZodBigInt = class _ZodBigInt extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          try {
            input.data = BigInt(input.data);
          } catch {
            return this._getInvalidInput(input);
          }
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.bigint) {
          return this._getInvalidInput(input);
        }
        let ctx = void 0;
        const status = new parseUtil_js_1.ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_small,
                type: "bigint",
                minimum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_big,
                type: "bigint",
                maximum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (input.data % check.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util_js_1.util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: input.data
        };
      }
      _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        (0, parseUtil_js_1.addIssueToContext)(ctx, {
          code: ZodError_js_1.ZodIssueCode.invalid_type,
          expected: util_js_1.ZodParsedType.bigint,
          received: ctx.parsedType
        });
        return parseUtil_js_1.INVALID;
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil_js_1.errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil_js_1.errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil_js_1.errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil_js_1.errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodBigInt(__spreadProps(__spreadValues({}, this._def), {
          checks: [...this._def.checks, {
            kind,
            value,
            inclusive,
            message: errorUtil_js_1.errorUtil.toString(message)
          }]
        }));
      }
      _addCheck(check) {
        return new _ZodBigInt(__spreadProps(__spreadValues({}, this._def), {
          checks: [...this._def.checks, check]
        }));
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min) min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max) max = ch.value;
          }
        }
        return max;
      }
    };
    exports.ZodBigInt = ZodBigInt;
    ZodBigInt.create = (params) => {
      return new ZodBigInt(__spreadValues({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: params?.coerce ?? false
      }, processCreateParams(params)));
    };
    var ZodBoolean = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodBoolean = ZodBoolean;
    ZodBoolean.create = (params) => {
      return new ZodBoolean(__spreadValues({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: params?.coerce || false
      }, processCreateParams(params)));
    };
    var ZodDate = class _ZodDate extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx2, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.date,
            received: ctx2.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        if (Number.isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx2, {
            code: ZodError_js_1.ZodIssueCode.invalid_date
          });
          return parseUtil_js_1.INVALID;
        }
        const status = new parseUtil_js_1.ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util_js_1.util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new _ZodDate(__spreadProps(__spreadValues({}, this._def), {
          checks: [...this._def.checks, check]
        }));
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil_js_1.errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min) min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max) max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    exports.ZodDate = ZodDate;
    ZodDate.create = (params) => {
      return new ZodDate(__spreadValues({
        checks: [],
        coerce: params?.coerce || false,
        typeName: ZodFirstPartyTypeKind.ZodDate
      }, processCreateParams(params)));
    };
    var ZodSymbol = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodSymbol = ZodSymbol;
    ZodSymbol.create = (params) => {
      return new ZodSymbol(__spreadValues({
        typeName: ZodFirstPartyTypeKind.ZodSymbol
      }, processCreateParams(params)));
    };
    var ZodUndefined = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodUndefined = ZodUndefined;
    ZodUndefined.create = (params) => {
      return new ZodUndefined(__spreadValues({
        typeName: ZodFirstPartyTypeKind.ZodUndefined
      }, processCreateParams(params)));
    };
    var ZodNull = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.null,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodNull = ZodNull;
    ZodNull.create = (params) => {
      return new ZodNull(__spreadValues({
        typeName: ZodFirstPartyTypeKind.ZodNull
      }, processCreateParams(params)));
    };
    var ZodAny = class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodAny = ZodAny;
    ZodAny.create = (params) => {
      return new ZodAny(__spreadValues({
        typeName: ZodFirstPartyTypeKind.ZodAny
      }, processCreateParams(params)));
    };
    var ZodUnknown = class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodUnknown = ZodUnknown;
    ZodUnknown.create = (params) => {
      return new ZodUnknown(__spreadValues({
        typeName: ZodFirstPartyTypeKind.ZodUnknown
      }, processCreateParams(params)));
    };
    var ZodNever = class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        (0, parseUtil_js_1.addIssueToContext)(ctx, {
          code: ZodError_js_1.ZodIssueCode.invalid_type,
          expected: util_js_1.ZodParsedType.never,
          received: ctx.parsedType
        });
        return parseUtil_js_1.INVALID;
      }
    };
    exports.ZodNever = ZodNever;
    ZodNever.create = (params) => {
      return new ZodNever(__spreadValues({
        typeName: ZodFirstPartyTypeKind.ZodNever
      }, processCreateParams(params)));
    };
    var ZodVoid = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.void,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
    };
    exports.ZodVoid = ZodVoid;
    ZodVoid.create = (params) => {
      return new ZodVoid(__spreadValues({
        typeName: ZodFirstPartyTypeKind.ZodVoid
      }, processCreateParams(params)));
    };
    var ZodArray = class _ZodArray extends ZodType {
      _parse(input) {
        const {
          ctx,
          status
        } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== util_js_1.ZodParsedType.array) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.array,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: tooBig ? ZodError_js_1.ZodIssueCode.too_big : ZodError_js_1.ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: ZodError_js_1.ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: ZodError_js_1.ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return parseUtil_js_1.ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return parseUtil_js_1.ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new _ZodArray(__spreadProps(__spreadValues({}, this._def), {
          minLength: {
            value: minLength,
            message: errorUtil_js_1.errorUtil.toString(message)
          }
        }));
      }
      max(maxLength, message) {
        return new _ZodArray(__spreadProps(__spreadValues({}, this._def), {
          maxLength: {
            value: maxLength,
            message: errorUtil_js_1.errorUtil.toString(message)
          }
        }));
      }
      length(len, message) {
        return new _ZodArray(__spreadProps(__spreadValues({}, this._def), {
          exactLength: {
            value: len,
            message: errorUtil_js_1.errorUtil.toString(message)
          }
        }));
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    exports.ZodArray = ZodArray;
    ZodArray.create = (schema, params) => {
      return new ZodArray(__spreadValues({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray
      }, processCreateParams(params)));
    };
    function deepPartialify(schema) {
      if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
          const fieldSchema = schema.shape[key];
          newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject(__spreadProps(__spreadValues({}, schema._def), {
          shape: () => newShape
        }));
      } else if (schema instanceof ZodArray) {
        return new ZodArray(__spreadProps(__spreadValues({}, schema._def), {
          type: deepPartialify(schema.element)
        }));
      } else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
      } else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
      } else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
      } else {
        return schema;
      }
    }
    var ZodObject = class _ZodObject extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null) return this._cached;
        const shape = this._def.shape();
        const keys = util_js_1.util.objectKeys(shape);
        this._cached = {
          shape,
          keys
        };
        return this._cached;
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx2, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.object,
            received: ctx2.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const {
          status,
          ctx
        } = this._processInputParams(input);
        const {
          shape,
          keys: shapeKeys
        } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: {
              status: "valid",
              value: key
            },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: {
                  status: "valid",
                  value: key
                },
                value: {
                  status: "valid",
                  value: ctx.data[key]
                }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              (0, parseUtil_js_1.addIssueToContext)(ctx, {
                code: ZodError_js_1.ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip") {
          } else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: {
                status: "valid",
                value: key
              },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key)
                //, ctx.child(key), value, getParsedType(value)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(() => __async(this, null, function* () {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = yield pair.key;
              const value = yield pair.value;
              syncPairs.push({
                key,
                value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          })).then((syncPairs) => {
            return parseUtil_js_1.ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return parseUtil_js_1.ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil_js_1.errorUtil.errToObj;
        return new _ZodObject(__spreadValues(__spreadProps(__spreadValues({}, this._def), {
          unknownKeys: "strict"
        }), message !== void 0 ? {
          errorMap: (issue, ctx) => {
            const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
            if (issue.code === "unrecognized_keys") return {
              message: errorUtil_js_1.errorUtil.errToObj(message).message ?? defaultError
            };
            return {
              message: defaultError
            };
          }
        } : {}));
      }
      strip() {
        return new _ZodObject(__spreadProps(__spreadValues({}, this._def), {
          unknownKeys: "strip"
        }));
      }
      passthrough() {
        return new _ZodObject(__spreadProps(__spreadValues({}, this._def), {
          unknownKeys: "passthrough"
        }));
      }
      // const AugmentFactory =
      //   <Def extends ZodObjectDef>(def: Def) =>
      //   <Augmentation extends ZodRawShape>(
      //     augmentation: Augmentation
      //   ): ZodObject<
      //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
      //     Def["unknownKeys"],
      //     Def["catchall"]
      //   > => {
      //     return new ZodObject({
      //       ...def,
      //       shape: () => ({
      //         ...def.shape(),
      //         ...augmentation,
      //       }),
      //     }) as any;
      //   };
      extend(augmentation) {
        return new _ZodObject(__spreadProps(__spreadValues({}, this._def), {
          shape: () => __spreadValues(__spreadValues({}, this._def.shape()), augmentation)
        }));
      }
      /**
       * Prior to zod@1.0.12 there was a bug in the
       * inferred type of merged objects. Please
       * upgrade if you are experiencing issues.
       */
      merge(merging) {
        const merged = new _ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => __spreadValues(__spreadValues({}, this._def.shape()), merging._def.shape()),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      // merge<
      //   Incoming extends AnyZodObject,
      //   Augmentation extends Incoming["shape"],
      //   NewOutput extends {
      //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
      //       ? Augmentation[k]["_output"]
      //       : k extends keyof Output
      //       ? Output[k]
      //       : never;
      //   },
      //   NewInput extends {
      //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
      //       ? Augmentation[k]["_input"]
      //       : k extends keyof Input
      //       ? Input[k]
      //       : never;
      //   }
      // >(
      //   merging: Incoming
      // ): ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"],
      //   NewOutput,
      //   NewInput
      // > {
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      setKey(key, schema) {
        return this.augment({
          [key]: schema
        });
      }
      // merge<Incoming extends AnyZodObject>(
      //   merging: Incoming
      // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
      // ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"]
      // > {
      //   // const mergedShape = objectUtil.mergeShapes(
      //   //   this._def.shape(),
      //   //   merging._def.shape()
      //   // );
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      catchall(index) {
        return new _ZodObject(__spreadProps(__spreadValues({}, this._def), {
          catchall: index
        }));
      }
      pick(mask) {
        const shape = {};
        for (const key of util_js_1.util.objectKeys(mask)) {
          if (mask[key] && this.shape[key]) {
            shape[key] = this.shape[key];
          }
        }
        return new _ZodObject(__spreadProps(__spreadValues({}, this._def), {
          shape: () => shape
        }));
      }
      omit(mask) {
        const shape = {};
        for (const key of util_js_1.util.objectKeys(this.shape)) {
          if (!mask[key]) {
            shape[key] = this.shape[key];
          }
        }
        return new _ZodObject(__spreadProps(__spreadValues({}, this._def), {
          shape: () => shape
        }));
      }
      /**
       * @deprecated
       */
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        for (const key of util_js_1.util.objectKeys(this.shape)) {
          const fieldSchema = this.shape[key];
          if (mask && !mask[key]) {
            newShape[key] = fieldSchema;
          } else {
            newShape[key] = fieldSchema.optional();
          }
        }
        return new _ZodObject(__spreadProps(__spreadValues({}, this._def), {
          shape: () => newShape
        }));
      }
      required(mask) {
        const newShape = {};
        for (const key of util_js_1.util.objectKeys(this.shape)) {
          if (mask && !mask[key]) {
            newShape[key] = this.shape[key];
          } else {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        }
        return new _ZodObject(__spreadProps(__spreadValues({}, this._def), {
          shape: () => newShape
        }));
      }
      keyof() {
        return createZodEnum(util_js_1.util.objectKeys(this.shape));
      }
    };
    exports.ZodObject = ZodObject;
    ZodObject.create = (shape, params) => {
      return new ZodObject(__spreadValues({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject
      }, processCreateParams(params)));
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject(__spreadValues({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject
      }, processCreateParams(params)));
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject(__spreadValues({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject
      }, processCreateParams(params)));
    };
    var ZodUnion = class extends ZodType {
      _parse(input) {
        const {
          ctx
        } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError_js_1.ZodError(result.ctx.common.issues));
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_union,
            unionErrors
          });
          return parseUtil_js_1.INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options.map((option) => __async(this, null, function* () {
            const childCtx = __spreadProps(__spreadValues({}, ctx), {
              common: __spreadProps(__spreadValues({}, ctx.common), {
                issues: []
              }),
              parent: null
            });
            return {
              result: yield option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          }))).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options) {
            const childCtx = __spreadProps(__spreadValues({}, ctx), {
              common: __spreadProps(__spreadValues({}, ctx.common), {
                issues: []
              }),
              parent: null
            });
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = {
                result,
                ctx: childCtx
              };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError_js_1.ZodError(issues2));
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_union,
            unionErrors
          });
          return parseUtil_js_1.INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    exports.ZodUnion = ZodUnion;
    ZodUnion.create = (types, params) => {
      return new ZodUnion(__spreadValues({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion
      }, processCreateParams(params)));
    };
    var getDiscriminator = (type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return util_js_1.util.objectValues(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else if (type instanceof ZodOptional) {
        return [void 0, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
      } else {
        return [];
      }
    };
    var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
      _parse(input) {
        const {
          ctx
        } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.object) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.object,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return parseUtil_js_1.INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      /**
       * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
       * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
       * have a different value for each object in the union.
       * @param discriminator the name of the discriminator property
       * @param types an array of object schemas
       * @param params
       */
      static create(discriminator, options, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues.length) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new _ZodDiscriminatedUnion(__spreadValues({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options,
          optionsMap
        }, processCreateParams(params)));
      }
    };
    exports.ZodDiscriminatedUnion = ZodDiscriminatedUnion;
    function mergeValues(a, b) {
      const aType = (0, util_js_1.getParsedType)(a);
      const bType = (0, util_js_1.getParsedType)(b);
      if (a === b) {
        return {
          valid: true,
          data: a
        };
      } else if (aType === util_js_1.ZodParsedType.object && bType === util_js_1.ZodParsedType.object) {
        const bKeys = util_js_1.util.objectKeys(b);
        const sharedKeys = util_js_1.util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = __spreadValues(__spreadValues({}, a), b);
        for (const key of sharedKeys) {
          const sharedValue = mergeValues(a[key], b[key]);
          if (!sharedValue.valid) {
            return {
              valid: false
            };
          }
          newObj[key] = sharedValue.data;
        }
        return {
          valid: true,
          data: newObj
        };
      } else if (aType === util_js_1.ZodParsedType.array && bType === util_js_1.ZodParsedType.array) {
        if (a.length !== b.length) {
          return {
            valid: false
          };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
          const itemA = a[index];
          const itemB = b[index];
          const sharedValue = mergeValues(itemA, itemB);
          if (!sharedValue.valid) {
            return {
              valid: false
            };
          }
          newArray.push(sharedValue.data);
        }
        return {
          valid: true,
          data: newArray
        };
      } else if (aType === util_js_1.ZodParsedType.date && bType === util_js_1.ZodParsedType.date && +a === +b) {
        return {
          valid: true,
          data: a
        };
      } else {
        return {
          valid: false
        };
      }
    }
    var ZodIntersection = class extends ZodType {
      _parse(input) {
        const {
          status,
          ctx
        } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if ((0, parseUtil_js_1.isAborted)(parsedLeft) || (0, parseUtil_js_1.isAborted)(parsedRight)) {
            return parseUtil_js_1.INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: ZodError_js_1.ZodIssueCode.invalid_intersection_types
            });
            return parseUtil_js_1.INVALID;
          }
          if ((0, parseUtil_js_1.isDirty)(parsedLeft) || (0, parseUtil_js_1.isDirty)(parsedRight)) {
            status.dirty();
          }
          return {
            status: status.value,
            value: merged.data
          };
        };
        if (ctx.common.async) {
          return Promise.all([this._def.left._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          })]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    exports.ZodIntersection = ZodIntersection;
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection(__spreadValues({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection
      }, processCreateParams(params)));
    };
    var ZodTuple = class _ZodTuple extends ZodType {
      _parse(input) {
        const {
          status,
          ctx
        } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.array) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.array,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return parseUtil_js_1.INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema) return null;
          return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return parseUtil_js_1.ParseStatus.mergeArray(status, results);
          });
        } else {
          return parseUtil_js_1.ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new _ZodTuple(__spreadProps(__spreadValues({}, this._def), {
          rest
        }));
      }
    };
    exports.ZodTuple = ZodTuple;
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple(__spreadValues({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null
      }, processCreateParams(params)));
    };
    var ZodRecord = class _ZodRecord extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const {
          status,
          ctx
        } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.object) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.object,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (ctx.common.async) {
          return parseUtil_js_1.ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return parseUtil_js_1.ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new _ZodRecord(__spreadValues({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord
          }, processCreateParams(third)));
        }
        return new _ZodRecord(__spreadValues({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord
        }, processCreateParams(second)));
      }
    };
    exports.ZodRecord = ZodRecord;
    var ZodMap = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const {
          status,
          ctx
        } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.map) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.map,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(() => __async(this, null, function* () {
            for (const pair of pairs) {
              const key = yield pair.key;
              const value = yield pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return parseUtil_js_1.INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return {
              status: status.value,
              value: finalMap
            };
          }));
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return parseUtil_js_1.INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return {
            status: status.value,
            value: finalMap
          };
        }
      }
    };
    exports.ZodMap = ZodMap;
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap(__spreadValues({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap
      }, processCreateParams(params)));
    };
    var ZodSet = class _ZodSet extends ZodType {
      _parse(input) {
        const {
          status,
          ctx
        } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.set) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.set,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: ZodError_js_1.ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            (0, parseUtil_js_1.addIssueToContext)(ctx, {
              code: ZodError_js_1.ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted") return parseUtil_js_1.INVALID;
            if (element.status === "dirty") status.dirty();
            parsedSet.add(element.value);
          }
          return {
            status: status.value,
            value: parsedSet
          };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new _ZodSet(__spreadProps(__spreadValues({}, this._def), {
          minSize: {
            value: minSize,
            message: errorUtil_js_1.errorUtil.toString(message)
          }
        }));
      }
      max(maxSize, message) {
        return new _ZodSet(__spreadProps(__spreadValues({}, this._def), {
          maxSize: {
            value: maxSize,
            message: errorUtil_js_1.errorUtil.toString(message)
          }
        }));
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    exports.ZodSet = ZodSet;
    ZodSet.create = (valueType, params) => {
      return new ZodSet(__spreadValues({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet
      }, processCreateParams(params)));
    };
    var ZodFunction = class _ZodFunction extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const {
          ctx
        } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.function) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.function,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        function makeArgsIssue(args, error) {
          return (0, parseUtil_js_1.makeIssue)({
            data: args,
            path: ctx.path,
            errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, (0, errors_js_1.getErrorMap)(), errors_js_1.defaultErrorMap].filter((x) => !!x),
            issueData: {
              code: ZodError_js_1.ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        function makeReturnsIssue(returns, error) {
          return (0, parseUtil_js_1.makeIssue)({
            data: returns,
            path: ctx.path,
            errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, (0, errors_js_1.getErrorMap)(), errors_js_1.defaultErrorMap].filter((x) => !!x),
            issueData: {
              code: ZodError_js_1.ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        const params = {
          errorMap: ctx.common.contextualErrorMap
        };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          const me = this;
          return (0, parseUtil_js_1.OK)(function(...args) {
            return __async(this, null, function* () {
              const error = new ZodError_js_1.ZodError([]);
              const parsedArgs = yield me._def.args.parseAsync(args, params).catch((e) => {
                error.addIssue(makeArgsIssue(args, e));
                throw error;
              });
              const result = yield Reflect.apply(fn, this, parsedArgs);
              const parsedReturns = yield me._def.returns._def.type.parseAsync(result, params).catch((e) => {
                error.addIssue(makeReturnsIssue(result, e));
                throw error;
              });
              return parsedReturns;
            });
          });
        } else {
          const me = this;
          return (0, parseUtil_js_1.OK)(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError_js_1.ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError_js_1.ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new _ZodFunction(__spreadProps(__spreadValues({}, this._def), {
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        }));
      }
      returns(returnType) {
        return new _ZodFunction(__spreadProps(__spreadValues({}, this._def), {
          returns: returnType
        }));
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new _ZodFunction(__spreadValues({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction
        }, processCreateParams(params)));
      }
    };
    exports.ZodFunction = ZodFunction;
    var ZodLazy = class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const {
          ctx
        } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
      }
    };
    exports.ZodLazy = ZodLazy;
    ZodLazy.create = (getter, params) => {
      return new ZodLazy(__spreadValues({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy
      }, processCreateParams(params)));
    };
    var ZodLiteral = class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_js_1.ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return parseUtil_js_1.INVALID;
        }
        return {
          status: "valid",
          value: input.data
        };
      }
      get value() {
        return this._def.value;
      }
    };
    exports.ZodLiteral = ZodLiteral;
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral(__spreadValues({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral
      }, processCreateParams(params)));
    };
    function createZodEnum(values, params) {
      return new ZodEnum(__spreadValues({
        values,
        typeName: ZodFirstPartyTypeKind.ZodEnum
      }, processCreateParams(params)));
    }
    var ZodEnum = class _ZodEnum extends ZodType {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            expected: util_js_1.util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodError_js_1.ZodIssueCode.invalid_type
          });
          return parseUtil_js_1.INVALID;
        }
        if (!this._cache) {
          this._cache = new Set(this._def.values);
        }
        if (!this._cache.has(input.data)) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_js_1.ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values, newDef = this._def) {
        return _ZodEnum.create(values, __spreadValues(__spreadValues({}, this._def), newDef));
      }
      exclude(values, newDef = this._def) {
        return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), __spreadValues(__spreadValues({}, this._def), newDef));
      }
    };
    exports.ZodEnum = ZodEnum;
    ZodEnum.create = createZodEnum;
    var ZodNativeEnum = class extends ZodType {
      _parse(input) {
        const nativeEnumValues = util_js_1.util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.string && ctx.parsedType !== util_js_1.ZodParsedType.number) {
          const expectedValues = util_js_1.util.objectValues(nativeEnumValues);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            expected: util_js_1.util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodError_js_1.ZodIssueCode.invalid_type
          });
          return parseUtil_js_1.INVALID;
        }
        if (!this._cache) {
          this._cache = new Set(util_js_1.util.getValidEnumValues(this._def.values));
        }
        if (!this._cache.has(input.data)) {
          const expectedValues = util_js_1.util.objectValues(nativeEnumValues);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            received: ctx.data,
            code: ZodError_js_1.ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return parseUtil_js_1.INVALID;
        }
        return (0, parseUtil_js_1.OK)(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    exports.ZodNativeEnum = ZodNativeEnum;
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum(__spreadValues({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum
      }, processCreateParams(params)));
    };
    var ZodPromise = class extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const {
          ctx
        } = this._processInputParams(input);
        if (ctx.parsedType !== util_js_1.ZodParsedType.promise && ctx.common.async === false) {
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.promise,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        const promisified = ctx.parsedType === util_js_1.ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return (0, parseUtil_js_1.OK)(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    exports.ZodPromise = ZodPromise;
    ZodPromise.create = (schema, params) => {
      return new ZodPromise(__spreadValues({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise
      }, processCreateParams(params)));
    };
    var ZodEffects = class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const {
          status,
          ctx
        } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
          addIssue: (arg) => {
            (0, parseUtil_js_1.addIssueToContext)(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(processed).then((processed2) => __async(this, null, function* () {
              if (status.value === "aborted") return parseUtil_js_1.INVALID;
              const result = yield this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
              if (result.status === "aborted") return parseUtil_js_1.INVALID;
              if (result.status === "dirty") return (0, parseUtil_js_1.DIRTY)(result.value);
              if (status.value === "dirty") return (0, parseUtil_js_1.DIRTY)(result.value);
              return result;
            }));
          } else {
            if (status.value === "aborted") return parseUtil_js_1.INVALID;
            const result = this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
            if (result.status === "aborted") return parseUtil_js_1.INVALID;
            if (result.status === "dirty") return (0, parseUtil_js_1.DIRTY)(result.value);
            if (status.value === "dirty") return (0, parseUtil_js_1.DIRTY)(result.value);
            return result;
          }
        }
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted") return parseUtil_js_1.INVALID;
            if (inner.status === "dirty") status.dirty();
            executeRefinement(inner.value);
            return {
              status: status.value,
              value: inner.value
            };
          } else {
            return this._def.schema._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }).then((inner) => {
              if (inner.status === "aborted") return parseUtil_js_1.INVALID;
              if (inner.status === "dirty") status.dirty();
              return executeRefinement(inner.value).then(() => {
                return {
                  status: status.value,
                  value: inner.value
                };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!(0, parseUtil_js_1.isValid)(base)) return parseUtil_js_1.INVALID;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return {
              status: status.value,
              value: result
            };
          } else {
            return this._def.schema._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }).then((base) => {
              if (!(0, parseUtil_js_1.isValid)(base)) return parseUtil_js_1.INVALID;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
                status: status.value,
                value: result
              }));
            });
          }
        }
        util_js_1.util.assertNever(effect);
      }
    };
    exports.ZodEffects = ZodEffects;
    exports.ZodTransformer = ZodEffects;
    ZodEffects.create = (schema, effect, params) => {
      return new ZodEffects(__spreadValues({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect
      }, processCreateParams(params)));
    };
    ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects(__spreadValues({
        schema,
        effect: {
          type: "preprocess",
          transform: preprocess
        },
        typeName: ZodFirstPartyTypeKind.ZodEffects
      }, processCreateParams(params)));
    };
    var ZodOptional = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_js_1.ZodParsedType.undefined) {
          return (0, parseUtil_js_1.OK)(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    exports.ZodOptional = ZodOptional;
    ZodOptional.create = (type, params) => {
      return new ZodOptional(__spreadValues({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional
      }, processCreateParams(params)));
    };
    var ZodNullable = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === util_js_1.ZodParsedType.null) {
          return (0, parseUtil_js_1.OK)(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    exports.ZodNullable = ZodNullable;
    ZodNullable.create = (type, params) => {
      return new ZodNullable(__spreadValues({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable
      }, processCreateParams(params)));
    };
    var ZodDefault = class extends ZodType {
      _parse(input) {
        const {
          ctx
        } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === util_js_1.ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    exports.ZodDefault = ZodDefault;
    ZodDefault.create = (type, params) => {
      return new ZodDefault(__spreadValues({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default
      }, processCreateParams(params)));
    };
    var ZodCatch = class extends ZodType {
      _parse(input) {
        const {
          ctx
        } = this._processInputParams(input);
        const newCtx = __spreadProps(__spreadValues({}, ctx), {
          common: __spreadProps(__spreadValues({}, ctx.common), {
            issues: []
          })
        });
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: __spreadValues({}, newCtx)
        });
        if ((0, parseUtil_js_1.isAsync)(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError_js_1.ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError_js_1.ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    exports.ZodCatch = ZodCatch;
    ZodCatch.create = (type, params) => {
      return new ZodCatch(__spreadValues({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch
      }, processCreateParams(params)));
    };
    var ZodNaN = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== util_js_1.ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          (0, parseUtil_js_1.addIssueToContext)(ctx, {
            code: ZodError_js_1.ZodIssueCode.invalid_type,
            expected: util_js_1.ZodParsedType.nan,
            received: ctx.parsedType
          });
          return parseUtil_js_1.INVALID;
        }
        return {
          status: "valid",
          value: input.data
        };
      }
    };
    exports.ZodNaN = ZodNaN;
    ZodNaN.create = (params) => {
      return new ZodNaN(__spreadValues({
        typeName: ZodFirstPartyTypeKind.ZodNaN
      }, processCreateParams(params)));
    };
    exports.BRAND = Symbol("zod_brand");
    var ZodBranded = class extends ZodType {
      _parse(input) {
        const {
          ctx
        } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    exports.ZodBranded = ZodBranded;
    var ZodPipeline = class _ZodPipeline extends ZodType {
      _parse(input) {
        const {
          status,
          ctx
        } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = () => __async(this, null, function* () {
            const inResult = yield this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted") return parseUtil_js_1.INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return (0, parseUtil_js_1.DIRTY)(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          });
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted") return parseUtil_js_1.INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new _ZodPipeline({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    exports.ZodPipeline = ZodPipeline;
    var ZodReadonly = class extends ZodType {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
          if ((0, parseUtil_js_1.isValid)(data)) {
            data.value = Object.freeze(data.value);
          }
          return data;
        };
        return (0, parseUtil_js_1.isAsync)(result) ? result.then((data) => freeze(data)) : freeze(result);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    exports.ZodReadonly = ZodReadonly;
    ZodReadonly.create = (type, params) => {
      return new ZodReadonly(__spreadValues({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly
      }, processCreateParams(params)));
    };
    function cleanParams(params, data) {
      const p = typeof params === "function" ? params(data) : typeof params === "string" ? {
        message: params
      } : params;
      const p2 = typeof p === "string" ? {
        message: p
      } : p;
      return p2;
    }
    function custom(check, _params = {}, fatal) {
      if (check) return ZodAny.create().superRefine((data, ctx) => {
        const r = check(data);
        if (r instanceof Promise) {
          return r.then((r2) => {
            if (!r2) {
              const params = cleanParams(_params, data);
              const _fatal = params.fatal ?? fatal ?? true;
              ctx.addIssue(__spreadProps(__spreadValues({
                code: "custom"
              }, params), {
                fatal: _fatal
              }));
            }
          });
        }
        if (!r) {
          const params = cleanParams(_params, data);
          const _fatal = params.fatal ?? fatal ?? true;
          ctx.addIssue(__spreadProps(__spreadValues({
            code: "custom"
          }, params), {
            fatal: _fatal
          }));
        }
        return;
      });
      return ZodAny.create();
    }
    exports.late = {
      object: ZodObject.lazycreate
    };
    var ZodFirstPartyTypeKind;
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind || (exports.ZodFirstPartyTypeKind = ZodFirstPartyTypeKind = {}));
    var instanceOfType = (cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => custom((data) => data instanceof cls, params);
    exports.instanceof = instanceOfType;
    var stringType = ZodString.create;
    exports.string = stringType;
    var numberType = ZodNumber.create;
    exports.number = numberType;
    var nanType = ZodNaN.create;
    exports.nan = nanType;
    var bigIntType = ZodBigInt.create;
    exports.bigint = bigIntType;
    var booleanType = ZodBoolean.create;
    exports.boolean = booleanType;
    var dateType = ZodDate.create;
    exports.date = dateType;
    var symbolType = ZodSymbol.create;
    exports.symbol = symbolType;
    var undefinedType = ZodUndefined.create;
    exports.undefined = undefinedType;
    var nullType = ZodNull.create;
    exports.null = nullType;
    var anyType = ZodAny.create;
    exports.any = anyType;
    var unknownType = ZodUnknown.create;
    exports.unknown = unknownType;
    var neverType = ZodNever.create;
    exports.never = neverType;
    var voidType = ZodVoid.create;
    exports.void = voidType;
    var arrayType = ZodArray.create;
    exports.array = arrayType;
    var objectType = ZodObject.create;
    exports.object = objectType;
    var strictObjectType = ZodObject.strictCreate;
    exports.strictObject = strictObjectType;
    var unionType = ZodUnion.create;
    exports.union = unionType;
    var discriminatedUnionType = ZodDiscriminatedUnion.create;
    exports.discriminatedUnion = discriminatedUnionType;
    var intersectionType = ZodIntersection.create;
    exports.intersection = intersectionType;
    var tupleType = ZodTuple.create;
    exports.tuple = tupleType;
    var recordType = ZodRecord.create;
    exports.record = recordType;
    var mapType = ZodMap.create;
    exports.map = mapType;
    var setType = ZodSet.create;
    exports.set = setType;
    var functionType = ZodFunction.create;
    exports.function = functionType;
    var lazyType = ZodLazy.create;
    exports.lazy = lazyType;
    var literalType = ZodLiteral.create;
    exports.literal = literalType;
    var enumType = ZodEnum.create;
    exports.enum = enumType;
    var nativeEnumType = ZodNativeEnum.create;
    exports.nativeEnum = nativeEnumType;
    var promiseType = ZodPromise.create;
    exports.promise = promiseType;
    var effectsType = ZodEffects.create;
    exports.effect = effectsType;
    exports.transformer = effectsType;
    var optionalType = ZodOptional.create;
    exports.optional = optionalType;
    var nullableType = ZodNullable.create;
    exports.nullable = nullableType;
    var preprocessType = ZodEffects.createWithPreprocess;
    exports.preprocess = preprocessType;
    var pipelineType = ZodPipeline.create;
    exports.pipeline = pipelineType;
    var ostring = () => stringType().optional();
    exports.ostring = ostring;
    var onumber = () => numberType().optional();
    exports.onumber = onumber;
    var oboolean = () => booleanType().optional();
    exports.oboolean = oboolean;
    exports.coerce = {
      string: (arg) => ZodString.create(__spreadProps(__spreadValues({}, arg), {
        coerce: true
      })),
      number: (arg) => ZodNumber.create(__spreadProps(__spreadValues({}, arg), {
        coerce: true
      })),
      boolean: (arg) => ZodBoolean.create(__spreadProps(__spreadValues({}, arg), {
        coerce: true
      })),
      bigint: (arg) => ZodBigInt.create(__spreadProps(__spreadValues({}, arg), {
        coerce: true
      })),
      date: (arg) => ZodDate.create(__spreadProps(__spreadValues({}, arg), {
        coerce: true
      }))
    };
    exports.NEVER = parseUtil_js_1.INVALID;
  }
});

// node_modules/zod/v3/external.cjs
var require_external = __commonJS({
  "node_modules/zod/v3/external.cjs"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
          enumerable: true,
          get: function() {
            return m[k];
          }
        };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __exportStar(require_errors2(), exports);
    __exportStar(require_parseUtil(), exports);
    __exportStar(require_typeAliases(), exports);
    __exportStar(require_util2(), exports);
    __exportStar(require_types3(), exports);
    __exportStar(require_ZodError(), exports);
  }
});

// node_modules/zod/index.cjs
var require_zod = __commonJS({
  "node_modules/zod/index.cjs"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
          enumerable: true,
          get: function() {
            return m[k];
          }
        };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
      });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.z = void 0;
    var z2 = __importStar(require_external());
    exports.z = z2;
    __exportStar(require_external(), exports);
    exports.default = z2;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/Options.js
var require_Options = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/Options.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getDefaultOptions = exports.defaultOptions = exports.jsonDescription = exports.ignoreOverride = void 0;
    exports.ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
    var jsonDescription = (jsonSchema, def) => {
      if (def.description) {
        try {
          return __spreadValues(__spreadValues({}, jsonSchema), JSON.parse(def.description));
        } catch {
        }
      }
      return jsonSchema;
    };
    exports.jsonDescription = jsonDescription;
    exports.defaultOptions = {
      name: void 0,
      $refStrategy: "root",
      basePath: ["#"],
      effectStrategy: "input",
      pipeStrategy: "all",
      dateStrategy: "format:date-time",
      mapStrategy: "entries",
      removeAdditionalStrategy: "passthrough",
      allowedAdditionalProperties: true,
      rejectedAdditionalProperties: false,
      definitionPath: "definitions",
      target: "jsonSchema7",
      strictUnions: false,
      definitions: {},
      errorMessages: false,
      markdownDescription: false,
      patternStrategy: "escape",
      applyRegexFlags: false,
      emailStrategy: "format:email",
      base64Strategy: "contentEncoding:base64",
      nameStrategy: "ref",
      openAiAnyTypeName: "OpenAiAnyType"
    };
    var getDefaultOptions = (options) => typeof options === "string" ? __spreadProps(__spreadValues({}, exports.defaultOptions), {
      name: options
    }) : __spreadValues(__spreadValues({}, exports.defaultOptions), options);
    exports.getDefaultOptions = getDefaultOptions;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/Refs.js
var require_Refs = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/Refs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getRefs = void 0;
    var Options_js_1 = require_Options();
    var getRefs = (options) => {
      const _options = (0, Options_js_1.getDefaultOptions)(options);
      const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
      return __spreadProps(__spreadValues({}, _options), {
        flags: {
          hasReferencedOpenAiAnyType: false
        },
        currentPath,
        propertyPath: void 0,
        seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [def._def, {
          def: def._def,
          path: [..._options.basePath, _options.definitionPath, name],
          // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
          jsonSchema: void 0
        }]))
      });
    };
    exports.getRefs = getRefs;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/errorMessages.js
var require_errorMessages = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/errorMessages.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.setResponseValueAndErrors = exports.addErrorMessage = void 0;
    function addErrorMessage(res, key, errorMessage, refs) {
      if (!refs?.errorMessages) return;
      if (errorMessage) {
        res.errorMessage = __spreadProps(__spreadValues({}, res.errorMessage), {
          [key]: errorMessage
        });
      }
    }
    exports.addErrorMessage = addErrorMessage;
    function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
      res[key] = value;
      addErrorMessage(res, key, errorMessage, refs);
    }
    exports.setResponseValueAndErrors = setResponseValueAndErrors;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/getRelativePath.js
var require_getRelativePath = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/getRelativePath.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getRelativePath = void 0;
    var getRelativePath = (pathA, pathB) => {
      let i = 0;
      for (; i < pathA.length && i < pathB.length; i++) {
        if (pathA[i] !== pathB[i]) break;
      }
      return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
    };
    exports.getRelativePath = getRelativePath;
  }
});

// node_modules/zod/v3/index.cjs
var require_v3 = __commonJS({
  "node_modules/zod/v3/index.cjs"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
          enumerable: true,
          get: function() {
            return m[k];
          }
        };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
      });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.z = void 0;
    var z2 = __importStar(require_external());
    exports.z = z2;
    __exportStar(require_external(), exports);
    exports.default = z2;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/any.js
var require_any = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/any.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseAnyDef = void 0;
    var getRelativePath_js_1 = require_getRelativePath();
    function parseAnyDef(refs) {
      if (refs.target !== "openAi") {
        return {};
      }
      const anyDefinitionPath = [...refs.basePath, refs.definitionPath, refs.openAiAnyTypeName];
      refs.flags.hasReferencedOpenAiAnyType = true;
      return {
        $ref: refs.$refStrategy === "relative" ? (0, getRelativePath_js_1.getRelativePath)(anyDefinitionPath, refs.currentPath) : anyDefinitionPath.join("/")
      };
    }
    exports.parseAnyDef = parseAnyDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/array.js
var require_array = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/array.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseArrayDef = void 0;
    var v3_1 = require_v3();
    var errorMessages_js_1 = require_errorMessages();
    var parseDef_js_1 = require_parseDef();
    function parseArrayDef(def, refs) {
      const res = {
        type: "array"
      };
      if (def.type?._def && def.type?._def?.typeName !== v3_1.ZodFirstPartyTypeKind.ZodAny) {
        res.items = (0, parseDef_js_1.parseDef)(def.type._def, __spreadProps(__spreadValues({}, refs), {
          currentPath: [...refs.currentPath, "items"]
        }));
      }
      if (def.minLength) {
        (0, errorMessages_js_1.setResponseValueAndErrors)(res, "minItems", def.minLength.value, def.minLength.message, refs);
      }
      if (def.maxLength) {
        (0, errorMessages_js_1.setResponseValueAndErrors)(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
      }
      if (def.exactLength) {
        (0, errorMessages_js_1.setResponseValueAndErrors)(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
        (0, errorMessages_js_1.setResponseValueAndErrors)(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
      }
      return res;
    }
    exports.parseArrayDef = parseArrayDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/bigint.js
var require_bigint = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/bigint.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseBigintDef = void 0;
    var errorMessages_js_1 = require_errorMessages();
    function parseBigintDef(def, refs) {
      const res = {
        type: "integer",
        format: "int64"
      };
      if (!def.checks) return res;
      for (const check of def.checks) {
        switch (check.kind) {
          case "min":
            if (refs.target === "jsonSchema7") {
              if (check.inclusive) {
                (0, errorMessages_js_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
              } else {
                (0, errorMessages_js_1.setResponseValueAndErrors)(res, "exclusiveMinimum", check.value, check.message, refs);
              }
            } else {
              if (!check.inclusive) {
                res.exclusiveMinimum = true;
              }
              (0, errorMessages_js_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
            }
            break;
          case "max":
            if (refs.target === "jsonSchema7") {
              if (check.inclusive) {
                (0, errorMessages_js_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
              } else {
                (0, errorMessages_js_1.setResponseValueAndErrors)(res, "exclusiveMaximum", check.value, check.message, refs);
              }
            } else {
              if (!check.inclusive) {
                res.exclusiveMaximum = true;
              }
              (0, errorMessages_js_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
            }
            break;
          case "multipleOf":
            (0, errorMessages_js_1.setResponseValueAndErrors)(res, "multipleOf", check.value, check.message, refs);
            break;
        }
      }
      return res;
    }
    exports.parseBigintDef = parseBigintDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/boolean.js
var require_boolean = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/boolean.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseBooleanDef = void 0;
    function parseBooleanDef() {
      return {
        type: "boolean"
      };
    }
    exports.parseBooleanDef = parseBooleanDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/branded.js
var require_branded = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/branded.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseBrandedDef = void 0;
    var parseDef_js_1 = require_parseDef();
    function parseBrandedDef(_def, refs) {
      return (0, parseDef_js_1.parseDef)(_def.type._def, refs);
    }
    exports.parseBrandedDef = parseBrandedDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/catch.js
var require_catch = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/catch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseCatchDef = void 0;
    var parseDef_js_1 = require_parseDef();
    var parseCatchDef = (def, refs) => {
      return (0, parseDef_js_1.parseDef)(def.innerType._def, refs);
    };
    exports.parseCatchDef = parseCatchDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/date.js
var require_date = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/date.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseDateDef = void 0;
    var errorMessages_js_1 = require_errorMessages();
    function parseDateDef(def, refs, overrideDateStrategy) {
      const strategy = overrideDateStrategy ?? refs.dateStrategy;
      if (Array.isArray(strategy)) {
        return {
          anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
        };
      }
      switch (strategy) {
        case "string":
        case "format:date-time":
          return {
            type: "string",
            format: "date-time"
          };
        case "format:date":
          return {
            type: "string",
            format: "date"
          };
        case "integer":
          return integerDateParser(def, refs);
      }
    }
    exports.parseDateDef = parseDateDef;
    var integerDateParser = (def, refs) => {
      const res = {
        type: "integer",
        format: "unix-time"
      };
      if (refs.target === "openApi3") {
        return res;
      }
      for (const check of def.checks) {
        switch (check.kind) {
          case "min":
            (0, errorMessages_js_1.setResponseValueAndErrors)(
              res,
              "minimum",
              check.value,
              // This is in milliseconds
              check.message,
              refs
            );
            break;
          case "max":
            (0, errorMessages_js_1.setResponseValueAndErrors)(
              res,
              "maximum",
              check.value,
              // This is in milliseconds
              check.message,
              refs
            );
            break;
        }
      }
      return res;
    };
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/default.js
var require_default = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/default.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseDefaultDef = void 0;
    var parseDef_js_1 = require_parseDef();
    function parseDefaultDef(_def, refs) {
      return __spreadProps(__spreadValues({}, (0, parseDef_js_1.parseDef)(_def.innerType._def, refs)), {
        default: _def.defaultValue()
      });
    }
    exports.parseDefaultDef = parseDefaultDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/effects.js
var require_effects = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/effects.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseEffectsDef = void 0;
    var parseDef_js_1 = require_parseDef();
    var any_js_1 = require_any();
    function parseEffectsDef(_def, refs) {
      return refs.effectStrategy === "input" ? (0, parseDef_js_1.parseDef)(_def.schema._def, refs) : (0, any_js_1.parseAnyDef)(refs);
    }
    exports.parseEffectsDef = parseEffectsDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/enum.js
var require_enum2 = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseEnumDef = void 0;
    function parseEnumDef(def) {
      return {
        type: "string",
        enum: Array.from(def.values)
      };
    }
    exports.parseEnumDef = parseEnumDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/intersection.js
var require_intersection = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/intersection.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseIntersectionDef = void 0;
    var parseDef_js_1 = require_parseDef();
    var isJsonSchema7AllOfType = (type) => {
      if ("type" in type && type.type === "string") return false;
      return "allOf" in type;
    };
    function parseIntersectionDef(def, refs) {
      const allOf = [(0, parseDef_js_1.parseDef)(def.left._def, __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.currentPath, "allOf", "0"]
      })), (0, parseDef_js_1.parseDef)(def.right._def, __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.currentPath, "allOf", "1"]
      }))].filter((x) => !!x);
      let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? {
        unevaluatedProperties: false
      } : void 0;
      const mergedAllOf = [];
      allOf.forEach((schema) => {
        if (isJsonSchema7AllOfType(schema)) {
          mergedAllOf.push(...schema.allOf);
          if (schema.unevaluatedProperties === void 0) {
            unevaluatedProperties = void 0;
          }
        } else {
          let nestedSchema = schema;
          if ("additionalProperties" in schema && schema.additionalProperties === false) {
            const _a2 = schema, {
              additionalProperties
            } = _a2, rest = __objRest(_a2, [
              "additionalProperties"
            ]);
            nestedSchema = rest;
          } else {
            unevaluatedProperties = void 0;
          }
          mergedAllOf.push(nestedSchema);
        }
      });
      return mergedAllOf.length ? __spreadValues({
        allOf: mergedAllOf
      }, unevaluatedProperties) : void 0;
    }
    exports.parseIntersectionDef = parseIntersectionDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/literal.js
var require_literal = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/literal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseLiteralDef = void 0;
    function parseLiteralDef(def, refs) {
      const parsedType = typeof def.value;
      if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
        return {
          type: Array.isArray(def.value) ? "array" : "object"
        };
      }
      if (refs.target === "openApi3") {
        return {
          type: parsedType === "bigint" ? "integer" : parsedType,
          enum: [def.value]
        };
      }
      return {
        type: parsedType === "bigint" ? "integer" : parsedType,
        const: def.value
      };
    }
    exports.parseLiteralDef = parseLiteralDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/string.js
var require_string = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseStringDef = exports.zodPatterns = void 0;
    var errorMessages_js_1 = require_errorMessages();
    var emojiRegex = void 0;
    exports.zodPatterns = {
      /**
       * `c` was changed to `[cC]` to replicate /i flag
       */
      cuid: /^[cC][^\s-]{8,}$/,
      cuid2: /^[0-9a-z]+$/,
      ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
      /**
       * `a-z` was added to replicate /i flag
       */
      email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
      /**
       * Constructed a valid Unicode RegExp
       *
       * Lazily instantiate since this type of regex isn't supported
       * in all envs (e.g. React Native).
       *
       * See:
       * https://github.com/colinhacks/zod/issues/2433
       * Fix in Zod:
       * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
       */
      emoji: () => {
        if (emojiRegex === void 0) {
          emojiRegex = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
        }
        return emojiRegex;
      },
      /**
       * Unused
       */
      uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
      /**
       * Unused
       */
      ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
      ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
      /**
       * Unused
       */
      ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
      ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
      base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
      base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
      nanoid: /^[a-zA-Z0-9_-]{21}$/,
      jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
    };
    function parseStringDef(def, refs) {
      const res = {
        type: "string"
      };
      if (def.checks) {
        for (const check of def.checks) {
          switch (check.kind) {
            case "min":
              (0, errorMessages_js_1.setResponseValueAndErrors)(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
              break;
            case "max":
              (0, errorMessages_js_1.setResponseValueAndErrors)(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
              break;
            case "email":
              switch (refs.emailStrategy) {
                case "format:email":
                  addFormat(res, "email", check.message, refs);
                  break;
                case "format:idn-email":
                  addFormat(res, "idn-email", check.message, refs);
                  break;
                case "pattern:zod":
                  addPattern(res, exports.zodPatterns.email, check.message, refs);
                  break;
              }
              break;
            case "url":
              addFormat(res, "uri", check.message, refs);
              break;
            case "uuid":
              addFormat(res, "uuid", check.message, refs);
              break;
            case "regex":
              addPattern(res, check.regex, check.message, refs);
              break;
            case "cuid":
              addPattern(res, exports.zodPatterns.cuid, check.message, refs);
              break;
            case "cuid2":
              addPattern(res, exports.zodPatterns.cuid2, check.message, refs);
              break;
            case "startsWith":
              addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
              break;
            case "endsWith":
              addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
              break;
            case "datetime":
              addFormat(res, "date-time", check.message, refs);
              break;
            case "date":
              addFormat(res, "date", check.message, refs);
              break;
            case "time":
              addFormat(res, "time", check.message, refs);
              break;
            case "duration":
              addFormat(res, "duration", check.message, refs);
              break;
            case "length":
              (0, errorMessages_js_1.setResponseValueAndErrors)(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
              (0, errorMessages_js_1.setResponseValueAndErrors)(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
              break;
            case "includes": {
              addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
              break;
            }
            case "ip": {
              if (check.version !== "v6") {
                addFormat(res, "ipv4", check.message, refs);
              }
              if (check.version !== "v4") {
                addFormat(res, "ipv6", check.message, refs);
              }
              break;
            }
            case "base64url":
              addPattern(res, exports.zodPatterns.base64url, check.message, refs);
              break;
            case "jwt":
              addPattern(res, exports.zodPatterns.jwt, check.message, refs);
              break;
            case "cidr": {
              if (check.version !== "v6") {
                addPattern(res, exports.zodPatterns.ipv4Cidr, check.message, refs);
              }
              if (check.version !== "v4") {
                addPattern(res, exports.zodPatterns.ipv6Cidr, check.message, refs);
              }
              break;
            }
            case "emoji":
              addPattern(res, exports.zodPatterns.emoji(), check.message, refs);
              break;
            case "ulid": {
              addPattern(res, exports.zodPatterns.ulid, check.message, refs);
              break;
            }
            case "base64": {
              switch (refs.base64Strategy) {
                case "format:binary": {
                  addFormat(res, "binary", check.message, refs);
                  break;
                }
                case "contentEncoding:base64": {
                  (0, errorMessages_js_1.setResponseValueAndErrors)(res, "contentEncoding", "base64", check.message, refs);
                  break;
                }
                case "pattern:zod": {
                  addPattern(res, exports.zodPatterns.base64, check.message, refs);
                  break;
                }
              }
              break;
            }
            case "nanoid": {
              addPattern(res, exports.zodPatterns.nanoid, check.message, refs);
            }
            case "toLowerCase":
            case "toUpperCase":
            case "trim":
              break;
            default:
              /* @__PURE__ */ ((_) => {
              })(check);
          }
        }
      }
      return res;
    }
    exports.parseStringDef = parseStringDef;
    function escapeLiteralCheckValue(literal, refs) {
      return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
    }
    var ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
    function escapeNonAlphaNumeric(source) {
      let result = "";
      for (let i = 0; i < source.length; i++) {
        if (!ALPHA_NUMERIC.has(source[i])) {
          result += "\\";
        }
        result += source[i];
      }
      return result;
    }
    function addFormat(schema, value, message, refs) {
      if (schema.format || schema.anyOf?.some((x) => x.format)) {
        if (!schema.anyOf) {
          schema.anyOf = [];
        }
        if (schema.format) {
          schema.anyOf.push(__spreadValues({
            format: schema.format
          }, schema.errorMessage && refs.errorMessages && {
            errorMessage: {
              format: schema.errorMessage.format
            }
          }));
          delete schema.format;
          if (schema.errorMessage) {
            delete schema.errorMessage.format;
            if (Object.keys(schema.errorMessage).length === 0) {
              delete schema.errorMessage;
            }
          }
        }
        schema.anyOf.push(__spreadValues({
          format: value
        }, message && refs.errorMessages && {
          errorMessage: {
            format: message
          }
        }));
      } else {
        (0, errorMessages_js_1.setResponseValueAndErrors)(schema, "format", value, message, refs);
      }
    }
    function addPattern(schema, regex, message, refs) {
      if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
        if (!schema.allOf) {
          schema.allOf = [];
        }
        if (schema.pattern) {
          schema.allOf.push(__spreadValues({
            pattern: schema.pattern
          }, schema.errorMessage && refs.errorMessages && {
            errorMessage: {
              pattern: schema.errorMessage.pattern
            }
          }));
          delete schema.pattern;
          if (schema.errorMessage) {
            delete schema.errorMessage.pattern;
            if (Object.keys(schema.errorMessage).length === 0) {
              delete schema.errorMessage;
            }
          }
        }
        schema.allOf.push(__spreadValues({
          pattern: stringifyRegExpWithFlags(regex, refs)
        }, message && refs.errorMessages && {
          errorMessage: {
            pattern: message
          }
        }));
      } else {
        (0, errorMessages_js_1.setResponseValueAndErrors)(schema, "pattern", stringifyRegExpWithFlags(regex, refs), message, refs);
      }
    }
    function stringifyRegExpWithFlags(regex, refs) {
      if (!refs.applyRegexFlags || !regex.flags) {
        return regex.source;
      }
      const flags = {
        i: regex.flags.includes("i"),
        m: regex.flags.includes("m"),
        s: regex.flags.includes("s")
        // `.` matches newlines
      };
      const source = flags.i ? regex.source.toLowerCase() : regex.source;
      let pattern = "";
      let isEscaped = false;
      let inCharGroup = false;
      let inCharRange = false;
      for (let i = 0; i < source.length; i++) {
        if (isEscaped) {
          pattern += source[i];
          isEscaped = false;
          continue;
        }
        if (flags.i) {
          if (inCharGroup) {
            if (source[i].match(/[a-z]/)) {
              if (inCharRange) {
                pattern += source[i];
                pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
                inCharRange = false;
              } else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
                pattern += source[i];
                inCharRange = true;
              } else {
                pattern += `${source[i]}${source[i].toUpperCase()}`;
              }
              continue;
            }
          } else if (source[i].match(/[a-z]/)) {
            pattern += `[${source[i]}${source[i].toUpperCase()}]`;
            continue;
          }
        }
        if (flags.m) {
          if (source[i] === "^") {
            pattern += `(^|(?<=[\r
]))`;
            continue;
          } else if (source[i] === "$") {
            pattern += `($|(?=[\r
]))`;
            continue;
          }
        }
        if (flags.s && source[i] === ".") {
          pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
          continue;
        }
        pattern += source[i];
        if (source[i] === "\\") {
          isEscaped = true;
        } else if (inCharGroup && source[i] === "]") {
          inCharGroup = false;
        } else if (!inCharGroup && source[i] === "[") {
          inCharGroup = true;
        }
      }
      try {
        new RegExp(pattern);
      } catch {
        console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
        return regex.source;
      }
      return pattern;
    }
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/record.js
var require_record = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/record.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseRecordDef = void 0;
    var v3_1 = require_v3();
    var parseDef_js_1 = require_parseDef();
    var string_js_1 = require_string();
    var branded_js_1 = require_branded();
    var any_js_1 = require_any();
    function parseRecordDef(def, refs) {
      if (refs.target === "openAi") {
        console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
      }
      if (refs.target === "openApi3" && def.keyType?._def.typeName === v3_1.ZodFirstPartyTypeKind.ZodEnum) {
        return {
          type: "object",
          required: def.keyType._def.values,
          properties: def.keyType._def.values.reduce((acc, key) => __spreadProps(__spreadValues({}, acc), {
            [key]: (0, parseDef_js_1.parseDef)(def.valueType._def, __spreadProps(__spreadValues({}, refs), {
              currentPath: [...refs.currentPath, "properties", key]
            })) ?? (0, any_js_1.parseAnyDef)(refs)
          }), {}),
          additionalProperties: refs.rejectedAdditionalProperties
        };
      }
      const schema = {
        type: "object",
        additionalProperties: (0, parseDef_js_1.parseDef)(def.valueType._def, __spreadProps(__spreadValues({}, refs), {
          currentPath: [...refs.currentPath, "additionalProperties"]
        })) ?? refs.allowedAdditionalProperties
      };
      if (refs.target === "openApi3") {
        return schema;
      }
      if (def.keyType?._def.typeName === v3_1.ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
        const _a2 = (0, string_js_1.parseStringDef)(def.keyType._def, refs), {
          type
        } = _a2, keyType = __objRest(_a2, [
          "type"
        ]);
        return __spreadProps(__spreadValues({}, schema), {
          propertyNames: keyType
        });
      } else if (def.keyType?._def.typeName === v3_1.ZodFirstPartyTypeKind.ZodEnum) {
        return __spreadProps(__spreadValues({}, schema), {
          propertyNames: {
            enum: def.keyType._def.values
          }
        });
      } else if (def.keyType?._def.typeName === v3_1.ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === v3_1.ZodFirstPartyTypeKind.ZodString && def.keyType._def.type._def.checks?.length) {
        const _b = (0, branded_js_1.parseBrandedDef)(def.keyType._def, refs), {
          type
        } = _b, keyType = __objRest(_b, [
          "type"
        ]);
        return __spreadProps(__spreadValues({}, schema), {
          propertyNames: keyType
        });
      }
      return schema;
    }
    exports.parseRecordDef = parseRecordDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/map.js
var require_map = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/map.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseMapDef = void 0;
    var parseDef_js_1 = require_parseDef();
    var record_js_1 = require_record();
    var any_js_1 = require_any();
    function parseMapDef(def, refs) {
      if (refs.mapStrategy === "record") {
        return (0, record_js_1.parseRecordDef)(def, refs);
      }
      const keys = (0, parseDef_js_1.parseDef)(def.keyType._def, __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.currentPath, "items", "items", "0"]
      })) || (0, any_js_1.parseAnyDef)(refs);
      const values = (0, parseDef_js_1.parseDef)(def.valueType._def, __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.currentPath, "items", "items", "1"]
      })) || (0, any_js_1.parseAnyDef)(refs);
      return {
        type: "array",
        maxItems: 125,
        items: {
          type: "array",
          items: [keys, values],
          minItems: 2,
          maxItems: 2
        }
      };
    }
    exports.parseMapDef = parseMapDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/nativeEnum.js
var require_nativeEnum = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/nativeEnum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseNativeEnumDef = void 0;
    function parseNativeEnumDef(def) {
      const object = def.values;
      const actualKeys = Object.keys(def.values).filter((key) => {
        return typeof object[object[key]] !== "number";
      });
      const actualValues = actualKeys.map((key) => object[key]);
      const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
      return {
        type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
        enum: actualValues
      };
    }
    exports.parseNativeEnumDef = parseNativeEnumDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/never.js
var require_never = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/never.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseNeverDef = void 0;
    var any_js_1 = require_any();
    function parseNeverDef(refs) {
      return refs.target === "openAi" ? void 0 : {
        not: (0, any_js_1.parseAnyDef)(__spreadProps(__spreadValues({}, refs), {
          currentPath: [...refs.currentPath, "not"]
        }))
      };
    }
    exports.parseNeverDef = parseNeverDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/null.js
var require_null = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/null.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseNullDef = void 0;
    function parseNullDef(refs) {
      return refs.target === "openApi3" ? {
        enum: ["null"],
        nullable: true
      } : {
        type: "null"
      };
    }
    exports.parseNullDef = parseNullDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/union.js
var require_union = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/union.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseUnionDef = exports.primitiveMappings = void 0;
    var parseDef_js_1 = require_parseDef();
    exports.primitiveMappings = {
      ZodString: "string",
      ZodNumber: "number",
      ZodBigInt: "integer",
      ZodBoolean: "boolean",
      ZodNull: "null"
    };
    function parseUnionDef(def, refs) {
      if (refs.target === "openApi3") return asAnyOf(def, refs);
      const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
      if (options.every((x) => x._def.typeName in exports.primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
        const types = options.reduce((types2, x) => {
          const type = exports.primitiveMappings[x._def.typeName];
          return type && !types2.includes(type) ? [...types2, type] : types2;
        }, []);
        return {
          type: types.length > 1 ? types : types[0]
        };
      } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
        const types = options.reduce((acc, x) => {
          const type = typeof x._def.value;
          switch (type) {
            case "string":
            case "number":
            case "boolean":
              return [...acc, type];
            case "bigint":
              return [...acc, "integer"];
            case "object":
              if (x._def.value === null) return [...acc, "null"];
            case "symbol":
            case "undefined":
            case "function":
            default:
              return acc;
          }
        }, []);
        if (types.length === options.length) {
          const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
          return {
            type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
            enum: options.reduce((acc, x) => {
              return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
            }, [])
          };
        }
      } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
        return {
          type: "string",
          enum: options.reduce((acc, x) => [...acc, ...x._def.values.filter((x2) => !acc.includes(x2))], [])
        };
      }
      return asAnyOf(def, refs);
    }
    exports.parseUnionDef = parseUnionDef;
    var asAnyOf = (def, refs) => {
      const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => (0, parseDef_js_1.parseDef)(x._def, __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.currentPath, "anyOf", `${i}`]
      }))).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
      return anyOf.length ? {
        anyOf
      } : void 0;
    };
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/nullable.js
var require_nullable = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/nullable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseNullableDef = void 0;
    var parseDef_js_1 = require_parseDef();
    var union_js_1 = require_union();
    function parseNullableDef(def, refs) {
      if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
        if (refs.target === "openApi3") {
          return {
            type: union_js_1.primitiveMappings[def.innerType._def.typeName],
            nullable: true
          };
        }
        return {
          type: [union_js_1.primitiveMappings[def.innerType._def.typeName], "null"]
        };
      }
      if (refs.target === "openApi3") {
        const base2 = (0, parseDef_js_1.parseDef)(def.innerType._def, __spreadProps(__spreadValues({}, refs), {
          currentPath: [...refs.currentPath]
        }));
        if (base2 && "$ref" in base2) return {
          allOf: [base2],
          nullable: true
        };
        return base2 && __spreadProps(__spreadValues({}, base2), {
          nullable: true
        });
      }
      const base = (0, parseDef_js_1.parseDef)(def.innerType._def, __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.currentPath, "anyOf", "0"]
      }));
      return base && {
        anyOf: [base, {
          type: "null"
        }]
      };
    }
    exports.parseNullableDef = parseNullableDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/number.js
var require_number = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/number.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseNumberDef = void 0;
    var errorMessages_js_1 = require_errorMessages();
    function parseNumberDef(def, refs) {
      const res = {
        type: "number"
      };
      if (!def.checks) return res;
      for (const check of def.checks) {
        switch (check.kind) {
          case "int":
            res.type = "integer";
            (0, errorMessages_js_1.addErrorMessage)(res, "type", check.message, refs);
            break;
          case "min":
            if (refs.target === "jsonSchema7") {
              if (check.inclusive) {
                (0, errorMessages_js_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
              } else {
                (0, errorMessages_js_1.setResponseValueAndErrors)(res, "exclusiveMinimum", check.value, check.message, refs);
              }
            } else {
              if (!check.inclusive) {
                res.exclusiveMinimum = true;
              }
              (0, errorMessages_js_1.setResponseValueAndErrors)(res, "minimum", check.value, check.message, refs);
            }
            break;
          case "max":
            if (refs.target === "jsonSchema7") {
              if (check.inclusive) {
                (0, errorMessages_js_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
              } else {
                (0, errorMessages_js_1.setResponseValueAndErrors)(res, "exclusiveMaximum", check.value, check.message, refs);
              }
            } else {
              if (!check.inclusive) {
                res.exclusiveMaximum = true;
              }
              (0, errorMessages_js_1.setResponseValueAndErrors)(res, "maximum", check.value, check.message, refs);
            }
            break;
          case "multipleOf":
            (0, errorMessages_js_1.setResponseValueAndErrors)(res, "multipleOf", check.value, check.message, refs);
            break;
        }
      }
      return res;
    }
    exports.parseNumberDef = parseNumberDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/object.js
var require_object = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/object.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseObjectDef = void 0;
    var parseDef_js_1 = require_parseDef();
    function parseObjectDef(def, refs) {
      const forceOptionalIntoNullable = refs.target === "openAi";
      const result = {
        type: "object",
        properties: {}
      };
      const required = [];
      const shape = def.shape();
      for (const propName in shape) {
        let propDef = shape[propName];
        if (propDef === void 0 || propDef._def === void 0) {
          continue;
        }
        let propOptional = safeIsOptional(propDef);
        if (propOptional && forceOptionalIntoNullable) {
          if (propDef._def.typeName === "ZodOptional") {
            propDef = propDef._def.innerType;
          }
          if (!propDef.isNullable()) {
            propDef = propDef.nullable();
          }
          propOptional = false;
        }
        const parsedDef = (0, parseDef_js_1.parseDef)(propDef._def, __spreadProps(__spreadValues({}, refs), {
          currentPath: [...refs.currentPath, "properties", propName],
          propertyPath: [...refs.currentPath, "properties", propName]
        }));
        if (parsedDef === void 0) {
          continue;
        }
        result.properties[propName] = parsedDef;
        if (!propOptional) {
          required.push(propName);
        }
      }
      if (required.length) {
        result.required = required;
      }
      const additionalProperties = decideAdditionalProperties(def, refs);
      if (additionalProperties !== void 0) {
        result.additionalProperties = additionalProperties;
      }
      return result;
    }
    exports.parseObjectDef = parseObjectDef;
    function decideAdditionalProperties(def, refs) {
      if (def.catchall._def.typeName !== "ZodNever") {
        return (0, parseDef_js_1.parseDef)(def.catchall._def, __spreadProps(__spreadValues({}, refs), {
          currentPath: [...refs.currentPath, "additionalProperties"]
        }));
      }
      switch (def.unknownKeys) {
        case "passthrough":
          return refs.allowedAdditionalProperties;
        case "strict":
          return refs.rejectedAdditionalProperties;
        case "strip":
          return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
      }
    }
    function safeIsOptional(schema) {
      try {
        return schema.isOptional();
      } catch {
        return true;
      }
    }
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/optional.js
var require_optional = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/optional.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseOptionalDef = void 0;
    var parseDef_js_1 = require_parseDef();
    var any_js_1 = require_any();
    var parseOptionalDef = (def, refs) => {
      if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
        return (0, parseDef_js_1.parseDef)(def.innerType._def, refs);
      }
      const innerSchema = (0, parseDef_js_1.parseDef)(def.innerType._def, __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.currentPath, "anyOf", "1"]
      }));
      return innerSchema ? {
        anyOf: [{
          not: (0, any_js_1.parseAnyDef)(refs)
        }, innerSchema]
      } : (0, any_js_1.parseAnyDef)(refs);
    };
    exports.parseOptionalDef = parseOptionalDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/pipeline.js
var require_pipeline = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/pipeline.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parsePipelineDef = void 0;
    var parseDef_js_1 = require_parseDef();
    var parsePipelineDef = (def, refs) => {
      if (refs.pipeStrategy === "input") {
        return (0, parseDef_js_1.parseDef)(def.in._def, refs);
      } else if (refs.pipeStrategy === "output") {
        return (0, parseDef_js_1.parseDef)(def.out._def, refs);
      }
      const a = (0, parseDef_js_1.parseDef)(def.in._def, __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.currentPath, "allOf", "0"]
      }));
      const b = (0, parseDef_js_1.parseDef)(def.out._def, __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
      }));
      return {
        allOf: [a, b].filter((x) => x !== void 0)
      };
    };
    exports.parsePipelineDef = parsePipelineDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/promise.js
var require_promise = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/promise.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parsePromiseDef = void 0;
    var parseDef_js_1 = require_parseDef();
    function parsePromiseDef(def, refs) {
      return (0, parseDef_js_1.parseDef)(def.type._def, refs);
    }
    exports.parsePromiseDef = parsePromiseDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/set.js
var require_set = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/set.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseSetDef = void 0;
    var errorMessages_js_1 = require_errorMessages();
    var parseDef_js_1 = require_parseDef();
    function parseSetDef(def, refs) {
      const items = (0, parseDef_js_1.parseDef)(def.valueType._def, __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.currentPath, "items"]
      }));
      const schema = {
        type: "array",
        uniqueItems: true,
        items
      };
      if (def.minSize) {
        (0, errorMessages_js_1.setResponseValueAndErrors)(schema, "minItems", def.minSize.value, def.minSize.message, refs);
      }
      if (def.maxSize) {
        (0, errorMessages_js_1.setResponseValueAndErrors)(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
      }
      return schema;
    }
    exports.parseSetDef = parseSetDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/tuple.js
var require_tuple = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/tuple.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseTupleDef = void 0;
    var parseDef_js_1 = require_parseDef();
    function parseTupleDef(def, refs) {
      if (def.rest) {
        return {
          type: "array",
          minItems: def.items.length,
          items: def.items.map((x, i) => (0, parseDef_js_1.parseDef)(x._def, __spreadProps(__spreadValues({}, refs), {
            currentPath: [...refs.currentPath, "items", `${i}`]
          }))).reduce((acc, x) => x === void 0 ? acc : [...acc, x], []),
          additionalItems: (0, parseDef_js_1.parseDef)(def.rest._def, __spreadProps(__spreadValues({}, refs), {
            currentPath: [...refs.currentPath, "additionalItems"]
          }))
        };
      } else {
        return {
          type: "array",
          minItems: def.items.length,
          maxItems: def.items.length,
          items: def.items.map((x, i) => (0, parseDef_js_1.parseDef)(x._def, __spreadProps(__spreadValues({}, refs), {
            currentPath: [...refs.currentPath, "items", `${i}`]
          }))).reduce((acc, x) => x === void 0 ? acc : [...acc, x], [])
        };
      }
    }
    exports.parseTupleDef = parseTupleDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/undefined.js
var require_undefined = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/undefined.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseUndefinedDef = void 0;
    var any_js_1 = require_any();
    function parseUndefinedDef(refs) {
      return {
        not: (0, any_js_1.parseAnyDef)(refs)
      };
    }
    exports.parseUndefinedDef = parseUndefinedDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/unknown.js
var require_unknown = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/unknown.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseUnknownDef = void 0;
    var any_js_1 = require_any();
    function parseUnknownDef(refs) {
      return (0, any_js_1.parseAnyDef)(refs);
    }
    exports.parseUnknownDef = parseUnknownDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parsers/readonly.js
var require_readonly = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parsers/readonly.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseReadonlyDef = void 0;
    var parseDef_js_1 = require_parseDef();
    var parseReadonlyDef = (def, refs) => {
      return (0, parseDef_js_1.parseDef)(def.innerType._def, refs);
    };
    exports.parseReadonlyDef = parseReadonlyDef;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/selectParser.js
var require_selectParser = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/selectParser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.selectParser = void 0;
    var v3_1 = require_v3();
    var any_js_1 = require_any();
    var array_js_1 = require_array();
    var bigint_js_1 = require_bigint();
    var boolean_js_1 = require_boolean();
    var branded_js_1 = require_branded();
    var catch_js_1 = require_catch();
    var date_js_1 = require_date();
    var default_js_1 = require_default();
    var effects_js_1 = require_effects();
    var enum_js_1 = require_enum2();
    var intersection_js_1 = require_intersection();
    var literal_js_1 = require_literal();
    var map_js_1 = require_map();
    var nativeEnum_js_1 = require_nativeEnum();
    var never_js_1 = require_never();
    var null_js_1 = require_null();
    var nullable_js_1 = require_nullable();
    var number_js_1 = require_number();
    var object_js_1 = require_object();
    var optional_js_1 = require_optional();
    var pipeline_js_1 = require_pipeline();
    var promise_js_1 = require_promise();
    var record_js_1 = require_record();
    var set_js_1 = require_set();
    var string_js_1 = require_string();
    var tuple_js_1 = require_tuple();
    var undefined_js_1 = require_undefined();
    var union_js_1 = require_union();
    var unknown_js_1 = require_unknown();
    var readonly_js_1 = require_readonly();
    var selectParser = (def, typeName, refs) => {
      switch (typeName) {
        case v3_1.ZodFirstPartyTypeKind.ZodString:
          return (0, string_js_1.parseStringDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodNumber:
          return (0, number_js_1.parseNumberDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodObject:
          return (0, object_js_1.parseObjectDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodBigInt:
          return (0, bigint_js_1.parseBigintDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodBoolean:
          return (0, boolean_js_1.parseBooleanDef)();
        case v3_1.ZodFirstPartyTypeKind.ZodDate:
          return (0, date_js_1.parseDateDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodUndefined:
          return (0, undefined_js_1.parseUndefinedDef)(refs);
        case v3_1.ZodFirstPartyTypeKind.ZodNull:
          return (0, null_js_1.parseNullDef)(refs);
        case v3_1.ZodFirstPartyTypeKind.ZodArray:
          return (0, array_js_1.parseArrayDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodUnion:
        case v3_1.ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
          return (0, union_js_1.parseUnionDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodIntersection:
          return (0, intersection_js_1.parseIntersectionDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodTuple:
          return (0, tuple_js_1.parseTupleDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodRecord:
          return (0, record_js_1.parseRecordDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodLiteral:
          return (0, literal_js_1.parseLiteralDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodEnum:
          return (0, enum_js_1.parseEnumDef)(def);
        case v3_1.ZodFirstPartyTypeKind.ZodNativeEnum:
          return (0, nativeEnum_js_1.parseNativeEnumDef)(def);
        case v3_1.ZodFirstPartyTypeKind.ZodNullable:
          return (0, nullable_js_1.parseNullableDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodOptional:
          return (0, optional_js_1.parseOptionalDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodMap:
          return (0, map_js_1.parseMapDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodSet:
          return (0, set_js_1.parseSetDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodLazy:
          return () => def.getter()._def;
        case v3_1.ZodFirstPartyTypeKind.ZodPromise:
          return (0, promise_js_1.parsePromiseDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodNaN:
        case v3_1.ZodFirstPartyTypeKind.ZodNever:
          return (0, never_js_1.parseNeverDef)(refs);
        case v3_1.ZodFirstPartyTypeKind.ZodEffects:
          return (0, effects_js_1.parseEffectsDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodAny:
          return (0, any_js_1.parseAnyDef)(refs);
        case v3_1.ZodFirstPartyTypeKind.ZodUnknown:
          return (0, unknown_js_1.parseUnknownDef)(refs);
        case v3_1.ZodFirstPartyTypeKind.ZodDefault:
          return (0, default_js_1.parseDefaultDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodBranded:
          return (0, branded_js_1.parseBrandedDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodReadonly:
          return (0, readonly_js_1.parseReadonlyDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodCatch:
          return (0, catch_js_1.parseCatchDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodPipeline:
          return (0, pipeline_js_1.parsePipelineDef)(def, refs);
        case v3_1.ZodFirstPartyTypeKind.ZodFunction:
        case v3_1.ZodFirstPartyTypeKind.ZodVoid:
        case v3_1.ZodFirstPartyTypeKind.ZodSymbol:
          return void 0;
        default:
          return /* @__PURE__ */ ((_) => void 0)(typeName);
      }
    };
    exports.selectParser = selectParser;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parseDef.js
var require_parseDef = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parseDef.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseDef = void 0;
    var Options_js_1 = require_Options();
    var selectParser_js_1 = require_selectParser();
    var getRelativePath_js_1 = require_getRelativePath();
    var any_js_1 = require_any();
    function parseDef(def, refs, forceResolution = false) {
      const seenItem = refs.seen.get(def);
      if (refs.override) {
        const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
        if (overrideResult !== Options_js_1.ignoreOverride) {
          return overrideResult;
        }
      }
      if (seenItem && !forceResolution) {
        const seenSchema = get$ref(seenItem, refs);
        if (seenSchema !== void 0) {
          return seenSchema;
        }
      }
      const newItem = {
        def,
        path: refs.currentPath,
        jsonSchema: void 0
      };
      refs.seen.set(def, newItem);
      const jsonSchemaOrGetter = (0, selectParser_js_1.selectParser)(def, def.typeName, refs);
      const jsonSchema = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
      if (jsonSchema) {
        addMeta(def, refs, jsonSchema);
      }
      if (refs.postProcess) {
        const postProcessResult = refs.postProcess(jsonSchema, def, refs);
        newItem.jsonSchema = jsonSchema;
        return postProcessResult;
      }
      newItem.jsonSchema = jsonSchema;
      return jsonSchema;
    }
    exports.parseDef = parseDef;
    var get$ref = (item, refs) => {
      switch (refs.$refStrategy) {
        case "root":
          return {
            $ref: item.path.join("/")
          };
        case "relative":
          return {
            $ref: (0, getRelativePath_js_1.getRelativePath)(refs.currentPath, item.path)
          };
        case "none":
        case "seen": {
          if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
            console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
            return (0, any_js_1.parseAnyDef)(refs);
          }
          return refs.$refStrategy === "seen" ? (0, any_js_1.parseAnyDef)(refs) : void 0;
        }
      }
    };
    var addMeta = (def, refs, jsonSchema) => {
      if (def.description) {
        jsonSchema.description = def.description;
        if (refs.markdownDescription) {
          jsonSchema.markdownDescription = def.description;
        }
      }
      return jsonSchema;
    };
  }
});

// node_modules/zod-to-json-schema/dist/cjs/parseTypes.js
var require_parseTypes = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/parseTypes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  }
});

// node_modules/zod-to-json-schema/dist/cjs/zodToJsonSchema.js
var require_zodToJsonSchema = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/zodToJsonSchema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.zodToJsonSchema = void 0;
    var parseDef_js_1 = require_parseDef();
    var Refs_js_1 = require_Refs();
    var any_js_1 = require_any();
    var zodToJsonSchema = (schema, options) => {
      const refs = (0, Refs_js_1.getRefs)(options);
      let definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => __spreadProps(__spreadValues({}, acc), {
        [name2]: (0, parseDef_js_1.parseDef)(schema2._def, __spreadProps(__spreadValues({}, refs), {
          currentPath: [...refs.basePath, refs.definitionPath, name2]
        }), true) ?? (0, any_js_1.parseAnyDef)(refs)
      }), {}) : void 0;
      const name = typeof options === "string" ? options : options?.nameStrategy === "title" ? void 0 : options?.name;
      const main = (0, parseDef_js_1.parseDef)(schema._def, name === void 0 ? refs : __spreadProps(__spreadValues({}, refs), {
        currentPath: [...refs.basePath, refs.definitionPath, name]
      }), false) ?? (0, any_js_1.parseAnyDef)(refs);
      const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
      if (title !== void 0) {
        main.title = title;
      }
      if (refs.flags.hasReferencedOpenAiAnyType) {
        if (!definitions) {
          definitions = {};
        }
        if (!definitions[refs.openAiAnyTypeName]) {
          definitions[refs.openAiAnyTypeName] = {
            // Skipping "object" as no properties can be defined and additionalProperties must be "false"
            type: ["string", "number", "integer", "boolean", "array", "null"],
            items: {
              $ref: refs.$refStrategy === "relative" ? "1" : [...refs.basePath, refs.definitionPath, refs.openAiAnyTypeName].join("/")
            }
          };
        }
      }
      const combined = name === void 0 ? definitions ? __spreadProps(__spreadValues({}, main), {
        [refs.definitionPath]: definitions
      }) : main : {
        $ref: [...refs.$refStrategy === "relative" ? [] : refs.basePath, refs.definitionPath, name].join("/"),
        [refs.definitionPath]: __spreadProps(__spreadValues({}, definitions), {
          [name]: main
        })
      };
      if (refs.target === "jsonSchema7") {
        combined.$schema = "http://json-schema.org/draft-07/schema#";
      } else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
        combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
      }
      if (refs.target === "openAi" && ("anyOf" in combined || "oneOf" in combined || "allOf" in combined || "type" in combined && Array.isArray(combined.type))) {
        console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
      }
      return combined;
    };
    exports.zodToJsonSchema = zodToJsonSchema;
  }
});

// node_modules/zod-to-json-schema/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/zod-to-json-schema/dist/cjs/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
          enumerable: true,
          get: function() {
            return m[k];
          }
        };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __exportStar(require_Options(), exports);
    __exportStar(require_Refs(), exports);
    __exportStar(require_errorMessages(), exports);
    __exportStar(require_getRelativePath(), exports);
    __exportStar(require_parseDef(), exports);
    __exportStar(require_parseTypes(), exports);
    __exportStar(require_any(), exports);
    __exportStar(require_array(), exports);
    __exportStar(require_bigint(), exports);
    __exportStar(require_boolean(), exports);
    __exportStar(require_branded(), exports);
    __exportStar(require_catch(), exports);
    __exportStar(require_date(), exports);
    __exportStar(require_default(), exports);
    __exportStar(require_effects(), exports);
    __exportStar(require_enum2(), exports);
    __exportStar(require_intersection(), exports);
    __exportStar(require_literal(), exports);
    __exportStar(require_map(), exports);
    __exportStar(require_nativeEnum(), exports);
    __exportStar(require_never(), exports);
    __exportStar(require_null(), exports);
    __exportStar(require_nullable(), exports);
    __exportStar(require_number(), exports);
    __exportStar(require_object(), exports);
    __exportStar(require_optional(), exports);
    __exportStar(require_pipeline(), exports);
    __exportStar(require_promise(), exports);
    __exportStar(require_readonly(), exports);
    __exportStar(require_record(), exports);
    __exportStar(require_set(), exports);
    __exportStar(require_string(), exports);
    __exportStar(require_tuple(), exports);
    __exportStar(require_undefined(), exports);
    __exportStar(require_union(), exports);
    __exportStar(require_unknown(), exports);
    __exportStar(require_selectParser(), exports);
    __exportStar(require_zodToJsonSchema(), exports);
    var zodToJsonSchema_js_1 = require_zodToJsonSchema();
    exports.default = zodToJsonSchema_js_1.zodToJsonSchema;
  }
});

// node_modules/@genkit-ai/core/lib/config.js
var require_config = __commonJS({
  "node_modules/@genkit-ai/core/lib/config.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var config_exports = {};
    __export2(config_exports, {
      getGenkitRuntimeConfig: () => getGenkitRuntimeConfig2,
      resetGenkitRuntimeConfig: () => resetGenkitRuntimeConfig2,
      setGenkitRuntimeConfig: () => setGenkitRuntimeConfig2
    });
    module.exports = __toCommonJS2(config_exports);
    var import_logging = (init_logging(), __toCommonJS(logging_exports));
    var CONFIG_KEY = "__GENKIT_RUNTIME_CONFIG__";
    function getConfig() {
      if (!global[CONFIG_KEY]) {
        global[CONFIG_KEY] = {};
      }
      return global[CONFIG_KEY];
    }
    function setGenkitRuntimeConfig2(config) {
      if (config.jsonSchemaMode === "interpret") {
        import_logging.logger.warn("It looks like you're trying to disable schema code generation. Please ensure that the '@cfworker/json-schema' package is installed: `npm i --save @cfworker/json-schema`");
      }
      const current = getConfig();
      global[CONFIG_KEY] = __spreadValues(__spreadValues({}, current), config);
    }
    function getGenkitRuntimeConfig2() {
      const config = getConfig();
      return {
        jsonSchemaMode: config.jsonSchemaMode ?? "compile",
        sandboxedRuntime: config.sandboxedRuntime ?? false
      };
    }
    function resetGenkitRuntimeConfig2() {
      global[CONFIG_KEY] = {};
    }
  }
});

// node_modules/@genkit-ai/core/lib/statusTypes.js
var require_statusTypes = __commonJS({
  "node_modules/@genkit-ai/core/lib/statusTypes.js"(exports, module) {
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
      }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var statusTypes_exports = {};
    __export2(statusTypes_exports, {
      StatusCodes: () => StatusCodes2,
      StatusNameSchema: () => StatusNameSchema,
      StatusSchema: () => StatusSchema2,
      httpStatusCode: () => httpStatusCode2
    });
    module.exports = __toCommonJS2(statusTypes_exports);
    var z2 = __toESM2(require_zod());
    var StatusCodes2 = ((StatusCodes22) => {
      StatusCodes22[StatusCodes22["OK"] = 0] = "OK";
      StatusCodes22[StatusCodes22["CANCELLED"] = 1] = "CANCELLED";
      StatusCodes22[StatusCodes22["UNKNOWN"] = 2] = "UNKNOWN";
      StatusCodes22[StatusCodes22["INVALID_ARGUMENT"] = 3] = "INVALID_ARGUMENT";
      StatusCodes22[StatusCodes22["DEADLINE_EXCEEDED"] = 4] = "DEADLINE_EXCEEDED";
      StatusCodes22[StatusCodes22["NOT_FOUND"] = 5] = "NOT_FOUND";
      StatusCodes22[StatusCodes22["ALREADY_EXISTS"] = 6] = "ALREADY_EXISTS";
      StatusCodes22[StatusCodes22["PERMISSION_DENIED"] = 7] = "PERMISSION_DENIED";
      StatusCodes22[StatusCodes22["UNAUTHENTICATED"] = 16] = "UNAUTHENTICATED";
      StatusCodes22[StatusCodes22["RESOURCE_EXHAUSTED"] = 8] = "RESOURCE_EXHAUSTED";
      StatusCodes22[StatusCodes22["FAILED_PRECONDITION"] = 9] = "FAILED_PRECONDITION";
      StatusCodes22[StatusCodes22["ABORTED"] = 10] = "ABORTED";
      StatusCodes22[StatusCodes22["OUT_OF_RANGE"] = 11] = "OUT_OF_RANGE";
      StatusCodes22[StatusCodes22["UNIMPLEMENTED"] = 12] = "UNIMPLEMENTED";
      StatusCodes22[StatusCodes22["INTERNAL"] = 13] = "INTERNAL";
      StatusCodes22[StatusCodes22["UNAVAILABLE"] = 14] = "UNAVAILABLE";
      StatusCodes22[StatusCodes22["DATA_LOSS"] = 15] = "DATA_LOSS";
      return StatusCodes22;
    })(StatusCodes2 || {});
    var StatusNameSchema = z2.enum(["OK", "CANCELLED", "UNKNOWN", "INVALID_ARGUMENT", "DEADLINE_EXCEEDED", "NOT_FOUND", "ALREADY_EXISTS", "PERMISSION_DENIED", "UNAUTHENTICATED", "RESOURCE_EXHAUSTED", "FAILED_PRECONDITION", "ABORTED", "OUT_OF_RANGE", "UNIMPLEMENTED", "INTERNAL", "UNAVAILABLE", "DATA_LOSS"]);
    var statusCodeMap = {
      OK: 200,
      CANCELLED: 499,
      UNKNOWN: 500,
      INVALID_ARGUMENT: 400,
      DEADLINE_EXCEEDED: 504,
      NOT_FOUND: 404,
      ALREADY_EXISTS: 409,
      PERMISSION_DENIED: 403,
      UNAUTHENTICATED: 401,
      RESOURCE_EXHAUSTED: 429,
      FAILED_PRECONDITION: 400,
      ABORTED: 409,
      OUT_OF_RANGE: 400,
      UNIMPLEMENTED: 501,
      INTERNAL: 500,
      UNAVAILABLE: 503,
      DATA_LOSS: 500
    };
    function httpStatusCode2(status) {
      if (!(status in statusCodeMap)) {
        throw new Error(`Invalid status code ${status}`);
      }
      return statusCodeMap[status];
    }
    var StatusCodesSchema = z2.nativeEnum(StatusCodes2);
    var StatusSchema2 = z2.object({
      code: StatusCodesSchema,
      message: z2.string(),
      details: z2.any().optional()
    });
  }
});

// node_modules/@genkit-ai/core/lib/error.js
var require_error = __commonJS({
  "node_modules/@genkit-ai/core/lib/error.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var error_exports2 = {};
    __export2(error_exports2, {
      GenkitError: () => GenkitError3,
      UnstableApiError: () => UnstableApiError3,
      UserFacingError: () => UserFacingError3,
      assertUnstable: () => assertUnstable3,
      getCallableJSON: () => getCallableJSON3,
      getErrorMessage: () => getErrorMessage2,
      getErrorStack: () => getErrorStack2,
      getHttpStatus: () => getHttpStatus3
    });
    module.exports = __toCommonJS2(error_exports2);
    var import_statusTypes2 = require_statusTypes();
    var GenkitError3 = class extends Error {
      source;
      status;
      detail;
      code;
      // For easy printing, we wrap the error with information like the source
      // and status, but that's redundant with JSON.
      originalMessage;
      constructor({
        status,
        message,
        detail,
        source
      }) {
        super(`${source ? `${source}: ` : ""}${status}: ${message}`);
        this.originalMessage = message;
        this.code = (0, import_statusTypes2.httpStatusCode)(status);
        this.status = status;
        this.detail = detail;
        this.name = "GenkitError";
      }
      /**
       * Returns a JSON-serializable representation of this object.
       */
      toJSON() {
        return __spreadProps(__spreadValues({}, this.detail === void 0 ? {} : {
          details: this.detail
        }), {
          status: this.status,
          message: this.originalMessage
        });
      }
    };
    var UnstableApiError3 = class extends GenkitError3 {
      constructor(level, message) {
        super({
          status: "FAILED_PRECONDITION",
          message: `${message ? message + " " : ""}This API requires '${level}' stability level.

To use this feature, initialize Genkit using \`import {genkit} from "genkit/${level}"\`.`
        });
        this.name = "UnstableApiError";
      }
    };
    function assertUnstable3(registry, level, message) {
      if (level === "beta" && registry.apiStability === "stable") {
        throw new UnstableApiError3(level, message);
      }
    }
    var UserFacingError3 = class extends GenkitError3 {
      constructor(status, message, details) {
        super({
          status,
          detail: details,
          message
        });
        super.name = "UserFacingError";
      }
    };
    function getHttpStatus3(e) {
      if (e instanceof GenkitError3) {
        return e.code;
      }
      return 500;
    }
    function getCallableJSON3(e) {
      if (e instanceof GenkitError3) {
        return e.toJSON();
      }
      return {
        message: "Internal Error",
        status: "INTERNAL"
      };
    }
    function getErrorMessage2(e) {
      if (e instanceof Error) {
        return e.message;
      }
      return `${e}`;
    }
    function getErrorStack2(e) {
      if (e instanceof Error) {
        return e.stack;
      }
      return void 0;
    }
  }
});

// node_modules/@genkit-ai/core/lib/schema.js
var require_schema = __commonJS({
  "node_modules/@genkit-ai/core/lib/schema.js"(exports, module) {
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
      }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var schema_exports = {};
    __export2(schema_exports, {
      ValidationError: () => ValidationError,
      defineJsonSchema: () => defineJsonSchema2,
      defineSchema: () => defineSchema2,
      parseSchema: () => parseSchema,
      toJsonSchema: () => toJsonSchema,
      validateSchema: () => validateSchema,
      z: () => import_zod.z
    });
    module.exports = __toCommonJS2(schema_exports);
    var import_json_schema = require_commonjs();
    var import_ajv = __toESM2(require_ajv());
    var import_ajv_formats = __toESM2(require_dist());
    var import_zod = require_zod();
    var import_zod_to_json_schema = __toESM2(require_cjs());
    var import_config = require_config();
    var import_error = require_error();
    var ajv = new import_ajv.default();
    (0, import_ajv_formats.default)(ajv);
    var jsonSchemas = /* @__PURE__ */ new WeakMap();
    var validators = /* @__PURE__ */ new WeakMap();
    var cfWorkerValidators = /* @__PURE__ */ new WeakMap();
    var ValidationError = class extends import_error.GenkitError {
      constructor({
        data,
        errors,
        schema
      }) {
        super({
          status: "INVALID_ARGUMENT",
          message: `Schema validation failed. Parse Errors:

${errors.map((e) => `- ${e.path}: ${e.message}`).join("\n")}

Provided data:

${JSON.stringify(data, null, 2)}

Required JSON schema:

${JSON.stringify(schema, null, 2)}`,
          detail: {
            errors,
            schema
          }
        });
      }
    };
    function toJsonSchema({
      jsonSchema,
      schema
    }) {
      if (!jsonSchema && !schema) return null;
      if (jsonSchema) return jsonSchema;
      if (jsonSchemas.has(schema)) return jsonSchemas.get(schema);
      const outSchema = (0, import_zod_to_json_schema.default)(schema, {
        removeAdditionalStrategy: "strict"
      });
      jsonSchemas.set(schema, outSchema);
      return outSchema;
    }
    function toErrorDetail(error) {
      return {
        path: error.instancePath.substring(1).replace(/\//g, ".") || "(root)",
        message: error.message
      };
    }
    function cfWorkerErrorToValidationErrorDetail(error) {
      const path = error.instanceLocation.startsWith("#/") ? error.instanceLocation.substring(2) : "";
      return {
        path: path.replace(/\//g, ".") || "(root)",
        message: error.error
      };
    }
    function validateSchema(data, options) {
      const toValidate = toJsonSchema(options);
      if (!toValidate) {
        return {
          valid: true,
          schema: toValidate
        };
      }
      const validationMode = (0, import_config.getGenkitRuntimeConfig)().jsonSchemaMode;
      if (validationMode === "interpret") {
        let validator2 = cfWorkerValidators.get(toValidate);
        if (!validator2) {
          validator2 = new import_json_schema.Validator(toValidate);
          cfWorkerValidators.set(toValidate, validator2);
        }
        const result = validator2.validate(sanitizeForJsonSchema(data));
        return {
          valid: result.valid,
          errors: result.errors?.map(cfWorkerErrorToValidationErrorDetail),
          schema: toValidate
        };
      }
      const validator = validators.get(toValidate) || ajv.compile(toValidate);
      const valid = validator(data);
      const errors = validator.errors?.map((e) => e);
      return {
        valid,
        errors: errors?.map(toErrorDetail),
        schema: toValidate
      };
    }
    function parseSchema(data, options) {
      const {
        valid,
        errors,
        schema
      } = validateSchema(data, options);
      if (!valid) {
        throw new ValidationError({
          data,
          errors,
          schema
        });
      }
      return data;
    }
    function defineSchema2(registry, name, schema) {
      registry.registerSchema(name, {
        schema
      });
      return schema;
    }
    function defineJsonSchema2(registry, name, jsonSchema) {
      registry.registerSchema(name, {
        jsonSchema
      });
      return jsonSchema;
    }
    function sanitizeForJsonSchema(data) {
      if (Array.isArray(data)) {
        return data.map(sanitizeForJsonSchema);
      } else if (data !== null && typeof data === "object") {
        const out = {};
        for (const key in data) {
          if (data[key] !== void 0) {
            out[key] = sanitizeForJsonSchema(data[key]);
          }
        }
        return out;
      }
      return data;
    }
  }
});

// node_modules/@genkit-ai/core/lib/logging.js
var require_logging = __commonJS({
  "node_modules/@genkit-ai/core/lib/logging.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var logging_exports2 = {};
    __export2(logging_exports2, {
      logger: () => logger2
    });
    module.exports = __toCommonJS2(logging_exports2);
    var import_api16 = (init_esm(), __toCommonJS(esm_exports));
    var import_api_logs2 = (init_esm2(), __toCommonJS(esm_exports2));
    var LOG_LEVELS2 = ["debug", "info", "warn", "error"];
    var loggerKey2 = "__genkit_logger";
    var _defaultLogger2 = {
      shouldLog(targetLevel) {
        return LOG_LEVELS2.indexOf(this.level) <= LOG_LEVELS2.indexOf(targetLevel);
      },
      debug(...args) {
        this.shouldLog("debug") && console.debug(...args);
      },
      info(...args) {
        this.shouldLog("info") && console.info(...args);
      },
      warn(...args) {
        this.shouldLog("warn") && console.warn(...args);
      },
      error(...args) {
        this.shouldLog("error") && console.error(...args);
      },
      level: "info"
    };
    function getLogger2() {
      if (!global[loggerKey2]) {
        global[loggerKey2] = _defaultLogger2;
      }
      return global[loggerKey2];
    }
    var Logger2 = class {
      defaultLogger = _defaultLogger2;
      _emitOtel(level, args, explicitBody, explicitAttributes) {
        if (process.env.GENKIT_OTEL_ENABLE_LOGS !== "true") {
          return;
        }
        try {
          const currentLevel = getLogger2().level || "info";
          if (LOG_LEVELS2.indexOf(currentLevel) > LOG_LEVELS2.indexOf(level)) {
            return;
          }
          const otelLogger = import_api_logs2.logs.getLogger("genkit-logger");
          let severityNumber;
          switch (level) {
            case "debug":
              severityNumber = import_api_logs2.SeverityNumber.DEBUG;
              break;
            case "info":
              severityNumber = import_api_logs2.SeverityNumber.INFO;
              break;
            case "warn":
              severityNumber = import_api_logs2.SeverityNumber.WARN;
              break;
            case "error":
              severityNumber = import_api_logs2.SeverityNumber.ERROR;
              break;
            default:
              severityNumber = import_api_logs2.SeverityNumber.UNSPECIFIED;
              break;
          }
          let body;
          const attributes = explicitAttributes || {};
          if (explicitBody !== void 0) {
            body = explicitBody;
          } else if (args.length === 1 && typeof args[0] === "string") {
            body = args[0];
          } else {
            const util = __require("util");
            body = util.format(...args);
          }
          let activeContext;
          try {
            activeContext = import_api16.context.active();
          } catch (e) {
          }
          otelLogger.emit(__spreadValues({
            severityNumber,
            severityText: level.toUpperCase(),
            body,
            attributes
          }, activeContext ? {
            context: activeContext
          } : {}));
        } catch (err) {
        }
      }
      init(fn) {
        global[loggerKey2] = fn;
      }
      info(...args) {
        getLogger2().info.apply(getLogger2(), args);
        this._emitOtel("info", args);
      }
      debug(...args) {
        getLogger2().debug.apply(getLogger2(), args);
        this._emitOtel("debug", args);
      }
      error(...args) {
        getLogger2().error.apply(getLogger2(), args);
        this._emitOtel("error", args);
      }
      warn(...args) {
        getLogger2().warn.apply(getLogger2(), args);
        this._emitOtel("warn", args);
      }
      setLogLevel(level) {
        getLogger2().level = level;
      }
      logStructured(msg, metadata) {
        getLogger2().info(msg, metadata);
        this._emitOtel("info", [], msg, metadata);
      }
      logStructuredError(msg, metadata) {
        getLogger2().error(msg, metadata);
        this._emitOtel("error", [], msg, metadata);
      }
    };
    var logger2 = new Logger2();
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js
function suppressTracing(context2) {
  return context2.setValue(SUPPRESS_TRACING_KEY, true);
}
function unsuppressTracing(context2) {
  return context2.deleteValue(SUPPRESS_TRACING_KEY);
}
function isTracingSuppressed(context2) {
  return context2.getValue(SUPPRESS_TRACING_KEY) === true;
}
var SUPPRESS_TRACING_KEY;
var init_suppress_tracing = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js"() {
    init_esm();
    SUPPRESS_TRACING_KEY = createContextKey("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
  }
});

// node_modules/@opentelemetry/core/build/esm/baggage/constants.js
var BAGGAGE_KEY_PAIR_SEPARATOR, BAGGAGE_PROPERTIES_SEPARATOR, BAGGAGE_ITEMS_SEPARATOR, BAGGAGE_HEADER, BAGGAGE_MAX_NAME_VALUE_PAIRS, BAGGAGE_MAX_PER_NAME_VALUE_PAIRS, BAGGAGE_MAX_TOTAL_LENGTH;
var init_constants = __esm({
  "node_modules/@opentelemetry/core/build/esm/baggage/constants.js"() {
    BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    BAGGAGE_PROPERTIES_SEPARATOR = ";";
    BAGGAGE_ITEMS_SEPARATOR = ",";
    BAGGAGE_HEADER = "baggage";
    BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    BAGGAGE_MAX_TOTAL_LENGTH = 8192;
  }
});

// node_modules/@opentelemetry/core/build/esm/baggage/utils.js
var utils_exports = {};
__export(utils_exports, {
  getKeyPairs: () => getKeyPairs,
  parseKeyPairsIntoRecord: () => parseKeyPairsIntoRecord,
  parsePairKeyValue: () => parsePairKeyValue,
  serializeKeyPairs: () => serializeKeyPairs
});
function serializeKeyPairs(keyPairs) {
  return keyPairs.reduce(function(hValue, current) {
    var value = "" + hValue + (hValue !== "" ? BAGGAGE_ITEMS_SEPARATOR : "") + current;
    return value.length > BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
  }, "");
}
function getKeyPairs(baggage) {
  return baggage.getAllEntries().map(function(_a2) {
    var _b = __read(_a2, 2), key = _b[0], value = _b[1];
    var entry = encodeURIComponent(key) + "=" + encodeURIComponent(value.value);
    if (value.metadata !== void 0) {
      entry += BAGGAGE_PROPERTIES_SEPARATOR + value.metadata.toString();
    }
    return entry;
  });
}
function parsePairKeyValue(entry) {
  var valueProps = entry.split(BAGGAGE_PROPERTIES_SEPARATOR);
  if (valueProps.length <= 0) return;
  var keyPairPart = valueProps.shift();
  if (!keyPairPart) return;
  var separatorIndex = keyPairPart.indexOf(BAGGAGE_KEY_PAIR_SEPARATOR);
  if (separatorIndex <= 0) return;
  var key = decodeURIComponent(keyPairPart.substring(0, separatorIndex).trim());
  var value = decodeURIComponent(keyPairPart.substring(separatorIndex + 1).trim());
  var metadata;
  if (valueProps.length > 0) {
    metadata = baggageEntryMetadataFromString(valueProps.join(BAGGAGE_PROPERTIES_SEPARATOR));
  }
  return {
    key,
    value,
    metadata
  };
}
function parseKeyPairsIntoRecord(value) {
  if (typeof value !== "string" || value.length === 0) return {};
  return value.split(BAGGAGE_ITEMS_SEPARATOR).map(function(entry) {
    return parsePairKeyValue(entry);
  }).filter(function(keyPair) {
    return keyPair !== void 0 && keyPair.value.length > 0;
  }).reduce(function(headers, keyPair) {
    headers[keyPair.key] = keyPair.value;
    return headers;
  }, {});
}
var __read;
var init_utils3 = __esm({
  "node_modules/@opentelemetry/core/build/esm/baggage/utils.js"() {
    init_esm();
    init_constants();
    __read = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = {
          error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js
var W3CBaggagePropagator;
var init_W3CBaggagePropagator = __esm({
  "node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js"() {
    init_esm();
    init_suppress_tracing();
    init_constants();
    init_utils3();
    W3CBaggagePropagator = /** @class */
    (function() {
      function W3CBaggagePropagator2() {
      }
      W3CBaggagePropagator2.prototype.inject = function(context2, carrier, setter) {
        var baggage = propagation.getBaggage(context2);
        if (!baggage || isTracingSuppressed(context2)) return;
        var keyPairs = getKeyPairs(baggage).filter(function(pair) {
          return pair.length <= BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
        }).slice(0, BAGGAGE_MAX_NAME_VALUE_PAIRS);
        var headerValue = serializeKeyPairs(keyPairs);
        if (headerValue.length > 0) {
          setter.set(carrier, BAGGAGE_HEADER, headerValue);
        }
      };
      W3CBaggagePropagator2.prototype.extract = function(context2, carrier, getter) {
        var headerValue = getter.get(carrier, BAGGAGE_HEADER);
        var baggageString = Array.isArray(headerValue) ? headerValue.join(BAGGAGE_ITEMS_SEPARATOR) : headerValue;
        if (!baggageString) return context2;
        var baggage = {};
        if (baggageString.length === 0) {
          return context2;
        }
        var pairs = baggageString.split(BAGGAGE_ITEMS_SEPARATOR);
        pairs.forEach(function(entry) {
          var keyPair = parsePairKeyValue(entry);
          if (keyPair) {
            var baggageEntry = {
              value: keyPair.value
            };
            if (keyPair.metadata) {
              baggageEntry.metadata = keyPair.metadata;
            }
            baggage[keyPair.key] = baggageEntry;
          }
        });
        if (Object.entries(baggage).length === 0) {
          return context2;
        }
        return propagation.setBaggage(context2, propagation.createBaggage(baggage));
      };
      W3CBaggagePropagator2.prototype.fields = function() {
        return [BAGGAGE_HEADER];
      };
      return W3CBaggagePropagator2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/common/anchored-clock.js
var AnchoredClock;
var init_anchored_clock = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/anchored-clock.js"() {
    AnchoredClock = /** @class */
    (function() {
      function AnchoredClock2(systemClock, monotonicClock) {
        this._monotonicClock = monotonicClock;
        this._epochMillis = systemClock.now();
        this._performanceMillis = monotonicClock.now();
      }
      AnchoredClock2.prototype.now = function() {
        var delta = this._monotonicClock.now() - this._performanceMillis;
        return this._epochMillis + delta;
      };
      return AnchoredClock2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/common/attributes.js
function sanitizeAttributes(attributes) {
  var e_1, _a2;
  var out = {};
  if (typeof attributes !== "object" || attributes == null) {
    return out;
  }
  try {
    for (var _b = __values(Object.entries(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
      var _d = __read2(_c.value, 2), key = _d[0], val = _d[1];
      if (!isAttributeKey(key)) {
        diag2.warn("Invalid attribute key: " + key);
        continue;
      }
      if (!isAttributeValue(val)) {
        diag2.warn("Invalid attribute value set for key: " + key);
        continue;
      }
      if (Array.isArray(val)) {
        out[key] = val.slice();
      } else {
        out[key] = val;
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return out;
}
function isAttributeKey(key) {
  return typeof key === "string" && key.length > 0;
}
function isAttributeValue(val) {
  if (val == null) {
    return true;
  }
  if (Array.isArray(val)) {
    return isHomogeneousAttributeValueArray(val);
  }
  return isValidPrimitiveAttributeValue(val);
}
function isHomogeneousAttributeValueArray(arr) {
  var e_2, _a2;
  var type;
  try {
    for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
      var element = arr_1_1.value;
      if (element == null) continue;
      if (!type) {
        if (isValidPrimitiveAttributeValue(element)) {
          type = typeof element;
          continue;
        }
        return false;
      }
      if (typeof element === type) {
        continue;
      }
      return false;
    }
  } catch (e_2_1) {
    e_2 = {
      error: e_2_1
    };
  } finally {
    try {
      if (arr_1_1 && !arr_1_1.done && (_a2 = arr_1.return)) _a2.call(arr_1);
    } finally {
      if (e_2) throw e_2.error;
    }
  }
  return true;
}
function isValidPrimitiveAttributeValue(val) {
  switch (typeof val) {
    case "number":
    case "boolean":
    case "string":
      return true;
  }
  return false;
}
var __values, __read2;
var init_attributes = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/attributes.js"() {
    init_esm();
    __values = function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    __read2 = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = {
          error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js
function loggingErrorHandler() {
  return function(ex) {
    diag2.error(stringifyException(ex));
  };
}
function stringifyException(ex) {
  if (typeof ex === "string") {
    return ex;
  } else {
    return JSON.stringify(flattenException(ex));
  }
}
function flattenException(ex) {
  var result = {};
  var current = ex;
  while (current !== null) {
    Object.getOwnPropertyNames(current).forEach(function(propertyName) {
      if (result[propertyName]) return;
      var value = current[propertyName];
      if (value) {
        result[propertyName] = String(value);
      }
    });
    current = Object.getPrototypeOf(current);
  }
  return result;
}
var init_logging_error_handler = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js"() {
    init_esm();
  }
});

// node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js
function setGlobalErrorHandler(handler) {
  delegateHandler = handler;
}
function globalErrorHandler(ex) {
  try {
    delegateHandler(ex);
  } catch (_a2) {
  }
}
var delegateHandler;
var init_global_error_handler = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js"() {
    init_logging_error_handler();
    delegateHandler = loggingErrorHandler();
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/sampling.js
var TracesSamplerValues;
var init_sampling = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/sampling.js"() {
    (function(TracesSamplerValues2) {
      TracesSamplerValues2["AlwaysOff"] = "always_off";
      TracesSamplerValues2["AlwaysOn"] = "always_on";
      TracesSamplerValues2["ParentBasedAlwaysOff"] = "parentbased_always_off";
      TracesSamplerValues2["ParentBasedAlwaysOn"] = "parentbased_always_on";
      TracesSamplerValues2["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
      TracesSamplerValues2["TraceIdRatio"] = "traceidratio";
    })(TracesSamplerValues || (TracesSamplerValues = {}));
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/environment.js
function isEnvVarABoolean(key) {
  return ENVIRONMENT_BOOLEAN_KEYS.indexOf(key) > -1;
}
function isEnvVarANumber(key) {
  return ENVIRONMENT_NUMBERS_KEYS.indexOf(key) > -1;
}
function isEnvVarAList(key) {
  return ENVIRONMENT_LISTS_KEYS.indexOf(key) > -1;
}
function parseBoolean(key, environment, values) {
  if (typeof values[key] === "undefined") {
    return;
  }
  var value = String(values[key]);
  environment[key] = value.toLowerCase() === "true";
}
function parseNumber(name, environment, values, min, max) {
  if (min === void 0) {
    min = -Infinity;
  }
  if (max === void 0) {
    max = Infinity;
  }
  if (typeof values[name] !== "undefined") {
    var value = Number(values[name]);
    if (!isNaN(value)) {
      if (value < min) {
        environment[name] = min;
      } else if (value > max) {
        environment[name] = max;
      } else {
        environment[name] = value;
      }
    }
  }
}
function parseStringList(name, output, input, separator) {
  if (separator === void 0) {
    separator = DEFAULT_LIST_SEPARATOR;
  }
  var givenValue = input[name];
  if (typeof givenValue === "string") {
    output[name] = givenValue.split(separator).map(function(v) {
      return v.trim();
    });
  }
}
function setLogLevelFromEnv(key, environment, values) {
  var value = values[key];
  if (typeof value === "string") {
    var theLevel = logLevelMap[value.toUpperCase()];
    if (theLevel != null) {
      environment[key] = theLevel;
    }
  }
}
function parseEnvironment(values) {
  var environment = {};
  for (var env in DEFAULT_ENVIRONMENT) {
    var key = env;
    switch (key) {
      case "OTEL_LOG_LEVEL":
        setLogLevelFromEnv(key, environment, values);
        break;
      default:
        if (isEnvVarABoolean(key)) {
          parseBoolean(key, environment, values);
        } else if (isEnvVarANumber(key)) {
          parseNumber(key, environment, values);
        } else if (isEnvVarAList(key)) {
          parseStringList(key, environment, values);
        } else {
          var value = values[key];
          if (typeof value !== "undefined" && value !== null) {
            environment[key] = String(value);
          }
        }
    }
  }
  return environment;
}
var DEFAULT_LIST_SEPARATOR, ENVIRONMENT_BOOLEAN_KEYS, ENVIRONMENT_NUMBERS_KEYS, ENVIRONMENT_LISTS_KEYS, DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT, DEFAULT_ATTRIBUTE_COUNT_LIMIT, DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT, DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT, DEFAULT_ENVIRONMENT, logLevelMap;
var init_environment = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/environment.js"() {
    init_esm();
    init_sampling();
    DEFAULT_LIST_SEPARATOR = ",";
    ENVIRONMENT_BOOLEAN_KEYS = ["OTEL_SDK_DISABLED"];
    ENVIRONMENT_NUMBERS_KEYS = ["OTEL_BSP_EXPORT_TIMEOUT", "OTEL_BSP_MAX_EXPORT_BATCH_SIZE", "OTEL_BSP_MAX_QUEUE_SIZE", "OTEL_BSP_SCHEDULE_DELAY", "OTEL_BLRP_EXPORT_TIMEOUT", "OTEL_BLRP_MAX_EXPORT_BATCH_SIZE", "OTEL_BLRP_MAX_QUEUE_SIZE", "OTEL_BLRP_SCHEDULE_DELAY", "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT", "OTEL_ATTRIBUTE_COUNT_LIMIT", "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT", "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT", "OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT", "OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT", "OTEL_SPAN_EVENT_COUNT_LIMIT", "OTEL_SPAN_LINK_COUNT_LIMIT", "OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT", "OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT", "OTEL_EXPORTER_OTLP_TIMEOUT", "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT", "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT", "OTEL_EXPORTER_OTLP_LOGS_TIMEOUT", "OTEL_EXPORTER_JAEGER_AGENT_PORT"];
    ENVIRONMENT_LISTS_KEYS = ["OTEL_NO_PATCH_MODULES", "OTEL_PROPAGATORS"];
    DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
    DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
    DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = 128;
    DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT = 128;
    DEFAULT_ENVIRONMENT = {
      OTEL_SDK_DISABLED: false,
      CONTAINER_NAME: "",
      ECS_CONTAINER_METADATA_URI_V4: "",
      ECS_CONTAINER_METADATA_URI: "",
      HOSTNAME: "",
      KUBERNETES_SERVICE_HOST: "",
      NAMESPACE: "",
      OTEL_BSP_EXPORT_TIMEOUT: 3e4,
      OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
      OTEL_BSP_MAX_QUEUE_SIZE: 2048,
      OTEL_BSP_SCHEDULE_DELAY: 5e3,
      OTEL_BLRP_EXPORT_TIMEOUT: 3e4,
      OTEL_BLRP_MAX_EXPORT_BATCH_SIZE: 512,
      OTEL_BLRP_MAX_QUEUE_SIZE: 2048,
      OTEL_BLRP_SCHEDULE_DELAY: 5e3,
      OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
      OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
      OTEL_EXPORTER_JAEGER_ENDPOINT: "",
      OTEL_EXPORTER_JAEGER_PASSWORD: "",
      OTEL_EXPORTER_JAEGER_USER: "",
      OTEL_EXPORTER_OTLP_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: "",
      OTEL_EXPORTER_OTLP_HEADERS: "",
      OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
      OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
      OTEL_EXPORTER_OTLP_LOGS_HEADERS: "",
      OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
      OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
      OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
      OTEL_EXPORTER_OTLP_LOGS_TIMEOUT: 1e4,
      OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
      OTEL_LOG_LEVEL: DiagLogLevel.INFO,
      OTEL_NO_PATCH_MODULES: [],
      OTEL_PROPAGATORS: ["tracecontext", "baggage"],
      OTEL_RESOURCE_ATTRIBUTES: "",
      OTEL_SERVICE_NAME: "",
      OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
      OTEL_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
      OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
      OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
      OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
      OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
      OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
      OTEL_SPAN_LINK_COUNT_LIMIT: 128,
      OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
      OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT,
      OTEL_TRACES_EXPORTER: "",
      OTEL_TRACES_SAMPLER: TracesSamplerValues.ParentBasedAlwaysOn,
      OTEL_TRACES_SAMPLER_ARG: "",
      OTEL_LOGS_EXPORTER: "",
      OTEL_EXPORTER_OTLP_INSECURE: "",
      OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
      OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
      OTEL_EXPORTER_OTLP_LOGS_INSECURE: "",
      OTEL_EXPORTER_OTLP_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_LOGS_COMPRESSION: "",
      OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY: "",
      OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE: "",
      OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: "http/protobuf",
      OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative"
    };
    logLevelMap = {
      ALL: DiagLogLevel.ALL,
      VERBOSE: DiagLogLevel.VERBOSE,
      DEBUG: DiagLogLevel.DEBUG,
      INFO: DiagLogLevel.INFO,
      WARN: DiagLogLevel.WARN,
      ERROR: DiagLogLevel.ERROR,
      NONE: DiagLogLevel.NONE
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/environment.js
function getEnv() {
  var processEnv = parseEnvironment(process.env);
  return Object.assign({}, DEFAULT_ENVIRONMENT, processEnv);
}
function getEnvWithoutDefaults() {
  return parseEnvironment(process.env);
}
var init_environment2 = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/environment.js"() {
    init_environment();
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/globalThis.js
var _globalThis2;
var init_globalThis2 = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/globalThis.js"() {
    _globalThis2 = typeof globalThis === "object" ? globalThis : global;
  }
});

// node_modules/@opentelemetry/core/build/esm/common/hex-to-binary.js
function intValue(charCode) {
  if (charCode >= 48 && charCode <= 57) {
    return charCode - 48;
  }
  if (charCode >= 97 && charCode <= 102) {
    return charCode - 87;
  }
  return charCode - 55;
}
function hexToBinary(hexStr) {
  var buf = new Uint8Array(hexStr.length / 2);
  var offset = 0;
  for (var i = 0; i < hexStr.length; i += 2) {
    var hi = intValue(hexStr.charCodeAt(i));
    var lo = intValue(hexStr.charCodeAt(i + 1));
    buf[offset++] = hi << 4 | lo;
  }
  return buf;
}
var init_hex_to_binary = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/hex-to-binary.js"() {
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/hex-to-base64.js
function hexToBase64(hexStr) {
  return Buffer.from(hexToBinary(hexStr)).toString("base64");
}
var init_hex_to_base64 = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/hex-to-base64.js"() {
    init_hex_to_binary();
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/RandomIdGenerator.js
function getIdGenerator(bytes) {
  return function generateId() {
    for (var i = 0; i < bytes / 4; i++) {
      SHARED_BUFFER.writeUInt32BE(Math.random() * Math.pow(2, 32) >>> 0, i * 4);
    }
    for (var i = 0; i < bytes; i++) {
      if (SHARED_BUFFER[i] > 0) {
        break;
      } else if (i === bytes - 1) {
        SHARED_BUFFER[bytes - 1] = 1;
      }
    }
    return SHARED_BUFFER.toString("hex", 0, bytes);
  };
}
var SPAN_ID_BYTES, TRACE_ID_BYTES, RandomIdGenerator, SHARED_BUFFER;
var init_RandomIdGenerator = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/RandomIdGenerator.js"() {
    SPAN_ID_BYTES = 8;
    TRACE_ID_BYTES = 16;
    RandomIdGenerator = /** @class */
    /* @__PURE__ */ (function() {
      function RandomIdGenerator2() {
        this.generateTraceId = getIdGenerator(TRACE_ID_BYTES);
        this.generateSpanId = getIdGenerator(SPAN_ID_BYTES);
      }
      return RandomIdGenerator2;
    })();
    SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/performance.js
import { performance } from "perf_hooks";
var otperformance;
var init_performance = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/performance.js"() {
    otperformance = performance;
  }
});

// node_modules/@opentelemetry/core/build/esm/version.js
var VERSION2;
var init_version2 = __esm({
  "node_modules/@opentelemetry/core/build/esm/version.js"() {
    VERSION2 = "1.25.1";
  }
});

// node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/internal/utils.js
function createConstMap(values) {
  var res = {};
  var len = values.length;
  for (var lp = 0; lp < len; lp++) {
    var val = values[lp];
    if (val) {
      res[String(val).toUpperCase().replace(/[-.]/g, "_")] = val;
    }
  }
  return res;
}
var init_utils4 = __esm({
  "node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/internal/utils.js"() {
  }
});

// node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/SemanticAttributes.js
var TMP_AWS_LAMBDA_INVOKED_ARN, TMP_DB_SYSTEM, TMP_DB_CONNECTION_STRING, TMP_DB_USER, TMP_DB_JDBC_DRIVER_CLASSNAME, TMP_DB_NAME, TMP_DB_STATEMENT, TMP_DB_OPERATION, TMP_DB_MSSQL_INSTANCE_NAME, TMP_DB_CASSANDRA_KEYSPACE, TMP_DB_CASSANDRA_PAGE_SIZE, TMP_DB_CASSANDRA_CONSISTENCY_LEVEL, TMP_DB_CASSANDRA_TABLE, TMP_DB_CASSANDRA_IDEMPOTENCE, TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT, TMP_DB_CASSANDRA_COORDINATOR_ID, TMP_DB_CASSANDRA_COORDINATOR_DC, TMP_DB_HBASE_NAMESPACE, TMP_DB_REDIS_DATABASE_INDEX, TMP_DB_MONGODB_COLLECTION, TMP_DB_SQL_TABLE, TMP_EXCEPTION_TYPE, TMP_EXCEPTION_MESSAGE, TMP_EXCEPTION_STACKTRACE, TMP_EXCEPTION_ESCAPED, TMP_FAAS_TRIGGER, TMP_FAAS_EXECUTION, TMP_FAAS_DOCUMENT_COLLECTION, TMP_FAAS_DOCUMENT_OPERATION, TMP_FAAS_DOCUMENT_TIME, TMP_FAAS_DOCUMENT_NAME, TMP_FAAS_TIME, TMP_FAAS_CRON, TMP_FAAS_COLDSTART, TMP_FAAS_INVOKED_NAME, TMP_FAAS_INVOKED_PROVIDER, TMP_FAAS_INVOKED_REGION, TMP_NET_TRANSPORT, TMP_NET_PEER_IP, TMP_NET_PEER_PORT, TMP_NET_PEER_NAME, TMP_NET_HOST_IP, TMP_NET_HOST_PORT, TMP_NET_HOST_NAME, TMP_NET_HOST_CONNECTION_TYPE, TMP_NET_HOST_CONNECTION_SUBTYPE, TMP_NET_HOST_CARRIER_NAME, TMP_NET_HOST_CARRIER_MCC, TMP_NET_HOST_CARRIER_MNC, TMP_NET_HOST_CARRIER_ICC, TMP_PEER_SERVICE, TMP_ENDUSER_ID, TMP_ENDUSER_ROLE, TMP_ENDUSER_SCOPE, TMP_THREAD_ID, TMP_THREAD_NAME, TMP_CODE_FUNCTION, TMP_CODE_NAMESPACE, TMP_CODE_FILEPATH, TMP_CODE_LINENO, TMP_HTTP_METHOD, TMP_HTTP_URL, TMP_HTTP_TARGET, TMP_HTTP_HOST, TMP_HTTP_SCHEME, TMP_HTTP_STATUS_CODE, TMP_HTTP_FLAVOR, TMP_HTTP_USER_AGENT, TMP_HTTP_REQUEST_CONTENT_LENGTH, TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED, TMP_HTTP_RESPONSE_CONTENT_LENGTH, TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED, TMP_HTTP_SERVER_NAME, TMP_HTTP_ROUTE, TMP_HTTP_CLIENT_IP, TMP_AWS_DYNAMODB_TABLE_NAMES, TMP_AWS_DYNAMODB_CONSUMED_CAPACITY, TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS, TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY, TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY, TMP_AWS_DYNAMODB_CONSISTENT_READ, TMP_AWS_DYNAMODB_PROJECTION, TMP_AWS_DYNAMODB_LIMIT, TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET, TMP_AWS_DYNAMODB_INDEX_NAME, TMP_AWS_DYNAMODB_SELECT, TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES, TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES, TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE, TMP_AWS_DYNAMODB_TABLE_COUNT, TMP_AWS_DYNAMODB_SCAN_FORWARD, TMP_AWS_DYNAMODB_SEGMENT, TMP_AWS_DYNAMODB_TOTAL_SEGMENTS, TMP_AWS_DYNAMODB_COUNT, TMP_AWS_DYNAMODB_SCANNED_COUNT, TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS, TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES, TMP_MESSAGING_SYSTEM, TMP_MESSAGING_DESTINATION, TMP_MESSAGING_DESTINATION_KIND, TMP_MESSAGING_TEMP_DESTINATION, TMP_MESSAGING_PROTOCOL, TMP_MESSAGING_PROTOCOL_VERSION, TMP_MESSAGING_URL, TMP_MESSAGING_MESSAGE_ID, TMP_MESSAGING_CONVERSATION_ID, TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES, TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES, TMP_MESSAGING_OPERATION, TMP_MESSAGING_CONSUMER_ID, TMP_MESSAGING_RABBITMQ_ROUTING_KEY, TMP_MESSAGING_KAFKA_MESSAGE_KEY, TMP_MESSAGING_KAFKA_CONSUMER_GROUP, TMP_MESSAGING_KAFKA_CLIENT_ID, TMP_MESSAGING_KAFKA_PARTITION, TMP_MESSAGING_KAFKA_TOMBSTONE, TMP_RPC_SYSTEM, TMP_RPC_SERVICE, TMP_RPC_METHOD, TMP_RPC_GRPC_STATUS_CODE, TMP_RPC_JSONRPC_VERSION, TMP_RPC_JSONRPC_REQUEST_ID, TMP_RPC_JSONRPC_ERROR_CODE, TMP_RPC_JSONRPC_ERROR_MESSAGE, TMP_MESSAGE_TYPE, TMP_MESSAGE_ID, TMP_MESSAGE_COMPRESSED_SIZE, TMP_MESSAGE_UNCOMPRESSED_SIZE, SemanticAttributes, TMP_DBSYSTEMVALUES_OTHER_SQL, TMP_DBSYSTEMVALUES_MSSQL, TMP_DBSYSTEMVALUES_MYSQL, TMP_DBSYSTEMVALUES_ORACLE, TMP_DBSYSTEMVALUES_DB2, TMP_DBSYSTEMVALUES_POSTGRESQL, TMP_DBSYSTEMVALUES_REDSHIFT, TMP_DBSYSTEMVALUES_HIVE, TMP_DBSYSTEMVALUES_CLOUDSCAPE, TMP_DBSYSTEMVALUES_HSQLDB, TMP_DBSYSTEMVALUES_PROGRESS, TMP_DBSYSTEMVALUES_MAXDB, TMP_DBSYSTEMVALUES_HANADB, TMP_DBSYSTEMVALUES_INGRES, TMP_DBSYSTEMVALUES_FIRSTSQL, TMP_DBSYSTEMVALUES_EDB, TMP_DBSYSTEMVALUES_CACHE, TMP_DBSYSTEMVALUES_ADABAS, TMP_DBSYSTEMVALUES_FIREBIRD, TMP_DBSYSTEMVALUES_DERBY, TMP_DBSYSTEMVALUES_FILEMAKER, TMP_DBSYSTEMVALUES_INFORMIX, TMP_DBSYSTEMVALUES_INSTANTDB, TMP_DBSYSTEMVALUES_INTERBASE, TMP_DBSYSTEMVALUES_MARIADB, TMP_DBSYSTEMVALUES_NETEZZA, TMP_DBSYSTEMVALUES_PERVASIVE, TMP_DBSYSTEMVALUES_POINTBASE, TMP_DBSYSTEMVALUES_SQLITE, TMP_DBSYSTEMVALUES_SYBASE, TMP_DBSYSTEMVALUES_TERADATA, TMP_DBSYSTEMVALUES_VERTICA, TMP_DBSYSTEMVALUES_H2, TMP_DBSYSTEMVALUES_COLDFUSION, TMP_DBSYSTEMVALUES_CASSANDRA, TMP_DBSYSTEMVALUES_HBASE, TMP_DBSYSTEMVALUES_MONGODB, TMP_DBSYSTEMVALUES_REDIS, TMP_DBSYSTEMVALUES_COUCHBASE, TMP_DBSYSTEMVALUES_COUCHDB, TMP_DBSYSTEMVALUES_COSMOSDB, TMP_DBSYSTEMVALUES_DYNAMODB, TMP_DBSYSTEMVALUES_NEO4J, TMP_DBSYSTEMVALUES_GEODE, TMP_DBSYSTEMVALUES_ELASTICSEARCH, TMP_DBSYSTEMVALUES_MEMCACHED, TMP_DBSYSTEMVALUES_COCKROACHDB, DbSystemValues, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL, DbCassandraConsistencyLevelValues, TMP_FAASTRIGGERVALUES_DATASOURCE, TMP_FAASTRIGGERVALUES_HTTP, TMP_FAASTRIGGERVALUES_PUBSUB, TMP_FAASTRIGGERVALUES_TIMER, TMP_FAASTRIGGERVALUES_OTHER, FaasTriggerValues, TMP_FAASDOCUMENTOPERATIONVALUES_INSERT, TMP_FAASDOCUMENTOPERATIONVALUES_EDIT, TMP_FAASDOCUMENTOPERATIONVALUES_DELETE, FaasDocumentOperationValues, TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD, TMP_FAASINVOKEDPROVIDERVALUES_AWS, TMP_FAASINVOKEDPROVIDERVALUES_AZURE, TMP_FAASINVOKEDPROVIDERVALUES_GCP, FaasInvokedProviderValues, TMP_NETTRANSPORTVALUES_IP_TCP, TMP_NETTRANSPORTVALUES_IP_UDP, TMP_NETTRANSPORTVALUES_IP, TMP_NETTRANSPORTVALUES_UNIX, TMP_NETTRANSPORTVALUES_PIPE, TMP_NETTRANSPORTVALUES_INPROC, TMP_NETTRANSPORTVALUES_OTHER, NetTransportValues, TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI, TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED, TMP_NETHOSTCONNECTIONTYPEVALUES_CELL, TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE, TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN, NetHostConnectionTypeValues, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA, NetHostConnectionSubtypeValues, TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE, TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC, MessagingDestinationKindValues, TMP_MESSAGINGOPERATIONVALUES_RECEIVE, TMP_MESSAGINGOPERATIONVALUES_PROCESS, MessagingOperationValues, TMP_MESSAGETYPEVALUES_SENT, TMP_MESSAGETYPEVALUES_RECEIVED, MessageTypeValues;
var init_SemanticAttributes = __esm({
  "node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/SemanticAttributes.js"() {
    init_utils4();
    TMP_AWS_LAMBDA_INVOKED_ARN = "aws.lambda.invoked_arn";
    TMP_DB_SYSTEM = "db.system";
    TMP_DB_CONNECTION_STRING = "db.connection_string";
    TMP_DB_USER = "db.user";
    TMP_DB_JDBC_DRIVER_CLASSNAME = "db.jdbc.driver_classname";
    TMP_DB_NAME = "db.name";
    TMP_DB_STATEMENT = "db.statement";
    TMP_DB_OPERATION = "db.operation";
    TMP_DB_MSSQL_INSTANCE_NAME = "db.mssql.instance_name";
    TMP_DB_CASSANDRA_KEYSPACE = "db.cassandra.keyspace";
    TMP_DB_CASSANDRA_PAGE_SIZE = "db.cassandra.page_size";
    TMP_DB_CASSANDRA_CONSISTENCY_LEVEL = "db.cassandra.consistency_level";
    TMP_DB_CASSANDRA_TABLE = "db.cassandra.table";
    TMP_DB_CASSANDRA_IDEMPOTENCE = "db.cassandra.idempotence";
    TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = "db.cassandra.speculative_execution_count";
    TMP_DB_CASSANDRA_COORDINATOR_ID = "db.cassandra.coordinator.id";
    TMP_DB_CASSANDRA_COORDINATOR_DC = "db.cassandra.coordinator.dc";
    TMP_DB_HBASE_NAMESPACE = "db.hbase.namespace";
    TMP_DB_REDIS_DATABASE_INDEX = "db.redis.database_index";
    TMP_DB_MONGODB_COLLECTION = "db.mongodb.collection";
    TMP_DB_SQL_TABLE = "db.sql.table";
    TMP_EXCEPTION_TYPE = "exception.type";
    TMP_EXCEPTION_MESSAGE = "exception.message";
    TMP_EXCEPTION_STACKTRACE = "exception.stacktrace";
    TMP_EXCEPTION_ESCAPED = "exception.escaped";
    TMP_FAAS_TRIGGER = "faas.trigger";
    TMP_FAAS_EXECUTION = "faas.execution";
    TMP_FAAS_DOCUMENT_COLLECTION = "faas.document.collection";
    TMP_FAAS_DOCUMENT_OPERATION = "faas.document.operation";
    TMP_FAAS_DOCUMENT_TIME = "faas.document.time";
    TMP_FAAS_DOCUMENT_NAME = "faas.document.name";
    TMP_FAAS_TIME = "faas.time";
    TMP_FAAS_CRON = "faas.cron";
    TMP_FAAS_COLDSTART = "faas.coldstart";
    TMP_FAAS_INVOKED_NAME = "faas.invoked_name";
    TMP_FAAS_INVOKED_PROVIDER = "faas.invoked_provider";
    TMP_FAAS_INVOKED_REGION = "faas.invoked_region";
    TMP_NET_TRANSPORT = "net.transport";
    TMP_NET_PEER_IP = "net.peer.ip";
    TMP_NET_PEER_PORT = "net.peer.port";
    TMP_NET_PEER_NAME = "net.peer.name";
    TMP_NET_HOST_IP = "net.host.ip";
    TMP_NET_HOST_PORT = "net.host.port";
    TMP_NET_HOST_NAME = "net.host.name";
    TMP_NET_HOST_CONNECTION_TYPE = "net.host.connection.type";
    TMP_NET_HOST_CONNECTION_SUBTYPE = "net.host.connection.subtype";
    TMP_NET_HOST_CARRIER_NAME = "net.host.carrier.name";
    TMP_NET_HOST_CARRIER_MCC = "net.host.carrier.mcc";
    TMP_NET_HOST_CARRIER_MNC = "net.host.carrier.mnc";
    TMP_NET_HOST_CARRIER_ICC = "net.host.carrier.icc";
    TMP_PEER_SERVICE = "peer.service";
    TMP_ENDUSER_ID = "enduser.id";
    TMP_ENDUSER_ROLE = "enduser.role";
    TMP_ENDUSER_SCOPE = "enduser.scope";
    TMP_THREAD_ID = "thread.id";
    TMP_THREAD_NAME = "thread.name";
    TMP_CODE_FUNCTION = "code.function";
    TMP_CODE_NAMESPACE = "code.namespace";
    TMP_CODE_FILEPATH = "code.filepath";
    TMP_CODE_LINENO = "code.lineno";
    TMP_HTTP_METHOD = "http.method";
    TMP_HTTP_URL = "http.url";
    TMP_HTTP_TARGET = "http.target";
    TMP_HTTP_HOST = "http.host";
    TMP_HTTP_SCHEME = "http.scheme";
    TMP_HTTP_STATUS_CODE = "http.status_code";
    TMP_HTTP_FLAVOR = "http.flavor";
    TMP_HTTP_USER_AGENT = "http.user_agent";
    TMP_HTTP_REQUEST_CONTENT_LENGTH = "http.request_content_length";
    TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = "http.request_content_length_uncompressed";
    TMP_HTTP_RESPONSE_CONTENT_LENGTH = "http.response_content_length";
    TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = "http.response_content_length_uncompressed";
    TMP_HTTP_SERVER_NAME = "http.server_name";
    TMP_HTTP_ROUTE = "http.route";
    TMP_HTTP_CLIENT_IP = "http.client_ip";
    TMP_AWS_DYNAMODB_TABLE_NAMES = "aws.dynamodb.table_names";
    TMP_AWS_DYNAMODB_CONSUMED_CAPACITY = "aws.dynamodb.consumed_capacity";
    TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = "aws.dynamodb.item_collection_metrics";
    TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = "aws.dynamodb.provisioned_read_capacity";
    TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = "aws.dynamodb.provisioned_write_capacity";
    TMP_AWS_DYNAMODB_CONSISTENT_READ = "aws.dynamodb.consistent_read";
    TMP_AWS_DYNAMODB_PROJECTION = "aws.dynamodb.projection";
    TMP_AWS_DYNAMODB_LIMIT = "aws.dynamodb.limit";
    TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET = "aws.dynamodb.attributes_to_get";
    TMP_AWS_DYNAMODB_INDEX_NAME = "aws.dynamodb.index_name";
    TMP_AWS_DYNAMODB_SELECT = "aws.dynamodb.select";
    TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = "aws.dynamodb.global_secondary_indexes";
    TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = "aws.dynamodb.local_secondary_indexes";
    TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = "aws.dynamodb.exclusive_start_table";
    TMP_AWS_DYNAMODB_TABLE_COUNT = "aws.dynamodb.table_count";
    TMP_AWS_DYNAMODB_SCAN_FORWARD = "aws.dynamodb.scan_forward";
    TMP_AWS_DYNAMODB_SEGMENT = "aws.dynamodb.segment";
    TMP_AWS_DYNAMODB_TOTAL_SEGMENTS = "aws.dynamodb.total_segments";
    TMP_AWS_DYNAMODB_COUNT = "aws.dynamodb.count";
    TMP_AWS_DYNAMODB_SCANNED_COUNT = "aws.dynamodb.scanned_count";
    TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = "aws.dynamodb.attribute_definitions";
    TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = "aws.dynamodb.global_secondary_index_updates";
    TMP_MESSAGING_SYSTEM = "messaging.system";
    TMP_MESSAGING_DESTINATION = "messaging.destination";
    TMP_MESSAGING_DESTINATION_KIND = "messaging.destination_kind";
    TMP_MESSAGING_TEMP_DESTINATION = "messaging.temp_destination";
    TMP_MESSAGING_PROTOCOL = "messaging.protocol";
    TMP_MESSAGING_PROTOCOL_VERSION = "messaging.protocol_version";
    TMP_MESSAGING_URL = "messaging.url";
    TMP_MESSAGING_MESSAGE_ID = "messaging.message_id";
    TMP_MESSAGING_CONVERSATION_ID = "messaging.conversation_id";
    TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = "messaging.message_payload_size_bytes";
    TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = "messaging.message_payload_compressed_size_bytes";
    TMP_MESSAGING_OPERATION = "messaging.operation";
    TMP_MESSAGING_CONSUMER_ID = "messaging.consumer_id";
    TMP_MESSAGING_RABBITMQ_ROUTING_KEY = "messaging.rabbitmq.routing_key";
    TMP_MESSAGING_KAFKA_MESSAGE_KEY = "messaging.kafka.message_key";
    TMP_MESSAGING_KAFKA_CONSUMER_GROUP = "messaging.kafka.consumer_group";
    TMP_MESSAGING_KAFKA_CLIENT_ID = "messaging.kafka.client_id";
    TMP_MESSAGING_KAFKA_PARTITION = "messaging.kafka.partition";
    TMP_MESSAGING_KAFKA_TOMBSTONE = "messaging.kafka.tombstone";
    TMP_RPC_SYSTEM = "rpc.system";
    TMP_RPC_SERVICE = "rpc.service";
    TMP_RPC_METHOD = "rpc.method";
    TMP_RPC_GRPC_STATUS_CODE = "rpc.grpc.status_code";
    TMP_RPC_JSONRPC_VERSION = "rpc.jsonrpc.version";
    TMP_RPC_JSONRPC_REQUEST_ID = "rpc.jsonrpc.request_id";
    TMP_RPC_JSONRPC_ERROR_CODE = "rpc.jsonrpc.error_code";
    TMP_RPC_JSONRPC_ERROR_MESSAGE = "rpc.jsonrpc.error_message";
    TMP_MESSAGE_TYPE = "message.type";
    TMP_MESSAGE_ID = "message.id";
    TMP_MESSAGE_COMPRESSED_SIZE = "message.compressed_size";
    TMP_MESSAGE_UNCOMPRESSED_SIZE = "message.uncompressed_size";
    SemanticAttributes = createConstMap([TMP_AWS_LAMBDA_INVOKED_ARN, TMP_DB_SYSTEM, TMP_DB_CONNECTION_STRING, TMP_DB_USER, TMP_DB_JDBC_DRIVER_CLASSNAME, TMP_DB_NAME, TMP_DB_STATEMENT, TMP_DB_OPERATION, TMP_DB_MSSQL_INSTANCE_NAME, TMP_DB_CASSANDRA_KEYSPACE, TMP_DB_CASSANDRA_PAGE_SIZE, TMP_DB_CASSANDRA_CONSISTENCY_LEVEL, TMP_DB_CASSANDRA_TABLE, TMP_DB_CASSANDRA_IDEMPOTENCE, TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT, TMP_DB_CASSANDRA_COORDINATOR_ID, TMP_DB_CASSANDRA_COORDINATOR_DC, TMP_DB_HBASE_NAMESPACE, TMP_DB_REDIS_DATABASE_INDEX, TMP_DB_MONGODB_COLLECTION, TMP_DB_SQL_TABLE, TMP_EXCEPTION_TYPE, TMP_EXCEPTION_MESSAGE, TMP_EXCEPTION_STACKTRACE, TMP_EXCEPTION_ESCAPED, TMP_FAAS_TRIGGER, TMP_FAAS_EXECUTION, TMP_FAAS_DOCUMENT_COLLECTION, TMP_FAAS_DOCUMENT_OPERATION, TMP_FAAS_DOCUMENT_TIME, TMP_FAAS_DOCUMENT_NAME, TMP_FAAS_TIME, TMP_FAAS_CRON, TMP_FAAS_COLDSTART, TMP_FAAS_INVOKED_NAME, TMP_FAAS_INVOKED_PROVIDER, TMP_FAAS_INVOKED_REGION, TMP_NET_TRANSPORT, TMP_NET_PEER_IP, TMP_NET_PEER_PORT, TMP_NET_PEER_NAME, TMP_NET_HOST_IP, TMP_NET_HOST_PORT, TMP_NET_HOST_NAME, TMP_NET_HOST_CONNECTION_TYPE, TMP_NET_HOST_CONNECTION_SUBTYPE, TMP_NET_HOST_CARRIER_NAME, TMP_NET_HOST_CARRIER_MCC, TMP_NET_HOST_CARRIER_MNC, TMP_NET_HOST_CARRIER_ICC, TMP_PEER_SERVICE, TMP_ENDUSER_ID, TMP_ENDUSER_ROLE, TMP_ENDUSER_SCOPE, TMP_THREAD_ID, TMP_THREAD_NAME, TMP_CODE_FUNCTION, TMP_CODE_NAMESPACE, TMP_CODE_FILEPATH, TMP_CODE_LINENO, TMP_HTTP_METHOD, TMP_HTTP_URL, TMP_HTTP_TARGET, TMP_HTTP_HOST, TMP_HTTP_SCHEME, TMP_HTTP_STATUS_CODE, TMP_HTTP_FLAVOR, TMP_HTTP_USER_AGENT, TMP_HTTP_REQUEST_CONTENT_LENGTH, TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED, TMP_HTTP_RESPONSE_CONTENT_LENGTH, TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED, TMP_HTTP_SERVER_NAME, TMP_HTTP_ROUTE, TMP_HTTP_CLIENT_IP, TMP_AWS_DYNAMODB_TABLE_NAMES, TMP_AWS_DYNAMODB_CONSUMED_CAPACITY, TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS, TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY, TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY, TMP_AWS_DYNAMODB_CONSISTENT_READ, TMP_AWS_DYNAMODB_PROJECTION, TMP_AWS_DYNAMODB_LIMIT, TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET, TMP_AWS_DYNAMODB_INDEX_NAME, TMP_AWS_DYNAMODB_SELECT, TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES, TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES, TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE, TMP_AWS_DYNAMODB_TABLE_COUNT, TMP_AWS_DYNAMODB_SCAN_FORWARD, TMP_AWS_DYNAMODB_SEGMENT, TMP_AWS_DYNAMODB_TOTAL_SEGMENTS, TMP_AWS_DYNAMODB_COUNT, TMP_AWS_DYNAMODB_SCANNED_COUNT, TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS, TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES, TMP_MESSAGING_SYSTEM, TMP_MESSAGING_DESTINATION, TMP_MESSAGING_DESTINATION_KIND, TMP_MESSAGING_TEMP_DESTINATION, TMP_MESSAGING_PROTOCOL, TMP_MESSAGING_PROTOCOL_VERSION, TMP_MESSAGING_URL, TMP_MESSAGING_MESSAGE_ID, TMP_MESSAGING_CONVERSATION_ID, TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES, TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES, TMP_MESSAGING_OPERATION, TMP_MESSAGING_CONSUMER_ID, TMP_MESSAGING_RABBITMQ_ROUTING_KEY, TMP_MESSAGING_KAFKA_MESSAGE_KEY, TMP_MESSAGING_KAFKA_CONSUMER_GROUP, TMP_MESSAGING_KAFKA_CLIENT_ID, TMP_MESSAGING_KAFKA_PARTITION, TMP_MESSAGING_KAFKA_TOMBSTONE, TMP_RPC_SYSTEM, TMP_RPC_SERVICE, TMP_RPC_METHOD, TMP_RPC_GRPC_STATUS_CODE, TMP_RPC_JSONRPC_VERSION, TMP_RPC_JSONRPC_REQUEST_ID, TMP_RPC_JSONRPC_ERROR_CODE, TMP_RPC_JSONRPC_ERROR_MESSAGE, TMP_MESSAGE_TYPE, TMP_MESSAGE_ID, TMP_MESSAGE_COMPRESSED_SIZE, TMP_MESSAGE_UNCOMPRESSED_SIZE]);
    TMP_DBSYSTEMVALUES_OTHER_SQL = "other_sql";
    TMP_DBSYSTEMVALUES_MSSQL = "mssql";
    TMP_DBSYSTEMVALUES_MYSQL = "mysql";
    TMP_DBSYSTEMVALUES_ORACLE = "oracle";
    TMP_DBSYSTEMVALUES_DB2 = "db2";
    TMP_DBSYSTEMVALUES_POSTGRESQL = "postgresql";
    TMP_DBSYSTEMVALUES_REDSHIFT = "redshift";
    TMP_DBSYSTEMVALUES_HIVE = "hive";
    TMP_DBSYSTEMVALUES_CLOUDSCAPE = "cloudscape";
    TMP_DBSYSTEMVALUES_HSQLDB = "hsqldb";
    TMP_DBSYSTEMVALUES_PROGRESS = "progress";
    TMP_DBSYSTEMVALUES_MAXDB = "maxdb";
    TMP_DBSYSTEMVALUES_HANADB = "hanadb";
    TMP_DBSYSTEMVALUES_INGRES = "ingres";
    TMP_DBSYSTEMVALUES_FIRSTSQL = "firstsql";
    TMP_DBSYSTEMVALUES_EDB = "edb";
    TMP_DBSYSTEMVALUES_CACHE = "cache";
    TMP_DBSYSTEMVALUES_ADABAS = "adabas";
    TMP_DBSYSTEMVALUES_FIREBIRD = "firebird";
    TMP_DBSYSTEMVALUES_DERBY = "derby";
    TMP_DBSYSTEMVALUES_FILEMAKER = "filemaker";
    TMP_DBSYSTEMVALUES_INFORMIX = "informix";
    TMP_DBSYSTEMVALUES_INSTANTDB = "instantdb";
    TMP_DBSYSTEMVALUES_INTERBASE = "interbase";
    TMP_DBSYSTEMVALUES_MARIADB = "mariadb";
    TMP_DBSYSTEMVALUES_NETEZZA = "netezza";
    TMP_DBSYSTEMVALUES_PERVASIVE = "pervasive";
    TMP_DBSYSTEMVALUES_POINTBASE = "pointbase";
    TMP_DBSYSTEMVALUES_SQLITE = "sqlite";
    TMP_DBSYSTEMVALUES_SYBASE = "sybase";
    TMP_DBSYSTEMVALUES_TERADATA = "teradata";
    TMP_DBSYSTEMVALUES_VERTICA = "vertica";
    TMP_DBSYSTEMVALUES_H2 = "h2";
    TMP_DBSYSTEMVALUES_COLDFUSION = "coldfusion";
    TMP_DBSYSTEMVALUES_CASSANDRA = "cassandra";
    TMP_DBSYSTEMVALUES_HBASE = "hbase";
    TMP_DBSYSTEMVALUES_MONGODB = "mongodb";
    TMP_DBSYSTEMVALUES_REDIS = "redis";
    TMP_DBSYSTEMVALUES_COUCHBASE = "couchbase";
    TMP_DBSYSTEMVALUES_COUCHDB = "couchdb";
    TMP_DBSYSTEMVALUES_COSMOSDB = "cosmosdb";
    TMP_DBSYSTEMVALUES_DYNAMODB = "dynamodb";
    TMP_DBSYSTEMVALUES_NEO4J = "neo4j";
    TMP_DBSYSTEMVALUES_GEODE = "geode";
    TMP_DBSYSTEMVALUES_ELASTICSEARCH = "elasticsearch";
    TMP_DBSYSTEMVALUES_MEMCACHED = "memcached";
    TMP_DBSYSTEMVALUES_COCKROACHDB = "cockroachdb";
    DbSystemValues = createConstMap([TMP_DBSYSTEMVALUES_OTHER_SQL, TMP_DBSYSTEMVALUES_MSSQL, TMP_DBSYSTEMVALUES_MYSQL, TMP_DBSYSTEMVALUES_ORACLE, TMP_DBSYSTEMVALUES_DB2, TMP_DBSYSTEMVALUES_POSTGRESQL, TMP_DBSYSTEMVALUES_REDSHIFT, TMP_DBSYSTEMVALUES_HIVE, TMP_DBSYSTEMVALUES_CLOUDSCAPE, TMP_DBSYSTEMVALUES_HSQLDB, TMP_DBSYSTEMVALUES_PROGRESS, TMP_DBSYSTEMVALUES_MAXDB, TMP_DBSYSTEMVALUES_HANADB, TMP_DBSYSTEMVALUES_INGRES, TMP_DBSYSTEMVALUES_FIRSTSQL, TMP_DBSYSTEMVALUES_EDB, TMP_DBSYSTEMVALUES_CACHE, TMP_DBSYSTEMVALUES_ADABAS, TMP_DBSYSTEMVALUES_FIREBIRD, TMP_DBSYSTEMVALUES_DERBY, TMP_DBSYSTEMVALUES_FILEMAKER, TMP_DBSYSTEMVALUES_INFORMIX, TMP_DBSYSTEMVALUES_INSTANTDB, TMP_DBSYSTEMVALUES_INTERBASE, TMP_DBSYSTEMVALUES_MARIADB, TMP_DBSYSTEMVALUES_NETEZZA, TMP_DBSYSTEMVALUES_PERVASIVE, TMP_DBSYSTEMVALUES_POINTBASE, TMP_DBSYSTEMVALUES_SQLITE, TMP_DBSYSTEMVALUES_SYBASE, TMP_DBSYSTEMVALUES_TERADATA, TMP_DBSYSTEMVALUES_VERTICA, TMP_DBSYSTEMVALUES_H2, TMP_DBSYSTEMVALUES_COLDFUSION, TMP_DBSYSTEMVALUES_CASSANDRA, TMP_DBSYSTEMVALUES_HBASE, TMP_DBSYSTEMVALUES_MONGODB, TMP_DBSYSTEMVALUES_REDIS, TMP_DBSYSTEMVALUES_COUCHBASE, TMP_DBSYSTEMVALUES_COUCHDB, TMP_DBSYSTEMVALUES_COSMOSDB, TMP_DBSYSTEMVALUES_DYNAMODB, TMP_DBSYSTEMVALUES_NEO4J, TMP_DBSYSTEMVALUES_GEODE, TMP_DBSYSTEMVALUES_ELASTICSEARCH, TMP_DBSYSTEMVALUES_MEMCACHED, TMP_DBSYSTEMVALUES_COCKROACHDB]);
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL = "all";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = "each_quorum";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = "quorum";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = "local_quorum";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE = "one";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO = "two";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE = "three";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = "local_one";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY = "any";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = "serial";
    TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = "local_serial";
    DbCassandraConsistencyLevelValues = createConstMap([TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL, TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL]);
    TMP_FAASTRIGGERVALUES_DATASOURCE = "datasource";
    TMP_FAASTRIGGERVALUES_HTTP = "http";
    TMP_FAASTRIGGERVALUES_PUBSUB = "pubsub";
    TMP_FAASTRIGGERVALUES_TIMER = "timer";
    TMP_FAASTRIGGERVALUES_OTHER = "other";
    FaasTriggerValues = createConstMap([TMP_FAASTRIGGERVALUES_DATASOURCE, TMP_FAASTRIGGERVALUES_HTTP, TMP_FAASTRIGGERVALUES_PUBSUB, TMP_FAASTRIGGERVALUES_TIMER, TMP_FAASTRIGGERVALUES_OTHER]);
    TMP_FAASDOCUMENTOPERATIONVALUES_INSERT = "insert";
    TMP_FAASDOCUMENTOPERATIONVALUES_EDIT = "edit";
    TMP_FAASDOCUMENTOPERATIONVALUES_DELETE = "delete";
    FaasDocumentOperationValues = createConstMap([TMP_FAASDOCUMENTOPERATIONVALUES_INSERT, TMP_FAASDOCUMENTOPERATIONVALUES_EDIT, TMP_FAASDOCUMENTOPERATIONVALUES_DELETE]);
    TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = "alibaba_cloud";
    TMP_FAASINVOKEDPROVIDERVALUES_AWS = "aws";
    TMP_FAASINVOKEDPROVIDERVALUES_AZURE = "azure";
    TMP_FAASINVOKEDPROVIDERVALUES_GCP = "gcp";
    FaasInvokedProviderValues = createConstMap([TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD, TMP_FAASINVOKEDPROVIDERVALUES_AWS, TMP_FAASINVOKEDPROVIDERVALUES_AZURE, TMP_FAASINVOKEDPROVIDERVALUES_GCP]);
    TMP_NETTRANSPORTVALUES_IP_TCP = "ip_tcp";
    TMP_NETTRANSPORTVALUES_IP_UDP = "ip_udp";
    TMP_NETTRANSPORTVALUES_IP = "ip";
    TMP_NETTRANSPORTVALUES_UNIX = "unix";
    TMP_NETTRANSPORTVALUES_PIPE = "pipe";
    TMP_NETTRANSPORTVALUES_INPROC = "inproc";
    TMP_NETTRANSPORTVALUES_OTHER = "other";
    NetTransportValues = createConstMap([TMP_NETTRANSPORTVALUES_IP_TCP, TMP_NETTRANSPORTVALUES_IP_UDP, TMP_NETTRANSPORTVALUES_IP, TMP_NETTRANSPORTVALUES_UNIX, TMP_NETTRANSPORTVALUES_PIPE, TMP_NETTRANSPORTVALUES_INPROC, TMP_NETTRANSPORTVALUES_OTHER]);
    TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI = "wifi";
    TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED = "wired";
    TMP_NETHOSTCONNECTIONTYPEVALUES_CELL = "cell";
    TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = "unavailable";
    TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = "unknown";
    NetHostConnectionTypeValues = createConstMap([TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI, TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED, TMP_NETHOSTCONNECTIONTYPEVALUES_CELL, TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE, TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN]);
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = "gprs";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = "edge";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = "umts";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = "cdma";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = "evdo_0";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = "evdo_a";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = "cdma2000_1xrtt";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = "hsdpa";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = "hsupa";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = "hspa";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = "iden";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = "evdo_b";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE = "lte";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = "ehrpd";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = "hspap";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM = "gsm";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = "td_scdma";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = "iwlan";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR = "nr";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = "nrnsa";
    TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = "lte_ca";
    NetHostConnectionSubtypeValues = createConstMap([TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA, TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA]);
    TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE = "queue";
    TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC = "topic";
    MessagingDestinationKindValues = createConstMap([TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE, TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC]);
    TMP_MESSAGINGOPERATIONVALUES_RECEIVE = "receive";
    TMP_MESSAGINGOPERATIONVALUES_PROCESS = "process";
    MessagingOperationValues = createConstMap([TMP_MESSAGINGOPERATIONVALUES_RECEIVE, TMP_MESSAGINGOPERATIONVALUES_PROCESS]);
    TMP_MESSAGETYPEVALUES_SENT = "SENT";
    TMP_MESSAGETYPEVALUES_RECEIVED = "RECEIVED";
    MessageTypeValues = createConstMap([TMP_MESSAGETYPEVALUES_SENT, TMP_MESSAGETYPEVALUES_RECEIVED]);
  }
});

// node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/index.js
var init_trace2 = __esm({
  "node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/index.js"() {
    init_SemanticAttributes();
  }
});

// node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/resource/SemanticResourceAttributes.js
var TMP_CLOUD_PROVIDER, TMP_CLOUD_ACCOUNT_ID, TMP_CLOUD_REGION, TMP_CLOUD_AVAILABILITY_ZONE, TMP_CLOUD_PLATFORM, TMP_AWS_ECS_CONTAINER_ARN, TMP_AWS_ECS_CLUSTER_ARN, TMP_AWS_ECS_LAUNCHTYPE, TMP_AWS_ECS_TASK_ARN, TMP_AWS_ECS_TASK_FAMILY, TMP_AWS_ECS_TASK_REVISION, TMP_AWS_EKS_CLUSTER_ARN, TMP_AWS_LOG_GROUP_NAMES, TMP_AWS_LOG_GROUP_ARNS, TMP_AWS_LOG_STREAM_NAMES, TMP_AWS_LOG_STREAM_ARNS, TMP_CONTAINER_NAME, TMP_CONTAINER_ID, TMP_CONTAINER_RUNTIME, TMP_CONTAINER_IMAGE_NAME, TMP_CONTAINER_IMAGE_TAG, TMP_DEPLOYMENT_ENVIRONMENT, TMP_DEVICE_ID, TMP_DEVICE_MODEL_IDENTIFIER, TMP_DEVICE_MODEL_NAME, TMP_FAAS_NAME, TMP_FAAS_ID, TMP_FAAS_VERSION, TMP_FAAS_INSTANCE, TMP_FAAS_MAX_MEMORY, TMP_HOST_ID, TMP_HOST_NAME, TMP_HOST_TYPE, TMP_HOST_ARCH, TMP_HOST_IMAGE_NAME, TMP_HOST_IMAGE_ID, TMP_HOST_IMAGE_VERSION, TMP_K8S_CLUSTER_NAME, TMP_K8S_NODE_NAME, TMP_K8S_NODE_UID, TMP_K8S_NAMESPACE_NAME, TMP_K8S_POD_UID, TMP_K8S_POD_NAME, TMP_K8S_CONTAINER_NAME, TMP_K8S_REPLICASET_UID, TMP_K8S_REPLICASET_NAME, TMP_K8S_DEPLOYMENT_UID, TMP_K8S_DEPLOYMENT_NAME, TMP_K8S_STATEFULSET_UID, TMP_K8S_STATEFULSET_NAME, TMP_K8S_DAEMONSET_UID, TMP_K8S_DAEMONSET_NAME, TMP_K8S_JOB_UID, TMP_K8S_JOB_NAME, TMP_K8S_CRONJOB_UID, TMP_K8S_CRONJOB_NAME, TMP_OS_TYPE, TMP_OS_DESCRIPTION, TMP_OS_NAME, TMP_OS_VERSION, TMP_PROCESS_PID, TMP_PROCESS_EXECUTABLE_NAME, TMP_PROCESS_EXECUTABLE_PATH, TMP_PROCESS_COMMAND, TMP_PROCESS_COMMAND_LINE, TMP_PROCESS_COMMAND_ARGS, TMP_PROCESS_OWNER, TMP_PROCESS_RUNTIME_NAME, TMP_PROCESS_RUNTIME_VERSION, TMP_PROCESS_RUNTIME_DESCRIPTION, TMP_SERVICE_NAME, TMP_SERVICE_NAMESPACE, TMP_SERVICE_INSTANCE_ID, TMP_SERVICE_VERSION, TMP_TELEMETRY_SDK_NAME, TMP_TELEMETRY_SDK_LANGUAGE, TMP_TELEMETRY_SDK_VERSION, TMP_TELEMETRY_AUTO_VERSION, TMP_WEBENGINE_NAME, TMP_WEBENGINE_VERSION, TMP_WEBENGINE_DESCRIPTION, SEMRESATTRS_PROCESS_RUNTIME_NAME, SEMRESATTRS_TELEMETRY_SDK_NAME, SEMRESATTRS_TELEMETRY_SDK_LANGUAGE, SEMRESATTRS_TELEMETRY_SDK_VERSION, SemanticResourceAttributes, TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD, TMP_CLOUDPROVIDERVALUES_AWS, TMP_CLOUDPROVIDERVALUES_AZURE, TMP_CLOUDPROVIDERVALUES_GCP, CloudProviderValues, TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS, TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC, TMP_CLOUDPLATFORMVALUES_AWS_EC2, TMP_CLOUDPLATFORMVALUES_AWS_ECS, TMP_CLOUDPLATFORMVALUES_AWS_EKS, TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA, TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK, TMP_CLOUDPLATFORMVALUES_AZURE_VM, TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES, TMP_CLOUDPLATFORMVALUES_AZURE_AKS, TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS, TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE, TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE, TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN, TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE, TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS, TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE, CloudPlatformValues, TMP_AWSECSLAUNCHTYPEVALUES_EC2, TMP_AWSECSLAUNCHTYPEVALUES_FARGATE, AwsEcsLaunchtypeValues, TMP_HOSTARCHVALUES_AMD64, TMP_HOSTARCHVALUES_ARM32, TMP_HOSTARCHVALUES_ARM64, TMP_HOSTARCHVALUES_IA64, TMP_HOSTARCHVALUES_PPC32, TMP_HOSTARCHVALUES_PPC64, TMP_HOSTARCHVALUES_X86, HostArchValues, TMP_OSTYPEVALUES_WINDOWS, TMP_OSTYPEVALUES_LINUX, TMP_OSTYPEVALUES_DARWIN, TMP_OSTYPEVALUES_FREEBSD, TMP_OSTYPEVALUES_NETBSD, TMP_OSTYPEVALUES_OPENBSD, TMP_OSTYPEVALUES_DRAGONFLYBSD, TMP_OSTYPEVALUES_HPUX, TMP_OSTYPEVALUES_AIX, TMP_OSTYPEVALUES_SOLARIS, TMP_OSTYPEVALUES_Z_OS, OsTypeValues, TMP_TELEMETRYSDKLANGUAGEVALUES_CPP, TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET, TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG, TMP_TELEMETRYSDKLANGUAGEVALUES_GO, TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA, TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS, TMP_TELEMETRYSDKLANGUAGEVALUES_PHP, TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON, TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY, TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS, TELEMETRYSDKLANGUAGEVALUES_NODEJS, TelemetrySdkLanguageValues;
var init_SemanticResourceAttributes = __esm({
  "node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/resource/SemanticResourceAttributes.js"() {
    init_utils4();
    TMP_CLOUD_PROVIDER = "cloud.provider";
    TMP_CLOUD_ACCOUNT_ID = "cloud.account.id";
    TMP_CLOUD_REGION = "cloud.region";
    TMP_CLOUD_AVAILABILITY_ZONE = "cloud.availability_zone";
    TMP_CLOUD_PLATFORM = "cloud.platform";
    TMP_AWS_ECS_CONTAINER_ARN = "aws.ecs.container.arn";
    TMP_AWS_ECS_CLUSTER_ARN = "aws.ecs.cluster.arn";
    TMP_AWS_ECS_LAUNCHTYPE = "aws.ecs.launchtype";
    TMP_AWS_ECS_TASK_ARN = "aws.ecs.task.arn";
    TMP_AWS_ECS_TASK_FAMILY = "aws.ecs.task.family";
    TMP_AWS_ECS_TASK_REVISION = "aws.ecs.task.revision";
    TMP_AWS_EKS_CLUSTER_ARN = "aws.eks.cluster.arn";
    TMP_AWS_LOG_GROUP_NAMES = "aws.log.group.names";
    TMP_AWS_LOG_GROUP_ARNS = "aws.log.group.arns";
    TMP_AWS_LOG_STREAM_NAMES = "aws.log.stream.names";
    TMP_AWS_LOG_STREAM_ARNS = "aws.log.stream.arns";
    TMP_CONTAINER_NAME = "container.name";
    TMP_CONTAINER_ID = "container.id";
    TMP_CONTAINER_RUNTIME = "container.runtime";
    TMP_CONTAINER_IMAGE_NAME = "container.image.name";
    TMP_CONTAINER_IMAGE_TAG = "container.image.tag";
    TMP_DEPLOYMENT_ENVIRONMENT = "deployment.environment";
    TMP_DEVICE_ID = "device.id";
    TMP_DEVICE_MODEL_IDENTIFIER = "device.model.identifier";
    TMP_DEVICE_MODEL_NAME = "device.model.name";
    TMP_FAAS_NAME = "faas.name";
    TMP_FAAS_ID = "faas.id";
    TMP_FAAS_VERSION = "faas.version";
    TMP_FAAS_INSTANCE = "faas.instance";
    TMP_FAAS_MAX_MEMORY = "faas.max_memory";
    TMP_HOST_ID = "host.id";
    TMP_HOST_NAME = "host.name";
    TMP_HOST_TYPE = "host.type";
    TMP_HOST_ARCH = "host.arch";
    TMP_HOST_IMAGE_NAME = "host.image.name";
    TMP_HOST_IMAGE_ID = "host.image.id";
    TMP_HOST_IMAGE_VERSION = "host.image.version";
    TMP_K8S_CLUSTER_NAME = "k8s.cluster.name";
    TMP_K8S_NODE_NAME = "k8s.node.name";
    TMP_K8S_NODE_UID = "k8s.node.uid";
    TMP_K8S_NAMESPACE_NAME = "k8s.namespace.name";
    TMP_K8S_POD_UID = "k8s.pod.uid";
    TMP_K8S_POD_NAME = "k8s.pod.name";
    TMP_K8S_CONTAINER_NAME = "k8s.container.name";
    TMP_K8S_REPLICASET_UID = "k8s.replicaset.uid";
    TMP_K8S_REPLICASET_NAME = "k8s.replicaset.name";
    TMP_K8S_DEPLOYMENT_UID = "k8s.deployment.uid";
    TMP_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
    TMP_K8S_STATEFULSET_UID = "k8s.statefulset.uid";
    TMP_K8S_STATEFULSET_NAME = "k8s.statefulset.name";
    TMP_K8S_DAEMONSET_UID = "k8s.daemonset.uid";
    TMP_K8S_DAEMONSET_NAME = "k8s.daemonset.name";
    TMP_K8S_JOB_UID = "k8s.job.uid";
    TMP_K8S_JOB_NAME = "k8s.job.name";
    TMP_K8S_CRONJOB_UID = "k8s.cronjob.uid";
    TMP_K8S_CRONJOB_NAME = "k8s.cronjob.name";
    TMP_OS_TYPE = "os.type";
    TMP_OS_DESCRIPTION = "os.description";
    TMP_OS_NAME = "os.name";
    TMP_OS_VERSION = "os.version";
    TMP_PROCESS_PID = "process.pid";
    TMP_PROCESS_EXECUTABLE_NAME = "process.executable.name";
    TMP_PROCESS_EXECUTABLE_PATH = "process.executable.path";
    TMP_PROCESS_COMMAND = "process.command";
    TMP_PROCESS_COMMAND_LINE = "process.command_line";
    TMP_PROCESS_COMMAND_ARGS = "process.command_args";
    TMP_PROCESS_OWNER = "process.owner";
    TMP_PROCESS_RUNTIME_NAME = "process.runtime.name";
    TMP_PROCESS_RUNTIME_VERSION = "process.runtime.version";
    TMP_PROCESS_RUNTIME_DESCRIPTION = "process.runtime.description";
    TMP_SERVICE_NAME = "service.name";
    TMP_SERVICE_NAMESPACE = "service.namespace";
    TMP_SERVICE_INSTANCE_ID = "service.instance.id";
    TMP_SERVICE_VERSION = "service.version";
    TMP_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
    TMP_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
    TMP_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
    TMP_TELEMETRY_AUTO_VERSION = "telemetry.auto.version";
    TMP_WEBENGINE_NAME = "webengine.name";
    TMP_WEBENGINE_VERSION = "webengine.version";
    TMP_WEBENGINE_DESCRIPTION = "webengine.description";
    SEMRESATTRS_PROCESS_RUNTIME_NAME = TMP_PROCESS_RUNTIME_NAME;
    SEMRESATTRS_TELEMETRY_SDK_NAME = TMP_TELEMETRY_SDK_NAME;
    SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = TMP_TELEMETRY_SDK_LANGUAGE;
    SEMRESATTRS_TELEMETRY_SDK_VERSION = TMP_TELEMETRY_SDK_VERSION;
    SemanticResourceAttributes = createConstMap([TMP_CLOUD_PROVIDER, TMP_CLOUD_ACCOUNT_ID, TMP_CLOUD_REGION, TMP_CLOUD_AVAILABILITY_ZONE, TMP_CLOUD_PLATFORM, TMP_AWS_ECS_CONTAINER_ARN, TMP_AWS_ECS_CLUSTER_ARN, TMP_AWS_ECS_LAUNCHTYPE, TMP_AWS_ECS_TASK_ARN, TMP_AWS_ECS_TASK_FAMILY, TMP_AWS_ECS_TASK_REVISION, TMP_AWS_EKS_CLUSTER_ARN, TMP_AWS_LOG_GROUP_NAMES, TMP_AWS_LOG_GROUP_ARNS, TMP_AWS_LOG_STREAM_NAMES, TMP_AWS_LOG_STREAM_ARNS, TMP_CONTAINER_NAME, TMP_CONTAINER_ID, TMP_CONTAINER_RUNTIME, TMP_CONTAINER_IMAGE_NAME, TMP_CONTAINER_IMAGE_TAG, TMP_DEPLOYMENT_ENVIRONMENT, TMP_DEVICE_ID, TMP_DEVICE_MODEL_IDENTIFIER, TMP_DEVICE_MODEL_NAME, TMP_FAAS_NAME, TMP_FAAS_ID, TMP_FAAS_VERSION, TMP_FAAS_INSTANCE, TMP_FAAS_MAX_MEMORY, TMP_HOST_ID, TMP_HOST_NAME, TMP_HOST_TYPE, TMP_HOST_ARCH, TMP_HOST_IMAGE_NAME, TMP_HOST_IMAGE_ID, TMP_HOST_IMAGE_VERSION, TMP_K8S_CLUSTER_NAME, TMP_K8S_NODE_NAME, TMP_K8S_NODE_UID, TMP_K8S_NAMESPACE_NAME, TMP_K8S_POD_UID, TMP_K8S_POD_NAME, TMP_K8S_CONTAINER_NAME, TMP_K8S_REPLICASET_UID, TMP_K8S_REPLICASET_NAME, TMP_K8S_DEPLOYMENT_UID, TMP_K8S_DEPLOYMENT_NAME, TMP_K8S_STATEFULSET_UID, TMP_K8S_STATEFULSET_NAME, TMP_K8S_DAEMONSET_UID, TMP_K8S_DAEMONSET_NAME, TMP_K8S_JOB_UID, TMP_K8S_JOB_NAME, TMP_K8S_CRONJOB_UID, TMP_K8S_CRONJOB_NAME, TMP_OS_TYPE, TMP_OS_DESCRIPTION, TMP_OS_NAME, TMP_OS_VERSION, TMP_PROCESS_PID, TMP_PROCESS_EXECUTABLE_NAME, TMP_PROCESS_EXECUTABLE_PATH, TMP_PROCESS_COMMAND, TMP_PROCESS_COMMAND_LINE, TMP_PROCESS_COMMAND_ARGS, TMP_PROCESS_OWNER, TMP_PROCESS_RUNTIME_NAME, TMP_PROCESS_RUNTIME_VERSION, TMP_PROCESS_RUNTIME_DESCRIPTION, TMP_SERVICE_NAME, TMP_SERVICE_NAMESPACE, TMP_SERVICE_INSTANCE_ID, TMP_SERVICE_VERSION, TMP_TELEMETRY_SDK_NAME, TMP_TELEMETRY_SDK_LANGUAGE, TMP_TELEMETRY_SDK_VERSION, TMP_TELEMETRY_AUTO_VERSION, TMP_WEBENGINE_NAME, TMP_WEBENGINE_VERSION, TMP_WEBENGINE_DESCRIPTION]);
    TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD = "alibaba_cloud";
    TMP_CLOUDPROVIDERVALUES_AWS = "aws";
    TMP_CLOUDPROVIDERVALUES_AZURE = "azure";
    TMP_CLOUDPROVIDERVALUES_GCP = "gcp";
    CloudProviderValues = createConstMap([TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD, TMP_CLOUDPROVIDERVALUES_AWS, TMP_CLOUDPROVIDERVALUES_AZURE, TMP_CLOUDPROVIDERVALUES_GCP]);
    TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = "alibaba_cloud_ecs";
    TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = "alibaba_cloud_fc";
    TMP_CLOUDPLATFORMVALUES_AWS_EC2 = "aws_ec2";
    TMP_CLOUDPLATFORMVALUES_AWS_ECS = "aws_ecs";
    TMP_CLOUDPLATFORMVALUES_AWS_EKS = "aws_eks";
    TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA = "aws_lambda";
    TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = "aws_elastic_beanstalk";
    TMP_CLOUDPLATFORMVALUES_AZURE_VM = "azure_vm";
    TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = "azure_container_instances";
    TMP_CLOUDPLATFORMVALUES_AZURE_AKS = "azure_aks";
    TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = "azure_functions";
    TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = "azure_app_service";
    TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = "gcp_compute_engine";
    TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = "gcp_cloud_run";
    TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = "gcp_kubernetes_engine";
    TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = "gcp_cloud_functions";
    TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE = "gcp_app_engine";
    CloudPlatformValues = createConstMap([TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS, TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC, TMP_CLOUDPLATFORMVALUES_AWS_EC2, TMP_CLOUDPLATFORMVALUES_AWS_ECS, TMP_CLOUDPLATFORMVALUES_AWS_EKS, TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA, TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK, TMP_CLOUDPLATFORMVALUES_AZURE_VM, TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES, TMP_CLOUDPLATFORMVALUES_AZURE_AKS, TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS, TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE, TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE, TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN, TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE, TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS, TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE]);
    TMP_AWSECSLAUNCHTYPEVALUES_EC2 = "ec2";
    TMP_AWSECSLAUNCHTYPEVALUES_FARGATE = "fargate";
    AwsEcsLaunchtypeValues = createConstMap([TMP_AWSECSLAUNCHTYPEVALUES_EC2, TMP_AWSECSLAUNCHTYPEVALUES_FARGATE]);
    TMP_HOSTARCHVALUES_AMD64 = "amd64";
    TMP_HOSTARCHVALUES_ARM32 = "arm32";
    TMP_HOSTARCHVALUES_ARM64 = "arm64";
    TMP_HOSTARCHVALUES_IA64 = "ia64";
    TMP_HOSTARCHVALUES_PPC32 = "ppc32";
    TMP_HOSTARCHVALUES_PPC64 = "ppc64";
    TMP_HOSTARCHVALUES_X86 = "x86";
    HostArchValues = createConstMap([TMP_HOSTARCHVALUES_AMD64, TMP_HOSTARCHVALUES_ARM32, TMP_HOSTARCHVALUES_ARM64, TMP_HOSTARCHVALUES_IA64, TMP_HOSTARCHVALUES_PPC32, TMP_HOSTARCHVALUES_PPC64, TMP_HOSTARCHVALUES_X86]);
    TMP_OSTYPEVALUES_WINDOWS = "windows";
    TMP_OSTYPEVALUES_LINUX = "linux";
    TMP_OSTYPEVALUES_DARWIN = "darwin";
    TMP_OSTYPEVALUES_FREEBSD = "freebsd";
    TMP_OSTYPEVALUES_NETBSD = "netbsd";
    TMP_OSTYPEVALUES_OPENBSD = "openbsd";
    TMP_OSTYPEVALUES_DRAGONFLYBSD = "dragonflybsd";
    TMP_OSTYPEVALUES_HPUX = "hpux";
    TMP_OSTYPEVALUES_AIX = "aix";
    TMP_OSTYPEVALUES_SOLARIS = "solaris";
    TMP_OSTYPEVALUES_Z_OS = "z_os";
    OsTypeValues = createConstMap([TMP_OSTYPEVALUES_WINDOWS, TMP_OSTYPEVALUES_LINUX, TMP_OSTYPEVALUES_DARWIN, TMP_OSTYPEVALUES_FREEBSD, TMP_OSTYPEVALUES_NETBSD, TMP_OSTYPEVALUES_OPENBSD, TMP_OSTYPEVALUES_DRAGONFLYBSD, TMP_OSTYPEVALUES_HPUX, TMP_OSTYPEVALUES_AIX, TMP_OSTYPEVALUES_SOLARIS, TMP_OSTYPEVALUES_Z_OS]);
    TMP_TELEMETRYSDKLANGUAGEVALUES_CPP = "cpp";
    TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET = "dotnet";
    TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG = "erlang";
    TMP_TELEMETRYSDKLANGUAGEVALUES_GO = "go";
    TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA = "java";
    TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS = "nodejs";
    TMP_TELEMETRYSDKLANGUAGEVALUES_PHP = "php";
    TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON = "python";
    TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY = "ruby";
    TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS = "webjs";
    TELEMETRYSDKLANGUAGEVALUES_NODEJS = TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS;
    TelemetrySdkLanguageValues = createConstMap([TMP_TELEMETRYSDKLANGUAGEVALUES_CPP, TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET, TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG, TMP_TELEMETRYSDKLANGUAGEVALUES_GO, TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA, TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS, TMP_TELEMETRYSDKLANGUAGEVALUES_PHP, TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON, TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY, TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS]);
  }
});

// node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/resource/index.js
var init_resource = __esm({
  "node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/resource/index.js"() {
    init_SemanticResourceAttributes();
  }
});

// node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js
var init_esm3 = __esm({
  "node_modules/@opentelemetry/core/node_modules/@opentelemetry/semantic-conventions/build/esm/index.js"() {
    init_trace2();
    init_resource();
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/sdk-info.js
var _a, SDK_INFO;
var init_sdk_info = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/sdk-info.js"() {
    init_version2();
    init_esm3();
    SDK_INFO = (_a = {}, _a[SEMRESATTRS_TELEMETRY_SDK_NAME] = "opentelemetry", _a[SEMRESATTRS_PROCESS_RUNTIME_NAME] = "node", _a[SEMRESATTRS_TELEMETRY_SDK_LANGUAGE] = TELEMETRYSDKLANGUAGEVALUES_NODEJS, _a[SEMRESATTRS_TELEMETRY_SDK_VERSION] = VERSION2, _a);
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/timer-util.js
function unrefTimer(timer) {
  timer.unref();
}
var init_timer_util = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/timer-util.js"() {
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/node/index.js
var init_node2 = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/node/index.js"() {
    init_environment2();
    init_globalThis2();
    init_hex_to_base64();
    init_RandomIdGenerator();
    init_performance();
    init_sdk_info();
    init_timer_util();
  }
});

// node_modules/@opentelemetry/core/build/esm/platform/index.js
var init_platform2 = __esm({
  "node_modules/@opentelemetry/core/build/esm/platform/index.js"() {
    init_node2();
  }
});

// node_modules/@opentelemetry/core/build/esm/common/time.js
function millisToHrTime(epochMillis) {
  var epochSeconds = epochMillis / 1e3;
  var seconds = Math.trunc(epochSeconds);
  var nanos = Math.round(epochMillis % 1e3 * MILLISECONDS_TO_NANOSECONDS);
  return [seconds, nanos];
}
function getTimeOrigin() {
  var timeOrigin = otperformance.timeOrigin;
  if (typeof timeOrigin !== "number") {
    var perf = otperformance;
    timeOrigin = perf.timing && perf.timing.fetchStart;
  }
  return timeOrigin;
}
function hrTime(performanceNow) {
  var timeOrigin = millisToHrTime(getTimeOrigin());
  var now = millisToHrTime(typeof performanceNow === "number" ? performanceNow : otperformance.now());
  return addHrTimes(timeOrigin, now);
}
function timeInputToHrTime(time) {
  if (isTimeInputHrTime(time)) {
    return time;
  } else if (typeof time === "number") {
    if (time < getTimeOrigin()) {
      return hrTime(time);
    } else {
      return millisToHrTime(time);
    }
  } else if (time instanceof Date) {
    return millisToHrTime(time.getTime());
  } else {
    throw TypeError("Invalid input type");
  }
}
function hrTimeDuration(startTime, endTime) {
  var seconds = endTime[0] - startTime[0];
  var nanos = endTime[1] - startTime[1];
  if (nanos < 0) {
    seconds -= 1;
    nanos += SECOND_TO_NANOSECONDS;
  }
  return [seconds, nanos];
}
function hrTimeToTimeStamp(time) {
  var precision = NANOSECOND_DIGITS;
  var tmp = "" + "0".repeat(precision) + time[1] + "Z";
  var nanoString = tmp.substr(tmp.length - precision - 1);
  var date = new Date(time[0] * 1e3).toISOString();
  return date.replace("000Z", nanoString);
}
function hrTimeToNanoseconds(time) {
  return time[0] * SECOND_TO_NANOSECONDS + time[1];
}
function hrTimeToMilliseconds(time) {
  return time[0] * 1e3 + time[1] / 1e6;
}
function hrTimeToMicroseconds(time) {
  return time[0] * 1e6 + time[1] / 1e3;
}
function isTimeInputHrTime(value) {
  return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
}
function isTimeInput(value) {
  return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
}
function addHrTimes(time1, time2) {
  var out = [time1[0] + time2[0], time1[1] + time2[1]];
  if (out[1] >= SECOND_TO_NANOSECONDS) {
    out[1] -= SECOND_TO_NANOSECONDS;
    out[0] += 1;
  }
  return out;
}
var NANOSECOND_DIGITS, NANOSECOND_DIGITS_IN_MILLIS, MILLISECONDS_TO_NANOSECONDS, SECOND_TO_NANOSECONDS;
var init_time = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/time.js"() {
    init_platform2();
    NANOSECOND_DIGITS = 9;
    NANOSECOND_DIGITS_IN_MILLIS = 6;
    MILLISECONDS_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS);
    SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
  }
});

// node_modules/@opentelemetry/core/build/esm/common/types.js
var init_types2 = __esm({
  "node_modules/@opentelemetry/core/build/esm/common/types.js"() {
  }
});

// node_modules/@opentelemetry/core/build/esm/ExportResult.js
var ExportResultCode;
var init_ExportResult = __esm({
  "node_modules/@opentelemetry/core/build/esm/ExportResult.js"() {
    (function(ExportResultCode2) {
      ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
      ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
    })(ExportResultCode || (ExportResultCode = {}));
  }
});

// node_modules/@opentelemetry/core/build/esm/propagation/composite.js
var __values2, CompositePropagator;
var init_composite = __esm({
  "node_modules/@opentelemetry/core/build/esm/propagation/composite.js"() {
    init_esm();
    __values2 = function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    CompositePropagator = /** @class */
    (function() {
      function CompositePropagator2(config) {
        if (config === void 0) {
          config = {};
        }
        var _a2;
        this._propagators = (_a2 = config.propagators) !== null && _a2 !== void 0 ? _a2 : [];
        this._fields = Array.from(new Set(this._propagators.map(function(p) {
          return typeof p.fields === "function" ? p.fields() : [];
        }).reduce(function(x, y) {
          return x.concat(y);
        }, [])));
      }
      CompositePropagator2.prototype.inject = function(context2, carrier, setter) {
        var e_1, _a2;
        try {
          for (var _b = __values2(this._propagators), _c = _b.next(); !_c.done; _c = _b.next()) {
            var propagator = _c.value;
            try {
              propagator.inject(context2, carrier, setter);
            } catch (err) {
              diag2.warn("Failed to inject with " + propagator.constructor.name + ". Err: " + err.message);
            }
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return)) _a2.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      };
      CompositePropagator2.prototype.extract = function(context2, carrier, getter) {
        return this._propagators.reduce(function(ctx, propagator) {
          try {
            return propagator.extract(ctx, carrier, getter);
          } catch (err) {
            diag2.warn("Failed to inject with " + propagator.constructor.name + ". Err: " + err.message);
          }
          return ctx;
        }, context2);
      };
      CompositePropagator2.prototype.fields = function() {
        return this._fields.slice();
      };
      return CompositePropagator2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/internal/validators.js
function validateKey2(key) {
  return VALID_KEY_REGEX2.test(key);
}
function validateValue2(value) {
  return VALID_VALUE_BASE_REGEX2.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX2.test(value);
}
var VALID_KEY_CHAR_RANGE2, VALID_KEY2, VALID_VENDOR_KEY2, VALID_KEY_REGEX2, VALID_VALUE_BASE_REGEX2, INVALID_VALUE_COMMA_EQUAL_REGEX2;
var init_validators = __esm({
  "node_modules/@opentelemetry/core/build/esm/internal/validators.js"() {
    VALID_KEY_CHAR_RANGE2 = "[_0-9a-z-*/]";
    VALID_KEY2 = "[a-z]" + VALID_KEY_CHAR_RANGE2 + "{0,255}";
    VALID_VENDOR_KEY2 = "[a-z0-9]" + VALID_KEY_CHAR_RANGE2 + "{0,240}@[a-z]" + VALID_KEY_CHAR_RANGE2 + "{0,13}";
    VALID_KEY_REGEX2 = new RegExp("^(?:" + VALID_KEY2 + "|" + VALID_VENDOR_KEY2 + ")$");
    VALID_VALUE_BASE_REGEX2 = /^[ -~]{0,255}[!-~]$/;
    INVALID_VALUE_COMMA_EQUAL_REGEX2 = /,|=/;
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/TraceState.js
var MAX_TRACE_STATE_ITEMS2, MAX_TRACE_STATE_LEN2, LIST_MEMBERS_SEPARATOR2, LIST_MEMBER_KEY_VALUE_SPLITTER2, TraceState;
var init_TraceState = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/TraceState.js"() {
    init_validators();
    MAX_TRACE_STATE_ITEMS2 = 32;
    MAX_TRACE_STATE_LEN2 = 512;
    LIST_MEMBERS_SEPARATOR2 = ",";
    LIST_MEMBER_KEY_VALUE_SPLITTER2 = "=";
    TraceState = /** @class */
    (function() {
      function TraceState2(rawTraceState) {
        this._internalState = /* @__PURE__ */ new Map();
        if (rawTraceState) this._parse(rawTraceState);
      }
      TraceState2.prototype.set = function(key, value) {
        var traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      };
      TraceState2.prototype.unset = function(key) {
        var traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      };
      TraceState2.prototype.get = function(key) {
        return this._internalState.get(key);
      };
      TraceState2.prototype.serialize = function() {
        var _this = this;
        return this._keys().reduce(function(agg, key) {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER2 + _this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR2);
      };
      TraceState2.prototype._parse = function(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN2) return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR2).reverse().reduce(function(agg, part) {
          var listMember = part.trim();
          var i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER2);
          if (i !== -1) {
            var key = listMember.slice(0, i);
            var value = listMember.slice(i + 1, part.length);
            if (validateKey2(key) && validateValue2(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS2) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS2));
        }
      };
      TraceState2.prototype._keys = function() {
        return Array.from(this._internalState.keys()).reverse();
      };
      TraceState2.prototype._clone = function() {
        var traceState = new TraceState2();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      };
      return TraceState2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js
function parseTraceParent(traceParent) {
  var match = TRACE_PARENT_REGEX.exec(traceParent);
  if (!match) return null;
  if (match[1] === "00" && match[5]) return null;
  return {
    traceId: match[2],
    spanId: match[3],
    traceFlags: parseInt(match[4], 16)
  };
}
var TRACE_PARENT_HEADER, TRACE_STATE_HEADER, VERSION3, VERSION_PART, TRACE_ID_PART, PARENT_ID_PART, FLAGS_PART, TRACE_PARENT_REGEX, W3CTraceContextPropagator;
var init_W3CTraceContextPropagator = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js"() {
    init_esm();
    init_suppress_tracing();
    init_TraceState();
    TRACE_PARENT_HEADER = "traceparent";
    TRACE_STATE_HEADER = "tracestate";
    VERSION3 = "00";
    VERSION_PART = "(?!ff)[\\da-f]{2}";
    TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
    PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
    FLAGS_PART = "[\\da-f]{2}";
    TRACE_PARENT_REGEX = new RegExp("^\\s?(" + VERSION_PART + ")-(" + TRACE_ID_PART + ")-(" + PARENT_ID_PART + ")-(" + FLAGS_PART + ")(-.*)?\\s?$");
    W3CTraceContextPropagator = /** @class */
    (function() {
      function W3CTraceContextPropagator2() {
      }
      W3CTraceContextPropagator2.prototype.inject = function(context2, carrier, setter) {
        var spanContext = trace.getSpanContext(context2);
        if (!spanContext || isTracingSuppressed(context2) || !isSpanContextValid(spanContext)) return;
        var traceParent = VERSION3 + "-" + spanContext.traceId + "-" + spanContext.spanId + "-0" + Number(spanContext.traceFlags || TraceFlags.NONE).toString(16);
        setter.set(carrier, TRACE_PARENT_HEADER, traceParent);
        if (spanContext.traceState) {
          setter.set(carrier, TRACE_STATE_HEADER, spanContext.traceState.serialize());
        }
      };
      W3CTraceContextPropagator2.prototype.extract = function(context2, carrier, getter) {
        var traceParentHeader = getter.get(carrier, TRACE_PARENT_HEADER);
        if (!traceParentHeader) return context2;
        var traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== "string") return context2;
        var spanContext = parseTraceParent(traceParent);
        if (!spanContext) return context2;
        spanContext.isRemote = true;
        var traceStateHeader = getter.get(carrier, TRACE_STATE_HEADER);
        if (traceStateHeader) {
          var state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
          spanContext.traceState = new TraceState(typeof state === "string" ? state : void 0);
        }
        return trace.setSpanContext(context2, spanContext);
      };
      W3CTraceContextPropagator2.prototype.fields = function() {
        return [TRACE_PARENT_HEADER, TRACE_STATE_HEADER];
      };
      return W3CTraceContextPropagator2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/IdGenerator.js
var init_IdGenerator = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/IdGenerator.js"() {
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/rpc-metadata.js
function setRPCMetadata(context2, meta) {
  return context2.setValue(RPC_METADATA_KEY, meta);
}
function deleteRPCMetadata(context2) {
  return context2.deleteValue(RPC_METADATA_KEY);
}
function getRPCMetadata(context2) {
  return context2.getValue(RPC_METADATA_KEY);
}
var RPC_METADATA_KEY, RPCType;
var init_rpc_metadata = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/rpc-metadata.js"() {
    init_esm();
    RPC_METADATA_KEY = createContextKey("OpenTelemetry SDK Context Key RPC_METADATA");
    (function(RPCType2) {
      RPCType2["HTTP"] = "http";
    })(RPCType || (RPCType = {}));
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/sampler/AlwaysOffSampler.js
var AlwaysOffSampler;
var init_AlwaysOffSampler = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/sampler/AlwaysOffSampler.js"() {
    init_esm();
    AlwaysOffSampler = /** @class */
    (function() {
      function AlwaysOffSampler2() {
      }
      AlwaysOffSampler2.prototype.shouldSample = function() {
        return {
          decision: SamplingDecision.NOT_RECORD
        };
      };
      AlwaysOffSampler2.prototype.toString = function() {
        return "AlwaysOffSampler";
      };
      return AlwaysOffSampler2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/sampler/AlwaysOnSampler.js
var AlwaysOnSampler;
var init_AlwaysOnSampler = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/sampler/AlwaysOnSampler.js"() {
    init_esm();
    AlwaysOnSampler = /** @class */
    (function() {
      function AlwaysOnSampler2() {
      }
      AlwaysOnSampler2.prototype.shouldSample = function() {
        return {
          decision: SamplingDecision.RECORD_AND_SAMPLED
        };
      };
      AlwaysOnSampler2.prototype.toString = function() {
        return "AlwaysOnSampler";
      };
      return AlwaysOnSampler2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/sampler/ParentBasedSampler.js
var ParentBasedSampler;
var init_ParentBasedSampler = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/sampler/ParentBasedSampler.js"() {
    init_esm();
    init_global_error_handler();
    init_AlwaysOffSampler();
    init_AlwaysOnSampler();
    ParentBasedSampler = /** @class */
    (function() {
      function ParentBasedSampler2(config) {
        var _a2, _b, _c, _d;
        this._root = config.root;
        if (!this._root) {
          globalErrorHandler(new Error("ParentBasedSampler must have a root sampler configured"));
          this._root = new AlwaysOnSampler();
        }
        this._remoteParentSampled = (_a2 = config.remoteParentSampled) !== null && _a2 !== void 0 ? _a2 : new AlwaysOnSampler();
        this._remoteParentNotSampled = (_b = config.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new AlwaysOffSampler();
        this._localParentSampled = (_c = config.localParentSampled) !== null && _c !== void 0 ? _c : new AlwaysOnSampler();
        this._localParentNotSampled = (_d = config.localParentNotSampled) !== null && _d !== void 0 ? _d : new AlwaysOffSampler();
      }
      ParentBasedSampler2.prototype.shouldSample = function(context2, traceId, spanName, spanKind, attributes, links) {
        var parentContext = trace.getSpanContext(context2);
        if (!parentContext || !isSpanContextValid(parentContext)) {
          return this._root.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.isRemote) {
          if (parentContext.traceFlags & TraceFlags.SAMPLED) {
            return this._remoteParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
          }
          return this._remoteParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.traceFlags & TraceFlags.SAMPLED) {
          return this._localParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        return this._localParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
      };
      ParentBasedSampler2.prototype.toString = function() {
        return "ParentBased{root=" + this._root.toString() + ", remoteParentSampled=" + this._remoteParentSampled.toString() + ", remoteParentNotSampled=" + this._remoteParentNotSampled.toString() + ", localParentSampled=" + this._localParentSampled.toString() + ", localParentNotSampled=" + this._localParentNotSampled.toString() + "}";
      };
      return ParentBasedSampler2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/trace/sampler/TraceIdRatioBasedSampler.js
var TraceIdRatioBasedSampler;
var init_TraceIdRatioBasedSampler = __esm({
  "node_modules/@opentelemetry/core/build/esm/trace/sampler/TraceIdRatioBasedSampler.js"() {
    init_esm();
    TraceIdRatioBasedSampler = /** @class */
    (function() {
      function TraceIdRatioBasedSampler2(_ratio) {
        if (_ratio === void 0) {
          _ratio = 0;
        }
        this._ratio = _ratio;
        this._ratio = this._normalize(_ratio);
        this._upperBound = Math.floor(this._ratio * 4294967295);
      }
      TraceIdRatioBasedSampler2.prototype.shouldSample = function(context2, traceId) {
        return {
          decision: isValidTraceId(traceId) && this._accumulate(traceId) < this._upperBound ? SamplingDecision.RECORD_AND_SAMPLED : SamplingDecision.NOT_RECORD
        };
      };
      TraceIdRatioBasedSampler2.prototype.toString = function() {
        return "TraceIdRatioBased{" + this._ratio + "}";
      };
      TraceIdRatioBasedSampler2.prototype._normalize = function(ratio) {
        if (typeof ratio !== "number" || isNaN(ratio)) return 0;
        return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
      };
      TraceIdRatioBasedSampler2.prototype._accumulate = function(traceId) {
        var accumulation = 0;
        for (var i = 0; i < traceId.length / 8; i++) {
          var pos = i * 8;
          var part = parseInt(traceId.slice(pos, pos + 8), 16);
          accumulation = (accumulation ^ part) >>> 0;
        }
        return accumulation;
      };
      return TraceIdRatioBasedSampler2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/lodash.merge.js
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  var unmasked = false;
  try {
    value[symToStringTag] = void 0;
    unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var objectTag, nullTag, undefinedTag, funcProto, funcToString, objectCtorString, getPrototype, objectProto, hasOwnProperty, symToStringTag, nativeObjectToString;
var init_lodash_merge = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/lodash.merge.js"() {
    objectTag = "[object Object]";
    nullTag = "[object Null]";
    undefinedTag = "[object Undefined]";
    funcProto = Function.prototype;
    funcToString = funcProto.toString;
    objectCtorString = funcToString.call(Object);
    getPrototype = overArg(Object.getPrototypeOf, Object);
    objectProto = Object.prototype;
    hasOwnProperty = objectProto.hasOwnProperty;
    symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    nativeObjectToString = objectProto.toString;
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/merge.js
function merge() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var result = args.shift();
  var objects = /* @__PURE__ */ new WeakMap();
  while (args.length > 0) {
    result = mergeTwoObjects(result, args.shift(), 0, objects);
  }
  return result;
}
function takeValue(value) {
  if (isArray(value)) {
    return value.slice();
  }
  return value;
}
function mergeTwoObjects(one, two, level, objects) {
  if (level === void 0) {
    level = 0;
  }
  var result;
  if (level > MAX_LEVEL) {
    return void 0;
  }
  level++;
  if (isPrimitive(one) || isPrimitive(two) || isFunction(two)) {
    result = takeValue(two);
  } else if (isArray(one)) {
    result = one.slice();
    if (isArray(two)) {
      for (var i = 0, j = two.length; i < j; i++) {
        result.push(takeValue(two[i]));
      }
    } else if (isObject(two)) {
      var keys = Object.keys(two);
      for (var i = 0, j = keys.length; i < j; i++) {
        var key = keys[i];
        result[key] = takeValue(two[key]);
      }
    }
  } else if (isObject(one)) {
    if (isObject(two)) {
      if (!shouldMerge(one, two)) {
        return two;
      }
      result = Object.assign({}, one);
      var keys = Object.keys(two);
      for (var i = 0, j = keys.length; i < j; i++) {
        var key = keys[i];
        var twoValue = two[key];
        if (isPrimitive(twoValue)) {
          if (typeof twoValue === "undefined") {
            delete result[key];
          } else {
            result[key] = twoValue;
          }
        } else {
          var obj1 = result[key];
          var obj2 = twoValue;
          if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) {
            delete result[key];
          } else {
            if (isObject(obj1) && isObject(obj2)) {
              var arr1 = objects.get(obj1) || [];
              var arr2 = objects.get(obj2) || [];
              arr1.push({
                obj: one,
                key
              });
              arr2.push({
                obj: two,
                key
              });
              objects.set(obj1, arr1);
              objects.set(obj2, arr2);
            }
            result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
          }
        }
      }
    } else {
      result = two;
    }
  }
  return result;
}
function wasObjectReferenced(obj, key, objects) {
  var arr = objects.get(obj[key]) || [];
  for (var i = 0, j = arr.length; i < j; i++) {
    var info = arr[i];
    if (info.key === key && info.obj === obj) {
      return true;
    }
  }
  return false;
}
function isArray(value) {
  return Array.isArray(value);
}
function isFunction(value) {
  return typeof value === "function";
}
function isObject(value) {
  return !isPrimitive(value) && !isArray(value) && !isFunction(value) && typeof value === "object";
}
function isPrimitive(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
}
function shouldMerge(one, two) {
  if (!isPlainObject(one) || !isPlainObject(two)) {
    return false;
  }
  return true;
}
var MAX_LEVEL;
var init_merge = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/merge.js"() {
    init_lodash_merge();
    MAX_LEVEL = 20;
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/timeout.js
function callWithTimeout(promise, timeout) {
  var timeoutHandle;
  var timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
    timeoutHandle = setTimeout(function timeoutHandler() {
      reject(new TimeoutError("Operation timed out."));
    }, timeout);
  });
  return Promise.race([promise, timeoutPromise]).then(function(result) {
    clearTimeout(timeoutHandle);
    return result;
  }, function(reason) {
    clearTimeout(timeoutHandle);
    throw reason;
  });
}
var __extends, TimeoutError;
var init_timeout = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/timeout.js"() {
    __extends = /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    TimeoutError = /** @class */
    (function(_super) {
      __extends(TimeoutError2, _super);
      function TimeoutError2(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, TimeoutError2.prototype);
        return _this;
      }
      return TimeoutError2;
    })(Error);
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/url.js
function urlMatches(url, urlToMatch) {
  if (typeof urlToMatch === "string") {
    return url === urlToMatch;
  } else {
    return !!url.match(urlToMatch);
  }
}
function isUrlIgnored(url, ignoredUrls) {
  var e_1, _a2;
  if (!ignoredUrls) {
    return false;
  }
  try {
    for (var ignoredUrls_1 = __values3(ignoredUrls), ignoredUrls_1_1 = ignoredUrls_1.next(); !ignoredUrls_1_1.done; ignoredUrls_1_1 = ignoredUrls_1.next()) {
      var ignoreUrl = ignoredUrls_1_1.value;
      if (urlMatches(url, ignoreUrl)) {
        return true;
      }
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (ignoredUrls_1_1 && !ignoredUrls_1_1.done && (_a2 = ignoredUrls_1.return)) _a2.call(ignoredUrls_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return false;
}
var __values3;
var init_url = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/url.js"() {
    __values3 = function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return {
            value: o && o[i++],
            done: !o
          };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/wrap.js
function isWrapped(func) {
  return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
}
var init_wrap = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/wrap.js"() {
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/promise.js
var Deferred;
var init_promise = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/promise.js"() {
    Deferred = /** @class */
    (function() {
      function Deferred2() {
        var _this = this;
        this._promise = new Promise(function(resolve, reject) {
          _this._resolve = resolve;
          _this._reject = reject;
        });
      }
      Object.defineProperty(Deferred2.prototype, "promise", {
        get: function() {
          return this._promise;
        },
        enumerable: false,
        configurable: true
      });
      Deferred2.prototype.resolve = function(val) {
        this._resolve(val);
      };
      Deferred2.prototype.reject = function(err) {
        this._reject(err);
      };
      return Deferred2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/utils/callback.js
var __read3, __spreadArray, BindOnceFuture;
var init_callback = __esm({
  "node_modules/@opentelemetry/core/build/esm/utils/callback.js"() {
    init_promise();
    __read3 = function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = {
          error
        };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    __spreadArray = function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    BindOnceFuture = /** @class */
    (function() {
      function BindOnceFuture2(_callback, _that) {
        this._callback = _callback;
        this._that = _that;
        this._isCalled = false;
        this._deferred = new Deferred();
      }
      Object.defineProperty(BindOnceFuture2.prototype, "isCalled", {
        get: function() {
          return this._isCalled;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(BindOnceFuture2.prototype, "promise", {
        get: function() {
          return this._deferred.promise;
        },
        enumerable: false,
        configurable: true
      });
      BindOnceFuture2.prototype.call = function() {
        var _a2;
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!this._isCalled) {
          this._isCalled = true;
          try {
            Promise.resolve((_a2 = this._callback).call.apply(_a2, __spreadArray([this._that], __read3(args), false))).then(function(val) {
              return _this._deferred.resolve(val);
            }, function(err) {
              return _this._deferred.reject(err);
            });
          } catch (err) {
            this._deferred.reject(err);
          }
        }
        return this._deferred.promise;
      };
      return BindOnceFuture2;
    })();
  }
});

// node_modules/@opentelemetry/core/build/esm/internal/exporter.js
function _export(exporter, arg) {
  return new Promise(function(resolve) {
    context.with(suppressTracing(context.active()), function() {
      exporter.export(arg, function(result) {
        resolve(result);
      });
    });
  });
}
var init_exporter = __esm({
  "node_modules/@opentelemetry/core/build/esm/internal/exporter.js"() {
    init_esm();
    init_suppress_tracing();
  }
});

// node_modules/@opentelemetry/core/build/esm/index.js
var esm_exports3 = {};
__export(esm_exports3, {
  AlwaysOffSampler: () => AlwaysOffSampler,
  AlwaysOnSampler: () => AlwaysOnSampler,
  AnchoredClock: () => AnchoredClock,
  BindOnceFuture: () => BindOnceFuture,
  CompositePropagator: () => CompositePropagator,
  DEFAULT_ATTRIBUTE_COUNT_LIMIT: () => DEFAULT_ATTRIBUTE_COUNT_LIMIT,
  DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT: () => DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
  DEFAULT_ENVIRONMENT: () => DEFAULT_ENVIRONMENT,
  DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: () => DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
  DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: () => DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT,
  ExportResultCode: () => ExportResultCode,
  ParentBasedSampler: () => ParentBasedSampler,
  RPCType: () => RPCType,
  RandomIdGenerator: () => RandomIdGenerator,
  SDK_INFO: () => SDK_INFO,
  TRACE_PARENT_HEADER: () => TRACE_PARENT_HEADER,
  TRACE_STATE_HEADER: () => TRACE_STATE_HEADER,
  TimeoutError: () => TimeoutError,
  TraceIdRatioBasedSampler: () => TraceIdRatioBasedSampler,
  TraceState: () => TraceState,
  TracesSamplerValues: () => TracesSamplerValues,
  VERSION: () => VERSION2,
  W3CBaggagePropagator: () => W3CBaggagePropagator,
  W3CTraceContextPropagator: () => W3CTraceContextPropagator,
  _globalThis: () => _globalThis2,
  addHrTimes: () => addHrTimes,
  baggageUtils: () => utils_exports,
  callWithTimeout: () => callWithTimeout,
  deleteRPCMetadata: () => deleteRPCMetadata,
  getEnv: () => getEnv,
  getEnvWithoutDefaults: () => getEnvWithoutDefaults,
  getRPCMetadata: () => getRPCMetadata,
  getTimeOrigin: () => getTimeOrigin,
  globalErrorHandler: () => globalErrorHandler,
  hexToBase64: () => hexToBase64,
  hexToBinary: () => hexToBinary,
  hrTime: () => hrTime,
  hrTimeDuration: () => hrTimeDuration,
  hrTimeToMicroseconds: () => hrTimeToMicroseconds,
  hrTimeToMilliseconds: () => hrTimeToMilliseconds,
  hrTimeToNanoseconds: () => hrTimeToNanoseconds,
  hrTimeToTimeStamp: () => hrTimeToTimeStamp,
  internal: () => internal,
  isAttributeKey: () => isAttributeKey,
  isAttributeValue: () => isAttributeValue,
  isTimeInput: () => isTimeInput,
  isTimeInputHrTime: () => isTimeInputHrTime,
  isTracingSuppressed: () => isTracingSuppressed,
  isUrlIgnored: () => isUrlIgnored,
  isWrapped: () => isWrapped,
  loggingErrorHandler: () => loggingErrorHandler,
  merge: () => merge,
  millisToHrTime: () => millisToHrTime,
  otperformance: () => otperformance,
  parseEnvironment: () => parseEnvironment,
  parseTraceParent: () => parseTraceParent,
  sanitizeAttributes: () => sanitizeAttributes,
  setGlobalErrorHandler: () => setGlobalErrorHandler,
  setRPCMetadata: () => setRPCMetadata,
  suppressTracing: () => suppressTracing,
  timeInputToHrTime: () => timeInputToHrTime,
  unrefTimer: () => unrefTimer,
  unsuppressTracing: () => unsuppressTracing,
  urlMatches: () => urlMatches
});
var internal;
var init_esm4 = __esm({
  "node_modules/@opentelemetry/core/build/esm/index.js"() {
    init_W3CBaggagePropagator();
    init_anchored_clock();
    init_attributes();
    init_global_error_handler();
    init_logging_error_handler();
    init_time();
    init_types2();
    init_hex_to_binary();
    init_ExportResult();
    init_utils3();
    init_platform2();
    init_composite();
    init_W3CTraceContextPropagator();
    init_IdGenerator();
    init_rpc_metadata();
    init_AlwaysOffSampler();
    init_AlwaysOnSampler();
    init_ParentBasedSampler();
    init_TraceIdRatioBasedSampler();
    init_suppress_tracing();
    init_TraceState();
    init_environment();
    init_merge();
    init_sampling();
    init_timeout();
    init_url();
    init_wrap();
    init_callback();
    init_version2();
    init_exporter();
    internal = {
      _export
    };
  }
});

// node_modules/@genkit-ai/core/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/@genkit-ai/core/lib/utils.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var utils_exports2 = {};
    __export2(utils_exports2, {
      deleteUndefinedProps: () => deleteUndefinedProps,
      featureMetadataPrefix: () => featureMetadataPrefix,
      getCurrentEnv: () => getCurrentEnv,
      isDevEnv: () => isDevEnv,
      stripUndefinedProps: () => stripUndefinedProps
    });
    module.exports = __toCommonJS2(utils_exports2);
    function deleteUndefinedProps(obj) {
      for (const prop in obj) {
        if (obj[prop] === void 0) {
          delete obj[prop];
        } else {
          if (typeof obj[prop] === "object") {
            deleteUndefinedProps(obj[prop]);
          }
        }
      }
    }
    function stripUndefinedProps(input) {
      if (input === void 0 || input === null || Array.isArray(input) || typeof input !== "object") {
        return input;
      }
      const out = {};
      for (const key in input) {
        if (input[key] !== void 0) {
          out[key] = stripUndefinedProps(input[key]);
        }
      }
      return out;
    }
    function getCurrentEnv() {
      return process.env.GENKIT_ENV || "prod";
    }
    function isDevEnv() {
      return getCurrentEnv() === "dev";
    }
    function featureMetadataPrefix(name) {
      return `feature:${name}`;
    }
  }
});

// node_modules/@genkit-ai/core/lib/tracing/exporter.js
var require_exporter = __commonJS({
  "node_modules/@genkit-ai/core/lib/tracing/exporter.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var exporter_exports = {};
    __export2(exporter_exports, {
      LogServerExporter: () => LogServerExporter,
      TraceServerExporter: () => TraceServerExporter,
      setTelemetryServerUrl: () => setTelemetryServerUrl,
      telemetryServerUrl: () => telemetryServerUrl
    });
    module.exports = __toCommonJS2(exporter_exports);
    var import_api16 = (init_esm(), __toCommonJS(esm_exports));
    var import_core = (init_esm4(), __toCommonJS(esm_exports3));
    var import_logging = require_logging();
    var import_utils7 = require_utils2();
    var telemetryServerUrl;
    function setTelemetryServerUrl(url) {
      telemetryServerUrl = url;
    }
    var TraceServerExporter = class {
      /**
       * Export spans.
       * @param spans
       * @param resultCallback
       */
      export(spans, resultCallback) {
        this._sendSpans(spans, resultCallback);
      }
      /**
       * Shutdown the exporter.
       */
      shutdown() {
        this._sendSpans([]);
        return this.forceFlush();
      }
      /**
       * Converts span info into trace store format.
       * @param span
       */
      _exportInfo(span) {
        const spanData = {
          spanId: span.spanContext().spanId,
          traceId: span.spanContext().traceId,
          startTime: transformTime(span.startTime),
          endTime: transformTime(span.endTime),
          attributes: __spreadValues({}, span.attributes),
          displayName: span.name,
          links: span.links,
          spanKind: import_api16.SpanKind[span.kind],
          parentSpanId: span.parentSpanId,
          sameProcessAsParentSpan: {
            value: !span.spanContext().isRemote
          },
          status: span.status,
          timeEvents: {
            timeEvent: span.events.map((e) => ({
              time: transformTime(e.time),
              annotation: {
                attributes: e.attributes ?? {},
                description: e.name
              }
            }))
          }
        };
        if (span.instrumentationLibrary !== void 0) {
          spanData.instrumentationLibrary = {
            name: span.instrumentationLibrary.name
          };
          if (span.instrumentationLibrary.schemaUrl !== void 0) {
            spanData.instrumentationLibrary.schemaUrl = span.instrumentationLibrary.schemaUrl;
          }
          if (span.instrumentationLibrary.version !== void 0) {
            spanData.instrumentationLibrary.version = span.instrumentationLibrary.version;
          }
        }
        (0, import_utils7.deleteUndefinedProps)(spanData);
        return spanData;
      }
      /**
       * Exports any pending spans in exporter
       */
      forceFlush() {
        return Promise.resolve();
      }
      _sendSpans(spans, done) {
        return __async(this, null, function* () {
          const traces = {};
          for (const span of spans) {
            if (!traces[span.spanContext().traceId]) {
              traces[span.spanContext().traceId] = [];
            }
            traces[span.spanContext().traceId].push(span);
          }
          let error = false;
          for (const traceId of Object.keys(traces)) {
            try {
              yield this.save(traceId, traces[traceId]);
            } catch (e) {
              error = true;
              import_logging.logger.error(`Failed to save trace ${traceId}`, e);
            }
            if (done) {
              return done({
                code: error ? import_core.ExportResultCode.FAILED : import_core.ExportResultCode.SUCCESS
              });
            }
          }
        });
      }
      save(traceId, spans) {
        return __async(this, null, function* () {
          if (!telemetryServerUrl) {
            import_logging.logger.debug(`Telemetry server is not configured, trace ${traceId} not saved!`);
            return;
          }
          const data = {
            traceId,
            spans: {}
          };
          for (const span of spans) {
            const convertedSpan = this._exportInfo(span);
            data.spans[convertedSpan.spanId] = convertedSpan;
            if (!convertedSpan.parentSpanId) {
              data.displayName = convertedSpan.displayName;
              data.startTime = convertedSpan.startTime;
              data.endTime = convertedSpan.endTime;
            }
          }
          yield import_api16.context.with((0, import_core.suppressTracing)(import_api16.context.active()), () => fetch(`${telemetryServerUrl}/api/traces`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }));
        });
      }
    };
    function transformTime(time) {
      return (0, import_core.hrTimeToMilliseconds)(time);
    }
    var LogServerExporter = class {
      export(logs2, resultCallback) {
        this._sendLogs(logs2, resultCallback);
      }
      shutdown() {
        return this.forceFlush();
      }
      forceFlush() {
        return Promise.resolve();
      }
      _sendLogs(logs2, done) {
        return __async(this, null, function* () {
          if (!telemetryServerUrl) {
            if (done) done({
              code: import_core.ExportResultCode.SUCCESS
            });
            return;
          }
          try {
            const scopeLogsMap = /* @__PURE__ */ new Map();
            for (const log of logs2) {
              const scopeName = log.instrumentationScope.name || "unknown";
              if (!scopeLogsMap.has(scopeName)) {
                scopeLogsMap.set(scopeName, {
                  scope: {
                    name: scopeName,
                    version: log.instrumentationScope.version || ""
                  },
                  logRecords: []
                });
              }
              const attributes = [];
              for (const [k, v] of Object.entries(log.attributes)) {
                if (typeof v === "string") attributes.push({
                  key: k,
                  value: {
                    stringValue: v
                  }
                });
                else if (typeof v === "number") attributes.push({
                  key: k,
                  value: {
                    intValue: v
                  }
                });
                else if (typeof v === "boolean") attributes.push({
                  key: k,
                  value: {
                    boolValue: v
                  }
                });
              }
              let bodyValue;
              if (typeof log.body === "string") bodyValue = {
                stringValue: log.body
              };
              else if (typeof log.body === "number") bodyValue = {
                intValue: log.body
              };
              else if (typeof log.body === "boolean") bodyValue = {
                boolValue: log.body
              };
              else bodyValue = {
                stringValue: JSON.stringify(log.body)
              };
              scopeLogsMap.get(scopeName).logRecords.push({
                timeUnixNano: ((0, import_core.hrTimeToMilliseconds)(log.hrTime) * 1e6).toString(),
                severityNumber: log.severityNumber,
                severityText: log.severityText,
                body: bodyValue,
                attributes,
                traceId: log.spanContext?.traceId,
                spanId: log.spanContext?.spanId
              });
            }
            const payload = {
              resourceLogs: [{
                resource: {
                  attributes: [],
                  droppedAttributesCount: 0
                },
                scopeLogs: Array.from(scopeLogsMap.values())
              }]
            };
            yield import_api16.context.with((0, import_core.suppressTracing)(import_api16.context.active()), () => fetch(`${telemetryServerUrl}/api/otlp`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(payload)
            }));
            if (done) done({
              code: import_core.ExportResultCode.SUCCESS
            });
          } catch (e) {
            import_logging.logger.error("Failed to export logs", e);
            if (done) done({
              code: import_core.ExportResultCode.FAILED
            });
          }
        });
      }
    };
  }
});

// node_modules/@genkit-ai/core/lib/async-context.js
var require_async_context = __commonJS({
  "node_modules/@genkit-ai/core/lib/async-context.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var async_context_exports = {};
    __export2(async_context_exports, {
      getAsyncContext: () => getAsyncContext2,
      setAsyncContext: () => setAsyncContext
    });
    module.exports = __toCommonJS2(async_context_exports);
    var import_error = require_error();
    var asyncContextKey = "__genkit_AsyncContext";
    function getAsyncContext2() {
      if (!global[asyncContextKey]) {
        throw new import_error.GenkitError({
          status: "FAILED_PRECONDITION",
          message: "Async context is not initialized."
        });
      }
      return global[asyncContextKey];
    }
    function setAsyncContext(context2) {
      if (global[asyncContextKey]) return;
      global[asyncContextKey] = context2;
    }
  }
});

// node_modules/@genkit-ai/core/lib/tracing/instrumentation.js
var require_instrumentation = __commonJS({
  "node_modules/@genkit-ai/core/lib/tracing/instrumentation.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var instrumentation_exports = {};
    __export2(instrumentation_exports, {
      ATTR_PREFIX: () => ATTR_PREFIX,
      SPAN_TYPE_ATTR: () => SPAN_TYPE_ATTR,
      appendSpan: () => appendSpan,
      disableOTelRootSpanDetection: () => disableOTelRootSpanDetection,
      runInNewSpan: () => runInNewSpan,
      setCustomMetadataAttribute: () => setCustomMetadataAttribute,
      setCustomMetadataAttributes: () => setCustomMetadataAttributes,
      spanMetadataAlsKey: () => spanMetadataAlsKey,
      toDisplayPath: () => toDisplayPath
    });
    module.exports = __toCommonJS2(instrumentation_exports);
    var import_api16 = (init_esm(), __toCommonJS(esm_exports));
    var import_node_perf_hooks = __require("perf_hooks");
    var import_async_context = require_async_context();
    var import_tracing = require_tracing();
    var spanMetadataAlsKey = "core.tracing.instrumentation.span";
    var ATTR_PREFIX = "genkit";
    var SPAN_TYPE_ATTR = ATTR_PREFIX + ":type";
    var TRACER_NAME = "genkit-tracer";
    var TRACER_VERSION = "v1";
    function runInNewSpan(_0, _1, _2) {
      return __async(this, arguments, function* (registryOrOprs, optsOrFn, fnMaybe) {
        let opts;
        let fn;
        if (arguments.length === 3) {
          opts = optsOrFn;
          fn = fnMaybe;
        } else {
          opts = registryOrOprs;
          fn = optsOrFn;
        }
        yield (0, import_tracing.ensureBasicTelemetryInstrumentation)();
        const tracer = import_api16.trace.getTracer(TRACER_NAME, TRACER_VERSION);
        const parentStep = (0, import_async_context.getAsyncContext)().getStore(spanMetadataAlsKey);
        const isInRoot = parentStep?.metadata?.isRoot === true;
        if (!parentStep) opts.metadata.isRoot ||= true;
        const spanOptions = {
          links: opts.links,
          attributes: opts.labels
        };
        if (!isDisableRootSpanDetection()) {
          spanOptions.root = opts.metadata.isRoot;
        }
        return yield tracer.startActiveSpan(opts.metadata.name, spanOptions, (otSpan) => __async(null, null, function* () {
          const spanContext = __spreadProps(__spreadValues({}, parentStep), {
            metadata: opts.metadata,
            labels: opts.labels
          });
          try {
            opts.metadata.path = buildPath(opts.metadata.name, parentStep?.metadata?.path || "", opts.labels);
            const isGenkitSpan = !!opts.labels?.[SPAN_TYPE_ATTR];
            if (isGenkitSpan && parentStep) {
              const parentIsGenkit = !!parentStep.labels?.[SPAN_TYPE_ATTR];
              if (!parentIsGenkit && parentStep.spanId) {
                otSpan.setAttribute(ATTR_PREFIX + ":lastKnownParentSpanId", parentStep.spanId);
              }
            }
            if (isGenkitSpan) {
              spanContext.spanId = otSpan.spanContext().spanId;
            }
            const output = yield (0, import_async_context.getAsyncContext)().run(spanMetadataAlsKey, spanContext, () => fn(opts.metadata, otSpan, isInRoot));
            if (opts.metadata.state !== "error") {
              opts.metadata.state = "success";
            }
            recordPath(opts.metadata, spanContext);
            return output;
          } catch (e) {
            recordPath(opts.metadata, spanContext, e);
            opts.metadata.state = "error";
            otSpan.setStatus({
              code: import_api16.SpanStatusCode.ERROR,
              message: getErrorMessage2(e)
            });
            if (e instanceof Error) {
              otSpan.recordException(e);
            }
            if (typeof e === "object") {
              if (!e.ignoreFailedSpan) {
                opts.metadata.isFailureSource = true;
              }
              e.ignoreFailedSpan = true;
            }
            throw e;
          } finally {
            otSpan.setAttributes(metadataToAttributes(opts.metadata));
            otSpan.end();
          }
        }));
      });
    }
    function appendSpan(traceId, parentSpanId, metadata, labels) {
      return __async(this, null, function* () {
        yield (0, import_tracing.ensureBasicTelemetryInstrumentation)();
        const tracer = import_api16.trace.getTracer(TRACER_NAME, TRACER_VERSION);
        const spanContext = import_api16.trace.setSpanContext(import_api16.ROOT_CONTEXT, {
          traceId,
          traceFlags: 1,
          // sampled
          spanId: parentSpanId
        });
        const span = tracer.startSpan(metadata.name, {}, spanContext);
        span.setAttributes(metadataToAttributes(metadata));
        if (labels) {
          span.setAttributes(labels);
        }
        span.end();
      });
    }
    function getErrorMessage2(e) {
      if (e instanceof Error) {
        return e.message;
      }
      return `${e}`;
    }
    function metadataToAttributes(metadata) {
      const out = {};
      Object.keys(metadata).forEach((key) => {
        if (key === "metadata" && typeof metadata[key] === "object" && metadata.metadata) {
          Object.entries(metadata.metadata).forEach(([metaKey, value]) => {
            out[ATTR_PREFIX + ":metadata:" + metaKey] = value;
          });
        } else if (key === "input" || typeof metadata[key] === "object") {
          out[ATTR_PREFIX + ":" + key] = JSON.stringify(metadata[key]);
        } else {
          out[ATTR_PREFIX + ":" + key] = metadata[key];
        }
      });
      return out;
    }
    function setCustomMetadataAttribute(key, value) {
      const currentStep = getCurrentSpan();
      if (!currentStep) {
        return;
      }
      if (!currentStep.metadata) {
        currentStep.metadata = {};
      }
      currentStep.metadata[key] = value;
    }
    function setCustomMetadataAttributes(values) {
      const currentStep = getCurrentSpan();
      if (!currentStep) {
        return;
      }
      if (!currentStep.metadata) {
        currentStep.metadata = {};
      }
      for (const [key, value] of Object.entries(values)) {
        currentStep.metadata[key] = value;
      }
    }
    function toDisplayPath(path) {
      const pathPartRegex = /\{([^\,}]+),[^\}]+\}/g;
      return Array.from(path.matchAll(pathPartRegex), (m) => m[1]).join(" > ");
    }
    function getCurrentSpan() {
      const step = (0, import_async_context.getAsyncContext)().getStore(spanMetadataAlsKey);
      if (!step) {
        throw new Error("running outside step context");
      }
      return step.metadata;
    }
    function buildPath(name, parentPath, labels) {
      const stepType = labels && labels["genkit:type"] ? `,t:${labels["genkit:metadata:subtype"] === "flow" ? "flow" : labels["genkit:type"]}` : "";
      return parentPath + `/{${name}${stepType}}`;
    }
    function recordPath(spanMeta, spanContext, err) {
      const path = spanMeta.path || "";
      const decoratedPath = decoratePathWithSubtype(spanMeta);
      const paths = Array.from(spanContext?.paths || /* @__PURE__ */ new Set());
      const status = err ? "failure" : "success";
      if (!paths.some((p) => p.path.startsWith(path) && p.status === status)) {
        const now = import_node_perf_hooks.performance.now();
        const start = spanContext?.timestamp || now;
        spanContext?.paths?.add({
          path: decoratedPath,
          error: err?.name,
          latency: now - start,
          status
        });
      }
      spanMeta.path = decoratedPath;
    }
    function decoratePathWithSubtype(metadata) {
      if (!metadata.path) {
        return "";
      }
      const pathComponents = metadata.path.split("}/{");
      if (pathComponents.length == 1) {
        return metadata.path;
      }
      const stepSubtype = metadata.metadata && metadata.metadata["subtype"] ? `,s:${metadata.metadata["subtype"]}` : "";
      const root = `${pathComponents.slice(0, -1).join("}/{")}}/`;
      const decoratedStep = `{${pathComponents.at(-1)?.slice(0, -1)}${stepSubtype}}`;
      return root + decoratedStep;
    }
    var rootSpanDetectionKey = "__genkit_disableRootSpanDetection";
    function isDisableRootSpanDetection() {
      return global[rootSpanDetectionKey] === true;
    }
    function disableOTelRootSpanDetection() {
      global[rootSpanDetectionKey] = true;
    }
  }
});

// node_modules/@genkit-ai/core/lib/tracing/types.js
var require_types4 = __commonJS({
  "node_modules/@genkit-ai/core/lib/tracing/types.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var types_exports = {};
    __export2(types_exports, {
      InstrumentationLibrarySchema: () => InstrumentationLibrarySchema,
      LinkSchema: () => LinkSchema,
      PathMetadataSchema: () => PathMetadataSchema,
      SpanContextSchema: () => SpanContextSchema,
      SpanDataSchema: () => SpanDataSchema,
      SpanMetadataSchema: () => SpanMetadataSchema,
      SpanStatusSchema: () => SpanStatusSchema,
      TimeEventSchema: () => TimeEventSchema,
      TraceDataSchema: () => TraceDataSchema,
      TraceMetadataSchema: () => TraceMetadataSchema
    });
    module.exports = __toCommonJS2(types_exports);
    var import_zod = require_zod();
    var PathMetadataSchema = import_zod.z.object({
      path: import_zod.z.string(),
      status: import_zod.z.string(),
      error: import_zod.z.string().optional(),
      latency: import_zod.z.number()
    });
    var TraceMetadataSchema = import_zod.z.object({
      featureName: import_zod.z.string().optional(),
      paths: import_zod.z.set(PathMetadataSchema).optional(),
      timestamp: import_zod.z.number()
    });
    var SpanMetadataSchema = import_zod.z.object({
      name: import_zod.z.string(),
      state: import_zod.z.enum(["success", "error"]).optional(),
      input: import_zod.z.any().optional(),
      output: import_zod.z.any().optional(),
      isRoot: import_zod.z.boolean().optional(),
      metadata: import_zod.z.record(import_zod.z.string(), import_zod.z.string()).optional(),
      path: import_zod.z.string().optional(),
      // Indicates a "leaf" span that is the source of a failure.
      isFailureSource: import_zod.z.boolean().optional()
    });
    var SpanStatusSchema = import_zod.z.object({
      code: import_zod.z.number(),
      message: import_zod.z.string().optional()
    });
    var TimeEventSchema = import_zod.z.object({
      time: import_zod.z.number(),
      annotation: import_zod.z.object({
        attributes: import_zod.z.record(import_zod.z.string(), import_zod.z.any()),
        description: import_zod.z.string()
      })
    });
    var SpanContextSchema = import_zod.z.object({
      traceId: import_zod.z.string(),
      spanId: import_zod.z.string(),
      isRemote: import_zod.z.boolean().optional(),
      traceFlags: import_zod.z.number()
    });
    var LinkSchema = import_zod.z.object({
      context: SpanContextSchema.optional(),
      attributes: import_zod.z.record(import_zod.z.string(), import_zod.z.any()).optional(),
      droppedAttributesCount: import_zod.z.number().optional()
    });
    var InstrumentationLibrarySchema = import_zod.z.object({
      name: import_zod.z.string().readonly(),
      version: import_zod.z.string().optional().readonly(),
      schemaUrl: import_zod.z.string().optional().readonly()
    });
    var SpanDataSchema = import_zod.z.object({
      spanId: import_zod.z.string(),
      traceId: import_zod.z.string(),
      parentSpanId: import_zod.z.string().optional(),
      startTime: import_zod.z.number(),
      endTime: import_zod.z.number(),
      attributes: import_zod.z.record(import_zod.z.string(), import_zod.z.any()),
      displayName: import_zod.z.string(),
      links: import_zod.z.array(LinkSchema).optional(),
      instrumentationLibrary: InstrumentationLibrarySchema,
      spanKind: import_zod.z.string(),
      sameProcessAsParentSpan: import_zod.z.object({
        value: import_zod.z.boolean()
      }).optional(),
      status: SpanStatusSchema.optional(),
      timeEvents: import_zod.z.object({
        timeEvent: import_zod.z.array(TimeEventSchema)
      }).optional(),
      truncated: import_zod.z.boolean().optional()
    });
    var TraceDataSchema = import_zod.z.object({
      traceId: import_zod.z.string(),
      displayName: import_zod.z.string().optional(),
      startTime: import_zod.z.number().optional().describe("trace start time in milliseconds since the epoch"),
      endTime: import_zod.z.number().optional().describe("end time in milliseconds since the epoch"),
      spans: import_zod.z.record(import_zod.z.string(), SpanDataSchema)
    });
  }
});

// node_modules/@genkit-ai/core/lib/tracing.js
var require_tracing = __commonJS({
  "node_modules/@genkit-ai/core/lib/tracing.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var tracing_exports = {};
    __export2(tracing_exports, {
      disableGenkitOTelInitialization: () => disableGenkitOTelInitialization,
      enableTelemetry: () => enableTelemetry,
      ensureBasicTelemetryInstrumentation: () => ensureBasicTelemetryInstrumentation,
      flushTracing: () => flushTracing,
      setTelemetryProvider: () => setTelemetryProvider
    });
    module.exports = __toCommonJS2(tracing_exports);
    var import_error = require_error();
    var import_logging = require_logging();
    __reExport(tracing_exports, require_exporter(), module.exports);
    __reExport(tracing_exports, require_instrumentation(), module.exports);
    __reExport(tracing_exports, require_types4(), module.exports);
    var oTelInitializationKey = "__GENKIT_DISABLE_GENKIT_OTEL_INITIALIZATION";
    var instrumentationKey = "__GENKIT_TELEMETRY_INSTRUMENTED";
    var telemetryProviderKey = "__GENKIT_TELEMETRY_PROVIDER";
    function ensureBasicTelemetryInstrumentation() {
      return __async(this, null, function* () {
        yield checkFirebaseMonitoringAutoInit();
        if (global[instrumentationKey]) {
          return yield global[instrumentationKey];
        }
        yield enableTelemetry({});
      });
    }
    function checkFirebaseMonitoringAutoInit() {
      return __async(this, null, function* () {
        if (!global[instrumentationKey] && process.env.ENABLE_FIREBASE_MONITORING === "true") {
          try {
            const importModule = new Function("moduleName", "return import(moduleName)");
            const firebaseModule = yield importModule("@genkit-ai/firebase");
            firebaseModule.enableFirebaseTelemetry();
          } catch (e) {
            import_logging.logger.warn("It looks like you're trying to enable firebase monitoring, but haven't installed the firebase plugin. Please run `npm i --save @genkit-ai/firebase` and redeploy.");
          }
        }
      });
    }
    function getTelemetryProvider() {
      if (global[telemetryProviderKey]) {
        return global[telemetryProviderKey];
      }
      throw new import_error.GenkitError({
        status: "FAILED_PRECONDITION",
        message: "TelemetryProvider is not initialized."
      });
    }
    function setTelemetryProvider(provider) {
      if (global[telemetryProviderKey]) return;
      global[telemetryProviderKey] = provider;
    }
    function enableTelemetry(telemetryConfig) {
      return __async(this, null, function* () {
        if (isOTelInitializationDisabled()) {
          return;
        }
        global[instrumentationKey] = telemetryConfig instanceof Promise ? telemetryConfig : Promise.resolve();
        return getTelemetryProvider().enableTelemetry(telemetryConfig);
      });
    }
    function flushTracing() {
      return __async(this, null, function* () {
        return getTelemetryProvider().flushTracing();
      });
    }
    function isOTelInitializationDisabled() {
      return global[oTelInitializationKey] === true;
    }
    function disableGenkitOTelInitialization() {
      global[oTelInitializationKey] = true;
    }
  }
});

// node_modules/@genkit-ai/core/lib/context.js
var require_context = __commonJS({
  "node_modules/@genkit-ai/core/lib/context.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var context_exports = {};
    __export2(context_exports, {
      apiKey: () => apiKey2,
      getContext: () => getContext2,
      runWithContext: () => runWithContext2
    });
    module.exports = __toCommonJS2(context_exports);
    var import_action = require_action();
    var import_async_context = require_async_context();
    var import_error = require_error();
    var contextAlsKey = "core.auth.context";
    function runWithContext2(context2, fn) {
      if (context2 === void 0) {
        return fn();
      }
      return (0, import_async_context.getAsyncContext)().run(contextAlsKey, context2, () => (0, import_action.runInActionRuntimeContext)(fn));
    }
    function getContext2() {
      return (0, import_async_context.getAsyncContext)().getStore(contextAlsKey);
    }
    function apiKey2(valueOrPolicy) {
      return (request) => __async(null, null, function* () {
        const context2 = {
          auth: {
            apiKey: request.headers["authorization"]
          }
        };
        if (typeof valueOrPolicy === "string") {
          if (!context2.auth?.apiKey) {
            console.error("THROWING UNAUTHENTICATED");
            throw new import_error.UserFacingError("UNAUTHENTICATED", "Unauthenticated");
          }
          if (context2.auth?.apiKey != valueOrPolicy) {
            console.error("Throwing PERMISSION_DENIED");
            throw new import_error.UserFacingError("PERMISSION_DENIED", "Permission Denied");
          }
        } else if (typeof valueOrPolicy === "function") {
          yield valueOrPolicy(context2);
        } else if (typeof valueOrPolicy !== "undefined") {
          throw new Error(`Invalid type ${typeof valueOrPolicy} passed to apiKey()`);
        }
        return context2;
      });
    }
  }
});

// node_modules/@genkit-ai/core/lib/error.mjs
var error_exports = {};
__export(error_exports, {
  GenkitError: () => GenkitError2,
  UnstableApiError: () => UnstableApiError2,
  UserFacingError: () => UserFacingError2,
  assertUnstable: () => assertUnstable2,
  getCallableJSON: () => getCallableJSON2,
  getErrorMessage: () => getErrorMessage,
  getErrorStack: () => getErrorStack,
  getHttpStatus: () => getHttpStatus2
});
function assertUnstable2(registry, level, message) {
  if (level === "beta" && registry.apiStability === "stable") {
    throw new UnstableApiError2(level, message);
  }
}
function getHttpStatus2(e) {
  if (e instanceof GenkitError2) {
    return e.code;
  }
  return 500;
}
function getCallableJSON2(e) {
  if (e instanceof GenkitError2) {
    return e.toJSON();
  }
  return {
    message: "Internal Error",
    status: "INTERNAL"
  };
}
function getErrorMessage(e) {
  if (e instanceof Error) {
    return e.message;
  }
  return `${e}`;
}
function getErrorStack(e) {
  if (e instanceof Error) {
    return e.stack;
  }
  return void 0;
}
var import_statusTypes, GenkitError2, UnstableApiError2, UserFacingError2;
var init_error = __esm({
  "node_modules/@genkit-ai/core/lib/error.mjs"() {
    import_statusTypes = __toESM(require_statusTypes(), 1);
    GenkitError2 = class extends Error {
      source;
      status;
      detail;
      code;
      // For easy printing, we wrap the error with information like the source
      // and status, but that's redundant with JSON.
      originalMessage;
      constructor({
        status,
        message,
        detail,
        source
      }) {
        super(`${source ? `${source}: ` : ""}${status}: ${message}`);
        this.originalMessage = message;
        this.code = (0, import_statusTypes.httpStatusCode)(status);
        this.status = status;
        this.detail = detail;
        this.name = "GenkitError";
      }
      /**
       * Returns a JSON-serializable representation of this object.
       */
      toJSON() {
        return __spreadProps(__spreadValues({}, this.detail === void 0 ? {} : {
          details: this.detail
        }), {
          status: this.status,
          message: this.originalMessage
        });
      }
    };
    UnstableApiError2 = class extends GenkitError2 {
      constructor(level, message) {
        super({
          status: "FAILED_PRECONDITION",
          message: `${message ? message + " " : ""}This API requires '${level}' stability level.

To use this feature, initialize Genkit using \`import {genkit} from "genkit/${level}"\`.`
        });
        this.name = "UnstableApiError";
      }
    };
    UserFacingError2 = class extends GenkitError2 {
      constructor(status, message, details) {
        super({
          status,
          detail: details,
          message
        });
        super.name = "UserFacingError";
      }
    };
  }
});

// node_modules/@genkit-ai/core/lib/streaming.js
var require_streaming = __commonJS({
  "node_modules/@genkit-ai/core/lib/streaming.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var streaming_exports = {};
    __export2(streaming_exports, {
      InMemoryStreamManager: () => InMemoryStreamManager2,
      StreamNotFoundError: () => StreamNotFoundError2
    });
    module.exports = __toCommonJS2(streaming_exports);
    var import_error = (init_error(), __toCommonJS(error_exports));
    var StreamNotFoundError2 = class extends import_error.GenkitError {
      constructor(message) {
        super({
          status: "NOT_FOUND",
          message
        });
        this.name = "StreamNotFoundError";
      }
    };
    var InMemoryStreamManager2 = class {
      /**
       * @param options Configuration options.
       * @param options.ttlSeconds Time-to-live for streams in seconds. Defaults to 5 minutes.
       */
      constructor(options = {}) {
        this.options = options;
      }
      streams = /* @__PURE__ */ new Map();
      _cleanup() {
        const ttl = (this.options.ttlSeconds ?? 5 * 60) * 1e3;
        const now = Date.now();
        for (const [streamId, stream] of this.streams.entries()) {
          if (stream.status !== "open" && now - stream.lastTouched > ttl) {
            this.streams.delete(streamId);
          }
        }
      }
      open(streamId) {
        return __async(this, null, function* () {
          this._cleanup();
          if (this.streams.has(streamId)) {
            throw new Error(`Stream with id ${streamId} already exists.`);
          }
          this.streams.set(streamId, {
            status: "open",
            chunks: [],
            subscribers: [],
            lastTouched: Date.now()
          });
          return {
            write: (chunk) => __async(this, null, function* () {
              const stream = this.streams.get(streamId);
              if (stream?.status === "open") {
                stream.chunks.push(chunk);
                stream.subscribers.forEach((s) => s.onChunk(chunk));
                stream.lastTouched = Date.now();
              }
            }),
            done: (output) => __async(this, null, function* () {
              const stream = this.streams.get(streamId);
              if (stream?.status === "open") {
                this.streams.set(streamId, {
                  status: "done",
                  chunks: stream.chunks,
                  output,
                  lastTouched: Date.now()
                });
                stream.subscribers.forEach((s) => s.onDone(output));
              }
            }),
            error: (err) => __async(this, null, function* () {
              const stream = this.streams.get(streamId);
              if (stream?.status === "open") {
                stream.subscribers.forEach((s) => s.onError(err));
                this.streams.set(streamId, {
                  status: "error",
                  chunks: stream.chunks,
                  error: err,
                  lastTouched: Date.now()
                });
              }
            })
          };
        });
      }
      subscribe(streamId, subscriber) {
        return __async(this, null, function* () {
          const stream = this.streams.get(streamId);
          if (!stream) {
            throw new StreamNotFoundError2(`Stream with id ${streamId} not found.`);
          }
          if (stream.status === "done") {
            for (const chunk of stream.chunks) {
              subscriber.onChunk(chunk);
            }
            subscriber.onDone(stream.output);
          } else if (stream.status === "error") {
            for (const chunk of stream.chunks) {
              subscriber.onChunk(chunk);
            }
            subscriber.onError(stream.error);
          } else {
            stream.chunks.forEach((chunk) => subscriber.onChunk(chunk));
            stream.subscribers.push(subscriber);
          }
          return {
            unsubscribe: () => {
              const currentStream = this.streams.get(streamId);
              if (currentStream?.status === "open") {
                const index = currentStream.subscribers.indexOf(subscriber);
                if (index > -1) {
                  currentStream.subscribers.splice(index, 1);
                }
              }
            }
          };
        });
      }
    };
  }
});

// node_modules/@genkit-ai/core/lib/action.js
var require_action = __commonJS({
  "node_modules/@genkit-ai/core/lib/action.js"(exports, module) {
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
      }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var action_exports = {};
    __export2(action_exports, {
      ActionMetadataSchema: () => ActionMetadataSchema,
      InMemoryStreamManager: () => import_streaming2.InMemoryStreamManager,
      StatusCodes: () => import_statusTypes2.StatusCodes,
      StatusSchema: () => import_statusTypes2.StatusSchema,
      StreamNotFoundError: () => import_streaming2.StreamNotFoundError,
      action: () => action,
      actionWithMiddleware: () => actionWithMiddleware,
      defineAction: () => defineAction,
      defineActionAsync: () => defineActionAsync,
      getStreamingCallback: () => getStreamingCallback,
      isAction: () => isAction,
      isInRuntimeContext: () => isInRuntimeContext,
      runInActionRuntimeContext: () => runInActionRuntimeContext,
      runOutsideActionRuntimeContext: () => runOutsideActionRuntimeContext,
      runWithStreamingCallback: () => runWithStreamingCallback,
      sentinelNoopStreamingCallback: () => sentinelNoopStreamingCallback
    });
    module.exports = __toCommonJS2(action_exports);
    var z2 = __toESM2(require_zod());
    var import_async_context = require_async_context();
    var import_async = require_async();
    var import_context9 = require_context();
    var import_schema = require_schema();
    var import_tracing = require_tracing();
    var import_statusTypes2 = require_statusTypes();
    var import_streaming2 = require_streaming();
    var makeNoopAbortSignal = () => new AbortController().signal;
    var ActionMetadataSchema = z2.object({
      key: z2.string().optional(),
      actionType: z2.string().optional(),
      name: z2.string(),
      description: z2.string().optional(),
      inputSchema: z2.unknown().optional(),
      inputJsonSchema: z2.object({}).optional(),
      outputSchema: z2.unknown().optional(),
      outputJsonSchema: z2.object({}).optional(),
      streamSchema: z2.unknown().optional(),
      metadata: z2.record(z2.string(), z2.any()).optional()
    });
    function actionWithMiddleware(action2, middleware) {
      const wrapped = (req, options) => __async(null, null, function* () {
        return (yield wrapped.run(req, options)).result;
      });
      wrapped.__action = action2.__action;
      wrapped.run = (req, options) => __async(null, null, function* () {
        let telemetry;
        const dispatch = (index, req2, opts) => __async(null, null, function* () {
          if (index === middleware.length) {
            const result = yield action2.run(req2, opts);
            telemetry = result.telemetry;
            return result.result;
          }
          const currentMiddleware = middleware[index];
          if (currentMiddleware.length === 3) {
            return currentMiddleware(req2, opts, (modifiedReq, modifiedOptions) => __async(null, null, function* () {
              return dispatch(index + 1, modifiedReq || req2, modifiedOptions || opts);
            }));
          } else if (currentMiddleware.length === 2) {
            return currentMiddleware(req2, (modifiedReq) => __async(null, null, function* () {
              return dispatch(index + 1, modifiedReq || req2, opts);
            }));
          } else {
            throw new Error("unspported middleware function shape");
          }
        });
        wrapped.stream = action2.stream;
        return {
          result: yield dispatch(0, req, options),
          telemetry
        };
      });
      return wrapped;
    }
    function action(config, fn) {
      const actionName = typeof config.name === "string" ? config.name : `${config.name.pluginId}/${config.name.actionId}`;
      const actionMetadata = {
        key: `/${config.actionType}/${actionName}`,
        name: actionName,
        description: config.description,
        inputSchema: config.inputSchema,
        inputJsonSchema: config.inputJsonSchema,
        outputSchema: config.outputSchema,
        outputJsonSchema: config.outputJsonSchema,
        streamSchema: config.streamSchema,
        metadata: config.metadata,
        actionType: config.actionType
      };
      const actionFn = (input, options) => __async(null, null, function* () {
        return (yield actionFn.run(input, options)).result;
      });
      actionFn.__action = __spreadValues({}, actionMetadata);
      actionFn.run = (input, options) => __async(null, null, function* () {
        input = (0, import_schema.parseSchema)(input, {
          schema: config.inputSchema,
          jsonSchema: config.inputJsonSchema
        });
        let traceId;
        let spanId;
        const genkitKey = actionFn.__action.key;
        let output = yield (0, import_tracing.runInNewSpan)({
          metadata: {
            name: actionName
          },
          labels: __spreadValues(__spreadValues({
            [import_tracing.SPAN_TYPE_ATTR]: "action",
            "genkit:metadata:subtype": config.actionType
          }, genkitKey ? {
            "genkit:key": genkitKey
          } : {}), options?.telemetryLabels)
        }, (metadata, span) => __async(null, null, function* () {
          (0, import_tracing.setCustomMetadataAttributes)({
            subtype: config.actionType
          });
          if (options?.context) {
            (0, import_tracing.setCustomMetadataAttributes)({
              context: JSON.stringify(options.context)
            });
          }
          traceId = span.spanContext().traceId;
          spanId = span.spanContext().spanId;
          if (options?.onTraceStart) {
            options.onTraceStart({
              traceId,
              spanId
            });
          }
          metadata.name = actionName;
          metadata.input = input;
          try {
            const actFn = () => fn(input, __spreadProps(__spreadValues({}, options), {
              // Context can either be explicitly set, or inherited from the parent action.
              context: __spreadValues(__spreadValues({}, actionFn.__registry?.context), options?.context ?? (0, import_context9.getContext)()),
              streamingRequested: !!options?.onChunk && options.onChunk !== sentinelNoopStreamingCallback,
              sendChunk: options?.onChunk ?? sentinelNoopStreamingCallback,
              trace: {
                traceId,
                spanId
              },
              registry: actionFn.__registry,
              abortSignal: options?.abortSignal ?? makeNoopAbortSignal()
            }));
            const output2 = yield (0, import_context9.runWithContext)(options?.context, actFn);
            metadata.output = JSON.stringify(output2);
            return output2;
          } catch (err) {
            if (typeof err === "object") {
              err.traceId = traceId;
            }
            throw err;
          }
        }));
        output = (0, import_schema.parseSchema)(output, {
          schema: config.outputSchema,
          jsonSchema: config.outputJsonSchema
        });
        return {
          result: output,
          telemetry: {
            traceId,
            spanId
          }
        };
      });
      actionFn.stream = (input, opts) => {
        let chunkStreamController;
        const chunkStream = new ReadableStream({
          start(controller) {
            chunkStreamController = controller;
          },
          pull() {
          },
          cancel() {
          }
        });
        const invocationPromise = actionFn.run(config.inputSchema ? config.inputSchema.parse(input) : input, {
          onChunk: (chunk) => {
            chunkStreamController.enqueue(chunk);
          },
          context: __spreadValues(__spreadValues({}, actionFn.__registry?.context), opts?.context ?? (0, import_context9.getContext)()),
          abortSignal: opts?.abortSignal,
          telemetryLabels: opts?.telemetryLabels
        }).then((s) => s.result).finally(() => {
          chunkStreamController.close();
        });
        return {
          output: invocationPromise,
          stream: (function() {
            return __asyncGenerator(this, null, function* () {
              const reader = chunkStream.getReader();
              while (true) {
                const chunk = yield new __await(reader.read());
                if (chunk.value) {
                  yield chunk.value;
                }
                if (chunk.done) {
                  break;
                }
              }
              return yield new __await(invocationPromise);
            });
          })()
        };
      };
      if (config.use) {
        return actionWithMiddleware(actionFn, config.use);
      }
      return actionFn;
    }
    function isAction(a) {
      return typeof a === "function" && "__action" in a;
    }
    function defineAction(registry, config, fn) {
      if (isInRuntimeContext()) {
        throw new Error("Cannot define new actions at runtime.\nSee: https://github.com/genkit-ai/genkit/blob/main/docs/errors/no_new_actions_at_runtime.md");
      }
      const act = action(config, (i, options) => __async(null, null, function* () {
        yield registry.initializeAllPlugins();
        return yield runInActionRuntimeContext(() => fn(i, options));
      }));
      act.__action.actionType = config.actionType;
      registry.registerAction(config.actionType, act);
      return act;
    }
    function defineActionAsync(registry, actionType, name, config, onInit) {
      const actionName = typeof name === "string" ? name : `${name.pluginId}/${name.actionId}`;
      const actionPromise = (0, import_async.lazy)(() => config.then((resolvedConfig) => {
        const act = action(resolvedConfig, (i, options) => __async(null, null, function* () {
          yield registry.initializeAllPlugins();
          return yield runInActionRuntimeContext(() => resolvedConfig.fn(i, options));
        }));
        act.__action.actionType = actionType;
        act.__action.key = `/${actionType}/${actionName}`;
        onInit?.(act);
        return act;
      }));
      registry.registerActionAsync(actionType, actionName, actionPromise);
      return actionPromise;
    }
    var streamingAlsKey = "core.action.streamingCallback";
    var sentinelNoopStreamingCallback = () => null;
    function runWithStreamingCallback(streamingCallback, fn) {
      return (0, import_async_context.getAsyncContext)().run(streamingAlsKey, streamingCallback || sentinelNoopStreamingCallback, fn);
    }
    function getStreamingCallback() {
      const cb = (0, import_async_context.getAsyncContext)().getStore(streamingAlsKey);
      if (cb === sentinelNoopStreamingCallback) {
        return void 0;
      }
      return cb;
    }
    var runtimeContextAslKey = "core.action.runtimeContext";
    function isInRuntimeContext() {
      return (0, import_async_context.getAsyncContext)().getStore(runtimeContextAslKey) === "runtime";
    }
    function runInActionRuntimeContext(fn) {
      return (0, import_async_context.getAsyncContext)().run(runtimeContextAslKey, "runtime", fn);
    }
    function runOutsideActionRuntimeContext(fn) {
      return (0, import_async_context.getAsyncContext)().run(runtimeContextAslKey, "outside", fn);
    }
  }
});

// node_modules/@genkit-ai/core/lib/__codegen/version.js
var require_version = __commonJS({
  "node_modules/@genkit-ai/core/lib/__codegen/version.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var version_exports = {};
    __export2(version_exports, {
      version: () => version
    });
    module.exports = __toCommonJS2(version_exports);
    var version = "1.33.0";
  }
});

// node_modules/@genkit-ai/core/lib/background-action.js
var require_background_action = __commonJS({
  "node_modules/@genkit-ai/core/lib/background-action.js"(exports, module) {
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
      }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var background_action_exports = {};
    __export2(background_action_exports, {
      OperationSchema: () => OperationSchema2,
      backgroundAction: () => backgroundAction2,
      defineBackgroundAction: () => defineBackgroundAction2,
      isBackgroundAction: () => isBackgroundAction2,
      lookupBackgroundAction: () => lookupBackgroundAction,
      registerBackgroundAction: () => registerBackgroundAction2
    });
    module.exports = __toCommonJS2(background_action_exports);
    var z2 = __toESM2(require_zod());
    var import_action = require_action();
    var import_error = require_error();
    var import_schema = require_schema();
    var OperationSchema2 = z2.object({
      action: z2.string().optional(),
      id: z2.string(),
      done: z2.boolean().optional(),
      output: z2.any().optional(),
      error: z2.object({
        message: z2.string()
      }).passthrough().optional(),
      metadata: z2.record(z2.string(), z2.any()).optional()
    });
    function lookupBackgroundAction(registry, key) {
      return __async(this, null, function* () {
        const root = yield registry.lookupAction(key);
        if (!root) return void 0;
        const actionName = key.substring(key.indexOf("/", 1) + 1);
        return new BackgroundActionImpl(root, yield registry.lookupAction(`/check-operation/${actionName}/check`), yield registry.lookupAction(`/cancel-operation/${actionName}/cancel`));
      });
    }
    var BackgroundActionImpl = class {
      __action;
      startAction;
      checkAction;
      cancelAction;
      constructor(startAction, checkAction, cancelAction) {
        this.__action = {
          name: startAction.__action.name,
          description: startAction.__action.description,
          inputSchema: startAction.__action.inputSchema,
          inputJsonSchema: startAction.__action.inputJsonSchema,
          metadata: startAction.__action.metadata,
          actionType: startAction.__action.actionType
        };
        this.startAction = startAction;
        this.checkAction = checkAction;
        this.cancelAction = cancelAction;
      }
      start(input, options) {
        return __async(this, null, function* () {
          return yield this.startAction(input, options);
        });
      }
      check(operation) {
        return __async(this, null, function* () {
          return yield this.checkAction(operation);
        });
      }
      get supportsCancel() {
        return !!this.cancelAction;
      }
      cancel(operation) {
        return __async(this, null, function* () {
          if (!this.cancelAction) {
            return operation;
          }
          return yield this.cancelAction(operation);
        });
      }
    };
    function defineBackgroundAction2(registry, config) {
      const act = backgroundAction2(config);
      registerBackgroundAction2(registry, act);
      return act;
    }
    function registerBackgroundAction2(registry, act, opts) {
      registry.registerAction(act.startAction.__action.actionType, act.startAction, opts);
      registry.registerAction(act.checkAction.__action.actionType, act.checkAction, opts);
      if (act.cancelAction) {
        registry.registerAction(act.cancelAction.__action.actionType, act.cancelAction, opts);
      }
    }
    function backgroundAction2(config) {
      const startAction = (0, import_action.action)({
        actionType: config.actionType,
        name: config.name,
        description: config.description,
        inputSchema: config.inputSchema,
        inputJsonSchema: config.inputJsonSchema,
        outputSchema: OperationSchema2,
        metadata: __spreadProps(__spreadValues({}, config.metadata), {
          outputSchema: (0, import_schema.toJsonSchema)({
            schema: config.outputSchema,
            jsonSchema: config.outputJsonSchema
          })
        }),
        use: config.use
      }, (input, options) => __async(null, null, function* () {
        const operation = yield config.start(input, options);
        operation.action = `/${config.actionType}/${config.name}`;
        return operation;
      }));
      const checkAction = (0, import_action.action)({
        actionType: "check-operation",
        name: `${config.name}/check`,
        description: config.description,
        inputSchema: OperationSchema2,
        inputJsonSchema: config.inputJsonSchema,
        outputSchema: OperationSchema2,
        metadata: __spreadProps(__spreadValues({}, config.metadata), {
          outputSchema: (0, import_schema.toJsonSchema)({
            schema: config.outputSchema,
            jsonSchema: config.outputJsonSchema
          })
        })
      }, (input) => __async(null, null, function* () {
        const operation = yield config.check(input);
        operation.action = `/${config.actionType}/${config.name}`;
        return operation;
      }));
      let cancelAction = void 0;
      if (config.cancel) {
        cancelAction = (0, import_action.action)({
          actionType: "cancel-operation",
          name: `${config.name}/cancel`,
          description: config.description,
          inputSchema: OperationSchema2,
          inputJsonSchema: config.inputJsonSchema,
          outputSchema: OperationSchema2,
          metadata: __spreadProps(__spreadValues({}, config.metadata), {
            outputSchema: (0, import_schema.toJsonSchema)({
              schema: config.outputSchema,
              jsonSchema: config.outputJsonSchema
            })
          })
        }, (input) => __async(null, null, function* () {
          if (!config.cancel) {
            throw new import_error.GenkitError({
              status: "UNAVAILABLE",
              message: `${config.name} does not support cancellation.`
            });
          }
          const operation = yield config.cancel(input);
          operation.action = `/${config.actionType}/${config.name}`;
          return operation;
        }));
      }
      return new BackgroundActionImpl(startAction, checkAction, cancelAction);
    }
    function isBackgroundAction2(a) {
      return a instanceof BackgroundActionImpl;
    }
  }
});

// node_modules/@genkit-ai/core/lib/dynamic-action-provider.js
var require_dynamic_action_provider = __commonJS({
  "node_modules/@genkit-ai/core/lib/dynamic-action-provider.js"(exports, module) {
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
      }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var dynamic_action_provider_exports = {};
    __export2(dynamic_action_provider_exports, {
      defineDynamicActionProvider: () => defineDynamicActionProvider2,
      isDynamicActionProvider: () => isDynamicActionProvider
    });
    module.exports = __toCommonJS2(dynamic_action_provider_exports);
    var z2 = __toESM2(require_zod());
    var import_action = require_action();
    var import_error = require_error();
    var SimpleCache = class {
      value;
      expiresAt;
      ttlMillis;
      dap;
      dapFn;
      fetchPromise = null;
      constructor(config, dapFn) {
        this.dapFn = dapFn;
        this.ttlMillis = !config.cacheConfig?.ttlMillis ? 3 * 1e3 : config.cacheConfig?.ttlMillis;
      }
      setDap(dap) {
        this.dap = dap;
      }
      setValue(value) {
        const dapId = this.dap?.__action?.name;
        if (dapId) {
          Object.values(value).forEach((actionList) => {
            actionList?.forEach((action) => {
              action.__action.key = `/dynamic-action-provider/${dapId}:${action.__action.actionType}/${action.__action.name}`;
            });
          });
        }
        this.value = value;
        this.expiresAt = Date.now() + this.ttlMillis;
      }
      /**
       * Gets or fetches the DAP data.
       * @param skipTrace Don't run the action. i.e. don't create a trace log.
       * @returns The DAP data
       */
      getOrFetch(params) {
        return __async(this, null, function* () {
          const isStale = !this.value || !this.expiresAt || this.ttlMillis < 0 || Date.now() > this.expiresAt;
          if (!isStale) {
            return this.value;
          }
          if (!this.fetchPromise) {
            this.fetchPromise = (() => __async(this, null, function* () {
              try {
                if (this.dap && !params?.skipTrace) {
                  yield this.dap.run();
                } else {
                  this.setValue(yield this.dapFn());
                }
                if (!this.value) {
                  throw new Error("value is undefined");
                }
                return this.value;
              } catch (error) {
                console.error("Error fetching Dynamic Action Provider value:", error);
                this.invalidate();
                throw error;
              } finally {
                this.fetchPromise = null;
              }
            }))();
          }
          return yield this.fetchPromise;
        });
      }
      invalidate() {
        this.value = void 0;
      }
    };
    function isDynamicActionProvider(obj) {
      return obj.__action?.metadata?.type == "dynamic-action-provider";
    }
    function transformDapValue(value) {
      return Object.values(value).flatMap((actions) => actions?.map((a) => a.__action) || []);
    }
    function defineDynamicActionProvider2(registry, config, fn) {
      let cfg;
      if (typeof config == "string") {
        cfg = {
          name: config
        };
      } else {
        cfg = __spreadValues({}, config);
      }
      const cache = new SimpleCache(cfg, fn);
      const a = (0, import_action.defineAction)(registry, __spreadProps(__spreadValues({}, cfg), {
        inputSchema: z2.void(),
        outputSchema: z2.array(import_action.ActionMetadataSchema),
        actionType: "dynamic-action-provider",
        metadata: __spreadProps(__spreadValues({}, cfg.metadata || {}), {
          type: "dynamic-action-provider"
        })
      }), (_options) => __async(null, null, function* () {
        const dapValue = yield fn();
        cache.setValue(dapValue);
        return transformDapValue(dapValue);
      }));
      implementDap(a, cache);
      return a;
    }
    function implementDap(dap, cache) {
      cache.setDap(dap);
      dap.__cache = cache;
      dap.invalidateCache = () => {
        dap.__cache.invalidate();
      };
      dap.getAction = (actionType, actionName) => __async(null, null, function* () {
        const result = yield dap.__cache.getOrFetch();
        if (result[actionType]) {
          return result[actionType].find((t) => t.__action.name == actionName);
        }
        return void 0;
      });
      dap.listActionMetadata = (actionType, actionName) => __async(null, null, function* () {
        const result = yield dap.__cache.getOrFetch();
        if (!result[actionType]) {
          return [];
        }
        const metadata = result[actionType].map((a) => a.__action);
        if (actionName == "*") {
          return metadata;
        }
        if (actionName.endsWith("*")) {
          const prefix = actionName.slice(0, -1);
          return metadata.filter((m) => m.name.startsWith(prefix));
        }
        return metadata.filter((m) => m.name == actionName);
      });
      dap.getActionMetadataRecord = (dapPrefix) => __async(null, null, function* () {
        const dapActions = {};
        const result = yield dap.__cache.getOrFetch({
          skipTrace: true
        });
        for (const actions of Object.values(result)) {
          const metadataList = actions.map((a) => a.__action);
          for (const metadata of metadataList) {
            if (!metadata.name || !metadata.key) {
              throw new import_error.GenkitError({
                status: "INVALID_ARGUMENT",
                message: `Invalid metadata when listing dynamic actions from ${dapPrefix} - name required`
              });
            }
            dapActions[metadata.key] = metadata;
          }
        }
        return dapActions;
      });
    }
  }
});

// node_modules/@genkit-ai/core/lib/flow.js
var require_flow = __commonJS({
  "node_modules/@genkit-ai/core/lib/flow.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var flow_exports = {};
    __export2(flow_exports, {
      defineFlow: () => defineFlow2,
      flow: () => flow2,
      run: () => run2
    });
    module.exports = __toCommonJS2(flow_exports);
    var import_action = require_action();
    var import_tracing = require_tracing();
    function flow2(config, fn) {
      const resolvedConfig = typeof config === "string" ? {
        name: config
      } : config;
      return flowAction(resolvedConfig, fn);
    }
    function defineFlow2(registry, config, fn) {
      const f = flow2(config, fn);
      registry.registerAction("flow", f);
      return f;
    }
    function flowAction(config, fn) {
      return (0, import_action.action)({
        actionType: "flow",
        name: config.name,
        inputSchema: config.inputSchema,
        outputSchema: config.outputSchema,
        streamSchema: config.streamSchema,
        metadata: config.metadata
      }, (_0, _1) => __async(null, [_0, _1], function* (input, {
        sendChunk,
        context: context2,
        trace: trace2,
        abortSignal,
        streamingRequested
      }) {
        const ctx = sendChunk;
        ctx.sendChunk = sendChunk;
        ctx.context = context2;
        ctx.trace = trace2;
        ctx.abortSignal = abortSignal;
        ctx.streamingRequested = streamingRequested;
        return fn(input, ctx);
      }));
    }
    function run2(name, funcOrInput, fnOrRegistry, _) {
      let func;
      let input;
      let hasInput = false;
      if (typeof funcOrInput === "function") {
        func = funcOrInput;
      } else {
        input = funcOrInput;
        hasInput = true;
      }
      if (typeof fnOrRegistry === "function") {
        func = fnOrRegistry;
      }
      if (!func) {
        throw new Error("unable to resolve run function");
      }
      return (0, import_tracing.runInNewSpan)({
        metadata: {
          name
        },
        labels: {
          [import_tracing.SPAN_TYPE_ATTR]: "flowStep"
        }
      }, (meta) => __async(null, null, function* () {
        meta.input = input;
        const output = hasInput ? yield func(input) : yield func();
        meta.output = JSON.stringify(output);
        return output;
      }));
    }
  }
});

// node_modules/@genkit-ai/core/lib/plugin.js
var require_plugin = __commonJS({
  "node_modules/@genkit-ai/core/lib/plugin.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var plugin_exports = {};
    module.exports = __toCommonJS2(plugin_exports);
  }
});

// node_modules/get-port/index.js
var require_get_port = __commonJS({
  "node_modules/get-port/index.js"(exports, module) {
    "use strict";
    var net = __require("net");
    var Locked = class extends Error {
      constructor(port) {
        super(`${port} is locked`);
      }
    };
    var lockedPorts = {
      old: /* @__PURE__ */ new Set(),
      young: /* @__PURE__ */ new Set()
    };
    var releaseOldLockedPortsIntervalMs = 1e3 * 15;
    var interval;
    var getAvailablePort = (options) => new Promise((resolve, reject) => {
      const server = net.createServer();
      server.unref();
      server.on("error", reject);
      server.listen(options, () => {
        const {
          port
        } = server.address();
        server.close(() => {
          resolve(port);
        });
      });
    });
    var portCheckSequence = function* (ports) {
      if (ports) {
        yield* __yieldStar(ports);
      }
      yield 0;
    };
    module.exports = (options) => __async(null, null, function* () {
      let ports;
      if (options) {
        ports = typeof options.port === "number" ? [options.port] : options.port;
      }
      if (interval === void 0) {
        interval = setInterval(() => {
          lockedPorts.old = lockedPorts.young;
          lockedPorts.young = /* @__PURE__ */ new Set();
        }, releaseOldLockedPortsIntervalMs);
        if (interval.unref) {
          interval.unref();
        }
      }
      for (const port of portCheckSequence(ports)) {
        try {
          let availablePort = yield getAvailablePort(__spreadProps(__spreadValues({}, options), {
            port
          }));
          while (lockedPorts.old.has(availablePort) || lockedPorts.young.has(availablePort)) {
            if (port !== 0) {
              throw new Locked(port);
            }
            availablePort = yield getAvailablePort(__spreadProps(__spreadValues({}, options), {
              port
            }));
          }
          lockedPorts.young.add(availablePort);
          return availablePort;
        } catch (error) {
          if (!["EADDRINUSE", "EACCES"].includes(error.code) && !(error instanceof Locked)) {
            throw error;
          }
        }
      }
      throw new Error("No available ports found");
    });
    module.exports.makeRange = (from, to) => {
      if (!Number.isInteger(from) || !Number.isInteger(to)) {
        throw new TypeError("`from` and `to` must be integer numbers");
      }
      if (from < 1024 || from > 65535) {
        throw new RangeError("`from` must be between 1024 and 65535");
      }
      if (to < 1024 || to > 65536) {
        throw new RangeError("`to` must be between 1024 and 65536");
      }
      if (to < from) {
        throw new RangeError("`to` must be greater than or equal to `from`");
      }
      const generator = function* (from2, to2) {
        for (let port = from2; port <= to2; port++) {
          yield port;
        }
      };
      return generator(from, to);
    };
  }
});

// node_modules/@genkit-ai/core/lib/reflection.js
var require_reflection = __commonJS({
  "node_modules/@genkit-ai/core/lib/reflection.js"(exports, module) {
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
      }) : target,
      mod
    ));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var reflection_exports = {};
    __export2(reflection_exports, {
      ReflectionServer: () => ReflectionServer,
      RunActionResponseSchema: () => RunActionResponseSchema
    });
    module.exports = __toCommonJS2(reflection_exports);
    var import_express = __toESM2(require_express());
    var import_promises = __toESM2(__require("fs/promises"));
    var import_get_port = __toESM2(require_get_port());
    var import_path = __toESM2(__require("path"));
    var z2 = __toESM2(require_zod());
    var import_action = require_action();
    var import_config = require_config();
    var import_index = require_lib();
    var import_logging = require_logging();
    var import_schema = require_schema();
    var import_tracing = require_tracing();
    var RunActionResponseSchema = z2.object({
      result: z2.unknown().optional(),
      error: z2.unknown().optional(),
      telemetry: z2.object({
        traceId: z2.string().optional()
      }).optional()
    });
    function isAbortError(err) {
      return err?.name === "AbortError" || typeof DOMException !== "undefined" && err instanceof DOMException && err.name === "AbortError";
    }
    var ReflectionServer = class _ReflectionServer {
      /** List of all running servers needed to be cleaned up on process exit. */
      static RUNNING_SERVERS = [];
      /** Registry instance to be used for API calls. */
      registry;
      /** Options for the reflection server. */
      options;
      /** Port the server is actually running on. This may differ from `options.port` if the original was occupied. Null if server is not running. */
      port = null;
      /** Express server instance. Null if server is not running. */
      server = null;
      /** Path to the runtime file. Null if server is not running. */
      runtimeFilePath = null;
      /** Map of active actions indexed by trace ID for cancellation support. */
      activeActions = /* @__PURE__ */ new Map();
      v2Server = null;
      constructor(registry, options) {
        this.registry = registry;
        this.options = __spreadValues({
          port: 3100,
          bodyLimit: "30mb",
          configuredEnvs: ["dev"]
        }, options);
      }
      get runtimeId() {
        return `${process.pid}${this.port !== null ? `-${this.port}` : ""}`;
      }
      /**
       * Finds a free port to run the server on based on the original chosen port and environment.
       */
      findPort() {
        return __async(this, null, function* () {
          const chosenPort = this.options.port;
          const freePort = yield (0, import_get_port.default)({
            port: (0, import_get_port.makeRange)(chosenPort, chosenPort + 100)
          });
          if (freePort !== chosenPort) {
            import_logging.logger.warn(`Port ${chosenPort} is already in use, using next available port ${freePort} instead.`);
          }
          return freePort;
        });
      }
      /**
       * Starts the server.
       *
       * The server will be registered to be shut down on process exit.
       */
      start() {
        return __async(this, null, function* () {
          if ((0, import_config.getGenkitRuntimeConfig)().sandboxedRuntime) {
            import_logging.logger.debug("Skipping ReflectionServer start: not supported in sandboxed runtime.");
            return;
          }
          if (process.env.GENKIT_REFLECTION_V2_SERVER) {
            const {
              ReflectionServerV2
            } = yield import("./reflection-v2-3X2BQYFZ.js");
            this.v2Server = new ReflectionServerV2(this.registry, {
              configuredEnvs: this.options.configuredEnvs,
              name: this.options.name,
              url: process.env.GENKIT_REFLECTION_V2_SERVER
            });
            yield this.v2Server.start();
            _ReflectionServer.RUNNING_SERVERS.push(this);
            return;
          }
          const server = (0, import_express.default)();
          server.use(import_express.default.json({
            limit: this.options.bodyLimit
          }));
          server.use((req, res, next) => {
            res.header("x-genkit-version", import_index.GENKIT_VERSION);
            next();
          });
          server.get("/api/__health", (req, response) => __async(this, null, function* () {
            if (req.query["id"] && req.query["id"] !== this.runtimeId) {
              response.status(503).send("Invalid runtime ID");
              return;
            }
            yield this.registry.listActions();
            response.status(200).send("OK");
          }));
          server.get("/api/__quitquitquit", (_, response) => __async(this, null, function* () {
            import_logging.logger.debug("Received quitquitquit");
            response.status(200).send("OK");
            yield this.stop();
          }));
          server.get("/api/values", (req, response, next) => __async(this, null, function* () {
            import_logging.logger.debug("Fetching values.");
            try {
              const type = req.query.type;
              if (!type) {
                response.status(400).send('Query parameter "type" is required.');
                return;
              }
              if (type !== "defaultModel" && type !== "middleware") {
                response.status(400).send(`'type' ${type} is not supported. Only 'defaultModel' and 'middleware' are supported`);
                return;
              }
              const values = yield this.registry.listValues(type);
              const mappedValues = {};
              for (const [key, value] of Object.entries(values)) {
                mappedValues[key] = value && value.toJson && typeof value.toJson === "function" ? value.toJson() : value;
              }
              response.send(mappedValues);
            } catch (err) {
              const {
                message,
                stack
              } = err;
              next({
                message,
                stack
              });
            }
          }));
          server.get("/api/actions", (_, response, next) => __async(this, null, function* () {
            import_logging.logger.debug("Fetching actions.");
            try {
              const actions = yield this.registry.listResolvableActions();
              const convertedActions = {};
              Object.keys(actions).forEach((key) => {
                const action = actions[key];
                convertedActions[key] = {
                  key,
                  name: action.name,
                  description: action.description,
                  metadata: action.metadata
                };
                if (action.inputSchema || action.inputJsonSchema) {
                  convertedActions[key].inputSchema = (0, import_schema.toJsonSchema)({
                    schema: action.inputSchema,
                    jsonSchema: action.inputJsonSchema
                  });
                }
                if (action.outputSchema || action.outputJsonSchema) {
                  convertedActions[key].outputSchema = (0, import_schema.toJsonSchema)({
                    schema: action.outputSchema,
                    jsonSchema: action.outputJsonSchema
                  });
                }
              });
              response.send(convertedActions);
            } catch (err) {
              const {
                message,
                stack
              } = err;
              next({
                message,
                stack
              });
            }
          }));
          server.post("/api/runAction", (request, response, next) => __async(this, null, function* () {
            const {
              key,
              input,
              context: context2,
              telemetryLabels
            } = request.body;
            const {
              stream
            } = request.query;
            import_logging.logger.debug(`Running action \`${key}\` with stream=${stream}...`);
            const abortController = new AbortController();
            let traceId;
            try {
              const action = yield this.registry.lookupAction(key);
              if (!action) {
                response.status(404).send(`action ${key} not found`);
                return;
              }
              const onTraceStartCallback = ({
                traceId: tid,
                spanId
              }) => {
                traceId = tid;
                this.activeActions.set(tid, {
                  abortController,
                  startTime: /* @__PURE__ */ new Date()
                });
                response.setHeader("X-Genkit-Trace-Id", tid);
                response.setHeader("X-Genkit-Span-Id", spanId);
                response.setHeader("X-Genkit-Version", import_index.GENKIT_VERSION);
                if (stream === "true") {
                  response.setHeader("Content-Type", "text/plain");
                  response.setHeader("Transfer-Encoding", "chunked");
                } else {
                  response.setHeader("Content-Type", "application/json");
                  response.setHeader("Transfer-Encoding", "chunked");
                }
                response.statusCode = 200;
                response.flushHeaders();
              };
              if (stream === "true") {
                try {
                  const callback = (chunk) => {
                    response.write(JSON.stringify(chunk) + "\n");
                  };
                  const result = yield action.run(input, {
                    context: context2 || {},
                    onChunk: callback,
                    telemetryLabels,
                    onTraceStart: onTraceStartCallback,
                    abortSignal: abortController.signal
                  });
                  yield (0, import_tracing.flushTracing)();
                  response.write(JSON.stringify({
                    result: result.result,
                    telemetry: {
                      traceId: result.telemetry.traceId
                    }
                  }));
                  response.end();
                } catch (err) {
                  const {
                    message,
                    stack
                  } = err;
                  const errorResponse = {
                    code: isAbortError(err) ? import_action.StatusCodes.CANCELLED : import_action.StatusCodes.INTERNAL,
                    message: isAbortError(err) ? "Action was cancelled" : message,
                    details: {
                      stack
                    }
                  };
                  if (err.traceId) {
                    errorResponse.details.traceId = err.traceId;
                  }
                  response.write(JSON.stringify({
                    error: errorResponse
                  }));
                  response.end();
                }
              } else {
                const result = yield action.run(input, {
                  context: context2 || {},
                  telemetryLabels,
                  onTraceStart: onTraceStartCallback,
                  abortSignal: abortController.signal
                });
                yield (0, import_tracing.flushTracing)();
                response.end(JSON.stringify({
                  result: result.result,
                  telemetry: {
                    traceId: result.telemetry.traceId
                  }
                }));
              }
            } catch (err) {
              const {
                message,
                stack
              } = err;
              const errorResponse = {
                code: isAbortError(err) ? import_action.StatusCodes.CANCELLED : import_action.StatusCodes.INTERNAL,
                message: isAbortError(err) ? "Action was cancelled" : message,
                details: {
                  stack,
                  traceId: err.traceId || traceId
                }
              };
              if (response.headersSent) {
                response.end(JSON.stringify({
                  error: errorResponse
                }));
              } else {
                next({
                  message,
                  stack
                });
              }
            } finally {
              if (traceId) {
                this.activeActions.delete(traceId);
              }
            }
          }));
          server.post("/api/cancelAction", (request, response) => __async(this, null, function* () {
            const {
              traceId
            } = request.body;
            if (!traceId || typeof traceId !== "string") {
              response.status(400).json({
                error: "traceId is required"
              });
              return;
            }
            const activeAction = this.activeActions.get(traceId);
            if (activeAction) {
              activeAction.abortController.abort();
              this.activeActions.delete(traceId);
              response.status(200).json({
                message: "Action cancelled"
              });
            } else {
              response.status(404).json({
                message: "Action not found or already completed"
              });
            }
          }));
          server.get("/api/envs", (_, response) => __async(this, null, function* () {
            response.json(this.options.configuredEnvs);
          }));
          server.post("/api/notify", (request, response) => __async(this, null, function* () {
            const {
              telemetryServerUrl,
              reflectionApiSpecVersion
            } = request.body;
            if (!process.env.GENKIT_TELEMETRY_SERVER) {
              if (typeof telemetryServerUrl === "string") {
                (0, import_tracing.setTelemetryServerUrl)(telemetryServerUrl);
                import_logging.logger.debug(`Connected to telemetry server on ${telemetryServerUrl}`);
              }
            }
            if (reflectionApiSpecVersion !== import_index.GENKIT_REFLECTION_API_SPEC_VERSION) {
              if (!reflectionApiSpecVersion || reflectionApiSpecVersion < import_index.GENKIT_REFLECTION_API_SPEC_VERSION) {
                import_logging.logger.warn("WARNING: Genkit CLI version may be outdated. Please update `genkit-cli` to the latest version.");
              } else {
                import_logging.logger.warn(`Genkit CLI is newer than runtime library. Some feature may not be supported. Consider upgrading your runtime library version (debug info: expected ${import_index.GENKIT_REFLECTION_API_SPEC_VERSION}, got ${reflectionApiSpecVersion}).`);
              }
            }
            response.status(200).send("OK");
          }));
          server.use((err, req, res, next) => {
            import_logging.logger.error(err.stack);
            const error = err;
            const {
              message,
              stack
            } = error;
            const errorResponse = {
              code: import_action.StatusCodes.INTERNAL,
              message,
              details: {
                stack
              }
            };
            res.status(200).end(JSON.stringify({
              error: errorResponse
            }));
          });
          this.port = yield this.findPort();
          this.server = server.listen(this.port, () => __async(this, null, function* () {
            import_logging.logger.debug(`Reflection server (${process.pid}) running on http://localhost:${this.port}`);
            _ReflectionServer.RUNNING_SERVERS.push(this);
            try {
              yield this.registry.listActions();
              yield this.writeRuntimeFile();
            } catch (e) {
              import_logging.logger.error(`Error initializing plugins: ${e}`);
              try {
                yield this.stop();
              } catch (err) {
                import_logging.logger.error(`Failed to stop server gracefully: ${err}`);
              }
            }
          }));
        });
      }
      /**
       * Stops the server and removes it from the list of running servers to clean up on exit.
       */
      stop() {
        return __async(this, null, function* () {
          if (this.v2Server) {
            yield this.v2Server.stop();
            const index = _ReflectionServer.RUNNING_SERVERS.indexOf(this);
            if (index > -1) {
              _ReflectionServer.RUNNING_SERVERS.splice(index, 1);
            }
            return;
          }
          if (!this.server) {
            return;
          }
          return new Promise((resolve, reject) => __async(this, null, function* () {
            yield this.cleanupRuntimeFile();
            this.server.close((err) => __async(this, null, function* () {
              if (err) {
                import_logging.logger.error(`Error shutting down reflection server on port ${this.port}: ${err}`);
                reject(err);
              }
              const index = _ReflectionServer.RUNNING_SERVERS.indexOf(this);
              if (index > -1) {
                _ReflectionServer.RUNNING_SERVERS.splice(index, 1);
              }
              import_logging.logger.debug(`Reflection server on port ${this.port} has successfully shut down.`);
              this.port = null;
              this.server = null;
              resolve();
            }));
          }));
        });
      }
      /**
       * Writes the runtime file to the project root.
       */
      writeRuntimeFile() {
        return __async(this, null, function* () {
          try {
            const rootDir = yield findProjectRoot();
            const runtimesDir = import_path.default.join(rootDir, ".genkit", "runtimes");
            const date = /* @__PURE__ */ new Date();
            const time = date.getTime();
            const timestamp = date.toISOString();
            this.runtimeFilePath = import_path.default.join(runtimesDir, `${this.runtimeId}-${time}.json`);
            const fileContent = JSON.stringify({
              id: process.env.GENKIT_RUNTIME_ID || this.runtimeId,
              pid: process.pid,
              name: this.options.name,
              reflectionServerUrl: `http://localhost:${this.port}`,
              timestamp,
              genkitVersion: `nodejs/${import_index.GENKIT_VERSION}`,
              reflectionApiSpecVersion: import_index.GENKIT_REFLECTION_API_SPEC_VERSION
            }, null, 2);
            yield import_promises.default.mkdir(runtimesDir, {
              recursive: true
            });
            yield import_promises.default.writeFile(this.runtimeFilePath, fileContent, "utf8");
            import_logging.logger.debug(`Runtime file written: ${this.runtimeFilePath}`);
          } catch (error) {
            import_logging.logger.error(`Error writing runtime file: ${error}`);
          }
        });
      }
      /**
       * Cleans up the port file.
       */
      cleanupRuntimeFile() {
        return __async(this, null, function* () {
          if (!this.runtimeFilePath) {
            return;
          }
          try {
            const fileContent = yield import_promises.default.readFile(this.runtimeFilePath, "utf8");
            const data = JSON.parse(fileContent);
            if (data.pid === process.pid) {
              yield import_promises.default.unlink(this.runtimeFilePath);
              import_logging.logger.debug(`Runtime file cleaned up: ${this.runtimeFilePath}`);
            }
          } catch (error) {
            import_logging.logger.error(`Error cleaning up runtime file: ${error}`);
          }
        });
      }
      /**
       * Stops all running reflection servers.
       */
      static stopAll() {
        return __async(this, null, function* () {
          return Promise.all(_ReflectionServer.RUNNING_SERVERS.map((server) => server.stop()));
        });
      }
    };
    function findProjectRoot() {
      return __async(this, null, function* () {
        let currentDir = process.cwd();
        while (currentDir !== import_path.default.parse(currentDir).root) {
          const packageJsonPath = import_path.default.join(currentDir, "package.json");
          try {
            yield import_promises.default.access(packageJsonPath);
            return currentDir;
          } catch {
            currentDir = import_path.default.dirname(currentDir);
          }
        }
        throw new Error("Could not find project root (package.json not found)");
      });
    }
    if (typeof module !== "undefined" && "hot" in module) {
      module.hot.accept();
      module.hot.dispose(() => __async(null, null, function* () {
        import_logging.logger.debug("Cleaning up reflection server(s) before module reload...");
        yield ReflectionServer.stopAll();
      }));
    }
  }
});

// node_modules/@genkit-ai/core/lib/telemetryTypes.js
var require_telemetryTypes = __commonJS({
  "node_modules/@genkit-ai/core/lib/telemetryTypes.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var telemetryTypes_exports = {};
    module.exports = __toCommonJS2(telemetryTypes_exports);
  }
});

// node_modules/@genkit-ai/core/lib/index.js
var require_lib = __commonJS({
  "node_modules/@genkit-ai/core/lib/index.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all) __defProp(target, name, {
        get: all[name],
        enumerable: true
      });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var index_exports = {};
    __export2(index_exports, {
      GENKIT_CLIENT_HEADER: () => GENKIT_CLIENT_HEADER,
      GENKIT_REFLECTION_API_SPEC_VERSION: () => GENKIT_REFLECTION_API_SPEC_VERSION,
      GENKIT_VERSION: () => GENKIT_VERSION,
      GenkitError: () => import_error.GenkitError,
      OperationSchema: () => import_background_action.OperationSchema,
      UnstableApiError: () => import_error.UnstableApiError,
      UserFacingError: () => import_error.UserFacingError,
      apiKey: () => import_context9.apiKey,
      assertUnstable: () => import_error.assertUnstable,
      backgroundAction: () => import_background_action.backgroundAction,
      defineBackgroundAction: () => import_background_action.defineBackgroundAction,
      defineDynamicActionProvider: () => import_dynamic_action_provider.defineDynamicActionProvider,
      defineFlow: () => import_flow.defineFlow,
      defineJsonSchema: () => import_schema.defineJsonSchema,
      defineSchema: () => import_schema.defineSchema,
      flow: () => import_flow.flow,
      getAsyncContext: () => import_async_context.getAsyncContext,
      getCallableJSON: () => import_error.getCallableJSON,
      getClientHeader: () => getClientHeader,
      getContext: () => import_context9.getContext,
      getGenkitRuntimeConfig: () => import_config.getGenkitRuntimeConfig,
      getHttpStatus: () => import_error.getHttpStatus,
      isBackgroundAction: () => import_background_action.isBackgroundAction,
      registerBackgroundAction: () => import_background_action.registerBackgroundAction,
      resetGenkitRuntimeConfig: () => import_config.resetGenkitRuntimeConfig,
      run: () => import_flow.run,
      runWithContext: () => import_context9.runWithContext,
      setClientHeader: () => setClientHeader,
      setGenkitRuntimeConfig: () => import_config.setGenkitRuntimeConfig,
      z: () => import_zod.z
    });
    module.exports = __toCommonJS2(index_exports);
    var import_version4 = require_version();
    var import_zod = require_zod();
    __reExport(index_exports, require_action(), module.exports);
    var import_async_context = require_async_context();
    var import_background_action = require_background_action();
    var import_config = require_config();
    var import_context9 = require_context();
    var import_dynamic_action_provider = require_dynamic_action_provider();
    var import_error = require_error();
    var import_flow = require_flow();
    __reExport(index_exports, require_plugin(), module.exports);
    __reExport(index_exports, require_reflection(), module.exports);
    var import_schema = require_schema();
    __reExport(index_exports, require_telemetryTypes(), module.exports);
    __reExport(index_exports, require_utils2(), module.exports);
    var GENKIT_VERSION = import_version4.version;
    var GENKIT_CLIENT_HEADER = `genkit-node/${GENKIT_VERSION} gl-node/${process.versions.node}`;
    var GENKIT_REFLECTION_API_SPEC_VERSION = 1;
    var clientHeaderGlobalKey = "__genkit_ClientHeader";
    function getClientHeader() {
      if (global[clientHeaderGlobalKey]) {
        return GENKIT_CLIENT_HEADER + " " + global[clientHeaderGlobalKey];
      }
      return GENKIT_CLIENT_HEADER;
    }
    function setClientHeader(header) {
      global[clientHeaderGlobalKey] = header;
    }
  }
});

export {
  require_version,
  require_zod,
  require_error,
  require_async_context,
  require_context,
  require_ajv,
  require_dist,
  createContextKey,
  createNoopMeter,
  ValueType,
  TraceFlags,
  INVALID_SPAN_CONTEXT,
  isValidTraceId,
  isValidSpanId,
  isSpanContextValid,
  SamplingDecision,
  SpanKind,
  SpanStatusCode,
  context,
  diag2 as diag,
  metrics,
  propagation,
  trace,
  esm_exports,
  init_esm,
  NOOP_LOGGER,
  logs,
  esm_exports2,
  init_esm2,
  logger,
  init_logging,
  require_config,
  require_schema,
  require_logging,
  suppressTracing,
  isTracingSuppressed,
  utils_exports,
  W3CBaggagePropagator,
  sanitizeAttributes,
  isAttributeValue,
  globalErrorHandler,
  TracesSamplerValues,
  DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
  DEFAULT_ATTRIBUTE_COUNT_LIMIT,
  getEnv,
  getEnvWithoutDefaults,
  hexToBinary,
  otperformance,
  SDK_INFO,
  unrefTimer,
  millisToHrTime,
  getTimeOrigin,
  hrTime,
  timeInputToHrTime,
  hrTimeDuration,
  hrTimeToNanoseconds,
  hrTimeToMicroseconds,
  isTimeInputHrTime,
  isTimeInput,
  addHrTimes,
  ExportResultCode,
  CompositePropagator,
  W3CTraceContextPropagator,
  merge,
  callWithTimeout,
  BindOnceFuture,
  internal,
  esm_exports3,
  init_esm4 as init_esm3,
  require_utils2 as require_utils,
  require_exporter,
  require_instrumentation,
  require_types4 as require_types,
  require_tracing,
  require_action,
  require_background_action,
  require_dynamic_action_provider,
  require_flow,
  require_plugin,
  require_reflection,
  require_telemetryTypes,
  require_lib
};
//# sourceMappingURL=chunk-OWKFXNV6.js.map
