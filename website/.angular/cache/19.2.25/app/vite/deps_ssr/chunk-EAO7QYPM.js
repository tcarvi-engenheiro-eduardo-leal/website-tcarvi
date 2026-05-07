import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  defineBackgroundModel,
  defineEmbedder,
  defineEvaluator,
  defineIndexer,
  defineModel,
  defineReranker,
  defineRetriever,
  defineSimpleRetriever,
  esm_node_exports,
  evaluate,
  import_action,
  import_background_action,
  import_dynamic_action_provider,
  import_error,
  import_flow,
  import_schema,
  index,
  init_embedder,
  init_esm_node,
  init_evaluator,
  init_lib,
  init_model,
  init_reranker,
  init_retriever,
  init_schema,
  init_tracing,
  lib_exports,
  parseSchema,
  require_array,
  require_cancel_operation,
  require_check_operation,
  require_document,
  require_embedder,
  require_enum,
  require_evaluator,
  require_formats,
  require_generate,
  require_genkit_ai,
  require_json,
  require_jsonl,
  require_lib,
  require_logging,
  require_message,
  require_middleware2 as require_middleware,
  require_model,
  require_parts,
  require_plugin,
  require_prompt,
  require_registry,
  require_reranker,
  require_resource,
  require_retriever,
  require_session,
  require_text,
  require_tool,
  require_tracing,
  require_types,
  rerank,
  retrieve,
  setClientHeader,
  tracing_exports
} from "./chunk-ECVKO3DF.js";
import {
  __async,
  __commonJS,
  __esm,
  __export,
  __objRest,
  __reExport,
  __spreadProps,
  __spreadValues,
  __toCommonJS,
  __toESM
} from "./chunk-PNXJXBRO.js";

// node_modules/@genkit-ai/core/lib/async.mjs
function createTask() {
  let resolve, reject;
  const promise = new Promise((res, rej) => [resolve, reject] = [res, rej]);
  return {
    resolve,
    reject,
    promise
  };
}
function lazy(fn) {
  return new LazyPromise((resolve, reject) => {
    try {
      resolve(fn());
    } catch (e) {
      reject(e);
    }
  });
}
var Channel, LazyPromise, AsyncTaskQueue;
var init_async = __esm({
  "node_modules/@genkit-ai/core/lib/async.mjs"() {
    Channel = class {
      ready = createTask();
      buffer = [];
      err = null;
      send(value) {
        this.buffer.push(value);
        this.ready.resolve();
      }
      close() {
        this.buffer.push(null);
        this.ready.resolve();
      }
      error(err) {
        this.err = err;
        this.ready.reject(err);
      }
      [Symbol.asyncIterator]() {
        return {
          next: () => __async(this, null, function* () {
            if (this.err) {
              throw this.err;
            }
            if (!this.buffer.length) {
              yield this.ready.promise;
            }
            const value = this.buffer.shift();
            if (!this.buffer.length) {
              this.ready = createTask();
            }
            return {
              value,
              done: !value
            };
          })
        };
      }
    };
    LazyPromise = class {
      executor;
      promise;
      constructor(executor) {
        this.executor = executor;
      }
      then(onfulfilled, onrejected) {
        this.promise ??= new Promise(this.executor);
        return this.promise.then(onfulfilled, onrejected);
      }
    };
    AsyncTaskQueue = class {
      last = Promise.resolve();
      options;
      constructor(options) {
        this.options = options || {};
      }
      /**
       * Adds a task to the queue.
       * The task will be executed when its turn comes up in the queue.
       * @param task A function that returns a value or a PromiseLike.
       */
      enqueue(task) {
        if (this.options.stopOnError) {
          this.last = this.last.then(() => lazy(task)).then((res) => res);
        } else {
          this.last = this.last.catch(() => {
          }).then(() => lazy(task)).then((res) => res);
        }
        this.last.catch(() => {
        });
      }
      /**
       * Waits for all tasks currently in the queue to complete.
       */
      merge() {
        return __async(this, null, function* () {
          yield this.last;
        });
      }
    };
  }
});

