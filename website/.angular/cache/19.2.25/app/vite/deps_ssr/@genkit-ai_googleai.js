import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  init_embedder,
  init_evaluator,
  init_lib,
  init_model,
  init_reranker,
  init_retriever,
  modelRef as modelRef2,
  require_common,
  require_embedder,
  require_evaluator,
  require_formats,
  require_lib as require_lib2,
  require_logging,
  require_middleware,
  require_model,
  require_plugin,
  require_registry,
  require_reranker,
  require_retriever,
  require_tool,
  require_tracing
} from "./chunk-ECVKO3DF.js";
import {
  init_logging,
  logger,
  require_lib
} from "./chunk-OWKFXNV6.js";
import {
  require_async
} from "./chunk-RATDSHE6.js";
import "./chunk-2KLBD6HR.js";
import "./chunk-Z5YJFFGF.js";
import "./chunk-2KHP64LJ.js";
import {
  __async,
  __commonJS,
  __esm,
  __export,
  __forAwait,
  __objRest,
  __reExport,
  __require,
  __spreadProps,
  __spreadValues,
  __toCommonJS,
  __toESM
} from "./chunk-PNXJXBRO.js";

// node_modules/genkit/lib/genkit.js
var require_genkit = __commonJS({
  "node_modules/genkit/lib/genkit.js"(exports, module) {
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
    var genkit_exports = {};
    __export2(genkit_exports, {
      Genkit: () => Genkit3,
      __disableReflectionApi: () => __disableReflectionApi,
      genkit: () => genkit3
    });
    module.exports = __toCommonJS2(genkit_exports);
    var import_ai = require_lib2();
    var import_embedder3 = require_embedder();
    var import_evaluator2 = require_evaluator();
    var import_formats = require_formats();
    var import_model4 = require_model();
    var import_reranker2 = require_reranker();
    var import_retriever2 = require_retriever();
    var import_tool = require_tool();
    var import_core2 = require_lib();
    var import_async = require_async();
    var import_logging4 = require_logging();
    var import_plugin2 = require_plugin();
    var import_registry = require_registry();
    var import_tracing = require_tracing();
    var Genkit3 = class extends import_ai.GenkitAI {
      /** Developer-configured options. */
      options;
      /** Reflection server for this registry. May be null if not started. */
      reflectionServer = null;
      /** List of flows that have been registered in this instance. */
      flows = [];
      get apiStability() {
        return this.registry.apiStability;
      }
      constructor(options) {
        const registry = new import_registry.Registry();
        super(registry);
        this.options = options || {};
        if (this.options.context) {
          this.registry.context = this.options.context;
        }
        this.configure();
        if ((0, import_core2.isDevEnv)() && !disableReflectionApi) {
          this.reflectionServer = new import_core2.ReflectionServer(this.registry, {
            configuredEnvs: ["dev"],
            name: this.options.name
          });
          this.reflectionServer.start().catch((e) => import_logging4.logger.error);
        }
        if (options?.clientHeader) {
          (0, import_core2.setClientHeader)(options?.clientHeader);
        }
      }
      /**
       * Defines and registers a flow function.
       */
      defineFlow(config, fn) {
        const flow = (0, import_core2.defineFlow)(this.registry, config, fn);
        this.flows.push(flow);
        return flow;
      }
      defineTool(config, fn) {
        return (0, import_ai.defineTool)(this.registry, config, fn);
      }
      /**
       * Defines a dynamic tool. Dynamic tools are just like regular tools ({@link Genkit.defineTool}) but will not be registered in the
       * Genkit registry and can be defined dynamically at runtime.
       */
      dynamicTool(config, fn) {
        return (0, import_tool.dynamicTool)(config, fn);
      }
      /**
       * Defines and registers a dynamic action provider (e.g. mcp host)
       */
      defineDynamicActionProvider(config, fn) {
        return (0, import_core2.defineDynamicActionProvider)(this.registry, config, fn);
      }
      /**
       * Defines and registers a schema from a Zod schema.
       *
       * Defined schemas can be referenced by `name` in prompts in place of inline schemas.
       */
      defineSchema(name, schema) {
        return (0, import_core2.defineSchema)(this.registry, name, schema);
      }
      /**
       * Defines and registers a schema from a JSON schema.
       *
       * Defined schemas can be referenced by `name` in prompts in place of inline schemas.
       */
      defineJsonSchema(name, jsonSchema) {
        return (0, import_core2.defineJsonSchema)(this.registry, name, jsonSchema);
      }
      /**
       * Defines a new model and adds it to the registry.
       */
      defineModel(options, runner) {
        return (0, import_model4.defineModel)(this.registry, options, runner);
      }
      /**
       * Defines a new background model and adds it to the registry.
       */
      defineBackgroundModel(options) {
        return (0, import_model4.defineBackgroundModel)(this.registry, options);
      }
      /**
       * Looks up a prompt by `name` (and optionally `variant`). Can be used to lookup
       * .prompt files or prompts previously defined with {@link Genkit.definePrompt}
       */
      prompt(name, options) {
        return this.wrapExecutablePromptPromise(`${name}${options?.variant ? `.${options?.variant}` : ""}`, (0, import_ai.prompt)(this.registry, name, __spreadProps(__spreadValues({}, options), {
          dir: this.options.promptDir === void 0 ? "./prompts" : this.options.promptDir
        })));
      }
      wrapExecutablePromptPromise(name, promise) {
        const executablePrompt = (input, opts) => __async(null, null, function* () {
          return (yield promise)(input, opts);
        });
        executablePrompt.ref = {
          name
        };
        executablePrompt.render = (input, opts) => __async(null, null, function* () {
          return (yield promise).render(input, opts);
        });
        executablePrompt.stream = (input, opts) => {
          let channel = new import_async.Channel();
          const generated = (0, import_tracing.runInNewSpan)(this.registry, {
            metadata: {
              name,
              input
            },
            labels: {
              [import_tracing.SPAN_TYPE_ATTR]: "dotprompt"
            }
          }, () => (0, import_ai.generate)(this.registry, promise.then((action) => action.render(input, __spreadProps(__spreadValues({}, opts), {
            onChunk: (chunk) => channel.send(chunk)
          })))));
          generated.then(() => channel.close(), (err) => channel.error(err));
          return {
            response: generated,
            stream: channel
          };
        };
        executablePrompt.asTool = () => __async(this, null, function* () {
          return (yield promise).asTool();
        });
        return executablePrompt;
      }
      /**
       * Defines and registers a prompt based on a function.
       *
       * This is an alternative to defining and importing a .prompt file, providing
       * the most advanced control over how the final request to the model is made.
       *
       * @param options - Prompt metadata including model, model params,
       * input/output schemas, etc
       * @param fn - A function that returns a {@link GenerateRequest}. Any config
       * parameters specified by the {@link GenerateRequest} will take precedence
       * over any parameters specified by `options`.
       *
       * ```ts
       * const hi = ai.definePrompt(
       *   {
       *     name: 'hi',
       *     input: {
       *       schema: z.object({
       *         name: z.string(),
       *       }),
       *     },
       *     config: {
       *       temperature: 1,
       *     },
       *   },
       *   async (input) => {
       *     return {
       *       messages: [ { role: 'user', content: [{ text: `hi ${input.name}` }] } ],
       *     };
       *   }
       * );
       * const { text } = await hi({ name: 'Genkit' });
       * ```
       */
      definePrompt(options, templateOrFn) {
        if (templateOrFn) {
          if (options.messages) {
            throw new import_core2.GenkitError({
              status: "INVALID_ARGUMENT",
              message: "Cannot specify template/function argument and `options.messages` at the same time"
            });
          }
          if (typeof templateOrFn === "string") {
            return (0, import_ai.definePrompt)(this.registry, __spreadProps(__spreadValues({}, options), {
              messages: templateOrFn
            }));
          } else {
            return (0, import_ai.definePrompt)(this.registry, __spreadProps(__spreadValues({}, options), {
              messages: (input) => __async(this, null, function* () {
                const response = yield templateOrFn(input);
                return response.messages;
              })
            }));
          }
        }
        return (0, import_ai.definePrompt)(this.registry, options);
      }
      /**
       * Creates a retriever action for the provided {@link RetrieverFn} implementation.
       */
      defineRetriever(options, runner) {
        return (0, import_retriever2.defineRetriever)(this.registry, options, runner);
      }
      /**
       * defineSimpleRetriever makes it easy to map existing data into documents that
       * can be used for prompt augmentation.
       *
       * @param options Configuration options for the retriever.
       * @param handler A function that queries a datastore and returns items from which to extract documents.
       * @returns A Genkit retriever.
       */
      defineSimpleRetriever(options, handler) {
        return (0, import_retriever2.defineSimpleRetriever)(this.registry, options, handler);
      }
      /**
       * Creates an indexer action for the provided {@link IndexerFn} implementation.
       */
      defineIndexer(options, runner) {
        return (0, import_retriever2.defineIndexer)(this.registry, options, runner);
      }
      /**
       * Creates evaluator action for the provided {@link EvaluatorFn} implementation.
       */
      defineEvaluator(options, runner) {
        return (0, import_evaluator2.defineEvaluator)(this.registry, options, runner);
      }
      /**
       * Creates embedder model for the provided {@link EmbedderFn} model implementation.
       */
      defineEmbedder(options, runner) {
        return (0, import_embedder3.defineEmbedder)(this.registry, options, runner);
      }
      /**
       * create a handlebars helper (https://handlebarsjs.com/guide/block-helpers.html) to be used in dotprompt templates.
       */
      defineHelper(name, fn) {
        (0, import_ai.defineHelper)(this.registry, name, fn);
      }
      /**
       * Creates a handlebars partial (https://handlebarsjs.com/guide/partials.html) to be used in dotprompt templates.
       */
      definePartial(name, source) {
        (0, import_ai.definePartial)(this.registry, name, source);
      }
      /**
       *  Creates a reranker action for the provided {@link RerankerFn} implementation.
       */
      defineReranker(options, runner) {
        return (0, import_reranker2.defineReranker)(this.registry, options, runner);
      }
      /**
       * Evaluates the given `dataset` using the specified `evaluator`.
       */
      evaluate(params) {
        return (0, import_evaluator2.evaluate)(this.registry, params);
      }
      /**
       * Reranks documents from a {@link RerankerArgument} based on the provided query.
       */
      rerank(params) {
        return (0, import_reranker2.rerank)(this.registry, params);
      }
      /**
       * Indexes `documents` using the provided `indexer`.
       */
      index(params) {
        return (0, import_retriever2.index)(this.registry, params);
      }
      /**
       * Retrieves documents from the `retriever` based on the provided `query`.
       */
      retrieve(params) {
        return (0, import_retriever2.retrieve)(this.registry, params);
      }
      /**
       * Configures the Genkit instance.
       */
      configure() {
        const activeRegistry = this.registry;
        (0, import_model4.defineGenerateAction)(activeRegistry);
        (0, import_formats.configureFormats)(activeRegistry);
        const plugins = [...this.options.plugins ?? []];
        if (this.options.model) {
          this.registry.registerValue("defaultModel", "defaultModel", toModelRef(this.options.model));
        }
        if (this.options.promptDir !== null) {
          (0, import_ai.loadPromptFolder)(this.registry, this.options.promptDir ?? "./prompts", "");
        }
        plugins.forEach((plugin) => {
          if ((0, import_plugin2.isPluginV2)(plugin)) {
            let _a;
            import_logging4.logger.debug(`Registering v2 plugin ${plugin.name}...`);
            plugin.middleware?.()?.forEach((middleware) => {
              activeRegistry.registerValue("middleware", middleware.name, middleware);
            });
            activeRegistry.registerPluginProvider(plugin.name, {
              name: plugin.name,
              initializer() {
                return __async(this, null, function* () {
                  import_logging4.logger.debug(`Initializing plugin ${plugin.name}:`);
                  if (!plugin.init) return;
                  const resolvedActions = yield plugin.init();
                  resolvedActions?.forEach((resolvedAction) => {
                    registerActionV2(activeRegistry, resolvedAction, plugin);
                  });
                });
              },
              resolver(action, target) {
                return __async(this, null, function* () {
                  if (!plugin.resolve) return;
                  const resolvedAction = yield plugin.resolve(action, target);
                  if (resolvedAction) {
                    registerActionV2(activeRegistry, resolvedAction, plugin);
                  }
                });
              },
              listActions() {
                return __async(this, null, function* () {
                  if (typeof plugin.list === "function") {
                    return (yield plugin.list()).map((a) => {
                      if (a.name.startsWith(`${plugin.name}/`)) {
                        return a;
                      }
                      return __spreadProps(__spreadValues({}, a), {
                        // Apply namespace for v2 plugins.
                        name: `${plugin.name}/${a.name}`
                      });
                    });
                  }
                  return [];
                });
              }
            });
          } else {
            let _b;
            const loadedPlugin = plugin(this);
            import_logging4.logger.debug(`Registering plugin ${loadedPlugin.name}...`);
            activeRegistry.registerPluginProvider(loadedPlugin.name, {
              name: loadedPlugin.name,
              initializer() {
                return __async(this, null, function* () {
                  import_logging4.logger.debug(`Initializing plugin ${loadedPlugin.name}:`);
                  yield loadedPlugin.initializer();
                });
              },
              resolver(action, target) {
                return __async(this, null, function* () {
                  if (loadedPlugin.resolver) {
                    yield loadedPlugin.resolver(action, target);
                  }
                });
              },
              listActions() {
                return __async(this, null, function* () {
                  if (loadedPlugin.listActions) {
                    return yield loadedPlugin.listActions();
                  }
                  return [];
                });
              }
            });
          }
        });
      }
      /**
       * Stops all servers.
       */
      stopServers() {
        return __async(this, null, function* () {
          yield this.reflectionServer?.stop();
          this.reflectionServer = null;
        });
      }
    };
    function registerActionV2(registry, resolvedAction, plugin) {
      if ((0, import_core2.isBackgroundAction)(resolvedAction)) {
        (0, import_core2.registerBackgroundAction)(registry, resolvedAction, {
          namespace: plugin.name
        });
      } else if ((0, import_core2.isAction)(resolvedAction)) {
        if (!resolvedAction.__action.actionType) {
          throw new import_core2.GenkitError({
            status: "INVALID_ARGUMENT",
            message: "Action type is missing for " + resolvedAction.__action.name
          });
        }
        registry.registerAction(resolvedAction.__action.actionType, resolvedAction, {
          namespace: plugin.name
        });
      } else {
        throw new import_core2.GenkitError({
          status: "INVALID_ARGUMENT",
          message: "Unknown action type returned from plugin " + plugin.name
        });
      }
    }
    function genkit3(options) {
      return new Genkit3(options);
    }
    var shutdown = () => __async(null, null, function* () {
      import_logging4.logger.debug("Shutting down all Genkit servers...");
      yield import_core2.ReflectionServer.stopAll();
      process.exit(0);
    });
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
    var disableReflectionApi = false;
    function __disableReflectionApi() {
      disableReflectionApi = true;
    }
    function toModelRef(modelArg) {
      if (modelArg === void 0) {
        return void 0;
      }
      if (typeof modelArg === "string") {
        return (0, import_ai.modelRef)({
          name: modelArg
        });
      }
      if (modelArg.name) {
        return modelArg;
      }
      const modelAction = modelArg;
      return (0, import_ai.modelRef)({
        name: modelAction.__action.name
      });
    }
  }
});

// node_modules/genkit/lib/index.mjs
var lib_exports = {};
__export(lib_exports, {
  Genkit: () => import_genkit.Genkit,
  genkit: () => import_genkit.genkit
});
var import_genkit;
var init_lib2 = __esm({
  "node_modules/genkit/lib/index.mjs"() {
    __reExport(lib_exports, __toESM(require_common(), 1));
    import_genkit = __toESM(require_genkit(), 1);
  }
});

// node_modules/genkit/lib/logging.mjs
var init_logging2 = __esm({
  "node_modules/genkit/lib/logging.mjs"() {
    init_logging();
  }
});

// node_modules/genkit/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/genkit/lib/index.js"(exports, module) {
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
    var __reExport2 = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
    var __toCommonJS2 = (mod) => __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
    var index_exports = {};
    __export2(index_exports, {
      Genkit: () => import_genkit7.Genkit,
      genkit: () => import_genkit7.genkit
    });
    module.exports = __toCommonJS2(index_exports);
    __reExport2(index_exports, require_common(), module.exports);
    var import_genkit7 = require_genkit();
  }
});

// node_modules/@genkit-ai/googleai/lib/common.js
var require_common2 = __commonJS({
  "node_modules/@genkit-ai/googleai/lib/common.js"(exports, module) {
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
    var common_exports2 = {};
    __export2(common_exports2, {
      getApiKeyFromEnvVar: () => getApiKeyFromEnvVar3,
      getGenkitClientHeader: () => getGenkitClientHeader2
    });
    module.exports = __toCommonJS2(common_exports2);
    var import_genkit7 = require_lib3();
    var import_process2 = __toESM2(__require("process"));
    function getApiKeyFromEnvVar3() {
      return import_process2.default.env.GEMINI_API_KEY || import_process2.default.env.GOOGLE_API_KEY || import_process2.default.env.GOOGLE_GENAI_API_KEY;
    }
    function getGenkitClientHeader2() {
      if (import_process2.default.env.MONOSPACE_ENV == "true") {
        return (0, import_genkit7.getClientHeader)() + " firebase-studio-vm";
      }
      return (0, import_genkit7.getClientHeader)();
    }
  }
});

