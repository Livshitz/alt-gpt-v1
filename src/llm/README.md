# LLM Provider Module

This directory will contain provider-agnostic interfaces and implementations for language model integrations.

## Responsibilities
- Define interfaces for LLM providers
- Implement support for multiple providers (OpenAI, local, etc.)
- Enable provider selection logic
- Ensure testability and pluggability

## OpenRouter Provider (Vercel AI SDK)
- Implements `ILlmProvider` using Vercel AI SDK + @openrouter/ai-sdk-provider
- Uses `OPENROUTER_API_KEY` from `.env`
- To enable, update `src/di/container.ts` to register `openRouterLlmProvider` instead of the mock
- Supports multiple models (see static list in implementation) 