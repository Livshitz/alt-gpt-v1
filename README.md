# Alt-GPT

A modern, multi-provider LLM and chat platform, supporting OpenAI, Anthropic, Mistral, Google, DeepSeek, Cerebras, Groq, and more.

---

## Features
- **Unified API** for multiple LLM providers
- **Per-provider API key support**
- **Easy model selection**
- **Extensible and type-safe**
- **Bun/Node.js (TypeScript) compatible**

---

## Installation

```sh
bun install
# or
npm install
```

---

## Environment Setup

Set your API keys in a `.env` file (or pass them programmatically):

```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=...
MISTRAL_API_KEY=...
GOOGLE_API_KEY=...
GOOGLE_VERTEX_API_KEY=...
DEEPSEEK_API_KEY=...
CEREBRAS_API_KEY=...
GROQ_API_KEY=...
```

---

## Usage Example

```ts
import { AISDK, ProviderName, ChatMessage } from './src/ai/index';

const sdk = new AISDK({
  openai: process.env.OPENAI_API_KEY!,
  anthropic: process.env.ANTHROPIC_API_KEY!,
  // ...other providers
});

sdk.selectProviderModel('openai', 'gpt-4o');

const messages: ChatMessage[] = [
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Hello, who won the world cup in 2018?' },
];

const response = await sdk.chat(messages);
console.log(response);
```

### Dynamic Provider/Model Selection

```ts
await sdk.chat(messages, { provider: 'anthropic', model: 'claude-4-opus-20250514' });
```

---

## Model Metadata

Model/provider metadata is defined in [`src/ai/models.json`](src/ai/models.json):

```json
{
  "openai": {
    "gpt-4o": { "displayName": "GPT-4o", ... },
    ...
  },
  "anthropic": {
    "claude-4-opus-20250514": { ... },
    ...
  },
  ...
}
```
- Each provider maps to an object keyed by model id for fast lookup.
- Each model can have metadata: `displayName`, `formats`, `pricing`, `images`, etc.

---

## Running Tests

```sh
bun test
# or
npm test
```

---

## Credits

Ignited by the **Cloneathon** initiative by [Theo (T3 Chat)](https://x.com/theo/status/1931515264497254402).
Implementation inspired by [alt-gpt v0](https://github.com/feedox/alt-gpt-v0).

Scaffolded with [🏗 TS-scaffold](https://github.com/Livshitz/ts-scaffold.git)
