import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  require_genkit_beta
} from "./chunk-EAO7QYPM.js";
import {
  require_common,
  require_logging
} from "./chunk-ECVKO3DF.js";
import {
  require_lib
} from "./chunk-OWKFXNV6.js";
import {
  require_async
} from "./chunk-RATDSHE6.js";
import "./chunk-2KLBD6HR.js";
import {
  require_body_parser,
  require_express,
  require_vary
} from "./chunk-Z5YJFFGF.js";
import "./chunk-2KHP64LJ.js";
import {
  __async,
  __commonJS,
  __require,
  __spreadValues
} from "./chunk-PNXJXBRO.js";

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/cors/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/cors/lib/index.js"(exports, module) {
    (function() {
      "use strict";
      var assign = require_object_assign();
      var vary = require_vary();
      var defaults = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
      };
      function isString(s) {
        return typeof s === "string" || s instanceof String;
      }
      function isOriginAllowed(origin, allowedOrigin) {
        if (Array.isArray(allowedOrigin)) {
          for (var i = 0; i < allowedOrigin.length; ++i) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
              return true;
            }
          }
          return false;
        } else if (isString(allowedOrigin)) {
          return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        } else {
          return !!allowedOrigin;
        }
      }
      function configureOrigin(options, req) {
        var requestOrigin = req.headers.origin, headers = [], isAllowed;
        if (!options.origin || options.origin === "*") {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: "*"
          }]);
        } else if (isString(options.origin)) {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: options.origin
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        } else {
          isAllowed = isOriginAllowed(requestOrigin, options.origin);
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: isAllowed ? requestOrigin : false
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        }
        return headers;
      }
      function configureMethods(options) {
        var methods = options.methods;
        if (methods.join) {
          methods = options.methods.join(",");
        }
        return {
          key: "Access-Control-Allow-Methods",
          value: methods
        };
      }
      function configureCredentials(options) {
        if (options.credentials === true) {
          return {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          };
        }
        return null;
      }
      function configureAllowedHeaders(options, req) {
        var allowedHeaders = options.allowedHeaders || options.headers;
        var headers = [];
        if (!allowedHeaders) {
          allowedHeaders = req.headers["access-control-request-headers"];
          headers.push([{
            key: "Vary",
            value: "Access-Control-Request-Headers"
          }]);
        } else if (allowedHeaders.join) {
          allowedHeaders = allowedHeaders.join(",");
        }
        if (allowedHeaders && allowedHeaders.length) {
          headers.push([{
            key: "Access-Control-Allow-Headers",
            value: allowedHeaders
          }]);
        }
        return headers;
      }
      function configureExposedHeaders(options) {
        var headers = options.exposedHeaders;
        if (!headers) {
          return null;
        } else if (headers.join) {
          headers = headers.join(",");
        }
        if (headers && headers.length) {
          return {
            key: "Access-Control-Expose-Headers",
            value: headers
          };
        }
        return null;
      }
      function configureMaxAge(options) {
        var maxAge = (typeof options.maxAge === "number" || options.maxAge) && options.maxAge.toString();
        if (maxAge && maxAge.length) {
          return {
            key: "Access-Control-Max-Age",
            value: maxAge
          };
        }
        return null;
      }
      function applyHeaders(headers, res) {
        for (var i = 0, n = headers.length; i < n; i++) {
          var header = headers[i];
          if (header) {
            if (Array.isArray(header)) {
              applyHeaders(header, res);
            } else if (header.key === "Vary" && header.value) {
              vary(res, header.value);
            } else if (header.value) {
              res.setHeader(header.key, header.value);
            }
          }
        }
      }
      function cors(options, req, res, next) {
        var headers = [], method = req.method && req.method.toUpperCase && req.method.toUpperCase();
        if (method === "OPTIONS") {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options));
          headers.push(configureMethods(options));
          headers.push(configureAllowedHeaders(options, req));
          headers.push(configureMaxAge(options));
          headers.push(configureExposedHeaders(options));
          applyHeaders(headers, res);
          if (options.preflightContinue) {
            next();
          } else {
            res.statusCode = options.optionsSuccessStatus;
            res.setHeader("Content-Length", "0");
            res.end();
          }
        } else {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options));
          headers.push(configureExposedHeaders(options));
          applyHeaders(headers, res);
          next();
        }
      }
      function middlewareWrapper(o) {
        var optionsCallback = null;
        if (typeof o === "function") {
          optionsCallback = o;
        } else {
          optionsCallback = function(req, cb) {
            cb(null, o);
          };
        }
        return function corsMiddleware(req, res, next) {
          optionsCallback(req, function(err, options) {
            if (err) {
              next(err);
            } else {
              var corsOptions = assign({}, defaults, options);
              var originCallback = null;
              if (corsOptions.origin && typeof corsOptions.origin === "function") {
                originCallback = corsOptions.origin;
              } else if (corsOptions.origin) {
                originCallback = function(origin, cb) {
                  cb(null, corsOptions.origin);
                };
              }
              if (originCallback) {
                originCallback(req.headers.origin, function(err2, origin) {
                  if (err2 || !origin) {
                    next(err2);
                  } else {
                    corsOptions.origin = origin;
                    cors(corsOptions, req, res, next);
                  }
                });
              } else {
                next();
              }
            }
          });
        };
      }
      module.exports = middlewareWrapper;
    })();
  }
});