// node_modules/@google/generative-ai/dist/index.js
var require_dist = __commonJS({
  "node_modules/@google/generative-ai/dist/index.js"(exports) {
    "use strict";
    exports.SchemaType = void 0;
    (function(SchemaType2) {
      SchemaType2["STRING"] = "string";
      SchemaType2["NUMBER"] = "number";
      SchemaType2["INTEGER"] = "integer";
      SchemaType2["BOOLEAN"] = "boolean";
      SchemaType2["ARRAY"] = "array";
      SchemaType2["OBJECT"] = "object";
    })(exports.SchemaType || (exports.SchemaType = {}));
    exports.ExecutableCodeLanguage = void 0;
    (function(ExecutableCodeLanguage2) {
      ExecutableCodeLanguage2["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
      ExecutableCodeLanguage2["PYTHON"] = "python";
    })(exports.ExecutableCodeLanguage || (exports.ExecutableCodeLanguage = {}));
    exports.Outcome = void 0;
    (function(Outcome2) {
      Outcome2["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
      Outcome2["OUTCOME_OK"] = "outcome_ok";
      Outcome2["OUTCOME_FAILED"] = "outcome_failed";
      Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
    })(exports.Outcome || (exports.Outcome = {}));
    var POSSIBLE_ROLES = ["user", "model", "function", "system"];
    exports.HarmCategory = void 0;
    (function(HarmCategory2) {
      HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
      HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
      HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
      HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
      HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
      HarmCategory2["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
    })(exports.HarmCategory || (exports.HarmCategory = {}));
    exports.HarmBlockThreshold = void 0;
    (function(HarmBlockThreshold2) {
      HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
      HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
      HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
      HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
      HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
    })(exports.HarmBlockThreshold || (exports.HarmBlockThreshold = {}));
    exports.HarmProbability = void 0;
    (function(HarmProbability2) {
      HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
      HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
      HarmProbability2["LOW"] = "LOW";
      HarmProbability2["MEDIUM"] = "MEDIUM";
      HarmProbability2["HIGH"] = "HIGH";
    })(exports.HarmProbability || (exports.HarmProbability = {}));
    exports.BlockReason = void 0;
    (function(BlockReason2) {
      BlockReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
      BlockReason2["SAFETY"] = "SAFETY";
      BlockReason2["OTHER"] = "OTHER";
    })(exports.BlockReason || (exports.BlockReason = {}));
    exports.FinishReason = void 0;
    (function(FinishReason2) {
      FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
      FinishReason2["STOP"] = "STOP";
      FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
      FinishReason2["SAFETY"] = "SAFETY";
      FinishReason2["RECITATION"] = "RECITATION";
      FinishReason2["LANGUAGE"] = "LANGUAGE";
      FinishReason2["BLOCKLIST"] = "BLOCKLIST";
      FinishReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
      FinishReason2["SPII"] = "SPII";
      FinishReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
      FinishReason2["OTHER"] = "OTHER";
    })(exports.FinishReason || (exports.FinishReason = {}));
    exports.TaskType = void 0;
    (function(TaskType2) {
      TaskType2["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
      TaskType2["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
      TaskType2["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
      TaskType2["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
      TaskType2["CLASSIFICATION"] = "CLASSIFICATION";
      TaskType2["CLUSTERING"] = "CLUSTERING";
    })(exports.TaskType || (exports.TaskType = {}));
    exports.FunctionCallingMode = void 0;
    (function(FunctionCallingMode2) {
      FunctionCallingMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
      FunctionCallingMode2["AUTO"] = "AUTO";
      FunctionCallingMode2["ANY"] = "ANY";
      FunctionCallingMode2["NONE"] = "NONE";
    })(exports.FunctionCallingMode || (exports.FunctionCallingMode = {}));
    exports.DynamicRetrievalMode = void 0;
    (function(DynamicRetrievalMode2) {
      DynamicRetrievalMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
      DynamicRetrievalMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
    })(exports.DynamicRetrievalMode || (exports.DynamicRetrievalMode = {}));
    var GoogleGenerativeAIError2 = class extends Error {
      constructor(message) {
        super(`[GoogleGenerativeAI Error]: ${message}`);
      }
    };
    var GoogleGenerativeAIResponseError = class extends GoogleGenerativeAIError2 {
      constructor(message, response) {
        super(message);
        this.response = response;
      }
    };
    var GoogleGenerativeAIFetchError2 = class extends GoogleGenerativeAIError2 {
      constructor(message, status, statusText, errorDetails) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.errorDetails = errorDetails;
      }
    };
    var GoogleGenerativeAIRequestInputError2 = class extends GoogleGenerativeAIError2 {
    };
    var GoogleGenerativeAIAbortError2 = class extends GoogleGenerativeAIError2 {
    };
    var DEFAULT_BASE_URL2 = "https://generativelanguage.googleapis.com";
    var DEFAULT_API_VERSION2 = "v1beta";
    var PACKAGE_VERSION2 = "0.24.1";
    var PACKAGE_LOG_HEADER2 = "genai-js";
    var Task2;
    (function(Task3) {
      Task3["GENERATE_CONTENT"] = "generateContent";
      Task3["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
      Task3["COUNT_TOKENS"] = "countTokens";
      Task3["EMBED_CONTENT"] = "embedContent";
      Task3["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
    })(Task2 || (Task2 = {}));
    var RequestUrl = class {
      constructor(model2, task, apiKey, stream, requestOptions) {
        this.model = model2;
        this.task = task;
        this.apiKey = apiKey;
        this.stream = stream;
        this.requestOptions = requestOptions;
      }
      toString() {
        var _a, _b;
        const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION2;
        const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL2;
        let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
        if (this.stream) {
          url += "?alt=sse";
        }
        return url;
      }
    };
    function getClientHeaders2(requestOptions) {
      const clientHeaders = [];
      if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
        clientHeaders.push(requestOptions.apiClient);
      }
      clientHeaders.push(`${PACKAGE_LOG_HEADER2}/${PACKAGE_VERSION2}`);
      return clientHeaders.join(" ");
    }
    function getHeaders2(url) {
      return __async(this, null, function* () {
        var _a;
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("x-goog-api-client", getClientHeaders2(url.requestOptions));
        headers.append("x-goog-api-key", url.apiKey);
        let customHeaders = (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
        if (customHeaders) {
          if (!(customHeaders instanceof Headers)) {
            try {
              customHeaders = new Headers(customHeaders);
            } catch (e) {
              throw new GoogleGenerativeAIRequestInputError2(`unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${e.message}`);
            }
          }
          for (const [headerName, headerValue] of customHeaders.entries()) {
            if (headerName === "x-goog-api-key") {
              throw new GoogleGenerativeAIRequestInputError2(`Cannot set reserved header name ${headerName}`);
            } else if (headerName === "x-goog-api-client") {
              throw new GoogleGenerativeAIRequestInputError2(`Header name ${headerName} can only be set using the apiClient field`);
            }
            headers.append(headerName, headerValue);
          }
        }
        return headers;
      });
    }
    function constructModelRequest(model2, task, apiKey, stream, body, requestOptions) {
      return __async(this, null, function* () {
        const url = new RequestUrl(model2, task, apiKey, stream, requestOptions);
        return {
          url: url.toString(),
          fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), {
            method: "POST",
            headers: yield getHeaders2(url),
            body
          })
        };
      });
    }
    function makeModelRequest(_0, _1, _2, _3, _4) {
      return __async(this, arguments, function* (model2, task, apiKey, stream, body, requestOptions = {}, fetchFn = fetch) {
        const {
          url,
          fetchOptions
        } = yield constructModelRequest(model2, task, apiKey, stream, body, requestOptions);
        return makeRequest2(url, fetchOptions, fetchFn);
      });
    }
    function makeRequest2(_0, _1) {
      return __async(this, arguments, function* (url, fetchOptions, fetchFn = fetch) {
        let response;
        try {
          response = yield fetchFn(url, fetchOptions);
        } catch (e) {
          handleResponseError2(e, url);
        }
        if (!response.ok) {
          yield handleResponseNotOk2(response, url);
        }
        return response;
      });
    }
    function handleResponseError2(e, url) {
      let err = e;
      if (err.name === "AbortError") {
        err = new GoogleGenerativeAIAbortError2(`Request aborted when fetching ${url.toString()}: ${e.message}`);
        err.stack = e.stack;
      } else if (!(e instanceof GoogleGenerativeAIFetchError2 || e instanceof GoogleGenerativeAIRequestInputError2)) {
        err = new GoogleGenerativeAIError2(`Error fetching from ${url.toString()}: ${e.message}`);
        err.stack = e.stack;
      }
      throw err;
    }
    function handleResponseNotOk2(response, url) {
      return __async(this, null, function* () {
        let message = "";
        let errorDetails;
        try {
          const json = yield response.json();
          message = json.error.message;
          if (json.error.details) {
            message += ` ${JSON.stringify(json.error.details)}`;
            errorDetails = json.error.details;
          }
        } catch (e) {
        }
        throw new GoogleGenerativeAIFetchError2(`Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`, response.status, response.statusText, errorDetails);
      });
    }
    function buildFetchOptions(requestOptions) {
      const fetchOptions = {};
      if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !== void 0 || (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
        const controller = new AbortController();
        if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
          setTimeout(() => controller.abort(), requestOptions.timeout);
        }
        if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) {
          requestOptions.signal.addEventListener("abort", () => {
            controller.abort();
          });
        }
        fetchOptions.signal = controller.signal;
      }
      return fetchOptions;
    }
    function addHelpers(response) {
      response.text = () => {
        if (response.candidates && response.candidates.length > 0) {
          if (response.candidates.length > 1) {
            console.warn(`This response had ${response.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`);
          }
          if (hadBadFinishReason(response.candidates[0])) {
            throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
          }
          return getText(response);
        } else if (response.promptFeedback) {
          throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return "";
      };
      response.functionCall = () => {
        if (response.candidates && response.candidates.length > 0) {
          if (response.candidates.length > 1) {
            console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
          }
          if (hadBadFinishReason(response.candidates[0])) {
            throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
          }
          console.warn(`response.functionCall() is deprecated. Use response.functionCalls() instead.`);
          return getFunctionCalls(response)[0];
        } else if (response.promptFeedback) {
          throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return void 0;
      };
      response.functionCalls = () => {
        if (response.candidates && response.candidates.length > 0) {
          if (response.candidates.length > 1) {
            console.warn(`This response had ${response.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`);
          }
          if (hadBadFinishReason(response.candidates[0])) {
            throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
          }
          return getFunctionCalls(response);
        } else if (response.promptFeedback) {
          throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return void 0;
      };
      return response;
    }
    function getText(response) {
      var _a, _b, _c, _d;
      const textStrings = [];
      if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
          if (part.text) {
            textStrings.push(part.text);
          }
          if (part.executableCode) {
            textStrings.push("\n```" + part.executableCode.language + "\n" + part.executableCode.code + "\n```\n");
          }
          if (part.codeExecutionResult) {
            textStrings.push("\n```\n" + part.codeExecutionResult.output + "\n```\n");
          }
        }
      }
      if (textStrings.length > 0) {
        return textStrings.join("");
      } else {
        return "";
      }
    }
    function getFunctionCalls(response) {
      var _a, _b, _c, _d;
      const functionCalls = [];
      if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
          if (part.functionCall) {
            functionCalls.push(part.functionCall);
          }
        }
      }
      if (functionCalls.length > 0) {
        return functionCalls;
      } else {
        return void 0;
      }
    }
    var badFinishReasons = [exports.FinishReason.RECITATION, exports.FinishReason.SAFETY, exports.FinishReason.LANGUAGE];
    function hadBadFinishReason(candidate) {
      return !!candidate.finishReason && badFinishReasons.includes(candidate.finishReason);
    }
    function formatBlockErrorMessage(response) {
      var _a, _b, _c;
      let message = "";
      if ((!response.candidates || response.candidates.length === 0) && response.promptFeedback) {
        message += "Response was blocked";
        if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
          message += ` due to ${response.promptFeedback.blockReason}`;
        }
        if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
          message += `: ${response.promptFeedback.blockReasonMessage}`;
        }
      } else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
        const firstCandidate = response.candidates[0];
        if (hadBadFinishReason(firstCandidate)) {
          message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
          if (firstCandidate.finishMessage) {
            message += `: ${firstCandidate.finishMessage}`;
          }
        }
      }
      return message;
    }
    function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i;
      function verb(n) {
        if (g[n]) i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
      }
      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }
      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }
      function fulfill(value) {
        resume("next", value);
      }
      function reject(value) {
        resume("throw", value);
      }
      function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
      }
    }
    var responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
    function processStream(response) {
      const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", {
        fatal: true
      }));
      const responseStream = getResponseStream(inputStream);
      const [stream1, stream2] = responseStream.tee();
      return {
        stream: generateResponseSequence(stream1),
        response: getResponsePromise(stream2)
      };
    }
    function getResponsePromise(stream) {
      return __async(this, null, function* () {
        const allResponses = [];
        const reader = stream.getReader();
        while (true) {
          const {
            done,
            value
          } = yield reader.read();
          if (done) {
            return addHelpers(aggregateResponses(allResponses));
          }
          allResponses.push(value);
        }
      });
    }
    function generateResponseSequence(stream) {
      return __asyncGenerator(this, arguments, function* generateResponseSequence_1() {
        const reader = stream.getReader();
        while (true) {
          const {
            value,
            done
          } = yield __await(reader.read());
          if (done) {
            break;
          }
          yield yield __await(addHelpers(value));
        }
      });
    }
    function getResponseStream(inputStream) {
      const reader = inputStream.getReader();
      const stream = new ReadableStream({
        start(controller) {
          let currentText = "";
          return pump();
          function pump() {
            return reader.read().then(({
              value,
              done
            }) => {
              if (done) {
                if (currentText.trim()) {
                  controller.error(new GoogleGenerativeAIError2("Failed to parse stream"));
                  return;
                }
                controller.close();
                return;
              }
              currentText += value;
              let match = currentText.match(responseLineRE);
              let parsedResponse;
              while (match) {
                try {
                  parsedResponse = JSON.parse(match[1]);
                } catch (e) {
                  controller.error(new GoogleGenerativeAIError2(`Error parsing JSON response: "${match[1]}"`));
                  return;
                }
                controller.enqueue(parsedResponse);
                currentText = currentText.substring(match[0].length);
                match = currentText.match(responseLineRE);
              }
              return pump();
            }).catch((e) => {
              let err = e;
              err.stack = e.stack;
              if (err.name === "AbortError") {
                err = new GoogleGenerativeAIAbortError2("Request aborted when reading from the stream");
              } else {
                err = new GoogleGenerativeAIError2("Error reading from the stream");
              }
              throw err;
            });
          }
        }
      });
      return stream;
    }
    function aggregateResponses(responses) {
      const lastResponse = responses[responses.length - 1];
      const aggregatedResponse = {
        promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback
      };
      for (const response of responses) {
        if (response.candidates) {
          let candidateIndex = 0;
          for (const candidate of response.candidates) {
            if (!aggregatedResponse.candidates) {
              aggregatedResponse.candidates = [];
            }
            if (!aggregatedResponse.candidates[candidateIndex]) {
              aggregatedResponse.candidates[candidateIndex] = {
                index: candidateIndex
              };
            }
            aggregatedResponse.candidates[candidateIndex].citationMetadata = candidate.citationMetadata;
            aggregatedResponse.candidates[candidateIndex].groundingMetadata = candidate.groundingMetadata;
            aggregatedResponse.candidates[candidateIndex].finishReason = candidate.finishReason;
            aggregatedResponse.candidates[candidateIndex].finishMessage = candidate.finishMessage;
            aggregatedResponse.candidates[candidateIndex].safetyRatings = candidate.safetyRatings;
            if (candidate.content && candidate.content.parts) {
              if (!aggregatedResponse.candidates[candidateIndex].content) {
                aggregatedResponse.candidates[candidateIndex].content = {
                  role: candidate.content.role || "user",
                  parts: []
                };
              }
              const newPart = {};
              for (const part of candidate.content.parts) {
                if (part.text) {
                  newPart.text = part.text;
                }
                if (part.functionCall) {
                  newPart.functionCall = part.functionCall;
                }
                if (part.executableCode) {
                  newPart.executableCode = part.executableCode;
                }
                if (part.codeExecutionResult) {
                  newPart.codeExecutionResult = part.codeExecutionResult;
                }
                if (Object.keys(newPart).length === 0) {
                  newPart.text = "";
                }
                aggregatedResponse.candidates[candidateIndex].content.parts.push(newPart);
              }
            }
          }
          candidateIndex++;
        }
        if (response.usageMetadata) {
          aggregatedResponse.usageMetadata = response.usageMetadata;
        }
      }
      return aggregatedResponse;
    }
    function generateContentStream(apiKey, model2, params, requestOptions) {
      return __async(this, null, function* () {
        const response = yield makeModelRequest(
          model2,
          Task2.STREAM_GENERATE_CONTENT,
          apiKey,
          /* stream */
          true,
          JSON.stringify(params),
          requestOptions
        );
        return processStream(response);
      });
    }
    function generateContent(apiKey, model2, params, requestOptions) {
      return __async(this, null, function* () {
        const response = yield makeModelRequest(
          model2,
          Task2.GENERATE_CONTENT,
          apiKey,
          /* stream */
          false,
          JSON.stringify(params),
          requestOptions
        );
        const responseJson = yield response.json();
        const enhancedResponse = addHelpers(responseJson);
        return {
          response: enhancedResponse
        };
      });
    }
    function formatSystemInstruction2(input) {
      if (input == null) {
        return void 0;
      } else if (typeof input === "string") {
        return {
          role: "system",
          parts: [{
            text: input
          }]
        };
      } else if (input.text) {
        return {
          role: "system",
          parts: [input]
        };
      } else if (input.parts) {
        if (!input.role) {
          return {
            role: "system",
            parts: input.parts
          };
        } else {
          return input;
        }
      }
    }
    function formatNewContent(request) {
      let newParts = [];
      if (typeof request === "string") {
        newParts = [{
          text: request
        }];
      } else {
        for (const partOrString of request) {
          if (typeof partOrString === "string") {
            newParts.push({
              text: partOrString
            });
          } else {
            newParts.push(partOrString);
          }
        }
      }
      return assignRoleToPartsAndValidateSendMessageRequest(newParts);
    }
    function assignRoleToPartsAndValidateSendMessageRequest(parts) {
      const userContent = {
        role: "user",
        parts: []
      };
      const functionContent = {
        role: "function",
        parts: []
      };
      let hasUserContent = false;
      let hasFunctionContent = false;
      for (const part of parts) {
        if ("functionResponse" in part) {
          functionContent.parts.push(part);
          hasFunctionContent = true;
        } else {
          userContent.parts.push(part);
          hasUserContent = true;
        }
      }
      if (hasUserContent && hasFunctionContent) {
        throw new GoogleGenerativeAIError2("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
      }
      if (!hasUserContent && !hasFunctionContent) {
        throw new GoogleGenerativeAIError2("No content is provided for sending chat message.");
      }
      if (hasUserContent) {
        return userContent;
      }
      return functionContent;
    }
    function formatCountTokensInput(params, modelParams) {
      var _a;
      let formattedGenerateContentRequest = {
        model: modelParams === null || modelParams === void 0 ? void 0 : modelParams.model,
        generationConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.generationConfig,
        safetySettings: modelParams === null || modelParams === void 0 ? void 0 : modelParams.safetySettings,
        tools: modelParams === null || modelParams === void 0 ? void 0 : modelParams.tools,
        toolConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.toolConfig,
        systemInstruction: modelParams === null || modelParams === void 0 ? void 0 : modelParams.systemInstruction,
        cachedContent: (_a = modelParams === null || modelParams === void 0 ? void 0 : modelParams.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
        contents: []
      };
      const containsGenerateContentRequest = params.generateContentRequest != null;
      if (params.contents) {
        if (containsGenerateContentRequest) {
          throw new GoogleGenerativeAIRequestInputError2("CountTokensRequest must have one of contents or generateContentRequest, not both.");
        }
        formattedGenerateContentRequest.contents = params.contents;
      } else if (containsGenerateContentRequest) {
        formattedGenerateContentRequest = Object.assign(Object.assign({}, formattedGenerateContentRequest), params.generateContentRequest);
      } else {
        const content = formatNewContent(params);
        formattedGenerateContentRequest.contents = [content];
      }
      return {
        generateContentRequest: formattedGenerateContentRequest
      };
    }
    function formatGenerateContentInput(params) {
      let formattedRequest;
      if (params.contents) {
        formattedRequest = params;
      } else {
        const content = formatNewContent(params);
        formattedRequest = {
          contents: [content]
        };
      }
      if (params.systemInstruction) {
        formattedRequest.systemInstruction = formatSystemInstruction2(params.systemInstruction);
      }
      return formattedRequest;
    }
    function formatEmbedContentInput(params) {
      if (typeof params === "string" || Array.isArray(params)) {
        const content = formatNewContent(params);
        return {
          content
        };
      }
      return params;
    }
    var VALID_PART_FIELDS = ["text", "inlineData", "functionCall", "functionResponse", "executableCode", "codeExecutionResult"];
    var VALID_PARTS_PER_ROLE = {
      user: ["text", "inlineData"],
      function: ["functionResponse"],
      model: ["text", "functionCall", "executableCode", "codeExecutionResult"],
      // System instructions shouldn't be in history anyway.
      system: ["text"]
    };
    function validateChatHistory(history) {
      let prevContent = false;
      for (const currContent of history) {
        const {
          role,
          parts
        } = currContent;
        if (!prevContent && role !== "user") {
          throw new GoogleGenerativeAIError2(`First content should be with role 'user', got ${role}`);
        }
        if (!POSSIBLE_ROLES.includes(role)) {
          throw new GoogleGenerativeAIError2(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
        }
        if (!Array.isArray(parts)) {
          throw new GoogleGenerativeAIError2("Content should have 'parts' property with an array of Parts");
        }
        if (parts.length === 0) {
          throw new GoogleGenerativeAIError2("Each Content should have at least one part");
        }
        const countFields = {
          text: 0,
          inlineData: 0,
          functionCall: 0,
          functionResponse: 0,
          fileData: 0,
          executableCode: 0,
          codeExecutionResult: 0
        };
        for (const part of parts) {
          for (const key of VALID_PART_FIELDS) {
            if (key in part) {
              countFields[key] += 1;
            }
          }
        }
        const validParts = VALID_PARTS_PER_ROLE[role];
        for (const key of VALID_PART_FIELDS) {
          if (!validParts.includes(key) && countFields[key] > 0) {
            throw new GoogleGenerativeAIError2(`Content with role '${role}' can't contain '${key}' part`);
          }
        }
        prevContent = true;
      }
    }
    function isValidResponse(response) {
      var _a;
      if (response.candidates === void 0 || response.candidates.length === 0) {
        return false;
      }
      const content = (_a = response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content;
      if (content === void 0) {
        return false;
      }
      if (content.parts === void 0 || content.parts.length === 0) {
        return false;
      }
      for (const part of content.parts) {
        if (part === void 0 || Object.keys(part).length === 0) {
          return false;
        }
        if (part.text !== void 0 && part.text === "") {
          return false;
        }
      }
      return true;
    }
    var SILENT_ERROR = "SILENT_ERROR";
    var ChatSession = class {
      constructor(apiKey, model2, params, _requestOptions = {}) {
        this.model = model2;
        this.params = params;
        this._requestOptions = _requestOptions;
        this._history = [];
        this._sendPromise = Promise.resolve();
        this._apiKey = apiKey;
        if (params === null || params === void 0 ? void 0 : params.history) {
          validateChatHistory(params.history);
          this._history = params.history;
        }
      }
      /**
       * Gets the chat history so far. Blocked prompts are not added to history.
       * Blocked candidates are not added to history, nor are the prompts that
       * generated them.
       */
      getHistory() {
        return __async(this, null, function* () {
          yield this._sendPromise;
          return this._history;
        });
      }
      /**
       * Sends a chat message and receives a non-streaming
       * {@link GenerateContentResult}.
       *
       * Fields set in the optional {@link SingleRequestOptions} parameter will
       * take precedence over the {@link RequestOptions} values provided to
       * {@link GoogleGenerativeAI.getGenerativeModel }.
       */
      sendMessage(_0) {
        return __async(this, arguments, function* (request, requestOptions = {}) {
          var _a, _b, _c, _d, _e, _f;
          yield this._sendPromise;
          const newContent = formatNewContent(request);
          const generateContentRequest = {
            safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
            generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
            tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
            toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
            systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
            cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
            contents: [...this._history, newContent]
          };
          const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
          let finalResult;
          this._sendPromise = this._sendPromise.then(() => generateContent(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions)).then((result) => {
            var _a2;
            if (isValidResponse(result.response)) {
              this._history.push(newContent);
              const responseContent = Object.assign({
                parts: [],
                // Response seems to come back without a role set.
                role: "model"
              }, (_a2 = result.response.candidates) === null || _a2 === void 0 ? void 0 : _a2[0].content);
              this._history.push(responseContent);
            } else {
              const blockErrorMessage = formatBlockErrorMessage(result.response);
              if (blockErrorMessage) {
                console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
              }
            }
            finalResult = result;
          }).catch((e) => {
            this._sendPromise = Promise.resolve();
            throw e;
          });
          yield this._sendPromise;
          return finalResult;
        });
      }
      /**
       * Sends a chat message and receives the response as a
       * {@link GenerateContentStreamResult} containing an iterable stream
       * and a response promise.
       *
       * Fields set in the optional {@link SingleRequestOptions} parameter will
       * take precedence over the {@link RequestOptions} values provided to
       * {@link GoogleGenerativeAI.getGenerativeModel }.
       */
      sendMessageStream(_0) {
        return __async(this, arguments, function* (request, requestOptions = {}) {
          var _a, _b, _c, _d, _e, _f;
          yield this._sendPromise;
          const newContent = formatNewContent(request);
          const generateContentRequest = {
            safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
            generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
            tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
            toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
            systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
            cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
            contents: [...this._history, newContent]
          };
          const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
          const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions);
          this._sendPromise = this._sendPromise.then(() => streamPromise).catch((_ignored) => {
            throw new Error(SILENT_ERROR);
          }).then((streamResult) => streamResult.response).then((response) => {
            if (isValidResponse(response)) {
              this._history.push(newContent);
              const responseContent = Object.assign({}, response.candidates[0].content);
              if (!responseContent.role) {
                responseContent.role = "model";
              }
              this._history.push(responseContent);
            } else {
              const blockErrorMessage = formatBlockErrorMessage(response);
              if (blockErrorMessage) {
                console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
              }
            }
          }).catch((e) => {
            if (e.message !== SILENT_ERROR) {
              console.error(e);
            }
          });
          return streamPromise;
        });
      }
    };
    function countTokens(apiKey, model2, params, singleRequestOptions) {
      return __async(this, null, function* () {
        const response = yield makeModelRequest(model2, Task2.COUNT_TOKENS, apiKey, false, JSON.stringify(params), singleRequestOptions);
        return response.json();
      });
    }
    function embedContent(apiKey, model2, params, requestOptions) {
      return __async(this, null, function* () {
        const response = yield makeModelRequest(model2, Task2.EMBED_CONTENT, apiKey, false, JSON.stringify(params), requestOptions);
        return response.json();
      });
    }
    function batchEmbedContents(apiKey, model2, params, requestOptions) {
      return __async(this, null, function* () {
        const requestsWithModel = params.requests.map((request) => {
          return Object.assign(Object.assign({}, request), {
            model: model2
          });
        });
        const response = yield makeModelRequest(model2, Task2.BATCH_EMBED_CONTENTS, apiKey, false, JSON.stringify({
          requests: requestsWithModel
        }), requestOptions);
        return response.json();
      });
    }
    var GenerativeModel = class {
      constructor(apiKey, modelParams, _requestOptions = {}) {
        this.apiKey = apiKey;
        this._requestOptions = _requestOptions;
        if (modelParams.model.includes("/")) {
          this.model = modelParams.model;
        } else {
          this.model = `models/${modelParams.model}`;
        }
        this.generationConfig = modelParams.generationConfig || {};
        this.safetySettings = modelParams.safetySettings || [];
        this.tools = modelParams.tools;
        this.toolConfig = modelParams.toolConfig;
        this.systemInstruction = formatSystemInstruction2(modelParams.systemInstruction);
        this.cachedContent = modelParams.cachedContent;
      }
      /**
       * Makes a single non-streaming call to the model
       * and returns an object containing a single {@link GenerateContentResponse}.
       *
       * Fields set in the optional {@link SingleRequestOptions} parameter will
       * take precedence over the {@link RequestOptions} values provided to
       * {@link GoogleGenerativeAI.getGenerativeModel }.
       */
      generateContent(_0) {
        return __async(this, arguments, function* (request, requestOptions = {}) {
          var _a;
          const formattedParams = formatGenerateContentInput(request);
          const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
          return generateContent(this.apiKey, this.model, Object.assign({
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
            tools: this.tools,
            toolConfig: this.toolConfig,
            systemInstruction: this.systemInstruction,
            cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name
          }, formattedParams), generativeModelRequestOptions);
        });
      }
      /**
       * Makes a single streaming call to the model and returns an object
       * containing an iterable stream that iterates over all chunks in the
       * streaming response as well as a promise that returns the final
       * aggregated response.
       *
       * Fields set in the optional {@link SingleRequestOptions} parameter will
       * take precedence over the {@link RequestOptions} values provided to
       * {@link GoogleGenerativeAI.getGenerativeModel }.
       */
      generateContentStream(_0) {
        return __async(this, arguments, function* (request, requestOptions = {}) {
          var _a;
          const formattedParams = formatGenerateContentInput(request);
          const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
          return generateContentStream(this.apiKey, this.model, Object.assign({
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
            tools: this.tools,
            toolConfig: this.toolConfig,
            systemInstruction: this.systemInstruction,
            cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name
          }, formattedParams), generativeModelRequestOptions);
        });
      }
      /**
       * Gets a new {@link ChatSession} instance which can be used for
       * multi-turn chats.
       */
      startChat(startChatParams) {
        var _a;
        return new ChatSession(this.apiKey, this.model, Object.assign({
          generationConfig: this.generationConfig,
          safetySettings: this.safetySettings,
          tools: this.tools,
          toolConfig: this.toolConfig,
          systemInstruction: this.systemInstruction,
          cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name
        }, startChatParams), this._requestOptions);
      }
      /**
       * Counts the tokens in the provided request.
       *
       * Fields set in the optional {@link SingleRequestOptions} parameter will
       * take precedence over the {@link RequestOptions} values provided to
       * {@link GoogleGenerativeAI.getGenerativeModel }.
       */
      countTokens(_0) {
        return __async(this, arguments, function* (request, requestOptions = {}) {
          const formattedParams = formatCountTokensInput(request, {
            model: this.model,
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
            tools: this.tools,
            toolConfig: this.toolConfig,
            systemInstruction: this.systemInstruction,
            cachedContent: this.cachedContent
          });
          const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
          return countTokens(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
        });
      }
      /**
       * Embeds the provided content.
       *
       * Fields set in the optional {@link SingleRequestOptions} parameter will
       * take precedence over the {@link RequestOptions} values provided to
       * {@link GoogleGenerativeAI.getGenerativeModel }.
       */
      embedContent(_0) {
        return __async(this, arguments, function* (request, requestOptions = {}) {
          const formattedParams = formatEmbedContentInput(request);
          const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
          return embedContent(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
        });
      }
      /**
       * Embeds an array of {@link EmbedContentRequest}s.
       *
       * Fields set in the optional {@link SingleRequestOptions} parameter will
       * take precedence over the {@link RequestOptions} values provided to
       * {@link GoogleGenerativeAI.getGenerativeModel }.
       */
      batchEmbedContents(_0) {
        return __async(this, arguments, function* (batchEmbedContentRequest, requestOptions = {}) {
          const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
          return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, generativeModelRequestOptions);
        });
      }
    };
    var GoogleGenerativeAI = class {
      constructor(apiKey) {
        this.apiKey = apiKey;
      }
      /**
       * Gets a {@link GenerativeModel} instance for the provided model name.
       */
      getGenerativeModel(modelParams, requestOptions) {
        if (!modelParams.model) {
          throw new GoogleGenerativeAIError2(`Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
        }
        return new GenerativeModel(this.apiKey, modelParams, requestOptions);
      }
      /**
       * Creates a {@link GenerativeModel} instance from provided content cache.
       */
      getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions) {
        if (!cachedContent.name) {
          throw new GoogleGenerativeAIRequestInputError2("Cached content must contain a `name` field.");
        }
        if (!cachedContent.model) {
          throw new GoogleGenerativeAIRequestInputError2("Cached content must contain a `model` field.");
        }
        const disallowedDuplicates = ["model", "systemInstruction"];
        for (const key of disallowedDuplicates) {
          if ((modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) && cachedContent[key] && (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) !== cachedContent[key]) {
            if (key === "model") {
              const modelParamsComp = modelParams.model.startsWith("models/") ? modelParams.model.replace("models/", "") : modelParams.model;
              const cachedContentComp = cachedContent.model.startsWith("models/") ? cachedContent.model.replace("models/", "") : cachedContent.model;
              if (modelParamsComp === cachedContentComp) {
                continue;
              }
            }
            throw new GoogleGenerativeAIRequestInputError2(`Different value for "${key}" specified in modelParams (${modelParams[key]}) and cachedContent (${cachedContent[key]})`);
          }
        }
        const modelParamsFromCache = Object.assign(Object.assign({}, modelParams), {
          model: cachedContent.model,
          tools: cachedContent.tools,
          toolConfig: cachedContent.toolConfig,
          systemInstruction: cachedContent.systemInstruction,
          cachedContent
        });
        return new GenerativeModel(this.apiKey, modelParamsFromCache, requestOptions);
      }
    };
    exports.ChatSession = ChatSession;
    exports.GenerativeModel = GenerativeModel;
    exports.GoogleGenerativeAI = GoogleGenerativeAI;
    exports.GoogleGenerativeAIAbortError = GoogleGenerativeAIAbortError2;
    exports.GoogleGenerativeAIError = GoogleGenerativeAIError2;
    exports.GoogleGenerativeAIFetchError = GoogleGenerativeAIFetchError2;
    exports.GoogleGenerativeAIRequestInputError = GoogleGenerativeAIRequestInputError2;
    exports.GoogleGenerativeAIResponseError = GoogleGenerativeAIResponseError;
    exports.POSSIBLE_ROLES = POSSIBLE_ROLES;
  }
});

// node_modules/genkit/lib/embedder.js
var require_embedder2 = __commonJS({
  "node_modules/genkit/lib/embedder.js"(exports, module) {
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
    var embedder_exports = {};
    __export2(embedder_exports, {
      EmbedderInfoSchema: () => import_embedder3.EmbedderInfoSchema,
      embedderRef: () => import_embedder3.embedderRef
    });
    module.exports = __toCommonJS2(embedder_exports);
    var import_embedder3 = require_embedder();
  }
});

// node_modules/@genkit-ai/googleai/lib/embedder.js
var require_embedder3 = __commonJS({
  "node_modules/@genkit-ai/googleai/lib/embedder.js"(exports, module) {
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
    var embedder_exports = {};
    __export2(embedder_exports, {
      GeminiEmbeddingConfigSchema: () => GeminiEmbeddingConfigSchema2,
      SUPPORTED_MODELS: () => SUPPORTED_MODELS,
      TaskTypeSchema: () => TaskTypeSchema,
      defineGoogleAIEmbedder: () => defineGoogleAIEmbedder2,
      geminiEmbedding001: () => geminiEmbedding0012,
      textEmbedding004: () => textEmbedding0042,
      textEmbeddingGecko001: () => textEmbeddingGecko0012
    });
    module.exports = __toCommonJS2(embedder_exports);
    var import_generative_ai = require_dist();
    var import_genkit7 = require_lib3();
    var import_embedder3 = require_embedder2();
    var import_common2 = require_common2();
    var TaskTypeSchema = import_genkit7.z.enum(["RETRIEVAL_DOCUMENT", "RETRIEVAL_QUERY", "SEMANTIC_SIMILARITY", "CLASSIFICATION", "CLUSTERING"]);
    var GeminiEmbeddingConfigSchema2 = import_genkit7.z.object({
      /** Override the API key provided at plugin initialization. */
      apiKey: import_genkit7.z.string().optional(),
      /**
       * The `task_type` parameter is defined as the intended downstream application to help the model
       * produce better quality embeddings.
       **/
      taskType: TaskTypeSchema.optional(),
      title: import_genkit7.z.string().optional(),
      version: import_genkit7.z.string().optional(),
      /**
       * The `outputDimensionality` parameter allows you to specify the dimensionality of the embedding output.
       * By default, the model generates embeddings with 768 dimensions. Models such as
       * `text-embedding-004`, `text-embedding-005`, and `text-multilingual-embedding-002`
       * allow the output dimensionality to be adjusted between 1 and 768.
       * By selecting a smaller output dimensionality, users can save memory and storage space, leading to more efficient computations.
       **/
      outputDimensionality: import_genkit7.z.number().min(1).max(768).optional()
    });
    var textEmbeddingGecko0012 = (0, import_embedder3.embedderRef)({
      name: "googleai/embedding-001",
      configSchema: GeminiEmbeddingConfigSchema2,
      info: {
        dimensions: 768,
        label: "Google Gen AI - Text Embedding Gecko (Legacy)",
        supports: {
          input: ["text"]
        }
      }
    });
    var textEmbedding0042 = (0, import_embedder3.embedderRef)({
      name: "googleai/text-embedding-004",
      configSchema: GeminiEmbeddingConfigSchema2,
      info: {
        dimensions: 768,
        label: "Google Gen AI - Text Embedding 001",
        supports: {
          input: ["text"]
        }
      }
    });
    var geminiEmbedding0012 = (0, import_embedder3.embedderRef)({
      name: "googleai/gemini-embedding-001",
      configSchema: GeminiEmbeddingConfigSchema2,
      info: {
        dimensions: 768,
        label: "Google Gen AI - Gemini Embedding 001",
        supports: {
          input: ["text"]
        }
      }
    });
    var SUPPORTED_MODELS = {
      "embedding-001": textEmbeddingGecko0012,
      "text-embedding-004": textEmbedding0042,
      "gemini-embedding-001": geminiEmbedding0012
    };
    function defineGoogleAIEmbedder2(ai, name, pluginOptions) {
      let apiKey;
      if (pluginOptions.apiKey !== false) {
        apiKey = pluginOptions?.apiKey || (0, import_common2.getApiKeyFromEnvVar)();
        if (!apiKey) throw new Error("Please pass in the API key or set either GEMINI_API_KEY or GOOGLE_API_KEY environment variable.\nFor more details see https://genkit.dev/docs/plugins/google-genai");
      }
      const embedder2 = SUPPORTED_MODELS[name] ?? (0, import_embedder3.embedderRef)({
        name,
        configSchema: GeminiEmbeddingConfigSchema2,
        info: {
          dimensions: 768,
          label: `Google AI - ${name}`,
          supports: {
            input: ["text", "image", "video"]
          }
        }
      });
      const apiModelName = embedder2.name.startsWith("googleai/") ? embedder2.name.substring("googleai/".length) : embedder2.name;
      return ai.defineEmbedder({
        name: embedder2.name,
        configSchema: GeminiEmbeddingConfigSchema2,
        info: embedder2.info
      }, (input, options) => __async(null, null, function* () {
        if (pluginOptions.apiKey === false && !options?.apiKey) {
          throw new import_genkit7.GenkitError({
            status: "INVALID_ARGUMENT",
            message: "GoogleAI plugin was initialized with {apiKey: false} but no apiKey configuration was passed at call time."
          });
        }
        const client = new import_generative_ai.GoogleGenerativeAI(options?.apiKey || apiKey).getGenerativeModel({
          model: options?.version || embedder2.config?.version || embedder2.version || apiModelName
        });
        const embeddings = yield Promise.all(input.map((doc) => __async(null, null, function* () {
          const response = yield client.embedContent({
            taskType: options?.taskType,
            title: options?.title,
            content: {
              role: "",
              parts: [{
                text: doc.text
              }]
            },
            outputDimensionality: options?.outputDimensionality
          });
          const values = response.embedding.values;
          return {
            embedding: values
          };
        })));
        return {
          embeddings
        };
      }));
    }
  }
});

// node_modules/genkit/lib/model.js
var require_model2 = __commonJS({
  "node_modules/genkit/lib/model.js"(exports, module) {
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
    var model_exports = {};
    __export2(model_exports, {
      CandidateErrorSchema: () => import_model4.CandidateErrorSchema,
      CandidateSchema: () => import_model4.CandidateSchema,
      CustomPartSchema: () => import_model4.CustomPartSchema,
      DataPartSchema: () => import_model4.DataPartSchema,
      GenerateRequestSchema: () => import_model4.GenerateRequestSchema,
      GenerateResponseChunkSchema: () => import_model4.GenerateResponseChunkSchema,
      GenerateResponseSchema: () => import_model4.GenerateResponseSchema,
      GenerationCommonConfigDescriptions: () => import_model4.GenerationCommonConfigDescriptions,
      GenerationCommonConfigSchema: () => import_model4.GenerationCommonConfigSchema,
      GenerationUsageSchema: () => import_model4.GenerationUsageSchema,
      MediaPartSchema: () => import_model4.MediaPartSchema,
      MessageSchema: () => import_model4.MessageSchema,
      ModelInfoSchema: () => import_model4.ModelInfoSchema,
      ModelRequestSchema: () => import_model4.ModelRequestSchema,
      ModelResponseSchema: () => import_model4.ModelResponseSchema,
      PartSchema: () => import_model4.PartSchema,
      RoleSchema: () => import_model4.RoleSchema,
      TextPartSchema: () => import_model4.TextPartSchema,
      ToolDefinitionSchema: () => import_model4.ToolDefinitionSchema,
      ToolRequestPartSchema: () => import_model4.ToolRequestPartSchema,
      ToolResponsePartSchema: () => import_model4.ToolResponsePartSchema,
      getBasicUsageStats: () => import_model4.getBasicUsageStats,
      modelRef: () => import_model4.modelRef,
      simulateConstrainedGeneration: () => import_model4.simulateConstrainedGeneration
    });
    module.exports = __toCommonJS2(model_exports);
    var import_model4 = require_model();
  }
});

// node_modules/genkit/lib/middleware.js
var require_middleware2 = __commonJS({
  "node_modules/genkit/lib/middleware.js"(exports, module) {
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
    var middleware_exports = {};
    __export2(middleware_exports, {
      augmentWithContext: () => import_middleware.augmentWithContext,
      downloadRequestMedia: () => import_middleware.downloadRequestMedia,
      fallback: () => import_middleware.fallback,
      retry: () => import_middleware.retry,
      simulateSystemPrompt: () => import_middleware.simulateSystemPrompt,
      validateSupport: () => import_middleware.validateSupport
    });
    module.exports = __toCommonJS2(middleware_exports);
    var import_middleware = require_middleware();
  }
});

// node_modules/@genkit-ai/googleai/lib/common.mjs
var common_exports = {};
__export(common_exports, {
  getApiKeyFromEnvVar: () => getApiKeyFromEnvVar,
  getGenkitClientHeader: () => getGenkitClientHeader
});
import process2 from "process";
function getApiKeyFromEnvVar() {
  return process2.env.GEMINI_API_KEY || process2.env.GOOGLE_API_KEY || process2.env.GOOGLE_GENAI_API_KEY;
}
function getGenkitClientHeader() {
  if (process2.env.MONOSPACE_ENV == "true") {
    return (0, lib_exports.getClientHeader)() + " firebase-studio-vm";
  }
  return (0, lib_exports.getClientHeader)();
}
var init_common = __esm({
  "node_modules/@genkit-ai/googleai/lib/common.mjs"() {
    init_lib2();
  }
});

// node_modules/@google/generative-ai/dist/server/index.mjs
import { readFileSync } from "fs";
function getClientHeaders(requestOptions) {
  const clientHeaders = [];
  if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
    clientHeaders.push(requestOptions.apiClient);
  }
  clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
  return clientHeaders.join(" ");
}
function makeRequest(_0, _1) {
  return __async(this, arguments, function* (url, fetchOptions, fetchFn = fetch) {
    let response;
    try {
      response = yield fetchFn(url, fetchOptions);
    } catch (e) {
      handleResponseError(e, url);
    }
    if (!response.ok) {
      yield handleResponseNotOk(response, url);
    }
    return response;
  });
}
function handleResponseError(e, url) {
  let err = e;
  if (err.name === "AbortError") {
    err = new GoogleGenerativeAIAbortError(`Request aborted when fetching ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  } else if (!(e instanceof GoogleGenerativeAIFetchError || e instanceof GoogleGenerativeAIRequestInputError)) {
    err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
    err.stack = e.stack;
  }
  throw err;
}
function handleResponseNotOk(response, url) {
  return __async(this, null, function* () {
    let message = "";
    let errorDetails;
    try {
      const json = yield response.json();
      message = json.error.message;
      if (json.error.details) {
        message += ` ${JSON.stringify(json.error.details)}`;
        errorDetails = json.error.details;
      }
    } catch (e) {
    }
    throw new GoogleGenerativeAIFetchError(`Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`, response.status, response.statusText, errorDetails);
  });
}
function getHeaders(url) {
  var _a;
  const headers = new Headers();
  headers.append("x-goog-api-client", getClientHeaders(url.requestOptions));
  headers.append("x-goog-api-key", url.apiKey);
  let customHeaders = (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
  if (customHeaders) {
    if (!(customHeaders instanceof Headers)) {
      try {
        customHeaders = new Headers(customHeaders);
      } catch (e) {
        throw new GoogleGenerativeAIRequestInputError(`unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${e.message}`);
      }
    }
    for (const [headerName, headerValue] of customHeaders.entries()) {
      if (headerName === "x-goog-api-key") {
        throw new GoogleGenerativeAIRequestInputError(`Cannot set reserved header name ${headerName}`);
      } else if (headerName === "x-goog-api-client") {
        throw new GoogleGenerativeAIRequestInputError(`Header name ${headerName} can only be set using the apiClient field`);
      }
      headers.append(headerName, headerValue);
    }
  }
  return headers;
}
function makeServerRequest(_0, _1, _2) {
  return __async(this, arguments, function* (url, headers, body, fetchFn = fetch) {
    const requestInit = {
      method: taskToMethod[url.task],
      headers
    };
    if (body) {
      requestInit.body = body;
    }
    const signal = getSignal(url.requestOptions);
    if (signal) {
      requestInit.signal = signal;
    }
    return makeRequest(url.toString(), requestInit, fetchFn);
  });
}
function getSignal(requestOptions) {
  if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !== void 0 || (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
    const controller = new AbortController();
    if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
      setTimeout(() => controller.abort(), requestOptions.timeout);
    }
    if (requestOptions.signal) {
      requestOptions.signal.addEventListener("abort", () => {
        controller.abort();
      });
    }
    return controller.signal;
  }
}
function formatSystemInstruction(input) {
  if (input == null) {
    return void 0;
  } else if (typeof input === "string") {
    return {
      role: "system",
      parts: [{
        text: input
      }]
    };
  } else if (input.text) {
    return {
      role: "system",
      parts: [input]
    };
  } else if (input.parts) {
    if (!input.role) {
      return {
        role: "system",
        parts: input.parts
      };
    } else {
      return input;
    }
  }
}
function parseCacheName(name) {
  if (name.startsWith("cachedContents/")) {
    return name.split("cachedContents/")[1];
  }
  if (!name) {
    throw new GoogleGenerativeAIError(`Invalid name ${name}. Must be in the format "cachedContents/name" or "name"`);
  }
  return name;
}
function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
var GoogleGenerativeAIError, GoogleGenerativeAIFetchError, GoogleGenerativeAIRequestInputError, GoogleGenerativeAIAbortError, DEFAULT_BASE_URL, DEFAULT_API_VERSION, PACKAGE_VERSION, PACKAGE_LOG_HEADER, Task, RpcTask, taskToMethod, ServerRequestUrl, CachedContentUrl, GoogleAICacheManager, FileState, SchemaType, ExecutableCodeLanguage, Outcome, HarmCategory, HarmBlockThreshold, HarmProbability, BlockReason, FinishReason, TaskType, FunctionCallingMode, DynamicRetrievalMode;
var init_server = __esm({
  "node_modules/@google/generative-ai/dist/server/index.mjs"() {
    GoogleGenerativeAIError = class extends Error {
      constructor(message) {
        super(`[GoogleGenerativeAI Error]: ${message}`);
      }
    };
    GoogleGenerativeAIFetchError = class extends GoogleGenerativeAIError {
      constructor(message, status, statusText, errorDetails) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.errorDetails = errorDetails;
      }
    };
    GoogleGenerativeAIRequestInputError = class extends GoogleGenerativeAIError {
    };
    GoogleGenerativeAIAbortError = class extends GoogleGenerativeAIError {
    };
    DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
    DEFAULT_API_VERSION = "v1beta";
    PACKAGE_VERSION = "0.24.1";
    PACKAGE_LOG_HEADER = "genai-js";
    (function(Task2) {
      Task2["GENERATE_CONTENT"] = "generateContent";
      Task2["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
      Task2["COUNT_TOKENS"] = "countTokens";
      Task2["EMBED_CONTENT"] = "embedContent";
      Task2["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
    })(Task || (Task = {}));
    (function(RpcTask2) {
      RpcTask2["UPLOAD"] = "upload";
      RpcTask2["LIST"] = "list";
      RpcTask2["GET"] = "get";
      RpcTask2["DELETE"] = "delete";
      RpcTask2["UPDATE"] = "update";
      RpcTask2["CREATE"] = "create";
    })(RpcTask || (RpcTask = {}));
    taskToMethod = {
      [RpcTask.UPLOAD]: "POST",
      [RpcTask.LIST]: "GET",
      [RpcTask.GET]: "GET",
      [RpcTask.DELETE]: "DELETE",
      [RpcTask.UPDATE]: "PATCH",
      [RpcTask.CREATE]: "POST"
    };
    ServerRequestUrl = class {
      constructor(task, apiKey, requestOptions) {
        this.task = task;
        this.apiKey = apiKey;
        this.requestOptions = requestOptions;
      }
      appendPath(path) {
        this._url.pathname = this._url.pathname + `/${path}`;
      }
      appendParam(key, value) {
        this._url.searchParams.append(key, value);
      }
      toString() {
        return this._url.toString();
      }
    };
    CachedContentUrl = class extends ServerRequestUrl {
      constructor(task, apiKey, requestOptions) {
        var _a, _b;
        super(task, apiKey, requestOptions);
        this.task = task;
        this.apiKey = apiKey;
        this.requestOptions = requestOptions;
        const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
        const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL;
        let initialUrl = baseUrl;
        initialUrl += `/${apiVersion}/cachedContents`;
        this._url = new URL(initialUrl);
      }
    };
    GoogleAICacheManager = class {
      constructor(apiKey, _requestOptions) {
        this.apiKey = apiKey;
        this._requestOptions = _requestOptions;
      }
      /**
       * Upload a new content cache
       */
      create(createOptions) {
        return __async(this, null, function* () {
          const newCachedContent = Object.assign({}, createOptions);
          if (createOptions.ttlSeconds) {
            if (createOptions.expireTime) {
              throw new GoogleGenerativeAIRequestInputError("You cannot specify both `ttlSeconds` and `expireTime` when creating a content cache. You must choose one.");
            }
            newCachedContent.ttl = createOptions.ttlSeconds.toString() + "s";
            delete newCachedContent.ttlSeconds;
          }
          if (createOptions.systemInstruction) {
            newCachedContent.systemInstruction = formatSystemInstruction(createOptions.systemInstruction);
          }
          if (!newCachedContent.model) {
            throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `model` field.");
          }
          if (!newCachedContent.model.includes("/")) {
            newCachedContent.model = `models/${newCachedContent.model}`;
          }
          const url = new CachedContentUrl(RpcTask.CREATE, this.apiKey, this._requestOptions);
          const headers = getHeaders(url);
          const response = yield makeServerRequest(url, headers, JSON.stringify(newCachedContent));
          return response.json();
        });
      }
      /**
       * List all uploaded content caches
       */
      list(listParams) {
        return __async(this, null, function* () {
          const url = new CachedContentUrl(RpcTask.LIST, this.apiKey, this._requestOptions);
          if (listParams === null || listParams === void 0 ? void 0 : listParams.pageSize) {
            url.appendParam("pageSize", listParams.pageSize.toString());
          }
          if (listParams === null || listParams === void 0 ? void 0 : listParams.pageToken) {
            url.appendParam("pageToken", listParams.pageToken);
          }
          const headers = getHeaders(url);
          const response = yield makeServerRequest(url, headers);
          return response.json();
        });
      }
      /**
       * Get a content cache
       */
      get(name) {
        return __async(this, null, function* () {
          const url = new CachedContentUrl(RpcTask.GET, this.apiKey, this._requestOptions);
          url.appendPath(parseCacheName(name));
          const headers = getHeaders(url);
          const response = yield makeServerRequest(url, headers);
          return response.json();
        });
      }
      /**
       * Update an existing content cache
       */
      update(name, updateParams) {
        return __async(this, null, function* () {
          const url = new CachedContentUrl(RpcTask.UPDATE, this.apiKey, this._requestOptions);
          url.appendPath(parseCacheName(name));
          const headers = getHeaders(url);
          const formattedCachedContent = Object.assign({}, updateParams.cachedContent);
          if (updateParams.cachedContent.ttlSeconds) {
            formattedCachedContent.ttl = updateParams.cachedContent.ttlSeconds.toString() + "s";
            delete formattedCachedContent.ttlSeconds;
          }
          if (updateParams.updateMask) {
            url.appendParam("update_mask", updateParams.updateMask.map((prop) => camelToSnake(prop)).join(","));
          }
          const response = yield makeServerRequest(url, headers, JSON.stringify(formattedCachedContent));
          return response.json();
        });
      }
      /**
       * Delete content cache with given name
       */
      delete(name) {
        return __async(this, null, function* () {
          const url = new CachedContentUrl(RpcTask.DELETE, this.apiKey, this._requestOptions);
          url.appendPath(parseCacheName(name));
          const headers = getHeaders(url);
          yield makeServerRequest(url, headers);
        });
      }
    };
    (function(FileState2) {
      FileState2["STATE_UNSPECIFIED"] = "STATE_UNSPECIFIED";
      FileState2["PROCESSING"] = "PROCESSING";
      FileState2["ACTIVE"] = "ACTIVE";
      FileState2["FAILED"] = "FAILED";
    })(FileState || (FileState = {}));
    (function(SchemaType2) {
      SchemaType2["STRING"] = "string";
      SchemaType2["NUMBER"] = "number";
      SchemaType2["INTEGER"] = "integer";
      SchemaType2["BOOLEAN"] = "boolean";
      SchemaType2["ARRAY"] = "array";
      SchemaType2["OBJECT"] = "object";
    })(SchemaType || (SchemaType = {}));
    (function(ExecutableCodeLanguage2) {
      ExecutableCodeLanguage2["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
      ExecutableCodeLanguage2["PYTHON"] = "python";
    })(ExecutableCodeLanguage || (ExecutableCodeLanguage = {}));
    (function(Outcome2) {
      Outcome2["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
      Outcome2["OUTCOME_OK"] = "outcome_ok";
      Outcome2["OUTCOME_FAILED"] = "outcome_failed";
      Outcome2["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
    })(Outcome || (Outcome = {}));
    (function(HarmCategory2) {
      HarmCategory2["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
      HarmCategory2["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
      HarmCategory2["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
      HarmCategory2["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
      HarmCategory2["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
      HarmCategory2["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
    })(HarmCategory || (HarmCategory = {}));
    (function(HarmBlockThreshold2) {
      HarmBlockThreshold2["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
      HarmBlockThreshold2["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
      HarmBlockThreshold2["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
      HarmBlockThreshold2["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
      HarmBlockThreshold2["BLOCK_NONE"] = "BLOCK_NONE";
    })(HarmBlockThreshold || (HarmBlockThreshold = {}));
    (function(HarmProbability2) {
      HarmProbability2["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
      HarmProbability2["NEGLIGIBLE"] = "NEGLIGIBLE";
      HarmProbability2["LOW"] = "LOW";
      HarmProbability2["MEDIUM"] = "MEDIUM";
      HarmProbability2["HIGH"] = "HIGH";
    })(HarmProbability || (HarmProbability = {}));
    (function(BlockReason2) {
      BlockReason2["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
      BlockReason2["SAFETY"] = "SAFETY";
      BlockReason2["OTHER"] = "OTHER";
    })(BlockReason || (BlockReason = {}));
    (function(FinishReason2) {
      FinishReason2["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
      FinishReason2["STOP"] = "STOP";
      FinishReason2["MAX_TOKENS"] = "MAX_TOKENS";
      FinishReason2["SAFETY"] = "SAFETY";
      FinishReason2["RECITATION"] = "RECITATION";
      FinishReason2["LANGUAGE"] = "LANGUAGE";
      FinishReason2["BLOCKLIST"] = "BLOCKLIST";
      FinishReason2["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
      FinishReason2["SPII"] = "SPII";
      FinishReason2["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
      FinishReason2["OTHER"] = "OTHER";
    })(FinishReason || (FinishReason = {}));
    (function(TaskType2) {
      TaskType2["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
      TaskType2["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
      TaskType2["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
      TaskType2["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
      TaskType2["CLASSIFICATION"] = "CLASSIFICATION";
      TaskType2["CLUSTERING"] = "CLUSTERING";
    })(TaskType || (TaskType = {}));
    (function(FunctionCallingMode2) {
      FunctionCallingMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
      FunctionCallingMode2["AUTO"] = "AUTO";
      FunctionCallingMode2["ANY"] = "ANY";
      FunctionCallingMode2["NONE"] = "NONE";
    })(FunctionCallingMode || (FunctionCallingMode = {}));
    (function(DynamicRetrievalMode2) {
      DynamicRetrievalMode2["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
      DynamicRetrievalMode2["MODE_DYNAMIC"] = "MODE_DYNAMIC";
    })(DynamicRetrievalMode || (DynamicRetrievalMode = {}));
  }
});

// node_modules/@genkit-ai/googleai/lib/context-caching/constants.mjs
var constants_exports = {};
__export(constants_exports, {
  CONTEXT_CACHE_SUPPORTED_MODELS: () => CONTEXT_CACHE_SUPPORTED_MODELS,
  DEFAULT_TTL: () => DEFAULT_TTL,
  INVALID_ARGUMENT_MESSAGES: () => INVALID_ARGUMENT_MESSAGES
});
var CONTEXT_CACHE_SUPPORTED_MODELS, INVALID_ARGUMENT_MESSAGES, DEFAULT_TTL;
var init_constants = __esm({
  "node_modules/@genkit-ai/googleai/lib/context-caching/constants.mjs"() {
    CONTEXT_CACHE_SUPPORTED_MODELS = ["gemini-1.5-flash-001", "gemini-1.5-pro-001"];
    INVALID_ARGUMENT_MESSAGES = {
      modelVersion: `Model version is required for context caching, supported only in ${CONTEXT_CACHE_SUPPORTED_MODELS.join(",")} models.`,
      tools: "Context caching cannot be used simultaneously with tools.",
      codeExecution: "Context caching cannot be used simultaneously with code execution."
    };
    DEFAULT_TTL = 300;
  }
});

// node_modules/@genkit-ai/googleai/lib/context-caching/types.mjs
var types_exports = {};
__export(types_exports, {
  cacheConfigDetailsSchema: () => cacheConfigDetailsSchema,
  cacheConfigSchema: () => cacheConfigSchema
});
var cacheConfigSchema, cacheConfigDetailsSchema;
var init_types = __esm({
  "node_modules/@genkit-ai/googleai/lib/context-caching/types.mjs"() {
    init_lib2();
    cacheConfigSchema = lib_exports.z.union([lib_exports.z.boolean(), lib_exports.z.object({
      ttlSeconds: lib_exports.z.number().optional()
    }).passthrough()]);
    cacheConfigDetailsSchema = lib_exports.z.object({
      cacheConfig: cacheConfigSchema,
      endOfCachedContents: lib_exports.z.number()
    });
  }
});

// node_modules/@genkit-ai/googleai/lib/context-caching/utils.js
var require_utils = __commonJS({
  "node_modules/@genkit-ai/googleai/lib/context-caching/utils.js"(exports, module) {
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
    var utils_exports2 = {};
    __export2(utils_exports2, {
      calculateTTL: () => calculateTTL3,
      extractCacheConfig: () => extractCacheConfig2,
      findLastIndex: () => findLastIndex2,
      generateCacheKey: () => generateCacheKey3,
      getContentForCache: () => getContentForCache3,
      lookupContextCache: () => lookupContextCache3,
      validateContextCacheRequest: () => validateContextCacheRequest3
    });
    module.exports = __toCommonJS2(utils_exports2);
    var import_crypto2 = __toESM2(__require("crypto"));
    var import_genkit7 = require_lib3();
    var import_constants2 = (init_constants(), __toCommonJS(constants_exports));
    var import_types2 = (init_types(), __toCommonJS(types_exports));
    function generateCacheKey3(request) {
      return import_crypto2.default.createHash("sha256").update(JSON.stringify(request)).digest("hex");
    }
    function getContentForCache3(request, chatRequest, modelVersion, cacheConfigDetails) {
      if (!modelVersion) {
        throw new Error("No model version provided for context caching");
      }
      if (!chatRequest.history?.length) {
        throw new Error("No history provided for context caching");
      }
      validateHistoryLength2(request, chatRequest);
      const {
        endOfCachedContents,
        cacheConfig
      } = cacheConfigDetails;
      const cachedContent = {
        model: modelVersion,
        contents: chatRequest.history.slice(0, endOfCachedContents + 1)
      };
      chatRequest.history = chatRequest.history.slice(endOfCachedContents + 1);
      return {
        cachedContent,
        chatRequest,
        cacheConfig
      };
    }
    function validateHistoryLength2(request, chatRequest) {
      if (chatRequest.history?.length !== request.messages.length - 1) {
        throw new import_genkit7.GenkitError({
          status: "INTERNAL",
          message: "Genkit request history and Gemini chat request history length do not match"
        });
      }
    }
    function lookupContextCache3(cacheManager, cacheKey, maxPages = 100, pageSize = 100) {
      return __async(this, null, function* () {
        let currentPage = 0;
        let pageToken;
        try {
          while (currentPage < maxPages) {
            const {
              cachedContents,
              nextPageToken
            } = yield cacheManager.list({
              pageSize,
              pageToken
            });
            const found = cachedContents?.find((content) => content.displayName === cacheKey);
            if (found) return found;
            if (!nextPageToken) break;
            pageToken = nextPageToken;
            currentPage++;
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown Network Error";
          throw new import_genkit7.GenkitError({
            status: "INTERNAL",
            message: `Error looking up context cache: ${message}`
          });
        }
        return null;
      });
    }
    var extractCacheConfig2 = (request) => {
      const endOfCachedContents = findLastIndex2(request.messages, (message) => !!message.metadata?.cache);
      return endOfCachedContents === -1 ? null : {
        endOfCachedContents,
        cacheConfig: import_types2.cacheConfigSchema.parse(request.messages[endOfCachedContents].metadata?.cache)
      };
    };
    function validateContextCacheRequest3(request, modelVersion) {
      if (!modelVersion || !import_constants2.CONTEXT_CACHE_SUPPORTED_MODELS.includes(modelVersion)) {
        throw new import_genkit7.GenkitError({
          status: "INVALID_ARGUMENT",
          message: import_constants2.INVALID_ARGUMENT_MESSAGES.modelVersion
        });
      }
      if (request.tools?.length) throw new import_genkit7.GenkitError({
        status: "INVALID_ARGUMENT",
        message: import_constants2.INVALID_ARGUMENT_MESSAGES.tools
      });
      if (request.config?.codeExecution) throw new import_genkit7.GenkitError({
        status: "INVALID_ARGUMENT",
        message: import_constants2.INVALID_ARGUMENT_MESSAGES.codeExecution
      });
      return true;
    }
    function findLastIndex2(array, callback) {
      for (let i = array.length - 1; i >= 0; i--) {
        if (callback(array[i], i, array)) return i;
      }
      return -1;
    }
    function calculateTTL3(cacheConfig) {
      if (cacheConfig.cacheConfig === true) {
        return import_constants2.DEFAULT_TTL;
      }
      if (cacheConfig.cacheConfig === false) {
        return 0;
      }
      return cacheConfig.cacheConfig.ttlSeconds || import_constants2.DEFAULT_TTL;
    }
  }
});

// node_modules/@genkit-ai/googleai/lib/context-caching/index.mjs
var context_caching_exports = {};
__export(context_caching_exports, {
  handleCacheIfNeeded: () => handleCacheIfNeeded,
  handleContextCache: () => handleContextCache
});
function handleContextCache(apiKey, request, chatRequest, modelVersion, cacheConfigDetails) {
  return __async(this, null, function* () {
    const cacheManager = new GoogleAICacheManager(apiKey);
    const {
      cachedContent,
      chatRequest: newChatRequest
    } = (0, import_utils.getContentForCache)(request, chatRequest, modelVersion, cacheConfigDetails);
    cachedContent.model = modelVersion;
    const cacheKey = (0, import_utils.generateCacheKey)(cachedContent);
    cachedContent.displayName = cacheKey;
    let cache = yield (0, import_utils.lookupContextCache)(cacheManager, cacheKey);
    logger.debug(`Cache hit: ${cache ? "true" : "false"}`);
    if (!cache) {
      try {
        logger.debug("No cache found, creating one.");
        const createParams = __spreadProps(__spreadValues({}, cachedContent), {
          ttlSeconds: (0, import_utils.calculateTTL)(cacheConfigDetails)
        });
        cache = yield cacheManager.create(createParams);
        logger.debug(`Created new cache entry with key: ${cacheKey}`);
      } catch (cacheError) {
        logger.error(`Failed to create cache with key ${cacheKey}: ${cacheError}`);
        throw new lib_exports.GenkitError({
          status: "INTERNAL",
          message: `Failed to create cache: ${cacheError}`
        });
      }
    }
    if (!cache) {
      throw new lib_exports.GenkitError({
        status: "INTERNAL",
        message: "Failed to use context cache feature"
      });
    }
    return {
      cache,
      newChatRequest
    };
  });
}
function handleCacheIfNeeded(apiKey, request, chatRequest, modelVersion, cacheConfigDetails) {
  return __async(this, null, function* () {
    if (!cacheConfigDetails || !(0, import_utils.validateContextCacheRequest)(request, modelVersion)) {
      return {
        chatRequest,
        cache: null
      };
    }
    const {
      cache,
      newChatRequest
    } = yield handleContextCache(apiKey, request, chatRequest, modelVersion, cacheConfigDetails);
    return {
      chatRequest: newChatRequest,
      cache
    };
  });
}
var import_utils;
var init_context_caching = __esm({
  "node_modules/@genkit-ai/googleai/lib/context-caching/index.mjs"() {
    init_server();
    init_lib2();
    init_logging2();
    import_utils = __toESM(require_utils(), 1);
  }
});

// node_modules/@genkit-ai/googleai/lib/context-caching/utils.mjs
var utils_exports = {};
__export(utils_exports, {
  calculateTTL: () => calculateTTL2,
  extractCacheConfig: () => extractCacheConfig,
  findLastIndex: () => findLastIndex,
  generateCacheKey: () => generateCacheKey2,
  getContentForCache: () => getContentForCache2,
  lookupContextCache: () => lookupContextCache2,
  validateContextCacheRequest: () => validateContextCacheRequest2
});
import crypto from "crypto";
function generateCacheKey2(request) {
  return crypto.createHash("sha256").update(JSON.stringify(request)).digest("hex");
}
function getContentForCache2(request, chatRequest, modelVersion, cacheConfigDetails) {
  if (!modelVersion) {
    throw new Error("No model version provided for context caching");
  }
  if (!chatRequest.history?.length) {
    throw new Error("No history provided for context caching");
  }
  validateHistoryLength(request, chatRequest);
  const {
    endOfCachedContents,
    cacheConfig
  } = cacheConfigDetails;
  const cachedContent = {
    model: modelVersion,
    contents: chatRequest.history.slice(0, endOfCachedContents + 1)
  };
  chatRequest.history = chatRequest.history.slice(endOfCachedContents + 1);
  return {
    cachedContent,
    chatRequest,
    cacheConfig
  };
}
function validateHistoryLength(request, chatRequest) {
  if (chatRequest.history?.length !== request.messages.length - 1) {
    throw new lib_exports.GenkitError({
      status: "INTERNAL",
      message: "Genkit request history and Gemini chat request history length do not match"
    });
  }
}
function lookupContextCache2(cacheManager, cacheKey, maxPages = 100, pageSize = 100) {
  return __async(this, null, function* () {
    let currentPage = 0;
    let pageToken;
    try {
      while (currentPage < maxPages) {
        const {
          cachedContents,
          nextPageToken
        } = yield cacheManager.list({
          pageSize,
          pageToken
        });
        const found = cachedContents?.find((content) => content.displayName === cacheKey);
        if (found) return found;
        if (!nextPageToken) break;
        pageToken = nextPageToken;
        currentPage++;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown Network Error";
      throw new lib_exports.GenkitError({
        status: "INTERNAL",
        message: `Error looking up context cache: ${message}`
      });
    }
    return null;
  });
}
function validateContextCacheRequest2(request, modelVersion) {
  if (!modelVersion || !CONTEXT_CACHE_SUPPORTED_MODELS.includes(modelVersion)) {
    throw new lib_exports.GenkitError({
      status: "INVALID_ARGUMENT",
      message: INVALID_ARGUMENT_MESSAGES.modelVersion
    });
  }
  if (request.tools?.length) throw new lib_exports.GenkitError({
    status: "INVALID_ARGUMENT",
    message: INVALID_ARGUMENT_MESSAGES.tools
  });
  if (request.config?.codeExecution) throw new lib_exports.GenkitError({
    status: "INVALID_ARGUMENT",
    message: INVALID_ARGUMENT_MESSAGES.codeExecution
  });
  return true;
}
function findLastIndex(array, callback) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (callback(array[i], i, array)) return i;
  }
  return -1;
}
function calculateTTL2(cacheConfig) {
  if (cacheConfig.cacheConfig === true) {
    return DEFAULT_TTL;
  }
  if (cacheConfig.cacheConfig === false) {
    return 0;
  }
  return cacheConfig.cacheConfig.ttlSeconds || DEFAULT_TTL;
}
var extractCacheConfig;
var init_utils = __esm({
  "node_modules/@genkit-ai/googleai/lib/context-caching/utils.mjs"() {
    init_lib2();
    init_constants();
    init_types();
    extractCacheConfig = (request) => {
      const endOfCachedContents = findLastIndex(request.messages, (message) => !!message.metadata?.cache);
      return endOfCachedContents === -1 ? null : {
        endOfCachedContents,
        cacheConfig: cacheConfigSchema.parse(request.messages[endOfCachedContents].metadata?.cache)
      };
    };
  }
});

// node_modules/@genkit-ai/googleai/lib/gemini.js
var require_gemini = __commonJS({
  "node_modules/@genkit-ai/googleai/lib/gemini.js"(exports, module) {
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
    var gemini_exports = {};
    __export2(gemini_exports, {
      GENERIC_GEMINI_MODEL: () => GENERIC_GEMINI_MODEL,
      GeminiConfigSchema: () => GeminiConfigSchema2,
      GeminiGemmaConfigSchema: () => GeminiGemmaConfigSchema,
      GeminiTtsConfigSchema: () => GeminiTtsConfigSchema,
      SUPPORTED_GEMINI_MODELS: () => SUPPORTED_GEMINI_MODELS2,
      aggregateResponses: () => aggregateResponses,
      cleanSchema: () => cleanSchema,
      defineGoogleAIModel: () => defineGoogleAIModel2,
      fromGeminiCandidate: () => fromGeminiCandidate,
      gemini: () => gemini2,
      gemini10Pro: () => gemini10Pro2,
      gemini15Flash: () => gemini15Flash2,
      gemini15Flash8b: () => gemini15Flash8b2,
      gemini15Pro: () => gemini15Pro2,
      gemini20Flash: () => gemini20Flash2,
      gemini20FlashExp: () => gemini20FlashExp2,
      gemini20FlashLite: () => gemini20FlashLite2,
      gemini20ProExp0205: () => gemini20ProExp02052,
      gemini25Flash: () => gemini25Flash,
      gemini25FlashLite: () => gemini25FlashLite2,
      gemini25FlashPreview0417: () => gemini25FlashPreview04172,
      gemini25FlashPreviewTts: () => gemini25FlashPreviewTts,
      gemini25Pro: () => gemini25Pro,
      gemini25ProExp0325: () => gemini25ProExp03252,
      gemini25ProPreview0325: () => gemini25ProPreview03252,
      gemini25ProPreviewTts: () => gemini25ProPreviewTts,
      gemma312bit: () => gemma312bit,
      gemma31bit: () => gemma31bit,
      gemma327bit: () => gemma327bit,
      gemma34bit: () => gemma34bit,
      gemma3ne4bit: () => gemma3ne4bit,
      toGeminiMessage: () => toGeminiMessage,
      toGeminiSystemInstruction: () => toGeminiSystemInstruction,
      toGeminiTool: () => toGeminiTool
    });
    module.exports = __toCommonJS2(gemini_exports);
    var import_generative_ai = require_dist();
    var import_genkit7 = require_lib3();
    var import_model4 = require_model2();
    var import_middleware = require_middleware2();
    var import_tracing = require_tracing();
    var import_common2 = (init_common(), __toCommonJS(common_exports));
    var import_context_caching = (init_context_caching(), __toCommonJS(context_caching_exports));
    var import_utils2 = (init_utils(), __toCommonJS(utils_exports));
    var SafetySettingsSchema = import_genkit7.z.object({
      category: import_genkit7.z.enum(["HARM_CATEGORY_UNSPECIFIED", "HARM_CATEGORY_HATE_SPEECH", "HARM_CATEGORY_SEXUALLY_EXPLICIT", "HARM_CATEGORY_HARASSMENT", "HARM_CATEGORY_DANGEROUS_CONTENT", "HARM_CATEGORY_CIVIC_INTEGRITY"]),
      threshold: import_genkit7.z.enum(["BLOCK_LOW_AND_ABOVE", "BLOCK_MEDIUM_AND_ABOVE", "BLOCK_ONLY_HIGH", "BLOCK_NONE"])
    });
    var VoiceConfigSchema = import_genkit7.z.object({
      prebuiltVoiceConfig: import_genkit7.z.object({
        // TODO: Make this an array of objects so we can also specify the description
        // for each voiceName.
        voiceName: import_genkit7.z.union([
          import_genkit7.z.enum(["Zephyr", "Puck", "Charon", "Kore", "Fenrir", "Leda", "Orus", "Aoede", "Callirrhoe", "Autonoe", "Enceladus", "Iapetus", "Umbriel", "Algieba", "Despina", "Erinome", "Algenib", "Rasalgethi", "Laomedeia", "Achernar", "Alnilam", "Schedar", "Gacrux", "Pulcherrima", "Achird", "Zubenelgenubi", "Vindemiatrix", "Sadachbia", "Sadaltager", "Sulafat"]),
          // To allow any new string values
          import_genkit7.z.string()
        ]).describe("Name of the preset voice to use").optional()
      }).describe("Configuration for the prebuilt speaker to use").passthrough().optional()
    }).describe("Configuration for the voice to use").passthrough();
    var GeminiConfigSchema2 = import_model4.GenerationCommonConfigSchema.extend({
      temperature: import_genkit7.z.number().min(0).max(2).describe(import_model4.GenerationCommonConfigDescriptions.temperature + " The default value is 1.0.").optional(),
      topP: import_genkit7.z.number().min(0).max(1).describe(import_model4.GenerationCommonConfigDescriptions.topP + " The default value is 0.95.").optional(),
      apiKey: import_genkit7.z.string().describe("Overrides the plugin-configured API key, if specified.").optional(),
      safetySettings: import_genkit7.z.array(SafetySettingsSchema).describe("Adjust how likely you are to see responses that could be harmful. Content is blocked based on the probability that it is harmful.").optional(),
      codeExecution: import_genkit7.z.union([import_genkit7.z.boolean(), import_genkit7.z.object({}).strict()]).describe("Enables the model to generate and run code.").optional(),
      contextCache: import_genkit7.z.boolean().describe("Context caching allows you to save and reuse precomputed input tokens that you wish to use repeatedly.").optional(),
      functionCallingConfig: import_genkit7.z.object({
        mode: import_genkit7.z.enum(["MODE_UNSPECIFIED", "AUTO", "ANY", "NONE"]).optional(),
        allowedFunctionNames: import_genkit7.z.array(import_genkit7.z.string()).optional()
      }).describe("Controls how the model uses the provided tools (function declarations). With AUTO (Default) mode, the model decides whether to generate a natural language response or suggest a function call based on the prompt and context. With ANY, the model is constrained to always predict a function call and guarantee function schema adherence. With NONE, the model is prohibited from making function calls.").optional(),
      responseModalities: import_genkit7.z.array(import_genkit7.z.enum(["TEXT", "IMAGE", "AUDIO"])).describe("The modalities to be used in response. Only supported for 'gemini-2.0-flash-exp' model at present.").optional(),
      googleSearchRetrieval: import_genkit7.z.union([import_genkit7.z.boolean(), import_genkit7.z.object({}).passthrough()]).describe("Retrieve public web data for grounding, powered by Google Search.").optional(),
      thinkingConfig: import_genkit7.z.object({
        includeThoughts: import_genkit7.z.boolean().describe("Indicates whether to include thoughts in the response.If true, thoughts are returned only when available.").optional(),
        thinkingBudget: import_genkit7.z.number().min(0).max(24576).describe("The thinking budget parameter gives the model guidance on the number of thinking tokens it can use when generating a response. A greater number of tokens is typically associated with more detailed thinking, which is needed for solving more complex tasks. Setting the thinking budget to 0 disables thinking.").optional()
      }).optional()
    }).passthrough();
    var GeminiGemmaConfigSchema = GeminiConfigSchema2.extend({
      temperature: import_genkit7.z.number().min(0).max(1).describe(import_model4.GenerationCommonConfigDescriptions.temperature + " The default value is 1.0.").optional()
    }).passthrough();
    var GeminiTtsConfigSchema = GeminiConfigSchema2.extend({
      speechConfig: import_genkit7.z.object({
        voiceConfig: VoiceConfigSchema.optional(),
        multiSpeakerVoiceConfig: import_genkit7.z.object({
          speakerVoiceConfigs: import_genkit7.z.array(import_genkit7.z.object({
            speaker: import_genkit7.z.string().describe("Name of the speaker to use"),
            voiceConfig: VoiceConfigSchema
          }).describe("Configuration for a single speaker in a multi speaker setup").passthrough()).describe("Configuration for all the enabled speaker voices")
        }).describe("Configuration for multi-speaker setup").passthrough().optional()
      }).describe("Speech generation config").passthrough().optional()
    }).passthrough();
    var gemini10Pro2 = (0, import_model4.modelRef)({
      name: "googleai/gemini-1.0-pro",
      info: {
        label: "Google AI - Gemini Pro",
        versions: ["gemini-pro", "gemini-1.0-pro-latest", "gemini-1.0-pro-001"],
        supports: {
          multiturn: true,
          media: false,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini15Pro2 = (0, import_model4.modelRef)({
      name: "googleai/gemini-1.5-pro",
      info: {
        label: "Google AI - Gemini 1.5 Pro",
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        },
        versions: ["gemini-1.5-pro-latest", "gemini-1.5-pro-001", "gemini-1.5-pro-002"]
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini15Flash2 = (0, import_model4.modelRef)({
      name: "googleai/gemini-1.5-flash",
      info: {
        label: "Google AI - Gemini 1.5 Flash",
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools",
          // @ts-ignore
          contextCache: true
        },
        versions: ["gemini-1.5-flash-latest", "gemini-1.5-flash-001", "gemini-1.5-flash-002"]
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini15Flash8b2 = (0, import_model4.modelRef)({
      name: "googleai/gemini-1.5-flash-8b",
      info: {
        label: "Google AI - Gemini 1.5 Flash",
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        },
        versions: ["gemini-1.5-flash-8b-latest", "gemini-1.5-flash-8b-001"]
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini20Flash2 = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.0-flash",
      info: {
        label: "Google AI - Gemini 2.0 Flash",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini20FlashExp2 = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.0-flash-exp",
      info: {
        label: "Google AI - Gemini 2.0 Flash (Experimental)",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini20FlashLite2 = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.0-flash-lite",
      info: {
        label: "Google AI - Gemini 2.0 Flash Lite",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini20ProExp02052 = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.0-pro-exp-02-05",
      info: {
        label: "Google AI - Gemini 2.0 Pro Exp 02-05",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini25FlashPreview04172 = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.5-flash-preview-04-17",
      info: {
        label: "Google AI - Gemini 2.5 Flash Preview 04-17",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini25FlashPreviewTts = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.5-flash-preview-tts",
      info: {
        label: "Google AI - Gemini 2.5 Flash Preview TTS",
        versions: [],
        supports: {
          multiturn: false,
          media: false,
          tools: false,
          toolChoice: false,
          systemRole: false,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiTtsConfigSchema
    });
    var gemini25ProExp03252 = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.5-pro-exp-03-25",
      info: {
        label: "Google AI - Gemini 2.5 Pro Exp 03-25",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini25ProPreview03252 = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.5-pro-preview-03-25",
      info: {
        label: "Google AI - Gemini 2.5 Pro Preview 03-25",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini25ProPreviewTts = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.5-pro-preview-tts",
      info: {
        label: "Google AI - Gemini 2.5 Pro Preview TTS",
        versions: [],
        supports: {
          multiturn: false,
          media: false,
          tools: false,
          toolChoice: false,
          systemRole: false,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiTtsConfigSchema
    });
    var gemini25Pro = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.5-pro",
      info: {
        label: "Google AI - Gemini 2.5 Pro",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini25Flash = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.5-flash",
      info: {
        label: "Google AI - Gemini 2.5 Flash",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemini25FlashLite2 = (0, import_model4.modelRef)({
      name: "googleai/gemini-2.5-flash-lite",
      info: {
        label: "Google AI - Gemini 2.5 Flash Lite",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiConfigSchema2
    });
    var gemma312bit = (0, import_model4.modelRef)({
      name: "googleai/gemma-3-12b-it",
      info: {
        label: "Google AI - Gemma 3 12B",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiGemmaConfigSchema
    });
    var gemma31bit = (0, import_model4.modelRef)({
      name: "googleai/gemma-3-1b-it",
      info: {
        label: "Google AI - Gemma 3 1B",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiGemmaConfigSchema
    });
    var gemma327bit = (0, import_model4.modelRef)({
      name: "googleai/gemma-3-27b-it",
      info: {
        label: "Google AI - Gemma 3 27B",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiGemmaConfigSchema
    });
    var gemma34bit = (0, import_model4.modelRef)({
      name: "googleai/gemma-3-4b-it",
      info: {
        label: "Google AI - Gemma 3 4B",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiGemmaConfigSchema
    });
    var gemma3ne4bit = (0, import_model4.modelRef)({
      name: "googleai/gemma-3n-e4b-it",
      info: {
        label: "Google AI - Gemma 3n E4B",
        versions: [],
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      },
      configSchema: GeminiGemmaConfigSchema
    });
    var SUPPORTED_GEMINI_MODELS2 = {
      "gemini-1.5-pro": gemini15Pro2,
      "gemini-1.5-flash": gemini15Flash2,
      "gemini-1.5-flash-8b": gemini15Flash8b2,
      "gemini-2.0-pro-exp-02-05": gemini20ProExp02052,
      "gemini-2.0-flash": gemini20Flash2,
      "gemini-2.0-flash-lite": gemini20FlashLite2,
      "gemini-2.0-flash-exp": gemini20FlashExp2,
      "gemini-2.5-pro-exp-03-25": gemini25ProExp03252,
      "gemini-2.5-pro-preview-03-25": gemini25ProPreview03252,
      "gemini-2.5-pro-preview-tts": gemini25ProPreviewTts,
      "gemini-2.5-flash-preview-04-17": gemini25FlashPreview04172,
      "gemini-2.5-flash-preview-tts": gemini25FlashPreviewTts,
      "gemini-2.5-flash": gemini25Flash,
      "gemini-2.5-flash-lite": gemini25FlashLite2,
      "gemini-2.5-pro": gemini25Pro,
      "gemma-3-12b-it": gemma312bit,
      "gemma-3-1b-it": gemma31bit,
      "gemma-3-27b-it": gemma327bit,
      "gemma-3-4b-it": gemma34bit,
      "gemma-3n-e4b-it": gemma3ne4bit
    };
    var GENERIC_GEMINI_MODEL = (0, import_model4.modelRef)({
      name: "googleai/gemini",
      configSchema: GeminiConfigSchema2,
      info: {
        label: "Google Gemini",
        supports: {
          multiturn: true,
          media: true,
          tools: true,
          toolChoice: true,
          systemRole: true,
          constrained: "no-tools"
        }
      }
    });
    function longestMatchingPrefix(version, potentialMatches) {
      return potentialMatches.filter((p) => version.startsWith(p)).reduce((longest, current) => current.length > longest.length ? current : longest, "");
    }
    function gemini2(version, options = {}) {
      const nearestModel = nearestGeminiModelRef(version);
      return (0, import_model4.modelRef)({
        name: `googleai/${version}`,
        config: options,
        configSchema: GeminiConfigSchema2,
        info: __spreadProps(__spreadValues({}, nearestModel.info), {
          // If exact suffix match for a known model, use its label, otherwise create a new label
          label: nearestModel.name.endsWith(version) ? nearestModel.info?.label : `Google AI - ${version}`
        })
      });
    }
    function nearestGeminiModelRef(version, options = {}) {
      const matchingKey = longestMatchingPrefix(version, Object.keys(SUPPORTED_GEMINI_MODELS2));
      if (matchingKey) {
        return SUPPORTED_GEMINI_MODELS2[matchingKey].withConfig(__spreadProps(__spreadValues({}, options), {
          version
        }));
      }
      return GENERIC_GEMINI_MODEL.withConfig(__spreadProps(__spreadValues({}, options), {
        version
      }));
    }
    function toGeminiRole(role, model2) {
      switch (role) {
        case "user":
          return "user";
        case "model":
          return "model";
        case "system":
          if (model2?.info?.supports?.systemRole) {
            throw new Error("system role is only supported for a single message in the first position");
          } else {
            throw new Error("system role is not supported");
          }
        case "tool":
          return "function";
        default:
          return "user";
      }
    }
    function convertSchemaProperty(property) {
      if (!property || !property.type) {
        return void 0;
      }
      const baseSchema = {};
      if (property.description) {
        baseSchema.description = property.description;
      }
      if (property.enum) {
        baseSchema.type = import_generative_ai.SchemaType.STRING;
        baseSchema.enum = property.enum;
      }
      if (property.nullable) {
        baseSchema.nullable = property.nullable;
      }
      let propertyType;
      if (Array.isArray(property.type)) {
        const types = property.type;
        if (types.includes("null")) {
          baseSchema.nullable = true;
        }
        propertyType = types.find((t) => t !== "null");
      } else {
        propertyType = property.type;
      }
      if (propertyType === "object") {
        const nestedProperties = {};
        Object.keys(property.properties ?? {}).forEach((key) => {
          nestedProperties[key] = convertSchemaProperty(property.properties[key]);
        });
        return __spreadProps(__spreadValues({}, baseSchema), {
          type: import_generative_ai.SchemaType.OBJECT,
          properties: nestedProperties,
          required: property.required
        });
      } else if (propertyType === "array") {
        return __spreadProps(__spreadValues({}, baseSchema), {
          type: import_generative_ai.SchemaType.ARRAY,
          items: convertSchemaProperty(property.items)
        });
      } else {
        const schemaType = import_generative_ai.SchemaType[propertyType.toUpperCase()];
        if (!schemaType) {
          throw new import_genkit7.GenkitError({
            status: "INVALID_ARGUMENT",
            message: `Unsupported property type ${propertyType.toUpperCase()}`
          });
        }
        return __spreadProps(__spreadValues({}, baseSchema), {
          type: schemaType
        });
      }
    }
    function toGeminiTool(tool) {
      const declaration = {
        name: tool.name.replace(/\//g, "__"),
        // Gemini throws on '/' in tool name
        description: tool.description,
        parameters: convertSchemaProperty(tool.inputSchema)
      };
      return declaration;
    }
    function toInlineData(part) {
      const dataUrl = part.media.url;
      const b64Data = dataUrl.substring(dataUrl.indexOf(",") + 1);
      const contentType = part.media.contentType || dataUrl.substring(dataUrl.indexOf(":") + 1, dataUrl.indexOf(";"));
      return {
        inlineData: {
          mimeType: contentType,
          data: b64Data
        }
      };
    }
    function toFileData(part) {
      if (!part.media.contentType) throw new Error("Must supply a `contentType` when sending File URIs to Gemini.");
      return {
        fileData: {
          mimeType: part.media.contentType,
          fileUri: part.media.url
        }
      };
    }
    function fromInlineData(inlinePart) {
      if (!inlinePart.inlineData || !inlinePart.inlineData.hasOwnProperty("mimeType") || !inlinePart.inlineData.hasOwnProperty("data")) {
        throw new Error("Invalid InlineDataPart: missing required properties");
      }
      const {
        mimeType,
        data
      } = inlinePart.inlineData;
      const dataUrl = `data:${mimeType};base64,${data}`;
      return {
        media: {
          url: dataUrl,
          contentType: mimeType
        }
      };
    }
    function toFunctionCall(part) {
      if (!part?.toolRequest?.input) {
        throw Error("Invalid ToolRequestPart: input was missing.");
      }
      return {
        functionCall: {
          name: part.toolRequest.name,
          args: part.toolRequest.input
        }
      };
    }
    function fromFunctionCall(part, ref) {
      if (!part.functionCall) {
        throw Error("Invalid FunctionCallPart");
      }
      return {
        toolRequest: {
          name: part.functionCall.name,
          input: part.functionCall.args,
          ref
        }
      };
    }
    function toFunctionResponse(part) {
      if (!part?.toolResponse?.output) {
        throw Error("Invalid ToolResponsePart: output was missing.");
      }
      return {
        functionResponse: {
          name: part.toolResponse.name,
          response: {
            name: part.toolResponse.name,
            content: part.toolResponse.output
          }
        }
      };
    }
    function fromFunctionResponse(part) {
      if (!part.functionResponse) {
        throw new Error("Invalid FunctionResponsePart.");
      }
      return {
        toolResponse: {
          name: part.functionResponse.name.replace(/__/g, "/"),
          // restore slashes
          output: part.functionResponse.response
        }
      };
    }
    function fromExecutableCode(part) {
      if (!part.executableCode) {
        throw new Error("Invalid GeminiPart: missing executableCode");
      }
      return {
        custom: {
          executableCode: {
            language: part.executableCode.language,
            code: part.executableCode.code
          }
        }
      };
    }
    function fromCodeExecutionResult(part) {
      if (!part.codeExecutionResult) {
        throw new Error("Invalid GeminiPart: missing codeExecutionResult");
      }
      return {
        custom: {
          codeExecutionResult: {
            outcome: part.codeExecutionResult.outcome,
            output: part.codeExecutionResult.output
          }
        }
      };
    }
    function fromThought(part) {
      return {
        reasoning: part.text || "",
        metadata: {
          thoughtSignature: part.thoughtSignature
        }
      };
    }
    function toCustomPart(part) {
      if (!part.custom) {
        throw new Error("Invalid GeminiPart: missing custom");
      }
      if (part.custom.codeExecutionResult) {
        return {
          codeExecutionResult: part.custom.codeExecutionResult
        };
      }
      if (part.custom.executableCode) {
        return {
          executableCode: part.custom.executableCode
        };
      }
      throw new Error("Unsupported Custom Part type");
    }
    function toThought(part) {
      const outPart = {
        thought: true
      };
      if (part.metadata?.thoughtSignature) outPart.thoughtSignature = part.metadata.thoughtSignature;
      if (part.reasoning?.length) outPart.text = part.reasoning;
      return outPart;
    }
    function toGeminiPart(part) {
      if (part.text !== void 0) return {
        text: part.text || " "
      };
      if (part.media) {
        if (part.media.url.startsWith("data:")) return toInlineData(part);
        return toFileData(part);
      }
      if (part.toolRequest) return toFunctionCall(part);
      if (part.toolResponse) return toFunctionResponse(part);
      if (part.custom) return toCustomPart(part);
      if (typeof part.reasoning === "string") return toThought(part);
      throw new Error("Unsupported Part type" + JSON.stringify(part));
    }
    function fromGeminiPart(part, jsonMode, ref) {
      if ("thought" in part) return fromThought(part);
      if (typeof part.text === "string") return {
        text: part.text
      };
      if (part.inlineData) return fromInlineData(part);
      if (part.functionCall) return fromFunctionCall(part, ref);
      if (part.functionResponse) return fromFunctionResponse(part);
      if (part.executableCode) return fromExecutableCode(part);
      if (part.codeExecutionResult) return fromCodeExecutionResult(part);
      throw new Error("Unsupported GeminiPart type: " + JSON.stringify(part));
    }
    function toGeminiMessage(message, model2) {
      let sortedParts = message.content;
      if (message.role === "tool") {
        sortedParts = [...message.content].sort((a, b) => {
          const aRef = a.toolResponse?.ref;
          const bRef = b.toolResponse?.ref;
          if (!aRef && !bRef) return 0;
          if (!aRef) return 1;
          if (!bRef) return -1;
          return Number.parseInt(aRef, 10) - Number.parseInt(bRef, 10);
        });
      }
      return {
        role: toGeminiRole(message.role, model2),
        parts: sortedParts.map(toGeminiPart)
      };
    }
    function toGeminiSystemInstruction(message) {
      return {
        role: "user",
        parts: message.content.map(toGeminiPart)
      };
    }
    function fromGeminiFinishReason(reason) {
      if (!reason) return "unknown";
      switch (reason) {
        case "STOP":
          return "stop";
        case "MAX_TOKENS":
          return "length";
        case "SAFETY":
        // blocked for safety
        case "RECITATION":
          return "blocked";
        default:
          return "unknown";
      }
    }
    function fromGeminiCandidate(candidate, jsonMode = false) {
      const parts = candidate.content?.parts || [];
      const genkitCandidate = {
        index: candidate.index || 0,
        message: {
          role: "model",
          content: parts.map((part, index) => fromGeminiPart(part, jsonMode, index.toString()))
        },
        finishReason: fromGeminiFinishReason(candidate.finishReason),
        finishMessage: candidate.finishMessage,
        custom: {
          safetyRatings: candidate.safetyRatings,
          citationMetadata: candidate.citationMetadata
        }
      };
      return genkitCandidate;
    }
    function cleanSchema(schema) {
      const out = structuredClone(schema);
      for (const key in out) {
        if (key === "$schema" || key === "additionalProperties") {
          delete out[key];
          continue;
        }
        if (typeof out[key] === "object") {
          out[key] = cleanSchema(out[key]);
        }
        if (key === "type" && Array.isArray(out[key])) {
          out[key] = out[key].find((t) => t !== "null");
        }
      }
      return out;
    }
    function defineGoogleAIModel2({
      ai,
      name,
      apiKey: apiKeyOption,
      apiVersion,
      baseUrl,
      info,
      defaultConfig,
      debugTraces
    }) {
      let apiKey;
      if (apiKeyOption !== false) {
        apiKey = apiKeyOption || (0, import_common2.getApiKeyFromEnvVar)();
        if (!apiKey) {
          throw new import_genkit7.GenkitError({
            status: "FAILED_PRECONDITION",
            message: "Please pass in the API key or set the GEMINI_API_KEY or GOOGLE_API_KEY environment variable.\nFor more details see https://genkit.dev/docs/plugins/google-genai"
          });
        }
      }
      const apiModelName = name.startsWith("googleai/") ? name.substring("googleai/".length) : name;
      const model2 = SUPPORTED_GEMINI_MODELS2[apiModelName] ?? (0, import_model4.modelRef)({
        name: `googleai/${apiModelName}`,
        info: __spreadValues({
          label: `Google AI - ${apiModelName}`,
          supports: {
            multiturn: true,
            media: true,
            tools: true,
            systemRole: true,
            output: ["text", "json"]
          }
        }, info),
        configSchema: GeminiConfigSchema2
      });
      const middleware = [];
      if (model2.info?.supports?.media) {
        middleware.push((0, import_middleware.downloadRequestMedia)({
          maxBytes: 1024 * 1024 * 10,
          // don't downlaod files that have been uploaded using the Files API
          filter: (part) => {
            try {
              const url = new URL(part.media.url);
              if (
                // Gemini can handle these URLs
                ["generativelanguage.googleapis.com", "www.youtube.com", "youtube.com", "youtu.be"].includes(url.hostname)
              ) return false;
            } catch {
            }
            return true;
          }
        }));
      }
      return ai.defineModel(__spreadProps(__spreadValues({
        apiVersion: "v2",
        name: model2.name
      }, model2.info), {
        configSchema: model2.configSchema,
        use: middleware
      }), (_0, _1) => __async(null, [_0, _1], function* (request, {
        streamingRequested,
        sendChunk,
        abortSignal
      }) {
        const options = {
          apiClient: (0, import_common2.getGenkitClientHeader)()
        };
        if (apiVersion) {
          options.apiVersion = apiVersion;
        }
        if (apiVersion) {
          options.baseUrl = baseUrl;
        }
        const requestConfig = __spreadValues(__spreadValues({}, defaultConfig), request.config);
        const messages = [...request.messages];
        if (messages.length === 0) throw new Error("No messages provided.");
        let systemInstruction = void 0;
        if (model2.info?.supports?.systemRole) {
          const systemMessage = messages.find((m) => m.role === "system");
          if (systemMessage) {
            messages.splice(messages.indexOf(systemMessage), 1);
            systemInstruction = toGeminiSystemInstruction(systemMessage);
          }
        }
        const tools = [];
        if (request.tools?.length) {
          tools.push({
            functionDeclarations: request.tools.map(toGeminiTool)
          });
        }
        const _a = requestConfig, {
          apiKey: apiKeyFromConfig,
          safetySettings: safetySettingsFromConfig,
          codeExecution: codeExecutionFromConfig,
          version: versionFromConfig,
          functionCallingConfig,
          googleSearchRetrieval,
          tools: toolsFromConfig
        } = _a, restOfConfigOptions = __objRest(_a, [
          "apiKey",
          "safetySettings",
          "codeExecution",
          "version",
          "functionCallingConfig",
          "googleSearchRetrieval",
          "tools"
        ]);
        if (codeExecutionFromConfig) {
          tools.push({
            codeExecution: request.config.codeExecution === true ? {} : request.config.codeExecution
          });
        }
        if (toolsFromConfig) {
          tools.push(...toolsFromConfig);
        }
        if (googleSearchRetrieval) {
          tools.push({
            googleSearch: googleSearchRetrieval === true ? {} : googleSearchRetrieval
          });
        }
        let toolConfig;
        if (functionCallingConfig) {
          toolConfig = {
            functionCallingConfig: {
              allowedFunctionNames: functionCallingConfig.allowedFunctionNames,
              mode: toFunctionModeEnum(functionCallingConfig.mode)
            }
          };
        } else if (request.toolChoice) {
          toolConfig = {
            functionCallingConfig: {
              mode: toGeminiFunctionModeEnum(request.toolChoice)
            }
          };
        }
        const jsonMode = request.output?.format === "json" || request.output?.contentType === "application/json" && tools.length === 0;
        const generationConfig = __spreadProps(__spreadValues({}, restOfConfigOptions), {
          candidateCount: request.candidates || void 0,
          responseMimeType: jsonMode ? "application/json" : void 0
        });
        if (request.output?.constrained && jsonMode) {
          generationConfig.responseSchema = cleanSchema(request.output.schema);
        }
        const msg = toGeminiMessage(messages[messages.length - 1], model2);
        const fromJSONModeScopedGeminiCandidate = (candidate) => {
          return fromGeminiCandidate(candidate, jsonMode);
        };
        const chatRequest = {
          systemInstruction,
          generationConfig,
          tools: tools.length ? tools : void 0,
          toolConfig,
          history: messages.slice(0, -1).map((message) => toGeminiMessage(message, model2)),
          safetySettings: safetySettingsFromConfig
        };
        const modelVersion = versionFromConfig || model2.version || apiModelName;
        const cacheConfigDetails = (0, import_utils2.extractCacheConfig)(request);
        const {
          chatRequest: updatedChatRequest,
          cache
        } = yield (0, import_context_caching.handleCacheIfNeeded)(apiKey, request, chatRequest, modelVersion, cacheConfigDetails);
        if (!apiKeyFromConfig && !apiKey) {
          throw new import_genkit7.GenkitError({
            status: "INVALID_ARGUMENT",
            message: "GoogleAI plugin was initialized with {apiKey: false} but no apiKey configuration was passed at call time."
          });
        }
        const client = new import_generative_ai.GoogleGenerativeAI(apiKeyFromConfig || apiKey);
        let genModel;
        if (cache) {
          genModel = client.getGenerativeModelFromCachedContent(cache, {
            model: modelVersion
          }, options);
        } else {
          genModel = client.getGenerativeModel({
            model: modelVersion
          }, options);
        }
        const callGemini = () => __async(null, null, function* () {
          let response;
          if (streamingRequested) {
            const result = yield genModel.startChat(updatedChatRequest).sendMessageStream(msg.parts, __spreadProps(__spreadValues({}, options), {
              signal: abortSignal
            }));
            const chunks = [];
            try {
              for (var iter = __forAwait(result.stream), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
                const item = temp.value;
                chunks.push(item);
                item.candidates?.forEach((candidate) => {
                  const c = fromJSONModeScopedGeminiCandidate(candidate);
                  sendChunk({
                    index: c.index,
                    content: c.message.content
                  });
                });
              }
            } catch (temp) {
              error = [temp];
            } finally {
              try {
                more && (temp = iter.return) && (yield temp.call(iter));
              } finally {
                if (error)
                  throw error[0];
              }
            }
            response = aggregateResponses(chunks);
          } else {
            const result = yield genModel.startChat(updatedChatRequest).sendMessage(msg.parts, __spreadProps(__spreadValues({}, options), {
              signal: abortSignal
            }));
            response = result.response;
          }
          const candidates = response.candidates || [];
          if (response.candidates?.["undefined"]) {
            candidates.push(response.candidates["undefined"]);
          }
          if (!candidates.length) {
            throw new import_genkit7.GenkitError({
              status: "FAILED_PRECONDITION",
              message: "No valid candidates returned."
            });
          }
          const candidateData = candidates.map(fromJSONModeScopedGeminiCandidate) || [];
          const usageMetadata = response.usageMetadata;
          return {
            candidates: candidateData,
            custom: response,
            usage: __spreadProps(__spreadValues({}, (0, import_model4.getBasicUsageStats)(request.messages, candidateData)), {
              inputTokens: usageMetadata?.promptTokenCount,
              outputTokens: usageMetadata?.candidatesTokenCount,
              thoughtsTokens: usageMetadata?.thoughtsTokenCount,
              totalTokens: usageMetadata?.totalTokenCount,
              cachedContentTokens: usageMetadata?.cachedContentTokenCount
            })
          };
        });
        return debugTraces ? yield (0, import_tracing.runInNewSpan)(ai.registry, {
          metadata: {
            name: streamingRequested ? "sendMessageStream" : "sendMessage"
          }
        }, (metadata) => __async(null, null, function* () {
          metadata.input = {
            sdk: "@google/generative-ai",
            cache,
            model: genModel.model,
            chatOptions: updatedChatRequest,
            parts: msg.parts,
            options
          };
          const response = yield callGemini();
          metadata.output = response.custom;
          return response;
        })) : yield callGemini();
      }));
    }
    function toFunctionModeEnum(configEnum) {
      if (configEnum === void 0) {
        return void 0;
      }
      switch (configEnum) {
        case "MODE_UNSPECIFIED": {
          return import_generative_ai.FunctionCallingMode.MODE_UNSPECIFIED;
        }
        case "ANY": {
          return import_generative_ai.FunctionCallingMode.ANY;
        }
        case "AUTO": {
          return import_generative_ai.FunctionCallingMode.AUTO;
        }
        case "NONE": {
          return import_generative_ai.FunctionCallingMode.NONE;
        }
        default:
          throw new Error(`unsupported function calling mode: ${configEnum}`);
      }
    }
    function toGeminiFunctionModeEnum(genkitMode) {
      if (genkitMode === void 0) {
        return void 0;
      }
      switch (genkitMode) {
        case "required": {
          return import_generative_ai.FunctionCallingMode.ANY;
        }
        case "auto": {
          return import_generative_ai.FunctionCallingMode.AUTO;
        }
        case "none": {
          return import_generative_ai.FunctionCallingMode.NONE;
        }
        default:
          throw new Error(`unsupported function calling mode: ${genkitMode}`);
      }
    }
    function aggregateResponses(responses) {
      const lastResponse = responses[responses.length - 1];
      const aggregatedResponse = {
        promptFeedback: lastResponse?.promptFeedback
      };
      for (const response of responses) {
        if (response.candidates) {
          let candidateIndex = 0;
          for (const candidate of response.candidates) {
            if (!aggregatedResponse.candidates) {
              aggregatedResponse.candidates = [];
            }
            if (!aggregatedResponse.candidates[candidateIndex]) {
              aggregatedResponse.candidates[candidateIndex] = {
                index: candidateIndex
              };
            }
            aggregatedResponse.candidates[candidateIndex].citationMetadata = candidate.citationMetadata;
            aggregatedResponse.candidates[candidateIndex].groundingMetadata = candidate.groundingMetadata;
            aggregatedResponse.candidates[candidateIndex].finishReason = candidate.finishReason;
            aggregatedResponse.candidates[candidateIndex].finishMessage = candidate.finishMessage;
            aggregatedResponse.candidates[candidateIndex].safetyRatings = candidate.safetyRatings;
            if (candidate.content && candidate.content.parts) {
              if (!aggregatedResponse.candidates[candidateIndex].content) {
                aggregatedResponse.candidates[candidateIndex].content = {
                  role: candidate.content.role || "user",
                  parts: []
                };
              }
              for (const part of candidate.content.parts) {
                const newPart = {};
                if (part.text) {
                  newPart.text = part.text;
                }
                if (part.thought) {
                  newPart.thought = part.thought;
                }
                if (part.thoughtSignature) {
                  newPart.thoughtSignature = part.thoughtSignature;
                }
                if (part.functionCall) {
                  newPart.functionCall = part.functionCall;
                }
                if (part.executableCode) {
                  newPart.executableCode = part.executableCode;
                }
                if (part.codeExecutionResult) {
                  newPart.codeExecutionResult = part.codeExecutionResult;
                }
                if (Object.keys(newPart).length === 0) {
                  newPart.text = "";
                }
                aggregatedResponse.candidates[candidateIndex].content.parts.push(newPart);
              }
            }
          }
          candidateIndex++;
        }
        if (response.usageMetadata) {
          aggregatedResponse.usageMetadata = response.usageMetadata;
        }
      }
      return aggregatedResponse;
    }
  }
});

// node_modules/@genkit-ai/googleai/lib/predict.js
var require_predict = __commonJS({
  "node_modules/@genkit-ai/googleai/lib/predict.js"(exports, module) {
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
    var predict_exports = {};
    __export2(predict_exports, {
      checkOp: () => checkOp,
      predictModel: () => predictModel
    });
    module.exports = __toCommonJS2(predict_exports);
    var import_common2 = (init_common(), __toCommonJS(common_exports));
    function predictEndpoint(options) {
      return `https://generativelanguage.googleapis.com/${options.apiVersion}/models/${options.model}:${options.method}?key=${options.apiKey}`;
    }
    function opCheckEndpoint(options) {
      return `https://generativelanguage.googleapis.com/${options.apiVersion}/${options.operation}?key=${options.apiKey}`;
    }
    function predictModel(model2, apiKey, method) {
      return (instances, parameters) => __async(null, null, function* () {
        const fetch2 = (yield import("./src-LKHZGO55.js")).default;
        const req = {
          instances,
          parameters
        };
        const response = yield fetch2(predictEndpoint({
          model: model2,
          apiVersion: "v1beta",
          apiKey,
          method
        }), {
          method: "POST",
          body: JSON.stringify(req),
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Client": (0, import_common2.getGenkitClientHeader)()
          }
        });
        if (!response.ok) {
          throw new Error(`Error from Gemini AI predict: HTTP ${response.status}: ${yield response.text()}`);
        }
        return yield response.json();
      });
    }
    function checkOp(operation, apiKey) {
      return __async(this, null, function* () {
        const fetch2 = (yield import("./src-LKHZGO55.js")).default;
        const response = yield fetch2(opCheckEndpoint({
          apiVersion: "v1beta",
          operation,
          apiKey
        }), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Client": (0, import_common2.getGenkitClientHeader)()
          }
        });
        if (!response.ok) {
          throw new Error(`Error from operation API: HTTP ${response.status}: ${yield response.text()}`);
        }
        return yield response.json();
      });
    }
  }
});

// node_modules/@genkit-ai/googleai/lib/imagen.js
var require_imagen = __commonJS({
  "node_modules/@genkit-ai/googleai/lib/imagen.js"(exports, module) {
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
    var imagen_exports = {};
    __export2(imagen_exports, {
      GENERIC_IMAGEN_INFO: () => GENERIC_IMAGEN_INFO2,
      ImagenConfigSchema: () => ImagenConfigSchema2,
      defineImagenModel: () => defineImagenModel2
    });
    module.exports = __toCommonJS2(imagen_exports);
    var import_genkit7 = require_lib3();
    var import_model4 = require_model2();
    var import_common2 = require_common2();
    var import_predict = require_predict();
    var ImagenConfigSchema2 = import_genkit7.z.object({
      numberOfImages: import_genkit7.z.number().describe("The number of images to generate, from 1 to 4 (inclusive). The default is 1.").optional(),
      aspectRatio: import_genkit7.z.enum(["1:1", "9:16", "16:9", "3:4", "4:3"]).describe("Desired aspect ratio of the output image.").optional(),
      personGeneration: import_genkit7.z.enum(["dont_allow", "allow_adult", "allow_all"]).describe("Control if/how images of people will be generated by the model.").optional()
    }).passthrough();
    function toParameters(request) {
      const out = __spreadValues({
        sampleCount: request.config?.numberOfImages ?? 1
      }, request?.config);
      for (const k in out) {
        if (!out[k]) delete out[k];
      }
      return out;
    }
    function extractText(request) {
      return request.messages.at(-1).content.map((c) => c.text || "").join("");
    }
    function extractBaseImage(request) {
      return request.messages.at(-1)?.content.find((p) => !!p.media)?.media?.url.split(",")[1];
    }
    var GENERIC_IMAGEN_INFO2 = {
      label: `Google AI - Generic Imagen`,
      supports: {
        media: true,
        multiturn: false,
        tools: false,
        systemRole: false,
        output: ["media"]
      }
    };
    function defineImagenModel2(ai, name, apiKey) {
      if (apiKey !== false) {
        apiKey = apiKey || (0, import_common2.getApiKeyFromEnvVar)();
        if (!apiKey) {
          throw new import_genkit7.GenkitError({
            status: "FAILED_PRECONDITION",
            message: "Please pass in the API key or set the GEMINI_API_KEY or GOOGLE_API_KEY environment variable.\nFor more details see https://genkit.dev/docs/plugins/google-genai"
          });
        }
      }
      const modelName = `googleai/${name}`;
      const model2 = (0, import_model4.modelRef)({
        name: modelName,
        info: __spreadProps(__spreadValues({}, GENERIC_IMAGEN_INFO2), {
          label: `Google AI - ${name}`
        }),
        configSchema: ImagenConfigSchema2
      });
      return ai.defineModel(__spreadProps(__spreadValues({
        name: modelName
      }, model2.info), {
        configSchema: ImagenConfigSchema2
      }), (request) => __async(null, null, function* () {
        const instance = {
          prompt: extractText(request)
        };
        const baseImage = extractBaseImage(request);
        if (baseImage) {
          instance.image = {
            bytesBase64Encoded: baseImage
          };
        }
        const predictClient = (0, import_predict.predictModel)(model2.version || name, apiKey, "predict");
        const response = yield predictClient([instance], toParameters(request));
        if (!response.predictions || response.predictions.length == 0) {
          throw new Error("Model returned no predictions. Possibly due to content filters.");
        }
        const message = {
          role: "model",
          content: []
        };
        response.predictions.forEach((p, i) => {
          const b64data = p.bytesBase64Encoded;
          const mimeType = p.mimeType;
          message.content.push({
            media: {
              url: `data:${mimeType};base64,${b64data}`,
              contentType: mimeType
            }
          });
        });
        return {
          finishReason: "stop",
          message,
          usage: (0, import_model4.getBasicUsageStats)(request.messages, message),
          custom: response
        };
      }));
    }
  }
});

// node_modules/@genkit-ai/googleai/lib/list-models.js
var require_list_models = __commonJS({
  "node_modules/@genkit-ai/googleai/lib/list-models.js"(exports, module) {
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
    var list_models_exports = {};
    __export2(list_models_exports, {
      listModels: () => listModels2
    });
    module.exports = __toCommonJS2(list_models_exports);
    function listModels2(baseUrl, apiKey) {
      return __async(this, null, function* () {
        const res = yield fetch(`${baseUrl}/v1beta/models?pageSize=1000&key=${apiKey}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const modelResponse = JSON.parse(yield res.text());
        return modelResponse.models;
      });
    }
  }
});

// node_modules/@genkit-ai/googleai/lib/veo.js
var require_veo = __commonJS({
  "node_modules/@genkit-ai/googleai/lib/veo.js"(exports, module) {
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
    var veo_exports = {};
    __export2(veo_exports, {
      GENERIC_VEO_INFO: () => GENERIC_VEO_INFO2,
      VeoConfigSchema: () => VeoConfigSchema2,
      defineVeoModel: () => defineVeoModel2
    });
    module.exports = __toCommonJS2(veo_exports);
    var import_genkit7 = require_lib3();
    var import_model4 = require_model2();
    var import_common2 = require_common2();
    var import_predict = require_predict();
    var VeoConfigSchema2 = import_genkit7.z.object({
      // NOTE: Documentation notes numberOfVideos parameter to pick the number of
      // output videos, but this setting does not seem to work
      negativePrompt: import_genkit7.z.string().optional(),
      aspectRatio: import_genkit7.z.enum(["9:16", "16:9"]).describe("Desired aspect ratio of the output video.").optional(),
      personGeneration: import_genkit7.z.enum(["dont_allow", "allow_adult", "allow_all"]).describe("Control if/how images of people will be generated by the model.").optional(),
      durationSeconds: import_genkit7.z.number().step(1).min(5).max(8).describe("Length of each output video in seconds, between 5 and 8.").optional(),
      enhance_prompt: import_genkit7.z.boolean().describe("Enable or disable the prompt rewriter. Enabled by default.").optional()
    }).passthrough();
    function extractText(request) {
      return request.messages.at(-1).content.map((c) => c.text || "").join("");
    }
    function toParameters(request) {
      const out = __spreadValues({}, request?.config);
      for (const k in out) {
        if (!out[k]) delete out[k];
      }
      return out;
    }
    function extractImage(request) {
      const media = request.messages.at(-1)?.content.find((p) => !!p.media)?.media;
      if (media) {
        const img = media?.url.split(",")[1];
        return {
          bytesBase64Encoded: img,
          mimeType: media.contentType
        };
      }
      return void 0;
    }
    var GENERIC_VEO_INFO2 = {
      label: `Google AI - Generic Veo`,
      supports: {
        media: true,
        multiturn: false,
        tools: false,
        systemRole: false,
        output: ["media"],
        longRunning: true
      }
    };
    function defineVeoModel2(ai, name, apiKey) {
      if (apiKey !== false) {
        apiKey = apiKey || (0, import_common2.getApiKeyFromEnvVar)();
        if (!apiKey) {
          throw new import_genkit7.GenkitError({
            status: "FAILED_PRECONDITION",
            message: "Please pass in the API key or set the GEMINI_API_KEY or GOOGLE_API_KEY environment variable.\nFor more details see https://genkit.dev/docs/plugins/google-genai"
          });
        }
      }
      const modelName = `googleai/${name}`;
      const model2 = (0, import_model4.modelRef)({
        name: modelName,
        info: __spreadProps(__spreadValues({}, GENERIC_VEO_INFO2), {
          label: `Google AI - ${name}`
        }),
        configSchema: VeoConfigSchema2
      });
      return ai.defineBackgroundModel(__spreadProps(__spreadValues({
        name: modelName
      }, model2.info), {
        configSchema: VeoConfigSchema2,
        start(request) {
          return __async(this, null, function* () {
            const instance = {
              prompt: extractText(request)
            };
            const image = extractImage(request);
            if (image) {
              instance.image = image;
            }
            const predictClient = (0, import_predict.predictModel)(model2.version || name, apiKey, "predictLongRunning");
            const response = yield predictClient([instance], toParameters(request));
            return toGenkitOp(response);
          });
        },
        check(operation) {
          return __async(this, null, function* () {
            const newOp = yield (0, import_predict.checkOp)(operation.id, apiKey);
            return toGenkitOp(newOp);
          });
        }
      }));
    }
    function toGenkitOp(apiOp) {
      const res = {
        id: apiOp.name
      };
      if (apiOp.done !== void 0) {
        res.done = apiOp.done;
      }
      if (apiOp.error) {
        res.error = {
          message: apiOp.error.message
        };
      }
      if (apiOp.response && apiOp.response.generateVideoResponse && apiOp.response.generateVideoResponse.generatedSamples) {
        res.output = {
          finishReason: "stop",
          raw: apiOp.response,
          message: {
            role: "model",
            content: apiOp.response.generateVideoResponse.generatedSamples.map((s) => {
              return {
                media: {
                  url: s.video.uri
                }
              };
            })
          }
        };
      }
      return res;
    }
  }
});

// node_modules/@genkit-ai/googleai/lib/index.mjs
init_lib2();
init_logging2();

// node_modules/genkit/lib/model.mjs
init_model();

// node_modules/genkit/lib/plugin.mjs
init_lib();
init_embedder();
init_evaluator();
init_model();
init_reranker();
init_retriever();
function genkitPlugin(pluginName, initFn, resolveFn, listActionsFn) {
  return (genkit3) => ({
    name: pluginName,
    initializer: () => __async(null, null, function* () {
      yield initFn(genkit3);
    }),
    resolver: (action, target) => __async(null, null, function* () {
      if (resolveFn) {
        return yield resolveFn(genkit3, action, target);
      }
    }),
    listActions: () => __async(null, null, function* () {
      if (listActionsFn) {
        return yield listActionsFn();
      }
      return [];
    })
  });
}

// node_modules/@genkit-ai/googleai/lib/index.mjs
var import_common = __toESM(require_common2(), 1);
var import_embedder2 = __toESM(require_embedder3(), 1);
var import_gemini = __toESM(require_gemini(), 1);
var import_imagen = __toESM(require_imagen(), 1);
var import_list_models = __toESM(require_list_models(), 1);
var import_veo = __toESM(require_veo(), 1);
function initializer(ai, options) {
  return __async(this, null, function* () {
    let apiVersions = ["v1"];
    if (options?.apiVersion) {
      if (Array.isArray(options?.apiVersion)) {
        apiVersions = options?.apiVersion;
      } else {
        apiVersions = [options?.apiVersion];
      }
    }
    if (apiVersions.includes("v1beta")) {
      Object.keys(import_gemini.SUPPORTED_GEMINI_MODELS).forEach((name) => (0, import_gemini.defineGoogleAIModel)({
        ai,
        name,
        apiKey: options?.apiKey,
        apiVersion: "v1beta",
        baseUrl: options?.baseUrl,
        debugTraces: options?.experimental_debugTraces
      }));
    }
    if (apiVersions.includes("v1")) {
      Object.keys(import_gemini.SUPPORTED_GEMINI_MODELS).forEach((name) => (0, import_gemini.defineGoogleAIModel)({
        ai,
        name,
        apiKey: options?.apiKey,
        apiVersion: void 0,
        baseUrl: options?.baseUrl,
        debugTraces: options?.experimental_debugTraces
      }));
      Object.keys(import_embedder2.SUPPORTED_MODELS).forEach((name) => (0, import_embedder2.defineGoogleAIEmbedder)(ai, name, {
        apiKey: options?.apiKey
      }));
    }
    if (options?.models) {
      for (const modelOrRef of options?.models) {
        const modelName = typeof modelOrRef === "string" ? modelOrRef : (
          // strip out the `googleai/` prefix
          modelOrRef.name.split("/")[1]
        );
        const modelRef22 = typeof modelOrRef === "string" ? (0, import_gemini.gemini)(modelOrRef) : modelOrRef;
        (0, import_gemini.defineGoogleAIModel)({
          ai,
          name: modelName,
          apiKey: options?.apiKey,
          baseUrl: options?.baseUrl,
          info: __spreadProps(__spreadValues({}, modelRef22.info), {
            label: `Google AI - ${modelName}`
          }),
          debugTraces: options?.experimental_debugTraces
        });
      }
    }
  });
}
function resolver(ai, actionType, actionName, options) {
  return __async(this, null, function* () {
    if (actionType === "embedder") {
      resolveEmbedder(ai, actionName, options);
    } else if (actionName.startsWith("veo")) {
      if (actionType === "background-model") {
        (0, import_veo.defineVeoModel)(ai, actionName, options?.apiKey);
      }
    } else if (actionType === "model") {
      resolveModel(ai, actionName, options);
    }
  });
}
function resolveModel(ai, actionName, options) {
  if (actionName.startsWith("imagen")) {
    (0, import_imagen.defineImagenModel)(ai, actionName, options?.apiKey);
    return;
  }
  const modelRef22 = (0, import_gemini.gemini)(actionName);
  (0, import_gemini.defineGoogleAIModel)({
    ai,
    name: modelRef22.name,
    apiKey: options?.apiKey,
    baseUrl: options?.baseUrl,
    info: __spreadProps(__spreadValues({}, modelRef22.info), {
      label: `Google AI - ${actionName}`
    }),
    debugTraces: options?.experimental_debugTraces
  });
}
function resolveEmbedder(ai, actionName, options) {
  (0, import_embedder2.defineGoogleAIEmbedder)(ai, `googleai/${actionName}`, {
    apiKey: options?.apiKey
  });
}
function listActions(options) {
  return __async(this, null, function* () {
    const apiKey = options?.apiKey || (0, import_common.getApiKeyFromEnvVar)();
    if (!apiKey) {
      logger.error("Pass in the API key or set the GEMINI_API_KEY or GOOGLE_API_KEY environment variable.");
      return [];
    }
    const models = yield (0, import_list_models.listModels)(options?.baseUrl || "https://generativelanguage.googleapis.com", apiKey);
    return [
      // Imagen
      ...models.filter((m) => m.supportedGenerationMethods.includes("predict") && m.name.includes("imagen")).filter((m) => !m.description || !m.description.includes("deprecated")).map((m) => {
        const name = m.name.split("/").at(-1);
        return (0, lib_exports.modelActionMetadata)({
          name: `googleai/${name}`,
          info: __spreadValues({}, import_imagen.GENERIC_IMAGEN_INFO),
          configSchema: import_imagen.ImagenConfigSchema
        });
      }),
      // Veo
      ...models.filter((m) => m.supportedGenerationMethods.includes("predictLongRunning") && m.name.includes("veo")).filter((m) => !m.description || !m.description.includes("deprecated")).map((m) => {
        const name = m.name.split("/").at(-1);
        return (0, lib_exports.modelActionMetadata)({
          name: `googleai/${name}`,
          info: __spreadValues({}, import_veo.GENERIC_VEO_INFO),
          configSchema: import_veo.VeoConfigSchema,
          background: true
        });
      }),
      // Models
      ...models.filter((m) => m.supportedGenerationMethods.includes("generateContent")).filter((m) => !m.description || !m.description.includes("deprecated")).map((m) => {
        const ref = (0, import_gemini.gemini)(m.name.startsWith("models/") ? m.name.substring("models/".length) : m.name);
        return (0, lib_exports.modelActionMetadata)({
          name: ref.name,
          info: ref.info,
          configSchema: import_gemini.GeminiConfigSchema
        });
      }),
      // Embedders
      ...models.filter((m) => m.supportedGenerationMethods.includes("embedContent")).filter((m) => !m.description || !m.description.includes("deprecated")).map((m) => {
        const name = "googleai/" + (m.name.startsWith("models/") ? m.name.substring("models/".length) : m.name);
        return (0, lib_exports.embedderActionMetadata)({
          name,
          configSchema: import_embedder2.GeminiEmbeddingConfigSchema,
          info: {
            dimensions: 768,
            label: `Google Gen AI - ${name}`,
            supports: {
              input: ["text"]
            }
          }
        });
      })
    ];
  });
}
function googleAIPlugin(options) {
  let listActionsCache;
  return genkitPlugin("googleai", (ai) => __async(null, null, function* () {
    return yield initializer(ai, options);
  }), (ai, actionType, actionName) => __async(null, null, function* () {
    return yield resolver(ai, actionType, actionName, options);
  }), () => __async(null, null, function* () {
    if (listActionsCache) return listActionsCache;
    listActionsCache = yield listActions(options);
    return listActionsCache;
  }));
}
var googleAI = googleAIPlugin;
googleAI.model = (name, config) => {
  if (name.startsWith("imagen")) {
    return modelRef2({
      name: `googleai/${name}`,
      config,
      configSchema: import_imagen.ImagenConfigSchema
    });
  }
  if (name.startsWith("veo")) {
    return modelRef2({
      name: `googleai/${name}`,
      config,
      configSchema: import_veo.VeoConfigSchema
    });
  }
  return modelRef2({
    name: `googleai/${name}`,
    config,
    configSchema: import_gemini.GeminiConfigSchema
  });
};
googleAI.embedder = (name, config) => {
  return (0, lib_exports.embedderRef)({
    name: `googleai/${name}`,
    config,
    configSchema: import_embedder2.GeminiEmbeddingConfigSchema
  });
};
var index_default = googleAI;
var export_gemini = import_gemini.gemini;
var export_gemini10Pro = import_gemini.gemini10Pro;
var export_gemini15Flash = import_gemini.gemini15Flash;
var export_gemini15Flash8b = import_gemini.gemini15Flash8b;
var export_gemini15Pro = import_gemini.gemini15Pro;
var export_gemini20Flash = import_gemini.gemini20Flash;
var export_gemini20FlashExp = import_gemini.gemini20FlashExp;
var export_gemini20FlashLite = import_gemini.gemini20FlashLite;
var export_gemini20ProExp0205 = import_gemini.gemini20ProExp0205;
var export_gemini25FlashLite = import_gemini.gemini25FlashLite;
var export_gemini25FlashPreview0417 = import_gemini.gemini25FlashPreview0417;
var export_gemini25ProExp0325 = import_gemini.gemini25ProExp0325;
var export_gemini25ProPreview0325 = import_gemini.gemini25ProPreview0325;
var export_geminiEmbedding001 = import_embedder2.geminiEmbedding001;
var export_textEmbedding004 = import_embedder2.textEmbedding004;
var export_textEmbeddingGecko001 = import_embedder2.textEmbeddingGecko001;
export {
  index_default as default,
  export_gemini as gemini,
  export_gemini10Pro as gemini10Pro,
  export_gemini15Flash as gemini15Flash,
  export_gemini15Flash8b as gemini15Flash8b,
  export_gemini15Pro as gemini15Pro,
  export_gemini20Flash as gemini20Flash,
  export_gemini20FlashExp as gemini20FlashExp,
  export_gemini20FlashLite as gemini20FlashLite,
  export_gemini20ProExp0205 as gemini20ProExp0205,
  export_gemini25FlashLite as gemini25FlashLite,
  export_gemini25FlashPreview0417 as gemini25FlashPreview0417,
  export_gemini25ProExp0325 as gemini25ProExp0325,
  export_gemini25ProPreview0325 as gemini25ProPreview0325,
  export_geminiEmbedding001 as geminiEmbedding001,
  googleAI,
  googleAIPlugin,
  export_textEmbedding004 as textEmbedding004,
  export_textEmbeddingGecko001 as textEmbeddingGecko001
};
/*! Bundled license information:

genkit/lib/index.mjs:
genkit/lib/index.js:
  (**
   * @license
   *
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@google/generative-ai/dist/index.js:
@google/generative-ai/dist/server/index.mjs:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=@genkit-ai_googleai.js.map
