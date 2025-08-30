/// <reference types="node" />

import alchemy from "alchemy";
import { DurableObjectNamespace, Worker } from "alchemy/cloudflare";

const app = await alchemy("hello-world-do-template");

// Durable Object namespace for MyDurableObject with SQLite support
export const durableObject = await DurableObjectNamespace("MyDurableObject", {
  className: "MyDurableObject",
  sqlite: true,
});

// Main worker configuration
export const worker = await Worker("worker", {
  name: "hello-world-do-template",
  entrypoint: "src/index.ts",
  url: true, // Enable workers.dev URL
  bindings: {
    MY_DURABLE_OBJECT: durableObject,
  },
  compatibilityDate: "2025-04-01",
});

console.log({
  url: worker.url,
});

await app.finalize();