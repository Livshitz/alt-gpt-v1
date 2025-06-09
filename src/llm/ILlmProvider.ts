export interface ILlmProvider {
	id: string;
	name: string;
	chat(messages: Array<{ role: string; content: string }>, options?: Record<string, any>): Promise<{ response: string; usage?: any }>;
	listModels?(): Promise<string[]>;
} 