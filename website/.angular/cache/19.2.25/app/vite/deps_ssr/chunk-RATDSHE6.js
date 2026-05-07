import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  __async,
  __commonJS
} from "./chunk-PNXJXBRO.js";

// node_modules/@genkit-ai/core/lib/async.js
var require_async = __commonJS({
  "node_modules/@genkit-ai/core/lib/async.js"(exports, module) {
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
    var async_exports = {};
    __export(async_exports, {
      AsyncTaskQueue: () => AsyncTaskQueue,
      Channel: () => Channel,
      LazyPromise: () => LazyPromise,
      createTask: () => createTask,
      lazy: () => lazy
    });
    module.exports = __toCommonJS(async_exports);
    function createTask() {
      let resolve, reject;
      const promise = new Promise((res, rej) => [resolve, reject] = [res, rej]);
      return {
        resolve,
        reject,
        promise
      };
    }
    var Channel = class {
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
    var LazyPromise = class {
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
    function lazy(fn) {
      return new LazyPromise((resolve, reject) => {
        try {
          resolve(fn());
        } catch (e) {
          reject(e);
        }
      });
    }
    var AsyncTaskQueue = class {
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

export {
  require_async
};
//# sourceMappingURL=chunk-RATDSHE6.js.map
