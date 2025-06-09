import { RouterWrapper } from 'edge.libx.js/src/modules/RouterWrapper.js';
import { json } from 'itty-router';
import ai from '../ai';

export default function getAskRouter(base = '') {
	const routerWrapper = RouterWrapper.getNew(base);

	routerWrapper.router.post('/', async (req, env, ctx) => {
		const { model, messages, settings, apiKey } = await req.json();
		if (!messages || !Array.isArray(messages) || messages.length === 0) {
			return json({ error: 'messages array is required' }, { status: 400 });
		}
		if (!model || typeof model !== 'string' || !model.includes('/')) {
			return json({ error: "model must be in 'provider/model' format" }, { status: 400 });
		}
		const [provider, modelName] = model.split('/', 2);
		if (apiKey) ai.setKey({ [provider]: apiKey });
		ai.selectProviderModel(provider, modelName);
		const streamSupported = typeof Response === 'function' && typeof ReadableStream === 'function';
		try {
			const systemPrompt = settings?.systemPrompt;
			const temp = settings?.temperature;
			// If streaming is supported, use a generator (future: integrate with SDK streaming)
			if (streamSupported && false) { /* streaming not implemented in SDK yet */ }
			const answer = await ai.chat(messages, { model: modelName, systemPrompt });
			return json({ answer });
		} catch (err) {
			return json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
		}
	});

	return routerWrapper;
} 