// node_modules/@genkit-ai/ai/lib/index.mjs
var lib_exports2 = {};
__export(lib_exports2, {
  BaseDataPointSchema: () => import_evaluator.BaseDataPointSchema,
  Document: () => import_document.Document,
  DocumentDataSchema: () => import_document.DocumentDataSchema,
  EvalStatusEnum: () => import_evaluator.EvalStatusEnum,
  GenerateResponse: () => import_generate.GenerateResponse,
  GenerateResponseChunk: () => import_generate.GenerateResponseChunk,
  GenerateResponseChunkSchema: () => import_model.GenerateResponseChunkSchema,
  GenerationBlockedError: () => import_generate.GenerationBlockedError,
  GenerationCommonConfigSchema: () => import_model.GenerationCommonConfigSchema,
  GenerationResponseError: () => import_generate.GenerationResponseError,
  GenkitAI: () => import_genkit_ai.GenkitAI,
  Message: () => import_message.Message,
  MessageSchema: () => import_model.MessageSchema,
  MiddlewareDescSchema: () => import_middleware.MiddlewareDescSchema,
  MiddlewareRefSchema: () => import_model.MiddlewareRefSchema,
  ModelReferenceSchema: () => import_model.ModelReferenceSchema,
  ModelRequestSchema: () => import_model.ModelRequestSchema,
  ModelResponseSchema: () => import_model.ModelResponseSchema,
  PartSchema: () => import_model.PartSchema,
  ResourceInputSchema: () => import_resource.ResourceInputSchema,
  ResourceOutputSchema: () => import_resource.ResourceOutputSchema,
  RoleSchema: () => import_model.RoleSchema,
  ToolInterruptError: () => import_tool.ToolInterruptError,
  asTool: () => import_tool.asTool,
  cancelOperation: () => import_cancel_operation.cancelOperation,
  checkOperation: () => import_check_operation.checkOperation,
  defineHelper: () => import_prompt.defineHelper,
  defineInterrupt: () => import_tool.defineInterrupt,
  definePartial: () => import_prompt.definePartial,
  definePrompt: () => import_prompt.definePrompt,
  defineResource: () => import_resource.defineResource,
  defineTool: () => import_tool.defineTool,
  dynamicResource: () => import_resource.dynamicResource,
  embed: () => import_embedder.embed,
  embedderActionMetadata: () => import_embedder.embedderActionMetadata,
  embedderRef: () => import_embedder.embedderRef,
  evaluate: () => import_evaluator.evaluate,
  evaluatorRef: () => import_evaluator.evaluatorRef,
  generate: () => import_generate.generate,
  generateMiddleware: () => import_middleware.generateMiddleware,
  generateOperation: () => import_generate.generateOperation,
  generateStream: () => import_generate.generateStream,
  index: () => import_retriever.index,
  indexerRef: () => import_retriever.indexerRef,
  interrupt: () => import_tool.interrupt,
  isDynamicResourceAction: () => import_resource.isDynamicResourceAction,
  isExecutablePrompt: () => import_prompt.isExecutablePrompt,
  loadPromptFolder: () => import_prompt.loadPromptFolder,
  modelActionMetadata: () => import_model.modelActionMetadata,
  modelRef: () => import_model.modelRef,
  prompt: () => import_prompt.prompt,
  rerank: () => import_reranker.rerank,
  rerankerRef: () => import_reranker.rerankerRef,
  resource: () => import_resource.resource,
  respondTool: () => import_tool.respondTool,
  restartTool: () => import_tool.restartTool,
  retrieve: () => import_retriever.retrieve,
  retrieverRef: () => import_retriever.retrieverRef,
  tagAsPreamble: () => import_generate.tagAsPreamble,
  toGenerateRequest: () => import_generate.toGenerateRequest
});
var import_cancel_operation, import_check_operation, import_document, import_embedder, import_evaluator, import_generate, import_middleware, import_genkit_ai, import_message, import_model, import_prompt, import_reranker, import_resource, import_retriever, import_tool;
var init_lib2 = __esm({
  "node_modules/@genkit-ai/ai/lib/index.mjs"() {
    import_cancel_operation = __toESM(require_cancel_operation(), 1);
    import_check_operation = __toESM(require_check_operation(), 1);
    import_document = __toESM(require_document(), 1);
    import_embedder = __toESM(require_embedder(), 1);
    import_evaluator = __toESM(require_evaluator(), 1);
    import_generate = __toESM(require_generate(), 1);
    import_middleware = __toESM(require_middleware(), 1);
    import_genkit_ai = __toESM(require_genkit_ai(), 1);
    import_message = __toESM(require_message(), 1);
    import_model = __toESM(require_model(), 1);
    import_prompt = __toESM(require_prompt(), 1);
    import_reranker = __toESM(require_reranker(), 1);
    import_resource = __toESM(require_resource(), 1);
    import_retriever = __toESM(require_retriever(), 1);
    import_tool = __toESM(require_tool(), 1);
    __reExport(lib_exports2, __toESM(require_types(), 1));
  }
});