// node_modules/genkit/lib/beta.js
var require_beta = __commonJS({
  "node_modules/genkit/lib/beta.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
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
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var beta_exports = {};
    __export(beta_exports, {
      AsyncTaskQueue: () => import_async.AsyncTaskQueue,
      GenkitBeta: () => import_genkit_beta.GenkitBeta,
      InMemoryStreamManager: () => import_core.InMemoryStreamManager,
      StreamNotFoundError: () => import_core.StreamNotFoundError,
      genkit: () => import_genkit_beta.genkit,
      lazy: () => import_async.lazy
    });
    module.exports = __toCommonJS(beta_exports);
    var import_core = require_lib();
    var import_async = require_async();
    __reExport(beta_exports, require_common(), module.exports);
    var import_genkit_beta = require_genkit_beta();
  }
});

// node_modules/genkit/lib/context.js
var require_context = __commonJS({
  "node_modules/genkit/lib/context.js"(exports, module) {
    "use strict";
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
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
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var context_exports = {};
    __export(context_exports, {
      apiKey: () => import_core.apiKey,
      getCallableJSON: () => import_core.getCallableJSON,
      getHttpStatus: () => import_core.getHttpStatus
    });
    module.exports = __toCommonJS(context_exports);
    var import_core = require_lib();
  }
});

