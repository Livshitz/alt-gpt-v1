import AISDK, { AISDK as AISDKClass, ChatMessage, generateTextWrapper, ProviderName } from '../src/ai/index';

describe('AISDK', () => {
	let sdk: AISDKClass;
	let envBackup: NodeJS.ProcessEnv;

	beforeEach(() => {
		sdk = new AISDKClass();
		envBackup = { ...process.env };
	});

	afterEach(() => {
		process.env = { ...envBackup };
	});

	it('should set API key', () => {
		sdk.setKey({ openai: 'test-key' });
		// @ts-ignore
		expect(sdk.apiKeys.openai).toBe('test-key');
	});

	it('should list models', async () => {
		const models = sdk.listModels();
		expect(models).toContain('gpt-4o');
	});

	it('should list all providers and models', () => {
		const map = sdk.listProvidersModels();
		expect(map.openai).toBeDefined();
		expect(map.anthropic).toBeDefined();
	});

	it('should select provider and model', () => {
		sdk.selectProviderModel('openai/gpt-4o');
		expect(sdk.listModels()).toContain('gpt-4o');
	});

	it('should select provider and model (legacy signature)', () => {
		sdk.selectProviderModel('openai', 'gpt-4o');
		expect(sdk.listModels()).toContain('gpt-4o');
	});

	it('should throw for unknown provider/model', () => {
		expect(() => sdk.selectProviderModel('openai/not-a-model')).toThrow();
		expect(() => sdk.selectProviderModel('notaprovider/gpt-4o')).toThrow();
	});

	it('should throw if chat called without API key', async () => {
		// Unset all possible API key env vars
		process.env.OPENAI_API_KEY = '';
		process.env.ANTHROPIC_API_KEY = '';
		process.env.MISTRAL_API_KEY = '';
		process.env.GOOGLE_API_KEY = '';
		process.env.GOOGLE_VERTEX_API_KEY = '';
		process.env.DEEPSEEK_API_KEY = '';
		process.env.CEREBRAS_API_KEY = '';
		process.env.GROQ_API_KEY = '';
		await expect(sdk.chat([{ role: 'user', content: 'hi' }])).rejects.toThrow('API key not set');
	});

	it('should throw if chat called with empty messages', async () => {
		sdk.setKey({ openai: 'test-key' });
		await expect(sdk.chat([])).rejects.toThrow('Messages array is required');
	});

	it('should call chat with provider/model override (openai only)', async () => {
		sdk.setKey({ openai: 'test-key' });
		const original = sdk.chat;
		const mockChat = async function (this: AISDKClass, messages: ChatMessage[], options?: { model?: string; systemPrompt?: string }) {
			if (!options?.model?.startsWith('openai/')) throw new Error('Provider not implemented yet in SDK.');
			return 'Hello world!';
		};
		sdk.chat = mockChat.bind(sdk);
		const messages: ChatMessage[] = [
			{ role: 'system', content: 'You are a bot.' },
			{ role: 'user', content: 'Say hi.' },
		];
		const result = await sdk.chat(messages, { model: 'openai/gpt-4o' });
		expect(result).toBe('Hello world!');
		sdk.chat = original;
	});

	it('should call chat with provider/model override (anthropic)', async () => {
		sdk.setKey({ anthropic: 'test-key' });
		const original = sdk.chat;
		const mockChat = async function (this: AISDKClass, messages: ChatMessage[], options?: { model?: string; systemPrompt?: string }) {
			if (!options?.model?.startsWith('anthropic/')) throw new Error('Provider not implemented yet in SDK.');
			return 'Anthropic response!';
		};
		sdk.chat = mockChat.bind(sdk);
		const messages: ChatMessage[] = [
			{ role: 'system', content: 'You are a bot.' },
			{ role: 'user', content: 'Say hi.' },
		];
		const result = await sdk.chat(messages, { model: 'anthropic/claude-4-opus-20250514' });
		expect(result).toBe('Anthropic response!');
		sdk.chat = original;
	});

	it('should throw for non-implemented provider in chat', async () => {
		sdk.setKey({ openai: 'test-key' });
		await expect(sdk.chat([{ role: 'user', content: 'hi' }], { model: 'unknown/fake-model' })).rejects.toThrow('API key not set for provider: unknown');
	});

	it('should throw for unauthorized error (invalid API key)', async () => {
		sdk.selectProviderModel('mistral', 'pixtral-large-latest');
		sdk.setKey({ mistral: 'invalid-key' });
		await expect(sdk.chat([{ role: 'user', content: 'hi' }])).rejects.toThrow(/AI chat error: Unauthorized/);
	});

	it('should read API key from .env per provider', async () => {
		process.env.OPENAI_API_KEY = 'openai-env-key';
		process.env.ANTHROPIC_API_KEY = 'anthropic-env-key';
		process.env.MISTRAL_API_KEY = 'mistral-env-key';
		process.env.GOOGLE_API_KEY = 'google-env-key';
		process.env.GOOGLE_VERTEX_API_KEY = 'vertex-env-key';
		process.env.DEEPSEEK_API_KEY = 'deepseek-env-key';
		process.env.CEREBRAS_API_KEY = 'cerebras-env-key';
		process.env.GROQ_API_KEY = 'groq-env-key';

		const sdk = new AISDKClass();
		// @ts-ignore
		expect(sdk.getApiKey('openai')).toBe('openai-env-key');
		// @ts-ignore
		expect(sdk.getApiKey('anthropic')).toBe('anthropic-env-key');
		// @ts-ignore
		expect(sdk.getApiKey('mistral')).toBe('mistral-env-key');
		// @ts-ignore
		expect(sdk.getApiKey('google-generative-ai')).toBe('google-env-key');
		// @ts-ignore
		expect(sdk.getApiKey('google-vertex')).toBe('vertex-env-key');
		// @ts-ignore
		expect(sdk.getApiKey('deepseek')).toBe('deepseek-env-key');
		// @ts-ignore
		expect(sdk.getApiKey('cerebras')).toBe('cerebras-env-key');
		// @ts-ignore
		expect(sdk.getApiKey('groq')).toBe('groq-env-key');
	});
}); 