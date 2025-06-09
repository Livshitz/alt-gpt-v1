import { ILlmProvider } from './ILlmProvider';

export const mockLlmProvider: ILlmProvider = {
	id: 'mock',
	name: 'Mock LLM',
	async chat(messages, options) {
		return { response: 'This is a mock response.', usage: { tokens: 1 } };
	},
	async listModels() {
		return ['mock-model-1', 'mock-model-2'];
	},
}; 