// node_modules/@genkit-ai/ai/lib/formats/index.mjs
function defineFormat(registry, options, handler) {
  const _a = options, {
    name
  } = _a, config = __objRest(_a, [
    "name"
  ]);
  const formatter = {
    config,
    handler
  };
  registry.registerValue("format", name, formatter);
  return formatter;
}
function configureFormats(registry) {
  for (const format of DEFAULT_FORMATS) {
    defineFormat(registry, __spreadValues({
      name: format.name
    }, format.config), format.handler);
  }
}
var import_array, import_enum, import_json, import_jsonl, import_text, DEFAULT_FORMATS;
var init_formats = __esm({
  "node_modules/@genkit-ai/ai/lib/formats/index.mjs"() {
    import_array = __toESM(require_array(), 1);
    import_enum = __toESM(require_enum(), 1);
    import_json = __toESM(require_json(), 1);
    import_jsonl = __toESM(require_jsonl(), 1);
    import_text = __toESM(require_text(), 1);
    DEFAULT_FORMATS = [import_json.jsonFormatter, import_array.arrayFormatter, import_text.textFormatter, import_enum.enumFormatter, import_jsonl.jsonlFormatter];
  }
});

// node_modules/@genkit-ai/ai/lib/tool.mjs
function implementTool(a, config, registry) {
  a.respond = (interrupt2, responseData, options) => {
    if (registry) {
      (0, import_error.assertUnstable)(registry, "beta", "The 'tool.reply' method is part of the 'interrupts' beta feature.");
    }
    responseData = parseSchema(responseData, {
      jsonSchema: config.outputJsonSchema,
      schema: config.outputSchema
    });
    return respondTool2(interrupt2, responseData, options);
  };
  a.restart = (interrupt2, resumedMetadata, options) => {
    if (registry) {
      (0, import_error.assertUnstable)(registry, "beta", "The 'tool.restart' method is part of the 'interrupts' beta feature.");
    }
    let replaceInput = options?.replaceInput;
    if (replaceInput) {
      replaceInput = parseSchema(replaceInput, {
        schema: config.inputSchema,
        jsonSchema: config.inputJsonSchema
      });
    }
    return restartTool2(interrupt2, resumedMetadata, {
      replaceInput
    });
  };
}
function restartTool2(interrupt2, resumedMetadata, options) {
  let replaceInput = options?.replaceInput;
  return {
    toolRequest: (0, lib_exports.stripUndefinedProps)({
      name: interrupt2.toolRequest.name,
      ref: interrupt2.toolRequest.ref,
      input: replaceInput ?? interrupt2.toolRequest.input
    }),
    metadata: (0, lib_exports.stripUndefinedProps)(__spreadProps(__spreadValues({}, interrupt2.metadata), {
      resumed: resumedMetadata ?? true,
      // annotate the original input if replacing it
      replacedInput: replaceInput !== void 0 ? interrupt2.toolRequest.input : void 0
    }))
  };
}
function respondTool2(interrupt2, responseData, options) {
  return {
    toolResponse: (0, lib_exports.stripUndefinedProps)({
      name: interrupt2.toolRequest.name,
      ref: interrupt2.toolRequest.ref,
      output: responseData
    }),
    metadata: (0, lib_exports.stripUndefinedProps)({
      interruptResponse: options?.metadata ?? true
    })
  };
}
function interruptTool(registry) {
  return (metadata) => {
    if (registry) {
      (0, import_error.assertUnstable)(registry, "beta", "Tool interrupts are a beta feature.");
    }
    if (metadata) {
      (0, tracing_exports.setCustomMetadataAttributes)({
        interrupt: JSON.stringify(metadata)
      });
    }
    throw new ToolInterruptError2(metadata);
  };
}
function recordResumedMetadata(runOptions) {
  const optionsMetadata = runOptions.metadata;
  if (optionsMetadata?.resumed) {
    (0, tracing_exports.setCustomMetadataAttributes)({
      resumed: JSON.stringify(optionsMetadata.resumed)
    });
  }
}
function basicTool(config, fn) {
  const a = (0, lib_exports.action)(__spreadProps(__spreadValues({}, config), {
    actionType: "tool",
    metadata: __spreadProps(__spreadValues({}, config.metadata || {}), {
      type: "tool",
      dynamic: true
    })
  }), (i, runOptions) => {
    recordResumedMetadata(runOptions);
    const interrupt2 = interruptTool(runOptions.registry);
    if (fn) {
      return fn(i, __spreadProps(__spreadValues({}, runOptions), {
        context: __spreadValues({}, runOptions.context),
        interrupt: interrupt2
      }));
    }
    return interrupt2();
  });
  implementTool(a, config);
  return a;
}
function dynamicTool(config, fn) {
  const t = basicTool(config, fn);
  t.attach = (_) => t;
  return t;
}
var import_parts, import_prompt2, ToolInterruptError2;
var init_tool = __esm({
  "node_modules/@genkit-ai/ai/lib/tool.mjs"() {
    init_lib();
    init_schema();
    init_tracing();
    import_parts = __toESM(require_parts(), 1);
    import_prompt2 = __toESM(require_prompt(), 1);
    ToolInterruptError2 = class extends Error {
      constructor(metadata) {
        super();
        this.metadata = metadata;
        this.name = "ToolInterruptError";
      }
    };
  }
});

