import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  AsyncTaskQueue,
  init_async,
  lazy,
  require_genkit_beta
} from "./chunk-EAO7QYPM.js";
import {
  init_lib,
  lib_exports,
  require_common
} from "./chunk-ECVKO3DF.js";
import "./chunk-OWKFXNV6.js";
import "./chunk-RATDSHE6.js";
import "./chunk-2KLBD6HR.js";
import "./chunk-Z5YJFFGF.js";
import "./chunk-2KHP64LJ.js";
import {
  __export,
  __reExport,
  __toESM
} from "./chunk-PNXJXBRO.js";

// node_modules/genkit/lib/beta.mjs
var beta_exports = {};
__export(beta_exports, {
  AsyncTaskQueue: () => AsyncTaskQueue,
  GenkitBeta: () => import_genkit_beta.GenkitBeta,
  InMemoryStreamManager: () => lib_exports.InMemoryStreamManager,
  StreamNotFoundError: () => lib_exports.StreamNotFoundError,
  genkit: () => import_genkit_beta.genkit,
  lazy: () => lazy
});
init_lib();
init_async();
__reExport(beta_exports, __toESM(require_common(), 1));
var import_genkit_beta = __toESM(require_genkit_beta(), 1);
var export_GenkitBeta = import_genkit_beta.GenkitBeta;
var export_InMemoryStreamManager = lib_exports.InMemoryStreamManager;
var export_StreamNotFoundError = lib_exports.StreamNotFoundError;
var export_genkit = import_genkit_beta.genkit;
export {
  AsyncTaskQueue,
  export_GenkitBeta as GenkitBeta,
  export_InMemoryStreamManager as InMemoryStreamManager,
  export_StreamNotFoundError as StreamNotFoundError,
  export_genkit as genkit,
  lazy
};
//# sourceMappingURL=genkit_beta.js.map
