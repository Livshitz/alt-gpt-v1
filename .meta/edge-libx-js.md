# edge.libx.js: Self-Contained Usage & Implementation Guide

> [edge.libx.js GitHub](https://github.com/Livshitz/edge.libx.js)

Provider-agnostic, edge-compatible, itty-router microrouter wrapper for multi-route endpoints on any provider (Cloudflare, Vercel, Google Cloud, Netlify, etc). This guide is self-contained and includes generalized code examples suitable for any project.

---

## Features
- Provider-agnostic, edge/serverless compatible
- itty-router API with extra utilities
- Multi-route endpoints, nested routers
- TypeScript support
- Built-in CORS, error, and JSON helpers

---

## Installation

```sh
bun add edge.libx.js
# or
yarn add edge.libx.js
# or
npm install --save edge.libx.js
```

---

## Basic Router Setup

```ts
import { RouterWrapper } from 'edge.libx.js';

const routerWrapper = RouterWrapper.getNew('');

routerWrapper.router.all('/ping', async (req) => {
  return new Response(JSON.stringify({ message: 'pong' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

routerWrapper.router.all('/', (req) => {
  return new Response('ok', { status: 200 });
});

routerWrapper.catchNotFound();

const server = routerWrapper.createServerAdapter();
export default server.handle;
```

---

## Nested Routers & Versioning

```ts
import { RouterWrapper } from 'edge.libx.js';

function getSubRouter(base = '') {
  const subRouter = RouterWrapper.getNew(base);
  subRouter.router.get('/sub', (req) => new Response('Sub route!'));
  return subRouter;
}

const apiRouter = RouterWrapper.getNew('/v1');
apiRouter.registerRoute('/v1', getSubRouter);
apiRouter.catchNotFound();

export default apiRouter.createServerAdapter().handle;
```

---

## Example: Custom Route Handler

```ts
import { RouterWrapper } from 'edge.libx.js';

const askRouter = RouterWrapper.getNew('/ask');

askRouter.router.post('/', async (req) => {
  const { question } = await req.json();
  if (!question) {
    return new Response(JSON.stringify({ error: 'question is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  // Replace with your own logic
  const answer = `Echo: ${question}`;
  return new Response(JSON.stringify({ answer }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

export default askRouter.createServerAdapter().handle;
```

---

## Key Concepts

- **RouterWrapper**: Main entry for creating routers. Supports nested routers and route registration.
- **registerRoute(path, routerFactory)**: Mounts a sub-router at a given path. The routerFactory can be a function returning a router or a RouterWrapper instance.
- **router.all(path, handler)**: Register a handler for all HTTP methods at a path.
- **router.post/get/put/delete(path, handler)**: Register a handler for a specific HTTP method.
- **catchNotFound()**: Adds a catch-all 404 handler.
- **createServerAdapter()**: Returns an adapter for edge/serverless platforms.

---

## Example: Minimal API

```ts
import { RouterWrapper } from 'edge.libx.js';

const routerWrapper = RouterWrapper.getNew('/v1');
routerWrapper.router.get('/hello', (req) => new Response('Hello, world!'));
routerWrapper.catchNotFound();

export default routerWrapper.createServerAdapter().handle;
```

---

## References
- [Official GitHub](https://github.com/Livshitz/edge.libx.js)

---

*Last updated: 2025-06* 