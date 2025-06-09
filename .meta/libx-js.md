# libx.js: Self-Contained Usage & Implementation Guide

> [libx.js GitHub](https://github.com/Livshitz/libx.js)

libx.js is a powerful, modular toolbelt full of useful helpers and utilities for Node.js and web applications. This guide is self-contained and includes generalized code examples and a comprehensive list of all available modules, helpers, and extensions.

---

## Features
- Modular and flexible: import only what you need
- Supports JavaScript and TypeScript
- Works in Node.js and browsers (browserify/bundler friendly)
- Rich set of modules: Dependency Injection, Logging, Networking, Pub/Sub, Data structures, Crypto, CLI helpers, and more
- Unified API for many common tasks

---

## Installation

```sh
yarn add libx.js
# or
npm install --save libx.js
```

For browser usage, you can also use the CDN:

```
https://cdn.jsdelivr.net/npm/libx.js@latest/dist/libx.min.js
```

---

## Example: Importing and Using Modules

```ts
// Import the essentials bundle (recommended for most use cases)
import { libx } from 'libx.js/build/bundles/essentials';

// Or import specific modules
import { log, network, queue, helpers } from 'libx.js';

// Logging
libx.log.info('Hello from libx.js!');
libx.log.debug('Debug message');

// Networking (works in both Node and browser)
const response = await libx.network.get('https://api.example.com/data');
console.log('Data:', response);

// Pub/Sub (Callbacks)
const cb = new libx.Callbacks();
cb.add((msg) => console.log('Received:', msg));
cb.fire('Hello!');

// Data structures
const queue = new libx.Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 1

// Helpers
console.log(libx.helpers.capitalize('hello world'));
console.log(libx.helpers.formatDate(new Date()));
```

---

## Comprehensive Module & Helper Reference

### Core Modules
- **Dependency Injection**: Lightweight DI container
- **Log**: Flexible logger with levels, formatting, filtering
- **Network**: HTTP(S) requests, upload, download, unified API for Node and browser
- **Callbacks**: Simple pub/sub event system
- **Queue**: FIFO queue
- **QueueWorker**: Async/concurrent work manager
- **Streams**: Stream helpers
- **Time/Measurement**: Time utilities, measurement, delays, throttling, debouncing
- **Hash**: Hashing helpers
- **Crypto**: Crypto helpers
- **BinaryHeap**: Min/max heap data structure
- **LinkedNode**: Linked list and tree structures
- **DataStore**: Simple client-side cache
- **Cache**: General cache mechanism
- **ProxyCache**: Proxy-based cache
- **SSE**: Server-Sent Events helpers
- **Request**: HTTP request helpers
- **ObjectIdentifiers**: Object ID helpers
- **ExpiryManager**: Expiry/TTL management
- **EventsStream**: Event stream helpers
- **DeepProxy**: Deep proxy utilities
- **Redux/RxJS**: Integrations

### Specialized/Advanced Modules
- **Firebase**: User management, Firestore proxy, Firebase module
- **PseudoRandom**: Multiple pseudo-random number generators (Xorshift, Lehmer, MiddleSquares, LCG, etc.)
- **EdgeNetwork**: Edge networking helpers
- **LocalStorageMock**: LocalStorage polyfill/mock
- **BitwiseEnumHelper**: Bitwise enum helpers

### Helpers (Selected Highlights)
- **Concurrency**: `Deferred`, `throttle`, `debounce`, `delay`, `async`, `waitUntil`, `chainTasks`, `concurrent`, `sleep`
- **Object**: `clone`, `merge`, `diff`, `isObject`, `isString`, `isFunction`, `isArray`, `isEmpty`, `getDeep`, `makeEmpty`, `spawnHierarchy`, `objectToKeyValue`, `keyValueToObject`, `flatterObjectToDotNotation`, `getObjectHash`, `excludeKeys`
- **String**: `capitalize`, `ellipsis`, `kebabCase`, `camelize`, `padNumber`, `contains`, `hashCode`, `endsWith`, `startsWith`, `isEmpty`, `format`, `replaceAt`, `replaceAll`, `getAbbreviation`, `isDateString`
- **Date**: `isValid`, `format`, `formatx`, `fromJson`, `toJson`, `addHours`, `addMinutes`, `addDays`, `addMilliseconds`, `toUTC`, `toISOStringUTC`, `toTimezone`
- **Array**: `diff`, `myFilter`, `contains`, `myFilterSingle`, `remove`, `removeAt`, `move`, `last`, `removeDuplicates`, `removeEmpty`
- **Number**: `toFixedNum`
- **Enum**: `combine`, `has`, `doesNotHave`, `getValues`, `getValueNames`
- **CSV/JSON**: `csvToJson`, `jsonToCsv`
- **Math/Stats**: `median`, `average`, `std`
- **URL**: `parseUrl`, `toQueryString`, `fixUrl`, `cleanUrl`
- **Color**: `hexc`, `stringToColour`
- **Misc**: `newGuid`, `parseJsonFileStripComments`, `parseConfig`, `formatify`, `humanizeTime`, `bumpVersion`, `parseSemVer`, `dictToArray`, `arrayToDic`, `escapeRegExp`, `sanitize`, `bytesToBase64`, `base64ToBytes`, etc.

---

## Prototype/Global Extensions

- **String**: `capitalize`, `ellipsis`, `kebabCase`, `camelize`, `padNumber`, `contains`, `hashCode`, `endsWith`, `startsWith`, `isEmpty`, `format`, `replaceAt`, `replaceAll`, `getAbbreviation`, `isDateString`, `removeLastPart`
- **Date**: `isValid`, `format`, `formatx`, `fromJson`, `toJson`, `addHours`, `addMinutes`, `addDays`, `addMilliseconds`, `toUTC`, `toISOStringUTC`, `toTimezone`
- **Array**: `diff`, `myFilter`, `contains`, `myFilterSingle`, `remove`, `removeAt`, `move`, `last`, `removeDuplicates`, `removeEmpty`
- **Number**: `toFixedNum`
- **Object**: `__getCustomProperties`, `__extend`

---

## Node.js Only

- **CLI Helpers**: Command-line argument parsing, shell command execution
- **BasicServer**: ExpressJS wrapper
- **Prompts**: CLI prompts
- **Program**: Node program runner

---

## Browser Only

- **Require**: Progressive script loading
- **browserHelpers**: Download, upload, inject, and more
- **AudioPlayer**: Audio playback helper

---

## Bundles

- **essentials.ts**: Pre-packaged set of most commonly used modules/helpers for easy import
- **node.essentials.ts**: Node-specific essentials
- **browser.essentials.ts**: Browser-specific essentials

---

## Firebase

- **UserManager**: User management for Firebase
- **FireProxy**: Firestore proxy
- **FirebaseModule**: Firebase integration

---

## PseudoRandom

- **XorshiftPseudoRandomness**
- **LehmerRandomNumberGenerator**
- **MiddleSquaresPseudoRandomness**
- **LCGPseudoRandomness**
- **IPseudoRandomGenerator**

---

## Example: Using in Browser

```html
<script src="https://cdn.jsdelivr.net/npm/libx.js@latest/dist/libx.min.js"></script>
<script>
  // libx is available as window.libx
  libx.log.info('Hello from libx.js in the browser!');
  libx.network.get('https://api.example.com/data').then(console.log);
</script>
```

---

## Example: CLI Helpers (Node.js only)

```ts
import { cli } from 'libx.js';

// Access command-line arguments
console.log(cli.args);

// Execute a shell command
const result = await cli.exec('echo Hello World');
console.log(result.stdout); // Hello World
```

---

## Example: Custom Helpers

```ts
import { helpers } from 'libx.js';

console.log(helpers.ellipsis('This is a long string', 10)); // 'This is...'
console.log(helpers.hashCode('my string'));
console.log(helpers.deepClone({ a: 1, b: { c: 2 } }));
```

---

## Related Packages
- [concurrency.libx.js](https://github.com/Livshitz/concurrency.libx.js): Async/concurrent helpers (Deferred, Debounce, Chain, etc.)
- [di.libx.js](https://github.com/Livshitz/di.libx.js): Lightweight Dependency Injection
- [pax.libx.js](https://github.com/Livshitz/pax.libx.js): Custom bundler for browserifying and building

---

## References
- [Official GitHub](https://github.com/Livshitz/libx.js)
- [NPM Package](https://www.npmjs.com/package/libx.js)

---

*Last updated: 2025-06* 