// node_modules/@genkit-ai/express/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/@genkit-ai/express/lib/index.js"(exports, module) {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
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
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
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
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var index_exports = {};
    __export(index_exports, {
      FlowServer: () => FlowServer,
      expressHandler: () => expressHandler,
      startFlowServer: () => startFlowServer,
      withContextProvider: () => withContextProvider,
      withFlowOptions: () => withFlowOptions
    });
    module.exports = __toCommonJS(index_exports);
    var import_body_parser = __toESM(require_body_parser());
    var import_cors = __toESM(require_lib2());
    var import_crypto = __require("crypto");
    var import_express = __toESM(require_express());
    var import_beta = require_beta();
    var import_context = require_context();
    var import_logging = require_logging();
    var streamDelimiter = "\n\n";
    function expressHandler(action, opts) {
      return (request, response) => __async(null, null, function* () {
        const {
          stream
        } = request.query;
        const streamIdHeader = request.headers["x-genkit-stream-id"];
        const streamId = Array.isArray(streamIdHeader) ? streamIdHeader[0] : streamIdHeader;
        if (!request.body) {
          const errMsg = `Error: request.body is undefined. Possible reasons: missing 'content-type: application/json' in request headers or misconfigured JSON middleware ('app.use(express.json()')? `;
          import_logging.logger.error(errMsg);
          response.status(400).json({
            message: errMsg,
            status: "INVALID ARGUMENT"
          }).end();
          return;
        }
        const input = request.body.data;
        let context;
        try {
          context = (yield opts?.contextProvider?.({
            method: request.method,
            headers: Object.fromEntries(Object.entries(request.headers).map(([key, value]) => [key.toLowerCase(), Array.isArray(value) ? value.join(" ") : String(value)])),
            input
          })) || {};
        } catch (e) {
          import_logging.logger.error(`Auth policy failed with error: ${e.message}
${e.stack}`);
          response.status((0, import_context.getHttpStatus)(e)).json((0, import_context.getCallableJSON)(e)).end();
          return;
        }
        const abortController = new AbortController();
        request.on("close", () => {
          abortController.abort();
        });
        request.on("timeout", () => {
          abortController.abort();
        });
        if (request.get("Accept") === "text/event-stream" || stream === "true") {
          const streamManager = opts?.streamManager;
          if (streamManager && streamId) {
            yield subscribeToStream(streamManager, streamId, response);
            return;
          }
          const streamIdToUse = (0, import_crypto.randomUUID)();
          const headers = {
            "Content-Type": "text/plain",
            "Transfer-Encoding": "chunked"
          };
          if (streamManager) {
            headers["x-genkit-stream-id"] = streamIdToUse;
          }
          response.writeHead(200, headers);
          runActionWithDurableStreaming(action, streamManager, streamIdToUse, input, context, response, abortController.signal);
        } else {
          try {
            const result = yield action.run(input, {
              context,
              abortSignal: abortController.signal
            });
            response.setHeader("x-genkit-trace-id", result.telemetry.traceId);
            response.setHeader("x-genkit-span-id", result.telemetry.spanId);
            response.status(200).json({
              result: result.result
            }).end();
          } catch (e) {
            import_logging.logger.error(`Non-streaming request failed with error: ${e.message}
${e.stack}`);
            response.status((0, import_context.getHttpStatus)(e)).json((0, import_context.getCallableJSON)(e)).end();
          }
        }
      });
    }
    function runActionWithDurableStreaming(action, streamManager, streamId, input, context, response, abortSignal) {
      return __async(this, null, function* () {
        let taskQueue;
        let durableStream;
        if (streamManager) {
          taskQueue = new import_beta.AsyncTaskQueue();
          durableStream = yield streamManager.open(streamId);
        }
        try {
          let onChunk = (chunk) => {
            response.write("data: " + JSON.stringify({
              message: chunk
            }) + streamDelimiter);
          };
          if (streamManager) {
            const originalOnChunk = onChunk;
            onChunk = (chunk) => {
              originalOnChunk(chunk);
              taskQueue.enqueue(() => durableStream.write(chunk));
            };
          }
          const result = yield action.run(input, {
            onChunk,
            context,
            abortSignal
          });
          if (streamManager) {
            taskQueue.enqueue(() => durableStream.done(result.result));
            yield taskQueue.merge();
          }
          response.write("data: " + JSON.stringify({
            result: result.result
          }) + streamDelimiter);
          response.end();
        } catch (e) {
          if (durableStream) {
            taskQueue.enqueue(() => durableStream.error(e));
            yield taskQueue.merge();
          }
          import_logging.logger.error(`Streaming request failed with error: ${e.message}
${e.stack}`);
          response.write(`error: ${JSON.stringify({
            error: (0, import_context.getCallableJSON)(e)
          })}${streamDelimiter}`);
          response.end();
        }
      });
    }
    function subscribeToStream(streamManager, streamId, response) {
      return __async(this, null, function* () {
        try {
          yield streamManager.subscribe(streamId, {
            onChunk: (chunk) => {
              response.write("data: " + JSON.stringify({
                message: chunk
              }) + streamDelimiter);
            },
            onDone: (output) => {
              response.write("data: " + JSON.stringify({
                result: output
              }) + streamDelimiter);
              response.end();
            },
            onError: (err) => {
              import_logging.logger.error(`Streaming request failed with error: ${err.message}
${err.stack}`);
              response.write(`error: ${JSON.stringify({
                error: (0, import_context.getCallableJSON)(err)
              })}${streamDelimiter}`);
              response.end();
            }
          });
        } catch (e) {
          if (e instanceof import_beta.StreamNotFoundError) {
            response.status(204).end();
            return;
          }
          if (e.status === "DEADLINE_EXCEEDED") {
            response.write(`error: ${JSON.stringify({
              error: (0, import_context.getCallableJSON)(e)
            })}${streamDelimiter}`);
            response.end();
            return;
          }
          throw e;
        }
      });
    }
    function withContextProvider(flow, context) {
      return {
        flow,
        context
      };
    }
    function withFlowOptions(flow, options) {
      return {
        flow,
        options
      };
    }
    function startFlowServer(options) {
      const server = new FlowServer(options);
      server.start();
      return server;
    }
    var FlowServer = class _FlowServer {
      /** List of all running servers needed to be cleaned up on process exit. */
      static RUNNING_SERVERS = [];
      /** Options for the flow server configured by the developer. */
      options;
      /** Port the server is actually running on. This may differ from `options.port` if the original was occupied. Null is server is not running. */
      port = null;
      /** Express server instance. Null if server is not running. */
      server = null;
      constructor(options) {
        this.options = __spreadValues({}, options);
      }
      /**
       * Starts the server and adds it to the list of running servers to clean up on exit.
       */
      start() {
        return __async(this, null, function* () {
          const server = (0, import_express.default)();
          server.use(import_body_parser.default.json(this.options.jsonParserOptions));
          server.use((0, import_cors.default)(this.options.cors));
          import_logging.logger.debug("Running flow server with flow paths:");
          const pathPrefix = this.options.pathPrefix ?? "";
          this.options.flows?.forEach((flow) => {
            if ("flow" in flow) {
              const flowPath = `/${pathPrefix}${"options" in flow && flow.options.path || flow.flow.__action.name}`;
              import_logging.logger.debug(` - ${flowPath}`);
              const options = "options" in flow ? flow.options : {
                contextProvider: flow.context
              };
              server.post(flowPath, expressHandler(flow.flow, options));
            } else {
              const flowPath = `/${pathPrefix}${flow.__action.name}`;
              import_logging.logger.debug(` - ${flowPath}`);
              server.post(flowPath, expressHandler(flow));
            }
          });
          this.port = this.options?.port || (process.env.PORT ? Number.parseInt(process.env.PORT) : 0) || 3400;
          this.server = server.listen(this.port, () => {
            import_logging.logger.debug(`Flow server running on http://localhost:${this.port}`);
            _FlowServer.RUNNING_SERVERS.push(this);
          });
        });
      }
      /**
       * Stops the server and removes it from the list of running servers to clean up on exit.
       */
      stop() {
        return __async(this, null, function* () {
          if (!this.server) {
            return;
          }
          return new Promise((resolve, reject) => {
            this.server.close((err) => {
              if (err) {
                import_logging.logger.error(`Error shutting down flow server on port ${this.port}: ${err}`);
                reject(err);
              }
              const index = _FlowServer.RUNNING_SERVERS.indexOf(this);
              if (index > -1) {
                _FlowServer.RUNNING_SERVERS.splice(index, 1);
              }
              import_logging.logger.debug(`Flow server on port ${this.port} has successfully shut down.`);
              this.port = null;
              this.server = null;
              resolve();
            });
          });
        });
      }
      /**
       * Stops all running servers.
       */
      static stopAll() {
        return __async(this, null, function* () {
          return Promise.all(_FlowServer.RUNNING_SERVERS.map((server) => server.stop()));
        });
      }
    };
  }
});
export default require_lib3();
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)
*/
//# sourceMappingURL=@genkit-ai_express.js.map
