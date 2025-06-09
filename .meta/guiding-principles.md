# Guiding Principles

## 1. Backend-Only Repository
- This project is strictly backend-only. The frontend (FE) should interact with the API seamlessly, without requiring any additional backend services or adapters.
- All features and business logic are exposed via API endpoints or CLI, never requiring a separate backend.

## 2. Good Separation of Concerns
- Maintain clear boundaries between system layers (API, business logic, data access, etc.).
- Each module should have a single, well-defined responsibility and minimal coupling to others.

## 3. Self-Contained Business Logic Modules
- Business logic must be encapsulated in self-contained, reusable, and testable modules.
- Modules should be independent of delivery mechanisms (API, CLI, etc.) and easy to compose.

## 4. Flexible Consumption: API & CLI
- The system must be consumable as:
  - An API server (deployable to any edge function or serverless environment)
  - A CLI tool (ask LLM a question, select model, and stream the response to the console)
- Avoid code duplication between API and CLI interfaces by sharing core logic.

## 5. Production-Ready
- Code should be robust, well-tested, and ready for deployment in production environments.
- Prioritize reliability, scalability, observability, and security.
- Automated tests and CI/CD pipelines are required.

## 6. Encourage Contribution
- Foster an open, welcoming environment for contributors.
- Maintain clear documentation, contribution guidelines, and code standards to make it easy for others to get involved.
- Use code reviews and constructive feedback to maintain quality.

## 7. Dependency Injection (DI) & Pluggable Implementations
- Use Dependency Injection (DI) to decouple modules and enable flexible wiring of dependencies.
- Provide both mock implementations (for tests) and local implementations (for working with local files or offline scenarios).
- All external integrations (e.g., LLM providers, storage, etc.) should have well-defined interfaces and at least one mock and one local implementation. 