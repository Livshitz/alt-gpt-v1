// AI SDK for interacting with LLMs via the 'ai' npm package

import { generateText as _generateText } from 'ai';
import { openai, createOpenAI } from '@ai-sdk/openai';
import { anthropic, createAnthropic } from '@ai-sdk/anthropic';
import { mistral, createMistral } from '@ai-sdk/mistral';
import { google, createGoogleGenerativeAI } from '@ai-sdk/google';
import { vertex } from '@ai-sdk/google-vertex';
import { deepseek, createDeepSeek } from '@ai-sdk/deepseek';
import { cerebras, createCerebras } from '@ai-sdk/cerebras';
import { groq, createGroq } from '@ai-sdk/groq';
import providersModels from './models.json';
import dotenv from 'dotenv';
dotenv.config();

export function generateTextWrapper(...args: Parameters<typeof _generateText>) {
	return _generateText(...args);
}

export interface ChatMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

export type ProviderName = keyof typeof providersModels;
export type ModelName = string;

export class AISDK {
	private apiKeys: Partial<Record<ProviderName, string>> = {};
	private provider: ProviderName = 'openai';
	private model: ModelName = 'gpt-4o';

	private static providerEnvMap: Record<ProviderName, string> = {
		openai: 'OPENAI_API_KEY',
		anthropic: 'ANTHROPIC_API_KEY',
		mistral: 'MISTRAL_API_KEY',
		'google-generative-ai': 'GOOGLE_API_KEY',
		'google-vertex': 'GOOGLE_VERTEX_API_KEY',
		deepseek: 'DEEPSEEK_API_KEY',
		cerebras: 'CEREBRAS_API_KEY',
		groq: 'GROQ_API_KEY',
	};

	constructor(apiKeys?: Partial<Record<ProviderName, string>>) {
		if (apiKeys) this.apiKeys = apiKeys;
	}

	setKey(keys: Partial<Record<ProviderName, string>>) {
		this.apiKeys = { ...this.apiKeys, ...keys };
	}

	private getApiKey(provider: ProviderName): string | null {
		if (this.apiKeys[provider]) return this.apiKeys[provider]!;
		const envVar = AISDK.providerEnvMap[provider];
		return process.env[envVar] || null;
	}

	/**
	 * Select provider and model for subsequent calls.
	 * Accepts 'provider/model' or (provider, model).
	 */
	selectProviderModel(modelOrProvider: string, modelName?: string) {
		let provider: ProviderName;
		let model: ModelName;
		if (modelName === undefined) {
			// Expecting 'provider/model' format
			if (typeof modelOrProvider !== 'string' || !modelOrProvider.includes('/')) {
				throw new Error("model must be in 'provider/model' format");
			}
			[provider, model] = modelOrProvider.split('/', 2) as [ProviderName, ModelName];
		} else {
			provider = modelOrProvider as ProviderName;
			model = modelName;
		}
		const models = providersModels[provider] as Record<string, any>;
		if (!models) throw new Error(`Unknown provider: ${provider}`);
		if (!models[model]) throw new Error(`Model ${model} not found for provider ${provider}`);
		this.provider = provider;
		this.model = model;
	}

	/**
	 * List all available providers and models (full metadata).
	 */
	listProvidersModels() {
		return providersModels;
	}

	/**
	 * List model ids for the current provider.
	 */
	listModels(): string[] {
		const models = providersModels[this.provider] as Record<string, any>;
		return Object.keys(models);
	}

	/**
	 * List full model objects (with metadata) for the current provider.
	 */
	listModelObjects(): { id: string; displayName?: string; formats?: any; pricing?: any; images?: boolean }[] {
		const models = providersModels[this.provider] as Record<string, any>;
		return Object.entries(models).map(([id, obj]) => ({ id, ...obj }));
	}

	async chat(
		messages: ChatMessage[],
		options?: { model?: string; systemPrompt?: string }
	): Promise<string> {
		let provider: ProviderName = this.provider;
		let model: ModelName = this.model;
		if (options?.model) {
			if (options.model.includes('/')) {
				[provider, model] = options.model.split('/', 2) as [ProviderName, ModelName];
			} else {
				model = options.model;
			}
		}
		const apiKey = this.getApiKey(provider);
		if (!apiKey) throw new Error('API key not set for provider: ' + provider);
		if (!messages || !Array.isArray(messages) || messages.length === 0) {
			throw new Error('Messages array is required');
		}
		const system = options?.systemPrompt || messages.find(m => m.role === 'system')?.content || 'You are a helpful assistant.';
		const userPrompt = messages.filter(m => m.role === 'user').map(m => m.content).join('\n');
		let modelInstance: any;
		if (provider === 'openai') {
			const openaiWithKey = createOpenAI({ apiKey });
			modelInstance = openaiWithKey(model);
		} else if (provider === 'anthropic') {
			const anthropicWithKey = createAnthropic({ apiKey });
			modelInstance = anthropicWithKey(model);
		} else if (provider === 'mistral') {
			const mistralWithKey = createMistral({ apiKey });
			modelInstance = mistralWithKey(model);
		} else if (provider === 'google-generative-ai') {
			const googleWithKey = createGoogleGenerativeAI({ apiKey });
			modelInstance = googleWithKey(model);
		} else if (provider === 'google-vertex') {
			modelInstance = vertex(model);
		} else if (provider === 'deepseek') {
			const deepseekWithKey = createDeepSeek({ apiKey });
			modelInstance = deepseekWithKey(model);
		} else if (provider === 'cerebras') {
			const cerebrasWithKey = createCerebras({ apiKey });
			modelInstance = cerebrasWithKey(model);
		} else if (provider === 'groq') {
			const groqWithKey = createGroq({ apiKey });
			modelInstance = groqWithKey(model);
		} else {
			throw new Error(`Provider ${provider} not implemented yet in SDK.`);
		}
		try {
			const { text } = await generateTextWrapper({
				model: modelInstance,
				system,
				prompt: userPrompt,
			});
			return text;
		} catch (err) {
			throw new Error(`AI chat error: ${err instanceof Error ? err.message : String(err)}`);
		}
	}
}

export default new AISDK();
