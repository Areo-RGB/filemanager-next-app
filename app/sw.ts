/// <reference lib="webworker" />
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that points to the list of precache entries.
// By default, it's `self.__SW_MANIFEST`.
declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
    precacheEntries: [], // ZERO CACHING: Do not precache anything
    runtimeCaching: [], // ZERO CACHING: Do not cache runtime requests
    skipWaiting: true,
    clientsClaim: true,
    fallbacks: {
        entries: [],
    },
});

serwist.addEventListeners();