// node_modules/genkit/lib/genkit.mjs
var genkit_exports = {};
__export(genkit_exports, {
  Genkit: () => Genkit,
  __disableReflectionApi: () => __disableReflectionApi,
  genkit: () => genkit
});
function registerActionV2(registry, resolvedAction, plugin) {
  if ((0, import_background_action.isBackgroundAction)(resolvedAction)) {
    (0, import_background_action.registerBackgroundAction)(registry, resolvedAction, {
      namespace: plugin.name
    });
  } else if ((0, lib_exports.isAction)(resolvedAction)) {
    if (!resolvedAction.__action.actionType) {
      throw new import_error.GenkitError({
        status: "INVALID_ARGUMENT",
        message: "Action type is missing for " + resolvedAction.__action.name
      });
    }
    registry.registerAction(resolvedAction.__action.actionType, resolvedAction, {
      namespace: plugin.name
    });
  } else {
    throw new import_error.GenkitError({
      status: "INVALID_ARGUMENT",
      message: "Unknown action type returned from plugin " + plugin.name
    });
  }
}
function genkit(options) {
  return new Genkit(options);
}
function __disableReflectionApi() {
  disableReflectionApi = true;
}
function toModelRef(modelArg) {
  if (modelArg === void 0) {
    return void 0;
  }
  if (typeof modelArg === "string") {
    return (0, import_model.modelRef)({
      name: modelArg
    });
  }
  if (modelArg.name) {
    return modelArg;
  }
  const modelAction = modelArg;
  return (0, import_model.modelRef)({
    name: modelAction.__action.name
  });
}
var import_logging, import_plugin, import_registry, import_tracing2, Genkit, shutdown, disableReflectionApi;
var init_genkit = __esm({
  "node_modules/genkit/lib/genkit.mjs"() {
    init_lib2();
    init_embedder();
    init_evaluator();
    init_formats();
    init_model();
    init_reranker();
    init_retriever();
    init_tool();
    init_lib();
    init_async();
    import_logging = __toESM(require_logging(), 1);
    import_plugin = __toESM(require_plugin(), 1);
    import_registry = __toESM(require_registry(), 1);
    import_tracing2 = __toESM(require_tracing(), 1);
    Genkit = class extends import_genkit_ai.GenkitAI {
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
        if ((0, lib_exports.isDevEnv)() && !disableReflectionApi) {
          this.reflectionServer = new lib_exports.ReflectionServer(this.registry, {
            configuredEnvs: ["dev"],
            name: this.options.name
          });
          this.reflectionServer.start().catch((e) => import_logging.logger.error);
        }
        if (options?.clientHeader) {
          setClientHeader(options?.clientHeader);
        }
      }
      /**
       * Defines and registers a flow function.
       */
      defineFlow(config, fn) {
        const flow = (0, import_flow.defineFlow)(this.registry, config, fn);
        this.flows.push(flow);
        return flow;
      }
      defineTool(config, fn) {
        return (0, import_tool.defineTool)(this.registry, config, fn);
      }
      /**
       * Defines a dynamic tool. Dynamic tools are just like regular tools ({@link Genkit.defineTool}) but will not be registered in the
       * Genkit registry and can be defined dynamically at runtime.
       */
      dynamicTool(config, fn) {
        return dynamicTool(config, fn);
      }
      /**
       * Defines and registers a dynamic action provider (e.g. mcp host)
       */
      defineDynamicActionProvider(config, fn) {
        return (0, import_dynamic_action_provider.defineDynamicActionProvider)(this.registry, config, fn);
      }
      /**
       * Defines and registers a schema from a Zod schema.
       *
       * Defined schemas can be referenced by `name` in prompts in place of inline schemas.
       */
      defineSchema(name, schema) {
        return (0, import_schema.defineSchema)(this.registry, name, schema);
      }
      /**
       * Defines and registers a schema from a JSON schema.
       *
       * Defined schemas can be referenced by `name` in prompts in place of inline schemas.
       */
      defineJsonSchema(name, jsonSchema) {
        return (0, import_schema.defineJsonSchema)(this.registry, name, jsonSchema);
      }
      /**
       * Defines a new model and adds it to the registry.
       */
      defineModel(options, runner) {
        return defineModel(this.registry, options, runner);
      }
      /**
       * Defines a new background model and adds it to the registry.
       */
      defineBackgroundModel(options) {
        return defineBackgroundModel(this.registry, options);
      }
      /**
       * Looks up a prompt by `name` (and optionally `variant`). Can be used to lookup
       * .prompt files or prompts previously defined with {@link Genkit.definePrompt}
       */
      prompt(name, options) {
        return this.wrapExecutablePromptPromise(`${name}${options?.variant ? `.${options?.variant}` : ""}`, (0, import_prompt.prompt)(this.registry, name, __spreadProps(__spreadValues({}, options), {
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
          let channel = new Channel();
          const generated = (0, import_tracing2.runInNewSpan)(this.registry, {
            metadata: {
              name,
              input
            },
            labels: {
              [import_tracing2.SPAN_TYPE_ATTR]: "dotprompt"
            }
          }, () => (0, import_generate.generate)(this.registry, promise.then((action2) => action2.render(input, __spreadProps(__spreadValues({}, opts), {
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
            throw new import_error.GenkitError({
              status: "INVALID_ARGUMENT",
              message: "Cannot specify template/function argument and `options.messages` at the same time"
            });
          }
          if (typeof templateOrFn === "string") {
            return (0, import_prompt.definePrompt)(this.registry, __spreadProps(__spreadValues({}, options), {
              messages: templateOrFn
            }));
          } else {
            return (0, import_prompt.definePrompt)(this.registry, __spreadProps(__spreadValues({}, options), {
              messages: (input) => __async(this, null, function* () {
                const response = yield templateOrFn(input);
                return response.messages;
              })
            }));
          }
        }
        return (0, import_prompt.definePrompt)(this.registry, options);
      }
      /**
       * Creates a retriever action for the provided {@link RetrieverFn} implementation.
       */
      defineRetriever(options, runner) {
        return defineRetriever(this.registry, options, runner);
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
        return defineSimpleRetriever(this.registry, options, handler);
      }
      /**
       * Creates an indexer action for the provided {@link IndexerFn} implementation.
       */
      defineIndexer(options, runner) {
        return defineIndexer(this.registry, options, runner);
      }
      /**
       * Creates evaluator action for the provided {@link EvaluatorFn} implementation.
       */
      defineEvaluator(options, runner) {
        return defineEvaluator(this.registry, options, runner);
      }
      /**
       * Creates embedder model for the provided {@link EmbedderFn} model implementation.
       */
      defineEmbedder(options, runner) {
        return defineEmbedder(this.registry, options, runner);
      }
      /**
       * create a handlebars helper (https://handlebarsjs.com/guide/block-helpers.html) to be used in dotprompt templates.
       */
      defineHelper(name, fn) {
        (0, import_prompt.defineHelper)(this.registry, name, fn);
      }
      /**
       * Creates a handlebars partial (https://handlebarsjs.com/guide/partials.html) to be used in dotprompt templates.
       */
      definePartial(name, source) {
        (0, import_prompt.definePartial)(this.registry, name, source);
      }
      /**
       *  Creates a reranker action for the provided {@link RerankerFn} implementation.
       */
      defineReranker(options, runner) {
        return defineReranker(this.registry, options, runner);
      }
      /**
       * Evaluates the given `dataset` using the specified `evaluator`.
       */
      evaluate(params) {
        return evaluate(this.registry, params);
      }
      /**
       * Reranks documents from a {@link RerankerArgument} based on the provided query.
       */
      rerank(params) {
        return rerank(this.registry, params);
      }
      /**
       * Indexes `documents` using the provided `indexer`.
       */
      index(params) {
        return index(this.registry, params);
      }
      /**
       * Retrieves documents from the `retriever` based on the provided `query`.
       */
      retrieve(params) {
        return retrieve(this.registry, params);
      }
      /**
       * Configures the Genkit instance.
       */
      configure() {
        const activeRegistry = this.registry;
        (0, import_action.defineGenerateAction)(activeRegistry);
        configureFormats(activeRegistry);
        const plugins = [...this.options.plugins ?? []];
        if (this.options.model) {
          this.registry.registerValue("defaultModel", "defaultModel", toModelRef(this.options.model));
        }
        if (this.options.promptDir !== null) {
          (0, import_prompt.loadPromptFolder)(this.registry, this.options.promptDir ?? "./prompts", "");
        }
        plugins.forEach((plugin) => {
          if ((0, import_plugin.isPluginV2)(plugin)) {
            let _a;
            import_logging.logger.debug(`Registering v2 plugin ${plugin.name}...`);
            plugin.middleware?.()?.forEach((middleware) => {
              activeRegistry.registerValue("middleware", middleware.name, middleware);
            });
            activeRegistry.registerPluginProvider(plugin.name, {
              name: plugin.name,
              initializer() {
                return __async(this, null, function* () {
                  import_logging.logger.debug(`Initializing plugin ${plugin.name}:`);
                  if (!plugin.init) return;
                  const resolvedActions = yield plugin.init();
                  resolvedActions?.forEach((resolvedAction) => {
                    registerActionV2(activeRegistry, resolvedAction, plugin);
                  });
                });
              },
              resolver(action2, target) {
                return __async(this, null, function* () {
                  if (!plugin.resolve) return;
                  const resolvedAction = yield plugin.resolve(action2, target);
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
            import_logging.logger.debug(`Registering plugin ${loadedPlugin.name}...`);
            activeRegistry.registerPluginProvider(loadedPlugin.name, {
              name: loadedPlugin.name,
              initializer() {
                return __async(this, null, function* () {
                  import_logging.logger.debug(`Initializing plugin ${loadedPlugin.name}:`);
                  yield loadedPlugin.initializer();
                });
              },
              resolver(action2, target) {
                return __async(this, null, function* () {
                  if (loadedPlugin.resolver) {
                    yield loadedPlugin.resolver(action2, target);
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
    shutdown = () => __async(null, null, function* () {
      import_logging.logger.debug("Shutting down all Genkit servers...");
      yield lib_exports.ReflectionServer.stopAll();
      process.exit(0);
    });
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
    disableReflectionApi = false;
  }
});

// node_modules/genkit/lib/genkit-beta.js
var require_genkit_beta = __commonJS({
  "node_modules/genkit/lib/genkit-beta.js"(exports, module) {
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
    var genkit_beta_exports = {};
    __export2(genkit_beta_exports, {
      GenkitBeta: () => GenkitBeta,
      genkit: () => genkit2
    });
    module.exports = __toCommonJS2(genkit_beta_exports);
    var import_ai2 = require_lib();
    var import_formats2 = require_formats();
    var import_session = require_session();
    var import_uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
    var import_genkit = (init_genkit(), __toCommonJS(genkit_exports));
    function genkit2(options) {
      return new GenkitBeta(options);
    }
    var GenkitBeta = class extends import_genkit.Genkit {
      constructor(options) {
        super(options);
        this.registry.apiStability = "beta";
      }
      /**
       * Create a chat session with the provided options.
       *
       * ```ts
       * const chat = ai.chat({
       *   system: 'talk like a pirate',
       * })
       * let response = await chat.send('tell me a joke')
       * response = await chat.send('another one')
       * ```
       *
       * @beta
       */
      chat(preambleOrOptions, maybeOptions) {
        let options;
        let preamble;
        if (maybeOptions) {
          options = maybeOptions;
        }
        if (preambleOrOptions) {
          if ((0, import_ai2.isExecutablePrompt)(preambleOrOptions)) {
            preamble = preambleOrOptions;
          } else {
            options = preambleOrOptions;
          }
        }
        const session = this.createSession();
        if (preamble) {
          return session.chat(preamble, options);
        }
        return session.chat(options);
      }
      /**
       * Create a session for this environment.
       */
      createSession(options) {
        const sessionId = options?.sessionId?.trim() || (0, import_uuid.v4)();
        const sessionData = {
          id: sessionId,
          state: options?.initialState
        };
        return new import_session.Session(this.registry, {
          id: sessionId,
          sessionData,
          store: options?.store
        });
      }
      /**
       * Loads a session from the store.
       *
       * @beta
       */
      loadSession(sessionId, options) {
        return __async(this, null, function* () {
          if (!options.store) {
            throw new Error("options.store is required");
          }
          const sessionData = yield options.store.get(sessionId);
          return new import_session.Session(this.registry, {
            id: sessionId,
            sessionData,
            store: options.store
          });
        });
      }
      /**
       * Gets the current session from async local storage.
       *
       * @beta
       */
      currentSession() {
        const currentSession = (0, import_session.getCurrentSession)(this.registry);
        if (!currentSession) {
          throw new import_session.SessionError("not running within a session");
        }
        return currentSession;
      }
      /**
       * Defines and registers a custom model output formatter.
       *
       * Here's an example of a custom JSON output formatter:
       *
       * ```ts
       * import { extractJson } from 'genkit/extract';
       *
       * ai.defineFormat(
       *   { name: 'customJson' },
       *   (schema) => {
       *     let instructions: string | undefined;
       *     if (schema) {
       *       instructions = `Output should be in JSON format and conform to the following schema:
       * \`\`\`
       * ${JSON.stringify(schema)}
       * \`\`\`
       * `;
       *     }
       *     return {
       *       parseChunk: (chunk) => extractJson(chunk.accumulatedText),
       *       parseMessage: (message) => extractJson(message.text),
       *       instructions,
       *     };
       *   }
       * );
       *
       * const { output } = await ai.generate({
       *   prompt: 'Invent a menu item for a pirate themed restaurant.',
       *   output: { format: 'customJson', schema: MenuItemSchema },
       * });
       * ```
       *
       * @beta
       */
      defineFormat(options, handler) {
        return (0, import_formats2.defineFormat)(this.registry, options, handler);
      }
      /**
       * Defines and registers an interrupt.
       *
       * Interrupts are special tools that halt model processing and return control back to the caller. Interrupts make it simpler to implement
       * "human-in-the-loop" and out-of-band processing patterns that require waiting on external actions to complete.
       *
       * @beta
       */
      defineInterrupt(config) {
        return (0, import_ai2.defineInterrupt)(this.registry, config);
      }
      /**
       * Starts a generate operation for long running generation models, typically for
       * video and complex audio generation.
       *
       * See {@link GenerateOptions} for detailed information about available options.
       *
       * ```ts
       * const operation = await ai.generateOperation({
       *   model: googleAI.model('veo-2.0-generate-001'),
       *   prompt: 'A banana riding a bicycle.',
       * });
       * ```
       *
       * The status of the operation and final result can be obtained using {@link Genkit.checkOperation}.
       */
      generateOperation(opts) {
        return (0, import_ai2.generateOperation)(this.registry, opts);
      }
      /**
       * Defines a resource. Resources can then be accessed from a generate call.
       *
       * ```ts
       * ai.defineResource({
       *   uri: 'my://resource/{param}',
       *   description: 'provides my resource',
       * }, async ({param}) => {
       *   return [{ text: `resource ${param}` }]
       * });
       *
       * await ai.generate({
       *   prompt: [{ resource: 'my://resource/value' }]
       * })
       */
      defineResource(opts, fn) {
        return (0, import_ai2.defineResource)(this.registry, opts, fn);
      }
    };
  }
});

export {
  lazy,
  AsyncTaskQueue,
  init_async,
  require_genkit_beta
};
//# sourceMappingURL=chunk-EAO7QYPM.js.map
