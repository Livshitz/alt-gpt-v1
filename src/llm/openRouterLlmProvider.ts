import { ILlmProvider } from './ILlmProvider';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY! });

export const openRouterLlmProvider: ILlmProvider = {
	id: 'openrouter',
	name: 'OpenRouter (Vercel AI SDK)',
	async chat(messages, options = {}) {
		const modelSlug = options.model || 'anthropic/claude-3.5-sonnet';
		const prompt = messages.map(m => `${m.role === 'system' ? '' : m.role + ': '}${m.content}`).join('\n');
		const { text } = await generateText({
			model: openrouter.chat(modelSlug),
			prompt,
			...(options.settings || {})
		});
		return { response: text };
	},
	async listModels() {
		// OpenRouter supports many models; for demo, return a static list
		return [
			'anthropic/claude-3.5-sonnet',
			'openai/gpt-4o',
			'google/gemini-flash-1.5',
			'mistralai/mistral-large',
			'meta-llama/llama-3-70b-instruct',
		];
	},
}; 