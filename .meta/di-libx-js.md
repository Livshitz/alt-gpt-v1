# di.libx.js Usage Guide

> [di.libx.js GitHub](https://github.com/Livshitz/di.libx.js)  
> Lightweight & non-intrusive Dependency Injection for Node.js, Bun, and browsers.

## Features
- **Deferred resolution**: Asynchronously require dependencies and resolve when available.
- **Automatic function param resolve**: Inject dependencies by parameter name or explicit mapping.
- **NodeJS, Bun & browser support**: Works everywhere, browserified version available via CDN.
- **Explicit/implicit dependencies**: Works with uglified code by specifying dependency names.
- **Typescript support**: Type-safe injection.
- **Non-intrusive**: Register any module, including 3rd-party, without code changes.
- **Proxy access**: Use a proxy for automatic async resolution.

---

## Installation

```sh
yarn add di.libx.js
# or
npm install --save di.libx.js
```

---

## Basic Usage

```ts
import DependencyInjector from 'di.libx.js';
// const DependencyInjector = require('di.libx.js');

const di = new DependencyInjector();

const myFunc = () => {
    console.log('This is myFunc');
};

di.register('func', myFunc);

di.inject((func, anonFunc) => {
    func();
    anonFunc();
});

di.register('anonFunc', () => console.log('Anonymous func'));
```

---

## Advanced Usage

### Proxy Access

```ts
const di = new DependencyInjector();

di.register('myService', {
    async getData() {
        return 'data';
    }
});

const result = await di.proxy.myService.getData();
console.log(result); // 'data'
```

### Register Async Module

```ts
await di.registerAsync('asyncModule', Promise.resolve({ value: 'async value' }));
```

### Register with No Override Protection

```ts
await di.register('protectedModule', 'value', true); // throws if module exists
```

### Inject and Register

```ts
await di.injectAndRegister('newModule', (existingModule) => {
    return {
        value: existingModule.value + ' enhanced'
    };
});
```

---

## More Examples

### Synchronously Get a Module

```ts
const mod = await di.require('myModule');
```

### Register New Module with Dependencies

```ts
const mod = di.injectAndRegister('myNewModule', (myModule) => {
    return () => console.log('this came from myNewModule!', myModule);
});
```

### Inject for Uglified Code

```ts
libx.di.inject(
    (myUglifiedModule) => {
        console.log('unglified dependency resolved!', myUglifiedModule);
    },
    ['myModule']
);
```

---

## Sub-Container (Scoped DI)

```ts
const subContainer = new DependencyInjector(di);
subContainer.register('moduleB', di.initiate(ModuleB));

subContainer.inject((moduleB) => {
    const result = moduleB.Run(10);
    console.log('Result: ', result);
}).then(() => {
    console.log('DONE!');
});
```

---

## Testing & Development

- **Build:** `yarn build`
- **Watch & Build:** `yarn watch`
- **Run tests:** `yarn test`

---

## References
- [Official GitHub](https://github.com/Livshitz/di.libx.js)
- [Medium Article](https://livshitz.medium.com/di-libx-js-c2e07a9e919)

---

*Last updated: 2025-06* 