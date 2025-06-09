# Core Tools & Libraries for alt-gpt-v1

## 1. libx.js
- **Description:** Modular toolbelt for Node.js and browser, providing utilities for logging, networking, pub/sub, data structures, helpers, and more.
- **Relevance:** Use for general utilities, logging, networking, helpers, and to accelerate development of core and integration modules.
- [Reference: .meta/libx-js.md](../.meta/libx-js.md)

## 2. di.libx.js
- **Description:** Lightweight, non-intrusive Dependency Injection (DI) container for Node.js, Bun, and browsers.
- **Relevance:** Use for wiring up all modules and integrations, enabling pluggable and testable architecture as per project principles.
- [Reference: .meta/di-libx-js.md](../.meta/di-libx-js.md)

## 3. edge.libx.js
- **Description:** Provider-agnostic, edge/serverless compatible router and API handler, built on itty-router with extra utilities.
- **Relevance:** Use for implementing API endpoints in a way that is compatible with edge/serverless platforms, with built-in CORS, error, and JSON helpers.
- [Reference: .meta/edge-libx-js.md](../.meta/edge-libx-js.md)

---

These tools are foundational for:
- Clean separation of concerns
- Pluggable, testable, and edge-compatible architecture
- Rapid development and maintainability 